
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Upload, File, Database, Sparkles, Loader2 } from 'lucide-react';
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
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 获取已上传的文件列表
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('question-files')
        .list('uploads', { limit: 100 });

      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      const files: UploadedFile[] = data?.map(file => ({
        name: file.name,
        path: `uploads/${file.name}`,
        created_at: file.created_at
      })) || [];

      setUploadedFiles(files);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件格式
    const allowedFormats = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pptx', '.md'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedFormats.includes(fileExtension)) {
      toast({
        title: '文件格式不支持',
        description: '请上传 TXT、DOC、DOCX、XLS、XLSX、PPTX 或 MD 格式的文件',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setStatus('文件上传中...');

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('question-files')
        .upload(`uploads/${fileName}`, file);

      if (error) {
        throw error;
      }

      toast({
        title: '上传成功',
        description: '文件已成功上传',
      });

      // 刷新文件列表
      await fetchUploadedFiles();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: '上传失败',
        description: '文件上传失败，请重试',
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
      toast({
        title: '请选择文件',
        description: '请先选择要预处理的文件',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setStatus('使用DeepSeek R1模型预处理文件中...');

    try {
      console.log('调用预处理API:', selectedFile);
      
      // 调用硅基流动平台API进行文件预处理
      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFile,
          fileName: uploadedFiles.find(f => f.path === selectedFile)?.name || 'unknown'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      toast({
        title: '预处理完成',
        description: `文件已通过DeepSeek R1模型成功预处理为结构化格式`,
      });

      console.log('预处理结果:', data);
      
    } catch (error) {
      console.error('Error preprocessing file:', error);
      toast({
        title: '预处理失败',
        description: `文件预处理失败: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setStatus('');
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedFile || !selectedModel) {
      toast({
        title: '请完善选择',
        description: '请选择文件和AI模型',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    const modelNames = {
      'deepseek-r1': 'DeepSeek R1',
      'qwen3-32b': 'Qwen2.5-32B'
    };
    setStatus(`使用${modelNames[selectedModel] || selectedModel}模型生成题目中...`);

    try {
      console.log('调用生成题目API:', { selectedFile, selectedModel });
      
      // 调用硅基流动平台API生成题目
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          filePath: selectedFile,
          fileName: uploadedFiles.find(f => f.path === selectedFile)?.name || 'unknown',
          model: selectedModel,
          questionCount: 18
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      toast({
        title: '生成完成',
        description: `已通过${modelNames[selectedModel]}成功生成${data.questions?.length || 0}道题目`,
      });

      console.log('生成结果:', data);
      
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: '生成失败',
        description: `题目生成失败: ${error.message}`,
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

            {/* 硅基流动AI模型选择和操作按钮 */}
            <div className="space-y-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30">
                  <SelectValue placeholder="选择硅基流动AI模型" />
                </SelectTrigger>
                <SelectContent className="bg-werewolf-dark border-werewolf-purple/30">
                  <SelectItem value="deepseek-r1">DeepSeek R1 (推理模型)</SelectItem>
                  <SelectItem value="qwen3-32b">Qwen2.5-32B (通用模型)</SelectItem>
                </SelectContent>
              </Select>

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
                  disabled={isGenerating || !selectedFile || !selectedModel}
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
        roomId="current-room" // TODO: 从props获取实际roomId
      />
    </>
  );
};

export default QuestionBankPanel;
