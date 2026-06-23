/**
 * 文件级注释：房间在线状态 Presence Hook
 * 通过唯一 presence 频道名避免重复挂载时复用已订阅频道。
 */
import { useEffect, useState } from 'react';
import type { RealtimeChannel, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface PlayerPresence {
  user_id: string;
  player_name: string;
  online_at: string;
}

interface PresenceMeta {
  user_id?: string;
  player_name?: string;
  online_at?: string;
}

/**
 * 函数级注释：维护房间在线玩家 presence 状态
 */
export const usePlayerPresence = (roomId: string, currentUser: User | null) => {
  const [onlinePlayers, setOnlinePlayers] = useState<PlayerPresence[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!roomId || !currentUser) return;

    const channelSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const roomChannel = supabase.channel(
      `room_presence_${roomId}_${channelSuffix}`
    );

    // 监听presence变化
    roomChannel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = roomChannel.presenceState();

        // 转换presence state为我们需要的格式
        const players: PlayerPresence[] = [];
        Object.values(presenceState).forEach((presences: PresenceMeta[]) => {
          presences.forEach((presence: PresenceMeta) => {
            if (presence.user_id && presence.player_name) {
              players.push({
                user_id: presence.user_id,
                player_name: presence.player_name,
                online_at: presence.online_at,
              });
            }
          });
        });

        setOnlinePlayers(players);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {})
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {})
      .subscribe(async status => {
        if (status === 'SUBSCRIBED') {
          // 订阅成功后，发送当前用户的在线状态
          const userStatus: PlayerPresence = {
            user_id: currentUser.id,
            player_name:
              (currentUser.user_metadata?.player_name as string | undefined) ||
              'Unknown',
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
    channel,
  };
};
