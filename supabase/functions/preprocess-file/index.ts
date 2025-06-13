
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 引入JSZip来处理DOCX文件
import JSZip from 'https://esm.sh/jszip@3.10.1';

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

// 提取DOCX文件文本内容
async function extractDocxText(fileBuffer: ArrayBuffer): Promise<string> {
  try {
    console.log('开始解析DOCX文件，大小:', fileBuffer.byteLength);
    
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(fileBuffer);
    
    // 读取document.xml文件
    const documentFile = zipFile.file('word/document.xml');
    if (!documentFile) {
      throw new Error('无法找到document.xml文件');
    }
    
    const xmlContent = await documentFile.async('string');
    console.log('成功读取document.xml，长度:', xmlContent.length);
    
    // 简单的XML标签清理，提取文本内容
    let text = xmlContent
      // 移除所有XML标签
      .replace(/<[^>]*>/g, ' ')
      // 解码XML实体
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      // 清理多余空白
      .replace(/\s+/g, ' ')
      .trim();
    
    console.log('DOCX文本提取完成，内容长度:', text.length);
    return text;
  } catch (error) {
    console.error('DOCX解析错误:', error);
    throw new Error(`DOCX文件解析失败: ${error.message}`);
  }
}

// 读取文本文件内容
async function readTextFile(fileBuffer: ArrayBuffer): Promise<string> {
  try {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(fileBuffer);
  } catch (error) {
    console.error('文本文件读取错误:', error);
    throw new Error(`文本文件读取失败: ${error.message}`);
  }
}

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('开始处理预处理文件请求');
    
    if (!SILICONFLOW_API_KEY) {
      throw new Error('SILICONFLOW_API_KEY环境变量未设置');
    }

    const { filePath, fileName } = await req.json();
    console.log('预处理文件:', { filePath, fileName });

    // 从存储桶下载文件
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('question-files')
      .download(filePath);

    if (downloadError || !fileData) {
      console.error('文件下载失败:', downloadError);
      throw new Error('文件下载失败');
    }

    console.log('文件下载成功，大小:', fileData.size);

    // 获取文件扩展名
    const fileExtension = fileName.toLowerCase().split('.').pop();
    let fileContent = '';

    // 将Blob转换为ArrayBuffer
    const fileBuffer = await fileData.arrayBuffer();

    // 根据文件类型处理
    if (fileExtension === 'docx') {
      fileContent = await extractDocxText(fileBuffer);
    } else if (['txt', 'md'].includes(fileExtension || '')) {
      fileContent = await readTextFile(fileBuffer);
    } else {
      throw new Error(`不支持的文件格式: ${fileExtension}`);
    }

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error('文件内容为空或无法读取');
    }

    console.log('文件内容提取成功，长度:', fileContent.length);

    // 使用硅基流动平台API进行预处理
    console.log('调用硅基流动API进行预处理...');
    const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
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
            content: `你是一个专业的文档预处理专家。请对用户提供的学习材料进行结构化整理和优化，为后续的题目生成做准备。

要求：
1. 提取并整理文档中的核心知识点
2. 按照逻辑顺序重新组织内容
3. 去除无关信息，保留教学要点
4. 确保内容结构清晰，便于理解
5. 保持原文的准确性和完整性
6. 如果内容过长，进行合理的分段和总结

请返回结构化的、适合用于题目生成的文本内容。`
          },
          {
            role: 'user',
            content: `请对以下学习材料进行预处理和结构化整理：\n\n${fileContent}`
          }
        ],
        temperature: 0.3,
        max_tokens: 8000
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

    const preprocessedContent = result.choices[0].message.content;
    console.log('预处理完成，内容长度:', preprocessedContent.length);

    // 保存预处理结果到数据库
    const { data: savedData, error: saveError } = await supabase
      .from('preprocessed_files')
      .insert({
        original_file_path: filePath,
        file_name: fileName,
        preprocessed_content: preprocessedContent,
        model_used: 'Qwen/Qwen3-30B-A3B'
      })
      .select()
      .single();

    if (saveError) {
      console.error('保存预处理结果失败:', saveError);
      throw new Error(`保存失败: ${saveError.message}`);
    }

    console.log('预处理结果已保存，ID:', savedData.id);

    return new Response(JSON.stringify({
      success: true,
      message: '文件预处理完成',
      preprocessed_id: savedData.id,
      content_length: preprocessedContent.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('预处理过程中发生错误:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
