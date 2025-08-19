import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface PermissionsState {
  isJudge: boolean;
  isRoomParticipant: boolean;
  loading: boolean;
}

export const usePermissions = (roomId?: string) => {
  const { currentUser, isLoggedIn, initializing, requireAuth } = useAuth();
  const [permissions, setPermissions] = useState<PermissionsState>({
    isJudge: false,
    isRoomParticipant: false,
    loading: true
  });

  useEffect(() => {
    const checkPermissions = async () => {
      if (!roomId || !currentUser?.id || !isLoggedIn) {
        setPermissions({
          isJudge: false,
          isRoomParticipant: false,
          loading: false
        });
        return;
      }

      setPermissions(prev => ({ ...prev, loading: true }));

      try {
        // 检查是否是法官
        const { data: room } = await supabase
          .from('rooms')
          .select('judge_user_id')
          .eq('id', roomId)
          .single();

        const isJudge = room?.judge_user_id === currentUser.id;

        // 检查是否是房间参与者
        const { data: roomPlayer } = await supabase
          .from('room_players')
          .select('id')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .single();

        const isRoomParticipant = !!roomPlayer || isJudge;

        setPermissions({
          isJudge,
          isRoomParticipant,
          loading: false
        });
      } catch (error) {
        console.error('Error checking permissions:', error);
        setPermissions({
          isJudge: false,
          isRoomParticipant: false,
          loading: false
        });
      }
    };

    if (!initializing) {
      checkPermissions();
    }
  }, [roomId, currentUser?.id, isLoggedIn, initializing]);

  return {
    ...permissions,
    requireAuth
  };
};