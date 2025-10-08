/**
 * 文件级注释：智能查询缓存策略（优化版）
 * 提供自适应缓存策略、预测性预加载和智能失效机制
 * 专门优化技能系统的数据查询性能，集成内存管理和批量操作优化
 * 
 * 优化特性：
 * 1. 严格的内存限制和监控
 * 2. 智能批量操作优化
 * 3. 自适应TTL策略
 * 4. 预测性预加载机制
 * 5. 查询模式分析和优化
 * 6. 内存泄漏预防
 * 7. 性能监控和自动调优
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { optimizedQueryCache } from '@/utils/optimizedQueryCache';
import { createLogger } from '@/lib/logger';

const logger = createLogger('intelligent-cache-strategy');

/**
 * 缓存策略类型枚举
 */
export enum CacheStrategyType {
  AGGRESSIVE = 'aggressive',      // 激进缓存，长TTL
  CONSERVATIVE = 'conservative',  // 保守缓存，短TTL
  ADAPTIVE = 'adaptive',         // 自适应缓存
  PREDICTIVE = 'predictive',     // 预测性缓存
  MEMORY_OPTIMIZED = 'memory_optimized', // 内存优化
  PERFORMANCE_FIRST = 'performance_first' // 性能优先
}

/**
 * 查询模式枚举
 */
export enum QueryPattern {
  FREQUENT = 'frequent',         // 频繁查询
  OCCASIONAL = 'occasional',     // 偶尔查询
  BURST = 'burst',              // 突发查询
  SEQUENTIAL = 'sequential',     // 顺序查询
  PREDICTABLE = 'predictable',   // 可预测查询
  RANDOM = 'random'             // 随机查询
}

/**
 * 缓存优先级枚举
 */
export enum CachePriority {
  CRITICAL = 'critical',    // 关键数据
  HIGH = 'high',           // 高优先级
  MEDIUM = 'medium',       // 中等优先级
  LOW = 'low',            // 低优先级
  BACKGROUND = 'background' // 后台数据
}

/**
 * 缓存策略配置接口
 */
export interface CacheStrategyConfig {
  type: CacheStrategyType;
  baseTTL: number;
  maxTTL: number;
  minTTL: number;
  hitRateThreshold: number;
  frequencyThreshold: number;
  enablePrediction: boolean;
  enablePreloading: boolean;
  maxPreloadItems: number;
  memoryLimit: number;
  batchSize: number;
  compressionThreshold: number;
  adaptiveThreshold: number;
}

/**
 * 查询统计接口
 */
export interface QueryStats {
  key: string;
  hitCount: number;
  missCount: number;
  lastAccess: number;
  accessFrequency: number;
  pattern: QueryPattern;
  avgResponseTime: number;
  dataSize: number;
  priority: CachePriority;
  compressionRatio: number;
  memoryUsage: number;
  accessTrend: number; // 访问趋势
}

/**
 * 预测结果接口
 */
export interface PredictionResult {
  key: string;
  probability: number;
  suggestedTTL: number;
  preloadPriority: number;
  confidence: number;
  pattern: QueryPattern;
}

/**
 * 批量查询请求接口
 */
export interface BatchQueryRequest<T> {
  key: string;
  fetcher: () => Promise<T>;
  priority?: CachePriority;
  tags?: string[];
  ttl?: number;
  dependencies?: string[];
}

/**
 * 缓存性能指标接口
 */
export interface CachePerformanceMetrics {
  totalQueries: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
  avgResponseTime: number;
  memoryUsage: number;
  compressionSavings: number;
  preloadSuccessRate: number;
  adaptiveAdjustments: number;
}

/**
 * 智能缓存策略类（优化版）
 */
class IntelligentCacheStrategy {
  private static instance: IntelligentCacheStrategy;
  private queryStats: Map<string, QueryStats> = new Map();
  private accessHistory: Map<string, number[]> = new Map();
  private preloadQueue: Set<string> = new Set();
  private batchQueue: Map<string, BatchQueryRequest<any>[]> = new Map();
  private compressionCache: Map<string, any> = new Map();
  private dependencyGraph: Map<string, Set<string>> = new Map();
  
