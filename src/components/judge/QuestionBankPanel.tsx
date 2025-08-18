import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Upload, File, Database, Sparkles, Loader2, AlertCircle, CheckCircle, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useJudgePage } from '@/contexts/JudgePageContext';
import QuestionBankDialog from './QuestionBankDialog';
import QuestionBankTooltip from './QuestionBankTooltip';
import ManualQuestionEditor from './ManualQuestionEditor';
import { ManualQuestionForm } from './types/questionBank';

interface QuestionBankPanelProps {
  roomId?: string;
  className?: string;
}

interface UploadedFile {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  is_preprocessed?: boolean;
  is_generated?: boolean;
}

interface PreprocessedFile {
  id: string;
  file_name: string;
  original_file_path: string;
  created_at: string;
  model_used: string;
  is_generated?: boolean;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ roomId, className }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedPreprocessedFile, setSelectedPreprocessedFile] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [preprocessedFiles, setPreprocessedFiles] = useState<PreprocessedFile[]>([]);
  const [status, setStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [error, setError] = useState<string>('');
  const [manualQuestion, setManualQuestion] = useState<ManualQuestionForm>({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 1,
    difficulty: 3,
    explanation: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { refreshLinkedQuestions } = useJudgePage();

  useEffect(() => {
    fetchUploadedFiles();
    fetchPreprocessedFiles();
    
    // 设置实时监听 preprocessed_files 表的变化
    const preprocessedChannel = supabase
      .channel('preprocessed-files-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'preprocessed_files'
        },
        (payload) => {
          console.log('检测到新的预处理文件:', payload);
          toast({
            title: '预处理完成',
            description: '文件预处理已完成，页面数据已更新',
          });
          fetchPreprocessedFiles();
          fetchUploadedFiles();
          // 停止预处理状态
          setIsProcessing(false);
          setStatus('');
        }
      )
      .subscribe();

    // 设置实时监听 generated_questions 表的变化
    const generatedChannel = supabase
      .channel('generated-questions-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'generated_questions'
        },
        (payload) => {
          console.log('检测到新的生成题目:', payload);
          toast({
            title: '题目生成完成',
            description: 'AI题目生成已完成，页面数据已更新',
          });
          fetchPreprocessedFiles();
          fetchUploadedFiles();
          // 停止生成状态
          setIsGenerating(false);
          setStatus('');
          clearError(); // 清除可能的错误提示
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(preprocessedChannel);
      supabase.removeChannel(generatedChannel);
    };
  }, [toast]);

  const fetchUploadedFiles = async () => {
    try {
      console.log('获取文件列表...');
      
      // 获取已上传的文件
      const { data: uploadedData, error: uploadedError } = await supabase
        .from('uploaded_files')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (uploadedError) {
        console.error('Error fetching uploaded files:', uploadedError);
        setError(`获取文件列表失败: ${uploadedError.message}`);
        return;
      }

      // 检查哪些文件已经预处理过
      const { data: preprocessedData } = await supabase
        .from('preprocessed_files')
        .select('original_file_path');

      // 检查哪些文件已经生成过题目
      const { data: generatedData } = await supabase
        .from('generated_questions')
        .select('original_file_path');

      const preprocessedPaths = new Set(preprocessedData?.map(p => p.original_file_path) || []);
      const generatedPaths = new Set(generatedData?.map(g => g.original_file_path) || []);

      const filesWithStatus = (uploadedData || []).map(file => ({
        ...file,
        is_preprocessed: preprocessedPaths.has(file.file_path),
        is_generated: generatedPaths.has(file.file_path)
      }));

      setUploadedFiles(filesWithStatus);
      console.log('文件列表获取成功:', filesWithStatus.length, '个文件');
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      setError('获取文件列表时发生错误');
    }
  };

  const fetchPreprocessedFiles = async () => {
    try {
      console.log('获取预处理文件列表...');
      
      const { data: preprocessedData, error } = await supabase
        .from('preprocessed_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching preprocessed files:', error);
        setError(`获取预处理文件列表失败: ${error.message}`);
        return;
      }

      // 检查哪些预处理文件已经生成过题目
      const { data: generatedData } = await supabase
        .from('generated_questions')
        .select('original_file_path');

      const generatedPaths = new Set(generatedData?.map(g => g.original_file_path) || []);

      const filesWithStatus = (preprocessedData || []).map(file => ({
        ...file,
        is_generated: generatedPaths.has(file.original_file_path)
      }));

      setPreprocessedFiles(filesWithStatus);
      console.log('预处理文件列表获取成功:', filesWithStatus.length, '个文件');
    } catch (error) {
      console.error('Error fetching preprocessed files:', error);
      setError('获取预处理文件列表时发生错误');
    }
  };

  const handleManualQuestionSubmit = async () => {
    if (!roomId) {
      setError('房间ID不存在');
      toast({
        title: '无法保存题目',
        description: '房间ID不存在',
        variant: 'destructive',
      });
      return;
    }

    if (!manualQuestion.question.trim() || !manualQuestion.option_a.trim() || !manualQuestion.option_b.trim()) {
      setError('请填写题目和至少两个选项');
      toast({
        title: '请完整填写题目',
        description: '题目内容、选项A和选项B是必填项',
        variant: 'destructive',
      });
      return;
    }

    clearError();

    try {
      console.log('开始保存手动题目:', manualQuestion);
      
      // 插入题目到questions表
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
          question: manualQuestion.question,
          option_a: manualQuestion.option_a,
          option_b: manualQuestion.option_b,
          option_c: manualQuestion.option_c || '',
          option_d: manualQuestion.option_d || '',
          correct_option: manualQuestion.correct_option,
          difficulty: manualQuestion.difficulty,
          explanation: manualQuestion.explanation || null,
          category: 'manual'
        })
        .select()
        .single();

      if (questionError) {
        console.error('保存题目失败:', questionError);
        throw questionError;
      }

      console.log('题目保存成功:', questionData);

      // 获取当前房间题目的最大order
      const { data: existingQuestions } = await supabase
        .from('room_questions')
        .select('question_order')
        .eq('room_id', roomId)
        .order('question_order', { ascending: false })
        .limit(1);

      const nextOrder = existingQuestions && existingQuestions.length > 0 
        ? existingQuestions[0].question_order + 1 
        : 1;

      // 将题目关联到房间
      const { error: roomQuestionError } = await supabase
        .from('room_questions')
        .insert({
          room_id: roomId,
          question_id: questionData.id,
          question_order: nextOrder
        });

      if (roomQuestionError) {
        console.error('关联题目到房间失败:', roomQuestionError);
        throw roomQuestionError;
      }

      console.log('题目关联到房间成功');

      toast({
        title: '题目保存成功',
        description: '手动编辑的题目已成功保存到房间',
      });

      // 重置表单
      setManualQuestion({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 1,
        difficulty: 3,
        explanation: ''
      });

      // 刷新题库
      await refreshLinkedQuestions();

    } catch (error) {
      console.error('保存题目时发生错误:', error);
      const errorMsg = error instanceof Error ? error.message : '保存题目失败';
      setError(`保存失败: ${errorMsg}`);
      toast({
        title: '保存失败',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  };
  const clearError = () => {
    setError('');
  };

  const sanitizeFileName = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
    const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
    
    const cleanName = name
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/[.-]+/g, '_')
      .trim()
      .substring(0, 50);
    
    const finalName = cleanName || 'file';
    return `${finalName}${extension}`;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    clearError();

    const allowedFormats = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pptx', '.md'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedFormats.includes(fileExtension)) {
      const errorMsg = '请上传 TXT、DOC、DOCX、XLS、XLSX、PPTX 或 MD 格式的文件';
      setError(errorMsg);
      toast({
        title: '文件格式不支持',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = '文件大小不能超过10MB';
      setError(errorMsg);
      toast({
        title: '文件过大',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    // 检查是否已经上传过同名文件
    const existingFile = uploadedFiles.find(f => f.file_name === file.name);
    if (existingFile) {
      const errorMsg = '该文件已经上传过了';
      setError(errorMsg);
      toast({
        title: '文件重复',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setStatus('文件上传中...');

    try {
      const originalName = file.name;
      const sanitizedName = sanitizeFileName(originalName);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${sanitizedName}`;
      
      console.log('原始文件名:', originalName);
      console.log('清理后文件名:', fileName);
      
      const { data, error } = await supabase.storage
        .from('question-files')
        .upload(`uploads/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`上传失败: ${error.message}`);
      }

      // 将文件信息保存到数据库
      const { error: dbError } = await supabase
        .from('uploaded_files')
        .insert({
          file_name: originalName,
          file_path: `uploads/${fileName}`
        });

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`保存文件信息失败: ${dbError.message}`);
      }

      console.log('文件上传成功:', data);
      toast({
        title: '上传成功',
        description: `文件 "${originalName}" 已成功上传`,
      });

      await fetchUploadedFiles();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMsg = error instanceof Error ? error.message : '文件上传失败';
      setError(errorMsg);
      toast({
        title: '上传失败',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setStatus('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePreprocessFile = async () => {
    if (!selectedFile) {
      const errorMsg = '请先选择要预处理的文件';
      setError(errorMsg);
      toast({
        title: '请选择文件',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    // 防止重复处理
    if (isProcessing) {
      console.log('正在处理中，忽略重复请求');
      return;
    }

    clearError();
    setIsProcessing(true);
    setStatus('使用Qwen2.5-72B模型预处理文件中...');

    try {
      const selectedFileData = uploadedFiles.find(f => f.id === selectedFile);
      if (!selectedFileData) {
        throw new Error('选择的文件不存在');
      }

      console.log('调用预处理API:', selectedFileData);
      
      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFileData.file_path,
          fileName: selectedFileData.file_name,
          roomId: 'current-room'
        }
      });

      console.log('预处理API响应:', data, error);

      if (error) {
        console.error('Function invoke error:', error);
        throw new Error(`API调用失败: ${error.message}`);
      }

      if (!data || !data.success) {
        const errorMsg = data?.error || '预处理失败，请重试';
        console.error('预处理失败:', errorMsg);
        throw new Error(errorMsg);
      }

      // 不要立即设置成功状态，等待实时监听来处理
      console.log('预处理请求已发送，等待数据库更新...');
      
    } catch (error) {
      console.error('Error preprocessing file:', error);
      const errorMsg = error instanceof Error ? error.message : '文件预处理失败';
      setError(`预处理失败: ${errorMsg}`);
      toast({
        title: '预处理失败',
        description: errorMsg,
        variant: 'destructive',
      });
      setIsProcessing(false);
      setStatus('');
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedPreprocessedFile) {
      const errorMsg = '请选择已预处理的文件';
      setError(errorMsg);
      toast({
        title: '请选择已预处理文件',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    // 防止重复生成
    if (isGenerating) {
      console.log('正在生成中，忽略重复请求');
      return;
    }

    clearError();
    setIsGenerating(true);
    setStatus('使用Qwen2.5-72B模型生成题目中...');

    try {
      console.log('调用生成题目API:', { selectedPreprocessedFile });
      
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          preprocessedId: selectedPreprocessedFile,
          questionCount: 18,
          roomId: 'current-room'
        }
      });

      console.log('生成题目API响应:', data, error);

      if (error) {
        console.error('Function invoke error:', error);
        // 不立即抛出错误，先等待实时监听检测数据库变化
        console.log('API调用可能失败，但等待数据库实时更新检测...');
        
        // 设置一个超时，如果30秒内没有检测到数据库更新，则显示错误
        setTimeout(() => {
          if (isGenerating) {
            setIsGenerating(false);
            setStatus('');
            const errorMsg = `API调用失败: ${error.message}`;
            setError(`生成失败: ${errorMsg}`);
            toast({
              title: '生成失败',
              description: errorMsg,
              variant: 'destructive',
            });
          }
        }, 30000);
        
        return; // 不立即返回错误，等待实时监听
      }

      if (!data || !data.success) {
        const errorMsg = data?.error || '题目生成失败';
        console.error('生成失败:', errorMsg);
        
        // 同样不立即抛出错误，等待实时监听
        setTimeout(() => {
          if (isGenerating) {
            setIsGenerating(false);
            setStatus('');
            setError(`生成失败: ${errorMsg}`);
            toast({
              title: '生成失败',
              description: errorMsg,
              variant: 'destructive',
            });
          }
        }, 30000);
        
        return;
      }

      // 请求成功，但仍然等待实时监听来确认数据库更新
      console.log('生成题目请求已发送，等待数据库更新...');
      
    } catch (error) {
      console.error('Error generating questions:', error);
      const errorMsg = error instanceof Error ? error.message : '题目生成失败';
      setError(`生成失败: ${errorMsg}`);
      toast({
        title: '生成失败',
        description: errorMsg,
        variant: 'destructive',
      });
      setIsGenerating(false);
      setStatus('');
    }
  };

  return (
    <>
      <Card className={`bg-werewolf-dark/40 border-werewolf-purple/30 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              题库管理 (硅基流动AI)
            </div>
            <QuestionBankTooltip />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
          <Tabs defaultValue="ai" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI生成题目
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                手动编辑题目
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="flex-1 mt-4">
              <div className="space-y-4 h-full flex flex-col">
                {error && (
                  <div className="flex items-center p-3 bg-red-900/20 border border-red-500/30 rounded-md">
                    <AlertCircle className="mr-2 h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                    <Button
                      onClick={clearError}
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      ×
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-werewolf-purple hover:bg-werewolf-light text-white flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? '上传中...' : '上传文件'}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.doc,.docx,.xls,.xlsx,.pptx,.md"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </div>

                  <Select value={selectedFile} onValueChange={setSelectedFile}>
                    <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30">
                      <SelectValue placeholder="选择已上传文件" />
                    </SelectTrigger>
                    <SelectContent className="bg-werewolf-dark border-werewolf-purple/30 max-h-40">
                      <ScrollArea className="h-full">
                        {uploadedFiles.map((file) => (
                          <SelectItem key={file.id} value={file.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <File className="mr-2 h-4 w-4" />
                                {file.file_name}
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                {file.is_preprocessed && (
                                  <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded">
                                    <CheckCircle className="inline-block w-3 h-3 mr-1" />
                                    已预处理
                                  </span>
                                )}
                                {file.is_generated && (
                                  <span className="text-blue-400 text-xs bg-blue-900/20 px-2 py-1 rounded">
                                    <Sparkles className="inline-block w-3 h-3 mr-1" />
                                    已生成题目
                                  </span>
                                )}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePreprocessFile}
                      disabled={isProcessing || !selectedFile}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      {isProcessing ? '处理中...' : 'AI预处理'}
                    </Button>

                    <Button
                      onClick={handleGenerateQuestions}
                      disabled={isGenerating || !selectedPreprocessedFile}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isGenerating ? '生成中...' : 'AI生成题目'}
                    </Button>
                  </div>

                  <Select value={selectedPreprocessedFile} onValueChange={setSelectedPreprocessedFile}>
                    <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30">
                      <SelectValue placeholder="选择已预处理文件" />
                    </SelectTrigger>
                    <SelectContent className="bg-werewolf-dark border-werewolf-purple/30 max-h-40">
                      <ScrollArea className="h-full">
                        {preprocessedFiles.map((file) => (
                          <SelectItem key={file.id} value={file.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <Database className="mr-2 h-4 w-4" />
                                <div className="flex flex-col">
                                  <span>{file.file_name}</span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(file.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              {file.is_generated && (
                                <span className="text-blue-400 text-xs bg-blue-900/20 px-2 py-1 rounded ml-4">
                                  <Sparkles className="inline-block w-3 h-3 mr-1" />
                                  已生成题目
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                {status && (
                  <div className="flex items-center justify-center p-4 bg-werewolf-dark/20 rounded-md">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-werewolf-purple" />
                    <span className="text-werewolf-purple text-sm">{status}</span>
                  </div>
                )}

                <div className="mt-auto">
                  <Button
                    onClick={() => setShowQuestionBank(true)}
                    className="w-full bg-werewolf-purple hover:bg-werewolf-light text-white"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    打开题库
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manual" className="flex-1 mt-4">
              <ManualQuestionEditor
                manualQuestion={manualQuestion}
                onUpdateQuestion={(updates) => setManualQuestion(prev => ({ ...prev, ...updates }))}
                onSubmit={handleManualQuestionSubmit}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <QuestionBankDialog
        isOpen={showQuestionBank}
        onClose={() => setShowQuestionBank(false)}
        roomId={roomId || 'current-room'}
      />
    </>
  );
};

export default QuestionBankPanel;
