
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus, User, Users } from 'lucide-react';
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

// Mock room data - will be replaced with data from Supabase
const rooms = [
  { 
    id: 'room1', 
    roomId: '2024/05/19-01', 
    name: 'Learning Chemistry', 
    host: 'Teacher1', 
    players: 4, 
    maxPlayers: 7, 
    hasAI: true, 
    isPrivate: false, 
    status: 'waiting' 
  },
  { 
    id: 'room2', 
    roomId: '2024/05/19-02', 
    name: 'Math Challenge', 
    host: 'Student42', 
    players: 2, 
    maxPlayers: 7, 
    hasAI: false, 
    isPrivate: false, 
    status: 'started' 
  },
  { 
    id: 'room3', 
    roomId: '2024/05/19-03', 
    name: 'History Review', 
    host: 'ProfHistory', 
    players: 7, 
    maxPlayers: 7, 
    hasAI: true, 
    isPrivate: true, 
    status: 'waiting' 
  },
];

const GameLobby = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [gameRooms, setGameRooms] = useState(rooms); // Will be replaced with data from Supabase

  // Generate a room ID based on the current date and sequence number
  const generateRoomId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // In a real implementation, we would get the sequence from the database
    // For now, we'll just use a random number between 1-99
    const sequence = Math.floor(Math.random() * 99) + 1;
    
    return `${year}/${month}/${day}-${String(sequence).padStart(2, '0')}`;
  };

  const handleCreateRoom = async () => {
    try {
      // Create room with default settings: AI enabled, 10 max players, public room
      const roomName = `Game Room ${generateRoomId()}`;
      
      // In a real implementation, we would save this to Supabase
      const newRoom = {
        id: `room${gameRooms.length + 1}`,
        roomId: generateRoomId(),
        name: roomName,
        host: 'You', // Would be the actual user name
        players: 1,
        maxPlayers: 10,
        hasAI: true,
        isPrivate: false,
        status: 'waiting'
      };
      
      setGameRooms([...gameRooms, newRoom]);
      
      console.log('Creating room with AI players:', { roomName, maxPlayers: 10, isPrivate: false, useAI: true, aiCount: 2 });
      
      toast({
        title: "Room created!",
        description: `"${roomName}" has been created with AI players`,
      });
      
      // Redirect to game room page
      navigate('/room');
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Failed to create room",
        description: "An error occurred while creating the room",
        variant: "destructive",
      });
    }
  };

  const joinRoom = (roomId: string) => {
    console.log('Joining room:', roomId);
    navigate('/room');
  };
  
  const playAsJudge = (roomId: string) => {
    console.log('Playing as judge in room:', roomId);
    navigate('/judge');
  };
  
  const createAIJudge = () => {
    toast({
      title: "AI Judge Created",
      description: "Creating a new game room with AI Judge",
    });
    
    // Create a room with AI Judge and redirect to game page
    setTimeout(() => {
      navigate('/game');
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Player Info - Left Side */}
          <div className="w-full lg:w-1/4">
            <PlayerInfo />
          </div>

          {/* Main Content - Right Side */}
          <div className="w-full lg:w-3/4">
            {/* Action Buttons Row */}
            <div className="flex justify-between mb-4">
              <Button 
                onClick={createAIJudge}
                className="bg-werewolf-purple hover:bg-werewolf-light"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('create ai judge')}
              </Button>
              
              <Button 
                onClick={handleCreateRoom}
                className="bg-werewolf-purple hover:bg-werewolf-light"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('create room')}
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
                      
                      {gameRooms.map((room) => (
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
                              >
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
                              >
                                {t('join')}
                              </Button>
                            ) : (
                              <span className="text-gray-400">{t('full')}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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
