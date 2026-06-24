import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon, Clock, Play, Pause } from 'lucide-react';
import GamePlayerStatusDisplay from '../displays/GamePlayerStatusDisplay';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface GameInfoPanelProps {
  roomId: string;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;
}

const GameInfoPanel: React.FC<GameInfoPanelProps> = ({
  roomId,
  selectedTargetId,
  onTargetSelect,
  canSelectTargets = false,
}) => {
  const { t } = useLanguage();
  const { gameState, formatTime, timeRemaining } = useGameState(roomId);
  const { players: realPlayers } = usePlayersRealtime(roomId);
  const [maxPlayers, setMaxPlayers] = useState(8);

  const phaseKeyMap: Record<number, string> = {
    1: 'game.phase.day',
    2: 'game.phase.evening',
    3: 'game.phase.night',
    4: 'game.phase.dawn',
  };

  const getPhaseDisplayName = (phase: number) =>
    t((phaseKeyMap[phase] as never) ?? 'common.unknown');

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

  const getGameStatusDisplay = () => {
    if (!gameState) return t('gameComponent.infoPanel.waiting');

    switch (gameState.status) {
      case 'waiting':
        return t('gameComponent.infoPanel.waitingForStart');
      case 'active':
        return t('game.phase.round_phase', {
          round: gameState.currentRound,
          phase: getPhaseDisplayName(gameState.currentPhase),
        });
      case 'ended':
        return t('gameComponent.infoPanel.gameEnded');
      default:
        return t('common.unknown_status');
    }
  };

  const showTimer =
    gameState?.status === 'active' &&
    gameState.phaseEndTime &&
    !gameState.isPaused;

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full overflow-hidden flex flex-col'>
      <CardHeader className='pb-3 flex-shrink-0'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>
          <div className='flex items-center'>
            <GamepadIcon className='mr-2 h-5 w-5' />
            {t('gameComponent.infoPanel.title')}
          </div>
          {gameState?.status === 'active' && (
            <div className='flex items-center text-sm'>
              {gameState.isPaused ? (
                <div className='flex items-center text-yellow-400'>
                  <Pause className='h-4 w-4 mr-1' />
                  {t('gameComponent.infoPanel.paused')}
                </div>
              ) : (
                <div className='flex items-center text-green-400'>
                  <Play className='h-4 w-4 mr-1' />
                  {t('gameComponent.infoPanel.inProgress')}
                </div>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>

      {/* 当前游戏轮次和阶段 */}
      <div className='text-center p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0 m-4 mb-3'>
        <h2 className='text-lg font-bold text-werewolf-purple mb-2'>
          {getGameStatusDisplay()}
        </h2>

        {/* 显示倒计时 */}
        {showTimer && (
          <div className='flex items-center justify-center text-sm font-semibold'>
            <Clock className='h-4 w-4 mr-2 text-werewolf-purple' />
            <span
              className={`${
                timeRemaining <= 10
                  ? 'text-red-400'
                  : timeRemaining <= 30
                    ? 'text-yellow-400'
                    : 'text-werewolf-purple'
              }`}
            >
              {t('gameComponent.infoPanel.timeRemaining', {
                time: formatTime(timeRemaining),
              })}
            </span>
          </div>
        )}

        {/* 游戏状态说明 */}
        {gameState && (
          <div className='text-xs text-gray-400 mt-1'>
            {gameState.status === 'waiting' &&
              t('gameComponent.infoPanel.waitingDescription')}
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
              t('gameComponent.infoPanel.endedDescription')}
          </div>
        )}
      </div>

      {/* 玩家状态标题 */}
      <div className='flex items-center justify-between flex-shrink-0 mx-4 mb-3'>
        <h3 className='font-semibold text-werewolf-purple text-sm'>
          {t('gameComponent.infoPanel.playerStatusTitle')}{' '}
          {canSelectTargets && t('gameComponent.infoPanel.clickToSelect')}
        </h3>
        <div className='flex items-center gap-2 text-xs text-gray-400'>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-2 h-2 rounded-full border border-green-400'></span>
            {t('game.status.normal')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-2 h-2 rounded-full border border-yellow-400'></span>
            {t('game.status.weakened')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-2 h-2 rounded-full border border-red-400 animate-pulse'></span>
            {t('game.status.dying')}
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-2 h-2 rounded-full border border-white'></span>
            {t('game.status.eliminated')}
          </span>
        </div>
      </div>

      {/* 玩家状态列表 */}
      <div className='flex-1 min-h-0 overflow-hidden mx-4 mb-4'>
        <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-werewolf-purple/50 scrollbar-track-transparent'>
          <GamePlayerStatusDisplay
            players={realPlayers}
            roomId={roomId}
            maxPlayers={maxPlayers}
            selectedTargetId={selectedTargetId}
            onTargetSelect={onTargetSelect}
            canSelectTargets={canSelectTargets}
            currentPhase={gameState?.currentPhase}
          />
        </div>
      </div>
    </Card>
  );
};

export default GameInfoPanel;
