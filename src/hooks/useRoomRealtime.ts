
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

export interface RoomPlayer {
  id: string;
  user_id: string;
  is_ai: boolean;
  is_ready: boolean;
  role?: string;
  player_name?: string;
}

export interface RoomRealtimeData {
  players: RoomPlayer[];
  maxPlayers: number;
  playerCount: number;
}

export const useRoomRealtime = (roomDbId: string | null) => {
  const [roomData, setRoomData] = useState<RoomRealtimeData>({
    players: [],
    maxPlayers: 8,
    playerCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // 获取初始房间数据
  const fetchRoomData = async () => {
    if (!roomDbId) return;

    try {
      // 获取房间信息
      const { data: room } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomDbId)
        .single();

      // 获取房间玩家
      const { data: roomPlayers } = await supabase
        .from('room_players')
        .select(`
          id,
          user_id,
          is_ai,
          is_ready,
          role,
          users(player_name)
        `)
        .eq('room_id', roomDbId);

      if (room && roomPlayers) {
        const players = roomPlayers.map(player => ({
          id: player.id,
          user_id: player.user_id || '',
          is_ai: player.is_ai || false,
          is_ready: player.is_ready || false,
          role: player.role,
          player_name: player.users?.player_name || 'Unknown',
        }));

        setRoomData({
          players,
          maxPlayers: room.max_players || 8,
          playerCount: players.length,
        });
      }
    } catch (error) {
      console.error('Error fetching room data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!roomDbId) return;

    fetchRoomData();

    // 监听房间玩家变化
    const playersChannel = supabase
      .channel(`room-players-${roomDbId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
          filter: `room_id=eq.${roomDbId}`,
        },
        () => {
          console.log('Room players changed, refetching...');
          fetchRoomData();
        }
      )
      .subscribe();

    // 监听房间设置变化
    const roomChannel = supabase
      .channel(`room-${roomDbId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomDbId}`,
        },
        () => {
          console.log('Room settings changed, refetching...');
          fetchRoomData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(playersChannel);
      supabase.removeChannel(roomChannel);
    };
  }, [roomDbId]);

  const updatePlayerReady = async (isReady: boolean) => {
    if (!currentUser || !roomDbId) return false;

    try {
      const { error } = await supabase
        .from('room_players')
        .update({ is_ready: isReady })
        .eq('room_id', roomDbId)
        .eq('user_id', currentUser.id);

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
    if (!roomDbId) return false;

    try {
      const aiPlayerName = `AI-Player-${Date.now()}`;
      
      const { error } = await supabase
        .from('room_players')
        .insert({
          room_id: roomDbId,
          is_ai: true,
          is_ready: true,
          user_id: null, // AI players don't have user_id
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
    roomData,
    isLoading,
    updatePlayerReady,
    addAIPlayer,
    refetch: fetchRoomData,
  };
};
