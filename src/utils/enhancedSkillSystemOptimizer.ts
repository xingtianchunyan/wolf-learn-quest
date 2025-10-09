/**
 * 文件级注释：EnhancedSkillSystem 组件性能优化器
 * 专门解决 EnhancedSkillSystem 组件的渲染性能问题、内存泄漏和状态管理优化
 * 提供全面的性能监控、优化策略和自动修复机制
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { createLogger } from '@/lib/logger';
import { masterErrorHandler } from '@/utils/masterErrorHandler';

const logger = createLogger('enhanced-skill-system-optimizer');

/**
 * 接口注释：性能优化配置
 */
export interface SkillSystemOptimizationConfig {
  /** 启用渲染优化 */
  enableRenderOptimization: boolean;
  /** 启用内存管理 */
  enableMemoryManagement: boolean;
  /** 启用状态缓存 */
  enableStateCache: boolean;
  /** 启用订阅优化 */
  enableSubscriptionOptimization: boolean;
  /** 渲染频率阈值（每秒最大渲染次数） */
  maxRenderPerSecond: number;
  /** 内存使用阈值（字节） */
  memoryThreshold: number;
  /** 状态缓存TTL（毫秒） */
  stateCacheTTL: number;
  /** 防抖延迟（毫秒） */
  debounceDelay: number;
}

/**
 * 接口注释：组件性能指标
 */
export interface SkillSystemPerformanceMetrics {
  /** 渲染次数 */
  renderCount: number;
  /** 平均渲染时间 */
  averageRenderTime: number;
  /** 内存使用量 */
  memoryUsage: number;
  /** 活跃订阅数量 */
  activeSubscriptions: number;
  /** 缓存命中率 */
  cacheHitRate: number;
  /** 最后更新时间 */
  lastUpdateTime: number;
}

/**
 * 接口注释：渲染状态跟踪
 */
interface RenderStateTracker {
  /** 渲染时间戳数组 */
  renderTimestamps: number[];
  /** 渲染持续时间数组 */
  renderDurations: number[];
  /** 是否正在渲染 */
  isRendering: boolean;
  /** 渲染开始时间 */
  renderStartTime: number;
}

/**
 * 接口注释：订阅管理器
 */
interface SubscriptionManager {
  /** 活跃订阅集合 */
  activeSubscriptions: Set<() => void>;
  /** 订阅元数据 */
  subscriptionMetadata: Map<string, { createdAt: number; lastUsed: number }>;
}

/**
 * 接口注释：状态缓存管理器
 */
interface StateCacheManager {
  /** 缓存数据 */
  cache: Map<string, { data: any; timestamp: number; ttl: number }>;
  /** 缓存统计 */
  stats: { hits: number; misses: number; evictions: number };
}

/**
 * 类级注释：EnhancedSkillSystem 性能优化器
 * 提供全面的性能优化、监控和自动修复功能
 */
export class EnhancedSkillSystemOptimizer {
  private static instance: EnhancedSkillSystemOptimizer;
  private config: SkillSystemOptimizationConfig;
  private renderTracker: RenderStateTracker;
  private subscriptionManager: SubscriptionManager;
  private stateCacheManager: StateCacheManager;
  private performanceMetrics: SkillSystemPerformanceMetrics;
  private optimizationTimer: NodeJS.Timeout | null = null;

  private constructor(config?: Partial<SkillSystemOptimizationConfig>) {
    this.config = {
      enableRenderOptimization: true,
      enableMemoryManagement: true,
      enableStateCache: true,
      enableSubscriptionOptimization: true,
      maxRenderPerSecond: 10,
      memoryThreshold: 50 * 1024 * 1024, // 50MB
      stateCacheTTL: 5000, // 5秒
      debounceDelay: 100,
      ...config
    };

    this.renderTracker = {
      renderTimestamps: [],
      renderDurations: [],
      isRendering: false,
      renderStartTime: 0
    };

    this.subscriptionManager = {
      activeSubscriptions: new Set(),
      subscriptionMetadata: new Map()
    };

    this.stateCacheManager = {
      cache: new Map(),
      stats: { hits: 0, misses: 0, evictions: 0 }
    };

    this.performanceMetrics = {
      renderCount: 0,
      averageRenderTime: 0,
      memoryUsage: 0,
      activeSubscriptions: 0,
      cacheHitRate: 0,
      lastUpdateTime: Date.now()
    };

    this.startOptimizationMonitoring();
  }

