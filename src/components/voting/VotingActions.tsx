import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Gavel } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { Player } from '@/hooks/usePlayersRealtime';

interface UserVote {
  target_id?: string;
}

interface VotingActionsProps {
  currentSession: { status: string };
  userVote: UserVote | null;
  canVote: boolean;
  selectedTarget: string;
  players: Player[];
  loading: boolean;
  getTargetVoteCount: (targetId: string) => number;
  onVote: (targetId?: string) => void;
  onClearSelection?: () => void;
}

export const VotingActions: React.FC<VotingActionsProps> = ({
  currentSession,
  userVote,
  canVote,
  selectedTarget,
  players,
  loading,
  getTargetVoteCount,
  onVote,
  onClearSelection,
}) => {
  const { t } = useLanguage();

  const getPlayerName = (userId?: string) =>
    players.find(p => p.userId === userId)?.name || t('common.unknown_player');

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center'>
          <Gavel className='mr-2 h-5 w-5' />
          {t('voting.actions.title')}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {userVote ? (
          <div className='p-4 bg-green-500/20 border border-green-500/30 rounded-md text-center'>
            <div className='flex items-center justify-center space-x-2 mb-2'>
              <CheckCircle className='h-5 w-5 text-green-400' />
              <span className='text-green-400 font-medium'>
                {t('voting.actions.voted_title')}
              </span>
            </div>
            <p className='text-sm text-gray-300'>
              {userVote.target_id
                ? t('voting.actions.vote_target_label', {
                    name: getPlayerName(userVote.target_id),
                  })
                : t('voting.actions.abstain_label')}
            </p>
          </div>
        ) : canVote ? (
          <div className='space-y-4'>
            {selectedTarget ? (
              <div className='p-3 bg-werewolf-purple/20 border border-werewolf-purple/50 rounded-md'>
                <div className='flex items-center justify-between'>
                  <span className='text-werewolf-purple font-medium'>
                    {t('voting.actions.selected_target_label', {
                      name: getPlayerName(selectedTarget),
                    })}
                  </span>
                  <Badge variant='outline' className='text-werewolf-purple'>
                    {t('voting.actions.current_votes', {
                      count: getTargetVoteCount(selectedTarget),
                    })}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className='p-3 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>
                <p className='text-sm text-gray-400'>
                  {t('voting.actions.select_target_hint')}
                </p>
              </div>
            )}

            <div className='grid grid-cols-2 gap-3'>
              <Button
                onClick={() => {
                  onVote(selectedTarget || undefined);
                  onClearSelection?.();
                }}
                disabled={loading || !selectedTarget}
                data-testid='confirm-vote'
                className='bg-werewolf-purple hover:bg-werewolf-purple/80 disabled:opacity-50'
              >
                {loading ? t('common.voting') : t('voting.actions.confirm_vote')}
              </Button>
              <Button
                onClick={() => onVote(undefined)}
                disabled={loading}
                variant='outline'
                data-testid='abstain-vote'
                className='border-gray-500 text-gray-300 hover:bg-gray-500/20'
              >
                {loading ? t('common.processing') : t('voting.actions.abstain')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='p-4 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>
            <p className='text-sm text-gray-400'>
              {currentSession.status !== 'active'
                ? t('voting.actions.session_ended')
                : t('voting.actions.cannot_vote')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
