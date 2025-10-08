import { createLogger  } from '@/lib/logger';

/**
* 缓存管理专用服务类
* 提供统一的缓存策略、存储管理和性能优化功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('cache-service');

/**
* 缓存策略枚举
 */
export enum CacheStrategy { LRU = 'lru',           // 最近最少使用
  LFU = 'lfu',           // 最少使用频率
  FIFO = 'fifo',         // 先进先出
  TTL = 'ttl',           // 基于时间过期
  ADAPTIVE = 'adaptive'   // 自适应策略,
}

/**
* 缓存存储类型枚举
 */
export enum CacheStorageType { MEMORY = 'memory',
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
  INDEXED_DB = 'indexedDB',
  HYBRID = 'hybrid';,
}

/**
* 缓存优先级枚举
 */
export enum CachePriority { LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  CRITICAL = 4;,
}

/**
* 缓存项接口
 */
export interface CacheItem<T = any> { key: string;
  value: T;
  timestamp: number;
  ttl?: number;
  expiresAt?: number;
  accessCount: number;
  lastAccessed: number;
  priority: CachePriority;
  size: number;
  tags?: string[];
  metadata?: Record<string, any>;,
}

/**
* 缓存配置接口
 */
export interface CacheConfig { strategy: CacheStrategy;
  storageType: CacheStorageType;
  maxSize: number;
  maxItems: number;
  defaultTTL: number;
  enableCompression: boolean;
  enableEncryption: boolean;
  enableStatistics: boolean;
  cleanupInterval: number;
  persistToDisk: boolean;
  syncAcrossTabs: boolean;,
}

/**
* 缓存统计接口
 */
export interface CacheStatistics { totalItems: number;
  totalSize: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
  evictionCount: number;
  compressionRatio: number;
  averageAccessTime: number;
  memoryUsage: number;
  storageUsage: number;
  topKeys: Array<{
    key: string;
    accessCount: number;
    size: number;,
}>;
  timeRange: { start: Date;
    end: Date;,
};,
}

/**
* 缓存事件接口
 */
export interface CacheEvent<T = any> { type: 'set' | 'get' | 'delete' | 'clear' | 'evict' | 'expire';
  key: string;
  value?: T;
  oldValue?: T;
  timestamp: Date;
  metadata?: Record<string, any>;,
}

/**
* 缓存查询选项接口
 */
export interface CacheQueryOptions { tags?: string[];
  priority?: CachePriority;
  minAccessCount?: number;
  maxAge?: number;
  pattern?: RegExp;,
}

/**
* 缓存批量操作结果接口
 */
export interface CacheBatchResult<T = any> { success: boolean;
  results: Array<{
    key: string;
    success: boolean;
    value?: T;
    error?: string;,
}>;
  totalProcessed: number;
  totalSuccessful: number;
  totalFailed: number;,
}

/**
* 缓存管理专用服务类
* 提供全面的缓存管理功能
 */
export class CacheService { private static instance: CacheService;
  private readonly logger = createLogger('cache-service');

  private cache: Map<string, CacheItem> = new Map();
  private config: CacheConfig;
  private statistics: CacheStatistics;
  private eventListeners: Map<string, Array<(event: CacheEvent) => void>> = new Map();
  private cleanupTimer: NodeJS.Timeout | null = null;
  private accessTimes: number[] = [];

  private constructor() {
    this.config = this.getDefaultConfig();
    this.statistics = this.initializeStatistics();
    this.initializeCacheService();,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): CacheService { if (!CacheService.instance) {
      CacheService.instance = new CacheService();,
}
    return CacheService.instance;,
}

  /**
  * 获取默认配置
   */
  private getDefaultConfig(): CacheConfig { return {
      strategy: CacheStrategy.LRU,
      storageType: CacheStorageType.MEMORY,
      maxSize: 50 * 1024 * 1024, // 50MB
      maxItems: 1000,
      defaultTTL: 30 * 60 * 1000, // 30分钟
      enableCompression: true,
      enableEncryption: false,
      enableStatistics: true,
      cleanupInterval: 5 * 60 * 1000, // 5分钟
      persistToDisk: false,
      syncAcrossTabs: false,
};,
}

