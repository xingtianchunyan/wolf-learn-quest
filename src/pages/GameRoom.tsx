import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import { useAuth } from '@/providers/AuthProvider';
import RoleSelection from '@/components/room/RoleSelection';
import PlayersList from '@/components/room/PlayersList';

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: '欢迎来到游戏房间！' },
  { id: 2, sender: 'System', content: '等待所有玩家准备...' },
];

const GameRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { leaveCurrentRoom } = usePlayerRoom();
  
  // 使用实时房间数据
  const { roomData, isLoading: realtimeLoading, updatePlayerReady, addAIPlayer } = useRoomRealtime(roomInfo?.id || null);
  
  // 获取当前用户在房间中的状态
  const currentPlayer = roomData.players.find(p => p.user_id === currentUser?.id);
  const currentUserReady = currentPlayer?.is_ready || false;
  
  // Add room cleanup functionality
  useRoomCleanup();

  // Fetch room info
  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (id) {
          console.log('Fetching room data for room ID:', id);
          
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

          if (roomError) {
            console.error('Error fetching room:', roomError);
            toast({
              title: "错误",
              description: "无法加载房间数据",
              variant: "destructive",
            });
            return;
          }

          if (roomData) {
            console.log('Room data found:', roomData);
            setRoomInfo({
              id: roomData.id,
              roomId: roomData.room_id,
              hostPlayerId: roomData.users?.player_name || 'Unknown',
              topic: '元素周期表', 
              maxPlayers: roomData.max_players,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "错误",
          description: "无法加载房间数据",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomInfo();
  }, [toast, id]);

  const handleMaxPlayersChange = async (increment: number) => {
    if (!roomInfo || !currentUser) return;

    const newMaxPlayers = Math.max(6, Math.min(12, roomInfo.maxPlayers + increment));
    
    if (newMaxPlayers === roomInfo.maxPlayers) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .update({ max_players: newMaxPlayers })
        .eq('id', roomInfo.id);

      if (error) {
        console.error('Error updating max players:', error);
        toast({
          title: "错误",
          description: "无法更新最大玩家数",
          variant: "destructive",
        });
        return;
      }

      setRoomInfo({ ...roomInfo, maxPlayers: newMaxPlayers });
      
      toast({
        title: "最大玩家数已更新",
        description: `最大玩家数设置为 ${newMaxPlayers}`,
      });
    } catch (error) {
      console.error('Error updating max players:', error);
    }
  };
  
  const handleAddAIPlayer = async () => {
    const success = await addAIPlayer();
    if (success) {
      toast({
        title: "AI玩家已添加",
        description: "AI玩家已加入游戏房间",
      });
    } else {
      toast({
        title: "错误",
        description: "无法添加AI玩家",
        variant: "destructive",
      });
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: '你',
      content: newMessage,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleStartGame = () => {
    const allReady = roomData.players.every(player => player.is_ready);
    
    if (roomData.playerCount < 6) {
      toast({
        title: "无法开始游戏",
        description: "至少需要6名玩家才能开始游戏",
        variant: "destructive",
      });
      return;
    }
    
    if (!allReady) {
      toast({
        title: "无法开始游戏",
        description: "还有玩家未准备完毕",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedRole) {
      toast({
        title: "请选择角色",
        description: "开始游戏前请先选择一个角色",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/game');
  };

  const handleToggleReady = async () => {
    const success = await updatePlayerReady(!currentUserReady);
    if (!success) {
      toast({
        title: "错误",
        description: "无法更新准备状态",
        variant: "destructive",
      });
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const success = await leaveCurrentRoom();
      
      if (success) {
        toast({
          title: "已离开房间",
          description: "你已离开游戏房间",
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

  if (isLoading || realtimeLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">加载房间数据...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!roomInfo) {
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

  const allReady = roomData.players.every(player => player.is_ready);
  const canStartGame = roomData.playerCount >= 6 && allReady && selectedRole;

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
                  <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">房间ID</p>
                      <p className="font-bold">{roomInfo.roomId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">房主</p>
                      <p>{roomInfo.hostPlayerId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">学习主题</p>
                      <p>{roomInfo.topic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">最大玩家数</p>
                      <div className="flex items-center justify-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMaxPlayersChange(-1)}
                          disabled={roomData.maxPlayers <= 6}
                          className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg min-w-[2rem] text-center">
                          {roomData.maxPlayers}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMaxPlayersChange(1)}
                          disabled={roomData.maxPlayers >= 12}
                          className="h-8 w-8 p-0 border-werewolf-purple/30 hover:bg-werewolf-purple/20"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
                      <p className="text-xs text-gray-400 text-center">
                        ⚠️ 房间在没有真人玩家时3分钟后自动关闭
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Players List */}
              <PlayersList
                players={roomData.players}
                currentUserId={currentUser?.id || ''}
                maxPlayers={roomData.maxPlayers}
                onAddAI={handleAddAIPlayer}
                onToggleReady={handleToggleReady}
                onLeaveRoom={handleLeaveRoom}
                currentUserReady={currentUserReady}
              />
            </div>
          </div>
          
          {/* Middle Column - Role Selection */}
          <div className="lg:col-span-5">
            <RoleSelection
              playerCount={roomData.playerCount}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
            
            <div className="mt-6 text-center">
              <Button
                className="bg-werewolf-purple hover:bg-werewolf-light px-8"
                onClick={handleStartGame}
                disabled={!canStartGame}
              >
                开始游戏
              </Button>
              <p className="text-sm mt-2 text-gray-400">
                {roomData.playerCount < 6 ? `需要至少6名玩家 (当前${roomData.playerCount}人)` :
                 !allReady ? '等待所有玩家准备...' : 
                 !selectedRole ? '请选择角色' : '所有玩家已准备完毕！'}
              </p>
            </div>
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-4">
            <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
              <CardHeader>
                <CardTitle className="text-werewolf-purple flex items-center">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  房间聊天
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
                              message.sender === '你' ? 'text-werewolf-purple' :
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
    </PageLayout>
  );
};

export default GameRoom;
