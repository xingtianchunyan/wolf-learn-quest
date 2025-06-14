
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

interface AnswerRecordPanelProps {
  roomId: string;
}

interface PlayerAnswer {
  playerId: string;
  playerName: string;
  selectedOption: number | null;
  remainingTime: number;
  isCorrect: boolean | null;
  status: 'answered' | 'waiting';
}

interface AnswerRecord {
  round: number;
  phase: string;
  questionText: string;
  correctOption: number;
  answers: PlayerAnswer[];
}

const AnswerRecordPanel: React.FC<AnswerRecordPanelProps> = ({ roomId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

  const { linkedQuestions } = useJudgePage();
  const { gameState, gameSettings } = useGameState(roomId);
  const { players } = usePlayersRealtime(roomId);
  const queryClient = useQueryClient();

  const { data: playerAnswers } = useQuery({
    queryKey: ['player_answers', gameState?.id],
    queryFn: async () => {
      if (!gameState?.id) return [];
      const { data, error } = await supabase
        .from('player_answers')
        .select('*')
        .eq('game_id', gameState.id);
      
      if (error) {
        console.error('Error fetching player answers:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!gameState?.id && gameState.status !== 'waiting',
  });

  useEffect(() => {
    if (!gameState?.id || gameState.status === 'waiting') return;

    const channel = supabase
      .channel(`player_answers_${gameState.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'player_answers', filter: `game_id=eq.${gameState.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['player_answers', gameState.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameState?.id, gameState?.status, queryClient]);

  useEffect(() => {
    if (!linkedQuestions || !players) {
      setAnswerRecords([]);
      return;
    }

    const records = linkedQuestions.map((question, index) => {
        const round = Math.floor(index / 2) + 1;
        const phaseName = index % 2 === 0 ? '傍晚' : '黎明';
        
        const answers: PlayerAnswer[] = players.filter(p => !p.is_ai).map(player => {
            const playerInfo = {
                playerId: player.user_id,
                playerName: player.users?.player_name || `玩家`,
            };

            const answerData = playerAnswers?.find(ans => ans.player_id === player.user_id && ans.question_id === question.id);

            if (gameState?.status !== 'waiting' && answerData) {
                const phaseDuration = phaseName === '傍晚' 
                    ? gameSettings?.eveningDuration || 40
                    : gameSettings?.dawnDuration || 40;
                
                const remainingTime = phaseDuration - (answerData.response_time || 0);

                return {
                    ...playerInfo,
                    selectedOption: answerData.selected_option,
                    remainingTime: Math.max(0, remainingTime),
                    isCorrect: answerData.is_correct,
                    status: 'answered' as const,
                };
            } else {
                return {
                    ...playerInfo,
                    selectedOption: null,
                    remainingTime: 0,
                    isCorrect: null,
                    status: 'waiting' as const,
                };
            }
        });

        return {
            round: round,
            phase: phaseName,
            questionText: question.question,
            correctOption: question.correct_option,
            answers: answers
        };
    });

    setAnswerRecords(records);
}, [linkedQuestions, players, playerAnswers, gameState, gameSettings]);

  const totalPages = Math.max(1, answerRecords.length);
  const currentRecord = answerRecords[currentPage];

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            答题记录
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">
              {answerRecords.length > 0 ? currentPage + 1 : 0} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        {currentRecord ? (
          <div className="space-y-4 h-full flex flex-col">
            {/* 题目信息 */}
            <div className="p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-werewolf-purple">
                  第{currentRecord.round}轮 - {currentRecord.phase}阶段
                </h3>
                {currentRecord.correctOption && (
                  <span className="text-sm text-gray-400">
                    正确答案: {getOptionLabel(currentRecord.correctOption)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300">{currentRecord.questionText}</p>
            </div>

            {/* 答题记录列表 */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                  {currentRecord.answers.map((answer) => (
                    <div 
                      key={answer.playerId}
                      className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-300">
                            {answer.playerName}
                          </span>
                          {answer.status === 'answered' && answer.selectedOption ? (
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              answer.isCorrect 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {getOptionLabel(answer.selectedOption)}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">等待答题</span>
                          )}
                        </div>
                        {answer.status === 'answered' && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              剩余: {formatTime(answer.remainingTime)}
                            </span>
                            {answer.isCorrect === true && <span className="text-green-400">✓</span>}
                            {answer.isCorrect === false && <span className="text-red-400">✗</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
            {linkedQuestions.length > 0 ? '正在加载答题记录...' : '暂无答题记录，请先链接题目'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerRecordPanel;
