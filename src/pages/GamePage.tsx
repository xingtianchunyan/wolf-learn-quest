
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameState } from '@/hooks/useGameState';
import GamePhaseIndicator from '@/components/game/GamePhaseIndicator';
import NightPhaseInterface from '@/components/game/NightPhaseInterface';

// 模拟玩家数据 - 在实际应用中应该从数据库获取
const mockPlayers = [
  { id: 'player1', name: 'Alice', role: 'Seer', isAlive: true },
  { id: 'player2', name: 'Bob', role: 'Werewolf', isAlive: true },
  { id: 'player3', name: 'Charlie', role: 'Villager', isAlive: true },
  { id: 'player4', name: 'Diana', role: 'Hunter', isAlive: false },
  { id: 'player5', name: 'Ethan', role: 'Werewolf', isAlive: true },
];

const GamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { gameState, loading } = useGameState(roomId || '');
  
  // 模拟当前玩家ID - 在实际应用中应该从认证系统获取
  const currentPlayerId = 'player1';

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple"></div>
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
              <p className="text-gray-400">游戏尚未开始</p>
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
            {gameState.current_phase === 'night' ? (
              <NightPhaseInterface
                gameStateId={gameState.id}
                playerId={currentPlayerId}
                currentRound={gameState.current_round}
                players={mockPlayers}
              />
            ) : (
              <Card className="bg-werewolf-card border-werewolf-purple/30">
                <CardHeader>
                  <CardTitle className="text-werewolf-purple">
                    {gameState.current_phase === 'day' ? '白天讨论' : '阶段过渡'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center py-8">
                    {gameState.current_phase === 'day' 
                      ? '白天阶段：玩家可以讨论和投票'
                      : '等待阶段切换...'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 侧边栏 - 玩家列表和游戏信息 */}
          <div className="space-y-6">
            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle className="text-werewolf-purple">玩家列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPlayers.map((player) => (
                    <div 
                      key={player.id}
                      className={`p-3 rounded-md ${
                        player.isAlive 
                          ? 'bg-werewolf-dark/40' 
                          : 'bg-red-900/20 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{player.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          player.isAlive ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          {player.isAlive ? '存活' : '死亡'}
                        </span>
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
                    <span>{mockPlayers.filter(p => p.isAlive).length} 人</span>
                  </div>
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
