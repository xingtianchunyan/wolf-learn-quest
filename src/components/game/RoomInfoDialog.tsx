
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import RoomInfoCard from '@/components/room/RoomInfoCard';
import PlayerStatusPanel from '@/components/judge/PlayerStatusPanel';

interface RoomInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const RoomInfoDialog: React.FC<RoomInfoDialogProps> = ({ isOpen, onClose, roomId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-werewolf-card border-werewolf-purple/30">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">房间信息</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
          {/* 左侧：房间信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-werewolf-purple">房间详情</h3>
            <RoomInfoCard roomId={roomId} />
          </div>
          
          <Separator orientation="vertical" className="hidden lg:block" />
          
          {/* 右侧：玩家状态（去掉角色列） */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-werewolf-purple">玩家状态</h3>
            <PlayerStatusPanel roomId={roomId} hideRoleColumn={true} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomInfoDialog;
