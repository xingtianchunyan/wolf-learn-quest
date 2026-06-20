import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Upload,
  File,
  Database,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useQuestionBank } from '@/hooks/useQuestionBank';
import QuestionBankDialog from './QuestionBankDialog';
import QuestionBankTooltip from './QuestionBankTooltip';

interface QuestionBankPanelProps {
  className?: string;
  roomId?: string;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({
  className,
  roomId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    uploadedFiles,
    preprocessedFiles,
    selectedFile,
    setSelectedFile,
    selectedPreprocessedFile,
    setSelectedPreprocessedFile,
    status,
    isUploading,
    isProcessing,
    isGenerating,
    showQuestionBank,
    setShowQuestionBank,
    error,
    clearError,
    handleFileUpload,
    handlePreprocessFile,
    handleGenerateQuestions,
  } = useQuestionBank(roomId);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFileUpload(file, () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  return (
    <>
      <Card
        className={`bg-werewolf-dark/40 border-werewolf-purple/30 ${className}`}
      >
        <CardHeader className='pb-3'>
          <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>
            <div className='flex items-center'>
              <BookOpen className='mr-2 h-5 w-5' />
              题库管理 (硅基流动AI)
            </div>
            <QuestionBankTooltip />
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4 pt-0 h-[calc(100%-80px)]'>
          <div className='space-y-4 h-full flex flex-col'>
            {error && (
              <div className='flex items-center p-3 bg-red-900/20 border border-red-500/30 rounded-md'>
                <AlertCircle className='mr-2 h-4 w-4 text-red-400' />
                <span className='text-red-400 text-sm'>{error}</span>
                <Button
                  onClick={clearError}
                  variant='ghost'
                  size='sm'
                  className='ml-auto h-6 w-6 p-0 text-red-400 hover:text-red-300'
                >
                  ×
                </Button>
              </div>
            )}

            <div className='space-y-3'>
              <div className='flex gap-2'>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className='bg-werewolf-purple hover:bg-werewolf-light text-white flex-1'
                >
                  <Upload className='mr-2 h-4 w-4' />
                  {isUploading ? '上传中...' : '上传文件'}
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='.txt,.doc,.docx,.xls,.xlsx,.pptx,.md'
                  onChange={onFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger className='bg-werewolf-dark border-werewolf-purple/30'>
                  <SelectValue placeholder='选择已上传文件' />
                </SelectTrigger>
                <SelectContent className='bg-werewolf-dark border-werewolf-purple/30 max-h-40'>
                  <ScrollArea className='h-full'>
                    {uploadedFiles.map(file => (
                      <SelectItem key={file.id} value={file.id}>
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center'>
                            <File className='mr-2 h-4 w-4' />
                            {file.file_name}
                          </div>
                          <div className='flex items-center space-x-2 ml-4'>
                            {file.is_preprocessed && (
                              <span className='text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded'>
                                <CheckCircle className='inline-block w-3 h-3 mr-1' />
                                已预处理
                              </span>
                            )}
                            {file.is_generated && (
                              <span className='text-blue-400 text-xs bg-blue-900/20 px-2 py-1 rounded'>
                                <Sparkles className='inline-block w-3 h-3 mr-1' />
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

            <div className='space-y-3'>
              <div className='flex gap-2'>
                <Button
                  onClick={handlePreprocessFile}
                  disabled={isProcessing || !selectedFile}
                  className='bg-blue-600 hover:bg-blue-700 text-white flex-1'
                >
                  <Database className='mr-2 h-4 w-4' />
                  {isProcessing ? '处理中...' : 'AI预处理'}
                </Button>

                <Button
                  onClick={handleGenerateQuestions}
                  disabled={isGenerating || !selectedPreprocessedFile}
                  className='bg-green-600 hover:bg-green-700 text-white flex-1'
                >
                  <Sparkles className='mr-2 h-4 w-4' />
                  {isGenerating ? '生成中...' : 'AI生成题目'}
                </Button>
              </div>

              <Select
                value={selectedPreprocessedFile}
                onValueChange={setSelectedPreprocessedFile}
              >
                <SelectTrigger className='bg-werewolf-dark border-werewolf-purple/30'>
                  <SelectValue placeholder='选择已预处理文件' />
                </SelectTrigger>
                <SelectContent className='bg-werewolf-dark border-werewolf-purple/30 max-h-40'>
                  <ScrollArea className='h-full'>
                    {preprocessedFiles.map(file => (
                      <SelectItem key={file.id} value={file.id}>
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center'>
                            <Database className='mr-2 h-4 w-4' />
                            <div className='flex flex-col'>
                              <span>{file.file_name}</span>
                              <span className='text-xs text-gray-400'>
                                {new Date(file.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          {file.is_generated && (
                            <span className='text-blue-400 text-xs bg-blue-900/20 px-2 py-1 rounded ml-4'>
                              <Sparkles className='inline-block w-3 h-3 mr-1' />
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
              <div className='flex items-center justify-center p-4 bg-werewolf-dark/20 rounded-md'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin text-werewolf-purple' />
                <span className='text-werewolf-purple text-sm'>{status}</span>
              </div>
            )}

            <div className='mt-auto'>
              <Button
                onClick={() => setShowQuestionBank(true)}
                className='w-full bg-werewolf-purple hover:bg-werewolf-light text-white'
              >
                <BookOpen className='mr-2 h-4 w-4' />
                打开题库
              </Button>
            </div>
          </div>
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
