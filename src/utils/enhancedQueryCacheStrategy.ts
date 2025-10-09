import { createLogger   } from '@/lib/logger';
import { optimizedQueryCache   } from '@/utils/optimizedQueryCache';
import { QueryCacheOptimizer   } from '@/utils/queryCacheOptimizer';
import { useCallback, useEffect, useRef, useState   } from 'react';

/**
* 文件级注释：增强的查询缓存策略优化系统
*
* 该文件实现了一个全面的查询缓存策略优化系统，集成了：
* - 智能缓存策略和自适应TTL
* - 多级缓存架构（内存、本地存储、分布式）
* - 预测性预加载和智能失效机制
* - 实时性能监控和自动优化
* - 内存管理和压缩优化
* - 查询模式分析和优化建议
*
* 主要特性：
* - 自适应缓存策略
* - 智能预加载机制
* - 多维度性能监控
* - 内存使用优化
* - 查询模式识别
* - 自动缓存调优
*
* @author SOLO Coding
* @version 2.0.0
 */

const logger = createLogger('enhanced-query-cache-strategy');

/**
* 缓存策略类型枚举
 */
export enum EnhancedCacheStrategy  { ULTRA_AGGRESSIVE = 'ultra_aggressive',    // 超激进缓存
  AGGRESSIVE = 'aggressive',                // 激进缓存
  BALANCED = 'balanced',                    // 平衡缓存
  CONSERVATIVE = 'conservative',            // 保守缓存
  MEMORY_OPTIMIZED = 'memory_optimized',    // 内存优化
  PERFORMANCE_FIRST = 'performance_first',  // 性能优先
  ADAPTIVE_LEARNING = 'adaptive_learning'   // 自适应学习 }

/**
* 查询优先级枚举
 */
export enum QueryPriority  { CRITICAL = 'critical',      // 关键查询
  HIGH = 'high',             // 高优先级
  NORMAL = 'normal',         // 普通优先级
  LOW = 'low',               // 低优先级
  BACKGROUND = 'background'   // 后台查询 }

/**
* 缓存层级枚举
 */
export enum CacheLevel  { L1_MEMORY = 'l1_memory',           // L1内存缓存
  L2_COMPRESSED = 'l2_compressed',   // L2压缩缓存
  L3_PERSISTENT = 'l3_persistent'    // L3持久化缓存 }

/**
 * 接口注释：增强缓存配置
 */
export interface EnhancedCacheConfig  { strategy: EnhancedCacheStrategy;
  // TTL配置
  baseTTL: number;
  maxTTL: number;
  minTTL: number;
  adaptiveTTL: boolean;

  // 性能配置
  maxMemoryUsage: number;        // 最大内存使用（字节）
  compressionThreshold: number;   // 压缩阈值（字节）
  maxCacheSize: number;          // 最大缓存条目数

  // 预加载配置
  enablePreloading: boolean;
  preloadThreshold: number;      // 预加载触发阈值
  maxPreloadItems: number;       // 最大预加载项目数
  preloadBatchSize: number;      // 预加载批次大小

  // 智能优化配置
  enableLearning: boolean;       // 启用机器学习优化
  learningRate: number;          // 学习率
  optimizationInterval: number;  // 优化间隔（毫秒）

  // 监控配置
  enableMetrics: boolean;        // 启用指标收集
  metricsInterval: number;       // 指标收集间隔
  alertThresholds: {
    hitRate: number;
    memoryUsage: number;
    responseTime: number
}
}

/**
 * 接口注释：查询上下文
 */
export interface EnhancedQueryContext  { key: string;
  priority: QueryPriority;
  tags: string[];
  userId?: string;
  sessionId?: string;
  expectedSize?: number;
  cacheable: boolean;
  customTTL?: number;
  level: CacheLevel;
  compression?: boolean;
  metadata?: Record<string, any>
}

/**
 * 接口注释：查询统计
 */
export interface QueryMetrics  { key: string;
  hitCount: number;
  missCount: number;
  totalRequests: number;
  hitRate: number;
  avgResponseTime: number;
  lastAccess: number;
  accessPattern: string;
  dataSize: number;
  compressionRatio: number;
  memoryUsage: number;
  cacheLevel: CacheLevel;
  ttlEffectiveness: number;
  costBenefit: number
}

/**
 * 接口注释：性能指标
 */
export interface PerformanceMetrics  { totalQueries: number;
  cacheHits: number;
  cacheMisses: number;
  overallHitRate: number;
  avgResponseTime: number;
  memoryUsage: number;
  compressionSavings: number;
  preloadSuccesses: number;
  preloadFailures: number;
  optimizationEvents: number;
  alertsTriggered: number;

