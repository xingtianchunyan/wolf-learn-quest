
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
import PlayersList from '@/components/room/PlayersList';
import RoleSelection from '@/components/room/RoleSelection';

// Mock players data - this would be fetched from Supabase in a real implementation
const players = [
  { id: 'player1', name: 'You', avatar: '', isReady: true, isHost: true, isAI: false },
  { id: 'player2', name: 'Alice', avatar: '', isReady: false, isHost: false, isAI: false },
  { id: 'player3', name: 'Bob', avatar: '', isReady: true, isHost: false, isAI: false },
  { id: 'player4', name: 'AI-Charlie', avatar: '', isReady: true, isHost: false, isAI: true },
  { id: 'player5', name: 'AI-Diana', avatar: '', isReady: true, isHost: false, isAI: true },
];

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
  const [isReady, setIsReady] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { leaveCurrentRoom } = usePlayerRoom();
  const { roomData: realtimeRoomData, updateMaxPlayers } = useRoomRealtime(roomData?.id);
  
  const allReady = players.every(player => player.isReady);

  // Add room cleanup functionality
  useRoomCleanup();

  // Get current max players from realtime data or fallback to local state
  const currentMaxPlayers = realtimeRoomData?.maxPlayers || roomData?.maxPlayers || 6;

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
              title: "错误",
              description: "加载房间数据失败",
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
              topic: '元素周期表', // This would come from room data in real implementation
              maxPlayers: roomData.max_players,
            });
          } else {
            console.log('No room found with ID:', id);
          }
        } else if (session?.user) {
          // Fallback: fetch user's most recent room
          console.log('No room ID in URL, fetching user\'s most recent room');
          
          const { data: roomPlayerData } = await supabase
            .from('room_players')
            .select(`
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
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "错误",
          description: "加载房间数据失败",
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
          title: "错误",
          description: "更新最大玩家数失败",
          variant: "destructive",
        });
        return;
      }

      // Update local state for immediate feedback
      setRoomData({ ...roomData, maxPlayers: newMaxPlayers });
      
      toast({
        title: "最大玩家数已更新",
        description: `最大玩家数设置为 ${newMaxPlayers}`,
      });
    } catch (error) {
      console.error('Error updating max players:', error);
      toast({
        title: "错误",
        description: "更新最大玩家数失败",
        variant: "destructive",
      });
    }
  };
  
  const handleAddAIPlayer = () => {
    toast({
      title: "AI玩家已添加",
      description: "一个AI玩家已加入游戏房间",
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
        title: "无法开始游戏",
        description: "还有玩家未准备",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedCharacter) {
      toast({
        title: "请选择角色",
        description: "开始游戏前请先选择角色卡片",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/game');
  };

  const handleLeaveRoom = async () => {
    try {
      const success = await leaveCurrentRoom();
      
      if (success) {
        toast({
          title: "已离开房间",
          description: "您已离开游戏房间",
        });
        navigate('/lobby');
      } else {
        toast({
          title: "错误",
          description: "离开房间失败",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      toast({
        title: "错误",
        description: "离开房间失败",
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
              <p className="text-gray-400">加载房间数据中...</p>
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
              <p className="text-gray-400 mb-4">未找到房间数据</p>
              <p className="text-sm text-gray-500 mb-4">
                房间ID: {id || '未指定'}
              </p>
              <Button onClick={() => navigate('/lobby')}>
                返回大厅
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Column - Room Info & Players */}
          <div className="lg:col-span-3">
            <div className="space-y-6 h-full">
              {/* Room Info Card */}
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">房间ID</p>
                      <p className="font-bold">{roomData.roomId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">房主玩家ID</p>
                      <p>{roomData.hostPlayerId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">学习主题</p>
                      <p>{roomData.topic}</p>
                    </div>
                    <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
                      <p className="text-xs text-gray-400 text-center">
                        ⚠️ 无人类玩家3分钟后房间自动关闭
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Players List */}
              <div className="flex-1">
                <PlayersList
                  players={players}
                  maxPlayers={currentMaxPlayers}
                  isReady={isReady}
                  allReady={allReady}
                  selectedCharacter={selectedCharacter}
                  onReadyToggle={() => setIsReady(!isReady)}
                  onLeaveRoom={handleLeaveRoom}
                  onStartGame={handleStartGame}
                  onAddAIPlayer={handleAddAIPlayer}
                  onMaxPlayersChange={handleMaxPlayersChange}
                />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Character Selection */}
          <div className="lg:col-span-5">
            <RoleSelection
              maxPlayers={currentMaxPlayers}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
            />
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-werewolf-purple flex items-center">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  房间聊天
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
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
                
                <form onSubmit={handleSendMessage} className="flex-shrink-0">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoom;
