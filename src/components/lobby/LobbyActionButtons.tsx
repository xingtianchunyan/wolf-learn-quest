
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Plus } from 'lucide-react';

interface LobbyActionButtonsProps {
  handleCreateAIJudge: () => Promise<void>;
  handleCreateRoom: () => Promise<void>;
  currentUser: any;
  isCreatingAIRoom: boolean;
  isCreatingRoom: boolean;
  playerRoom: { roomDbId: string | null };
  t: (key: string) => string;
}

const LobbyActionButtons: React.FC<LobbyActionButtonsProps> = ({
  handleCreateAIJudge,
  handleCreateRoom,
  currentUser,
  isCreatingAIRoom,
  isCreatingRoom,
  playerRoom,
  t,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <Button
        onClick={handleCreateAIJudge}
        className="bg-werewolf-purple hover:bg-werewolf-light"
        disabled={!currentUser || isCreatingAIRoom || !!playerRoom.roomDbId}
      >
        <Brain className="mr-2 h-4 w-4" />
        {isCreatingAIRoom ? t('creating') : t('create_ai_judge')}
      </Button>
      <Button
        onClick={handleCreateRoom}
        className="bg-werewolf-purple hover:bg-werewolf-light"
        disabled={!currentUser || isCreatingRoom || !!playerRoom.roomDbId}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isCreatingRoom ? t('creating') : t('create_room')}
      </Button>
    </div>
  );
};

export default LobbyActionButtons;

