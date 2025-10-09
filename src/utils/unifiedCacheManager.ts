/**
 * 文件级注释：统一缓存管理器
 * 
 * 该文件实现了一个统一的缓存管理系统，集成了项目中的所有缓存组件：
 * - EnhancedQueryCacheStrategy（增强查询缓存策略）
 * - QueryCacheOptimizer（查询缓存优化器）
 * - OptimizedQueryCache（优化查询缓存）
 * - IntelligentCacheStrategy（智能缓存策略）
 * - SkillSystemCache（技能系统缓存）
 * 
 * 主要功能：
 * - 统一缓存接口
 * - 智能路由和负载均衡
 * - 全局缓存监控和管理
 * - 缓存策略协调
 * - 性能优化和自动调优
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { 
  EnhancedQueryCacheStrategy, 
  EnhancedCacheConfig, 
  EnhancedQueryContext,
  QueryPriority,
  CacheLevel,
  PerformanceMetrics as EnhancedPerformanceMetrics,
  OptimizationRecommendation
} from './enhancedQueryCacheStrategy';
import { QueryCacheOptimizer } from './queryCacheOptimizer';
import { optimizedQueryCache } from './optimizedQueryCache';
import { IntelligentCacheStrategy } from './intelligentCacheStrategy';
import { createLogger } from '@/lib/logger';

const logger = createLogger('unified-cache-manager');

/**
 * 缓存提供者类型枚举
 */
export enum CacheProvider {
  ENHANCED_STRATEGY = 'enhanced_strategy',
  QUERY_OPTIMIZER = 'query_optimizer', 
  OPTIMIZED_CACHE = 'optimized_cache',
  INTELLIGENT_STRATEGY = 'intelligent_strategy',
  AUTO_SELECT = 'auto_select'
}

/**
 * 缓存操作类型枚举
 */
export enum CacheOperation {
  GET = 'get',
  SET = 'set',
  DELETE = 'delete',
  CLEAR = 'clear',
  BATCH_GET = 'batch_get',
  BATCH_SET = 'batch_set'
}

/**
 * 接口注释：统一缓存配置
 */
export interface UnifiedCacheConfig {
  // 默认提供者
  defaultProvider: CacheProvider;
  
  // 路由规则
  routingRules: CacheRoutingRule[];
  
  // 负载均衡配置
  loadBalancing: {
    enabled: boolean;
    strategy: 'round_robin' | 'least_loaded' | 'performance_based';
    healthCheckInterval: number;
  };
  
  // 监控配置
  monitoring: {
    enabled: boolean;
    metricsInterval: number;
    alertThresholds: {
      errorRate: number;
      responseTime: number;
      memoryUsage: number;
    };
  };
  
  // 故障转移配置
  failover: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
    fallbackProvider: CacheProvider;
  };
  
  // 性能优化配置
  optimization: {
    autoTuning: boolean;
    adaptiveRouting: boolean;
    predictivePreloading: boolean;
  };
}

/**
 * 接口注释：缓存路由规则
 */
export interface CacheRoutingRule {
  id: string;
  name: string;
  condition: CacheCondition;
  provider: CacheProvider;
  priority: number;
  enabled: boolean;
}

/**
 * 接口注释：缓存条件
 */
export interface CacheCondition {
  keyPattern?: RegExp;
  dataSize?: { min?: number; max?: number };
  priority?: QueryPriority[];
  operation?: CacheOperation[];
  tags?: string[];
  customCondition?: (context: any) => boolean;
}

/**
 * 接口注释：缓存请求上下文
 */
export interface CacheRequestContext {
  key: string;
  operation: CacheOperation;
  priority: QueryPriority;
  tags: string[];
  dataSize?: number;
  ttl?: number;
  metadata?: Record<string, any>;
  retryCount?: number;
}

/**
 * 接口注释：缓存响应
 */
export interface CacheResponse<T = any> {
  success: boolean;
  data?: T;
  provider: CacheProvider;
  responseTime: number;
  fromCache: boolean;
  error?: Error;
  metadata?: Record<string, any>;
}

/**
 * 接口注释：提供者健康状态
 */
