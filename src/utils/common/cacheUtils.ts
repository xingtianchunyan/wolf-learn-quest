/**
 * @fileoverview 缓存管理公共函数库
 * 统一项目中的缓存逻辑，提供内存缓存、本地存储缓存和分布式缓存功能
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { createLogger } from '@/lib/logger';

const logger = createLogger('cache-utils');

/**
 * 缓存项接口
 */
export interface CacheItem<T = any> {
  /** 缓存值 */
  value: T;
  /** 过期时间戳 */
  expiresAt: number;
  /** 创建时间戳 */
  createdAt: number;
  /** 访问次数 */
  accessCount: number;
  /** 最后访问时间 */
  lastAccessedAt: number;
  /** 缓存键 */
  key: string;
  /** 数据大小（字节） */
  size?: number;
  /** 标签（用于批量操作） */
  tags?: string[];
}

/**
 * 缓存配置接口
 */
export interface CacheConfig {
  /** 默认过期时间（毫秒） */
  defaultTTL: number;
  /** 最大缓存项数量 */
  maxItems: number;
  /** 最大内存使用量（字节） */
  maxMemory: number;
  /** 清理策略 */
  evictionPolicy: 'LRU' | 'LFU' | 'FIFO' | 'TTL';
  /** 自动清理间隔（毫秒） */
  cleanupInterval: number;
  /** 是否启用统计 */
  enableStats: boolean;
}

/**
 * 缓存统计信息接口
 */
export interface CacheStats {
  /** 命中次数 */
  hits: number;
  /** 未命中次数 */
  misses: number;
  /** 命中率 */
  hitRate: number;
  /** 当前项数量 */
  itemCount: number;
  /** 内存使用量 */
  memoryUsage: number;
  /** 过期清理次数 */
  evictions: number;
  /** 最后重置时间 */
  lastResetAt: number;
}

/**
 * 默认缓存配置
 */
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  defaultTTL: 5 * 60 * 1000, // 5分钟
  maxItems: 1000,
  maxMemory: 50 * 1024 * 1024, // 50MB
  evictionPolicy: 'LRU',
  cleanupInterval: 60 * 1000, // 1分钟
  enableStats: true,
};

/**
 * 内存缓存管理器
 */
