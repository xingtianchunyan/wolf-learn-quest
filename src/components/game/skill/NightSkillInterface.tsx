import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Moon, Target, Clock, Zap, Shield, Skull, Eye } from 'lucide-react';
import { useSkillSystem } from '@/hooks/useSkillSystem';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { canUseSkillInGameState, getSkillEffectTypes } from '@/utils/skillSystemHelpers';

interface NightSkillInterfaceProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: any;
  roleDesign: any;
  players: Array<{
    userId: string;
    name: string;
    roleStatus: number;
    isAlive: boolean;
  }>;
}

export const NightSkillInterface: React.FC<NightSkillInterfaceProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  roleState,
  roleDesign,
  players
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [skillConfirmation, setSkillConfirmation] = useState(false);
  const { useSkill, loading, getUserSkillUses, getUserSkillEffects } = useSkillSystem(gameStateId, roomId);
  
  // 检查是否是夜晚阶段
  const isNightPhase = currentPhase === 3;
  
  // 检查是否可以使用技能
  const canUseSkill = canUseSkillInGameState(
    roleDesign?.skill_effects || {},
    roleState?.role_status || 1,
    currentPhase,
    roleDesign?.skill_name
  );

  // 获取技能效果类型
  const skillEffectTypes = getSkillEffectTypes(roleDesign?.skill_effects || {});
  
  // 获取可选目标（排除自己和已死亡的玩家）
  const availableTargets = players.filter(player => 
    player.userId !== userId && 
    player.isAlive &&
    player.roleStatus !== 4 // 不是淘汰状态
  );

  // 获取用户的技能使用记录
  const userSkillUses = getUserSkillUses(userId);
  const lastSkillUse = userSkillUses[0]; // 最近的技能使用

  // 获取用户当前的技能效果
  const userSkillEffects = getUserSkillEffects(userId);

  const handleUseSkill = async () => {
    if (!selectedTarget && needsTarget()) {
      return;
    }

    const skillData = {
      target_id: selectedTarget || undefined,
      phase: 'night',
      confirmation: skillConfirmation
    };

    const result = await useSkill(
      roleDesign?.skill_name || 'unknown',
      selectedTarget || undefined,
      skillData
    );

    if (result) {
      setSelectedTarget('');
      setSkillConfirmation(false);
    }
  };

  // 检查技能是否需要目标
  const needsTarget = () => {
    const targetTypes = roleDesign?.skill_effects?.target_type || [];
    return targetTypes.includes('player') || targetTypes.includes('other_player');
  };

  // 获取技能图标
  const getSkillIcon = () => {
    const effectType = skillEffectTypes[0];
    switch (effectType) {
      case 'elimination':
        return <Skull className="w-5 h-5" />;
      case 'protection':
        return <Shield className="w-5 h-5" />;
      case 'investigation':
        return <Eye className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  // 获取技能状态颜色
  const getSkillStatusColor = () => {
    if (!canUseSkill) return 'text-gray-400';
    if (lastSkillUse?.execution_status === 'completed') return 'text-green-400';
    if (lastSkillUse?.execution_status === 'pending') return 'text-yellow-400';
    return 'text-blue-400';
  };

  if (!isNightPhase) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="p-6 text-center">
          <Moon className="w-12 h-12 mx-auto mb-4 text-werewolf-purple/50" />
          <h3 className="text-lg font-semibold text-werewolf-purple mb-2">等待夜晚</h3>
          <p className="text-sm text-gray-400">夜晚技能只能在夜晚阶段使用</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-werewolf-purple">
          <Moon className="w-5 h-5" />
          夜晚技能
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 技能信息 */}
        <div className="flex items-center justify-between p-3 bg-werewolf-dark/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-werewolf-purple/20 ${getSkillStatusColor()}`}>
              {getSkillIcon()}
            </div>
            <div>
              <h4 className="font-semibold text-werewolf-purple">{roleDesign?.skill_name || '未知技能'}</h4>
              <p className="text-xs text-gray-400">{roleDesign?.skill_description}</p>
            </div>
          </div>
          <Badge variant={canUseSkill ? 'default' : 'secondary'}>
            {canUseSkill ? '可用' : '不可用'}
          </Badge>
        </div>

        {/* 目标选择 */}
        {needsTarget() && canUseSkill && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-werewolf-purple flex items-center gap-2">
              <Target className="w-4 h-4" />
              选择目标
            </label>
            <Select value={selectedTarget} onValueChange={setSelectedTarget}>
              <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30">
                <SelectValue placeholder="选择一个目标玩家" />
              </SelectTrigger>
              <SelectContent>
                {availableTargets.map(player => (
                  <SelectItem key={player.userId} value={player.userId}>
                    <div className="flex items-center gap-2">
                      <span>{player.name}</span>
                      <Badge variant="outline" className="text-xs">
                        状态: {player.roleStatus === 1 ? '正常' : player.roleStatus === 2 ? '濒死' : '虚弱'}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 技能使用按钮 */}
        <div className="space-y-3">
          {roleDesign?.skill_name?.includes('hunter') && (
            <div className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <input
                type="checkbox"
                id="skill-confirmation"
                checked={skillConfirmation}
                onChange={(e) => setSkillConfirmation(e.target.checked)}
                className="rounded border-werewolf-purple/30"
              />
              <label htmlFor="skill-confirmation" className="text-sm text-yellow-400">
                我确认要使用猎人技能（此操作不可撤销）
              </label>
            </div>
          )}

          <Button 
            onClick={handleUseSkill}
            disabled={
              !canUseSkill || 
              loading || 
              (needsTarget() && !selectedTarget) ||
              (roleDesign?.skill_name?.includes('hunter') && !skillConfirmation)
            }
            className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
          >
            {loading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                使用中...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                使用技能
              </>
            )}
          </Button>
        </div>

        <Separator className="bg-werewolf-purple/30" />

        {/* 技能历史 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-werewolf-purple">技能使用历史</h4>
          <ScrollArea className="h-24">
            <div className="space-y-1">
              {userSkillUses.length > 0 ? (
                userSkillUses.slice(0, 3).map((skillUse, index) => (
                  <div key={skillUse.id} className="flex items-center justify-between p-2 bg-werewolf-dark/30 rounded text-xs">
                    <span className="text-gray-300">
                      第{skillUse.round_number}轮 - {skillUse.skill_name}
                    </span>
                    <Badge 
                      variant={
                        skillUse.execution_status === 'completed' ? 'default' :
                        skillUse.execution_status === 'pending' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {skillUse.execution_status === 'completed' ? '已完成' :
                       skillUse.execution_status === 'pending' ? '等待中' : '失败'}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-2">暂无技能使用记录</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* 当前技能效果 */}
        {userSkillEffects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-werewolf-purple">当前效果</h4>
            <div className="space-y-1">
              {userSkillEffects.map((effect, index) => (
                <div key={effect.id} className="flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs">
                  <span className="text-blue-300">
                    {effect.effect_applied?.effect_type || '未知效果'}
                  </span>
                  <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                    持续中
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};