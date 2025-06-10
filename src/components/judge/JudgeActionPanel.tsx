
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gavel, Play, Pause, SkipForward, Square } from 'lucide-react';

interface JudgeActionPanelProps {
  roomId: string;
}

const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({ roomId }) => {
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Gavel className="mr-2 h-5 w-5" />
          法官行动
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
          >
            <Play className="h-4 w-4 mr-2" />
            开始游戏
          </Button>
          
          <Button
            variant="outline"
            className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
          >
            <Pause className="h-4 w-4 mr-2" />
            暂停游戏
          </Button>
          
          <Button
            variant="outline"
            className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
          >
            <SkipForward className="h-4 w-4 mr-2" />
            跳过阶段
          </Button>
          
          <Button
            variant="destructive"
            className="hover:bg-red-600"
          >
            <Square className="h-4 w-4 mr-2" />
            结束游戏
          </Button>
        </div>
        
        <div className="p-4 bg-werewolf-dark/40 rounded-md">
          <h3 className="font-semibold text-werewolf-purple mb-2">特殊操作</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              强制投票结束
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              重置当前阶段
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JudgeActionPanel;