  /**
  * 初始化统计信息
   */
  private initializeStatistics(): CacheStatistics { return {
      totalItems: 0,
      totalSize: 0,
      hitCount: 0,
      missCount: 0,
      hitRate: 0,
      evictionCount: 0,
      compressionRatio: 1,
      averageAccessTime: 0,
      memoryUsage: 0,
      storageUsage: 0,
      topKeys: [],
      timeRange: {
        start: new Date(),
        end: new Date(),
}
    };,
}

  /**
  * 初始化缓存服务
   */
  private initializeCacheService(): void { try {
      // 启动清理定时器
      this.startCleanupTimer();

      // 从持久化存储加载缓存
      if (this.config.persistToDisk) {
        this.loadFromPersistentStorage();,
}

      // 设置跨标签页同步
      if (this.config.syncAcrossTabs) { this.setupCrossTabSync();,
}

      this.logger.info('缓存服务初始化完成', { config: this.config  });,
} catch (error) { this.logger.error('缓存服务初始化失败', { error  });,
}
  }

  /**
  * 设置缓存项
  *
  * @param key - 缓存键
  * @param value - 缓存值
  * @param options - 缓存选项
  * @returns 是否设置成功
   */
  public async set<T>(
    key: string,
    value: T,
    options?: { ttl?: number;
      priority?: CachePriority;
      tags?: string[];
      metadata?: Record<string, any>;,
}
  ): Promise<boolean> { try {
      const startTime = performance.now();

      // 检查缓存容量
      if (!this.hasCapacity()) {
        await this.evictItems();,
}

      // 创建缓存项
      const item: CacheItem<T> = { key,
        value: this.config.enableCompression ? this.compress(value) : value,
        timestamp: Date.now(),
        ttl: options?.ttl || this.config.defaultTTL,
        expiresAt: options?.ttl ? Date.now() + options.ttl : Date.now() + this.config.defaultTTL,
        accessCount: 0,
        lastAccessed: Date.now(),
        priority: options?.priority || CachePriority.NORMAL,
        size: this.calculateSize(value),
        tags: options?.tags,
        metadata: options?.metadata,
};

      // 存储缓存项
      this.cache.set(key, item);

      // 更新统计信息
      this.updateStatisticsOnSet(item);

      // 持久化到存储
      if (this.config.persistToDisk) { await this.persistToStorage(key, item);,
}

      // 触发事件
      this.emitEvent({ type: 'set',
        key,
        value,
        timestamp: new Date(),
        metadata: options?.metadata,
});

      // 记录访问时间
      const accessTime = performance.now() - startTime;
      this.recordAccessTime(accessTime);

      this.logger.debug('缓存项已设置', { key, size: item.size, ttl: item.ttl  });

      return true;,
} catch (error) { this.logger.error('设置缓存项失败', { key, error  });
      return false;,
}
  }

  /**
  * 获取缓存项
  *
  * @param key - 缓存键
  * @returns 缓存值或null
   */
  public async get<T>(key: string): Promise<T | null> { try {
      const startTime = performance.now();

      const item = this.cache.get(key);
      if (!item) {
        this.statistics.missCount++;
        this.updateHitRate();
        return null;,
}

      // 检查是否过期
      if (this.isExpired(item)) { await this.delete(key);
        this.statistics.missCount++;
        this.updateHitRate();
        return null;,
}

      // 更新访问信息
      item.accessCount++;
      item.lastAccessed = Date.now();

      // 更新统计信息
      this.statistics.hitCount++;
      this.updateHitRate();

      // 触发事件
      this.emitEvent({ type: 'get',
        key,
        value: item.value,
        timestamp: new Date(),
});

      // 记录访问时间
      const accessTime = performance.now() - startTime;
      this.recordAccessTime(accessTime);

      // 解压缩值
      const value = this.config.enableCompression ? this.decompress(item.value) : item.value;

      this.logger.debug('缓存项已获取', { key, accessCount: item.accessCount  });

      return value as T;,
} catch (error) { this.logger.error('获取缓存项失败', { key, error  });
      this.statistics.missCount++;
      this.updateHitRate();
      return null;,
}
  }

