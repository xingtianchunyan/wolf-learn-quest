/**
 * 文件级注释：装饰器模式实现
 * 提供装饰器模式的完整实现，支持功能增强和组合
 */

import { useCallback, useMemo } from 'react';

/**
 * 基础组件接口
 */
export interface Component<T = any> {
  operation(): T;
}

/**
 * 装饰器基类
 */
export abstract class Decorator<T = any> implements Component<T> {
  protected component: Component<T>;

  /**
   * 构造函数
   * @param component - 被装饰的组件
   */
  constructor(component: Component<T>) {
    this.component = component;
  }

  /**
   * 执行操作
   * @returns 操作结果
   */
  operation(): T {
    return this.component.operation();
  }
}

/**
 * 缓存装饰器
 * 为组件添加缓存功能
 */
export class CacheDecorator<T> extends Decorator<T> {
  private cache: Map<string, { value: T; timestamp: number }> = new Map();
  private ttl: number;

  /**
   * 构造函数
   * @param component - 被装饰的组件
   * @param ttl - 缓存生存时间（毫秒）
   */
  constructor(component: Component<T>, ttl: number = 5000) {
    super(component);
    this.ttl = ttl;
  }

  /**
   * 执行操作（带缓存）
   * @returns 操作结果
   */
  operation(): T {
    const key = 'default';
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.ttl) {
      return cached.value;
    }

    const result = super.operation();
    this.cache.set(key, { value: result, timestamp: now });
    return result;
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear();
  }
}

/**
 * 日志装饰器
 * 为组件添加日志记录功能
 */
export class LoggingDecorator<T> extends Decorator<T> {
  private logger: (message: string, data?: any) => void;

  /**
   * 构造函数
   * @param component - 被装饰的组件
   * @param logger - 日志记录函数
   */
  constructor(
    component: Component<T>,
    logger: (message: string, data?: any) => void = console.log
  ) {
    super(component);
    this.logger = logger;
  }

  /**
   * 执行操作（带日志）
   * @returns 操作结果
   */
  operation(): T {
    const startTime = Date.now();
    this.logger('开始执行操作');

    try {
      const result = super.operation();
      const endTime = Date.now();
      this.logger(`操作完成，耗时: ${endTime - startTime}ms`, { result });
      return result;
    } catch (error) {
      const endTime = Date.now();
      this.logger(`操作失败，耗时: ${endTime - startTime}ms`, { error });
      throw error;
    }
  }
}

/**
 * 重试装饰器
 * 为组件添加重试功能
 */
export class RetryDecorator<T> extends Decorator<T> {
  private maxRetries: number;
  private delay: number;

  /**
   * 构造函数
   * @param component - 被装饰的组件
   * @param maxRetries - 最大重试次数
   * @param delay - 重试延迟（毫秒）
   */
  constructor(
    component: Component<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ) {
    super(component);
    this.maxRetries = maxRetries;
    this.delay = delay;
  }

  /**
   * 执行操作（带重试）
   * @returns 操作结果
   */
  operation(): T {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return super.operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt < this.maxRetries) {
          // 同步延迟（简化实现）
          const start = Date.now();
          while (Date.now() - start < this.delay) {
            // 忙等待
          }
        }
      }
    }

    throw lastError!;
  }
}

/**
 * 性能监控装饰器
 * 为组件添加性能监控功能
 */
export class PerformanceDecorator<T> extends Decorator<T> {
  private metrics: {
    totalCalls: number;
    totalTime: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
  } = {
    totalCalls: 0,
    totalTime: 0,
    averageTime: 0,
    minTime: Infinity,
    maxTime: 0,
  };

  /**
   * 执行操作（带性能监控）
   * @returns 操作结果
   */
  operation(): T {
    const startTime = performance.now();

    try {
      const result = super.operation();
      this.updateMetrics(performance.now() - startTime);
      return result;
    } catch (error) {
      this.updateMetrics(performance.now() - startTime);
      throw error;
    }
  }

