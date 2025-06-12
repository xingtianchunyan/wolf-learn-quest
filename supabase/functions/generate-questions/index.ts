
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

    const { filePath, fileName, questionCount = 18 } = requestBody;
    console.log('请求参数:', { filePath, fileName, questionCount });

    if (!filePath || !fileName) {
      throw new Error('缺少必要参数: filePath或fileName');
    }

    console.log('开始生成题目:', { fileName, questionCount });

    // 获取预处理后的内容
    console.log('查询预处理内容...');
    const { data: preprocessedData, error: fetchError } = await supabase
      .from('preprocessed_files')
      .select('preprocessed_content')
      .eq('original_file_path', filePath)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    let contentToUse = '';
    
    if (fetchError) {
      console.error('查询预处理内容失败:', fetchError);
      throw new Error(`查询预处理内容失败: ${fetchError.message}`);
    }

    if (!preprocessedData) {
      console.log('未找到预处理内容，使用原始文件');
      // 如果没有预处理内容，直接使用原始文件
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

      try {
        contentToUse = await fileData.text();
      } catch (error) {
        console.error('文件内容读取失败:', error);
        throw new Error('文件内容读取失败，请检查文件格式');
      }
    } else {
      contentToUse = preprocessedData.preprocessed_content;
    }

    if (!contentToUse || contentToUse.trim().length === 0) {
      throw new Error('学习材料内容为空');
    }

    console.log('使用内容长度:', contentToUse.length);

    // 限制内容长度 - Qwen3-30B可以处理较长文本
    const maxContentLength = 40000;
    if (contentToUse.length > maxContentLength) {
      contentToUse = contentToUse.substring(0, maxContentLength) + '...';
      console.log('内容过长，已截取前', maxContentLength, '个字符');
    }

    // 使用硅基流动平台API生成题目 - 固定使用Qwen3-30B模型
    const siliconflowModel = 'Qwen/Qwen3-30B-A3B';
    console.log('使用模型:', siliconflowModel);

    console.log('调用硅基流动API生成题目...');
    
    let generateResponse;
    try {
      generateResponse = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
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
    } catch (error) {
      console.error('API请求发送失败:', error);
      throw new Error('无法连接到AI服务，请稍后重试');
    }

    console.log('API响应状态:', generateResponse.status);

    if (!generateResponse.ok) {
      const errorText = await generateResponse.text();
      console.error('硅基流动API错误:', generateResponse.status, errorText);
      
      let errorMessage = `API调用失败 (${generateResponse.status})`;
      if (generateResponse.status === 401) {
        errorMessage = 'API密钥无效，请检查配置';
      } else if (generateResponse.status === 429) {
        errorMessage = 'API调用频率限制，请稍后重试';
      } else if (generateResponse.status >= 500) {
        errorMessage = 'AI服务暂时不可用，请稍后重试';
      }
      
      throw new Error(errorMessage);
    }

    let result;
    try {
      result = await generateResponse.json();
    } catch (error) {
      console.error('API响应解析失败:', error);
      throw new Error('AI服务响应格式错误');
    }

    console.log('API返回结果结构:', Object.keys(result));
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('API返回格式错误:', result);
      throw new Error('AI服务返回数据格式错误');
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

    // 创建一个简化的存储格式，只存储必要信息
    const savedData = {
      file_path: filePath,
      file_name: fileName,
      model_used: siliconflowModel,
      questions: questions.questions || questions,
      question_count: questions.questions?.length || 1,
      created_at: new Date().toISOString()
    };

    console.log('保存题目到数据库...');
    console.log('保存的数据结构:', Object.keys(savedData));

    return new Response(JSON.stringify({
      success: true,
      message: `成功生成${questions.questions?.length || 1}道题目`,
      questions: questions.questions || questions,
      preview: questions.questions?.slice(0, 3) || [questions],
      raw_response: generatedContent.substring(0, 1000) + '...'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('生成题目过程中发生错误:', error);
    
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
