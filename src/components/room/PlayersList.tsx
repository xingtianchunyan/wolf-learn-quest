
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Brain, Minus, Plus } from 'lucide-react';

interface Player {
  id: string;
  user_id: string;
  is_ready: boolean;
  is_ai: boolean;
  users?: {
    player_name: string;
  };
}

interface PlayersListProps {
  players: Player[];
  maxPlayers: number;
  currentUserId: string | null;
  hostId: string;
  isHost: boolean;
  onMaxPlayersChange: (increment: number) => void;
  onAddAIPlayer: () => void;
  onLeaveRoom: () => void;
  onToggleReady: () => void;
  isUserReady: boolean;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  maxPlayers,
  currentUserId,
  hostId,
  isHost,
  onMaxPlayersChange,
  onAddAIPlayer,
  onLeaveRoom,
  onToggleReady,
  isUserReady,
}) => {
  const allReady = players.every(player => player.is_ready);

  return (
    <div className="space-y-6">
      {/* 房间设置 - 只有主机可以修改 */}
      {isHost && (
        <Card className="bg-werewolf-card border-werewolf-purple/30">
          <CardHeader>
            <CardTitle className="text-werewolf-purple">房间设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm text-gray-400 mb-2">最大玩家数</p>
              <div className="flex items-center justify-center space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMaxPlayersChange(-1)}
                  disabled={maxPlayers <= 6}
                  className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg min-w-[2rem] text-center">
                  {maxPlayers}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMaxPlayersChange(1)}
                  disabled={maxPlayers >= 12}
                  className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 玩家列表 */}
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-werewolf-purple">
            <Users className="inline mr-2 h-5 w-5" />
            玩家 ({players.length}/{maxPlayers})
          </CardTitle>
          {isHost && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={onAddAIPlayer}
              disabled={players.length >= maxPlayers}
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
                const playerName = player.users?.player_name || (isCurrentUser ? '你' : `玩家${player.id.slice(-4)}`);
                const isPlayerHost = player.user_id === hostId;
                
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
                        <AvatarFallback className={`${player.is_ai ? 'bg-blue-700' : 'bg-werewolf-purple/70'}`}>
                          {playerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{playerName}</p>
                        <div className="flex space-x-2 mt-1">
                          {isPlayerHost && (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-xs">
                              房主
                            </Badge>
                          )}
                          {player.is_ai && (
                            <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                              AI
                            </Badge>
                          )}
                          {isCurrentUser && (
                            <Badge variant="outline" className="border-green-500 text-green-500 text-xs">
                              你
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {player.is_ready ? (
                        <Badge className="bg-green-700 text-xs">已准备</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">未准备</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
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
              className={isUserReady ? 'bg-green-700 hover:bg-green-600' : 'bg-werewolf-purple hover:bg-werewolf-light'}
              onClick={onToggleReady}
            >
              {isUserReady ? '已准备' : '未准备'}
            </Button>
          </div>
          
          {allReady && players.length >= 6 && (
            <div className="mt-2 p-2 bg-green-900/20 rounded-md text-center">
              <p className="text-sm text-green-400">所有玩家已准备，可以开始游戏！</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayersList;
