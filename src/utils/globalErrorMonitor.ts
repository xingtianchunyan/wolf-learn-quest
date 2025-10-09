import { ErrorSeverity  } from './unifiedErrorHandler';
import { MasterErrorHandler  } from './masterErrorHandler';

/**
* 文件级注释：全局错误监控系统
*
* 该文件实现了一个全局错误监控和报告系统，旨在：
* - 监控和捕获全局JavaScript错误
* - 提供实时错误统计和分析
* - 实现错误报告和通知机制
* - 支持错误趋势分析和预警
* - 集成第三方错误监控服务
*
* 主要功能：
* - 全局错误捕获
* - 错误统计和分析
* - 实时监控和报告
* - 错误趋势预测
* - 性能影响评估
*
* @author SOLO Coding
* @version 1.0.0
 */

/**
* 错误分类枚举
 */
export enum ErrorCategory { NETWORK = 'network',
  VALIDATION = 'validation',
  BUSINESS = 'business',
  SYSTEM = 'system',
  SECURITY = 'security',
  PERFORMANCE = 'performance';,
}

/**
* 接口注释：错误监控配置
* 定义全局错误监控的配置选项
 */
export interface ErrorMonitorConfig { /** 是否启用监控  */
  enabled: boolean;
  /** 采样率 (0-1)  */
  sampleRate: number;
  /** 最大错误缓存数量  */
  maxErrorCache: number;
  /** 报告间隔（毫秒）  */
  reportInterval: number;
  /** 是否启用性能监控  */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪  */
  enableUserTracking: boolean;
  /** 第三方服务配置  */
  thirdPartyServices: {
    sentry?: {
      dsn: string;
      environment: string;,
};
    bugsnag?: { apiKey: string;,
};,
};
  /** 过滤规则  */
  filters: { /** 忽略的错误消息模式  */
    ignoreMessages: string[];
    /** 忽略的URL模式  */
    ignoreUrls: string[];
    /** 最小错误级别  */
    minSeverity: ErrorSeverity;,
};,
}

/**
* 接口注释：错误统计信息
* 定义错误统计数据结构
 */
export interface ErrorStats { /** 总错误数  */
  totalErrors: number;
  /** 按严重级别分组的错误数  */
  errorsBySeverity: Record<ErrorSeverity, number>;
  /** 按分类分组的错误数  */
  errorsByCategory: Record<ErrorCategory, number>;
  /** 按时间分组的错误数  */
  errorsByTime: Array<{
    timestamp: number;
    count: number;
    severity: ErrorSeverity;,
}>;
  /** 最常见的错误  */
  topErrors: Array<{ message: string;
    count: number;
    lastOccurred: number;,
}>;
  /** 错误率趋势  */
  errorRateTrend: Array<{ timestamp: number;
    rate: number;,
}>;
  /** 用户影响统计  */
  userImpact: { affectedUsers: number;
    totalUsers: number;
    impactPercentage: number;,
};,
}

/**
* 接口注释：错误报告
* 定义错误报告数据结构
 */
export interface ErrorReport { /** 报告ID  */
  id: string;
  /** 报告时间  */
  timestamp: number;
  /** 时间范围  */
  timeRange: {
    start: number;
    end: number;,
};
  /** 错误统计  */
  stats: ErrorStats;
  /** 性能指标  */
  performance: { averageResponseTime: number;
    errorImpactOnPerformance: number;
    memoryUsage: number;,
};
  /** 建议和警告  */
  recommendations: Array<{ type: 'warning' | 'critical' | 'info';
    message: string;
    action: string;,
}>;,
}

/**
* 接口注释：用户会话信息
* 定义用户会话追踪数据
 */
interface UserSession { /** 会话ID  */
  sessionId: string;
  /** 用户ID  */
  userId?: string;
  /** 开始时间  */
  startTime: number;
  /** 最后活动时间  */
  lastActivity: number;
  /** 页面访问记录  */
  pageViews: Array<{
    url: string;
    timestamp: number;
    duration: number;,
}>;
  /** 错误记录  */
  errors: Array<{ errorId: string;
    timestamp: number;
    severity: ErrorSeverity;,
}>;
  /** 用户代理信息  */
  userAgent: string;
  /** 设备信息  */
  deviceInfo: { platform: string;
    browser: string;
    version: string;
    mobile: boolean;,
};,
}

/**
* 类级注释：全局错误监控器
*
* 实现全局错误监控功能，提供：
* - 错误捕获和收集
* - 实时统计和分析
* - 报告生成和通知
* - 性能监控集成
 */
