
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RoleSelection {
  id: string;
  room_id: string;
  user_id: string;
  role_id: string;
  selected_at: string;
}

export const useRoleSelection = (roomId: string, currentUserId: string | null, currentPlayerCount: number, maxPlayers: number) => {
  const [roleSelections, setRoleSelections] = useState<RoleSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const [roomDbId, setRoomDbId] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
        setLoading(false);
        return;
    };

    let channel: any;

    const fetchRoleSelections = async (dbId: string) => {
        try {
            const { data, error } = await supabase
                .from('role_selections')
                .select('*')
                .eq('room_id', dbId);

            if (error) {
                console.error('Error fetching role selections:', error);
                setRoleSelections([]);
                return;
            }

            setRoleSelections(data || []);
        } catch (error) {
            console.error('Error fetching role selections:', error);
            setRoleSelections([]);
        } finally {
            setLoading(false);
        }
    };
    
    const initialize = async () => {
      setLoading(true);
      const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('id')
          .eq('room_id', roomId) // Use text ID to get DB UUID
          .single();

      if (roomError || !roomData) {
          console.error("Error fetching room's database ID in useRoleSelection:", roomError);
          setLoading(false);
          setRoomDbId(null);
          setRoleSelections([]);
          return;
      }
      
      const dbId = roomData.id;
      setRoomDbId(dbId);

      await fetchRoleSelections(dbId);

      channel = supabase
          .channel(`role_selections_${dbId}`)
          .on(
              'postgres_changes',
              {
                  event: '*',
                  schema: 'public',
                  table: 'role_selections',
                  filter: `room_id=eq.${dbId}`
              },
              () => {
                  fetchRoleSelections(dbId);
              }
          )
          .subscribe();
    };

    initialize();

    return () => {
        if (channel) {
            supabase.removeChannel(channel);
        }
    };
  }, [roomId]);

  const clearAllRoleSelections = async () => {
    if (!roomDbId) return false;

    try {
      const { error } = await supabase
        .from('role_selections')
        .delete()
        .eq('room_id', roomDbId);

      if (error) {
        console.error('Error clearing role selections:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error clearing role selections:', error);
      return false;
    }
  };

  const selectRole = async (roleId: string) => {
    if (!currentUserId || !roomDbId) return false;

    try {
      const { error } = await supabase
        .from('role_selections')
        .upsert({
          room_id: roomDbId,
          user_id: currentUserId,
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
    if (!currentUserId || !roomDbId) return false;

    try {
      const { error } = await supabase
        .from('role_selections')
        .delete()
        .eq('room_id', roomDbId)
        .eq('user_id', currentUserId);

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

  const getSelectedRoleByUser = (userId: string) => {
    return roleSelections.find(selection => selection.user_id === userId)?.role_id || null;
  };

  const isRoleSelected = (roleId: string) => {
    return roleSelections.some(selection => selection.role_id === roleId);
  };

  const getCurrentPlayerSelection = () => {
    if (!currentUserId) return null;
    return getSelectedRoleByUser(currentUserId);
  };

  const canSelectRoles = () => {
    return currentPlayerCount >= maxPlayers;
  };

  const allPlayersSelectedRoles = () => {
    return roleSelections.length >= currentPlayerCount;
  };

  return {
    roleSelections,
    loading,
    selectRole,
    unselectRole,
    getSelectedRoleByUser,
    isRoleSelected,
    getCurrentPlayerSelection,
    canSelectRoles,
    allPlayersSelectedRoles,
    clearAllRoleSelections
  };
};
