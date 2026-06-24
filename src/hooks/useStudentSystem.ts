import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { useGameState } from '@/hooks/useGameState';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';

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

export interface UseStudentSystemReturn {
  roomQuestions: RoomQuestion[];
  currentQuestion: Question | null;
  previousQuestion: Question | null;
  selectedOption: number | null;
  hasSubmitted: boolean;
  loading: boolean;
  questionNotFound: boolean;
  isLoadingQuestions: boolean;
  hasQuestionsInRoom: boolean;
  currentQuestionIndex: number;
  roundNumber: number;
  phaseName: string;
  isAnsweringPhase: boolean;
  showTimer: boolean;
  timeIsUp: boolean;
  gameStatusInfo: string;
  handleOptionClick: (optionNumber: number) => Promise<void>;
  formatTime: (seconds: number) => string;
  timeRemaining: number;
  gameState: ReturnType<typeof useGameState>['gameState'];
}

export const useStudentSystem = (roomId: string): UseStudentSystemReturn => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } =
    useGameState(roomId);

  const phaseKeyMap: Record<number, string> = {
    1: 'game.phase.day',
    2: 'game.phase.evening',
    3: 'game.phase.night',
    4: 'game.phase.dawn',
  };

  const getLocalizedPhaseName = (phase: number) =>
    t((phaseKeyMap[phase] as never) ?? 'common.unknown');
  const { toast } = useToast();

  const [roomQuestions, setRoomQuestions] = useState<RoomQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<Question | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionNotFound, setQuestionNotFound] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [hasQuestionsInRoom, setHasQuestionsInRoom] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const logger = createLogger('useStudentSystem');

  // 获取房间题目列表
  const fetchRoomQuestions = async () => {
    if (!roomId) {
      setRoomQuestions([]);
      setIsLoadingQuestions(false);
      setHasQuestionsInRoom(false);
      return;
    }

    try {
      setIsLoadingQuestions(true);
      const { data: roomQuestionsData, error: roomQuestionsError } =
        await supabase
          .from('room_questions')
          .select(
            `
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
        `
          )
          .eq('room_id', roomId)
          .order('question_order', { ascending: true });

      if (roomQuestionsError) {
        throw roomQuestionsError;
      }

      if (!roomQuestionsData || roomQuestionsData.length === 0) {
        setRoomQuestions([]);
        setHasQuestionsInRoom(false);
        setIsLoadingQuestions(false);
        return;
      }

      const validQuestions = roomQuestionsData.filter(rq => {
        return (
          rq.questions &&
          typeof rq.questions === 'object' &&
          rq.questions.question &&
          rq.questions.option_a &&
          rq.questions.option_b &&
          rq.questions.option_c &&
          rq.questions.option_d &&
          rq.questions.correct_option
        );
      });

      if (validQuestions.length === 0) {
        setRoomQuestions([]);
        setHasQuestionsInRoom(false);
      } else {
        setRoomQuestions(validQuestions as RoomQuestion[]);
        setHasQuestionsInRoom(true);
      }
    } catch (error: any) {
      logger.error('学生系统：获取题目过程中发生错误:', error);
      setRoomQuestions([]);
      setHasQuestionsInRoom(false);
      toast({
        title: t('gameComponent.question.fetchFailedTitle'),
        description: error.message || t('gameComponent.question.fetchFailedDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchRoomQuestions();
  }, [roomId, toast]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`student_room_questions_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_questions',
          filter: `room_id=eq.${roomId}`,
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

  // 获取当前题目
  useEffect(() => {
    setCurrentQuestion(null);
    setQuestionNotFound(false);

    if (isLoadingQuestions) return;
    if (!hasQuestionsInRoom || roomQuestions.length === 0) return;
    if (!gameState || gameState.status !== 'active') return;

    const { currentRound, currentPhase } = gameState;
    if (currentPhase !== 2 && currentPhase !== 4) return;

    const phaseIndex = currentPhase === 2 ? 0 : 1;
    if (phaseIndex === -1) return;

    const questionIndex = (currentRound - 1) * 2 + phaseIndex;
    const targetQuestionOrder = questionIndex + 1;
    setCurrentQuestionIndex(questionIndex);

    const roomQuestion = roomQuestions.find(
      rq => rq.question_order === targetQuestionOrder
    );
    if (roomQuestion && roomQuestion.questions) {
      setCurrentQuestion(roomQuestion.questions);
      setQuestionNotFound(false);
    } else {
      setQuestionNotFound(true);
    }
  }, [gameState, roomQuestions, isLoadingQuestions, hasQuestionsInRoom]);

  // 获取上一阶段题目
  useEffect(() => {
    if (
      !gameState ||
      gameState.status !== 'active' ||
      roomQuestions.length === 0
    ) {
      setPreviousQuestion(null);
      return;
    }

    const { currentRound, currentPhase } = gameState;
    let previousQuestionOrder = -1;

    if (currentPhase === 4) {
      previousQuestionOrder = (currentRound - 1) * 2 + 1;
    } else if (currentPhase === 2 && currentRound > 1) {
      previousQuestionOrder = (currentRound - 2) * 2 + 2;
    } else {
      setPreviousQuestion(null);
      return;
    }

    const roomQuestion = roomQuestions.find(
      rq => rq.question_order === previousQuestionOrder
    );
    if (roomQuestion && roomQuestion.questions) {
      setPreviousQuestion(roomQuestion.questions);
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
      const phaseIndex = currentPhase === 2 ? 0 : 1;
      const questionIndex = (currentRound - 1) * 2 + phaseIndex;
      const questionOrder = questionIndex + 1;

      try {
        const { data: userAnswer, error: answerError } = await supabase
          .from('room_answers')
          .select('selected_option')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .eq('question_order', questionOrder)
          .maybeSingle();

        if (answerError) throw answerError;

        if (userAnswer) {
          setSelectedOption(userAnswer.selected_option);
          setHasSubmitted(true);
        } else {
          setSelectedOption(null);
          setHasSubmitted(false);
        }
      } catch (error) {
        logger.error('学生系统：检查用户答案失败:', error);
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
        title: t('gameComponent.question.timeUpTitle'),
        description: t('gameComponent.question.timeUpDesc'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSelectedOption(optionNumber);

    const { currentRound, currentPhase } = gameState;
    const phaseIndex = currentPhase === 2 ? 0 : 1;
    const questionIndex = (currentRound - 1) * 2 + phaseIndex;
    const questionOrder = questionIndex + 1;
    const isCorrect = optionNumber === currentQuestion.correct_option;

    try {
      const { error } = await supabase.from('room_answers').insert({
        room_id: roomId,
        user_id: currentUser.id,
        question_order: questionOrder,
        selected_option: optionNumber,
        is_correct: isCorrect,
        response_time: Math.max(
          0,
          (gameState.phaseDuration || 300) - timeRemaining
        ),
      });

      if (error) {
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
              toast({
                title: t('gameComponent.question.alreadySubmittedTitle'),
                description: t('gameComponent.question.alreadySubmittedDesc'),
              });
              return;
            }
          } catch (e) {
            // ignore
          }
        }
        toast({
          title: t('gameComponent.question.submitFailedTitle'),
          description: t('gameComponent.question.submitFailedDesc'),
          variant: 'destructive',
        });
        setSelectedOption(null);
      } else {
        setHasSubmitted(true);
        toast({
          title: t('gameComponent.question.submitted'),
          description: t('gameComponent.question.submitSuccessDesc'),
        });
      }
    } catch (error) {
      logger.error('学生系统：提交答案时发生错误:', error);
      toast({
        title: t('gameComponent.question.submitErrorTitle'),
        description: t('gameComponent.question.submitFailedDesc'),
        variant: 'destructive',
      });
      setSelectedOption(null);
    } finally {
      setLoading(false);
    }
  };

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState
    ? getLocalizedPhaseName(gameState.currentPhase)
    : t('common.waiting');
  const isAnsweringPhase =
    gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4);
  const showTimer =
    gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;
  const timeIsUp = timeRemaining <= 0 && showTimer;

  const gameStatusInfo = (() => {
    if (!gameState || gameState.status === 'waiting')
      return t('gameComponent.studentSystem.status.preparing');
    if (gameState.status === 'active')
      return t('gameComponent.studentSystem.status.inProgress', {
        round: roundNumber,
        phase: phaseName,
      });
    if (gameState.status === 'ended')
      return t('gameComponent.studentSystem.status.ended');
    return t('gameComponent.studentSystem.status.unknown');
  })();

  return {
    roomQuestions,
    currentQuestion,
    previousQuestion,
    selectedOption,
    hasSubmitted,
    loading,
    questionNotFound,
    isLoadingQuestions,
    hasQuestionsInRoom,
    currentQuestionIndex,
    roundNumber,
    phaseName,
    isAnsweringPhase,
    showTimer,
    timeIsUp,
    gameStatusInfo,
    handleOptionClick,
    formatTime,
    timeRemaining,
    gameState,
  };
};
