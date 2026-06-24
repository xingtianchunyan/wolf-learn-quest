import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap } from 'lucide-react';
import { useStudentSystem } from '@/hooks/useStudentSystem';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import StudentTimerDisplay from '../student/StudentTimerDisplay';
import StudentQuestionDisplay from '../student/StudentQuestionDisplay';
import StudentPreviousQuestionDisplay from '../student/StudentPreviousQuestionDisplay';
import StudentQuestionNotFound from '../student/StudentQuestionNotFound';

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { t } = useLanguage();
  const {
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
  } = useStudentSystem(roomId);

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>
      <CardHeader className='flex-shrink-0 pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center text-lg'>
          <GraduationCap className='mr-2 h-5 w-5' />
          {t('gameComponent.studentSystem.title', { status: gameStatusInfo })}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1 p-4 pt-0 overflow-hidden'>
        <ScrollArea className='h-full'>
          <div className='space-y-4 pr-4'>
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
              <div className='text-center text-gray-400 py-8'>
                {t('gameComponent.studentSystem.loadingQuestions')}
              </div>
            ) : !hasQuestionsInRoom ? (
              <div className='text-center text-yellow-400 py-8'>
                <div className='p-4 bg-yellow-900/20 rounded-md border border-yellow-500/30'>
                  <h3 className='font-semibold mb-2'>
                    {t('gameComponent.studentSystem.noQuestionsTitle')}
                  </h3>
                  <p className='text-sm'>
                    {t('gameComponent.studentSystem.noQuestionsDesc')}
                  </p>
                  <div className='mt-2 text-xs text-gray-500'>
                    {t('gameComponent.studentSystem.debugInfo', {
                      length: roomQuestions.length,
                      hasQuestions: hasQuestionsInRoom.toString(),
                    })}
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
                <div className='text-center text-gray-400 py-8'>
                  {t('gameComponent.studentSystem.preparingQuestion')}
                </div>
              )
            ) : previousQuestion && !isAnsweringPhase ? (
              <StudentPreviousQuestionDisplay
                previousQuestion={previousQuestion}
              />
            ) : (
              <div className='text-center text-gray-400 py-8 h-full flex items-center justify-center'>
                {!gameState || gameState.status === 'waiting'
                  ? t('gameComponent.studentSystem.gameNotStarted')
                  : gameState.status === 'ended'
                    ? t('gameComponent.studentSystem.gameEnded')
                    : !isAnsweringPhase
                      ? t('gameComponent.studentSystem.notAnsweringPhase')
                      : t('gameComponent.studentSystem.preparingQuestion')}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentSystemPanel;
