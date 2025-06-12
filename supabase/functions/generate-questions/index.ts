
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

    const { preprocessedId, questionCount = 18 } = await req.json();
    console.log('开始生成题目:', { preprocessedId, questionCount });

    // 获取预处理后的内容
    const { data: preprocessedData, error: fetchError } = await supabase
      .from('preprocessed_files')
      .select('*')
      .eq('id', preprocessedId)
      .single();

    if (fetchError || !preprocessedData) {
      console.error('获取预处理内容失败:', fetchError);
      throw new Error('未找到指定的预处理文件');
    }

    const contentToUse = preprocessedData.preprocessed_content;

    if (!contentToUse || contentToUse.trim().length === 0) {
      throw new Error('预处理内容为空');
    }

    console.log('使用预处理内容，长度:', contentToUse.length);

    // 使用硅基流动平台API生成题目
    console.log('调用硅基流动API生成题目...');
    const generateResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen3-32B',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的考试题目生成专家。请根据提供的学习材料生成${questionCount}道考试题目。

要求：
1. 题目类型只包括：选择题（4个选项）和判断题（2个选项：正确/错误）
2. 选择题和判断题的比例大约为7:3
3. 每道题目必须包含：题目内容、选项、正确答案、解析说明
4. 题目应该全面覆盖学习材料的重点内容
5. 返回严格的JSON格式，结构如下：

{
  "questions": [
    {
      "id": 1,
      "type": "choice",
      "question": "题目内容",
      "options": ["A选项", "B选项", "C选项", "D选项"],
      "correct_answer": "A",
      "explanation": "答案解析"
    },
    {
      "id": 2,
      "type": "judgment",
      "question": "题目内容",
      "options": ["正确", "错误"],
      "correct_answer": "正确",
      "explanation": "答案解析"
    }
  ]
}

请确保返回的是完整有效的JSON格式，不要包含任何markdown标记。`
          },
          {
            role: 'user',
            content: `请基于以下学习材料生成${questionCount}道考试题目：\n\n${contentToUse}`
          }
        ],
        temperature: 0.7,
        max_tokens: 6000
      }),
    });

    console.log('API响应状态:', generateResponse.status);

    if (!generateResponse.ok) {
      const errorText = await generateResponse.text();
      console.error('硅基流动API错误:', errorText);
      throw new Error(`API调用失败: ${generateResponse.status} - ${errorText}`);
    }

    const result = await generateResponse.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('API返回数据格式错误');
    }

    const generatedContent = result.choices[0].message.content;
    console.log('题目生成完成，内容长度:', generatedContent.length);

    // 尝试解析JSON格式的题目
    let questions;
    try {
      // 清理可能的markdown格式
      const cleanContent = generatedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questions = JSON.parse(cleanContent);
      
      if (!questions.questions || !Array.isArray(questions.questions)) {
        throw new Error('题目格式不正确');
      }
      
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      console.log('原始内容:', generatedContent);
      
      // 如果解析失败，创建一个默认格式
      questions = {
        questions: [{
          id: 1,
          type: 'text',
          question: '题目生成格式错误，请重新生成',
          options: ['查看原始内容'],
          correct_answer: '查看原始内容',
          explanation: '生成的内容格式不正确，请重新尝试',
          raw_content: generatedContent
        }]
      };
    }

    console.log('解析后的题目数量:', questions.questions?.length || 0);

    // 保存生成的题目到数据库
    const { data: savedQuestions, error: saveError } = await supabase
      .from('generated_questions')
      .insert({
        file_path: preprocessedData.original_file_path,
        file_name: preprocessedData.file_name,
        model_used: 'Qwen/Qwen3-32B',
        questions: questions.questions || questions,
        question_count: questions.questions?.length || 1,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('保存题目失败:', saveError);
      throw new Error(`保存失败: ${saveError.message}`);
    }

    console.log('题目已保存，ID:', savedQuestions.id);

    return new Response(JSON.stringify({
      success: true,
      message: `成功生成${questions.questions?.length || 1}道题目`,
      question_bank_id: savedQuestions.id,
      questions: questions.questions || questions,
      preview: questions.questions?.slice(0, 3) || [questions]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('生成题目过程中发生错误:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
