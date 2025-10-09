/**
 * @fileoverview 技能工厂模式
 * 提供统一的技能创建和管理机制，支持动态技能注册和实例化
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { createLogger } from '@/lib/logger';
import type { Skill, SkillType, SkillConfig } from '@/types/skill';

const logger = createLogger('skill-factory');

/**
 * 技能构造函数接口
 */
export interface SkillConstructor {
  new (config: SkillConfig): Skill;
  readonly skillType: SkillType;
  readonly displayName: string;
  readonly description: string;
  readonly defaultConfig: Partial<SkillConfig>;
}

/**
 * 技能工厂配置接口
 */
export interface SkillFactoryConfig {
  /** 是否启用技能缓存 */
  enableCache?: boolean;
  /** 缓存大小限制 */
  cacheLimit?: number;
  /** 是否启用调试模式 */
  debug?: boolean;
  /** 技能验证函数 */
  validator?: (skill: Skill) => boolean;
  /** 技能创建前钩子 */
  beforeCreate?: (type: SkillType, config: SkillConfig) => void;
  /** 技能创建后钩子 */
  afterCreate?: (skill: Skill) => void;
}

/**
 * 技能注册信息接口
 */
export interface SkillRegistration {
  /** 技能构造函数 */
  constructor: SkillConstructor;
  /** 注册时间 */
  registeredAt: number;
  /** 创建次数 */
  createCount: number;
  /** 是否启用 */
  enabled: boolean;
  /** 优先级 */
  priority: number;
}

/**
 * 技能工厂类
 * 实现工厂模式，提供技能的统一创建和管理
 */
export class SkillFactory {
  private static instance: SkillFactory | null = null;
  private registrations = new Map<SkillType, SkillRegistration>();
  private skillCache = new Map<string, Skill>();
  private config: Required<SkillFactoryConfig>;

  /**
   * 构造函数
   * @param config - 工厂配置
   */
  private constructor(config: SkillFactoryConfig = {}) {
    this.config = {
      enableCache: true,
      cacheLimit: 100,
      debug: false,
      validator: () => true,
      beforeCreate: () => {},
      afterCreate: () => {},
      ...config,
    };

    logger.info('技能工厂初始化', { config: this.config });
  }

  /**
   * 获取工厂单例实例
   * @param config - 工厂配置
   * @returns 工厂实例
   */
  public static getInstance(config?: SkillFactoryConfig): SkillFactory {
    if (!SkillFactory.instance) {
      SkillFactory.instance = new SkillFactory(config);
    }
    return SkillFactory.instance;
  }

  /**
   * 重置工厂实例
   */
  public static reset(): void {
    SkillFactory.instance = null;
  }

  /**
   * 注册技能类型
   * @param constructor - 技能构造函数
   * @param options - 注册选项
   */
  public register(
    constructor: SkillConstructor,
    options: { enabled?: boolean; priority?: number } = {}
  ): void {
    const { skillType } = constructor;
    const { enabled = true, priority = 0 } = options;

    if (this.registrations.has(skillType)) {
      logger.warn('技能类型已存在，将覆盖原有注册', { skillType });
    }

    const registration: SkillRegistration = {
      constructor,
      registeredAt: Date.now(),
      createCount: 0,
      enabled,
      priority,
    };

    this.registrations.set(skillType, registration);

    logger.info('技能类型注册成功', {
      skillType,
      displayName: constructor.displayName,
      enabled,
      priority,
    });
  }

  /**
   * 批量注册技能类型
   * @param constructors - 技能构造函数数组
   */
  public registerBatch(constructors: SkillConstructor[]): void {
    constructors.forEach(constructor => {
      this.register(constructor);
    });

    logger.info('批量注册技能类型完成', {
      count: constructors.length,
      types: constructors.map(c => c.skillType),
    });
  }

  /**
   * 注销技能类型
   * @param skillType - 技能类型
   */
  public unregister(skillType: SkillType): void {
    if (!this.registrations.has(skillType)) {
      logger.warn('尝试注销不存在的技能类型', { skillType });
      return;
    }

    this.registrations.delete(skillType);

    // 清除相关缓存
    this.clearCacheByType(skillType);

    logger.info('技能类型注销成功', { skillType });
  }

