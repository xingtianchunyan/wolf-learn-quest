import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Minus, Plus } from 'lucide-react';
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
  loading?: boolean;
  onReadyToggle: () => void;
  onLeaveRoom: () => void;
  onStartGame: () => void;
  onAddAIPlayer: () => void;
  onMaxPlayersChange: (increment: number) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  maxPlayers,
  isReady,
  allReady,
  selectedCharacter,
  loading = false,
  onReadyToggle,
  onLeaveRoom,
  onStartGame,
  onAddAIPlayer,
  onMaxPlayersChange
}) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30 flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
          <CardTitle className="text-werewolf-purple">
            <Users className="inline mr-2 h-5 w-5" />
            {t('players_list')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mb-4"></div>
          <p className="text-gray-400">{t('loading_players')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="text-werewolf-purple">
          <Users className="inline mr-2 h-5 w-5" />
          {t('players_list')} ({players.length}/{maxPlayers})
        </CardTitle>
        <Button 
          size="sm" 
          variant="outline"
          onClick={onAddAIPlayer}
          disabled={players.length >= maxPlayers}
          className="h-8 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
        >
          <Brain className="h-4 w-4 mr-1" />
          {t('add_ai')}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">{t('max_players')}</p>
          <div className="flex items-center justify-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMaxPlayersChange(-1)}
              disabled={maxPlayers <= 6}
              className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg min-w-[2rem] text-center">
              {maxPlayers}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMaxPlayersChange(1)}
              disabled={maxPlayers >= 12}
              className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {players.map((player) => (
              <div 
                key={player.id} 
                className={`flex items-center justify-between p-2 rounded-md ${
                  player.isReady ? 'bg-green-900/20' : 'bg-werewolf-dark/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback className={`${player.isAI ? 'bg-blue-700' : 'bg-werewolf-purple/70'}`}>
                      {player.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <div className="flex space-x-2 mt-1">
                      {player.isHost && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-xs">{t('host')}</Badge>
                      )}
                      {player.isAI && (
                        <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">AI</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {player.isReady ? (
                    <Badge className="bg-green-700 text-xs">{t('ready')}</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">{t('not_ready')}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex flex-col space-y-2 flex-shrink-0">
          <div className="flex justify-between">
            <Button 
              variant="outline"
              className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
              onClick={onLeaveRoom}
            >
              {t('leave_room')}
            </Button>
            <Button 
              className={isReady ? 'bg-green-700 hover:bg-green-600' : 'bg-werewolf-purple hover:bg-werewolf-light'}
              onClick={onReadyToggle}
            >
              {isReady ? t('ready') : t('not_ready')}
            </Button>
          </div>
          
          <Button
            className="bg-werewolf-purple hover:bg-werewolf-light w-full"
            onClick={onStartGame}
            disabled={!isReady || !allReady || !selectedCharacter || players.length < 6}
          >
            {t('start_game')}
          </Button>
          
          <p className="text-sm text-gray-400 text-center">
            {players.length < 6 ? t('need_more_players') :
             !allReady ? t('waiting_for_players') : 
             !selectedCharacter ? t('select_character') : t('ready_to_start')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersList;
