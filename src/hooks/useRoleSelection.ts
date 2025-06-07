
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RoleSelection {
  id: string;
  room_id: string;
  player_id: string;
  role_id: string;
  selected_at: string;
}

export const useRoleSelection = (roomId: string, currentPlayerId: string | null) => {
  const [roleSelections, setRoleSelections] = useState<RoleSelection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    // 初始获取角色选择
    const fetchRoleSelections = async () => {
      try {
        const { data, error } = await supabase
          .from('role_selections')
          .select('*')
          .eq('room_id', roomId);

        if (error) {
          console.error('Error fetching role selections:', error);
          return;
        }

        setRoleSelections(data || []);
      } catch (error) {
        console.error('Error fetching role selections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleSelections();

    // 订阅角色选择变化
    const channel = supabase
      .channel(`role_selections_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'role_selections',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Role selection update received:', payload);
          fetchRoleSelections();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const selectRole = async (roleId: string) => {
    if (!currentPlayerId || !roomId) return false;

    try {
      const { error } = await supabase
        .from('role_selections')
        .upsert({
          room_id: roomId,
          player_id: currentPlayerId,
          role_id: roleId
        });

      if (error) {
        console.error('Error selecting role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error selecting role:', error);
      return false;
    }
  };

  const unselectRole = async () => {
    if (!currentPlayerId || !roomId) return false;

    try {
      const { error } = await supabase
        .from('role_selections')
        .delete()
        .eq('room_id', roomId)
        .eq('player_id', currentPlayerId);

      if (error) {
        console.error('Error unselecting role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error unselecting role:', error);
      return false;
    }
  };

  const getSelectedRoleByPlayer = (playerId: string) => {
    return roleSelections.find(selection => selection.player_id === playerId)?.role_id || null;
  };

  const isRoleSelected = (roleId: string) => {
    return roleSelections.some(selection => selection.role_id === roleId);
  };

  const getCurrentPlayerSelection = () => {
    if (!currentPlayerId) return null;
    return getSelectedRoleByPlayer(currentPlayerId);
  };

  return {
    roleSelections,
    loading,
    selectRole,
    unselectRole,
    getSelectedRoleByPlayer,
    isRoleSelected,
    getCurrentPlayerSelection
  };
};
