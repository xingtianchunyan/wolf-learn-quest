
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

// 模型映射 - 硅基流动平台支持的模型
const modelMapping = {
  'deepseek-r1': 'deepseek-ai/DeepSeek-R1',
  'qwen3-32b': 'Qwen/Qwen2.5-32B-Instruct'
};

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filePath, fileName, model, questionCount = 18 } = await req.json();
    console.log('开始生成题目:', { fileName, model, questionCount });

    // 获取预处理后的内容
    const { data: preprocessedData, error: fetchError } = await supabase
      .from('preprocessed_files')
      .select('preprocessed_content')
      .eq('original_file_path', filePath)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let contentToUse = '';
    
    if (fetchError || !preprocessedData) {
      console.log('未找到预处理内容，使用原始文件');
      // 如果没有预处理内容，直接使用原始文件
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('question-files')
        .download(filePath);

      if (downloadError) {
        throw new Error(`文件下载失败: ${downloadError.message}`);
      }

      contentToUse = await fileData.text();
    } else {
      contentToUse = preprocessedData.preprocessed_content;
    }

    // 获取对应的硅基流动模型名称
    const siliconflowModel = modelMapping[model] || modelMapping['deepseek-r1'];
    console.log('使用模型:', siliconflowModel);

    // 使用硅基流动平台API生成题目
    const generateResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: siliconflowModel,
        messages: [
          {
            role: 'system',
            content: `你是一个专业的考试题目生成专家。请根据提供的学习材料生成${questionCount}道高质量的考试题目。

要求：
1. 题目类型包括：选择题、判断题、简答题、论述题
2. 难度分布：简单(30%)、中等(50%)、困难(20%)
3. 每道题目必须包含：题目内容、选项(选择题)、正确答案、解析说明
4. 题目应该全面覆盖学习材料的重点内容
5. 返回JSON格式，结构如下：

{
  "questions": [
    {
      "id": 1,
      "type": "choice|judgment|short_answer|essay",
      "difficulty": "easy|medium|hard",
      "question": "题目内容",
      "options": ["A选项", "B选项", "C选项", "D选项"], // 仅选择题需要
      "correct_answer": "正确答案",
      "explanation": "答案解析",
      "points": 题目分值
    }
  ]
}`
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

    if (!generateResponse.ok) {
      const errorText = await generateResponse.text();
      console.error('硅基流动API错误:', errorText);
      throw new Error(`API调用失败: ${generateResponse.status} ${errorText}`);
    }

    const result = await generateResponse.json();
    const generatedContent = result.choices[0].message.content;

    console.log('题目生成完成');

    // 尝试解析JSON格式的题目
    let questions;
    try {
      // 提取JSON部分（处理可能的markdown格式）
      const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)\n```/) || 
                       generatedContent.match(/\{[\s\S]*\}/);
      const jsonContent = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : generatedContent;
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('JSON解析失败，使用文本格式保存:', parseError);
      questions = {
        questions: [{
          id: 1,
          type: 'text',
          difficulty: 'medium',
          question: '生成的题目内容',
          correct_answer: '请查看完整内容',
          explanation: '详细解析请查看原始生成内容',
          points: 5,
          raw_content: generatedContent
        }]
      };
    }

    // 保存生成的题目到数据库
    const { data: savedQuestions, error: saveError } = await supabase
      .from('generated_questions')
      .insert({
        file_path: filePath,
        file_name: fileName,
        model_used: siliconflowModel,
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
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
