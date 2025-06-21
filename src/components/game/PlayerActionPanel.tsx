
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Gamepad2, Vote, Settings, Zap, Shield } from 'lucide-react';
import { useVoteResults } from '@/hooks/useVoteResults';
import RoomInfoDialog from './RoomInfoDialog';

interface PlayerActionPanelProps {
  roomId: string;
  onVoteConfirm?: () => void;
  onVoteCancel?: () => void;
  onUseSkill?: () => void;
  onSkillType?: () => void;
}

const PlayerActionPanel: React.FC<PlayerActionPanelProps> = ({
  roomId,
  onVoteConfirm,
  onVoteCancel,
  onUseSkill,
  onSkillType
}) => {
  const [isRoomInfoOpen, setIsRoomInfoOpen] = useState(false);
  const { voteRecords, loading: voteLoading } = useVoteResults(roomId);

  const handleRoomInfoClick = () => {
    setIsRoomInfoOpen(true);
  };

  return (
    <>
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-3">
          <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Gamepad2 className="mr-2 h-5 w-5" />
              玩家行动
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRoomInfoClick}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <Settings className="mr-2 h-4 w-4" />
              房间信息
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-4 pt-0 overflow-hidden flex flex-col">
          {/* 投票列表 */}
          <div className="flex-1 overflow-hidden mb-4">
            <h3 className="font-semibold text-werewolf-purple mb-2">当前轮次投票</h3>
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-4">
                {voteLoading ? (
                  <div className="text-center text-gray-400">加载投票结果中...</div>
                ) : voteRecords && voteRecords.length > 0 ? (
                  voteRecords.map((vote, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {vote.voters.length} 票
                        </span>
                        <span className="text-werewolf-purple">
                          → {vote.votedPlayerName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        投票者: {vote.voters.join(', ')}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    暂无投票记录
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* 技能按钮 */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onUseSkill}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              >
                <Zap className="mr-2 h-4 w-4" />
                使用技能
              </Button>
              <Button
                variant="outline"
                onClick={onSkillType}
                className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              >
                <Shield className="mr-2 h-4 w-4" />
                技能类型
              </Button>
            </div>

            {/* 投票操作按钮 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onVoteConfirm}
                className="bg-green-600 hover:bg-green-700"
              >
                <Vote className="mr-2 h-4 w-4" />
                确认投票
              </Button>
              <Button
                variant="outline"
                onClick={onVoteCancel}
                className="border-red-500/50 hover:bg-red-500/20 text-red-400"
              >
                放弃投票
              </Button>
            </div>
          </div>
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
