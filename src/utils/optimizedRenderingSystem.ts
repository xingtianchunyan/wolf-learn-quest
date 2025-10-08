import { createLogger  } from '@/lib/logger';
import { useCallback, useMemo, useRef, useEffect, useState  } from 'react';

/**
* 文件级注释：优化的组件渲染系统
* 提供高性能的组件渲染优化、内存管理和性能监控功能
* 解决 EnhancedSkillSystem 组件渲染问题和内存泄漏
 */

const logger = createLogger('rendering-optimization');

/**
* 渲染性能指标接口
 */
export interface RenderingMetrics { renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
  memoryUsage: number;
  componentName: string;
  timestamp: number;,
}

/**
* 渲染优化配置接口
 */
export interface RenderingConfig { enableProfiling: boolean;
  enableMemoryTracking: boolean;
  enableRenderOptimization: boolean;
  maxRenderTime: number;
  maxRenderCount: number;
  memoryThreshold: number;
  debounceDelay: number;,
}

/**
* 组件渲染状态接口
 */
export interface ComponentRenderState { isRendering: boolean;
  renderStartTime: number;
  renderCount: number;
  lastProps: any;
  lastState: any;
  shouldUpdate: boolean;,
}

/**
* 优化的渲染系统类
 */
class OptimizedRenderingSystem { private static instance: OptimizedRenderingSystem;
  private renderingMetrics: Map<string, RenderingMetrics> = new Map();
  private componentStates: Map<string, ComponentRenderState> = new Map();
  private config: RenderingConfig = {
    enableProfiling: true,
    enableMemoryTracking: true,
    enableRenderOptimization: true,
    maxRenderTime: 16, // 60fps 目标
    maxRenderCount: 100,
    memoryThreshold: 50 * 1024 * 1024, // 50MB
    debounceDelay: 100,
};
  private performanceObserver?: PerformanceObserver;

  private constructor() { this.initializePerformanceMonitoring();,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): OptimizedRenderingSystem { if (!OptimizedRenderingSystem.instance) {
      OptimizedRenderingSystem.instance = new OptimizedRenderingSystem();,
}
    return OptimizedRenderingSystem.instance;,
}

  /**
  * 初始化性能监控
   */
  private initializePerformanceMonitoring(): void { if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        this.performanceObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.entryType === 'measure' && entry.name.startsWith('react-render-')) {
              this.recordRenderMetric(entry.name, entry.duration);,
}
          });,
});

        this.performanceObserver.observe({ entryTypes: ['measure']  });,
} catch (error) { logger.warn('性能监控初始化失败', error);,
}
    },
}

  /**
  * 记录渲染指标
   */
  private recordRenderMetric(componentName: string, renderTime: number): void { const existing = this.renderingMetrics.get(componentName);
    const memoryUsage = this.getMemoryUsage();

    const metrics: RenderingMetrics = {
      renderCount: (existing?.renderCount || 0) + 1,
      averageRenderTime: existing
      ? (existing.averageRenderTime * existing.renderCount + renderTime) / (existing.renderCount + 1)
      : renderTime,
      lastRenderTime: renderTime,
      totalRenderTime: (existing?.totalRenderTime || 0) + renderTime,
      memoryUsage,
      componentName,
      timestamp: Date.now(),
};

    this.renderingMetrics.set(componentName, metrics);

    // 检查性能警告
    this.checkPerformanceWarnings(metrics);,
}

  /**
  * 检查性能警告
   */
  private checkPerformanceWarnings(metrics: RenderingMetrics): void { // 渲染时间过长警告
    if (metrics.lastRenderTime > this.config.maxRenderTime) {
      logger.warn('组件渲染时间过长', {
        component: metrics.componentName,
        renderTime: metrics.lastRenderTime,
        threshold: this.config.maxRenderTime,
});,
}

    // 渲染次数过多警告
    if (metrics.renderCount > this.config.maxRenderCount) { logger.warn('组件渲染次数过多', {
        component: metrics.componentName,
        renderCount: metrics.renderCount,
        threshold: this.config.maxRenderCount,
});,
}

    // 内存使用过高警告
    if (metrics.memoryUsage > this.config.memoryThreshold) { logger.warn('组件内存使用过高', {
        component: metrics.componentName,
        memoryUsage: metrics.memoryUsage,
        threshold: this.config.memoryThreshold,
});,
}
  }

  /**
  * 获取内存使用情况
   */
  private getMemoryUsage(): number { if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      return (window.performance as any).memory.usedJSHeapSize;,
}
    return 0;,
}

  /**
  * 获取渲染指标
   */
  public getRenderingMetrics(componentName?: string): RenderingMetrics | Map<string, RenderingMetrics> { if (componentName) {
      return this.renderingMetrics.get(componentName) || {
        renderCount: 0,
        averageRenderTime: 0,
        lastRenderTime: 0,
        totalRenderTime: 0,
        memoryUsage: 0,
        componentName,
        timestamp: Date.now(),
};,
}
    return new Map(this.renderingMetrics);,
}

  /**
  * 清除渲染指标
   */
  public clearRenderingMetrics(componentName?: string): void { if (componentName) {
      this.renderingMetrics.delete(componentName);
      this.componentStates.delete(componentName);,
} else { this.renderingMetrics.clear();
      this.componentStates.clear();,
}
  }

  /**
  * 更新配置
   */
  public updateConfig(newConfig: Partial<RenderingConfig>): void { this.config = { ...this.config, ...newConfig  };
    logger.info('渲染优化配置已更新', this.config);,
}

  /**
  * 获取配置
   */
  public getConfig(): RenderingConfig { return { ...this.config  };,
}

  /**
  * 销毁实例
   */
  public destroy(): void { if (this.performanceObserver) {
      this.performanceObserver.disconnect();,
}
    this.renderingMetrics.clear();
    this.componentStates.clear();,
}
}

