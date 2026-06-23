import React from 'react';
import type { User } from '@supabase/supabase-js';
import MultiChannelChat from '@/components/chat/MultiChannelChat';

interface GameRoomChatPanelProps {
  roomId: string | null;
  currentUser: User | null;
  title: string;
}

export const GameRoomChatPanel: React.FC<GameRoomChatPanelProps> = ({
  roomId,
  currentUser,
  title,
}) => {
  return (
    <MultiChannelChat
      roomId={roomId}
      currentUser={currentUser}
      isGameRoom={true}
      title={title}
      height='100%'
    />
  );
};

export default GameRoomChatPanel;
