import React from 'react';
import MultiChannelChat from '@/components/chat/MultiChannelChat';

interface GameRoomChatPanelProps {
  roomId: string | null;
  currentUser: any;
  title: string;
}

export const GameRoomChatPanel: React.FC<GameRoomChatPanelProps> = ({
  roomId,
  currentUser,
  title
}) => {
  return (
    <MultiChannelChat
      roomId={roomId}
      currentUser={currentUser}
      isGameRoom={true}
      title={title}
      height="100%"
    />
  );
};

export default GameRoomChatPanel;
