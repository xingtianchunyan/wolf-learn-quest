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
import { useRoomJoin } from '@/hooks/useRoomJoin';
import PlayersList from '@/components/room/PlayersList';
import RoleSelection from '@/components/room/RoleSelection';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import GamePhaseIndicator from '@/components/game/GamePhaseIndicator';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useGameState } from '@/hooks/useGameState';

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
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousMaxPlayers, setPreviousMaxPlayers] = useState<number | null>(null);
  const [isInitializationComplete, setIsInitializationComplete] = useState(false);
  
  const { leaveCurrentRoom } = usePlayerRoom();
  const { isJoining, isJoined, ensurePlayerInRoom } = useRoomJoin(id);
  const { roomData: realtimeRoomData, updateMaxPlayers } = useRoomRealtime(roomData?.id);
  
  // 只有在玩家成功加入房间后才初始化这些 hooks
  const { players, loading: playersLoading, updatePlayerReady, addAIPlayer } = usePlayersRealtime(
    isJoined ? roomData?.id : null
  );
  
  // 添加在线状态追踪
  const { getOnlinePlayers, isPlayerOnline } = usePlayerPresence(
    isJoined ? roomData?.id : null, 
    currentUser
  );
  const onlinePlayersList = getOnlinePlayers();
  const onlinePlayers = onlinePlayersList.map(p => p.user_id);
  
  // Get current max players from realtime data or fallback to local state
  const currentMaxPlayers = realtimeRoomData?.maxPlayers || roomData?.maxPlayers || 6;
  
  // 使用角色选择 hook - 只有在玩家成功加入后才初始化
  const {
    canSelectRoles,
    allPlayersSelectedRoles,
    clearAllRoleSelections,
    getCurrentPlayerSelection
  } = useRoleSelection(
    isJoined ? (roomData?.id || '') : '', 
    currentPlayerId, 
    players.length, 
    currentMaxPlayers
  );

  // 添加游戏状态管理
  const { gameState } = useGameState(isJoined ? (roomData?.id || '') : '');
  
  console.log('GameRoom initialization status:');
  console.log('- Room ID from params:', id);
  console.log('- Current user:', currentUser?.id);
  console.log('- Room data:', roomData);
  console.log('- Is joining:', isJoining);
  console.log('- Is joined:', isJoined);
  console.log('- Current player ID:', currentPlayerId);
  console.log('- Initialization complete:', isInitializationComplete);
  console.log('- Online players:', onlinePlayers);
  console.log('- Game state:', gameState);
  
  const allReady = players.every(player => player.isReady);

  // Add room cleanup functionality
  useRoomCleanup();

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          const userWithProfile = {
            ...session.user,
            player_name: userData?.player_name || session.user.email?.split('@')[0] || 'Unknown'
          };
          
          setCurrentUser(userWithProfile);
          console.log('Current user set:', userWithProfile);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // 获取房间数据
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) {
        console.log('No room ID provided');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching room data for room ID:', id);
        
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select(`
            id,
            room_id,
            max_players,
            host_id,
            users!rooms_host_id_fkey(player_name)
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
          const processedRoomData = {
            id: roomData.id,
            roomId: roomData.room_id,
            hostPlayerId: roomData.users?.player_name || 'Unknown',
            topic: '元素周期表',
            maxPlayers: roomData.max_players,
          };
          
          setRoomData(processedRoomData);
          setPreviousMaxPlayers(roomData.max_players);
          console.log('Room data set:', processedRoomData);
        } else {
          console.log('No room found with ID:', id);
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
        toast({
          title: t('error'),
          description: t('error_loading_room'),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, [id, toast]);

  // 等待玩家成功加入房间后获取玩家ID
  useEffect(() => {
    const fetchPlayerIdAfterJoin = async () => {
      if (!isJoined || !currentUser || !roomData) {
        console.log('Conditions not met for fetching player ID:', {
          isJoined,
          currentUser: !!currentUser,
          roomData: !!roomData
        });
        return;
      }

      // 添加延迟确保数据已经写入
      setTimeout(async () => {
        try {
          console.log('Fetching player ID after successful join...');
          
          const { data: playerData, error: playerError } = await supabase
            .from('room_players')
            .select('id')
            .eq('room_id', roomData.id)
            .eq('user_id', currentUser.id)
            .maybeSingle();
          
          if (playerError) {
            console.error('Error fetching player ID:', playerError);
            return;
          }

          if (playerData) {
            console.log('Player ID found:', playerData.id);
            setCurrentPlayerId(playerData.id);
            setIsInitializationComplete(true);
          } else {
            console.log('No player data found - player may not have joined successfully');
            // 尝试重新加入
            ensurePlayerInRoom();
          }
        } catch (error) {
          console.error('Error in fetchPlayerIdAfterJoin:', error);
        }
      }, 1000);
    };

    fetchPlayerIdAfterJoin();
  }, [isJoined, currentUser, roomData, ensurePlayerInRoom]);

  // 监听最大玩家数变化并重置角色选择
  useEffect(() => {
    if (!isInitializationComplete) return;
    
    if (previousMaxPlayers !== null && previousMaxPlayers !== currentMaxPlayers) {
      const resetRoleSelections = async () => {
        console.log('Max players changed from', previousMaxPlayers, 'to', currentMaxPlayers);
        console.log('Clearing all role selections...');
        
        const success = await clearAllRoleSelections();
        if (success) {
          setSelectedCharacter(null);
          setIsReady(false);
          
          players.forEach(async (player) => {
            if (player.isReady) {
              await updatePlayerReady(player.id, false);
            }
          });
          
          toast({
            title: '角色选择已重置',
            description: `由于最大玩家数变化为${currentMaxPlayers}人，所有角色选择和准备状态已重置`,
          });
        } else {
          toast({
            title: '重置失败',
            description: '清除角色选择时发生错误，请刷新页面重试',
            variant: "destructive",
          });
        }
      };
      
      resetRoleSelections();
    }
    setPreviousMaxPlayers(currentMaxPlayers);
  }, [currentMaxPlayers, previousMaxPlayers, clearAllRoleSelections, toast, players, updatePlayerReady, isInitializationComplete]);

  // 处理页面卸载时的清理逻辑
  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (currentUser && roomData) {
        try {
          await leaveCurrentRoom(true);
        } catch (error) {
          console.error('Error cleaning up on page unload:', error);
        }
      }
    };

    const handlePopState = async () => {
      if (currentUser && roomData) {
        try {
          await leaveCurrentRoom(true);
        } catch (error) {
          console.error('Error cleaning up on navigation:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      if (currentUser && roomData) {
        leaveCurrentRoom(true).catch(error => {
          console.error('Error cleaning up on component unmount:', error);
        });
      }
    };
  }, [currentUser, roomData, leaveCurrentRoom]);
  
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
              topic: '元素周期表',
              maxPlayers: roomData.max_players,
            });
            setPreviousMaxPlayers(roomData.max_players);

            // 确保玩家已正确加入房间
            if (session?.user) {
              // 让 useRoomJoin hook 处理加入逻辑
              // 等待加入完成后再查找 player ID
              setTimeout(async () => {
                const { data: playerData } = await supabase
                  .from('room_players')
                  .select('id')
                  .eq('room_id', roomData.id)
                  .eq('user_id', session.user.id)
                  .maybeSingle();
                
                if (playerData) {
                  setCurrentPlayerId(playerData.id);
                  console.log('Current player ID set:', playerData.id);
                }
              }, 1000);
            }
          } else {
            console.log('No room found with ID:', id);
          }
        } else if (session?.user) {
          // Fallback: fetch user's most recent room
          console.log('No room ID in URL, fetching user\'s most recent room');
          
          const { data: roomPlayerData } = await supabase
            .from('room_players')
            .select(`
              id,
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
            setPreviousMaxPlayers(room.max_players);
            setCurrentPlayerId(roomPlayerData.id);
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

    if (!canSelectRoles()) {
      toast({
        title: '无法准备',
        description: `需要等待房间人数达到${currentMaxPlayers}人`,
        variant: "destructive",
      });
      return;
    }

    if (!allPlayersSelectedRoles()) {
      toast({
        title: '无法准备',
        description: '需要等待所有玩家选择角色',
        variant: "destructive",
      });
      return;
    }

    if (!isReady && !selectedCharacter) {
      toast({
        title: t('select_character_first'),
        description: '请先选择角色才能进入准备状态',
        variant: "destructive",
      });
      return;
    }

    const newReadyState = !isReady;
    
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

  const handleCharacterSelect = (characterId: string | null) => {
    if (isReady && characterId !== selectedCharacter) {
      toast({
        title: t('cannot_change_character'),
        description: '请先取消准备状态才能更换角色',
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCharacter(characterId);
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
  
  const handleStartGame = async () => {
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
    
    if (!gameState) {
      toast({
        title: '无法开始游戏',
        description: '请先初始化游戏状态',
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/game/${roomData.id}`);
  };

  const handleLeaveRoom = async () => {
    try {
      const success = await leaveCurrentRoom(true);
      
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

  // 检查当前用户是否为房主
  const isCurrentUserHost = players.find(p => p.name === currentUser?.player_name || p.name === 'You')?.isHost || false;

  // 修改加载状态的判断逻辑
  if (isLoading || isJoining || !isInitializationComplete) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">
                {isJoining ? '正在加入房间...' : 
                 !isInitializationComplete ? '正在初始化房间数据...' : 
                 t('loading_room')}
              </p>
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
              <div className="space-y-2">
                <Button onClick={() => navigate('/lobby')}>
                  {t('return_to_lobby')}
                </Button>
                {id && (
                  <Button onClick={ensurePlayerInRoom} variant="outline">
                    重新尝试加入房间
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
        {/* 游戏状态指示器 - 显示在顶部 */}
        {gameState && (
          <div className="mb-4">
            <GamePhaseIndicator
              phase={gameState.current_phase}
              round={gameState.current_round}
              className="justify-center"
            />
          </div>
        )}

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
              
              {/* 游戏状态显示卡片 - 只显示状态，不显示控制按钮 */}
              <GameStateDisplay roomId={roomData?.id || ''} />
              
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
                  allPlayersSelectedRoles={allPlayersSelectedRoles()}
                  canSelectRoles={canSelectRoles()}
                />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Character Selection */}
          <div className="lg:col-span-5">
            <RoleSelection
              maxPlayers={currentMaxPlayers}
              currentPlayerCount={players.length}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={handleCharacterSelect}
              roomId={roomData?.id || ''}
              currentPlayerId={currentPlayerId}
              isReady={isReady}
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
