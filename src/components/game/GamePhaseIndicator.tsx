
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sun, Sunset, Moon, Sunrise } from 'lucide-react';
import { GamePhase } from '@/hooks/useGameState';

interface GamePhaseIndicatorProps {
  phase: GamePhase;
  round: number;
  timeRemaining?: number;
  className?: string;
}

const GamePhaseIndicator: React.FC<GamePhaseIndicatorProps> = ({
  phase,
  round,
  timeRemaining,
  className = ''
}) => {
  const phaseIcons: Record<GamePhase, React.ReactNode> = {
    day: <Sun className="h-4 w-4 text-yellow-500" />,
    evening: <Sunset className="h-4 w-4 text-orange-500" />,
    night: <Moon className="h-4 w-4 text-blue-500" />,
    dawn: <Sunrise className="h-4 w-4 text-pink-500" />
  };

  const phaseNames: Record<GamePhase, string> = {
    day: '白天',
    evening: '傍晚',
    night: '夜晚',
    dawn: '黎明'
  };

  const phaseColors: Record<GamePhase, string> = {
    day: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    evening: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    night: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    dawn: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge className={`${phaseColors[phase]} flex items-center gap-1`}>
        {phaseIcons[phase]}
        {phaseNames[phase]}
      </Badge>
      <span className="text-sm text-gray-400">第{round}轮</span>
      {timeRemaining !== undefined && (
        <span className="text-sm font-mono text-gray-300">
          {formatTime(timeRemaining)}
        </span>
      )}
    </div>
  );
};

export default GamePhaseIndicator;
