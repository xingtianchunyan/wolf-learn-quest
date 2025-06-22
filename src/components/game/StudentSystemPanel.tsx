
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Clock } from 'lucide-react';
import { Question } from '@/components/judge/types/questionBank';
import { useGameState } from '@/hooks/useGameState';
import { supabase } from '@/integrations/supabase/client';

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [linkedQuestions, setLinkedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch linked questions for the room
  useEffect(() => {
    const fetchLinkedQuestions = async () => {
      if (!roomId) return;
      
      try {
        const { data, error } = await supabase
          .from('room_questions')
          .select(`
            question_order,
            questions (
              id,
              question,
              option_a,
              option_b,
              option_c,
              option_d,
              correct_option,
              explanation
            )
          `)
          .eq('room_id', roomId)
          .order('question_order', { ascending: true });

        if (error) {
          console.error('Error fetching linked questions:', error);
          return;
        }

        if (data) {
          const questions = data.map(item => item.questions).filter(Boolean) as Question[];
          setLinkedQuestions(questions);
        }
      } catch (error) {
        console.error('Error fetching linked questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedQuestions();
  }, [roomId]);

  // Update current question based on game state
  useEffect(() => {
    if (linkedQuestions.length > 0 && gameState && gameState.status === 'active') {
      const { currentRound, currentPhase } = gameState;
      const phaseIndex = currentPhase === 'evening' ? 0 : currentPhase === 'dawn' ? 1 : -1;

      if (phaseIndex !== -1) {
        const questionIndex = (currentRound - 1) * 2 + phaseIndex;
        if (questionIndex < linkedQuestions.length) {
          setCurrentQuestion(linkedQuestions[questionIndex]);
        } else {
          setCurrentQuestion(null);
        }
      } else {
        setCurrentQuestion(null);
      }
    } else {
      setCurrentQuestion(null);
    }
  }, [linkedQuestions, gameState]);

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index];
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
  const showTimer = gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  const getGameStatusInfo = () => {
    if (!gameState) return '游戏准备中';
    if (gameState.status === 'waiting') return '游戏准备中';
    if (gameState.status === 'active') return `游戏进行中 - 第${roundNumber}轮 ${phaseName}阶段`;
    if (gameState.status === 'ended') return '游戏已结束';
    return '未知状态';
  };

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardContent className="p-4 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
            <p className="text-sm text-gray-400">加载题目信息...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
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
                    <div 
                      key={optionNum}
                      className="p-3 rounded-md border bg-werewolf-dark/40 border-gray-600 text-gray-300"
                    >
                      <span className="font-semibold mr-2">
                        {getOptionLabel(optionNum - 1)}.
                      </span>
                      {getOptionText(optionNum)}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待法官开始游戏'
                  : linkedQuestions.length === 0
                    ? '等待法官配置题目'
                    : gameState.status === 'ended'
                      ? '游戏已结束'
                      : !isAnsweringPhase 
                        ? '当前非答题阶段' 
                        : '当前阶段无题目信息或题目已用尽'
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
