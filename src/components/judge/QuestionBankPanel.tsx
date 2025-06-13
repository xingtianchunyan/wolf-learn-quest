import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Database, FileText, Brain, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QuestionBankDialog from './QuestionBankDialog';
import QuestionBankTooltip from './QuestionBankTooltip';

interface UploadedFile {
  path: string;
  name: string;
  uploadedAt: string;
}

interface PreprocessedFile {
  id: string;
  fileName: string;
  originalPath: string;
  preprocessedAt: string;
}

interface QuestionBankPanelProps {
  roomId?: string;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ roomId = 'default-room' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [preprocessedFiles, setPreprocessedFiles] = useState<PreprocessedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [selectedPreprocessed, setSelectedPreprocessed] = useState<PreprocessedFile | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // 文件上传处理
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/markdown'];
    const allowedExtensions = ['.docx', '.txt', '.md'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast({
        title: '文件格式错误',
        description: '请上传 DOCX、TXT 或 MD 格式的文件',
        variant: 'destructive',
      });
      return;
    }

    // 检查文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: '文件过大',
        description: '文件大小不能超过10MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('question-files')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const newFile: UploadedFile = {
        path: fileName,
        name: file.name,
        uploadedAt: new Date().toISOString(),
      };

      setUploadedFiles(prev => [newFile, ...prev]);
      toast({
        title: '文件上传成功',
        description: `${file.name} 已成功上传`,
      });
    } catch (error) {
      console.error('文件上传失败:', error);
      toast({
        title: '上传失败',
        description: '文件上传过程中出现错误',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  // 预处理文件
  const handlePreprocess = async () => {
    if (!selectedFile) {
      toast({
        title: '请选择文件',
        description: '请先选择要预处理的文件',
        variant: 'destructive',
      });
      return;
    }

    setIsPreprocessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFile.path,
          fileName: selectedFile.name,
        },
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || '预处理失败');
      }

      // 刷新预处理文件列表
      await loadPreprocessedFiles();
      
      toast({
        title: '预处理完成',
        description: '文件预处理已完成，可以进行题目生成',
      });
    } catch (error) {
      console.error('预处理失败:', error);
      toast({
        title: '预处理失败',
        description: error.message || '文件预处理过程中出现错误',
        variant: 'destructive',
      });
    } finally {
      setIsPreprocessing(false);
    }
  };

  // 生成题目
  const handleGenerateQuestions = async () => {
    if (!selectedPreprocessed) {
      toast({
        title: '请选择预处理文件',
        description: '请先选择已预处理的文件',
        variant: 'destructive',
      });
      return;
    }

    if (questionCount < 1 || questionCount > 50) {
      toast({
        title: '题目数量错误',
        description: '题目数量应该在1-50之间',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          preprocessedId: selectedPreprocessed.id,
          questionCount: questionCount,
          roomId: roomId,
        },
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || '生成失败');
      }

      toast({
        title: '题目生成完成',
        description: `成功生成 ${data.question_count} 道题目`,
      });
    } catch (error) {
      console.error('生成题目失败:', error);
      toast({
        title: '生成失败',
        description: error.message || '题目生成过程中出现错误',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // 加载预处理文件列表
  const loadPreprocessedFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('preprocessed_files')
        .select('id, file_name, original_file_path, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const files: PreprocessedFile[] = data.map(item => ({
        id: item.id,
        fileName: item.file_name,
        originalPath: item.original_file_path,
        preprocessedAt: item.created_at || '',
      }));

      setPreprocessedFiles(files);
    } catch (error) {
      console.error('加载预处理文件失败:', error);
    }
  };

  // 组件挂载时加载预处理文件
  React.useEffect(() => {
    loadPreprocessedFiles();
  }, []);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple flex items-center">
          题库管理
          <QuestionBankTooltip />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 文件上传 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">1. 上传文件</label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept=".docx,.txt,.md"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="flex-1"
            />
            <Button disabled={isUploading} size="sm">
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 已上传文件列表 */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">2. 选择文件进行预处理</label>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`p-2 rounded cursor-pointer text-sm ${
                    selectedFile?.path === file.path
                      ? 'bg-werewolf-purple/20 border border-werewolf-purple'
                      : 'bg-werewolf-dark/20 hover:bg-werewolf-dark/30'
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <FileText className="inline h-3 w-3 mr-1" />
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 预处理按钮 */}
        {selectedFile && (
          <Button
            onClick={handlePreprocess}
            disabled={isPreprocessing}
            className="w-full"
            variant="outline"
          >
            {isPreprocessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                AI预处理中...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                3. AI预处理文件
              </>
            )}
          </Button>
        )}

        {/* 预处理文件列表 */}
        {preprocessedFiles.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">4. 选择预处理文件</label>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {preprocessedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`p-2 rounded cursor-pointer text-sm ${
                    selectedPreprocessed?.id === file.id
                      ? 'bg-werewolf-purple/20 border border-werewolf-purple'
                      : 'bg-werewolf-dark/20 hover:bg-werewolf-dark/30'
                  }`}
                  onClick={() => setSelectedPreprocessed(file)}
                >
                  <Database className="inline h-3 w-3 mr-1" />
                  {file.fileName}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 题目生成 */}
        {selectedPreprocessed && (
          <div className="space-y-2">
            <label className="text-sm font-medium">5. 生成题目</label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                min={1}
                max={50}
                className="w-20"
              />
              <span className="text-sm">道题目</span>
              <Button
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    AI生成中...
                  </>
                ) : (
                  'AI生成题目'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* 打开题库 */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full"
          variant="default"
        >
          <Database className="h-4 w-4 mr-2" />
          6. 打开题库
        </Button>

        <QuestionBankDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          roomId={roomId}
        />
      </CardContent>
    </Card>
  );
};

export default QuestionBankPanel;
