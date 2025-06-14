
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Gavel, Play, Pause, SkipForward, Square, Calculator, Settings } from 'lucide-react';
import PreparationPhaseDialog from './PreparationPhaseDialog';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useVoteResults } from '@/hooks/useVoteResults';
import { useGameState } from '@/hooks/useGameState';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { toast } from 'sonner';

interface JudgeActionPanelProps {
  roomId: string;
}

const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({ roomId }) => {
  const [isPreparationDialogOpen, setIsPreparationDialogOpen] = useState(false);
  const [isLeavingJudge, setIsLeavingJudge] = useState(false);
  const { voteRecords, loading: votesLoading } = useVoteResults(roomId);
  const { gameState, advancePhase, togglePause, endGame, gameSettings, updateGameSettings } = useGameState(roomId);
  const { linkedQuestions } = useJudgePage();

  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isStartingGame, setIsStartingGame] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleStartGame = async () => {
    if (!linkedQuestions || linkedQuestions.length === 0) {
      toast.error("无法开始游戏", { description: "请先在准备阶段设置题目。" });
      return;
    }
    if (!roomId || !currentUser) return;

    setIsStartingGame(true);
    try {
      const { data: gameSessionData, error: gameSessionError } = await supabase
        .from('game_sessions')
        .upsert({ room_id: roomId, status: 'active' }, { onConflict: 'room_id', ignoreDuplicates: false })
        .select()
        .single();

      if (gameSessionError || !gameSessionData) {
        console.error('Error upserting game session:', gameSessionError);
        toast.error("创建游戏会话失败", { description: gameSessionError?.message });
        return;
      }
      const gameId = gameSessionData.id;

      const questionsToInsert = linkedQuestions.map((q, index) => ({
        game_id: gameId,
        question_id: q.id,
        question_order: index + 1,
      }));

      await supabase.from('game_questions').delete().eq('game_id', gameId);
      const { error: questionsError } = await supabase.from('game_questions').insert(questionsToInsert);

      if (questionsError) {
        console.error('Error saving game questions:', questionsError);
        toast.error("保存游戏题目失败", { description: questionsError.message });
        return;
      }

      const { error: startGameError } = await supabase.rpc('start_game', { p_room_id: roomId });

      if (startGameError) {
        console.error('Error starting game state:', startGameError);
        toast.error("开始游戏失败", { description: startGameError.message });
        return;
      }
      
      toast.success("游戏已开始！");

    } catch (err) {
      console.error(err);
      toast.error("未知错误", { description: "开始游戏时发生错误。" });
    } finally {
      setIsStartingGame(false);
    }
  };

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
    console.log('游戏结算');
  };

  const handleQuitJudge = async () => {
    if (!roomId || !currentUser) return;
    setIsLeavingJudge(true);
    try {
      // 将 judge_user_id 置空
      const { error } = await supabase
        .from('rooms')
        .update({ judge_user_id: null })
        .eq('id', roomId);

      if (error) {
        alert('退出法官失败: ' + error.message);
        setIsLeavingJudge(false);
        return;
      }
      // 返回大厅
      navigate('/lobby');
    } catch (err) {
      alert('退出法官时发生错误');
    } finally {
      setIsLeavingJudge(false);
    }
  };

  const isGameActive = gameState?.status === 'active';

  return (
    <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-werewolf-purple flex items-center text-lg">
              <Gavel className="mr-2 h-5 w-5" />
              法官行动
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreparationDialogOpen(true)}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              >
                <Settings className="h-4 w-4 mr-2" />
                准备阶段
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleQuitJudge}
                className="border-werewolf-purple/50 hover:bg-red-700/40"
                loading={isLeavingJudge}
              >
                <Square className="h-4 w-4 mr-2" />
                {isLeavingJudge ? "正在退出..." : "停止扮演法官"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-4 pt-0 flex flex-col space-y-4">
          {/* 投票结果表格 */}
          <div className="border border-werewolf-purple/30 rounded-md">
            <ScrollArea className="h-52">
              <Table>
                <TableHeader className="sticky top-0 bg-werewolf-card z-10">
                  <TableRow className="border-b border-werewolf-purple/30 hover:bg-transparent">
                    <TableHead className="text-werewolf-purple">被投票玩家</TableHead>
                    <TableHead className="text-werewolf-purple">得票数</TableHead>
                    <TableHead className="text-werewolf-purple">投票玩家</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {votesLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-400">
                        正在加载投票数据...
                      </TableCell>
                    </TableRow>
                  ) : voteRecords.length > 0 ? (
                    voteRecords.map((record) => (
                      <TableRow key={record.votedPlayerId} className="border-b border-werewolf-purple/30 last:border-b-0">
                        <TableCell className="text-gray-300">{record.votedPlayerName}</TableCell>
                        <TableCell className="text-gray-300">{record.voteCount}</TableCell>
                        <TableCell className="text-gray-300 text-sm">
                          {record.voters.join(', ')}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-400">
                        当前阶段无投票记录
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* 自动化设置 */}
          <div className="p-4 bg-werewolf-dark/40 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-werewolf-purple">游戏阶段控制</h3>
              <Switch
                checked={gameSettings?.isAutoAdvance ?? true}
                onCheckedChange={(checked) => updateGameSettings({ isAutoAdvance: checked })}
                disabled={!isGameActive}
              />
            </div>
          </div>

          {/* 游戏控制按钮 */}
          <div className="grid grid-cols-2 gap-3">
            {isGameActive ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleNextPhase}
                  className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  loading={isAdvancing}
                  disabled={!isGameActive || isAdvancing}
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  进入下个阶段
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handlePauseGame}
                  className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  loading={isPausing}
                  disabled={!isGameActive || isPausing}
                >
                  {gameState?.isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                  {gameState?.isPaused ? '恢复游戏' : '暂停游戏'}
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={handleEndGame}
                  className="hover:bg-red-600"
                  loading={isEnding}
                  disabled={!isGameActive || isEnding}
                >
                  <Square className="h-4 w-4 mr-2" />
                  结束游戏
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white col-span-2"
                loading={isStartingGame}
                disabled={isStartingGame || gameState?.status === 'finished'}
              >
                <Play className="h-4 w-4 mr-2" />
                开始新游戏
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={handleGameSettlement}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              disabled={gameState?.status !== 'finished'}
            >
              <Calculator className="h-4 w-4 mr-2" />
              游戏结算
            </Button>
          </div>
        </CardContent>
      </Card>

      <PreparationPhaseDialog
        isOpen={isPreparationDialogOpen}
        onClose={() => setIsPreparationDialogOpen(false)}
        roomId={roomId}
      />
    </>
  );
};

export default JudgeActionPanel;
