
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import StudentTimerDisplay from './student/StudentTimerDisplay';
import StudentDebugInfo from './student/StudentDebugInfo';
import StudentQuestionDisplay from './student/StudentQuestionDisplay';
import StudentPreviousQuestionDisplay from './student/StudentPreviousQuestionDisplay';
import StudentQuestionNotFound from './student/StudentQuestionNotFound';

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
  const [questionNotFound, setQuestionNotFound] = useState(false);

  // 获取当前题目
  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      if (!gameState || gameState.status !== 'active' || !currentUser) {
        setCurrentQuestion(null);
        setQuestionNotFound(false);
        return;
      }

      const { currentRound, currentPhase } = gameState;
      
      // 修正题目顺序计算逻辑
      // 每轮有2道题：傍晚(phase 2)和黎明(phase 4)
      // 第1轮傍晚 = 题目1, 第1轮黎明 = 题目2
      // 第2轮傍晚 = 题目3, 第2轮黎明 = 题目4
      let questionOrder = 0;
      
      if (currentPhase === 2) { // 傍晚阶段
        questionOrder = (currentRound - 1) * 2 + 1;
      } else if (currentPhase === 4) { // 黎明阶段
        questionOrder = (currentRound - 1) * 2 + 2;
      } else {
        // 非答题阶段
        setCurrentQuestion(null);
        setQuestionNotFound(false);
        return;
      }

      console.log('Fetching question with corrected logic:', {
        currentRound,
        currentPhase,
        calculatedQuestionOrder: questionOrder,
        roomId
      });

      try {
        // 首先检查 room_questions 表中是否有数据
        const { data: allRoomQuestions, error: countError } = await supabase
          .from('room_questions')
          .select('question_order')
          .eq('room_id', roomId)
          .order('question_order');

        console.log('All room questions available:', { 
          allRoomQuestions, 
          countError,
          totalQuestions: allRoomQuestions?.length || 0
        });

        // 查询特定题目 - 使用正确的关联查询
        const { data: roomQuestion, error } = await supabase
          .from('room_questions')
          .select(`
            question_id,
            question_order,
            questions!inner (
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
          .maybeSingle();

        console.log('Current question query result:', { 
          roomQuestion, 
          error, 
          requestedQuestionOrder: questionOrder,
          foundQuestion: !!roomQuestion
        });

        if (error) {
          console.error('Error fetching current question:', error);
          setQuestionNotFound(true);
          return;
        }

        if (roomQuestion && roomQuestion.questions) {
          console.log('Successfully loaded question:', {
            questionOrder: roomQuestion.question_order,
            questionId: roomQuestion.questions.id,
            questionText: roomQuestion.questions.question?.substring(0, 50) + '...'
          });
          setCurrentQuestion(roomQuestion.questions as Question);
          setQuestionNotFound(false);
        } else {
          console.log('No question found for order:', questionOrder);
          setCurrentQuestion(null);
          setQuestionNotFound(true);
        }

        // 检查用户是否已经回答过这道题
        const { data: userAnswer, error: answerError } = await supabase
          .from('room_answers')
          .select('selected_option')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .eq('question_order', questionOrder)
          .maybeSingle();

        console.log('User answer query result:', { userAnswer, answerError });

        if (userAnswer) {
          setSelectedOption(userAnswer.selected_option);
          setHasSubmitted(true);
        } else {
          setSelectedOption(null);
          setHasSubmitted(false);
        }

      } catch (error) {
        console.error('Error in fetchCurrentQuestion:', error);
        setQuestionNotFound(true);
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
            questions!inner (
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
          .maybeSingle();

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
    
    // 如果时间归零，不允许提交答案
    if (timeRemaining <= 0 && showTimer) {
      toast({
        title: '答题时间已结束',
        description: '无法提交答案',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSelectedOption(optionNumber);

    const { currentRound, currentPhase } = gameState;
    const questionOrder = currentPhase === 2 
      ? (currentRound - 1) * 2 + 1 
      : (currentRound - 1) * 2 + 2;
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

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4);
  const showTimer = gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;
  const timeIsUp = timeRemaining <= 0 && showTimer;
  const expectedQuestionOrder = gameState?.currentPhase === 2 
    ? (gameState.currentRound - 1) * 2 + 1 
    : gameState?.currentPhase === 4 
      ? (gameState.currentRound - 1) * 2 + 2 
      : 0;

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
            {/* Enhanced Debug info */}
            <StudentDebugInfo 
              gameState={gameState}
              currentQuestion={currentQuestion}
              questionNotFound={questionNotFound}
              timeIsUp={timeIsUp}
            />

            {/* Timer Display */}
            <StudentTimerDisplay 
              showTimer={showTimer}
              timeIsUp={timeIsUp}
              timeRemaining={timeRemaining}
              formatTime={formatTime}
              isAnsweringPhase={isAnsweringPhase}
              gameState={gameState}
            />

            {/* 当前题目显示 */}
            {gameState?.status === 'active' && isAnsweringPhase ? (
              questionNotFound ? (
                <StudentQuestionNotFound 
                  roundNumber={roundNumber}
                  phaseName={phaseName}
                  expectedQuestionOrder={expectedQuestionOrder}
                />
              ) : currentQuestion ? (
                <StudentQuestionDisplay 
                  currentQuestion={currentQuestion}
                  selectedOption={selectedOption}
                  hasSubmitted={hasSubmitted}
                  loading={loading}
                  timeIsUp={timeIsUp}
                  onOptionClick={handleOptionClick}
                />
              ) : (
                /* 题目加载中 */
                <div className="text-center text-gray-400 py-8">
                  正在加载题目...
                </div>
              )
            ) : previousQuestion && !isAnsweringPhase ? (
              /* 显示上一阶段的题目和答案 */
              <StudentPreviousQuestionDisplay previousQuestion={previousQuestion} />
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待法官开始游戏'
                  : gameState.status === 'ended'
                    ? '游戏已结束'
                    : !isAnsweringPhase 
                      ? '当前非答题阶段' 
                      : '正在加载题目信息...'
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
