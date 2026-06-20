/**
 * 文件级注释：内存管理优化系统
 * 提供内存监控、泄漏检测、自动清理和优化建议功能
 * 解决实时订阅内存泄漏和组件内存管理问题
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('memory-management');

/**
 * 内存使用信息接口
 */
export interface MemoryUsage {
  used: number;
  total: number;
  percentage: number;
  timestamp: number;
}

/**
 * 内存泄漏检测结果接口
 */
export interface MemoryLeakDetection {
  isLeaking: boolean;
  growthRate: number;
  suspiciousObjects: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * 订阅管理接口
 */
export interface SubscriptionInfo {
  id: string;
  type: string;
  component: string;
  createdAt: number;
  lastActivity: number;
  isActive: boolean;
  cleanup?: () => void;
}

/**
 * 组件内存信息接口
 */
export interface ComponentMemoryInfo {
  name: string;
  instances: number;
  memoryUsage: number;
  subscriptions: number;
  timers: number;
  eventListeners: number;
  lastUpdate: number;
}

/**
 * 内存优化配置接口
 */
export interface MemoryConfig {
  maxMemoryUsage: number;
  leakDetectionInterval: number;
  cleanupInterval: number;
  subscriptionTimeout: number;
  enableAutoCleanup: boolean;
  enableLeakDetection: boolean;
  enablePerformanceMonitoring: boolean;
  warningThreshold: number;
  criticalThreshold: number;
}

/**
 * 内存管理系统类
 */
class MemoryManagementSystem {
  private static instance: MemoryManagementSystem;
  private subscriptions: Map<string, SubscriptionInfo> = new Map();
  private componentMemory: Map<string, ComponentMemoryInfo> = new Map();
  private memoryHistory: MemoryUsage[] = [];
  private timers: Set<ReturnType<typeof setInterval>> = new Set();
  private eventListeners: Map<
    string,
    { element: EventTarget; event: string; handler: EventListener }
  > = new Map();
  private config: MemoryConfig = {
    maxMemoryUsage: 500 * 1024 * 1024, // 500MB
    leakDetectionInterval: 30 * 1000, // 30秒
    cleanupInterval: 60 * 1000, // 1分钟
    subscriptionTimeout: 5 * 60 * 1000, // 5分钟
    enableAutoCleanup: true,
    enableLeakDetection: true,
    enablePerformanceMonitoring: true,
    warningThreshold: 300 * 1024 * 1024, // 300MB
    criticalThreshold: 450 * 1024 * 1024, // 450MB
  };
  private monitoringTimer?: ReturnType<typeof setInterval>;
  private cleanupTimer?: ReturnType<typeof setInterval>;

  private constructor() {
    this.startMonitoring();
    this.setupGlobalErrorHandling();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): MemoryManagementSystem {
    if (!MemoryManagementSystem.instance) {
      MemoryManagementSystem.instance = new MemoryManagementSystem();
    }
    return MemoryManagementSystem.instance;
  }

  /**
   * 注册订阅
   */
  public registerSubscription(
    id: string,
    type: string,
    component: string,
    cleanup?: () => void
  ): void {
    const subscription: SubscriptionInfo = {
      id,
      type,
      component,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      isActive: true,
      cleanup,
    };

    this.subscriptions.set(id, subscription);
    this.updateComponentMemory(component, 'subscription', 1);

    logger.debug('订阅已注册', {
      id,
      type,
      component,
      totalSubscriptions: this.subscriptions.size,
    });
  }

  /**
   * 取消注册订阅
   */
  public unregisterSubscription(id: string): boolean {
    const subscription = this.subscriptions.get(id);
    if (!subscription) {
      return false;
    }

    // 执行清理函数
    if (subscription.cleanup) {
      try {
        subscription.cleanup();
      } catch (error) {
        logger.error('订阅清理失败', { id, error });
      }
    }

    this.subscriptions.delete(id);
    this.updateComponentMemory(subscription.component, 'subscription', -1);

    logger.debug('订阅已取消注册', {
      id,
      component: subscription.component,
      duration: Date.now() - subscription.createdAt,
    });

    return true;
  }

  /**
   * 更新订阅活动时间
   */
  public updateSubscriptionActivity(id: string): void {
    const subscription = this.subscriptions.get(id);
    if (subscription) {
      subscription.lastActivity = Date.now();
    }
  }

  /**
   * 注册定时器
   */
  public registerTimer(
    timer: ReturnType<typeof setInterval>,
    component: string
  ): void {
    this.timers.add(timer);
    this.updateComponentMemory(component, 'timer', 1);

    logger.debug('定时器已注册', {
      component,
      totalTimers: this.timers.size,
    });
  }

