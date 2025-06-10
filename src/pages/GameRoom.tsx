import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';
import PlayersList from '@/components/room/PlayersList';
import RoleSelection from '@/components/room/RoleSelection';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import MultiChannelChat from '@/components/chat/MultiChannelChat';

const GameRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousMaxPlayers, setPreviousMaxPlayers] = useState<number | null>(null);
  
  const { leaveCurrentRoom } = usePlayerRoom();
  const { roomData: realtimeRoomData, updateMaxPlayers } = useRoomRealtime(roomData?.id);
  const { players, loading: playersLoading, updatePlayerReady, addAIPlayer } = usePlayersRealtime(roomData?.id);
  
  // 添加在线状态追踪
  const { getOnlinePlayers, isPlayerOnline } = usePlayerPresence(roomData?.id, currentUser);
  const onlinePlayersList = getOnlinePlayers();
  const onlinePlayers = onlinePlayersList.map(p => p.user_id);
  
  // Get current max players from realtime data or fallback to local state
  const currentMaxPlayers = realtimeRoomData?.maxPlayers || roomData?.maxPlayers || 6;
  
  // 使用角色选择 hook，传递 user_id 而不是 player_id
  const {
    canSelectRoles,
    allPlayersSelectedRoles,
    clearAllRoleSelections,
    getCurrentPlayerSelection
  } = useRoleSelection(roomData?.id || '', currentUserId, players.length, currentMaxPlayers);
  
  // 获取当前玩家是否已选择角色
  const currentPlayerHasSelectedRole = !!getCurrentPlayerSelection();
  
  console.log('Current room data:', roomData);
  console.log('Players from hook:', players);
  console.log('Players loading:', playersLoading);
  console.log('Online players list:', onlinePlayersList);
  console.log('Online player user IDs:', onlinePlayers);
  
  const allReady = players.every(player => player.isReady);

  // Add room cleanup functionality
  useRoomCleanup();

  // 监听最大玩家数变化并重置角色选择
  useEffect(() => {
    if (previousMaxPlayers !== null && previousMaxPlayers !== currentMaxPlayers) {
      // 最大玩家数发生变化，清除所有角色选择
      const resetRoleSelections = async () => {
        const success = await clearAllRoleSelections();
        if (success) {
          setSelectedCharacter(null);
          setIsReady(false);
          toast({
            title: '角色选择已重置',
            description: '由于最大玩家数变化，所有角色选择已重置',
          });
        }
      };
      
      resetRoleSelections();
    }
    setPreviousMaxPlayers(currentMaxPlayers);
  }, [currentMaxPlayers, previousMaxPlayers, clearAllRoleSelections, toast]);

  // Fetch current user and room data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for room ID:', id);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          setCurrentUserId(session.user.id);
          
          console.log('Current user session:', session.user);
          
          // Get user profile for player name
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          console.log('User profile data:', userData);
          
          if (userData) {
            setCurrentUser({ ...session.user, player_name: userData.player_name });
          }
        }

        // Fetch room data using the id from URL params
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
              users!rooms_host_id_fkey(player_name)
            `)
            .eq('id', id)
            .maybeSingle();

          console.log('Room query result:', { roomData, roomError });

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
            console.log('Processed room data:', processedRoomData);
            setRoomData(processedRoomData);
            setPreviousMaxPlayers(roomData.max_players);
          } else {
            console.log('No room found with ID:', id);
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

    // 检查是否满足准备条件
    if (!canSelectRoles) {
      toast({
        title: '无法准备',
        description: `需要等待房间人数达到${currentMaxPlayers}人`,
        variant: "destructive",
      });
      return;
    }

    if (!allPlayersSelectedRoles) {
      toast({
        title: '无法准备',
        description: '需要等待所有玩家选择角色',
        variant: "destructive",
      });
      return;
    }

    // 使用数据库状态检查角色选择
    if (!isReady && !currentPlayerHasSelectedRole) {
      toast({
        title: t('select_character_first'),
        description: '请先选择角色才能进入准备状态',
        variant: "destructive",
      });
      return;
    }

    const newReadyState = !isReady;
    
    // 修复玩家匹配逻辑：通过 user_id 而不是 player_name 匹配
    const currentPlayer = players.find(p => {
      // For AI players, they don't have user_id, so we skip them
      if (p.isAI) return false;
      
      // 我们需要通过数据库查询来找到当前用户的 room_players 记录
      // 但现在先通过名称匹配作为临时解决方案
      return p.name === currentUser.player_name;
    });
    
    console.log('Current player for ready toggle:', currentPlayer);
    console.log('All players:', players);
    console.log('Current user:', currentUser);
    console.log('Looking for player with name:', currentUser.player_name);
    
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
    } else {
      console.error('Could not find current player in players list');
      console.error('Available player names:', players.map(p => p.name));
      toast({
        title: t('error'),
        description: '无法找到当前玩家信息',
        variant: "destructive",
      });
    }
  };

  const handleCharacterSelect = (characterId: string | null) => {
    // 如果已经准备，不能更改角色选择
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
    
    // 导航到游戏页面，传递房间ID
    navigate(`/room/${roomData.id}/game`);
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
                  allPlayersSelectedRoles={allPlayersSelectedRoles()}
                  canSelectRoles={canSelectRoles()}
                  currentPlayerHasSelectedRole={currentPlayerHasSelectedRole}
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
              currentPlayerId={currentUserId}
              isReady={isReady}
            />
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <MultiChannelChat
              roomId={roomData?.id || null}
              currentUser={currentUser}
              isGameRoom={true}
              title={t('room_chat')}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoom;
