/**
 * 文件级注释：组件渲染优化系统
 * 提供组件渲染性能优化、重渲染控制和性能监控功能
 * 专门解决 EnhancedSkillSystem 等复杂组件的渲染性能问题
 */

import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('render-optimizer');

/**
 * 渲染性能指标接口
 */
export interface RenderMetrics {
  componentName: string;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
  propsChanges: number;
  stateChanges: number;
  timestamp: number;
}

/**
 * 渲染优化配置接口
 */
export interface RenderOptimizationConfig {
  enableProfiling: boolean;
  enableMemoization: boolean;
  enableVirtualization: boolean;
  debounceDelay: number;
  throttleDelay: number;
  maxRenderTime: number;
  warningThreshold: number;
}

/**
 * 组件渲染优化器类
 */
class ComponentRenderOptimizer {
  private static instance: ComponentRenderOptimizer;
  private renderMetrics: Map<string, RenderMetrics> = new Map();
  private config: RenderOptimizationConfig = {
    enableProfiling: true,
    enableMemoization: true,
    enableVirtualization: false,
    debounceDelay: 300,
    throttleDelay: 100,
    maxRenderTime: 16, // 60fps
    warningThreshold: 10
  };

  private constructor() {}

  /**
   * 获取单例实例
   */
  public static getInstance(): ComponentRenderOptimizer {
    if (!ComponentRenderOptimizer.instance) {
      ComponentRenderOptimizer.instance = new ComponentRenderOptimizer();
    }
    return ComponentRenderOptimizer.instance;
  }

  /**
   * 记录渲染开始
   */
  public startRender(componentName: string): number {
    if (!this.config.enableProfiling) return 0;
    return performance.now();
  }

  /**
   * 记录渲染结束
   */
  public endRender(componentName: string, startTime: number, propsChanged = false, stateChanged = false): void {
    if (!this.config.enableProfiling || startTime === 0) return;

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    let metrics = this.renderMetrics.get(componentName);
    if (!metrics) {
      metrics = {
        componentName,
        renderCount: 0,
        averageRenderTime: 0,
        lastRenderTime: 0,
        totalRenderTime: 0,
        propsChanges: 0,
        stateChanges: 0,
        timestamp: Date.now()
      };
      this.renderMetrics.set(componentName, metrics);
    }

    metrics.renderCount++;
    metrics.lastRenderTime = renderTime;
    metrics.totalRenderTime += renderTime;
    metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;
    metrics.timestamp = Date.now();

    if (propsChanged) metrics.propsChanges++;
    if (stateChanged) metrics.stateChanges++;

    // 性能警告
    if (renderTime > this.config.maxRenderTime) {
      logger.warn('组件渲染时间过长', {
        componentName,
        renderTime,
        threshold: this.config.maxRenderTime
      });
    }

    if (metrics.renderCount > this.config.warningThreshold && 
        metrics.averageRenderTime > this.config.maxRenderTime) {
      logger.warn('组件平均渲染时间过长', {
        componentName,
        averageRenderTime: metrics.averageRenderTime,
        renderCount: metrics.renderCount
      });
    }

    logger.debug('组件渲染完成', {
      componentName,
      renderTime,
      renderCount: metrics.renderCount,
      averageRenderTime: metrics.averageRenderTime
    });
  }

  /**
   * 获取渲染指标
   */
  public getMetrics(componentName?: string): RenderMetrics[] {
    if (componentName) {
      const metrics = this.renderMetrics.get(componentName);
      return metrics ? [metrics] : [];
    }
    return Array.from(this.renderMetrics.values());
  }

  /**
   * 清除指标
   */
  public clearMetrics(componentName?: string): void {
    if (componentName) {
      this.renderMetrics.delete(componentName);
    } else {
      this.renderMetrics.clear();
    }
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<RenderOptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('渲染优化配置已更新', this.config);
  }

  /**
   * 获取配置
   */
  public getConfig(): RenderOptimizationConfig {
    return { ...this.config };
  }
}

// 导出单例实例
export const renderOptimizer = ComponentRenderOptimizer.getInstance();

/**
 * 渲染性能监控 Hook
 */
