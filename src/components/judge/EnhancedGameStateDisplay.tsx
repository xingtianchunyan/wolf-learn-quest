
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon, User, Heart } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { getRoleConfiguration, expandRoles } from '@/utils/roleConfiguration';
import { Skeleton } from '@/components/ui/skeleton';

interface EnhancedGameStateDisplayProps {
  roomId: string;
}

interface DisplayPlayer {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status: 'normal' | 'placeholder';
  isPlaceholder: boolean;
}

const PlayerCard: React.FC<{ player: DisplayPlayer }> = ({ player }) => {
  const getStatusInfo = (status: DisplayPlayer['status']) => {
    if (player.isPlaceholder) {
      return { color: 'border-white/30', icon: <User className="h-4 w-4 text-white/70" />, text: '等待加入' };
    }
    switch (status) {
      case 'normal':
        return { color: 'border-green-500', icon: <Heart className="h-4 w-4 text-green-400" />, text: '正常' };
      default:
        return { color: 'border-gray-500', icon: <User className="h-4 w-4" />, text: '未知' };
    }
  };

  const statusInfo = getStatusInfo(player.status);

  return (
    <div className={`p-3 rounded-lg border-2 ${statusInfo.color} bg-werewolf-dark/40 flex flex-col items-center justify-center text-center h-32`}>
      <Avatar className="h-10 w-10 mb-2">
        {!player.isPlaceholder && <AvatarImage src={player.avatar} />}
        <AvatarFallback className="bg-werewolf-dark">
          {player.isPlaceholder ? <User className="h-5 w-5 text-white/70" /> : player.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p className="font-semibold text-sm text-gray-200 truncate w-full">{player.name}</p>
      {player.role && <p className="text-xs text-werewolf-purple mt-1">{player.role}</p>}
    </div>
  );
};

const EnhancedGameStateDisplay: React.FC<EnhancedGameStateDisplayProps> = ({ roomId }) => {
  const { gameState, getPhaseDisplayName } = useGameState(roomId);
  const { players: roomPlayers } = usePlayersRealtime(roomId);
  const { currentUser } = useAuth();

  const [maxPlayers, setMaxPlayers] = useState(8);
  const [loadingRoom, setLoadingRoom] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoadingRoom(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomId)
        .single();
      
      if (error) {
        console.error("Error fetching room data:", error);
      } else if (data) {
        setMaxPlayers(data.max_players || 8);
      }
      setLoadingRoom(false);
    };
    fetchRoomData();
  }, [roomId]);
  
  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, roomPlayers.length, maxPlayers);
  
  const displayPlayers: DisplayPlayer[] = useMemo(() => {
    const roleConfigs = getRoleConfiguration(maxPlayers);
    const expandedRoles = expandRoles(roleConfigs);
    const getRoleName = (roleId: string | null): string | undefined => {
      if (!roleId) return undefined;
      const role = expandedRoles.find(r => r.instanceId === roleId);
      return role ? role.name : undefined;
    };

    const players: DisplayPlayer[] = roomPlayers.map(p => {
      const selectedRoleId = p.userId ? getSelectedRoleByUser(p.userId) : null;
      return {
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        role: getRoleName(selectedRoleId),
        status: 'normal',
        isPlaceholder: false,
      };
    });

    const placeholderCount = maxPlayers - players.length;
    const placeholders: DisplayPlayer[] = [];
    if (placeholderCount > 0) {
      for (let i = 0; i < placeholderCount; i++) {
        placeholders.push({
          id: `placeholder-${i}`,
          name: '等待玩家',
          avatar: '',
          role: undefined,
          status: 'placeholder',
          isPlaceholder: true,
        });
      }
    }
    return [...players, ...placeholders];
  }, [roomPlayers, maxPlayers, getSelectedRoleByUser]);

  const displayPhase = gameState?.status === 'waiting' || !gameState ? "等待中" : getPhaseDisplayName(gameState.currentPhase);
  const displayRound = gameState?.status === 'waiting' || !gameState ? "准备阶段" : `第${gameState.currentRound}轮`;

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GamepadIcon className="mr-2 h-5 w-5" />
          游戏信息
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-werewolf-dark/40 rounded-md">
          <h2 className="text-xl font-bold text-werewolf-purple">
            {displayRound} - {displayPhase}
          </h2>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-werewolf-purple">玩家状态</h3>
          {loadingRoom ? (
             <div className="grid grid-cols-4 gap-3">
              {[...Array(maxPlayers)].map((_, i) => <Skeleton key={i} className="h-32 w-full bg-werewolf-dark/40" />)}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {displayPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameStateDisplay;
