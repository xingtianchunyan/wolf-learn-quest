/**
 * 文件级注释：增强的技能系统Hook
 * 集成性能关键问题修复、智能缓存策略和增强的实时订阅管理
 * 解决组件渲染频繁、内存泄漏和查询性能问题
 */
import React from 'react';
import { useSkillData, type EnhancedSkillUse } from './skill/useSkillData';
import { useSkillRealtime } from './skill/useSkillRealtime';
import {
  useSkillValidation,
  type SkillSuggestion,
} from './skill/useSkillValidation';
import { useSkillStats, type SkillSystemStats } from './skill/useSkillStats';
import { usePerformanceOptimization } from './usePerformanceOptimizationNew';
import { useMemoryManager } from './useMemoryManager';
import { skillCache } from '@/utils/skillCache';
import { useEnhancedRealtime } from '@/utils/enhancedRealtimeManager';
import { useIntelligentCache } from '@/utils/intelligentCacheStrategy';

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
    debounceTime: 100,
  });

  // 内存管理
  const memoryManager = useMemoryManager({
    componentName: 'EnhancedSkillSystem',
    maxMemoryThreshold: 30, // 30MB
    enableAutoCleanup: true,
  });

  // 智能缓存 - 技能配置数据
  const { data: skillConfigs } = useIntelligentCache(
    `skill-configs-${gameStateId}`,
    async () => {
      // 这里可以预加载技能配置数据
      return {};
    },
    { priority: 8, enabled: !!gameStateId }
  );

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

  // 增强的实时订阅 - 技能使用记录
  const skillUsesSubscription = useEnhancedRealtime(
    {
      table: 'skill_uses',
      filter: gameStateId ? `game_state_id=eq.${gameStateId}` : undefined,
      event: '*',
      enableReconnect: true,
      maxReconnectAttempts: 3,
    },
    payload => {
      // 使用性能优化的状态更新
      performanceFixes.stateOptimizer('skillUses', payload, newPayload => {
        if (newPayload.new && typeof newPayload.new === 'object') {
          const newSkillUse = newPayload.new as EnhancedSkillUse;

          if (newPayload.eventType === 'INSERT') {
            skillDataHook.setSkillUses(current => [newSkillUse, ...current]);
          } else if (newPayload.eventType === 'UPDATE') {
            skillDataHook.setSkillUses(current =>
              current.map(su => (su.id === newSkillUse.id ? newSkillUse : su))
            );
          } else if (newPayload.eventType === 'DELETE' && newPayload.old) {
            skillDataHook.setSkillUses(current =>
              current.filter(
                su => su.id !== (newPayload.old as EnhancedSkillUse).id
              )
            );
          }
        }
      });
    },
    [gameStateId, skillDataHook.setSkillUses]
  );

  // 增强的实时订阅 - 技能效果队列
  const skillEffectsSubscription = useEnhancedRealtime(
    {
      table: 'skill_effects_queue',
      filter: gameStateId ? `game_state_id=eq.${gameStateId}` : undefined,
      event: '*',
      enableReconnect: true,
      maxReconnectAttempts: 3,
    },
    () => {
      // 技能效果队列变化时重新获取数据
      performanceFixes.renderOptimizer(() => {
        skillDataHook.fetchAllSkillData();
      });
    },
    [gameStateId, skillDataHook.fetchAllSkillData]
  );

  // 注册订阅清理
  React.useEffect(() => {
    performanceFixes.subscriptionManager.add(() => {
      // 订阅会自动清理，这里只是注册到管理器
    });
  }, [performanceFixes.subscriptionManager]);

  // 智能缓存管理 - 使用缓存管理器
  React.useEffect(() => {
    const cacheMaintenanceInterval = setInterval(() => {
      skillCache.performMaintenance();
      // 清理智能缓存中的过期项
      performanceFixes.cacheManager.invalidate();
    }, 300000); // 每5分钟清理一次

    const cleanup = memoryManager.registerInterval(cacheMaintenanceInterval);
    performanceFixes.subscriptionManager.add(cleanup);

    return cleanup;
  }, [memoryManager, performanceFixes]);

  // 预加载关键数据
  React.useEffect(() => {
    if (gameStateId) {
      performanceFixes.cacheManager.preload([
        {
          key: `skill-uses-${gameStateId}`,
          fetcher: async () => skillDataHook.fetchAllSkillData(),
          ttl: 2 * 60 * 1000, // 2分钟
        },
        {
          key: `skill-targets-${gameStateId}`,
          fetcher: async () => {
            // 预加载技能目标数据
            return skillDataHook.skillTargets;
          },
          ttl: 5 * 60 * 1000, // 5分钟
        },
      ]);
    }
  }, [gameStateId, performanceFixes.cacheManager, skillDataHook]);

  return {
    // 数据状态
    skillUses: skillDataHook.skillUses,
    skillEffectsQueue: skillDataHook.skillEffectsQueue,
    skillTargets: skillDataHook.skillTargets,
    loading: skillDataHook.loading,
    stats: skillStatsHook.stats,
    lastSyncTime: skillDataHook.lastSyncTime,

    // 核心功能 - 使用性能优化的回调
    useSkillEnhanced: performanceFixes.renderOptimizer(
      performance.createOptimizedCallback(
        skillValidationHook.useSkillEnhanced,
        [skillValidationHook.useSkillEnhanced]
      )
    ),
    resolveSkillConflicts: performanceFixes.renderOptimizer(
      performance.createOptimizedCallback(
        skillStatsHook.resolveSkillConflicts,
        [skillStatsHook.resolveSkillConflicts]
      )
    ),
    fetchAllSkillData: performanceFixes.renderOptimizer(
      performance.createOptimizedCallback(skillDataHook.fetchAllSkillData, [
        skillDataHook.fetchAllSkillData,
      ])
    ),

    // 辅助功能
    getSkillSuggestion: skillValidationHook.getSkillSuggestion,
    getUserSkillData: skillStatsHook.getUserSkillData,
    canUseSkill: skillValidationHook.canUseSkill,
    validateSkillFrontend: skillValidationHook.validateSkillFrontend,

    // 兼容性 - 保持原有接口
    useSkill: skillValidationHook.useSkillEnhanced,
    getUserSkillUses: (targetUserId: string) =>
      skillStatsHook.getUserSkillData(targetUserId).uses,
    getUserSkillEffects: (targetUserId: string) =>
      skillStatsHook.getUserSkillData(targetUserId).targets,
    hasActiveEffect: skillStatsHook.hasActiveEffect,

    // 性能监控接口
    getPerformanceMetrics: performance.getMetrics,
    getResourceStats: memoryManager.getResourceStats,
    getCacheStats: () => ({
      ...skillCache.getCacheStats(),
      ...performanceFixes.getStats(),
    }),
    forceCleanup: memoryManager.forceCleanup,

    // 新增性能修复接口
    subscriptionStatus: {
      skillUses: skillUsesSubscription.status,
      skillEffects: skillEffectsSubscription.status,
    },
    performanceStats: performanceFixes.getStats(),
    optimizeCache: () => performanceFixes.cacheManager.invalidate(),
    resetPerformanceMetrics: () => {
      performance.resetMetrics();
      performanceFixes.getStats();
    },
  };
};

// 导出类型以供其他组件使用
export type { EnhancedSkillUse, SkillSystemStats, SkillSuggestion };
