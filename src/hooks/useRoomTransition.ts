import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

/**
 * Auto transition players to a fresh room after game ends.
 * Flow:
 * - When current room's game state becomes 'ended':
 *   - Judge calls RPC to create the next room and navigates to /judge
 *   - Players listen for rooms.next_room_id, leave old room and join the new one
 */
export const useRoomTransition = (roomId: string | undefined, gameStatus?: 'waiting' | 'active' | 'paused' | 'ended') => {
  const { currentUser, requireAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (!roomId || !currentUser || !requireAuth()) return;

    let roomSub: ReturnType<typeof supabase.channel> | null = null;
    let cancelled = false;

    const leaveRoomExplicit = async (rid: string) => {
      try {
        // Leave as player (noop if not in room_players)
        await supabase.from('room_players').delete().eq('room_id', rid).eq('user_id', currentUser.id);
        // Clear role selection for this room
        await supabase.from('role_selections').delete().eq('room_id', rid).eq('user_id', currentUser.id);
      } catch (e) {
        console.error('leaveRoomExplicit error:', e);
      }
    };

    const joinNewRoom = async (newRoomId: string, asJudge: boolean) => {
      if (handledRef.current) return;
      handledRef.current = true;
      try {
        // Always cleanup old room state first
        await leaveRoomExplicit(roomId);

        if (!asJudge) {
          // Insert player into new room
          const { error } = await supabase.from('room_players').insert({
            room_id: newRoomId,
            user_id: currentUser.id,
            is_ready: false,
            is_ai: false,
          });
          if (error) {
            console.error('Failed to join new room:', error);
            toast({ title: '进入新房间失败', description: error.message, variant: 'destructive' });
            return;
          }
          toast({ title: '已进入新房间', description: '请重新选择角色并准备' });
          navigate(`/room/${newRoomId}`);
        } else {
          toast({ title: '已创建新房间', description: '您已进入新一局的法官页面' });
          navigate(`/room/${newRoomId}/judge`);
        }
      } catch (e: any) {
        console.error('joinNewRoom error:', e);
      }
    };

    const handleEnded = async () => {
      try {
        // Fetch judge and next_room info
        const { data: room, error } = await supabase
          .from('rooms')
          .select('judge_user_id, next_room_id')
          .eq('id', roomId)
          .single();
        if (error) {
          console.error('Fetch room failed:', error);
          return;
        }
        const isJudge = room?.judge_user_id && room.judge_user_id === currentUser.id;

        // 仅监听 next_room_id 的出现，不再由法官自动创建新房间
        // 保持 judge 端为手动创建/进入下一局
        // （玩家端仍然会在 next_room_id 出现后自动迁移）


        // For players (or if judge RPC failed), subscribe and wait for next_room_id
        roomSub = supabase
          .channel(`room_transition_${roomId}`)
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` }, async (payload: any) => {
            const nextRoomId = (payload.new as any)?.next_room_id as string | null;
            if (nextRoomId && !handledRef.current) {
              const asJudge = (payload.new as any)?.judge_user_id === currentUser.id;
              await joinNewRoom(nextRoomId, asJudge);
            }
          })
          .subscribe();

        // If already set, act immediately
        if (room?.next_room_id && !handledRef.current) {
          await joinNewRoom(room.next_room_id as string, Boolean(room?.judge_user_id === currentUser.id));
        }
      } catch (e) {
        console.error('handleEnded error:', e);
      }
    };

    if (gameStatus === 'ended' && !handledRef.current) {
      handleEnded();
    }

    return () => {
      cancelled = true;
      if (roomSub) supabase.removeChannel(roomSub);
    };
  }, [roomId, currentUser?.id, gameStatus]);
};
