
import React from 'react';
import { User } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'dying' | 'weak' | 'eliminated';
}

interface PlayerStatusDisplayProps {
  players: Player[];
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({ players }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400 border-green-400';
      case 'dying': return 'text-red-400 border-red-400 animate-pulse';
      case 'weak': return 'text-yellow-400 border-yellow-400';
      case 'eliminated': return 'text-gray-500 border-gray-500';
      default: return 'text-green-400 border-green-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '正常';
      case 'dying': return '濒死';
      case 'weak': return '虚弱';
      case 'eliminated': return '淘汰';
      default: return '正常';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {players.map((player) => (
        <div 
          key={player.id}
          className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30"
        >
          <div className="flex items-center justify-center mb-2">
            <User 
              className={`h-8 w-8 border-2 rounded-full p-1 ${getStatusColor(player.status)}`}
              style={{
                animation: player.status === 'dying' ? 'pulse 1s infinite' : 'none'
              }}
            />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-300 text-sm">{player.name}</div>
            <div className="text-xs text-werewolf-purple">{player.role}</div>
            <div className={`text-xs ${getStatusColor(player.status).split(' ')[0]}`}>
              {getStatusText(player.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatusDisplay;
