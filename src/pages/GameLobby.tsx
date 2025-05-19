
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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

// Mock player data
const currentPlayer = {
  id: 'player1',
  name: 'Player One',
  avatar: '',
  level: 5,
  games: 12,
  wins: 7,
};

// Mock room data
const rooms = [
  { id: 'room1', name: 'Learning Chemistry', host: 'Teacher1', players: 4, maxPlayers: 10, hasAI: true, isPrivate: false },
  { id: 'room2', name: 'Math Challenge', host: 'Student42', players: 2, maxPlayers: 8, hasAI: false, isPrivate: false },
  { id: 'room3', name: 'History Review', host: 'ProfHistory', players: 7, maxPlayers: 12, hasAI: true, isPrivate: true },
];

const GameLobby = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [isPrivate, setIsPrivate] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [aiCount, setAiCount] = useState(2);

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please enter a name for your game room",
        variant: "destructive",
      });
      return;
    }

    console.log('Creating room:', { roomName, maxPlayers, isPrivate, useAI, aiCount });
    toast({
      title: "Room created!",
      description: `"${roomName}" has been created successfully`,
    });
    navigate('/room');
  };

  const joinRoom = (roomId: string) => {
    console.log('Joining room:', roomId);
    navigate('/room');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Player Info - Left Side */}
          <div className="w-full lg:w-1/4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
              <CardHeader>
                <CardTitle className="text-werewolf-purple">Player Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={currentPlayer.avatar} alt={currentPlayer.name} />
                  <AvatarFallback className="bg-werewolf-purple/30 text-xl">
                    {currentPlayer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">{currentPlayer.name}</h3>
                <div className="grid grid-cols-3 gap-4 w-full text-center mt-4">
                  <div className="p-2 bg-werewolf-dark/50 rounded-md">
                    <p className="text-sm text-gray-400">Level</p>
                    <p className="font-bold text-werewolf-purple">{currentPlayer.level}</p>
                  </div>
                  <div className="p-2 bg-werewolf-dark/50 rounded-md">
                    <p className="text-sm text-gray-400">Games</p>
                    <p className="font-bold">{currentPlayer.games}</p>
                  </div>
                  <div className="p-2 bg-werewolf-dark/50 rounded-md">
                    <p className="text-sm text-gray-400">Wins</p>
                    <p className="font-bold">{currentPlayer.wins}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Right Side */}
          <div className="w-full lg:w-3/4">
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList className="w-full bg-werewolf-card mb-4">
                <TabsTrigger value="rooms" className="flex-1">
                  <Users className="mr-2 h-4 w-4" />
                  Game Rooms
                </TabsTrigger>
                <TabsTrigger value="create" className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Room
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex-1">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Settings
                </TabsTrigger>
              </TabsList>

              {/* Game Rooms List */}
              <TabsContent value="rooms">
                <Card className="bg-werewolf-card border-werewolf-purple/30">
                  <CardHeader>
                    <CardTitle>Available Game Rooms</CardTitle>
                    <CardDescription>
                      Join an existing room to start playing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {rooms.map((room) => (
                          <div 
                            key={room.id}
                            className="p-4 bg-werewolf-dark/40 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold">{room.name}</h3>
                                {room.isPrivate && (
                                  <span className="text-xs bg-amber-800/60 text-amber-200 px-2 py-0.5 rounded">Private</span>
                                )}
                                {room.hasAI && (
                                  <span className="text-xs bg-blue-800/60 text-blue-200 px-2 py-0.5 rounded">AI</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">Host: {room.host}</p>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <span className="text-sm">
                                <Users className="inline h-4 w-4 mr-1" />
                                {room.players}/{room.maxPlayers}
                              </span>
                              <Button 
                                variant="default" 
                                className="bg-werewolf-purple hover:bg-werewolf-light ml-auto"
                                onClick={() => joinRoom(room.id)}
                              >
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Create Room Form */}
              <TabsContent value="create">
                <Card className="bg-werewolf-card border-werewolf-purple/30">
                  <CardHeader>
                    <CardTitle>Create a New Game Room</CardTitle>
                    <CardDescription>
                      Set up your own game with custom settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="roomName">Room Name</Label>
                        <Input 
                          id="roomName" 
                          placeholder="Enter a name for your game room"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="bg-werewolf-dark/40 border-werewolf-purple/30"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="maxPlayers">Maximum Players: {maxPlayers}</Label>
                        </div>
                        <Slider 
                          id="maxPlayers"
                          min={4}
                          max={16}
                          step={1}
                          value={[maxPlayers]}
                          onValueChange={(values) => setMaxPlayers(values[0])}
                          className="py-4"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="isPrivate" 
                          checked={isPrivate} 
                          onCheckedChange={setIsPrivate}
                        />
                        <Label htmlFor="isPrivate">Private Room (Invitation Only)</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="useAI" 
                          checked={useAI} 
                          onCheckedChange={setUseAI}
                        />
                        <Label htmlFor="useAI">Include AI Players</Label>
                      </div>
                      
                      {useAI && (
                        <div className="space-y-2 pl-6 border-l-2 border-werewolf-purple/30">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="aiCount">Number of AI Players: {aiCount}</Label>
                          </div>
                          <Slider 
                            id="aiCount"
                            min={1}
                            max={8}
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
                      Create Room
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
      <Footer />
    </div>
  );
};

export default GameLobby;
