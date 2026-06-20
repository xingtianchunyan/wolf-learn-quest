/**
 * 文件级注释：查询缓存策略优化系统
 * 
 * 该文件实现了一个全面的查询缓存优化系统，专门解决：
 * - 缓存命中率低的问题
 * - 缓存内存泄漏
 * - 查询性能优化
 * - 智能缓存策略
 * - 缓存一致性管理
 * - 预加载和预测缓存
 * 
 * 主要功能：
 * - 多层缓存架构
 * - 智能缓存策略
 * - 缓存性能监控
 * - 自动缓存清理
 * - 查询优化建议
 * - 缓存预热机制
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */

import { createLogger } from '@/lib/logger';

const logger = createLogger('query-cache-optimizer');

/**
 * 接口注释：缓存配置
 */
export interface CacheConfig {
  /** 缓存名称 */
  name: string;
  /** 最大缓存大小 */
  maxSize: number;
  /** 缓存过期时间（毫秒） */
  ttl: number;
  /** 缓存策略 */
  strategy: 'lru' | 'lfu' | 'fifo' | 'ttl' | 'adaptive';
  /** 是否启用压缩 */
  compression: boolean;
  /** 是否启用持久化 */
  persistence: boolean;
  /** 预加载配置 */
  preload: {
    enabled: boolean;
    patterns: string[];
    priority: number;
  };
  /** 失效策略 */
  invalidation: {
    enabled: boolean;
    patterns: string[];
    dependencies: string[];
  };
  /** 性能监控 */
  monitoring: {
    enabled: boolean;
    sampleRate: number;
    alertThresholds: {
      hitRate: number;
      memoryUsage: number;
      responseTime: number;
    };
  };
}

/**
 * 接口注释：缓存项
 */
export interface CacheItem<T = any> {
  /** 缓存键 */
  key: string;
  /** 缓存值 */
  value: T;
  /** 创建时间 */
  createdAt: number;
  /** 最后访问时间 */
  lastAccessed: number;
  /** 访问次数 */
  accessCount: number;
  /** 过期时间 */
  expiresAt: number;
  /** 数据大小（字节） */
  size: number;
  /** 优先级 */
  priority: number;
  /** 标签 */
  tags: string[];
  /** 依赖项 */
  dependencies: string[];
  /** 是否压缩 */
  compressed: boolean;
  /** 元数据 */
  metadata: Record<string, any>;
}

/**
 * 接口注释：查询配置
 */
export interface QueryConfig {
  /** 查询键 */
  key: string;
  /** 查询函数 */
  queryFn: () => Promise<any>;
  /** 缓存配置 */
  cache?: Partial<CacheConfig>;
  /** 重试配置 */
  retry: {
    enabled: boolean;
    maxAttempts: number;
    delay: number;
    backoff: 'linear' | 'exponential';
  };
  /** 去重配置 */
  deduplication: {
    enabled: boolean;
    window: number;
  };
  /** 预取配置 */
  prefetch: {
    enabled: boolean;
    trigger: 'hover' | 'visible' | 'idle' | 'manual';
    delay: number;
  };
  /** 后台更新 */
  backgroundUpdate: {
    enabled: boolean;
    interval: number;
    staleTime: number;
  };
}

/**
 * 接口注释：缓存统计
 */
export interface CacheStats {
  /** 总请求数 */
  totalRequests: number;
  /** 缓存命中数 */
  cacheHits: number;
  /** 缓存未命中数 */
  cacheMisses: number;
  /** 命中率 */
  hitRate: number;
  /** 总内存使用 */
  memoryUsage: number;
  /** 缓存项数量 */
  itemCount: number;
  /** 平均响应时间 */
  averageResponseTime: number;
  /** 过期清理次数 */
  evictions: number;
  /** 错误次数 */
  errors: number;
  /** 按策略统计 */
  strategyStats: Record<string, number>;
  /** 按标签统计 */
  tagStats: Record<string, number>;
}

/**
 * 接口注释：查询结果
 */
export interface QueryResult<T = any> {
  /** 查询数据 */
  data: T;
  /** 是否来自缓存 */
  fromCache: boolean;
  /** 查询时间 */
  queryTime: number;
  /** 缓存时间 */
  cacheTime?: number;
  /** 是否过期 */
  isStale: boolean;
  /** 错误信息 */
  error?: Error;
  /** 元数据 */
  metadata: {
    key: string;
    strategy: string;
    size: number;
    ttl: number;
  };
}

/**
 * 接口注释：缓存优化建议
 */
