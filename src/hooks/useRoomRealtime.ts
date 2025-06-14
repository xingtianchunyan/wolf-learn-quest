
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RoomRealtimeData {
  maxPlayers: number;
  status: string;
  lastUpdate: Date;
  judge_user_id: string | null;
}

export const useRoomRealtime = (roomId: string) => {
  const [roomData, setRoomData] = useState<RoomRealtimeData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Subscribe to room changes
    const channel = supabase
      .channel(`room_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`
        },
        (payload) => {
          console.log('Room update received:', payload);
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as any;
            if (newData.max_players !== undefined && newData.status !== undefined) {
              setRoomData({
                maxPlayers: newData.max_players,
                status: newData.status,
                lastUpdate: new Date(),
                judge_user_id: newData.judge_user_id,
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
    updateMaxPlayers
  };
};
