import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus, User, Users, Gavel } from 'lucide-react';
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
}

const GameLobby = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingAIRoom, setIsCreatingAIRoom] = useState(false);
  const { currentUser, initializing, setIsLoginOpen } = useAuth();

  // Add room cleanup functionality
  useRoomCleanup();

  // Initialize authentication and fetch data
  useEffect(() => {
    if (!initializing && !currentUser) {
      setIsLoginOpen(true);
    } else if (currentUser) {
      fetchRooms();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing, currentUser]);

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
          users!rooms_host_id_fkey(player_name),
          room_players(id)
        `)
        .eq('status', 'waiting');

      if (error) {
        console.error('Error fetching rooms:', error);
        return;
      }

      console.log('Fetched rooms data:', data);

      const formattedRooms: GameRoom[] = data?.map(room => ({
        id: room.id,
        roomId: room.room_id,
        name: `Game Room ${room.room_id}`,
        host: room.users?.player_name || 'Unknown',
        players: room.room_players?.length || 0,
        maxPlayers: room.max_players || 8,
        hasAI: !room.human_judge,
        isPrivate: false,
        status: room.status
      })) || [];

      console.log('Formatted rooms:', formattedRooms);
      setGameRooms(formattedRooms);
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

  const handleCreateRoom = async () => {
    console.log('Create room clicked, currentUser:', currentUser);
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create rooms",
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
          title: "Failed to create room",
          description: roomError.message || "An error occurred while creating the room",
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
          title: "Room created but failed to join",
          description: "You may need to join the room manually",
          variant: "destructive",
        });
      }

      toast({
        title: "Room created!",
        description: `Room "${roomId}" has been created successfully`,
      });
      
      // Navigate to the specific room
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Failed to create room",
        description: "An unexpected error occurred",
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
        title: "Authentication required",
        description: "Please sign in to create rooms",
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
          max_players: 10,
          status: 'waiting',
          human_judge: false
        })
        .select()
        .single();

      if (roomError) {
        console.error('Error creating room:', roomError);
        toast({
          title: "Failed to create room",
          description: roomError.message || "An error occurred while creating the room",
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
          title: "Room created but failed to join",
          description: "Player addition failed",
          variant: "destructive",
        });
      }

      toast({
        title: "AI Judge Room Created",
        description: "Room with AI Judge created successfully",
      });
      
      // Navigate to the specific room
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('Error creating AI judge room:', error);
      toast({
        title: "Failed to create room",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAIRoom(false);
    }
  };

  const joinRoom = async (roomId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join rooms",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Joining room:', roomId, 'as user:', currentUser.id);

      // First, check if user is already in the room
      const { data: existingPlayer, error: checkError } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', roomId)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing player:', checkError);
        toast({
          title: "Failed to join room",
          description: "Error checking room membership",
          variant: "destructive",
        });
        return;
      }

      if (existingPlayer) {
        console.log('User already in room, navigating to room');
        toast({
          title: "Already in room",
          description: "You're already a member of this room",
        });
        navigate(`/room/${roomId}`);
        return;
      }

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
          title: "Failed to join room",
          description: error.message || "An error occurred while joining the room",
          variant: "destructive",
        });
        return;
      }

      console.log('Successfully joined room:', roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: "Failed to join room",
        description: "An unexpected error occurred",
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
      navigate('/judge');
    } catch (error) {
      console.error('Error playing as judge:', error);
      toast({
        title: "Failed to join as judge",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (initializing) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">Loading...</p>
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
              <PlayerInfo currentUser={currentUser} />
            ) : (
              <Card className="bg-amber-900/20 border-amber-700/30 h-full">
                <CardContent className="pt-6 h-full flex items-center justify-center">
                  <p className="text-amber-200 text-center">
                    Please sign in to create or join game rooms
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
                disabled={!currentUser || isCreatingAIRoom}
              >
                <Brain className="mr-2 h-4 w-4" />
                {isCreatingAIRoom ? 'Creating...' : t('create ai judge')}
              </Button>
              
              <Button 
                onClick={handleCreateRoom}
                className="bg-werewolf-purple hover:bg-werewolf-light"
                disabled={!currentUser || isCreatingRoom}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isCreatingRoom ? 'Creating...' : t('create room')}
              </Button>
            </div>
            
            {/* Game Room List */}
            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle>{t('game rooms')}</CardTitle>
                <CardDescription>
                  {t('join existing')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-werewolf-purple/20">
                  <Table>
                    <TableHeader className="bg-werewolf-dark/60">
                      <TableRow>
                        <TableHead className="text-werewolf-purple w-[180px]">{t('room id')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('players')}</TableHead>
                        <TableHead className="text-werewolf-purple text-center">{t('max players')}</TableHead>
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
                            No active rooms available. Create a new room to get started!
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
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => playAsJudge(room.id)}
                                  className="bg-werewolf-dark/40 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                                  disabled={!currentUser}
                                >
                                  <Gavel className="h-3 w-3 mr-1" />
                                  {t('play judge')}
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
                                  disabled={!currentUser}
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