export class GlobalErrorMonitor { private static instance: GlobalErrorMonitor;
  private config: ErrorMonitorConfig;
  private masterErrorHandler: MasterErrorHandler;
  private errorCache: Array<{
    error: Error;
    context: any;
    timestamp: number;
    sessionId: string;,
}> = [];
  private stats: ErrorStats;
  private currentSession: UserSession;
  private reportTimer: NodeJS.Timeout | null = null;
  private performanceObserver: PerformanceObserver | null = null;

  /**
  * 构造函数级注释：初始化全局错误监控器
  * 设置默认配置和初始化监控系统
   */
  private constructor() { this.config = this.getDefaultConfig();
    this.masterErrorHandler = MasterErrorHandler.getInstance();
    this.stats = this.initializeStats();
    this.currentSession = this.initializeSession();

    this.setupGlobalErrorHandlers();
    this.setupPerformanceMonitoring();
    this.startReporting();,
}

  /**
  * 函数级注释：获取单例实例
  * 实现单例模式，确保全局只有一个监控器实例
   */
  public static getInstance(): GlobalErrorMonitor { if (!GlobalErrorMonitor.instance) {
      GlobalErrorMonitor.instance = new GlobalErrorMonitor();,
}
    return GlobalErrorMonitor.instance;,
}

  /**
  * 函数级注释：获取默认配置
  * 返回默认的错误监控配置
   */
  private getDefaultConfig(): ErrorMonitorConfig { return {
      enabled: true,
      sampleRate: 1.0,
      maxErrorCache: 1000,
      reportInterval: 60000, // 1分钟
      enablePerformanceMonitoring: true,
      enableUserTracking: true,
      thirdPartyServices: { },
      filters: { ignoreMessages: ['Script error.',
          'Non-Error promise rejection captured',
          'ResizeObserver loop limit exceeded',
],
        ignoreUrls: ['chrome-extension:// ',
          'moz-extension:// ',
          'safari-extension:// ',
],
        minSeverity: ErrorSeverity.LOW,
}
    };,
}

  /**
  * 函数级注释：初始化统计数据
  * 创建初始的错误统计结构
   */
  private initializeStats(): ErrorStats { return {
      totalErrors: 0,
      errorsBySeverity: {
        [ErrorSeverity.LOW]: 0,
        [ErrorSeverity.MEDIUM]: 0,
        [ErrorSeverity.HIGH]: 0,
        [ErrorSeverity.CRITICAL]: 0,
},
      errorsByCategory: { [ErrorCategory.FRONTEND]: 0,
        [ErrorCategory.BACKEND]: 0,
        [ErrorCategory.DATABASE]: 0,
        [ErrorCategory.NETWORK]: 0,
        [ErrorCategory.VALIDATION]: 0,
        [ErrorCategory.AUTHENTICATION]: 0,
        [ErrorCategory.AUTHORIZATION]: 0,
        [ErrorCategory.BUSINESS_LOGIC]: 0,
        [ErrorCategory.SYSTEM]: 0,
        [ErrorCategory.EXTERNAL_SERVICE]: 0,
},
      errorsByTime: [],
      topErrors: [],
      errorRateTrend: [],
      userImpact: { affectedUsers: 0,
        totalUsers: 0,
        impactPercentage: 0,
}
    };,
}

  /**
  * 函数级注释：初始化用户会话
  * 创建新的用户会话追踪
   */
  private initializeSession(): UserSession { return {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: [],
      errors: [],
      userAgent: navigator.userAgent,
      deviceInfo: this.getDeviceInfo(),
};,
}

