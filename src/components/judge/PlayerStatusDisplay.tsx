
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Player {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'waiting';
  avatar: string;
  roleImageUrl?: string | null;
}

interface PlayerStatusDisplayProps {
  players: Player[];
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({ players }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {players.map((player) => (
        <div
          key={player.id}
          className={`p-3 rounded-lg border transition-all ${
            player.status === 'waiting'
              ? 'border-gray-600 bg-gray-800/40 opacity-50'
              : 'border-werewolf-purple/30 bg-werewolf-dark/40 hover:border-werewolf-purple/50'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            {/* 玩家头像 */}
            <Avatar className="w-12 h-12">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback className="bg-werewolf-purple/20 text-werewolf-purple">
                {player.name ? player.name.charAt(0).toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
            
            {/* 玩家名称 */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-300 truncate max-w-full">
                {player.name}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-full">
                {player.role || '未分配角色'}
              </p>
            </div>

            {/* 角色图片 */}
            {player.roleImageUrl && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-werewolf-purple/30">
                <img 
                  src={player.roleImageUrl} 
                  alt={player.role}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatusDisplay;
