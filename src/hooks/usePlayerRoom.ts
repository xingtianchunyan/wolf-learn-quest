import { supabase   } from '@/integrations/supabase/client';
import { useAuth   } from '@/providers/AuthProvider';
import { useState, useEffect   } from 'react';

interface PlayerRoomInfo { roomId: string | null;
  roomDbId: string | null;
  isLoading: boolean
}

/**
 * usePlayerRoom函数
 * 自定义Hook
 * @returns void
 */
export const usePlayerRoom = () => { const [playerRoom, setPlayerRoom] = useState<PlayerRoomInfo>( {
    roomId: null,
    roomDbId: null,
    isLoading: true 
});
  const { currentUser  } = useAuth();

/**
 * checkPlayerRoom函数
 * checkPlayerRoom函数的功能描述
 * @returns Promise<void>
 */
const checkPlayerRoom = async () => { if (!currentUser)  {
      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false  
});
      return
}

    try { // Check if player is already in a room
      const { data: roomPlayerData  
} = await supabase;
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

      if (roomPlayerData?.rooms) { setPlayerRoom({
          roomId: roomPlayerData.rooms.room_id,
          roomDbId: roomPlayerData.rooms.id,
          isLoading: false 
})
} else { setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false  
})
}
    } catch (error) { console.error('Error checking player room:', error);
      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false  
})
}
  };

/**
 * leaveCurrentRoom函数
 * leaveCurrentRoom函数的功能描述
 * @returns Promise<void>
 */
const leaveCurrentRoom = async (): Promise<boolean> =>  { if (!currentUser || !playerRoom.roomDbId) return false;

    try {
      // Remove player from room
      const { error: leaveError  
} = await supabase;
      .from('room_players')
      .delete()
      .eq('room_id', playerRoom.roomDbId)
      .eq('user_id', currentUser.id);

      if (leaveError) { console.error('Error leaving room:', leaveError);
        return false
}

      // Also remove player's role selection
      const { error: roleSelectionError  
} = await supabase;
      .from('role_selections')
      .delete()
      .eq('room_id', playerRoom.roomDbId)
      .eq('user_id', currentUser.id);

      if (roleSelectionError) { // Log the error but don't block the rest of the leave process
        console.error('Error deleting role selection on leave:', roleSelectionError)
}

      // Check if room is now empty and delete it
      const { data: remainingPlayers  
} = await supabase;
      .from('room_players')
      .select('id')
      .eq('room_id', playerRoom.roomDbId);

      if (!remainingPlayers || remainingPlayers.length === 0) { await supabase
        .from('rooms')
        .delete()
        .eq('id', playerRoom.roomDbId)
}

      setPlayerRoom({ roomId: null, roomDbId: null, isLoading: false  
});
      return true
} catch (error) { console.error('Error leaving room:', error);
      return false
}
  };

  useEffect(() => {
  checkPlayerRoom()

}, [currentUser]);

  return { playerRoom,
    checkPlayerRoom,
    leaveCurrentRoom }
};
