
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Settings,
  Crown,
  User,
  Bot
} from 'lucide-react';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

interface GameRoomInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
}

export const GameRoomInfoDialog: React.FC<GameRoomInfoDialogProps> = ({
  open,
  onOpenChange,
  roomId
}) => {
  const { room, loading: roomLoading } = useRoomRealtime(roomId);
  const { players, loading: playersLoading } = usePlayersRealtime(roomId);

  if (roomLoading || playersLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-werewolf-card border-werewolf-purple/30">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const readyCount = players.filter(p => p.isReady).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-werewolf-card border-werewolf-purple/30">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            房间信息
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* 房间信息 */}
            <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-werewolf-purple flex items-center text-base">
                  <Settings className="mr-2 h-4 w-4" />
                  房间详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">房间ID</p>
                    <p className="font-semibold text-white">{room?.room_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">房间状态</p>
                    <Badge variant="outline" className={
                      room?.status === 'active' 
                        ? 'border-green-500 text-green-200'
                        : 'border-gray-500 text-gray-200'
                    }>
                      {room?.status === 'active' ? '游戏中' : 
                       room?.status === 'waiting' ? '等待中' : '已关闭'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">最大玩家数</p>
                    <p className="font-semibold text-white">{room?.max_players} 人</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">准备情况</p>
                    <p className="font-semibold text-white">{readyCount}/{players.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 玩家状态 */}
            <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-werewolf-purple flex items-center text-base">
                  <Users className="mr-2 h-4 w-4" />
                  玩家状态 ({players.length}/{room?.max_players})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {players.length === 0 ? (
                    <div className="col-span-2 text-center text-gray-400 py-4">
                      暂无玩家
                    </div>
                  ) : (
                    players.map((player) => (
                      <div 
                        key={player.id}
                        className="flex items-center space-x-3 p-3 bg-werewolf-dark/60 rounded-md"
                      >
                        {player.avatar ? (
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-werewolf-purple/60 flex items-center justify-center">
                            {player.isAI ? (
                              <Bot className="h-5 w-5 text-white" />
                            ) : (
                              <User className="h-5 w-5 text-white" />
                            )}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-white truncate">
                              {player.name}
                            </p>
                            {player.isHost && (
                              <Crown className="h-4 w-4 text-yellow-400" />
                            )}
                            {player.isAI && (
                              <Badge variant="outline" className="border-blue-500 text-blue-200 text-xs">
                                AI
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={
                                player.isReady 
                                  ? 'border-green-500 text-green-200' 
                                  : 'border-yellow-500 text-yellow-200'
                              }
                            >
                              {player.isReady ? '已准备' : '未准备'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
