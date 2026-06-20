import { useState, useEffect, useCallback, useRef } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('data-cache');

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
  enablePersistence?: boolean; // Enable localStorage persistence
}

/**
 * 数据缓存 Hook
 */
export const useDataCache = <T>(key: string, options: CacheOptions = {}) => {
  const {
    ttl = 5 * 60 * 1000, // 默认5分钟过期
    maxSize = 100, // 默认最大100个条目
    enablePersistence = false,
  } = options;

  const cache = useRef(new Map<string, CacheEntry<T>>());
  const [, forceUpdate] = useState({});

  // 强制组件重新渲染
  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  // 从localStorage加载缓存
  useEffect(() => {
    if (enablePersistence) {
      try {
        const stored = localStorage.getItem(`cache_${key}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          Object.entries(parsed).forEach(([k, v]) => {
            cache.current.set(k, v as CacheEntry<T>);
          });
          logger.debug(`从localStorage加载缓存: ${key}`, {
            count: cache.current.size,
          });
        }
      } catch (error) {
        logger.warn(`从localStorage加载缓存失败: ${key}`, error);
      }
    }
  }, [key, enablePersistence]);

  // 保存缓存到localStorage
  const persistCache = useCallback(() => {
    if (!enablePersistence) return;

    try {
      const cacheObj = Object.fromEntries(cache.current);
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheObj));
    } catch (error) {
      logger.warn(`保存缓存到localStorage失败: ${key}`, error);
    }
  }, [key, enablePersistence]);

  // 检查缓存项是否过期
  const isExpired = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() > entry.expiresAt;
  }, []);

  // 清理过期缓存
  const cleanupExpired = useCallback(() => {
    const before = cache.current.size;
    for (const [cacheKey, entry] of cache.current.entries()) {
      if (isExpired(entry)) {
        cache.current.delete(cacheKey);
      }
    }
    const after = cache.current.size;

    if (before !== after) {
      logger.debug(`清理过期缓存: ${key}`, {
        before,
        after,
        cleaned: before - after,
      });
      persistCache();
    }
  }, [key, isExpired, persistCache]);

  // 限制缓存大小
  const enforceSizeLimit = useCallback(() => {
    if (cache.current.size <= maxSize) return;

    // 按时间戳排序，删除最老的项
    const entries = Array.from(cache.current.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toDelete = entries.slice(0, cache.current.size - maxSize);
    toDelete.forEach(([cacheKey]) => {
      cache.current.delete(cacheKey);
    });

    logger.debug(`执行缓存大小限制: ${key}`, {
      deleted: toDelete.length,
      currentSize: cache.current.size,
    });

    persistCache();
  }, [key, maxSize, persistCache]);

  // 设置缓存
  const set = useCallback(
    (cacheKey: string, data: T) => {
      const now = Date.now();
      const entry: CacheEntry<T> = {
        data,
        timestamp: now,
        expiresAt: now + ttl,
      };

      cache.current.set(cacheKey, entry);

      // 清理过期项和限制大小
      cleanupExpired();
      enforceSizeLimit();

      persistCache();
      triggerUpdate();

      logger.debug(`设置缓存: ${key}/${cacheKey}`, {
        expiresAt: new Date(entry.expiresAt),
      });
    },
    [key, ttl, cleanupExpired, enforceSizeLimit, persistCache, triggerUpdate]
  );

  // 获取缓存
  const get = useCallback(
    (cacheKey: string): T | null => {
      const entry = cache.current.get(cacheKey);

      if (!entry) {
        return null;
      }

      if (isExpired(entry)) {
        cache.current.delete(cacheKey);
        persistCache();
        logger.debug(`缓存已过期: ${key}/${cacheKey}`);
        return null;
      }

      logger.debug(`命中缓存: ${key}/${cacheKey}`);
      return entry.data;
    },
    [key, isExpired, persistCache]
  );

  // 删除缓存
  const remove = useCallback(
    (cacheKey: string) => {
      const deleted = cache.current.delete(cacheKey);
      if (deleted) {
        persistCache();
        triggerUpdate();
        logger.debug(`删除缓存: ${key}/${cacheKey}`);
      }
      return deleted;
    },
    [key, persistCache, triggerUpdate]
  );

  // 清空所有缓存
  const clear = useCallback(() => {
    const count = cache.current.size;
    cache.current.clear();

    if (enablePersistence) {
      localStorage.removeItem(`cache_${key}`);
    }

    triggerUpdate();
    logger.debug(`清空缓存: ${key}`, { clearedCount: count });
  }, [key, enablePersistence, triggerUpdate]);

  // 获取缓存统计信息
  const getStats = useCallback(() => {
    cleanupExpired();

    return {
      size: cache.current.size,
      keys: Array.from(cache.current.keys()),
      totalSize: maxSize,
      hitRate: 0, // 可以通过计数器实现命中率统计
    };
  }, [cleanupExpired, maxSize]);

  // 检查是否存在
  const has = useCallback(
    (cacheKey: string): boolean => {
      const entry = cache.current.get(cacheKey);
      return entry ? !isExpired(entry) : false;
    },
    [isExpired]
  );

  // 定期清理过期缓存
  useEffect(() => {
    const interval = setInterval(cleanupExpired, ttl / 2);
    return () => clearInterval(interval);
  }, [cleanupExpired, ttl]);

  return {
    set,
    get,
    remove,
    clear,
    has,
    getStats,
  };
};
