import { createLogger  } from '@/lib/logger';

/**
* 观察者模式实现
* 提供事件发布订阅机制，用于组件间通信和状态同步
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('observer-pattern');

/**
* 事件监听器类型
 */
export type EventListener<T = any> = (data: T) => void | Promise<void>;

/**
* 事件订阅信息接口
 */
export interface EventSubscription { /** 订阅ID  */
  id: string;
  /** 事件名称  */
  eventName: string;
  /** 监听器函数  */
  listener: EventListener;
  /** 是否只执行一次  */
  once?: boolean;
  /** 优先级（数字越大优先级越高）  */
  priority?: number;
  /** 订阅时间  */
  subscribedAt: Date;,
}

/**
* 事件发射器类
* 实现观察者模式的核心类
 */
export class EventEmitter { private listeners: Map<string, EventSubscription[]> = new Map();
  private maxListeners: number = 100;
  private subscriptionCounter: number = 0;

  /**
  * 设置最大监听器数量
  *
  * @param max - 最大监听器数量
   */
  setMaxListeners(max: number): void {
    this.maxListeners = max;,
}

  /**
  * 生成唯一的订阅ID
  *
  * @returns 订阅ID
   */
  private generateSubscriptionId(): string { return `sub_${++this.subscriptionCounter }_${ Date.now() }`;,
}

  /**
  * 订阅事件
  *
  * @param eventName - 事件名称
  * @param listener - 监听器函数
  * @param options - 订阅选项
  * @returns 取消订阅函数
   */
  on<T = any>(;
    eventName: string,
    listener: EventListener<T>,
    options: { once?: boolean;
      priority?: number;,
} = {}
  ): () => void { const subscription: EventSubscription = {
      id: this.generateSubscriptionId(),
      eventName,
      listener,
      once: options.once || false,
      priority: options.priority || 0,
      subscribedAt: new Date(),
};

    if (!this.listeners.has(eventName)) { this.listeners.set(eventName, []);,
}

    const eventListeners = this.listeners.get(eventName)!;

    // 检查监听器数量限制
    if (eventListeners.length >= this.maxListeners) { logger.warn('事件监听器数量超过限制', {
        eventName,
        count: eventListeners.length,
        maxListeners: this.maxListeners,
});,
}

    // 按优先级插入
    const insertIndex = eventListeners.findIndex(;
      sub => (sub.priority || 0) < (subscription.priority || 0);
    );

    if (insertIndex === -1) { eventListeners.push(subscription);,
} else { eventListeners.splice(insertIndex, 0, subscription);,
}

    logger.debug('事件监听器已注册', { eventName,
      subscriptionId: subscription.id,
      priority: subscription.priority,
      once: subscription.once,
});

    // 返回取消订阅函数
    return () => this.off(eventName, subscription.id);,
}

  /**
  * 订阅事件（只执行一次）
  *
  * @param eventName - 事件名称
  * @param listener - 监听器函数
  * @param priority - 优先级
  * @returns 取消订阅函数
   */
  once<T = any>(;
    eventName: string,
    listener: EventListener<T>,
    priority?: number
  ): () => void { return this.on(eventName, listener, { once: true, priority  });,
}

  /**
  * 取消订阅事件
  *
  * @param eventName - 事件名称
  * @param subscriptionId - 订阅ID（可选）
   */
  off(eventName: string, subscriptionId?: string): void { const eventListeners = this.listeners.get(eventName);
    if (!eventListeners) return;

    if (subscriptionId) {
      // 移除特定订阅
      const index = eventListeners.findIndex(sub => sub.id === subscriptionId);
      if (index !== -1) {
        eventListeners.splice(index, 1);
        logger.debug('事件监听器已移除', {
          eventName,
          subscriptionId,
});,
}
    } else { // 移除所有订阅
      this.listeners.delete(eventName);
      logger.debug('所有事件监听器已移除', { eventName  });,
}

    // 如果没有监听器了，删除事件
    if (eventListeners.length === 0) { this.listeners.delete(eventName);,
}
  }

