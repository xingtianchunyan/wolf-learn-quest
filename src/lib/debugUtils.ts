// 调试和开发工具
import { createLogger } from './logger';

const logger = createLogger('debug-utils');

/**
 * 开发环境检查
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * 安全的控制台日志 - 只在开发环境输出
 */
export const devLog = {
  info: (message: string, data?: unknown) => {
    if (isDevelopment()) {
    }
    logger.info(message, data);
  },
  warn: (message: string, data?: unknown) => {
    if (isDevelopment()) {
      console.warn(`[DEV] ${message}`, data || '');
    }
    logger.warn(message, data);
  },
  error: (message: string, data?: unknown) => {
    if (isDevelopment()) {
      console.error(`[DEV] ${message}`, data || '');
    }
    logger.error(message, data);
  },
  debug: (message: string, data?: unknown) => {
    if (isDevelopment()) {
      console.debug(`[DEV] ${message}`, data || '');
    }
    logger.debug(message, data);
  },
};

/**
 * 性能监控工具
 */
export class PerformanceMonitor {
  private static timers = new Map<string, number>();

  static start(label: string): void {
    this.timers.set(label, performance.now());
    if (isDevelopment()) {
      console.time(`[PERF] ${label}`);
    }
  }

  static end(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      devLog.warn(`性能监控: 未找到标签 ${label} 的开始时间`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(label);

    if (isDevelopment()) {
      console.timeEnd(`[PERF] ${label}`);
    }

    logger.info(`性能监控: ${label} 耗时 ${duration.toFixed(2)}ms`);
    return duration;
  }

  static measure<T>(label: string, fn: () => T): T {
    this.start(label);
    try {
      const result = fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  static async measureAsync<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

/**
 * 内存使用监控
 */
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export const getMemoryUsage = (): MemoryInfo | null => {
  if (isDevelopment() && 'memory' in performance) {
    return (performance as unknown as { memory?: MemoryInfo }).memory || null;
  }
  return null;
};

/**
 * 组件渲染次数统计
 */
export class RenderCounter {
  private static counts = new Map<string, number>();

  static increment(componentName: string): number {
    const current = this.counts.get(componentName) || 0;
    const newCount = current + 1;
    this.counts.set(componentName, newCount);

    if (isDevelopment() && newCount % 10 === 0) {
      devLog.warn(`组件 ${componentName} 已渲染 ${newCount} 次`, {
        componentName,
        renderCount: newCount,
      });
    }

    return newCount;
  }

  static getCount(componentName: string): number {
    return this.counts.get(componentName) || 0;
  }

  static getAllCounts(): Record<string, number> {
    return Object.fromEntries(this.counts);
  }

  static reset(componentName?: string): void {
    if (componentName) {
      this.counts.delete(componentName);
    } else {
      this.counts.clear();
    }
  }
}
