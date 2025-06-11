
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GamepadIcon } from 'lucide-react';
import PlayerStatusDisplay from './PlayerStatusDisplay';

interface EnhancedGameStateDisplayProps {
  roomId: string;
}

const EnhancedGameStateDisplay: React.FC<EnhancedGameStateDisplayProps> = ({ roomId }) => {
  // Mock data for demonstration
  const currentRound = 2;
  const currentPhase = '白天';
  
  const players = [
    { id: 'player1', name: '玩家1', role: '预言家', status: 'normal' as const },
    { id: 'player2', name: '玩家2', role: '狼人', status: 'weak' as const },
    { id: 'player3', name: '玩家3', role: '村民', status: 'dying' as const },
    { id: 'player4', name: '玩家4', role: '女巫', status: 'normal' as const },
    { id: 'player5', name: '玩家5', role: '猎人', status: 'eliminated' as const },
    { id: 'player6', name: '玩家6', role: '狼人', status: 'normal' as const },
  ];

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GamepadIcon className="mr-2 h-5 w-5" />
          游戏信息
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 当前游戏轮次和阶段 */}
        <div className="text-center p-4 bg-werewolf-dark/40 rounded-md">
          <h2 className="text-xl font-bold text-werewolf-purple">
            第{currentRound}轮 - {currentPhase}阶段
          </h2>
        </div>

        {/* 玩家角色和状态 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-werewolf-purple">玩家状态</h3>
          <PlayerStatusDisplay players={players} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedGameStateDisplay;
