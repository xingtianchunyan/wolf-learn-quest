// 技能系统缓存管理
import { SkillConfig } from '@/utils/skillMappingConfig';
import {
  StandardizedSkillUse,
  StandardizedSkillTarget,
} from '@/utils/skillDataStandardizer';
import { createLogger } from '@/lib/logger';

const logger = createLogger('skill-system-cache');

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  key: string;
}

export interface CacheStats {
  hitCount: number;
  missCount: number;
  totalSize: number;
  hitRate: number;
  lastCleanup: Date | null;
}

class SkillSystemCache {
  private cache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = {
    hitCount: 0,
    missCount: 0,
    totalSize: 0,
    hitRate: 0,
    lastCleanup: null,
  };

  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5分钟
  private readonly MAX_CACHE_SIZE = 1000;
  private readonly CLEANUP_INTERVAL = 60 * 1000; // 1分钟清理一次

  private cleanupTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.startPeriodicCleanup();
  }

  /**
   * 生成缓存键
   */
  private generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${prefix}:${sortedParams}`;
  }

  /**
   * 检查缓存项是否过期
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.expiresAt;
  }

  /**
   * 更新统计信息
   */
  private updateStats() {
    this.stats.totalSize = this.cache.size;
    this.stats.hitRate =
      this.stats.hitCount + this.stats.missCount > 0
        ? (this.stats.hitCount / (this.stats.hitCount + this.stats.missCount)) *
          100
        : 0;
  }

  /**
   * 设置缓存
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // 如果缓存已满，清理最旧的条目
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictOldest();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
      key,
    };

    this.cache.set(key, entry);
    this.updateStats();

    logger.debug('缓存设置', { key, ttl, size: this.cache.size });
  }

  /**
   * 获取缓存
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.missCount++;
      this.updateStats();
      logger.debug('缓存未命中', { key });
      return null;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.missCount++;
      this.updateStats();
      logger.debug('缓存已过期', { key });
      return null;
    }

    this.stats.hitCount++;
    this.updateStats();
    logger.debug('缓存命中', { key });
    return entry.data as T;
  }

  /**
   * 删除缓存
   */
  delete(key: string): boolean {
    const result = this.cache.delete(key);
    this.updateStats();
    return result;
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear();
    this.stats = {
      hitCount: 0,
      missCount: 0,
      totalSize: 0,
      hitRate: 0,
      lastCleanup: new Date(),
    };
    logger.info('缓存已清空');
  }

  /**
   * 清理过期缓存
   */
  cleanup(): number {
    const initialSize = this.cache.size;
    const _now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      }
    }

    const cleanedCount = initialSize - this.cache.size;
    this.stats.lastCleanup = new Date();
    this.updateStats();

    if (cleanedCount > 0) {
      logger.info('缓存清理完成', {
        cleanedCount,
        remainingSize: this.cache.size,
      });
    }

    return cleanedCount;
  }

  /**
   * 淘汰最旧的缓存项
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      logger.debug('淘汰最旧缓存项', { key: oldestKey });
    }
  }

  /**
   * 启动定期清理
   */
  private startPeriodicCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.CLEANUP_INTERVAL);
  }

  /**
   * 停止定期清理
   */
  stopPeriodicCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * 获取统计信息
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  // === 技能系统专用方法 ===

  /**
   * 缓存技能配置
   */
  cacheSkillConfig(skillName: string, config: SkillConfig): void {
    const key = this.generateKey('skill_config', { skillName });
    this.set(key, config, 10 * 60 * 1000); // 10分钟
  }

  /**
   * 获取技能配置缓存
   */
  getSkillConfig(skillName: string): SkillConfig | null {
    const key = this.generateKey('skill_config', { skillName });
    return this.get<SkillConfig>(key);
  }

  /**
   * 缓存用户技能使用记录
   */
  cacheUserSkillUses(
    userId: string,
    gameStateId: string,
    uses: StandardizedSkillUse[]
  ): void {
    const key = this.generateKey('user_skill_uses', { userId, gameStateId });
    this.set(key, uses, 2 * 60 * 1000); // 2分钟
  }

  /**
   * 获取用户技能使用记录缓存
   */
  getUserSkillUses(
    userId: string,
    gameStateId: string
  ): StandardizedSkillUse[] | null {
    const key = this.generateKey('user_skill_uses', { userId, gameStateId });
    return this.get<StandardizedSkillUse[]>(key);
  }

  /**
   * 缓存技能效果
   */
  cacheSkillEffects(
    gameStateId: string,
    effects: StandardizedSkillTarget[]
  ): void {
    const key = this.generateKey('skill_effects', { gameStateId });
    this.set(key, effects, 1 * 60 * 1000); // 1分钟
  }

  /**
   * 获取技能效果缓存
   */
  getSkillEffects(gameStateId: string): StandardizedSkillTarget[] | null {
    const key = this.generateKey('skill_effects', { gameStateId });
    return this.get<StandardizedSkillTarget[]>(key);
  }

  /**
   * 缓存技能验证结果
   */
  cacheSkillValidation(
    userId: string,
    skillName: string,
    gameStateId: string,
    validation: { isValid: boolean; reason?: string }
  ): void {
    const key = this.generateKey('skill_validation', {
      userId,
      skillName,
      gameStateId,
    });
    this.set(key, validation, 30 * 1000); // 30秒
  }

  /**
   * 获取技能验证结果缓存
   */
  getSkillValidation(
    userId: string,
    skillName: string,
    gameStateId: string
  ): { isValid: boolean; reason?: string } | null {
    const key = this.generateKey('skill_validation', {
      userId,
      skillName,
      gameStateId,
    });
    return this.get<{ isValid: boolean; reason?: string }>(key);
  }

  /**
   * 清除特定游戏状态的所有缓存
   */
  clearGameStateCache(gameStateId: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.includes(gameStateId)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
    this.updateStats();

    logger.info('清除游戏状态缓存', {
      gameStateId,
      clearedCount: keysToDelete.length,
    });
  }

  /**
   * 清除特定用户的所有缓存
   */
  clearUserCache(userId: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.includes(userId)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
    this.updateStats();

    logger.info('清除用户缓存', { userId, clearedCount: keysToDelete.length });
  }
}

// 单例实例
export const skillSystemCache = new SkillSystemCache();

// 导出 Hook 用于在组件中使用
export const useSkillSystemCache = () => {
  return {
    cache: skillSystemCache,
    stats: skillSystemCache.getStats(),
    clear: () => skillSystemCache.clear(),
    cleanup: () => skillSystemCache.cleanup(),
  };
};
