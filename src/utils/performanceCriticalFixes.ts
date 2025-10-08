/**
 * 文件级注释：性能关键问题修复系统
 * 专门解决 EnhancedSkillSystem 组件渲染问题、内存泄漏和查询缓存优化
 * 提供统一的性能修复策略和监控机制
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { createLogger } from '@/lib/logger';
import { optimizedQueryCache } from '@/utils/optimizedQueryCache';

const logger = createLogger('performance-critical-fixes');

/**
 * 性能问题类型枚举
 */
export enum PerformanceProblemType {
  EXCESSIVE_RENDERING = 'excessive_rendering',
  MEMORY_LEAK = 'memory_leak',
  CACHE_MISS = 'cache_miss',
  SUBSCRIPTION_LEAK = 'subscription_leak',
  STATE_THRASHING = 'state_thrashing'
}

/**
 * 性能修复配置接口
 */
export interface PerformanceFixConfig {
  enableRenderOptimization: boolean;
  enableMemoryManagement: boolean;
  enableCacheOptimization: boolean;
  enableSubscriptionCleanup: boolean;
  renderThreshold: number;
  memoryThreshold: number;
  cacheHitRateThreshold: number;
}

/**
 * 组件渲染状态接口
 */
export interface ComponentRenderState {
  renderCount: number;
  lastRenderTime: number;
  renderTimes: number[];
  isOptimized: boolean;
  subscriptions: Set<() => void>;
  cacheKeys: Set<string>;
}

/**
 * 性能关键问题修复类
 */
class PerformanceCriticalFixes {
  private static instance: PerformanceCriticalFixes;
  private componentStates: Map<string, ComponentRenderState> = new Map();
  private config: PerformanceFixConfig = {
    enableRenderOptimization: true,
    enableMemoryManagement: true,
    enableCacheOptimization: true,
    enableSubscriptionCleanup: true,
    renderThreshold: 5, // 1秒内最多5次渲染
    memoryThreshold: 100 * 1024 * 1024, // 100MB
    cacheHitRateThreshold: 0.8 // 80%缓存命中率
  };

  private constructor() {
    this.startPerformanceMonitoring();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): PerformanceCriticalFixes {
    if (!PerformanceCriticalFixes.instance) {
      PerformanceCriticalFixes.instance = new PerformanceCriticalFixes();
    }
    return PerformanceCriticalFixes.instance;
  }

  /**
   * 修复 EnhancedSkillSystem 组件渲染问题
   */
  public fixEnhancedSkillSystemRendering(componentName: string) {
    const state = this.getOrCreateComponentState(componentName);
    
    // 渲染优化策略
    const optimizedRenderCallback = useCallback((callback: () => void) => {
      const now = Date.now();
      const recentRenders = state.renderTimes.filter(time => now - time < 1000);
      
      if (recentRenders.length >= this.config.renderThreshold) {
        // 延迟渲染以避免过度渲染
        setTimeout(callback, 100);
        logger.warn(`${componentName} 渲染过于频繁，已延迟执行`, {
          recentRenders: recentRenders.length,
          threshold: this.config.renderThreshold
        });
      } else {
        callback();
      }
      
      // 更新渲染记录
      state.renderTimes.push(now);
      state.renderCount++;
      state.lastRenderTime = now;
      
      // 清理旧的渲染记录
      state.renderTimes = state.renderTimes.filter(time => now - time < 1000);
    }, [componentName, state]);

    return optimizedRenderCallback;
  }

