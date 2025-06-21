
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { usePlayerAnswers } from '@/hooks/usePlayerAnswers';
import { useAuth } from '@/providers/AuthProvider';
import { useGameState } from '@/hooks/useGameState';

interface StudentAnswerRecordProps {
  roomId: string;
}

const StudentAnswerRecord: React.FC<StudentAnswerRecordProps> = ({ roomId }) => {
  const { currentUser } = useAuth();
  const { gameState } = useGameState(roomId);
  const { playerAnswers, loading } = usePlayerAnswers(roomId);
  const [currentPlayerAnswers, setCurrentPlayerAnswers] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser?.id && playerAnswers) {
      const userAnswers = playerAnswers.filter(answer => answer.user_id === currentUser.id);
      setCurrentPlayerAnswers(userAnswers);
    }
  }, [currentUser?.id, playerAnswers]);

  const getAnswerStatus = (answer: any) => {
    if (answer.is_timeout) return 'timeout';
    if (answer.is_correct) return 'correct';
    return 'incorrect';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'incorrect':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'timeout':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'correct':
        return '正确';
      case 'incorrect':
        return '错误';
      case 'timeout':
        return '超时';
      default:
        return '未知';
    }
  };

  const getOptionLabel = (option: number) => {
    return ['A', 'B', 'C', 'D'][option - 1] || '';
  };

  const getPhaseDisplayName = (phase: string) => {
    switch (phase) {
      case 'evening':
        return '黄昏';
      case 'dawn':
        return '黎明';
      default:
        return phase;
    }
  };

  // 检查当前答题阶段是否结束，如果结束则显示解析
  const shouldShowExplanation = (answer: any) => {
    if (!gameState) return false;
    
    const answerRound = answer.game_round;
    const answerPhase = answer.game_phase;
    const currentRound = gameState.currentRound;
    const currentPhase = gameState.currentPhase;
    
    // 如果是之前的轮次，总是显示解析
    if (answerRound < currentRound) return true;
    
    // 如果是当前轮次，检查阶段是否已经过去
    if (answerRound === currentRound) {
      if (answerPhase === 'evening' && (currentPhase === 'dawn' || currentPhase === 'day' || currentPhase === 'night')) {
        return true;
      }
      if (answerPhase === 'dawn' && (currentPhase === 'day' || currentPhase === 'night')) {
        return true;
      }
    }
    
    return false;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Clock className="mr-2 h-5 w-5" />
          我的答题记录
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {loading ? (
              <div className="text-center text-gray-400">加载中...</div>
            ) : currentPlayerAnswers.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                暂无答题记录
              </div>
            ) : (
              currentPlayerAnswers.map((answer, index) => {
                const status = getAnswerStatus(answer);
                const showExplanation = shouldShowExplanation(answer);
                
                return (
                  <div key={`${answer.game_round}-${answer.game_phase}`} className="p-4 bg-werewolf-dark/40 rounded-md border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-werewolf-purple">
                        第{answer.game_round}轮 {getPhaseDisplayName(answer.game_phase)}阶段
                      </span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <span className={`text-sm font-medium ${
                          status === 'correct' ? 'text-green-400' :
                          status === 'incorrect' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-2">
                      <strong>题目:</strong> {answer.questions?.question || '题目信息不可用'}
                    </div>
                    
                    {!answer.is_timeout && (
                      <div className="text-sm text-gray-300 mb-2">
                        <strong>我的答案:</strong> {getOptionLabel(answer.selected_option)}
                      </div>
                    )}
                    
                    {answer.is_timeout && (
                      <div className="text-sm text-yellow-400 mb-2">
                        <strong>状态:</strong> 未能在规定时间内完成答题
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400">
                      答题时间: {answer.response_time ? `${answer.response_time.toFixed(1)}秒` : '超时'}
                    </div>
                    
                    {showExplanation && answer.questions && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="text-sm text-green-400 mb-1">
                          <strong>正确答案:</strong> {getOptionLabel(answer.questions.correct_option)}
                        </div>
                        {answer.questions.explanation && (
                          <div className="text-sm text-gray-300">
                            <strong>解析:</strong> {answer.questions.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentAnswerRecord;
