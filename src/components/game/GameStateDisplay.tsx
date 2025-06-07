
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Sunset, 
  Moon, 
  Sunrise, 
  Play, 
  Pause, 
  SkipForward, 
  Square,
  Clock,
  Timer
} from 'lucide-react';
import { useGameState, GamePhase, GameStatus } from '@/hooks/useGameState';

interface GameStateDisplayProps {
  roomId: string;
  isHost?: boolean;
}

const GameStateDisplay: React.FC<GameStateDisplayProps> = ({ roomId, isHost = false }) => {
  const {
    gameState,
    loading,
    error,
    timeRemaining,
    startGame,
    advancePhase,
    pauseGame,
    resumeGame,
    endGame,
    initializeGameState
  } = useGameState(roomId);

  const phaseIcons: Record<GamePhase, React.ReactNode> = {
    day: <Sun className="h-5 w-5 text-yellow-500" />,
    evening: <Sunset className="h-5 w-5 text-orange-500" />,
    night: <Moon className="h-5 w-5 text-blue-500" />,
    dawn: <Sunrise className="h-5 w-5 text-pink-500" />
  };

  const phaseNames: Record<GamePhase, string> = {
    day: '白天',
    evening: '傍晚',
    night: '夜晚',
    dawn: '黎明'
  };

  const statusNames: Record<GameStatus, string> = {
    waiting: '等待中',
    active: '进行中',
    paused: '已暂停',
    ended: '已结束'
  };

  const statusColors: Record<GameStatus, string> = {
    waiting: 'bg-gray-500',
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    ended: 'bg-red-500'
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-werewolf-card border-red-500/30">
        <CardContent className="p-6">
          <p className="text-red-400 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!gameState) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">游戏状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-400">游戏尚未初始化</p>
            {isHost && (
              <Button
                onClick={initializeGameState}
                className="bg-werewolf-purple hover:bg-werewolf-light"
              >
                初始化游戏
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple flex items-center gap-2">
          {gameState && phaseIcons[gameState.current_phase]}
          游戏状态
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 当前状态信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">游戏状态</p>
            <Badge className={`${statusColors[gameState.status]} text-white`}>
              {statusNames[gameState.status]}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">当前轮次</p>
            <p className="font-bold">第 {gameState.current_round} 轮</p>
          </div>
        </div>

        {/* 当前阶段 */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">当前阶段</p>
          <div className="flex items-center gap-2">
            {phaseIcons[gameState.current_phase]}
            <span className="font-bold">{phaseNames[gameState.current_phase]}</span>
          </div>
        </div>

        {/* 时间信息 */}
        {gameState.status === 'active' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <Timer className="h-4 w-4" />
              剩余时间
            </p>
            <div className="text-2xl font-mono font-bold text-center">
              {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-werewolf-purple h-2 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${(timeRemaining / gameState.phase_duration) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* 主机控制按钮 */}
        {isHost && (
          <div className="space-y-2 pt-4 border-t border-gray-600">
            <p className="text-sm text-gray-400">主机控制</p>
            <div className="grid grid-cols-2 gap-2">
              {gameState.status === 'waiting' && (
                <Button
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  开始游戏
                </Button>
              )}
              
              {gameState.status === 'active' && (
                <>
                  <Button
                    onClick={pauseGame}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    size="sm"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    暂停
                  </Button>
                  <Button
                    onClick={advancePhase}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <SkipForward className="h-4 w-4 mr-1" />
                    下一阶段
                  </Button>
                </>
              )}
              
              {gameState.status === 'paused' && (
                <Button
                  onClick={resumeGame}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  继续游戏
                </Button>
              )}
              
              {gameState.status !== 'ended' && (
                <Button
                  onClick={endGame}
                  variant="destructive"
                  size="sm"
                >
                  <Square className="h-4 w-4 mr-1" />
                  结束游戏
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 阶段历史信息 */}
        <div className="space-y-2 pt-4 border-t border-gray-600">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            阶段信息
          </p>
          <div className="text-xs space-y-1">
            <p>阶段时长: {Math.floor(gameState.phase_duration / 60)} 分钟</p>
            <p>自动推进: {gameState.auto_advance ? '开启' : '关闭'}</p>
            <p>开始时间: {new Date(gameState.phase_start_time).toLocaleTimeString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStateDisplay;
