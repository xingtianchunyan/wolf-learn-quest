
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface PlayerPresence {
  user_id: string;
  player_name: string;
  online_at: string;
}

interface OnlineStatus {
  [key: string]: PlayerPresence[];
}

export const usePlayerPresence = (roomId: string, currentUser: any) => {
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({});
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !currentUser) return;

    const roomChannel = supabase.channel(`room_presence_${roomId}`);

    // 监听presence变化
    roomChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = roomChannel.presenceState();
        console.log('Presence sync:', newState);
        setOnlineStatus(newState);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('Player joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('Player left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // 订阅成功后，发送当前用户的在线状态
          const userStatus: PlayerPresence = {
            user_id: currentUser.id,
            player_name: currentUser.player_name || 'Unknown',
            online_at: new Date().toISOString(),
          };

          await roomChannel.track(userStatus);
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
    const allPresences: PlayerPresence[] = [];
    Object.values(onlineStatus).forEach(presences => {
      allPresences.push(...presences);
    });
    return allPresences;
  };

  // 检查特定玩家是否在线
  const isPlayerOnline = (userId: string): boolean => {
    const onlinePlayers = getOnlinePlayers();
    return onlinePlayers.some(player => player.user_id === userId);
  };

  return {
    onlineStatus,
    getOnlinePlayers,
    isPlayerOnline,
    channel
  };
};