  /**
  * 发射事件
  *
  * @param eventName - 事件名称
  * @param data - 事件数据
  * @returns 是否有监听器处理了事件
   */
  async emit<T = any>(eventName: string, data?: T): Promise<boolean> { const eventListeners = this.listeners.get(eventName);
    if (!eventListeners || eventListeners.length === 0) {
      logger.debug('没有找到事件监听器', { eventName  });
      return false;,
}

    logger.debug('发射事件', { eventName,
      listenerCount: eventListeners.length,
      data,
});

    const listenersToRemove: string[] = [];
    const promises: Promise<void>[] = [];

    for (const subscription of eventListeners) { try {
        const result = subscription.listener(data);

        // 如果返回 Promise，添加到 promises 数组
        if (result instanceof Promise) {
          promises.push(result);,
}

        // 如果是一次性监听器，标记为待移除
        if (subscription.once) { listenersToRemove.push(subscription.id);,
}
      } catch (error) { logger.error('事件监听器执行失败', {
          eventName,
          subscriptionId: subscription.id,
          error,
});,
}
    }

    // 等待所有异步监听器完成
    if (promises.length > 0) { try {
        await Promise.all(promises);,
} catch (error) { logger.error('异步事件监听器执行失败', {
          eventName,
          error,
});,
}
    }

    // 移除一次性监听器
    for (const subscriptionId of listenersToRemove) { this.off(eventName, subscriptionId);,
}

    return true;,
}

  /**
  * 同步发射事件
  *
  * @param eventName - 事件名称
  * @param data - 事件数据
  * @returns 是否有监听器处理了事件
   */
  emitSync<T = any>(eventName: string, data?: T): boolean { const eventListeners = this.listeners.get(eventName);
    if (!eventListeners || eventListeners.length === 0) {
      return false;,
}

    const listenersToRemove: string[] = [];

    for (const subscription of eventListeners) { try {
        subscription.listener(data);

        if (subscription.once) {
          listenersToRemove.push(subscription.id);,
}
      } catch (error) { logger.error('同步事件监听器执行失败', {
          eventName,
          subscriptionId: subscription.id,
          error,
});,
}
    }

    // 移除一次性监听器
    for (const subscriptionId of listenersToRemove) { this.off(eventName, subscriptionId);,
}

    return true;,
}

  /**
  * 获取事件的监听器数量
  *
  * @param eventName - 事件名称
  * @returns 监听器数量
   */
  listenerCount(eventName: string): number { const eventListeners = this.listeners.get(eventName);
    return eventListeners ? eventListeners.length : 0;,
}

  /**
  * 获取所有事件名称
  *
  * @returns 事件名称数组
   */
  eventNames(): string[] { return Array.from(this.listeners.keys());,
}

  /**
  * 获取事件的所有监听器
  *
  * @param eventName - 事件名称
  * @returns 监听器数组
   */
  listeners(eventName: string): EventListener[] { const eventListeners = this.listeners.get(eventName);
    return eventListeners ? eventListeners.map(sub => sub.listener) : [];,
}

  /**
  * 移除所有监听器
   */
  removeAllListeners(): void { const eventNames = this.eventNames();
    this.listeners.clear();

    logger.info('所有事件监听器已清除', {
      clearedEvents: eventNames,
});,
}

  /**
  * 获取监听器统计信息
  *
  * @returns 统计信息
   */
  getStats(): { totalEvents: number;
    totalListeners: number;
    eventDetails: Array<{
      eventName: string;
      listenerCount: number;
      oldestSubscription?: Date;
      newestSubscription?: Date;,
}>;,
} { const eventDetails = this.eventNames().map(eventName => {
      const eventListeners = this.listeners.get(eventName)!;
      const subscriptionDates = eventListeners.map(sub => sub.subscribedAt);

      return {
        eventName,
        listenerCount: eventListeners.length,
        oldestSubscription: subscriptionDates.length > 0
        ? new Date(Math.min(...subscriptionDates.map(d => d.getTime())));
        : undefined,
        newestSubscription: subscriptionDates.length > 0
        ? new Date(Math.max(...subscriptionDates.map(d => d.getTime())));
        : undefined,
};,
});

    return { totalEvents: this.listeners.size,
      totalListeners: eventDetails.reduce((sum, detail) => sum + detail.listenerCount, 0),
      eventDetails,
};,
}
}

/**
* 全局事件发射器实例
 */
export const globalEventEmitter = new EventEmitter();