  // 性能监控
  private performanceMetrics: CachePerformanceMetrics = {
    totalQueries: 0,
    cacheHits: 0,
    cacheMisses: 0,
    hitRate: 0,
    avgResponseTime: 0,
    memoryUsage: 0,
    compressionSavings: 0,
    preloadSuccessRate: 0,
    adaptiveAdjustments: 0
  };

  // 定时器
  private analysisTimer: NodeJS.Timeout | null = null;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private preloadTimer: NodeJS.Timeout | null = null;
  private batchTimer: NodeJS.Timeout | null = null;

  private config: CacheStrategyConfig = {
    type: CacheStrategyType.ADAPTIVE,
    baseTTL: 5 * 60 * 1000,      // 5分钟
    maxTTL: 30 * 60 * 1000,      // 30分钟
    minTTL: 30 * 1000,           // 30秒
    hitRateThreshold: 0.8,       // 80%
    frequencyThreshold: 10,      // 10次/分钟
    enablePrediction: true,
    enablePreloading: true,
    maxPreloadItems: 15,         // 降低预加载数量
    memoryLimit: 50 * 1024 * 1024, // 50MB 内存限制
    batchSize: 5,                // 批量大小
    compressionThreshold: 10 * 1024, // 10KB 压缩阈值
    adaptiveThreshold: 0.7       // 自适应阈值
  };

  private constructor() {
    this.startOptimizedManagement();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): IntelligentCacheStrategy {
    if (!IntelligentCacheStrategy.instance) {
      IntelligentCacheStrategy.instance = new IntelligentCacheStrategy();
    }
    return IntelligentCacheStrategy.instance;
  }

