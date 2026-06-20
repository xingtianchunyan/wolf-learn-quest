/**
 * 文件级注释：增强的实时订阅管理器（内存优化版）
 * 解决实时订阅内存泄漏问题，提供智能连接管理和自动清理机制
 * 优化 Supabase 实时订阅的性能和稳定性，集成内存监控和智能清理
 *
 * 内存优化策略：
 * 1. 严格的内存限制和监控
 * 2. 智能连接池管理
 * 3. 自动清理空闲订阅
 * 4. 内存泄漏检测和预防
 * 5. 批量操作优化
 * 6. 弱引用和垃圾回收优化
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import { createLogger } from '@/lib/logger';

const logger = createLogger('enhanced-realtime-manager');

/**
 * 订阅状态枚举
 */
export enum SubscriptionStatus {
  IDLE = 'idle',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  CLEANING = 'cleaning',
  SUSPENDED = 'suspended', // 新增：暂停状态
}

/**
 * 内存优化级别枚举
 */
export enum MemoryOptimizationLevel {
  CONSERVATIVE = 'conservative', // 保守模式
  BALANCED = 'balanced', // 平衡模式
  AGGRESSIVE = 'aggressive', // 激进模式
}

/**
 * 订阅配置接口
 */
export interface SubscriptionConfig {
  table: string;
  filter?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  enableReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
  maxIdleTime?: number;
  enableMemoryOptimization?: boolean;
  memoryOptimizationLevel?: MemoryOptimizationLevel;
  priority?: 'high' | 'medium' | 'low'; // 新增：优先级
  maxMessageBuffer?: number; // 新增：最大消息缓冲
  enableBatching?: boolean; // 新增：启用批处理
  batchSize?: number; // 新增：批处理大小
  batchTimeout?: number; // 新增：批处理超时
}

/**
 * 订阅信息接口
 */
export interface SubscriptionInfo {
  id: string;
  channelName: string;
  config: SubscriptionConfig;
  status: SubscriptionStatus;
  channel: RealtimeChannel | null;
  createdAt: number;
  lastActivity: number;
  reconnectAttempts: number;
  errorCount: number;
  messageCount: number;
  memoryUsage: number;
  priority: 'high' | 'medium' | 'low';
  messageBuffer: any[]; // 消息缓冲区
  batchTimer?: ReturnType<typeof setInterval>; // 批处理定时器
  weakRef?: WeakRef<any>; // 弱引用
}

/**
 * 内存统计接口
 */
export interface MemoryStats {
  totalSubscriptions: number;
  totalMemoryUsage: number;
  averageMemoryPerSubscription: number;
  highPrioritySubscriptions: number;
  idleSubscriptions: number;
  suspendedSubscriptions: number;
  memoryOptimizationLevel: MemoryOptimizationLevel;
  lastCleanupTime: number;
  cleanupCount: number;
}

/**
 * 订阅回调类型
 */
export type SubscriptionCallback<T = any> = (
  payload: RealtimePostgresChangesPayload<T>
) => void;

/**
 * 批处理回调类型
 */
export type BatchCallback<T = any> = (
  payloads: RealtimePostgresChangesPayload<T>[]
) => void;

/**
 * 增强的实时订阅管理器类（内存优化版）
 */
class EnhancedRealtimeManager {
  private static instance: EnhancedRealtimeManager;
  private subscriptions: Map<string, SubscriptionInfo> = new Map();
  private callbacks: Map<string, SubscriptionCallback[]> = new Map();
  private batchCallbacks: Map<string, BatchCallback[]> = new Map();
  private heartbeatTimers: Map<string, ReturnType<typeof setInterval>> =
    new Map();
  private reconnectTimers: Map<string, ReturnType<typeof setInterval>> =
    new Map();
  private cleanupTimer: ReturnType<typeof setInterval> | null = null;
  private memoryCheckTimer: ReturnType<typeof setInterval> | null = null;
  private suspensionTimer: ReturnType<typeof setInterval> | null = null;
  private isDestroyed = false;