  /**
  * 删除缓存项
  *
  * @param key - 缓存键
  * @returns 是否删除成功
   */
  public async delete(key: string): Promise<boolean> { try {
      const item = this.cache.get(key);
      if (!item) {
        return false;,
}

      // 从缓存中删除
      this.cache.delete(key);

      // 更新统计信息
      this.updateStatisticsOnDelete(item);

      // 从持久化存储删除
      if (this.config.persistToDisk) { await this.removeFromStorage(key);,
}

      // 触发事件
      this.emitEvent({ type: 'delete',
        key,
        oldValue: item.value,
        timestamp: new Date(),
});

      this.logger.debug('缓存项已删除', { key  });

      return true;,
} catch (error) { this.logger.error('删除缓存项失败', { key, error  });
      return false;,
}
  }

  /**
  * 检查缓存项是否存在
  *
  * @param key - 缓存键
  * @returns 是否存在
   */
  public has(key: string): boolean { const item = this.cache.get(key);
    if (!item) {
      return false;,
}

    if (this.isExpired(item)) { this.delete(key);
      return false;,
}

    return true;,
}

  /**
  * 清空缓存
   */
  public async clear(): Promise<void> { try {
      const keys = Array.from(this.cache.keys());

      this.cache.clear();
      this.statistics = this.initializeStatistics();

      // 清空持久化存储
      if (this.config.persistToDisk) {
        await this.clearPersistentStorage();,
}

      // 触发事件
      this.emitEvent({ type: 'clear',
        key: '*',
        timestamp: new Date(),
        metadata: { clearedKeys: keys  },
});

      this.logger.info('缓存已清空', { clearedCount: keys.length  });,
} catch (error) { this.logger.error('清空缓存失败', { error  });,
}
  }

  /**
  * 批量设置缓存项
  *
  * @param items - 缓存项数组
  * @returns 批量操作结果
   */
  public async setMany<T>(
    items: Array<{ key: string;
      value: T;
      options?: {
        ttl?: number;
        priority?: CachePriority;
        tags?: string[];
        metadata?: Record<string, any>;,
};,
}>
  ): Promise<CacheBatchResult<T>> { const result: CacheBatchResult<T> = {
      success: true,
      results: [],
      totalProcessed: items.length,
      totalSuccessful: 0,
      totalFailed: 0,
};

    for (const item of items) { try {
        const success = await this.set(item.key, item.value, item.options);

        result.results.push({
          key: item.key,
          success,
          value: item.value,
});

        if (success) { result.totalSuccessful++;,
} else { result.totalFailed++;,
}

      } catch (error) { result.results.push({
          key: item.key,
          success: false,
          error: error instanceof Error ? error.message : String(error),
});
        result.totalFailed++;,
}
    }

    result.success = result.totalFailed === 0;

    this.logger.info('批量设置缓存完成', { totalProcessed: result.totalProcessed,
      totalSuccessful: result.totalSuccessful,
      totalFailed: result.totalFailed,
});

    return result;,
}

  /**
  * 批量获取缓存项
  *
  * @param keys - 缓存键数组
  * @returns 批量操作结果
   */
  public async getMany<T>(keys: string[]): Promise<CacheBatchResult<T>> { const result: CacheBatchResult<T> = {
      success: true,
      results: [],
      totalProcessed: keys.length,
      totalSuccessful: 0,
      totalFailed: 0,
};

    for (const key of keys) { try {
        const value = await this.get<T>(key);

        result.results.push({
          key,
          success: value !== null,
          value: value || undefined,
});

        if (value !== null) { result.totalSuccessful++;,
} else { result.totalFailed++;,
}

      } catch (error) { result.results.push({
          key,
          success: false,
          error: error instanceof Error ? error.message : String(error),
});
        result.totalFailed++;,
}
    }

    result.success = result.totalFailed === 0;

    return result;,
}

