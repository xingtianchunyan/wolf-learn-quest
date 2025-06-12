
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Upload, File, Database, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import QuestionBankDialog from './QuestionBankDialog';

interface QuestionBankPanelProps {
  className?: string;
}

interface UploadedFile {
  name: string;
  path: string;
  created_at: string;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 获取已上传的文件列表
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      console.log('获取文件列表...');
      const { data, error } = await supabase.storage
        .from('question-files')
        .list('uploads', { limit: 100 });

      if (error) {
        console.error('Error fetching files:', error);
        setError(`获取文件列表失败: ${error.message}`);
        return;
      }

      const files: UploadedFile[] = data?.map(file => ({
        name: file.name,
        path: `uploads/${file.name}`,
        created_at: file.created_at
      })) || [];

      setUploadedFiles(files);
      console.log('文件列表获取成功:', files.length, '个文件');
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      setError('获取文件列表时发生错误');
    }
  };

  const clearError = () => {
    setError('');
  };

  // 改进的文件名清理函数
  const sanitizeFileName = (fileName: string): string => {
    // 获取文件扩展名
    const lastDotIndex = fileName.lastIndexOf('.');
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
    const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
    
    // 清理文件名主体部分
    const cleanName = name
      .replace(/[^\w\s.-]/g, '') // 移除特殊字符，保留字母、数字、空格、点、横线
      .replace(/\s+/g, '_') // 空格替换为下划线
      .replace(/_{2,}/g, '_') // 多个下划线替换为单个
      .replace(/[.-]+/g, '_') // 点和横线也替换为下划线
      .trim()
      .substring(0, 50); // 限制长度
    
    // 如果清理后的名称为空，使用默认名称
    const finalName = cleanName || 'file';
    
    return `${finalName}${extension}`;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    clearError();

    // 检查文件格式
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

    // 检查文件大小 (10MB)
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

    setIsUploading(true);
    setStatus('文件上传中...');

    try {
      // 使用改进的文件名清理
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

      console.log('文件上传成功:', data);
      toast({
        title: '上传成功',
        description: `文件 "${originalName}" 已成功上传`,
      });

      // 刷新文件列表
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

    clearError();
    setIsProcessing(true);
    setStatus('使用QwenLong模型预处理文件中...');

    try {
      console.log('调用预处理API:', selectedFile);
      
      // 使用更详细的错误处理
      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFile,
          fileName: uploadedFiles.find(f => f.path === selectedFile)?.name || 'unknown'
        }
      });

      console.log('预处理API响应:', data, error);

      if (error) {
        console.error('Function invoke error:', error);
        let errorMessage = `API调用失败: ${error.message}`;
        if (error.message.includes('Failed to send a request')) {
          errorMessage = '无法连接到AI处理服务，请稍后重试';
        } else if (error.message.includes('network')) {
          errorMessage = '网络连接错误，请检查网络后重试';
        }
        throw new Error(errorMessage);
      }

      if (!data || !data.success) {
        const errorMsg = data?.error || '预处理失败，请重试';
        console.error('预处理失败:', errorMsg);
        throw new Error(errorMsg);
      }

      toast({
        title: '预处理完成',
        description: `文件已通过QwenLong模型成功预处理为结构化格式`,
      });

      console.log('预处理结果:', data);
      
    } catch (error) {
      console.error('Error preprocessing file:', error);
      const errorMsg = error instanceof Error ? error.message : '文件预处理失败';
      setError(`预处理失败: ${errorMsg}`);
      toast({
        title: '预处理失败',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setStatus('');
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedFile) {
      const errorMsg = '请选择文件';
      setError(errorMsg);
      toast({
        title: '请选择文件',
        description: errorMsg,
        variant: 'destructive',
      });
      return;
    }

    clearError();
    setIsGenerating(true);
    setStatus('使用Qwen3-30B模型生成题目中...');

    try {
      console.log('调用生成题目API:', { selectedFile });
      
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          filePath: selectedFile,
          fileName: uploadedFiles.find(f => f.path === selectedFile)?.name || 'unknown',
          questionCount: 18
        }
      });

      console.log('生成题目API响应:', data, error);

      if (error) {
        console.error('Function invoke error:', error);
        let errorMessage = `API调用失败: ${error.message}`;
        if (error.message.includes('Failed to send a request')) {
          errorMessage = '无法连接到AI生成服务，请稍后重试';
        } else if (error.message.includes('network')) {
          errorMessage = '网络连接错误，请检查网络后重试';
        }
        throw new Error(errorMessage);
      }

      if (!data || !data.success) {
        const errorMsg = data?.error || '题目生成失败';
        console.error('生成失败:', errorMsg);
        throw new Error(errorMsg);
      }

      toast({
        title: '生成完成',
        description: `已通过Qwen3-30B成功生成${data.questions?.length || 0}道题目`,
      });

      console.log('生成结果:', data);
      
    } catch (error) {
      console.error('Error generating questions:', error);
      const errorMsg = error instanceof Error ? error.message : '题目生成失败';
      setError(`生成失败: ${errorMsg}`);
      toast({
        title: '生成失败',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  return (
    <>
      <Card className={`bg-werewolf-dark/40 border-werewolf-purple/30 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-werewolf-purple flex items-center text-lg">
            <BookOpen className="mr-2 h-5 w-5" />
            题库管理 (硅基流动AI)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
          <div className="space-y-4 h-full flex flex-col">
            {/* 错误提示 */}
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

            {/* 文件上传区域 */}
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
                      <SelectItem key={file.path} value={file.path}>
                        <div className="flex items-center">
                          <File className="mr-2 h-4 w-4" />
                          {file.name}
                        </div>
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            {/* AI操作按钮 */}
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
                  disabled={isGenerating || !selectedFile}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? '生成中...' : 'AI生成题目'}
                </Button>
              </div>
            </div>

            {/* 状态显示 */}
            {status && (
              <div className="flex items-center justify-center p-4 bg-werewolf-dark/20 rounded-md">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-werewolf-purple" />
                <span className="text-werewolf-purple text-sm">{status}</span>
              </div>
            )}

            {/* 打开题库按钮 */}
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
        </CardContent>
      </Card>

      {/* 题库弹窗 */}
      <QuestionBankDialog
        isOpen={showQuestionBank}
        onClose={() => setShowQuestionBank(false)}
        roomId="current-room"
      />
    </>
  );
};

export default QuestionBankPanel;
