
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

interface JudgeActionPanelProps {
  roomId: string;
}

interface VoteRecord {
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
}

const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({ roomId }) => {
  const [isAutoAdvance, setIsAutoAdvance] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isPreparationDialogOpen, setIsPreparationDialogOpen] = useState(false);
  const [isLeavingJudge, setIsLeavingJudge] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Mock voting data
  const voteRecords: VoteRecord[] = [
    {
      votedPlayerId: 'player1',
      votedPlayerName: '玩家1',
      voteCount: 3,
      voters: ['玩家2', '玩家3', '玩家4']
    },
    {
      votedPlayerId: 'player2',
      votedPlayerName: '玩家2',
      voteCount: 2,
      voters: ['玩家5', '玩家6']
    },
    {
      votedPlayerId: 'player3',
      votedPlayerName: '玩家3',
      voteCount: 1,
      voters: ['玩家7']
    },
    {
      votedPlayerId: 'player4',
      votedPlayerName: '玩家4',
      voteCount: 1,
      voters: ['玩家1']
    },
    {
      votedPlayerId: 'player5',
      votedPlayerName: '玩家5',
      voteCount: 0,
      voters: []
    },
  ];

  const handleNextPhase = () => {
    console.log('进入下个阶段');
  };

  const handlePauseGame = () => {
    setIsPaused(!isPaused);
    console.log(isPaused ? '恢复游戏' : '暂停游戏');
  };

  const handleEndGame = () => {
    console.log('结束游戏');
  };

  const handleGameSettlement = () => {
    console.log('游戏结算');
  };

  // ====== 新增：停止扮演法官 ======
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
                  {voteRecords.map((record) => (
                    <TableRow key={record.votedPlayerId} className="border-b border-werewolf-purple/30 last:border-b-0">
                      <TableCell className="text-gray-300">{record.votedPlayerName}</TableCell>
                      <TableCell className="text-gray-300">{record.voteCount}</TableCell>
                      <TableCell className="text-gray-300 text-sm">
                        {record.voters.join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* 自动化设置 */}
          <div className="p-4 bg-werewolf-dark/40 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-werewolf-purple">游戏阶段控制</h3>
              <Switch
                checked={isAutoAdvance}
                onCheckedChange={setIsAutoAdvance}
                checkedLabel="全自动"
                uncheckedLabel="半自动"
              />
            </div>
          </div>

          {/* 游戏控制按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleNextPhase}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              进入下个阶段
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePauseGame}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
              {isPaused ? '恢复游戏' : '暂停游戏'}
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleEndGame}
              className="hover:bg-red-600"
            >
              <Square className="h-4 w-4 mr-2" />
              结束游戏
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGameSettlement}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
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
