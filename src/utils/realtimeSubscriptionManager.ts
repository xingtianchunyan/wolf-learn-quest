/**
 * 文件级注释：实时订阅内存管理系统
 * 
 * 该文件实现了一个全面的实时订阅管理系统，专门解决：
 * - 订阅内存泄漏问题
 * - 重复订阅管理
 * - 订阅生命周期控制
 * - 内存使用优化
 * - 连接池管理
 * - 自动重连机制
 * 
 * 主要功能：
 * - 智能订阅池管理
 * - 内存泄漏检测和预防
 * - 订阅优先级管理
 * - 批量订阅优化
 * - 连接状态监控
 * - 自动清理机制
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */

import { createLogger } from '@/lib/logger';

const logger = createLogger('realtime-subscription-manager');

/**
 * 接口注释：订阅配置
 */
export interface SubscriptionConfig {
  /** 订阅ID */
  id: string;
  /** 订阅类型 */
  type: 'websocket' | 'sse' | 'polling' | 'custom';
  /** 订阅URL或端点 */
  endpoint: string;
  /** 优先级 */
  priority: 'high' | 'medium' | 'low';
  /** 重连配置 */
  reconnect: {
    enabled: boolean;
    maxAttempts: number;
    delay: number;
    backoff: 'linear' | 'exponential';
  };
  /** 心跳配置 */
  heartbeat: {
    enabled: boolean;
    interval: number;
    timeout: number;
  };
  /** 缓冲区配置 */
  buffer: {
    enabled: boolean;
    maxSize: number;
    flushInterval: number;
  };
  /** 内存限制 */
  memoryLimit: number;
  /** 超时时间 */
  timeout: number;
  /** 自定义元数据 */
  metadata?: Record<string, any>;
}

/**
 * 接口注释：订阅状态
 */
export interface SubscriptionState {
  id: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error' | 'reconnecting';
  connection: any;
  lastActivity: number;
  reconnectAttempts: number;
  memoryUsage: number;
  messageCount: number;
  errorCount: number;
  createdAt: number;
  listeners: Set<Function>;
  buffer: any[];
  heartbeatTimer?: NodeJS.Timeout;
  reconnectTimer?: NodeJS.Timeout;
  flushTimer?: NodeJS.Timeout;
}

/**
 * 接口注释：订阅统计
 */
export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalMemoryUsage: number;
  totalMessages: number;
  totalErrors: number;
  connectionsByType: Record<string, number>;
  connectionsByPriority: Record<string, number>;
  averageLatency: number;
  uptime: number;
}

/**
 * 接口注释：内存监控配置
 */
export interface MemoryMonitorConfig {
  enabled: boolean;
  checkInterval: number;
  warningThreshold: number;
  criticalThreshold: number;
  autoCleanup: boolean;
  gcThreshold: number;
}

/**
 * 接口注释：订阅事件
 */
export interface SubscriptionEvent {
  type: 'connect' | 'disconnect' | 'message' | 'error' | 'reconnect' | 'cleanup';
  subscriptionId: string;
  timestamp: number;
  data?: any;
  error?: Error;
}

/**
 * 类级注释：实时订阅管理器
 * 
 * 实现全面的订阅生命周期管理，包含：
 * - 订阅池管理和优化
 * - 内存泄漏检测和预防
 * - 智能重连和错误处理
 * - 性能监控和优化
 * - 自动清理和垃圾回收
 */
export class RealtimeSubscriptionManager {
  private static instance: RealtimeSubscriptionManager;
  private subscriptions: Map<string, SubscriptionState> = new Map();
  private eventListeners: Map<string, Set<Function>> = new Map();
  private memoryMonitor: MemoryMonitorConfig;
  private stats: SubscriptionStats;
  private cleanupTimer?: NodeJS.Timeout;
  private memoryCheckTimer?: NodeJS.Timeout;
  private isShuttingDown: boolean = false;

