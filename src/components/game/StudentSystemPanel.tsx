
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
  
  const [linkedQuestions, setLinkedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionNotFound, setQuestionNotFound] = useState(false);

  // 获取链接的题目列表 - 使用与教师系统相同的逻辑
  useEffect(() => {
    const fetchLinkedQuestions = async () => {
      if (!roomId) {
        setLinkedQuestions([]);
        return;
      }

      try {
        console.log('Fetching linked questions for room:', roomId);
        
        // 第一步：获取房间题目的顺序
        const { data: roomQuestionsData, error: roomQuestionsError } = await supabase
          .from('room_questions')
          .select('question_id')
          .eq('room_id', roomId)
          .order('question_order', { ascending: true });

        if (roomQuestionsError) {
          console.error('Error fetching room questions:', roomQuestionsError);
          throw roomQuestionsError;
        }

        console.log('Room questions data:', roomQuestionsData);

        if (!roomQuestionsData || roomQuestionsData.length === 0) {
          console.log('No questions found for room');
          setLinkedQuestions([]);
          return;
        }

        // 第二步：根据question_id获取完整的题目信息
        const questionIds = roomQuestionsData.map(rq => rq.question_id);
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .in('id', questionIds);
        
        if (questionsError) {
          console.error('Error fetching questions:', questionsError);
          throw questionsError;
        }

        console.log('Questions data:', questionsData);

        // 第三步：按照room_questions中的顺序重新排列题目
        const questionsMap = new Map(questionsData.map(q => [q.id, q]));
        const orderedQuestions = questionIds
          .map(id => questionsMap.get(id))
          .filter((q): q is Question => !!q);

        console.log('Ordered questions:', orderedQuestions.length, 'questions loaded');
        setLinkedQuestions(orderedQuestions);

      } catch (error: any) {
        console.error('Error fetching linked questions:', error);
        setLinkedQuestions([]);
      }
    };

    fetchLinkedQuestions();
  }, [roomId]);

  // 获取当前题目 - 使用与教师系统一致的逻辑
  useEffect(() => {
    if (!gameState || gameState.status !== 'active' || linkedQuestions.length === 0) {
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

    console.log('Calculating current question:', {
      currentRound,
      currentPhase,
      questionIndex,
      totalQuestions: linkedQuestions.length
    });

    // 检查题目是否存在
    if (questionIndex >= 0 && questionIndex < linkedQuestions.length) {
      const question = linkedQuestions[questionIndex];
      setCurrentQuestion(question);
      setQuestionNotFound(false);
      console.log('Current question found:', question.question.substring(0, 50) + '...');
    } else {
      console.log('Question not found for index:', questionIndex);
      setCurrentQuestion(null);
      setQuestionNotFound(true);
    }
  }, [gameState, linkedQuestions]);

  // 获取上一阶段题目
  useEffect(() => {
    const fetchPreviousQuestion = async () => {
      if (!gameState || gameState.status !== 'active' || linkedQuestions.length === 0) {
        setPreviousQuestion(null);
        return;
      }

      const { currentRound, currentPhase } = gameState;
      let previousQuestionIndex = -1;

      // 使用与教师系统一致的逻辑计算上一题目索引
      if (currentPhase === 4) { // 黎明阶段，显示傍晚题目
        previousQuestionIndex = (currentRound - 1) * 2; // 当前轮傍晚题目
      } else if (currentPhase === 2 && currentRound > 1) { // 傍晚阶段，显示上一轮黎明题目
        previousQuestionIndex = (currentRound - 2) * 2 + 1; // 上一轮黎明题目
      } else {
        setPreviousQuestion(null);
        return;
      }

      console.log('Calculating previous question:', {
        currentRound,
        currentPhase,
        previousQuestionIndex,
        totalQuestions: linkedQuestions.length
      });

      // 检查上一题目是否存在
      if (previousQuestionIndex >= 0 && previousQuestionIndex < linkedQuestions.length) {
        const question = linkedQuestions[previousQuestionIndex];
        setPreviousQuestion(question);
        console.log('Previous question found:', question.question.substring(0, 50) + '...');
      } else {
        setPreviousQuestion(null);
      }
    };

    fetchPreviousQuestion();
  }, [gameState, linkedQuestions]);

  // 检查用户是否已经回答过当前题目
  useEffect(() => {
    const checkUserAnswer = async () => {
      if (!currentQuestion || !currentUser || !gameState) {
        setSelectedOption(null);
        setHasSubmitted(false);
        return;
      }

      const { currentRound, currentPhase } = gameState;
      
      // 计算题目序号（用于数据库查询，1-based）
      const questionOrder = currentPhase === 2 
        ? (currentRound - 1) * 2 + 1 
        : (currentRound - 1) * 2 + 2;

      console.log('Checking user answer for question order:', questionOrder);

      try {
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
        console.error('Error checking user answer:', error);
        setSelectedOption(null);
        setHasSubmitted(false);
      }
    };

    checkUserAnswer();
  }, [currentQuestion, currentUser, gameState, roomId]);

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
  const expectedQuestionIndex = gameState?.currentPhase === 2 
    ? (gameState.currentRound - 1) * 2
    : gameState?.currentPhase === 4 
      ? (gameState.currentRound - 1) * 2 + 1
      : -1;

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
              linkedQuestionsCount={linkedQuestions.length}
              expectedQuestionIndex={expectedQuestionIndex}
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
                  expectedQuestionIndex={expectedQuestionIndex}
                  totalQuestions={linkedQuestions.length}
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
                      : linkedQuestions.length === 0
                        ? '正在加载题目信息...'
                        : '正在准备题目...'
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
