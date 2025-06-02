
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RoomRealtimeData {
  maxPlayers: number;
  status: string;
  lastUpdate: Date;
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
          if (payload.new) {
            setRoomData({
              maxPlayers: payload.new.max_players,
              status: payload.new.status,
              lastUpdate: new Date()
            });
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
