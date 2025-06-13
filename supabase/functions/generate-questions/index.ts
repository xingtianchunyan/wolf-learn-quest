
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 硅基流动平台API配置
const SILICONFLOW_API_KEY = Deno.env.get('SILICONFLOW_API_KEY');
const SILICONFLOW_BASE_URL = 'https://api.siliconflow.cn/v1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 初始化Supabase客户端
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('开始处理生成题目请求');
    
    if (!SILICONFLOW_API_KEY) {
      throw new Error('SILICONFLOW_API_KEY环境变量未设置');
    }

    const { preprocessedId, questionCount = 10, roomId } = await req.json();
    console.log('开始生成题目:', { preprocessedId, questionCount, roomId });

    if (!preprocessedId) {
      throw new Error('缺少预处理文件ID');
    }

    // 检查是否已经为此预处理文件生成过题目
    const { data: existingQuestions, error: checkError } = await supabase
      .from('generated_questions')
      .select('id, questions, question_count')
      .eq('source_file', preprocessedId)
      .maybeSingle();

    if (checkError) {
      console.error('检查已存在题目失败:', checkError);
    }

    if (existingQuestions && existingQuestions.questions) {
      console.log('该文件已生成过题目，返回现有结果');
      return new Response(JSON.stringify({
        success: true,
        message: '题目已生成过',
        question_id: existingQuestions.id,
        question_count: existingQuestions.question_count || 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 获取预处理内容
    const { data: preprocessedData, error: fetchError } = await supabase
      .from('preprocessed_files')
      .select('preprocessed_content, file_name')
      .eq('id', preprocessedId)
      .single();

    if (fetchError || !preprocessedData) {
      console.error('获取预处理内容失败:', fetchError);
      throw new Error('未找到预处理内容');
    }

    console.log('使用预处理内容，长度:', preprocessedData.preprocessed_content.length);

    // 使用硅基流动API生成题目
    console.log('调用硅基流动API生成题目...');
    
    const questionsResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen3-30B-A3B',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的题目生成专家。请根据提供的文档内容生成高质量的选择题。

要求：
1. 生成${questionCount}道选择题
2. 每题包含4个选项（A、B、C、D）
3. 题目应覆盖文档的主要知识点
4. 难度适中，既有基础题也有提高题
5. 答案解析要详细准确

请严格按照以下JSON格式输出：
{
  "questions": [
    {
      "question": "题目内容",
      "option_a": "选项A",
      "option_b": "选项B", 
      "option_c": "选项C",
      "option_d": "选项D",
      "correct_answer": "A",
      "explanation": "答案解析"
    }
  ]
}

确保输出的是有效的JSON格式。`
          },
          {
            role: 'user',
            content: `请根据以下内容生成${questionCount}道选择题：\n\n${preprocessedData.preprocessed_content}`
          }
        ],
        temperature: 0.3,
        max_tokens: 12000,
        top_p: 0.8
      }),
    });

    console.log('API响应状态:', questionsResponse.status);

    if (!questionsResponse.ok) {
      const errorText = await questionsResponse.text();
      console.error('硅基流动API错误:', questionsResponse.status, errorText);
      throw new Error(`API调用失败 (${questionsResponse.status}): ${errorText}`);
    }

    const result = await questionsResponse.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('AI服务返回数据格式错误');
    }

    const questionsContent = result.choices[0].message.content;
    console.log('题目生成完成，内容长度:', questionsContent.length);

    // 解析生成的题目
    let parsedQuestions;
    try {
      // 尝试提取JSON部分
      const jsonMatch = questionsContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedQuestions = JSON.parse(jsonMatch[0]);
      } else {
        parsedQuestions = JSON.parse(questionsContent);
      }
    } catch (parseError) {
      console.error('题目JSON解析失败:', parseError);
      console.log('原始内容:', questionsContent);
      throw new Error('生成的题目格式无效');
    }

    if (!parsedQuestions.questions || !Array.isArray(parsedQuestions.questions)) {
      throw new Error('生成的题目结构无效');
    }

    console.log('解析后的题目数量:', parsedQuestions.questions.length);

    // 保存题目到数据库
    console.log('保存题目到数据库...');
    const { data: savedData, error: saveError } = await supabase
      .from('generated_questions')
      .insert({
        room_id: roomId || null,
        source_file: preprocessedId,
        file_name: preprocessedData.file_name,
        questions: parsedQuestions.questions,
        question_count: parsedQuestions.questions.length,
        model_used: 'Qwen/Qwen3-30B-A3B',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('保存题目失败:', saveError);
      throw new Error(`保存失败: ${saveError.message}`);
    }

    console.log('题目已保存，ID:', savedData.id);

    return new Response(JSON.stringify({
      success: true,
      message: '题目生成完成',
      question_id: savedData.id,
      question_count: parsedQuestions.questions.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('生成题目过程中发生错误:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
