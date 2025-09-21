// 增强的技能系统Hook - 重构为组合式Hook
import { useSkillData, type EnhancedSkillUse } from './skill/useSkillData';
import { useSkillRealtime } from './skill/useSkillRealtime';
import { useSkillValidation, type SkillSuggestion } from './skill/useSkillValidation';
import { useSkillStats, type SkillSystemStats } from './skill/useSkillStats';

export const useEnhancedSkillSystem = (
  roomId: string, 
  gameStateId?: string, 
  userId?: string
) => {
  // 使用分解的子Hook
  const skillDataHook = useSkillData(gameStateId);
  const skillValidationHook = useSkillValidation(gameStateId, userId, roomId);
  const skillStatsHook = useSkillStats(
    skillDataHook.skillUses,
    skillDataHook.skillTargets,
    skillDataHook.skillEffectsQueue,
    userId,
    gameStateId
  );

  // 设置实时订阅
  useSkillRealtime({
    gameStateId,
    setSkillUses: skillDataHook.setSkillUses,
    fetchAllSkillData: skillDataHook.fetchAllSkillData
  });

  return {
    // 数据状态
    skillUses: skillDataHook.skillUses,
    skillEffectsQueue: skillDataHook.skillEffectsQueue,
    skillTargets: skillDataHook.skillTargets,
    loading: skillDataHook.loading,
    stats: skillStatsHook.stats,
    lastSyncTime: skillDataHook.lastSyncTime,

    // 核心功能
    useSkillEnhanced: skillValidationHook.useSkillEnhanced,
    resolveSkillConflicts: skillStatsHook.resolveSkillConflicts,
    fetchAllSkillData: skillDataHook.fetchAllSkillData,

    // 辅助功能
    getSkillSuggestion: skillValidationHook.getSkillSuggestion,
    getUserSkillData: skillStatsHook.getUserSkillData,
    canUseSkill: skillValidationHook.canUseSkill,
    validateSkillFrontend: skillValidationHook.validateSkillFrontend,

    // 兼容性 - 保持原有接口
    useSkill: skillValidationHook.useSkillEnhanced,
    getUserSkillUses: (targetUserId: string) => skillStatsHook.getUserSkillData(targetUserId).uses,
    getUserSkillEffects: (targetUserId: string) => skillStatsHook.getUserSkillData(targetUserId).targets,
    hasActiveEffect: skillStatsHook.hasActiveEffect
  };
};

// 导出类型以供其他组件使用
export type { EnhancedSkillUse, SkillSystemStats, SkillSuggestion };