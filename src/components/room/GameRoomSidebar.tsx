import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlayersList from '@/components/room/PlayersList';

interface GameRoomSidebarProps {
  roomData: {
    id: string;
    roomId: string;
    hostPlayerId: string;
    judge_user_id?: string | null;
  };
  judgeName: string | null;
  players: any[];
  currentMaxPlayers: number;
  onlinePlayers: string[];
  isReady: boolean;
  allReady: boolean;
  selectedCharacter: string | null;
  playersLoading: boolean;
  allPlayersSelectedRoles: boolean;
  canSelectRoles: boolean;
  currentPlayerHasSelectedRole: boolean;
  t: (key: string) => string;
  onReadyToggle: () => void;
  onLeaveRoom: () => void;
  onStartGame: () => void;
  onAddAIPlayer: () => void;
  onMaxPlayersChange: (increment: number) => void;
}

export const GameRoomSidebar: React.FC<GameRoomSidebarProps> = ({
  roomData,
  judgeName,
  players,
  currentMaxPlayers,
  onlinePlayers,
  isReady,
  allReady,
  selectedCharacter,
  playersLoading,
  allPlayersSelectedRoles,
  canSelectRoles,
  currentPlayerHasSelectedRole,
  t,
  onReadyToggle,
  onLeaveRoom,
  onStartGame,
  onAddAIPlayer,
  onMaxPlayersChange
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">{t('room_info')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">{t('room_id')}</p>
              <p className="font-bold">{roomData.roomId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('host_player_id')}</p>
              <p>{roomData.hostPlayerId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">法官状态</p>
              <p>{judgeName || '等待法官加入'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">在线玩家</p>
              <p>{onlinePlayers.length} / {players.length}</p>
            </div>

            <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
              <p className="text-xs text-gray-400 text-center">
                {t('auto_close_warning')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <PlayersList
        players={players}
        maxPlayers={currentMaxPlayers}
        isReady={isReady}
        allReady={allReady}
        selectedCharacter={selectedCharacter}
        loading={playersLoading}
        onReadyToggle={onReadyToggle}
        onLeaveRoom={onLeaveRoom}
        onStartGame={onStartGame}
        onAddAIPlayer={onAddAIPlayer}
        onMaxPlayersChange={onMaxPlayersChange}
        onlinePlayers={onlinePlayers}
        allPlayersSelectedRoles={allPlayersSelectedRoles}
        canSelectRoles={canSelectRoles}
        currentPlayerHasSelectedRole={currentPlayerHasSelectedRole}
      />
    </div>
  );
};

export default GameRoomSidebar;