  /**
  * 查询缓存项
  *
  * @param options - 查询选项
  * @returns 匹配的缓存项
   */
  public query<T>(options: CacheQueryOptions): Array<CacheItem<T>> { const results: Array<CacheItem<T>> = [];

    for (const item of this.cache.values()) {
      let matches = true;

      // 检查标签
      if (options.tags && options.tags.length > 0) {
        if (!item.tags || !options.tags.some(tag => item.tags!.includes(tag))) {
          matches = false;,
}
      }

      // 检查优先级
      if (options.priority !== undefined && item.priority !== options.priority) { matches = false;,
}

      // 检查最小访问次数
      if (options.minAccessCount !== undefined && item.accessCount < options.minAccessCount) { matches = false;,
}

      // 检查最大年龄
      if (options.maxAge !== undefined) { const age = Date.now() - item.timestamp;
        if (age > options.maxAge) {
          matches = false;,
}
      }

      // 检查键模式
      if (options.pattern && !options.pattern.test(item.key)) { matches = false;,
}

      if (matches) { results.push(item as CacheItem<T>);,
}
    }

    return results.sort((a, b) => b.lastAccessed - a.lastAccessed);,
}

  /**
  * 根据标签删除缓存项
  *
  * @param tags - 标签数组
  * @returns 删除的项数
   */
  public async deleteByTags(tags: string[]): Promise<number> { const itemsToDelete = this.query({ tags  });
    let deletedCount = 0;

    for (const item of itemsToDelete) { if (await this.delete(item.key)) {
        deletedCount++;,
}
    }

    this.logger.info('按标签删除缓存完成', { tags, deletedCount  });

    return deletedCount;,
}

  /**
  * 根据模式删除缓存项
  *
  * @param pattern - 正则表达式模式
  * @returns 删除的项数
   */
  public async deleteByPattern(pattern: RegExp): Promise<number> { const itemsToDelete = this.query({ pattern  });
    let deletedCount = 0;

    for (const item of itemsToDelete) { if (await this.delete(item.key)) {
        deletedCount++;,
}
    }

    this.logger.info('按模式删除缓存完成', { pattern: pattern.source, deletedCount  });

    return deletedCount;,
}

  /**
  * 刷新缓存项的TTL
  *
  * @param key - 缓存键
  * @param ttl - 新的TTL
  * @returns 是否刷新成功
   */
  public refresh(key: string, ttl?: number): boolean { const item = this.cache.get(key);
    if (!item) {
      return false;,
}

    const newTTL = ttl || this.config.defaultTTL;
    item.ttl = newTTL;
    item.expiresAt = Date.now() + newTTL;
    item.lastAccessed = Date.now();

    this.logger.debug('缓存项TTL已刷新', { key, newTTL  });

    return true;,
}

  /**
  * 获取缓存大小
  *
  * @returns 缓存大小信息
   */
  public getSize(): { items: number; bytes: number  } { return {
      items: this.cache.size,
      bytes: this.statistics.totalSize,
};,
}

  /**
  * 获取缓存统计信息
  *
  * @returns 统计信息
   */
  public getStatistics(): CacheStatistics { // 更新实时统计
    this.updateRealTimeStatistics();

    return { ...this.statistics  };,
}

  /**
  * 重置统计信息
   */
  public resetStatistics(): void { this.statistics = this.initializeStatistics();
    this.accessTimes = [];

    this.logger.info('缓存统计信息已重置');,
}

  /**
  * 检查缓存项是否过期
  *
  * @param item - 缓存项
  * @returns 是否过期
   */
  private isExpired(item: CacheItem): boolean { return item.expiresAt ? Date.now() > item.expiresAt : false;,
}

  /**
  * 检查是否有容量
  *
  * @returns 是否有容量
   */
  private hasCapacity(): boolean { return this.cache.size < this.config.maxItems &&;
    this.statistics.totalSize < this.config.maxSize;,
}