  /**
   * 修复实时订阅内存泄漏
   */
  public fixRealtimeSubscriptionLeaks(componentName: string) {
    const state = this.getOrCreateComponentState(componentName);
    
    // 订阅管理器
    const subscriptionManager = {
      add: (cleanup: () => void) => {
        state.subscriptions.add(cleanup);
      },
      
      remove: (cleanup: () => void) => {
        state.subscriptions.delete(cleanup);
      },
      
      clear: () => {
        state.subscriptions.forEach(cleanup => {
          try {
            cleanup();
          } catch (error) {
            logger.error(`${componentName} 订阅清理失败`, error);
          }
        });
        state.subscriptions.clear();
      }
    };

    // 组件卸载时自动清理
    useEffect(() => {
      return () => {
        subscriptionManager.clear();
        logger.info(`${componentName} 订阅已清理`, {
          subscriptionCount: state.subscriptions.size
        });
      };
    }, [componentName]);

    return subscriptionManager;
  }

  /**
   * 优化查询缓存策略
   */
  public optimizeQueryCache(componentName: string) {
    const state = this.getOrCreateComponentState(componentName);
    
    // 智能缓存管理
    const cacheManager = {
      get: async <T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> => {
        state.cacheKeys.add(key);
        
        // 尝试从缓存获取
        let data = await optimizedQueryCache.get<T>(key);
        
        if (data === null) {
          // 缓存未命中，执行查询
          data = await fetcher();
          await optimizedQueryCache.set(key, data, { ttl });
          
          logger.debug(`${componentName} 缓存未命中，已更新`, { key });
        } else {
          logger.debug(`${componentName} 缓存命中`, { key });
        }
        
        return data;
      },
      
      invalidate: (pattern?: string) => {
        if (pattern) {
          // 按模式清理缓存
          const keysToDelete = Array.from(state.cacheKeys).filter(key => 
            key.includes(pattern)
          );
          keysToDelete.forEach(key => {
            optimizedQueryCache.delete(key);
            state.cacheKeys.delete(key);
          });
          logger.info(`${componentName} 缓存已按模式清理`, { pattern, count: keysToDelete.length });
        } else {
          // 清理所有相关缓存
          state.cacheKeys.forEach(key => optimizedQueryCache.delete(key));
          state.cacheKeys.clear();
          logger.info(`${componentName} 所有缓存已清理`);
        }
      },
      
      preload: async (keys: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>) => {
        // 预加载关键数据
        const promises = keys.map(async ({ key, fetcher, ttl }) => {
          const exists = await optimizedQueryCache.get(key);
          if (!exists) {
            const data = await fetcher();
            await optimizedQueryCache.set(key, data, { ttl });
            state.cacheKeys.add(key);
          }
        });
        
        await Promise.all(promises);
        logger.info(`${componentName} 缓存预加载完成`, { count: keys.length });
      }
    };

    return cacheManager;
  }

  /**
   * 修复状态抖动问题
   */
  public fixStateThrashing(componentName: string, debounceTime: number = 300) {
    const state = this.getOrCreateComponentState(componentName);
    const pendingUpdates = useRef<Map<string, any>>(new Map());
    const updateTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
    
    const debouncedStateUpdate = useCallback(<T>(
      key: string,
      value: T,
      setter: (value: T) => void
    ) => {
      // 清除之前的定时器
      const existingTimer = updateTimers.current.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }
      
      // 存储待更新的值
      pendingUpdates.current.set(key, value);
      
      // 设置新的定时器
      const timer = setTimeout(() => {
        const pendingValue = pendingUpdates.current.get(key);
        if (pendingValue !== undefined) {
          setter(pendingValue);
          pendingUpdates.current.delete(key);
          updateTimers.current.delete(key);
          
          logger.debug(`${componentName} 状态更新已执行`, { key });
        }
      }, debounceTime);
      
      updateTimers.current.set(key, timer);
    }, [componentName, debounceTime]);

    // 清理定时器
    useEffect(() => {
      return () => {
        updateTimers.current.forEach(timer => clearTimeout(timer));
        updateTimers.current.clear();
        pendingUpdates.current.clear();
      };
    }, []);