  /**
  * 函数级注释：生成会话ID
  * 生成唯一的会话标识符
   */
  private generateSessionId(): string { return `session_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

  /**
  * 函数级注释：获取设备信息
  * 收集用户设备和浏览器信息
   */
  private getDeviceInfo() { const userAgent = navigator.userAgent;
    const mobile = /Mobile|Android|iPhone|iPad/.test(userAgent);

    let browser = 'Unknown';
    let version = 'Unknown';

    if (userAgent.includes('Chrome')) {
      browser = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';,
} else if (userAgent.includes('Firefox')) { browser = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';,
} else if (userAgent.includes('Safari')) { browser = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';,
}

    return { platform: navigator.platform,
      browser,
      version,
      mobile,
};,
}

  /**
  * 函数级注释：设置全局错误处理器
  * 注册全局错误和Promise拒绝处理器
   */
  private setupGlobalErrorHandlers() { if (!this.config.enabled) return;

    // 捕获JavaScript错误
    window.addEventListener('error', event => {
      this.handleGlobalError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: 'javascript_error',
});,
});

    // 捕获未处理的Promise拒绝
    window.addEventListener('unhandledrejection', event => { const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      this.handleGlobalError(error, {
        type: 'unhandled_promise_rejection',
        promise: event.promise,
});,
});

    // 捕获资源加载错误
    window.addEventListener('error', event => { if (event.target && event.target !== window) {
        this.handleResourceError(event);,
}
    }, true);,
}

  /**
  * 函数级注释：设置性能监控
  * 初始化性能监控和指标收集
   */
  private setupPerformanceMonitoring() { if (!this.config.enablePerformanceMonitoring || !window.PerformanceObserver) return;

    try {
      this.performanceObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            this.trackPageLoad(entry as PerformanceNavigationTiming);,
} else if (entry.entryType === 'largest-contentful-paint') { this.trackLCP(entry);,
}
        });,
});

      this.performanceObserver.observe({ entryTypes: ['navigation', 'largest-contentful-paint']  });,
} catch (error) { console.warn('性能监控初始化失败:', error);,
}
  }

  /**
  * 函数级注释：处理全局错误
  * 处理捕获到的全局错误
   */
  private async handleGlobalError(error: Error, context: any) { if (!this.shouldReportError(error, context)) return;

    const errorId = `global_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;
    const timestamp = Date.now();

    // 添加到错误缓存
    this.errorCache.push({ error,
      context: {
        ...context,
        errorId,
        sessionId: this.currentSession.sessionId,
        url: window.location.href,
        timestamp,
},
      timestamp,
      sessionId: this.currentSession.sessionId,
});

    // 限制缓存大小
    if (this.errorCache.length > this.config.maxErrorCache) { this.errorCache.shift();,
}

    // 更新统计信息
    this.updateStats(error, context);

    // 更新会话信息
    this.updateSession(errorId, error);

    // 使用主错误处理器处理
    try { await this.masterErrorHandler.handleError(error, {
        ...context,
        globalMonitor: true,
        sessionId: this.currentSession.sessionId,
});,
} catch (handlingError) { console.error('主错误处理器处理失败:', handlingError);,
}
  }

  /**
  * 函数级注释：处理资源错误
  * 处理资源加载失败错误
   */
  private handleResourceError(event: Event) { const target = event.target as HTMLElement;
    const error = new Error(`资源加载失败: ${target.tagName }`);

    this.handleGlobalError(error, { type: 'resource_error',
      tagName: target.tagName,
      src: (target as any).src || (target as any).href,
      currentSrc: (target as any).currentSrc,
});,
}

  /**
  * 函数级注释：判断是否应该报告错误
  * 根据配置过滤规则判断是否需要报告错误
   */
  private shouldReportError(error: Error, context: any): boolean { // 检查采样率
    if (Math.random() > this.config.sampleRate) return false;

    // 检查忽略的错误消息
    const message = error.message || '';
    if (this.config.filters.ignoreMessages.some(pattern => message.includes(pattern))) {
      return false;,
}

    // 检查忽略的URL
    const url = context.filename || window.location.href;
    if (this.config.filters.ignoreUrls.some(pattern => url.includes(pattern))) { return false;,
}

    return true;,
}

  /**
  * 函数级注释：更新统计信息
  * 更新错误统计数据
   */
  private updateStats(error: Error, context: any) { const severity = this.determineSeverity(error, context);
    const category = this.determineCategory(error, context);
    const timestamp = Date.now();

    // 更新总数
    this.stats.totalErrors++;

    // 更新按严重级别统计
    this.stats.errorsBySeverity[severity]++;

    // 更新按分类统计
    this.stats.errorsByCategory[category]++;

    // 更新时间序列
    this.stats.errorsByTime.push({
      timestamp,
      count: 1,
      severity,
});

    // 限制时间序列长度
    if (this.stats.errorsByTime.length > 1000) { this.stats.errorsByTime.shift();,
}

    // 更新热门错误
    this.updateTopErrors(error.message);

    // 更新错误率趋势
    this.updateErrorRateTrend(timestamp);,
}

  /**
  * 函数级注释：确定错误严重级别
  * 根据错误类型和上下文确定严重级别
   */
  private determineSeverity(error: Error, context: any): ErrorSeverity { if (context.type === 'resource_error') return ErrorSeverity.LOW;
    if (error.name === 'TypeError' || error.name === 'ReferenceError') return ErrorSeverity.HIGH;
    if (context.type === 'unhandled_promise_rejection') return ErrorSeverity.MEDIUM;
    return ErrorSeverity.MEDIUM;,
}

