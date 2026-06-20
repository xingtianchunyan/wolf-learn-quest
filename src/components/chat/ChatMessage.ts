import React from 'react';

export interface ChatMessage {
  id: string;
  sender_id: string | null;
  message: string;
  chat_type: string;
  created_at: string;
  room_id: string;
}

interface ChatMessageComponentProps {
  message: ChatMessage;
  currentUserId?: string | null;
}

const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({
  message,
  currentUserId
}) => {
  const isOwn = message.sender_id === currentUserId;
  return React.createElement(
    'div',
    {
      className: `p-2 my-1 rounded max-w-[80%] ${
        isOwn ? 'ml-auto bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`
    },
    React.createElement('p', { className: 'text-sm' }, message.message),
    React.createElement(
      'span',
      { className: 'text-xs opacity-70' },
      new Date(message.created_at).toLocaleTimeString()
    )
  );
};

export default ChatMessageComponent;
