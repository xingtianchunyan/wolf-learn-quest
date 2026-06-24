import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { VoteRecord } from './useEnhancedVotingAnalysis';

interface EnhancedVotingRecordsTableProps {
  voteRecords: VoteRecord[];
  votesLoading: boolean;
  gameActive: boolean;
  hasSession: boolean;
}

export const EnhancedVotingRecordsTable: React.FC<
  EnhancedVotingRecordsTableProps
> = ({ voteRecords, votesLoading, gameActive, hasSession }) => {
  const { t } = useLanguage();

  return (
    <div className='border border-werewolf-purple/30 rounded-md flex-1 min-h-0'>
      <ScrollArea className='h-full'>
        <Table>
          <TableHeader className='sticky top-0 bg-werewolf-card z-10'>
            <TableRow className='border-b border-werewolf-purple/30 hover:bg-transparent'>
              <TableHead className='text-werewolf-purple'>
                {t('voting.records.voted_player')}
              </TableHead>
              <TableHead className='text-werewolf-purple'>
                {t('voting.records.vote_count')}
              </TableHead>
              <TableHead className='text-werewolf-purple'>
                {t('voting.records.voting_players')}
              </TableHead>
              <TableHead className='text-werewolf-purple'>
                {t('common.status')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {votesLoading ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-gray-400'>
                  {t('voting.records.loading_votes')}
                </TableCell>
              </TableRow>
            ) : voteRecords.length > 0 ? (
              voteRecords.map((record, index) => (
                <TableRow
                  key={`${record.votedPlayerId}-${index}`}
                  className='border-b border-werewolf-purple/30 last:border-b-0'
                >
                  <TableCell className='text-gray-300'>
                    <div className='flex items-center gap-2'>
                      {record.votedPlayerName}
                      {record.isHighest &&
                        record.votedPlayerId !== 'abstention' && (
                          <Badge
                            variant='outline'
                            className='border-yellow-500 text-yellow-400 text-xs'
                          >
                            {t('voting.records.highest')}
                          </Badge>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className='text-gray-300 font-semibold'>
                    {record.voteCount}
                  </TableCell>
                  <TableCell className='text-gray-300 text-sm'>
                    {record.voters.join(', ')}
                  </TableCell>
                  <TableCell>
                    {record.isHighest &&
                    record.votedPlayerId !== 'abstention' ? (
                      voteRecords.filter(
                        r => r.isHighest && r.votedPlayerId !== 'abstention'
                      ).length === 1 ? (
                        <Badge className='bg-red-500/20 text-red-400 border-red-500'>
                          {t('game.status.pending')}
                        </Badge>
                      ) : (
                        <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500'>
                          {t('voting.results.result.tied')}
                        </Badge>
                      )
                    ) : (
                      <Badge
                        variant='outline'
                        className='border-gray-500 text-gray-400'
                      >
                        {t('voting.records.normal')}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-gray-400'>
                  {gameActive && hasSession
                    ? t('voting.records.no_records_active')
                    : t('voting.records.no_session')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
