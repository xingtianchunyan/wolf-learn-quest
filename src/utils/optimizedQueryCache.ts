/**
 * 文件级注释：优化的查询缓存系统
 * 提供高性能的数据缓存、智能失效策略和内存管理功能
 * 统一所有查询缓存策略，解决缓存不一致问题
 */

import { useState, useEffect, useCallback } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('query-cache');

/**
 * 缓存项接口
 */
export interface CacheItem<T = any> {
  key: string;
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  tags: string[];
  size: number;
  metadata?: Record<string, any>;
}

/**
 * 缓存配置接口
 */
export interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  maxItems: number;
  enableCompression: boolean;
  enablePersistence: boolean;
  cleanupInterval: number;
  memoryThreshold: number;
  enableMetrics: boolean;
}

/**
 * 缓存统计接口
 */
export interface CacheStats {
  totalItems: number;
  totalSize: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
  evictionCount: number;
  memoryUsage: number;
  oldestItem: number;
  newestItem: number;
}

/**
 * 查询选项接口
 */
export interface QueryOptions {
  ttl?: number;
  tags?: string[];
  forceRefresh?: boolean;
  enableCache?: boolean;
  metadata?: Record<string, any>;
}

/**
 * 失效策略枚举
 */
export enum EvictionStrategy {
  LRU = 'lru',
  LFU = 'lfu',
  FIFO = 'fifo',
  TTL = 'ttl'
}

/**
 * 优化的查询缓存系统类
 */
class OptimizedQueryCache {
  private static instance: OptimizedQueryCache;
  private cache: Map<string, CacheItem> = new Map();
  private config: CacheConfig = {
    maxSize: 100 * 1024 * 1024, // 100MB
    defaultTTL: 5 * 60 * 1000, // 5分钟
    maxItems: 10000,
    enableCompression: false,
    enablePersistence: false,
    cleanupInterval: 60 * 1000, // 1分钟
    memoryThreshold: 80 * 1024 * 1024, // 80MB
    enableMetrics: true
  };
  private stats: CacheStats = {
    totalItems: 0,
    totalSize: 0,
    hitCount: 0,
    missCount: 0,
    hitRate: 0,
    evictionCount: 0,
    memoryUsage: 0,
    oldestItem: 0,
    newestItem: 0
  };
  private cleanupTimer?: ReturnType<typeof setInterval>;
  private evictionStrategy: EvictionStrategy = EvictionStrategy.LRU;

  private constructor() {
    this.startCleanupTimer();
    this.loadFromPersistence();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): OptimizedQueryCache {
    if (!OptimizedQueryCache.instance) {
      OptimizedQueryCache.instance = new OptimizedQueryCache();
    }
    return OptimizedQueryCache.instance;
  }

  /**
   * 设置缓存项
   */
  public async set<T>(
    key: string,
    data: T,
    options: QueryOptions = {}
  ): Promise<void> {
    try {
      const now = Date.now();
      const ttl = options.ttl || this.config.defaultTTL;
      const tags = options.tags || [];
      const size = this.calculateSize(data);

      // 检查是否需要清理空间
      if (this.shouldEvict(size)) {
        await this.evictItems(size);
      }

      const item: CacheItem<T> = {
        key,
        data,
        timestamp: now,
        ttl,
        accessCount: 0,
        lastAccessed: now,
        tags,
        size,
        metadata: options.metadata
      };

      // 如果启用压缩
      if (this.config.enableCompression) {
        item.data = await this.compressData(data);
      }

      this.cache.set(key, item);
      this.updateStats('set', item);

      logger.debug('缓存项已设置', {
        key,
        size,
        ttl,
        tags: tags.length
      });

    } catch (error) {
      logger.error('设置缓存项失败', { key, error });
      throw error;
    }
  }

  /**
   * 获取缓存项
   */
  public async get<T>(key: string): Promise<T | null> {
    try {
      const item = this.cache.get(key);

      if (!item) {
        this.updateStats('miss');
        return null;
      }

      // 检查是否过期
      if (this.isExpired(item)) {
        this.cache.delete(key);
        this.updateStats('miss');
        logger.debug('缓存项已过期', { key });
        return null;
      }

      // 更新访问信息
      item.accessCount++;
      item.lastAccessed = Date.now();

      this.updateStats('hit', item);

      // 如果启用压缩，解压数据
      let data = item.data;
      if (this.config.enableCompression) {
        data = await this.decompressData(item.data);
      }

      logger.debug('缓存命中', {
        key,
        accessCount: item.accessCount,
        age: Date.now() - item.timestamp
      });

      return data as T;

    } catch (error) {
      logger.error('获取缓存项失败', { key, error });
      this.updateStats('miss');
      return null;
    }
  }

