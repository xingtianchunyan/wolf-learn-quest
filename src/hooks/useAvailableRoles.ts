
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AvailableRole {
  role_id: string;
  character_name: string;
  faction: string;
  skill_name: string;
  skill_key: string;
  is_selected: boolean;
  selected_by_user: string | null;
  room_id: string | null;
}

export const useAvailableRoles = (roomId: string) => {
  const [availableRoles, setAvailableRoles] = useState<AvailableRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchAvailableRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('available_roles_for_room')
          .select('*')
          .or(`room_id.is.null,room_id.eq.${roomId}`);

        if (error) {
          console.error('Error fetching available roles:', error);
          return;
        }

        setAvailableRoles(data || []);
      } catch (error) {
        console.error('Error fetching available roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRoles();

    // 订阅角色选择变化来更新可用角色状态
    const channel = supabase
      .channel(`available_roles_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'role_selections',
          filter: `room_id=eq.${roomId}`
        },
        () => {
          fetchAvailableRoles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return {
    availableRoles,
    loading
  };
};
