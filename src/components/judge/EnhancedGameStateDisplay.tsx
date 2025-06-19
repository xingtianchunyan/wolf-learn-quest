
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon } from 'lucide-react';
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
  const { gameState, getPhaseDisplayName } = useGameState(roomId);
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
      };
    } else {
      return {
        id: `placeholder-${i}`,
        name: '等待玩家',
        role: '',
        status: 'waiting' as const,
        avatar: '',
        roleImageUrl: null,
      };
    }
  });

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GamepadIcon className="mr-2 h-5 w-5" />
          游戏信息
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 当前游戏轮次和阶段 */}
        <div className="text-center p-4 bg-werewolf-dark/40 rounded-md">
          <h2 className="text-xl font-bold text-werewolf-purple">
            {gameState && gameState.status !== 'waiting' 
              ? `第${gameState.currentRound}轮 - ${getPhaseDisplayName(gameState.currentPhase)}阶段`
              : '准备阶段 - 等待中'
            }
          </h2>
        </div>

        {/* 玩家角色和状态 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-werewolf-purple">玩家状态</h3>
          <PlayerStatusDisplay players={displayPlayers} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameStateDisplay;