export interface ProviderHealth {
  provider: CacheProvider;
  healthy: boolean;
  responseTime: number;
  errorRate: number;
  memoryUsage: number;
  lastCheck: number;
  consecutiveFailures: number;
}

/**
 * 接口注释：统一缓存统计
 */
export interface UnifiedCacheStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  overallHitRate: number;
  
  // 按提供者分组的统计
  providerStats: Map<CacheProvider, ProviderStats>;
  
  // 按操作分组的统计
  operationStats: Map<CacheOperation, OperationStats>;
  
  // 健康状态
  providerHealth: Map<CacheProvider, ProviderHealth>;
  
  // 路由统计
  routingStats: Map<string, number>;
}

/**
 * 接口注释：提供者统计
 */
export interface ProviderStats {
  requests: number;
  successes: number;
  failures: number;
  averageResponseTime: number;
  hitRate: number;
  memoryUsage: number;
}

/**
 * 接口注释：操作统计
 */
export interface OperationStats {
  count: number;
  averageResponseTime: number;
  successRate: number;
}

/**
 * 类级注释：统一缓存管理器
 * 
 * 提供统一的缓存管理接口，集成多个缓存提供者：
 * - 智能路由和负载均衡
 * - 故障转移和容错处理
 * - 性能监控和优化
 * - 自适应缓存策略
 */
export class UnifiedCacheManager {
  private static instance: UnifiedCacheManager;
  
  // 核心组件
  private config: UnifiedCacheConfig;
  private enhancedStrategy: EnhancedQueryCacheStrategy;
  private queryOptimizer: QueryCacheOptimizer;
  private intelligentStrategy: IntelligentCacheStrategy;
  
  // 状态管理
  private stats: UnifiedCacheStats;
  private providerHealth: Map<CacheProvider, ProviderHealth> = new Map();
  private routingRules: CacheRoutingRule[];
  private currentProviderIndex = 0;
  
  // 定时器
  private healthCheckTimer: NodeJS.Timeout | null = null;
  private metricsTimer: NodeJS.Timeout | null = null;
  private optimizationTimer: NodeJS.Timeout | null = null;

  /**
   * 函数级注释：构造函数
   * 初始化统一缓存管理器
   */
  private constructor(config?: Partial<UnifiedCacheConfig>) {
    this.config = {
      defaultProvider: CacheProvider.AUTO_SELECT,
      routingRules: this.getDefaultRoutingRules(),
      loadBalancing: {
        enabled: true,
        strategy: 'performance_based',
        healthCheckInterval: 30000
      },
      monitoring: {
        enabled: true,
        metricsInterval: 10000,
        alertThresholds: {
          errorRate: 0.1,
          responseTime: 1000,
          memoryUsage: 0.8
        }
      },
      failover: {
        enabled: true,
        maxRetries: 3,
        retryDelay: 1000,
        fallbackProvider: CacheProvider.OPTIMIZED_CACHE
      },
      optimization: {
        autoTuning: true,
        adaptiveRouting: true,
        predictivePreloading: true
      },
      ...config
    };

    this.initializeProviders();
    this.initializeStats();
    this.routingRules = this.config.routingRules;
    this.startHealthChecks();
    this.startMetricsCollection();
    this.startOptimization();
  }

  /**
   * 函数级注释：获取单例实例
   */
  public static getInstance(config?: Partial<UnifiedCacheConfig>): UnifiedCacheManager {
    if (!UnifiedCacheManager.instance) {
      UnifiedCacheManager.instance = new UnifiedCacheManager(config);
    }
    return UnifiedCacheManager.instance;
  }

