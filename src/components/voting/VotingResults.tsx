import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Users, Vote } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { Player } from '@/hooks/usePlayersRealtime';

interface VotingSession {
  id: string;
  session_type: string;
  status: string;
}

interface VoteRecord {
  voterId: string;
  targetId?: string;
}

interface VotingSummary {
  totalVotes: number;
  abstentions: number;
  hasVotes: boolean;
  votesByTarget: Record<string, number>;
  voteDetails: Record<string, VoteRecord[]>;
}

interface VotingResult {
  id: string;
  target_id?: string;
  total_votes: number;
  result_type: string;
  processing_status: string;
}

interface VotingResultsProps {
  currentSession: VotingSession;
  players: Player[];
  votingSummary: VotingSummary;
  results: VotingResult[];
  onProcessResult: (resultId: string) => void;
}

export const VotingResults: React.FC<VotingResultsProps> = ({
  currentSession,
  players,
  votingSummary,
  results,
  onProcessResult,
}) => {
  const { t } = useLanguage();

  const getSessionTypeLabel = () =>
    currentSession.session_type === 'day_vote'
      ? t('voting.results.day_vote')
      : t('voting.results.exile_vote');

  const getPlayerName = (userId?: string) =>
    players.find(p => p.userId === userId)?.name || t('common.unknown_player');

  const getResultTypeLabel = (resultType: string) => {
    switch (resultType) {
      case 'eliminated':
        return t('voting.results.result.eliminated');
      case 'tied':
        return t('voting.results.result.tied');
      case 'saved':
        return t('voting.results.result.saved');
      default:
        return t('voting.results.result.none');
    }
  };

  const getProcessingStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('game.status.pending');
      case 'processing':
        return t('common.processing');
      case 'failed':
        return t('common.failed');
      default:
        return t('common.unknown');
    }
  };

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between'>
          <div className='flex items-center'>
            <Vote className='mr-2 h-5 w-5' />
            {t('voting.results.title')}
          </div>
          <Badge variant='outline' className='text-green-400 border-green-400'>
            {getSessionTypeLabel()}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md'>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-werewolf-purple' />
            <span className='text-sm text-gray-300'>
              {t('voting.results.in_progress')}
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Users className='h-4 w-4 text-werewolf-purple' />
            <span className='text-sm text-gray-300'>
              {t('voting.results.voted_count', {
                current: votingSummary.totalVotes,
                total: players.length,
              })}
            </span>
            {votingSummary.abstentions > 0 && (
              <Badge variant='outline' className='text-gray-400 text-xs'>
                {t('voting.results.abstentions_label', {
                  count: votingSummary.abstentions,
                })}
              </Badge>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-werewolf-purple'>
            {t('voting.results.details_title')}
          </h4>
          <ScrollArea className='max-h-48'>
            <div className='space-y-2'>
              {Object.entries(votingSummary.votesByTarget)
                .sort(([, a], [, b]) => b - a)
                .map(([targetId, voteCount]) => {
                  const voters = votingSummary.voteDetails[targetId] || [];
                  return (
                    <div
                      key={targetId}
                      className='border border-werewolf-purple/20 rounded-md p-3'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-gray-300 font-medium'>
                          {getPlayerName(targetId)}
                        </span>
                        <Badge
                          variant='outline'
                          className='text-werewolf-purple'
                        >
                          {t('voting.results.vote_count', { count: voteCount })}
                        </Badge>
                      </div>
                      {voters.length > 0 && (
                        <div className='text-xs text-gray-400'>
                          {t('voting.results.voters_label')}:{' '}
                          {voters
                            .map(voter => getPlayerName(voter.voterId))
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}

              {votingSummary.voteDetails['abstention'] && (
                <div className='border border-gray-500/20 rounded-md p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-300 font-medium'>
                      {t('voting.results.abstention')}
                    </span>
                    <Badge variant='outline' className='text-gray-400'>
                      {t('voting.results.vote_count', {
                        count: votingSummary.abstentions,
                      })}
                    </Badge>
                  </div>
                  <div className='text-xs text-gray-400'>
                    {t('voting.results.abstainers_label')}:{' '}
                    {votingSummary.voteDetails['abstention']
                      .map(vote => getPlayerName(vote.voterId))
                      .join(', ')}
                  </div>
                </div>
              )}

              {!votingSummary.hasVotes && (
                <div className='text-center p-4 text-gray-400'>
                  <Users className='h-8 w-8 mx-auto mb-2 opacity-50' />
                  <p className='text-sm'>{t('voting.results.no_records')}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {results.length > 0 && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-werewolf-purple'>
              {t('voting.results.results_title')}
            </h4>
            <ScrollArea className='max-h-32'>
              <div className='space-y-2'>
                {results.map(result => (
                  <div
                    key={result.id}
                    className='p-2 bg-werewolf-dark/40 rounded-md'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>
                        {result.target_id
                          ? getPlayerName(result.target_id)
                          : t('voting.results.no_target')}
                      </span>
                      <div className='flex items-center space-x-2'>
                        <Badge
                          variant='outline'
                          className='text-werewolf-purple'
                        >
                          {t('voting.results.vote_count', {
                            count: result.total_votes,
                          })}
                        </Badge>
                        <Badge
                          variant='outline'
                          className={
                            result.result_type === 'eliminated'
                              ? 'text-red-400 border-red-400'
                              : result.result_type === 'tied'
                                ? 'text-yellow-400 border-yellow-400'
                                : 'text-gray-400 border-gray-400'
                          }
                        >
                          {getResultTypeLabel(result.result_type)}
                        </Badge>
                        {result.processing_status !== 'completed' && (
                          <Badge
                            variant='outline'
                            className='text-orange-400 border-orange-400'
                          >
                            {getProcessingStatusLabel(result.processing_status)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
