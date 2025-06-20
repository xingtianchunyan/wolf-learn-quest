
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useGameState } from '@/hooks/useGameState';
import { usePlayerAnswers } from '@/hooks/usePlayerAnswers';

interface AnswerRecordPanelProps {
  roomId: string;
}

interface PlayerAnswer {
  playerId: string;
  playerName: string;
  selectedOption: number | null;
  responseTime: number | null;
  isCorrect: boolean | null;
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
  const { linkedQuestions } = useJudgePage();
  const { players } = usePlayersRealtime(roomId);
  const { gameState } = useGameState(roomId);
  const { playerAnswers } = usePlayerAnswers(gameState?.id);

  const answerRecords: AnswerRecord[] = useMemo(() => {
    if (!linkedQuestions || linkedQuestions.length === 0) {
      return [];
    }

    return linkedQuestions.map((question, index) => {
      const round = Math.floor(index / 2) + 1;
      const phase = index % 2 === 0 ? '傍晚' : '黎明';

      const answersForQuestion: PlayerAnswer[] = players.map(player => {
        const playerAnswerData = playerAnswers.find(
          pa => pa.player_id === player.id && pa.question_id === question.id
        );

        if (playerAnswerData) {
          return {
            playerId: player.id,
            playerName: player.name,
            selectedOption: playerAnswerData.selected_option,
            responseTime: playerAnswerData.response_time,
            isCorrect: playerAnswerData.is_correct,
          };
        } else {
          return {
            playerId: player.id,
            playerName: player.name,
            selectedOption: null,
            responseTime: null,
            isCorrect: null,
          };
        }
      });

      return {
        round,
        phase,
        questionText: question.question,
        correctOption: question.correct_option,
        answers: answersForQuestion,
      };
    });
  }, [linkedQuestions, players, playerAnswers]);

  const totalPages = Math.max(1, answerRecords.length);
  const currentRecord = answerRecords[currentPage];

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const getOptionLabel = (index: number) => {
    return ['A',

].length; 'B', 'C', 'D'][index - 1];
  };

  const formatTime = (seconds: number) => {
    if (typeof seconds !== 'number' || seconds < 0) {
      return '00:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusMessage = () => {
    if (!gameState) return '游戏尚未开始';
    if (gameState.status === 'waiting') return '游戏尚未开始';
    if (linkedQuestions.length === 0) return '请先在准备阶段链接题目';
    if (answerRecords.length === 0) return '暂无答题记录';
    return null;
  };

  const statusMessage = getStatusMessage();

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            答题记录
            {gameState?.status === 'active' && (
              <span className="ml-2 text-sm text-green-400">(实时更新)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0 || answerRecords.length === 0}
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
              disabled={currentPage >= totalPages - 1 || answerRecords.length === 0}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        {statusMessage ? (
          <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
            {statusMessage}
          </div>
        ) : currentRecord ? (
          <div className="space-y-4 h-full flex flex-col">
            {/* 题目信息 */}
            <div className="p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-werewolf-purple">
                  第{currentRecord.round}轮 - {currentRecord.phase}阶段
                </h3>
                <span className="text-sm text-gray-400">
                  正确答案: {getOptionLabel(currentRecord.correctOption)}
                </span>
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
                          {answer.selectedOption !== null && (
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              answer.isCorrect 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {getOptionLabel(answer.selectedOption)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {answer.isCorrect !== null ? (
                            <>
                              <span className="text-sm text-gray-400">
                                用时: {formatTime(answer.responseTime!)}
                              </span>
                              {answer.isCorrect ? (
                                <span className="text-green-400">✓</span>
                              ) : (
                                <span className="text-red-400">✗</span>
                              )}
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {gameState?.status === 'active' ? '等待答题...' : '未答题'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
            正在加载数据...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerRecordPanel;
