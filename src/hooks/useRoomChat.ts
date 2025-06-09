
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
  sender_name?: string;
}

export const useRoomChat = (roomId: string | null, currentUser: any) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // 获取历史聊天消息
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select(`
            id,
            sender_id,
            message,
            created_at
          `)
          .eq('chat_type', 'room')
          .eq('recipient_id', roomId)
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

        // 获取发送者信息
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
      .channel('room-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_type=eq.room,recipient_id=eq.${roomId}`
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

  const sendMessage = async (messageText: string) => {
    if (!roomId || !currentUser || !messageText.trim()) return false;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_type: 'room',
          recipient_id: roomId,
          sender_id: currentUser.id,
          message: messageText.trim()
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

  return {
    messages,
    isLoading,
    sendMessage
  };
};
