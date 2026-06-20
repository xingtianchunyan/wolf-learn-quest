/**
 * 文件级注释：错误监控和报告系统
 * 提供全面的错误追踪、分析和报告功能
 * 支持实时监控、性能分析、错误趋势分析和自动报告
 */

import { createLogger } from '@/lib/logger';
import { UnifiedErrorData, ErrorSeverity } from './unifiedErrorHandler';

const logger = createLogger('error-monitoring-reporting');

/**
 * 错误监控配置接口
 */
export interface ErrorMonitoringConfig {
  /** 是否启用监控 */
  enabled: boolean;
  /** 采样率（0-1） */
  sampleRate: number;
  /** 最大错误历史记录数 */
  maxHistorySize: number;
  /** 报告间隔（毫秒） */
  reportInterval: number;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪 */
  enableUserBehaviorTracking: boolean;
  /** 错误阈值配置 */
  thresholds: {
    /** 错误率阈值（每分钟） */
    errorRatePerMinute: number;
    /** 高严重级别错误阈值 */
    highSeverityThreshold: number;
    /** 内存使用阈值（MB） */
    memoryUsageThreshold: number;
  };
  /** 报告目标 */
  reportTargets: {
    /** 控制台输出 */
    console: boolean;
    /** 本地存储 */
    localStorage: boolean;
    /** 远程服务器 */
    remote?: {
      endpoint: string;
      apiKey?: string;
      batchSize: number;
    };
  };
}

/**
 * 错误统计接口
 */
export interface ErrorStatistics {
  /** 总错误数 */
  totalErrors: number;
  /** 最近一小时错误数 */
  recentErrors: number;
  /** 按严重级别分组 */
  bySeverity: Record<ErrorSeverity, number>;
  /** 按错误类型分组 */
  byType: Record<string, number>;
  /** 按组件分组 */
  byComponent: Record<string, number>;
  /** 错误率（每分钟） */
  errorRate: number;
  /** 平均解决时间 */
  averageResolutionTime: number;
  /** 重复错误统计 */
  duplicateErrors: Array<{
    signature: string;
    count: number;
    lastOccurrence: string;
  }>;
}

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  /** 页面加载时间 */
  pageLoadTime: number;
  /** 首次内容绘制时间 */
  firstContentfulPaint: number;
  /** 最大内容绘制时间 */
  largestContentfulPaint: number;
  /** 累积布局偏移 */
  cumulativeLayoutShift: number;
  /** 首次输入延迟 */
  firstInputDelay: number;
  /** 内存使用情况 */
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  /** JavaScript 执行时间 */
  jsExecutionTime: number;
  /** 网络延迟 */
  networkLatency: number;
}

/**
 * 用户行为事件接口
 */
export interface UserBehaviorEvent {
  /** 事件类型 */
  type:
    | 'click'
    | 'navigation'
    | 'form_submit'
    | 'error_encounter'
    | 'recovery_action';
  /** 事件时间戳 */
  timestamp: string;
  /** 页面URL */
  url: string;
  /** 用户代理 */
  userAgent: string;
  /** 事件详情 */
  details: Record<string, any>;
  /** 会话ID */
  sessionId: string;
}

/**
 * 错误报告接口
 */
export interface ErrorReport {
  /** 报告ID */
  id: string;
  /** 生成时间 */
  generatedAt: string;
  /** 时间范围 */
  timeRange: {
    start: string;
    end: string;
  };
  /** 错误统计 */
  statistics: ErrorStatistics;
  /** 性能指标 */
  performance: PerformanceMetrics;
  /** 用户行为摘要 */
  userBehaviorSummary: {
    totalEvents: number;
    errorEncounters: number;
    recoveryActions: number;
    mostCommonActions: Array<{
      type: string;
      count: number;
    }>;
  };
  /** 关键发现 */
  keyFindings: string[];
  /** 建议措施 */
  recommendations: string[];
  /** 趋势分析 */
  trends: {
    errorRateTrend: 'increasing' | 'decreasing' | 'stable';
    performanceTrend: 'improving' | 'degrading' | 'stable';
    userSatisfactionTrend: 'improving' | 'degrading' | 'stable';
  };
}

