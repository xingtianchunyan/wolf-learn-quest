import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Target, Clock, Zap, Shield, Search, Skull, AlertCircle } from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { canUseSkillInGameState, getSkillEffectTypes, getSkillPriority } from '@/utils/skillSystemHelpers';
import { validateSkillUsageSimplified, getSkillUsageSuggestion } from '@/utils/skillSystemValidation';
import { RoleSpecificSkills } from './skill/RoleSpecificSkills';
import type { Tables } from '@/integrations/supabase/types';

interface SkillUsePanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
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
  const [skillData, setSkillData] = useState<Record<string, unknown>>({});
  
  const {
    loading,
    useSkillEnhanced: useSkill,
    skillUses,
    getUserSkillData,
    validateSkillFrontend
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 检查是否可以使用技能
  const canUseSkill = canUseSkillInGameState(
    roleDesign?.skill_effects as any || {},
    roleState?.role_status || 1,
    currentPhase,
    roleDesign?.skill_name
  );

  // 获取技能效果类型
  const skillEffectTypes = getSkillEffectTypes(roleDesign?.skill_effects as any || {});
  const skillPriority = getSkillPriority(roleDesign?.skill_effects as any || {}, roleDesign?.skill_name);

  // 获取当前用户的技能使用记录（用于限制检查）
  const userData = getUserSkillData(userId);
  const userSkillUses = userData.uses;

  // 获取可选目标玩家
  const availableTargets = players.filter(player => 
    player.userId !== userId && player.roleStatus !== 4 // 排除自己和已淘汰的玩家
  );

  // 简化的技能使用验证
  const usageValidation = validateSkillUsageSimplified(
    roleDesign,
    roleState,
    currentPhase,
    selectedTarget || undefined
  );

  const skillUsageHint = getSkillUsageSuggestion(
    roleDesign,
    roleState,
    currentPhase,
    availableTargets
  );

  const _handleUseSkill = async () => {
    if (!roleDesign?.skill_name) return;

    // 前端验证技能是否可用
    if (!usageValidation.valid) {
      return; // 不执行技能使用，按钮已禁用
    }

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
      case 'elimination': return <Skull className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'investigation': return <Search className="w-4 h-4" />;
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
  const handleSkillUse = async (skillData: Record<string, unknown>) => {
    if (!roleDesign?.skill_name) return;

    // 前端验证 - 避免无效请求
    const frontendValidation = validateSkillFrontend?.(
      roleDesign.skill_name,
      roleState,
      roleDesign,
      currentPhase,
      skillData.targetId as string,
      1 // currentRound - 默认为1
    );

    if (frontendValidation && !frontendValidation.canUse) {
      // 不显示错误弹窗，只是不执行操作
      return;
    }

    const result = await useSkill(
      roleDesign.skill_name,
      skillData.targetId as string || undefined,
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
      {/* 技能使用状态提示 */}
      <Card className={`border-opacity-30 ${!usageValidation.valid ? 'border-yellow-500 bg-yellow-900/20' : 'border-blue-500 bg-blue-900/20'}`}>
        <CardContent className="p-4">
          <div className={`flex items-center gap-2 ${!usageValidation.valid ? 'text-yellow-400' : 'text-blue-400'}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {!usageValidation.valid ? '技能使用限制' : '技能使用建议'}
            </span>
          </div>
          {!usageValidation.valid && (
            <>
              <p className="text-sm text-yellow-300 mt-1">{usageValidation.reason}</p>
              {usageValidation.suggestedAction && (
                <p className="text-xs text-yellow-400 mt-2">{usageValidation.suggestedAction}</p>
              )}
            </>
          )}
          {usageValidation.valid && (
            <p className="text-xs text-blue-300 mt-2">{skillUsageHint}</p>
          )}
        </CardContent>
      </Card>

      {/* 角色特定技能界面 */}
      <RoleSpecificSkills
        roleName={roleDesign.role_name || ''}
        skillEffects={roleDesign.skill_effects || {}}
        roleAttributes={roleDesign.role_attributes || {}}
        canUseSkill={canUseSkill && usageValidation.valid}
        onUseSkill={handleSkillUse}
        availableTargets={availableTargets}
        currentPhase={currentPhase}
        userSkillUses={userSkillUses}
        usageRestriction={usageValidation}
        gameStateId={gameStateId}
        userId={userId}
        currentRound={1}
      />
    </div>
  );
};

export default SkillUsePanel;