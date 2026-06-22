/**
 * 文件级注释：多频道聊天 Hook
 * 频道订阅名追加唯一后缀，避免房间页重复挂载时复用已订阅的 realtime channel。
 */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatChannel } from '@/components/chat/ChatChannelSelector';
import { useGameState } from './useGameState';
import { usePermissions } from '@/contexts/PermissionContext';
import {
  normalizeRoleName,
  isWolfRoleName,
  mapChatChannelType,
  getCompatibleChatTypes,
} from '@/utils/roleUtils';

interface UseMultiChannelChatProps {
  roomId: string | null;
  currentUser: any;
  userRole?: string;
}

/**
 * 接口注释：系统公告可见性结构
 */
interface AnnouncementVisibility {
  isVisibleToJudge: boolean;
  isVisibleToActor: boolean;
  isVisibleToTarget: boolean;
  isVisibleToWerewolves: boolean;
  isVisibleToRescuers: boolean;
  isVisibleToAll: boolean;
}

/**
 * 接口注释：系统公告元数据结构（与服务层保持一致的关键字段）
 */
interface SystemAnnouncementMetadata {
  visibility?: AnnouncementVisibility;
  data?: {
    actorUserId?: string;
    targetUserId?: string;
    roomId?: string;
  };
}

/**
 * 函数级注释：管理房间聊天记录、实时同步与发言动作
 */
export const useMultiChannelChat = ({
  roomId,
  currentUser,
  userRole,
}: UseMultiChannelChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChatChannel>('public');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { gameState } = useGameState(roomId);
  const { isJudge } = usePermissions(roomId);

  /**
   * 函数级注释：判断当前用户是否可见该系统公告
   * - 基于 PermissionContext 的 isJudge 和当前用户/角色信息
   * - 使用消息 metadata.visibility 进行细粒度判定
   */
  const canViewSystemAnnouncement = useCallback(
    (metadata: SystemAnnouncementMetadata | undefined): boolean => {
      if (!metadata || !metadata.visibility) return true; // 无可见性配置则默认可见（与现有行为保持兼容）
      const v = metadata.visibility;
      const d = metadata.data || {};

      if (v.isVisibleToAll) return true;
      if (isJudge && v.isVisibleToJudge) return true;
      if (
        v.isVisibleToActor &&
        currentUser?.id &&
        currentUser.id === d.actorUserId
      )
        return true;
      if (
        v.isVisibleToTarget &&
        currentUser?.id &&
        currentUser.id === d.targetUserId
      )
        return true;

      // 按角色阵营进行可见性判定 - 使用统一的角色判断
      const normalizedRole = userRole ? normalizeRoleName(userRole) : '';
      const isWerewolf =
        isWolfRoleName(normalizedRole) || normalizedRole === 'demon';
      const isRescuer = ['witch', 'warlock'].includes(normalizedRole);

      if (v.isVisibleToWerewolves && isWerewolf) return true;
      if (v.isVisibleToRescuers && isRescuer) return true;

      return false;
    },
    [isJudge, currentUser?.id, userRole]
  );

  // 确定可用频道
  const getAvailableChannels = (): ChatChannel[] => {
    const baseChannels: ChatChannel[] = [
      'public',
      'judge_private',
      'system',
      'all',
    ];

    // 如果是狼人角色，添加小队聊天 - 使用统一的角色判断
    if (userRole && isWolfRoleName(userRole)) {
      baseChannels.splice(1, 0, 'team');
    }

    return baseChannels;
  };

  // 获取聊天消息
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select(
            `
            id,
            sender_id,
            message,
            created_at,
            chat_type,
            game_round,
            game_phase,
            room_id
          `
          )
          .eq('room_id', roomId)
          .in('chat_type', [
            'public',
            'werewolf',
            'team',
            'judge_private',
            'system',
          ])
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching chat messages:', error);
          toast({
            title: '加载聊天记录失败',
            description: error.message,
            variant: 'destructive',
          });
          return;
        }

        // 获取发送者信息 - 使用sender_id关联users表的user_id字段
        const messagesWithSenders = await Promise.all(
          (data || []).map(async msg => {
            const { data: userData } = await supabase.rpc(
              'get_public_user_profile',
              { p_user_id: msg.sender_id }
            );

            const senderName =
              Array.isArray(userData) && userData.length > 0
                ? userData[0].player_name
                : 'Unknown';

            return {
              ...msg,
              sender_name: senderName,
            };
          })
        );

        setMessages(messagesWithSenders);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [roomId, toast]);

  // 设置实时监听
  useEffect(() => {
    if (!roomId) return;

    const channelSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(`multi-channel-chat_${roomId}_${channelSuffix}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        async payload => {
          // 获取发送者信息
          const { data: userData } = await supabase.rpc(
            'get_public_user_profile',
            { p_user_id: payload.new.sender_id }
          );

          const senderName =
            Array.isArray(userData) && userData.length > 0
              ? userData[0].player_name
              : 'Unknown';

          const newMessage = {
            ...payload.new,
            sender_name: senderName,
          } as ChatMessage;

          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // 发送消息
  const sendMessage = async (
    messageText: string,
    chatType: string = 'public'
  ) => {
    // 映射UI频道类型到数据库类型
    const dbChatType = mapChatChannelType(chatType);
    if (!roomId || !currentUser || !messageText.trim()) {
      console.error('Missing required data for sending message:', {
        roomId,
        currentUser,
        messageText: messageText.trim(),
      });
      return false;
    }

    try {
      // 获取当前认证用户
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error('No authenticated user found');
        toast({
          title: '发送消息失败',
          description: '用户未认证',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase.from('chat_messages').insert({
        chat_type: dbChatType,
        room_id: roomId,
        sender_id: user.id, // 使用认证用户ID，与RLS策略一致
        message: messageText.trim(),
        game_round: gameState?.currentRound,
        game_phase: gameState?.currentPhase?.toString(), // 转换为字符串
        game_id: gameState?.id,
      });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: '发送消息失败',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: '发送消息失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
      return false;
    }
  };

  // 过滤消息并应用可见性规则（修复 TODO：实现更完整的权限检查）
  const getFilteredMessages = () => {
    let filteredMessages =
      currentChannel === 'all'
        ? messages
        : messages.filter(msg => {
            // 对team频道特殊处理，同时匹配werewolf和team类型
            if (currentChannel === 'team') {
              return ['werewolf', 'team'].includes(msg.chat_type);
            }
            return msg.chat_type === currentChannel;
          });

    // 对系统公告应用可见性规则
    if (currentChannel === 'system' || currentChannel === 'all') {
      filteredMessages = filteredMessages.filter(msg => {
        if (msg.chat_type !== 'system') return true;
        const metadata = (msg as any).metadata as
          | SystemAnnouncementMetadata
          | undefined;
        return canViewSystemAnnouncement(metadata);
      });
    }

    return filteredMessages;
  };

  return {
    messages: getFilteredMessages(),
    isLoading,
    sendMessage,
    currentChannel,
    setCurrentChannel,
    availableChannels: getAvailableChannels(),
  };
};