  /**
   * 函数级注释：统一缓存获取
   * 智能路由到最适合的缓存提供者
   */
  public async get<T>(
    key: string, 
    options?: {
      priority?: QueryPriority;
      tags?: string[];
      provider?: CacheProvider;
      fallback?: () => Promise<T>;
    }
  ): Promise<CacheResponse<T>> {
    const startTime = performance.now();
    const context: CacheRequestContext = {
      key,
      operation: CacheOperation.GET,
      priority: options?.priority || QueryPriority.NORMAL,
      tags: options?.tags || [],
      retryCount: 0
    };

    try {
      // 选择最佳提供者
      const provider = options?.provider || this.selectOptimalProvider(context);
      
      // 执行缓存获取
      const result = await this.executeWithProvider<T>(provider, 'get', key, context);
      
      // 记录成功统计
      this.recordSuccess(provider, performance.now() - startTime, true);
      
      return {
        success: true,
        data: result,
        provider,
        responseTime: performance.now() - startTime,
        fromCache: result !== null
      };
    } catch (error) {
      // 尝试故障转移
      if (this.config.failover.enabled && context.retryCount! < this.config.failover.maxRetries) {
        return this.handleFailover(context, options?.fallback);
      }

      // 记录失败统计
      this.recordFailure(this.config.defaultProvider, performance.now() - startTime);
      
      // 如果有fallback函数，执行它
      if (options?.fallback) {
        try {
          const fallbackResult = await options.fallback();
          return {
            success: true,
            data: fallbackResult,
            provider: CacheProvider.AUTO_SELECT,
            responseTime: performance.now() - startTime,
            fromCache: false
          };
        } catch (fallbackError) {
          return {
            success: false,
            provider: CacheProvider.AUTO_SELECT,
            responseTime: performance.now() - startTime,
            fromCache: false,
            error: fallbackError as Error
          };
        }
      }

      return {
        success: false,
        provider: this.config.defaultProvider,
        responseTime: performance.now() - startTime,
        fromCache: false,
        error: error as Error
      };
    }
  }

  /**
   * 函数级注释：统一缓存设置
   * 智能选择最适合的缓存提供者进行存储
   */
  public async set<T>(
    key: string, 
    value: T, 
    options?: {
      ttl?: number;
      priority?: QueryPriority;
      tags?: string[];
      provider?: CacheProvider;
      level?: CacheLevel;
    }
  ): Promise<CacheResponse<boolean>> {
    const startTime = performance.now();
    const dataSize = this.calculateDataSize(value);
    const context: CacheRequestContext = {
      key,
      operation: CacheOperation.SET,
      priority: options?.priority || QueryPriority.NORMAL,
      tags: options?.tags || [],
      dataSize,
      ttl: options?.ttl,
      retryCount: 0
    };

    try {
      // 选择最佳提供者
      const provider = options?.provider || this.selectOptimalProvider(context);
      
      // 执行缓存设置
      await this.executeWithProvider(provider, 'set', key, context, value, options);
      
      // 记录成功统计
      this.recordSuccess(provider, performance.now() - startTime, false);
      
      return {
        success: true,
        data: true,
        provider,
        responseTime: performance.now() - startTime,
        fromCache: false
      };
    } catch (error) {
      // 尝试故障转移
      if (this.config.failover.enabled && context.retryCount! < this.config.failover.maxRetries) {
        context.retryCount!++;
        return this.set(key, value, options);
      }

      // 记录失败统计
      this.recordFailure(this.config.defaultProvider, performance.now() - startTime);
      
      return {
        success: false,
        data: false,
        provider: this.config.defaultProvider,
        responseTime: performance.now() - startTime,
        fromCache: false,
        error: error as Error
      };
    }
  }

  /**
   * 函数级注释：批量缓存获取
   * 优化的批量获取操作
   */
  public async batchGet<T>(
    keys: string[], 
    options?: {
      priority?: QueryPriority;
      tags?: string[];
      provider?: CacheProvider;
    }
  ): Promise<Map<string, CacheResponse<T>>> {
    const results = new Map<string, CacheResponse<T>>();
    
    // 按提供者分组键
    const keysByProvider = this.groupKeysByProvider(keys, options);
    
    // 并行执行批量获取
    const promises = Array.from(keysByProvider.entries()).map(async ([provider, providerKeys]) => {
      try {
        const batchResults = await this.executeBatchWithProvider<T>(provider, 'batchGet', providerKeys, options);
        for (const [key, result] of batchResults.entries()) {
          results.set(key, result);
        }
      } catch (error) {
        // 为失败的键设置错误响应
        for (const key of providerKeys) {
          results.set(key, {
            success: false,
            provider,
            responseTime: 0,
            fromCache: false,
            error: error as Error
          });
        }
      }
    });

    await Promise.all(promises);
    return results;
  }