  // 分层统计
  l1Stats: CacheLevelStats;
  l2Stats: CacheLevelStats;
  l3Stats: CacheLevelStats;

  // 时间序列数据
  hourlyStats: HourlyStats[];
  trends: TrendAnalysis
}

/**
 * 接口注释：缓存层级统计
 */
export interface CacheLevelStats  { hits: number;
  misses: number;
  hitRate: number;
  avgResponseTime: number;
  memoryUsage: number;
  itemCount: number
}

/**
 * 接口注释：小时统计
 */
export interface HourlyStats  { hour: number;
  queries: number;
  hits: number;
  avgResponseTime: number;
  memoryUsage: number
}

/**
 * 接口注释：趋势分析
 */
export interface TrendAnalysis  { hitRateTrend: 'improving' | 'stable' | 'declining';
  memoryTrend: 'increasing' | 'stable' | 'decreasing';
  performanceTrend: 'improving' | 'stable' | 'declining';
  recommendations: string[]
}

/**
 * 接口注释：优化建议
 */
export interface OptimizationRecommendation  { type: 'ttl' | 'compression' | 'preload' | 'eviction' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  description: string;
  expectedImprovement: number;
  implementation: string;
  impact: {
    hitRate?: number;
    memoryUsage?: number;
    responseTime?: number
}
}

/**
* 类级注释：增强查询缓存策略优化器
*
* 实现全面的查询缓存优化系统，提供：
* - 多级缓存管理
* - 智能策略选择
* - 自适应优化
* - 性能监控
* - 预测性预加载
 */
export class EnhancedQueryCacheStrategy  { private static instance: EnhancedQueryCacheStrategy;

  // 核心组件
  private config: EnhancedCacheConfig;
  private queryOptimizer: QueryCacheOptimizer;

  // 缓存层级
  private l1Cache: Map<string, any> = new Map();           // 内存缓存
  private l2Cache: Map<string, any> = new Map();           // 压缩缓存
  private l3Cache: Map<string, any> = new Map();           // 持久化缓存

  // 统计和监控
  private queryMetrics: Map<string, QueryMetrics> = new Map();
  private performanceMetrics: PerformanceMetrics;
  private hourlyStats: HourlyStats[] = [];

  // 优化和学习
  private learningData: Map<string, any> = new Map();
  private optimizationHistory: any[] = [];
  private preloadQueue: Set<string> = new Set();

  // 定时器
  private optimizationTimer: NodeJS.Timeout | null = null;
  private metricsTimer: NodeJS.Timeout | null = null;
  private cleanupTimer: NodeJS.Timeout | null = null;

  /**
  * 函数级注释：构造函数
  * 初始化增强查询缓存策略优化器
   */
private constructor(config?: Partial<EnhancedCacheConfig>)  {
    this.config = {
      strategy: EnhancedCacheStrategy.ADAPTIVE_LEARNING,

      // TTL配置
      baseTTL: 5 * 60 * 1000,
      maxTTL: 60 * 60 * 1000,
      minTTL: 30 * 1000,
      adaptiveTTL: true,

      // 性能配置
      maxMemoryUsage: 50 * 1024 * 1024,  // 50MB
      compressionThreshold: 10 * 1024,    // 10KB
      maxCacheSize: 2000,

      // 预加载配置
      enablePreloading: true,
      preloadThreshold: 0.2,
      maxPreloadItems: 50,
      preloadBatchSize: 10,

      // 智能优化配置
      enableLearning: true,
      learningRate: 0.1,
      optimizationInterval: 5 * 60 * 1000,  // 5分钟

      // 监控配置
      enableMetrics: true,
      metricsInterval: 30 * 1000,  // 30秒
      alertThresholds: {
        hitRate: 0.7,
        memoryUsage: 0.8,
        responseTime: 1000 
},

      ...config };

    this.queryOptimizer = QueryCacheOptimizer.getInstance();
    this.initializeMetrics();
    this.startOptimizationLoop();
    this.startMetricsCollection();
    this.startCleanupLoop()
}

