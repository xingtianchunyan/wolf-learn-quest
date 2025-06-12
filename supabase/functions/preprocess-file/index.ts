
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

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('请求体解析失败:', error);
      throw new Error('请求格式错误');
    }

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
    let fileContent;
    try {
      fileContent = await fileData.text();
    } catch (error) {
      console.error('文件内容读取失败:', error);
      throw new Error('文件内容读取失败，请检查文件格式');
    }
    
    console.log('文件内容长度:', fileContent.length);

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error('文件内容为空');
    }

    // 限制文件内容长度 - QwenLong可以处理更长文本
    const maxContentLength = 50000; // 增加到50k字符
    if (fileContent.length > maxContentLength) {
      fileContent = fileContent.substring(0, maxContentLength) + '...';
      console.log('文件内容过长，已截取前', maxContentLength, '个字符');
    }

    // 使用QwenLong模型进行文件预处理
    console.log('调用硅基流动API进行预处理...');
    
    let preprocessResponse;
    try {
      preprocessResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'Tongyi-Zhiwen/QwenLong-L1-32B',
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
          max_tokens: 8000
        }),
      });
    } catch (error) {
      console.error('API请求发送失败:', error);
      throw new Error('无法连接到AI服务，请稍后重试');
    }

    console.log('API响应状态:', preprocessResponse.status);

    if (!preprocessResponse.ok) {
      const errorText = await preprocessResponse.text();
      console.error('硅基流动API错误:', preprocessResponse.status, errorText);
      
      let errorMessage = `API调用失败 (${preprocessResponse.status})`;
      if (preprocessResponse.status === 401) {
        errorMessage = 'API密钥无效，请检查配置';
      } else if (preprocessResponse.status === 429) {
        errorMessage = 'API调用频率限制，请稍后重试';
      } else if (preprocessResponse.status >= 500) {
        errorMessage = 'AI服务暂时不可用，请稍后重试';
      }
      
      throw new Error(errorMessage);
    }

    let result;
    try {
      result = await preprocessResponse.json();
    } catch (error) {
      console.error('API响应解析失败:', error);
      throw new Error('AI服务响应格式错误');
    }

    console.log('API返回结果结构:', Object.keys(result));
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('AI服务返回数据格式错误');
    }

    const preprocessedContent = result.choices[0].message.content;
    console.log('预处理完成，内容长度:', preprocessedContent.length);

    // 创建预处理文件表（如果不存在）
    console.log('检查preprocessed_files表是否存在...');
    const { error: createTableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.preprocessed_files (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          original_file_path TEXT NOT NULL,
          file_name TEXT NOT NULL,
          preprocessed_content TEXT NOT NULL,
          model_used TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
        
        -- 启用RLS
        ALTER TABLE public.preprocessed_files ENABLE ROW LEVEL SECURITY;
        
        -- 创建查看策略
        CREATE POLICY IF NOT EXISTS "Allow authenticated users to view preprocessed files" 
        ON public.preprocessed_files FOR SELECT 
        USING (true);
        
        -- 创建插入策略
        CREATE POLICY IF NOT EXISTS "Allow authenticated users to create preprocessed files" 
        ON public.preprocessed_files FOR INSERT 
        WITH CHECK (true);
      `
    });

    if (createTableError) {
      console.log('表可能已存在，继续执行...');
    }

    // 将预处理结果保存到数据库
    console.log('保存预处理结果到数据库...');
    const { data: savedData, error: saveError } = await supabase
      .from('preprocessed_files')
      .insert({
        original_file_path: filePath,
        file_name: fileName,
        preprocessed_content: preprocessedContent,
        model_used: 'Tongyi-Zhiwen/QwenLong-L1-32B',
        created_at: new Date().toISOString()
      })
      .select()
      .maybeSingle();

    if (saveError) {
      console.error('保存预处理结果失败:', saveError);
      throw new Error(`保存失败: ${saveError.message || '数据库保存错误'}`);
    }

    if (!savedData) {
      console.error('保存成功但未返回数据');
      throw new Error('保存成功但未返回数据');
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
