
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon, Clock, Play, Pause } from 'lucide-react';
import PlayerStatusDisplay from './PlayerStatusDisplay';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedGameStateDisplayProps {
  roomId: string;
}

const EnhancedGameStateDisplay: React.FC<EnhancedGameStateDisplayProps> = ({
  roomId,
}) => {
  const { gameState, getPhaseDisplayName, formatTime, timeRemaining } = useGameState(roomId);
  const { players: realPlayers } = usePlayersRealtime(roomId);
  const { getRoleImageUrl } = useRoleDesigns();
  const { currentUser } = useAuth();
  const [maxPlayers, setMaxPlayers] = useState(8);

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

  const displayPlayers = Array.from({ length: maxPlayers }, (_, i) => {
    if (i < realPlayers.length) {
      const player = realPlayers[i];
      const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
      const roleName = selectedRole?.roleName || '';
      const roleImageUrl = selectedRole?.roleDesign?.role_name ? getRoleImageUrl(selectedRole.roleDesign.role_name) : null;
      
      return {
        id: player.id,
        name: player.name,
        role: roleName,
        status: 'normal' as const,
        avatar: player.avatar,
        roleImageUrl,
        userId: player.userId,
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
            <GamepadIcon className="mr-2 h-5 w-5" />
            游戏信息
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
        {/* 当前游戏轮次和阶段 */}
        <div className="text-center p-4 bg-werewolf-dark/40 rounded-md">
          <h2 className="text-xl font-bold text-werewolf-purple mb-2">
            {getGameStatusDisplay()}
          </h2>
          
          {/* 显示倒计时 */}
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
          
          {/* 游戏状态说明 */}
          {gameState && (
            <div className="text-sm text-gray-400 mt-2">
              {gameState.status === 'waiting' && '等待法官开始游戏'}
              {gameState.status === 'active' && gameState.currentPhase === 1 && '白天讨论阶段'}
              {gameState.status === 'active' && gameState.currentPhase === 2 && '傍晚答题阶段'}
              {gameState.status === 'active' && gameState.currentPhase === 3 && '夜晚行动阶段'}
              {gameState.status === 'active' && gameState.currentPhase === 4 && '黎明答题阶段'}
              {gameState.status === 'ended' && '游戏结束，可查看结算'}
            </div>
          )}
        </div>

        {/* 玩家角色和状态 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-werewolf-purple">玩家状态</h3>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-green-400"></span>正常</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-yellow-400"></span>虚弱</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-red-400 animate-pulse"></span>濒死</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-white"></span>淘汰</span>
            </div>
          </div>
          <PlayerStatusDisplay 
            players={displayPlayers} 
            roomId={roomId} 
            maxPlayers={maxPlayers} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameStateDisplay;
