import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gavel, Play, Pause, SkipForward, Square, Calculator, Settings, RefreshCw } from 'lucide-react';
import PreparationPhaseDialog from './PreparationPhaseDialog';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { createLogger } from '@/lib/logger';
import EnhancedVotingManager from '@/components/voting/EnhancedVotingManager';
const logger = createLogger('judge-action-panel');
interface JudgeActionPanelProps {
  roomId: string;
}
const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({
  roomId
}) => {
  const [isPreparationDialogOpen, setIsPreparationDialogOpen] = useState(false);
  const [isLeavingJudge, setIsLeavingJudge] = useState(false);
  const [isUpdatingQuestions, setIsUpdatingQuestions] = useState(false);
  const {
    gameState,
    advancePhase,
    togglePause,
    endGame,
    gameSettings,
    updateGameSettings
  } = useGameState(roomId);
  const {
    players
  } = usePlayersRealtime(roomId);
  // 移除投票系统相关的hooks，因为已经移到EnhancedVotingManager组件中
  const {
    toast
  } = useToast();
  const {
    refreshLinkedQuestions
  } = useJudgePage();
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const navigate = useNavigate();
  const {
    currentUser
  } = useAuth();
  const handleNextPhase = async () => {
    setIsAdvancing(true);
    await advancePhase();
    setIsAdvancing(false);
  };
  const handlePauseGame = async () => {
    setIsPausing(true);
    await togglePause();
    setIsPausing(false);
  };
  const handleEndGame = async () => {
    setIsEnding(true);
    await endGame();
    setIsEnding(false);
  };
  const handleGameSettlement = () => {
    logger.debug('游戏结算');
  };

  // 更新题目功能
  const handleUpdateQuestions = async () => {
    setIsUpdatingQuestions(true);
    try {
      // 刷新题目数据
      await refreshLinkedQuestions();
      toast({
        title: '题目更新成功',
        description: '已重新加载题目信息'
      });
    } catch (error) {
      logger.error('更新题目失败:', error);
      toast({
        title: '题目更新失败',
        description: '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsUpdatingQuestions(false);
    }
  };
  const handleQuitJudge = async () => {
    if (!roomId || !currentUser) return;

    // 如果游戏正在进行中，提示用户
    if (gameState?.status === 'active') {
      toast({
        title: '无法退出',
        description: '游戏进行中无法停止扮演法官，请先结束游戏',
        variant: 'destructive'
      });
      return;
    }
    setIsLeavingJudge(true);
    try {
      // 将所有等待中的房间里的 judge_user_id 清空，避免回到大厅后再次被认定为法官
      const {
        error
      } = await supabase.from('rooms').update({
        judge_user_id: null
      }).eq('judge_user_id', currentUser.id).eq('status', 'waiting');
      if (error) {
        toast({
          title: '退出法官失败',
          description: error.message,
          variant: 'destructive'
        });
        setIsLeavingJudge(false);
        return;
      }
      // 返回大厅
      navigate('/lobby');
    } catch (err) {
      toast({
        title: '退出法官时发生错误',
        variant: 'destructive'
      });
    } finally {
      setIsLeavingJudge(false);
    }
  };
  const isGameActive = gameState?.status === 'active';
  const canQuitJudge = !isGameActive; // 只有在游戏非激活状态下才能退出

  return <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-werewolf-purple flex items-center text-lg">
              <Gavel className="mr-2 h-5 w-5" />
              法官行动
            </CardTitle>
            <div className="flex space-x-2">
              {/* 根据游戏状态显示不同按钮 */}
              {isGameActive ? <Button variant="outline" size="sm" onClick={handleUpdateQuestions} className="border-werewolf-purple/50 hover:bg-werewolf-purple/20" loading={isUpdatingQuestions} disabled={isUpdatingQuestions}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {isUpdatingQuestions ? "更新中..." : "更新题目"}
                </Button> : <Button variant="outline" size="sm" onClick={() => setIsPreparationDialogOpen(true)} className="border-werewolf-purple/50 hover:bg-werewolf-purple/20">
                  <Settings className="h-4 w-4 mr-2" />
                  准备阶段
                </Button>}
              <Button variant="destructive" size="sm" onClick={handleQuitJudge} className="border-werewolf-purple/50 hover:bg-red-700/40" loading={isLeavingJudge} disabled={!canQuitJudge || isLeavingJudge}>
                <Square className="h-4 w-4 mr-2" />
                {isLeavingJudge ? "正在退出..." : "停止扮演法官"}
              </Button>
            </div>
          </div>
          {/* 游戏状态提示 */}
          {gameState}
        </CardHeader>
        
        <CardContent className="flex-1 p-4 pt-0 flex flex-col space-y-4 min-h-0">
          {/* 增强投票管理组件 */}
          <div className="flex-1 min-h-0">
            <EnhancedVotingManager roomId={roomId} gameStateId={gameState?.id} />
          </div>

          {/* 自动化设置 */}
          {gameState && <div className="p-4 bg-werewolf-dark/40 rounded-md flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-werewolf-purple">游戏阶段控制</h3>
                <Switch checked={gameSettings?.isAutoAdvance ?? true} onCheckedChange={checked => updateGameSettings({
              isAutoAdvance: checked
            })} disabled={!isGameActive} />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {gameSettings?.isAutoAdvance ? '自动切换阶段模式' : '手动切换阶段模式'}
              </p>
            </div>}

          {/* 游戏控制按钮 */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            <Button variant="outline" onClick={handleNextPhase} className="border-werewolf-purple/50 hover:bg-werewolf-purple/20" loading={isAdvancing} disabled={!isGameActive || isAdvancing}>
              <SkipForward className="h-4 w-4 mr-2" />
              进入下个阶段
            </Button>
            
            <Button variant="outline" onClick={handlePauseGame} className="border-werewolf-purple/50 hover:bg-werewolf-purple/20" loading={isPausing} disabled={!isGameActive || isPausing}>
              {gameState?.isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
              {gameState?.isPaused ? '恢复游戏' : '暂停游戏'}
            </Button>
            
            <Button variant="destructive" onClick={handleEndGame} className="hover:bg-red-600" loading={isEnding} disabled={!isGameActive || isEnding}>
              <Square className="h-4 w-4 mr-2" />
              结束游戏
            </Button>
            
            <Button variant="outline" onClick={handleGameSettlement} className="border-werewolf-purple/50 hover:bg-werewolf-purple/20" disabled={gameState?.status === 'active'}>
              <Calculator className="h-4 w-4 mr-2" />
              游戏结算
            </Button>
          </div>

          {/* 游戏进行中的提示信息 */}
          {gameState?.status === 'active' && <div className="text-center text-sm text-gray-400 p-2 bg-werewolf-dark/20 rounded-md flex-shrink-0">
              游戏进行中，部分功能已禁用
            </div>}
        </CardContent>
      </Card>

      <PreparationPhaseDialog isOpen={isPreparationDialogOpen} onClose={() => setIsPreparationDialogOpen(false)} roomId={roomId} />
    </>;
};
export default JudgeActionPanel;