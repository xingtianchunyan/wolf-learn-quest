
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useAuth } from '@/providers/AuthProvider';

interface ActionTargetPanelProps {
  roomId: string;
  maxPlayers: number;
  onPlayerSelect?: (playerId: string) => void;
  selectedPlayerId?: string;
}

const ActionTargetPanel: React.FC<ActionTargetPanelProps> = ({ 
  roomId, 
  maxPlayers, 
  onPlayerSelect,
  selectedPlayerId 
}) => {
  const { currentUser } = useAuth();
  const { players, loading } = usePlayersRealtime(roomId);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, players.length, maxPlayers);
  const { getLocalImageByDesignId } = useRoleDesigns();

  const handleCardFlip = (playerId: string) => {
    setFlippedCards(prev => {
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
    if (onPlayerSelect) {
      onPlayerSelect(playerId);
    }
  };

  const isFlipped = (playerId: string) => flippedCards.has(playerId);

  // 生成等待玩家的占位符
  const waitingSlots = Array.from({ length: maxPlayers - players.length }, (_, index) => ({
    id: `waiting-${index}`,
    name: '等待玩家',
    role: '',
    status: 'waiting' as const,
    avatar: '',
    userId: null,
  }));

  const allSlots = [...players.map(p => ({ ...p, status: 'normal' as const })), ...waitingSlots];

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
        <CardContent className="p-4 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
            <p className="text-sm text-gray-400">加载玩家信息...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Users className="mr-2 h-5 w-5" />
          行动对象 ({players.length}/{maxPlayers})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pr-4">
            {allSlots.map((player) => {
              const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
              const isCurrentPlayer = player.userId === currentUser?.id;
              const roleName = isCurrentPlayer && selectedRole?.roleName ? selectedRole.roleName : '点击翻面';
              const roleImageUrl = selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null;
              const isSelected = selectedPlayerId === player.id;

              return (
                <div 
                  key={player.id}
                  className={`relative transition-all duration-300 transform hover:scale-105 ${
                    isSelected ? 'ring-2 ring-werewolf-purple' : ''
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  <div 
                    className={`relative w-full h-32 transition-transform duration-700 transform-style-preserve-3d ${
                      isFlipped(player.id) ? 'rotate-y-180' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* 正面 */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg p-3 backface-hidden cursor-pointer ${
                        player.status === 'waiting' 
                          ? 'bg-gray-600/40 border-2 border-gray-500'
                          : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60 border-2 border-werewolf-purple/30'
                      }`}
                      style={{ backfaceVisibility: 'hidden' }}
                      onClick={() => player.status !== 'waiting' && handleCardFlip(player.id)}
                    >
                      <div className="h-full flex flex-col items-center justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          {player.avatar && player.status !== 'waiting' ? (
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                              player.status === 'waiting' ? 'bg-gray-500' : 'bg-werewolf-purple/60'
                            }`}>
                              {player.status === 'waiting' ? '?' : player.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <h4 className="font-semibold text-sm text-white truncate">
                            {player.name}
                          </h4>
                          <p className="text-xs text-werewolf-purple mt-1 font-medium">
                            {roleName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 背面 */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg backface-hidden rotate-y-180 cursor-pointer overflow-hidden ${
                        player.status === 'waiting' 
                          ? 'bg-gray-600/40 border-2 border-gray-500'
                          : 'bg-werewolf-purple/30 border-2 border-werewolf-purple'
                      }`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                      onClick={() => handleCardFlip(player.id)}
                    >
                      <div className="relative h-full">
                        {roleImageUrl && player.status !== 'waiting' && isCurrentPlayer ? (
                          <img 
                            src={roleImageUrl} 
                            alt={roleName}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className={`fallback-icon ${roleImageUrl && isCurrentPlayer ? 'hidden' : 'flex'} w-full h-full rounded-lg items-center justify-center text-6xl ${
                          player.status === 'waiting' ? 'bg-gray-500' : 'bg-werewolf-purple/60'
                        }`}>
                          🎭
                        </div>
                        
                        {player.status !== 'waiting' && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <Button
                              size="sm"
                              className="w-full bg-werewolf-purple/80 hover:bg-werewolf-purple text-white text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayerSelect(player.id);
                              }}
                            >
                              选中玩家
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActionTargetPanel;
