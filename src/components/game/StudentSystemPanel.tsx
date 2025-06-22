
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Question } from '@/components/judge/types/questionBank';

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);
  const [roomQuestions, setRoomQuestions] = useState<Question[]>([]);

  // 获取房间题目
  useEffect(() => {
    const fetchRoomQuestions = async () => {
      if (!roomId) return;

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
        .order('question_order');

      if (error) {
        console.error('Error fetching room questions:', error);
        return;
      }

      if (data) {
        const questions = data.map(item => item.questions).filter(Boolean) as Question[];
        setRoomQuestions(questions);
      }
    };

    fetchRoomQuestions();

    // 监听 room_questions 表的变化
    const channel = supabase
      .channel(`room_questions_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_questions',
          filter: `room_id=eq.${roomId}`
        },
        () => {
          fetchRoomQuestions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // 根据游戏状态设置当前题目
  useEffect(() => {
    if (!gameState || gameState.status !== 'active' || roomQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    
    if (currentPhase === 'evening' || currentPhase === 'dawn') {
      const phaseIndex = currentPhase === 'evening' ? 0 : 1;
      const questionIndex = (currentRound - 1) * 2 + phaseIndex;
      
      if (questionIndex < roomQuestions.length) {
        const question = roomQuestions[questionIndex];
        setCurrentQuestion(question);
        
        // 检查是否已经回答过这个问题
        checkIfAnswered(question.id);
      } else {
        setCurrentQuestion(null);
      }
    } else {
      // 非答题阶段，显示上一阶段的题目解析
      const prevPhaseIndex = currentPhase === 'day' ? 
        (currentRound > 1 ? (currentRound - 2) * 2 + 1 : -1) : // 显示上一轮的黎明题目
        (currentRound - 1) * 2; // 显示本轮的傍晚题目
      
      if (prevPhaseIndex >= 0 && prevPhaseIndex < roomQuestions.length) {
        setPreviousQuestion(roomQuestions[prevPhaseIndex]);
      } else {
        setPreviousQuestion(null);
      }
      setCurrentQuestion(null);
    }
  }, [gameState, roomQuestions]);

  const checkIfAnswered = async (questionId: string) => {
    if (!currentUser || !gameState) return;

    const { data } = await supabase
      .from('player_answers')
      .select('selected_option')
      .eq('game_id', gameState.id)
      .eq('question_id', questionId)
      .eq('player_id', currentUser.id)
      .maybeSingle();

    if (data) {
      setSelectedOption(data.selected_option);
      setIsAnswered(true);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleOptionSelect = async (optionNumber: number) => {
    if (isAnswered || !currentQuestion || !currentUser || !gameState) return;

    setSelectedOption(optionNumber);
    setIsAnswered(true);

    // 提交答案到数据库
    const { error } = await supabase
      .from('player_answers')
      .insert({
        game_id: gameState.id,
        question_id: currentQuestion.id,
        player_id: currentUser.id,
        selected_option: optionNumber,
        is_correct: optionNumber === currentQuestion.correct_option,
        response_time: Math.max(0, (gameState.phaseDuration || 40) - timeRemaining)
      });

    if (error) {
      console.error('Error submitting answer:', error);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const getOptionText = (option: number, question: Question) => {
    switch (option) {
      case 1: return question.option_a;
      case 2: return question.option_b;
      case 3: return question.option_c;
      case 4: return question.option_d;
      default: return '';
    }
  };

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 'evening' || gameState.currentPhase === 'dawn');
  const showTimer = gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  // 显示游戏状态信息
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
          <GraduationCap className="mr-2 h-5 w-5" />
          学生系统 - {getGameStatusInfo()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {/* 剩余答题时间 */}
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

            {/* 当前答题阶段 */}
            {gameState?.status === 'active' && currentQuestion ? (
              <>
                {/* 题目题干 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                {/* 选项列表 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => (
                    <Button
                      key={optionNum}
                      variant="outline"
                      className={`w-full p-3 text-left border ${
                        selectedOption === optionNum
                          ? isAnswered && optionNum === currentQuestion.correct_option
                            ? 'border-green-500 bg-green-500/20 text-green-300'
                            : isAnswered && optionNum !== currentQuestion.correct_option
                              ? 'border-red-500 bg-red-500/20 text-red-300'
                              : 'border-werewolf-purple bg-werewolf-purple/20 text-werewolf-purple'
                          : 'border-gray-600 hover:border-werewolf-purple/50'
                      } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => handleOptionSelect(optionNum)}
                      disabled={isAnswered}
                    >
                      <span className="font-semibold mr-2">
                        {getOptionLabel(optionNum - 1)}.
                      </span>
                      {getOptionText(optionNum, currentQuestion)}
                    </Button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="p-3 bg-blue-900/30 rounded-md">
                    <p className="text-blue-300 text-sm">已提交答案，请等待阶段结束</p>
                  </div>
                )}
              </>
            ) : previousQuestion ? (
              /* 显示上一阶段的答案解析 */
              <>
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">上一阶段题目</h3>
                  <p className="text-gray-300 leading-relaxed">{previousQuestion.question}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">正确答案</h3>
                  <div className="p-3 bg-green-500/20 border border-green-500 rounded-md">
                    <span className="font-semibold text-green-300 mr-2">
                      {getOptionLabel(previousQuestion.correct_option - 1)}.
                    </span>
                    <span className="text-green-300">
                      {getOptionText(previousQuestion.correct_option, previousQuestion)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">答案解析</h3>
                  <p className="text-gray-300 leading-relaxed">{previousQuestion.explanation}</p>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待法官开始游戏'
                  : roomQuestions.length === 0
                    ? '请等待法官设置题目'
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
