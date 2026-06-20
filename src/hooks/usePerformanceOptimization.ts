import { useCallback, useMemo, useRef, useEffect } from 'react';
import { PerformanceMonitor, RenderCounter } from '@/lib/debugUtils';
import { createLogger } from '@/lib/logger';

const logger = createLogger('performance-optimization');

/**
 * 性能优化 Hook
 */
export const usePerformanceOptimization = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current = RenderCounter.increment(componentName);
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    if (timeSinceLastRender < 16 && renderCountRef.current > 1) {
      logger.warn(`组件 ${componentName} 渲染频率过高`, {
        componentName,
        timeSinceLastRender,
        renderCount: renderCountRef.current
      });
    }
    
    lastRenderTime.current = currentTime;
  });

  return {
    renderCount: renderCountRef.current,
    measurePerformance: useCallback((label: string, fn: () => any) => {
      return PerformanceMonitor.measure(`${componentName}-${label}`, fn);
    }, [componentName]),
    measurePerformanceAsync: useCallback(async (label: string, fn: () => Promise<any>) => {
      return PerformanceMonitor.measureAsync(`${componentName}-${label}`, fn);
    }, [componentName])
  };
};

/**
 * 防抖 Hook - 优化版本
 */
export const useOptimizedDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T => {
  const timeoutRef = useRef<ReturnType<typeof setInterval>>();
  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  });

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        latestCallback.current(...args);
      }, delay);
    }) as T,
    [delay, ...deps]
  );
};

/**
 * 节流 Hook - 优化版本
 */
export const useOptimizedThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T => {
  const throttleRef = useRef(false);
  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  });

  return useCallback(
    ((...args: Parameters<T>) => {
      if (throttleRef.current) return;
      
      throttleRef.current = true;
      latestCallback.current(...args);
      
      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }) as T,
    [delay, ...deps]
  );
};

/**
 * 稳定引用 Hook - 防止不必要的重新渲染
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  return useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    []
  );
};

/**
 * 深度比较 memo - 用于复杂对象的记忆化
 */
export const useDeepMemo = <T>(factory: () => T, deps: React.DependencyList): T => {
  const ref = useRef<{ deps: React.DependencyList; value: T }>();

  if (!ref.current || !deepEqual(deps, ref.current.deps)) {
    ref.current = {
      deps: [...deps],
      value: factory()
    };
  }

  return ref.current.value;
};

// 简单的深度比较函数
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}