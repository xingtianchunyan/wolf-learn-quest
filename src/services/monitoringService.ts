// 实时性能监控服务
import { createLogger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';

const logger = createLogger('monitoring-service');

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  context?: Record<string, any>;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    responseTime: number;
    errorRate: number;
    activeUsers: number;
    skillUsageRate: number;
    memoryUsage: number;
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
  resolved: boolean;
}

class MonitoringService {
  private metrics: PerformanceMetric[] = [];
  private alerts: Alert[] = [];
  private readonly MAX_METRICS = 1000;
  private readonly ALERT_THRESHOLDS = {
    responseTime: 1000, // 1秒
    errorRate: 0.05, // 5%
    memoryUsage: 100 * 1024 * 1024, // 100MB
    skillUsageRate: 100, // 每秒100次
  };

  /**
   * 记录性能指标
   */
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push({
      ...metric,
      timestamp: Date.now(),
    });

    // 限制存储的指标数量
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // 检查是否需要触发告警
    this.checkThresholds(metric);

    logger.debug('性能指标记录', metric);
  }

  /**
   * 检查指标阈值并触发告警
   */
  private checkThresholds(metric: PerformanceMetric): void {
    let alert: Alert | null = null;

    switch (metric.name) {
      case 'response_time':
        if (metric.value > this.ALERT_THRESHOLDS.responseTime) {
          alert = {
            id: `alert-${Date.now()}`,
            severity:
              metric.value > this.ALERT_THRESHOLDS.responseTime * 2
                ? 'critical'
                : 'warning',
            message: `响应时间过长: ${metric.value}ms`,
            timestamp: Date.now(),
            resolved: false,
          };
        }
        break;

      case 'memory_usage':
        if (metric.value > this.ALERT_THRESHOLDS.memoryUsage) {
          alert = {
            id: `alert-${Date.now()}`,
            severity: 'warning',
            message: `内存使用过高: ${(metric.value / 1024 / 1024).toFixed(2)}MB`,
            timestamp: Date.now(),
            resolved: false,
          };
        }
        break;

      case 'error_rate':
        if (metric.value > this.ALERT_THRESHOLDS.errorRate) {
          alert = {
            id: `alert-${Date.now()}`,
            severity: 'error',
            message: `错误率过高: ${(metric.value * 100).toFixed(2)}%`,
            timestamp: Date.now(),
            resolved: false,
          };
        }
        break;
    }

    if (alert) {
      this.alerts.push(alert);
      logger.warn('触发告警', alert);
    }
  }

  /**
   * 获取系统健康状态
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 60000); // 最近1分钟

    // 计算平均响应时间
    const responseTimeMetrics = recentMetrics.filter(
      m => m.name === 'response_time'
    );
    const avgResponseTime =
      responseTimeMetrics.length > 0
        ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) /
          responseTimeMetrics.length
        : 0;

    // 计算错误率
    const errorMetrics = recentMetrics.filter(m => m.name === 'error');
    const totalRequests = recentMetrics.filter(
      m => m.name === 'request'
    ).length;
    const errorRate =
      totalRequests > 0 ? errorMetrics.length / totalRequests : 0;

    // 获取活跃用户数
    const activeUsers = await this.getActiveUserCount();

    // 计算技能使用率
    const skillUsageMetrics = recentMetrics.filter(
      m => m.name === 'skill_usage'
    );
    const skillUsageRate = skillUsageMetrics.length / 60; // 每秒

    // 获取内存使用
    const memoryMetrics = recentMetrics.filter(m => m.name === 'memory_usage');
    const currentMemory =
      memoryMetrics.length > 0
        ? memoryMetrics[memoryMetrics.length - 1].value
        : 0;

    // 确定系统状态
    let status: SystemHealth['status'] = 'healthy';
    const activeAlerts = this.alerts.filter(a => !a.resolved);

    if (activeAlerts.some(a => a.severity === 'critical')) {
      status = 'critical';
    } else if (
      activeAlerts.some(a => a.severity === 'error' || a.severity === 'warning')
    ) {
      status = 'warning';
    }

    return {
      status,
      metrics: {
        responseTime: avgResponseTime,
        errorRate,
        activeUsers,
        skillUsageRate,
        memoryUsage: currentMemory,
      },
      alerts: activeAlerts,
    };
  }

  /**
   * 获取活跃用户数
   */
  private async getActiveUserCount(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('id')
        .eq('status', 'active');

      if (error) {
        logger.error('获取活跃用户数失败', error);
        return 0;
      }

      return data?.length || 0;
    } catch (error) {
      logger.error('获取活跃用户数异常', error);
      return 0;
    }
  }

  /**
   * 获取指标历史
   */
  getMetrics(options?: {
    name?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }): PerformanceMetric[] {
    let filtered = this.metrics;

    if (options?.name) {
      filtered = filtered.filter(m => m.name === options.name);
    }

    if (options?.startTime) {
      filtered = filtered.filter(m => m.timestamp >= options.startTime!);
    }

    if (options?.endTime) {
      filtered = filtered.filter(m => m.timestamp <= options.endTime!);
    }

    if (options?.limit) {
      filtered = filtered.slice(-options.limit);
    }

    return filtered;
  }

  /**
   * 解决告警
   */
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      logger.info('告警已解决', { alertId });
    }
  }

  /**
   * 清理旧数据
   */
  cleanup(maxAge: number = 3600000): void {
    const now = Date.now();
    this.metrics = this.metrics.filter(m => now - m.timestamp < maxAge);
    this.alerts = this.alerts.filter(
      a => !a.resolved && now - a.timestamp < maxAge
    );
    logger.debug('清理旧监控数据完成');
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(timeRange: number = 3600000): {
    summary: {
      totalMetrics: number;
      avgResponseTime: number;
      maxResponseTime: number;
      totalErrors: number;
      totalAlerts: number;
    };
    trends: {
      responseTime: number[];
      memoryUsage: number[];
      skillUsage: number[];
    };
  } {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => now - m.timestamp < timeRange
    );

    const responseTimeMetrics = recentMetrics.filter(
      m => m.name === 'response_time'
    );
    const avgResponseTime =
      responseTimeMetrics.length > 0
        ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) /
          responseTimeMetrics.length
        : 0;
    const maxResponseTime =
      responseTimeMetrics.length > 0
        ? Math.max(...responseTimeMetrics.map(m => m.value))
        : 0;

    const errorMetrics = recentMetrics.filter(m => m.name === 'error');
    const alertMetrics = this.alerts.filter(a => now - a.timestamp < timeRange);

    return {
      summary: {
        totalMetrics: recentMetrics.length,
        avgResponseTime,
        maxResponseTime,
        totalErrors: errorMetrics.length,
        totalAlerts: alertMetrics.length,
      },
      trends: {
        responseTime: responseTimeMetrics.map(m => m.value),
        memoryUsage: recentMetrics
          .filter(m => m.name === 'memory_usage')
          .map(m => m.value),
        skillUsage: recentMetrics
          .filter(m => m.name === 'skill_usage')
          .map(m => m.value),
      },
    };
  }
}

export const monitoringService = new MonitoringService();