  /**
  * 函数级注释：确定错误分类
  * 根据错误类型和上下文确定错误分类
   */
  private determineCategory(error: Error, context: any): ErrorCategory { if (context.type === 'resource_error') return ErrorCategory.FRONTEND;
    if (context.type === 'network_error') return ErrorCategory.NETWORK;
    if (context.type === 'unhandled_promise_rejection') return ErrorCategory.FRONTEND;
    return ErrorCategory.FRONTEND;,
}

  /**
  * 函数级注释：更新热门错误
  * 更新最常见错误的统计
   */
  private updateTopErrors(message: string) { const existing = this.stats.topErrors.find(item => item.message === message);
    if (existing) {
      existing.count++;
      existing.lastOccurred = Date.now();,
} else { this.stats.topErrors.push({
        message,
        count: 1,
        lastOccurred: Date.now(),
});,
}

    // 按计数排序并限制数量
    this.stats.topErrors.sort((a, b) => b.count - a.count);
    if (this.stats.topErrors.length > 10) { this.stats.topErrors = this.stats.topErrors.slice(0, 10);,
}
  }

  /**
  * 函数级注释：更新错误率趋势
  * 更新错误率趋势数据
   */
  private updateErrorRateTrend(timestamp: number) { const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    // 计算最近5分钟的错误率
    const recentErrors = this.stats.errorsByTime.filter(;
      item => item.timestamp > fiveMinutesAgo;
    );

    const errorRate = recentErrors.length / 5; // 每分钟错误数

    this.stats.errorRateTrend.push({
      timestamp: now,
      rate: errorRate,
});

    // 限制趋势数据长度
    if (this.stats.errorRateTrend.length > 100) { this.stats.errorRateTrend.shift();,
}
  }

  /**
  * 函数级注释：更新会话信息
  * 更新当前用户会话的错误记录
   */
  private updateSession(errorId: string, error: Error) { const severity = this.determineSeverity(error, { });

    this.currentSession.errors.push({ errorId,
      timestamp: Date.now(),
      severity,
});

    this.currentSession.lastActivity = Date.now();,
}

  /**
  * 函数级注释：追踪页面加载
  * 记录页面加载性能指标
   */
  private trackPageLoad(entry: PerformanceNavigationTiming) { this.currentSession.pageViews.push({
      url: window.location.href,
      timestamp: Date.now(),
      duration: entry.loadEventEnd - entry.loadEventStart,
});,
}

  /**
  * 函数级注释：追踪最大内容绘制
  * 记录LCP性能指标
   */
  private trackLCP(entry: PerformanceEntry) { // 可以在这里记录LCP指标
    console.debug('LCP:', entry.startTime);,
}

  /**
  * 函数级注释：开始报告
  * 启动定期错误报告
   */
  private startReporting() { if (!this.config.enabled || this.config.reportInterval <= 0) return;

    this.reportTimer = setInterval(() => {
      this.generateAndSendReport();,
}, this.config.reportInterval);,
}

  /**
  * 函数级注释：生成并发送报告
  * 生成错误报告并发送到监控服务
   */
  private async generateAndSendReport() { try {
      const report = this.generateReport();
      await this.sendReport(report);

      // 清理旧的错误缓存
      this.cleanupOldErrors();,
} catch (error) { console.error('错误报告生成失败:', error);,
}
  }

  /**
  * 函数级注释：生成报告
  * 生成详细的错误报告
   */
  private generateReport(): ErrorReport { const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    return {
      id: `report_${now }_${ Math.random().toString(36).substr(2, 9) }`,
      timestamp: now,
      timeRange: { start: oneHourAgo,
        end: now,
},
      stats: { ...this.stats  },
      performance: { averageResponseTime: this.calculateAverageResponseTime(),
        errorImpactOnPerformance: this.calculateErrorImpactOnPerformance(),
        memoryUsage: this.getMemoryUsage(),
},
      recommendations: this.generateRecommendations(),
};,
}

  /**
  * 函数级注释：计算平均响应时间
  * 计算页面平均响应时间
   */
  private calculateAverageResponseTime(): number { const pageViews = this.currentSession.pageViews;
    if (pageViews.length === 0) return 0;

    const totalDuration = pageViews.reduce((sum, view) => sum + view.duration, 0);
    return totalDuration / pageViews.length;,
}

  /**
  * 函数级注释：计算错误对性能的影响
  * 评估错误对应用性能的影响程度
   */
  private calculateErrorImpactOnPerformance(): number { const recentErrors = this.stats.errorsByTime.filter(;
      item => item.timestamp > Date.now() - 60 * 60 * 1000;
    );

    // 简单的影响评分：错误数量 * 严重级别权重
    const impact = recentErrors.reduce((sum, error) => {
      const weight = error.severity === ErrorSeverity.CRITICAL ? 4 :;
      error.severity === ErrorSeverity.HIGH ? 3 :;
      error.severity === ErrorSeverity.MEDIUM ? 2 : 1;
      return sum + weight;,
}, 0);

    return Math.min(impact / 100, 1); // 标准化到0-1,
}

