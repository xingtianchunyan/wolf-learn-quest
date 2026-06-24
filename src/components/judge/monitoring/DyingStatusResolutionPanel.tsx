/**
 * 濒死状态解除面板组件
 * 为法官提供快速解除濒死状态的操作界面
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, CheckCircle, XCircle, Heart, Clock } from 'lucide-react';
import { useDyingStatusManager } from '@/hooks/useDyingStatusManager';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface DyingStatusResolutionPanelProps {
  roomId: string;
  gameStateId: string;
  className?: string;
}

const DyingStatusResolutionPanel: React.FC<DyingStatusResolutionPanelProps> = ({
  roomId,
  gameStateId,
  className = '',
}) => {
  const { t } = useLanguage();
  const { players } = usePlayersRealtime(roomId);
  const {
    dyingPlayers,
    isResolving,
    resolveByProtection,
    resolveByAnswer,
    canManageDyingStatus,
  } = useDyingStatusManager(roomId, gameStateId);

  // 如果没有权限或没有濒死玩家，不显示面板
  if (!canManageDyingStatus() || dyingPlayers.length === 0) {
    return null;
  }

  const getPlayerName = (userId: string): string => {
    const player = players.find(p => p.userId === userId);
    return player?.name || t('common.unknown_player');
  };

  const getPlayerAvatar = (userId: string): string | undefined => {
    const player = players.find(p => p.userId === userId);
    return player?.avatar;
  };

  const getDyingReasonText = (reason?: string): string => {
    switch (reason) {
      case 'vote_elimination':
        return t('judge.dying.reason.vote');
      case 'night_attack':
        return t('judge.dying.reason.attack');
      default:
        return t('judge.dying.reason.unknown');
    }
  };

  const getPhaseName = (phase?: string) => {
    if (!phase) return '';
    switch (phase.toLowerCase()) {
      case 'day':
      case 'day_discussion':
        return t('game.phase.day_discussion');
      case 'evening':
      case 'evening_quiz':
        return t('game.phase.evening_quiz');
      case 'night':
      case 'night_action':
        return t('game.phase.night_action');
      case 'dawn':
      case 'dawn_quiz':
        return t('game.phase.dawn_quiz');
      default:
        return phase;
    }
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader>
        <CardTitle className='text-werewolf-purple flex items-center gap-2'>
          <Heart className='h-5 w-5 text-red-400' />
          {t('judge.dying.title')}
          <Badge variant='outline' className='text-red-400 border-red-400'>
            {t('judge.dying.dyingCount', { count: dyingPlayers.length })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {dyingPlayers.map(dyingPlayer => {
            const playerName = getPlayerName(dyingPlayer.userId);
            const playerAvatar = getPlayerAvatar(dyingPlayer.userId);
            const isProcessing = isResolving[dyingPlayer.userId];

            return (
              <div
                key={dyingPlayer.userId}
                className='p-4 rounded-lg border border-red-400/30 bg-red-900/20'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    {/* 玩家头像 */}
                    <div className='relative'>
                      {playerAvatar ? (
                        <img
                          src={playerAvatar}
                          alt={playerName}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 rounded-full bg-werewolf-purple/60 flex items-center justify-center'>
                          {playerName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-werewolf-dark animate-pulse' />
                    </div>

                    {/* 玩家信息 */}
                    <div>
                      <div className='font-medium text-white'>{playerName}</div>
                      <div className='text-sm text-gray-400'>
                        {getDyingReasonText(dyingPlayer.dyingReason)}
                        {dyingPlayer.dyingRound && (
                          <span className='ml-2'>
                            {t('judge.dying.roundPhase', {
                              round: dyingPlayer.dyingRound,
                              phase: getPhaseName(dyingPlayer.dyingPhase),
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant='outline'
                    className='text-red-400 border-red-400'
                  >
                    <Clock className='h-3 w-3 mr-1' />
                    {t('game.status.dying')}
                  </Badge>
                </div>

                <Separator className='my-3 bg-red-400/20' />

                {/* 操作按钮 */}
                <div className='space-y-3'>
                  <div className='text-sm text-gray-300 mb-2'>
                    {t('judge.dying.resolve.title')}
                  </div>

                  <div className='grid grid-cols-1 gap-2'>
                    {/* 获得保护 */}
                    <Button
                      onClick={() =>
                        resolveByProtection(dyingPlayer.userId, playerName)
                      }
                      disabled={isProcessing}
                      variant='outline'
                      size='sm'
                      className='border-green-400/50 text-green-400 hover:bg-green-400/10'
                    >
                      <Shield className='h-4 w-4 mr-2' />
                      {t('judge.dying.resolve.protection')}
                    </Button>

                    {/* 答题结果 */}
                    <div className='flex gap-2'>
                      <Button
                        onClick={() =>
                          resolveByAnswer(dyingPlayer.userId, true, playerName)
                        }
                        disabled={isProcessing}
                        variant='outline'
                        size='sm'
                        className='border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 flex-1'
                      >
                        <CheckCircle className='h-4 w-4 mr-2' />
                        {t('judge.dying.resolve.correct')}
                      </Button>

                      <Button
                        onClick={() =>
                          resolveByAnswer(dyingPlayer.userId, false, playerName)
                        }
                        disabled={isProcessing}
                        variant='outline'
                        size='sm'
                        className='border-red-400/50 text-red-400 hover:bg-red-400/10 flex-1'
                      >
                        <XCircle className='h-4 w-4 mr-2' />
                        {t('judge.dying.resolve.wrong')}
                      </Button>
                    </div>
                  </div>

                  {isProcessing && (
                    <div className='text-center'>
                      <div className='inline-flex items-center gap-2 text-sm text-gray-400'>
                        <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-werewolf-purple' />
                        {t('common.processing')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DyingStatusResolutionPanel;
