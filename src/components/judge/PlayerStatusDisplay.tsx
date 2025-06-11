
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'dying' | 'weak' | 'eliminated';
  avatar?: string;
}

interface PlayerStatusDisplayProps {
  players: Player[];
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({ players }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-400';
      case 'dying': return 'border-red-400 animate-pulse';
      case 'weak': return 'border-yellow-400';
      case 'eliminated': return 'border-gray-500';
      default: return 'border-green-400';
    }
  };

  const getStatusIconColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400 border-green-400';
      case 'dying': return 'text-red-400 border-red-400 animate-pulse';
      case 'weak': return 'text-yellow-400 border-yellow-400';
      case 'eliminated': return 'text-gray-500 border-gray-500';
      default: return 'text-green-400 border-green-400';
    }
  };

  const handleCardClick = (playerId: string) => {
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

  const getRoleImage = (role: string) => {
    // 这里应该返回对应角色的图片路径
    // 暂时使用占位图
    return '/placeholder.svg';
  };

  return (
    <div className="space-y-3">
      {/* 状态说明 */}
      <div className="text-xs text-gray-400 flex flex-wrap gap-4">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border border-green-400 bg-green-400/20"></div>
          正常
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border border-yellow-400 bg-yellow-400/20"></div>
          虚弱
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border border-red-400 bg-red-400/20 animate-pulse"></div>
          濒死
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border border-gray-500 bg-gray-500/20"></div>
          淘汰
        </span>
      </div>

      {/* 玩家卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player) => {
          const isFlipped = flippedCards.has(player.id);
          return (
            <div 
              key={player.id}
              className="relative h-24 perspective-1000 cursor-pointer"
              onClick={() => handleCardClick(player.id)}
            >
              <div 
                className={`
                  relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
                  ${isFlipped ? 'rotate-y-180' : ''}
                `}
              >
                {/* 正面 */}
                <div 
                  className={`
                    absolute inset-0 p-3 bg-werewolf-dark/40 rounded-md border-2 backface-hidden
                    ${getStatusColor(player.status)}
                  `}
                >
                  <div className="flex items-center justify-center mb-2">
                    <User 
                      className={`h-8 w-8 border-2 rounded-full p-1 ${getStatusIconColor(player.status)}`}
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-300 text-sm">{player.name}</div>
                    <div className="text-xs text-werewolf-purple">{player.role}</div>
                  </div>
                </div>

                {/* 背面 */}
                <div 
                  className={`
                    absolute inset-0 p-3 bg-werewolf-dark/40 rounded-md border-2 backface-hidden rotate-y-180
                    ${getStatusColor(player.status)}
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <img 
                      src={getRoleImage(player.role)} 
                      alt={player.role}
                      className="w-12 h-12 rounded object-cover mb-2"
                    />
                    <div className="text-xs text-werewolf-purple text-center">{player.role}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerStatusDisplay;
