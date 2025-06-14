
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomInfoCardProps {
  roomId: string;
  hostPlayerId: string;
  topic: string;
  onlinePlayersCount: number;
  playersCount: number;
  maxPlayers: number;
  t: (key: string) => string;
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({
  roomId,
  hostPlayerId,
  topic,
  onlinePlayersCount,
  playersCount,
  maxPlayers,
  t
}) => {
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">{t('room_info')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">{t('room_id')}</p>
            <p className="font-bold">{roomId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('host_player_id')}</p>
            <p>{hostPlayerId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('learning_topic')}</p>
            <p>{topic}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">在线玩家</p>
            <p>{onlinePlayersCount} / {playersCount}</p>
          </div>
          <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
            <p className="text-xs text-gray-400 text-center">
              {t('auto_close_warning')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomInfoCard;
