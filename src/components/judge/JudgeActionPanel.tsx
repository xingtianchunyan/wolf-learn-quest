
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Settings,
  HelpCircle,
  Users,
  FileQuestion,
  Target
} from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import PreparationPhaseDialog from './PreparationPhaseDialog';
import QuestionBankDialog from './QuestionBankDialog';

interface JudgeActionPanelProps {
  roomId: string;
  className?: string;
}

const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({ roomId, className }) => {
  const [showPreparationDialog, setShowPreparationDialog] = useState(false);
  const [showQuestionBankDialog, setShowQuestionBankDialog] = useState(false);
  
  const {
    gameState,
    loading: gameLoading,
    startGame,
    advancePhase,
    togglePause,
    endGame,
  } = useGameState(roomId);

  const handleStartGame = async () => {
    try {
      await startGame();
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleAdvancePhase = async () => {
    try {
      await advancePhase();
    } catch (error) {
      console.error('Error advancing phase:', error);
    }
  };

  const handleTogglePause = async () => {
    try {
      await togglePause();
    } catch (error) {
      console.error('Error toggling pause:', error);
    }
  };

  const handleEndGame = async () => {
    try {
      await endGame();
    } catch (error) {
      console.error('Error ending game:', error);
    }
  };

  const isGameActive = gameState?.status === 'active';
  const isGamePaused = gameState?.isPaused || false;

  return (
    <>
      <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-werewolf-purple flex items-center text-lg">
            <Target className="mr-2 h-5 w-5" />
            法官操作面板
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          {/* Game Status */}
          <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">游戏状态</span>
              {gameLoading ? (
                <Badge variant="outline" className="border-werewolf-purple/50">
                  等待读取对应数据
                </Badge>
              ) : (
                <Badge 
                  variant="outline" 
                  className={
                    isGameActive 
                      ? 'border-green-500 text-green-200' 
                      : 'border-gray-500 text-gray-200'
                  }
                >
                  {isGameActive ? '进行中' : '等待开始'}
                </Badge>
              )}
            </div>
            {gameState && (
              <div className="text-sm text-gray-400">
                第 {gameState.currentRound} 轮 - {gameState.currentPhase === 'day' ? '白天' : 
                  gameState.currentPhase === 'evening' ? '傍晚' :
                  gameState.currentPhase === 'night' ? '夜晚' : '黎明'}阶段
              </div>
            )}
          </div>

          {/* Game Control Buttons */}
          <div className="space-y-3">
            <h3 className="text-white font-medium text-sm">游戏控制</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {!isGameActive ? (
                <Button
                  onClick={handleStartGame}
                  disabled={gameLoading}
                  className="bg-werewolf-purple hover:bg-werewolf-light text-white col-span-2"
                >
                  <Play className="h-4 w-4 mr-2" />
                  开始游戏
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTogglePause}
                    className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  >
                    {isGamePaused ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        恢复
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        暂停
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdvancePhase}
                    className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  >
                    <SkipForward className="h-4 w-4 mr-1" />
                    下一阶段
                  </Button>
                </>
              )}
            </div>

            {isGameActive && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndGame}
                className="w-full"
              >
                结束游戏
              </Button>
            )}
          </div>

          {/* Management Buttons */}
          <div className="space-y-3">
            <h3 className="text-white font-medium text-sm">管理功能</h3>
            
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreparationDialog(true)}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                准备阶段管理
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuestionBankDialog(true)}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start"
              >
                <FileQuestion className="h-4 w-4 mr-2" />
                题库管理
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start opacity-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                游戏设置
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start opacity-50"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                规则说明
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <PreparationPhaseDialog
        isOpen={showPreparationDialog}
        onClose={() => setShowPreparationDialog(false)}
        roomId={roomId}
      />

      <QuestionBankDialog
        isOpen={showQuestionBankDialog}
        onClose={() => setShowQuestionBankDialog(false)}
        roomId={roomId}
      />
    </>
  );
};

export default JudgeActionPanel;
