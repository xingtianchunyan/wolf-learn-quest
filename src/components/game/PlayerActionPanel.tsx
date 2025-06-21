
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sword, 
  Settings, 
  Vote,
  Ban,
  Zap,
  Target
} from 'lucide-react';
import { useVoteResults } from '@/hooks/useVoteResults';
import { useGameState } from '@/hooks/useGameState';
import { GameRoomInfoDialog } from '@/components/game/GameRoomInfoDialog';

interface PlayerActionPanelProps {
  roomId: string;
  selectedPlayerId?: string;
}

const PlayerActionPanel: React.FC<PlayerActionPanelProps> = ({ roomId, selectedPlayerId }) => {
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const { gameState } = useGameState(roomId);
  const { voteRecords, loading: voteLoading } = useVoteResults(gameState?.id || null);

  const handleUseSkill = () => {
    // TODO: 实现技能使用逻辑
    console.log('使用技能');
  };

  const handleSkillType = () => {
    // TODO: 实现技能类型选择逻辑
    console.log('选择技能类型');
  };

  const handleConfirmVote = () => {
    if (selectedPlayerId) {
      // TODO: 实现确认投票逻辑
      console.log('确认投票给:', selectedPlayerId);
    }
  };

  const handleAbandonVote = () => {
    // TODO: 实现放弃投票逻辑
    console.log('放弃投票');
  };

  return (
    <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <CardTitle className="text-werewolf-purple flex items-center text-lg">
            <Sword className="mr-2 h-5 w-5" />
            玩家行动
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">
              {/* 房间信息按钮 */}
              <div className="space-y-3">
                <Button
                  onClick={() => setShowRoomInfo(true)}
                  className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  房间信息
                </Button>
              </div>

              {/* 当前轮次投票列表 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-werewolf-purple">当前轮次投票</h3>
                {voteLoading ? (
                  <div className="text-center text-gray-400 py-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
                    加载投票记录...
                  </div>
                ) : voteRecords.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    暂无投票记录
                  </div>
                ) : (
                  <div className="space-y-2">
                    {voteRecords.map((record) => (
                      <div 
                        key={record.id}
                        className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Vote className="h-4 w-4 text-werewolf-purple" />
                            <span className="text-sm text-gray-300">
                              {record.voters} 票投给 {record.votedPlayerName}
                            </span>
                          </div>
                          <Badge variant="outline" className="border-werewolf-purple/50 text-xs">
                            {record.voteCount} 票
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 技能操作 */}
              <div className="space-y-3 pt-3 border-t border-werewolf-purple/30">
                <h3 className="font-semibold text-werewolf-purple">技能操作</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUseSkill}
                    className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    使用技能
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSkillType}
                    className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    技能类型
                  </Button>
                </div>
              </div>

              {/* 投票操作 */}
              <div className="space-y-3 pt-3 border-t border-werewolf-purple/30">
                <h3 className="font-semibold text-werewolf-purple">投票操作</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={handleConfirmVote}
                    disabled={!selectedPlayerId}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    <Vote className="mr-2 h-4 w-4" />
                    确认投票
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleAbandonVote}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    放弃投票
                  </Button>
                </div>
                {selectedPlayerId && (
                  <p className="text-xs text-gray-400 text-center">
                    已选择投票对象
                  </p>
                )}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <GameRoomInfoDialog
        open={showRoomInfo}
        onOpenChange={setShowRoomInfo}
        roomId={roomId}
      />
    </>
  );
};

export default PlayerActionPanel;
