
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClipboardList } from 'lucide-react';

interface AnswerRecordPanelProps {
  roomId: string;
}

const AnswerRecordPanel: React.FC<AnswerRecordPanelProps> = ({ roomId }) => {
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <ClipboardList className="mr-2 h-5 w-5" />
          答题记录
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            <div className="p-3 bg-werewolf-dark/40 rounded-md">
              <h4 className="font-medium text-werewolf-purple mb-1">第1轮答题</h4>
              <p className="text-sm text-gray-400">等待玩家答题中...</p>
            </div>
            
            <div className="p-3 bg-werewolf-dark/40 rounded-md">
              <h4 className="font-medium text-gray-300 mb-1">历史记录</h4>
              <p className="text-sm text-gray-500">暂无答题记录</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnswerRecordPanel;
