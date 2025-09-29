// 增强的技能系统Hook - 重构为组合式Hook
import React from 'react';
import { useSkillData, type EnhancedSkillUse } from './skill/useSkillData';
import { useSkillRealtime } from './skill/useSkillRealtime';
import { useSkillValidation, type SkillSuggestion } from './skill/useSkillValidation';
import { useSkillStats, type SkillSystemStats } from './skill/useSkillStats';
import { usePerformanceOptimization } from './usePerformanceOptimizationNew';
import { useMemoryManager } from './useMemoryManager';
import { skillCache } from '@/utils/skillCache';

export const useEnhancedSkillSystem = (
  roomId: string, 
  gameStateId?: string, 
  userId?: string
) => {
  // 性能优化
  const performance = usePerformanceOptimization({
    componentName: 'EnhancedSkillSystem',
    enableMemoryTracking: true,
    enableRenderTracking: true,
    debounceTime: 100
  });

  // 内存管理
  const memoryManager = useMemoryManager({
    componentName: 'EnhancedSkillSystem',
    maxMemoryThreshold: 30, // 30MB
    enableAutoCleanup: true
  });

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

  // 缓存管理 - 定期清理过期缓存
  React.useEffect(() => {
    const cacheMaintenanceInterval = setInterval(() => {
      skillCache.performMaintenance();
    }, 60000); // 每分钟清理一次

    const cleanup = memoryManager.registerInterval(cacheMaintenanceInterval);
    return cleanup;
  }, [memoryManager]);

  return {
    // 数据状态
    skillUses: skillDataHook.skillUses,
    skillEffectsQueue: skillDataHook.skillEffectsQueue,
    skillTargets: skillDataHook.skillTargets,
    loading: skillDataHook.loading,
    stats: skillStatsHook.stats,
    lastSyncTime: skillDataHook.lastSyncTime,

    // 核心功能 - 使用性能优化的回调
    useSkillEnhanced: performance.createOptimizedCallback(
      skillValidationHook.useSkillEnhanced,
      [skillValidationHook.useSkillEnhanced]
    ),
    resolveSkillConflicts: performance.createOptimizedCallback(
      skillStatsHook.resolveSkillConflicts,
      [skillStatsHook.resolveSkillConflicts]
    ),
    fetchAllSkillData: performance.createOptimizedCallback(
      skillDataHook.fetchAllSkillData,
      [skillDataHook.fetchAllSkillData]
    ),

    // 辅助功能
    getSkillSuggestion: skillValidationHook.getSkillSuggestion,
    getUserSkillData: skillStatsHook.getUserSkillData,
    canUseSkill: skillValidationHook.canUseSkill,
    validateSkillFrontend: skillValidationHook.validateSkillFrontend,

    // 兼容性 - 保持原有接口
    useSkill: skillValidationHook.useSkillEnhanced,
    getUserSkillUses: (targetUserId: string) => skillStatsHook.getUserSkillData(targetUserId).uses,
    getUserSkillEffects: (targetUserId: string) => skillStatsHook.getUserSkillData(targetUserId).targets,
    hasActiveEffect: skillStatsHook.hasActiveEffect,

    // 性能监控接口
    getPerformanceMetrics: performance.getMetrics,
    getResourceStats: memoryManager.getResourceStats,
    getCacheStats: () => skillCache.getCacheStats(),
    forceCleanup: memoryManager.forceCleanup
  };
};

// 导出类型以供其他组件使用
export type { EnhancedSkillUse, SkillSystemStats, SkillSuggestion };