
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filePath, roomId, model, questionCount = 18 } = await req.json();
    console.log('Generating questions for file:', filePath, 'using model:', model);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get processed content from database
    const { data: fileStatus, error: statusError } = await supabase
      .from('file_processing_status')
      .select('processed_file_path')
      .eq('room_id', roomId)
      .eq('original_file_path', filePath)
      .eq('status', 'processed')
      .single();

    if (statusError || !fileStatus?.processed_file_path) {
      throw new Error('请先预处理文件内容');
    }

    const processedContent = fileStatus.processed_file_path;

    // Determine AI model endpoint based on selection
    let apiUrl = '';
    let headers = {};
    let requestBody = {};

    if (model === 'deepseek-r1') {
      // DeepSeek API configuration
      apiUrl = 'https://api.deepseek.com/chat/completions';
      headers = {
        'Authorization': `Bearer ${Deno.env.get('DEEPSEEK_API_KEY')}`,
        'Content-Type': 'application/json',
      };
      requestBody = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的题目生成专家。根据提供的知识内容，生成${questionCount}道高质量的选择题。

要求：
1. 题目难度适中，涵盖重要知识点
2. 每题包含4个选项（A、B、C、D）
3. 只有一个正确答案
4. 选项设计合理，避免明显错误答案
5. 题目表述清晰准确

输出格式（严格JSON格式）：
{
  "questions": [
    {
      "question": "题目内容",
      "optionA": "选项A内容",
      "optionB": "选项B内容", 
      "optionC": "选项C内容",
      "optionD": "选项D内容",
      "correctAnswer": "A"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `基于以下预处理的内容生成${questionCount}道选择题：\n\n${processedContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      };
    } else if (model === 'qwen3-32b') {
      // Qwen API configuration (using OpenAI-compatible endpoint)
      apiUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
      headers = {
        'Authorization': `Bearer ${Deno.env.get('QWEN_API_KEY')}`,
        'Content-Type': 'application/json',
      };
      requestBody = {
        model: 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的题目生成专家。根据提供的知识内容，生成${questionCount}道高质量的选择题。

要求：
1. 题目难度适中，涵盖重要知识点
2. 每题包含4个选项（A、B、C、D）
3. 只有一个正确答案
4. 选项设计合理，避免明显错误答案
5. 题目表述清晰准确

输出格式（严格JSON格式）：
{
  "questions": [
    {
      "question": "题目内容",
      "optionA": "选项A内容",
      "optionB": "选项B内容", 
      "optionC": "选项C内容",
      "optionD": "选项D内容",
      "correctAnswer": "A"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `基于以下预处理的内容生成${questionCount}道选择题：\n\n${processedContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      };
    } else {
      // Default to OpenAI
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      headers = {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      };
      requestBody = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的题目生成专家。根据提供的知识内容，生成${questionCount}道高质量的选择题。

要求：
1. 题目难度适中，涵盖重要知识点
2. 每题包含4个选项（A、B、C、D）
3. 只有一个正确答案
4. 选项设计合理，避免明显错误答案
5. 题目表述清晰准确

输出格式（严格JSON格式）：
{
  "questions": [
    {
      "question": "题目内容",
      "optionA": "选项A内容",
      "optionB": "选项B内容", 
      "optionC": "选项C内容",
      "optionD": "选项D内容",
      "correctAnswer": "A"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `基于以下预处理的内容生成${questionCount}道选择题：\n\n${processedContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      };
    }

    // Call AI API to generate questions
    const aiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      throw new Error(`AI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const aiResult = await aiResponse.json();
    const questionsContent = aiResult.choices[0].message.content;

    // Parse AI response to extract questions
    let questionsData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = questionsContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questionsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('AI response format error');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('AI返回的内容格式不正确，请重试');
    }

    // Save questions to database
    const questionsToInsert = questionsData.questions.map((q: any) => ({
      room_id: roomId,
      question_text: q.question,
      option_a: q.optionA,
      option_b: q.optionB,
      option_c: q.optionC,
      option_d: q.optionD,
      correct_answer: q.correctAnswer,
      source_file: filePath.split('/').pop()
    }));

    const { error: insertError } = await supabase
      .from('generated_questions')
      .insert(questionsToInsert);

    if (insertError) {
      console.error('Error saving questions:', insertError);
      throw new Error('保存题目到数据库时出错');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        questionsCount: questionsData.questions.length,
        message: `成功生成${questionsData.questions.length}道题目`
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in generate-questions function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
