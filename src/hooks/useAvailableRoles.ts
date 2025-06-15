
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
        // 直接从game_characters获取角色数据
        const { data: charactersData, error: charactersError } = await supabase
          .from('game_characters')
          .select('*');

        if (charactersError) {
          console.error('Error fetching characters:', charactersError);
          return;
        }

        // 获取当前房间的角色选择
        const { data: selectionsData, error: selectionsError } = await supabase
          .from('role_selections')
          .select('*')
          .eq('room_id', roomId);

        if (selectionsError) {
          console.error('Error fetching role selections:', selectionsError);
          return;
        }

        // 合并数据
        const roles = charactersData?.map(character => {
          const selection = selectionsData?.find(s => s.role_id === character.character_name);
          return {
            role_id: character["Role ID"],
            character_name: character.character_name,
            faction: character.faction,
            skill_name: character.skill_name || '',
            skill_key: character.description || '',
            is_selected: !!selection,
            selected_by_user: selection?.user_id || null,
            room_id: selection ? roomId : null
          };
        }) || [];

        setAvailableRoles(roles);
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
