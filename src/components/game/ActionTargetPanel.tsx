
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Sun, Sunset, Moon, Sunrise } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface ActionTargetPanelProps {
  roomId: string;
  onPlayerSelect?: (playerId: string) => void;
  selectedPlayerId?: string | null;
}

interface PlayerData {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'waiting';
  avatar: string;
  roleImageUrl: string | null;
  userId?: string;
  isCurrentPlayer: boolean;
}

const ActionTargetPanel: React.FC<ActionTargetPanelProps> = ({ 
  roomId, 
  onPlayerSelect,
  selectedPlayerId 
}) => {
  const { gameState, getPhaseDisplayName } = useGameState(roomId);
  const { players: realPlayers } = usePlayersRealtime(roomId);
  const { getRoleImageUrl } = useRoleDesigns();
  const { currentUser } = useAuth();
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [flippedPlayers, setFlippedPlayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchRoomData = async () => {
      const { data } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomId)
        .single();
      if (data && data.max_players) {
        setMaxPlayers(data.max_players);
      }
    };
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    realPlayers.length,
    maxPlayers
  );

  const displayPlayers: PlayerData[] = Array.from({ length: maxPlayers }, (_, i) => {
    if (i < realPlayers.length) {
      const player = realPlayers[i];
      const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
      const roleName = selectedRole?.roleName || '';
      const roleImageUrl = selectedRole?.roleDesign?.role_name ? getRoleImageUrl(selectedRole.roleDesign.role_name) : null;
      const isCurrentPlayer = player.userId === currentUser?.id;
      
      return {
        id: player.id,
        name: player.name,
        role: isCurrentPlayer ? roleName : '点击翻面',
        status: 'normal' as const,
        avatar: player.avatar,
        roleImageUrl,
        userId: player.userId,
        isCurrentPlayer,
      };
    } else {
      return {
        id: `placeholder-${i}`,
        name: '等待玩家',
        role: '',
        status: 'waiting' as const,
        avatar: '',
        roleImageUrl: null,
        userId: undefined,
        isCurrentPlayer: false,
      };
    }
  });

  const getPhaseIcon = (phase: number) => {
    switch (phase) {
      case 1: return <Sun className="h-5 w-5 text-yellow-400" />;
      case 2: return <Sunset className="h-5 w-5 text-orange-400" />;
      case 3: return <Moon className="h-5 w-5 text-blue-400" />;
      case 4: return <Sunrise className="h-5 w-5 text-pink-400" />;
      default: return <Sun className="h-5 w-5" />;
    }
  };

  const getPhaseColor = (phase: number) => {
    switch (phase) {
      case 1: return 'bg-yellow-900/30 text-yellow-200 border-yellow-500';
      case 2: return 'bg-orange-900/30 text-orange-200 border-orange-500';
      case 3: return 'bg-blue-900/30 text-blue-200 border-blue-500';
      case 4: return 'bg-pink-900/30 text-pink-200 border-pink-500';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-500';
    }
  };

  const handlePlayerFlip = (playerId: string) => {
    if (displayPlayers.find(p => p.id === playerId)?.isCurrentPlayer) return;
    
    setFlippedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const handlePlayerSelect = (playerId: string) => {
    const player = displayPlayers.find(p => p.id === playerId);
    if (player?.status === 'waiting' || !player?.userId) return;
    
    onPlayerSelect?.(playerId);
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            行动对象
          </div>
          {gameState && (
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className={getPhaseColor(gameState.currentPhase)}>
                {getPhaseIcon(gameState.currentPhase)}
                <span className="ml-2">{getPhaseDisplayName(gameState.currentPhase)}</span>
              </Badge>
              <Badge variant="outline" className="border-werewolf-purple/50">
                第 {gameState.currentRound} 轮
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 玩家面板网格 */}
        <div className="grid grid-cols-4 gap-3">
          {displayPlayers.map((player) => {
            const isFlipped = flippedPlayers.has(player.id);
            const isSelected = selectedPlayerId === player.id;
            
            return (
              <div
                key={player.id}
                className={`relative aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  player.status === 'waiting'
                    ? 'border-gray-600 bg-gray-800/50'
                    : isSelected
                      ? 'border-werewolf-purple bg-werewolf-purple/20'
                      : 'border-gray-500 bg-werewolf-dark/40 hover:border-werewolf-purple/50'
                }`}
                onClick={() => handlePlayerFlip(player.id)}
              >
                {/* 正面 */}
                <div className={`absolute inset-0 rounded-lg p-2 flex flex-col items-center justify-center transition-transform duration-500 ${
                  isFlipped && !player.isCurrentPlayer ? 'rotate-y-180' : ''
                }`}>
                  {player.status === 'waiting' ? (
                    <div className="text-xs text-gray-500 text-center">等待玩家</div>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-werewolf-purple to-werewolf-light mb-1 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 text-center truncate w-full">
                        {player.name}
                      </div>
                      <div className="text-xs text-werewolf-purple text-center">
                        {player.role}
                      </div>
                    </>
                  )}
                </div>

                {/* 背面（仅非当前玩家显示） */}
                {!player.isCurrentPlayer && player.status !== 'waiting' && (
                  <div className={`absolute inset-0 rounded-lg p-2 flex flex-col items-center justify-center transition-transform duration-500 rotate-y-180 ${
                    isFlipped ? 'rotate-y-0' : ''
                  }`}>
                    {player.roleImageUrl ? (
                      <img 
                        src={player.roleImageUrl} 
                        alt={player.role}
                        className="w-12 h-12 object-cover rounded mb-1"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-werewolf-dark rounded mb-1 flex items-center justify-center">
                        <span className="text-xs text-gray-500">角色</span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2 border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayerSelect(player.id);
                      }}
                    >
                      {isSelected ? '已选中' : '选中玩家'}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 选中状态提示 */}
        {selectedPlayerId && (
          <div className="p-3 bg-werewolf-purple/20 rounded-md border border-werewolf-purple/50">
            <div className="text-sm text-werewolf-purple">
              已选中目标: {displayPlayers.find(p => p.id === selectedPlayerId)?.name}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionTargetPanel;
