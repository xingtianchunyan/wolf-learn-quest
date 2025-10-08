/**
* 技能系统缓存管理器
* 实现智能缓存以提升性能和减少数据库负载
 */

interface CacheItem<T> { data: T;
  timestamp: number;
  expiresAt: number;,
}

interface SkillValidationCache { canUse: boolean;
  reason?: string;
  suggestion?: string;,
}

interface UserRoleStateCache { roleState: any;
  roleDesign: any;
  timestamp: number;,
}

interface GameStateCache { gameState: any;
  players: any[];
  timestamp: number;,
}

export class SkillCacheManager { private static instance: SkillCacheManager;
  private validationCache = new Map<string, CacheItem<SkillValidationCache>>();
  private roleStateCache = new Map<string, CacheItem<UserRoleStateCache>>();
  private gameStateCache = new Map<string, CacheItem<GameStateCache>>();

  // 缓存过期时间配置（毫秒）
  private readonly TTL = {
    validation: 5 * 60 * 1000, // 5分钟
    roleState: 3 * 60 * 1000,  // 3分钟
    gameState: 2 * 60 * 1000   // 2分钟,
};

  static getInstance(): SkillCacheManager { if (!SkillCacheManager.instance) {
      SkillCacheManager.instance = new SkillCacheManager();,
}
    return SkillCacheManager.instance;,
}

  /**
  * 生成缓存键
   */
  private generateValidationKey(
    skillName: string,
    userId: string,
    gameStateId: string,
    phase: number,
    targetId?: string
  ): string { return `validation:${skillName }:${ userId }:${ gameStateId }:${ phase }:${ targetId || 'none' }`;,
}

  private generateRoleStateKey(userId: string, gameStateId: string): string { return `roleState:${userId }:${ gameStateId }`;,
}

  private generateGameStateKey(gameStateId: string): string { return `gameState:${gameStateId }`;,
}

  /**
  * 检查缓存项是否过期
   */
  private isExpired(item: CacheItem<any>): boolean { return Date.now() > item.expiresAt;,
}

  /**
  * 清理过期缓存
   */
  private cleanupExpiredCache<T>(cache: Map<string, CacheItem<T>>): void { const now = Date.now();
    for (const [key, item] of cache.entries()) {
      if (now > item.expiresAt) {
        cache.delete(key);,
}
    },
}

  /**
  * 定期清理所有过期缓存
   */
  public performMaintenance(): void { this.cleanupExpiredCache(this.validationCache);
    this.cleanupExpiredCache(this.roleStateCache);
    this.cleanupExpiredCache(this.gameStateCache);,
}

  /**
  * 技能验证缓存操作
   */
  public getValidationCache(
    skillName: string,
    userId: string,
    gameStateId: string,
    phase: number,
    targetId?: string
  ): SkillValidationCache | null { const key = this.generateValidationKey(skillName, userId, gameStateId, phase, targetId);
    const item = this.validationCache.get(key);

    if (!item || this.isExpired(item)) {
      if (item) this.validationCache.delete(key);
      return null;,
}

    return item.data;,
}

  public setValidationCache(
    skillName: string,
    userId: string,
    gameStateId: string,
    phase: number,
    data: SkillValidationCache,
    targetId?: string
  ): void { const key = this.generateValidationKey(skillName, userId, gameStateId, phase, targetId);
    const now = Date.now();

    this.validationCache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.TTL.validation,
});,
}

  /**
  * 用户角色状态缓存操作
   */
  public getRoleStateCache(userId: string, gameStateId: string): UserRoleStateCache | null { const key = this.generateRoleStateKey(userId, gameStateId);
    const item = this.roleStateCache.get(key);

    if (!item || this.isExpired(item)) {
      if (item) this.roleStateCache.delete(key);
      return null;,
}

    return item.data;,
}

  public setRoleStateCache(
    userId: string,
    gameStateId: string,
    roleState: any,
    roleDesign: any
  ): void { const key = this.generateRoleStateKey(userId, gameStateId);
    const now = Date.now();

    this.roleStateCache.set(key, {
      data: {
        roleState,
        roleDesign,
        timestamp: now,
},
      timestamp: now,
      expiresAt: now + this.TTL.roleState,
});,
}

  /**
  * 游戏状态缓存操作
   */
  public getGameStateCache(gameStateId: string): GameStateCache | null { const key = this.generateGameStateKey(gameStateId);
    const item = this.gameStateCache.get(key);

    if (!item || this.isExpired(item)) {
      if (item) this.gameStateCache.delete(key);
      return null;,
}

    return item.data;,
}

  public setGameStateCache(
    gameStateId: string,
    gameState: any,
    players: any[]
  ): void { const key = this.generateGameStateKey(gameStateId);
    const now = Date.now();

    this.gameStateCache.set(key, {
      data: {
        gameState,
        players,
        timestamp: now,
},
      timestamp: now,
      expiresAt: now + this.TTL.gameState,
});,
}

  /**
  * 清理特定用户的缓存
   */
  public clearUserCache(userId: string): void { // 清理验证缓存
    for (const [key] of this.validationCache.entries()) {
      if (key.includes(`:${userId }:`)) { this.validationCache.delete(key);,
}
    }

    // 清理角色状态缓存
    for (const [key] of this.roleStateCache.entries()) { if (key.includes(`:${userId }:`)) { this.roleStateCache.delete(key);,
}
    },
}

  /**
  * 清理特定游戏的缓存
   */
  public clearGameCache(gameStateId: string): void { // 清理验证缓存
    for (const [key] of this.validationCache.entries()) {
      if (key.includes(`:${gameStateId }:`)) { this.validationCache.delete(key);,
}
    }

    // 清理角色状态缓存
    for (const [key] of this.roleStateCache.entries()) { if (key.includes(`:${gameStateId }`)) { this.roleStateCache.delete(key);,
}
    }

    // 清理游戏状态缓存
    this.gameStateCache.delete(this.generateGameStateKey(gameStateId));,
}

  /**
  * 完全清空所有缓存
   */
  public clearAllCache(): void { this.validationCache.clear();
    this.roleStateCache.clear();
    this.gameStateCache.clear();,
}

  /**
  * 获取缓存统计信息
   */
  public getCacheStats() { return {
      validation: {
        size: this.validationCache.size,
        hits: 0, // 可以添加命中率统计
        misses: 0,
},
      roleState: { size: this.roleStateCache.size,
        hits: 0,
        misses: 0,
},
      gameState: { size: this.gameStateCache.size,
        hits: 0,
        misses: 0,
}
    };,
}
}

// 自动定期清理过期缓存
if (typeof window !== 'undefined') { setInterval(() => {
    SkillCacheManager.getInstance().performMaintenance();,
}, 60000); // 每分钟清理一次,
}

export const skillCache = SkillCacheManager.getInstance();