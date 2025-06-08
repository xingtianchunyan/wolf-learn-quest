
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
    if (!currentUser || !playerRoom.roomDbId) return false;

    try {
      console.log('Leaving room in', isPreparationPhase ? 'preparation' : 'game', 'phase');

      if (isPreparationPhase) {
        // 准备阶段退出：清除用户的角色选择数据
        const { error: roleSelectionError } = await supabase
          .from('role_selections')
          .delete()
          .eq('room_id', playerRoom.roomDbId)
          .eq('player_id', currentUser.id);

        if (roleSelectionError) {
          console.error('Error clearing role selection:', roleSelectionError);
        }

        // 清除用户的房间玩家数据
        const { error: leaveError } = await supabase
          .from('room_players')
          .delete()
          .eq('room_id', playerRoom.roomDbId)
          .eq('user_id', currentUser.id);

        if (leaveError) {
          console.error('Error leaving room:', leaveError);
          return false;
        }

        // 检查房间是否为空，如果为空则删除房间
        const { data: remainingPlayers } = await supabase
          .from('room_players')
          .select('id')
          .eq('room_id', playerRoom.roomDbId);

        if (!remainingPlayers || remainingPlayers.length === 0) {
          console.log('Room is empty, deleting room and related data');
          
          // 删除房间相关的所有数据
          await supabase
            .from('role_selections')
            .delete()
            .eq('room_id', playerRoom.roomDbId);

          await supabase
            .from('game_states')
            .delete()
            .eq('room_id', playerRoom.roomDbId);

          await supabase
            .from('rooms')
            .delete()
            .eq('id', playerRoom.roomDbId);
        }
      } else {
        // 游戏阶段退出：保留所有数据，只更新玩家状态
        const { error: updateError } = await supabase
          .from('room_players')
          .update({ status: 'disconnected' })
          .eq('room_id', playerRoom.roomDbId)
          .eq('user_id', currentUser.id);

        if (updateError) {
          console.error('Error updating player status:', updateError);
          return false;
        }
      }

      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false });
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
