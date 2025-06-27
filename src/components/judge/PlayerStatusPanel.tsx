
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Zap, XCircle, Clock } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';

interface PlayerStatusPanelProps {
  roomId: string;
  hideRoleColumn?: boolean;
}

const PlayerStatusPanel: React.FC<PlayerStatusPanelProps> = ({ roomId, hideRoleColumn = false }) => {
  const { players } = usePlayersRealtime(roomId);
  const { currentUser } = useAuth();
  
  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    players.length,
    8
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'alive':
        return <Heart className="h-4 w-4 text-green-400" />;
      case 'injured':
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'dead':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alive':
        return 'bg-green-900/30 text-green-200 border-green-500';
      case 'injured':
        return 'bg-yellow-900/30 text-yellow-200 border-yellow-500';
      case 'dead':
        return 'bg-red-900/30 text-red-200 border-red-500';
      default:
        return 'bg-gray-900/30 text-gray-200 border-gray-500';
    }
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Users className="mr-2 h-5 w-5" />
          玩家状态 ({players.length}名玩家)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {players.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                暂无玩家
              </div>
            ) : (
              players.map((player, index) => {
                const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
                const roleName = selectedRole?.roleName || '';
                // Use default status 'alive' since Player interface doesn't have status property
                const playerStatus = 'alive';
                
                return (
                  <div
                    key={player.id}
                    className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-werewolf-purple to-werewolf-light flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-300">
                            {player.name}
                          </div>
                          {!hideRoleColumn && (
                            <div className="text-sm text-werewolf-purple">
                              {roleName || '未选择角色'}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(playerStatus)}
                        >
                          {getStatusIcon(playerStatus)}
                          <span className="ml-1">
                            {playerStatus === 'alive' ? '存活' : 
                             playerStatus === 'injured' ? '受伤' : 
                             playerStatus === 'dead' ? '死亡' : '等待'}
                          </span>
                        </Badge>
                        {player.isReady && (
                          <Badge variant="outline" className="border-green-500 text-green-200">
                            已准备
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PlayerStatusPanel;
