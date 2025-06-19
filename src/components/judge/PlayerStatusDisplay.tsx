
import React, { useState } from 'react';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useAuth } from '@/providers/AuthProvider';

interface Player {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'waiting';
  avatar: string;
  userId?: string;
}

interface PlayerStatusDisplayProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({ players, roomId, maxPlayers }) => {
  const { currentUser } = useAuth();
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

  const isFlipped = (playerId: string) => flippedCards.has(playerId);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {players.map((player) => {
        const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
        const roleName = selectedRole?.roleName || '未分配角色';
        const roleImageUrl = selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null;

        return (
          <div 
            key={player.id}
            className="relative transition-all duration-300 transform hover:scale-105"
            style={{ perspective: '1000px' }}
          >
            <div 
              className={`relative w-full h-32 transition-transform duration-700 transform-style-preserve-3d ${
                isFlipped(player.id) ? 'rotate-y-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 正面 - 玩家头像和角色名称 */}
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
                  {/* 玩家头像 */}
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
                  
                  {/* 玩家名称和角色 */}
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

              {/* 背面 - 角色图片（隐藏彩蛋） */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-lg p-3 backface-hidden rotate-y-180 cursor-pointer ${
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
                <div className="h-full flex flex-col items-center justify-between">
                  {/* 角色图片 */}
                  <div className="flex-1 flex items-center justify-center">
                    {roleImageUrl && player.status !== 'waiting' ? (
                      <img 
                        src={roleImageUrl} 
                        alt={roleName}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className={`fallback-icon ${roleImageUrl ? 'hidden' : 'flex'} w-16 h-16 rounded-full items-center justify-center text-3xl ${
                      player.status === 'waiting' ? 'bg-gray-500' : 'bg-werewolf-purple/60'
                    }`}>
                      🎭
                    </div>
                  </div>
                  
                  {/* 角色名称 */}
                  <div className="text-center">
                    <h4 className="font-semibold text-sm text-white">
                      {roleName}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      点击返回
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerStatusDisplay;
