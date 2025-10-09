import { analyticsService   } from '@/services/analyticsService';
import { monitoringService   } from '@/services/monitoringService';
import { useEffect, useRef, useCallback   } from 'react';

// 性能监控 Hook

export interface UsePerformanceMonitoringOptions { componentName: string;
  trackUserActions?: boolean;
  trackPerformance?: boolean;
  sampleRate?: number; // 0-1, 采样率 }

/**
 * usePerformanceMonitoring函数
 * 自定义Hook
 *
 * @param options - options参数
 * @returns void
 */
export const usePerformanceMonitoring = (options: UsePerformanceMonitoringOptions) => { const  {
    componentName,
    trackUserActions = true,
    trackPerformance = true,
    sampleRate = 1.0
} = options;

  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(Date.now());
  const lastRenderTimeRef = useRef(Date.now());

  // 决定是否采样
  const shouldSample = useCallback(() => {
  return Math.random() < sampleRate

}, [sampleRate]);

  // 记录组件渲染
  useEffect(() => { if (!trackPerformance || !shouldSample()) return;

    renderCountRef.current++;
    const now = Date.now();
    const renderTime = now - lastRenderTimeRef.current;
    lastRenderTimeRef.current = now;

    if (renderCountRef.current > 1) {
      monitoringService.recordMetric({
        name: 'component_render',
        value: renderTime,
        unit: 'ms',
        timestamp: now,
        context: {
          componentName,
          renderCount: renderCountRef.current 
}
      })
}
  });

  // 记录组件挂载时间
  useEffect(() => { if (!trackPerformance || !shouldSample()) return;

    const mountDuration = Date.now() - mountTimeRef.current;

    monitoringService.recordMetric({
      name: 'component_mount',
      value: mountDuration,
      unit: 'ms',
      timestamp: Date.now(),
      context: {
        componentName }
    });

    // 组件卸载时的清理
    return () => { const lifeDuration = Date.now() - mountTimeRef.current;

      monitoringService.recordMetric({
        name: 'component_unmount',
        value: lifeDuration,
        unit: 'ms',
        timestamp: Date.now(),
        context: {
          componentName,
          totalRenders: renderCountRef.current 
}
      })
}
}, [componentName, trackPerformance, shouldSample]);

  /**
 * 记录用户操作
 */
const trackAction = useCallback((;
    action: string,
    metadata?: Record<string, any>
  ) => { if (!trackUserActions || !shouldSample()) return;

    analyticsService.trackAction({
      userId: metadata?.userId || 'anonymous',
      action,
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        componentName }
    })
}, [componentName, trackUserActions, shouldSample]);

  /**
 * 测量操作性能
 */
const measureOperation = useCallback(async <T>(;
    operationName: string,
    operation: () => Promise<T>;
  ): Promise<T> => { if (!trackPerformance || !shouldSample()) {
      return await operation()
}

    const startTime = Date.now();

    try { const result = await operation();
      const duration = Date.now() - startTime;

      monitoringService.recordMetric({
        name: 'operation_duration',
        value: duration,
        unit: 'ms',
        timestamp: Date.now(),
        context: {
          componentName,
          operationName,
          success: true 
}
      });

      return result
} catch (error) { const duration = Date.now() - startTime;

      monitoringService.recordMetric({
        name: 'operation_duration',
        value: duration,
        unit: 'ms',
        timestamp: Date.now(),
        context: {
          componentName,
          operationName,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error' 
}
      });

      throw error
}
  }, [componentName, trackPerformance, shouldSample]);

  /**
 * 记录错误
 */
const trackError = useCallback((;
    error: Error,
    context?: Record<string, any>
  ) => { if (!shouldSample()) return;

    monitoringService.recordMetric({
      name: 'error',
      value: 1,
      unit: 'count',
      timestamp: Date.now(),
      context: {
        componentName,
        errorMessage: error.message,
        errorStack: error.stack,
        ...context }
    })
}, [componentName, shouldSample]);

  /**
 * 记录网络请求
 */
const trackRequest = useCallback((;
    url: string,
    duration: number,
    success: boolean,
    statusCode?: number
  ) => { if (!trackPerformance || !shouldSample()) return;

    monitoringService.recordMetric({
      name: 'network_request',
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      context: {
        componentName,
        url,
        success,
        statusCode }
    })
}, [componentName, trackPerformance, shouldSample]);

  return { trackAction,
    measureOperation,
    trackError,
    trackRequest,
    renderCount: renderCountRef.current 
}
};
