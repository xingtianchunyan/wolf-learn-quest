import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Clock } from 'lucide-react';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { Question } from '../types/questionBank';
import { useGameState } from '@/hooks/useGameState';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface TeacherSystemPanelProps {
  roomId: string;
}

const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId }) => {
  const { t } = useLanguage();
  const { linkedQuestions, isSystemLinked } = useJudgePage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } =
    useGameState(roomId);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // 计算当前轮次和阶段对应的题目序号（与学生端保持一致）
  const calculateQuestionOrder = (round: number, phase: number): number => {
    const phaseIndex = phase === 2 ? 0 : phase === 4 ? 1 : -1; // 2=傍晚, 4=黎明
    if (phaseIndex === -1) return -1;

    const questionIndex = (round - 1) * 2 + phaseIndex;
    return questionIndex + 1; // 转换为1基的question_order
  };

  useEffect(() => {
    if (isSystemLinked && gameState && gameState.status === 'active') {
      const { currentRound, currentPhase } = gameState;
      const targetQuestionOrder = calculateQuestionOrder(
        currentRound,
        currentPhase
      );

      if (targetQuestionOrder > 0 && linkedQuestions) {
        // 使用question_order精确查找，而不是数组下标
        const foundQuestion = linkedQuestions.find(
          lq => lq.question_order === targetQuestionOrder
        );
        if (foundQuestion) {
          setCurrentQuestion(foundQuestion.question);
        } else {
          console.warn(
            'TeacherSystemPanel: 未找到题目，question_order:',
            targetQuestionOrder
          );
          setCurrentQuestion(null);
        }
      } else {
        setCurrentQuestion(null);
      }
    } else {
      setCurrentQuestion(null);
    }
  }, [isSystemLinked, linkedQuestions, gameState]);

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index];
  };

  const getOptionText = (option: number) => {
    if (!currentQuestion) return '';
    switch (option) {
      case 1:
        return currentQuestion.option_a;
      case 2:
        return currentQuestion.option_b;
      case 3:
        return currentQuestion.option_c;
      case 4:
        return currentQuestion.option_d;
      default:
        return '';
    }
  };

  const getPhaseName = (phase: number) => {
    switch (phase) {
      case 1:
        return t('game.phase.day_discussion');
      case 2:
        return t('game.phase.evening_quiz');
      case 3:
        return t('game.phase.night_action');
      case 4:
        return t('game.phase.dawn_quiz');
      default:
        return t('common.unknown');
    }
  };

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState
    ? getPhaseName(gameState.currentPhase)
    : t('common.waiting');
  // 修复答题阶段判断：使用数字比较
  const isAnsweringPhase =
    gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4); // 2=傍晚, 4=黎明
  const showTimer =
    isSystemLinked &&
    gameState?.status === 'active' &&
    isAnsweringPhase &&
    !gameState.isPaused;

  // 显示游戏状态信息
  const getGameStatusInfo = () => {
    if (!gameState) return t('judge.teacherSystem.status.preparing');
    if (gameState.status === 'waiting')
      return t('judge.teacherSystem.status.preparing');
    if (gameState.status === 'active')
      return t('judge.teacherSystem.status.active', {
        round: roundNumber,
        phase: phaseName,
      });
    if (gameState.status === 'ended')
      return t('judge.teacherSystem.status.ended');
    return t('common.unknown');
  };

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>
      <CardHeader className='flex-shrink-0 pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center text-lg'>
          <GraduationCap className='mr-2 h-5 w-5' />
          {t('judge.teacherSystem.title', { status: getGameStatusInfo() })}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1 p-4 pt-0 overflow-hidden'>
        <ScrollArea className='h-full'>
          <div className='space-y-4 pr-4'>
            {/* 剩余答题时间 */}
            {showTimer && (
              <div className='flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md'>
                <Clock className='mr-2 h-5 w-5 text-werewolf-purple' />
                <span className='text-lg font-bold text-werewolf-purple'>
                  {t('judge.teacherSystem.timeRemaining', {
                    time: formatTime(timeRemaining),
                  })}
                </span>
              </div>
            )}
            {gameState?.isPaused && isAnsweringPhase && (
              <div className='flex items-center justify-center p-3 bg-yellow-900/30 rounded-md'>
                <span className='text-lg font-bold text-yellow-400'>
                  {t('judge.teacherSystem.paused')}
                </span>
              </div>
            )}

            {gameState?.status === 'active' && currentQuestion ? (
              <>
                {/* 题目题干 */}
                <div className='p-4 bg-werewolf-dark/40 rounded-md'>
                  <h3 className='font-semibold text-werewolf-purple mb-2'>
                    {t('judge.teacherSystem.questionLabel')}
                  </h3>
                  <p className='text-gray-300 leading-relaxed'>
                    {currentQuestion.question}
                  </p>
                </div>

                {/* 选项列表 */}
                <div className='space-y-2'>
                  <h3 className='font-semibold text-werewolf-purple'>
                    {t('judge.teacherSystem.optionsLabel')}
                  </h3>
                  {[1, 2, 3, 4].map(optionNum => (
                    <div
                      key={optionNum}
                      className={`p-3 rounded-md border ${
                        optionNum === currentQuestion.correct_option
                          ? 'bg-green-500/20 border-green-500 text-green-300'
                          : 'bg-werewolf-dark/40 border-gray-600 text-gray-300'
                      }`}
                    >
                      <span className='font-semibold mr-2'>
                        {getOptionLabel(optionNum - 1)}.
                      </span>
                      {getOptionText(optionNum)}
                      {optionNum === currentQuestion.correct_option && (
                        <span className='ml-2 text-green-400 font-bold'>
                          {t('judge.questionBank.preview.correctAnswer')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 正确答案解析 */}
                <div className='p-4 bg-werewolf-dark/40 rounded-md'>
                  <h3 className='font-semibold text-werewolf-purple mb-2'>
                    {t('judge.teacherSystem.explanationLabel')}
                  </h3>
                  <p className='text-gray-300 leading-relaxed'>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </>
            ) : (
              <div className='text-center text-gray-400 py-8 h-full flex items-center justify-center'>
                {!gameState || gameState.status === 'waiting'
                  ? t('judge.teacherSystem.empty.gameNotStarted')
                  : !isSystemLinked
                    ? t('judge.teacherSystem.empty.notLinked')
                    : gameState.status === 'ended'
                      ? t('judge.teacherSystem.empty.gameEnded')
                      : !isAnsweringPhase
                        ? t('judge.teacherSystem.empty.notAnsweringPhase')
                        : t('judge.teacherSystem.empty.questionNotFound')}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeacherSystemPanel;