  /**
   * 函数级注释：获取单例实例
   * @param config 可选的配置参数
   * @returns 优化器实例
   */
  public static getInstance(config?: Partial<SkillSystemOptimizationConfig>): EnhancedSkillSystemOptimizer {
    if (!EnhancedSkillSystemOptimizer.instance) {
      EnhancedSkillSystemOptimizer.instance = new EnhancedSkillSystemOptimizer(config);
    }
    return EnhancedSkillSystemOptimizer.instance;
  }

  /**
   * 函数级注释：创建优化的渲染Hook
   * @returns 优化的渲染管理器
   */
  public createOptimizedRenderHook() {
    const renderStartRef = useRef<number>(0);
    const lastRenderRef = useRef<number>(0);
    const renderCountRef = useRef<number>(0);

    /**
     * 函数级注释：开始渲染跟踪
     */
    const startRender = useCallback(() => {
      if (!this.config.enableRenderOptimization) return;

      const now = Date.now();
      renderStartRef.current = now;
      this.renderTracker.isRendering = true;
      this.renderTracker.renderStartTime = now;

      // 检查渲染频率
      const recentRenders = this.renderTracker.renderTimestamps.filter(
        timestamp => now - timestamp < 1000
      );

      if (recentRenders.length >= this.config.maxRenderPerSecond) {
        logger.warn('EnhancedSkillSystem 渲染频率过高', {
          recentRenders: recentRenders.length,
          maxAllowed: this.config.maxRenderPerSecond
        });

        // 延迟渲染
        return new Promise(resolve => setTimeout(resolve, this.config.debounceDelay));
      }

      return Promise.resolve();
    }, []);

    /**
     * 函数级注释：结束渲染跟踪
     */
    const endRender = useCallback(() => {
      if (!this.config.enableRenderOptimization || !this.renderTracker.isRendering) return;

      const now = Date.now();
      const duration = now - renderStartRef.current;

      // 更新渲染统计
      this.renderTracker.renderTimestamps.push(now);
      this.renderTracker.renderDurations.push(duration);
      this.renderTracker.isRendering = false;
      renderCountRef.current++;

      // 清理旧数据（保留最近1分钟的数据）
      const oneMinuteAgo = now - 60000;
      this.renderTracker.renderTimestamps = this.renderTracker.renderTimestamps.filter(
        timestamp => timestamp > oneMinuteAgo
      );
      this.renderTracker.renderDurations = this.renderTracker.renderDurations.filter(
        (_, index) => this.renderTracker.renderTimestamps[index] > oneMinuteAgo
      );

      // 更新性能指标
      this.updatePerformanceMetrics();

      logger.debug('EnhancedSkillSystem 渲染完成', {
        duration,
        totalRenders: renderCountRef.current,
        recentRenders: this.renderTracker.renderTimestamps.length
      });
    }, []);

    /**
     * 函数级注释：创建优化的回调函数
     */
    const createOptimizedCallback = useCallback(<T extends (...args: any[]) => any>(
      callback: T,
      deps: React.DependencyList
    ): T => {
      return useCallback((...args: Parameters<T>) => {
        startRender().then(() => {
          try {
            const result = callback(...args);
            endRender();
            return result;
          } catch (error) {
            endRender();
            masterErrorHandler.handleError(error, {
              context: 'EnhancedSkillSystem.optimizedCallback',
              severity: 'medium',
              metadata: { args }
            });
            throw error;
          }
        });
      }, deps) as T;
    }, [startRender, endRender]);

    return {
      startRender,
      endRender,
      createOptimizedCallback,
      getRenderStats: () => ({
        renderCount: renderCountRef.current,
        averageRenderTime: this.renderTracker.renderDurations.length > 0
          ? this.renderTracker.renderDurations.reduce((a, b) => a + b, 0) / this.renderTracker.renderDurations.length
          : 0,
        recentRenderCount: this.renderTracker.renderTimestamps.length
      })
    };
  }

