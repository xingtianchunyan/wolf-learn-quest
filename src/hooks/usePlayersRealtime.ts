
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
  userId?: string; // 添加userId字段用于在线状态检查  
  role?: string;
}

export const usePlayersRealtime = (roomId: string) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    // 初始获取玩家列表
    const fetchPlayers = async () => {
      try {
        
        // 首先获取房间信息以确定房主
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('host_id')
          .eq('id', roomId)
          .single();

        if (roomError) {
          console.error('Error fetching room data:', roomError);
          return;
        }

        // 获取房间玩家信息，分别查询用户信息
        const { data: roomPlayers, error: playersError } = await supabase
          .from('room_players')
          .select('*')
          .eq('room_id', roomId);

        if (playersError) {
          console.error('Error fetching room players:', playersError);
          return;
        }


        if (roomPlayers && roomPlayers.length > 0) {
          // 获取所有非AI玩家的用户信息
          const userIds = roomPlayers
            .filter(player => !player.is_ai && player.user_id)
            .map(player => player.user_id);

          let usersData: any[] = [];
          if (userIds.length > 0) {
            const { data: users, error: usersError } = await supabase
              .rpc('get_public_user_profiles_by_ids', { p_user_ids: userIds });

            if (usersError) {
              console.error('Error fetching users:', usersError);
            } else {
              usersData = users || [];
            }
          }


          // 转换玩家数据
          const transformedPlayers: Player[] = roomPlayers.map((player: any) => {
            if (player.is_ai) {
              return {
                id: player.id,
                name: `AI-Player-${player.id.slice(0, 8)}`,
                avatar: '',
                isReady: player.is_ready || false,
                isHost: false,
                isAI: true,
                userId: undefined as string | undefined, // AI玩家没有userId                
                role: player.role,
              };
            } else {
              const userData = usersData.find(user => user.user_id === player.user_id);
              return {
                id: player.id,
                name: userData?.player_name || 'Unknown Player',
                avatar: userData?.avatar_url || '',
                isReady: player.is_ready || false,
                isHost: roomData?.host_id === player.user_id,
                isAI: false,
                userId: player.user_id, // 添加userId字段
                role: player.role,
              };
            }
          });
          
          setPlayers(transformedPlayers);
        } else {
          setPlayers([]);
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