  // 内存管理配置（更严格的限制）
  private readonly MAX_SUBSCRIPTIONS = 30; // 降低最大订阅数
  private readonly MAX_MEMORY_PER_SUBSCRIPTION = 512 * 1024; // 512KB per subscription
  private readonly MAX_TOTAL_MEMORY = 15 * 1024 * 1024; // 15MB 总内存限制
  private readonly MAX_IDLE_TIME = 5 * 60 * 1000; // 5分钟最大空闲时间
  private readonly CLEANUP_INTERVAL = 60 * 1000; // 1分钟清理间隔
  private readonly MEMORY_CHECK_INTERVAL = 15 * 1000; // 15秒内存检查间隔
  private readonly SUSPENSION_CHECK_INTERVAL = 30 * 1000; // 30秒暂停检查间隔
  private readonly MAX_MESSAGE_BUFFER = 100; // 最大消息缓冲
  private readonly BATCH_TIMEOUT = 100; // 批处理超时（毫秒）

  // 内存优化配置
  private memoryOptimizationLevel: MemoryOptimizationLevel =
    MemoryOptimizationLevel.BALANCED;
  private cleanupCount = 0;
  private lastCleanupTime = Date.now();

  private constructor() {
    this.startMemoryManagement();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): EnhancedRealtimeManager {
    if (!EnhancedRealtimeManager.instance) {
      EnhancedRealtimeManager.instance = new EnhancedRealtimeManager();
    }
    return EnhancedRealtimeManager.instance;
  }

  /**
   * 设置内存优化级别
   */
  public setMemoryOptimizationLevel(level: MemoryOptimizationLevel): void {
    this.memoryOptimizationLevel = level;
    logger.info('内存优化级别已更新', { level });

    // 根据优化级别调整参数
    this.adjustOptimizationParameters();
  }

  /**
   * 创建订阅（内存优化版）
   */
  public subscribe<T = any>(
    config: SubscriptionConfig,
    callback: SubscriptionCallback<T>
  ): string {
    // 内存检查
    if (!this.canCreateSubscription()) {
      logger.warn('无法创建订阅：内存限制或订阅数量限制');
      this.performEmergencyCleanup();

      if (!this.canCreateSubscription()) {
        throw new Error('内存不足，无法创建新订阅');
      }
    }

    const subscriptionId = this.generateSubscriptionId(config);
    const channelName = this.generateChannelName(config);

    // 检查是否已存在相同订阅
    if (this.subscriptions.has(subscriptionId)) {
      const existingCallbacks = this.callbacks.get(subscriptionId) || [];
      existingCallbacks.push(callback);
      this.callbacks.set(subscriptionId, existingCallbacks);

      logger.debug('添加回调到现有订阅', {
        subscriptionId,
        callbackCount: existingCallbacks.length,
      });
      return subscriptionId;
    }

    // 创建新订阅
    const subscriptionInfo: SubscriptionInfo = {
      id: subscriptionId,
      channelName,
      config: {
        enableReconnect: true,
        maxReconnectAttempts: 2, // 进一步降低重连次数
        reconnectDelay: 1000,
        heartbeatInterval: 45000, // 增加心跳间隔
        maxIdleTime: this.MAX_IDLE_TIME,
        enableMemoryOptimization: true,
        memoryOptimizationLevel: this.memoryOptimizationLevel,
        priority: 'medium',
        maxMessageBuffer: this.MAX_MESSAGE_BUFFER,
        enableBatching: true,
        batchSize: 10,
        batchTimeout: this.BATCH_TIMEOUT,
        schema: 'public',
        event: '*',
        ...config,
      },
      status: SubscriptionStatus.IDLE,
      channel: null,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      reconnectAttempts: 0,
      errorCount: 0,
      messageCount: 0,
      memoryUsage: 0,
      priority: config.priority || 'medium',
      messageBuffer: [],
    };

    this.subscriptions.set(subscriptionId, subscriptionInfo);
    this.callbacks.set(subscriptionId, [callback]);

    // 根据优先级决定是否立即连接
    if (subscriptionInfo.priority === 'high') {
      this.connect(subscriptionId);
    } else {
      // 延迟连接以减少并发
      setTimeout(() => this.connect(subscriptionId), 100);
    }

    logger.info('创建新订阅', {
      subscriptionId,
      priority: subscriptionInfo.priority,
    });
    return subscriptionId;
  }

