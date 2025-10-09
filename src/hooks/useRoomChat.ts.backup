import { supabase  } from '@/integrations/supabase/client';
import { useState, useEffect  } from 'react';
import { useToast  } from '@/hooks/useToast';

export interface ChatMessage { id: string;
  sender_id: string;
  message: string;
  created_at: string;
  sender_name?: string;
  chat_type: string;
  room_id: string;,
}

export const useRoomChat = (roomId: string | null, currentUser: any) => { const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast  } = useToast();

  // 获取历史聊天消息
  useEffect(() => { if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const { data, error  } = await supabase;
        .from('chat_messages')
        .select(`
        id,
        sender_id,
        message,
        created_at,
        chat_type,
        room_id
        `)
        .eq('room_id', roomId)
        .eq('chat_type', 'public')
        .order('created_at', { ascending: true  });

        if (error) { console.error('Error fetching chat messages:', error);
          toast({
            title: '加载聊天记录失败',
            description: error.message,
            variant: 'destructive',
           });
          return;,
}

        // 获取发送者信息 - 使用sender_id关联users表的user_id字段
        const messagesWithSenders = await Promise.all(;
          (data || []).map(async msg => { const { data: userData  } = await supabase;
            .rpc('get_public_user_profile', { p_user_id: msg.sender_id  });

            const senderName = Array.isArray(userData) && userData.length > 0 ? userData[0].player_name : 'Unknown';

            return { ...msg,
              sender_name: senderName,
};,
})
        );

        setMessages(messagesWithSenders);,
} catch (error) { console.error('Error fetching chat messages:', error);,
} finally { setIsLoading(false);,
}
    };

    fetchMessages();,
}, [roomId, toast]);

  // 设置实时监听
  useEffect(() => { if (!roomId) return;

    const channel = supabase;
    .channel('room-chat')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId }`;,
},
      async payload => { console.log('New chat message:', payload);

        // 获取发送者信息
        const { data: userData  } = await supabase;
        .rpc('get_public_user_profile', { p_user_id: payload.new.sender_id  });

        const senderName = Array.isArray(userData) && userData.length > 0 ? userData[0].player_name : 'Unknown';

        const newMessage = { ...payload.new,
          sender_name: senderName,
} as ChatMessage;

        setMessages(prev => [...prev, newMessage]);,
}
    )
    .subscribe();

    return () => { supabase.removeChannel(channel);,
};,
}, [roomId]);

  const sendMessage = async (messageText: string) => { if (!roomId || !currentUser || !messageText.trim()) return false;

    try {
      // 获取当前认证用户
      const { data: { user  } } = await supabase.auth.getUser();

      if (!user) { console.error('No authenticated user found');
        toast({
          title: '发送消息失败',
          description: '用户未认证',
          variant: 'destructive',
         });
        return false;,
}

      const { error  } = await supabase;
      .from('chat_messages')
      .insert({ chat_type: 'public',
        room_id: roomId,
        sender_id: user.id, // 使用认证用户ID，与RLS策略一致
        message: messageText.trim(),
});

      if (error) { console.error('Error sending message:', error);
        toast({
          title: '发送消息失败',
          description: error.message,
          variant: 'destructive',
         });
        return false;,
}

      return true;,
} catch (error) { console.error('Error sending message:', error);
      toast({
        title: '发送消息失败',
        description: '请稍后重试',
        variant: 'destructive',
       });
      return false;,
}
  };

  return { messages,
    isLoading,
    sendMessage,
};,
};