/**
 * 错误监控和报告系统类
 */
export class ErrorMonitoringAndReportingSystem {
  private config: ErrorMonitoringConfig;
  private errorHistory: UnifiedErrorData[] = [];
  private performanceHistory: PerformanceMetrics[] = [];
  private userBehaviorHistory: UserBehaviorEvent[] = [];
  private sessionId: string;
  private reportTimer?: ReturnType<typeof setInterval>;
  private performanceObserver?: PerformanceObserver;

  /**
   * 构造函数
   * @param config - 监控配置
   */
  constructor(config: Partial<ErrorMonitoringConfig> = {}) {
    this.config = {
      enabled: true,
      sampleRate: 1.0,
      maxHistorySize: 1000,
      reportInterval: 300000, // 5分钟
      enablePerformanceMonitoring: true,
      enableUserBehaviorTracking: true,
      thresholds: {
        errorRatePerMinute: 10,
        highSeverityThreshold: 5,
        memoryUsageThreshold: 100,
      },
      reportTargets: {
        console: true,
        localStorage: true,
      },
      ...config,
    };

    this.sessionId = this.generateSessionId();

    if (this.config.enabled) {
      this.initialize();
    }
  }

  /**
   * 初始化监控系统
   */
  private initialize(): void {
    logger.info('初始化错误监控和报告系统', {
      sessionId: this.sessionId,
      config: this.config,
    });

    // 启动定期报告
    this.startPeriodicReporting();

    // 启动性能监控
    if (this.config.enablePerformanceMonitoring) {
      this.startPerformanceMonitoring();
    }

    // 启动用户行为追踪
    if (this.config.enableUserBehaviorTracking) {
      this.startUserBehaviorTracking();
    }

    // 监听页面卸载事件，生成最终报告
    window.addEventListener('beforeunload', () => {
      this.generateFinalReport();
    });
  }

  /**
   * 记录错误
   * @param error - 错误数据
   */
  public recordError(error: UnifiedErrorData): void {
    if (!this.config.enabled || !this.shouldSample()) {
      return;
    }

    // 添加到错误历史
    this.errorHistory.unshift(error);

    // 限制历史记录大小
    if (this.errorHistory.length > this.config.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(
        0,
        this.config.maxHistorySize
      );
    }

    // 检查错误阈值
    this.checkErrorThresholds();

    // 记录用户行为事件
    if (this.config.enableUserBehaviorTracking) {
      this.recordUserBehavior({
        type: 'error_encounter',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        details: {
          errorId: error.id,
          severity: error.severity,
          type: error.type,
          component: error.context?.component,
        },
        sessionId: this.sessionId,
      });
    }

    logger.debug('错误已记录', {
      errorId: error.id,
      severity: error.severity,
      historySize: this.errorHistory.length,
    });
  }

  /**
   * 记录用户行为
   * @param event - 用户行为事件
   */
  public recordUserBehavior(event: UserBehaviorEvent): void {
    if (!this.config.enableUserBehaviorTracking) {
      return;
    }

    this.userBehaviorHistory.unshift(event);

    // 限制历史记录大小
    if (this.userBehaviorHistory.length > this.config.maxHistorySize) {
      this.userBehaviorHistory = this.userBehaviorHistory.slice(
        0,
        this.config.maxHistorySize
      );
    }
  }

