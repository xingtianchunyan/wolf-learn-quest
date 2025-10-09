/**
 * @fileoverview 验证策略模式
 * 提供可扩展的验证策略系统，支持动态策略选择和组合
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { createLogger } from '@/lib/logger';

const logger = createLogger('validation-strategy');

/**
 * 验证结果接口
 */
export interface ValidationResult {
  /** 是否有效 */
  valid: boolean;
  /** 错误消息 */
  errors: string[];
  /** 警告消息 */
  warnings: string[];
  /** 验证数据 */
  data?: any;
  /** 验证耗时（毫秒） */
  duration: number;
  /** 使用的策略名称 */
  strategy: string;
}

/**
 * 验证上下文接口
 */
export interface ValidationContext {
  /** 验证目标 */
  target: any;
  /** 验证规则参数 */
  params?: Record<string, any>;
  /** 验证环境信息 */
  environment?: Record<string, any>;
  /** 父级上下文 */
  parent?: ValidationContext;
  /** 验证路径 */
  path?: string;
}

/**
 * 验证策略接口
 */
export interface ValidationStrategy {
  /** 策略名称 */
  readonly name: string;
  /** 策略描述 */
  readonly description: string;
  /** 策略优先级 */
  readonly priority: number;
  /** 是否支持异步验证 */
  readonly async: boolean;

  /**
   * 检查是否适用于当前上下文
   * @param context - 验证上下文
   * @returns 是否适用
   */
  canHandle(context: ValidationContext): boolean;

  /**
   * 执行验证
   * @param context - 验证上下文
   * @returns 验证结果
   */
  validate(
    context: ValidationContext
  ): ValidationResult | Promise<ValidationResult>;

  /**
   * 获取策略配置
   * @returns 策略配置
   */
  getConfig?(): Record<string, any>;

  /**
   * 设置策略配置
   * @param config - 策略配置
   */
  setConfig?(config: Record<string, any>): void;
}

/**
 * 验证策略管理器配置接口
 */
export interface StrategyManagerConfig {
  /** 默认策略名称 */
  defaultStrategy?: string;
  /** 是否启用并行验证 */
  enableParallel?: boolean;
  /** 是否在第一个错误时停止 */
  stopOnFirstError?: boolean;
  /** 验证超时时间（毫秒） */
  timeout?: number;
  /** 是否启用缓存 */
  enableCache?: boolean;
  /** 缓存大小限制 */
  cacheLimit?: number;
  /** 是否启用调试模式 */
  debug?: boolean;
}

/**
 * 策略执行结果接口
 */
export interface StrategyExecutionResult {
  /** 策略名称 */
  strategy: string;
  /** 验证结果 */
  result: ValidationResult;
  /** 执行状态 */
  status: 'success' | 'error' | 'timeout';
  /** 错误信息 */
  error?: Error;
}

/**
 * 验证策略管理器类
 * 实现策略模式，提供验证策略的注册、选择和执行
 */
export class ValidationStrategyManager {
  private strategies = new Map<string, ValidationStrategy>();
  private cache = new Map<string, ValidationResult>();
  private config: Required<StrategyManagerConfig>;

  /**
   * 构造函数
   * @param config - 管理器配置
   */
  constructor(config: StrategyManagerConfig = {}) {
    this.config = {
      defaultStrategy: '',
      enableParallel: false,
      stopOnFirstError: true,
      timeout: 5000,
      enableCache: true,
      cacheLimit: 1000,
      debug: false,
      ...config,
    };

    logger.info('验证策略管理器初始化', { config: this.config });
  }

  /**
   * 注册验证策略
   * @param strategy - 验证策略
   */
  public register(strategy: ValidationStrategy): void {
    if (this.strategies.has(strategy.name)) {
      logger.warn('策略已存在，将覆盖原有策略', { strategy: strategy.name });
    }

    this.strategies.set(strategy.name, strategy);

    logger.info('验证策略注册成功', {
      name: strategy.name,
      description: strategy.description,
      priority: strategy.priority,
      async: strategy.async,
    });
  }

  /**
   * 批量注册验证策略
   * @param strategies - 验证策略数组
   */
  public registerBatch(strategies: ValidationStrategy[]): void {
    strategies.forEach(strategy => {
      this.register(strategy);
    });

    logger.info('批量注册验证策略完成', {
      count: strategies.length,
      names: strategies.map(s => s.name),
    });
  }

