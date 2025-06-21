
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

interface PlayerStatusDisplayProps {
  roomId: string;
  hideRoles?: boolean;
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({ 
  roomId, 
  hideRoles = false 
}) => {
  const { players, loading } = usePlayersRealtime(roomId);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Users className="mr-2 h-5 w-5" />
          玩家状态
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {loading ? (
              <div className="text-center text-gray-400">加载中...</div>
            ) : players.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                暂无玩家信息
              </div>
            ) : (
              players.map((player) => (
                <div key={player.id} className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        player.is_ready ? 'bg-green-500' : 'bg-gray-500'
                      }`} />
                      <span className="font-medium text-gray-300">
                        {player.users?.player_name || 'Unknown Player'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {player.is_ai ? 'AI' : '玩家'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">状态: </span>
                      <span className={player.is_ready ? 'text-green-400' : 'text-gray-400'}>
                        {player.is_ready ? '准备' : '未准备'}
                      </span>
                    </div>
                    {!hideRoles && (
                      <div>
                        <span className="text-gray-400">角色: </span>
                        <span className="text-werewolf-purple">
                          {player.selected_character || '未选择'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-400">
                    ID: {player.user_id.slice(0, 8)}...
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PlayerStatusDisplay;
