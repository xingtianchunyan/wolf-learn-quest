import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { Player } from '@/hooks/usePlayersRealtime';

interface VotingNoSessionProps {
  currentRound: number;
  currentPhase?: number;
  isJudge: boolean;
  loading: boolean;
  votablePlayers: Player[];
  onCreateSession: () => void;
}

export const VotingNoSession: React.FC<VotingNoSessionProps> = ({
  currentRound,
  currentPhase,
  isJudge,
  loading,
  votablePlayers,
  onCreateSession,
}) => {
  const { t } = useLanguage();

  const getPhaseLabel = () => {
    switch (currentPhase) {
      case 1:
        return t('game.phase.day');
      case 2:
        return t('game.phase.evening');
      case 3:
        return t('game.phase.night');
      case 4:
        return t('game.phase.dawn');
      default:
        return t('game.phase.dawn');
    }
  };

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between'>
          <div className='flex items-center'>
            {t('voting.no_session.title')}
          </div>
          <Badge
            variant='outline'
            className='text-yellow-400 border-yellow-400'
          >
            {t('voting.no_session.inactive')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='text-center p-6'>
          <AlertTriangle className='h-12 w-12 mx-auto mb-4 text-yellow-400 opacity-70' />
          <p className='text-gray-300 mb-4'>
            {t('voting.no_session.not_created')}
          </p>
          <p className='text-sm text-gray-400 mb-4'>
            {t('voting.no_session.round_phase_info', {
              round: currentRound,
              phase: getPhaseLabel(),
            })}
          </p>

          <div className='p-3 bg-werewolf-dark/20 rounded-md mb-4'>
            <h4 className='text-sm font-medium text-werewolf-purple mb-2'>
              {t('voting.no_session.votable_players')}
            </h4>
            <div className='grid grid-cols-2 gap-2'>
              {votablePlayers.map(player => (
                <div
                  key={player.id}
                  className='p-2 bg-werewolf-dark/40 rounded text-sm text-gray-300'
                >
                  {player.name}
                </div>
              ))}
            </div>
          </div>

          {(isJudge || currentPhase === 1) && (
            <Button
              onClick={onCreateSession}
              disabled={loading}
              data-testid='create-voting-session'
              className='bg-werewolf-purple hover:bg-werewolf-purple/80'
            >
              {loading
                ? t('common.processing')
                : t('voting.no_session.create_session')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
