
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
    const { filePath, roomId } = await req.json();
    console.log('Processing file:', filePath, 'for room:', roomId);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('question-files')
      .download(filePath);

    if (downloadError) {
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    // Convert file to text
    const fileText = await fileData.text();
    console.log('File content length:', fileText.length);

    // Call OpenAI API to preprocess the file content
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是一个文档预处理专家。请将用户提供的文档内容整理成结构化的知识点格式，便于后续生成题目。
            
要求：
1. 提取文档中的关键知识点
2. 按主题分类整理
3. 每个知识点包含核心概念和详细说明
4. 使用清晰的JSON格式输出
5. 确保信息准确完整

输出格式示例：
{
  "processedContent": {
    "topics": [
      {
        "title": "主题1",
        "keyPoints": [
          {
            "concept": "概念名称",
            "description": "详细说明",
            "examples": ["示例1", "示例2"]
          }
        ]
      }
    ],
    "summary": "文档总结"
  }
}`
          },
          {
            role: 'user',
            content: `请预处理以下文档内容：\n\n${fileText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 3000
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const aiResult = await openaiResponse.json();
    const processedContent = aiResult.choices[0].message.content;

    // Save processed content to database
    const { error: updateError } = await supabase
      .from('file_processing_status')
      .upsert({
        room_id: roomId,
        file_name: filePath.split('/').pop(),
        status: 'processed',
        original_file_path: filePath,
        processed_file_path: processedContent
      });

    if (updateError) {
      console.error('Error saving processed content:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processedContent,
        message: '文件预处理完成'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in preprocess-file function:', error);
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