/**
* 事件名称常量
* 定义系统中使用的标准事件名称
 */
export const EventNames = { // 游戏相关事件
  GAME_STARTED: 'game:started',
  GAME_ENDED: 'game:ended',
  GAME_PHASE_CHANGED: 'game:phase-changed',
  GAME_STATE_UPDATED: 'game:state-updated',

  // 技能相关事件
  SKILL_USED: 'skill:used',
  SKILL_FAILED: 'skill:failed',
  SKILL_VALIDATED: 'skill:validated',
  SKILL_COOLDOWN_UPDATED: 'skill:cooldown-updated',

  // 用户相关事件
  USER_JOINED: 'user:joined',
  USER_LEFT: 'user:left',
  USER_STATUS_CHANGED: 'user:status-changed',
  USER_ROLE_ASSIGNED: 'user:role-assigned',

  // 错误相关事件
  ERROR_OCCURRED: 'error:occurred',
  ERROR_RECOVERED: 'error:recovered',

  // UI相关事件
  UI_NOTIFICATION: 'ui:notification',
  UI_MODAL_OPENED: 'ui:modal-opened',
  UI_MODAL_CLOSED: 'ui:modal-closed',

  // 网络相关事件
  NETWORK_CONNECTED: 'network:connected',
  NETWORK_DISCONNECTED: 'network:disconnected',
  NETWORK_ERROR: 'network:error',
} as const;

/**
* 类型安全的事件发射器
* 提供类型安全的事件订阅和发射
 */
export class TypedEventEmitter<TEventMap extends Record<string, any>> { private emitter = new EventEmitter();

  /**
  * 订阅事件
   */
  on<K extends keyof TEventMap>(
    eventName: K,
    listener: EventListener<TEventMap[K]>,
    options?: { once?: boolean; priority?: number  }
  ): () => void { return this.emitter.on(eventName as string, listener, options);,
}

  /**
  * 订阅事件（只执行一次）
   */
  once<K extends keyof TEventMap>(
    eventName: K,
    listener: EventListener<TEventMap[K]>,
    priority?: number
  ): () => void { return this.emitter.once(eventName as string, listener, priority);,
}

  /**
  * 取消订阅事件
   */
  off<K extends keyof TEventMap>(
    eventName: K,
    subscriptionId?: string
  ): void { this.emitter.off(eventName as string, subscriptionId);,
}

  /**
  * 发射事件
   */
  async emit<K extends keyof TEventMap>(
    eventName: K,
    data: TEventMap[K]
  ): Promise<boolean> { return this.emitter.emit(eventName as string, data);,
}

  /**
  * 同步发射事件
   */
  emitSync<K extends keyof TEventMap>(
    eventName: K,
    data: TEventMap[K]
  ): boolean { return this.emitter.emitSync(eventName as string, data);,
}

  /**
  * 获取监听器数量
   */
  listenerCount<K extends keyof TEventMap>(eventName: K): number { return this.emitter.listenerCount(eventName as string);,
}

  /**
  * 移除所有监听器
   */
  removeAllListeners(): void { this.emitter.removeAllListeners();,
}
}

/**
* React Hook：使用事件监听
*
* @param eventName - 事件名称
* @param listener - 监听器函数
* @param deps - 依赖数组
* @param options - 订阅选项
 */
export function useEventListener<T = any>(;
  eventName: string,
  listener: EventListener<T>,
  deps: React.DependencyList = [],
  options: { once?: boolean; priority?: number  } = {}
): void { React.useEffect(() => {
    const unsubscribe = globalEventEmitter.on(eventName, listener, options);
    return unsubscribe;,
}, deps);,
}

/**
* React Hook：发射事件
*
* @returns 发射事件函数
 */
export function useEventEmitter(): { emit: <T = any>(eventName: string, data?: T) => Promise<boolean>;
  emitSync: <T = any>(eventName: string, data?: T) => boolean;,
} { const emit = React.useCallback(;
    async <T = any>(eventName: string, data?: T) => {
      return globalEventEmitter.emit(eventName, data);,
},
    []
  );

  const emitSync = React.useCallback(;
    <T = any>(eventName: string, data?: T) => { return globalEventEmitter.emitSync(eventName, data);,
},
    []
  );

  return { emit, emitSync  };,
}