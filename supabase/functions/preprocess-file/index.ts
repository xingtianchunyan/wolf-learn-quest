
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

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('请求体解析失败:', error);
      throw new Error('请求格式错误');
    }

    const { filePath, fileName, roomId } = requestBody;
    console.log('请求参数:', { filePath, fileName, roomId });

    if (!filePath || !fileName || !roomId) {
      throw new Error('缺少必要参数: filePath, fileName 或 roomId');
    }

    // 首先记录处理状态
    console.log('记录处理状态到file_processing_status表...');
    const { data: statusRecord, error: statusError } = await supabase
      .from('file_processing_status')
      .insert({
        room_id: roomId,
        file_name: fileName,
        original_file_path: filePath,
        status: 'processing'
      })
      .select()
      .maybeSingle();

    if (statusError) {
      console.error('记录处理状态失败:', statusError);
      throw new Error(`记录处理状态失败: ${statusError.message}`);
    }

    console.log('处理状态已记录，ID:', statusRecord?.id);

    // 检查是否已经预处理过此文件
    console.log('检查是否已预处理...');
    const { data: existingPreprocessed, error: checkError } = await supabase
      .from('preprocessed_files')
      .select('*')
      .eq('original_file_path', filePath)
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error('查询预处理记录失败:', checkError);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error(`查询预处理记录失败: ${checkError.message}`);
    }

    if (existingPreprocessed) {
      console.log('文件已预处理过，直接返回结果');
      // 更新状态为完成
      await supabase
        .from('file_processing_status')
        .update({ 
          status: 'completed',
          processed_file_path: `preprocessed_${fileName}`
        })
        .eq('id', statusRecord.id);

      return new Response(JSON.stringify({
        success: true,
        message: '文件已预处理过',
        preprocessed_content: existingPreprocessed.preprocessed_content,
        file_id: existingPreprocessed.id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('开始下载文件...');
    // 下载文件
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('question-files')
      .download(filePath);

    if (downloadError || !fileData) {
      console.error('文件下载失败:', downloadError);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error(`文件下载失败: ${downloadError?.message || '文件为空'}`);
    }

    let fileContent;
    try {
      fileContent = await fileData.text();
    } catch (error) {
      console.error('文件内容读取失败:', error);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('文件内容读取失败，请检查文件格式');
    }

    if (!fileContent || fileContent.trim().length === 0) {
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('文件内容为空');
    }

    console.log('文件内容长度:', fileContent.length);

    // 使用硅基流动平台API预处理文件
    const siliconflowModel = 'Tongyi-Zhiwen/QwenLong-L1-32B';
    console.log('使用模型:', siliconflowModel);

    console.log('调用硅基流动API预处理文件...');
    
    let preprocessResponse;
    try {
      preprocessResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
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
              content: '你是一个专业的文档预处理专家。请对用户提供的学习材料进行预处理，提取关键信息，整理结构，去除冗余内容，使其更适合用于生成考试题目。保持原文的核心知识点和重要概念，但要使文本更加清晰和有条理。'
            },
            {
              role: 'user',
              content: `请预处理以下学习材料：\n\n${fileContent}`
            }
          ],
          temperature: 0.3,
          max_tokens: 4000
        }),
      });
    } catch (error) {
      console.error('API请求发送失败:', error);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('无法连接到AI服务，请稍后重试');
    }

    console.log('API响应状态:', preprocessResponse.status);

    if (!preprocessResponse.ok) {
      const errorText = await preprocessResponse.text();
      console.error('硅基流动API错误:', preprocessResponse.status, errorText);
      
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      
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
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('AI服务响应格式错误');
    }

    console.log('API返回结果结构:', Object.keys(result));
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('AI服务返回数据格式错误');
    }

    const preprocessedContent = result.choices[0].message.content;
    console.log('预处理完成，内容长度:', preprocessedContent.length);

    // 保存预处理结果到数据库
    console.log('保存预处理结果到数据库...');
    const { data: savedPreprocessed, error: saveError } = await supabase
      .from('preprocessed_files')
      .insert({
        original_file_path: filePath,
        file_name: fileName,
        preprocessed_content: preprocessedContent,
        model_used: siliconflowModel
      })
      .select()
      .maybeSingle();

    if (saveError) {
      console.error('保存预处理结果失败:', saveError);
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error(`保存失败: ${saveError.message}`);
    }

    if (!savedPreprocessed) {
      console.error('保存成功但未返回数据');
      // 更新状态为失败
      await supabase
        .from('file_processing_status')
        .update({ status: 'failed' })
        .eq('id', statusRecord.id);
      throw new Error('保存成功但未返回数据');
    }

    console.log('预处理结果已保存，ID:', savedPreprocessed.id);

    // 更新处理状态为完成
    const { error: updateStatusError } = await supabase
      .from('file_processing_status')
      .update({ 
        status: 'completed',
        processed_file_path: `preprocessed_${fileName}`
      })
      .eq('id', statusRecord.id);

    if (updateStatusError) {
      console.error('更新处理状态失败:', updateStatusError);
    }

    return new Response(JSON.stringify({
      success: true,
      message: '文件预处理完成',
      preprocessed_content: preprocessedContent,
      file_id: savedPreprocessed.id,
      preview: preprocessedContent.substring(0, 500) + '...'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('预处理过程中发生错误:', error);
    
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