// 导出单例实例
export const optimizedRenderingSystem = OptimizedRenderingSystem.getInstance();

/**
* 优化的渲染 Hook
 */
export function useOptimizedRendering(componentName: string, dependencies: any[] = []) { const renderStartTimeRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  const lastDependenciesRef = useRef<any[]>([]);

  // 开始渲染计时
  const startRenderTiming = useCallback(() => {
    if (optimizedRenderingSystem.getConfig().enableProfiling) {
      renderStartTimeRef.current = performance.now();
      renderCountRef.current += 1;,
}
  }, []);

  // 结束渲染计时
  const endRenderTiming = useCallback(() => { if (optimizedRenderingSystem.getConfig().enableProfiling && renderStartTimeRef.current > 0) {
      const renderTime = performance.now() - renderStartTimeRef.current;
      optimizedRenderingSystem['recordRenderMetric'](componentName, renderTime);
      renderStartTimeRef.current = 0;,
}
  }, [componentName]);

  // 检查是否需要重新渲染
  const shouldUpdate = useMemo(() => { const lastDeps = lastDependenciesRef.current;
    const hasChanged = dependencies.length !== lastDeps.length ||;
    dependencies.some((dep, index) => dep !== lastDeps[index]);

    lastDependenciesRef.current = [...dependencies];
    return hasChanged;,
}, dependencies);

  // 在每次渲染时记录指标
  useEffect(() => { startRenderTiming();
    return () => {
      endRenderTiming();,
};,
});

  // 组件卸载时清理
  useEffect(() => { return () => {
      optimizedRenderingSystem.clearRenderingMetrics(componentName);,
};,
}, [componentName]);

  return { shouldUpdate,
    renderCount: renderCountRef.current,
    startRenderTiming,
    endRenderTiming,
};,
}

/**
* 优化的 useMemo Hook
 */
export function useOptimizedMemo<T>(factory: () => T,
  deps: React.DependencyList,
  componentName?: string
): T { const memoStartTime = useRef<number>(0);

  return useMemo(() => {
    if (componentName && optimizedRenderingSystem.getConfig().enableProfiling) {
      memoStartTime.current = performance.now();,
}

    const result = factory();

    if (componentName && optimizedRenderingSystem.getConfig().enableProfiling && memoStartTime.current > 0) { const memoTime = performance.now() - memoStartTime.current;
      logger.debug('useMemo 执行时间', {
        component: componentName,
        memoTime,
        deps: deps.length,
});,
}

    return result;,
}, deps);,
}

/**
* 优化的 useCallback Hook
 */
export function useOptimizedCallback<T extends (...args: any[]) => any>(;
  callback: T,
  deps: React.DependencyList,
  componentName?: string
): T { const callbackStartTime = useRef<number>(0);

  return useCallback((...args: Parameters<T>) => {
    if (componentName && optimizedRenderingSystem.getConfig().enableProfiling) {
      callbackStartTime.current = performance.now();,
}

    const result = callback(...args);

    if (componentName && optimizedRenderingSystem.getConfig().enableProfiling && callbackStartTime.current > 0) { const callbackTime = performance.now() - callbackStartTime.current;
      logger.debug('useCallback 执行时间', {
        component: componentName,
        callbackTime,
        args: args.length,
});,
}

    return result;,
}, deps) as T;,
}

/**
* 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number): T { const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);,
}, delay);

    return () => { clearTimeout(handler);,
};,
}, [value, delay]);

  return debouncedValue;,
}

/**
* 节流 Hook
 */
export function useThrottle<T>(value: T, limit: number): T { const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();,
}
    }, limit - (Date.now() - lastRan.current));

    return () => { clearTimeout(handler);,
};,
}, [value, limit]);

  return throttledValue;,
}

/**
* 虚拟化列表 Hook
 */
export function useVirtualization(
  items: any[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5;
) { const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(;
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );

    return {
      start: Math.max(0, start - overscan),
      end,
};,
}, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => { return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index,
}));,
}, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return { visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
};,
}

/**
* 懒加载 Hook
 */
export function useLazyLoading<T>(loadFunction: () => Promise<T>,
  dependencies: any[] = [];
) { const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await loadFunction();
      setData(result);,
} catch (err) { setError(err instanceof Error ? err : new Error('Unknown error'));,
} finally { setLoading(false);,
}
  }, dependencies);

  useEffect(() => { load();,
}, [load]);

  return { data, loading, error, reload: load  };,
}

/**
* 性能监控 Hook
 */
export function usePerformanceMonitor(componentName: string) { const metrics = optimizedRenderingSystem.getRenderingMetrics(componentName) as RenderingMetrics;

  const [performanceData, setPerformanceData] = useState({
    renderCount: 0,
    averageRenderTime: 0,
    memoryUsage: 0,
});

  useEffect(() => { const interval = setInterval(() => {
      const currentMetrics = optimizedRenderingSystem.getRenderingMetrics(componentName) as RenderingMetrics;
      setPerformanceData({
        renderCount: currentMetrics.renderCount,
        averageRenderTime: currentMetrics.averageRenderTime,
        memoryUsage: currentMetrics.memoryUsage,
});,
}, 1000);

    return () => clearInterval(interval);,
}, [componentName]);

  return performanceData;,
}