  /**
   * 智能获取数据（优化版）
   */
  public async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { 
      priority?: CachePriority; 
      tags?: string[]; 
      ttl?: number;
      dependencies?: string[];
      enableCompression?: boolean;
    } = {}
  ): Promise<T> {
    const startTime = performance.now();
    this.performanceMetrics.totalQueries++;
    
    // 记录访问
    this.recordAccess(key, options.priority || CachePriority.MEDIUM);
    
    // 检查内存限制
    if (this.isMemoryLimitExceeded()) {
      await this.performMemoryCleanup();
    }
    
    // 尝试从多级缓存获取
    let data = await this.getFromMultiLevelCache<T>(key);
    
    if (data !== null) {
      // 缓存命中
      const responseTime = performance.now() - startTime;
      this.updateStats(key, true, responseTime);
      this.performanceMetrics.cacheHits++;
      
      logger.debug('智能缓存命中', { key, responseTime });
      
      // 检查是否需要后台刷新
      if (this.shouldBackgroundRefresh(key)) {
        this.scheduleBackgroundRefresh(key, fetcher);
      }
      
      return data;
    }

    // 缓存未命中，获取数据
    data = await fetcher();
    const responseTime = performance.now() - startTime;
    this.performanceMetrics.cacheMisses++;
    
    // 计算智能TTL
    const ttl = options.ttl || this.calculateAdaptiveTTL(key, responseTime);
    
    // 智能存储到缓存
    await this.storeIntelligently(key, data, {
      ttl,
      tags: options.tags,
      priority: options.priority || CachePriority.MEDIUM,
      enableCompression: options.enableCompression,
      dependencies: options.dependencies
    });
    
    // 更新统计
    this.updateStats(key, false, responseTime, this.calculateDataSize(data));
    
    // 触发预测性预加载
    if (this.config.enablePrediction) {
      this.schedulePredictivePreload(key);
    }
    
    logger.debug('智能缓存存储', { key, ttl, responseTime });
    
    return data;
  }

  /**
   * 批量智能获取（优化版）
   */
  public async getBatch<T>(
    requests: BatchQueryRequest<T>[]
  ): Promise<Map<string, T>> {
    const results = new Map<string, T>();
    
    // 按优先级分组
    const groupedRequests = this.groupRequestsByPriority(requests);
    
    // 处理关键和高优先级请求
    const criticalAndHigh = [
      ...(groupedRequests.get(CachePriority.CRITICAL) || []),
      ...(groupedRequests.get(CachePriority.HIGH) || [])
    ];
    
    if (criticalAndHigh.length > 0) {
      const highPriorityResults = await this.processBatchRequests(criticalAndHigh);
      highPriorityResults.forEach((value, key) => results.set(key, value));
    }
    
    // 处理中等优先级请求（批量处理）
    const mediumRequests = groupedRequests.get(CachePriority.MEDIUM) || [];
    if (mediumRequests.length > 0) {
      const mediumResults = await this.processBatchRequestsInChunks(mediumRequests);
      mediumResults.forEach((value, key) => results.set(key, value));
    }
    
    // 处理低优先级和后台请求（延迟处理）
    const lowPriorityRequests = [
      ...(groupedRequests.get(CachePriority.LOW) || []),
      ...(groupedRequests.get(CachePriority.BACKGROUND) || [])
    ];
    
    if (lowPriorityRequests.length > 0) {
      // 延迟处理低优先级请求
      setTimeout(async () => {
        const lowResults = await this.processBatchRequestsInChunks(lowPriorityRequests);
        // 这些结果不返回给调用者，但会被缓存
      }, 100);
    }
    
    return results;
  }

  /**
   * 预测性预加载（优化版）
   */
  public async predictivePreload(baseKey: string): Promise<void> {
    if (!this.config.enablePreloading || this.preloadQueue.has(baseKey)) return;
    
    this.preloadQueue.add(baseKey);
    
    try {
      const predictions = this.generateAdvancedPredictions(baseKey);
      const topPredictions = predictions
        .filter(p => p.confidence > 0.6) // 只预加载高置信度的预测
        .sort((a, b) => b.probability * b.confidence - a.probability * a.confidence)
        .slice(0, this.config.maxPreloadItems);
      
      // 批量预加载
      const preloadPromises = topPredictions.map(async (prediction) => {
        try {
          // 检查是否已缓存
          const cached = await optimizedQueryCache.get(prediction.key);
          if (cached === null) {
            // 这里需要根据具体业务逻辑实现预加载
            logger.debug('预测性预加载候选', { 
              key: prediction.key, 
              probability: prediction.probability,
              confidence: prediction.confidence
            });
            
            // 模拟预加载（实际实现需要根据业务逻辑）
            return this.simulatePreload(prediction);
          }
        } catch (error) {
          logger.error('预测性预加载失败', { key: prediction.key, error });
        }
      });
      
      await Promise.allSettled(preloadPromises);
      
    } finally {
      this.preloadQueue.delete(baseKey);
    }
  }

  /**
   * 从多级缓存获取数据
   */
  private async getFromMultiLevelCache<T>(key: string): Promise<T | null> {
    // L1: 内存缓存
    const memoryData = await optimizedQueryCache.get<T>(key);
    if (memoryData !== null) {
      return memoryData;
    }
    
    // L2: 压缩缓存
    const compressedData = this.compressionCache.get(key);
    if (compressedData) {
      const decompressed = this.decompress(compressedData);
      // 提升到L1缓存
      await optimizedQueryCache.set(key, decompressed, { ttl: this.config.baseTTL });
      return decompressed;
    }
    
    return null;
  }

  /**
   * 智能存储到缓存
   */
  private async storeIntelligently<T>(
    key: string,
    data: T,
    options: {
      ttl: number;
      tags?: string[];
      priority: CachePriority;
      enableCompression?: boolean;
      dependencies?: string[];
    }
  ): Promise<void> {
    const dataSize = this.calculateDataSize(data);
    
    // 存储到L1缓存
    await optimizedQueryCache.set(key, data, { 
      ttl: options.ttl, 
      tags: options.tags 
    });
    
    // 如果数据较大且启用压缩，存储到压缩缓存
    if (dataSize > this.config.compressionThreshold && options.enableCompression !== false) {
      const compressed = this.compress(data);
      this.compressionCache.set(key, compressed);
      
      // 计算压缩节省
      const compressionSavings = dataSize - JSON.stringify(compressed).length;
      this.performanceMetrics.compressionSavings += compressionSavings;
    }
    
    // 处理依赖关系
    if (options.dependencies) {
      this.updateDependencyGraph(key, options.dependencies);
    }
  }

  /**
   * 计算自适应TTL
   */
  private calculateAdaptiveTTL(key: string, responseTime: number): number {
    const stats = this.queryStats.get(key);
    
    if (!stats) {
      return this.config.baseTTL;
    }
    
    let ttl = this.config.baseTTL;
    
    // 根据访问频率调整
    if (stats.accessFrequency > this.config.frequencyThreshold) {
      ttl = Math.min(ttl * 1.5, this.config.maxTTL);
    }
    
    // 根据响应时间调整
    if (responseTime > 1000) { // 响应时间超过1秒
      ttl = Math.min(ttl * 2, this.config.maxTTL);
    }
    
    // 根据查询模式调整
    switch (stats.pattern) {
      case QueryPattern.FREQUENT:
        ttl = Math.min(ttl * 1.8, this.config.maxTTL);
        break;
      case QueryPattern.BURST:
        ttl = Math.min(ttl * 1.2, this.config.maxTTL);
        break;
      case QueryPattern.PREDICTABLE:
        ttl = Math.min(ttl * 2.5, this.config.maxTTL);
        break;
      case QueryPattern.OCCASIONAL:
        ttl = Math.max(ttl * 0.8, this.config.minTTL);
        break;
    }
    
    // 根据命中率调整
    const hitRate = stats.hitCount / (stats.hitCount + stats.missCount);
    if (hitRate > this.config.hitRateThreshold) {
      ttl = Math.min(ttl * 1.3, this.config.maxTTL);
    }
    
    return Math.max(Math.min(ttl, this.config.maxTTL), this.config.minTTL);
  }

  /**
   * 生成高级预测
   */
  private generateAdvancedPredictions(baseKey: string): PredictionResult[] {
    const predictions: PredictionResult[] = [];
    const baseStats = this.queryStats.get(baseKey);
    
    if (!baseStats) return predictions;
    
    // 基于访问历史的预测
    this.queryStats.forEach((stats, key) => {
      if (key === baseKey) return;
      
      // 计算相关性
      const correlation = this.calculateKeyCorrelation(baseKey, key);
      if (correlation > 0.3) {
        const probability = correlation * (stats.accessFrequency / 100);
        const confidence = this.calculatePredictionConfidence(stats);
        
        predictions.push({
          key,
          probability,
          suggestedTTL: this.calculateAdaptiveTTL(key, stats.avgResponseTime),
          preloadPriority: this.calculatePreloadPriority(stats),
          confidence,
          pattern: stats.pattern
        });
      }
    });
    
    return predictions;
  }

  /**
   * 计算键相关性
   */
  private calculateKeyCorrelation(key1: string, key2: string): number {
    const history1 = this.accessHistory.get(key1) || [];
    const history2 = this.accessHistory.get(key2) || [];
    
    if (history1.length === 0 || history2.length === 0) return 0;
    
    // 简单的时间窗口相关性计算
    let correlation = 0;
    const timeWindow = 5 * 60 * 1000; // 5分钟
    
    for (const time1 of history1) {
      for (const time2 of history2) {
        if (Math.abs(time1 - time2) < timeWindow) {
          correlation += 1;
        }
      }
    }
    
    return correlation / Math.max(history1.length, history2.length);
  }

  /**
   * 计算预测置信度
   */
  private calculatePredictionConfidence(stats: QueryStats): number {
    let confidence = 0.5; // 基础置信度
    
    // 基于访问频率
    if (stats.accessFrequency > 20) confidence += 0.2;
    else if (stats.accessFrequency > 10) confidence += 0.1;
    
    // 基于查询模式
    switch (stats.pattern) {
      case QueryPattern.PREDICTABLE:
        confidence += 0.3;
        break;
      case QueryPattern.FREQUENT:
        confidence += 0.2;
        break;
      case QueryPattern.SEQUENTIAL:
        confidence += 0.15;
        break;
    }
    
    // 基于命中率
    const hitRate = stats.hitCount / (stats.hitCount + stats.missCount);
    if (hitRate > 0.8) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  /**
   * 计算预加载优先级
   */
  private calculatePreloadPriority(stats: QueryStats): number {
    let priority = 0;
    
    // 基于优先级
    switch (stats.priority) {
      case CachePriority.CRITICAL:
        priority += 100;
        break;
      case CachePriority.HIGH:
        priority += 80;
        break;
      case CachePriority.MEDIUM:
        priority += 50;
        break;
      case CachePriority.LOW:
        priority += 20;
        break;
    }
    
    // 基于访问频率
    priority += stats.accessFrequency;
    
    // 基于响应时间（响应时间越长，预加载优先级越高）
    if (stats.avgResponseTime > 1000) priority += 30;
    else if (stats.avgResponseTime > 500) priority += 15;
    
    return priority;
  }

  /**
   * 按优先级分组请求
   */
  private groupRequestsByPriority<T>(
    requests: BatchQueryRequest<T>[]
  ): Map<CachePriority, BatchQueryRequest<T>[]> {
    const grouped = new Map<CachePriority, BatchQueryRequest<T>[]>();
    
    for (const request of requests) {
      const priority = request.priority || CachePriority.MEDIUM;
      if (!grouped.has(priority)) {
        grouped.set(priority, []);
      }
      grouped.get(priority)!.push(request);
    }
    
    return grouped;
  }

  /**
   * 处理批量请求
   */
  private async processBatchRequests<T>(
    requests: BatchQueryRequest<T>[]
  ): Promise<Map<string, T>> {
    const results = new Map<string, T>();
    
    const promises = requests.map(async (request) => {
      try {
        const data = await this.get(request.key, request.fetcher, {
          priority: request.priority,
          tags: request.tags,
          ttl: request.ttl,
          dependencies: request.dependencies
        });
        results.set(request.key, data);
      } catch (error) {
        logger.error('批量请求失败', { key: request.key, error });
      }
    });
    
    await Promise.allSettled(promises);
    return results;
  }

  /**
   * 分块处理批量请求
   */
  private async processBatchRequestsInChunks<T>(
    requests: BatchQueryRequest<T>[]
  ): Promise<Map<string, T>> {
    const results = new Map<string, T>();
    const chunkSize = this.config.batchSize;
    
    for (let i = 0; i < requests.length; i += chunkSize) {
      const chunk = requests.slice(i, i + chunkSize);
      const chunkResults = await this.processBatchRequests(chunk);
      chunkResults.forEach((value, key) => results.set(key, value));
      
      // 短暂延迟以避免过载
      if (i + chunkSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    return results;
  }

  /**
   * 记录访问
   */
  private recordAccess(key: string, priority: CachePriority): void {
    const now = Date.now();
    const history = this.accessHistory.get(key) || [];
    
    history.push(now);
    
    // 只保留最近2小时的访问记录（优化内存使用）
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    const recentHistory = history.filter(time => time > twoHoursAgo);
    
    this.accessHistory.set(key, recentHistory);
  }

  /**
   * 更新统计信息
   */
  private updateStats(
    key: string, 
    isHit: boolean, 
    responseTime: number, 
    dataSize?: number
  ): void {
    const stats = this.queryStats.get(key) || {
      key,
      hitCount: 0,
      missCount: 0,
      lastAccess: 0,
      accessFrequency: 0,
      pattern: QueryPattern.OCCASIONAL,
      avgResponseTime: 0,
      dataSize: 0,
      priority: CachePriority.MEDIUM,
      compressionRatio: 1,
      memoryUsage: 0,
      accessTrend: 0
    };

    if (isHit) {
      stats.hitCount++;
    } else {
      stats.missCount++;
      
      // 更新平均响应时间
      const totalRequests = stats.hitCount + stats.missCount;
      stats.avgResponseTime = (stats.avgResponseTime * (totalRequests - 1) + responseTime) / totalRequests;
      
      if (dataSize !== undefined) {
        stats.dataSize = dataSize;
        stats.memoryUsage = dataSize;
      }
    }

    stats.lastAccess = Date.now();
    
    // 计算访问频率和趋势
    const history = this.accessHistory.get(key) || [];
    stats.accessFrequency = history.length; // 每2小时访问次数
    stats.accessTrend = this.calculateAccessTrend(history);
    
    // 分析查询模式
    stats.pattern = this.analyzeAdvancedQueryPattern(history);
    
    this.queryStats.set(key, stats);
    
    // 更新全局性能指标
    this.updateGlobalMetrics();
  }

  /**
   * 计算访问趋势
   */
  private calculateAccessTrend(accessHistory: number[]): number {
    if (accessHistory.length < 2) return 0;
    
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    
    const recentAccesses = accessHistory.filter(time => time > oneHourAgo).length;
    const olderAccesses = accessHistory.filter(time => time > twoHoursAgo && time <= oneHourAgo).length;
    
    if (olderAccesses === 0) return recentAccesses > 0 ? 1 : 0;
    
    return (recentAccesses - olderAccesses) / olderAccesses;
  }

  /**
   * 分析高级查询模式
   */
  private analyzeAdvancedQueryPattern(accessHistory: number[]): QueryPattern {
    if (accessHistory.length === 0) return QueryPattern.OCCASIONAL;
    
    const now = Date.now();
    const recentAccesses = accessHistory.filter(time => now - time < 5 * 60 * 1000); // 最近5分钟
    const hourlyAccesses = accessHistory.filter(time => now - time < 60 * 60 * 1000); // 最近1小时
    
    // 突发模式
    if (recentAccesses.length > 10) {
      return QueryPattern.BURST;
    }
    
    // 频繁模式
    if (hourlyAccesses.length > 30) {
      return QueryPattern.FREQUENT;
    }
    
    // 可预测模式（检查规律性）
    if (this.isAccessPatternPredictable(accessHistory)) {
      return QueryPattern.PREDICTABLE;
    }
    
    // 顺序模式（检查时间间隔的一致性）
    if (this.isAccessPatternSequential(accessHistory)) {
      return QueryPattern.SEQUENTIAL;
    }
    
    // 随机模式
    if (this.isAccessPatternRandom(accessHistory)) {
      return QueryPattern.RANDOM;
    }
    
    return QueryPattern.OCCASIONAL;
  }

  /**
   * 检查访问模式是否可预测
   */
  private isAccessPatternPredictable(accessHistory: number[]): boolean {
    if (accessHistory.length < 5) return false;
    
    // 计算访问间隔的标准差
    const intervals = [];
    for (let i = 1; i < accessHistory.length; i++) {
      intervals.push(accessHistory[i] - accessHistory[i - 1]);
    }
    
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    
    // 如果标准差相对较小，认为是可预测的
    return stdDev / avgInterval < 0.3;
  }

  /**
   * 检查访问模式是否顺序
   */
  private isAccessPatternSequential(accessHistory: number[]): boolean {
    if (accessHistory.length < 3) return false;
    
    // 检查访问间隔是否相对一致
    const intervals = [];
    for (let i = 1; i < accessHistory.length; i++) {
      intervals.push(accessHistory[i] - accessHistory[i - 1]);
    }
    
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const consistentIntervals = intervals.filter(interval => 
      Math.abs(interval - avgInterval) / avgInterval < 0.5
    );
    
    return consistentIntervals.length / intervals.length > 0.7;
  }

  /**
   * 检查访问模式是否随机
   */
  private isAccessPatternRandom(accessHistory: number[]): boolean {
    if (accessHistory.length < 5) return false;
    
    // 计算访问间隔的变异系数
    const intervals = [];
    for (let i = 1; i < accessHistory.length; i++) {
      intervals.push(accessHistory[i] - accessHistory[i - 1]);
    }
    
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    
    // 如果变异系数很大，认为是随机的
    return stdDev / avgInterval > 1.0;
  }

  /**
   * 检查是否需要后台刷新
   */
  private shouldBackgroundRefresh(key: string): boolean {
    const stats = this.queryStats.get(key);
    if (!stats) return false;
    
    const now = Date.now();
    const timeSinceLastAccess = now - stats.lastAccess;
    
    // 高频访问的数据需要更频繁的后台刷新
    if (stats.pattern === QueryPattern.FREQUENT && timeSinceLastAccess > 2 * 60 * 1000) {
      return true;
    }
    
    // 可预测模式的数据可以提前刷新
    if (stats.pattern === QueryPattern.PREDICTABLE && timeSinceLastAccess > 5 * 60 * 1000) {
      return true;
    }
    
    return false;
  }

  /**
   * 安排后台刷新
   */
  private scheduleBackgroundRefresh<T>(key: string, fetcher: () => Promise<T>): void {
    setTimeout(async () => {
      try {
        const data = await fetcher();
        const ttl = this.calculateAdaptiveTTL(key, 0);
        await optimizedQueryCache.set(key, data, { ttl });
        logger.debug('后台刷新完成', { key });
      } catch (error) {
        logger.error('后台刷新失败', { key, error });
      }
    }, 100); // 延迟100ms执行
  }

  /**
   * 安排预测性预加载
   */
  private schedulePredictivePreload(key: string): void {
    if (this.preloadTimer) return;
    
    this.preloadTimer = setTimeout(() => {
      this.predictivePreload(key);
      this.preloadTimer = null;
    }, 500); // 延迟500ms执行
  }

  /**
   * 模拟预加载
   */
  private async simulatePreload(prediction: PredictionResult): Promise<void> {
    // 这里应该根据具体业务逻辑实现预加载
    // 例如：根据预测的key模式生成实际的查询
    logger.debug('模拟预加载', { prediction });
  }

  /**
   * 检查内存限制是否超出
   */
  private isMemoryLimitExceeded(): boolean {
    return this.performanceMetrics.memoryUsage > this.config.memoryLimit;
  }

  /**
   * 执行内存清理
   */
  private async performMemoryCleanup(): Promise<void> {
    logger.info('执行内存清理');
    
    // 清理低优先级和长时间未访问的缓存
    const now = Date.now();
    const keysToClean: string[] = [];
    
    this.queryStats.forEach((stats, key) => {
      const timeSinceLastAccess = now - stats.lastAccess;
      
      // 清理条件
      if (
        stats.priority === CachePriority.LOW ||
        stats.priority === CachePriority.BACKGROUND ||
        timeSinceLastAccess > 30 * 60 * 1000 || // 30分钟未访问
        stats.accessTrend < -0.5 // 访问趋势下降
      ) {
        keysToClean.push(key);
      }
    });
    
    // 执行清理
    for (const key of keysToClean) {
      await optimizedQueryCache.delete(key);
      this.compressionCache.delete(key);
      this.queryStats.delete(key);
      this.accessHistory.delete(key);
    }
    
    logger.info('内存清理完成', { cleanedKeys: keysToClean.length });
  }

  /**
   * 压缩数据
   */
  private compress(data: any): any {
    // 简单的压缩实现（实际应用中可以使用更高效的压缩算法）
    try {
      const jsonString = JSON.stringify(data);
      // 这里可以实现实际的压缩逻辑
      return {
        compressed: true,
        data: jsonString,
        originalSize: jsonString.length
      };
    } catch {
      return data;
    }
  }

  /**
   * 解压缩数据
   */
  private decompress(compressedData: any): any {
    if (compressedData.compressed) {
      try {
        return JSON.parse(compressedData.data);
      } catch {
        return compressedData.data;
      }
    }
    return compressedData;
  }

  /**
   * 计算数据大小
   */
  private calculateDataSize(data: any): number {
    try {
      return JSON.stringify(data).length * 2; // 粗略估算
    } catch {
      return 1024; // 默认1KB
    }
  }

  /**
   * 更新依赖图
   */
  private updateDependencyGraph(key: string, dependencies: string[]): void {
    this.dependencyGraph.set(key, new Set(dependencies));
  }

  /**
   * 更新全局性能指标
   */
  private updateGlobalMetrics(): void {
    const totalQueries = this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses;
    if (totalQueries > 0) {
      this.performanceMetrics.hitRate = this.performanceMetrics.cacheHits / totalQueries;
    }
    
    // 计算平均响应时间
    let totalResponseTime = 0;
    let queryCount = 0;
    
    this.queryStats.forEach(stats => {
      totalResponseTime += stats.avgResponseTime * (stats.hitCount + stats.missCount);
      queryCount += stats.hitCount + stats.missCount;
    });
    
    if (queryCount > 0) {
      this.performanceMetrics.avgResponseTime = totalResponseTime / queryCount;
    }
    
    // 计算内存使用
    this.performanceMetrics.memoryUsage = Array.from(this.queryStats.values())
      .reduce((sum, stats) => sum + stats.memoryUsage, 0);
  }

  /**
   * 启动优化管理
   */
  private startOptimizedManagement(): void {
    // 分析和优化定时器
    this.analysisTimer = setInterval(() => {
      this.performAnalysisAndOptimization();
    }, 2 * 60 * 1000); // 2分钟间隔
    
    // 清理定时器
    this.cleanupTimer = setInterval(() => {
      this.performRoutineCleanup();
    }, 5 * 60 * 1000); // 5分钟间隔
  }

  /**
   * 执行分析和优化
   */
  private performAnalysisAndOptimization(): void {
    const now = Date.now();
    
    // 清理过期统计
    this.queryStats.forEach((stats, key) => {
      if (now - stats.lastAccess > 2 * 60 * 60 * 1000) { // 2小时未访问
        this.queryStats.delete(key);
        this.accessHistory.delete(key);
      }
    });
    
    // 分析整体性能
    this.updateGlobalMetrics();
    
    const { hitRate, avgResponseTime } = this.performanceMetrics;
    
    logger.info('缓存性能分析', {
      totalQueries: this.queryStats.size,
      hitRate,
      avgResponseTime,
      memoryUsage: this.performanceMetrics.memoryUsage
    });
    
    // 自动调整策略
    if (hitRate < this.config.adaptiveThreshold) {
      this.config.type = CacheStrategyType.AGGRESSIVE;
      this.performanceMetrics.adaptiveAdjustments++;
      logger.info('切换到激进缓存策略', { hitRate });
    } else if (hitRate > 0.9) {
      this.config.type = CacheStrategyType.PREDICTIVE;
      this.performanceMetrics.adaptiveAdjustments++;
      logger.info('切换到预测性缓存策略', { hitRate });
    } else if (this.performanceMetrics.memoryUsage > this.config.memoryLimit * 0.8) {
      this.config.type = CacheStrategyType.MEMORY_OPTIMIZED;
      this.performanceMetrics.adaptiveAdjustments++;
      logger.info('切换到内存优化策略', { memoryUsage: this.performanceMetrics.memoryUsage });
    }
  }

  /**
   * 执行常规清理
   */
  private performRoutineCleanup(): void {
    // 清理压缩缓存中的过期项
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    this.compressionCache.forEach((value, key) => {
      if (value.timestamp && now - value.timestamp > this.config.maxTTL) {
        expiredKeys.push(key);
      }
    });
    
    expiredKeys.forEach(key => {
      this.compressionCache.delete(key);
    });
    
    if (expiredKeys.length > 0) {
      logger.debug('清理过期压缩缓存', { count: expiredKeys.length });
    }
  }

  /**
   * 获取统计信息
   */
  public getStats() {
    const stats = {
      totalQueries: this.queryStats.size,
      config: this.config,
      performanceMetrics: this.performanceMetrics,
      queries: {} as Record<string, any>
    };

    this.queryStats.forEach((queryStats, key) => {
      stats.queries[key] = {
        ...queryStats,
        hitRate: queryStats.hitCount / (queryStats.hitCount + queryStats.missCount)
      };
    });

    return stats;
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<CacheStrategyConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('缓存策略配置已更新', { config: this.config });
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    if (this.analysisTimer) {
      clearInterval(this.analysisTimer);
      this.analysisTimer = null;
    }
    
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
      this.preloadTimer = null;
    }
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    
    this.queryStats.clear();
    this.accessHistory.clear();
    this.compressionCache.clear();
    this.preloadQueue.clear();
    this.batchQueue.clear();
    this.dependencyGraph.clear();
    
    logger.info('智能缓存策略已销毁');
  }
}

// 导出单例实例
export const intelligentCacheStrategy = IntelligentCacheStrategy.getInstance();

/**
 * 智能缓存 Hook（优化版）
 */
export function useIntelligentCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    priority?: CachePriority;
    tags?: string[];
    ttl?: number;
    dependencies?: string[];
    enableCompression?: boolean;
    enablePreload?: boolean;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef(options);

  // 更新引用
  useEffect(() => {
    fetcherRef.current = fetcher;
    optionsRef.current = options;
  }, [fetcher, options]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await intelligentCacheStrategy.get(key, fetcherRef.current, optionsRef.current);
      setData(result);
      
      // 触发预加载
      if (optionsRef.current.enablePreload) {
        intelligentCacheStrategy.predictivePreload(key);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = useCallback(async () => {
    await optimizedQueryCache.delete(key);
    fetchData();
  }, [key, fetchData]);

  const preload = useCallback(async () => {
    await intelligentCacheStrategy.predictivePreload(key);
  }, [key]);

  return { 
    data, 
    loading, 
    error, 
    refetch: fetchData, 
    invalidate,
    preload,
    stats: intelligentCacheStrategy.getStats()
  };
}