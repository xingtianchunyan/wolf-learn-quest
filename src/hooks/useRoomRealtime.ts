/**
 * 文件级注释：房间基础实时信息 Hook
 * 统一为 realtime 频道追加唯一后缀，避免重复挂载时订阅冲突。
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RoomRealtimeData {
  maxPlayers: number;
  status: string;
  judge_user_id?: string | null;
  lastUpdate: Date;
}

/**
 * 函数级注释：监听房间基础字段变化
 */
export const useRoomRealtime = (roomId: string) => {
  const [roomData, setRoomData] = useState<RoomRealtimeData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const channelSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Subscribe to room changes
    const channel = supabase
      .channel(`room_${roomId}_${channelSuffix}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`,
        },
        payload => {
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as any;
            if (
              newData.max_players !== undefined &&
              newData.status !== undefined
            ) {
              setRoomData({
                maxPlayers: newData.max_players,
                status: newData.status,
                judge_user_id: newData.judge_user_id,
                lastUpdate: new Date(),
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const updateMaxPlayers = async (newMaxPlayers: number) => {
    if (!roomId) return false;

    try {
      const { error } = await supabase
        .from('rooms')
        .update({ max_players: newMaxPlayers })
        .eq('id', roomId);

      if (error) {
        console.error('Error updating max players:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating max players:', error);
      return false;
    }
  };

  return {
    roomData,
    updateMaxPlayers,
  };
};