  /**
   * 删除缓存项
   */
  public delete(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.updateStats('delete', item);
      logger.debug('缓存项已删除', { key });
      return true;
    }
    return false;
  }

  /**
   * 根据标签删除缓存项
   */
  public deleteByTags(tags: string[]): number {
    let deletedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (tags.some(tag => item.tags.includes(tag))) {
        this.cache.delete(key);
        this.updateStats('delete', item);
        deletedCount++;
      }
    }

    logger.info('根据标签删除缓存项', { tags, deletedCount });
    return deletedCount;
  }

  /**
   * 清空缓存
   */
  public clear(): void {
    const itemCount = this.cache.size;
    this.cache.clear();
    this.resetStats();
    logger.info('缓存已清空', { itemCount });
  }

  /**
   * 检查缓存项是否存在
   */
  public has(key: string): boolean {
    const item = this.cache.get(key);
    return item ? !this.isExpired(item) : false;
  }

  /**
   * 获取缓存统计
   */
  public getStats(): CacheStats {
    this.updateCurrentStats();
    return { ...this.stats };
  }

  /**
   * 获取所有缓存键
   */
  public keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * 获取缓存项数量
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * 预热缓存
   */
  public async warmup<T>(
    queries: Array<{ key: string; fetcher: () => Promise<T>; options?: QueryOptions }>
  ): Promise<void> {
    logger.info('开始缓存预热', { queryCount: queries.length });

    const promises = queries.map(async ({ key, fetcher, options }) => {
      try {
        if (!this.has(key)) {
          const data = await fetcher();
          await this.set(key, data, options);
        }
      } catch (error) {
        logger.error('缓存预热失败', { key, error });
      }
    });

    await Promise.all(promises);
    logger.info('缓存预热完成');
  }

  /**
   * 检查是否过期
   */
  private isExpired(item: CacheItem): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  /**
   * 检查是否需要清理
   */
  private shouldEvict(newItemSize: number): boolean {
    const currentSize = this.getCurrentSize();
    const currentItems = this.cache.size;

    return (
      currentSize + newItemSize > this.config.maxSize ||
      currentItems >= this.config.maxItems ||
      currentSize > this.config.memoryThreshold
    );
  }

  /**
   * 清理缓存项
   */
  private async evictItems(requiredSpace: number): Promise<void> {
    const itemsToEvict: Array<[string, CacheItem]> = [];
    let freedSpace = 0;

    // 根据策略排序
    const sortedItems = Array.from(this.cache.entries()).sort((a, b) => {
      switch (this.evictionStrategy) {
        case EvictionStrategy.LRU:
          return a[1].lastAccessed - b[1].lastAccessed;
        case EvictionStrategy.LFU:
          return a[1].accessCount - b[1].accessCount;
        case EvictionStrategy.FIFO:
          return a[1].timestamp - b[1].timestamp;
        case EvictionStrategy.TTL:
          return (a[1].timestamp + a[1].ttl) - (b[1].timestamp + b[1].ttl);
        default:
          return a[1].lastAccessed - b[1].lastAccessed;
      }
    });

    // 选择要清理的项
    for (const [key, item] of sortedItems) {
      if (freedSpace >= requiredSpace && itemsToEvict.length > 0) {
        break;
      }
      itemsToEvict.push([key, item]);
      freedSpace += item.size;
    }

    // 执行清理
    for (const [key, item] of itemsToEvict) {
      this.cache.delete(key);
      this.stats.evictionCount++;
      logger.debug('缓存项已清理', {
        key,
        strategy: this.evictionStrategy,
        size: item.size
      });
    }

    logger.info('缓存清理完成', {
      evictedItems: itemsToEvict.length,
      freedSpace,
      strategy: this.evictionStrategy
    });
  }

  /**
   * 计算数据大小
   */
  private calculateSize(data: any): number {
    try {
      const jsonString = JSON.stringify(data);
      return new Blob([jsonString]).size;
    } catch (error) {
      logger.warn('计算数据大小失败', error);
      return 1024; // 默认1KB
    }
  }

  /**
   * 获取当前总大小
   */
  private getCurrentSize(): number {
    let totalSize = 0;
    for (const item of this.cache.values()) {
      totalSize += item.size;
    }
    return totalSize;
  }

  /**
   * 压缩数据
   */
  private async compressData(data: any): Promise<any> {
    // 这里可以实现数据压缩逻辑
    // 暂时直接返回原数据
    return data;
  }

  /**
   * 解压数据
   */
  private async decompressData(data: any): Promise<any> {
    // 这里可以实现数据解压逻辑
    // 暂时直接返回原数据
    return data;
  }

  /**
   * 更新统计信息
   */
  private updateStats(operation: 'hit' | 'miss' | 'set' | 'delete', item?: CacheItem): void {
    if (!this.config.enableMetrics) return;

    switch (operation) {
      case 'hit':
        this.stats.hitCount++;
        break;
      case 'miss':
        this.stats.missCount++;
        break;
      case 'set':
        if (item) {
          this.stats.totalItems++;
          this.stats.totalSize += item.size;
        }
        break;
      case 'delete':
        if (item) {
          this.stats.totalItems = Math.max(0, this.stats.totalItems - 1);
          this.stats.totalSize = Math.max(0, this.stats.totalSize - item.size);
        }
        break;
    }

    // 更新命中率
    const totalRequests = this.stats.hitCount + this.stats.missCount;
    this.stats.hitRate = totalRequests > 0 ? this.stats.hitCount / totalRequests : 0;
  }

  /**
   * 更新当前统计
   */
  private updateCurrentStats(): void {
    this.stats.totalItems = this.cache.size;
    this.stats.totalSize = this.getCurrentSize();
    this.stats.memoryUsage = this.stats.totalSize;

    const timestamps = Array.from(this.cache.values()).map(item => item.timestamp);
    if (timestamps.length > 0) {
      this.stats.oldestItem = Math.min(...timestamps);
      this.stats.newestItem = Math.max(...timestamps);
    }
  }

  /**
   * 重置统计
   */
  private resetStats(): void {
    this.stats = {
      totalItems: 0,
      totalSize: 0,
      hitCount: 0,
      missCount: 0,
      hitRate: 0,
      evictionCount: 0,
      memoryUsage: 0,
      oldestItem: 0,
      newestItem: 0
    };
  }

  /**
   * 启动清理定时器
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.performCleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * 执行定期清理
   */
  private performCleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
        this.updateStats('delete', item);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      logger.debug('定期清理完成', { cleanedCount });
    }

    // 如果内存使用过高，执行额外清理
    if (this.getCurrentSize() > this.config.memoryThreshold) {
      this.evictItems(this.config.memoryThreshold * 0.2); // 清理20%的阈值空间
    }
  }

  /**
   * 从持久化存储加载
   */
  private loadFromPersistence(): void {
    if (!this.config.enablePersistence) return;

    try {
      const stored = localStorage.getItem('optimized-query-cache');
      if (stored) {
        const data = JSON.parse(stored);
        // 这里可以实现从持久化存储恢复缓存的逻辑
        logger.info('从持久化存储加载缓存');
      }
    } catch (error) {
      logger.warn('从持久化存储加载失败', error);
    }
  }

  /**
   * 保存到持久化存储
   */
  private saveToPersistence(): void {
    if (!this.config.enablePersistence) return;

    try {
      const data = Array.from(this.cache.entries());
      localStorage.setItem('optimized-query-cache', JSON.stringify(data));
      logger.debug('缓存已保存到持久化存储');
    } catch (error) {
      logger.warn('保存到持久化存储失败', error);
    }
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // 重启清理定时器
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.startCleanupTimer();

    logger.info('查询缓存配置已更新', this.config);
  }

  /**
   * 获取配置
   */
  public getConfig(): CacheConfig {
    return { ...this.config };
  }

  /**
   * 设置清理策略
   */
  public setEvictionStrategy(strategy: EvictionStrategy): void {
    this.evictionStrategy = strategy;
    logger.info('缓存清理策略已更新', { strategy });
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    
    if (this.config.enablePersistence) {
      this.saveToPersistence();
    }
    
    this.cache.clear();
    this.resetStats();
    logger.info('查询缓存已销毁');
  }
}

