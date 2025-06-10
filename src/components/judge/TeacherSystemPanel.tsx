
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface TeacherSystemPanelProps {
  roomId: string;
}

const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId }) => {
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
          教师系统
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-werewolf-dark/40 rounded-md">
          <h3 className="font-semibold text-werewolf-purple mb-2">系统控制</h3>
          <p className="text-sm text-gray-400">
            管理教学相关功能和系统设置
          </p>
        </div>
        
        <div className="p-4 bg-werewolf-dark/40 rounded-md">
          <h3 className="font-semibold text-werewolf-purple mb-2">教学工具</h3>
          <p className="text-sm text-gray-400">
            提供教学辅助工具和资源管理
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherSystemPanel;
