
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Users, Settings, Wand2 } from 'lucide-react';
import RoomInfoDialog from './RoomInfoDialog';
import { useVoteResults } from '@/hooks/useVoteResults';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

interface PlayerActionPanelProps {
  roomId: string;
  selectedPlayerId?: string | null;
}

const PlayerActionPanel: React.FC<PlayerActionPanelProps> = ({ roomId, selectedPlayerId }) => {
  const [isRoomInfoOpen, setIsRoomInfoOpen] = useState(false);
  const [skillType, setSkillType] = useState<string>('');
  const { voteRecords, loading: votesLoading } = useVoteResults(roomId);
  const { currentUser } = useAuth();
  const { players } = usePlayersRealtime(roomId);
  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, players.length, 8);

  // 获取当前玩家角色信息
  const currentPlayerRole = currentUser ? getSelectedRoleByUser(currentUser.id) : null;
  const isWitch = currentPlayerRole?.roleDesign?.role_name === 'witch';

  const handleUseSkill = () => {
    if (!selectedPlayerId) {
      alert('请先选择目标玩家');
      return;
    }
    
    if (isWitch && !skillType) {
      alert('请选择技能类型');
      return;
    }
    
    console.log('使用技能:', {
      targetPlayerId: selectedPlayerId,
      skillType: skillType || currentPlayerRole?.roleDesign?.skill_name,
      role: currentPlayerRole?.roleDesign?.role_name
    });
    
    // TODO: 实现技能使用逻辑
  };

  const handleConfirmVote = () => {
    if (!selectedPlayerId) {
      alert('请先选择投票目标');
      return;
    }
    
    console.log('确认投票:', selectedPlayerId);
    // TODO: 实现投票逻辑
  };

  const handleAbandonVote = () => {
    console.log('放弃投票');
    // TODO: 实现放弃投票逻辑
  };

  // 设置默认技能类型
  React.useEffect(() => {
    if (currentPlayerRole?.roleDesign?.skill_name && !isWitch) {
      setSkillType(currentPlayerRole.roleDesign.skill_name);
    }
  }, [currentPlayerRole, isWitch]);

  return (
    <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-werewolf-purple flex items-center text-lg">
              <Users className="mr-2 h-5 w-5" />
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
            <ScrollArea className="h-32">
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
                        当前无投票记录
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* 技能和投票控制 */}
          <div className="space-y-3">
            {/* 技能使用区域 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleUseSkill}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                disabled={!selectedPlayerId}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                使用技能
              </Button>
              
              <Select value={skillType} onValueChange={setSkillType} disabled={!isWitch}>
                <SelectTrigger className="border-werewolf-purple/50">
                  <SelectValue placeholder="技能类型" />
                </SelectTrigger>
                <SelectContent>
                  {isWitch ? (
                    <>
                      <SelectItem value="protect">保护</SelectItem>
                      <SelectItem value="attack">攻击</SelectItem>
                    </>
                  ) : (
                    <SelectItem value={currentPlayerRole?.roleDesign?.skill_name || ''}>
                      {currentPlayerRole?.roleDesign?.skill_name || '无技能'}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* 投票控制 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="default"
                onClick={handleConfirmVote}
                className="bg-werewolf-purple hover:bg-werewolf-light"
                disabled={!selectedPlayerId}
              >
                确认投票
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAbandonVote}
                className="border-gray-500 hover:bg-gray-500/20"
              >
                放弃投票
              </Button>
            </div>
          </div>

          {/* 选中目标提示 */}
          {selectedPlayerId && (
            <div className="p-2 bg-werewolf-purple/20 rounded-md border border-werewolf-purple/50 text-sm">
              <div className="text-werewolf-purple">
                当前选中目标: {players.find(p => p.id === selectedPlayerId)?.name || '未知玩家'}
              </div>
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