  /**
   * 启用/禁用技能类型
   * @param skillType - 技能类型
   * @param enabled - 是否启用
   */
  public setEnabled(skillType: SkillType, enabled: boolean): void {
    const registration = this.registrations.get(skillType);
    if (!registration) {
      throw new Error(`技能类型未注册: ${skillType}`);
    }

    registration.enabled = enabled;

    logger.info('技能类型状态更新', { skillType, enabled });
  }

  /**
   * 创建技能实例
   * @param skillType - 技能类型
   * @param config - 技能配置
   * @returns 技能实例
   */
  public create(skillType: SkillType, config: SkillConfig): Skill {
    const registration = this.getRegistration(skillType);

    if (!registration.enabled) {
      throw new Error(`技能类型已禁用: ${skillType}`);
    }

    // 生成缓存键
    const cacheKey = this.generateCacheKey(skillType, config);

    // 尝试从缓存获取
    if (this.config.enableCache && this.skillCache.has(cacheKey)) {
      const cachedSkill = this.skillCache.get(cacheKey)!;
      logger.debug('从缓存获取技能实例', { skillType, cacheKey });
      return cachedSkill;
    }

    // 执行创建前钩子
    this.config.beforeCreate(skillType, config);

    // 合并默认配置
    const mergedConfig = {
      ...registration.constructor.defaultConfig,
      ...config,
    };

    try {
      // 创建技能实例
      const skill = new registration.constructor(mergedConfig);

      // 验证技能实例
      if (!this.config.validator(skill)) {
        throw new Error(`技能实例验证失败: ${skillType}`);
      }

      // 更新统计信息
      registration.createCount++;

      // 缓存技能实例
      if (this.config.enableCache) {
        this.cacheSkill(cacheKey, skill);
      }

      // 执行创建后钩子
      this.config.afterCreate(skill);

      logger.info('技能实例创建成功', {
        skillType,
        cacheKey,
        createCount: registration.createCount,
      });

      return skill;
    } catch (error) {
      logger.error('技能实例创建失败', {
        skillType,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * 批量创建技能实例
   * @param requests - 创建请求数组
   * @returns 技能实例数组
   */
  public createBatch(
    requests: Array<{ type: SkillType; config: SkillConfig }>
  ): Skill[] {
    return requests.map(({ type, config }) => this.create(type, config));
  }

  /**
   * 创建技能实例（异步）
   * @param skillType - 技能类型
   * @param config - 技能配置
   * @returns 技能实例Promise
   */
  public async createAsync(
    skillType: SkillType,
    config: SkillConfig
  ): Promise<Skill> {
    return new Promise((resolve, reject) => {
      try {
        const skill = this.create(skillType, config);
        resolve(skill);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 检查技能类型是否已注册
   * @param skillType - 技能类型
   * @returns 是否已注册
   */
  public isRegistered(skillType: SkillType): boolean {
    return this.registrations.has(skillType);
  }

  /**
   * 检查技能类型是否启用
   * @param skillType - 技能类型
   * @returns 是否启用
   */
  public isEnabled(skillType: SkillType): boolean {
    const registration = this.registrations.get(skillType);
    return registration ? registration.enabled : false;
  }

  /**
   * 获取已注册的技能类型列表
   * @param enabledOnly - 是否只返回启用的类型
   * @returns 技能类型数组
   */
  public getRegisteredTypes(enabledOnly: boolean = false): SkillType[] {
    const types: SkillType[] = [];

    for (const [type, registration] of this.registrations) {
      if (!enabledOnly || registration.enabled) {
        types.push(type);
      }
    }

    return types.sort((a, b) => {
      const regA = this.registrations.get(a)!;
      const regB = this.registrations.get(b)!;
      return regB.priority - regA.priority;
    });
  }

  /**
   * 获取技能类型信息
   * @param skillType - 技能类型
   * @returns 技能类型信息
   */
  public getSkillInfo(skillType: SkillType): {
    type: SkillType;
    displayName: string;
    description: string;
    enabled: boolean;
    createCount: number;
    registeredAt: number;
  } | null {
    const registration = this.registrations.get(skillType);
    if (!registration) {
      return null;
    }

    return {
      type: skillType,
      displayName: registration.constructor.displayName,
      description: registration.constructor.description,
      enabled: registration.enabled,
      createCount: registration.createCount,
      registeredAt: registration.registeredAt,
    };
  }

  /**
   * 获取工厂统计信息
   * @returns 统计信息
   */
  public getStats(): {
    registeredCount: number;
    enabledCount: number;
    cacheSize: number;
    totalCreateCount: number;
  } {
    let enabledCount = 0;
    let totalCreateCount = 0;

    for (const registration of this.registrations.values()) {
      if (registration.enabled) {
        enabledCount++;
      }
      totalCreateCount += registration.createCount;
    }

    return {
      registeredCount: this.registrations.size,
      enabledCount,
      cacheSize: this.skillCache.size,
      totalCreateCount,
    };
  }

  /**
   * 清除缓存
   * @param skillType - 可选的技能类型，不指定则清除所有缓存
   */
  public clearCache(skillType?: SkillType): void {
    if (skillType) {
      this.clearCacheByType(skillType);
    } else {
      this.skillCache.clear();
      logger.info('清除所有技能缓存');
    }
  }

  /**
   * 获取技能注册信息
   * @param skillType - 技能类型
   * @returns 注册信息
   */
  private getRegistration(skillType: SkillType): SkillRegistration {
    const registration = this.registrations.get(skillType);
    if (!registration) {
      throw new Error(`技能类型未注册: ${skillType}`);
    }
    return registration;
  }

  /**
   * 生成缓存键
   * @param skillType - 技能类型
   * @param config - 技能配置
   * @returns 缓存键
   */
  private generateCacheKey(skillType: SkillType, config: SkillConfig): string {
    const configHash = JSON.stringify(config);
    return `${skillType}_${btoa(configHash)}`;
  }

  /**
   * 缓存技能实例
   * @param cacheKey - 缓存键
   * @param skill - 技能实例
   */
  private cacheSkill(cacheKey: string, skill: Skill): void {
    // 检查缓存大小限制
    if (this.skillCache.size >= this.config.cacheLimit) {
      // 删除最旧的缓存项
      const firstKey = this.skillCache.keys().next().value;
      if (firstKey) {
        this.skillCache.delete(firstKey);
      }
    }

    this.skillCache.set(cacheKey, skill);
  }

  /**
   * 按类型清除缓存
   * @param skillType - 技能类型
   */
  private clearCacheByType(skillType: SkillType): void {
    const keysToDelete: string[] = [];

    for (const key of this.skillCache.keys()) {
      if (key.startsWith(`${skillType}_`)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => {
      this.skillCache.delete(key);
    });

    logger.info('清除技能类型缓存', {
      skillType,
      deletedCount: keysToDelete.length,
    });
  }
}

/**
 * 技能工厂装饰器
 * 用于自动注册技能类
 */
export function SkillRegistration(options: {
  type: SkillType;
  displayName: string;
  description: string;
  defaultConfig?: Partial<SkillConfig>;
  enabled?: boolean;
  priority?: number;
}) {
  return function <T extends SkillConstructor>(constructor: T): T {
    // 添加静态属性
    (constructor as any).skillType = options.type;
    (constructor as any).displayName = options.displayName;
    (constructor as any).description = options.description;
    (constructor as any).defaultConfig = options.defaultConfig || {};

    // 自动注册到工厂
    const factory = SkillFactory.getInstance();
    factory.register(constructor as SkillConstructor, {
      enabled: options.enabled,
      priority: options.priority,
    });

    return constructor;
  };
}

/**
 * 默认技能工厂实例
 */
export const skillFactory = SkillFactory.getInstance({
  enableCache: true,
  cacheLimit: 50,
  debug: process.env.NODE_ENV === 'development',
});

/**
 * 工厂工具函数
 */
export const SkillFactoryUtils = {
  /**
   * 创建技能实例的便捷方法
   */
  createSkill: (type: SkillType, config: SkillConfig) =>
    skillFactory.create(type, config),

  /**
   * 批量创建技能实例的便捷方法
   */
  createSkills: (requests: Array<{ type: SkillType; config: SkillConfig }>) =>
    skillFactory.createBatch(requests),

  /**
   * 检查技能是否可用
   */
  isSkillAvailable: (type: SkillType) =>
    skillFactory.isRegistered(type) && skillFactory.isEnabled(type),

  /**
   * 获取可用技能列表
   */
  getAvailableSkills: () => skillFactory.getRegisteredTypes(true),
  /**
   * 获取技能信息
   */
  getSkillInfo: (type: SkillType) => skillFactory.getSkillInfo(type),
};
