
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
import { Gavel, Play, Pause, SkipForward, Square, Calculator } from 'lucide-react';

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
  const [isSemiAuto, setIsSemiAuto] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    }
  ];

  const handleAutoAdvanceToggle = (checked: boolean) => {
    setIsAutoAdvance(checked);
    if (checked) {
      setIsSemiAuto(false);
    } else {
      // 如果关闭全自动，则自动开启半自动
      setIsSemiAuto(true);
    }
  };

  const handleSemiAutoToggle = (checked: boolean) => {
    setIsSemiAuto(checked);
    if (checked) {
      setIsAutoAdvance(false);
    } else {
      // 如果关闭半自动，则自动开启全自动
      setIsAutoAdvance(true);
    }
  };

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

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Gavel className="mr-2 h-5 w-5" />
          法官行动
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {/* 投票结果表格 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-werewolf-purple text-sm">最新投票结果</h3>
              <div className="border border-werewolf-purple/30 rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow className="border-werewolf-purple/30">
                      <TableHead className="text-werewolf-purple text-xs">被投票玩家</TableHead>
                      <TableHead className="text-werewolf-purple text-xs">得票数</TableHead>
                      <TableHead className="text-werewolf-purple text-xs">投票玩家</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {voteRecords.map((record) => (
                      <TableRow key={record.votedPlayerId} className="border-werewolf-purple/30">
                        <TableCell className="text-gray-300 text-xs">{record.votedPlayerName}</TableCell>
                        <TableCell className="text-gray-300 text-xs">{record.voteCount}</TableCell>
                        <TableCell className="text-gray-300 text-xs">
                          {record.voters.join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* 自动化设置 */}
            <div className="space-y-2 p-3 bg-werewolf-dark/40 rounded-md">
              <h3 className="font-semibold text-werewolf-purple mb-2 text-sm">游戏阶段控制</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">全自动切换游戏阶段</span>
                <Switch
                  checked={isAutoAdvance}
                  onCheckedChange={handleAutoAdvanceToggle}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">半自动切换游戏阶段</span>
                <Switch
                  checked={isSemiAuto}
                  onCheckedChange={handleSemiAutoToggle}
                />
              </div>
            </div>

            {/* 游戏控制按钮 */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleNextPhase}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 text-sm h-8"
              >
                <SkipForward className="h-3 w-3 mr-1" />
                进入下个阶段
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePauseGame}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 text-sm h-8"
              >
                {isPaused ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                {isPaused ? '恢复游戏' : '暂停游戏'}
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleEndGame}
                className="hover:bg-red-600 text-sm h-8"
              >
                <Square className="h-3 w-3 mr-1" />
                结束游戏
              </Button>
              
              <Button
                variant="outline"
                onClick={handleGameSettlement}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 text-sm h-8"
              >
                <Calculator className="h-3 w-3 mr-1" />
                游戏结算
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default JudgeActionPanel;
