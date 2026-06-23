import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Gavel } from 'lucide-react';
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
  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center'>
          <Gavel className='mr-2 h-5 w-5' />
          投票动作
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {userVote ? (
          <div className='p-4 bg-green-500/20 border border-green-500/30 rounded-md text-center'>
            <div className='flex items-center justify-center space-x-2 mb-2'>
              <CheckCircle className='h-5 w-5 text-green-400' />
              <span className='text-green-400 font-medium'>已完成投票</span>
            </div>
            <p className='text-sm text-gray-300'>
              {userVote.target_id
                ? `投票目标: ${
                    players.find(p => p.userId === userVote.target_id)?.name ||
                    '未知玩家'
                  }`
                : '选择弃权'}
            </p>
          </div>
        ) : canVote ? (
          <div className='space-y-4'>
            {selectedTarget ? (
              <div className='p-3 bg-werewolf-purple/20 border border-werewolf-purple/50 rounded-md'>
                <div className='flex items-center justify-between'>
                  <span className='text-werewolf-purple font-medium'>
                    选择目标:{' '}
                    {players.find(p => p.userId === selectedTarget)?.name ||
                      '未知玩家'}
                  </span>
                  <Badge variant='outline' className='text-werewolf-purple'>
                    当前 {getTargetVoteCount(selectedTarget)} 票
                  </Badge>
                </div>
              </div>
            ) : (
              <div className='p-3 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>
                <p className='text-sm text-gray-400'>
                  请在游戏信息面板中点击玩家卡片选择投票目标
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
                {loading ? '投票中...' : '确认投票'}
              </Button>
              <Button
                onClick={() => onVote(undefined)}
                disabled={loading}
                variant='outline'
                data-testid='abstain-vote'
                className='border-gray-500 text-gray-300 hover:bg-gray-500/20'
              >
                {loading ? '处理中...' : '弃权'}
              </Button>
            </div>
          </div>
        ) : (
          <div className='p-4 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>
            <p className='text-sm text-gray-400'>
              {currentSession.status !== 'active'
                ? '投票会话已结束'
                : '当前无法投票'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
