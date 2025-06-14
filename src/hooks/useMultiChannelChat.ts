import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatChannel } from '@/components/chat/ChatChannelSelector';
import { useGameState } from './useGameState';

interface UseMultiChannelChatProps {
  roomId: string | null;
  currentUser: any;
  userRole?: string;
}

export const useMultiChannelChat = ({
  roomId,
  currentUser,
  userRole
}: UseMultiChannelChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChatChannel>('public');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { gameState } = useGameState(roomId);

  // 确定可用频道
  const getAvailableChannels = (): ChatChannel[] => {
    const baseChannels: ChatChannel[] = ['public', 'judge_private', 'system', 'all'];
    
    // 如果是狼人角色，添加小队聊天
    if (userRole && ['werewolf', 'werewolf1', 'werewolf2', 'whitewolf'].includes(userRole)) {
      baseChannels.splice(1, 0, 'team');
    }
    
    return baseChannels;
  };

  // 获取聊天消息
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for room:', roomId);
        
        const { data, error } = await supabase
          .from('chat_messages')
          .select(`
            id,
            sender_id,
            message,
            created_at,
            chat_type,
            game_round,
            game_phase,
            room_id
          `)
          .eq('room_id', roomId)
          .in('chat_type', ['public', 'team', 'judge_private', 'system'])
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching chat messages:', error);
          toast({
            title: '加载聊天记录失败',
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        console.log('Fetched messages:', data);

        // 获取发送者信息 - 使用sender_id关联users表的user_id字段
        const messagesWithSenders = await Promise.all(
          (data || []).map(async (msg) => {
            const { data: userData } = await supabase
              .from('users')
              .select('player_name')
              .eq('user_id', msg.sender_id)
              .maybeSingle();

            return {
              ...msg,
              sender_name: userData?.player_name || 'Unknown'
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

    const channel = supabase
      .channel('multi-channel-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        async (payload) => {
          console.log('New chat message:', payload);
          
          // 获取发送者信息
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', payload.new.sender_id)
            .maybeSingle();

          const newMessage = {
            ...payload.new,
            sender_name: userData?.player_name || 'Unknown'
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
  const sendMessage = async (messageText: string, chatType: string = 'public') => {
    if (!roomId || !currentUser || !messageText.trim()) {
      console.error('Missing required data for sending message:', {
        roomId,
        currentUser,
        messageText: messageText.trim()
      });
      return false;
    }

    try {
      // 获取当前认证用户
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found');
        toast({
          title: '发送消息失败',
          description: '用户未认证',
          variant: "destructive",
        });
        return false;
      }
      
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_type: chatType,
          room_id: roomId,
          sender_id: user.id, // 使用认证用户ID，与RLS策略一致
          message: messageText.trim(),
          game_round: gameState?.currentRound,
          game_phase: gameState?.currentPhase,
          game_id: gameState?.id
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: '发送消息失败',
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      console.log('Message sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: '发送消息失败',
        description: '请稍后重试',
        variant: "destructive",
      });
      return false;
    }
  };

  // 过滤消息
  const getFilteredMessages = () => {
    if (currentChannel === 'all') {
      return messages;
    }
    return messages.filter(msg => msg.chat_type === currentChannel);
  };

  return {
    messages: getFilteredMessages(),
    isLoading,
    sendMessage,
    currentChannel,
    setCurrentChannel,
    availableChannels: getAvailableChannels()
  };
};
