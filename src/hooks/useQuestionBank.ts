import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createLogger } from '@/lib/logger';

export interface UploadedFile {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  is_preprocessed?: boolean;
  is_generated?: boolean;
}

export interface PreprocessedFile {
  id: string;
  file_name: string;
  original_file_path: string;
  created_at: string;
  model_used: string;
  is_generated?: boolean;
}

export interface UseQuestionBankReturn {
  uploadedFiles: UploadedFile[];
  preprocessedFiles: PreprocessedFile[];
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
  selectedPreprocessedFile: string;
  setSelectedPreprocessedFile: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  isUploading: boolean;
  isProcessing: boolean;
  isGenerating: boolean;
  showQuestionBank: boolean;
  setShowQuestionBank: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  clearError: () => void;
  fetchUploadedFiles: () => Promise<void>;
  fetchPreprocessedFiles: () => Promise<void>;
  handleFileUpload: (file: File, resetInput: () => void) => Promise<void>;
  handlePreprocessFile: () => Promise<void>;
  handleGenerateQuestions: () => Promise<void>;
}

export const useQuestionBank = (roomId?: string): UseQuestionBankReturn => {
  const { toast } = useToast();
  const logger = createLogger('useQuestionBank');

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

  // Use refs to access latest state in async callbacks and timeouts
  const isGeneratingRef = useRef(isGenerating);
  const isProcessingRef = useRef(isProcessing);

  useEffect(() => {
    isGeneratingRef.current = isGenerating;
  }, [isGenerating]);

  useEffect(() => {
    isProcessingRef.current = isProcessing;
  }, [isProcessing]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const fetchUploadedFiles = useCallback(async () => {
    try {
      logger.debug('获取文件列表...');
      const { data: uploadedData, error: uploadedError } = await supabase
        .from('uploaded_files')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (uploadedError) {
        logger.error('Error fetching uploaded files:', uploadedError);
        setError(`获取文件列表失败: ${uploadedError.message}`);
        return;
      }

      const { data: preprocessedData } = await supabase
        .from('preprocessed_files')
        .select('original_file_path');

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
    } catch (error) {
      logger.error('Error fetching uploaded files:', error);
      setError('获取文件列表时发生错误');
    }
  }, [logger]);

  const fetchPreprocessedFiles = useCallback(async () => {
    try {
      const { data: preprocessedData, error } = await supabase
        .from('preprocessed_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching preprocessed files:', error);
        setError(`获取预处理文件列表失败: ${error.message}`);
        return;
      }

      const { data: generatedData } = await supabase
        .from('generated_questions')
        .select('original_file_path');

      const generatedPaths = new Set(generatedData?.map(g => g.original_file_path) || []);

      const filesWithStatus = (preprocessedData || []).map(file => ({
        ...file,
        is_generated: generatedPaths.has(file.original_file_path)
      }));

      setPreprocessedFiles(filesWithStatus);
    } catch (error) {
      console.error('Error fetching preprocessed files:', error);
      setError('获取预处理文件列表时发生错误');
    }
  }, []);

  useEffect(() => {
    fetchUploadedFiles();
    fetchPreprocessedFiles();

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
          logger.debug('检测到新的预处理文件:', payload);
          toast({
            title: '预处理完成',
            description: '文件预处理已完成，页面数据已更新'
          });
          fetchPreprocessedFiles();
          fetchUploadedFiles();
          setIsProcessing(false);
          setStatus('');
        }
      )
      .subscribe();

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
          logger.debug('检测到新的生成题目:', payload);
          toast({
            title: '题目生成完成',
            description: 'AI题目生成已完成，页面数据已更新'
          });
          fetchPreprocessedFiles();
          fetchUploadedFiles();
          setIsGenerating(false);
          setStatus('');
          clearError();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(preprocessedChannel);
      supabase.removeChannel(generatedChannel);
    };
  }, [toast, logger, fetchUploadedFiles, fetchPreprocessedFiles, clearError]);

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

  const handleFileUpload = async (file: File, resetInput: () => void) => {
    clearError();

    const allowedFormats = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pptx', '.md'];
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

    if (!allowedFormats.includes(fileExtension)) {
      const errorMsg = '请上传 TXT、DOC、DOCX、XLS、XLSX、PPTX 或 MD 格式的文件';
      setError(errorMsg);
      toast({
        title: '文件格式不支持',
        description: errorMsg,
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = '文件大小不能超过10MB';
      setError(errorMsg);
      toast({
        title: '文件过大',
        description: errorMsg,
        variant: 'destructive'
      });
      return;
    }

    const existingFile = uploadedFiles.find(f => f.file_name === file.name);
    if (existingFile) {
      const errorMsg = '该文件已经上传过了';
      setError(errorMsg);
      toast({
        title: '文件重复',
        description: errorMsg,
        variant: 'destructive'
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

      const { data, error } = await supabase.storage
        .from('question-files')
        .upload(`uploads/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`上传失败: ${error.message}`);
      }

      const { error: dbError } = await supabase
        .from('uploaded_files')
        .insert({
          file_name: originalName,
          file_path: `uploads/${fileName}`
        });

      if (dbError) {
        throw new Error(`保存文件信息失败: ${dbError.message}`);
      }

      toast({
        title: '上传成功',
        description: `文件 "${originalName}" 已成功上传`
      });

      await fetchUploadedFiles();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '文件上传失败';
      setError(errorMsg);
      toast({
        title: '上传失败',
        description: errorMsg,
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
      setStatus('');
      resetInput();
    }
  };

  const handlePreprocessFile = async () => {
    if (!selectedFile) {
      const errorMsg = '请先选择要预处理的文件';
      setError(errorMsg);
      toast({
        title: '请选择文件',
        description: errorMsg,
        variant: 'destructive'
      });
      return;
    }

    if (isProcessingRef.current) return;

    clearError();
    setIsProcessing(true);
    setStatus('使用Qwen2.5-72B模型预处理文件中...');

    try {
      const selectedFileData = uploadedFiles.find(f => f.id === selectedFile);
      if (!selectedFileData) {
        throw new Error('选择的文件不存在');
      }

      const { data, error } = await supabase.functions.invoke('preprocess-file', {
        body: {
          filePath: selectedFileData.file_path,
          fileName: selectedFileData.file_name,
          roomId: roomId || 'current-room'
        }
      });

      if (error) {
        throw new Error(`API调用失败: ${error.message}`);
      }

      if (!data || !data.success) {
        throw new Error(data?.error || '预处理失败，请重试');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '文件预处理失败';
      setError(`预处理失败: ${errorMsg}`);
      toast({
        title: '预处理失败',
        description: errorMsg,
        variant: 'destructive'
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
        variant: 'destructive'
      });
      return;
    }

    if (isGeneratingRef.current) return;

    clearError();
    setIsGenerating(true);
    setStatus('使用Qwen2.5-72B模型生成题目中...');

    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          preprocessedId: selectedPreprocessedFile,
          questionCount: 18,
          roomId: roomId || 'current-room'
        }
      });

      if (error) {
        setTimeout(() => {
          if (isGeneratingRef.current) {
            setIsGenerating(false);
            setStatus('');
            const errorMsg = `API调用失败: ${error.message}`;
            setError(`生成失败: ${errorMsg}`);
            toast({
              title: '生成失败',
              description: errorMsg,
              variant: 'destructive'
            });
          }
        }, 30000);
        return;
      }

      if (!data || !data.success) {
        const errorMsg = data?.error || '题目生成失败';
        setTimeout(() => {
          if (isGeneratingRef.current) {
            setIsGenerating(false);
            setStatus('');
            setError(`生成失败: ${errorMsg}`);
            toast({
              title: '生成失败',
              description: errorMsg,
              variant: 'destructive'
            });
          }
        }, 30000);
        return;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '题目生成失败';
      setError(`生成失败: ${errorMsg}`);
      toast({
        title: '生成失败',
        description: errorMsg,
        variant: 'destructive'
      });
      setIsGenerating(false);
      setStatus('');
    }
  };

  return {
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
    fetchUploadedFiles,
    fetchPreprocessedFiles,
    handleFileUpload,
    handlePreprocessFile,
    handleGenerateQuestions
  };
};
