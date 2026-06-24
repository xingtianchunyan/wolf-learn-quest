import React, { useState, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import ChatChannelSelector, { ChatChannel } from './ChatChannelSelector';
import ChatMessageComponent from './ChatMessage';
import { useMultiChannelChat } from '@/hooks/useMultiChannelChat';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface MultiChannelChatProps {
  roomId: string | null;
  currentUser: User | null;
  gamePhase?: string;
  gameRound?: number;
  userRole?: string;
  isGameRoom?: boolean;
  title?: string;
  className?: string;
  height?: string;
}

const MultiChannelChat: React.FC<MultiChannelChatProps> = ({
  roomId,
  currentUser,
  gamePhase,
  gameRound,
  userRole,
  isGameRoom = false,
  title,
  className = '',
  height = '500px',
}) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const displayTitle = title ?? t('chat');

  const {
    messages,
    isLoading,
    sendMessage,
    currentChannel,
    setCurrentChannel,
    availableChannels,
  } = useMultiChannelChat({
    roomId,
    currentUser,
    userRole,
  });

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // 确定发送的聊天类型
    let chatType = currentChannel;
    if (currentChannel === 'all') {
      chatType = 'public'; // 默认发送到公共频道
    }

    const success = await sendMessage(newMessage, chatType);
    if (success) {
      setNewMessage('');
    }
  };

  const handleChannelChange = (channel: ChatChannel) => {
    setCurrentChannel(channel);
  };

  const channelLabelKeys = {
    public: 'channel_public',
    team: 'channel_team',
    judge_private: 'channel_judge_private',
    system: 'channel_system',
    all: 'channel_all',
  } as const;

  const getChannelDisplayName = () =>
    t(channelLabelKeys[currentChannel] || 'channel_public');

  return (
    <Card
      className={`bg-werewolf-card border-werewolf-purple/30 flex flex-col ${className}`}
      style={{ height }}
    >
      <CardHeader className='flex-shrink-0 pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>
          <div className='flex items-center'>
            <MessageSquareText className='mr-2 h-5 w-5' />
            {displayTitle}
          </div>
          <ChatChannelSelector
            currentChannel={currentChannel}
            onChannelChange={handleChannelChange}
            availableChannels={availableChannels}
            isGameRoom={isGameRoom}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 p-4 pt-0 overflow-hidden'>
        <div className='flex-1 mb-4 min-h-0'>
          <ScrollArea className='h-full pr-4' ref={scrollAreaRef}>
            <div className='space-y-2'>
              {isLoading ? (
                <div className='text-center text-gray-400 py-8'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-werewolf-purple mx-auto mb-2'></div>
                  {t('loading_chat_history')}
                </div>
              ) : messages.length === 0 ? (
                <div className='text-center text-gray-400 py-8'>
                  {t('no_channel_messages')}
                </div>
              ) : (
                messages.map(message => (
                  <ChatMessageComponent
                    key={message.id}
                    message={message}
                    currentUserId={currentUser?.id}
                    gamePhase={gamePhase}
                    gameRound={gameRound}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <form onSubmit={handleSendMessage} className='flex-shrink-0'>
          <div className='flex gap-2'>
            <Input
              placeholder={t('send_channel_message')}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className='bg-werewolf-dark/40 border-werewolf-purple/30 flex-1'
              disabled={!currentUser || currentChannel === 'system'}
              maxLength={500}
            />
            <Button
              type='submit'
              className='bg-werewolf-purple hover:bg-werewolf-light px-6'
              disabled={
                !currentUser ||
                !newMessage.trim() ||
                currentChannel === 'system'
              }
            >
              {t('send')}
            </Button>
          </div>
          {newMessage.length > 450 && (
            <p className='text-xs text-gray-400 mt-1'>
              {newMessage.length}/500 {t('characters')}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default MultiChannelChat;