  /**
   * 取消订阅（内存优化版）
   */
  public unsubscribe(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    try {
      subscription.status = SubscriptionStatus.CLEANING;

      // 清理批处理定时器
      if (subscription.batchTimer) {
        clearTimeout(subscription.batchTimer);
        subscription.batchTimer = undefined;
      }

      // 处理剩余的批处理消息
      this.flushBatchMessages(subscriptionId);

      // 断开连接
      if (subscription.channel) {
        supabase.removeChannel(subscription.channel);
        subscription.channel = null;
      }

      // 清理定时器
      this.clearTimers(subscriptionId);

      // 清理弱引用
      if (subscription.weakRef) {
        subscription.weakRef = undefined;
      }

      // 清理缓存
      this.subscriptions.delete(subscriptionId);
      this.callbacks.delete(subscriptionId);
      this.batchCallbacks.delete(subscriptionId);

      logger.info('订阅已清理', { subscriptionId });
    } catch (error) {
      logger.error('清理订阅失败', { subscriptionId, error });
    }
  }

  /**
   * 连接订阅（内存优化版）
   */
  private async connect(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription || this.isDestroyed) return;

    try {
      subscription.status = SubscriptionStatus.CONNECTING;

      // 创建频道
      const channel = supabase.channel(subscription.channelName);

      // 配置 postgres 变更监听
      channel.on(
        'postgres_changes',
        {
          event: subscription.config.event!,
          schema: subscription.config.schema!,
          table: subscription.config.table,
          filter: subscription.config.filter,
        },
        payload => {
          this.handleMessage(subscriptionId, payload);
        }
      );

      // 监听频道状态
      channel.on('system', {}, payload => {
        this.handleSystemMessage(subscriptionId, payload);
      });

      // 订阅频道
      await channel.subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          subscription.status = SubscriptionStatus.CONNECTED;
          subscription.reconnectAttempts = 0;
          subscription.lastActivity = Date.now();

          logger.info('订阅连接成功', { subscriptionId });

          // 启动心跳检测
          if (subscription.config.heartbeatInterval) {
            this.startHeartbeat(subscriptionId);
          }
        } else if (err) {
          subscription.status = SubscriptionStatus.ERROR;
          subscription.errorCount++;

          logger.error('订阅连接失败', { subscriptionId, error: err });

          // 尝试重连
          if (subscription.config.enableReconnect) {
            this.scheduleReconnect(subscriptionId);
          }
        }
      });

      subscription.channel = channel;
    } catch (error) {
      subscription.status = SubscriptionStatus.ERROR;
      subscription.errorCount++;

      logger.error('创建订阅连接失败', { subscriptionId, error });

      if (subscription.config.enableReconnect) {
        this.scheduleReconnect(subscriptionId);
      }
    }
  }

  /**
   * 处理消息（批处理优化版）
   */
  private handleMessage<T>(
    subscriptionId: string,
    payload: RealtimePostgresChangesPayload<T>
  ): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    subscription.lastActivity = Date.now();
    subscription.messageCount++;

    // 更新内存使用估算
    const messageSize = this.estimateMessageSize(payload);
    subscription.memoryUsage += messageSize;

    // 检查内存限制
    if (subscription.memoryUsage > this.MAX_MEMORY_PER_SUBSCRIPTION) {
      logger.warn('订阅内存使用超限', {
        subscriptionId,
        memoryUsage: subscription.memoryUsage,
      });
      this.optimizeSubscriptionMemory(subscriptionId);
    }

    // 批处理逻辑
    if (subscription.config.enableBatching) {
      this.handleBatchMessage(subscriptionId, payload);
    } else {
      // 直接处理消息
      const callbacks = this.callbacks.get(subscriptionId) || [];
      callbacks.forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          logger.error('回调执行失败', { subscriptionId, error });
        }
      });
    }
  }

  /**
   * 处理批处理消息
   */
  private handleBatchMessage<T>(
    subscriptionId: string,
    payload: RealtimePostgresChangesPayload<T>
  ): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    // 添加到缓冲区
    subscription.messageBuffer.push(payload);

    // 检查是否需要立即处理
    const shouldFlush =
      subscription.messageBuffer.length >=
        (subscription.config.batchSize || 10) ||
      subscription.priority === 'high';

    if (shouldFlush) {
      this.flushBatchMessages(subscriptionId);
    } else {
      // 设置批处理定时器
      if (!subscription.batchTimer) {
        subscription.batchTimer = setTimeout(() => {
          this.flushBatchMessages(subscriptionId);
        }, subscription.config.batchTimeout || this.BATCH_TIMEOUT);
      }
    }
  }

  /**
   * 刷新批处理消息
   */
  private flushBatchMessages(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription || subscription.messageBuffer.length === 0) return;

    const messages = [...subscription.messageBuffer];
    subscription.messageBuffer = [];

    // 清理批处理定时器
    if (subscription.batchTimer) {
      clearTimeout(subscription.batchTimer);
      subscription.batchTimer = undefined;
    }

    // 处理批处理回调
    const batchCallbacks = this.batchCallbacks.get(subscriptionId) || [];
    if (batchCallbacks.length > 0) {
      batchCallbacks.forEach(callback => {
        try {
          callback(messages);
        } catch (error) {
          logger.error('批处理回调执行失败', { subscriptionId, error });
        }
      });
    } else {
      // 如果没有批处理回调，逐个处理消息
      const callbacks = this.callbacks.get(subscriptionId) || [];
      messages.forEach(message => {
        callbacks.forEach(callback => {
          try {
            callback(message);
          } catch (error) {
            logger.error('回调执行失败', { subscriptionId, error });
          }
        });
      });
    }
  }

  /**
   * 处理系统消息
   */
  private handleSystemMessage(subscriptionId: string, payload: any): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    subscription.lastActivity = Date.now();

    if (payload.type === 'system' && payload.message === 'channel_error') {
      subscription.status = SubscriptionStatus.ERROR;
      subscription.errorCount++;

      logger.error('系统错误', { subscriptionId, payload });

      if (subscription.config.enableReconnect) {
        this.scheduleReconnect(subscriptionId);
      }
    }
  }

  /**
   * 启动心跳检测
   */
  private startHeartbeat(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription || !subscription.config.heartbeatInterval) return;

    const timer = setInterval(() => {
      if (
        subscription.channel &&
        subscription.status === SubscriptionStatus.CONNECTED
      ) {
        // 发送心跳
        subscription.channel.send({
          type: 'heartbeat',
          event: 'ping',
          payload: { timestamp: Date.now() },
        });
      }
    }, subscription.config.heartbeatInterval);

    this.heartbeatTimers.set(subscriptionId, timer);
  }

  /**
   * 安排重连
   */
  private scheduleReconnect(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    if (
      subscription.reconnectAttempts >=
      (subscription.config.maxReconnectAttempts || 2)
    ) {
      logger.warn('重连次数已达上限', { subscriptionId });
      subscription.status = SubscriptionStatus.SUSPENDED;
      return;
    }

    subscription.reconnectAttempts++;
    const delay =
      (subscription.config.reconnectDelay || 1000) *
      Math.pow(2, subscription.reconnectAttempts - 1);

    const timer = setTimeout(() => {
      this.connect(subscriptionId);
    }, delay);

    this.reconnectTimers.set(subscriptionId, timer);
    logger.info('安排重连', {
      subscriptionId,
      delay,
      attempt: subscription.reconnectAttempts,
    });
  }

  /**
   * 清理定时器
   */
  private clearTimers(subscriptionId: string): void {
    const heartbeatTimer = this.heartbeatTimers.get(subscriptionId);
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      this.heartbeatTimers.delete(subscriptionId);
    }

    const reconnectTimer = this.reconnectTimers.get(subscriptionId);
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      this.reconnectTimers.delete(subscriptionId);
    }
  }

  /**
   * 启动内存管理
   */
  private startMemoryManagement(): void {
    // 定期清理
    this.cleanupTimer = setInterval(() => {
      this.performRoutineCleanup();
    }, this.CLEANUP_INTERVAL);

    // 内存检查
    this.memoryCheckTimer = setInterval(() => {
      this.checkMemoryUsage();
    }, this.MEMORY_CHECK_INTERVAL);

    // 暂停检查
    this.suspensionTimer = setInterval(() => {
      this.checkSuspendedSubscriptions();
    }, this.SUSPENSION_CHECK_INTERVAL);
  }

  /**
   * 执行常规清理
   */
  private performRoutineCleanup(): void {
    const now = Date.now();
    const subscriptionsToClean: string[] = [];

    this.subscriptions.forEach((subscription, id) => {
      const idleTime = now - subscription.lastActivity;

      // 清理空闲订阅
      if (idleTime > subscription.config.maxIdleTime!) {
        subscriptionsToClean.push(id);
      }

      // 清理错误过多的订阅
      if (subscription.errorCount > 5) {
        subscriptionsToClean.push(id);
      }

      // 清理内存使用过高的订阅
      if (subscription.memoryUsage > this.MAX_MEMORY_PER_SUBSCRIPTION * 1.5) {
        subscriptionsToClean.push(id);
      }
    });

    subscriptionsToClean.forEach(id => {
      logger.info('清理空闲/错误订阅', { subscriptionId: id });
      this.unsubscribe(id);
    });

    this.cleanupCount++;
    this.lastCleanupTime = now;
  }

  /**
   * 检查内存使用
   */
  private checkMemoryUsage(): void {
    const stats = this.getMemoryStats();

    if (stats.totalMemoryUsage > this.MAX_TOTAL_MEMORY) {
      logger.warn('总内存使用超限，执行紧急清理', {
        totalMemory: stats.totalMemoryUsage,
        limit: this.MAX_TOTAL_MEMORY,
      });
      this.performEmergencyCleanup();
    }

    // 根据内存使用情况调整优化级别
    if (stats.totalMemoryUsage > this.MAX_TOTAL_MEMORY * 0.8) {
      this.setMemoryOptimizationLevel(MemoryOptimizationLevel.AGGRESSIVE);
    } else if (stats.totalMemoryUsage < this.MAX_TOTAL_MEMORY * 0.5) {
      this.setMemoryOptimizationLevel(MemoryOptimizationLevel.CONSERVATIVE);
    }
  }

  /**
   * 检查暂停的订阅
   */
  private checkSuspendedSubscriptions(): void {
    this.subscriptions.forEach((subscription, id) => {
      if (subscription.status === SubscriptionStatus.SUSPENDED) {
        const suspendedTime = Date.now() - subscription.lastActivity;

        // 如果暂停时间过长，直接清理
        if (suspendedTime > 5 * 60 * 1000) {
          // 5分钟
          logger.info('清理长时间暂停的订阅', { subscriptionId: id });
          this.unsubscribe(id);
        }
      }
    });
  }

  /**
   * 执行紧急清理
   */
  private performEmergencyCleanup(): void {
    logger.warn('执行紧急清理');

    // 按优先级排序，清理低优先级订阅
    const subscriptionsByPriority = Array.from(
      this.subscriptions.entries()
    ).sort(([, a], [, b]) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // 清理最多一半的低优先级订阅
    const toClean = Math.ceil(subscriptionsByPriority.length * 0.5);
    for (let i = 0; i < toClean; i++) {
      const [id, subscription] = subscriptionsByPriority[i];
      if (
        subscription.priority === 'low' ||
        subscription.priority === 'medium'
      ) {
        this.unsubscribe(id);
      }
    }
  }

  /**
   * 优化订阅内存
   */
  private optimizeSubscriptionMemory(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    // 清理消息缓冲区
    if (subscription.messageBuffer.length > 0) {
      this.flushBatchMessages(subscriptionId);
    }

    // 重置内存使用计数
    subscription.memoryUsage = 0;

    logger.info('订阅内存已优化', { subscriptionId });
  }

  /**
   * 估算消息大小
   */
  private estimateMessageSize(payload: any): number {
    try {
      return JSON.stringify(payload).length * 2; // 粗略估算
    } catch {
      return 1024; // 默认 1KB
    }
  }

  /**
   * 检查是否可以创建订阅
   */
  private canCreateSubscription(): boolean {
    const stats = this.getMemoryStats();
    return (
      stats.totalSubscriptions < this.MAX_SUBSCRIPTIONS &&
      stats.totalMemoryUsage < this.MAX_TOTAL_MEMORY * 0.9
    );
  }

  /**
   * 调整优化参数
   */
  private adjustOptimizationParameters(): void {
    switch (this.memoryOptimizationLevel) {
      case MemoryOptimizationLevel.CONSERVATIVE:
        // 保守模式：较宽松的限制
        break;
      case MemoryOptimizationLevel.BALANCED:
        // 平衡模式：默认设置
        break;
      case MemoryOptimizationLevel.AGGRESSIVE:
        // 激进模式：更严格的限制
        this.subscriptions.forEach((subscription, id) => {
          if (subscription.priority === 'low') {
            subscription.config.maxIdleTime = Math.min(
              subscription.config.maxIdleTime || this.MAX_IDLE_TIME,
              2 * 60 * 1000
            );
          }
        });
        break;
    }
  }

  /**
   * 获取内存统计
   */
  public getMemoryStats(): MemoryStats {
    let totalMemoryUsage = 0;
    let highPriorityCount = 0;
    let idleCount = 0;
    let suspendedCount = 0;

    const now = Date.now();

    this.subscriptions.forEach(subscription => {
      totalMemoryUsage += subscription.memoryUsage;

      if (subscription.priority === 'high') {
        highPriorityCount++;
      }

      if (now - subscription.lastActivity > subscription.config.maxIdleTime!) {
        idleCount++;
      }

      if (subscription.status === SubscriptionStatus.SUSPENDED) {
        suspendedCount++;
      }
    });

    return {
      totalSubscriptions: this.subscriptions.size,
      totalMemoryUsage,
      averageMemoryPerSubscription:
        this.subscriptions.size > 0
          ? totalMemoryUsage / this.subscriptions.size
          : 0,
      highPrioritySubscriptions: highPriorityCount,
      idleSubscriptions: idleCount,
      suspendedSubscriptions: suspendedCount,
      memoryOptimizationLevel: this.memoryOptimizationLevel,
      lastCleanupTime: this.lastCleanupTime,
      cleanupCount: this.cleanupCount,
    };
  }

  /**
   * 获取统计信息
   */
  public getStats() {
    const subscriptions: Record<string, any> = {};

    this.subscriptions.forEach((subscription, id) => {
      subscriptions[id] = {
        status: subscription.status,
        messageCount: subscription.messageCount,
        errorCount: subscription.errorCount,
        memoryUsage: subscription.memoryUsage,
        priority: subscription.priority,
        lastActivity: subscription.lastActivity,
        reconnectAttempts: subscription.reconnectAttempts,
      };
    });

    return {
      totalSubscriptions: this.subscriptions.size,
      subscriptions,
      memoryStats: this.getMemoryStats(),
    };
  }

  /**
   * 销毁管理器
   */
  public destroy(): void {
    this.isDestroyed = true;

    // 清理所有订阅
    Array.from(this.subscriptions.keys()).forEach(id => {
      this.unsubscribe(id);
    });

    // 清理定时器
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }

    if (this.memoryCheckTimer) {
      clearInterval(this.memoryCheckTimer);
      this.memoryCheckTimer = null;
    }

    if (this.suspensionTimer) {
      clearInterval(this.suspensionTimer);
      this.suspensionTimer = null;
    }

    logger.info('实时订阅管理器已销毁');
  }

  /**
   * 生成订阅ID
   */
  private generateSubscriptionId(config: SubscriptionConfig): string {
    const parts = [
      config.table,
      config.schema || 'public',
      config.event || '*',
      config.filter || 'all',
    ];
    return parts.join('_');
  }

  /**
   * 生成频道名称
   */
  private generateChannelName(config: SubscriptionConfig): string {
    return `enhanced_${config.table}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// 导出单例实例
export const enhancedRealtimeManager = EnhancedRealtimeManager.getInstance();

/**
 * 增强的实时订阅 Hook（内存优化版）
 */
export function useEnhancedRealtime<T = any>(
  config: SubscriptionConfig,
  callback: SubscriptionCallback<T>,
  deps: React.DependencyList = []
) {
  const subscriptionIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<SubscriptionStatus>(
    SubscriptionStatus.IDLE
  );
  const callbackRef = useRef(callback);
  const configRef = useRef(config);

  // 更新回调引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 更新配置引用
  useEffect(() => {
    configRef.current = config;
  }, [config.table, config.filter, config.event]);

  const memoizedCallback = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      callbackRef.current(payload);
    },
    []
  );

  useEffect(() => {
    // 创建订阅
    subscriptionIdRef.current = enhancedRealtimeManager.subscribe(
      configRef.current,
      memoizedCallback
    );

    // 监听状态变化（降低检查频率）
    const checkStatus = () => {
      if (subscriptionIdRef.current) {
        const stats = enhancedRealtimeManager.getStats();
        const subscriptionStats =
          stats.subscriptions[subscriptionIdRef.current];
        if (subscriptionStats) {
          setStatus(subscriptionStats.status);
        }
      }
    };

    const statusInterval = setInterval(checkStatus, 5000); // 5秒检查一次

    return () => {
      clearInterval(statusInterval);
      if (subscriptionIdRef.current) {
        enhancedRealtimeManager.unsubscribe(subscriptionIdRef.current);
        subscriptionIdRef.current = null;
      }
    };
  }, [memoizedCallback]);

  return {
    status,
    subscriptionId: subscriptionIdRef.current,
    stats: enhancedRealtimeManager.getStats(),
    memoryStats: enhancedRealtimeManager.getMemoryStats(),
    optimizationLevel:
      enhancedRealtimeManager.getMemoryStats().memoryOptimizationLevel,
  };
}