  /**
   * 取消注册定时器
   */
  public unregisterTimer(
    timer: ReturnType<typeof setInterval>,
    component: string
  ): boolean {
    const removed = this.timers.delete(timer);
    if (removed) {
      clearTimeout(timer);
      this.updateComponentMemory(component, 'timer', -1);

      logger.debug('定时器已取消注册', {
        component,
        totalTimers: this.timers.size,
      });
    }
    return removed;
  }

  /**
   * 注册事件监听器
   */
  public registerEventListener(
    id: string,
    element: EventTarget,
    event: string,
    handler: EventListener,
    component: string
  ): void {
    this.eventListeners.set(id, { element, event, handler });
    this.updateComponentMemory(component, 'eventListener', 1);

    logger.debug('事件监听器已注册', {
      id,
      event,
      component,
      totalListeners: this.eventListeners.size,
    });
  }

  /**
   * 取消注册事件监听器
   */
  public unregisterEventListener(id: string, component: string): boolean {
    const listener = this.eventListeners.get(id);
    if (!listener) {
      return false;
    }

    try {
      listener.element.removeEventListener(listener.event, listener.handler);
      this.eventListeners.delete(id);
      this.updateComponentMemory(component, 'eventListener', -1);

      logger.debug('事件监听器已取消注册', {
        id,
        event: listener.event,
        component,
      });

      return true;
    } catch (error) {
      logger.error('取消事件监听器失败', { id, error });
      return false;
    }
  }

  /**
   * 获取当前内存使用情况
   */
  public getCurrentMemoryUsage(): MemoryUsage {
    const performance = (window as any).performance;
    let used = 0;
    let total = 0;

    if (performance && performance.memory) {
      used = performance.memory.usedJSHeapSize;
      total = performance.memory.totalJSHeapSize;
    } else {
      // 估算内存使用
      used = this.estimateMemoryUsage();
      total = this.config.maxMemoryUsage;
    }

    const usage: MemoryUsage = {
      used,
      total,
      percentage: total > 0 ? (used / total) * 100 : 0,
      timestamp: Date.now(),
    };

    // 保存历史记录
    this.memoryHistory.push(usage);
    if (this.memoryHistory.length > 100) {
      this.memoryHistory.shift();
    }

    return usage;
  }

  /**
   * 检测内存泄漏
   */
  public detectMemoryLeaks(): MemoryLeakDetection {
    const currentUsage = this.getCurrentMemoryUsage();
    const recommendations: string[] = [];
    const suspiciousObjects: string[] = [];

    // 分析内存增长趋势
    let growthRate = 0;
    if (this.memoryHistory.length >= 2) {
      const recent = this.memoryHistory.slice(-10);
      const oldest = recent[0];
      const newest = recent[recent.length - 1];
      const timeDiff = newest.timestamp - oldest.timestamp;
      const memoryDiff = newest.used - oldest.used;
      growthRate = timeDiff > 0 ? (memoryDiff / timeDiff) * 1000 : 0; // 每秒增长
    }

    // 检查长时间未活动的订阅
    const now = Date.now();
    for (const [id, subscription] of this.subscriptions.entries()) {
      if (now - subscription.lastActivity > this.config.subscriptionTimeout) {
        suspiciousObjects.push(
          `Inactive subscription: ${id} (${subscription.type})`
        );
        recommendations.push(
          `清理长时间未活动的订阅: ${subscription.component}`
        );
      }
    }

    // 检查组件内存使用
    for (const [name, info] of this.componentMemory.entries()) {
      if (info.subscriptions > 10) {
        suspiciousObjects.push(
          `High subscription count: ${name} (${info.subscriptions})`
        );
        recommendations.push(`优化组件 ${name} 的订阅管理`);
      }
      if (info.timers > 5) {
        suspiciousObjects.push(`High timer count: ${name} (${info.timers})`);
        recommendations.push(`检查组件 ${name} 的定时器清理`);
      }
    }

    // 确定严重程度
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (currentUsage.used > this.config.criticalThreshold) {
      severity = 'critical';
    } else if (currentUsage.used > this.config.warningThreshold) {
      severity = 'high';
    } else if (growthRate > 1024 * 1024) {
      // 1MB/s
      severity = 'medium';
    }

    const isLeaking = growthRate > 512 * 1024 || suspiciousObjects.length > 0; // 512KB/s

    if (isLeaking) {
      recommendations.push('执行手动垃圾回收');
      recommendations.push('检查组件卸载时的清理逻辑');
    }

    return {
      isLeaking,
      growthRate,
      suspiciousObjects,
      recommendations,
      severity,
    };
  }

