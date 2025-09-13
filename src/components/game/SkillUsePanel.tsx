
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { _Select, _SelectContent, _SelectItem, _SelectTrigger, _SelectValue } from '@/components/ui/select';
import { _Badge } from '@/components/ui/badge';
import { _Loader2, Target, Clock, Zap, _Shield, _Search, _Skull } from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { canUseSkillInGameState, _getSkillEffectTypes, getSkillPriority as _getSkillPriority } from '@/utils/skillSystemHelpers';
import { validateSkillUsage, getSkillUsageHint } from '@/utils/skillUsageRestrictions';
import { RoleSpecificSkills } from './skill/RoleSpecificSkills';

interface SkillUsePanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: any;
  roleDesign: any;
  players: Array<{ userId: string; name: string; roleStatus: number }>;
}

const SkillUsePanel: React.FC<SkillUsePanelProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  roleState,
  roleDesign,
  players
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [skillData, setSkillData] = useState<any>({});
  
  const {
    _loading,
    useSkillEnhanced: useSkill,
    _skillUses,
    getUserSkillData
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 检查是否可以使用技能
  const canUseSkill = canUseSkillInGameState(
    roleDesign?.skill_effects || {},
    roleState?.role_status || 1,
    currentPhase,
    roleDesign?.skill_name
  );

  // 获取技能效果类型
  const _skillEffectTypes = _getSkillEffectTypes(roleDesign?.skill_effects || {});
  const _skillPriority = _getSkillPriority(roleDesign?.skill_effects || {}, roleDesign?.skill_name);

  // 获取当前用户的技能使用记录（用于限制检查）
  const userData = getUserSkillData(userId);
  const userSkillUses = userData.uses;

  // 获取可选目标玩家
  const availableTargets = players.filter(player => 
    player.userId !== userId && player.roleStatus !== 4 // 排除自己和已淘汰的玩家
  );

  // 检查夜晚技能使用限制（女巫除外）
  const checkSkillUsageRestriction = () => {
    const currentRound = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // 简化的回合计算
    
    return validateSkillUsage(
      roleDesign?.role_name || '',
      roleDesign?.skill_name || '',
      currentPhase,
      currentRound,
      userSkillUses
    );
  };

  const usageRestriction = checkSkillUsageRestriction();
  const skillUsageHint = getSkillUsageHint(
    roleDesign?.role_name || '',
    roleDesign?.skill_name || '',
    currentPhase
  );

  const _handleUseSkill = async () => {
    if (!roleDesign?.skill_name) return;

    const result = await useSkill(
      roleDesign.skill_name,
      selectedTarget || undefined,
      skillData,
      roleState,
      roleDesign,
      currentPhase
    );

    if (result) {
      setSelectedTarget('');
      setSkillData({});
    }
  };

  const _getEffectIcon = (effectType: string) => {
    switch (effectType) {
      case 'elimination': return <_Skull className="w-4 h-4" />;
      case 'protection': return <_Shield className="w-4 h-4" />;
      case 'investigation': return <_Search className="w-4 h-4" />;
      case 'status_change': return <Zap className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const _getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  if (!roleDesign?.skill_name) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>技能面板</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">当前角色没有可用技能</p>
        </CardContent>
      </Card>
    );
  }

  // 使用角色特定技能组件
  const handleSkillUse = async (skillData: any) => {
    if (!roleDesign?.skill_name) return;

    const result = await useSkill(
      roleDesign.skill_name,
      skillData.targetId || undefined,
      skillData,
      roleState,
      roleDesign,
      currentPhase
    );

    if (result) {
      setSelectedTarget('');
      setSkillData({});
    }
  };

  return (
    <div className="space-y-4">
      {/* 技能使用限制提示 */}
      {!usageRestriction.canUse && (
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">技能使用限制</span>
            </div>
            <p className="text-sm text-yellow-300 mt-1">{usageRestriction.reason}</p>
            <p className="text-xs text-yellow-400 mt-2">{skillUsageHint}</p>
          </CardContent>
        </Card>
      )}

      {/* 角色特定技能界面 */}
      <RoleSpecificSkills
        roleName={roleDesign.role_name || ''}
        skillEffects={roleDesign.skill_effects || {}}
        roleAttributes={roleDesign.role_attributes || {}}
        canUseSkill={canUseSkill && usageRestriction.canUse}
        onUseSkill={handleSkillUse}
        availableTargets={availableTargets}
        currentPhase={currentPhase}
        userSkillUses={userSkillUses}
        usageRestriction={usageRestriction}
      />
    </div>
  );
};

export default SkillUsePanel;
