
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Brain, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';

interface QuestionBankPanelProps {
  className?: string;
}

interface PreprocessedFile {
  id: string;
  file_name: string;
  original_file_path: string;
  created_at: string;
  preprocessed_content: string;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ className = '' }) => {
  const { id: roomId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [preprocessedFiles, setPreprocessedFiles] = useState<PreprocessedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedPreprocessedFile, setSelectedPreprocessedFile] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(18);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 获取已上传文件
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      if (!roomId) return;
      
      try {
        const { data, error } = await supabase.storage
          .from('question-files')
          .list('', { limit: 100 });
        
        if (error) throw error;
        setUploadedFiles(data || []);
      } catch (error) {
        console.error('获取文件列表失败:', error);
      }
    };

    fetchUploadedFiles();
  }, [roomId]);

  // 获取已预处理文件
  useEffect(() => {
    const fetchPreprocessedFiles = async () => {
      try {
        const { data, error } = await supabase
          .from('preprocessed_files')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setPreprocessedFiles(data || []);
      } catch (error) {
        console.error('获取预处理文件失败:', error);
      }
    };

    fetchPreprocessedFiles();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !roomId) return;

    setIsUploading(true);
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('question-files')
        .upload(fileName, file);

      if (error) throw error;

      toast({
        title: '文件上传成功',
        description: `文件 ${file.name} 已成功上传`,
      });

      // 刷新文件列表
      const { data: files } = await supabase.storage
        .from('question-files')
        .list('', { limit: 100 });
      
      setUploadedFiles(files || []);
      setSelectedFile(fileName);
      
    } catch (error) {
      console.error('文件上传失败:', error);
      toast({
        title: '上传失败',
        description: '文件上传过程中出现错误',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePreprocessFile = async () => {
    if (!selectedFile || !roomId) {
      toast({
        title: '请选择文件',
        description: '请先选择要预处理的文件',
        variant: 'destructive',
      });
      return;
    }

    setIsPreprocessing(true);
    setProcessingStatus('正在使用 Tongyi-Zhiwen/QwenLong-L1-32B 模型预处理文件...');

    try {
      console.log('开始预处理文件:', { filePath: selectedFile, roomId });
      
      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFile,
          fileName: selectedFile,
          roomId: roomId
        }
      });

      console.log('预处理响应:', data, error);

      if (error) {
        console.error('预处理调用失败:', error);
        throw new Error(error.message || '预处理功能调用失败');
      }

      if (!data?.success) {
        throw new Error(data?.error || '预处理失败');
      }

      toast({
        title: '预处理完成',
        description: data.message || '文件预处理成功完成',
      });

      setProcessingStatus('预处理完成');
      
      // 刷新预处理文件列表
      const { data: preprocessedData } = await supabase
        .from('preprocessed_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      setPreprocessedFiles(preprocessedData || []);

    } catch (error) {
      console.error('预处理失败:', error);
      const errorMessage = error instanceof Error ? error.message : '预处理过程中出现未知错误';
      
      toast({
        title: '预处理失败',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setProcessingStatus('预处理失败');
    } finally {
      setIsPreprocessing(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedPreprocessedFile || !roomId) {
      toast({
        title: '请选择预处理文件',
        description: '请先选择一个已预处理的文件来生成题目',
        variant: 'destructive',
      });
      return;
    }

    // 获取选中的预处理文件信息
    const selectedPreprocessed = preprocessedFiles.find(f => f.id === selectedPreprocessedFile);
    if (!selectedPreprocessed) {
      toast({
        title: '文件不存在',
        description: '选中的预处理文件不存在',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProcessingStatus('正在使用 Qwen/Qwen3-30B-A3B 模型生成题目...');

    try {
      console.log('开始生成题目:', { 
        filePath: selectedPreprocessed.original_file_path, 
        fileName: selectedPreprocessed.file_name,
        questionCount 
      });
      
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          filePath: selectedPreprocessed.original_file_path,
          fileName: selectedPreprocessed.file_name,
          questionCount: questionCount
        }
      });

      console.log('生成题目响应:', data, error);

      if (error) {
        console.error('题目生成调用失败:', error);
        throw new Error(error.message || '题目生成功能调用失败');
      }

      if (!data?.success) {
        throw new Error(data?.error || '题目生成失败');
      }

      toast({
        title: '题目生成完成',
        description: data.message || `成功生成${questionCount}道题目`,
      });

      setProcessingStatus('题目生成完成');

    } catch (error) {
      console.error('题目生成失败:', error);
      const errorMessage = error instanceof Error ? error.message : '题目生成过程中出现未知错误';
      
      toast({
        title: '题目生成失败',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setProcessingStatus('题目生成失败');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-werewolf-purple flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          题库管理
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {/* 文件上传区域 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-werewolf-purple">上传学习材料</h3>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.md,.pdf,.doc,.docx"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-werewolf-purple hover:bg-werewolf-light"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {isUploading ? '上传中...' : '选择文件'}
                </Button>
              </div>
            </div>

            {/* 已上传文件选择 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-werewolf-purple">选择上传文件</h3>
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger className="bg-werewolf-dark/40 border-werewolf-purple/30">
                  <SelectValue placeholder="选择要预处理的文件" />
                </SelectTrigger>
                <SelectContent>
                  {uploadedFiles.map((file) => (
                    <SelectItem key={file.name} value={file.name}>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        {file.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 预处理按钮 */}
            <Button
              onClick={handlePreprocessFile}
              disabled={!selectedFile || isPreprocessing}
              className="w-full bg-werewolf-purple hover:bg-werewolf-light"
            >
              {isPreprocessing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isPreprocessing ? '预处理中...' : '预处理文件'}
            </Button>

            {/* 已预处理文件选择 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-werewolf-purple">已预处理文件</h3>
              <Select value={selectedPreprocessedFile} onValueChange={setSelectedPreprocessedFile}>
                <SelectTrigger className="bg-werewolf-dark/40 border-werewolf-purple/30">
                  <SelectValue placeholder="选择已预处理的文件" />
                </SelectTrigger>
                <SelectContent>
                  {preprocessedFiles.map((file) => (
                    <SelectItem key={file.id} value={file.id}>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <div className="flex flex-col">
                          <span>{file.file_name}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(file.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 题目数量设置 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-werewolf-purple">题目数量</h3>
              <Input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 18)}
                min="1"
                max="50"
                className="bg-werewolf-dark/40 border-werewolf-purple/30"
              />
            </div>

            {/* 生成题目按钮 */}
            <Button
              onClick={handleGenerateQuestions}
              disabled={!selectedPreprocessedFile || isGenerating}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? '生成中...' : `生成${questionCount}道题目`}
            </Button>

            {/* 处理状态显示 */}
            {processingStatus && (
              <div className="p-3 bg-werewolf-dark/40 rounded-md">
                <div className="flex items-center">
                  {isPreprocessing || isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2 text-blue-400" />
                  ) : processingStatus.includes('失败') ? (
                    <AlertCircle className="h-4 w-4 mr-2 text-red-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  )}
                  <p className="text-sm text-gray-300">{processingStatus}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionBankPanel;
