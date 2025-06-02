
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Users } from 'lucide-react';
import { RoomPlayer } from '@/hooks/useRoomRealtime';

interface PlayersListProps {
  players: RoomPlayer[];
  currentUserId: string;
  maxPlayers: number;
  onAddAI: () => void;
  onToggleReady: () => void;
  onLeaveRoom: () => void;
  currentUserReady: boolean;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  currentUserId,
  maxPlayers,
  onAddAI,
  onToggleReady,
  onLeaveRoom,
  currentUserReady,
}) => {
  const allReady = players.every(player => player.is_ready);
  const canAddAI = players.length < maxPlayers;

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-werewolf-purple">
          <Users className="inline mr-2 h-5 w-5" />
          玩家 ({players.length}/{maxPlayers})
        </CardTitle>
        {canAddAI && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={onAddAI}
            className="h-8 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
          >
            <Brain className="h-4 w-4 mr-1" />
            添加AI
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60 pr-4">
          <div className="space-y-3">
            {players.map((player) => {
              const isCurrentUser = player.user_id === currentUserId;
              const displayName = isCurrentUser ? '你' : (player.player_name || 'AI玩家');
              
              return (
                <div 
                  key={player.id} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    player.is_ready ? 'bg-green-900/20' : 'bg-werewolf-dark/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className={`${
                        player.is_ai ? 'bg-blue-700' : 'bg-werewolf-purple/70'
                      }`}>
                        {displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{displayName}</p>
                      <div className="flex space-x-2 mt-1">
                        {isCurrentUser && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-xs">
                            你
                          </Badge>
                        )}
                        {player.is_ai && (
                          <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                            AI
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {player.is_ready ? (
                      <Badge className="bg-green-700 text-xs">准备</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">未准备</Badge>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* 显示空位 */}
            {Array.from({ length: maxPlayers - players.length }).map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className="flex items-center justify-between p-2 rounded-md bg-werewolf-dark/20 border border-werewolf-purple/20 border-dashed"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-600">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-500">等待玩家加入...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline"
            className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
            onClick={onLeaveRoom}
          >
            离开房间
          </Button>
          <Button 
            className={currentUserReady ? 'bg-green-700 hover:bg-green-600' : 'bg-werewolf-purple hover:bg-werewolf-light'}
            onClick={onToggleReady}
          >
            {currentUserReady ? '已准备' : '准备'}
          </Button>
        </div>
        
        {players.length >= 6 && (
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-400">
              {allReady ? '所有玩家已准备完毕！' : '等待所有玩家准备...'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayersList;
