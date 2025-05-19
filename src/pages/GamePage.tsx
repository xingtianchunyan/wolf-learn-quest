import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquareText, Moon, Sun, User } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

// Mock players data
const players = [
  { id: 'player1', name: 'You', avatar: '', role: 'Seer', isAlive: true, isRevealed: false },
  { id: 'player2', name: 'Alice', avatar: '', role: 'unknown', isAlive: true, isRevealed: false },
  { id: 'player3', name: 'Bob', avatar: '', role: 'unknown', isAlive: true, isRevealed: false },
  { id: 'player4', name: 'Charlie', avatar: '', role: 'unknown', isAlive: true, isRevealed: false },
  { id: 'player5', name: 'Diana', avatar: '', role: 'unknown', isAlive: true, isRevealed: false },
  { id: 'player6', name: 'Ethan', avatar: '', role: 'unknown', isAlive: false, isRevealed: true, revealedRole: 'Werewolf' },
];

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: 'Game has started!' },
  { id: 2, sender: 'System', content: 'Night has fallen. Werewolves are choosing their victim...' },
  { id: 3, sender: 'System', content: 'Seer, choose a player to reveal their identity' },
];

// Mock questions
const mockQuestions = [
  {
    id: 'q1',
    question: 'What is the atomic number of Carbon?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '6',
  },
  {
    id: 'q2',
    question: 'Which of the following is a noble gas?',
    options: ['Oxygen', 'Chlorine', 'Helium', 'Sodium'],
    correctAnswer: 'Helium',
  },
];

// Mock answer history
const mockAnswerHistory = [
  { id: 'a1', question: 'What is the chemical symbol for Gold?', yourAnswer: 'Au', correctAnswer: 'Au', isCorrect: true },
  { id: 'a2', question: 'What is the most abundant gas in Earth\'s atmosphere?', yourAnswer: 'Oxygen', correctAnswer: 'Nitrogen', isCorrect: false },
];

const GamePage = () => {
  const { toast } = useToast();
  const [gamePhase, setGamePhase] = useState<'day' | 'night'>('night');
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(mockQuestions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  
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
  
  const handleVote = () => {
    if (!selectedPlayer) {
      toast({
        title: "Select a player",
        description: "Please select a player to vote",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Vote recorded",
      description: `You voted for ${players.find(p => p.id === selectedPlayer)?.name}`,
    });
    
    // In a real app, send the vote to the server
  };
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before submitting",
        variant: "destructive",
      });
      return;
    }
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    toast({
      title: isCorrect ? "Correct answer!" : "Incorrect answer",
      description: isCorrect 
        ? "You've earned a special ability for this round!" 
        : `The correct answer was: ${currentQuestion.correctAnswer}`,
      variant: isCorrect ? "default" : "destructive",
    });
    
    // In a real app, send the answer to the server and get the next question
    setCurrentQuestion(mockQuestions[1]);
    setSelectedAnswer('');
  };
  
  const togglePhase = () => {
    setGamePhase(gamePhase === 'day' ? 'night' : 'day');
    
    toast({
      title: gamePhase === 'day' ? "Night has fallen" : "A new day begins",
      description: gamePhase === 'day' 
        ? "Werewolves are on the hunt. Special roles can use their abilities." 
        : "Discuss who might be the werewolves and vote to eliminate a suspect.",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Quiz System */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Quiz Card */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">Quiz Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Question:</p>
                      <p className="font-medium">{currentQuestion.question}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem 
                              id={`option-${index}`} 
                              value={option} 
                              className="border-werewolf-purple text-werewolf-purple"
                            />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Time Remaining</span>
                        <span>{timeRemaining}s</span>
                      </div>
                      <Progress value={(timeRemaining / 30) * 100} className="h-2" />
                    </div>
                    
                    <Button 
                      className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Answer History */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">Answer History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48 pr-4">
                    <div className="space-y-4">
                      {mockAnswerHistory.map((answer) => (
                        <div 
                          key={answer.id}
                          className={`p-3 rounded-md ${
                            answer.isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{answer.question}</p>
                          <div className="flex justify-between text-xs">
                            <span>Your answer: <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>{answer.yourAnswer}</span></span>
                            {!answer.isCorrect && (
                              <span>Correct: <span className="text-green-400">{answer.correctAnswer}</span></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Middle Column - Game Info & Actions */}
          <div className="lg:col-span-5">
            <div className="space-y-6 h-full">
              {/* Game Status Card */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-werewolf-purple flex items-center gap-2">
                      {gamePhase === 'day' ? (
                        <>
                          <Sun className="h-5 w-5 text-yellow-500" />
                          Day Phase
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 text-blue-400" />
                          Night Phase
                        </>
                      )}
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={togglePhase}
                      className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                    >
                      Toggle Phase
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-werewolf-dark/40 p-4 rounded-md mb-4">
                    <p className="text-center font-medium mb-2">Round 2</p>
                    <p className="text-sm text-center text-gray-400">
                      {gamePhase === 'day' 
                        ? "Discuss who might be the werewolves and vote to eliminate a suspect."
                        : "Werewolves are on the hunt. Special roles can use their abilities."}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className={`p-2 rounded-md cursor-pointer ${
                          player.isAlive 
                            ? selectedPlayer === player.id 
                              ? 'bg-werewolf-purple/30 border border-werewolf-purple' 
                              : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                            : 'bg-red-900/20 opacity-60'
                        }`}
                        onClick={() => player.isAlive && setSelectedPlayer(player.id)}
                      >
                        <div className="flex flex-col items-center text-center">
                          <Avatar>
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback className="bg-werewolf-purple/70">
                              {player.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="mt-1 text-sm font-medium">{player.name}</p>
                          {!player.isAlive && (
                            <Badge variant={player.revealedRole === 'Werewolf' ? 'destructive' : 'outline'} className="mt-1 text-xs">
                              {player.revealedRole}
                            </Badge>
                          )}
                          {player.id === 'player1' && (
                            <Badge className="bg-werewolf-purple mt-1 text-xs">
                              {player.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Card */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">
                    {gamePhase === 'day' ? 'Vote to Eliminate' : 'Use Your Ability'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-werewolf-dark/40 p-4 rounded-md">
                      <p className="font-medium mb-2">
                        {gamePhase === 'day'
                          ? "Cast your vote to eliminate a suspected werewolf"
                          : "As the Seer, you can check one player's identity"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {gamePhase === 'day'
                          ? "The player with the most votes will be eliminated"
                          : "Select a player above to reveal their true identity"}
                      </p>
                    </div>
                    
                    {selectedPlayer && (
                      <p className="text-center">
                        Selected: <span className="font-bold">{players.find(p => p.id === selectedPlayer)?.name}</span>
                      </p>
                    )}
                    
                    <Button 
                      className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                      onClick={handleVote}
                      disabled={!selectedPlayer}
                    >
                      {gamePhase === 'day' ? 'Submit Vote' : 'Use Ability'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
              <CardHeader>
                <CardTitle className="text-werewolf-purple flex items-center">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  Game Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 h-[500px] pr-4">
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

export default GamePage;
