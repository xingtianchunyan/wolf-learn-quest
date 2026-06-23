import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Users, Vote } from 'lucide-react';
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
  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between'>
          <div className='flex items-center'>
            <Vote className='mr-2 h-5 w-5' />
            投票情况
          </div>
          <Badge variant='outline' className='text-green-400 border-green-400'>
            {currentSession.session_type === 'day_vote'
              ? '白天投票'
              : '放逐投票'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md'>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-werewolf-purple' />
            <span className='text-sm text-gray-300'>投票进行中</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Users className='h-4 w-4 text-werewolf-purple' />
            <span className='text-sm text-gray-300'>
              {votingSummary.totalVotes} / {players.length} 已投票
            </span>
            {votingSummary.abstentions > 0 && (
              <Badge variant='outline' className='text-gray-400 text-xs'>
                {votingSummary.abstentions} 弃权
              </Badge>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-werewolf-purple'>
            投票详情 (按得票数排序)
          </h4>
          <ScrollArea className='max-h-48'>
            <div className='space-y-2'>
              {Object.entries(votingSummary.votesByTarget)
                .sort(([, a], [, b]) => b - a)
                .map(([targetId, voteCount]) => {
                  const targetPlayer = players.find(p => p.userId === targetId);
                  const voters = votingSummary.voteDetails[targetId] || [];
                  return (
                    <div
                      key={targetId}
                      className='border border-werewolf-purple/20 rounded-md p-3'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-gray-300 font-medium'>
                          {targetPlayer?.name || '未知玩家'}
                        </span>
                        <Badge
                          variant='outline'
                          className='text-werewolf-purple'
                        >
                          {voteCount} 票
                        </Badge>
                      </div>
                      {voters.length > 0 && (
                        <div className='text-xs text-gray-400'>
                          投票者:{' '}
                          {voters
                            .map(voter => {
                              const voterPlayer = players.find(
                                p => p.userId === voter.voterId
                              );
                              return voterPlayer?.name || '未知玩家';
                            })
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}

              {votingSummary.voteDetails['abstention'] && (
                <div className='border border-gray-500/20 rounded-md p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-300 font-medium'>弃权</span>
                    <Badge variant='outline' className='text-gray-400'>
                      {votingSummary.abstentions} 票
                    </Badge>
                  </div>
                  <div className='text-xs text-gray-400'>
                    弃权者:{' '}
                    {votingSummary.voteDetails['abstention']
                      .map(vote => {
                        const voterPlayer = players.find(
                          p => p.userId === vote.voterId
                        );
                        return voterPlayer?.name || '未知玩家';
                      })
                      .join(', ')}
                  </div>
                </div>
              )}

              {!votingSummary.hasVotes && (
                <div className='text-center p-4 text-gray-400'>
                  <Users className='h-8 w-8 mx-auto mb-2 opacity-50' />
                  <p className='text-sm'>暂无投票记录</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {results.length > 0 && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-werewolf-purple'>
              投票结果
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
                          ? players.find(p => p.userId === result.target_id)
                              ?.name || '未知玩家'
                          : '无目标'}
                      </span>
                      <div className='flex items-center space-x-2'>
                        <Badge
                          variant='outline'
                          className='text-werewolf-purple'
                        >
                          {result.total_votes} 票
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
                          {result.result_type === 'eliminated'
                            ? '被淘汰'
                            : result.result_type === 'tied'
                              ? '平票'
                              : result.result_type === 'saved'
                                ? '获救'
                                : '无结果'}
                        </Badge>
                        {result.processing_status !== 'completed' && (
                          <Badge
                            variant='outline'
                            className='text-orange-400 border-orange-400'
                          >
                            {result.processing_status === 'pending'
                              ? '待处理'
                              : result.processing_status === 'processing'
                                ? '处理中'
                                : '失败'}
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
