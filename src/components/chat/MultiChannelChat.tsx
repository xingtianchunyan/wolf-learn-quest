
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import ChatChannelSelector, { ChatChannel } from './ChatChannelSelector';
import ChatMessageComponent from './ChatMessage';
import { useMultiChannelChat } from '@/hooks/useMultiChannelChat';

interface MultiChannelChatProps {
  roomId: string | null;
  currentUser: any;
  gamePhase?: string;
  gameRound?: number;
  userRole?: string;
  isGameRoom?: boolean;
  title?: string;
}

const MultiChannelChat: React.FC<MultiChannelChatProps> = ({
  roomId,
  currentUser,
  gamePhase,
  gameRound,
  userRole,
  isGameRoom = false,
  title = '聊天'
}) => {
  const [newMessage, setNewMessage] = useState('');
  
  const {
    messages,
    isLoading,
    sendMessage,
    currentChannel,
    setCurrentChannel,
    availableChannels
  } = useMultiChannelChat({
    roomId,
    currentUser,
    gamePhase,
    gameRound,
    userRole
  });

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

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-werewolf-purple flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquareText className="mr-2 h-5 w-5" />
            {title}
          </div>
          <ChatChannelSelector
            currentChannel={currentChannel}
            onChannelChange={handleChannelChange}
            availableChannels={availableChannels}
            isGameRoom={isGameRoom}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-[400px]">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
                加载聊天记录...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400">
                {currentChannel === 'all' ? '暂无聊天消息' : `暂无${currentChannel === 'public' ? '公共' : currentChannel === 'team' ? '小队' : currentChannel === 'judge_private' ? '法官私聊' : '系统'}消息`}
              </div>
            ) : (
              messages.map((message) => (
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
        
        <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-auto">
          <div className="flex gap-2">
            <Input
              placeholder={`发送${currentChannel === 'all' ? '公共' : currentChannel === 'public' ? '公共' : currentChannel === 'team' ? '小队' : currentChannel === 'judge_private' ? '法官私聊' : '系统'}消息...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-werewolf-dark/40 border-werewolf-purple/30"
              disabled={!currentUser || currentChannel === 'system'}
            />
            <Button 
              type="submit" 
              className="bg-werewolf-purple hover:bg-werewolf-light"
              disabled={!currentUser || !newMessage.trim() || currentChannel === 'system'}
            >
              发送
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MultiChannelChat;
