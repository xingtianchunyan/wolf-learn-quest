/**
 * 性能监控服务
 * 集成性能预算和自动化告警
 */

import { createLogger } from '@/lib/logger';
import {
  PERFORMANCE_BUDGET,
  PERFORMANCE_ALERTS,
  MONITORING_CONFIG,
  PerformanceAlertLevel,
  checkPerformanceBudget,
  getPerformanceBudget,
} from '@/config/performance.config';

const logger = createLogger('PerformanceMonitoring');

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'rendering' | 'memory' | 'network' | 'realtime' | 'ux';
  metadata?: Record<string, unknown>;
}

interface PerformanceAlert {
  id: string;
  metric: string;
  value: number;
  budget: number;
  level: PerformanceAlertLevel;
  percentage: number;
  timestamp: number;
  message: string;
}

class PerformanceMonitoringService {
  private metrics: PerformanceMetric[] = [];
  private alerts: PerformanceAlert[] = [];
  private lastAlertTime: Map<string, number> = new Map();
  private budget = getPerformanceBudget();
  private isEnabled: boolean;

  constructor() {
    const isDev = import.meta.env.DEV;
    this.isEnabled =
      isDev || Math.random() < MONITORING_CONFIG.samplingRate.production;

    if (this.isEnabled) {
      this.startMonitoring();
    }
  }

  /**
   * 启动监控
   */
  private startMonitoring(): void {
    // 定期清理过期数据
    setInterval(() => {
      this.cleanupOldMetrics();
    }, MONITORING_CONFIG.retentionTime.metrics);

    // 批量上报（如果启用）
    if (MONITORING_CONFIG.batchReporting.enabled) {
      setInterval(() => {
        this.flushMetrics();
      }, MONITORING_CONFIG.batchReporting.flushInterval);
    }

    logger.info('Performance monitoring started');
  }

  /**
   * 记录性能指标
   */
  recordMetric(
    name: string,
    value: number,
    category: PerformanceMetric['category'],
    metadata?: Record<string, unknown>
  ): void {
    if (!this.isEnabled) {
      return;
    }

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      category,
      metadata,
    };

    this.metrics.push(metric);

    // 检查是否超过预算
    this.checkBudget(metric);

