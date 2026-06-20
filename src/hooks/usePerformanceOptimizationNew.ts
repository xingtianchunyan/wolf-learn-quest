/**
 * 性能优化Hook
 * 提供内存管理、组件优化和性能监控功能
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { createLogger } from '@/lib/logger';

const logger = createLogger('performance-optimization');

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage?: number;
  componentName: string;
}

interface UsePerformanceOptimizationOptions {
  componentName: string;
  enableMemoryTracking?: boolean;
  enableRenderTracking?: boolean;
  debounceTime?: number;
  maxRenderThreshold?: number;
}

export const usePerformanceOptimization = (
  options: UsePerformanceOptimizationOptions
) => {
  const {
    componentName,
    enableMemoryTracking = true,
    enableRenderTracking = true,
    debounceTime = 100,
    maxRenderThreshold = 5,
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    componentName,
  });

  const renderTimesRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  // 渲染开始时间记录
  useEffect(() => {
    if (enableRenderTracking) {
      startTimeRef.current = performance.now();
    }
  });

  // 渲染完成时间记录
  useEffect(() => {
    if (enableRenderTracking && startTimeRef.current > 0) {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;

      metricsRef.current.renderCount++;
      metricsRef.current.lastRenderTime = renderTime;

      // 记录最近10次渲染时间用于计算平均值
      renderTimesRef.current.push(renderTime);
      if (renderTimesRef.current.length > 10) {
        renderTimesRef.current.shift();
      }

      // 计算平均渲染时间
      metricsRef.current.averageRenderTime =
        renderTimesRef.current.reduce((sum, time) => sum + time, 0) /
        renderTimesRef.current.length;

      // 性能警告
      if (renderTime > 16) {
        // 大于一帧时间（60fps）
        logger.warn(`组件${componentName}渲染时间过长`, {
          renderTime,
          renderCount: metricsRef.current.renderCount,
        });
      }

      // 过度渲染警告
      if (metricsRef.current.renderCount > maxRenderThreshold) {
        const timeWindow = 1000; // 1秒窗口
        const recentRenders = renderTimesRef.current.length;
        if (recentRenders >= maxRenderThreshold) {
          logger.warn(`组件${componentName}在短时间内渲染次数过多`, {
            renderCount: recentRenders,
            timeWindow,
          });
        }
      }
    }
  });

  // 内存使用监控
  useEffect(() => {
    if (enableMemoryTracking && 'memory' in performance) {
      const trackMemory = () => {
        const memory = (performance as any).memory;
        metricsRef.current.memoryUsage = memory.usedJSHeapSize;

        // 内存泄漏检测
        if (memory.usedJSHeapSize > 100 * 1024 * 1024) {
          // 100MB
          logger.warn(`组件${componentName}可能存在内存泄漏`, {
            memoryUsage: memory.usedJSHeapSize,
            totalMemory: memory.totalJSHeapSize,
          });
        }
      };

      const intervalId = setInterval(trackMemory, 5000); // 每5秒检查一次
      cleanupFunctionsRef.current.push(() => clearInterval(intervalId));

      return () => clearInterval(intervalId);
    }
  }, [enableMemoryTracking, componentName]);

  // 防抖的更新函数
  const debouncedUpdate = useDebounce((callback: () => void) => {
    callback();
  }, debounceTime);

  // 优化的回调函数创建器
  const createOptimizedCallback = useCallback(
    <T extends (...args: any[]) => any>(
      callback: T,
      deps: React.DependencyList = []
    ): T => {
      const memoizedCallback = useCallback(callback, deps);

      return useCallback(
        (...args: Parameters<T>) => {
          debouncedUpdate(() => {
            memoizedCallback(...args);
          });
        },
        [memoizedCallback, debouncedUpdate]
      ) as T;
    },
    [debouncedUpdate]
  );

  // 优化的状态更新器
  const createOptimizedSetter = useCallback(
    <T>(setter: React.Dispatch<React.SetStateAction<T>>) => {
      return createOptimizedCallback(setter, [setter]);
    },
    [createOptimizedCallback]
  );

  // 内存清理函数
  const registerCleanup = useCallback((cleanupFn: () => void) => {
    cleanupFunctionsRef.current.push(cleanupFn);
  }, []);

  // 获取性能指标
  const getMetrics = useCallback((): PerformanceMetrics => {
    return { ...metricsRef.current };
  }, []);

  // 重置指标
  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      componentName,
    };
    renderTimesRef.current = [];
  }, [componentName]);

  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          logger.error(`清理函数执行失败: ${componentName}`, error);
        }
      });
      cleanupFunctionsRef.current = [];
    };
  }, [componentName]);

  // 优化的 useMemo 包装器
  const optimizedMemo = useCallback(
    <T>(factory: () => T, deps: React.DependencyList = []): T => {
      return useMemo(() => {
        const startTime = performance.now();
        const result = factory();
        const endTime = performance.now();

        if (endTime - startTime > 5) {
          logger.warn(`${componentName} memo计算时间过长`, {
            duration: endTime - startTime,
          });
        }

        return result;
      }, deps);
    },
    [componentName]
  );

  return {
    createOptimizedCallback,
    createOptimizedSetter,
    registerCleanup,
    getMetrics,
    resetMetrics,
    optimizedMemo,
    debouncedUpdate,
  };
};
