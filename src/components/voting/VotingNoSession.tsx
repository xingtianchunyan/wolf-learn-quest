import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
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
  const phaseLabel =
    currentPhase === 1
      ? '白天'
      : currentPhase === 2
        ? '傍晚'
        : currentPhase === 3
          ? '夜晚'
          : '黎明';

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between'>
          <div className='flex items-center'>投票系统</div>
          <Badge
            variant='outline'
            className='text-yellow-400 border-yellow-400'
          >
            未激活
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='text-center p-6'>
          <AlertTriangle className='h-12 w-12 mx-auto mb-4 text-yellow-400 opacity-70' />
          <p className='text-gray-300 mb-4'>投票会话尚未创建</p>
          <p className='text-sm text-gray-400 mb-4'>
            当前轮次: {currentRound}, 阶段: {phaseLabel}
          </p>

          <div className='p-3 bg-werewolf-dark/20 rounded-md mb-4'>
            <h4 className='text-sm font-medium text-werewolf-purple mb-2'>
              可投票玩家列表
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
              {loading ? '创建中...' : '创建投票会话'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
