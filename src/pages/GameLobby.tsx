import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus, User, Users, Gavel, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import PlayerInfo from '@/components/lobby/PlayerInfo';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useAuth } from '@/providers/AuthProvider';

interface GameRoom {
  id: string;
  roomId: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  hasAI: boolean;
  isPrivate: boolean;
  status: string;
  judgeUserId?: string;
  judgeName?: string;
}

const GameLobby = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingAIRoom, setIsCreatingAIRoom] = useState(false);
  const [isLeavingRoom, setIsLeavingRoom] = useState(false);
  const { currentUser, initializing, setIsLoginOpen } = useAuth();
  const { playerRoom, leaveCurrentRoom } = usePlayerRoom();

  // 新增：保存 judgeRoomId
  const [judgeRoomId, setJudgeRoomId] = useState<string | null>(null);

  // Add room cleanup functionality
  useRoomCleanup();

  // Auto-redirect to player's room if they're already in one
  useEffect(() => {
    if (!initializing && currentUser && !playerRoom.isLoading && playerRoom.roomDbId) {
      console.log('Player already in room, redirecting to:', playerRoom.roomDbId);
      navigate(`/room/${playerRoom.roomDbId}`);
    }
  }, [initializing, currentUser, playerRoom, navigate]);

  // 新增：检测当前用户是否是 judge，并且在哪个房间
  useEffect(() => {
    const fetchJudgeRoom = async () => {
      if (!currentUser) {
        setJudgeRoomId(null);
        return;
      }
      // 查找 rooms 表，这个人是不是 judge
      const { data, error } = await supabase
        .from('rooms')
        .select('id')
        .eq('judge_user_id', currentUser.id)
        .eq('status', 'waiting')
        .maybeSingle();
      if (error || !data) {
        setJudgeRoomId(null);
        return;
      }
      setJudgeRoomId(data.id);
    };

    if (!initializing && currentUser && !playerRoom.isLoading) {
      fetchJudgeRoom();
    }
  }, [initializing, currentUser, playerRoom.isLoading]);

  // 修改原有的 useEffect：优先重定向法官，再是普通玩家
  useEffect(() => {
    if (!initializing && currentUser && !playerRoom.isLoading) {
      if (judgeRoomId) {
        // 如果当前为 judge，自动跳转 judge 页面
        navigate(`/room/${judgeRoomId}/judge`);
      } else if (playerRoom.roomDbId) {
        // 玩家在房间，跳转回普通房间
        navigate(`/room/${playerRoom.roomDbId}`);
      }
    }
  }, [initializing, currentUser, playerRoom, playerRoom.roomDbId, judgeRoomId, navigate]);

  // Initialize authentication and fetch data
  useEffect(() => {
    if (!initializing && !currentUser) {
      setIsLoginOpen(true);
    } else if (currentUser && !playerRoom.roomDbId) {
      fetchRooms();
    }
  }, [initializing, currentUser, playerRoom.roomDbId]);

  // Fetch rooms from the database
  const fetchRooms = async () => {
    try {
      console.log('Fetching rooms...');
      const { data, error } = await supabase
        .from('rooms')
        .select(`
          id,
          room_id,
          max_players,
          status,
          human_judge,
          host_id,
          judge_user_id,
          users!rooms_host_id_fkey(player_name),
          room_players(id)
        `)
        .eq('status', 'waiting');

      if (error) {
        console.error('Error fetching rooms:', error);
        return;
      }

      console.log('Fetched rooms data:', data);

      // Get judge names separately if needed
      const roomsWithJudges = await Promise.all(
        (data || []).map(async (room) => {
          let judgeName = null;
          
          if (room.judge_user_id) {
            const { data: judgeData } = await supabase
              .from('users')
              .select('player_name')
              .eq('user_id', room.judge_user_id)
              .single();
            
            judgeName = judgeData?.player_name;
          }

          return {
            id: room.id,
            roomId: room.room_id,
            name: `Game Room ${room.room_id}`,
            host: room.users?.player_name || 'Unknown',
            players: room.room_players?.length || 0,
            maxPlayers: room.max_players || 8,
            hasAI: !room.human_judge,
            isPrivate: false,
            status: room.status,
            judgeUserId: room.judge_user_id,
            judgeName: judgeName
          };
        })
      );

      console.log('Formatted rooms:', roomsWithJudges);
      setGameRooms(roomsWithJudges);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  // Generate a room ID based on the current date and sequence number
  const generateRoomId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const sequence = Math.floor(Math.random() * 99) + 1;
    
    return `${year}/${month}/${day}-${String(sequence).padStart(2, '0')}`;
  };

  const handleLeaveCurrentRoom = async () => {
    if (!playerRoom.roomDbId) return;

    setIsLeavingRoom(true);
    
    try {
      const success = await leaveCurrentRoom();
      
      if (success) {
        toast({
          title: t('room_leave_success'),
          description: t('room_leave_success'),
        });
        // Refresh the room list
        fetchRooms();
      } else {
        toast({
          title: t('room_leave_failed'),
          description: t('room_leave_error'),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      toast({
        title: t('room_leave_failed'),
        description: t('room_leave_error'),
        variant: "destructive",
      });
    } finally {
      setIsLeavingRoom(false);
    }
  };

  const handleCreateRoom = async () => {
    console.log('Create room clicked, currentUser:', currentUser);
    
    if (!currentUser) {
      toast({
        title: t('auth_required'),
        description: t('sign_in_required'),
        variant: "destructive",
      });
      return;
    }

    if (playerRoom.roomDbId) {
      toast({
        title: t('already_in_room'),
        description: t('leave_first'),
        variant: "destructive",
      });
      return;
    }

    setIsCreatingRoom(true);
    
    try {
      const roomId = generateRoomId();
      
      console.log('Creating room with user ID:', currentUser.id);
      
      // Create room in database
      const { data: newRoom, error: roomError } = await supabase
        .from('rooms')
        .insert({
          room_id: roomId,
          host_id: currentUser.id,
          max_players: 12,
          status: 'waiting',
          human_judge: true
        })
        .select()
        .single();

      if (roomError) {
        console.error('Error creating room:', roomError);
        toast({
          title: t('room_create_failed'),
          description: roomError.message || t('room_create_error'),
          variant: "destructive",
        });
        return;
      }

      console.log('Room created:', newRoom);

      // Add host as player to the room
      const { error: playerError } = await supabase
        .from('room_players')
        .insert({
          room_id: newRoom.id,
          user_id: currentUser.id,
          is_ready: false,
          is_ai: false
        });

      if (playerError) {
        console.error('Error adding player to room:', playerError);
        toast({
          title: t('room_create_failed'),
          description: t('room_create_error'),
          variant: "destructive",
        });
      }

      toast({
        title: t('room_created'),
        description: t('room_created_desc'),
      });
      
      // Navigate to the specific room
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: t('room_create_failed'),
        description: t('room_create_error'),
        variant: "destructive",
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleCreateAIJudge = async () => {
    console.log('Create AI judge clicked, currentUser:', currentUser);
    
    if (!currentUser) {
      toast({
        title: t('auth_required'),
        description: t('sign_in_required'),
        variant: "destructive",
      });
      return;
    }

    if (playerRoom.roomDbId) {
      toast({
        title: t('already_in_room'),
        description: t('leave_first'),
        variant: "destructive",
      });
      return;
    }

    setIsCreatingAIRoom(true);

    try {
      const roomId = generateRoomId();
      
      console.log('Creating AI judge room with user ID:', currentUser.id);
      
      // Create room with AI judge in database
      const { data: newRoom, error: roomError } = await supabase
        .from('rooms')
        .insert({
          room_id: roomId,
          host_id: currentUser.id,
          max_players: 12,
          status: 'waiting',
          human_judge: false
        })
        .select()
        .single();

      if (roomError) {
        console.error('Error creating room:', roomError);
        toast({
          title: t('room_create_failed'),
          description: roomError.message || t('room_create_error'),
          variant: "destructive",
        });
        return;
      }

      console.log('AI judge room created:', newRoom);

      // Add host as player to the room
      const { error: playerError } = await supabase
        .from('room_players')
        .insert({
          room_id: newRoom.id,
          user_id: currentUser.id,
          is_ready: false,
          is_ai: false
        });

      if (playerError) {
        console.error('Error adding player to room:', playerError);
        toast({
          title: t('room_create_failed'),
          description: t('room_create_error'),
          variant: "destructive",
        });
      }

      toast({
        title: t('room_created'),
        description: t('room_created_desc'),
      });
      
      // Navigate to the specific room
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('Error creating AI judge room:', error);
      toast({
        title: t('room_create_failed'),
        description: t('room_create_error'),
        variant: "destructive",
      });
    } finally {
      setIsCreatingAIRoom(false);
    }
  };

  const joinRoom = async (roomId: string) => {
    if (!currentUser) {
      toast({
        title: t('auth_required'),
        description: t('sign_in_required'),
        variant: "destructive",
      });
      return;
    }

    if (playerRoom.roomDbId) {
      toast({
        title: t('already_in_room'),
        description: t('leave_first'),
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Joining room:', roomId, 'as user:', currentUser.id);

      // Add player to room
      const { error } = await supabase
        .from('room_players')
        .insert({
          room_id: roomId,
          user_id: currentUser.id,
          is_ready: false,
          is_ai: false
        });

      if (error) {
        console.error('Error joining room:', error);
        toast({
          title: t('room_join_failed'),
          description: error.message || t('room_join_error'),
          variant: "destructive",
        });
        return;
      }

      console.log('Successfully joined room:', roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: t('room_join_failed'),
        description: t('room_join_error'),
        variant: "destructive",
      });
    }
  };
  
  const playAsJudge = async (roomId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to play as judge",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Playing as judge in room:', roomId);
      
      // Update the room to set current user as judge
      const { error } = await supabase
        .from('rooms')
        .update({ judge_user_id: currentUser.id })
        .eq('id', roomId)
        .is('judge_user_id', null); // Only update if no judge is currently assigned

      if (error) {
        console.error('Error setting judge:', error);
        toast({
          title: "Failed to become judge",
          description: "Another player may have already become the judge",
          variant: "destructive",
        });
        return;
      }

      // 直接导航到对应房间的法官页面
      navigate(`/room/${roomId}/judge`);
      
      // Refresh room list to update UI
      fetchRooms();
    } catch (error) {
      console.error('Error playing as judge:', error);
      toast({
        title: "Failed to join as judge",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (initializing || playerRoom.isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">{t('loading')}</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Player Info or Auth Notice - Left Side */}
          <div className="w-full lg:w-1/4">
            {currentUser ? (
              <div className="space-y-4">
                <PlayerInfo currentUser={currentUser} />
                
                {/* Current Room Status */}
                {playerRoom.roomDbId && (
                  <Card className="bg-amber-900/20 border-amber-700/30">
                    <CardHeader>
                      <CardTitle className="text-amber-200 text-sm">{t('current_room')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-200 text-sm mb-3">
                        {t('room_id')}: {playerRoom.roomId}
                      </p>
                      <div className="space-y-2">
                        <Button
                          onClick={() => navigate(`/room/${playerRoom.roomDbId}`)}
                          className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                          size="sm"
                        >
                          {t('return_to_room')}
                        </Button>
                        <Button
                          onClick={handleLeaveCurrentRoom}
                          variant="outline"
                          className="w-full border-amber-700/30 hover:bg-amber-900/40"
                          size="sm"
                          disabled={isLeavingRoom}
                        >
                          <LogOut className="mr-2 h-3 w-3" />
                          {isLeavingRoom ? t('leaving') : t('leave_room')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-amber-900/20 border-amber-700/30 h-full">
                <CardContent className="pt-6 h-full flex items-center justify-center">
                  <p className="text-amber-200 text-center">
                    {t('sign_in_required')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content - Right Side */}
          <div className="w-full lg:w-3/4">
            {/* Action Buttons Row */}
            <div className="flex justify-between mb-4">
              <Button 
                onClick={handleCreateAIJudge}
                className="bg-werewolf-purple hover:bg-werewolf-light"
                disabled={!currentUser || isCreatingAIRoom || !!playerRoom.roomDbId}
              >
                <Brain className="mr-2 h-4 w-4" />
                {isCreatingAIRoom ? t('creating') : t('create_ai_judge')}
              </Button>
              
              <Button 
                onClick={handleCreateRoom}
                className="bg-werewolf-purple hover:bg-werewolf-light"
                disabled={!currentUser || isCreatingRoom || !!playerRoom.roomDbId}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isCreatingRoom ? t('creating') : t('create_room')}
              </Button>
            </div>
            
            {/* Game Room List */}
            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle>{t('game_rooms')}</CardTitle>
                <CardDescription>
                  {playerRoom.roomDbId 
                    ? t('leave_first')
                    : t('join_existing')
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-werewolf-purple/20">
                  <Table>
                    <TableHeader className="bg-werewolf-dark/60">
                      <TableRow>
                        <TableHead className="text-werewolf-purple w-[180px]">{t('room_id')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('players')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('max_players')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('status')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('judge')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('action')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Empty spacer row for aesthetics */}
                      <TableRow className="h-2 border-transparent">
                        <TableCell colSpan={6}></TableCell>
                      </TableRow>
                      
                      {gameRooms.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                            {t('no_rooms')}
                          </TableCell>
                        </TableRow>
                      ) : (
                        gameRooms.map((room) => (
                          <TableRow key={room.id} className="border-b border-werewolf-purple/10">
                            <TableCell className="font-medium">{room.roomId}</TableCell>
                            <TableCell className="text-center">{room.players}</TableCell>
                            <TableCell className="text-center">{room.maxPlayers}</TableCell>
                            <TableCell className="text-center">
                              <span className={`px-2 py-1 rounded text-xs ${
                                room.status === 'waiting' 
                                  ? 'bg-green-900/40 text-green-300' 
                                  : 'bg-amber-900/40 text-amber-300'
                              }`}>
                                {room.status === 'waiting' ? t('waiting') : t('started')}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              {room.hasAI ? (
                                <span className="text-blue-400">AI {t('judge')}</span>
                              ) : room.judgeUserId ? (
                                <span className="text-green-400">
                                  已有法官
                                </span>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => playAsJudge(room.id)}
                                  className="bg-werewolf-dark/40 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                                  disabled={!currentUser}
                                >
                                  <Gavel className="h-3 w-3 mr-1" />
                                  {t('play_judge')}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {room.players < room.maxPlayers && room.status === 'waiting' ? (
                                <Button 
                                  variant="default"
                                  size="sm"
                                  onClick={() => joinRoom(room.id)}
                                  className="bg-werewolf-purple hover:bg-werewolf-light"
                                  disabled={!currentUser || !!playerRoom.roomDbId}
                                >
                                  <User className="h-3 w-3 mr-1" />
                                  {t('join')}
                                </Button>
                              ) : (
                                <span className="text-gray-400">{t('full')}</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameLobby;