// 导出单例实例
export const optimizedQueryCache = OptimizedQueryCache.getInstance();

/**
 * 查询缓存装饰器
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    keyGenerator?: (...args: Parameters<T>) => string;
    ttl?: number;
    tags?: string[];
  } = {}
): T {
  return (async (...args: Parameters<T>) => {
    const key = options.keyGenerator 
      ? options.keyGenerator(...args)
      : `${fn.name}_${JSON.stringify(args)}`;

    // 尝试从缓存获取
    const cached = await optimizedQueryCache.get(key);
    if (cached !== null) {
      return cached;
    }

    // 执行原函数
    const result = await fn(...args);

    // 缓存结果
    await optimizedQueryCache.set(key, result, {
      ttl: options.ttl,
      tags: options.tags
    });

    return result;
  }) as T;
}

/**
 * 查询缓存 Hook
 */
export function useQueryCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: QueryOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 检查缓存
      if (!options.forceRefresh) {
        const cached = await optimizedQueryCache.get<T>(key);
        if (cached !== null) {
          setData(cached);
          setLoading(false);
          return;
        }
      }

      // 获取新数据
      const result = await fetcher();
      
      // 缓存结果
      if (options.enableCache !== false) {
        await optimizedQueryCache.set(key, result, options);
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = useCallback(() => {
    optimizedQueryCache.delete(key);
    fetchData();
  }, [key, fetchData]);

  return { data, loading, error, refetch: fetchData, invalidate };
}