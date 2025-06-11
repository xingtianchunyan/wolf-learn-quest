
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Trash2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TeacherSystemPanelProps {
  roomId: string;
  className?: string;
}

interface FileStatus {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
  processed_file_path?: string;
}

const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId, className }) => {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (roomId) {
      fetchFiles();
    }
  }, [roomId]);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('file_processing_status')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // TODO: Implement file upload to storage and processing
      toast({
        title: '文件上传功能待实现',
        description: '文件上传和处理功能将在后续版本中实现',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: '上传失败',
        description: '文件上传过程中出现错误',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('file_processing_status')
        .delete()
        .eq('id', fileId);

      if (error) {
        throw error;
      }

      await fetchFiles();
      toast({
        title: '文件删除成功',
        description: '文件已从系统中删除',
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: '删除失败',
        description: '删除文件时出现错误',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'processing': return '处理中';
      case 'error': return '错误';
      case 'uploaded': return '已上传';
      default: return '未知状态';
    }
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5" />
          教师系统
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* File Upload Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">文件上传</h3>
            <Button
              variant="outline"
              size="sm"
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? '上传中...' : '选择文件'}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Files List */}
        <div className="space-y-2">
          <h3 className="text-white font-medium">上传的文件</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">等待读取对应数据</p>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">暂无上传的文件</p>
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm font-medium truncate">
                      {file.file_name}
                    </p>
                    <p className={`text-xs ${getStatusColor(file.status)}`}>
                      {getStatusText(file.status)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    {file.status === 'completed' && file.processed_file_path && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-werewolf-purple/20"
                      >
                        <Download className="h-4 w-4 text-green-400" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id)}
                      className="h-8 w-8 p-0 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherSystemPanel;
