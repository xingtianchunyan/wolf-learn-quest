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
  return (
    <div className='border border-werewolf-purple/30 rounded-md flex-1 min-h-0'>
      <ScrollArea className='h-full'>
        <Table>
          <TableHeader className='sticky top-0 bg-werewolf-card z-10'>
            <TableRow className='border-b border-werewolf-purple/30 hover:bg-transparent'>
              <TableHead className='text-werewolf-purple'>被投票玩家</TableHead>
              <TableHead className='text-werewolf-purple'>得票数</TableHead>
              <TableHead className='text-werewolf-purple'>投票玩家</TableHead>
              <TableHead className='text-werewolf-purple'>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {votesLoading ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-gray-400'>
                  正在加载投票数据...
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
                            最高票
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
                          待处理
                        </Badge>
                      ) : (
                        <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500'>
                          平票
                        </Badge>
                      )
                    ) : (
                      <Badge
                        variant='outline'
                        className='border-gray-500 text-gray-400'
                      >
                        普通
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-gray-400'>
                  {gameActive && hasSession
                    ? '当前无投票记录'
                    : '游戏尚未开始或无活跃投票会话'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
