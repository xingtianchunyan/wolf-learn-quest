
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Clock } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
}

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { currentUser } = useAuth();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 获取当前题目
  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      if (!gameState || gameState.status !== 'active' || !currentUser) return;

      const { currentRound, currentPhase } = gameState;
      const phaseIndex = currentPhase === 2 ? 0 : currentPhase === 4 ? 1 : -1; // 2=傍晚, 4=黎明
      
      if (phaseIndex === -1) {
        setCurrentQuestion(null);
        return;
      }

      const questionOrder = (currentRound - 1) * 2 + phaseIndex + 1;

      console.log('Fetching question for:', {
        currentRound,
        currentPhase,
        phaseIndex,
        questionOrder,
        roomId
      });

      try {
        const { data: roomQuestion, error } = await supabase
          .from('room_questions')
          .select(`
            question_id,
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
          .eq('question_order', questionOrder)
          .single();

        console.log('Room question query result:', { roomQuestion, error });

        if (error) {
          console.error('Error fetching current question:', error);
          return;
        }

        if (roomQuestion && roomQuestion.questions) {
          console.log('Setting current question:', roomQuestion.questions);
          setCurrentQuestion(roomQuestion.questions as Question);
        } else {
          console.log('No question found for order:', questionOrder);
          setCurrentQuestion(null);
        }

        // 检查用户是否已经回答过这道题
        const { data: userAnswer } = await supabase
          .from('room_answers')
          .select('selected_option')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .eq('question_order', questionOrder)
          .single();

        console.log('User answer query result:', userAnswer);

        if (userAnswer) {
          setSelectedOption(userAnswer.selected_option);
          setHasSubmitted(true);
        } else {
          setSelectedOption(null);
          setHasSubmitted(false);
        }

      } catch (error) {
        console.error('Error in fetchCurrentQuestion:', error);
      }
    };

    fetchCurrentQuestion();
  }, [gameState, roomId, currentUser]);

  // 获取上一阶段题目和答案
  useEffect(() => {
    const fetchPreviousQuestion = async () => {
      if (!gameState || gameState.status !== 'active' || !currentUser) return;

      const { currentRound, currentPhase } = gameState;
      let previousQuestionOrder = 0;

      // 计算上一阶段的题目顺序
      if (currentPhase === 4) { // 黎明阶段，显示傍晚题目
        previousQuestionOrder = (currentRound - 1) * 2 + 1;
      } else if (currentPhase === 2 && currentRound > 1) { // 傍晚阶段，显示上一轮黎明题目
        previousQuestionOrder = (currentRound - 2) * 2 + 2;
      } else {
        setPreviousQuestion(null);
        return;
      }

      console.log('Fetching previous question for order:', previousQuestionOrder);

      try {
        const { data: roomQuestion, error } = await supabase
          .from('room_questions')
          .select(`
            question_id,
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
          .eq('question_order', previousQuestionOrder)
          .single();

        console.log('Previous question query result:', { roomQuestion, error });

        if (error) {
          console.error('Error fetching previous question:', error);
          return;
        }

        if (roomQuestion && roomQuestion.questions) {
          setPreviousQuestion(roomQuestion.questions as Question);
        }
      } catch (error) {
        console.error('Error in fetchPreviousQuestion:', error);
      }
    };

    fetchPreviousQuestion();
  }, [gameState, roomId, currentUser]);

  const handleOptionClick = async (optionNumber: number) => {
    if (hasSubmitted || !currentQuestion || !currentUser || !gameState) return;

    setLoading(true);
    setSelectedOption(optionNumber);

    const { currentRound, currentPhase } = gameState;
    const phaseIndex = currentPhase === 2 ? 0 : currentPhase === 4 ? 1 : -1;
    const questionOrder = (currentRound - 1) * 2 + phaseIndex + 1;
    const isCorrect = optionNumber === currentQuestion.correct_option;

    console.log('Submitting answer:', {
      roomId,
      userId: currentUser.id,
      questionOrder,
      selectedOption: optionNumber,
      isCorrect,
      responseTime: Math.max(0, (gameState.phaseDuration || 300) - timeRemaining)
    });

    try {
      const { error } = await supabase
        .from('room_answers')
        .insert({
          room_id: roomId,
          user_id: currentUser.id,
          question_order: questionOrder,
          selected_option: optionNumber,
          is_correct: isCorrect,
          response_time: Math.max(0, (gameState.phaseDuration || 300) - timeRemaining)
        });

      if (error) {
        console.error('Error saving answer:', error);
        toast({
          title: '保存答案失败',
          description: '请稍后重试',
          variant: 'destructive',
        });
        setSelectedOption(null);
      } else {
        setHasSubmitted(true);
        toast({
          title: '答案已提交',
          description: '您的答案已成功保存',
        });
      }
    } catch (error) {
      console.error('Error in handleOptionClick:', error);
      toast({
        title: '提交答案时发生错误',
        description: '请稍后重试',
        variant: 'destructive',
      });
      setSelectedOption(null);
    } finally {
      setLoading(false);
    }
  };

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4);
  const showTimer = gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

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
            {/* Debug info */}
            {gameState && (
              <div className="p-2 bg-gray-800/40 rounded text-xs text-gray-400">
                调试信息: 轮次={gameState.currentRound}, 阶段={gameState.currentPhase}, 
                题目序号={(gameState.currentRound - 1) * 2 + (gameState.currentPhase === 2 ? 0 : gameState.currentPhase === 4 ? 1 : -1) + 1}
              </div>
            )}

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

            {/* 当前题目 */}
            {gameState?.status === 'active' && currentQuestion && isAnsweringPhase ? (
              <>
                {/* 题目题干 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                {/* 选项列表 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => {
                    const optionText = optionNum === 1 ? currentQuestion.option_a
                      : optionNum === 2 ? currentQuestion.option_b
                      : optionNum === 3 ? currentQuestion.option_c
                      : currentQuestion.option_d;
                    
                    const isSelected = selectedOption === optionNum;
                    const isCorrect = hasSubmitted && optionNum === currentQuestion.correct_option;
                    const isWrong = hasSubmitted && isSelected && optionNum !== currentQuestion.correct_option;
                    
                    return (
                      <button
                        key={optionNum}
                        onClick={() => handleOptionClick(optionNum)}
                        disabled={hasSubmitted || loading}
                        className={`w-full p-3 rounded-md border text-left transition-all ${
                          isCorrect && hasSubmitted
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : isWrong
                            ? 'bg-red-500/20 border-red-500 text-red-300'
                            : isSelected
                            ? 'bg-werewolf-purple/20 border-werewolf-purple text-werewolf-purple'
                            : hasSubmitted
                            ? 'bg-werewolf-dark/40 border-gray-600 text-gray-500 cursor-not-allowed'
                            : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-purple/10 hover:border-werewolf-purple/50'
                        }`}
                      >
                        <span className="font-semibold mr-2">
                          {getOptionLabel(optionNum)}.
                        </span>
                        {optionText}
                      </button>
                    );
                  })}
                </div>

                {hasSubmitted && (
                  <div className="text-center text-green-400 font-medium">
                    答案已提交
                  </div>
                )}
              </>
            ) : previousQuestion && !isAnsweringPhase ? (
              /* 显示上一阶段的题目和答案 */
              <>
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">上一阶段题目</h3>
                  <p className="text-gray-300 leading-relaxed">{previousQuestion.question}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项及答案</h3>
                  {[1, 2, 3, 4].map((optionNum) => {
                    const optionText = optionNum === 1 ? previousQuestion.option_a
                      : optionNum === 2 ? previousQuestion.option_b
                      : optionNum === 3 ? previousQuestion.option_c
                      : previousQuestion.option_d;
                    
                    const isCorrect = optionNum === previousQuestion.correct_option;
                    
                    return (
                      <div 
                        key={optionNum}
                        className={`p-3 rounded-md border ${
                          isCorrect
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : 'bg-werewolf-dark/40 border-gray-600 text-gray-300'
                        }`}
                      >
                        <span className="font-semibold mr-2">
                          {getOptionLabel(optionNum)}.
                        </span>
                        {optionText}
                        {isCorrect && (
                          <span className="ml-2 text-green-400 font-bold">✓ 正确答案</span>
                        )}
                      </div>
                    );
                  })}
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
