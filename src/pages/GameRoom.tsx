
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import RoleSelection from '@/components/room/RoleSelection';
import PlayersList from '@/components/room/PlayersList';
import { MessageSquareText } from 'lucide-react';

// Mock chat messages
const initialMessages = [
  { id: 1, sender: 'System', content: '欢迎进入游戏房间！' },
  { id: 2, sender: 'System', content: '等待所有玩家准备完毕...' },
];

const GameRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const { leaveCurrentRoom } = usePlayerRoom();
  
  // 使用实时房间数据钩子
  const { roomData, isLoading, updateMaxPlayers, updatePlayerReady } = useRoomRealtime(id || null);
  
  // Add room cleanup functionality
  useRoomCleanup();

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          setCurrentUser({
            ...session.user,
            player_name: userData?.player_name || '玩家',
          });
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleMaxPlayersChange = async (increment: number) => {
    if (!roomData) return;

    const newMaxPlayers = Math.max(6, Math.min(12, roomData.max_players + increment));
    
    if (newMaxPlayers === roomData.max_players) return;

    const success = await updateMaxPlayers(newMaxPlayers);
    if (success) {
      toast({
        title: "最大玩家数已更新",
        description: `最大玩家数设置为 ${newMaxPlayers}`,
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
      sender: currentUser?.player_name || '你',
      content: newMessage,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleToggleReady = async () => {
    if (!currentUser || !roomData) return;

    const currentPlayer = roomData.room_players.find(p => p.user_id === currentUser.id);
    if (!currentPlayer) return;

    const newReadyStatus = !currentPlayer.is_ready;
    const success = await updatePlayerReady(currentUser.id, newReadyStatus);
    
    if (success) {
      toast({
        title: newReadyStatus ? "已准备" : "取消准备",
        description: newReadyStatus ? "你已准备就绪" : "你取消了准备状态",
      });
    }
  };

  const handleStartGame = () => {
    if (!roomData) return;

    const allReady = roomData.room_players.every(player => player.is_ready);
    
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
        description: "请先选择一个角色再开始游戏",
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

  const isHost = currentUser && roomData.host_id === currentUser.id;
  const currentPlayer = roomData.room_players.find(p => p.user_id === currentUser?.id);
  const isUserReady = currentPlayer?.is_ready || false;
  const allReady = roomData.room_players.every(player => player.is_ready);

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        {/* 房间信息栏 */}
        <div className="mb-6">
          <Card className="bg-werewolf-card border-werewolf-purple/30">
            <CardHeader>
              <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">房间ID</p>
                  <p className="font-bold">{roomData.room_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">学习主题</p>
                  <p>元素周期表</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">玩家数量</p>
                  <p>{roomData.room_players.length}/{roomData.max_players}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">房间状态</p>
                  <p className={allReady && roomData.room_players.length >= 6 ? "text-green-400" : "text-yellow-400"}>
                    {allReady && roomData.room_players.length >= 6 ? "可以开始" : "等待中"}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
                <p className="text-xs text-gray-400 text-center">
                  ⚠️ 房间在无真人玩家3分钟后自动关闭
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左列 - 玩家列表 */}
          <div className="lg:col-span-3">
            <PlayersList
              players={roomData.room_players}
              maxPlayers={roomData.max_players}
              currentUserId={currentUser?.id || null}
              hostId={roomData.host_id}
              isHost={isHost || false}
              onMaxPlayersChange={handleMaxPlayersChange}
              onAddAIPlayer={handleAddAIPlayer}
              onLeaveRoom={handleLeaveRoom}
              onToggleReady={handleToggleReady}
              isUserReady={isUserReady}
            />
          </div>
          
          {/* 中列 - 角色选择 */}
          <div className="lg:col-span-5">
            <RoleSelection
              maxPlayers={roomData.max_players}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
            
            {/* 开始游戏按钮 */}
            <div className="mt-6 text-center">
              <Button
                className="bg-werewolf-purple hover:bg-werewolf-light px-8"
                onClick={handleStartGame}
                disabled={!isUserReady || !allReady || roomData.room_players.length < 6}
              >
                开始游戏
              </Button>
              <p className="text-sm mt-2 text-gray-400">
                {!allReady ? '等待所有玩家准备完毕...' : 
                 roomData.room_players.length < 6 ? '至少需要6名玩家才能开始游戏' :
                 '所有玩家已准备完毕！'}
              </p>
            </div>
          </div>
          
          {/* 右列 - 聊天 */}
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
                              message.sender === currentUser?.player_name ? 'text-werewolf-purple' :
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