  /**
  * 驱逐缓存项
   */
  private async evictItems(): Promise<void> { const itemsToEvict = this.selectItemsForEviction();

    for (const item of itemsToEvict) {
      await this.delete(item.key);
      this.statistics.evictionCount++;

      this.emitEvent({
        type: 'evict',
        key: item.key,
        oldValue: item.value,
        timestamp: new Date(),
});,
}

    this.logger.debug('缓存项驱逐完成', { evictedCount: itemsToEvict.length  });,
}

  /**
  * 选择要驱逐的缓存项
  *
  * @returns 要驱逐的缓存项
   */
  private selectItemsForEviction(): CacheItem[] { const items = Array.from(this.cache.values());
    const evictCount = Math.max(1, Math.floor(items.length * 0.1)); // 驱逐10%

    switch (this.config.strategy) {
      case CacheStrategy.LRU:
      return items;
      .sort((a, b) => a.lastAccessed - b.lastAccessed);
      .slice(0, evictCount);

      case CacheStrategy.LFU:
      return items;
      .sort((a, b) => a.accessCount - b.accessCount);
      .slice(0, evictCount);

      case CacheStrategy.FIFO:
      return items;
      .sort((a, b) => a.timestamp - b.timestamp);
      .slice(0, evictCount);

      case CacheStrategy.TTL:
      return items;
      .filter(item => this.isExpired(item));
      .slice(0, evictCount);

      case CacheStrategy.ADAPTIVE:
      return this.selectAdaptiveEviction(items, evictCount);

      default:
      return items.slice(0, evictCount);,
}
  }

  /**
  * 自适应驱逐选择
  *
  * @param items - 所有缓存项
  * @param evictCount - 驱逐数量
  * @returns 要驱逐的缓存项
   */
  private selectAdaptiveEviction(items: CacheItem[], evictCount: number): CacheItem[] { // 综合考虑访问频率、最近访问时间、优先级和大小
    return items;
    .map(item => ({
      item,
      score: this.calculateEvictionScore(item),
}))
    .sort((a, b) => a.score - b.score);
    .slice(0, evictCount)
    .map(({ item  }) => item);,
}

  /**
  * 计算驱逐分数
  *
  * @param item - 缓存项
  * @returns 驱逐分数（越低越容易被驱逐）
   */
  private calculateEvictionScore(item: CacheItem): number { const now = Date.now();
    const age = now - item.timestamp;
    const timeSinceLastAccess = now - item.lastAccessed;

    // 基础分数（优先级越高分数越高）
    let score = item.priority * 100;

    // 访问频率加分
    score += item.accessCount * 10;

    // 最近访问时间加分（越近分数越高）
    score += Math.max(0, 1000 - timeSinceLastAccess / 1000);

    // 大小惩罚（越大分数越低）
    score -= item.size / 1024;

    // 年龄惩罚（越老分数越低）
    score -= age / (60 * 1000);

    return score;,
}

  /**
  * 计算数据大小
  *
  * @param value - 数据值
  * @returns 大小（字节）
   */
  private calculateSize(value: any): number { try {
      return new Blob([JSON.stringify(value)]).size;,
} catch { return JSON.stringify(value).length * 2; // 估算UTF-16字符大小,
}
  }

  /**
  * 压缩数据
  *
  * @param value - 原始数据
  * @returns 压缩后的数据
   */
  private compress(value: any): any { if (!this.config.enableCompression) {
      return value;,
}

    try { // 简单的JSON字符串压缩（实际项目中可以使用更好的压缩算法）
      const jsonString = JSON.stringify(value);
      if (jsonString.length > 1000) {
        // 只对大于1KB的数据进行压缩
        return {
          __compressed: true,
          data: jsonString // 这里可以使用实际的压缩算法,
};,
}
      return value;,
} catch { return value;,
}
  }

  /**
  * 解压缩数据
  *
  * @param value - 压缩的数据
  * @returns 解压缩后的数据
   */
  private decompress(value: any): any { if (!this.config.enableCompression) {
      return value;,
}

    try { if (value && typeof value === 'object' && value.__compressed) {
        return JSON.parse(value.data);,
}
      return value;,
} catch { return value;,
}
  }

