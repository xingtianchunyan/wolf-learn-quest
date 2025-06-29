
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

  // 获取当前题目 - 使用与教师系统一致的逻辑
  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      if (!gameState || gameState.status !== 'active' || !currentUser) {
        setCurrentQuestion(null);
        setQuestionNotFound(false);
        return;
      }

      const { currentRound, currentPhase } = gameState;
      
      // 使用与教师系统相同的逻辑计算题目索引
      // 2=傍晚阶段, 4=黎明阶段
      let questionIndex = -1;
      if (currentPhase === 2) { // 傍晚阶段
        questionIndex = (currentRound - 1) * 2; // 0, 2, 4, 6...
      } else if (currentPhase === 4) { // 黎明阶段  
        questionIndex = (currentRound - 1) * 2 + 1; // 1, 3, 5, 7...
      } else {
        // 非答题阶段
        setCurrentQuestion(null);
        setQuestionNotFound(false);
        return;
      }

      const questionOrder = questionIndex + 1; // 转换为1-based索引用于数据库查询

      console.log('Fetching question with consistent logic:', {
        currentRound,
        currentPhase,
        calculatedQuestionIndex: questionIndex,
        questionOrderInDB: questionOrder,
        roomId
      });

      try {
        // 修改查询逻辑，使用正确的JOIN和字段名
        const { data: questionData, error } = await supabase
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
          .eq('question_order', questionOrder)
          .single();

        console.log('Question query result:', { 
          questionData, 
          error, 
          requestedQuestionOrder: questionOrder
        });

        if (error) {
          console.error('Error fetching current question:', error);
          // 如果是未找到记录的错误，标记为题目未找到
          if (error.code === 'PGRST116') {
            setQuestionNotFound(true);
            setCurrentQuestion(null);
          }
          return;
        }

        if (questionData?.questions) {
          console.log('Successfully loaded question:', {
            questionOrder: questionData.question_order,
            questionId: questionData.questions.id,
            questionText: questionData.questions.question?.substring(0, 50) + '...'
          });
          setCurrentQuestion(questionData.questions as Question);
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

      // 使用与教师系统一致的逻辑计算上一题目序号
      if (currentPhase === 4) { // 黎明阶段，显示傍晚题目
        previousQuestionOrder = (currentRound - 1) * 2 + 1; // 傍晚题目在数据库中的order
      } else if (currentPhase === 2 && currentRound > 1) { // 傍晚阶段，显示上一轮黎明题目
        previousQuestionOrder = (currentRound - 2) * 2 + 2; // 上一轮黎明题目
      } else {
        setPreviousQuestion(null);
        return;
      }

      console.log('Fetching previous question for order:', previousQuestionOrder);

      try {
        const { data: questionData, error } = await supabase
          .from('room_questions')
          .select(`
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

        console.log('Previous question query result:', { questionData, error });

        if (error) {
          console.error('Error fetching previous question:', error);
          return;
        }

        if (questionData?.questions) {
          setPreviousQuestion(questionData.questions as Question);
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
    // 使用与获取题目时相同的计算逻辑
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
  
  // 使用一致的题目序号计算逻辑
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
