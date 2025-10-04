/**
 * 内存管理和资源清理Hook
 * 防止内存泄漏，优化组件性能
 */

import { useEffect, useRef, useCallback } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('memory-manager');

interface MemoryManagerOptions {
  componentName: string;
  maxMemoryThreshold?: number; // MB
  checkInterval?: number; // 毫秒
  enableAutoCleanup?: boolean;
}

export const useMemoryManager = (options: MemoryManagerOptions) => {
  const {
    componentName,
    maxMemoryThreshold = 50, // 50MB 默认阈值
    checkInterval = 10000, // 10秒检查间隔
    enableAutoCleanup = true
  } = options;

  const cleanupFunctionsRef = useRef<Array<() => void>>([]);
  const intervalRefs = useRef<Set<NodeJS.Timeout>>(new Set());
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());
  const subscriptionsRef = useRef<Set<() => void>>(new Set());
  const lastMemoryCheckRef = useRef<number>(0);

  // 注册清理函数
  const registerCleanup = useCallback((cleanupFn: () => void) => {
    cleanupFunctionsRef.current.push(cleanupFn);
  }, []);

  // 注册间隔任务
  const registerInterval = useCallback((intervalId: NodeJS.Timeout) => {
    intervalRefs.current.add(intervalId);
    
    // 返回清理函数
    return () => {
      clearInterval(intervalId);
      intervalRefs.current.delete(intervalId);
    };
  }, []);

  // 注册超时任务
  const registerTimeout = useCallback((timeoutId: NodeJS.Timeout) => {
    timeoutRefs.current.add(timeoutId);
    
    // 返回清理函数
    return () => {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(timeoutId);
    };
  }, []);

  // 注册订阅
  const registerSubscription = useCallback((unsubscribeFn: () => void) => {
    subscriptionsRef.current.add(unsubscribeFn);
    
    // 返回清理函数
    return () => {
      unsubscribeFn();
      subscriptionsRef.current.delete(unsubscribeFn);
    };
  }, []);

  // 内存检查函数
  const checkMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / (1024 * 1024);
      
      lastMemoryCheckRef.current = usedMB;

      if (usedMB > maxMemoryThreshold) {
        logger.warn(`${componentName}内存使用超过阈值`, {
          current: `${usedMB.toFixed(2)}MB`,
          threshold: `${maxMemoryThreshold}MB`,
          total: `${(memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)}MB`
        });

        // 触发垃圾回收（如果可用）
        if (enableAutoCleanup && typeof globalThis !== 'undefined' && (globalThis as any).gc) {
          try {
            (globalThis as any).gc();
            logger.debug(`${componentName}触发垃圾回收`);
          } catch (error) {
            logger.debug('垃圾回收不可用');
          }
        }

        return {
          isOverThreshold: true,
          currentUsage: usedMB,
          threshold: maxMemoryThreshold
        };
      }

      return {
        isOverThreshold: false,
        currentUsage: usedMB,
        threshold: maxMemoryThreshold
      };
    }

    return null;
  }, [componentName, maxMemoryThreshold, enableAutoCleanup]);

  // 立即清理所有资源
  const forceCleanup = useCallback(() => {
    // 清理所有间隔任务
    intervalRefs.current.forEach(intervalId => {
      clearInterval(intervalId);
    });
    intervalRefs.current.clear();

    // 清理所有超时任务
    timeoutRefs.current.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current.clear();

    // 取消所有订阅
    subscriptionsRef.current.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        logger.error(`${componentName}取消订阅失败`, error);
      }
    });
    subscriptionsRef.current.clear();

    // 执行所有清理函数
    cleanupFunctionsRef.current.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        logger.error(`${componentName}清理函数执行失败`, error);
      }
    });
    cleanupFunctionsRef.current = [];

    logger.debug(`${componentName}强制清理完成`);
  }, [componentName]);

  // 获取资源使用统计
  const getResourceStats = useCallback(() => {
    return {
      intervals: intervalRefs.current.size,
      timeouts: timeoutRefs.current.size,
      subscriptions: subscriptionsRef.current.size,
      cleanupFunctions: cleanupFunctionsRef.current.length,
      lastMemoryUsage: lastMemoryCheckRef.current
    };
  }, []);

  // 创建安全的异步函数包装器
  const createSafeAsync = useCallback(<T extends any[], R>(
    asyncFn: (...args: T) => Promise<R>
  ) => {
    let isMounted = true;
    
    registerCleanup(() => {
      isMounted = false;
    });

    return async (...args: T): Promise<R | null> => {
      if (!isMounted) {
        logger.debug(`${componentName}异步操作被取消：组件已卸载`);
        return null;
      }
      
      try {
        const result = await asyncFn(...args);
        
        if (!isMounted) {
          logger.debug(`${componentName}异步操作结果被丢弃：组件已卸载`);
          return null;
        }
        
        return result;
      } catch (error) {
        if (isMounted) {
          logger.error(`${componentName}异步操作失败`, error);
        }
        throw error;
      }
    };
  }, [componentName, registerCleanup]);

  // 定期内存检查
  useEffect(() => {
    if (!enableAutoCleanup) return;

    const memoryCheckInterval = setInterval(() => {
      checkMemoryUsage();
    }, checkInterval);

    registerInterval(memoryCheckInterval);

    return () => {
      clearInterval(memoryCheckInterval);
    };
  }, [enableAutoCleanup, checkInterval, checkMemoryUsage, registerInterval]);

  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      forceCleanup();
    };
  }, [forceCleanup]);

  // 页面隐藏时的清理（可选）
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && enableAutoCleanup) {
        // 页面隐藏时执行轻量清理
        logger.debug(`${componentName}页面隐藏，执行轻量清理`);
        checkMemoryUsage();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [componentName, enableAutoCleanup, checkMemoryUsage]);

  return {
    registerCleanup,
    registerInterval,
    registerTimeout,
    registerSubscription,
    checkMemoryUsage,
    forceCleanup,
    getResourceStats,
    createSafeAsync
  };
};