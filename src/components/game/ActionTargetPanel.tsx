
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Users, Target } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useAuth } from '@/providers/AuthProvider';

interface ActionTargetPanelProps {
  roomId: string;
  onPlayerSelect?: (playerId: string) => void;
}

const ActionTargetPanel: React.FC<ActionTargetPanelProps> = ({ 
  roomId, 
  onPlayerSelect 
}) => {
  const { players, loading } = usePlayersRealtime(roomId);
  const { currentUser } = useAuth();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId);
    if (onPlayerSelect) {
      onPlayerSelect(playerId);
    }
  };

  const isCurrentPlayer = (player: any) => {
    return currentUser?.id === player.user_id;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Target className="mr-2 h-5 w-5" />
          行动对象
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
              <div className="grid grid-cols-1 gap-3">
                {players.map((player) => {
                  const isCurrent = isCurrentPlayer(player);
                  const isSelected = selectedPlayerId === player.user_id;
                  
                  return (
                    <div 
                      key={player.id}
                      className={`p-4 rounded-md border transition-all ${
                        isCurrent 
                          ? 'bg-werewolf-purple/20 border-werewolf-purple' 
                          : isSelected
                            ? 'bg-blue-500/20 border-blue-500'
                            : 'bg-werewolf-dark/40 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            player.is_ready ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-300">
                              {player.users?.player_name || 'Unknown Player'}
                              {isCurrent && (
                                <span className="ml-2 text-xs text-werewolf-purple font-bold">
                                  (我)
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400">
                              {player.user_id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                        
                        {isCurrent ? (
                          <div className="text-right">
                            {/* 当前玩家显示角色信息 */}
                            <div className="text-sm text-werewolf-purple font-medium">
                              我的角色
                            </div>
                            {player.selected_character && (
                              <div className="text-xs text-gray-400">
                                {player.selected_character}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePlayerSelect(player.user_id)}
                            className={isSelected 
                              ? "bg-blue-500 hover:bg-blue-600" 
                              : "border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                            }
                          >
                            {isSelected ? '已选中' : '选中玩家'}
                          </Button>
                        )}
                      </div>
                      
                      {isCurrent && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">状态: </span>
                              <span className={player.is_ready ? 'text-green-400' : 'text-gray-400'}>
                                {player.is_ready ? '准备' : '未准备'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">类型: </span>
                              <span className="text-gray-300">
                                {player.is_ai ? 'AI' : '玩家'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActionTargetPanel;
