/**
 * @fileoverview 事件发射器 - 观察者模式实现
 * 提供统一的事件订阅、发布和管理机制，支持类型安全的事件处理
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { createLogger } from '@/lib/logger';

const logger = createLogger('event-emitter');

/**
 * 事件监听器接口
 */
export interface EventListener<T = any> {
  /** 监听器函数 */
  handler: (data: T) => void | Promise<void>;
  /** 是否只执行一次 */
  once?: boolean;
  /** 优先级（数字越大优先级越高） */
  priority?: number;
  /** 监听器ID */
  id?: string;
  /** 创建时间 */
  createdAt?: number;
  /** 执行次数 */
  executeCount?: number;
}

/**
 * 事件配置接口
 */
export interface EventConfig {
  /** 最大监听器数量 */
  maxListeners?: number;
  /** 是否启用异步执行 */
  async?: boolean;
  /** 错误处理策略 */
  errorHandling?: 'ignore' | 'log' | 'throw';
  /** 是否启用调试模式 */
  debug?: boolean;
  /** 事件历史记录大小 */
  historySize?: number;
}

/**
 * 事件历史记录接口
 */
export interface EventHistory<T = any> {
  /** 事件名称 */
  event: string;
  /** 事件数据 */
  data: T;
  /** 触发时间 */
  timestamp: number;
  /** 监听器执行结果 */
  results: Array<{
    listenerId: string;
    success: boolean;
    error?: Error;
    duration: number;
  }>;
}

/**
 * 事件统计信息接口
 */
export interface EventStats {
  /** 事件名称 */
  event: string;
  /** 监听器数量 */
  listenerCount: number;
  /** 触发次数 */
  emitCount: number;
  /** 最后触发时间 */
  lastEmitTime: number;
  /** 平均执行时间 */
  avgExecutionTime: number;
  /** 错误次数 */
  errorCount: number;
}

/**
 * 事件发射器类
 * 实现观察者模式，提供类型安全的事件订阅和发布机制
 */
export class EventEmitter<
  TEvents extends Record<string, any> = Record<string, any>,