  /**
   * 更新性能指标
   * @param executionTime - 执行时间
   */
  private updateMetrics(executionTime: number): void {
    this.metrics.totalCalls++;
    this.metrics.totalTime += executionTime;
    this.metrics.averageTime = this.metrics.totalTime / this.metrics.totalCalls;
    this.metrics.minTime = Math.min(this.metrics.minTime, executionTime);
    this.metrics.maxTime = Math.max(this.metrics.maxTime, executionTime);
  }

  /**
   * 获取性能指标
   * @returns 性能指标
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * 重置性能指标
   */
  resetMetrics(): void {
    this.metrics = {
      totalCalls: 0,
      totalTime: 0,
      averageTime: 0,
      minTime: Infinity,
      maxTime: 0,
    };
  }
}

/**
 * 装饰器构建器
 * 用于链式构建装饰器
 */
export class DecoratorBuilder<T> {
  private component: Component<T>;

  /**
   * 构造函数
   * @param component - 基础组件
   */
  constructor(component: Component<T>) {
    this.component = component;
  }

  /**
   * 添加缓存装饰器
   * @param ttl - 缓存生存时间
   * @returns 构建器实例
   */
  withCache(ttl: number = 5000): DecoratorBuilder<T> {
    this.component = new CacheDecorator(this.component, ttl);
    return this;
  }

  /**
   * 添加日志装饰器
   * @param logger - 日志记录函数
   * @returns 构建器实例
   */
  withLogging(
    logger?: (message: string, data?: any) => void
  ): DecoratorBuilder<T> {
    this.component = new LoggingDecorator(this.component, logger);
    return this;
  }

  /**
   * 添加重试装饰器
   * @param maxRetries - 最大重试次数
   * @param delay - 重试延迟
   * @returns 构建器实例
   */
  withRetry(maxRetries: number = 3, delay: number = 1000): DecoratorBuilder<T> {
    this.component = new RetryDecorator(this.component, maxRetries, delay);
    return this;
  }

  /**
   * 添加性能监控装饰器
   * @returns 构建器实例
   */
  withPerformanceMonitoring(): DecoratorBuilder<T> {
    this.component = new PerformanceDecorator(this.component);
    return this;
  }

  /**
   * 构建最终组件
   * @returns 装饰后的组件
   */
  build(): Component<T> {
    return this.component;
  }
}

/**
 * React Hook：使用装饰器模式
 * @param baseComponent - 基础组件
 * @param decorators - 装饰器配置
 * @returns 装饰后的组件
 */
export function useDecorator<T>(
  baseComponent: Component<T>,
  decorators: {
    cache?: { ttl?: number };
    logging?: { logger?: (message: string, data?: any) => void };
    retry?: { maxRetries?: number; delay?: number };
    performance?: boolean;
  } = {}
) {
  const decoratedComponent = useMemo(() => {
    const builder = new DecoratorBuilder(baseComponent);

    if (decorators.cache) {
      builder.withCache(decorators.cache.ttl);
    }

    if (decorators.logging) {
      builder.withLogging(decorators.logging.logger);
    }

    if (decorators.retry) {
      builder.withRetry(decorators.retry.maxRetries, decorators.retry.delay);
    }

    if (decorators.performance) {
      builder.withPerformanceMonitoring();
    }

    return builder.build();
  }, [baseComponent, decorators]);

  const operation = useCallback(() => {
    return decoratedComponent.operation();
  }, [decoratedComponent]);

  return {
    operation,
    component: decoratedComponent,
  };
}

/**
 * 创建装饰器的工厂函数
 * @param baseComponent - 基础组件
 * @returns 装饰器构建器
 */
export function createDecorator<T>(
  baseComponent: Component<T>
): DecoratorBuilder<T> {
  return new DecoratorBuilder(baseComponent);
}
