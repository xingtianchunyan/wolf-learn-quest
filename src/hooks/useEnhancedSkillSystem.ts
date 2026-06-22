/**
 * 增强的技能系统 Hook
 * 组合技能数据、校验、统计三个子 Hook，提供统一的技能操作接口。
 */
import { useCallback } from 'react';
import { useSkillData, type EnhancedSkillUse } from './skill/useSkillData';
import { useSkillRealtime } from './skill/useSkillRealtime';
import {
  useSkillValidation,
  type SkillSuggestion,
} from './skill/useSkillValidation';
import { useSkillStats, type SkillSystemStats } from './skill/useSkillStats';

export const useEnhancedSkillSystem = (
  roomId: string,
  gameStateId?: string,
  userId?: string
) => {
  const skillDataHook = useSkillData(gameStateId);
  const skillValidationHook = useSkillValidation(gameStateId, userId, roomId);
  const skillStatsHook = useSkillStats(
    skillDataHook.skillUses,
    skillDataHook.skillTargets,
    skillDataHook.skillEffectsQueue,
    userId,
    gameStateId
  );

  // 兼容性封装：保持原有 useSkillEnhanced 接口不变
  const useSkillEnhanced = useCallback(
    async (
      ...args: Parameters<typeof skillValidationHook.useSkillEnhanced>
    ) => {
      return skillValidationHook.useSkillEnhanced(...args);
    },
    [skillValidationHook.useSkillEnhanced]
  );

  return {
    // 数据状态
    skillUses: skillDataHook.skillUses,
    skillEffectsQueue: skillDataHook.skillEffectsQueue,
    skillTargets: skillDataHook.skillTargets,
    loading: skillDataHook.loading,
    stats: skillStatsHook.stats,
    lastSyncTime: skillDataHook.lastSyncTime,

    // 核心功能
    useSkillEnhanced,
    resolveSkillConflicts: skillStatsHook.resolveSkillConflicts,
    fetchAllSkillData: skillDataHook.fetchAllSkillData,

    // 辅助功能
    getSkillSuggestion: skillValidationHook.getSkillSuggestion,
    getUserSkillData: skillStatsHook.getUserSkillData,
    canUseSkill: skillValidationHook.canUseSkill,
    validateSkillFrontend: skillValidationHook.validateSkillFrontend,

    // 兼容性
    useSkill: skillValidationHook.useSkillEnhanced,
    getUserSkillUses: (targetUserId: string) =>
      skillStatsHook.getUserSkillData(targetUserId).uses,
    getUserSkillEffects: (targetUserId: string) =>
      skillStatsHook.getUserSkillData(targetUserId).targets,
    hasActiveEffect: skillStatsHook.hasActiveEffect,

    // 占位：保持旧接口不报错
    getPerformanceMetrics: () => ({}),
    getResourceStats: () => ({}),
    getCacheStats: () => ({}),
    forceCleanup: () => {},
    subscriptionStatus: {
      skillUses: 'active' as const,
      skillEffects: 'active' as const,
    },
    performanceStats: {},
    optimizeCache: () => {},
    resetPerformanceMetrics: () => {},
  };
};

export type { EnhancedSkillUse, SkillSuggestion, SkillSystemStats };
