
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
}

export const usePlayersRealtime = (roomId: string) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    // 获取玩家列表
    const fetchPlayers = async () => {
      try {
        console.log('Fetching players for room:', roomId);
        
        // 修复查询：简化 join 语法
        const { data: roomPlayers, error } = await supabase
          .from('room_players')
          .select(`
            id,
            is_ready,
            is_ai,
            user_id,
            users (
              player_name,
              avatar_url
            )
          `)
          .eq('room_id', roomId);

        if (error) {
          console.error('Error fetching players:', error);
          return;
        }

        console.log('Raw room players data:', roomPlayers);

        // 获取房间信息以确定房主
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('host_id')
          .eq('id', roomId)
          .single();

        if (roomError) {
          console.error('Error fetching room data:', roomError);
          return;
        }

        console.log('Room data:', roomData);

        if (roomPlayers) {
          const transformedPlayers: Player[] = roomPlayers.map((player: any) => {
            console.log('Transforming player:', player);
            
            // 处理 AI 玩家和真实玩家的名称
            let playerName = 'Unknown';
            if (player.is_ai) {
              playerName = `AI-Player-${player.id.slice(0, 8)}`;
            } else if (player.users && player.users.player_name) {
              playerName = player.users.player_name;
            }
            
            return {
              id: player.id,
              name: playerName,
              avatar: player.users?.avatar_url || '',
              isReady: player.is_ready || false,
              isHost: roomData?.host_id === player.user_id,
              isAI: player.is_ai || false
            };
          });
          
          console.log('Transformed players:', transformedPlayers);
          setPlayers(transformedPlayers);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();

    // 订阅房间玩家变化
    const channel = supabase
      .channel(`room_players_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Player update received:', payload);
          // 重新获取玩家列表以确保数据同步
          fetchPlayers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const updatePlayerReady = async (playerId: string, isReady: boolean) => {
    try {
      const { error } = await supabase
        .from('room_players')
        .update({ is_ready: isReady })
        .eq('id', playerId);

      if (error) {
        console.error('Error updating player ready status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating player ready status:', error);
      return false;
    }
  };

  const addAIPlayer = async () => {
    try {
      const { error } = await supabase
        .from('room_players')
        .insert({
          room_id: roomId,
          is_ai: true,
          is_ready: true,
          user_id: null
        });

      if (error) {
        console.error('Error adding AI player:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error adding AI player:', error);
      return false;
    }
  };

  return {
    players,
    loading,
    updatePlayerReady,
    addAIPlayer
  };
};
