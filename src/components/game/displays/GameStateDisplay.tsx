import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  SkipForward,
  Square,
  Clock,
  Settings,
  Sun,
  Sunset,
  Moon,
  Sunrise,
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface GameStateDisplayProps {
  roomId: string;
  isJudge: boolean; // 移除默认值，强制上层传入
}

const GameStateDisplay: React.FC<GameStateDisplayProps> = ({
  roomId,
  isJudge,
}) => {
  const {
    gameState,
    gameSettings,
    loading,
    timeRemaining,
    startGame,
    advancePhase,
    togglePause,
    endGame,
    formatTime,
    getPhaseDisplayName,
  } = useGameState(roomId);

  if (loading) {
    return (
      <Card className='bg-werewolf-card border-werewolf-purple/30'>
        <CardContent className='p-4'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2'></div>
            <p className='text-sm text-gray-400'>加载游戏状态...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPhaseIcon = (phase: number) => {
    switch (phase) {
      case 1:
        return <Sun className='h-5 w-5 text-yellow-400' />;
      case 2:
        return <Sunset className='h-5 w-5 text-orange-400' />;
      case 3:
        return <Moon className='h-5 w-5 text-blue-400' />;
      case 4:
        return <Sunrise className='h-5 w-5 text-pink-400' />;
      default:
        return <Clock className='h-5 w-5' />;
    }
  };

  const getPhaseColor = (phase: number) => {
    switch (phase) {
      case 1:
        return 'bg-yellow-900/30 text-yellow-200 border-yellow-500';
      case 2:
        return 'bg-orange-900/30 text-orange-200 border-orange-500';
      case 3:
        return 'bg-blue-900/30 text-blue-200 border-blue-500';
      case 4:
        return 'bg-pink-900/30 text-pink-200 border-pink-500';
      default:
        return 'bg-gray-900/30 text-gray-200 border-gray-500';
    }
  };

  const canAdvancePhase = () => {
    if (!gameState || !gameSettings) return false;
    if (gameState.status !== 'active') return false;

    // Auto phases always advance automatically
    if (gameState.currentPhase === 2 || gameState.currentPhase === 4) {
      // 傍晚=2, 黎明=4
      return false;
    }

    // Manual phases can be advanced when not in auto mode
    return !gameSettings.isAutoAdvance;
  };

  if (!gameState) {
    return (
      <Card className='bg-werewolf-card border-werewolf-purple/30'>
        <CardContent className='p-4'>
          <div className='text-center space-y-4'>
            <h3 className='font-bold text-werewolf-purple'>游戏准备中</h3>
            <p className='text-sm text-gray-400'>等待开始游戏</p>
            {isJudge && (
              <Button
                onClick={startGame}
                className='bg-werewolf-purple hover:bg-werewolf-light'
              >
                <Play className='h-4 w-4 mr-2' />
                开始游戏
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardContent className='p-4'>
        <div className='space-y-4'>
          {/* Game Status Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Badge
                variant='outline'
                className={getPhaseColor(gameState.currentPhase)}
              >
                {getPhaseIcon(gameState.currentPhase)}
                <span className='ml-2'>
                  {getPhaseDisplayName(gameState.currentPhase)}
                </span>
              </Badge>
              <Badge variant='outline' className='border-werewolf-purple/50'>
                第 {gameState.currentRound} 轮
              </Badge>
            </div>

            <div className='flex items-center space-x-2'>
              {gameState.isPaused && (
                <Badge
                  variant='outline'
                  className='border-yellow-500 text-yellow-200'
                >
                  已暂停
                </Badge>
              )}
              <Badge
                variant='outline'
                className={
                  gameState.status === 'active'
                    ? 'border-green-500 text-green-200'
                    : 'border-gray-500 text-gray-200'
                }
              >
                {gameState.status === 'active' ? '进行中' : '等待中'}
              </Badge>
            </div>
          </div>

          {/* Timer Display */}
          {gameState.status === 'active' && gameState.phaseEndTime && (
            <div className='text-center'>
              <div className='flex items-center justify-center space-x-2 mb-2'>
                <Clock className='h-4 w-4 text-gray-400' />
                <span className='text-sm text-gray-400'>剩余时间</span>
              </div>
              <div
                className={`text-3xl font-bold ${
                  timeRemaining <= 10
                    ? 'text-red-400'
                    : timeRemaining <= 30
                      ? 'text-yellow-400'
                      : 'text-werewolf-purple'
                }`}
              >
                {gameState.isPaused ? '已暂停' : formatTime(timeRemaining)}
              </div>
            </div>
          )}

          {/* Phase Description */}
          <div className='text-center p-3 bg-werewolf-dark/40 rounded-md'>
            <p className='text-sm text-gray-300'>
              {gameState.currentPhase === 1 &&
                '讨论投票阶段 - 玩家可以自由讨论并投票'}
              {gameState.currentPhase === 2 && '答题阶段 - 请准备回答问题'}
              {gameState.currentPhase === 3 &&
                '技能使用阶段 - 特殊角色可以使用技能'}
              {gameState.currentPhase === 4 && '答题阶段 - 请准备回答问题'}
            </p>
          </div>

          {/* Judge Controls */}
          {isJudge && gameState.status === 'active' && (
            <div className='space-y-3 pt-3 border-t border-werewolf-purple/30'>
              <h4 className='text-sm font-semibold text-werewolf-purple flex items-center'>
                <Settings className='h-4 w-4 mr-2' />
                法官控制
              </h4>

              <div className='grid grid-cols-2 gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={togglePause}
                  className='border-werewolf-purple/50 hover:bg-werewolf-purple/20'
                >
                  {gameState.isPaused ? (
                    <>
                      <Play className='h-4 w-4 mr-2' />
                      恢复
                    </>
                  ) : (
                    <>
                      <Pause className='h-4 w-4 mr-2' />
                      暂停
                    </>
                  )}
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={advancePhase}
                  disabled={!canAdvancePhase()}
                  className='border-werewolf-purple/50 hover:bg-werewolf-purple/20 disabled:opacity-50'
                >
                  <SkipForward className='h-4 w-4 mr-2' />
                  下一阶段
                </Button>
              </div>

              <Button
                variant='destructive'
                size='sm'
                onClick={endGame}
                className='w-full'
              >
                <Square className='h-4 w-4 mr-2' />
                结束游戏
              </Button>
            </div>
          )}

          {/* Game Mode Info */}
          {gameSettings && (
            <div className='pt-3 border-t border-werewolf-purple/30'>
              <div className='flex items-center justify-between text-xs text-gray-400'>
                <span>游戏模式:</span>
                <span
                  className={
                    gameSettings.isAutoAdvance
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  }
                >
                  {gameSettings.isAutoAdvance ? '自动切换' : '半自动切换'}
                </span>
              </div>
              {!gameSettings.isAutoAdvance && (
                <p className='text-xs text-gray-500 mt-1'>
                  白天/夜晚阶段需要法官手动切换
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStateDisplay;