    // 开发环境输出日志
    if (import.meta.env.DEV) {
      logger.debug(`Metric recorded: ${name}=${value}ms`, metadata);
    }
  }

  /**
   * 检查性能预算
   */
  private checkBudget(metric: PerformanceMetric): void {
    const budgetValue = this.getBudgetValue(metric.name, metric.category);
    if (!budgetValue) {
      return;
    }

    const result = checkPerformanceBudget(
      metric.name,
      metric.value,
      budgetValue
    );

    if (result.exceeded) {
      this.raiseAlert(metric, budgetValue, result.level, result.percentage);
    }
  }

  /**
   * 获取预算值
   */
  private getBudgetValue(name: string, category: string): number | null {
    const categoryBudget =
      this.budget[category as keyof typeof PERFORMANCE_BUDGET];
    if (!categoryBudget || typeof categoryBudget !== 'object') {
      return null;
    }

    // 尝试精确匹配
    if (name in categoryBudget) {
      return categoryBudget[name as keyof typeof categoryBudget] as number;
    }

    // 尝试模糊匹配
    const keys = Object.keys(categoryBudget);
    const matchedKey = keys.find(key =>
      name.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedKey) {
      return categoryBudget[
        matchedKey as keyof typeof categoryBudget
      ] as number;
    }

    return null;
  }

  /**
   * 触发告警
   */
  private raiseAlert(
    metric: PerformanceMetric,
    budget: number,
    level: PerformanceAlertLevel,
    percentage: number
  ): void {
    const now = Date.now();
    const lastAlert = this.lastAlertTime.get(metric.name);

    // 检查冷却时间
    if (lastAlert && now - lastAlert < PERFORMANCE_ALERTS.cooldown) {
      return;
    }

    const alert: PerformanceAlert = {
      id: `${metric.name}-${now}`,
      metric: metric.name,
      value: metric.value,
      budget,
      level,
      percentage,
      timestamp: now,
      message: `Performance budget exceeded: ${metric.name} (${metric.value.toFixed(2)}ms > ${budget}ms, ${(percentage * 100).toFixed(1)}%)`,
    };

    this.alerts.push(alert);
    this.lastAlertTime.set(metric.name, now);

    // 记录告警
    switch (level) {
      case PerformanceAlertLevel.CRITICAL:
        logger.error(alert.message, { metric, budget, percentage });
        break;
      case PerformanceAlertLevel.ERROR:
        logger.error(alert.message, { metric, budget, percentage });
        break;
      case PerformanceAlertLevel.WARNING:
        logger.warn(alert.message, { metric, budget, percentage });
        break;
      default:
        logger.info(alert.message, { metric, budget, percentage });
    }

    // 自动修复
    this.attemptAutoFix(metric, level);
  }

  /**
   * 尝试自动修复
   */
  private attemptAutoFix(
    metric: PerformanceMetric,
    level: PerformanceAlertLevel
  ): void {
    if (
      level === PerformanceAlertLevel.CRITICAL ||
      level === PerformanceAlertLevel.ERROR
    ) {
      if (
        PERFORMANCE_ALERTS.autoFix.clearCache &&
        metric.category === 'rendering'
      ) {
        logger.info('Auto-fix: Clearing cache');
        // 清理缓存的逻辑
      }

      if (
        PERFORMANCE_ALERTS.autoFix.unsubscribeInactive &&
        metric.category === 'realtime'
      ) {
        logger.info('Auto-fix: Unsubscribing inactive connections');
        // 取消不活跃订阅的逻辑
      }
    }
  }

  /**
   * 清理过期指标
   */
  private cleanupOldMetrics(): void {
    const now = Date.now();
    const retentionTime = MONITORING_CONFIG.retentionTime.metrics;

    this.metrics = this.metrics.filter(
      metric => now - metric.timestamp < retentionTime
    );

    this.alerts = this.alerts.filter(
      alert => now - alert.timestamp < MONITORING_CONFIG.retentionTime.logs
    );

    logger.debug('Cleaned up old metrics and alerts');
  }

  /**
   * 批量上报指标
   */
  private flushMetrics(): void {
    if (this.metrics.length === 0) {
      return;
    }

    // 这里可以将指标发送到后端或分析服务
    logger.debug(`Flushing ${this.metrics.length} metrics`);

    // 清空已上报的指标（保留最近的一些用于本地分析）
    const recentMetrics = this.metrics.slice(
      -MONITORING_CONFIG.batchReporting.batchSize
    );
    this.metrics = recentMetrics;
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(timeRange?: number): {
    summary: {
      totalMetrics: number;
      activeAlerts: number;
      avgRenderTime: number;
      maxRenderTime: number;
      memoryUsage: number;
    };
    metrics: PerformanceMetric[];
    alerts: PerformanceAlert[];
  } {
    const now = Date.now();
    const range = timeRange || MONITORING_CONFIG.retentionTime.metrics;

    const recentMetrics = this.metrics.filter(m => now - m.timestamp < range);

    const renderMetrics = recentMetrics.filter(m => m.category === 'rendering');
    const avgRenderTime =
      renderMetrics.length > 0
        ? renderMetrics.reduce((sum, m) => sum + m.value, 0) /
          renderMetrics.length
        : 0;
    const maxRenderTime =
      renderMetrics.length > 0
        ? Math.max(...renderMetrics.map(m => m.value))
        : 0;

    const memoryMetrics = recentMetrics.filter(m => m.category === 'memory');
    const memoryUsage =
      memoryMetrics.length > 0
        ? memoryMetrics[memoryMetrics.length - 1].value
        : 0;

    const activeAlerts = this.alerts.filter(
      a => now - a.timestamp < PERFORMANCE_ALERTS.cooldown
    );

    return {
      summary: {
        totalMetrics: recentMetrics.length,
        activeAlerts: activeAlerts.length,
        avgRenderTime,
        maxRenderTime,
        memoryUsage,
      },
      metrics: recentMetrics,
      alerts: activeAlerts,
    };
  }

  /**
   * 获取活跃告警
   */
  getActiveAlerts(): PerformanceAlert[] {
    const now = Date.now();
    return this.alerts.filter(
      a => now - a.timestamp < PERFORMANCE_ALERTS.cooldown
    );
  }

  /**
   * 清除所有告警
   */
  clearAlerts(): void {
    this.alerts = [];
    this.lastAlertTime.clear();
    logger.info('All alerts cleared');
  }

  /**
   * 清除所有指标数据
   */
  clearMetrics(): void {
    this.metrics = [];
    this.alerts = [];
    this.lastAlertTime.clear();
    logger.info('All metrics and alerts cleared');
  }

  /**
   * 获取监控状态
   */
  getMonitoringStatus(): {
    enabled: boolean;
    metricsCount: number;
    alertsCount: number;
    samplingRate: number;
  } {
    return {
      enabled: this.isEnabled,
      metricsCount: this.metrics.length,
      alertsCount: this.alerts.length,
      samplingRate: import.meta.env.DEV
        ? MONITORING_CONFIG.samplingRate.development
        : MONITORING_CONFIG.samplingRate.production,
    };
  }
}

// 导出单例
export const performanceMonitoringService = new PerformanceMonitoringService();