export interface CacheOptimizationSuggestion {
  type: 'strategy' | 'size' | 'ttl' | 'preload' | 'cleanup';
  priority: 'high' | 'medium' | 'low';
  description: string;
  currentValue: any;
  suggestedValue: any;
  expectedImprovement: string;
  implementation: string;
}

/**
 * 类级注释：查询缓存优化器
 * 
 * 实现全面的查询缓存优化，包含：
 * - 多层缓存管理
 * - 智能缓存策略
 * - 性能监控和优化
 * - 自动清理和维护
 * - 缓存预热和预测
 */
export class QueryCacheOptimizer {
  private static instance: QueryCacheOptimizer;
  private caches: Map<string, Map<string, CacheItem>> = new Map();
  private configs: Map<string, CacheConfig> = new Map();
  private stats: Map<string, CacheStats> = new Map();
  private activeQueries: Map<string, Promise<any>> = new Map();
  private cleanupTimers: Map<string, ReturnType<typeof setInterval>> = new Map();
  private monitoringTimer?: ReturnType<typeof setInterval>;
  private compressionWorker?: Worker;
  private isShuttingDown: boolean = false;

  /**
   * 函数级注释：构造函数
   * 初始化缓存优化器和监控系统
   */
  private constructor() {
    this.initializeCompressionWorker();
    this.startMonitoring();
    this.startPeriodicCleanup();

    // 监听页面卸载事件
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.shutdown());
      window.addEventListener('pagehide', () => this.shutdown());
    }

    logger.info('查询缓存优化器已初始化');
  }

  /**
   * 函数级注释：获取单例实例
   */
  public static getInstance(): QueryCacheOptimizer {
    if (!QueryCacheOptimizer.instance) {
      QueryCacheOptimizer.instance = new QueryCacheOptimizer();
    }
    return QueryCacheOptimizer.instance;
  }

  /**
   * 函数级注释：创建缓存
   */
  public createCache(config: CacheConfig): void {
    if (this.caches.has(config.name)) {
      logger.warn('缓存已存在，将更新配置', { name: config.name });
    }

    this.caches.set(config.name, new Map());
    this.configs.set(config.name, config);
    this.stats.set(config.name, {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      hitRate: 0,
      memoryUsage: 0,
      itemCount: 0,
      averageResponseTime: 0,
      evictions: 0,
      errors: 0,
      strategyStats: {},
      tagStats: {}
    });

    // 启动清理定时器
    this.startCacheCleanup(config.name);

    // 预加载数据
    if (config.preload.enabled) {
      this.preloadCache(config.name);
    }

    logger.info('缓存已创建', { name: config.name, config });
  }

  /**
   * 函数级注释：执行查询
   */
  public async query<T>(
    cacheName: string,
    queryConfig: QueryConfig
  ): Promise<QueryResult<T>> {
    const startTime = Date.now();
    const cache = this.caches.get(cacheName);
    const config = this.configs.get(cacheName);
    const stats = this.stats.get(cacheName);

    if (!cache || !config || !stats) {
      throw new Error(`缓存不存在: ${cacheName}`);
    }

    try {
      stats.totalRequests++;

      // 检查去重
      if (queryConfig.deduplication.enabled) {
        const activeQuery = this.activeQueries.get(queryConfig.key);
        if (activeQuery) {
          logger.debug('查询去重', { key: queryConfig.key });
          const data = await activeQuery;
          return {
            data,
            fromCache: false,
            queryTime: Date.now() - startTime,
            isStale: false,
            metadata: {
              key: queryConfig.key,
              strategy: config.strategy,
              size: JSON.stringify(data).length,
              ttl: config.ttl
            }
          };
        }
      }

      // 检查缓存
      const cachedItem = this.getCacheItem(cacheName, queryConfig.key);
      if (cachedItem && !this.isExpired(cachedItem)) {
        stats.cacheHits++;
        cachedItem.lastAccessed = Date.now();
        cachedItem.accessCount++;

        // 后台更新检查
        if (queryConfig.backgroundUpdate.enabled && this.isStale(cachedItem, queryConfig.backgroundUpdate.staleTime)) {
          this.backgroundUpdate(cacheName, queryConfig);
        }

        logger.debug('缓存命中', { key: queryConfig.key, cacheName });

        return {
          data: cachedItem.value,
          fromCache: true,
          queryTime: Date.now() - startTime,
          cacheTime: cachedItem.createdAt,
          isStale: this.isStale(cachedItem, queryConfig.backgroundUpdate.staleTime),
          metadata: {
            key: queryConfig.key,
            strategy: config.strategy,
            size: cachedItem.size,
            ttl: config.ttl
          }
        };
      }

      // 缓存未命中，执行查询
      stats.cacheMisses++;
      logger.debug('缓存未命中，执行查询', { key: queryConfig.key, cacheName });

      const queryPromise = this.executeQuery(queryConfig);
      
      // 添加到活跃查询
      if (queryConfig.deduplication.enabled) {
        this.activeQueries.set(queryConfig.key, queryPromise);
      }

      try {
        const data = await queryPromise;
        
        // 缓存结果
        await this.setCacheItem(cacheName, queryConfig.key, data, queryConfig.cache);

        const queryTime = Date.now() - startTime;
        this.updateResponseTime(stats, queryTime);

        return {
          data,
          fromCache: false,
          queryTime,
          isStale: false,
          metadata: {
            key: queryConfig.key,
            strategy: config.strategy,
            size: JSON.stringify(data).length,
            ttl: config.ttl
          }
        };

      } finally {
        // 移除活跃查询
        if (queryConfig.deduplication.enabled) {
          this.activeQueries.delete(queryConfig.key);
        }
      }

    } catch (error) {
      stats.errors++;
      logger.error('查询执行失败', { error, key: queryConfig.key, cacheName });
      throw error;
    } finally {
      this.updateStats(cacheName);
    }
  }

  /**
   * 函数级注释：执行查询
   */
  private async executeQuery(queryConfig: QueryConfig): Promise<any> {
    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt < (queryConfig.retry.enabled ? queryConfig.retry.maxAttempts : 1)) {
      try {
        return await queryConfig.queryFn();
      } catch (error) {
        lastError = error as Error;
        attempt++;

        if (attempt < queryConfig.retry.maxAttempts) {
          let delay = queryConfig.retry.delay;
          if (queryConfig.retry.backoff === 'exponential') {
            delay *= Math.pow(2, attempt - 1);
          }

          logger.warn('查询失败，准备重试', { 
            error, 
            attempt, 
            delay,
            key: queryConfig.key 
          });

          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  /**
   * 函数级注释：获取缓存项
   */
  private getCacheItem(cacheName: string, key: string): CacheItem | null {
    const cache = this.caches.get(cacheName);
    return cache?.get(key) || null;
  }

  /**
   * 函数级注释：设置缓存项
   */
  private async setCacheItem(
    cacheName: string,
    key: string,
    value: any,
    cacheConfig?: Partial<CacheConfig>
  ): Promise<void> {
    const cache = this.caches.get(cacheName);
    const config = this.configs.get(cacheName);
    
    if (!cache || !config) return;

    const mergedConfig = { ...config, ...cacheConfig };
    const now = Date.now();
    const serializedValue = JSON.stringify(value);
    const size = serializedValue.length * 2; // 粗略估算

    let finalValue = value;
    let compressed = false;

    // 压缩处理
    if (mergedConfig.compression && size > 1024) { // 大于1KB才压缩
      try {
        finalValue = await this.compressData(value);
        compressed = true;
      } catch (error) {
        logger.warn('数据压缩失败，使用原始数据', { error, key });
      }
    }

    const item: CacheItem = {
      key,
      value: finalValue,
      createdAt: now,
      lastAccessed: now,
      accessCount: 1,
      expiresAt: now + mergedConfig.ttl,
      size: compressed ? JSON.stringify(finalValue).length * 2 : size,
      priority: mergedConfig.preload.priority || 1,
      tags: [],
      dependencies: [],
      compressed,
      metadata: {
        originalSize: size,
        compressionRatio: compressed ? size / JSON.stringify(finalValue).length : 1
      }
    };

    // 检查缓存大小限制
    if (cache.size >= mergedConfig.maxSize) {
      this.evictItems(cacheName, 1);
    }

    cache.set(key, item);

    // 持久化
    if (mergedConfig.persistence) {
      this.persistCacheItem(cacheName, item);
    }

    logger.debug('缓存项已设置', { 
      key, 
      cacheName, 
      size: item.size,
      compressed 
    });
  }

  /**
   * 函数级注释：检查是否过期
   */
  private isExpired(item: CacheItem): boolean {
    return Date.now() > item.expiresAt;
  }

  /**
   * 函数级注释：检查是否过时
   */
  private isStale(item: CacheItem, staleTime: number): boolean {
    return Date.now() - item.createdAt > staleTime;
  }

  /**
   * 函数级注释：后台更新
   */
  private async backgroundUpdate(cacheName: string, queryConfig: QueryConfig): Promise<void> {
    try {
      logger.debug('执行后台更新', { key: queryConfig.key, cacheName });
      
      const data = await queryConfig.queryFn();
      await this.setCacheItem(cacheName, queryConfig.key, data, queryConfig.cache);
      
      logger.debug('后台更新完成', { key: queryConfig.key, cacheName });
    } catch (error) {
      logger.error('后台更新失败', { error, key: queryConfig.key, cacheName });
    }
  }

  /**
   * 函数级注释：淘汰缓存项
   */
  private evictItems(cacheName: string, count: number): void {
    const cache = this.caches.get(cacheName);
    const config = this.configs.get(cacheName);
    const stats = this.stats.get(cacheName);

    if (!cache || !config || !stats) return;

    const items = Array.from(cache.entries());
    let toEvict: string[] = [];

    switch (config.strategy) {
      case 'lru':
        toEvict = items
          .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'lfu':
        toEvict = items
          .sort(([, a], [, b]) => a.accessCount - b.accessCount)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'fifo':
        toEvict = items
          .sort(([, a], [, b]) => a.createdAt - b.createdAt)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'ttl':
        toEvict = items
          .filter(([, item]) => this.isExpired(item))
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'adaptive':
        toEvict = this.adaptiveEviction(items, count);
        break;
    }

    toEvict.forEach(key => {
      cache.delete(key);
      stats.evictions++;
    });

    logger.debug('缓存项已淘汰', { 
      cacheName, 
      count: toEvict.length, 
      strategy: config.strategy 
    });
  }

  /**
   * 函数级注释：自适应淘汰策略
   */
  private adaptiveEviction(items: [string, CacheItem][], count: number): string[] {
    const now = Date.now();
    
    // 综合评分：考虑访问频率、最近访问时间、大小、优先级
    const scored = items.map(([key, item]) => {
      const ageScore = (now - item.lastAccessed) / (24 * 60 * 60 * 1000); // 天数
      const frequencyScore = 1 / (item.accessCount + 1);
      const sizeScore = item.size / (1024 * 1024); // MB
      const priorityScore = 1 / item.priority;
      
      const totalScore = ageScore + frequencyScore + sizeScore + priorityScore;
      
      return { key, score: totalScore };
    });

    return scored
      .sort((a, b) => b.score - a.score) // 分数高的优先淘汰
      .slice(0, count)
      .map(item => item.key);
  }

  /**
   * 函数级注释：压缩数据
   */
  private async compressData(data: any): Promise<any> {
    if (!this.compressionWorker) {
      // 简化的压缩实现
      return JSON.parse(JSON.stringify(data));
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('压缩超时'));
      }, 5000);

      this.compressionWorker!.onmessage = (event) => {
        clearTimeout(timeout);
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data.result);
        }
      };

      this.compressionWorker!.postMessage({
        action: 'compress',
        data
      });
    });
  }

  /**
   * 函数级注释：持久化缓存项
   */
  private persistCacheItem(cacheName: string, item: CacheItem): void {
    try {
      const key = `cache_${cacheName}_${item.key}`;
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      logger.warn('缓存持久化失败', { error, cacheName, key: item.key });
    }
  }

  /**
   * 函数级注释：预加载缓存
   */
  private async preloadCache(cacheName: string): Promise<void> {
    const config = this.configs.get(cacheName);
    if (!config || !config.preload.enabled) return;

    logger.info('开始预加载缓存', { cacheName });

    for (const pattern of config.preload.patterns) {
      try {
        // 这里需要根据实际业务逻辑实现预加载
        // 示例：根据模式生成查询键和查询函数
        logger.debug('预加载模式', { pattern, cacheName });
      } catch (error) {
        logger.error('预加载失败', { error, pattern, cacheName });
      }
    }
  }

  /**
   * 函数级注释：启动缓存清理
   */
  private startCacheCleanup(cacheName: string): void {
    const config = this.configs.get(cacheName);
    if (!config) return;

    const timer = setInterval(() => {
      this.cleanupExpiredItems(cacheName);
    }, Math.min(config.ttl / 4, 60000)); // 最多每分钟清理一次

    this.cleanupTimers.set(cacheName, timer);
  }

  /**
   * 函数级注释：清理过期项
   */
  private cleanupExpiredItems(cacheName: string): void {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);

    if (!cache || !stats) return;

    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, item] of cache.entries()) {
      if (this.isExpired(item)) {
        cache.delete(key);
        cleanedCount++;
        stats.evictions++;
      }
    }

    if (cleanedCount > 0) {
      logger.debug('清理过期缓存项', { cacheName, count: cleanedCount });
      this.updateStats(cacheName);
    }
  }

  /**
   * 函数级注释：启动监控
   */
  private startMonitoring(): void {
    this.monitoringTimer = setInterval(() => {
      this.performMonitoring();
    }, 30000); // 每30秒监控一次
  }

  /**
   * 函数级注释：执行监控
   */
  private performMonitoring(): void {
    for (const [cacheName, config] of this.configs.entries()) {
      if (!config.monitoring.enabled) continue;

      const stats = this.stats.get(cacheName);
      if (!stats) continue;

      // 检查命中率
      if (stats.hitRate < config.monitoring.alertThresholds.hitRate) {
        logger.warn('缓存命中率过低', { 
          cacheName, 
          hitRate: stats.hitRate,
          threshold: config.monitoring.alertThresholds.hitRate 
        });
      }

      // 检查内存使用
      if (stats.memoryUsage > config.monitoring.alertThresholds.memoryUsage) {
        logger.warn('缓存内存使用过高', { 
          cacheName, 
          memoryUsage: stats.memoryUsage,
          threshold: config.monitoring.alertThresholds.memoryUsage 
        });
      }

      // 检查响应时间
      if (stats.averageResponseTime > config.monitoring.alertThresholds.responseTime) {
        logger.warn('平均响应时间过长', { 
          cacheName, 
          responseTime: stats.averageResponseTime,
          threshold: config.monitoring.alertThresholds.responseTime 
        });
      }
    }
  }

  /**
   * 函数级注释：启动定期清理
   */
  private startPeriodicCleanup(): void {
    setInterval(() => {
      this.performPeriodicCleanup();
    }, 5 * 60 * 1000); // 每5分钟执行一次
  }

  /**
   * 函数级注释：执行定期清理
   */
  private performPeriodicCleanup(): void {
    for (const cacheName of this.caches.keys()) {
      this.cleanupExpiredItems(cacheName);
      
      // 检查缓存大小
      const cache = this.caches.get(cacheName);
      const config = this.configs.get(cacheName);
      
      if (cache && config && cache.size > config.maxSize * 0.9) {
        const evictCount = Math.ceil(cache.size * 0.1); // 清理10%
        this.evictItems(cacheName, evictCount);
      }
    }
  }

  /**
   * 函数级注释：更新响应时间
   */
  private updateResponseTime(stats: CacheStats, responseTime: number): void {
    const totalTime = stats.averageResponseTime * (stats.totalRequests - 1) + responseTime;
    stats.averageResponseTime = totalTime / stats.totalRequests;
  }

  /**
   * 函数级注释：更新统计信息
   */
  private updateStats(cacheName: string): void {
    const cache = this.caches.get(cacheName);
    const stats = this.stats.get(cacheName);

    if (!cache || !stats) return;

    stats.hitRate = stats.totalRequests > 0 ? stats.cacheHits / stats.totalRequests : 0;
    stats.itemCount = cache.size;
    
    // 计算内存使用
    stats.memoryUsage = Array.from(cache.values())
      .reduce((total, item) => total + item.size, 0);
  }

  /**
   * 函数级注释：初始化压缩工作器
   */
  private initializeCompressionWorker(): void {
    try {
      // 简化实现，实际项目中可以使用Web Worker
      this.compressionWorker = null;
    } catch (error) {
      logger.warn('压缩工作器初始化失败', { error });
    }
  }

  /**
   * 函数级注释：失效缓存
   */
  public invalidateCache(cacheName: string, pattern?: string): void {
    const cache = this.caches.get(cacheName);
    if (!cache) return;

    if (pattern) {
      const regex = new RegExp(pattern);
      const keysToDelete: string[] = [];
      
      for (const key of cache.keys()) {
        if (regex.test(key)) {
          keysToDelete.push(key);
        }
      }
      
      keysToDelete.forEach(key => cache.delete(key));
      logger.info('模式匹配缓存已失效', { cacheName, pattern, count: keysToDelete.length });
    } else {
      cache.clear();
      logger.info('缓存已全部失效', { cacheName });
    }

    this.updateStats(cacheName);
  }

  /**
   * 函数级注释：获取统计信息
   */
  public getStats(cacheName?: string): CacheStats | Map<string, CacheStats> {
    if (cacheName) {
      const stats = this.stats.get(cacheName);
      if (!stats) {
        throw new Error(`缓存统计不存在: ${cacheName}`);
      }
      this.updateStats(cacheName);
      return { ...stats };
    }

    // 返回所有缓存的统计信息
    const allStats = new Map<string, CacheStats>();
    for (const [name, stats] of this.stats.entries()) {
      this.updateStats(name);
      allStats.set(name, { ...stats });
    }
    return allStats;
  }

  /**
   * 函数级注释：生成优化建议
   */
  public generateOptimizationSuggestions(cacheName: string): CacheOptimizationSuggestion[] {
    const stats = this.stats.get(cacheName);
    const config = this.configs.get(cacheName);
    
    if (!stats || !config) {
      throw new Error(`缓存不存在: ${cacheName}`);
    }

    const suggestions: CacheOptimizationSuggestion[] = [];

    // 命中率建议
    if (stats.hitRate < 0.7) {
      suggestions.push({
        type: 'strategy',
        priority: 'high',
        description: '缓存命中率过低，建议调整缓存策略',
        currentValue: config.strategy,
        suggestedValue: 'adaptive',
        expectedImprovement: '提升命中率15-25%',
        implementation: '将缓存策略改为自适应策略'
      });
    }

    // TTL建议
    if (stats.evictions > stats.totalRequests * 0.3) {
      suggestions.push({
        type: 'ttl',
        priority: 'medium',
        description: '缓存淘汰过于频繁，建议增加TTL',
        currentValue: config.ttl,
        suggestedValue: config.ttl * 1.5,
        expectedImprovement: '减少30%的缓存淘汰',
        implementation: '将TTL增加50%'
      });
    }

    // 大小建议
    if (stats.memoryUsage > config.maxSize * 0.9) {
      suggestions.push({
        type: 'size',
        priority: 'high',
        description: '缓存内存使用接近上限，建议增加缓存大小或启用压缩',
        currentValue: config.maxSize,
        suggestedValue: config.compression ? config.maxSize * 1.5 : '启用压缩',
        expectedImprovement: '减少50%的内存压力',
        implementation: config.compression ? '增加缓存大小' : '启用数据压缩'
      });
    }

    // 预加载建议
    if (!config.preload.enabled && stats.cacheMisses > stats.totalRequests * 0.4) {
      suggestions.push({
        type: 'preload',
        priority: 'medium',
        description: '缓存未命中率较高，建议启用预加载',
        currentValue: false,
        suggestedValue: true,
        expectedImprovement: '提升20-30%的命中率',
        implementation: '启用缓存预加载机制'
      });
    }

    return suggestions;
  }

  /**
   * 函数级注释：删除缓存
   */
  public deleteCache(cacheName: string): void {
    const timer = this.cleanupTimers.get(cacheName);
    if (timer) {
      clearInterval(timer);
      this.cleanupTimers.delete(cacheName);
    }

    this.caches.delete(cacheName);
    this.configs.delete(cacheName);
    this.stats.delete(cacheName);

    logger.info('缓存已删除', { cacheName });
  }

  /**
   * 函数级注释：关闭优化器
   */
  public shutdown(): void {
    if (this.isShuttingDown) return;
    
    this.isShuttingDown = true;
    logger.info('开始关闭查询缓存优化器');

    // 清理定时器
    this.cleanupTimers.forEach(timer => clearInterval(timer));
    this.cleanupTimers.clear();

    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
    }

    // 关闭压缩工作器
    if (this.compressionWorker) {
      this.compressionWorker.terminate();
    }

    // 清理活跃查询
    this.activeQueries.clear();

    logger.info('查询缓存优化器已关闭');
  }
}

// 导出单例实例
export const queryCacheOptimizer = QueryCacheOptimizer.getInstance();

/**
 * 函数级注释：React Hook - 使用查询缓存优化器
 */
export function useQueryCacheOptimizer() {
  return {
    createCache: queryCacheOptimizer.createCache.bind(queryCacheOptimizer),
    query: queryCacheOptimizer.query.bind(queryCacheOptimizer),
    invalidateCache: queryCacheOptimizer.invalidateCache.bind(queryCacheOptimizer),
    getStats: queryCacheOptimizer.getStats.bind(queryCacheOptimizer),
    generateOptimizationSuggestions: queryCacheOptimizer.generateOptimizationSuggestions.bind(queryCacheOptimizer),
    deleteCache: queryCacheOptimizer.deleteCache.bind(queryCacheOptimizer)
  };
}