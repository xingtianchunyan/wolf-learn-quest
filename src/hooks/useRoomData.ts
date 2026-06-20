import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useGameState } from './useGameState';
import { usePlayersRealtime } from './usePlayersRealtime';
import { useRoleStates } from './useRoleStates';

export type Room = Tables<'rooms'>;

export interface UseRoomDataReturn {
  room: Room | null;
  players: ReturnType<typeof usePlayersRealtime>['players'];
  gameState: ReturnType<typeof useGameState>['gameState'];
  gameSettings: ReturnType<typeof useGameState>['gameSettings'];
  roleStates: ReturnType<typeof useRoleStates>['roleStates'];
  loading: boolean;
}

export const useRoomData = (roomId: string | undefined): UseRoomDataReturn => {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomLoading, setRoomLoading] = useState(true);

  const { players, loading: playersLoading } = usePlayersRealtime(roomId || '');
  const {
    gameState,
    gameSettings,
    loading: gameStateLoading,
  } = useGameState(roomId || '');
  const { roleStates, loading: roleStatesLoading } = useRoleStates(roomId);

  useEffect(() => {
    if (!roomId) {
      setRoom(null);
      setRoomLoading(false);
      return;
    }

    setRoomLoading(true);

    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (error) {
        console.error('Error fetching room:', error);
        setRoom(null);
      } else {
        setRoom(data as Room);
      }
      setRoomLoading(false);
    };

    fetchRoom();

    const channel = supabase
      .channel(`room_data_${roomId}`)
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
            setRoom(payload.new as Room);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const loading =
    roomLoading || playersLoading || gameStateLoading || roleStatesLoading;

  return {
    room,
    players,
    gameState,
    gameSettings,
    roleStates,
    loading,
  };
};
