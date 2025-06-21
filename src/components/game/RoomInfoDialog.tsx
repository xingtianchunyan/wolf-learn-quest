
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Settings } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';

interface RoomInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const RoomInfoDialog: React.FC<RoomInfoDialogProps> = ({
  isOpen,
  onClose,
  roomId,
}) => {
  const { players } = usePlayersRealtime(roomId);
  const { currentUser } = useAuth();
  const maxPlayers = 8;

  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    players.length,
    maxPlayers
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-werewolf-card border-werewolf-purple/30">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            房间信息
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {/* 玩家状态面板 */}
          <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
            <CardHeader>
              <CardTitle className="text-werewolf-purple flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                玩家状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3 pr-4">
                  {players.map((player) => {
                    const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
                    
                    return (
                      <div 
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
                      >
                        <div className="flex items-center space-x-3">
                          {player.avatar ? (
                            <img 
                              src={player.avatar} 
                              alt={player.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                              <span className="text-gray-400 text-sm">
                                {player.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-300">{player.name}</p>
                              {player.userId === currentUser?.id && (
                                <span className="text-xs bg-werewolf-purple/20 text-werewolf-purple px-2 py-1 rounded">
                                  我
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">
                              玩家 {players.indexOf(player) + 1}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            player.isReady 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {player.isReady ? '已准备' : '未准备'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* 填充空位 */}
                  {Array.from({ length: maxPlayers - players.length }, (_, i) => (
                    <div 
                      key={`empty-${i}`}
                      className="flex items-center justify-between p-3 bg-gray-800/40 rounded-md border border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">?</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">等待玩家</p>
                          <p className="text-sm text-gray-600">
                            玩家 {players.length + i + 1}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-500/20 text-gray-500">
                        空位
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomInfoDialog;