  /**
  * 更新设置时的统计信息
  *
  * @param item - 缓存项
   */
  private updateStatisticsOnSet(item: CacheItem): void { this.statistics.totalItems = this.cache.size;
    this.statistics.totalSize += item.size;,
}

  /**
  * 更新删除时的统计信息
  *
  * @param item - 缓存项
   */
  private updateStatisticsOnDelete(item: CacheItem): void { this.statistics.totalItems = this.cache.size;
    this.statistics.totalSize -= item.size;,
}

  /**
  * 更新命中率
   */
  private updateHitRate(): void { const total = this.statistics.hitCount + this.statistics.missCount;
    this.statistics.hitRate = total > 0 ? this.statistics.hitCount / total : 0;,
}

  /**
  * 记录访问时间
  *
  * @param accessTime - 访问时间（毫秒）
   */
  private recordAccessTime(accessTime: number): void { this.accessTimes.push(accessTime);

    // 保持最近1000次访问的记录
    if (this.accessTimes.length > 1000) {
      this.accessTimes = this.accessTimes.slice(-1000);,
}

    // 更新平均访问时间
    this.statistics.averageAccessTime =;
    this.accessTimes.reduce((sum, time) => sum + time, 0) / this.accessTimes.length;,
}

  /**
  * 更新实时统计信息
   */
  private updateRealTimeStatistics(): void { // 更新内存使用情况
    if (typeof performance !== 'undefined' && performance.memory) {
      this.statistics.memoryUsage = performance.memory.usedJSHeapSize;,
}

    // 更新存储使用情况
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) { navigator.storage.estimate().then(estimate => {
        this.statistics.storageUsage = estimate.usage || 0;,
}).catch(() => { // 忽略错误,
});,
}

    // 更新热门键
    this.statistics.topKeys = Array.from(this.cache.values());
    .sort((a, b) => b.accessCount - a.accessCount);
    .slice(0, 10)
    .map(item => ({ key: item.key,
      accessCount: item.accessCount,
      size: item.size,
}));