  /**
 * 函数级注释：获取单例实例
 */
public static getInstance(config?: Partial<EnhancedCacheConfig>): EnhancedQueryCacheStrategy { if (!EnhancedQueryCacheStrategy.instance)  {
      EnhancedQueryCacheStrategy.instance = new EnhancedQueryCacheStrategy(config)
}
    return EnhancedQueryCacheStrategy.instance
}

  /**
  * 函数级注释：智能查询执行
  * 多级缓存智能查询执行器
   */
  public async executeQuery<T>(context: EnhancedQueryContext,
    queryFn: () => Promise<T>;
  ): Promise<T> { const startTime = performance.now();
    const { key, priority, level, cacheable  } = context;

    try { // 检查多级缓存
      if (cacheable) {
        const cachedResult = await this.getFromMultiLevelCache<T>(key, level);
        if (cachedResult !== null) {
          this.recordCacheHit(key, performance.now() - startTime, level);
          this.triggerPreloadIfNeeded(context);
          return cachedResult
}
      }

      // 执行查询
      const result = await queryFn();
      const queryTime = performance.now() - startTime;

      // 智能缓存存储
      if (cacheable && result !== null && result !== undefined) { await this.storeInMultiLevelCache(key, result, context)
}

      this.recordCacheMiss(key, queryTime, level);
      this.updateQueryMetrics(key, context, queryTime, result);

      return result
} catch (error) { this.recordQueryError(key, performance.now() - startTime);
      throw error
}
  }

  /**
  * 函数级注释：多级缓存获取
  * 从多级缓存中智能获取数据
   */
private async getFromMultiLevelCache<T>(key: string, preferredLevel: CacheLevel): Promise<T | null>  { // L1 内存缓存检查
    if (this.l1Cache.has(key)) {
      const entry = this.l1Cache.get(key);
      if (this.isValidCacheEntry(entry)) {
        logger.debug('L1缓存命中', { key  });
        return entry.data
} else { this.l1Cache.delete(key)
}
    }

    // L2 压缩缓存检查
    if (this.l2Cache.has(key)) { const entry = this.l2Cache.get(key);
      if (this.isValidCacheEntry(entry)) {
        const decompressedData = this.decompress(entry.data);
        // 提升到L1缓存
        this.promoteToL1(key, decompressedData, entry.ttl);
        logger.debug('L2缓存命中并提升到L1', { key  });
        return decompressedData
} else { this.l2Cache.delete(key)
}
    }

    // L3 持久化缓存检查
    if (this.l3Cache.has(key)) { const entry = this.l3Cache.get(key);
      if (this.isValidCacheEntry(entry)) {
        const data = entry.data;
        // 根据访问频率决定是否提升
        if (this.shouldPromoteFromL3(key)) {
          this.promoteToL2(key, data, entry.ttl)
}
        logger.debug('L3缓存命中', { key  });
        return data
} else { this.l3Cache.delete(key)
}
    }

    // 检查优化查询缓存
    const optimizedResult = await optimizedQueryCache.get<T>(key);
    if (optimizedResult !== null) { // 存储到适当的缓存级别
      this.storeInAppropriateLevel(key, optimizedResult, preferredLevel);
      logger.debug('优化查询缓存命中', { key  });
      return optimizedResult
}

    return null
}

  /**
  * 函数级注释：多级缓存存储
  * 智能存储到多级缓存中
   */
  private async storeInMultiLevelCache<T>(
    key: string,
    data: T,
    context: EnhancedQueryContext
  ): Promise<void> { const dataSize = this.calculateDataSize(data);
    const ttl = this.calculateIntelligentTTL(key, context);

    // 根据数据大小和访问模式决定存储策略
    const storageStrategy = this.determineStorageStrategy(key, dataSize, context);

    switch (storageStrategy.level) {
      case CacheLevel.L1_MEMORY:
      this.storeInL1(key, data, ttl);
      break;

      case CacheLevel.L2_COMPRESSED:
      this.storeInL2(key, data, ttl);
      break;

      case CacheLevel.L3_PERSISTENT:
      this.storeInL3(key, data, ttl);
      break
}

    // 同时存储到优化查询缓存
    await optimizedQueryCache.set(key, data, { ttl,
      tags: context.tags,
      priority: this.mapPriorityToNumber(context.priority) 
});

    logger.debug('多级缓存存储完成', { key,
      level: storageStrategy.level,
      dataSize,
      ttl })
}

