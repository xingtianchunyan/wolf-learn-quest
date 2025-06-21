
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock } from 'lucide-react';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { Question } from '@/components/judge/types/questionBank';
import { useGameState } from '@/hooks/useGameState';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface StudentSystemPanelProps {
  roomId: string;
  playerId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId, playerId }) => {
  const { linkedQuestions, isSystemLinked } = useJudgePage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (isSystemLinked && gameState && gameState.status === 'active') {
      const { currentRound, currentPhase } = gameState;
      const phaseIndex = currentPhase === 'evening' ? 0 : currentPhase === 'dawn' ? 1 : -1;

      if (phaseIndex !== -1) {
        const questionIndex = (currentRound - 1) * 2 + phaseIndex;
        if (linkedQuestions && linkedQuestions.length > questionIndex) {
          setCurrentQuestion(linkedQuestions[questionIndex]);
          setSelectedOption(null);
          setHasAnswered(false);
          checkExistingAnswer(linkedQuestions[questionIndex].id);
        } else {
          setCurrentQuestion(null);
        }
      } else {
        setCurrentQuestion(null);
      }
    } else {
      setCurrentQuestion(null);
    }
  }, [isSystemLinked, linkedQuestions, gameState]);

  const checkExistingAnswer = async (questionId: string) => {
    if (!currentUser || !gameState) return;

    const { data } = await supabase
      .from('player_answers')
      .select('selected_option')
      .eq('game_state_id', gameState.id)
      .eq('player_id', playerId)
      .eq('question_id', questionId)
      .maybeSingle();

    if (data) {
      setSelectedOption(data.selected_option);
      setHasAnswered(true);
    }
  };

  const handleOptionSelect = (optionNum: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionNum);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !selectedOption || !gameState || hasAnswered) return;

    const responseTime = gameState.phaseEndTime 
      ? Math.max(0, Math.floor((new Date(gameState.phaseEndTime).getTime() - Date.now()) / 1000))
      : 0;

    const isCorrect = selectedOption === currentQuestion.correct_option;

    try {
      const { error } = await supabase
        .from('player_answers')
        .insert({
          game_state_id: gameState.id,
          player_id: playerId,
          question_id: currentQuestion.id,
          selected_option: selectedOption,
          is_correct: isCorrect,
          response_time: responseTime,
        });

      if (error) {
        toast({
          title: '提交失败',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setHasAnswered(true);
      toast({
        title: '答案已提交',
        description: '您的答案已成功提交',
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: '提交出错',
        description: '提交答案时发生错误',
        variant: 'destructive',
      });
    }
  };

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const getOptionText = (option: number) => {
    if (!currentQuestion) return '';
    switch (option) {
      case 1: return currentQuestion.option_a;
      case 2: return currentQuestion.option_b;
      case 3: return currentQuestion.option_c;
      case 4: return currentQuestion.option_d;
      default: return '';
    }
  };
  
  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 'evening' || gameState.currentPhase === 'dawn');
  const showTimer = isSystemLinked && gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  const getGameStatusInfo = () => {
    if (!gameState) return '游戏准备中';
    if (gameState.status === 'waiting') return '游戏准备中';
    if (gameState.status === 'active') return `游戏进行中 - 第${roundNumber}轮 ${phaseName}阶段`;
    if (gameState.status === 'ended') return '游戏已结束';
    return '未知状态';
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <BookOpen className="mr-2 h-5 w-5" />
          学生系统 - {getGameStatusInfo()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {showTimer && (
              <div className="flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md">
                <Clock className="mr-2 h-5 w-5 text-werewolf-purple" />
                <span className="text-lg font-bold text-werewolf-purple">
                  剩余时间: {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {gameState?.isPaused && isAnsweringPhase && (
              <div className="flex items-center justify-center p-3 bg-yellow-900/30 rounded-md">
                <span className="text-lg font-bold text-yellow-400">游戏已暂停</span>
              </div>
            )}

            {gameState?.status === 'active' && currentQuestion ? (
              <>
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => (
                    <button
                      key={optionNum}
                      onClick={() => handleOptionSelect(optionNum)}
                      disabled={hasAnswered}
                      className={`w-full p-3 rounded-md border text-left transition-colors ${
                        selectedOption === optionNum
                          ? 'bg-werewolf-purple/20 border-werewolf-purple text-werewolf-purple'
                          : hasAnswered
                            ? 'bg-gray-600/40 border-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-dark/60'
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {getOptionLabel(optionNum)}.
                      </span>
                      {getOptionText(optionNum)}
                    </button>
                  ))}
                </div>

                {selectedOption && !hasAnswered && (
                  <Button
                    onClick={handleSubmitAnswer}
                    className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
                  >
                    提交答案
                  </Button>
                )}

                {hasAnswered && (
                  <div className="p-3 bg-green-900/30 rounded-md text-center">
                    <span className="text-green-400 font-medium">已提交答案</span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始'
                  : gameState.status === 'ended'
                    ? '游戏已结束'
                    : !isAnsweringPhase 
                      ? '当前非答题阶段' 
                      : '当前阶段无题目信息'
                }
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentSystemPanel;