  /**
   * 函数级注释：选择最优提供者
   * 基于路由规则、负载均衡和性能指标选择最佳缓存提供者
   */
  private selectOptimalProvider(context: CacheRequestContext): CacheProvider {
    // 检查路由规则
    const matchedRule = this.findMatchingRule(context);
    if (matchedRule && matchedRule.enabled) {
      const provider = matchedRule.provider;
      if (this.isProviderHealthy(provider)) {
        return provider;
      }
    }

    // 自动选择策略
    if (this.config.defaultProvider === CacheProvider.AUTO_SELECT) {
      return this.selectByLoadBalancing(context);
    }

    return this.config.defaultProvider;
  }

  /**
   * 函数级注释：查找匹配的路由规则
   */
  private findMatchingRule(context: CacheRequestContext): CacheRoutingRule | null {
    // 按优先级排序规则
    const sortedRules = [...this.routingRules].sort((a, b) => b.priority - a.priority);
    
    for (const rule of sortedRules) {
      if (this.evaluateCondition(rule.condition, context)) {
        return rule;
      }
    }
    
    return null;
  }

  /**
   * 函数级注释：评估路由条件
   */
  private evaluateCondition(condition: CacheCondition, context: CacheRequestContext): boolean {
    // 检查键模式
    if (condition.keyPattern && !condition.keyPattern.test(context.key)) {
      return false;
    }

    // 检查数据大小
    if (condition.dataSize && context.dataSize !== undefined) {
      const { min, max } = condition.dataSize;
      if (min !== undefined && context.dataSize < min) return false;
      if (max !== undefined && context.dataSize > max) return false;
    }

    // 检查优先级
    if (condition.priority && !condition.priority.includes(context.priority)) {
      return false;
    }

    // 检查操作类型
    if (condition.operation && !condition.operation.includes(context.operation)) {
      return false;
    }

    // 检查标签
    if (condition.tags && condition.tags.length > 0) {
      const hasMatchingTag = condition.tags.some(tag => context.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // 检查自定义条件
    if (condition.customCondition && !condition.customCondition(context)) {
      return false;
    }

    return true;
  }

  /**
   * 函数级注释：负载均衡选择
   */
  private selectByLoadBalancing(context: CacheRequestContext): CacheProvider {
    const healthyProviders = this.getHealthyProviders();
    
    if (healthyProviders.length === 0) {
      return this.config.failover.fallbackProvider;
    }

    switch (this.config.loadBalancing.strategy) {
      case 'round_robin':
        return this.selectRoundRobin(healthyProviders);
      
      case 'least_loaded':
        return this.selectLeastLoaded(healthyProviders);
      
      case 'performance_based':
        return this.selectPerformanceBased(healthyProviders, context);
      
      default:
        return healthyProviders[0];
    }
  }

  /**
   * 函数级注释：轮询选择
   */
  private selectRoundRobin(providers: CacheProvider[]): CacheProvider {
    const provider = providers[this.currentProviderIndex % providers.length];
    this.currentProviderIndex++;
    return provider;
  }

  /**
   * 函数级注释：最少负载选择
   */
  private selectLeastLoaded(providers: CacheProvider[]): CacheProvider {
    let leastLoadedProvider = providers[0];
    let minLoad = this.getProviderLoad(leastLoadedProvider);

    for (const provider of providers.slice(1)) {
      const load = this.getProviderLoad(provider);
      if (load < minLoad) {
        minLoad = load;
        leastLoadedProvider = provider;
      }
    }

    return leastLoadedProvider;
  }

  /**
   * 函数级注释：基于性能选择
   */
  private selectPerformanceBased(providers: CacheProvider[], context: CacheRequestContext): CacheProvider {
    let bestProvider = providers[0];
    let bestScore = this.calculatePerformanceScore(bestProvider, context);

    for (const provider of providers.slice(1)) {
      const score = this.calculatePerformanceScore(provider, context);
      if (score > bestScore) {
        bestScore = score;
        bestProvider = provider;
      }
    }

    return bestProvider;
  }

  /**
   * 函数级注释：计算性能分数
   */
  private calculatePerformanceScore(provider: CacheProvider, context: CacheRequestContext): number {
    const health = this.providerHealth.get(provider);
    if (!health || !health.healthy) return 0;

    const stats = this.stats.providerStats.get(provider);
    if (!stats) return 0.5;

    // 综合评分：响应时间(40%) + 命中率(30%) + 成功率(20%) + 内存使用(10%)
    const responseTimeScore = Math.max(0, 1 - (health.responseTime / 1000));
    const hitRateScore = stats.hitRate;
    const successRateScore = stats.successes / Math.max(1, stats.requests);
    const memoryScore = Math.max(0, 1 - (health.memoryUsage / 100));

    return (
      responseTimeScore * 0.4 +
      hitRateScore * 0.3 +
      successRateScore * 0.2 +
      memoryScore * 0.1
    );
  }

  /**
   * 函数级注释：执行提供者操作
   */
  private async executeWithProvider<T>(
    provider: CacheProvider, 
    operation: string, 
    key: string, 
    context: CacheRequestContext,
    ...args: any[]
  ): Promise<T> {
    switch (provider) {
      case CacheProvider.ENHANCED_STRATEGY:
        return this.executeEnhancedStrategy<T>(operation, key, context, ...args);
      
      case CacheProvider.QUERY_OPTIMIZER:
        return this.executeQueryOptimizer<T>(operation, key, context, ...args);
      
      case CacheProvider.OPTIMIZED_CACHE:
        return this.executeOptimizedCache<T>(operation, key, context, ...args);
      
      case CacheProvider.INTELLIGENT_STRATEGY:
        return this.executeIntelligentStrategy<T>(operation, key, context, ...args);
      
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  /**
   * 函数级注释：执行增强策略操作
   */
  private async executeEnhancedStrategy<T>(
    operation: string, 
    key: string, 
    context: CacheRequestContext,
    ...args: any[]
  ): Promise<T> {
    const enhancedContext: EnhancedQueryContext = {
      key,
      priority: context.priority,
      tags: context.tags,
      cacheable: true,
      level: CacheLevel.L1_MEMORY,
      customTTL: context.ttl
    };

    if (operation === 'get') {
      // 对于get操作，需要提供查询函数
      const queryFn = async () => null; // 返回null表示缓存未命中
      return this.enhancedStrategy.executeQuery(enhancedContext, queryFn);
    } else if (operation === 'set') {
      // 对于set操作，直接存储到缓存中
      const [value] = args;
      const queryFn = async () => value;
      return this.enhancedStrategy.executeQuery(enhancedContext, queryFn);
    }

    throw new Error(`Unsupported operation: ${operation}`);
  }

  /**
   * 函数级注释：执行查询优化器操作
   */
  private async executeQueryOptimizer<T>(
    operation: string, 
    key: string, 
    context: CacheRequestContext,
    ...args: any[]
  ): Promise<T> {
    if (operation === 'get') {
      const queryContext = {
        queryId: key,
        queryType: 'cache_get',
        params: {},
        priority: this.mapPriorityToNumber(context.priority),
        cacheable: true,
        customTtl: context.ttl
      };
      
      return this.queryOptimizer.executeQuery(key, async () => null, queryContext);
    } else if (operation === 'set') {
      // QueryOptimizer主要用于查询，set操作通过其内部缓存处理
      const [value] = args;
      return value;
    }

    throw new Error(`Unsupported operation: ${operation}`);
  }

  /**
   * 函数级注释：执行优化缓存操作
   */
  private async executeOptimizedCache<T>(
    operation: string, 
    key: string, 
    context: CacheRequestContext,
    ...args: any[]
  ): Promise<T> {
    if (operation === 'get') {
      return optimizedQueryCache.get<T>(key);
    } else if (operation === 'set') {
      const [value, options] = args;
      await optimizedQueryCache.set(key, value, {
        ttl: context.ttl || options?.ttl,
        tags: context.tags,
        priority: this.mapPriorityToNumber(context.priority)
      });
      return value;
    }

    throw new Error(`Unsupported operation: ${operation}`);
  }

  /**
   * 函数级注释：执行智能策略操作
   */
  private async executeIntelligentStrategy<T>(
    operation: string, 
    key: string, 
    context: CacheRequestContext,
    ...args: any[]
  ): Promise<T> {
    if (operation === 'get') {
      return this.intelligentStrategy.get<T>(key, async () => null, {
        priority: context.priority,
        tags: context.tags,
        ttl: context.ttl
      });
    } else if (operation === 'set') {
      const [value] = args;
      return this.intelligentStrategy.get<T>(key, async () => value, {
        priority: context.priority,
        tags: context.tags,
        ttl: context.ttl
      });
    }

    throw new Error(`Unsupported operation: ${operation}`);
  }

  /**
   * 函数级注释：获取统计信息
   */
  public getStats(): UnifiedCacheStats {
    this.updateStats();
    return { ...this.stats };
  }

  /**
   * 函数级注释：获取优化建议
   */
  public getOptimizationRecommendations(): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    
    // 分析各提供者性能
    for (const [provider, stats] of this.stats.providerStats.entries()) {
      if (stats.hitRate < 0.7) {
        recommendations.push({
          type: 'strategy',
          priority: 'high',
          description: `${provider} 缓存命中率较低 (${(stats.hitRate * 100).toFixed(1)}%)`,
          expectedImprovement: 0.2,
          implementation: '考虑调整TTL策略或增加预加载',
          impact: { hitRate: 0.2 }
        });
      }

      if (stats.averageResponseTime > 500) {
        recommendations.push({
          type: 'ttl',
          priority: 'medium',
          description: `${provider} 响应时间较慢 (${stats.averageResponseTime.toFixed(0)}ms)`,
          expectedImprovement: 0.3,
          implementation: '优化缓存存储结构或增加内存分配',
          impact: { responseTime: -200 }
        });
      }
    }

    return recommendations;
  }

  // 辅助方法实现...
  private initializeProviders(): void {
    this.enhancedStrategy = EnhancedQueryCacheStrategy.getInstance();
    this.queryOptimizer = QueryCacheOptimizer.getInstance();
    this.intelligentStrategy = IntelligentCacheStrategy.getInstance();
  }

  private initializeStats(): void {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      overallHitRate: 0,
      providerStats: new Map(),
      operationStats: new Map(),
      providerHealth: new Map(),
      routingStats: new Map()
    };

    // 初始化提供者统计
    Object.values(CacheProvider).forEach(provider => {
      if (provider !== CacheProvider.AUTO_SELECT) {
        this.stats.providerStats.set(provider, {
          requests: 0,
          successes: 0,
          failures: 0,
          averageResponseTime: 0,
          hitRate: 0,
          memoryUsage: 0
        });

        this.providerHealth.set(provider, {
          provider,
          healthy: true,
          responseTime: 0,
          errorRate: 0,
          memoryUsage: 0,
          lastCheck: Date.now(),
          consecutiveFailures: 0
        });
      }
    });
  }

  private getDefaultRoutingRules(): CacheRoutingRule[] {
    return [
      {
        id: 'large-data',
        name: '大数据路由到压缩缓存',
        condition: {
          dataSize: { min: 10240 } // 10KB以上
        },
        provider: CacheProvider.ENHANCED_STRATEGY,
        priority: 100,
        enabled: true
      },
      {
        id: 'high-priority',
        name: '高优先级路由到增强策略',
        condition: {
          priority: [QueryPriority.CRITICAL, QueryPriority.HIGH]
        },
        provider: CacheProvider.ENHANCED_STRATEGY,
        priority: 90,
        enabled: true
      },
      {
        id: 'skill-system',
        name: '技能系统路由到智能策略',
        condition: {
          keyPattern: /^skill:/
        },
        provider: CacheProvider.INTELLIGENT_STRATEGY,
        priority: 80,
        enabled: true
      },
      {
        id: 'query-optimization',
        name: '查询优化路由',
        condition: {
          tags: ['query', 'database']
        },
        provider: CacheProvider.QUERY_OPTIMIZER,
        priority: 70,
        enabled: true
      }
    ];
  }

  private startHealthChecks(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }

    this.healthCheckTimer = setInterval(() => {
      this.performHealthChecks();
    }, this.config.loadBalancing.healthCheckInterval);
  }

  private startMetricsCollection(): void {
    if (this.metricsTimer) {
      clearInterval(this.metricsTimer);
    }

    this.metricsTimer = setInterval(() => {
      this.collectMetrics();
    }, this.config.monitoring.metricsInterval);
  }

  private startOptimization(): void {
    if (!this.config.optimization.autoTuning) return;

    if (this.optimizationTimer) {
      clearInterval(this.optimizationTimer);
    }

    this.optimizationTimer = setInterval(() => {
      this.performOptimization();
    }, 60000); // 每分钟优化一次
  }

  // 更多辅助方法的占位符实现...
  private calculateDataSize(data: any): number {
    try {
      return JSON.stringify(data).length * 2;
    } catch {
      return 1000;
    }
  }

  private mapPriorityToNumber(priority: QueryPriority): number {
    switch (priority) {
      case QueryPriority.CRITICAL: return 5;
      case QueryPriority.HIGH: return 4;
      case QueryPriority.NORMAL: return 3;
      case QueryPriority.LOW: return 2;
      case QueryPriority.BACKGROUND: return 1;
      default: return 3;
    }
  }

  private isProviderHealthy(provider: CacheProvider): boolean {
    const health = this.providerHealth.get(provider);
    return health ? health.healthy : false;
  }

  private getHealthyProviders(): CacheProvider[] {
    return Array.from(this.providerHealth.entries())
      .filter(([_, health]) => health.healthy)
      .map(([provider, _]) => provider);
  }

  private getProviderLoad(provider: CacheProvider): number {
    const stats = this.stats.providerStats.get(provider);
    return stats ? stats.requests : 0;
  }

  private recordSuccess(provider: CacheProvider, responseTime: number, fromCache: boolean): void {
    // 实现成功记录逻辑
  }

  private recordFailure(provider: CacheProvider, responseTime: number): void {
    // 实现失败记录逻辑
  }

  private async handleFailover<T>(
    context: CacheRequestContext, 
    fallback?: () => Promise<T>
  ): Promise<CacheResponse<T>> {
    // 实现故障转移逻辑
    return {
      success: false,
      provider: this.config.failover.fallbackProvider,
      responseTime: 0,
      fromCache: false
    };
  }

  private groupKeysByProvider(
    keys: string[], 
    options?: any
  ): Map<CacheProvider, string[]> {
    // 实现键分组逻辑
    return new Map();
  }

  private async executeBatchWithProvider<T>(
    provider: CacheProvider, 
    operation: string, 
    keys: string[], 
    options?: any
  ): Promise<Map<string, CacheResponse<T>>> {
    // 实现批量执行逻辑
    return new Map();
  }

  private performHealthChecks(): void {
    // 实现健康检查逻辑
  }

  private collectMetrics(): void {
    // 实现指标收集逻辑
  }

  private performOptimization(): void {
    // 实现优化逻辑
  }

  private updateStats(): void {
    // 实现统计更新逻辑
  }
}

/**
 * 函数级注释：统一缓存管理Hook
 * React Hook，用于在组件中使用统一缓存管理器
 */
export function useUnifiedCacheManager(config?: Partial<UnifiedCacheConfig>) {
  const manager = UnifiedCacheManager.getInstance(config);
  const [stats, setStats] = useState<UnifiedCacheStats | null>(null);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);

  useEffect(() => {
    const updateMetrics = () => {
      setStats(manager.getStats());
      setRecommendations(manager.getOptimizationRecommendations());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000);

    return () => clearInterval(interval);
  }, [manager]);

  const get = useCallback(
    async <T>(key: string, options?: any): Promise<CacheResponse<T>> => {
      return manager.get<T>(key, options);
    },
    [manager]
  );

  const set = useCallback(
    async <T>(key: string, value: T, options?: any): Promise<CacheResponse<boolean>> => {
      return manager.set(key, value, options);
    },
    [manager]
  );

  const batchGet = useCallback(
    async <T>(keys: string[], options?: any): Promise<Map<string, CacheResponse<T>>> => {
      return manager.batchGet<T>(keys, options);
    },
    [manager]
  );

  return {
    get,
    set,
    batchGet,
    stats,
    recommendations,
    getStats: manager.getStats.bind(manager),
    getOptimizationRecommendations: manager.getOptimizationRecommendations.bind(manager)
  };
}

// 导出单例实例
export const unifiedCacheManager = UnifiedCacheManager.getInstance();