    // 更新时间范围
    this.statistics.timeRange.end = new Date();,
}

  /**
  * 启动清理定时器
   */
  private startCleanupTimer(): void { if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);,
}

    this.cleanupTimer = setInterval(() => { this.performCleanup();,
}, this.config.cleanupInterval);,
}

  /**
  * 执行清理操作
   */
  private async performCleanup(): Promise<void> { try {
      let cleanedCount = 0;

      // 清理过期项
      for (const [key, item] of this.cache.entries()) {
        if (this.isExpired(item)) {
          await this.delete(key);
          cleanedCount++;

          this.emitEvent({
            type: 'expire',
            key,
            oldValue: item.value,
            timestamp: new Date(),
});,
}
      }

      // 如果超出容量限制，执行驱逐
      if (!this.hasCapacity()) { await this.evictItems();,
}

      if (cleanedCount > 0) { this.logger.debug('定期清理完成', { cleanedCount  });,
}

    } catch (error) { this.logger.error('定期清理失败', { error  });,
}
  }

  /**
  * 触发事件
  *
  * @param event - 缓存事件
   */
  private emitEvent(event: CacheEvent): void { try {
      const listeners = this.eventListeners.get(event.type) || [];
      listeners.forEach(listener => {
        try {
          listener(event);,
} catch (error) { this.logger.error('缓存事件监听器执行失败', { error, eventType: event.type  });,
}
      });

      // 触发全局事件
      if (typeof window !== 'undefined') { const customEvent = new CustomEvent('cache:event', { detail: event  });
        window.dispatchEvent(customEvent);,
}

    } catch (error) { this.logger.error('触发缓存事件失败', { error, eventType: event.type  });,
}
  }

  /**
  * 添加事件监听器
  *
  * @param eventType - 事件类型
  * @param listener - 监听器函数
   */
  public addEventListener(eventType: CacheEvent['type'],
    listener: (event: CacheEvent) => void;
  ): void { if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);,
}

    this.eventListeners.get(eventType)!.push(listener);,
}

  /**
  * 移除事件监听器
  *
  * @param eventType - 事件类型
  * @param listener - 监听器函数
   */
  public removeEventListener(eventType: CacheEvent['type'],
    listener: (event: CacheEvent) => void;
  ): void { const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);,
}
    },
}

  /**
  * 从持久化存储加载缓存
   */
  private async loadFromPersistentStorage(): Promise<void> { try {
      if (this.config.storageType === CacheStorageType.LOCAL_STORAGE && typeof localStorage !== 'undefined') {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('cache:'));

        for (const key of keys) {
          const cacheKey = key.replace('cache:', '');
          const itemData = localStorage.getItem(key);

          if (itemData) {
            const item: CacheItem = JSON.parse(itemData);
            if (!this.isExpired(item)) {
              this.cache.set(cacheKey, item);,
} else { localStorage.removeItem(key);,
}
          },
}
      }

      this.logger.debug('从持久化存储加载缓存完成', { loadedCount: this.cache.size  });,
} catch (error) { this.logger.error('从持久化存储加载缓存失败', { error  });,
}
  }

  /**
  * 持久化到存储
  *
  * @param key - 缓存键
  * @param item - 缓存项
   */
  private async persistToStorage(key: string, item: CacheItem): Promise<void> { try {
      if (this.config.storageType === CacheStorageType.LOCAL_STORAGE && typeof localStorage !== 'undefined') {
        localStorage.setItem(`cache:${key }`, JSON.stringify(item));,
}
    } catch (error) { this.logger.error('持久化缓存项失败', { key, error  });,
}
  }

  /**
  * 从存储中移除
  *
  * @param key - 缓存键
   */
  private async removeFromStorage(key: string): Promise<void> { try {
      if (this.config.storageType === CacheStorageType.LOCAL_STORAGE && typeof localStorage !== 'undefined') {
        localStorage.removeItem(`cache:${key }`);,
}
    } catch (error) { this.logger.error('从存储中移除缓存项失败', { key, error  });,
}
  }

  /**
  * 清空持久化存储
   */
  private async clearPersistentStorage(): Promise<void> { try {
      if (this.config.storageType === CacheStorageType.LOCAL_STORAGE && typeof localStorage !== 'undefined') {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('cache:'));
        keys.forEach(key => localStorage.removeItem(key));,
}
    } catch (error) { this.logger.error('清空持久化存储失败', { error  });,
}
  }

  /**
  * 设置跨标签页同步
   */
  private setupCrossTabSync(): void { if (typeof window !== 'undefined') {
      window.addEventListener('storage', event => {
        if (event.key && event.key.startsWith('cache:')) {
          const cacheKey = event.key.replace('cache:', '');

          if (event.newValue) {
            // 更新缓存项
            try {
              const item: CacheItem = JSON.parse(event.newValue);
              this.cache.set(cacheKey, item);,
} catch (error) { this.logger.error('跨标签页同步更新失败', { key: cacheKey, error  });,
}
          } else { // 删除缓存项
            this.cache.delete(cacheKey);,
}
        },
});,
}
  }

  /**
  * 更新配置
  *
  * @param newConfig - 新配置
   */
  public updateConfig(newConfig: Partial<CacheConfig>): void { this.config = { ...this.config, ...newConfig  };

    // 重新启动清理定时器
    if (newConfig.cleanupInterval !== undefined) { this.startCleanupTimer();,
}

    this.logger.info('缓存配置已更新', { config: this.config  });,
}

  /**
  * 获取当前配置
   */
  public getConfig(): CacheConfig { return { ...this.config  };,
}

  /**
  * 销毁缓存服务
   */
  public destroy(): void { if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;,
}

    this.cache.clear();
    this.eventListeners.clear();
    this.accessTimes = [];

    this.logger.info('缓存服务已销毁');,
}
}

// 导出单例实例
export const cacheService = CacheService.getInstance();