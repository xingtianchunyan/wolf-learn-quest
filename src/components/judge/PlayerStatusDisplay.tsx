
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
      case 'normal': return 'text-green-400 border-green-400';
      case 'dying': return 'text-red-400 border-red-400 animate-pulse';
      case 'weak': return 'text-yellow-400 border-yellow-400';
      case 'eliminated': return 'text-gray-500 border-gray-500';
      default: return 'text-green-400 border-green-400';
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-400';
      case 'dying': return 'border-red-400 animate-pulse';
      case 'weak': return 'border-yellow-400';
      case 'eliminated': return 'border-gray-500';
      default: return 'border-green-400';
    }
  };

  const toggleFlip = (playerId: string) => {
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

  return (
    <div className="space-y-3">
      {/* 状态说明 */}
      <div className="text-xs text-gray-400 flex flex-wrap gap-4">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          正常
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          虚弱
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          濒死
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          淘汰
        </span>
      </div>

      {/* 玩家卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player) => (
          <div 
            key={player.id}
            className="relative h-24 perspective-1000"
            onClick={() => toggleFlip(player.id)}
          >
            <div className={`
              relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer
              ${flippedCards.has(player.id) ? 'rotate-y-180' : ''}
            `}>
              {/* 正面 - 角色信息 */}
              <div className={`
                absolute inset-0 p-3 bg-werewolf-dark/40 rounded-md border-2 backface-hidden
                ${getBorderColor(player.status)}
              `}>
                <div className="flex items-center justify-center mb-2">
                  <User 
                    className={`h-6 w-6 border-2 rounded-full p-1 ${getStatusColor(player.status)}`}
                  />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-300 text-sm">{player.name}</div>
                  <div className="text-xs text-werewolf-purple">{player.role}</div>
                </div>
              </div>

              {/* 背面 - 角色形象 */}
              <div className={`
                absolute inset-0 p-3 bg-werewolf-dark/40 rounded-md border-2 backface-hidden rotate-y-180
                ${getBorderColor(player.status)}
              `}>
                <div className="flex flex-col items-center justify-center h-full">
                  {player.avatar ? (
                    <img 
                      src={player.avatar} 
                      alt={player.role}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-werewolf-purple/30 flex items-center justify-center">
                      <span className="text-werewolf-purple text-xs font-bold">
                        {player.role.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-300 mt-1">{player.name}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStatusDisplay;
