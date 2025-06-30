
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

  console.log('学生系统：当前状态', {
    roomId,
    gameState,
    roomQuestionsLength: roomQuestions.length,
    isLoadingQuestions,
    hasQuestionsInRoom
  });

  // 获取房间题目列表
  useEffect(() => {
    const fetchRoomQuestions = async () => {
      if (!roomId) {
        console.log('学生系统：没有房间ID');
        setRoomQuestions([]);
        setIsLoadingQuestions(false);
        setHasQuestionsInRoom(false);
        return;
      }

      try {
        setIsLoadingQuestions(true);
        console.log('学生系统：开始获取房间题目，房间ID:', roomId);
        
        // 修改查询，使用正确的表关联
        const { data: roomQuestionsData, error: roomQuestionsError } = await supabase
          .from('room_questions')
          .select(`
            id,
            room_id,
            question_id,
            question_order,
            questions!inner(
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

        console.log('学生系统：房间题目查询结果', { roomQuestionsData, roomQuestionsError });

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

        // 过滤出有效的题目数据
        const validQuestions = roomQuestionsData.filter(rq => rq.questions && typeof rq.questions === 'object');
        
        console.log('学生系统：有效题目列表:', validQuestions.length, '个题目');
        console.log('学生系统：题目详情:', validQuestions.map(rq => ({ 
          order: rq.question_order, 
          question: rq.questions?.question?.substring(0, 50) + '...' 
        })));
        
        setRoomQuestions(validQuestions as RoomQuestion[]);
        setHasQuestionsInRoom(validQuestions.length > 0);

      } catch (error: any) {
        console.error('学生系统：获取题目失败:', error);
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

    fetchRoomQuestions();
  }, [roomId, toast]);

  // 获取当前题目
  useEffect(() => {
    console.log('学生系统：计算当前题目', {
      gameState: gameState?.status,
      roomQuestionsLength: roomQuestions.length,
      isLoadingQuestions,
      currentRound: gameState?.currentRound,
      currentPhase: gameState?.currentPhase
    });

    // 确保必要的数据都已加载
    if (isLoadingQuestions || roomQuestions.length === 0) {
      console.log('学生系统：还在加载题目或没有题目');
      setCurrentQuestion(null);
      setQuestionNotFound(false);
      return;
    }

    // 确保游戏状态存在且为活跃状态
    if (!gameState || gameState.status !== 'active') {
      console.log('学生系统：游戏未开始或未活跃', gameState?.status);
      setCurrentQuestion(null);
      setQuestionNotFound(false);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    
    // 计算当前应该显示的题目序号
    // currentPhase: 2=傍晚阶段，4=黎明阶段
    let targetQuestionOrder = -1;
    if (currentPhase === 2) { // 傍晚阶段 - 奇数题目 (1, 3, 5, 7...)
      targetQuestionOrder = (currentRound - 1) * 2 + 1;
    } else if (currentPhase === 4) { // 黎明阶段 - 偶数题目 (2, 4, 6, 8...)
      targetQuestionOrder = (currentRound - 1) * 2 + 2;
    } else {
      console.log('学生系统：当前非答题阶段，阶段:', currentPhase);
      setCurrentQuestion(null);
      setQuestionNotFound(false);
      return;
    }

    console.log('学生系统：计算题目序号', {
      currentRound,
      currentPhase,
      targetQuestionOrder,
      totalQuestions: roomQuestions.length
    });

    // 查找对应序号的题目
    const roomQuestion = roomQuestions.find(rq => rq.question_order === targetQuestionOrder);
    
    if (roomQuestion && roomQuestion.questions) {
      setCurrentQuestion(roomQuestion.questions);
      setQuestionNotFound(false);
      console.log('学生系统：找到当前题目:', roomQuestion.questions.question.substring(0, 50) + '...');
    } else {
      console.log('学生系统：题目未找到，序号:', targetQuestionOrder, '总题目数:', roomQuestions.length);
      setCurrentQuestion(null);
      setQuestionNotFound(true);
    }
  }, [gameState, roomQuestions, isLoadingQuestions]);

  // 获取上一阶段题目
  useEffect(() => {
    if (!gameState || gameState.status !== 'active' || roomQuestions.length === 0) {
      setPreviousQuestion(null);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    let previousQuestionOrder = -1;

    if (currentPhase === 4) { // 黎明阶段，显示傍晚题目
      previousQuestionOrder = (currentRound - 1) * 2 + 1; // 当前轮傍晚题目
    } else if (currentPhase === 2 && currentRound > 1) { // 傍晚阶段，显示上一轮黎明题目
      previousQuestionOrder = (currentRound - 2) * 2 + 2; // 上一轮黎明题目
    } else {
      setPreviousQuestion(null);
      return;
    }

    console.log('学生系统：计算上一题目', {
      currentRound,
      currentPhase,
      previousQuestionOrder,
      totalQuestions: roomQuestions.length
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
      
      // 计算题目序号
      const questionOrder = currentPhase === 2 
        ? (currentRound - 1) * 2 + 1 
        : (currentRound - 1) * 2 + 2;

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
    const questionOrder = currentPhase === 2 
      ? (currentRound - 1) * 2 + 1 
      : (currentRound - 1) * 2 + 2;
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

  // 显示逻辑
  const shouldShowCurrentQuestion = gameState?.status === 'active' && isAnsweringPhase && hasQuestionsInRoom && !isLoadingQuestions;
  const shouldShowNoQuestions = !isLoadingQuestions && !hasQuestionsInRoom;

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
            ) : shouldShowNoQuestions ? (
              <div className="text-center text-yellow-400 py-8">
                <div className="p-4 bg-yellow-900/20 rounded-md border border-yellow-500/30">
                  <h3 className="font-semibold mb-2">房间未设置题目</h3>
                  <p className="text-sm">
                    此房间尚未设置题目。请联系法官为房间设置题目后再开始游戏。
                  </p>
                </div>
              </div>
            ) : shouldShowCurrentQuestion ? (
              questionNotFound ? (
                <StudentQuestionNotFound 
                  roundNumber={roundNumber}
                  phaseName={phaseName}
                  expectedQuestionIndex={-1}
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
