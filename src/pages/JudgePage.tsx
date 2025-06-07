import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquareText, Plus, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import GamePhaseIndicator from '@/components/game/GamePhaseIndicator';
import JudgeControls from '@/components/game/JudgeControls';
import { useGameState } from '@/hooks/useGameState';

// Mock players data
const players = [
  { id: 'player1', name: 'Alice', avatar: '', role: 'Seer', isAlive: true },
  { id: 'player2', name: 'Bob', avatar: '', role: 'Werewolf', isAlive: true },
  { id: 'player3', name: 'Charlie', avatar: '', role: 'Villager', isAlive: true },
  { id: 'player4', name: 'Diana', avatar: '', role: 'Hunter', isAlive: false },
  { id: 'player5', name: 'Ethan', avatar: '', role: 'Werewolf', isAlive: true },
];

// Mock question bank
const questionBank = [
  { 
    id: 'q1', 
    question: 'What is the atomic number of Carbon?', 
    options: ['4', '6', '8', '12'], 
    correctAnswer: '6',
    topic: 'Chemistry'
  },
  { 
    id: 'q2', 
    question: 'Which of the following is a noble gas?', 
    options: ['Oxygen', 'Chlorine', 'Helium', 'Sodium'], 
    correctAnswer: 'Helium',
    topic: 'Chemistry'
  },
  { 
    id: 'q3', 
    question: 'What is the formula for water?', 
    options: ['H2O', 'CO2', 'NaCl', 'O2'], 
    correctAnswer: 'H2O',
    topic: 'Chemistry'
  },
];

// Mock student responses
const studentResponses = [
  { 
    id: 'r1', 
    player: 'Alice', 
    question: 'What is the atomic number of Carbon?', 
    answer: '6', 
    isCorrect: true,
    timestamp: '2 min ago'
  },
  { 
    id: 'r2', 
    player: 'Bob', 
    question: 'Which of the following is a noble gas?', 
    answer: 'Oxygen', 
    isCorrect: false,
    timestamp: '3 min ago'
  },
  { 
    id: 'r3', 
    player: 'Charlie', 
    question: 'What is the formula for water?', 
    answer: 'H2O', 
    isCorrect: true,
    timestamp: '5 min ago'
  },
];

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: 'Game has started with you as the Judge!' },
  { id: 2, sender: 'System', content: 'Night phase has begun. Werewolves are choosing their victim...' },
  { id: 3, sender: 'Judge', content: 'Remember to answer questions to unlock special abilities!' },
];

const JudgePage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    topic: ''
  });
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  
  // 模拟房间ID - 在实际应用中这应该从路由参数获取
  const roomId = 'demo-room-id';
  const { gameState } = useGameState(roomId);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: 'Judge',
      content: newMessage,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.topic || !newQuestion.options[newQuestion.correctAnswer]) {
      toast({
        title: "Incomplete question",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Question added",
      description: "New question has been added to the question bank",
    });
    
    // Reset the form
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      topic: ''
    });
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };
  
  const handleJudgeAction = () => {
    if (!selectedPlayer) {
      toast({
        title: "Select a player",
        description: "Please select a player first",
        variant: "destructive",
      });
      return;
    }
    
    const player = players.find(p => p.id === selectedPlayer);
    
    toast({
      title: `Player ${player?.name} action completed`,
      description: `Action performed on ${player?.name}`,
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        {/* 游戏状态指示器 - 显示在顶部 */}
        {gameState && (
          <div className="mb-4">
            <GamePhaseIndicator
              phase={gameState.current_phase}
              round={gameState.current_round}
              timeRemaining={undefined}
              className="justify-center"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Game State & Judge Controls */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* 游戏状态显示 */}
              <GameStateDisplay roomId={roomId} />
              
              {/* 法官控制台 */}
              <JudgeControls roomId={roomId} />
            </div>
          </div>
          
          {/* Middle Column - Question Management */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">Question Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="bank">
                    <TabsList className="bg-werewolf-dark/60 w-full mb-4">
                      <TabsTrigger value="bank" className="flex-1">Question Bank</TabsTrigger>
                      <TabsTrigger value="add" className="flex-1">Add Question</TabsTrigger>
                      <TabsTrigger value="responses" className="flex-1">Responses</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="bank">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {questionBank.map((q) => (
                            <div key={q.id} className="bg-werewolf-dark/40 p-3 rounded-md">
                              <div className="flex justify-between mb-2">
                                <Badge className="bg-blue-700">{q.topic}</Badge>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Eye className="h-4 w-4 text-blue-400" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Trash2 className="h-4 w-4 text-red-400" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm font-medium mb-2">{q.question}</p>
                              <div className="text-xs text-gray-400">
                                <p>Correct: {q.correctAnswer}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="add">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="question">Question</Label>
                          <Textarea 
                            id="question"
                            placeholder="Enter your question here"
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                            className="bg-werewolf-dark/40 border-werewolf-purple/30"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {newQuestion.options.map((option, index) => (
                            <div key={index} className="flex gap-2 items-center mb-2">
                              <input 
                                type="radio" 
                                id={`correct-${index}`} 
                                name="correct-answer"
                                checked={newQuestion.correctAnswer === index}
                                onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                                className="text-werewolf-purple"
                              />
                              <Input 
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="bg-werewolf-dark/40 border-werewolf-purple/30"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic</Label>
                          <Input 
                            id="topic"
                            placeholder="e.g., Chemistry, Math, History"
                            value={newQuestion.topic}
                            onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}
                            className="bg-werewolf-dark/40 border-werewolf-purple/30"
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                          onClick={handleAddQuestion}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="responses">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {studentResponses.map((response) => (
                            <div 
                              key={response.id} 
                              className={`p-3 rounded-md ${
                                response.isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-sm">{response.player}</p>
                                  <p className="text-xs text-gray-400">{response.timestamp}</p>
                                </div>
                                {response.isCorrect ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-400">Question:</p>
                                <p className="text-sm">{response.question}</p>
                              </div>
                              <div className="mt-1">
                                <p className="text-xs text-gray-400">Answer:</p>
                                <p className="text-sm">{response.answer}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right Column - Player Management & Chat */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Player Management */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">玩家管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-werewolf-dark/40 p-4 rounded-md">
                      <p className="font-medium mb-2">选择玩家进行操作</p>
                      <p className="text-sm text-gray-400">
                        选择下方玩家进行特殊操作
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
                            <Badge 
                              className={`mt-1 text-xs ${
                                player.role === 'Werewolf' ? 'bg-red-700' : 'bg-green-700'
                              }`}
                            >
                              {player.role}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedPlayer && (
                      <p className="text-center">
                        已选择: <span className="font-bold">{players.find(p => p.id === selectedPlayer)?.name}</span>
                      </p>
                    )}
                    
                    <Button 
                      className="w-full bg-werewolf-purple hover:bg-werewolf-light"
                      onClick={handleJudgeAction}
                      disabled={!selectedPlayer}
                    >
                      执行操作
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Chat */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple flex items-center">
                    <MessageSquareText className="mr-2 h-5 w-5" />
                    法官聊天
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col h-full">
                    <ScrollArea className="flex-1 h-[300px] pr-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="chat-message">
                            <p className="text-sm">
                              <span className={`font-bold ${
                                message.sender === 'System' ? 'text-yellow-400' :
                                message.sender === 'Judge' ? 'text-werewolf-purple' :
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
                          placeholder="输入消息..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="bg-werewolf-dark/40 border-werewolf-purple/30"
                        />
                        <Button type="submit" className="bg-werewolf-purple hover:bg-werewolf-light">
                          发送
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JudgePage;
