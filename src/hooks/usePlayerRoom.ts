
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

interface PlayerRoomInfo {
  roomId: string | null;
  roomDbId: string | null;
  isLoading: boolean;
}

export const usePlayerRoom = () => {
  const [playerRoom, setPlayerRoom] = useState<PlayerRoomInfo>({
    roomId: null,
    roomDbId: null,
    isLoading: true
  });
  const { currentUser } = useAuth();

  const checkPlayerRoom = async () => {
    if (!currentUser) {
      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
      return;
    }

    try {
      // Check if player is already in a room
      const { data: roomPlayerData } = await supabase
        .from('room_players')
        .select(`
          room_id,
          rooms!inner(
            id,
            room_id,
            status
          )
        `)
        .eq('user_id', currentUser.id)
        .eq('rooms.status', 'waiting')
        .maybeSingle();

      if (roomPlayerData?.rooms) {
        setPlayerRoom({
          roomId: roomPlayerData.rooms.room_id,
          roomDbId: roomPlayerData.rooms.id,
          isLoading: false
        });
      } else {
        setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error checking player room:', error);
      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
    }
  };

  const leaveCurrentRoom = async (): Promise<boolean> => {
    if (!currentUser || !playerRoom.roomDbId) return false;

    try {
      console.log('Starting cleanup process for user leaving room...');
      
      // First, get the current player's ID from room_players table
      const { data: currentPlayerData } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', playerRoom.roomDbId)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (!currentPlayerData) {
        console.log('Player not found in room_players table');
        setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
        return true;
      }

      const currentPlayerId = currentPlayerData.id;
      console.log('Found current player ID:', currentPlayerId);

      // 1. Remove player's role selection
      const { error: roleSelectionError } = await supabase
        .from('role_selections')
        .delete()
        .eq('room_id', playerRoom.roomDbId)
        .eq('player_id', currentPlayerId);

      if (roleSelectionError) {
        console.error('Error removing role selection:', roleSelectionError);
      } else {
        console.log('Successfully removed role selection');
      }

      // 2. Remove player from player_game_states if exists
      const { error: gameStateError } = await supabase
        .from('player_game_states')
        .delete()
        .eq('player_id', currentPlayerId);

      if (gameStateError) {
        console.error('Error removing player game state:', gameStateError);
      } else {
        console.log('Successfully removed player game state');
      }

      // 3. Remove player's skill uses if exists
      const { error: skillUsesError } = await supabase
        .from('skill_uses')
        .delete()
        .eq('player_id', currentPlayerId);

      if (skillUsesError) {
        console.error('Error removing skill uses:', skillUsesError);
      } else {
        console.log('Successfully removed skill uses');
      }

      // 4. Remove player from voice participants if exists
      const { error: voiceError } = await supabase
        .from('voice_participants')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('room_id', playerRoom.roomDbId);

      if (voiceError) {
        console.error('Error removing voice participant:', voiceError);
      } else {
        console.log('Successfully removed voice participant');
      }

      // 5. Finally, remove player from room_players table
      const { error: leaveError } = await supabase
        .from('room_players')
        .delete()
        .eq('room_id', playerRoom.roomDbId)
        .eq('user_id', currentUser.id);

      if (leaveError) {
        console.error('Error leaving room:', leaveError);
        return false;
      }

      console.log('Successfully removed player from room_players');

      // 6. Check if room is now empty and delete it
      const { data: remainingPlayers } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', playerRoom.roomDbId);

      if (!remainingPlayers || remainingPlayers.length === 0) {
        console.log('Room is now empty, deleting room and related data...');
        
        // Delete game states for this room
        await supabase
          .from('game_states')
          .delete()
          .eq('room_id', playerRoom.roomDbId);

        // Delete the room itself
        await supabase
          .from('rooms')
          .delete()
          .eq('id', playerRoom.roomDbId);
        
        console.log('Successfully deleted empty room and related data');
      }

      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
      console.log('Cleanup process completed successfully');
      return true;
    } catch (error) {
      console.error('Error during room cleanup:', error);
      return false;
    }
  };

  useEffect(() => {
    checkPlayerRoom();
  }, [currentUser]);

  return {
    playerRoom,
    checkPlayerRoom,
    leaveCurrentRoom
  };
};
