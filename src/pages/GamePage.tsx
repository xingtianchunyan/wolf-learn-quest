
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameState } from '@/hooks/useGameState';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import GamePhaseIndicator from '@/components/game/GamePhaseIndicator';
import NightPhaseInterface from '@/components/game/NightPhaseInterface';
import SkillInterface from '@/components/game/SkillInterface';
import SkillEffectProcessor from '@/components/game/SkillEffectProcessor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  isAlive: boolean;
  user_id?: string;
}

const GamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 从URL参数或当前用户获取房间ID
  const [actualRoomId, setActualRoomId] = useState<string | null>(null);

  const { gameState, loading: gameStateLoading } = useGameState(actualRoomId || '');

  // 获取当前用户和房间信息
  useEffect(() => {
    const fetchUserAndRoom = async () => {
      try {
        // 获取当前用户
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          
          // 获取用户资料
          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (userData) {
            setCurrentUser({ ...session.user, player_name: userData.player_name });
          }

          let targetRoomId = roomId;

          // 如果URL中没有房间ID，获取用户最近的房间
          if (!targetRoomId) {
            const { data: roomPlayerData } = await supabase
              .from('room_players')
              .select(`
                room_id,
                rooms!inner(id, room_id)
              `)
              .eq('user_id', session.user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (roomPlayerData?.rooms) {
              targetRoomId = roomPlayerData.rooms.id;
            }
          }

          if (targetRoomId) {
            setActualRoomId(targetRoomId);
            
            // 获取当前玩家ID
            const { data: currentPlayerData } = await supabase
              .from('room_players')
              .select('id')
              .eq('room_id', targetRoomId)
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (currentPlayerData) {
              setCurrentPlayerId(currentPlayerData.id);
            }
          }
        } else {
          // 未登录，重定向到首页
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user and room:', error);
        toast({
          title: '错误',
          description: '获取用户信息失败',
          variant: 'destructive'
        });
      }
    };

    fetchUserAndRoom();
  }, [roomId, navigate, toast]);

  // 获取玩家列表
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!actualRoomId) return;

      try {
        const { data: roomPlayers, error } = await supabase
          .from('room_players')
          .select(`
            id,
            user_id,
            role,
            status,
            is_ai,
            users(player_name)
          `)
          .eq('room_id', actualRoomId);

        if (error) throw error;

        const playersData: Player[] = roomPlayers?.map((player: any) => ({
          id: player.id,
          name: player.is_ai ? `AI玩家${player.id.slice(-4)}` : (player.users?.player_name || '未知玩家'),
          role: player.role,
          isAlive: player.status === 'alive',
          user_id: player.user_id
        })) || [];

        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
        toast({
          title: '错误',
          description: '获取玩家列表失败',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    if (actualRoomId) {
      fetchPlayers();

      // 实时订阅玩家变化
      const channel = supabase
        .channel(`room_players_${actualRoomId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'room_players',
            filter: `room_id=eq.${actualRoomId}`
          },
          () => {
            fetchPlayers();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [actualRoomId, toast]);

  const handleBackToRoom = () => {
    if (actualRoomId) {
      navigate(`/room/${actualRoomId}`);
    } else {
      navigate('/lobby');
    }
  };

  if (loading || gameStateLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
              <p className="text-gray-400">加载游戏中...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!gameState) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <Card className="bg-werewolf-card border-werewolf-purple/30">
            <CardContent className="text-center py-12">
              <p className="text-gray-400 mb-4">游戏尚未开始</p>
              <Button onClick={handleBackToRoom} className="bg-werewolf-purple hover:bg-werewolf-light">
                返回房间
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        {/* 游戏阶段指示器 */}
        <div className="mb-6">
          <GamePhaseIndicator
            phase={gameState.current_phase}
            round={gameState.current_round}
            className="justify-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要游戏区域 */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* 根据游戏阶段显示不同界面 */}
              {gameState.current_phase === 'night' ? (
                <NightPhaseInterface
                  gameStateId={gameState.id}
                  playerId={currentPlayerId || ''}
                  currentRound={gameState.current_round}
                  players={players}
                />
              ) : (
                <div className="space-y-6">
                  {/* 白天阶段界面 */}
                  <Card className="bg-werewolf-card border-werewolf-purple/30">
                    <CardHeader>
                      <CardTitle className="text-werewolf-purple">
                        {gameState.current_phase === 'day' ? '白天讨论' : 
                         gameState.current_phase === 'evening' ? '傍晚投票' : '黎明时分'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-center py-8">
                        {gameState.current_phase === 'day' 
                          ? '白天阶段：玩家可以讨论和投票'
                          : gameState.current_phase === 'evening'
                          ? '傍晚阶段：进行投票决定淘汰玩家'
                          : '黎明阶段：查看夜晚结果'}
                      </p>
                    </CardContent>
                  </Card>

                  {/* 技能界面 - 在所有阶段都显示 */}
                  {currentPlayerId && (
                    <SkillInterface
                      gameStateId={gameState.id}
                      playerId={currentPlayerId}
                      currentPhase={gameState.current_phase}
                      currentRound={gameState.current_round}
                      players={players}
                    />
                  )}
                </div>
              )}

              {/* 技能效果处理器 */}
              <SkillEffectProcessor gameStateId={gameState.id} />
            </div>
          </div>

          {/* 侧边栏 - 玩家列表和游戏信息 */}
          <div className="space-y-6">
            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle className="text-werewolf-purple">玩家列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.map((player) => (
                    <div 
                      key={player.id}
                      className={`p-3 rounded-md ${
                        player.isAlive 
                          ? 'bg-werewolf-dark/40' 
                          : 'bg-red-900/20 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className="bg-werewolf-purple/70 text-xs">
                            {player.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{player.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              player.isAlive ? 'bg-green-600' : 'bg-red-600'
                            }`}>
                              {player.isAlive ? '存活' : '死亡'}
                            </span>
                          </div>
                          {player.role && (
                            <p className="text-xs text-gray-400 mt-1">
                              角色：{player.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle className="text-werewolf-purple">游戏状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">当前轮次:</span>
                    <span>第 {gameState.current_round} 轮</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">游戏状态:</span>
                    <span className="capitalize">{gameState.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">存活玩家:</span>
                    <span>{players.filter(p => p.isAlive).length} 人</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={handleBackToRoom}
                    variant="outline"
                    className="w-full"
                  >
                    返回房间
                  </Button>
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
