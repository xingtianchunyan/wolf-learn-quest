import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';
import PlayersList from '@/components/room/PlayersList';
import RoleSelection from '@/components/room/RoleSelection';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

// Mock players data - this would be fetched from Supabase in a real implementation
const players = [
  { id: 'player1', name: 'You', avatar: '', isReady: true, isHost: true, isAI: false },
  { id: 'player2', name: 'Alice', avatar: '', isReady: false, isHost: false, isAI: false },
  { id: 'player3', name: 'Bob', avatar: '', isReady: true, isHost: false, isAI: false },
  { id: 'player4', name: 'AI-Charlie', avatar: '', isReady: true, isHost: false, isAI: true },
  { id: 'player5', name: 'AI-Diana', avatar: '', isReady: true, isHost: false, isAI: true },
];

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: '欢迎来到游戏房间!' },
  { id: 2, sender: 'System', content: '等待所有玩家准备...' },
  { id: 3, sender: 'Alice', content: '大家好，很期待这局游戏!' },
  { id: 4, sender: 'You', content: '准备好了就告诉我' },
];

const GameRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { leaveCurrentRoom } = usePlayerRoom();
  const { roomData: realtimeRoomData, updateMaxPlayers } = useRoomRealtime(roomData?.id);
  const { players, loading: playersLoading, updatePlayerReady, addAIPlayer } = usePlayersRealtime(roomData?.id);
  
  // 添加在线状态追踪
  const { getOnlinePlayers, isPlayerOnline } = usePlayerPresence(roomData?.id, currentUser);
  const onlinePlayers = getOnlinePlayers().map(p => p.user_id);
  
  const allReady = players.every(player => player.isReady);

  // Add room cleanup functionality
  useRoomCleanup();

  // Get current max players from realtime data or fallback to local state
  const currentMaxPlayers = realtimeRoomData?.maxPlayers || roomData?.maxPlayers || 6;

  // Fetch current user and room data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          
          // Get user profile for player name
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (userData) {
            setCurrentUser({ ...session.user, player_name: userData.player_name });
          }
        }

        // Fetch room data using the id from URL params or fallback to user's most recent room
        if (id) {
          console.log('Fetching room data for room ID:', id);
          
          // Fetch specific room by ID
          const { data: roomData, error: roomError } = await supabase
            .from('rooms')
            .select(`
              id,
              room_id,
              max_players,
              host_id,
              users!rooms_host_id_fkey(player_name),
              room_players(id, user_id)
            `)
            .eq('id', id)
            .maybeSingle();

          if (roomError) {
            console.error('Error fetching room:', roomError);
            toast({
              title: t('error'),
              description: t('error_loading_room'),
              variant: "destructive",
            });
            return;
          }

          if (roomData) {
            console.log('Room data found:', roomData);
            setRoomData({
              id: roomData.id,
              roomId: roomData.room_id,
              hostPlayerId: roomData.users?.player_name || 'Unknown',
              topic: '元素周期表', // This would come from room data in real implementation
              maxPlayers: roomData.max_players,
            });
          } else {
            console.log('No room found with ID:', id);
          }
        } else if (session?.user) {
          // Fallback: fetch user's most recent room
          console.log('No room ID in URL, fetching user\'s most recent room');
          
          const { data: roomPlayerData } = await supabase
            .from('room_players')
            .select(`
              room_id,
              rooms!inner(
                id,
                room_id,
                max_players,
                host_id,
                users!rooms_host_id_fkey(player_name)
              )
            `)
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (roomPlayerData?.rooms) {
            const room = roomPlayerData.rooms;
            setRoomData({
              id: room.id,
              roomId: room.room_id,
              hostPlayerId: room.users?.player_name || 'Unknown',
              topic: '元素周期表',
              maxPlayers: room.max_players,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: t('error'),
          description: t('error_loading_room'),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, id]);

  const handleMaxPlayersChange = async (increment: number) => {
    if (!roomData || !currentUser) return;

    const newMaxPlayers = Math.max(6, Math.min(12, currentMaxPlayers + increment));
    
    if (newMaxPlayers === currentMaxPlayers) return;

    try {
      const success = await updateMaxPlayers(newMaxPlayers);
      
      if (!success) {
        toast({
          title: t('error'),
          description: t('error_updating_players'),
          variant: "destructive",
        });
        return;
      }

      // Update local state for immediate feedback
      setRoomData({ ...roomData, maxPlayers: newMaxPlayers });
      
      toast({
        title: t('max_players_updated'),
        description: `${t('max_players_set')} ${newMaxPlayers}`,
      });
    } catch (error) {
      console.error('Error updating max players:', error);
      toast({
        title: t('error'),
        description: t('error_updating_players'),
        variant: "destructive",
      });
    }
  };
  
  const handleAddAIPlayer = async () => {
    if (players.length >= currentMaxPlayers) {
      toast({
        title: t('room_full'),
        description: t('room_is_full'),
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await addAIPlayer();
      
      if (success) {
        toast({
          title: t('ai_player_added'),
          description: t('ai_player_joined'),
        });
      } else {
        toast({
          title: t('error'),
          description: t('failed_to_add_ai'),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding AI player:', error);
      toast({
        title: t('error'),
        description: t('failed_to_add_ai'),
        variant: "destructive",
      });
    }
  };

  const handleReadyToggle = async () => {
    if (!currentUser || !roomData) return;

    const newReadyState = !isReady;
    
    // Find current user's player record
    const currentPlayer = players.find(p => p.name === currentUser.player_name || p.name === 'You');
    
    if (currentPlayer) {
      try {
        const success = await updatePlayerReady(currentPlayer.id, newReadyState);
        
        if (success) {
          setIsReady(newReadyState);
          toast({
            title: newReadyState ? t('ready') : t('not_ready'),
            description: newReadyState ? t('you_are_ready') : t('you_are_not_ready'),
          });
        } else {
          toast({
            title: t('error'),
            description: t('failed_to_update_status'),
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error updating ready status:', error);
        toast({
          title: t('error'),
          description: t('failed_to_update_status'),
          variant: "destructive",
        });
      }
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleStartGame = () => {
    if (!allReady) {
      toast({
        title: t('cannot_start_game'),
        description: t('players_not_ready'),
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedCharacter) {
      toast({
        title: t('select_character'),
        description: t('select_character_desc'),
        variant: "destructive",
      });
      return;
    }
    
    navigate('/game');
  };

  const handleLeaveRoom = async () => {
    try {
      const success = await leaveCurrentRoom();
      
      if (success) {
        toast({
          title: t('left_room'),
          description: t('left_room_desc'),
        });
        navigate('/lobby');
      } else {
        toast({
          title: t('error'),
          description: t('leave_room_failed'),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      toast({
        title: t('error'),
        description: t('leave_room_failed'),
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">{t('loading_room')}</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!roomData) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-400 mb-4">{t('room_not_found')}</p>
              <p className="text-sm text-gray-500 mb-4">
                {t('room_id_label')}: {id || t('not_specified')}
              </p>
              <Button onClick={() => navigate('/lobby')}>
                {t('return_to_lobby')}
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Room Info & Players */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Room Info Card */}
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
                      <p className="text-sm text-gray-400">{t('learning_topic')}</p>
                      <p>{roomData.topic}</p>
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
              
              {/* Players List */}
              <div>
                <PlayersList
                  players={players}
                  maxPlayers={currentMaxPlayers}
                  isReady={isReady}
                  allReady={allReady}
                  selectedCharacter={selectedCharacter}
                  loading={playersLoading}
                  onReadyToggle={handleReadyToggle}
                  onLeaveRoom={handleLeaveRoom}
                  onStartGame={handleStartGame}
                  onAddAIPlayer={handleAddAIPlayer}
                  onMaxPlayersChange={handleMaxPlayersChange}
                  onlinePlayers={onlinePlayers}
                />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Character Selection */}
          <div className="lg:col-span-5">
            <RoleSelection
              maxPlayers={currentMaxPlayers}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
            />
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-werewolf-purple flex items-center">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  {t('room_chat')}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 min-h-[400px]">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="chat-message">
                        <p className="text-sm">
                          <span className={`font-bold ${
                            message.sender === 'System' ? 'text-yellow-400' :
                            message.sender === 'You' ? 'text-werewolf-purple' :
                            'text-blue-400'
                          }`}>
                            {message.sender}:
                          </span>
                          <span className="ml-2">{message.content}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-auto">
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('enter_message')}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-werewolf-dark/40 border-werewolf-purple/30"
                    />
                    <Button type="submit" className="bg-werewolf-purple hover:bg-werewolf-light">
                      {t('send')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoom;
