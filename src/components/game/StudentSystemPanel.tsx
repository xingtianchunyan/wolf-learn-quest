import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import StudentTimerDisplay from './student/StudentTimerDisplay';
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
  explanation: string | null;
  difficulty: number | null;
  category: string | null;
}

interface RoomQuestion {
  id: string;
  room_id: string;
  question_id: string;
  question_order: number;
  questions: Question;
}

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { currentUser } = useAuth();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const { toast } = useToast();
  
  const [roomQuestions, setRoomQuestions] = useState<RoomQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionNotFound, setQuestionNotFound] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [hasQuestionsInRoom, setHasQuestionsInRoom] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  console.log('学生系统：完整状态调试信息', {
    roomId,
    gameState: gameState?.status,
    roomQuestionsLength: roomQuestions.length,
    isLoadingQuestions,
    hasQuestionsInRoom,
    currentQuestion: currentQuestion?.id,
    previousQuestion: previousQuestion?.id
  });

  // 获取房间题目列表
  const fetchRoomQuestions = async () => {
    if (!roomId) {
      console.log('学生系统：没有房间ID，跳过查询');
      setRoomQuestions([]);
      setIsLoadingQuestions(false);
      setHasQuestionsInRoom(false);
      return;
    }

    try {
      setIsLoadingQuestions(true);
      console.log('学生系统：开始获取房间题目，房间ID:', roomId);
      
      // 直接查询 room_questions 表，现在RLS策略已经修复
      const { data: roomQuestionsData, error: roomQuestionsError } = await supabase
        .from('room_questions')
        .select(`
          id,
          room_id,
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
            explanation,
            difficulty,
            category
          )
        `)
        .eq('room_id', roomId)
        .order('question_order', { ascending: true });

      console.log('学生系统：题目查询结果', { 
        data: roomQuestionsData, 
        error: roomQuestionsError,
        dataLength: roomQuestionsData?.length || 0
      });

      if (roomQuestionsError) {
        console.error('学生系统：获取房间题目失败:', roomQuestionsError);
        throw roomQuestionsError;
      }

      if (!roomQuestionsData || roomQuestionsData.length === 0) {
        console.log('学生系统：房间未设置题目');
        setRoomQuestions([]);
        setHasQuestionsInRoom(false);
        setIsLoadingQuestions(false);
        return;
      }

      // 验证数据完整性
      const validQuestions = roomQuestionsData.filter(rq => {
        const isValid = rq.questions && 
                       typeof rq.questions === 'object' && 
                       rq.questions.question && 
                       rq.questions.option_a &&
                       rq.questions.option_b &&
                       rq.questions.option_c &&
                       rq.questions.option_d &&
                       rq.questions.correct_option;
        
        if (!isValid) {
          console.warn('学生系统：发现无效题目数据:', rq);
        }
        
        return isValid;
      });
      
      console.log('学生系统：有效题目验证结果', {
        totalQuestions: roomQuestionsData.length,
        validQuestions: validQuestions.length,
        invalidCount: roomQuestionsData.length - validQuestions.length
      });

      if (validQuestions.length === 0) {
        console.log('学生系统：没有有效的题目数据');
        setRoomQuestions([]);
        setHasQuestionsInRoom(false);
      } else {
        console.log('学生系统：成功加载题目', validQuestions.map(rq => ({
          order: rq.question_order,
          questionId: rq.questions.id,
          questionPreview: rq.questions.question.substring(0, 50) + '...'
        })));
        setRoomQuestions(validQuestions as RoomQuestion[]);
        setHasQuestionsInRoom(true);
      }

    } catch (error: any) {
      console.error('学生系统：获取题目过程中发生错误:', error);
      setRoomQuestions([]);
      setHasQuestionsInRoom(false);
      toast({
        title: '获取题目失败',
        description: error.message || '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchRoomQuestions();
  }, [roomId, toast]);

  // 监听房间题目变化，实现实时同步
  useEffect(() => {
    if (!roomId) return;

    console.log('学生系统：设置实时监听，房间ID:', roomId);

    const channel = supabase
      .channel(`student_room_questions_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_questions',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('学生系统：房间题目发生变化:', payload);
          // 重新获取题目数据
          fetchRoomQuestions();
        }
      )
      .subscribe();

    return () => {
      console.log('学生系统：清理实时监听');
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // 获取当前题目
  useEffect(() => {
    console.log('学生系统：开始计算当前题目', {
      gameStatus: gameState?.status,
      currentRound: gameState?.currentRound,
      currentPhase: gameState?.currentPhase,
      roomQuestionsLength: roomQuestions.length,
      isLoadingQuestions,
      hasQuestionsInRoom
    });

    // 重置状态
    setCurrentQuestion(null);
    setQuestionNotFound(false);

    // 检查必要条件
    if (isLoadingQuestions) {
      console.log('学生系统：题目仍在加载中');
      return;
    }

    if (!hasQuestionsInRoom || roomQuestions.length === 0) {
      console.log('学生系统：房间没有题目或题目加载失败');
      return;
    }

    if (!gameState || gameState.status !== 'active') {
      console.log('学生系统：游戏未开始或未活跃，状态:', gameState?.status);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    
    // 检查是否为答题阶段（傍晚=2, 黎明=4）
    if (currentPhase !== 2 && currentPhase !== 4) {
      console.log('学生系统：当前非答题阶段，阶段:', currentPhase);
      return;
    }

    // 计算题目序号：与TeacherSystemPanel保持一致
    // phaseIndex: 傍晚=0, 黎明=1
    const phaseIndex = currentPhase === 2 ? 0 : currentPhase === 4 ? 1 : -1;
    
    if (phaseIndex === -1) {
      console.log('学生系统：无效的游戏阶段:', currentPhase);
      return;
    }
    
    // 计算在数组中的索引（0基）
    const questionIndex = (currentRound - 1) * 2 + phaseIndex;
    // 转换为数据库中的question_order（1基）
    const targetQuestionOrder = questionIndex + 1;
    
    // 保存当前题目索引供其他地方使用
    setCurrentQuestionIndex(questionIndex);

    console.log('学生系统：计算目标题目序号', {
      currentRound,
      currentPhase,
      targetQuestionOrder,
      availableOrders: roomQuestions.map(rq => rq.question_order)
    });

    // 查找对应序号的题目
    const roomQuestion = roomQuestions.find(rq => rq.question_order === targetQuestionOrder);
    
    if (roomQuestion && roomQuestion.questions) {
      console.log('学生系统：找到当前题目', {
        questionOrder: targetQuestionOrder,
        questionId: roomQuestion.questions.id,
        questionText: roomQuestion.questions.question.substring(0, 100) + '...'
      });
      setCurrentQuestion(roomQuestion.questions);
      setQuestionNotFound(false);
    } else {
      console.log('学生系统：未找到目标题目', {
        targetQuestionOrder,
        availableQuestions: roomQuestions.map(rq => ({
          order: rq.question_order,
          id: rq.questions?.id
        }))
      });
      setQuestionNotFound(true);
    }
  }, [gameState, roomQuestions, isLoadingQuestions, hasQuestionsInRoom]);

  // 获取上一阶段题目
  useEffect(() => {
    if (!gameState || gameState.status !== 'active' || roomQuestions.length === 0) {
      setPreviousQuestion(null);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    let previousQuestionOrder = -1;

    if (currentPhase === 4) { // 黎明阶段，显示当前轮傍晚题目
      previousQuestionOrder = (currentRound - 1) * 2 + 1;
    } else if (currentPhase === 2 && currentRound > 1) { // 傍晚阶段，显示上一轮黎明题目
      previousQuestionOrder = (currentRound - 2) * 2 + 2;
    } else {
      setPreviousQuestion(null);
      return;
    }

    console.log('学生系统：计算上一题目序号', {
      currentRound,
      currentPhase,
      previousQuestionOrder
    });

    const roomQuestion = roomQuestions.find(rq => rq.question_order === previousQuestionOrder);
    if (roomQuestion && roomQuestion.questions) {
      setPreviousQuestion(roomQuestion.questions);
      console.log('学生系统：找到上一题目:', roomQuestion.questions.question.substring(0, 50) + '...');
    } else {
      setPreviousQuestion(null);
    }
  }, [gameState, roomQuestions]);

  // 检查用户是否已经回答过当前题目
  useEffect(() => {
    const checkUserAnswer = async () => {
      if (!currentQuestion || !currentUser || !gameState) {
        setSelectedOption(null);
        setHasSubmitted(false);
        return;
      }

      const { currentRound, currentPhase } = gameState;
      
      // 计算题目序号：与上面的逻辑保持一致
      const phaseIndex = currentPhase === 2 ? 0 : 1;
      const questionIndex = (currentRound - 1) * 2 + phaseIndex;
      const questionOrder = questionIndex + 1;

      console.log('学生系统：检查用户答案，题目序号:', questionOrder);

      try {
        const { data: userAnswer, error: answerError } = await supabase
          .from('room_answers')
          .select('selected_option')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .eq('question_order', questionOrder)
          .maybeSingle();

        console.log('学生系统：用户答案查询结果:', { userAnswer, answerError });

        if (userAnswer) {
          setSelectedOption(userAnswer.selected_option);
          setHasSubmitted(true);
        } else {
          setSelectedOption(null);
          setHasSubmitted(false);
        }
      } catch (error) {
        console.error('学生系统：检查用户答案失败:', error);
        setSelectedOption(null);
        setHasSubmitted(false);
      }
    };

    checkUserAnswer();
  }, [currentQuestion, currentUser, gameState, roomId]);

  const handleOptionClick = async (optionNumber: number) => {
    if (hasSubmitted || !currentQuestion || !currentUser || !gameState) return;
    
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
    // 计算题目序号：与上面的逻辑保持一致
    const phaseIndex = currentPhase === 2 ? 0 : 1;
    const questionIndex = (currentRound - 1) * 2 + phaseIndex;
    const questionOrder = questionIndex + 1;
    const isCorrect = optionNumber === currentQuestion.correct_option;

    console.log('学生系统：提交答案:', {
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
        console.error('学生系统：保存答案失败:', error);
        // 若已存在记录（唯一键冲突），则视为已提交并同步状态
        if ((error as any).code === '23505') {
          try {
            const { data: existing } = await supabase
              .from('room_answers')
              .select('selected_option')
              .eq('room_id', roomId)
              .eq('user_id', currentUser.id)
              .eq('question_order', questionOrder)
              .maybeSingle();
            if (existing) {
              setSelectedOption(existing.selected_option);
              setHasSubmitted(true);
              toast({ title: '已提交过该题', description: '不能重复提交答案' });
              return;
            }
          } catch (e) {
            // ignore
          }
        }
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
      console.error('学生系统：提交答案时发生错误:', error);
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

  const getGameStatusInfo = () => {
    if (!gameState) return '游戏准备中';
    if (gameState.status === 'waiting') return '游戏准备中';
    if (gameState.status === 'active') return `游戏进行中 - 第${roundNumber}轮 ${phaseName}阶段`;
    if (gameState.status === 'ended') return '游戏已结束';
    return '未知状态';
  };

  // 决定显示内容的逻辑
  console.log('学生系统：显示逻辑判断', {
    isLoadingQuestions,
    hasQuestionsInRoom,
    gameActive: gameState?.status === 'active',
    isAnsweringPhase,
    currentQuestion: !!currentQuestion,
    questionNotFound,
    previousQuestion: !!previousQuestion
  });

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
            {/* Timer Display */}
            <StudentTimerDisplay 
              showTimer={showTimer}
              timeIsUp={timeIsUp}
              timeRemaining={timeRemaining}
              formatTime={formatTime}
              isAnsweringPhase={isAnsweringPhase}
              gameState={gameState}
            />

            {/* 主要内容显示 */}
            {isLoadingQuestions ? (
              <div className="text-center text-gray-400 py-8">
                正在加载题目信息...
              </div>
            ) : !hasQuestionsInRoom ? (
              <div className="text-center text-yellow-400 py-8">
                <div className="p-4 bg-yellow-900/20 rounded-md border border-yellow-500/30">
                  <h3 className="font-semibold mb-2">房间未设置题目</h3>
                  <p className="text-sm">
                    此房间尚未设置题目。请联系法官为房间设置题目后再开始游戏。
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    调试信息：roomQuestions长度={roomQuestions.length}, hasQuestionsInRoom={hasQuestionsInRoom.toString()}
                  </div>
                </div>
              </div>
            ) : gameState?.status === 'active' && isAnsweringPhase ? (
              questionNotFound ? (
                <StudentQuestionNotFound 
                  roundNumber={roundNumber}
                  phaseName={phaseName}
                  expectedQuestionIndex={currentQuestionIndex}
                  totalQuestions={roomQuestions.length}
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
                <div className="text-center text-gray-400 py-8">
                  正在准备题目...
                </div>
              )
            ) : previousQuestion && !isAnsweringPhase ? (
              <StudentPreviousQuestionDisplay previousQuestion={previousQuestion} />
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待法官开始游戏'
                  : gameState.status === 'ended'
                    ? '游戏已结束'
                    : !isAnsweringPhase 
                      ? '当前非答题阶段' 
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