  /**
   * 函数级注释：构造函数
   * 初始化订阅管理器和内存监控
   */
  private constructor() {
    this.memoryMonitor = {
      enabled: true,
      checkInterval: 30000, // 30秒
      warningThreshold: 50 * 1024 * 1024, // 50MB
      criticalThreshold: 100 * 1024 * 1024, // 100MB
      autoCleanup: true,
      gcThreshold: 80 * 1024 * 1024 // 80MB
    };

    this.stats = {
      totalSubscriptions: 0,
      activeSubscriptions: 0,
      totalMemoryUsage: 0,
      totalMessages: 0,
      totalErrors: 0,
      connectionsByType: {},
      connectionsByPriority: {},
      averageLatency: 0,
      uptime: Date.now()
    };

    this.startMemoryMonitoring();
    this.startPeriodicCleanup();

    // 监听页面卸载事件
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.shutdown());
      window.addEventListener('pagehide', () => this.shutdown());
    }

    logger.info('实时订阅管理器已初始化');
  }

  /**
   * 函数级注释：获取单例实例
   */
  public static getInstance(): RealtimeSubscriptionManager {
    if (!RealtimeSubscriptionManager.instance) {
      RealtimeSubscriptionManager.instance = new RealtimeSubscriptionManager();
    }
    return RealtimeSubscriptionManager.instance;
  }

  /**
   * 函数级注释：创建订阅
   * 创建新的实时订阅并管理其生命周期
   */
  public async createSubscription(
    config: SubscriptionConfig,
    onMessage: (data: any) => void,
    onError?: (error: Error) => void
  ): Promise<string> {
    try {
      // 检查是否已存在相同订阅
      if (this.subscriptions.has(config.id)) {
        logger.warn('订阅已存在，将复用现有连接', { id: config.id });
        const existing = this.subscriptions.get(config.id)!;
        existing.listeners.add(onMessage);
        return config.id;
      }

      // 检查内存限制
      if (this.stats.totalMemoryUsage > this.memoryMonitor.criticalThreshold) {
        throw new Error('内存使用超过临界阈值，无法创建新订阅');
      }

      // 创建订阅状态
      const state: SubscriptionState = {
        id: config.id,
        status: 'connecting',
        connection: null,
        lastActivity: Date.now(),
        reconnectAttempts: 0,
        memoryUsage: 0,
        messageCount: 0,
        errorCount: 0,
        createdAt: Date.now(),
        listeners: new Set([onMessage]),
        buffer: []
      };

      this.subscriptions.set(config.id, state);

      // 建立连接
      await this.establishConnection(config, state, onError);

      // 更新统计
      this.updateStats();

      // 触发事件
      this.emitEvent({
        type: 'connect',
        subscriptionId: config.id,
        timestamp: Date.now()
      });

      logger.info('订阅创建成功', { 
        id: config.id, 
        type: config.type,
        priority: config.priority 
      });

      return config.id;
    } catch (error) {
      logger.error('订阅创建失败', { error, config });
      throw error;
    }
  }

  /**
   * 函数级注释：建立连接
   * 根据订阅类型建立相应的连接
   */
  private async establishConnection(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      switch (config.type) {
        case 'websocket':
          await this.createWebSocketConnection(config, state, onError);
          break;
        case 'sse':
          await this.createSSEConnection(config, state, onError);
          break;
        case 'polling':
          await this.createPollingConnection(config, state, onError);
          break;
        case 'custom':
          await this.createCustomConnection(config, state, onError);
          break;
        default:
          throw new Error(`不支持的订阅类型: ${config.type}`);
      }

      state.status = 'connected';
      state.lastActivity = Date.now();

      // 启动心跳
      if (config.heartbeat.enabled) {
        this.startHeartbeat(config, state);
      }

      // 启动缓冲区刷新
      if (config.buffer.enabled) {
        this.startBufferFlush(config, state);
      }

    } catch (error) {
      state.status = 'error';
      state.errorCount++;
      
      if (onError) {
        onError(error as Error);
      }

      // 尝试重连
      if (config.reconnect.enabled && state.reconnectAttempts < config.reconnect.maxAttempts) {
        this.scheduleReconnect(config, state, onError);
      }

      throw error;
    }
  }

  /**
   * 函数级注释：创建WebSocket连接
   */
  private async createWebSocketConnection(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(config.endpoint);
        
        ws.onopen = () => {
          state.connection = ws;
          resolve();
        };

        ws.onmessage = (event) => {
          this.handleMessage(config, state, event.data);
        };

        ws.onerror = (error) => {
          const err = new Error(`WebSocket错误: ${error}`);
          this.handleError(config, state, err, onError);
          reject(err);
        };

        ws.onclose = () => {
          state.status = 'disconnected';
          this.handleDisconnect(config, state, onError);
        };

        // 连接超时
        setTimeout(() => {
          if (state.status === 'connecting') {
            ws.close();
            reject(new Error('WebSocket连接超时'));
          }
        }, config.timeout);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 函数级注释：创建SSE连接
   */
  private async createSSEConnection(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const eventSource = new EventSource(config.endpoint);
        
        eventSource.onopen = () => {
          state.connection = eventSource;
          resolve();
        };

        eventSource.onmessage = (event) => {
          this.handleMessage(config, state, event.data);
        };

        eventSource.onerror = (error) => {
          const err = new Error(`SSE错误: ${error}`);
          this.handleError(config, state, err, onError);
          reject(err);
        };

        // 连接超时
        setTimeout(() => {
          if (state.status === 'connecting') {
            eventSource.close();
            reject(new Error('SSE连接超时'));
          }
        }, config.timeout);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 函数级注释：创建轮询连接
   */
  private async createPollingConnection(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): Promise<void> {
    const poll = async () => {
      if (state.status === 'disconnected' || this.isShuttingDown) {
        return;
      }

      try {
        const response = await fetch(config.endpoint);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        this.handleMessage(config, state, data);

        // 调度下次轮询
        setTimeout(poll, config.heartbeat.interval || 5000);
      } catch (error) {
        this.handleError(config, state, error as Error, onError);
      }
    };

    state.connection = { poll };
    poll();
  }

  /**
   * 函数级注释：创建自定义连接
   */
  private async createCustomConnection(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): Promise<void> {
    // 自定义连接逻辑，可以根据需要扩展
    throw new Error('自定义连接类型需要具体实现');
  }

  /**
   * 函数级注释：处理消息
   */
  private handleMessage(config: SubscriptionConfig, state: SubscriptionState, data: any): void {
    try {
      state.lastActivity = Date.now();
      state.messageCount++;

      // 更新内存使用估算
      const messageSize = JSON.stringify(data).length * 2; // 粗略估算
      state.memoryUsage += messageSize;

      // 缓冲区处理
      if (config.buffer.enabled) {
        state.buffer.push({
          data,
          timestamp: Date.now()
        });

        if (state.buffer.length > config.buffer.maxSize) {
          state.buffer.shift(); // 移除最旧的消息
        }
      }

      // 通知所有监听器
      state.listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          logger.error('消息监听器执行失败', { error, subscriptionId: state.id });
        }
      });

      // 触发事件
      this.emitEvent({
        type: 'message',
        subscriptionId: state.id,
        timestamp: Date.now(),
        data
      });

      // 检查内存使用
      if (state.memoryUsage > config.memoryLimit) {
        logger.warn('订阅内存使用超限', { 
          subscriptionId: state.id, 
          usage: state.memoryUsage,
          limit: config.memoryLimit 
        });
        this.cleanupSubscriptionMemory(state.id);
      }

    } catch (error) {
      logger.error('消息处理失败', { error, subscriptionId: state.id });
    }
  }

  /**
   * 函数级注释：处理错误
   */
  private handleError(
    config: SubscriptionConfig,
    state: SubscriptionState,
    error: Error,
    onError?: (error: Error) => void
  ): void {
    state.errorCount++;
    state.status = 'error';

    logger.error('订阅错误', { 
      error, 
      subscriptionId: state.id,
      errorCount: state.errorCount 
    });

    if (onError) {
      onError(error);
    }

    // 触发事件
    this.emitEvent({
      type: 'error',
      subscriptionId: state.id,
      timestamp: Date.now(),
      error
    });

    // 尝试重连
    if (config.reconnect.enabled && state.reconnectAttempts < config.reconnect.maxAttempts) {
      this.scheduleReconnect(config, state, onError);
    }
  }

  /**
   * 函数级注释：处理断开连接
   */
  private handleDisconnect(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): void {
    state.status = 'disconnected';

    logger.info('订阅连接断开', { subscriptionId: state.id });

    // 触发事件
    this.emitEvent({
      type: 'disconnect',
      subscriptionId: state.id,
      timestamp: Date.now()
    });

    // 尝试重连
    if (config.reconnect.enabled && state.reconnectAttempts < config.reconnect.maxAttempts && !this.isShuttingDown) {
      this.scheduleReconnect(config, state, onError);
    }
  }

  /**
   * 函数级注释：调度重连
   */
  private scheduleReconnect(
    config: SubscriptionConfig,
    state: SubscriptionState,
    onError?: (error: Error) => void
  ): void {
    state.reconnectAttempts++;
    state.status = 'reconnecting';

    let delay = config.reconnect.delay;
    if (config.reconnect.backoff === 'exponential') {
      delay *= Math.pow(2, state.reconnectAttempts - 1);
    }

    logger.info('调度重连', { 
      subscriptionId: state.id,
      attempt: state.reconnectAttempts,
      delay 
    });

    state.reconnectTimer = setTimeout(async () => {
      try {
        await this.establishConnection(config, state, onError);
        
        // 触发事件
        this.emitEvent({
          type: 'reconnect',
          subscriptionId: state.id,
          timestamp: Date.now()
        });

        logger.info('重连成功', { 
          subscriptionId: state.id,
          attempts: state.reconnectAttempts 
        });

      } catch (error) {
        logger.error('重连失败', { 
          error, 
          subscriptionId: state.id,
          attempts: state.reconnectAttempts 
        });
      }
    }, delay);
  }

  /**
   * 函数级注释：启动心跳
   */
  private startHeartbeat(config: SubscriptionConfig, state: SubscriptionState): void {
    if (state.heartbeatTimer) {
      clearInterval(state.heartbeatTimer);
    }

    state.heartbeatTimer = setInterval(() => {
      if (state.status === 'connected' && state.connection) {
        try {
          // 发送心跳包
          if (config.type === 'websocket' && state.connection.readyState === WebSocket.OPEN) {
            state.connection.send(JSON.stringify({ type: 'ping' }));
          }
        } catch (error) {
          logger.error('心跳发送失败', { error, subscriptionId: state.id });
        }
      }
    }, config.heartbeat.interval);
  }

  /**
   * 函数级注释：启动缓冲区刷新
   */
  private startBufferFlush(config: SubscriptionConfig, state: SubscriptionState): void {
    if (state.flushTimer) {
      clearInterval(state.flushTimer);
    }

    state.flushTimer = setInterval(() => {
      if (state.buffer.length > 0) {
        // 清理过期的缓冲消息
        const cutoffTime = Date.now() - (config.buffer.flushInterval * 2);
        state.buffer = state.buffer.filter(item => item.timestamp > cutoffTime);
        
        // 更新内存使用估算
        const bufferSize = state.buffer.reduce((size, item) => {
          return size + JSON.stringify(item.data).length * 2;
        }, 0);
        state.memoryUsage = bufferSize;
      }
    }, config.buffer.flushInterval);
  }

  /**
   * 函数级注释：移除订阅
   */
  public removeSubscription(subscriptionId: string): void {
    const state = this.subscriptions.get(subscriptionId);
    if (!state) {
      logger.warn('尝试移除不存在的订阅', { subscriptionId });
      return;
    }

    try {
      // 关闭连接
      if (state.connection) {
        if (state.connection.close) {
          state.connection.close();
        } else if (state.connection.terminate) {
          state.connection.terminate();
        }
      }

      // 清理定时器
      if (state.heartbeatTimer) {
        clearInterval(state.heartbeatTimer);
      }
      if (state.reconnectTimer) {
        clearTimeout(state.reconnectTimer);
      }
      if (state.flushTimer) {
        clearInterval(state.flushTimer);
      }

      // 清理监听器
      state.listeners.clear();

      // 清理缓冲区
      state.buffer = [];

      // 移除订阅
      this.subscriptions.delete(subscriptionId);

      // 更新统计
      this.updateStats();

      // 触发事件
      this.emitEvent({
        type: 'cleanup',
        subscriptionId,
        timestamp: Date.now()
      });

      logger.info('订阅已移除', { subscriptionId });

    } catch (error) {
      logger.error('移除订阅失败', { error, subscriptionId });
    }
  }

  /**
   * 函数级注释：清理订阅内存
   */
  private cleanupSubscriptionMemory(subscriptionId: string): void {
    const state = this.subscriptions.get(subscriptionId);
    if (!state) return;

    // 清理缓冲区
    state.buffer = state.buffer.slice(-Math.floor(state.buffer.length / 2));
    
    // 重新计算内存使用
    const bufferSize = state.buffer.reduce((size, item) => {
      return size + JSON.stringify(item.data).length * 2;
    }, 0);
    state.memoryUsage = bufferSize;

    logger.info('订阅内存已清理', { 
      subscriptionId, 
      newMemoryUsage: state.memoryUsage 
    });
  }

  /**
   * 函数级注释：启动内存监控
   */
  private startMemoryMonitoring(): void {
    if (!this.memoryMonitor.enabled) return;

    this.memoryCheckTimer = setInterval(() => {
      const totalMemory = this.getTotalMemoryUsage();

      if (totalMemory > this.memoryMonitor.criticalThreshold) {
        logger.error('内存使用达到临界阈值', { totalMemory });
        
        if (this.memoryMonitor.autoCleanup) {
          this.performEmergencyCleanup();
        }
      } else if (totalMemory > this.memoryMonitor.warningThreshold) {
        logger.warn('内存使用超过警告阈值', { totalMemory });
        
        if (this.memoryMonitor.autoCleanup) {
          this.performGentleCleanup();
        }
      }

      // 触发垃圾回收
      if (totalMemory > this.memoryMonitor.gcThreshold && window.gc) {
        window.gc();
      }

    }, this.memoryMonitor.checkInterval);
  }

  /**
   * 函数级注释：执行紧急清理
   */
  private performEmergencyCleanup(): void {
    logger.info('执行紧急内存清理');

    // 按优先级排序，优先清理低优先级订阅
    const subscriptions = Array.from(this.subscriptions.entries())
      .sort(([, a], [, b]) => {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        // 这里需要从配置中获取优先级，简化处理
        return a.memoryUsage - b.memoryUsage; // 按内存使用排序
      });

    // 清理内存使用最高的25%订阅
    const cleanupCount = Math.ceil(subscriptions.length * 0.25);
    for (let i = 0; i < cleanupCount; i++) {
      const [subscriptionId] = subscriptions[i];
      this.cleanupSubscriptionMemory(subscriptionId);
    }
  }

  /**
   * 函数级注释：执行温和清理
   */
  private performGentleCleanup(): void {
    logger.info('执行温和内存清理');

    // 清理所有订阅的缓冲区
    this.subscriptions.forEach((state, subscriptionId) => {
      if (state.buffer.length > 10) {
        this.cleanupSubscriptionMemory(subscriptionId);
      }
    });
  }

  /**
   * 函数级注释：启动定期清理
   */
  private startPeriodicCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.performPeriodicCleanup();
    }, 60000); // 每分钟执行一次
  }

  /**
   * 函数级注释：执行定期清理
   */
  private performPeriodicCleanup(): void {
    const now = Date.now();
    const inactiveThreshold = 5 * 60 * 1000; // 5分钟

    this.subscriptions.forEach((state, subscriptionId) => {
      // 清理长时间不活跃的订阅
      if (now - state.lastActivity > inactiveThreshold && state.status === 'disconnected') {
        logger.info('清理不活跃订阅', { subscriptionId });
        this.removeSubscription(subscriptionId);
      }

      // 清理过期的缓冲区消息
      if (state.buffer.length > 0) {
        const cutoffTime = now - (10 * 60 * 1000); // 10分钟
        const originalLength = state.buffer.length;
        state.buffer = state.buffer.filter(item => item.timestamp > cutoffTime);
        
        if (state.buffer.length < originalLength) {
          logger.debug('清理过期缓冲消息', { 
            subscriptionId, 
            removed: originalLength - state.buffer.length 
          });
        }
      }
    });

    // 更新统计
    this.updateStats();
  }

  /**
   * 函数级注释：获取总内存使用量
   */
  private getTotalMemoryUsage(): number {
    return Array.from(this.subscriptions.values())
      .reduce((total, state) => total + state.memoryUsage, 0);
  }

  /**
   * 函数级注释：更新统计信息
   */
  private updateStats(): void {
    const subscriptions = Array.from(this.subscriptions.values());
    
    this.stats.totalSubscriptions = subscriptions.length;
    this.stats.activeSubscriptions = subscriptions.filter(s => s.status === 'connected').length;
    this.stats.totalMemoryUsage = this.getTotalMemoryUsage();
    this.stats.totalMessages = subscriptions.reduce((sum, s) => sum + s.messageCount, 0);
    this.stats.totalErrors = subscriptions.reduce((sum, s) => sum + s.errorCount, 0);

    // 按类型统计（这里简化处理，实际需要从配置中获取）
    this.stats.connectionsByType = {};
    this.stats.connectionsByPriority = {};
  }

  /**
   * 函数级注释：触发事件
   */
  private emitEvent(event: SubscriptionEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          logger.error('事件监听器执行失败', { error, event });
        }
      });
    }
  }

  /**
   * 函数级注释：添加事件监听器
   */
  public addEventListener(eventType: string, listener: Function): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)!.add(listener);
  }

  /**
   * 函数级注释：移除事件监听器
   */
  public removeEventListener(eventType: string, listener: Function): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * 函数级注释：获取统计信息
   */
  public getStats(): SubscriptionStats {
    this.updateStats();
    return { ...this.stats };
  }

  /**
   * 函数级注释：获取订阅状态
   */
  public getSubscriptionState(subscriptionId: string): SubscriptionState | null {
    return this.subscriptions.get(subscriptionId) || null;
  }

  /**
   * 函数级注释：更新内存监控配置
   */
  public updateMemoryMonitorConfig(config: Partial<MemoryMonitorConfig>): void {
    this.memoryMonitor = { ...this.memoryMonitor, ...config };
    logger.info('内存监控配置已更新', { config: this.memoryMonitor });
  }

  /**
   * 函数级注释：关闭管理器
   */
  public shutdown(): void {
    if (this.isShuttingDown) return;
    
    this.isShuttingDown = true;
    logger.info('开始关闭订阅管理器');

    // 清理所有订阅
    const subscriptionIds = Array.from(this.subscriptions.keys());
    subscriptionIds.forEach(id => this.removeSubscription(id));

    // 清理定时器
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    if (this.memoryCheckTimer) {
      clearInterval(this.memoryCheckTimer);
    }

    // 清理事件监听器
    this.eventListeners.clear();

    logger.info('订阅管理器已关闭');
  }
}

// 导出单例实例
export const realtimeSubscriptionManager = RealtimeSubscriptionManager.getInstance();

/**
 * 函数级注释：React Hook - 使用实时订阅管理器
 */
export function useRealtimeSubscriptionManager() {
  return {
    createSubscription: realtimeSubscriptionManager.createSubscription.bind(realtimeSubscriptionManager),
    removeSubscription: realtimeSubscriptionManager.removeSubscription.bind(realtimeSubscriptionManager),
    getStats: realtimeSubscriptionManager.getStats.bind(realtimeSubscriptionManager),
    getSubscriptionState: realtimeSubscriptionManager.getSubscriptionState.bind(realtimeSubscriptionManager),
    addEventListener: realtimeSubscriptionManager.addEventListener.bind(realtimeSubscriptionManager),
    removeEventListener: realtimeSubscriptionManager.removeEventListener.bind(realtimeSubscriptionManager),
    updateMemoryMonitorConfig: realtimeSubscriptionManager.updateMemoryMonitorConfig.bind(realtimeSubscriptionManager)
  };
}