
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface RoomPlayer {
  id: string;
  user_id: string;
  is_ready: boolean;
  is_ai: boolean;
  users?: {
    player_name: string;
  };
}

interface RoomData {
  id: string;
  room_id: string;
  max_players: number;
  host_id: string;
  status: string;
  room_players: RoomPlayer[];
}

export const useRoomRealtime = (roomDbId: string | null) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // 获取房间数据
  const fetchRoomData = async () => {
    if (!roomDbId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('rooms')
        .select(`
          id,
          room_id,
          max_players,
          host_id,
          status,
          room_players(
            id,
            user_id,
            is_ready,
            is_ai,
            users(player_name)
          )
        `)
        .eq('id', roomDbId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching room data:', error);
        toast({
          title: "错误",
          description: "获取房间数据失败",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setRoomData(data as RoomData);
      }
    } catch (error) {
      console.error('Error fetching room data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新最大玩家数
  const updateMaxPlayers = async (newMaxPlayers: number) => {
    if (!roomDbId) return false;

    try {
      const { error } = await supabase
        .from('rooms')
        .update({ max_players: newMaxPlayers })
        .eq('id', roomDbId);

      if (error) {
        console.error('Error updating max players:', error);
        toast({
          title: "错误",
          description: "更新最大玩家数失败",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating max players:', error);
      return false;
    }
  };

  // 更新玩家准备状态
  const updatePlayerReady = async (userId: string, isReady: boolean) => {
    if (!roomDbId) return false;

    try {
      const { error } = await supabase
        .from('room_players')
        .update({ is_ready: isReady })
        .eq('room_id', roomDbId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating player ready status:', error);
        toast({
          title: "错误",
          description: "更新准备状态失败",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating player ready status:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!roomDbId) return;

    // 初始获取数据
    fetchRoomData();

    // 设置实时监听
    const roomsChannel = supabase
      .channel('room-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomDbId}`,
        },
        (payload) => {
          console.log('Room data changed:', payload);
          fetchRoomData(); // 重新获取完整数据
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
          filter: `room_id=eq.${roomDbId}`,
        },
        (payload) => {
          console.log('Room players changed:', payload);
          fetchRoomData(); // 重新获取完整数据
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomsChannel);
    };
  }, [roomDbId]);

  return {
    roomData,
    isLoading,
    updateMaxPlayers,
    updatePlayerReady,
    refetch: fetchRoomData,
  };
};
