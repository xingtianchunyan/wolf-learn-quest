import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface RoleState {
  id: string;
  game_state_id: string;
  room_id: string;
  user_id: string;
  role_id: string;
  current_phase: number | null;
  role_status: number;
  skill_uses_remaining: any;
  status_effects: any;
  created_at: string;
  updated_at: string;
}

export const useRoleStates = (roomId: string | null | undefined) => {
  const [roleStates, setRoleStates] = useState<RoleState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setRoleStates([]);
      setLoading(false);
      return;
    }

    const fetchRoleStates = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('role_states')
        .select('*')
        .eq('room_id', roomId);

      if (error) {
        console.error('Error fetching role states:', error);
      } else if (data) {
        setRoleStates(data as RoleState[]);
      }
      setLoading(false);
    };

    fetchRoleStates();

    const channel = supabase
      .channel(`role_states_for_room_${roomId}`)
      .on<RoleState>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'role_states',
          filter: `room_id=eq.${roomId}`,
        },
        (payload: RealtimePostgresChangesPayload<RoleState>) => {
          if (payload.new && typeof payload.new === 'object') {
            const newRoleState = payload.new as RoleState;
            if (payload.eventType === 'INSERT') {
              setRoleStates(current => {
                if (current.some(rs => rs.id === newRoleState.id)) {
                  return current;
                }
                return [...current, newRoleState];
              });
            } else if (payload.eventType === 'UPDATE') {
              setRoleStates(current =>
                current.map(rs =>
                  rs.id === newRoleState.id ? newRoleState : rs
                )
              );
            } else if (payload.eventType === 'DELETE' && payload.old) {
              setRoleStates(current =>
                current.filter(rs => rs.id !== (payload.old as RoleState).id)
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return { roleStates, loading };
};
