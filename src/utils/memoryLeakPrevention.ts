/**
 * 文件级注释：内存泄漏预防系统
 * 专门解决 React 组件和实时订阅的内存泄漏问题
 * 提供自动内存管理、泄漏检测和预防机制
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { createLogger } from '@/lib/logger';
import { masterErrorHandler } from '@/utils/masterErrorHandler';

const logger = createLogger('memory-leak-prevention');

/**
 * 接口注释：内存泄漏检测配置
 */
export interface MemoryLeakDetectionConfig {
  /** 启用内存监控 */
  enableMemoryMonitoring: boolean;
  /** 启用订阅泄漏检测 */
  enableSubscriptionLeakDetection: boolean;
  /** 启用DOM泄漏检测 */
  enableDOMLeakDetection: boolean;
  /** 内存检查间隔（毫秒） */
  memoryCheckInterval: number;
  /** 内存增长阈值（字节） */
  memoryGrowthThreshold: number;
  /** 订阅超时时间（毫秒） */
  subscriptionTimeout: number;
  /** 最大允许订阅数 */
  maxSubscriptions: number;
}

/**
 * 接口注释：内存使用统计
 */
export interface MemoryUsageStats {
  /** 当前内存使用量 */
  currentUsage: number;
  /** 峰值内存使用量 */
  peakUsage: number;
  /** 内存增长率 */
  growthRate: number;
  /** 活跃订阅数 */
  activeSubscriptions: number;
  /** 潜在泄漏数 */
  potentialLeaks: number;
  /** 最后检查时间 */
  lastCheckTime: number;
}

/**
 * 接口注释：订阅信息
 */
interface SubscriptionInfo {
  /** 订阅ID */
  id: string;
  /** 创建时间 */
  createdAt: number;
  /** 最后使用时间 */
  lastUsed: number;
  /** 清理函数 */
  cleanup: () => void;
  /** 订阅类型 */
  type: string;
  /** 组件名称 */
  componentName?: string;
}

/**
 * 接口注释：DOM引用信息
 */
interface DOMReferenceInfo {
  /** 引用ID */
  id: string;
  /** 元素类型 */
  elementType: string;
  /** 创建时间 */
  createdAt: number;
  /** 是否已清理 */
  isCleanedUp: boolean;
}

/**
 * 类级注释：内存泄漏预防管理器
 * 提供全面的内存泄漏检测、预防和自动清理功能
 */
export class MemoryLeakPrevention {
  private static instance: MemoryLeakPrevention;
  private config: MemoryLeakDetectionConfig;
  private subscriptions: Map<string, SubscriptionInfo> = new Map();
  private domReferences: Map<string, DOMReferenceInfo> = new Map();
  private memoryHistory: number[] = [];
  private monitoringTimer: ReturnType<typeof setInterval> | null = null;
  private componentInstances: Map<string, number> = new Map();

  private constructor(config?: Partial<MemoryLeakDetectionConfig>) {
    this.config = {
      enableMemoryMonitoring: true,
      enableSubscriptionLeakDetection: true,
      enableDOMLeakDetection: true,
      memoryCheckInterval: 10000, // 10秒
      memoryGrowthThreshold: 10 * 1024 * 1024, // 10MB
      subscriptionTimeout: 300000, // 5分钟
      maxSubscriptions: 100,
      ...config,
    };

    this.startMemoryMonitoring();
  }

  /**
   * 函数级注释：获取单例实例
   * @param config 可选的配置参数
   * @returns 内存泄漏预防实例
   */
  public static getInstance(
    config?: Partial<MemoryLeakDetectionConfig>
  ): MemoryLeakPrevention {
    if (!MemoryLeakPrevention.instance) {
      MemoryLeakPrevention.instance = new MemoryLeakPrevention(config);
    }
    return MemoryLeakPrevention.instance;
  }

