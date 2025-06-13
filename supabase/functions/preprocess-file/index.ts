
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

// 改进的DOCX文件内容解析函数
async function extractDocxContent(fileData: Uint8Array): Promise<string> {
  try {
    console.log('开始解析DOCX文件，文件大小:', fileData.length);
    
    // 导入JSZip来处理ZIP格式的DOCX文件
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    
    // 加载DOCX文件（本质上是ZIP文件）
    const zip = await JSZip.loadAsync(fileData);
    
    // 查找document.xml文件
    const documentXml = zip.file('word/document.xml');
    if (!documentXml) {
      throw new Error('无法找到document.xml文件，这可能不是有效的DOCX文件');
    }
    
    // 读取XML内容
    const xmlContent = await documentXml.async('text');
    console.log('成功读取document.xml，内容长度:', xmlContent.length);
    
    // 使用正则表达式提取文本内容
    // 匹配 <w:t>文本内容</w:t> 和 <w:t xml:space="preserve">文本内容</w:t> 标签中的文本
    const textMatches = xmlContent.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
    
    if (!textMatches || textMatches.length === 0) {
      console.log('未找到文本标签，尝试其他方法提取文本');
      // 如果没有找到标准文本标签，尝试提取所有可能的文本内容
      const fallbackText = xmlContent
        .replace(/<[^>]+>/g, ' ') // 移除所有XML标签
        .replace(/\s+/g, ' ') // 合并多个空格
        .trim();
      
      if (fallbackText.length > 100) {
        console.log('使用备用方法提取文本成功');
        return fallbackText;
      } else {
        throw new Error('文档中未找到有效的文本内容');
      }
    }
    
    // 提取并组合所有文本
    const extractedText = textMatches
      .map(match => {
        // 移除标签，保留文本内容
        const text = match.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
        // 解码XML实体
        return text
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'");
      })
      .join(' ')
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim();
    
    console.log('成功提取文本，长度:', extractedText.length);
    console.log('文本预览:', extractedText.substring(0, 200));
    
    if (!extractedText || extractedText.length < 10) {
      throw new Error('提取的文本内容过短或为空');
    }
    
    return extractedText;
  } catch (error) {
    console.error('DOCX解析错误详情:', error);
    throw new Error(`DOCX文件解析失败: ${error.message}`);
  }
}

// 处理其他文件类型的函数
async function extractTextContent(fileData: Blob, fileName: string): Promise<string> {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  console.log('处理文件类型:', fileExtension);
  
  switch (fileExtension) {
    case 'txt':
    case 'md':
      return await fileData.text();
    
    case 'docx':
      const arrayBuffer = await fileData.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      return await extractDocxContent(uint8Array);
    
    case 'doc':
      // 对于老版本的DOC文件，尝试读取文本
      const docText = await fileData.text();
      // 简单的文本清理，移除大部分二进制字符
      const cleanText = docText
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
        .replace(/[^\x20-\x7E\u4e00-\u9fff\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (cleanText.length < 50) {
        throw new Error('DOC文件内容提取失败，建议转换为DOCX格式后重试');
      }
      return cleanText;
    
    default:
      // 对于其他文件类型，尝试直接读取文本
      return await fileData.text();
  }
}

serve(async (req) => {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('开始处理预处理请求');
    
    if (!SILICONFLOW_API_KEY) {
      throw new Error('SILICONFLOW_API_KEY环境变量未设置');
    }

    const { filePath, fileName } = await req.json();
    console.log('请求参数:', { filePath, fileName });

    if (!filePath || !fileName) {
      throw new Error('缺少必要的参数：filePath 或 fileName');
    }

    // 检查是否已经预处理过此文件
    const { data: existingPreprocessed, error: checkError } = await supabase
      .from('preprocessed_files')
      .select('id, preprocessed_content')
      .eq('original_file_path', filePath)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error('检查已存在预处理文件失败:', checkError);
    }

    if (existingPreprocessed) {
      console.log('文件已预处理过，返回现有结果');
      return new Response(JSON.stringify({
        success: true,
        message: '文件已预处理过',
        preprocessed_id: existingPreprocessed.id,
        content_preview: existingPreprocessed.preprocessed_content.substring(0, 200) + '...'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 从Supabase Storage下载文件
    console.log('正在下载文件...');
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('question-files')
      .download(filePath);

    if (downloadError) {
      console.error('文件下载失败:', downloadError);
      throw new Error(`文件下载失败: ${downloadError.message}`);
    }

    console.log('文件下载成功，开始提取文本内容...');
    
    // 提取文件的实际文本内容
    let fileContent: string;
    try {
      fileContent = await extractTextContent(fileData, fileName);
    } catch (extractError) {
      console.error('文本提取失败:', extractError);
      throw new Error(`文件内容提取失败: ${extractError.message}`);
    }

    console.log('提取的文件内容长度:', fileContent.length);
    console.log('内容预览:', fileContent.substring(0, 300));

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error('文件内容为空或无法读取');
    }

    // 限制文件内容长度，Qwen3-30B-A3B支持128K上下文
    const maxContentLength = 100000; // 约100K字符
    let processedContent = fileContent;
    if (fileContent.length > maxContentLength) {
      processedContent = fileContent.substring(0, maxContentLength) + '...';
      console.log('文件内容过长，已截取前', maxContentLength, '个字符');
    }

    // 使用硅基流动API进行预处理
    console.log('调用硅基流动API进行预处理...');
    
    const preprocessResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
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
            content: `你是一个专业的文档预处理专家。请将用户提供的文档内容进行结构化整理，提取出：
1. 主要知识点和概念
2. 重要定义和术语
3. 关键信息和要点
4. 可能的考试重点

请将内容组织成清晰的结构化格式，便于后续生成考试题目。确保内容完整且逻辑清晰。如果文档内容是中文，请用中文回复。`
          },
          {
            role: 'user',
            content: `请预处理以下文档内容，提取关键信息并结构化整理：\n\n${processedContent}`
          }
        ],
        temperature: 0.1,
        max_tokens: 8000,
        top_p: 0.8
      }),
    });

    console.log('API响应状态:', preprocessResponse.status);

    if (!preprocessResponse.ok) {
      const errorText = await preprocessResponse.text();
      console.error('硅基流动API错误:', preprocessResponse.status, errorText);
      throw new Error(`API调用失败 (${preprocessResponse.status}): ${errorText}`);
    }

    const result = await preprocessResponse.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('AI服务返回数据格式错误');
    }

    const preprocessedContent = result.choices[0].message.content;
    console.log('预处理完成，内容长度:', preprocessedContent.length);

    // 保存预处理结果到数据库
    console.log('保存预处理结果到数据库...');
    const { data: savedData, error: saveError } = await supabase
      .from('preprocessed_files')
      .insert({
        original_file_path: filePath,
        file_name: fileName,
        preprocessed_content: preprocessedContent,
        model_used: 'Qwen/Qwen3-30B-A3B',
        created_at: new Date().toISOString()
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
      content_preview: preprocessedContent.substring(0, 200) + '...'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('预处理过程中发生错误:', error);
    
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