export class MemoryCache<T = any> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private config: CacheConfig;
  private stats: CacheStats;
  private cleanupTimer?: NodeJS.Timeout;

  /**
   * 构造函数
   * @param config - 缓存配置
   */
  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CACHE_CONFIG, ...config };
    this.stats = this.initStats();
    this.startCleanupTimer();
  }

  /**
   * 初始化统计信息
   * @returns 初始统计信息
   */
  private initStats(): CacheStats {
    return {
      hits: 0,
      misses: 0,
      hitRate: 0,
      itemCount: 0,
      memoryUsage: 0,
      evictions: 0,
      lastResetAt: Date.now(),
    };
  }

  /**
   * 启动清理定时器
   */
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * 计算数据大小（简单估算）
   * @param value - 数据值
   * @returns 大小（字节）
   */
  private calculateSize(value: T): number {
    try {
      return JSON.stringify(value).length * 2; // UTF-16编码，每字符2字节
    } catch {
      return 0;
    }
  }

  /**
   * 更新统计信息
   * @param hit - 是否命中
   */
  private updateStats(hit: boolean): void {
    if (!this.config.enableStats) {
      return;
    }

    if (hit) {
      this.stats.hits++;
    } else {
      this.stats.misses++;
    }

    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
    this.stats.itemCount = this.cache.size;

    // 计算内存使用量
    this.stats.memoryUsage = Array.from(this.cache.values()).reduce(
      (total, item) => total + (item.size || 0),
      0
    );
  }

  /**
   * 设置缓存项
   * @param key - 缓存键
   * @param value - 缓存值
   * @param ttl - 过期时间（毫秒），可选
   * @param tags - 标签，可选
   */
  set(key: string, value: T, ttl?: number, tags?: string[]): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.config.defaultTTL);
    const size = this.calculateSize(value);

    const item: CacheItem<T> = {
      value,
      expiresAt,
      createdAt: now,
      accessCount: 0,
      lastAccessedAt: now,
      key,
      size,
      tags,
    };

    // 检查是否需要清理空间
    this.ensureCapacity();

    this.cache.set(key, item);
    this.updateStats(false);

    logger.debug('设置缓存项', { key, size, expiresAt, tags });
  }

  /**
   * 获取缓存项
   * @param key - 缓存键
   * @returns 缓存值或undefined
   */
  get(key: string): T | undefined {
    const item = this.cache.get(key);

    if (!item) {
      this.updateStats(false);
      return undefined;
    }

    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.stats.evictions++;
      this.updateStats(false);
      return undefined;
    }

    // 更新访问信息
    item.accessCount++;
    item.lastAccessedAt = Date.now();

    this.updateStats(true);
    return item.value;
  }

  /**
   * 检查缓存项是否存在
   * @param key - 缓存键
   * @returns 是否存在
   */
  has(key: string): boolean {
    const item = this.cache.get(key);

    if (!item) {
      return false;
    }

    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.stats.evictions++;
      return false;
    }

    return true;
  }

  /**
   * 删除缓存项
   * @param key - 缓存键
   * @returns 是否删除成功
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.updateStats(false);
      logger.debug('删除缓存项', { key });
    }
    return deleted;
  }

  /**
   * 根据标签批量删除
   * @param tag - 标签
   * @returns 删除的项数量
   */
  deleteByTag(tag: string): number {
    let deletedCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (item.tags?.includes(tag)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      this.updateStats(false);
      logger.debug('根据标签删除缓存项', { tag, deletedCount });
    }

    return deletedCount;
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    const itemCount = this.cache.size;
    this.cache.clear();
    this.stats = this.initStats();
    logger.info('清空所有缓存', { itemCount });
  }

  /**
   * 确保缓存容量
   */
  private ensureCapacity(): void {
    // 检查项数量限制
    if (this.cache.size >= this.config.maxItems) {
      this.evictItems(Math.floor(this.config.maxItems * 0.1)); // 清理10%
    }

    // 检查内存限制
    const currentMemory = Array.from(this.cache.values()).reduce(
      (total, item) => total + (item.size || 0),
      0
    );

    if (currentMemory >= this.config.maxMemory) {
      this.evictItems(Math.floor(this.cache.size * 0.2)); // 清理20%
    }
  }

  /**
   * 根据策略清理缓存项
   * @param count - 要清理的项数量
   */
  private evictItems(count: number): void {
    if (count <= 0) {
      return;
    }

    const items = Array.from(this.cache.entries());
    let toEvict: string[] = [];

    switch (this.config.evictionPolicy) {
      case 'LRU': // 最近最少使用
        toEvict = items
          .sort(([, a], [, b]) => a.lastAccessedAt - b.lastAccessedAt)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'LFU': // 最少使用频率
        toEvict = items
          .sort(([, a], [, b]) => a.accessCount - b.accessCount)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'FIFO': // 先进先出
        toEvict = items
          .sort(([, a], [, b]) => a.createdAt - b.createdAt)
          .slice(0, count)
          .map(([key]) => key);
        break;

      case 'TTL': // 最早过期
        toEvict = items
          .sort(([, a], [, b]) => a.expiresAt - b.expiresAt)
          .slice(0, count)
          .map(([key]) => key);
        break;
    }

    toEvict.forEach(key => {
      this.cache.delete(key);
      this.stats.evictions++;
    });

    logger.debug('清理缓存项', {
      policy: this.config.evictionPolicy,
      evicted: toEvict.length,
    });
  }

  /**
   * 清理过期项
   */
  private cleanup(): void {
    const now = Date.now();
    let expiredCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        expiredCount++;
      }
    }

    if (expiredCount > 0) {
      this.stats.evictions += expiredCount;
      this.updateStats(false);
      logger.debug('清理过期缓存项', { expiredCount });
    }
  }

  /**
   * 获取统计信息
   * @returns 统计信息
   */
  getStats(): CacheStats {
    this.updateStats(false);
    return { ...this.stats };
  }

  /**
   * 重置统计信息
   */
  resetStats(): void {
    this.stats = this.initStats();
    logger.info('重置缓存统计信息');
  }

  /**
   * 获取所有缓存键
   * @returns 缓存键列表
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * 获取缓存项信息（不更新访问统计）
   * @param key - 缓存键
   * @returns 缓存项信息
   */
  getItemInfo(key: string): Omit<CacheItem<T>, 'value'> | undefined {
    const item = this.cache.get(key);
    if (!item) {
      return undefined;
    }

    const { value, ...info } = item;
    return info;
  }

  /**
   * 销毁缓存管理器
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
    this.clear();
    logger.info('销毁缓存管理器');
  }
}

/**
 * 本地存储缓存管理器
 */
export class LocalStorageCache {
  private prefix: string;
  private defaultTTL: number;

  /**
   * 构造函数
   * @param prefix - 键前缀
   * @param defaultTTL - 默认过期时间（毫秒）
   */
  constructor(
    prefix: string = 'cache_',
    defaultTTL: number = 24 * 60 * 60 * 1000
  ) {
    this.prefix = prefix;
    this.defaultTTL = defaultTTL;
  }

  /**
   * 生成完整键名
   * @param key - 原始键
   * @returns 完整键名
   */
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * 设置缓存项
   * @param key - 缓存键
   * @param value - 缓存值
   * @param ttl - 过期时间（毫秒），可选
   */
  set<T>(key: string, value: T, ttl?: number): void {
    try {
      const item: CacheItem<T> = {
        value,
        expiresAt: Date.now() + (ttl || this.defaultTTL),
        createdAt: Date.now(),
        accessCount: 0,
        lastAccessedAt: Date.now(),
        key,
      };

      localStorage.setItem(this.getFullKey(key), JSON.stringify(item));
      logger.debug('设置本地存储缓存', { key, ttl });
    } catch (error) {
      logger.error('设置本地存储缓存失败', { key, error });
    }
  }