  /**
   * 获取错误统计
   * @returns 错误统计数据
   */
  public getErrorStatistics(): ErrorStatistics {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneMinuteAgo = now - 60 * 1000;

    const recentErrors = this.errorHistory.filter(
      error => new Date(error.timestamp).getTime() > oneHourAgo
    );

    const recentMinuteErrors = this.errorHistory.filter(
      error => new Date(error.timestamp).getTime() > oneMinuteAgo
    );

    // 按严重级别分组
    const bySeverity = this.errorHistory.reduce(
      (acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      },
      {} as Record<ErrorSeverity, number>
    );

    // 按错误类型分组
    const byType = this.errorHistory.reduce(
      (acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 按组件分组
    const byComponent = this.errorHistory.reduce(
      (acc, error) => {
        const component = error.context?.component || 'Unknown';
        acc[component] = (acc[component] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 计算重复错误
    const duplicateErrors = this.calculateDuplicateErrors();

    return {
      totalErrors: this.errorHistory.length,
      recentErrors: recentErrors.length,
      bySeverity,
      byType,
      byComponent,
      errorRate: recentMinuteErrors.length,
      averageResolutionTime: this.calculateAverageResolutionTime(),
      duplicateErrors,
    };
  }

  /**
   * 获取性能指标
   * @returns 性能指标数据
   */
  public getPerformanceMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    const fcp =
      paint.find(entry => entry.name === 'first-contentful-paint')?.startTime ||
      0;

    // 获取内存使用情况（如果支持）
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo
      ? {
          used: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024),
          percentage: Math.round(
            (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100
          ),
        }
      : { used: 0, total: 0, percentage: 0 };

    return {
      pageLoadTime: navigation
        ? navigation.loadEventEnd - navigation.navigationStart
        : 0,
      firstContentfulPaint: fcp,
      largestContentfulPaint: 0, // 需要通过 PerformanceObserver 获取
      cumulativeLayoutShift: 0, // 需要通过 PerformanceObserver 获取
      firstInputDelay: 0, // 需要通过 PerformanceObserver 获取
      memoryUsage,
      jsExecutionTime: this.calculateJSExecutionTime(),
      networkLatency: this.calculateNetworkLatency(),
    };
  }

  /**
   * 生成错误报告
   * @param timeRange - 时间范围（可选）
   * @returns 错误报告
   */
  public generateReport(timeRange?: { start: Date; end: Date }): ErrorReport {
    const now = new Date();
    const start =
      timeRange?.start || new Date(now.getTime() - 24 * 60 * 60 * 1000); // 默认24小时
    const end = timeRange?.end || now;

    const statistics = this.getErrorStatistics();
    const performance = this.getPerformanceMetrics();
    const userBehaviorSummary = this.generateUserBehaviorSummary();
    const keyFindings = this.generateKeyFindings(statistics, performance);
    const recommendations = this.generateRecommendations(
      statistics,
      performance
    );
    const trends = this.analyzeTrends();

    const report: ErrorReport = {
      id: this.generateReportId(),
      generatedAt: now.toISOString(),
      timeRange: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      statistics,
      performance,
      userBehaviorSummary,
      keyFindings,
      recommendations,
      trends,
    };

    // 保存报告
    this.saveReport(report);

    logger.info('错误报告已生成', {
      reportId: report.id,
      timeRange: report.timeRange,
      totalErrors: statistics.totalErrors,
    });

    return report;
  }

  /**
   * 启动定期报告
   */
  private startPeriodicReporting(): void {
    this.reportTimer = setInterval(() => {
      this.generateReport();
    }, this.config.reportInterval);
  }

  /**
   * 启动性能监控
   */
  private startPerformanceMonitoring(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      this.performanceObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.recordPerformanceEntry(entry);
        });
      });

      this.performanceObserver.observe({
        entryTypes: [
          'navigation',
          'paint',
          'largest-contentful-paint',
          'layout-shift',
          'first-input',
        ],
      });
    }
  }

  /**
   * 启动用户行为追踪
   */
  private startUserBehaviorTracking(): void {
    // 监听点击事件
    document.addEventListener('click', event => {
      this.recordUserBehavior({
        type: 'click',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        details: {
          target: (event.target as Element)?.tagName,
          x: event.clientX,
          y: event.clientY,
        },
        sessionId: this.sessionId,
      });
    });

    // 监听导航事件
    window.addEventListener('popstate', () => {
      this.recordUserBehavior({
        type: 'navigation',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        details: {
          type: 'popstate',
        },
        sessionId: this.sessionId,
      });
    });
  }

  /**
   * 检查错误阈值
   */
  private checkErrorThresholds(): void {
    const statistics = this.getErrorStatistics();
    const performance = this.getPerformanceMetrics();

    // 检查错误率阈值
    if (statistics.errorRate > this.config.thresholds.errorRatePerMinute) {
      logger.warn('错误率超过阈值', {
        current: statistics.errorRate,
        threshold: this.config.thresholds.errorRatePerMinute,
      });
    }

    // 检查高严重级别错误阈值
    const highSeverityErrors = statistics.bySeverity[ErrorSeverity.HIGH] || 0;
    if (highSeverityErrors > this.config.thresholds.highSeverityThreshold) {
      logger.warn('高严重级别错误超过阈值', {
        current: highSeverityErrors,
        threshold: this.config.thresholds.highSeverityThreshold,
      });
    }

    // 检查内存使用阈值
    if (
      performance.memoryUsage.used > this.config.thresholds.memoryUsageThreshold
    ) {
      logger.warn('内存使用超过阈值', {
        current: performance.memoryUsage.used,
        threshold: this.config.thresholds.memoryUsageThreshold,
      });
    }
  }

  /**
   * 是否应该采样
   * @returns 是否采样
   */
  private shouldSample(): boolean {
    return Math.random() < this.config.sampleRate;
  }

  /**
   * 生成会话ID
   * @returns 会话ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成报告ID
   * @returns 报告ID
   */
  private generateReportId(): string {
    return `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 记录性能条目
   * @param entry - 性能条目
   */
  private recordPerformanceEntry(entry: PerformanceEntry): void {
    // 这里可以根据不同类型的性能条目进行处理
    logger.debug('性能条目记录', {
      name: entry.name,
      entryType: entry.entryType,
      startTime: entry.startTime,
      duration: entry.duration,
    });
  }

  /**
   * 计算重复错误
   * @returns 重复错误统计
   */
  private calculateDuplicateErrors(): Array<{
    signature: string;
    count: number;
    lastOccurrence: string;
  }> {
    const errorSignatures = new Map<
      string,
      { count: number; lastOccurrence: string }
    >();

    this.errorHistory.forEach(error => {
      const signature = `${error.type}_${error.message}_${error.context?.component}`;
      const existing = errorSignatures.get(signature);

      if (existing) {
        existing.count++;
        existing.lastOccurrence = error.timestamp;
      } else {
        errorSignatures.set(signature, {
          count: 1,
          lastOccurrence: error.timestamp,
        });
      }
    });

    return Array.from(errorSignatures.entries())
      .filter(([, data]) => data.count > 1)
      .map(([signature, data]) => ({
        signature,
        ...data,
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * 计算平均解决时间
   * @returns 平均解决时间（毫秒）
   */
  private calculateAverageResolutionTime(): number {
    // 这里可以根据实际的错误解决记录来计算
    // 目前返回一个估算值
    return 0;
  }

  /**
   * 计算JavaScript执行时间
   * @returns JavaScript执行时间
   */
  private calculateJSExecutionTime(): number {
    // 这里可以通过性能API来计算
    return 0;
  }

  /**
   * 计算网络延迟
   * @returns 网络延迟
   */
  private calculateNetworkLatency(): number {
    // 这里可以通过网络请求来计算
    return 0;
  }

  /**
   * 生成用户行为摘要
   * @returns 用户行为摘要
   */
  private generateUserBehaviorSummary() {
    const errorEncounters = this.userBehaviorHistory.filter(
      event => event.type === 'error_encounter'
    ).length;

    const recoveryActions = this.userBehaviorHistory.filter(
      event => event.type === 'recovery_action'
    ).length;

    const actionCounts = this.userBehaviorHistory.reduce(
      (acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostCommonActions = Object.entries(actionCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalEvents: this.userBehaviorHistory.length,
      errorEncounters,
      recoveryActions,
      mostCommonActions,
    };
  }

  /**
   * 生成关键发现
   * @param statistics - 错误统计
   * @param performance - 性能指标
   * @returns 关键发现列表
   */
  private generateKeyFindings(
    statistics: ErrorStatistics,
    performance: PerformanceMetrics
  ): string[] {
    const findings: string[] = [];

    if (statistics.errorRate > this.config.thresholds.errorRatePerMinute) {
      findings.push(
        `错误率过高：当前为 ${statistics.errorRate} 错误/分钟，超过阈值 ${this.config.thresholds.errorRatePerMinute}`
      );
    }

    if (performance.memoryUsage.percentage > 80) {
      findings.push(
        `内存使用率过高：当前为 ${performance.memoryUsage.percentage}%`
      );
    }

    if (statistics.duplicateErrors.length > 0) {
      findings.push(`发现 ${statistics.duplicateErrors.length} 个重复错误模式`);
    }

    if (performance.pageLoadTime > 3000) {
      findings.push(`页面加载时间过长：${performance.pageLoadTime}ms`);
    }

    return findings;
  }

  /**
   * 生成建议措施
   * @param statistics - 错误统计
   * @param performance - 性能指标
   * @returns 建议措施列表
   */
  private generateRecommendations(
    statistics: ErrorStatistics,
    performance: PerformanceMetrics
  ): string[] {
    const recommendations: string[] = [];

    if (statistics.errorRate > this.config.thresholds.errorRatePerMinute) {
      recommendations.push('建议增强错误处理机制，减少错误发生频率');
    }

    if (performance.memoryUsage.percentage > 80) {
      recommendations.push('建议优化内存使用，检查是否存在内存泄漏');
    }

    if (statistics.duplicateErrors.length > 0) {
      recommendations.push('建议优先修复重复出现的错误模式');
    }

    if (performance.pageLoadTime > 3000) {
      recommendations.push('建议优化页面加载性能，考虑代码分割和懒加载');
    }

    return recommendations;
  }

  /**
   * 分析趋势
   * @returns 趋势分析结果
   */
  private analyzeTrends() {
    // 这里可以根据历史数据来分析趋势
    // 目前返回默认值
    return {
      errorRateTrend: 'stable' as const,
      performanceTrend: 'stable' as const,
      userSatisfactionTrend: 'stable' as const,
    };
  }

  /**
   * 保存报告
   * @param report - 错误报告
   */
  private saveReport(report: ErrorReport): void {
    if (this.config.reportTargets.console) {
      console.group('🔍 错误监控报告');
      console.groupEnd();
    }

    if (this.config.reportTargets.localStorage) {
      try {
        const key = `error_report_${report.id}`;
        localStorage.setItem(key, JSON.stringify(report));
      } catch (error) {
        logger.error('保存报告到本地存储失败', error);
      }
    }

    if (this.config.reportTargets.remote) {
      this.sendReportToRemote(report);
    }
  }

  /**
   * 发送报告到远程服务器
   * @param report - 错误报告
   */
  private async sendReportToRemote(report: ErrorReport): Promise<void> {
    const remoteConfig = this.config.reportTargets.remote;
    if (!remoteConfig) return;

    try {
      const response = await fetch(remoteConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(remoteConfig.apiKey && {
            Authorization: `Bearer ${remoteConfig.apiKey}`,
          }),
        },
        body: JSON.stringify(report),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      logger.info('报告已发送到远程服务器', {
        reportId: report.id,
        endpoint: remoteConfig.endpoint,
      });
    } catch (error) {
      logger.error('发送报告到远程服务器失败', error);
    }
  }

  /**
   * 生成最终报告
   */
  private generateFinalReport(): void {
    const finalReport = this.generateReport();
    logger.info('会话结束，生成最终报告', {
      reportId: finalReport.id,
      sessionId: this.sessionId,
    });
  }

  /**
   * 清理资源
   */
  public cleanup(): void {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    logger.info('错误监控和报告系统已清理', {
      sessionId: this.sessionId,
    });
  }
}

// 创建全局实例
export const errorMonitoringAndReportingSystem =
  new ErrorMonitoringAndReportingSystem();

// 导出配置类型
export type {
  ErrorMonitoringConfig,
  ErrorStatistics,
  PerformanceMetrics,
  UserBehaviorEvent,
  ErrorReport,
};