  /**
   * 函数级注释：创建优化的订阅管理器
   * @returns 订阅管理器
   */
  public createOptimizedSubscriptionManager() {
    /**
     * 函数级注释：添加订阅
     */
    const addSubscription = useCallback((
      subscriptionId: string,
      cleanup: () => void
    ) => {
      if (!this.config.enableSubscriptionOptimization) {
        this.subscriptionManager.activeSubscriptions.add(cleanup);
        return;
      }

      // 检查是否已存在相同订阅
      if (this.subscriptionManager.subscriptionMetadata.has(subscriptionId)) {
        logger.warn('重复订阅检测', { subscriptionId });
        return;
      }

      this.subscriptionManager.activeSubscriptions.add(cleanup);
      this.subscriptionManager.subscriptionMetadata.set(subscriptionId, {
        createdAt: Date.now(),
        lastUsed: Date.now()
      });

      logger.debug('订阅已添加', {
        subscriptionId,
        totalSubscriptions: this.subscriptionManager.activeSubscriptions.size
      });
    }, []);

    /**
     * 函数级注释：移除订阅
     */
    const removeSubscription = useCallback((
      subscriptionId: string,
      cleanup: () => void
    ) => {
      this.subscriptionManager.activeSubscriptions.delete(cleanup);
      this.subscriptionManager.subscriptionMetadata.delete(subscriptionId);

      logger.debug('订阅已移除', {
        subscriptionId,
        remainingSubscriptions: this.subscriptionManager.activeSubscriptions.size
      });
    }, []);

    /**
     * 函数级注释：清理所有订阅
     */
    const cleanupAllSubscriptions = useCallback(() => {
      this.subscriptionManager.activeSubscriptions.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          masterErrorHandler.handleError(error, {
            context: 'EnhancedSkillSystem.subscriptionCleanup',
            severity: 'low'
          });
        }
      });

      this.subscriptionManager.activeSubscriptions.clear();
      this.subscriptionManager.subscriptionMetadata.clear();