  /**
   * 函数级注释：创建内存安全的订阅管理器
   * @param componentName 组件名称
   * @returns 订阅管理器
   */
  public createMemorySafeSubscriptionManager(componentName: string) {
    const componentSubscriptions = new Set<string>();

    /**
     * 函数级注释：注册订阅
     */
    const registerSubscription = useCallback(
      (
        subscriptionId: string,
        cleanup: () => void,
        type: string = 'unknown'
      ) => {
        if (!this.config.enableSubscriptionLeakDetection) {
          return cleanup;
        }

        // 检查订阅数量限制
        if (this.subscriptions.size >= this.config.maxSubscriptions) {
          logger.warn('订阅数量超过限制，清理旧订阅', {
            currentCount: this.subscriptions.size,
            maxAllowed: this.config.maxSubscriptions,
          });
          this.cleanupOldSubscriptions();
        }

        const subscriptionInfo: SubscriptionInfo = {
          id: subscriptionId,
          createdAt: Date.now(),
          lastUsed: Date.now(),
          cleanup,
          type,
          componentName,
        };

        this.subscriptions.set(subscriptionId, subscriptionInfo);
        componentSubscriptions.add(subscriptionId);

        logger.debug('订阅已注册', {
          subscriptionId,
          componentName,
          type,
          totalSubscriptions: this.subscriptions.size,
        });

        // 返回增强的清理函数
        return () => {
          this.unregisterSubscription(subscriptionId);
          componentSubscriptions.delete(subscriptionId);
        };
      },
      [componentName]
    );

    /**
     * 函数级注释：更新订阅使用时间
     */
    const updateSubscriptionUsage = useCallback((subscriptionId: string) => {
      const subscription = this.subscriptions.get(subscriptionId);
      if (subscription) {
        subscription.lastUsed = Date.now();
      }
    }, []);

    /**
     * 函数级注释：清理组件所有订阅
     */
    const cleanupComponentSubscriptions = useCallback(() => {
      componentSubscriptions.forEach(subscriptionId => {
        this.unregisterSubscription(subscriptionId);
      });
      componentSubscriptions.clear();

      logger.info('组件订阅已清理', {
        componentName,
        cleanedCount: componentSubscriptions.size,
      });
    }, [componentName]);

    // 组件卸载时自动清理
    useEffect(() => {
      return cleanupComponentSubscriptions;
    }, [cleanupComponentSubscriptions]);

    return {
      registerSubscription,
      updateSubscriptionUsage,
      cleanupComponentSubscriptions,
      getActiveSubscriptionCount: () => componentSubscriptions.size,
    };
  }

  /**
   * 函数级注释：创建内存安全的DOM引用管理器
   * @param componentName 组件名称
   * @returns DOM引用管理器
   */
  public createMemorySafeDOMManager(componentName: string) {
    const componentDOMRefs = new Set<string>();

    /**
     * 函数级注释：注册DOM引用
     */
    const registerDOMReference = useCallback(
      <T extends HTMLElement>(
        elementType: string,
        initialValue: T | null = null
      ) => {
        const refId = `${componentName}_${elementType}_${Date.now()}_${Math.random()}`;
        const ref = useRef<T>(initialValue);

        if (this.config.enableDOMLeakDetection) {
          const domInfo: DOMReferenceInfo = {
            id: refId,
            elementType,
            createdAt: Date.now(),
            isCleanedUp: false,
          };

          this.domReferences.set(refId, domInfo);
          componentDOMRefs.add(refId);

          logger.debug('DOM引用已注册', {
            refId,
            elementType,
            componentName,
          });
        }

        return ref;
      },
      [componentName]
    );

    /**
     * 函数级注释：清理DOM引用
     */
    const cleanupDOMReference = useCallback(
      (refId: string) => {
        const domInfo = this.domReferences.get(refId);
        if (domInfo && !domInfo.isCleanedUp) {
          domInfo.isCleanedUp = true;
          this.domReferences.delete(refId);
          componentDOMRefs.delete(refId);

          logger.debug('DOM引用已清理', { refId, componentName });
        }
      },
      [componentName]
    );

    /**
     * 函数级注释：清理组件所有DOM引用
     */
    const cleanupComponentDOMReferences = useCallback(() => {
      componentDOMRefs.forEach(refId => {
        cleanupDOMReference(refId);
      });
      componentDOMRefs.clear();

      logger.info('组件DOM引用已清理', {
        componentName,
        cleanedCount: componentDOMRefs.size,
      });
    }, [componentName, cleanupDOMReference]);

    // 组件卸载时自动清理
    useEffect(() => {
      return cleanupComponentDOMReferences;
    }, [cleanupComponentDOMReferences]);

    return {
      registerDOMReference,
      cleanupDOMReference,
      cleanupComponentDOMReferences,
      getActiveDOMReferenceCount: () => componentDOMRefs.size,
    };
  }

