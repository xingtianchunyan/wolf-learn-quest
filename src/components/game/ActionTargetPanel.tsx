
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Clock, Play, Pause } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';

interface ActionTargetPanelProps {
  roomId: string;
  onPlayerSelect: (playerId: string) => void;
  selectedPlayerId: string | null;
}

const ActionTargetPanel: React.FC<ActionTargetPanelProps> = ({ 
  roomId, 
  onPlayerSelect, 
  selectedPlayerId 
}) => {
  const { gameState, getPhaseDisplayName, formatTime, timeRemaining } = useGameState(roomId);
  const { players: realPlayers } = usePlayersRealtime(roomId);
  const { getRoleImageUrl } = useRoleDesigns();
  const { currentUser } = useAuth();
  const [maxPlayers] = useState(8);

  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    realPlayers.length,
    maxPlayers
  );

  const displayPlayers = Array.from({ length: maxPlayers }, (_, i) => {
    if (i < realPlayers.length) {
      const player = realPlayers[i];
      const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
      const isCurrentPlayer = player.userId === currentUser?.id;
      
      return {
        id: player.id,
        name: player.name,
        role: isCurrentPlayer ? (selectedRole?.roleName || '') : '',
        status: 'normal' as const,
        avatar: player.avatar,
        roleImageUrl: isCurrentPlayer ? (selectedRole?.roleDesign?.role_name ? getRoleImageUrl(selectedRole.roleDesign.role_name) : null) : null,
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

  const getGameStatusDisplay = () => {
    if (!gameState) return '准备阶段 - 等待中';
    
    switch (gameState.status) {
      case 'waiting':
        return '准备阶段 - 等待开始';
      case 'active':
        return `第${gameState.currentRound}轮 - ${getPhaseDisplayName(gameState.currentPhase)}阶段`;
      case 'ended':
        return '游戏已结束';
      default:
        return '未知状态';
    }
  };

  const showTimer = gameState?.status === 'active' && gameState.phaseEndTime && !gameState.isPaused;

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            行动对象
          </div>
          {gameState?.status === 'active' && (
            <div className="flex items-center text-sm">
              {gameState.isPaused ? (
                <div className="flex items-center text-yellow-400">
                  <Pause className="h-4 w-4 mr-1" />
                  已暂停
                </div>
              ) : (
                <div className="flex items-center text-green-400">
                  <Play className="h-4 w-4 mr-1" />
                  进行中
                </div>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-werewolf-dark/40 rounded-md">
          <h2 className="text-xl font-bold text-werewolf-purple mb-2">
            {getGameStatusDisplay()}
          </h2>
          
          {showTimer && (
            <div className="flex items-center justify-center text-lg font-semibold">
              <Clock className="h-5 w-5 mr-2 text-werewolf-purple" />
              <span className={`${
                timeRemaining <= 10 ? 'text-red-400' : 
                timeRemaining <= 30 ? 'text-yellow-400' : 
                'text-werewolf-purple'
              }`}>
                剩余时间: {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-werewolf-purple">选择行动对象</h3>
          <div className="grid grid-cols-2 gap-3">
            {displayPlayers.map((player) => (
              <div 
                key={player.id}
                className={`p-3 rounded-md border transition-colors ${
                  player.status === 'waiting' 
                    ? 'bg-gray-800/40 border-gray-600' 
                    : player.isCurrentPlayer
                      ? 'bg-werewolf-purple/20 border-werewolf-purple'
                      : selectedPlayerId === player.id
                        ? 'bg-blue-500/20 border-blue-500'
                        : 'bg-werewolf-dark/40 border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {player.avatar ? (
                    <img 
                      src={player.avatar} 
                      alt={player.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">
                        {player.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-300 truncate">
                        {player.name}
                      </p>
                      {player.isCurrentPlayer && (
                        <span className="text-xs bg-werewolf-purple/20 text-werewolf-purple px-1 rounded">
                          我
                        </span>
                      )}
                    </div>
                    
                    {player.isCurrentPlayer && player.role && (
                      <p className="text-xs text-gray-400">{player.role}</p>
                    )}
                  </div>
                  
                  {player.isCurrentPlayer && player.roleImageUrl && (
                    <img 
                      src={player.roleImageUrl} 
                      alt={player.role}
                      className="w-8 h-8 rounded"
                    />
                  )}
                </div>
                
                {!player.isCurrentPlayer && player.status !== 'waiting' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-werewolf-purple/50 hover:bg-werewolf-purple/20"
                    onClick={() => onPlayerSelect(player.id)}
                  >
                    {selectedPlayerId === player.id ? '已选中' : '选中玩家'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionTargetPanel;