> {
  private listeners = new Map<keyof TEvents, EventListener[]>();
  private config: Required<EventConfig>;
  private history: EventHistory[] = [];
  private stats = new Map<keyof TEvents, EventStats>();

  /**
   * 构造函数
   * @param config - 事件配置
   */
  constructor(config: EventConfig = {}) {
    this.config = {
      maxListeners: 10,
      async: false,
      errorHandling: 'log',
      debug: false,
      historySize: 100,
      ...config,
    };

    logger.info('事件发射器初始化', { config: this.config });
  }

  /**
   * 订阅事件
   * @param event - 事件名称
   * @param handler - 事件处理函数
   * @param options - 监听器选项
   * @returns 取消订阅函数
   */
  public on<K extends keyof TEvents>(
    event: K,
    handler: (data: TEvents[K]) => void | Promise<void>,
    options: Omit<EventListener, 'handler'> = {}
  ): () => void {
    const listener: EventListener<TEvents[K]> = {
      handler,
      once: false,
      priority: 0,
      id: this.generateListenerId(),
      createdAt: Date.now(),
      executeCount: 0,
      ...options,
    };

    this.addListener(event, listener);

    // 返回取消订阅函数
    return () => this.off(event, listener.id!);
  }

  /**
   * 订阅事件（只执行一次）
   * @param event - 事件名称
   * @param handler - 事件处理函数
   * @param options - 监听器选项
   * @returns 取消订阅函数
   */
  public once<K extends keyof TEvents>(
    event: K,
    handler: (data: TEvents[K]) => void | Promise<void>,
    options: Omit<EventListener, 'handler' | 'once'> = {}
  ): () => void {
    return this.on(event, handler, { ...options, once: true });
  }

  /**
   * 取消订阅事件
   * @param event - 事件名称
   * @param listenerId - 监听器ID，不指定则移除所有监听器
   */
  public off<K extends keyof TEvents>(event: K, listenerId?: string): void {
    const listeners = this.listeners.get(event);
    if (!listeners) {
      return;
    }

    if (listenerId) {
      const index = listeners.findIndex(l => l.id === listenerId);
      if (index !== -1) {
        listeners.splice(index, 1);
        logger.debug('移除事件监听器', { event: String(event), listenerId });
      }
    } else {
      this.listeners.delete(event);
      logger.debug('移除所有事件监听器', { event: String(event) });
    }

    // 清理空的监听器数组
    if (listeners.length === 0) {
      this.listeners.delete(event);
    }
  }

  /**
   * 发布事件
   * @param event - 事件名称
   * @param data - 事件数据
   * @returns 执行结果Promise（异步模式）或void（同步模式）
   */
  public emit<K extends keyof TEvents>(
    event: K,
    data: TEvents[K]
  ): Promise<void> | void {
    const listeners = this.listeners.get(event);
    if (!listeners || listeners.length === 0) {
      if (this.config.debug) {
        logger.debug('没有找到事件监听器', { event: String(event) });
      }
      return this.config.async ? Promise.resolve() : undefined;
    }

    // 更新统计信息
    this.updateStats(event);

    // 按优先级排序监听器
    const sortedListeners = [...listeners].sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );

    if (this.config.async) {
      return this.executeListenersAsync(event, data, sortedListeners);
    } else {
      this.executeListenersSync(event, data, sortedListeners);
    }
  }

  /**
   * 发布事件并等待所有监听器完成
   * @param event - 事件名称
   * @param data - 事件数据
   * @returns 执行结果Promise
   */
  public async emitAsync<K extends keyof TEvents>(
    event: K,
    data: TEvents[K]
  ): Promise<void> {
    const listeners = this.listeners.get(event);
    if (!listeners || listeners.length === 0) {
      return;
    }

    // 更新统计信息
    this.updateStats(event);

    // 按优先级排序监听器
    const sortedListeners = [...listeners].sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );

    await this.executeListenersAsync(event, data, sortedListeners);
  }

  /**
   * 获取事件监听器数量
   * @param event - 事件名称，不指定则返回所有事件的监听器总数
   * @returns 监听器数量
   */
  public listenerCount<K extends keyof TEvents>(event?: K): number {
    if (event) {
      const listeners = this.listeners.get(event);
      return listeners ? listeners.length : 0;
    }

    let total = 0;
    for (const listeners of this.listeners.values()) {
      total += listeners.length;
    }
    return total;
  }

  /**
   * 获取所有事件名称
   * @returns 事件名称数组
   */
  public eventNames(): (keyof TEvents)[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * 获取事件监听器列表
   * @param event - 事件名称
   * @returns 监听器数组
   */
  public listeners<K extends keyof TEvents>(
    event: K
  ): EventListener<TEvents[K]>[] {
    const listeners = this.listeners.get(event);
    return listeners ? [...listeners] : [];
  }

  /**
   * 移除所有监听器
   * @param event - 事件名称，不指定则移除所有事件的监听器
   */
  public removeAllListeners<K extends keyof TEvents>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
      logger.debug('移除事件所有监听器', { event: String(event) });
    } else {
      this.listeners.clear();
      logger.debug('移除所有事件监听器');
    }
  }

  /**
   * 设置最大监听器数量
   * @param max - 最大数量
   */
  public setMaxListeners(max: number): void {
    this.config.maxListeners = max;
    logger.debug('设置最大监听器数量', { max });
  }

  /**
   * 获取最大监听器数量
   * @returns 最大数量
   */
  public getMaxListeners(): number {
    return this.config.maxListeners;
  }

  /**
   * 获取事件历史记录
   * @param event - 事件名称，不指定则返回所有事件历史
   * @param limit - 返回数量限制
   * @returns 历史记录数组
   */
  public getHistory<K extends keyof TEvents>(
    event?: K,
    limit?: number
  ): EventHistory[] {
    let history = this.history;

    if (event) {
      history = history.filter(h => h.event === String(event));
    }

    if (limit) {
      history = history.slice(-limit);
    }

    return [...history];
  }

  /**
   * 获取事件统计信息
   * @param event - 事件名称，不指定则返回所有事件统计
   * @returns 统计信息
   */
  public getStats<K extends keyof TEvents>(
    event?: K
  ): EventStats | EventStats[] {
    if (event) {
      return this.stats.get(event) || this.createDefaultStats(event);
    }

    return Array.from(this.stats.values());
  }

  /**
   * 清除历史记录
   * @param event - 事件名称，不指定则清除所有历史
   */
  public clearHistory<K extends keyof TEvents>(event?: K): void {
    if (event) {
      this.history = this.history.filter(h => h.event !== String(event));
    } else {
      this.history = [];
    }

    logger.debug('清除事件历史记录', { event: event ? String(event) : 'all' });
  }

  /**
   * 清除统计信息
   * @param event - 事件名称，不指定则清除所有统计
   */
  public clearStats<K extends keyof TEvents>(event?: K): void {
    if (event) {
      this.stats.delete(event);
    } else {
      this.stats.clear();
    }

    logger.debug('清除事件统计信息', { event: event ? String(event) : 'all' });
  }

  /**
   * 添加监听器
   * @param event - 事件名称
   * @param listener - 监听器
   */
  private addListener<K extends keyof TEvents>(
    event: K,
    listener: EventListener<TEvents[K]>
  ): void {
    let listeners = this.listeners.get(event);
    if (!listeners) {
      listeners = [];
      this.listeners.set(event, listeners);
    }

    // 检查监听器数量限制
    if (listeners.length >= this.config.maxListeners) {
      logger.warn('事件监听器数量超过限制', {
        event: String(event),
        current: listeners.length,
        max: this.config.maxListeners,
      });
    }

    listeners.push(listener);

    logger.debug('添加事件监听器', {
      event: String(event),
      listenerId: listener.id,
      priority: listener.priority,
      once: listener.once,
    });
  }

  /**
   * 同步执行监听器
   * @param event - 事件名称
   * @param data - 事件数据
   * @param listeners - 监听器数组
   */
  private executeListenersSync<K extends keyof TEvents>(
    event: K,
    data: TEvents[K],
    listeners: EventListener<TEvents[K]>[]
  ): void {
    const startTime = Date.now();
    const results: EventHistory['results'] = [];

    for (const listener of listeners) {
      const listenerStartTime = Date.now();

      try {
        listener.handler(data);
        listener.executeCount = (listener.executeCount || 0) + 1;

        results.push({
          listenerId: listener.id!,
          success: true,
          duration: Date.now() - listenerStartTime,
        });

        // 移除一次性监听器
        if (listener.once) {
          this.off(event, listener.id!);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        results.push({
          listenerId: listener.id!,
          success: false,
          error: err,
          duration: Date.now() - listenerStartTime,
        });

        this.handleError(event, err);
      }
    }

    // 记录历史
    this.recordHistory(event, data, results);

    if (this.config.debug) {
      logger.debug('同步执行事件监听器完成', {
        event: String(event),
        listenerCount: listeners.length,
        duration: Date.now() - startTime,
      });
    }
  }

  /**
   * 异步执行监听器
   * @param event - 事件名称
   * @param data - 事件数据
   * @param listeners - 监听器数组
   */
  private async executeListenersAsync<K extends keyof TEvents>(
    event: K,
    data: TEvents[K],
    listeners: EventListener<TEvents[K]>[]
  ): Promise<void> {
    const startTime = Date.now();
    const results: EventHistory['results'] = [];

    const promises = listeners.map(async listener => {
      const listenerStartTime = Date.now();

      try {
        await listener.handler(data);
        listener.executeCount = (listener.executeCount || 0) + 1;

        results.push({
          listenerId: listener.id!,
          success: true,
          duration: Date.now() - listenerStartTime,
        });

        // 移除一次性监听器
        if (listener.once) {
          this.off(event, listener.id!);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        results.push({
          listenerId: listener.id!,
          success: false,
          error: err,
          duration: Date.now() - listenerStartTime,
        });

        this.handleError(event, err);
      }
    });

    await Promise.all(promises);

    // 记录历史
    this.recordHistory(event, data, results);

    if (this.config.debug) {
      logger.debug('异步执行事件监听器完成', {
        event: String(event),
        listenerCount: listeners.length,
        duration: Date.now() - startTime,
      });
    }
  }

  /**
   * 处理错误
   * @param event - 事件名称
   * @param error - 错误对象
   */
  private handleError<K extends keyof TEvents>(event: K, error: Error): void {
    // 更新错误统计
    const stats = this.stats.get(event);
    if (stats) {
      stats.errorCount++;
    }

    switch (this.config.errorHandling) {
      case 'ignore':
        break;
      case 'log':
        logger.error('事件监听器执行错误', {
          event: String(event),
          error: error.message,
        });
        break;
      case 'throw':
        throw error;
    }
  }

  /**
   * 记录历史
   * @param event - 事件名称
   * @param data - 事件数据
   * @param results - 执行结果
   */
  private recordHistory<K extends keyof TEvents>(
    event: K,
    data: TEvents[K],
    results: EventHistory['results']
  ): void {
    const historyItem: EventHistory = {
      event: String(event),
      data,
      timestamp: Date.now(),
      results,
    };

    this.history.push(historyItem);

    // 限制历史记录大小
    if (this.history.length > this.config.historySize) {
      this.history.shift();
    }
  }

  /**
   * 更新统计信息
   * @param event - 事件名称
   */
  private updateStats<K extends keyof TEvents>(event: K): void {
    let stats = this.stats.get(event);
    if (!stats) {
      stats = this.createDefaultStats(event);
      this.stats.set(event, stats);
    }

    stats.emitCount++;
    stats.lastEmitTime = Date.now();
    stats.listenerCount = this.listenerCount(event);
  }

  /**
   * 创建默认统计信息
   * @param event - 事件名称
   * @returns 默认统计信息
   */
  private createDefaultStats<K extends keyof TEvents>(event: K): EventStats {
    return {
      event: String(event),
      listenerCount: 0,
      emitCount: 0,
      lastEmitTime: 0,
      avgExecutionTime: 0,
      errorCount: 0,
    };
  }

  /**
   * 生成监听器ID
   * @returns 唯一ID
   */
  private generateListenerId(): string {
    return `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * 创建类型安全的事件发射器
 * @param config - 事件配置
 * @returns 事件发射器实例
 */
export function createEventEmitter<TEvents extends Record<string, any>>(
  config?: EventConfig
): EventEmitter<TEvents> {
  return new EventEmitter<TEvents>(config);
}

/**
 * 全局事件发射器实例
 */
export const globalEventEmitter = createEventEmitter({
  maxListeners: 50,
  async: true,
  errorHandling: 'log',
  debug: process.env.NODE_ENV === 'development',
  historySize: 200,
});

/**
 * 事件发射器工具函数
 */
export const EventEmitterUtils = {
  /**
   * 创建事件代理
   */
  createProxy: <TEvents extends Record<string, any>>(
    source: EventEmitter<TEvents>,
    target: EventEmitter<TEvents>,
    events?: (keyof TEvents)[]
  ) => {
    const eventsToProxy = events || source.eventNames();
    const unsubscribers: (() => void)[] = [];

    eventsToProxy.forEach(event => {
      const unsubscribe = source.on(event, data => {
        target.emit(event, data);
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  },

  /**
   * 创建事件过滤器
   */
  createFilter: <TEvents extends Record<string, any>, K extends keyof TEvents>(
    emitter: EventEmitter<TEvents>,
    event: K,
    filter: (data: TEvents[K]) => boolean
  ) => {
    const filteredEmitter = createEventEmitter<Pick<TEvents, K>>();

    emitter.on(event, data => {
      if (filter(data)) {
        filteredEmitter.emit(event, data);
      }
    });

    return filteredEmitter;
  },

  /**
   * 创建事件转换器
   */
  createTransformer: <
    TEvents extends Record<string, any>,
    TTransformed extends Record<string, any>,
  >(
    emitter: EventEmitter<TEvents>,
    transformer: (
      event: keyof TEvents,
      data: any
    ) => {
      event: keyof TTransformed;
      data: any;
    } | null
  ) => {
    const transformedEmitter = createEventEmitter<TTransformed>();

    emitter.eventNames().forEach(event => {
      emitter.on(event, data => {
        const result = transformer(event, data);
        if (result) {
          transformedEmitter.emit(result.event, result.data);
        }
      });
    });

    return transformedEmitter;
  },
};