  /**
   * 函数级注释：创建内存安全的状态管理器
   * @param componentName 组件名称
   * @returns 状态管理器
   */
  public createMemorySafeStateManager(componentName: string) {
    const stateCleanupFunctions = useRef<Array<() => void>>([]);

    /**
     * 函数级注释：注册状态清理函数
     */
    const registerStateCleanup = useCallback((cleanup: () => void) => {
      stateCleanupFunctions.current.push(cleanup);
    }, []);

    /**
     * 函数级注释：创建内存安全的状态
     */
    const createMemorySafeState = useCallback(
      <T>(initialValue: T, cleanup?: (value: T) => void) => {
        const [state, setState] = useState(initialValue);

        // 注册清理函数
        if (cleanup) {
          registerStateCleanup(() => cleanup(state));
        }

        return [state, setState] as const;
      },
      [registerStateCleanup]
    );

    /**
     * 函数级注释：清理所有状态
     */
    const cleanupAllStates = useCallback(() => {
      stateCleanupFunctions.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          masterErrorHandler.handleError(error, {
            context: `${componentName}.stateCleanup`,
            severity: 'low',
          });
        }
      });
      stateCleanupFunctions.current = [];

      logger.info('组件状态已清理', { componentName });
    }, [componentName]);

    // 组件卸载时自动清理
    useEffect(() => {
      return cleanupAllStates;
    }, [cleanupAllStates]);

    return {
      createMemorySafeState,
      registerStateCleanup,
      cleanupAllStates,
    };
  }

  /**
   * 函数级注释：注销订阅
   */
  private unregisterSubscription(subscriptionId: string) {
    const subscription = this.subscriptions.get(subscriptionId);
    if (subscription) {
      try {
        subscription.cleanup();
      } catch (error) {
        masterErrorHandler.handleError(error, {
          context: 'MemoryLeakPrevention.unregisterSubscription',
          severity: 'low',
          metadata: { subscriptionId },
        });
      }

      this.subscriptions.delete(subscriptionId);
      logger.debug('订阅已注销', { subscriptionId });
    }
  }

  /**
   * 函数级注释：清理旧订阅
   */
  private cleanupOldSubscriptions() {
    const now = Date.now();
    const subscriptionsToCleanup: string[] = [];

    this.subscriptions.forEach((subscription, id) => {
      const age = now - subscription.lastUsed;
      if (age > this.config.subscriptionTimeout) {
        subscriptionsToCleanup.push(id);
      }
    });

    subscriptionsToCleanup.forEach(id => {
      this.unregisterSubscription(id);
    });

    if (subscriptionsToCleanup.length > 0) {
      logger.info('旧订阅已清理', {
        cleanedCount: subscriptionsToCleanup.length,
        remainingCount: this.subscriptions.size,
      });
    }
  }

  /**
   * 函数级注释：启动内存监控
   */
  private startMemoryMonitoring() {
    if (!this.config.enableMemoryMonitoring) return;

    this.monitoringTimer = setInterval(() => {
      this.checkMemoryUsage();
      this.detectMemoryLeaks();
      this.cleanupOldSubscriptions();
    }, this.config.memoryCheckInterval);

    logger.info('内存监控已启动', {
      interval: this.config.memoryCheckInterval,
    });
  }

  /**
   * 函数级注释：检查内存使用
   */
  private checkMemoryUsage() {
    if (!('memory' in performance)) return;

    const memory = (performance as any).memory;
    const currentUsage = memory.usedJSHeapSize;

    this.memoryHistory.push(currentUsage);

    // 保留最近10次的内存记录
    if (this.memoryHistory.length > 10) {
      this.memoryHistory.shift();
    }

    // 检查内存增长
    if (this.memoryHistory.length >= 2) {
      const previousUsage = this.memoryHistory[this.memoryHistory.length - 2];
      const growth = currentUsage - previousUsage;

      if (growth > this.config.memoryGrowthThreshold) {
        logger.warn('检测到内存快速增长', {
          currentUsage,
          previousUsage,
          growth,
          threshold: this.config.memoryGrowthThreshold,
        });
      }
    }
  }

  /**
   * 函数级注释：检测内存泄漏
   */
  private detectMemoryLeaks() {
    const now = Date.now();
    let potentialLeaks = 0;

    // 检查长时间未使用的订阅
    this.subscriptions.forEach((subscription, id) => {
      const age = now - subscription.lastUsed;
      if (age > this.config.subscriptionTimeout) {
        potentialLeaks++;
        logger.warn('检测到潜在订阅泄漏', {
          subscriptionId: id,
          age,
          type: subscription.type,
          componentName: subscription.componentName,
        });
      }
    });

    // 检查未清理的DOM引用
    this.domReferences.forEach((domInfo, id) => {
      if (!domInfo.isCleanedUp) {
        const age = now - domInfo.createdAt;
        if (age > this.config.subscriptionTimeout) {
          potentialLeaks++;
          logger.warn('检测到潜在DOM引用泄漏', {
            refId: id,
            age,
            elementType: domInfo.elementType,
          });
        }
      }
    });

    if (potentialLeaks > 0) {
      logger.warn('检测到潜在内存泄漏', {
        potentialLeaks,
        activeSubscriptions: this.subscriptions.size,
        activeDOMReferences: this.domReferences.size,
      });
    }
  }

  /**
   * 函数级注释：获取内存使用统计
   * @returns 内存使用统计
   */
  public getMemoryUsageStats(): MemoryUsageStats {
    const currentUsage =
      'memory' in performance ? (performance as any).memory.usedJSHeapSize : 0;

    const peakUsage = Math.max(...this.memoryHistory, currentUsage);

    const growthRate =
      this.memoryHistory.length >= 2
        ? (currentUsage - this.memoryHistory[0]) / this.memoryHistory.length
        : 0;

    const now = Date.now();
    const potentialLeaks = Array.from(this.subscriptions.values()).filter(
      sub => now - sub.lastUsed > this.config.subscriptionTimeout
    ).length;

    return {
      currentUsage,
      peakUsage,
      growthRate,
      activeSubscriptions: this.subscriptions.size,
      potentialLeaks,
      lastCheckTime: now,
    };
  }

  /**
   * 函数级注释：强制清理所有资源
   */
  public forceCleanupAll() {
    // 清理所有订阅
    this.subscriptions.forEach((subscription, id) => {
      try {
        subscription.cleanup();
      } catch (error) {
        logger.error('强制清理订阅失败', { subscriptionId: id, error });
      }
    });
    this.subscriptions.clear();

    // 清理所有DOM引用
    this.domReferences.clear();

    // 清理内存历史
    this.memoryHistory = [];

    logger.info('所有资源已强制清理');
  }

  /**
   * 函数级注释：销毁内存泄漏预防器
   */
  public destroy() {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      this.monitoringTimer = null;
    }

    this.forceCleanupAll();
    logger.info('内存泄漏预防器已销毁');
  }
}

/**
 * 函数级注释：创建内存安全的组件Hook
 * @param componentName 组件名称
 * @param config 可选的配置参数
 * @returns 内存安全管理器
 */
export const useMemoryLeakPrevention = (
  componentName: string,
  config?: Partial<MemoryLeakDetectionConfig>
) => {
  const memoryManager = useMemo(
    () => MemoryLeakPrevention.getInstance(config),
    [config]
  );

  const subscriptionManager =
    memoryManager.createMemorySafeSubscriptionManager(componentName);
  const domManager = memoryManager.createMemorySafeDOMManager(componentName);
  const stateManager =
    memoryManager.createMemorySafeStateManager(componentName);

  return {
    ...subscriptionManager,
    ...domManager,
    ...stateManager,
    getMemoryUsageStats: memoryManager.getMemoryUsageStats.bind(memoryManager),
    forceCleanupAll: memoryManager.forceCleanupAll.bind(memoryManager),
  };
};

export default MemoryLeakPrevention;
