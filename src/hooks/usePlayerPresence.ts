
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface PlayerPresence {
  user_id: string;
  player_name: string;
  online_at: string;
}

export const usePlayerPresence = (roomId: string, currentUser: any) => {
  const [onlinePlayers, setOnlinePlayers] = useState<PlayerPresence[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !currentUser) return;


    const roomChannel = supabase.channel(`room_presence_${roomId}`);

    // 监听presence变化
    roomChannel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = roomChannel.presenceState();
        
        // 转换presence state为我们需要的格式
        const players: PlayerPresence[] = [];
        Object.values(presenceState).forEach((presences: any) => {
          presences.forEach((presence: any) => {
            if (presence.user_id && presence.player_name) {
              players.push({
                user_id: presence.user_id,
                player_name: presence.player_name,
                online_at: presence.online_at
              });
            }
          });
        });
        
        setOnlinePlayers(players);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // 订阅成功后，发送当前用户的在线状态
          const userStatus: PlayerPresence = {
            user_id: currentUser.id,
            player_name: currentUser.player_name || 'Unknown',
            online_at: new Date().toISOString(),
          };

          const trackResult = await roomChannel.track(userStatus);
        }
      });

    setChannel(roomChannel);

    // 页面卸载时自动取消订阅
    const handleBeforeUnload = () => {
      roomChannel.untrack();
      roomChannel.unsubscribe();
    };

    // 页面隐藏时标记离线
    const handleVisibilityChange = () => {
      if (document.hidden) {
        roomChannel.untrack();
      } else {
        // 页面重新可见时重新追踪
        const userStatus: PlayerPresence = {
          user_id: currentUser.id,
          player_name: currentUser.player_name || 'Unknown',
          online_at: new Date().toISOString(),
        };
        roomChannel.track(userStatus);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (roomChannel) {
        roomChannel.untrack();
        roomChannel.unsubscribe();
      }
    };
  }, [roomId, currentUser]);

  // 获取所有在线玩家列表
  const getOnlinePlayers = (): PlayerPresence[] => {
    return onlinePlayers;
  };

  // 检查特定玩家是否在线
  const isPlayerOnline = (userId: string): boolean => {
    return onlinePlayers.some(player => player.user_id === userId);
  };

  return {
    onlinePlayers,
    getOnlinePlayers,
    isPlayerOnline,
    channel
  };
};
