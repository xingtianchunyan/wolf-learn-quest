
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Zap, 
  Target, 
  Shield, 
  Skull, 
  Eye,
  Heart,
  Sword
} from 'lucide-react';
import { useSkillSystem, SkillDefinition } from '@/hooks/useSkillSystem';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  isAlive: boolean;
}

interface SkillInterfaceProps {
  gameStateId: string;
  playerId: string;
  currentPhase: string;
  currentRound: number;
  players: Player[];
}

const skillIcons: Record<string, React.ReactNode> = {
  'divine': <Eye className="h-4 w-4" />,
  'kill': <Skull className="h-4 w-4" />,
  'heal': <Heart className="h-4 w-4" />,
  'poison': <Skull className="h-4 w-4 text-purple-400" />,
  'protect': <Shield className="h-4 w-4" />,
  'shoot': <Sword className="h-4 w-4" />
};

const SkillInterface: React.FC<SkillInterfaceProps> = ({
  gameStateId,
  playerId,
  currentPhase,
  currentRound,
  players
}) => {
  const {
    playerGameState,
    loading,
    processing,
    useSkill,
    getAvailableSkills
  } = useSkillSystem({ gameStateId, playerId, currentPhase, currentRound });

  const [selectedSkill, setSelectedSkill] = useState<SkillDefinition | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const availableSkills = getAvailableSkills();
  const alivePlayers = players.filter(p => p.isAlive && p.id !== playerId);

  const handleUseSkill = async () => {
    if (!selectedSkill) return;

    const success = await useSkill(
      selectedSkill.name,
      selectedSkill.targetRequired ? selectedTarget : undefined
    );

    if (success) {
      setSelectedSkill(null);
      setSelectedTarget(null);
    }
  };

  const canUseSkill = selectedSkill && (!selectedSkill.targetRequired || selectedTarget);

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple"></div>
        </CardContent>
      </Card>
    );
  }

  if (!playerGameState || !playerGameState.is_alive) {
    return (
      <Card className="bg-werewolf-card border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">技能系统</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">你已死亡，无法使用技能</p>
        </CardContent>
      </Card>
    );
  }

  if (availableSkills.length === 0) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple flex items-center gap-2">
            <Zap className="h-5 w-5" />
            技能系统
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-gray-400">当前阶段无可用技能</p>
            <Badge className="bg-gray-600">
              角色：{playerGameState.role}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple flex items-center gap-2">
          <Zap className="h-5 w-5" />
          技能系统
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 角色信息 */}
        <div className="bg-werewolf-dark/40 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">当前角色</span>
            <Badge className="bg-werewolf-purple">
              {playerGameState.role}
            </Badge>
          </div>
        </div>

        {/* 可用技能列表 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">可用技能</p>
          <div className="space-y-2">
            {availableSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              const remainingUses = skill.usesPerGame !== undefined 
                ? playerGameState.skill_uses_remaining[skill.name] || 0 
                : '∞';

              return (
                <div
                  key={skill.name}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-werewolf-purple/30 border border-werewolf-purple' 
                      : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                  }`}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skillIcons[skill.name] || <Target className="h-4 w-4" />}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {remainingUses}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 目标选择 */}
        {selectedSkill?.targetRequired && (
          <div className="space-y-2">
            <p className="text-sm font-medium">选择目标</p>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {alivePlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`p-2 rounded-md cursor-pointer transition-colors ${
                      selectedTarget === player.id
                        ? 'bg-werewolf-purple/30 border border-werewolf-purple'
                        : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                    }`}
                    onClick={() => setSelectedTarget(
                      selectedTarget === player.id ? null : player.id
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-werewolf-purple/70 text-xs">
                          {player.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{player.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* 技能使用按钮 */}
        <Button
          onClick={handleUseSkill}
          disabled={!canUseSkill || processing}
          className="w-full bg-werewolf-purple hover:bg-werewolf-light"
        >
          {processing ? '使用中...' : '使用技能'}
        </Button>

        {/* 技能说明 */}
        {selectedSkill && (
          <div className="bg-werewolf-dark/40 p-3 rounded-md">
            <p className="text-xs text-gray-400">
              <strong>阶段限制：</strong> {selectedSkill.phases.join(', ')}
            </p>
            {selectedSkill.usesPerGame && (
              <p className="text-xs text-gray-400">
                <strong>使用次数：</strong> {selectedSkill.usesPerGame} 次/游戏
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillInterface;