  /**
  * 函数级注释：获取内存使用情况
  * 获取当前内存使用统计
   */
  private getMemoryUsage(): number { if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.usedJSHeapSize / memory.totalJSHeapSize;,
}
    return 0;,
}

  /**
  * 函数级注释：生成建议
  * 基于错误统计生成改进建议
   */
  private generateRecommendations(): Array<{ type: 'warning' | 'critical' | 'info';
    message: string;
    action: string;,
}> { const recommendations = [];
    const recentErrors = this.stats.errorsByTime.filter(;
      item => item.timestamp > Date.now() - 60 * 60 * 1000;
    );

    // 检查错误率
    if (recentErrors.length > 50) {
      recommendations.push({
        type: 'critical' as const,
        message: '错误率过高，可能影响用户体验',
        action: '检查最近的代码更改，考虑回滚或修复',
});,
}

    // 检查严重错误
    const criticalErrors = recentErrors.filter(;
      error => error.severity === ErrorSeverity.CRITICAL;
    );
    if (criticalErrors.length > 0) { recommendations.push({
        type: 'critical' as const,
        message: `发现 ${criticalErrors.length } 个严重错误`,
        action: '立即调查并修复严重错误',
});,
}

    // 检查内存使用
    const memoryUsage = this.getMemoryUsage();
    if (memoryUsage > 0.8) { recommendations.push({
        type: 'warning' as const,
        message: '内存使用率过高',
        action: '检查内存泄漏，优化内存使用',
});,
}

    return recommendations;,
}

  /**
  * 函数级注释：发送报告
  * 将报告发送到监控服务
   */
  private async sendReport(report: ErrorReport) { // 这里可以集成第三方监控服务
    console.log('错误监控报告:', report);

    // 示例：发送到自定义端点
    try {
      // await fetch('/api/error-reports', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json'  },
        //   body: JSON.stringify(report)
        // });,
} catch (error) { console.error('报告发送失败:', error);,
}
    }

    /**
    * 函数级注释：清理旧错误
    * 清理过期的错误缓存
     */
    private cleanupOldErrors() { const oneHourAgo = Date.now() - 60 * 60 * 1000;
      this.errorCache = this.errorCache.filter(item => item.timestamp > oneHourAgo);

      // 清理时间序列数据
      this.stats.errorsByTime = this.stats.errorsByTime.filter(;
        item => item.timestamp > oneHourAgo;
      );,
}

    /**
    * 函数级注释：更新配置
    * 更新监控配置
     */
    public updateConfig(newConfig: Partial<ErrorMonitorConfig>) { this.config = { ...this.config, ...newConfig  };

      if (!this.config.enabled && this.reportTimer) { clearInterval(this.reportTimer);
        this.reportTimer = null;,
} else if (this.config.enabled && !this.reportTimer) { this.startReporting();,
}
    }

    /**
    * 函数级注释：获取统计信息
    * 返回当前错误统计数据
     */
    public getStats(): ErrorStats { return { ...this.stats  };,
}

    /**
    * 函数级注释：获取会话信息
    * 返回当前用户会话信息
     */
    public getSession(): UserSession { return { ...this.currentSession  };,
}

    /**
    * 函数级注释：手动报告错误
    * 允许手动报告特定错误
     */
    public reportError(error: Error, context?: any) { this.handleGlobalError(error, {
        ...context,
        type: 'manual_report',
        manual: true,
});,
}

    /**
    * 函数级注释：销毁监控器
    * 清理资源和停止监控
     */
    public destroy() { if (this.reportTimer) {
        clearInterval(this.reportTimer);
        this.reportTimer = null;,
}

      if (this.performanceObserver) { this.performanceObserver.disconnect();
        this.performanceObserver = null;,
}

      this.errorCache = [];,
}
  }

  /**
  * 函数级注释：初始化全局错误监控
  * 初始化并启动全局错误监控系统
   */
  export function initializeGlobalErrorMonitor(config?: Partial<ErrorMonitorConfig>) { const monitor = GlobalErrorMonitor.getInstance();
    if (config) {
      monitor.updateConfig(config);,
}
    return monitor;,
}

  /**
  * 函数级注释：获取错误监控实例
  * 获取全局错误监控器实例
   */
  export function getGlobalErrorMonitor() { return GlobalErrorMonitor.getInstance();,
}

  export default GlobalErrorMonitor;