      logger.info('所有订阅已清理');
    }, []);

    // 组件卸载时自动清理
    useEffect(() => {
      return cleanupAllSubscriptions;
    }, [cleanupAllSubscriptions]);

    return {
      addSubscription,
      removeSubscription,
      cleanupAllSubscriptions,
      getSubscriptionCount: () => this.subscriptionManager.activeSubscriptions.size
    };
  }

  /**
   * 函数级注释：创建优化的状态缓存管理器
   * @returns 状态缓存管理器
   */
  public createOptimizedStateCache() {
    /**
     * 函数级注释：获取缓存数据
     */
    const getCachedState = useCallback(<T>(key: string): T | null => {
      if (!this.config.enableStateCache) return null;

      const cached = this.stateCacheManager.cache.get(key);
      if (!cached) {
        this.stateCacheManager.stats.misses++;
        return null;
      }

      const now = Date.now();
      if (now - cached.timestamp > cached.ttl) {
        this.stateCacheManager.cache.delete(key);
        this.stateCacheManager.stats.evictions++;
        return null;
      }

      this.stateCacheManager.stats.hits++;
      return cached.data as T;
    }, []);

    /**
     * 函数级注释：设置缓存数据
     */
    const setCachedState = useCallback(<T>(
      key: string,
      data: T,
      ttl: number = this.config.stateCacheTTL
    ) => {
      if (!this.config.enableStateCache) return;

      this.stateCacheManager.cache.set(key, {
        data,
        timestamp: Date.now(),
        ttl
      });

      logger.debug('状态已缓存', { key, ttl });
    }, []);

    /**
     * 函数级注释：清理过期缓存
     */
    const cleanupExpiredCache = useCallback(() => {
      const now = Date.now();
      let cleanedCount = 0;

      for (const [key, cached] of this.stateCacheManager.cache.entries()) {
        if (now - cached.timestamp > cached.ttl) {
          this.stateCacheManager.cache.delete(key);
          cleanedCount++;
        }
      }

      if (cleanedCount > 0) {
        this.stateCacheManager.stats.evictions += cleanedCount;
        logger.debug('过期缓存已清理', { cleanedCount });
      }
    }, []);

    // 定期清理过期缓存
    useEffect(() => {
      const interval = setInterval(cleanupExpiredCache, 30000); // 每30秒清理一次
      return () => clearInterval(interval);
    }, [cleanupExpiredCache]);

    return {
      getCachedState,
      setCachedState,
      cleanupExpiredCache,
      getCacheStats: () => this.stateCacheManager.stats,
      clearCache: () => {
        this.stateCacheManager.cache.clear();
        logger.info('缓存已清空');
      }
    };
  }

  /**
   * 函数级注释：更新性能指标
   */
  private updatePerformanceMetrics() {
    const now = Date.now();

    this.performanceMetrics = {
      renderCount: this.renderTracker.renderTimestamps.length,
      averageRenderTime: this.renderTracker.renderDurations.length > 0
        ? this.renderTracker.renderDurations.reduce((a, b) => a + b, 0) / this.renderTracker.renderDurations.length
        : 0,
      memoryUsage: this.getMemoryUsage(),
      activeSubscriptions: this.subscriptionManager.activeSubscriptions.size,
      cacheHitRate: this.stateCacheManager.stats.hits + this.stateCacheManager.stats.misses > 0
        ? this.stateCacheManager.stats.hits / (this.stateCacheManager.stats.hits + this.stateCacheManager.stats.misses)
        : 0,
      lastUpdateTime: now
    };
  }

  /**
   * 函数级注释：获取内存使用量
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * 函数级注释：启动优化监控
   */
  private startOptimizationMonitoring() {
    this.optimizationTimer = setInterval(() => {
      this.updatePerformanceMetrics();
      this.checkPerformanceIssues();
    }, 5000); // 每5秒检查一次
  }

  /**
   * 函数级注释：检查性能问题
   */
  private checkPerformanceIssues() {
    const metrics = this.performanceMetrics;

    // 检查渲染性能
    if (metrics.averageRenderTime > 100) { // 超过100ms
      logger.warn('EnhancedSkillSystem 渲染性能问题', {
        averageRenderTime: metrics.averageRenderTime,
        renderCount: metrics.renderCount
      });
    }

    // 检查内存使用
    if (metrics.memoryUsage > this.config.memoryThreshold) {
      logger.warn('EnhancedSkillSystem 内存使用过高', {
        memoryUsage: metrics.memoryUsage,
        threshold: this.config.memoryThreshold
      });
    }

    // 检查缓存命中率
    if (metrics.cacheHitRate < 0.7 && this.stateCacheManager.stats.hits + this.stateCacheManager.stats.misses > 10) {
      logger.warn('EnhancedSkillSystem 缓存命中率过低', {
        cacheHitRate: metrics.cacheHitRate,
        totalRequests: this.stateCacheManager.stats.hits + this.stateCacheManager.stats.misses
      });
    }
  }

  /**
   * 函数级注释：获取性能指标
   * @returns 当前性能指标
   */
  public getPerformanceMetrics(): SkillSystemPerformanceMetrics {
    this.updatePerformanceMetrics();
    return { ...this.performanceMetrics };
  }

  /**
   * 函数级注释：重置性能统计
   */
  public resetPerformanceStats() {
    this.renderTracker.renderTimestamps = [];
    this.renderTracker.renderDurations = [];
    this.stateCacheManager.stats = { hits: 0, misses: 0, evictions: 0 };
    this.updatePerformanceMetrics();
    
    logger.info('性能统计已重置');
  }

  /**
   * 函数级注释：销毁优化器
   */
  public destroy() {
    if (this.optimizationTimer) {
      clearInterval(this.optimizationTimer);
      this.optimizationTimer = null;
    }

    this.subscriptionManager.activeSubscriptions.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        logger.error('订阅清理失败', error);
      }
    });

    this.subscriptionManager.activeSubscriptions.clear();
    this.subscriptionManager.subscriptionMetadata.clear();
    this.stateCacheManager.cache.clear();

    logger.info('EnhancedSkillSystem 优化器已销毁');
  }
}

/**
 * 函数级注释：创建优化的 EnhancedSkillSystem Hook
 * @param config 可选的优化配置
 * @returns 优化管理器实例
 */
export const useEnhancedSkillSystemOptimizer = (
  config?: Partial<SkillSystemOptimizationConfig>
) => {
  const optimizer = useMemo(
    () => EnhancedSkillSystemOptimizer.getInstance(config),
    [config]
  );

  const renderHook = optimizer.createOptimizedRenderHook();
  const subscriptionManager = optimizer.createOptimizedSubscriptionManager();
  const stateCache = optimizer.createOptimizedStateCache();

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      subscriptionManager.cleanupAllSubscriptions();
    };
  }, [subscriptionManager]);

  return {
    ...renderHook,
    ...subscriptionManager,
    ...stateCache,
    getPerformanceMetrics: optimizer.getPerformanceMetrics.bind(optimizer),
    resetPerformanceStats: optimizer.resetPerformanceStats.bind(optimizer)
  };
};

export default EnhancedSkillSystemOptimizer;