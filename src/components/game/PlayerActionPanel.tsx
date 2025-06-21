
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Sword, Settings, Zap, Shield, Vote, X } from 'lucide-react';
import RoomInfoDialog from './RoomInfoDialog';
import { useVoteResults } from '@/hooks/useVoteResults';

interface PlayerActionPanelProps {
  roomId: string;
  selectedPlayerId: string | null;
  onVoteConfirm: () => void;
  onVoteCancel: () => void;
}

const PlayerActionPanel: React.FC<PlayerActionPanelProps> = ({ 
  roomId, 
  selectedPlayerId,
  onVoteConfirm,
  onVoteCancel
}) => {
  const [isRoomInfoOpen, setIsRoomInfoOpen] = useState(false);
  const { voteRecords, loading: votesLoading } = useVoteResults(roomId);

  const handleUseSkill = () => {
    // 使用技能逻辑
    console.log('使用技能');
  };

  const handleSkillType = () => {
    // 技能类型逻辑
    console.log('技能类型');
  };

  return (
    <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-werewolf-purple flex items-center text-lg">
              <Sword className="mr-2 h-5 w-5" />
              玩家行动
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRoomInfoOpen(true)}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              房间信息
            </Button>
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
                        暂无投票记录
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* 技能按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleUseSkill}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <Zap className="h-4 w-4 mr-2" />
              使用技能
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSkillType}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <Shield className="h-4 w-4 mr-2" />
              技能类型
            </Button>
          </div>

          {/* 投票按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onVoteConfirm}
              disabled={!selectedPlayerId}
              className="bg-werewolf-purple hover:bg-werewolf-purple/80 disabled:opacity-50"
            >
              <Vote className="h-4 w-4 mr-2" />
              确认投票
            </Button>
            
            <Button
              variant="destructive"
              onClick={onVoteCancel}
              className="hover:bg-red-600"
            >
              <X className="h-4 w-4 mr-2" />
              放弃投票
            </Button>
          </div>

          {selectedPlayerId && (
            <div className="text-center text-sm text-gray-400 p-2 bg-werewolf-dark/20 rounded-md">
              已选择目标玩家，点击确认投票进行投票
            </div>
          )}
        </CardContent>
      </Card>

      <RoomInfoDialog
        isOpen={isRoomInfoOpen}
        onClose={() => setIsRoomInfoOpen(false)}
        roomId={roomId}
      />
    </>
  );
};

export default PlayerActionPanel;
