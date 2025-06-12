
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
    console.log('开始处理预处理请求');
    
    // 检查API密钥
    if (!SILICONFLOW_API_KEY) {
      console.error('SILICONFLOW_API_KEY环境变量未设置');
      throw new Error('SILICONFLOW_API_KEY环境变量未设置');
    }

    // 检查Supabase配置
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase配置不完整');
      throw new Error('Supabase配置不完整');
    }

    const requestBody = await req.json();
    const { filePath, fileName } = requestBody;
    
    console.log('请求参数:', { filePath, fileName });

    if (!filePath || !fileName) {
      throw new Error('缺少必要参数: filePath或fileName');
    }

    console.log('开始预处理文件:', fileName, '路径:', filePath);

    // 从Supabase Storage下载文件
    console.log('正在下载文件...');
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('question-files')
      .download(filePath);

    if (downloadError) {
      console.error('文件下载失败:', downloadError);
      throw new Error(`文件下载失败: ${downloadError.message}`);
    }

    if (!fileData) {
      throw new Error('文件下载返回空数据');
    }

    // 读取文件内容
    const fileContent = await fileData.text();
    console.log('文件内容长度:', fileContent.length);

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error('文件内容为空');
    }

    // 使用DeepSeek R1模型进行文件预处理
    console.log('调用硅基流动API进行预处理...');
    const preprocessResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的文档预处理专家。请将用户提供的文档内容进行结构化整理，提取出：
1. 主要知识点和概念
2. 重要定义和术语
3. 关键信息和要点
4. 可能的考试重点

请将内容组织成清晰的结构化格式，便于后续生成考试题目。确保内容完整且逻辑清晰。`
          },
          {
            role: 'user',
            content: `请预处理以下文档内容，提取关键信息并结构化整理：\n\n${fileContent}`
          }
        ],
        temperature: 0.1,
        max_tokens: 4000
      }),
    });

    console.log('API响应状态:', preprocessResponse.status);

    if (!preprocessResponse.ok) {
      const errorText = await preprocessResponse.text();
      console.error('硅基流动API错误:', errorText);
      throw new Error(`API调用失败: ${preprocessResponse.status} - ${errorText}`);
    }

    const result = await preprocessResponse.json();
    console.log('API返回结果结构:', Object.keys(result));
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('API返回数据格式错误');
    }

    const preprocessedContent = result.choices[0].message.content;
    console.log('预处理完成，内容长度:', preprocessedContent.length);

    // 将预处理结果保存到数据库
    console.log('保存预处理结果到数据库...');
    const { data: savedData, error: saveError } = await supabase
      .from('preprocessed_files')
      .insert({
        original_file_path: filePath,
        file_name: fileName,
        preprocessed_content: preprocessedContent,
        model_used: 'deepseek-ai/DeepSeek-R1',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('保存预处理结果失败:', saveError);
      throw new Error(`保存失败: ${saveError.message || '数据库保存错误'}`);
    }

    console.log('预处理结果已保存，ID:', savedData.id);

    return new Response(JSON.stringify({
      success: true,
      message: '文件预处理完成',
      preprocessed_id: savedData.id,
      content_preview: preprocessedContent.substring(0, 200) + '...'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('预处理过程中发生错误:', error);
    
    // 提供更详细的错误信息
    let errorMessage = '未知错误';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