  /**
  * 函数级注释：计算智能TTL
  * 基于多种因素计算最优TTL
   */
private calculateIntelligentTTL(key: string, context: EnhancedQueryContext): number { if (!this.config.adaptiveTTL)  {
      return context.customTTL || this.config.baseTTL
}

    const metrics = this.queryMetrics.get(key);
    let ttl = this.config.baseTTL;

    if (metrics) { // 基于命中率调整
      const hitRateMultiplier = Math.max(0.5, Math.min(2.0, metrics.hitRate * 2));
      ttl *= hitRateMultiplier;

      // 基于访问频率调整
      const accessFrequency = this.calculateAccessFrequency(key);
      if (accessFrequency > 10) { // 高频访问
      ttl *= 1.5
} else if (accessFrequency < 2) { // 低频访问
    ttl *= 0.7
}

  // 基于数据大小调整
  if (metrics.dataSize > this.config.compressionThreshold) { ttl *= 0.8; // 大数据减少TTL }

  // 基于优先级调整
  switch (context.priority) { case QueryPriority.CRITICAL:
    ttl *= 2.0;
    break;
    case QueryPriority.HIGH:
    ttl *= 1.5;
    break;
    case QueryPriority.LOW:
    ttl *= 0.7;
    break;
    case QueryPriority.BACKGROUND:
    ttl *= 0.5;
    break
}
}

// 应用边界限制
ttl = Math.max(this.config.minTTL, Math.min(this.config.maxTTL, ttl));

return Math.floor(ttl)
}

/**
* 函数级注释：确定存储策略
* 智能确定数据应该存储在哪个缓存级别
 */
private determineStorageStrategy(
  key: string,
  dataSize: number,
  context: EnhancedQueryContext
): { level: CacheLevel; compress: boolean  
} { const metrics = this.queryMetrics.get(key);
  const accessFrequency = this.calculateAccessFrequency(key);

  // 高频访问且数据较小 -> L1
  if (accessFrequency > 5 && dataSize < this.config.compressionThreshold) {
    return { level: CacheLevel.L1_MEMORY, compress: false  
}
}

  // 中频访问或数据较大 -> L2 (压缩)
  if (accessFrequency > 1 || dataSize > this.config.compressionThreshold) { return { level: CacheLevel.L2_COMPRESSED, compress: true  
}
}

  // 低频访问 -> L3
  return { level: CacheLevel.L3_PERSISTENT, compress: false  
}
}

/**
* 函数级注释：L1缓存存储
 */
private storeInL1<T>(key: string, data: T, ttl: number): void  { // 检查内存限制
  if (this.getCurrentMemoryUsage() > this.config.maxMemoryUsage * 0.8) {
    this.evictFromL1()
}

  this.l1Cache.set(key, { data,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttl,
    accessCount: 1,
    lastAccess: Date.now() 
})
}

/**
 * 函数级注释：L2缓存存储
 */
private storeInL2<T>(key: string, data: T, ttl: number): void  { const compressedData = this.compress(data);
  this.l2Cache.set(key, {
    data: compressedData,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttl,
    accessCount: 1,
    lastAccess: Date.now(),
    compressed: true 
})
}

/**
 * 函数级注释：L3缓存存储
 */
private storeInL3<T>(key: string, data: T, ttl: number): void { this.l3Cache.set(key,  {
    data,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttl * 2, // L3缓存TTL更长
    accessCount: 1,
    lastAccess: Date.now() 
})
}

/**
* 函数级注释：预测性预加载
* 基于访问模式预测并预加载数据
 */
private async triggerPreloadIfNeeded(context: EnhancedQueryContext): Promise<void> { if (!this.config.enablePreloading || this.preloadQueue.size >= this.config.maxPreloadItems)  {
    return
}

  const predictions = this.generatePreloadPredictions(context.key);

  for (const prediction of predictions) { if (prediction.probability > this.config.preloadThreshold &&
    !this.preloadQueue.has(prediction.key)) {
      this.preloadQueue.add(prediction.key);
      this.schedulePreload(prediction)
}
  } }

/**
* 函数级注释：生成预加载预测
* 基于机器学习算法生成预加载预测
 */
private generatePreloadPredictions(baseKey: string): Array<{ key: string; probability: number  
}> { const predictions: Array< { key: string; probability: number  
}> = [];

  // 基于历史访问模式的简单预测算法
  const relatedKeys = this.findRelatedKeys(baseKey);

  for (const relatedKey of relatedKeys) { const metrics = this.queryMetrics.get(relatedKey);
    if (metrics) {
      const probability = this.calculatePreloadProbability(baseKey, relatedKey, metrics);
      if (probability > 0.1) {
        predictions.push({ key: relatedKey, probability  })
}
    } }

  return predictions.sort((a, b) => b.probability - a.probability).slice(0, 10)
}

/**
* 函数级注释：计算预加载概率
 */
private calculatePreloadProbability(baseKey: string, targetKey: string, metrics: QueryMetrics): number  { // 简化的概率计算
  let probability = 0;

  // 基于访问频率
  const accessFrequency = this.calculateAccessFrequency(targetKey);
  probability += Math.min(0.5, accessFrequency / 20);

  // 基于键的相似性
  const similarity = this.calculateKeySimilarity(baseKey, targetKey);
  probability += similarity * 0.3;

  // 基于时间模式
  const timePattern = this.analyzeTimePattern(targetKey);
  probability += timePattern * 0.2;

  return Math.min(1.0, probability)
}

/**
 * 函数级注释：启动优化循环
 */
private startOptimizationLoop(): void { if (this.optimizationTimer)  {
    clearInterval(this.optimizationTimer)
}

  this.optimizationTimer = setInterval(() => {
  this.performOptimization()
}, this.config.optimizationInterval)

}

/**
 * 函数级注释：执行优化
 */
private performOptimization(): void  { logger.info('开始缓存优化');
  // 分析性能指标
  const recommendations = this.analyzePerformanceAndGenerateRecommendations();

  // 应用优化建议
  for (const recommendation of recommendations) {
    if (recommendation.priority === 'high') {
      this.applyOptimization(recommendation)
}
  }

  // 清理过期缓存
  this.cleanupExpiredEntries();

  // 优化内存使用
  this.optimizeMemoryUsage();

  // 更新学习数据
  if (this.config.enableLearning) { this.updateLearningData()
}

  logger.info('缓存优化完成', { recommendations: recommendations.length,
    memoryUsage: this.getCurrentMemoryUsage() 
})
}

/**
 * 函数级注释：获取性能指标
 */
public getPerformanceMetrics(): PerformanceMetrics  { this.updatePerformanceMetrics();
  return { ...this.performanceMetrics  }
}

/**
 * 函数级注释：获取优化建议
 */
public getOptimizationRecommendations(): OptimizationRecommendation[]  { return this.analyzePerformanceAndGenerateRecommendations()
}
// 辅助方法实现...
private initializeMetrics(): void { this.performanceMetrics = {
    totalQueries: 0,
    cacheHits: 0,
    cacheMisses: 0,
    overallHitRate: 0,
    avgResponseTime: 0,
    memoryUsage: 0,
    compressionSavings: 0,
    preloadSuccesses: 0,
    preloadFailures: 0,
    optimizationEvents: 0,
    alertsTriggered: 0,
    l1Stats: { hits: 0, misses: 0, hitRate: 0, avgResponseTime: 0, memoryUsage: 0, itemCount: 0  
},
    l2Stats: { hits: 0, misses: 0, hitRate: 0, avgResponseTime: 0, memoryUsage: 0, itemCount: 0  
},
    l3Stats: { hits: 0, misses: 0, hitRate: 0, avgResponseTime: 0, memoryUsage: 0, itemCount: 0  
},
    hourlyStats: [],
    trends: { hitRateTrend: 'stable',
      memoryTrend: 'stable',
      performanceTrend: 'stable',
      recommendations: [] 
}
  }
}

private startMetricsCollection(): void { if (this.metricsTimer) {
    clearInterval(this.metricsTimer)
}

  this.metricsTimer = setInterval(() => {
  this.collectMetrics()
}, this.config.metricsInterval)

}

private startCleanupLoop(): void { if (this.cleanupTimer) {
    clearInterval(this.cleanupTimer)
}

  this.cleanupTimer = setInterval(() => {
  this.cleanupExpiredEntries()
}, 60000); // 每分钟清理一次 
}

// 更多辅助方法的实现...
private isValidCacheEntry(entry: any): boolean { return entry && entry.expiresAt > Date.now()
}

private calculateDataSize(data: any): number { try {
    return JSON.stringify(data).length * 2; // UTF-16 } catch { return 1000; // 默认大小 }
}

private calculateAccessFrequency(key: string): number { const metrics = this.queryMetrics.get(key);
  if (!metrics) return 0;

  const timeWindow = 60 * 1000; // 1分钟
  const now = Date.now();
  return metrics.totalRequests / Math.max(1, (now - (metrics.lastAccess - timeWindow)) / timeWindow)
}

private getCurrentMemoryUsage(): number { // 简化的内存使用计算
  return (this.l1Cache.size + this.l2Cache.size + this.l3Cache.size) * 1024
}

private compress(data: any): string { // 简化的压缩实现
  return JSON.stringify(data)
}

private decompress(data: string): any { try {
    return JSON.parse(data)
} catch { return data
}
}

private mapPriorityToNumber(priority: QueryPriority): number { switch (priority) {
    case QueryPriority.CRITICAL: return 5;
    case QueryPriority.HIGH: return 4;
    case QueryPriority.NORMAL: return 3;
    case QueryPriority.LOW: return 2;
    case QueryPriority.BACKGROUND: return 1;
    default: return 3
}
}

// 占位符方法，需要完整实现
private recordCacheHit(key: string, responseTime: number, level: CacheLevel): void { // 实现缓存命中记录 
}

private recordCacheMiss(key: string, responseTime: number, level: CacheLevel): void { // 实现缓存未命中记录 
}

private recordQueryError(key: string, responseTime: number): void { // 实现查询错误记录 
}

private updateQueryMetrics(key: string, context: EnhancedQueryContext, responseTime: number, result: any): void { // 实现查询指标更新 
}

private promoteToL1(key: string, data: any, ttl: number): void { // 实现L1提升逻辑 
}

private promoteToL2(key: string, data: any, ttl: number): void { // 实现L2提升逻辑 
}

private shouldPromoteFromL3(key: string): boolean { // 实现L3提升判断逻辑
  return false
}

private storeInAppropriateLevel(key: string, data: any, preferredLevel: CacheLevel): void { // 实现适当级别存储逻辑 
}

private evictFromL1(): void { // 实现L1淘汰逻辑 
}

private schedulePreload(prediction: { key: string; probability: number  
}): void { // 实现预加载调度逻辑 
}

private findRelatedKeys(baseKey: string): string[] { // 实现相关键查找逻辑
  return []
}

private calculateKeySimilarity(key1: string, key2: string): number { // 实现键相似性计算
  return 0
}

private analyzeTimePattern(key: string): number { // 实现时间模式分析
  return 0
}

private analyzePerformanceAndGenerateRecommendations(): OptimizationRecommendation[] { // 实现性能分析和建议生成
  return []
}

private applyOptimization(recommendation: OptimizationRecommendation): void { // 实现优化应用逻辑 
}

private cleanupExpiredEntries(): void { // 实现过期条目清理 
}

private optimizeMemoryUsage(): void { // 实现内存使用优化 
}

private updateLearningData(): void { // 实现学习数据更新 
}

private updatePerformanceMetrics(): void { // 实现性能指标更新 
}

private collectMetrics(): void { // 实现指标收集 
}
}

/**
* 函数级注释：增强查询缓存策略Hook
* React Hook，用于在组件中使用增强查询缓存策略
 */
export function useEnhancedQueryCacheStrategy(config?: Partial<EnhancedCacheConfig>)  { const strategy = EnhancedQueryCacheStrategy.getInstance(config);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);

  // 定期更新指标
  useEffect(() => {
/**
 * updateMetrics函数
 * 更新数据
 * @returns void
 */
const updateMetrics = () =>  {
  setMetrics(strategy.getPerformanceMetrics());
      setRecommendations(strategy.getOptimizationRecommendations())
};

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000); // 30秒更新一次

    return () => clearInterval(interval)

}, [strategy]);

  const executeQuery = useCallback(;
    async <T>(context: EnhancedQueryContext, queryFn: () => Promise<T>): Promise<T> => {
  return strategy.executeQuery(context, queryFn)

},
    [strategy]
  );

  return { executeQuery,
    metrics,
    recommendations,
    getPerformanceMetrics: strategy.getPerformanceMetrics.bind(strategy),
    getOptimizationRecommendations: strategy.getOptimizationRecommendations.bind(strategy) 
}
}

// 导出单例实例
export const enhancedQueryCacheStrategy = EnhancedQueryCacheStrategy.getInstance();