  /**
   * 注销验证策略
   * @param name - 策略名称
   */
  public unregister(name: string): void {
    if (!this.strategies.has(name)) {
      logger.warn('尝试注销不存在的策略', { strategy: name });
      return;
    }

    this.strategies.delete(name);
    this.clearCacheByStrategy(name);

    logger.info('验证策略注销成功', { strategy: name });
  }

  /**
   * 获取验证策略
   * @param name - 策略名称
   * @returns 验证策略
   */
  public getStrategy(name: string): ValidationStrategy | undefined {
    return this.strategies.get(name);
  }

  /**
   * 获取所有策略名称
   * @returns 策略名称数组
   */
  public getStrategyNames(): string[] {
    return Array.from(this.strategies.keys());
  }

  /**
   * 获取适用的策略
   * @param context - 验证上下文
   * @returns 适用的策略数组
   */
  public getApplicableStrategies(
    context: ValidationContext
  ): ValidationStrategy[] {
    const applicable: ValidationStrategy[] = [];

    for (const strategy of this.strategies.values()) {
      if (strategy.canHandle(context)) {
        applicable.push(strategy);
      }
    }

    // 按优先级排序
    return applicable.sort((a, b) => b.priority - a.priority);
  }

  /**
   * 选择最佳策略
   * @param context - 验证上下文
   * @param preferredStrategy - 首选策略名称
   * @returns 选择的策略
   */
  public selectStrategy(
    context: ValidationContext,
    preferredStrategy?: string
  ): ValidationStrategy | null {
    // 优先使用指定策略
    if (preferredStrategy) {
      const strategy = this.strategies.get(preferredStrategy);
      if (strategy && strategy.canHandle(context)) {
        return strategy;
      }
    }

    // 获取适用策略
    const applicable = this.getApplicableStrategies(context);
    if (applicable.length === 0) {
      // 尝试使用默认策略
      if (this.config.defaultStrategy) {
        const defaultStrategy = this.strategies.get(
          this.config.defaultStrategy
        );
        if (defaultStrategy) {
          return defaultStrategy;
        }
      }
      return null;
    }

    // 返回优先级最高的策略
    return applicable[0];
  }

