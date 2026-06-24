import React from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { GameState } from '@/types/game';

interface StudentTimerDisplayProps {
  showTimer: boolean;
  timeIsUp: boolean;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  isAnsweringPhase: boolean;
  gameState: GameState | null;
}

const StudentTimerDisplay: React.FC<StudentTimerDisplayProps> = ({
  showTimer,
  timeIsUp,
  timeRemaining,
  formatTime,
  isAnsweringPhase,
  gameState,
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* 剩余答题时间或时间结束提示 */}
      {showTimer && (
        <div
          className={`flex items-center justify-center p-3 rounded-md ${
            timeIsUp ? 'bg-red-900/30' : 'bg-werewolf-dark/40'
          }`}
        >
          <Clock
            className={`mr-2 h-5 w-5 ${timeIsUp ? 'text-red-400' : 'text-werewolf-purple'}`}
          />
          <span
            className={`text-lg font-bold ${
              timeIsUp ? 'text-red-400' : 'text-werewolf-purple'
            }`}
          >
            {timeIsUp
              ? t('gameComponent.timer.timeUp')
              : t('gameComponent.timer.timeRemaining', {
                  time: formatTime(timeRemaining),
                })}
          </span>
        </div>
      )}
      {gameState?.isPaused && isAnsweringPhase && (
        <div className='flex items-center justify-center p-3 bg-yellow-900/30 rounded-md'>
          <span className='text-lg font-bold text-yellow-400'>
            {t('gameComponent.timer.gamePaused')}
          </span>
        </div>
      )}
    </>
  );
};

export default StudentTimerDisplay;
