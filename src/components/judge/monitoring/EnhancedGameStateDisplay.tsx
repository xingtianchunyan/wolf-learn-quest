import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon, Clock, Play, Pause } from 'lucide-react';
import PlayerStatusDisplay from './PlayerStatusDisplay';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface EnhancedGameStateDisplayProps {
  roomId: string;
}

const EnhancedGameStateDisplay: React.FC<EnhancedGameStateDisplayProps> = ({
  roomId,
}) => {
  const { t } = useLanguage();

  const getPhaseName = (phase: number) => {
    switch (phase) {
      case 1:
        return t('game.phase.day_discussion');
      case 2:
        return t('game.phase.evening_quiz');
      case 3:
        return t('game.phase.night_action');
      case 4:
        return t('game.phase.dawn_quiz');
      default:
        return t('common.unknown');
    }
  };
  const { gameState, getPhaseDisplayName, formatTime, timeRemaining } =
    useGameState(roomId);
  const { players: realPlayers } = usePlayersRealtime(roomId);
  const { getRoleImageUrl } = useRoleDesigns();
  const { currentUser } = useAuth();
  const [maxPlayers, setMaxPlayers] = useState(8);

  useEffect(() => {
    const fetchRoomData = async () => {
      const { data } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomId)
        .single();
      if (data && data.max_players) {
        setMaxPlayers(data.max_players);
      }
    };
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    realPlayers.length,
    maxPlayers
  );

  const displayPlayers = Array.from({ length: maxPlayers }, (_, i) => {
    if (i < realPlayers.length) {
      const player = realPlayers[i];
      const selectedRole = player.userId
        ? getSelectedRoleByUser(player.userId)
        : null;
      const roleName = selectedRole?.roleName || '';
      const roleImageUrl = selectedRole?.roleDesign?.role_name
        ? getRoleImageUrl(selectedRole.roleDesign.role_name)
        : null;

      return {
        id: player.id,
        name: player.name,
        role: roleName,
        status: 'normal' as const,
        avatar: player.avatar,
        roleImageUrl,
        userId: player.userId,
      };
    } else {
      return {
        id: `placeholder-${i}`,
        name: t('judge.gameState.waitingPlayer'),
        role: '',
        status: 'waiting' as const,
        avatar: '',
        roleImageUrl: null as string | null,
        userId: undefined as string | undefined,
      };
    }
  });

  const getGameStatusDisplay = () => {
    if (!gameState) return t('judge.gameState.status.waiting');

    switch (gameState.status) {
      case 'waiting':
        return t('judge.gameState.status.waiting');
      case 'active':
        return t('judge.gameState.status.active', {
          round: gameState.currentRound,
          phase: getPhaseName(gameState.currentPhase),
        });
      case 'ended':
        return t('judge.gameState.status.ended');
      default:
        return t('common.unknown');
    }
  };

  const showTimer =
    gameState?.status === 'active' &&
    gameState.phaseEndTime &&
    !gameState.isPaused;

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>
          <div className='flex items-center'>
            <GamepadIcon className='mr-2 h-5 w-5' />
            {t('judge.gameState.title')}
          </div>
          {gameState?.status === 'active' && (
            <div className='flex items-center text-sm'>
              {gameState.isPaused ? (
                <div className='flex items-center text-yellow-400'>
                  <Pause className='h-4 w-4 mr-1' />
                  {t('judge.gameState.paused')}
                </div>
              ) : (
                <div className='flex items-center text-green-400'>
                  <Play className='h-4 w-4 mr-1' />
                  {t('judge.gameState.inProgress')}
                </div>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* 当前游戏轮次和阶段 */}
        <div className='text-center p-4 bg-werewolf-dark/40 rounded-md'>
          <h2 className='text-xl font-bold text-werewolf-purple mb-2'>
            {getGameStatusDisplay()}
          </h2>

          {/* 显示倒计时 */}
          {showTimer && (
            <div className='flex items-center justify-center text-lg font-semibold'>
              <Clock className='h-5 w-5 mr-2 text-werewolf-purple' />
              <span
                className={`${
                  timeRemaining <= 10
                    ? 'text-red-400'
                    : timeRemaining <= 30
                      ? 'text-yellow-400'
                      : 'text-werewolf-purple'
                }`}
              >
                {t('judge.gameState.timeRemaining', {
                  time: formatTime(timeRemaining),
                })}
              </span>
            </div>
          )}

          {/* 游戏状态说明 */}
          {gameState && (
            <div className='text-sm text-gray-400 mt-2'>
              {gameState.status === 'waiting' &&
                t('judge.gameState.hint.waitingForJudge')}
              {gameState.status === 'active' &&
                gameState.currentPhase === 1 &&
                t('game.phase.day_discussion')}
              {gameState.status === 'active' &&
                gameState.currentPhase === 2 &&
                t('game.phase.evening_quiz')}
              {gameState.status === 'active' &&
                gameState.currentPhase === 3 &&
                t('game.phase.night_action')}
              {gameState.status === 'active' &&
                gameState.currentPhase === 4 &&
                t('game.phase.dawn_quiz')}
              {gameState.status === 'ended' &&
                t('judge.gameState.hint.ended')}
            </div>
          )}
        </div>

        {/* 玩家角色和状态 */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-werewolf-purple'>
              {t('judge.gameState.playerStatusTitle')}
            </h3>
            <div className='flex items-center gap-3 text-xs text-gray-400'>
              <span className='inline-flex items-center gap-1'>
                <span className='inline-block w-3 h-3 rounded-full border-2 border-green-400'></span>
                {t('game.status.normal')}
              </span>
              <span className='inline-flex items-center gap-1'>
                <span className='inline-block w-3 h-3 rounded-full border-2 border-yellow-400'></span>
                {t('game.status.weakened')}
              </span>
              <span className='inline-flex items-center gap-1'>
                <span className='inline-block w-3 h-3 rounded-full border-2 border-red-400 animate-pulse'></span>
                {t('game.status.dying')}
              </span>
              <span className='inline-flex items-center gap-1'>
                <span className='inline-block w-3 h-3 rounded-full border-2 border-white'></span>
                {t('game.status.eliminated')}
              </span>
            </div>
          </div>
          <PlayerStatusDisplay
            players={displayPlayers}
            roomId={roomId}
            maxPlayers={maxPlayers}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameStateDisplay;