  /**
   * 执行内存清理
   */
  public performCleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;

    // 清理过期订阅
    for (const [id, subscription] of this.subscriptions.entries()) {
      if (now - subscription.lastActivity > this.config.subscriptionTimeout) {
        this.unregisterSubscription(id);
        cleanedCount++;
      }
    }

    // 清理无效的事件监听器
    for (const [id, listener] of this.eventListeners.entries()) {
      try {
        // 检查元素是否还在DOM中
        if (
          listener.element instanceof Element &&
          !document.contains(listener.element)
        ) {
          this.eventListeners.delete(id);
          cleanedCount++;
        }
      } catch (error) {
        // 元素可能已被销毁
        this.eventListeners.delete(id);
        cleanedCount++;
      }
    }

    // 触发垃圾回收（如果可用）
    if ((window as any).gc) {
      (window as any).gc();
    }

    logger.info('内存清理完成', {
      cleanedCount,
      remainingSubscriptions: this.subscriptions.size,
      remainingListeners: this.eventListeners.size,
      remainingTimers: this.timers.size,
    });
  }

  /**
   * 获取组件内存统计
   */
  public getComponentMemoryStats(): ComponentMemoryInfo[] {
    return Array.from(this.componentMemory.values()).sort(
      (a, b) => b.memoryUsage - a.memoryUsage
    );
  }

  /**
   * 获取订阅统计
   */
  public getSubscriptionStats(): {
    total: number;
    active: number;
    inactive: number;
    byType: Record<string, number>;
    byComponent: Record<string, number>;
  } {
    const stats = {
      total: this.subscriptions.size,
      active: 0,
      inactive: 0,
      byType: {} as Record<string, number>,
      byComponent: {} as Record<string, number>,
    };

    const now = Date.now();
    for (const subscription of this.subscriptions.values()) {
      if (now - subscription.lastActivity < this.config.subscriptionTimeout) {
        stats.active++;
      } else {
        stats.inactive++;
      }

      stats.byType[subscription.type] =
        (stats.byType[subscription.type] || 0) + 1;
      stats.byComponent[subscription.component] =
        (stats.byComponent[subscription.component] || 0) + 1;
    }

    return stats;
  }

  /**
   * 获取内存历史
   */
  public getMemoryHistory(): MemoryUsage[] {
    return [...this.memoryHistory];
  }

  /**
   * 更新组件内存信息
   */
  private updateComponentMemory(
    component: string,
    type: 'subscription' | 'timer' | 'eventListener',
    delta: number
  ): void {
    let info = this.componentMemory.get(component);
    if (!info) {
      info = {
        name: component,
        instances: 1,
        memoryUsage: 0,
        subscriptions: 0,
        timers: 0,
        eventListeners: 0,
        lastUpdate: Date.now(),
      };
      this.componentMemory.set(component, info);
    }

    switch (type) {
      case 'subscription':
        info.subscriptions = Math.max(0, info.subscriptions + delta);
        break;
      case 'timer':
        info.timers = Math.max(0, info.timers + delta);
        break;
      case 'eventListener':
        info.eventListeners = Math.max(0, info.eventListeners + delta);
        break;
    }

    info.lastUpdate = Date.now();
    info.memoryUsage = this.estimateComponentMemoryUsage(info);
  }

  /**
   * 估算组件内存使用
   */
  private estimateComponentMemoryUsage(info: ComponentMemoryInfo): number {
    // 简单的内存使用估算
    return (
      info.subscriptions * 1024 + // 每个订阅1KB
      info.timers * 512 + // 每个定时器512B
      info.eventListeners * 256 + // 每个事件监听器256B
      info.instances * 2048 // 每个实例2KB
    );
  }

  /**
   * 估算总内存使用
   */
  private estimateMemoryUsage(): number {
    let total = 0;
    for (const info of this.componentMemory.values()) {
      total += info.memoryUsage;
    }
    return total;
  }

