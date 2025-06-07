
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Bot, Plus, Minus, UserCheck, UserX, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
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
  onMaxPlayersChange: (increment: number) => void;
  onlinePlayers: string[];
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
  onMaxPlayersChange,
  onlinePlayers
}) => {
  const { t } = useLanguage();

  // 检查是否可以点击准备按钮
  const canToggleReady = () => {
    // 如果要进入准备状态，必须先选择角色
    if (!isReady && !selectedCharacter) {
      return false;
    }
    return true;
  };

  const getReadyButtonText = () => {
    if (!isReady && !selectedCharacter) {
      return '请先选择角色';
    }
    return isReady ? t('cancel_ready') : t('ready');
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple flex items-center">
          <Users className="mr-2 h-5 w-5" />
          {t('players_list')} ({players.length}/{maxPlayers})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 人数调整控制 */}
          <div className="flex items-center justify-between p-2 bg-werewolf-dark/20 rounded">
            <span className="text-sm text-gray-400">{t('max_players')}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMaxPlayersChange(-1)}
                disabled={maxPlayers <= 6}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-bold w-8 text-center">{maxPlayers}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMaxPlayersChange(1)}
                disabled={maxPlayers >= 12}
                className="h-6 w-6 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* 玩家列表 */}
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {loading ? (
                <div className="text-center text-gray-400 py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto"></div>
                  <p className="mt-2">{t('loading')}</p>
                </div>
              ) : (
                players.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      player.isReady ? 'bg-green-900/30' : 'bg-werewolf-dark/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        {player.avatar ? (
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-werewolf-purple/60 flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {player.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        {/* 在线状态指示器 */}
                        <div className="absolute -top-1 -right-1">
                          {player.isAI ? (
                            <Bot className="h-3 w-3 text-blue-400" />
                          ) : onlinePlayers.length > 0 ? (
                            onlinePlayers.some(id => player.name.includes(id) || id.includes(player.name)) ? (
                              <Wifi className="h-3 w-3 text-green-400" />
                            ) : (
                              <WifiOff className="h-3 w-3 text-red-400" />
                            )
                          ) : (
                            <WifiOff className="h-3 w-3 text-red-400" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{player.name}</span>
                          {player.isHost && <Crown className="h-4 w-4 text-yellow-400" />}
                          {player.isAI && <Bot className="h-4 w-4 text-blue-400" />}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {player.isReady ? (
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          <UserCheck className="h-3 w-3 mr-1" />
                          {t('ready')}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-400 text-gray-400">
                          <UserX className="h-3 w-3 mr-1" />
                          {t('not_ready')}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* 添加AI玩家按钮 */}
          {players.length < maxPlayers && (
            <Button
              onClick={onAddAIPlayer}
              variant="outline"
              className="w-full border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('add_ai_player')}
            </Button>
          )}

          {/* 准备按钮 */}
          <Button
            onClick={onReadyToggle}
            disabled={!canToggleReady()}
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

          {/* 开始游戏按钮 - 只有房主可见 */}
          {players.find(p => p.name === 'You')?.isHost && (
            <Button
              onClick={onStartGame}
              disabled={!allReady}
              className="w-full bg-werewolf-purple hover:bg-werewolf-light disabled:bg-gray-600"
            >
              {t('start_game')}
            </Button>
          )}

          {/* 离开房间按钮 */}
          <Button
            onClick={onLeaveRoom}
            variant="destructive"
            className="w-full"
          >
            {t('leave_room')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersList;
