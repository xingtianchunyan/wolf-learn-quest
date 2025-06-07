
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Square,
  RefreshCw,
  Settings
} from 'lucide-react';
import { useGameState, GamePhase, GameStatus } from '@/hooks/useGameState';
import { useToast } from '@/components/ui/use-toast';

interface JudgeControlsProps {
  roomId: string;
}

const JudgeControls: React.FC<JudgeControlsProps> = ({ roomId }) => {
  const {
    gameState,
    loading,
    startGame,
    advancePhase,
    pauseGame,
    resumeGame,
    endGame,
    initializeGameState
  } = useGameState(roomId);
  
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action: () => Promise<boolean>, actionName: string) => {
    setIsProcessing(true);
    try {
      const success = await action();
      if (!success) {
        toast({
          title: `${actionName}失败`,
          description: '请重试',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error(`Error in ${actionName}:`, error);
      toast({
        title: `${actionName}错误`,
        description: '操作失败，请重试',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
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

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple"></div>
        </CardContent>
      </Card>
    );
  }

  if (!gameState) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">法官控制</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-400">游戏尚未初始化</p>
            <Button
              onClick={() => handleAction(initializeGameState, '初始化游戏')}
              className="bg-werewolf-purple hover:bg-werewolf-light"
              disabled={isProcessing}
            >
              <Settings className="h-4 w-4 mr-2" />
              初始化游戏
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">法官控制台</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 当前状态 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">游戏状态</p>
            <Badge className={`${statusColors[gameState.status]} text-white`}>
              {statusNames[gameState.status]}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">当前轮次</p>
            <p className="font-bold text-lg">第 {gameState.current_round} 轮</p>
          </div>
        </div>

        {/* 阶段控制 */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">阶段控制</p>
          <div className="grid grid-cols-2 gap-2">
            {gameState.status === 'waiting' && (
              <Button
                onClick={() => handleAction(startGame, '开始游戏')}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isProcessing}
              >
                <Play className="h-4 w-4 mr-1" />
                开始游戏
              </Button>
            )}
            
            {gameState.status === 'active' && (
              <>
                <Button
                  onClick={() => handleAction(pauseGame, '暂停游戏')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  disabled={isProcessing}
                >
                  <Pause className="h-4 w-4 mr-1" />
                  暂停
                </Button>
                <Button
                  onClick={() => handleAction(advancePhase, '切换阶段')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isProcessing}
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  下一阶段
                </Button>
              </>
            )}
            
            {gameState.status === 'paused' && (
              <Button
                onClick={() => handleAction(resumeGame, '恢复游戏')}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isProcessing}
              >
                <Play className="h-4 w-4 mr-1" />
                继续游戏
              </Button>
            )}
            
            {gameState.status !== 'ended' && (
              <Button
                onClick={() => handleAction(endGame, '结束游戏')}
                variant="destructive"
                disabled={isProcessing}
              >
                <Square className="h-4 w-4 mr-1" />
                结束游戏
              </Button>
            )}
          </div>
        </div>

        {/* 快速操作 */}
        <div className="space-y-2 pt-4 border-t border-gray-600">
          <p className="text-sm text-gray-400">快速操作</p>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => handleAction(initializeGameState, '重置游戏状态')}
              variant="outline"
              className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
              disabled={isProcessing}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              重置游戏状态
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JudgeControls;