  /**
   * 启动监控
   */
  private startMonitoring(): void {
    if (this.config.enablePerformanceMonitoring) {
      this.monitoringTimer = setInterval(() => {
        const usage = this.getCurrentMemoryUsage();

        if (usage.used > this.config.warningThreshold) {
          logger.warn('内存使用超过警告阈值', {
            used: usage.used,
            percentage: usage.percentage,
            threshold: this.config.warningThreshold,
          });
        }

        if (this.config.enableLeakDetection) {
          const leakDetection = this.detectMemoryLeaks();
          if (leakDetection.isLeaking) {
            logger.error('检测到内存泄漏', leakDetection);

            if (
              this.config.enableAutoCleanup &&
              leakDetection.severity !== 'low'
            ) {
              this.performCleanup();
            }
          }
        }
      }, this.config.leakDetectionInterval);
    }

    if (this.config.enableAutoCleanup) {
      this.cleanupTimer = setInterval(() => {
        this.performCleanup();
      }, this.config.cleanupInterval);
    }
  }

  /**
   * 设置全局错误处理
   */
  private setupGlobalErrorHandling(): void {
    // 监听未捕获的Promise拒绝
    window.addEventListener('unhandledrejection', event => {
      logger.error('未处理的Promise拒绝', {
        reason: event.reason,
        promise: event.promise,
      });
    });

    // 监听全局错误
    window.addEventListener('error', event => {
      logger.error('全局错误', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      });
    });
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<MemoryConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // 重启监控
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
    }
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.startMonitoring();

    logger.info('内存管理配置已更新', this.config);
  }

  /**
   * 获取配置
   */
  public getConfig(): MemoryConfig {
    return { ...this.config };
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    // 清理所有订阅
    for (const id of this.subscriptions.keys()) {
      this.unregisterSubscription(id);
    }

    // 清理所有定时器
    for (const timer of this.timers) {
      clearTimeout(timer);
    }
    this.timers.clear();

    // 清理所有事件监听器
    for (const [id, listener] of this.eventListeners.entries()) {
      try {
        listener.element.removeEventListener(listener.event, listener.handler);
      } catch (error) {
        logger.warn('清理事件监听器失败', { id, error });
      }
    }
    this.eventListeners.clear();

    // 停止监控
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
    }
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.componentMemory.clear();
    this.memoryHistory.length = 0;

    logger.info('内存管理系统已销毁');
  }
}

// 导出单例实例
export const memoryManager = MemoryManagementSystem.getInstance();

/**
 * 内存管理 Hook
 */
export function useMemoryManagement(componentName: string) {
  const subscriptionIds = useRef<Set<string>>(new Set());
  const timerIds = useRef<Set<ReturnType<typeof setInterval>>>(new Set());
  const listenerIds = useRef<Set<string>>(new Set());

  // 注册订阅
  const registerSubscription = useCallback(
    (id: string, type: string, cleanup?: () => void) => {
      memoryManager.registerSubscription(id, type, componentName, cleanup);
      subscriptionIds.current.add(id);
    },
    [componentName]
  );

  // 注册定时器
  const registerTimer = useCallback(
    (timer: ReturnType<typeof setInterval>) => {
      memoryManager.registerTimer(timer, componentName);
      timerIds.current.add(timer);
    },
    [componentName]
  );

  // 注册事件监听器
  const registerEventListener = useCallback(
    (
      id: string,
      element: EventTarget,
      event: string,
      handler: EventListener
    ) => {
      memoryManager.registerEventListener(
        id,
        element,
        event,
        handler,
        componentName
      );
      listenerIds.current.add(id);
    },
    [componentName]
  );

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      // 清理订阅
      for (const id of subscriptionIds.current) {
        memoryManager.unregisterSubscription(id);
      }

      // 清理定时器
      for (const timer of timerIds.current) {
        memoryManager.unregisterTimer(timer, componentName);
      }

      // 清理事件监听器
      for (const id of listenerIds.current) {
        memoryManager.unregisterEventListener(id, componentName);
      }
    };
  }, [componentName]);

  return {
    registerSubscription,
    registerTimer,
    registerEventListener,
    updateSubscriptionActivity:
      memoryManager.updateSubscriptionActivity.bind(memoryManager),
  };
}

/**
 * 内存监控 Hook
 */
export function useMemoryMonitor() {
  const [memoryUsage, setMemoryUsage] = useState<MemoryUsage | null>(null);
  const [leakDetection, setLeakDetection] =
    useState<MemoryLeakDetection | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      setMemoryUsage(memoryManager.getCurrentMemoryUsage());
      setLeakDetection(memoryManager.detectMemoryLeaks());
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // 每5秒更新

    return () => clearInterval(interval);
  }, []);

  const performCleanup = useCallback(() => {
    memoryManager.performCleanup();
  }, []);

  return {
    memoryUsage,
    leakDetection,
    performCleanup,
    componentStats: memoryManager.getComponentMemoryStats(),
    subscriptionStats: memoryManager.getSubscriptionStats(),
  };
}
