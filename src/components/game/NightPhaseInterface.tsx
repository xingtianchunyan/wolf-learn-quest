
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon } from 'lucide-react';
import SkillInterface from './SkillInterface';
import SkillEffectProcessor from './SkillEffectProcessor';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  isAlive: boolean;
}

interface NightPhaseInterfaceProps {
  gameStateId: string;
  playerId: string;
  currentRound: number;
  players: Player[];
}

const NightPhaseInterface: React.FC<NightPhaseInterfaceProps> = ({
  gameStateId,
  playerId,
  currentRound,
  players
}) => {
  return (
    <div className="space-y-6">
      {/* 阶段提示 */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Moon className="h-5 w-5" />
            夜晚阶段 - 第 {currentRound} 轮
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200">
            夜深了，狼人开始行动。特殊角色可以使用他们的能力。
          </p>
        </CardContent>
      </Card>

      {/* 技能界面 */}
      <SkillInterface
        gameStateId={gameStateId}
        playerId={playerId}
        currentPhase="night"
        currentRound={currentRound}
        players={players}
      />

      {/* 技能效果处理器 */}
      <SkillEffectProcessor gameStateId={gameStateId} />
    </div>
  );
};

export default NightPhaseInterface;
