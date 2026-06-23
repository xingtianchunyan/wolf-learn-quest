/**
 * 文件级注释：大厅房间操作按钮组
 * 统一管理普通建房入口，并对未完成的 AI 法官模式做显式提示。
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Plus } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface LobbyActionButtonsProps {
  handleCreateAIJudge: () => Promise<void>;
  handleCreateRoom: () => Promise<void>;
  currentUser: User | null;
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
    <div className='mb-4 space-y-2'>
      <div className='flex justify-between gap-3'>
        <Button
          onClick={handleCreateAIJudge}
          data-testid='create-ai-judge-button'
          variant='outline'
          className='border-werewolf-purple/30 bg-werewolf-dark/40 text-werewolf-purple'
          disabled
        >
          <Brain className='mr-2 h-4 w-4' />
          {isCreatingAIRoom ? t('creating') : t('create_ai_judge')}
        </Button>
        <Button
          onClick={handleCreateRoom}
          data-testid='create-room-button'
          className='bg-werewolf-purple hover:bg-werewolf-light'
          disabled={!currentUser || isCreatingRoom || !!playerRoom.roomDbId}
        >
          <Plus className='mr-2 h-4 w-4' />
          {isCreatingRoom ? t('creating') : t('create_room')}
        </Button>
      </div>
      <p className='text-xs text-muted-foreground'>
        {t('ai_judge_feature_note')}
      </p>
    </div>
  );
};

export default LobbyActionButtons;
