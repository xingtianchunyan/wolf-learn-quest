import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain, MessageSquareText, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Mock room data
const roomData = {
  id: 'room1',
  name: 'Learning Chemistry',
  host: 'Teacher1',
  topic: 'Periodic Table Elements',
  maxPlayers: 10,
};

// Mock players data
const players = [
  { id: 'player1', name: 'You', avatar: '', isReady: true, isHost: true, isAI: false },
  { id: 'player2', name: 'Alice', avatar: '', isReady: false, isHost: false, isAI: false },
  { id: 'player3', name: 'Bob', avatar: '', isReady: true, isHost: false, isAI: false },
  { id: 'player4', name: 'AI-Charlie', avatar: '', isReady: true, isHost: false, isAI: true },
  { id: 'player5', name: 'AI-Diana', avatar: '', isReady: true, isHost: false, isAI: true },
];

// Mock character cards
const characterCards = [
  { id: 'villager', name: 'Villager', description: 'A regular villager trying to identify the werewolves', image: '/placeholder.svg', team: 'Village' },
  { id: 'werewolf', name: 'Werewolf', description: 'Hunt down villagers without being caught', image: '/placeholder.svg', team: 'Werewolves' },
  { id: 'seer', name: 'Seer', description: 'Check one player\'s identity each night', image: '/placeholder.svg', team: 'Village' },
  { id: 'doctor', name: 'Doctor', description: 'Protect one player from elimination each night', image: '/placeholder.svg', team: 'Village' },
];

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: 'Welcome to the game room!' },
  { id: 2, sender: 'System', content: 'Waiting for all players to get ready...' },
  { id: 3, sender: 'Alice', content: 'Hi everyone, excited to play!' },
  { id: 4, sender: 'You', content: 'Let me know when you\'re all ready' },
];

const GameRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReady, setIsReady] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  
  const allReady = players.every(player => player.isReady);
  
  const handleAddAIPlayer = () => {
    toast({
      title: "AI Player Added",
      description: "An AI player has joined the game room",
    });
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
        title: "Cannot start game",
        description: "Not all players are ready yet",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedCharacter) {
      toast({
        title: "Select a character",
        description: "Please select a character card before starting",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/game');
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Room Info & Players */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Room Info Card */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">Room Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Room Name</p>
                      <p className="font-bold">{roomData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Host</p>
                      <p>{roomData.host}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Learning Topic</p>
                      <p>{roomData.topic}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Players</span>
                      <span>{players.length}/{roomData.maxPlayers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Players List */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-werewolf-purple">
                    <Users className="inline mr-2 h-5 w-5" />
                    Players
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleAddAIPlayer}
                    className="h-8 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                  >
                    <Brain className="h-4 w-4 mr-1" />
                    Add AI
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60 pr-4">
                    <div className="space-y-3">
                      {players.map((player) => (
                        <div 
                          key={player.id} 
                          className={`flex items-center justify-between p-2 rounded-md ${player.isReady ? 'bg-green-900/20' : 'bg-werewolf-dark/40'}`}
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
                                  <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-xs">Host</Badge>
                                )}
                                {player.isAI && (
                                  <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">AI</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            {player.isReady ? (
                              <Badge className="bg-green-700 text-xs">Ready</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">Not Ready</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline"
                      className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                      onClick={() => navigate('/lobby')}
                    >
                      Leave Room
                    </Button>
                    <Button 
                      className={isReady ? 'bg-green-700 hover:bg-green-600' : 'bg-werewolf-purple hover:bg-werewolf-light'}
                      onClick={() => setIsReady(!isReady)}
                    >
                      {isReady ? 'Ready' : 'Not Ready'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Middle Column - Character Selection */}
          <div className="lg:col-span-5">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
              <CardHeader>
                <CardTitle className="text-werewolf-purple">Choose Your Character</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {characterCards.map((card) => (
                    <div 
                      key={card.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedCharacter === card.id 
                          ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                          : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                      }`}
                      onClick={() => setSelectedCharacter(card.id)}
                    >
                      <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                        <img 
                          src={card.image} 
                          alt={card.name} 
                          className="max-h-full max-w-full p-2"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-1">
                        {card.name}
                        <span 
                          className={`ml-2 text-xs px-2 py-0.5 rounded ${
                            card.team === 'Village' ? 'bg-green-900/60 text-green-200' : 
                            card.team === 'Werewolves' ? 'bg-red-900/60 text-red-200' :
                            'bg-blue-900/60 text-blue-200'
                          }`}
                        >
                          {card.team}
                        </span>
                      </h3>
                      <p className="text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button
                    className="bg-werewolf-purple hover:bg-werewolf-light px-8"
                    onClick={handleStartGame}
                    disabled={!isReady || !allReady}
                  >
                    Start Game
                  </Button>
                  <p className="text-sm mt-2 text-gray-400">
                    {!allReady ? 'Waiting for all players to be ready...' : 'All players are ready!'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
              <CardHeader>
                <CardTitle className="text-werewolf-purple flex items-center">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  Room Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 h-[400px] pr-4">
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
                  
                  <form onSubmit={handleSendMessage} className="mt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="bg-werewolf-dark/40 border-werewolf-purple/30"
                      />
                      <Button type="submit" className="bg-werewolf-purple hover:bg-werewolf-light">
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoom;