    return debouncedStateUpdate;
  }

  /**
   * 获取或创建组件状态
   */
  private getOrCreateComponentState(componentName: string): ComponentRenderState {
    if (!this.componentStates.has(componentName)) {
      this.componentStates.set(componentName, {
        renderCount: 0,
        lastRenderTime: 0,
        renderTimes: [],
        isOptimized: false,
        subscriptions: new Set(),
        cacheKeys: new Set()
      });
    }
    return this.componentStates.get(componentName)!;
  }

  /**
   * 启动性能监控
   */
  private startPerformanceMonitoring() {
    setInterval(() => {
      this.checkPerformanceIssues();
    }, 10000); // 每10秒检查一次
  }

  /**
   * 检查性能问题
   */
  private checkPerformanceIssues() {
    this.componentStates.forEach((state, componentName) => {
      const now = Date.now();
      
      // 检查渲染频率
      const recentRenders = state.renderTimes.filter(time => now - time < 1000);
      if (recentRenders.length > this.config.renderThreshold) {
        logger.warn(`${componentName} 渲染过于频繁`, {
          renderCount: recentRenders.length,
          threshold: this.config.renderThreshold
        });
      }
      
      // 检查内存使用
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > this.config.memoryThreshold) {
          logger.warn(`${componentName} 可能存在内存泄漏`, {
            memoryUsage: memory.usedJSHeapSize,
            threshold: this.config.memoryThreshold
          });
        }
      }
      
      // 检查缓存命中率
      const cacheStats = optimizedQueryCache.getStats();
      const hitRate = cacheStats.hitCount / (cacheStats.hitCount + cacheStats.missCount);
      if (hitRate < this.config.cacheHitRateThreshold) {
        logger.warn(`${componentName} 缓存命中率过低`, {
          hitRate,
          threshold: this.config.cacheHitRateThreshold
        });
      }
    });
  }

  /**
   * 获取性能统计
   */
  public getPerformanceStats() {
    const stats = {
      componentCount: this.componentStates.size,
      totalRenderCount: 0,
      totalSubscriptions: 0,
      totalCacheKeys: 0,
      components: {} as Record<string, any>
    };

    this.componentStates.forEach((state, componentName) => {
      stats.totalRenderCount += state.renderCount;
      stats.totalSubscriptions += state.subscriptions.size;
      stats.totalCacheKeys += state.cacheKeys.size;
      
      stats.components[componentName] = {
        renderCount: state.renderCount,
        subscriptions: state.subscriptions.size,
        cacheKeys: state.cacheKeys.size,
        isOptimized: state.isOptimized
      };
    });

    return stats;
  }

  /**
   * 重置性能统计
   */
  public resetStats() {
    this.componentStates.clear();
    logger.info('性能统计已重置');
  }
}

// 导出单例实例
export const performanceCriticalFixes = PerformanceCriticalFixes.getInstance();

/**
 * 性能修复 Hook
 */
export function usePerformanceFixes(componentName: string) {
  const renderOptimizer = performanceCriticalFixes.fixEnhancedSkillSystemRendering(componentName);
  const subscriptionManager = performanceCriticalFixes.fixRealtimeSubscriptionLeaks(componentName);
  const cacheManager = performanceCriticalFixes.optimizeQueryCache(componentName);
  const stateOptimizer = performanceCriticalFixes.fixStateThrashing(componentName);

  return {
    renderOptimizer,
    subscriptionManager,
    cacheManager,
    stateOptimizer,
    getStats: () => performanceCriticalFixes.getPerformanceStats()
  };
}

/**
 * EnhancedSkillSystem 专用性能修复 Hook
 */
export function useEnhancedSkillSystemFixes() {
  const fixes = usePerformanceFixes('EnhancedSkillSystem');
  
  // 预加载关键缓存
  useEffect(() => {
    fixes.cacheManager.preload([
      {
        key: 'skill-configs',
        fetcher: async () => {
          // 预加载技能配置
          return {};
        },
        ttl: 10 * 60 * 1000 // 10分钟
      }
    ]);
  }, [fixes.cacheManager]);

  return fixes;
}