
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Room {
  id: string;
  room_id: string;
  max_players: number;
  status: string;
  judge_user_id?: string | null;
  host_id?: string | null;
}

export const useRoomRealtime = (roomId: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    // Initial fetch
    const fetchRoom = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (error) {
          console.error('Error fetching room:', error);
        } else if (data) {
          setRoom(data);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

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
            setRoom(payload.new as Room);
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
    room,
    loading,
    updateMaxPlayers
  };
};
