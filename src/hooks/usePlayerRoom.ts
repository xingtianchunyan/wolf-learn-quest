
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

  const leaveCurrentRoom = async (isPreparationPhase: boolean = true): Promise<boolean> => {
    if (!currentUser) {
      console.log('No current user to leave room');
      return false;
    }

    try {
      console.log('Attempting to leave room...');
      console.log('User ID:', currentUser.id);
      console.log('Is preparation phase:', isPreparationPhase);

      // 首先查找用户当前在哪个房间
      const { data: currentPlayerData, error: playerError } = await supabase
        .from('room_players')
        .select(`
          id,
          room_id,
          rooms!inner(
            id,
            room_id,
            status
          )
        `)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      console.log('Current player data found:', currentPlayerData);

      if (playerError) {
        console.error('Error fetching current player:', playerError);
        return false;
      }

      if (!currentPlayerData) {
        console.log('Player not found in any room - already left or not joined');
        // 更新本地状态
        setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
        return true;
      }

      const roomDbId = currentPlayerData.room_id;

      if (isPreparationPhase) {
        // 清除用户的角色选择数据
        console.log('Clearing role selections for player ID:', currentPlayerData.id);
        const { error: roleSelectionError } = await supabase
          .from('role_selections')
          .delete()
          .eq('room_id', roomDbId)
          .eq('player_id', currentPlayerData.id);

        if (roleSelectionError) {
          console.error('Error clearing role selection:', roleSelectionError);
          // 继续执行，不要因为角色选择清除失败而停止整个流程
        }

        // 清除用户的房间玩家数据
        console.log('Removing player from room');
        const { error: leaveError } = await supabase
          .from('room_players')
          .delete()
          .eq('id', currentPlayerData.id);

        if (leaveError) {
          console.error('Error leaving room:', leaveError);
          return false;
        }

        console.log('Successfully removed player from room');

        // 检查房间是否为空，如果为空则删除房间
        const { data: remainingPlayers, error: remainingError } = await supabase
          .from('room_players')
          .select('id')
          .eq('room_id', roomDbId);

        if (remainingError) {
          console.error('Error checking remaining players:', remainingError);
        } else {
          console.log('Remaining players count:', remainingPlayers?.length || 0);
        }

        if (!remainingPlayers || remainingPlayers.length === 0) {
          console.log('Room is empty, deleting room and related data');
          
          // 删除房间相关的所有数据
          const { error: roleDelError } = await supabase
            .from('role_selections')
            .delete()
            .eq('room_id', roomDbId);

          if (roleDelError) {
            console.error('Error deleting remaining role selections:', roleDelError);
          }

          const { error: gameStateDelError } = await supabase
            .from('game_states')
            .delete()
            .eq('room_id', roomDbId);

          if (gameStateDelError) {
            console.error('Error deleting game states:', gameStateDelError);
          }

          const { error: roomDelError } = await supabase
            .from('rooms')
            .delete()
            .eq('id', roomDbId);

          if (roomDelError) {
            console.error('Error deleting room:', roomDelError);
          } else {
            console.log('Successfully deleted empty room');
          }
        }
      } else {
        // 游戏阶段退出：保留所有数据，只更新玩家状态
        console.log('Updating player status to disconnected');
        const { error: updateError } = await supabase
          .from('room_players')
          .update({ status: 'disconnected' })
          .eq('id', currentPlayerData.id);

        if (updateError) {
          console.error('Error updating player status:', updateError);
          return false;
        }
      }

      // 更新本地状态
      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
      console.log('Successfully left room');
      return true;
    } catch (error) {
      console.error('Error leaving room:', error);
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
