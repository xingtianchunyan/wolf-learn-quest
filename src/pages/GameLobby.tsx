
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus, User, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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

// Mock player data is now replaced with real data from Supabase in the PlayerInfo component

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
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [isPrivate, setIsPrivate] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [aiCount, setAiCount] = useState(2);
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
    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please enter a name for your game room",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, we would save this to Supabase
      const newRoom = {
        id: `room${gameRooms.length + 1}`,
        roomId: generateRoomId(),
        name: roomName,
        host: 'You', // Would be the actual user name
        players: 1,
        maxPlayers: maxPlayers,
        hasAI: useAI,
        isPrivate: isPrivate,
        status: 'waiting'
      };
      
      setGameRooms([...gameRooms, newRoom]);
      
      console.log('Creating room:', { roomName, maxPlayers, isPrivate, useAI, aiCount });
      
      toast({
        title: "Room created!",
        description: `"${roomName}" has been created successfully`,
      });
      
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
                {t('create_ai_judge')}
              </Button>
              
              <Button 
                onClick={() => setRoomName('New Game Room')}
                className="bg-werewolf-purple hover:bg-werewolf-light"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('create_room')}
              </Button>
            </div>
            
            {/* Game Room List */}
            <Card className="bg-werewolf-card border-werewolf-purple/30 mb-6">
              <CardHeader>
                <CardTitle>{t('game_rooms')}</CardTitle>
                <CardDescription>
                  {t('join_existing')}
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
            
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="w-full bg-werewolf-card mb-4">
                <TabsTrigger value="create" className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('create_room')}
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex-1">
                  <Brain className="mr-2 h-4 w-4" />
                  {t('ai_settings')}
                </TabsTrigger>
              </TabsList>

              {/* Create Room Form */}
              <TabsContent value="create">
                <Card className="bg-werewolf-card border-werewolf-purple/30">
                  <CardHeader>
                    <CardTitle>{t('create_room')}</CardTitle>
                    <CardDescription>
                      {t('setup_game')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="roomName">{t('room_name')}</Label>
                        <Input 
                          id="roomName" 
                          placeholder={t('enter_room_name')}
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="bg-werewolf-dark/40 border-werewolf-purple/30"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="maxPlayers">{t('max_players')}: {maxPlayers}</Label>
                        </div>
                        <Slider 
                          id="maxPlayers"
                          min={6}
                          max={12}
                          step={1}
                          value={[maxPlayers]}
                          onValueChange={(values) => setMaxPlayers(values[0])}
                          className="py-4"
                        />
                        <div className="text-xs text-gray-400 mt-1">
                          {t('player_config')}: {maxPlayers} {t('player_roles')}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="isPrivate" 
                          checked={isPrivate} 
                          onCheckedChange={setIsPrivate}
                        />
                        <Label htmlFor="isPrivate">{t('private_room')}</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="useAI" 
                          checked={useAI} 
                          onCheckedChange={setUseAI}
                        />
                        <Label htmlFor="useAI">{t('include_ai')}</Label>
                      </div>
                      
                      {useAI && (
                        <div className="space-y-2 pl-6 border-l-2 border-werewolf-purple/30">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="aiCount">{t('ai_count')}: {aiCount}</Label>
                          </div>
                          <Slider 
                            id="aiCount"
                            min={1}
                            max={maxPlayers - 1}
                            step={1}
                            value={[aiCount]}
                            onValueChange={(values) => setAiCount(values[0])}
                            className="py-4"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={handleCreateRoom}
                      className="bg-werewolf-purple hover:bg-werewolf-light"
                    >
                      {t('create')}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* AI Settings */}
              <TabsContent value="ai">
                <Card className="bg-werewolf-card border-werewolf-purple/30">
                  <CardHeader>
                    <CardTitle>AI Judge & Player Settings</CardTitle>
                    <CardDescription>
                      Configure the AI behavior for your games
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-werewolf-dark/40 rounded-lg">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-werewolf-purple">AI</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-werewolf-purple">AI Judge</h3>
                            <p className="text-sm mb-4">The AI Judge manages the game, asks questions, and evaluates answers</p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <Switch id="aiJudge" defaultChecked />
                                <Label htmlFor="aiJudge">Enable AI Judge</Label>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="judgePersonality">Judge Personality</Label>
                                <select 
                                  id="judgePersonality"
                                  className="w-full p-2 bg-werewolf-dark rounded border border-werewolf-purple/30"
                                >
                                  <option value="friendly">Friendly & Encouraging</option>
                                  <option value="strict">Strict & Challenging</option>
                                  <option value="funny">Humorous & Playful</option>
                                  <option value="mysterious">Mysterious & Cryptic</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-werewolf-dark/40 rounded-lg">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-blue-700">AI</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-werewolf-purple">AI Players</h3>
                            <p className="text-sm mb-4">AI Players can fill in when you don't have enough human participants</p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <Switch id="aiPlayers" defaultChecked />
                                <Label htmlFor="aiPlayers">Enable AI Players</Label>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="aiDifficulty">AI Intelligence Level</Label>
                                <select 
                                  id="aiDifficulty"
                                  className="w-full p-2 bg-werewolf-dark rounded border border-werewolf-purple/30"
                                >
                                  <option value="beginner">Beginner - Predictable</option>
                                  <option value="intermediate">Intermediate - Adaptable</option>
                                  <option value="advanced">Advanced - Strategic</option>
                                  <option value="expert">Expert - Human-like</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameLobby;