  /**
   * 获取缓存项
   * @param key - 缓存键
   * @returns 缓存值或undefined
   */
  get<T>(key: string): T | undefined {
    try {
      const data = localStorage.getItem(this.getFullKey(key));
      if (!data) {
        return undefined;
      }

      const item: CacheItem<T> = JSON.parse(data);

      // 检查是否过期
      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return undefined;
      }

      // 更新访问信息
      item.accessCount++;
      item.lastAccessedAt = Date.now();
      localStorage.setItem(this.getFullKey(key), JSON.stringify(item));

      return item.value;
    } catch (error) {
      logger.error('获取本地存储缓存失败', { key, error });
      return undefined;
    }
  }

  /**
   * 检查缓存项是否存在
   * @param key - 缓存键
   * @returns 是否存在
   */
  has(key: string): boolean {
    try {
      const data = localStorage.getItem(this.getFullKey(key));
      if (!data) {
        return false;
      }

      const item: CacheItem = JSON.parse(data);

      // 检查是否过期
      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * 删除缓存项
   * @param key - 缓存键
   * @returns 是否删除成功
   */
  delete(key: string): boolean {
    try {
      localStorage.removeItem(this.getFullKey(key));
      logger.debug('删除本地存储缓存', { key });
      return true;
    } catch (error) {
      logger.error('删除本地存储缓存失败', { key, error });
      return false;
    }
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage).filter(key =>
        key.startsWith(this.prefix)
      );
      keys.forEach(key => localStorage.removeItem(key));
      logger.info('清空本地存储缓存', { count: keys.length });
    } catch (error) {
      logger.error('清空本地存储缓存失败', { error });
    }
  }

  /**
   * 清理过期项
   */
  cleanup(): void {
    try {
      const keys = Object.keys(localStorage).filter(key =>
        key.startsWith(this.prefix)
      );
      let cleanedCount = 0;

      keys.forEach(fullKey => {
        try {
          const data = localStorage.getItem(fullKey);
          if (data) {
            const item: CacheItem = JSON.parse(data);
            if (Date.now() > item.expiresAt) {
              localStorage.removeItem(fullKey);
              cleanedCount++;
            }
          }
        } catch {
          // 数据格式错误，直接删除
          localStorage.removeItem(fullKey);
          cleanedCount++;
        }
      });

      if (cleanedCount > 0) {
        logger.debug('清理过期本地存储缓存', { cleanedCount });
      }
    } catch (error) {
      logger.error('清理本地存储缓存失败', { error });
    }
  }
}

/**
 * 缓存工具函数
 */
export const cacheUtils = {
  /**
   * 创建内存缓存实例
   * @param config - 缓存配置
   * @returns 内存缓存实例
   */
  createMemoryCache<T = any>(config?: Partial<CacheConfig>): MemoryCache<T> {
    return new MemoryCache<T>(config);
  },

  /**
   * 创建本地存储缓存实例
   * @param prefix - 键前缀
   * @param defaultTTL - 默认过期时间
   * @returns 本地存储缓存实例
   */
  createLocalStorageCache(
    prefix?: string,
    defaultTTL?: number
  ): LocalStorageCache {
    return new LocalStorageCache(prefix, defaultTTL);
  },

  /**
   * 缓存装饰器工厂
   * @param cache - 缓存实例
   * @param keyGenerator - 键生成函数
   * @param ttl - 过期时间
   * @returns 装饰器函数
   */
  cached<T extends (...args: any[]) => any>(
    cache: MemoryCache,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: Parameters<T>): ReturnType<T> {
        const key = keyGenerator(...args);

        // 尝试从缓存获取
        const cached = cache.get(key);
        if (cached !== undefined) {
          return cached;
        }

        // 执行原方法并缓存结果
        const result = originalMethod.apply(this, args);
        cache.set(key, result, ttl);

        return result;
      };

      return descriptor;
    };
  },

  /**
   * 异步缓存装饰器工厂
   * @param cache - 缓存实例
   * @param keyGenerator - 键生成函数
   * @param ttl - 过期时间
   * @returns 装饰器函数
   */
  cachedAsync<T extends (...args: any[]) => Promise<any>>(
    cache: MemoryCache,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (
        ...args: Parameters<T>
      ): Promise<Awaited<ReturnType<T>>> {
        const key = keyGenerator(...args);

        // 尝试从缓存获取
        const cached = cache.get(key);
        if (cached !== undefined) {
          return cached;
        }

        // 执行原方法并缓存结果
        const result = await originalMethod.apply(this, args);
        cache.set(key, result, ttl);

        return result;
      };

      return descriptor;
    };
  },
};

/**
 * 全局缓存实例
 */
export const globalMemoryCache = new MemoryCache({
  defaultTTL: 10 * 60 * 1000, // 10分钟
  maxItems: 500,
  maxMemory: 25 * 1024 * 1024, // 25MB
  evictionPolicy: 'LRU',
});

export const globalLocalStorageCache = new LocalStorageCache(
  'wolf_quest_',
  24 * 60 * 60 * 1000
);

// 定期清理本地存储缓存
if (typeof window !== 'undefined') {
  setInterval(
    () => {
      globalLocalStorageCache.cleanup();
    },
    60 * 60 * 1000
  ); // 每小时清理一次
}
