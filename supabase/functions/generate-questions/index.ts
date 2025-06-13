
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SILICONFLOW_API_KEY = Deno.env.get('SILICONFLOW_API_KEY');
const SILICONFLOW_BASE_URL = 'https://api.siliconflow.cn/v1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('开始处理生成题目请求');
    
    if (!SILICONFLOW_API_KEY) {
      throw new Error('SILICONFLOW_API_KEY环境变量未设置');
    }

    const { preprocessedId, questionCount = 18, roomId } = await req.json();
    console.log('生成题目参数:', { preprocessedId, questionCount, roomId });

    // 获取预处理内容
    const { data: preprocessedData, error: fetchError } = await supabase
      .from('preprocessed_files')
      .select('*')
      .eq('id', preprocessedId)
      .single();

    if (fetchError || !preprocessedData) {
      console.error('获取预处理数据失败:', fetchError);
      throw new Error('预处理数据不存在');
    }

    // 检查是否已经生成过题目
    const { data: existingQuestions } = await supabase
      .from('generated_questions')
      .select('*')
      .eq('original_file_path', preprocessedData.original_file_path)
      .single();

    if (existingQuestions) {
      console.log('题目已生成过，返回现有结果');
      return new Response(JSON.stringify({
        success: true,
        message: '题目已生成完成',
        question_set_id: existingQuestions.id,
        questions: existingQuestions.questions,
        question_count: existingQuestions.question_count
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('调用硅基流动API生成题目...');
    const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-72B-Instruct',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的题目生成专家。请根据提供的学习材料生成高质量的选择题。

要求：
1. 生成${questionCount}道选择题
2. 每道题包含题干和4个选项（A、B、C、D）
3. 题目应覆盖材料的核心知识点
4. 难度适中，既有基础题也有综合应用题
5. 选项设计合理，干扰项有一定迷惑性
6. 必须严格按照以下JSON格式返回，不要添加任何其他文字说明：

{
  "questions": [
    {
      "question": "题干内容",
      "option_a": "选项A内容",
      "option_b": "选项B内容", 
      "option_c": "选项C内容",
      "option_d": "选项D内容",
      "correct_answer": "A|B|C|D",
      "explanation": "答案解释"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `请基于以下学习材料生成${questionCount}道选择题：\n\n${preprocessedData.preprocessed_content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000  // 修复：改为4000以符合API限制
      }),
    });

    console.log('API响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('硅基流动API错误:', errorText);
      throw new Error(`API调用失败: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('API返回数据格式错误');
    }

    const generatedContent = result.choices[0].message.content;
    console.log('AI生成的原始内容:', generatedContent.substring(0, 500) + '...');

    // 解析JSON格式的题目
    let questionsData;
    try {
      // 尝试提取JSON部分
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questionsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('未找到有效的JSON格式');
      }
    } catch (parseError) {
      console.error('解析题目JSON失败:', parseError);
      throw new Error('AI返回的题目格式错误');
    }

    if (!questionsData.questions || !Array.isArray(questionsData.questions)) {
      throw new Error('题目数据格式错误');
    }

    console.log('成功解析题目数据，题目数量:', questionsData.questions.length);

    // 保存生成的题目集合
    const { data: savedQuestionSet, error: saveError } = await supabase
      .from('generated_questions')
      .insert({
        original_file_path: preprocessedData.original_file_path,
        file_name: preprocessedData.file_name,
        model_used: 'Qwen/Qwen2.5-72B-Instruct',
        question_count: questionsData.questions.length,
        questions: questionsData.questions,
        room_id: roomId,
        uploaded_file_id: preprocessedData.uploaded_file_id
      })
      .select()
      .single();

    if (saveError) {
      console.error('保存题目集合失败:', saveError);
      throw new Error(`保存失败: ${saveError.message}`);
    }

    // 将每道题目单独保存到questions表
    const individualQuestions = questionsData.questions.map((q: any, index: number) => ({
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_option: q.correct_answer === 'A' ? 1 : q.correct_answer === 'B' ? 2 : q.correct_answer === 'C' ? 3 : 4,
      explanation: q.explanation,
      generated_questions_id: savedQuestionSet.id,
      room_id: roomId,
      difficulty: Math.floor(index / 6) + 1, // 分为3个难度等级
      category: '综合题目'
    }));

    const { error: questionsError } = await supabase
      .from('questions')
      .insert(individualQuestions);

    if (questionsError) {
      console.error('保存单独题目失败:', questionsError);
      // 这里不抛出错误，因为主要数据已经保存成功
    }

    console.log('题目生成完成，ID:', savedQuestionSet.id);

    return new Response(JSON.stringify({
      success: true,
      message: '题目生成完成',
      question_set_id: savedQuestionSet.id,
      questions: questionsData.questions,
      question_count: questionsData.questions.length
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
