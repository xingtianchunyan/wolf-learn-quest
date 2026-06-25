import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Crown,
  Bot,
  Plus,
  Minus,
  UserCheck,
  UserX,
  Wifi,
  WifiOff,
  Trash2,
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
  userId?: string; // 添加userId字段用于在线状态检查
}

interface PlayersListProps {
  players: Player[];
  maxPlayers: number;
  isReady: boolean;
  allReady: boolean;
  selectedCharacter: string | null;
  loading: boolean;
  onReadyToggle: () => void;
  onLeaveRoom: () => void;
  onStartGame: () => void;
  onAddAIPlayer: () => void;
  onRemoveAIPlayer: () => void;
  onMaxPlayersChange: (increment: number) => void;
  onlinePlayers: string[];
  allPlayersSelectedRoles: boolean;
  canSelectRoles: boolean;
  currentPlayerHasSelectedRole?: boolean;
  hideReadyButton?: boolean;
  currentUserId?: string;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  maxPlayers,
  isReady,
  allReady,
  selectedCharacter,
  loading,
  onReadyToggle,
  onLeaveRoom,
  onStartGame,
  onAddAIPlayer,
  onRemoveAIPlayer,
  onMaxPlayersChange,
  onlinePlayers,
  allPlayersSelectedRoles,
  canSelectRoles,
  currentPlayerHasSelectedRole = false,
  hideReadyButton = false,
  currentUserId,
}) => {
  const isHost = players.some(p => p.userId === currentUserId && p.isHost);
  const aiPlayerCount = players.filter(p => p.isAI).length;
  const { t } = useLanguage();

  // 检查是否可以点击准备按钮
  const canToggleReady = () => {
    // 必须先开放角色选择功能
    if (!canSelectRoles) {
      return false;
    }
    // 所有玩家都必须选择角色后才能准备
    if (!allPlayersSelectedRoles) {
      return false;
    }
    // 如果要进入准备状态，必须先选择角色（使用数据库状态而非本地状态）
    if (!isReady && !currentPlayerHasSelectedRole) {
      return false;
    }
    return true;
  };

  const getReadyButtonText = () => {
    if (!canSelectRoles) {
      return t('gameComponent.room.playersList.waitingForMaxPlayers', {
        maxPlayers,
      });
    }
    if (!allPlayersSelectedRoles) {
      return t('gameComponent.room.playersList.waitingAllSelected');
    }
    if (!isReady && !currentPlayerHasSelectedRole) {
      return t('gameComponent.room.playersList.selectRoleFirst');
    }
    return isReady ? t('cancel_ready') : t('ready');
  };

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle
          className='text-werewolf-purple flex items-center'
          data-testid='players-list-title'
        >
          <Users className='mr-2 h-5 w-5' />
          {t('players_list')} ({players.length}/{maxPlayers})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* 人数调整控制 */}
          <div className='flex items-center justify-between p-2 bg-werewolf-dark/20 rounded'>
            <span className='text-sm text-gray-400'>{t('max_players')}</span>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onMaxPlayersChange(-1)}
                disabled={maxPlayers <= 6}
                data-testid='decrease-max-players'
                className='h-6 w-6 p-0'
              >
                <Minus className='h-3 w-3' />
              </Button>
              <span
                className='text-sm font-bold w-8 text-center'
                data-testid='max-players-value'
              >
                {maxPlayers}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onMaxPlayersChange(1)}
                disabled={maxPlayers >= 12}
                data-testid='increase-max-players'
                className='h-6 w-6 p-0'
              >
                <Plus className='h-3 w-3' />
              </Button>
            </div>
          </div>

          {/* 游戏状态提示 */}
          <div className='p-2 bg-werewolf-dark/20 rounded'>
            <div className='text-xs text-gray-400 space-y-1'>
              <div className='flex justify-between'>
                <span>{t('gameComponent.room.playersList.roleSelection')}</span>
                <span
                  className={
                    canSelectRoles ? 'text-green-400' : 'text-yellow-400'
                  }
                >
                  {canSelectRoles
                    ? t('gameComponent.room.playersList.opened')
                    : t('gameComponent.room.playersList.waitingForPlayers')}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>{t('gameComponent.room.playersList.readyFunction')}</span>
                <span
                  className={
                    allPlayersSelectedRoles
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  }
                >
                  {allPlayersSelectedRoles
                    ? t('gameComponent.room.playersList.opened')
                    : t(
                        'gameComponent.room.playersList.waitingForRoleSelection'
                      )}
                </span>
              </div>
            </div>
          </div>

          {/* 玩家列表 */}
          <ScrollArea className='h-48'>
            <div className='space-y-2'>
              {loading ? (
                <div className='text-center text-gray-400 py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto'></div>
                  <p className='mt-2'>{t('loading')}</p>
                </div>
              ) : (
                players.map(player => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      player.isReady ? 'bg-green-900/30' : 'bg-werewolf-dark/40'
                    }`}
                  >
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
                        {player.avatar ? (
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className='w-8 h-8 rounded-full'
                          />
                        ) : (
                          <div className='w-8 h-8 rounded-full bg-werewolf-purple/60 flex items-center justify-center'>
                            <span className='text-xs font-bold'>
                              {player.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        {/* 在线状态指示器 */}
                        <div className='absolute -top-1 -right-1'>
                          {player.isAI ? (
                            <Bot className='h-3 w-3 text-blue-400' />
                          ) : player.userId &&
                            onlinePlayers.includes(player.userId) ? (
                            <Wifi className='h-3 w-3 text-green-400' />
                          ) : (
                            <WifiOff className='h-3 w-3 text-red-400' />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className='flex items-center space-x-1'>
                          <span className='font-medium'>{player.name}</span>
                          {player.isHost && (
                            <Crown className='h-4 w-4 text-yellow-400' />
                          )}
                          {player.isAI && (
                            <Bot className='h-4 w-4 text-blue-400' />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {player.isReady ? (
                        <Badge
                          variant='secondary'
                          className='bg-green-600 text-white'
                        >
                          <UserCheck className='h-3 w-3 mr-1' />
                          {t('ready')}
                        </Badge>
                      ) : (
                        <Badge
                          variant='outline'
                          className='border-gray-400 text-gray-400'
                        >
                          <UserX className='h-3 w-3 mr-1' />
                          {t('not_ready')}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* 添加/删除 AI 玩家按钮：未满员时显示添加，满员且有 AI 玩家时房主显示删除 */}
          {players.length < maxPlayers && (
            <Button
              onClick={onAddAIPlayer}
              variant='outline'
              data-testid='add-ai-player'
              className='w-full border-werewolf-purple/50 hover:bg-werewolf-purple/20'
            >
              <Plus className='mr-2 h-4 w-4' />
              {t('gameComponent.room.playersList.addAiPlayer')}
            </Button>
          )}
          {players.length >= maxPlayers && isHost && aiPlayerCount > 0 && (
            <Button
              onClick={onRemoveAIPlayer}
              variant='outline'
              data-testid='remove-ai-player'
              className='w-full border-red-500/50 text-red-400 hover:bg-red-900/30 hover:text-red-300'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              {t('gameComponent.room.playersList.removeAiPlayer')}
            </Button>
          )}

          {/* 准备按钮：抽卡模式下由选角自动触发，隐藏手动准备按钮 */}
          {!hideReadyButton && (
            <Button
              onClick={onReadyToggle}
              disabled={!canToggleReady()}
              data-testid='ready-button'
              className={`w-full ${
                isReady
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : canToggleReady()
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              {getReadyButtonText()}
            </Button>
          )}

          {/* 开始游戏按钮 - 只有房主可见 */}
          {isHost && (
            <Button
              onClick={onStartGame}
              disabled={!allReady}
              data-testid='start-game-room-button'
              className='w-full bg-werewolf-purple hover:bg-werewolf-light disabled:bg-gray-600'
            >
              {t('start_game')}
            </Button>
          )}

          {/* 离开房间按钮 */}
          <Button
            onClick={onLeaveRoom}
            variant='destructive'
            data-testid='leave-room-button'
            className='w-full'
          >
            {t('leave_room')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersList;