  /**
   * 执行验证
   * @param context - 验证上下文
   * @param strategyName - 策略名称，不指定则自动选择
   * @returns 验证结果
   */
  public async validate(
    context: ValidationContext,
    strategyName?: string
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      // 检查缓存
      if (this.config.enableCache) {
        const cacheKey = this.generateCacheKey(context, strategyName);
        const cached = this.cache.get(cacheKey);
        if (cached) {
          logger.debug('从缓存获取验证结果', { cacheKey });
          return cached;
        }
      }

      // 选择策略
      const strategy = this.selectStrategy(context, strategyName);
      if (!strategy) {
        const result: ValidationResult = {
          valid: false,
          errors: ['没有找到适用的验证策略'],
          warnings: [],
          duration: Date.now() - startTime,
          strategy: 'none',
        };
        return result;
      }

      // 执行验证
      const result = await this.executeStrategy(strategy, context);

      // 缓存结果
      if (this.config.enableCache && result.valid) {
        const cacheKey = this.generateCacheKey(context, strategy.name);
        this.cacheResult(cacheKey, result);
      }

      return result;
    } catch (error) {
      logger.error('验证执行失败', {
        error: error instanceof Error ? error.message : String(error),
      });

      return {
        valid: false,
        errors: [
          `验证执行失败: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
        warnings: [],
        duration: Date.now() - startTime,
        strategy: strategyName || 'unknown',
      };
    }
  }

  /**
   * 并行执行多个策略
   * @param context - 验证上下文
   * @param strategyNames - 策略名称数组，不指定则使用所有适用策略
   * @returns 策略执行结果数组
   */
  public async validateParallel(
    context: ValidationContext,
    strategyNames?: string[]
  ): Promise<StrategyExecutionResult[]> {
    let strategies: ValidationStrategy[];

    if (strategyNames) {
      strategies = strategyNames
        .map(name => this.strategies.get(name))
        .filter(
          (strategy): strategy is ValidationStrategy =>
            strategy !== undefined && strategy.canHandle(context)
        );
    } else {
      strategies = this.getApplicableStrategies(context);
    }

    if (strategies.length === 0) {
      return [];
    }

    const promises = strategies.map(
      async (strategy): Promise<StrategyExecutionResult> => {
        try {
          const result = await this.executeStrategy(strategy, context);
          return {
            strategy: strategy.name,
            result,
            status: 'success',
          };
        } catch (error) {
          return {
            strategy: strategy.name,
            result: {
              valid: false,
              errors: [error instanceof Error ? error.message : String(error)],
              warnings: [],
              duration: 0,
              strategy: strategy.name,
            },
            status: 'error',
            error: error instanceof Error ? error : new Error(String(error)),
          };
        }
      }
    );

    const results = await Promise.allSettled(promises);

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          strategy: strategies[index].name,
          result: {
            valid: false,
            errors: [result.reason?.message || '未知错误'],
            warnings: [],
            duration: 0,
            strategy: strategies[index].name,
          },
          status: 'error',
          error: result.reason,
        };
      }
    });
  }

  /**
   * 组合验证（所有策略都必须通过）
   * @param context - 验证上下文
   * @param strategyNames - 策略名称数组
   * @returns 组合验证结果
   */
  public async validateAll(
    context: ValidationContext,
    strategyNames?: string[]
  ): Promise<ValidationResult> {
    const startTime = Date.now();
    const results = await this.validateParallel(context, strategyNames);

    const allErrors: string[] = [];
    const allWarnings: string[] = [];
    const strategyNames_: string[] = [];

    let allValid = true;

    for (const result of results) {
      if (result.status === 'success') {
        if (!result.result.valid) {
          allValid = false;
        }
        allErrors.push(...result.result.errors);
        allWarnings.push(...result.result.warnings);
        strategyNames_.push(result.strategy);

        // 如果配置为在第一个错误时停止
        if (!result.result.valid && this.config.stopOnFirstError) {
          break;
        }
      } else {
        allValid = false;
        allErrors.push(`策略 ${result.strategy} 执行失败`);
        if (result.error) {
          allErrors.push(result.error.message);
        }
      }
    }

    return {
      valid: allValid,
      errors: allErrors,
      warnings: allWarnings,
      duration: Date.now() - startTime,
      strategy: strategyNames_.join(', '),
    };
  }

  /**
   * 任一验证（任意策略通过即可）
   * @param context - 验证上下文
   * @param strategyNames - 策略名称数组
   * @returns 验证结果
   */
  public async validateAny(
    context: ValidationContext,
    strategyNames?: string[]
  ): Promise<ValidationResult> {
    const startTime = Date.now();
    const results = await this.validateParallel(context, strategyNames);

    const allErrors: string[] = [];
    const allWarnings: string[] = [];
    const strategyNames_: string[] = [];

    let anyValid = false;

    for (const result of results) {
      if (result.status === 'success') {
        if (result.result.valid) {
          anyValid = true;
        }
        allErrors.push(...result.result.errors);
        allWarnings.push(...result.result.warnings);
        strategyNames_.push(result.strategy);
      } else {
        allErrors.push(`策略 ${result.strategy} 执行失败`);
        if (result.error) {
          allErrors.push(result.error.message);
        }
      }
    }

    return {
      valid: anyValid,
      errors: anyValid ? [] : allErrors,
      warnings: allWarnings,
      duration: Date.now() - startTime,
      strategy: strategyNames_.join(', '),
    };
  }

  /**
   * 清除缓存
   * @param strategy - 策略名称，不指定则清除所有缓存
   */
  public clearCache(strategy?: string): void {
    if (strategy) {
      this.clearCacheByStrategy(strategy);
    } else {
      this.cache.clear();
      logger.debug('清除所有验证缓存');
    }
  }

  /**
   * 获取缓存统计信息
   * @returns 缓存统计
   */
  public getCacheStats(): {
    size: number;
    limit: number;
    hitRate: number;
  } {
    // 这里简化实现，实际应该记录命中率
    return {
      size: this.cache.size,
      limit: this.config.cacheLimit,
      hitRate: 0, // 需要实际统计
    };
  }

  /**
   * 执行单个策略
   * @param strategy - 验证策略
   * @param context - 验证上下文
   * @returns 验证结果
   */
  private async executeStrategy(
    strategy: ValidationStrategy,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      let result: ValidationResult;

      if (this.config.timeout > 0) {
        // 带超时的执行
        result = await Promise.race([
          Promise.resolve(strategy.validate(context)),
          new Promise<never>((_, reject) => {
            setTimeout(() => {
              reject(new Error(`策略执行超时: ${strategy.name}`));
            }, this.config.timeout);
          }),
        ]);
      } else {
        // 无超时执行
        result = await Promise.resolve(strategy.validate(context));
      }

      // 确保结果包含必要字段
      result.duration = Date.now() - startTime;
      result.strategy = strategy.name;

      if (this.config.debug) {
        logger.debug('策略执行完成', {
          strategy: strategy.name,
          valid: result.valid,
          duration: result.duration,
          errorCount: result.errors.length,
          warningCount: result.warnings.length,
        });
      }

      return result;
    } catch (error) {
      logger.error('策略执行异常', {
        strategy: strategy.name,
        error: error instanceof Error ? error.message : String(error),
      });

      return {
        valid: false,
        errors: [error instanceof Error ? error.message : String(error)],
        warnings: [],
        duration: Date.now() - startTime,
        strategy: strategy.name,
      };
    }
  }

  /**
   * 生成缓存键
   * @param context - 验证上下文
   * @param strategy - 策略名称
   * @returns 缓存键
   */
  private generateCacheKey(
    context: ValidationContext,
    strategy?: string
  ): string {
    const contextHash = JSON.stringify({
      target: context.target,
      params: context.params,
      path: context.path,
    });

    const strategyPart = strategy || 'auto';
    return `${strategyPart}_${btoa(contextHash)}`;
  }

  /**
   * 缓存验证结果
   * @param cacheKey - 缓存键
   * @param result - 验证结果
   */
  private cacheResult(cacheKey: string, result: ValidationResult): void {
    // 检查缓存大小限制
    if (this.cache.size >= this.config.cacheLimit) {
      // 删除最旧的缓存项
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(cacheKey, { ...result });
  }

  /**
   * 按策略清除缓存
   * @param strategy - 策略名称
   */
  private clearCacheByStrategy(strategy: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.startsWith(`${strategy}_`)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => {
      this.cache.delete(key);
    });

    logger.debug('清除策略缓存', {
      strategy,
      deletedCount: keysToDelete.length,
    });
  }
}

/**
 * 抽象验证策略基类
 */
export abstract class BaseValidationStrategy implements ValidationStrategy {
  public abstract readonly name: string;
  public abstract readonly description: string;
  public readonly priority: number = 0;
  public readonly async: boolean = false;

  protected config: Record<string, any> = {};

  /**
   * 检查是否适用于当前上下文
   * @param context - 验证上下文
   * @returns 是否适用
   */
  public abstract canHandle(context: ValidationContext): boolean;

  /**
   * 执行验证
   * @param context - 验证上下文
   * @returns 验证结果
   */
  public abstract validate(
    context: ValidationContext
  ): ValidationResult | Promise<ValidationResult>;

  /**
   * 获取策略配置
   * @returns 策略配置
   */
  public getConfig(): Record<string, any> {
    return { ...this.config };
  }

  /**
   * 设置策略配置
   * @param config - 策略配置
   */
  public setConfig(config: Record<string, any>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 创建验证结果
   * @param valid - 是否有效
   * @param errors - 错误消息
   * @param warnings - 警告消息
   * @param data - 验证数据
   * @returns 验证结果
   */
  protected createResult(
    valid: boolean,
    errors: string[] = [],
    warnings: string[] = [],
    data?: any
  ): ValidationResult {
    return {
      valid,
      errors,
      warnings,
      data,
      duration: 0, // 将由管理器设置
      strategy: this.name,
    };
  }
}

/**
 * 创建验证策略管理器
 * @param config - 管理器配置
 * @returns 策略管理器实例
 */
export function createValidationStrategyManager(
  config?: StrategyManagerConfig
): ValidationStrategyManager {
  return new ValidationStrategyManager(config);
}

/**
 * 默认验证策略管理器实例
 */
export const defaultValidationManager = createValidationStrategyManager({
  enableParallel: true,
  stopOnFirstError: false,
  timeout: 5000,
  enableCache: true,
  cacheLimit: 500,
  debug: process.env.NODE_ENV === 'development',
});

/**
 * 策略装饰器
 * 用于自动注册验证策略
 */
export function ValidationStrategyRegistration(options: {
  name: string;
  description: string;
  priority?: number;
  autoRegister?: boolean;
}) {
  return function <T extends new (...args: any[]) => ValidationStrategy>(
    constructor: T
  ): T {
    const strategy = new constructor();

    // 设置策略属性
    (strategy as any).name = options.name;
    (strategy as any).description = options.description;
    (strategy as any).priority = options.priority || 0;

    // 自动注册到默认管理器
    if (options.autoRegister !== false) {
      defaultValidationManager.register(strategy);
    }

    return constructor;
  };
}