export function useRenderProfiler(componentName: string) {
  const renderStartTime = useRef<number>(0);
  const previousProps = useRef<any>(null);
  const previousState = useRef<any>(null);

  const startRender = useCallback(() => {
    renderStartTime.current = renderOptimizer.startRender(componentName);
  }, [componentName]);

  const endRender = useCallback((props?: any, state?: any) => {
    const propsChanged = previousProps.current !== null && 
                        JSON.stringify(previousProps.current) !== JSON.stringify(props);
    const stateChanged = previousState.current !== null && 
                        JSON.stringify(previousState.current) !== JSON.stringify(state);

    renderOptimizer.endRender(componentName, renderStartTime.current, propsChanged, stateChanged);

    previousProps.current = props;
    previousState.current = state;
  }, [componentName]);

  // 自动开始渲染计时
  useEffect(() => {
    startRender();
  });

  return { startRender, endRender };
}

/**
 * 优化的 memo Hook
 */
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList | undefined,
  componentName?: string
): T {
  const memoizedValue = useMemo(() => {
    const startTime = performance.now();
    const result = factory();
    const endTime = performance.now();
    
    if (componentName) {
      logger.debug('Memo 计算完成', {
        componentName,
        computeTime: endTime - startTime,
        depsLength: deps?.length || 0
      });
    }
    
    return result;
  }, deps);

  return memoizedValue;
}

/**
 * 优化的 callback Hook
 */
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  componentName?: string
): T {
  return useCallback((...args: Parameters<T>) => {
    const startTime = performance.now();
    const result = callback(...args);
    const endTime = performance.now();
    
    if (componentName) {
      logger.debug('Callback 执行完成', {
        componentName,
        executeTime: endTime - startTime,
        argsLength: args.length
      });
    }
    
    return result;
  }, deps) as T;
}

/**
 * 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 节流 Hook
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastExecuted.current + delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - (now - lastExecuted.current));

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return throttledValue;
}

/**
 * 虚拟化列表 Hook
 */
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, index) => ({
      item,
      index: visibleRange.startIndex + index
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
}

/**
 * 懒加载 Hook
 */
export function useLazyLoading<T>(
  loadFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      const result = await loadFunction();
      
      if (mounted.current) {
        setData(result);
      }
    } catch (err) {
      if (mounted.current) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [loadFunction, loading]);

  useEffect(() => {
    load();
  }, dependencies);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return { data, loading, error, reload: load };
}

/**
 * 性能监控 Hook
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const mountTime = useRef(Date.now());
  const lastRenderTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current++;
    const now = Date.now();
    const timeSinceMount = now - mountTime.current;
    const timeSinceLastRender = now - lastRenderTime.current;
    
    logger.debug('组件性能监控', {
      componentName,
      renderCount: renderCount.current,
      timeSinceMount,
      timeSinceLastRender
    });
    
    lastRenderTime.current = now;
  });

  const getPerformanceInfo = useCallback(() => {
    const now = Date.now();
    return {
      componentName,
      renderCount: renderCount.current,
      mountTime: mountTime.current,
      timeSinceMount: now - mountTime.current,
      timeSinceLastRender: now - lastRenderTime.current
    };
  }, [componentName]);

  return { getPerformanceInfo };
}

/**
 * 渲染优化 HOC
 */
export function withRenderOptimization<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  const OptimizedComponent = React.memo((props: P) => {
    const name = componentName || Component.displayName || Component.name || 'Unknown';
    const { startRender, endRender } = useRenderProfiler(name);
    
    useEffect(() => {
      endRender(props);
    });

    return React.createElement(Component, props);
  });

  OptimizedComponent.displayName = `withRenderOptimization(${componentName || Component.displayName || Component.name})`;
  
  return OptimizedComponent;
}

/**
 * 深度比较 Hook
 */
export function useDeepCompareMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T }>();

  if (!ref.current || !deepEqual(deps, ref.current.deps)) {
    ref.current = {
      deps,
      value: factory()
    };
  }

  return ref.current.value;
}

/**
 * 深度比较函数
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  
  return false;
}

/**
 * 批量状态更新 Hook
 */
export function useBatchedState<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const pendingUpdates = useRef<Array<(prevState: T) => T>>([]);
  const updateScheduled = useRef(false);

  const batchedSetState = useCallback((updater: (prevState: T) => T) => {
    pendingUpdates.current.push(updater);
    
    if (!updateScheduled.current) {
      updateScheduled.current = true;
      
      // 使用 requestAnimationFrame 批量更新
      requestAnimationFrame(() => {
        setState(prevState => {
          let newState = prevState;
          for (const update of pendingUpdates.current) {
            newState = update(newState);
          }
          return newState;
        });
        
        pendingUpdates.current = [];
        updateScheduled.current = false;
      });
    }
  }, []);

  return [state, batchedSetState] as const;
}