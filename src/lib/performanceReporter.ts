import { createLogger } from './logger';

const logger = createLogger('performance-reporter');

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  context?: Record<string, unknown>;
}

interface ComponentRenderMetric {
  componentName: string;
  renderTime: number;
  renderCount: number;
  propsChanges: number;
}

class PerformanceReporter {
  private metrics: PerformanceMetric[] = [];
  private renderMetrics = new Map<string, ComponentRenderMetric>();
  private vitalsReported = false;

  // 记录性能指标
  recordMetric(
    name: string,
    value: number,
    unit: string = 'ms',
    context?: Record<string, unknown>
  ) {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      context,
    };

    this.metrics.push(metric);

    // 保持最近1000个指标
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // 记录到日志
    logger.info(`性能指标: ${name}`, {
      value,
      unit,
      context,
    });

    // 检查是否需要警告
    this.checkPerformanceThresholds(metric);
  }

  // 记录组件渲染性能
  recordComponentRender(
    componentName: string,
    renderTime: number,
    propsChanged: boolean = false
  ) {
    const existing = this.renderMetrics.get(componentName) || {
      componentName,
      renderTime: 0,
      renderCount: 0,
      propsChanges: 0,
    };

    const updated: ComponentRenderMetric = {
      ...existing,
      renderTime: (existing.renderTime + renderTime) / 2, // 平均渲染时间
      renderCount: existing.renderCount + 1,
      propsChanges: existing.propsChanges + (propsChanged ? 1 : 0),
    };

    this.renderMetrics.set(componentName, updated);

    // 检查渲染性能
    if (updated.renderCount % 10 === 0 && updated.renderTime > 16) {
      logger.warn(`组件渲染性能警告: ${componentName}`, {
        averageRenderTime: updated.renderTime,
        renderCount: updated.renderCount,
        propsChanges: updated.propsChanges,
      });
    }
  }

  // 记录Web Vitals
  recordWebVitals() {
    if (this.vitalsReported || typeof window === 'undefined') return;

    // 使用Performance Observer API
    if ('PerformanceObserver' in window) {
      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            this.recordMetric(
              'FID',
              fidEntry.processingStart - fidEntry.startTime,
              'ms'
            );
          }
        }
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // 浏览器可能不支持
      }

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.recordMetric('LCP', lastEntry.startTime, 'ms');
        }
      });

      try {
        lcpObserver.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        });
      } catch (e) {
        // 浏览器可能不支持
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as LayoutShift;
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
          }
        }
        this.recordMetric('CLS', clsValue, 'score');
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // 浏览器可能不支持
      }
    }

    // 使用Navigation Timing API记录其他指标
    window.addEventListener('load', () => {
      setTimeout(() => {
        const nav = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (nav) {
          this.recordMetric('TTFB', nav.responseStart - nav.requestStart, 'ms');
          this.recordMetric(
            'DOM_READY',
            nav.domContentLoadedEventEnd - nav.fetchStart,
            'ms'
          );
          this.recordMetric(
            'LOAD_COMPLETE',
            nav.loadEventEnd - nav.fetchStart,
            'ms'
          );
        }
      }, 0);
    });

    this.vitalsReported = true;
  }

  // 检查性能阈值
  private checkPerformanceThresholds(metric: PerformanceMetric) {
    const thresholds: Record<string, number> = {
      LCP: 2500, // ms
      FID: 100, // ms
      CLS: 0.1, // score
      TTFB: 800, // ms
      component_render: 16, // ms (60fps)
      api_request: 2000, // ms
      database_query: 1000, // ms
    };

    const threshold = thresholds[metric.name];
    if (threshold && metric.value > threshold) {
      logger.warn(`性能阈值超标: ${metric.name}`, {
        value: metric.value,
        threshold,
        unit: metric.unit,
        context: metric.context,
      });
    }
  }

  // 获取性能报告
  getPerformanceReport() {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => now - m.timestamp < 5 * 60 * 1000
    ); // 最近5分钟

    // 按类型分组统计
    const metricsByType = recentMetrics.reduce(
      (acc, metric) => {
        if (!acc[metric.name]) {
          acc[metric.name] = [];
        }
        acc[metric.name].push(metric.value);
        return acc;
      },
      {} as Record<string, number[]>
    );

    // 计算统计信息
    const statistics = Object.entries(metricsByType).map(([name, values]) => ({
      name,
      count: values.length,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      p95: this.percentile(values, 95),
    }));

    return {
      statistics,
      componentMetrics: Array.from(this.renderMetrics.values()),
      totalMetrics: this.metrics.length,
      timeRange:
        recentMetrics.length > 0
          ? {
              start: Math.min(...recentMetrics.map(m => m.timestamp)),
              end: Math.max(...recentMetrics.map(m => m.timestamp)),
            }
          : null,
    };
  }

  // 计算百分位数
  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index] || 0;
  }

  // 清理旧数据
  cleanup() {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24小时前
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);

    logger.info('性能数据清理完成', {
      remainingMetrics: this.metrics.length,
    });
  }
}

// 全局实例
export const performanceReporter = new PerformanceReporter();

// 自动记录Web Vitals
if (typeof window !== 'undefined') {
  performanceReporter.recordWebVitals();

  // 定期清理数据
  setInterval(
    () => {
      performanceReporter.cleanup();
    },
    60 * 60 * 1000
  ); // 每小时清理一次
}
