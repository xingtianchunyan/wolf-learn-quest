
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';
import { usePlayerAnswers } from '@/hooks/usePlayerAnswers';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';

interface StudentAnswerRecordPanelProps {
  roomId: string;
}

const StudentAnswerRecordPanel: React.FC<StudentAnswerRecordPanelProps> = ({ roomId }) => {
  const { currentUser } = useAuth();
  const { gameState } = useGameState(roomId);
  const { playerAnswers, loading } = usePlayerAnswers(gameState?.id);

  // 过滤出当前玩家的答题记录
  const currentPlayerAnswers = playerAnswers.filter(
    answer => answer.player_id === currentUser?.id
  );

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'evening': return '傍晚答题';
      case 'dawn': return '黎明答题';
      default: return phase;
    }
  };

  const getAnswerStatusIcon = (answer: any) => {
    if (answer.is_timeout) {
      return <Clock className="h-4 w-4 text-yellow-400" />;
    }
    if (answer.is_correct === null) {
      return <Clock className="h-4 w-4 text-gray-400" />;
    }
    return answer.is_correct 
      ? <CheckCircle className="h-4 w-4 text-green-400" />
      : <XCircle className="h-4 w-4 text-red-400" />;
  };

  const getAnswerStatusText = (answer: any) => {
    if (answer.is_timeout) {
      return '超时未答';
    }
    if (answer.is_correct === null) {
      return '等待结果';
    }
    return answer.is_correct ? '回答正确' : '回答错误';
  };

  const getAnswerStatusColor = (answer: any) => {
    if (answer.is_timeout) {
      return 'border-yellow-500 text-yellow-200';
    }
    if (answer.is_correct === null) {
      return 'border-gray-500 text-gray-200';
    }
    return answer.is_correct 
      ? 'border-green-500 text-green-200'
      : 'border-red-500 text-red-200';
  };

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardContent className="p-4 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
            <p className="text-sm text-gray-400">加载答题记录...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <ClipboardList className="mr-2 h-5 w-5" />
          我的答题记录 ({currentPlayerAnswers.length} 道题)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {currentPlayerAnswers.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                暂无答题记录
              </div>
            ) : (
              currentPlayerAnswers.map((answer, index) => (
                <div 
                  key={answer.id}
                  className="p-4 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-werewolf-purple">
                        第 {index + 1} 题
                      </span>
                      <Badge variant="outline" className="border-werewolf-purple/50">
                        {getPhaseLabel(answer.game_phase || 'unknown')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getAnswerStatusIcon(answer)}
                      <Badge variant="outline" className={getAnswerStatusColor(answer)}>
                        {getAnswerStatusText(answer)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {answer.selected_option && (
                      <div className="text-sm">
                        <span className="text-gray-400">我的答案: </span>
                        <span className="text-white font-medium">
                          选项 {['A', 'B', 'C', 'D'][answer.selected_option - 1]}
                        </span>
                      </div>
                    )}
                    
                    {answer.response_time && (
                      <div className="text-sm">
                        <span className="text-gray-400">答题用时: </span>
                        <span className="text-white">{answer.response_time} 秒</span>
                      </div>
                    )}
                    
                    {answer.explanation && (
                      <div className="mt-3 p-3 bg-werewolf-dark/60 rounded-md">
                        <h4 className="text-sm font-semibold text-werewolf-purple mb-1">题目解析</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {answer.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentAnswerRecordPanel;
