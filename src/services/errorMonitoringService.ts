/**
 * 文件级注释：错误监控服务
 * 提供全面的错误监控、收集和分析功能
 * 支持错误上报、性能监控和用户行为追踪
 * 
 * 主要功能：
 * - 错误自动收集和上报
 * - 性能指标监控
 * - 用户行为追踪
 * - 错误分析和统计
 * - 实时错误告警
 */

import { createLogger } from '@/lib/logger';
import { masterErrorHandler } from '@/utils/masterErrorHandler';
import { SecurityEvent } from '@/utils/automatedSecurityChecker';

const logger = createLogger('error-monitoring-service');

/**
 * 错误级别枚举
 */
export enum ErrorLevel {
  /** 调试信息 */
  DEBUG = 'debug',
  /** 一般信息 */
  INFO = 'info',
  /** 警告 */
  WARNING = 'warning',
  /** 错误 */
  ERROR = 'error',
  /** 严重错误 */
  CRITICAL = 'critical'
}

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** JavaScript错误 */
  JAVASCRIPT = 'javascript',
  /** 网络错误 */
  NETWORK = 'network',
  /** API错误 */
  API = 'api',
  /** 用户界面错误 */
  UI = 'ui',
  /** 业务逻辑错误 */
  BUSINESS = 'business',
  /** 安全错误 */
  SECURITY = 'security',
  /** 性能错误 */
  PERFORMANCE = 'performance',
  /** 数据库错误 */
  DATABASE = 'database'
}

/**
 * 性能指标类型枚举
 */
export enum PerformanceMetricType {
  /** 页面加载时间 */
  PAGE_LOAD = 'page_load',
  /** 首次内容绘制 */
  FIRST_CONTENTFUL_PAINT = 'first_contentful_paint',
  /** 最大内容绘制 */
  LARGEST_CONTENTFUL_PAINT = 'largest_contentful_paint',
  /** 首次输入延迟 */
  FIRST_INPUT_DELAY = 'first_input_delay',
  /** 累积布局偏移 */
  CUMULATIVE_LAYOUT_SHIFT = 'cumulative_layout_shift',
  /** API响应时间 */
  API_RESPONSE_TIME = 'api_response_time',
  /** 内存使用 */
  MEMORY_USAGE = 'memory_usage',
  /** CPU使用 */
  CPU_USAGE = 'cpu_usage'
}

/**
 * 错误报告接口
 */
export interface ErrorReport {
  /** 错误ID */
  id: string;
  /** 错误级别 */
  level: ErrorLevel;
  /** 错误类型 */
  type: ErrorType;
  /** 错误消息 */
  message: string;
  /** 错误堆栈 */
  stack?: string;
  /** 错误发生时间 */
  timestamp: number;
  /** 用户ID */
  userId?: string;
  /** 会话ID */
  sessionId: string;
  /** 页面URL */
  url: string;
  /** 用户代理 */
  userAgent: string;
  /** 浏览器信息 */
  browser: BrowserInfo;
  /** 设备信息 */
  device: DeviceInfo;
  /** 错误上下文 */
  context: ErrorContext;
  /** 用户操作历史 */
  userActions: UserAction[];
  /** 性能指标 */
  performance: PerformanceMetrics;
  /** 自定义数据 */
  customData?: any;
  /** 是否已处理 */
  handled: boolean;
  /** 处理结果 */
  handlingResult?: string;
}

/**
 * 浏览器信息接口
 */
export interface BrowserInfo {
  /** 浏览器名称 */
  name: string;
  /** 浏览器版本 */
  version: string;
  /** 渲染引擎 */
  engine: string;
  /** 操作系统 */
  os: string;
  /** 是否移动设备 */
  mobile: boolean;
}

/**
 * 设备信息接口
 */
export interface DeviceInfo {
  /** 设备类型 */
  type: 'desktop' | 'mobile' | 'tablet';
  /** 屏幕分辨率 */
  screenResolution: string;
  /** 视口大小 */
  viewportSize: string;
  /** 像素比 */
  pixelRatio: number;
  /** 内存大小 */
  memory?: number;
  /** CPU核心数 */
  cpuCores?: number;
  /** 网络类型 */
  networkType?: string;
}

/**
 * 错误上下文接口
 */
export interface ErrorContext {
  /** 组件名称 */
  component?: string;
  /** 操作名称 */
  operation?: string;
  /** 文件名 */
  filename?: string;
  /** 行号 */
  line?: number;
  /** 列号 */
  column?: number;
  /** 函数名 */
  function?: string;
  /** 状态信息 */
  state?: any;
  /** 属性信息 */
  props?: any;
  /** 环境变量 */
  environment?: string;
  /** 版本信息 */
  version?: string;
}

/**
 * 用户操作接口
 */
export interface UserAction {
  /** 操作类型 */
  type: 'click' | 'input' | 'navigation' | 'scroll' | 'resize' | 'focus' | 'blur';
  /** 操作目标 */
  target: string;
  /** 操作时间 */
  timestamp: number;
  /** 操作数据 */
  data?: any;
}

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  /** 页面加载时间 */
  pageLoadTime?: number;
  /** 首次内容绘制 */
  firstContentfulPaint?: number;
  /** 最大内容绘制 */
  largestContentfulPaint?: number;
  /** 首次输入延迟 */
  firstInputDelay?: number;
  /** 累积布局偏移 */
  cumulativeLayoutShift?: number;
  /** 内存使用 */
  memoryUsage?: number;
  /** CPU使用 */
  cpuUsage?: number;
  /** 网络延迟 */
  networkLatency?: number;
}

/**
 * 监控配置接口
 */
export interface MonitoringConfig {
  /** 是否启用错误监控 */
  enableErrorMonitoring: boolean;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪 */
  enableUserTracking: boolean;
  /** 是否启用自动上报 */
  enableAutoReporting: boolean;
  /** 上报端点 */
  reportingEndpoint?: string;
  /** 上报间隔（毫秒） */
  reportingInterval: number;
  /** 最大错误缓存数 */
  maxErrorCache: number;
  /** 最大用户操作历史数 */
  maxUserActions: number;
  /** 采样率（0-1） */
  samplingRate: number;
  /** 忽略的错误类型 */
  ignoredErrors: string[];
  /** 忽略的URL模式 */
  ignoredUrls: RegExp[];
  /** 自定义过滤器 */
  customFilters: ((error: ErrorReport) => boolean)[];
}

/**
 * 监控统计接口
 */
export interface MonitoringStats {
  /** 总错误数 */
  totalErrors: number;
  /** 按级别统计 */
  errorsByLevel: Record<ErrorLevel, number>;
  /** 按类型统计 */
  errorsByType: Record<ErrorType, number>;
  /** 按浏览器统计 */
  errorsByBrowser: Record<string, number>;
  /** 按设备统计 */
  errorsByDevice: Record<string, number>;
  /** 平均错误率 */
  averageErrorRate: number;
  /** 性能指标 */
  performanceMetrics: PerformanceMetrics;
  /** 用户活跃度 */
  userActivity: number;
  /** 最后更新时间 */
  lastUpdated: number;
}

/**
 * 错误监控服务类
 * 提供全面的错误监控和分析功能
 */
export class ErrorMonitoringService {
  private static instance: ErrorMonitoringService;
  
  /** 监控配置 */
  private config: MonitoringConfig;
  /** 错误缓存 */
  private errorCache: ErrorReport[] = [];
  /** 用户操作历史 */
  private userActions: UserAction[] = [];
  /** 监控统计 */
  private stats: MonitoringStats;
  /** 会话ID */
  private sessionId: string;
  /** 是否已初始化 */
  private initialized = false;
  /** 性能观察器 */
  private performanceObserver?: PerformanceObserver;
  /** 上报定时器 */
  private reportingTimer?: ReturnType<typeof setInterval>;

  private constructor() {
    // 默认配置
    this.config = {
      enableErrorMonitoring: true,
      enablePerformanceMonitoring: true,
      enableUserTracking: true,
      enableAutoReporting: false,
      reportingInterval: 60000, // 1分钟
      maxErrorCache: 100,
      maxUserActions: 50,
      samplingRate: 1.0,
      ignoredErrors: [
        'Script error.',
        'Non-Error promise rejection captured',
        'ResizeObserver loop limit exceeded'
      ],
      ignoredUrls: [
        /chrome-extension:/,
        /moz-extension:/,
        /safari-extension:/
      ],
      customFilters: []
    };

    // 生成会话ID
    this.sessionId = this.generateSessionId();

    // 初始化统计
    this.stats = {
      totalErrors: 0,
      errorsByLevel: {
        [ErrorLevel.DEBUG]: 0,
        [ErrorLevel.INFO]: 0,
        [ErrorLevel.WARNING]: 0,
        [ErrorLevel.ERROR]: 0,
        [ErrorLevel.CRITICAL]: 0
      },
      errorsByType: {
        [ErrorType.JAVASCRIPT]: 0,
        [ErrorType.NETWORK]: 0,
        [ErrorType.API]: 0,
        [ErrorType.UI]: 0,
        [ErrorType.BUSINESS]: 0,
        [ErrorType.SECURITY]: 0,
        [ErrorType.PERFORMANCE]: 0,
        [ErrorType.DATABASE]: 0
      },
      errorsByBrowser: {},
      errorsByDevice: {},
      averageErrorRate: 0,
      performanceMetrics: {},
      userActivity: 0,
      lastUpdated: Date.now()
    };

    logger.info('错误监控服务已初始化');
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ErrorMonitoringService {
    if (!ErrorMonitoringService.instance) {
      ErrorMonitoringService.instance = new ErrorMonitoringService();
    }
    return ErrorMonitoringService.instance;
  }

  /**
   * 初始化监控服务
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      logger.warn('错误监控服务已初始化');
      return;
    }

    try {
      // 设置全局错误处理器
      if (this.config.enableErrorMonitoring) {
        this.setupGlobalErrorHandlers();
      }

      // 设置性能监控
      if (this.config.enablePerformanceMonitoring) {
        this.setupPerformanceMonitoring();
      }

      // 设置用户行为追踪
      if (this.config.enableUserTracking) {
        this.setupUserTracking();
      }

      // 设置自动上报
      if (this.config.enableAutoReporting) {
        this.setupAutoReporting();
      }

      this.initialized = true;
      logger.info('错误监控服务初始化完成');

    } catch (error) {
      logger.error('错误监控服务初始化失败', error);
      throw error;
    }
  }

  /**
   * 配置监控服务
   * @param config - 监控配置
   */
  public configure(config: Partial<MonitoringConfig>): void {
    this.config = { ...this.config, ...config };
    logger.info('错误监控服务配置已更新', this.config);
  }

  /**
   * 报告错误
   * @param error - 错误对象
   * @param context - 错误上下文
   * @param level - 错误级别
   * @param type - 错误类型
   */
  public async reportError(
    error: Error | string,
    context?: Partial<ErrorContext>,
    level: ErrorLevel = ErrorLevel.ERROR,
    type: ErrorType = ErrorType.JAVASCRIPT
  ): Promise<string> {
    try {
      // 检查采样率
      if (Math.random() > this.config.samplingRate) {
        return '';
      }

      // 创建错误报告
      const errorReport = this.createErrorReport(error, context, level, type);

      // 检查过滤器
      if (this.shouldIgnoreError(errorReport)) {
        return '';
      }

      // 添加到缓存
      this.addToCache(errorReport);

      // 更新统计
      this.updateStats(errorReport);

      // 立即上报严重错误
      if (level === ErrorLevel.CRITICAL) {
        await this.sendErrorReport(errorReport);
      }

      logger.info(`错误已报告: ${errorReport.id}`, errorReport);
      return errorReport.id;

    } catch (reportingError) {
      logger.error('报告错误失败', reportingError);
      throw reportingError;
    }
  }

  /**
   * 报告性能指标
   * @param type - 指标类型
   * @param value - 指标值
   * @param context - 上下文信息
   */
  public async reportPerformanceMetric(
    type: PerformanceMetricType,
    value: number,
    context?: any
  ): Promise<void> {
    try {
      if (!this.config.enablePerformanceMonitoring) {
        return;
      }

      // 更新性能指标
      this.updatePerformanceMetrics(type, value);

      // 检查性能阈值
      await this.checkPerformanceThresholds(type, value, context);

      logger.debug(`性能指标已报告: ${type} = ${value}`);

    } catch (error) {
      logger.error('报告性能指标失败', error);
    }
  }

  /**
   * 报告用户操作
   * @param action - 用户操作
   */
  public reportUserAction(action: UserAction): void {
    try {
      if (!this.config.enableUserTracking) {
        return;
      }

      // 添加到用户操作历史
      this.userActions.unshift(action);

      // 保持历史大小限制
      if (this.userActions.length > this.config.maxUserActions) {
        this.userActions = this.userActions.slice(0, this.config.maxUserActions);
      }

      // 更新用户活跃度
      this.stats.userActivity++;

      logger.debug('用户操作已报告', action);

    } catch (error) {
      logger.error('报告用户操作失败', error);
    }
  }

  /**
   * 报告安全事件
   * @param event - 安全事件
   */
  public async reportSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // 将安全事件转换为错误报告
      const errorReport = this.createSecurityErrorReport(event);

      // 添加到缓存
      this.addToCache(errorReport);

      // 更新统计
      this.updateStats(errorReport);

      // 立即上报安全事件
      await this.sendErrorReport(errorReport);

      logger.warn('安全事件已报告', event);

    } catch (error) {
      logger.error('报告安全事件失败', error);
    }
  }

  /**
   * 获取错误统计
   */
  public getStats(): MonitoringStats {
    return { ...this.stats };
  }

  /**
   * 获取错误缓存
   */
  public getErrorCache(): ErrorReport[] {
    return [...this.errorCache];
  }

  /**
   * 获取用户操作历史
   */
  public getUserActions(): UserAction[] {
    return [...this.userActions];
  }

  /**
   * 清空缓存
   */
  public clearCache(): void {
    this.errorCache = [];
    this.userActions = [];
    this.stats = {
      totalErrors: 0,
      errorsByLevel: {
        [ErrorLevel.DEBUG]: 0,
        [ErrorLevel.INFO]: 0,
        [ErrorLevel.WARNING]: 0,
        [ErrorLevel.ERROR]: 0,
        [ErrorLevel.CRITICAL]: 0
      },
      errorsByType: {
        [ErrorType.JAVASCRIPT]: 0,
        [ErrorType.NETWORK]: 0,
        [ErrorType.API]: 0,
        [ErrorType.UI]: 0,
        [ErrorType.BUSINESS]: 0,
        [ErrorType.SECURITY]: 0,
        [ErrorType.PERFORMANCE]: 0,
        [ErrorType.DATABASE]: 0
      },
      errorsByBrowser: {},
      errorsByDevice: {},
      averageErrorRate: 0,
      performanceMetrics: {},
      userActivity: 0,
      lastUpdated: Date.now()
    };

    logger.info('监控缓存已清空');
  }

  /**
   * 手动上报所有缓存的错误
   */
  public async flushErrors(): Promise<void> {
    try {
      if (this.errorCache.length === 0) {
        return;
      }

      const errors = [...this.errorCache];
      this.errorCache = [];

      for (const error of errors) {
        await this.sendErrorReport(error);
      }

      logger.info(`已上报 ${errors.length} 个缓存错误`);

    } catch (error) {
      logger.error('上报缓存错误失败', error);
    }
  }

  /**
   * 设置全局错误处理器
   */
  private setupGlobalErrorHandlers(): void {
    // JavaScript错误
    window.addEventListener('error', (event) => {
      this.reportError(
        event.error || event.message,
        {
          filename: event.filename,
          line: event.lineno,
          column: event.colno
        },
        ErrorLevel.ERROR,
        ErrorType.JAVASCRIPT
      );
    });

    // Promise拒绝
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(
        event.reason,
        { operation: 'unhandled_promise_rejection' },
        ErrorLevel.ERROR,
        ErrorType.JAVASCRIPT
      );
    });

    // 资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.reportError(
          `Resource load error: ${(event.target as any)?.src || (event.target as any)?.href}`,
          { operation: 'resource_load' },
          ErrorLevel.WARNING,
          ErrorType.NETWORK
        );
      }
    }, true);
  }

  /**
   * 设置性能监控
   */
  private setupPerformanceMonitoring(): void {
    // Web Vitals监控
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processPerformanceEntry(entry);
        }
      });

      // 监控各种性能指标
      try {
        this.performanceObserver.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        logger.warn('部分性能指标监控不支持', error);
      }
    }

    // 页面加载完成后收集指标
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectPageLoadMetrics();
      }, 0);
    });
  }

  /**
   * 设置用户行为追踪
   */
  private setupUserTracking(): void {
    // 点击事件
    document.addEventListener('click', (event) => {
      this.reportUserAction({
        type: 'click',
        target: this.getElementSelector(event.target as Element),
        timestamp: Date.now(),
        data: {
          x: event.clientX,
          y: event.clientY
        }
      });
    });

    // 导航事件
    window.addEventListener('popstate', () => {
      this.reportUserAction({
        type: 'navigation',
        target: window.location.href,
        timestamp: Date.now()
      });
    });

    // 滚动事件（节流）
    let scrollTimer: ReturnType<typeof setInterval>;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.reportUserAction({
          type: 'scroll',
          target: 'window',
          timestamp: Date.now(),
          data: {
            scrollY: window.scrollY,
            scrollX: window.scrollX
          }
        });
      }, 100);
    });
  }

  /**
   * 设置自动上报
   */
  private setupAutoReporting(): void {
    this.reportingTimer = setInterval(async () => {
      try {
        await this.flushErrors();
      } catch (error) {
        logger.error('自动上报失败', error);
      }
    }, this.config.reportingInterval);
  }

  /**
   * 创建错误报告
   */
  private createErrorReport(
    error: Error | string,
    context?: Partial<ErrorContext>,
    level: ErrorLevel = ErrorLevel.ERROR,
    type: ErrorType = ErrorType.JAVASCRIPT
  ): ErrorReport {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    return {
      id: this.generateErrorId(),
      level,
      type,
      message: errorMessage,
      stack: errorStack,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      browser: this.getBrowserInfo(),
      device: this.getDeviceInfo(),
      context: {
        environment: process.env.NODE_ENV || 'development',
        version: process.env.REACT_APP_VERSION || '1.0.0',
        ...context
      },
      userActions: [...this.userActions],
      performance: this.getCurrentPerformanceMetrics(),
      handled: false
    };
  }

  /**
   * 创建安全错误报告
   */
  private createSecurityErrorReport(event: SecurityEvent): ErrorReport {
    return {
      id: this.generateErrorId(),
      level: this.mapSeverityToLevel(event.severity),
      type: ErrorType.SECURITY,
      message: `Security Event: ${event.title}`,
      timestamp: event.timestamp,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      browser: this.getBrowserInfo(),
      device: this.getDeviceInfo(),
      context: {
        component: 'SecuritySystem',
        operation: event.type,
        environment: process.env.NODE_ENV || 'development',
        version: process.env.REACT_APP_VERSION || '1.0.0'
      },
      userActions: [...this.userActions],
      performance: this.getCurrentPerformanceMetrics(),
      customData: {
        securityEvent: event
      },
      handled: false
    };
  }

  /**
   * 检查是否应该忽略错误
   */
  private shouldIgnoreError(errorReport: ErrorReport): boolean {
    // 检查忽略的错误消息
    if (this.config.ignoredErrors.some(ignored => errorReport.message.includes(ignored))) {
      return true;
    }

    // 检查忽略的URL模式
    if (this.config.ignoredUrls.some(pattern => pattern.test(errorReport.url))) {
      return true;
    }

    // 检查自定义过滤器
    if (this.config.customFilters.some(filter => !filter(errorReport))) {
      return true;
    }

    return false;
  }

  /**
   * 添加到缓存
   */
  private addToCache(errorReport: ErrorReport): void {
    this.errorCache.unshift(errorReport);

    // 保持缓存大小限制
    if (this.errorCache.length > this.config.maxErrorCache) {
      this.errorCache = this.errorCache.slice(0, this.config.maxErrorCache);
    }
  }

  /**
   * 更新统计信息
   */
  private updateStats(errorReport: ErrorReport): void {
    this.stats.totalErrors++;
    this.stats.errorsByLevel[errorReport.level]++;
    this.stats.errorsByType[errorReport.type]++;

    // 按浏览器统计
    const browserKey = `${errorReport.browser.name} ${errorReport.browser.version}`;
    this.stats.errorsByBrowser[browserKey] = (this.stats.errorsByBrowser[browserKey] || 0) + 1;

    // 按设备统计
    const deviceKey = errorReport.device.type;
    this.stats.errorsByDevice[deviceKey] = (this.stats.errorsByDevice[deviceKey] || 0) + 1;

    // 计算错误率
    this.stats.averageErrorRate = this.stats.totalErrors / Math.max(this.stats.userActivity, 1);

    this.stats.lastUpdated = Date.now();
  }

  /**
   * 发送错误报告
   */
  private async sendErrorReport(errorReport: ErrorReport): Promise<void> {
    if (!this.config.reportingEndpoint) {
      logger.debug('未配置上报端点，跳过错误上报');
      return;
    }

    try {
      const response = await fetch(this.config.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorReport)
      });

      if (!response.ok) {
        throw new Error(`上报失败: ${response.status} ${response.statusText}`);
      }

      errorReport.handled = true;
      errorReport.handlingResult = 'reported_successfully';

      logger.debug(`错误报告已上报: ${errorReport.id}`);

    } catch (error) {
      logger.error('发送错误报告失败', error);
      throw error;
    }
  }

  /**
   * 处理性能条目
   */
  private processPerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        const navEntry = entry as PerformanceNavigationTiming;
        this.reportPerformanceMetric(
          PerformanceMetricType.PAGE_LOAD,
          navEntry.loadEventEnd - navEntry.navigationStart
        );
        break;

      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.reportPerformanceMetric(
            PerformanceMetricType.FIRST_CONTENTFUL_PAINT,
            entry.startTime
          );
        }
        break;

      case 'largest-contentful-paint':
        this.reportPerformanceMetric(
          PerformanceMetricType.LARGEST_CONTENTFUL_PAINT,
          entry.startTime
        );
        break;

      case 'first-input':
        const fiEntry = entry as any;
        this.reportPerformanceMetric(
          PerformanceMetricType.FIRST_INPUT_DELAY,
          fiEntry.processingStart - fiEntry.startTime
        );
        break;

      case 'layout-shift':
        const lsEntry = entry as any;
        if (!lsEntry.hadRecentInput) {
          this.reportPerformanceMetric(
            PerformanceMetricType.CUMULATIVE_LAYOUT_SHIFT,
            lsEntry.value
          );
        }
        break;
    }
  }

  /**
   * 收集页面加载指标
   */
  private collectPageLoadMetrics(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.reportPerformanceMetric(
          PerformanceMetricType.PAGE_LOAD,
          navigation.loadEventEnd - navigation.navigationStart
        );
      }
    }

    // 收集内存使用情况
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.reportPerformanceMetric(
        PerformanceMetricType.MEMORY_USAGE,
        memory.usedJSHeapSize
      );
    }
  }

  /**
   * 更新性能指标
   */
  private updatePerformanceMetrics(type: PerformanceMetricType, value: number): void {
    switch (type) {
      case PerformanceMetricType.PAGE_LOAD:
        this.stats.performanceMetrics.pageLoadTime = value;
        break;
      case PerformanceMetricType.FIRST_CONTENTFUL_PAINT:
        this.stats.performanceMetrics.firstContentfulPaint = value;
        break;
      case PerformanceMetricType.LARGEST_CONTENTFUL_PAINT:
        this.stats.performanceMetrics.largestContentfulPaint = value;
        break;
      case PerformanceMetricType.FIRST_INPUT_DELAY:
        this.stats.performanceMetrics.firstInputDelay = value;
        break;
      case PerformanceMetricType.CUMULATIVE_LAYOUT_SHIFT:
        this.stats.performanceMetrics.cumulativeLayoutShift = value;
        break;
      case PerformanceMetricType.MEMORY_USAGE:
        this.stats.performanceMetrics.memoryUsage = value;
        break;
      case PerformanceMetricType.CPU_USAGE:
        this.stats.performanceMetrics.cpuUsage = value;
        break;
    }
  }

  /**
   * 检查性能阈值
   */
  private async checkPerformanceThresholds(
    type: PerformanceMetricType,
    value: number,
    context?: any
  ): Promise<void> {
    const thresholds = {
      [PerformanceMetricType.PAGE_LOAD]: 3000,
      [PerformanceMetricType.FIRST_CONTENTFUL_PAINT]: 1800,
      [PerformanceMetricType.LARGEST_CONTENTFUL_PAINT]: 2500,
      [PerformanceMetricType.FIRST_INPUT_DELAY]: 100,
      [PerformanceMetricType.CUMULATIVE_LAYOUT_SHIFT]: 0.1
    };

    const threshold = thresholds[type];
    if (threshold && value > threshold) {
      await this.reportError(
        `Performance threshold exceeded: ${type} = ${value}ms (threshold: ${threshold}ms)`,
        {
          component: 'PerformanceMonitor',
          operation: type,
          ...context
        },
        ErrorLevel.WARNING,
        ErrorType.PERFORMANCE
      );
    }
  }

  /**
   * 获取当前性能指标
   */
  private getCurrentPerformanceMetrics(): PerformanceMetrics {
    return { ...this.stats.performanceMetrics };
  }

  /**
   * 获取浏览器信息
   */
  private getBrowserInfo(): BrowserInfo {
    const userAgent = navigator.userAgent;
    
    // 简单的浏览器检测
    let name = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';
    let os = 'Unknown';
    let mobile = false;

    if (userAgent.includes('Chrome')) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Blink';
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'Gecko';
    } else if (userAgent.includes('Safari')) {
      name = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      engine = 'WebKit';
    }

    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
      mobile = true;
    } else if (userAgent.includes('iOS')) {
      os = 'iOS';
      mobile = true;
    }

    return { name, version, engine, os, mobile };
  }

  /**
   * 获取设备信息
   */
  private getDeviceInfo(): DeviceInfo {
    const screen = window.screen;
    const deviceMemory = (navigator as any).deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency;
    const connection = (navigator as any).connection;

    let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
    if (window.innerWidth <= 768) {
      deviceType = 'mobile';
    } else if (window.innerWidth <= 1024) {
      deviceType = 'tablet';
    }

    return {
      type: deviceType,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio || 1,
      memory: deviceMemory,
      cpuCores: hardwareConcurrency,
      networkType: connection?.effectiveType
    };
  }

  /**
   * 获取元素选择器
   */
  private getElementSelector(element: Element): string {
    if (!element) return 'unknown';

    if (element.id) {
      return `#${element.id}`;
    }

    if (element.className) {
      return `.${element.className.split(' ').join('.')}`;
    }

    return element.tagName.toLowerCase();
  }

  /**
   * 映射严重级别到错误级别
   */
  private mapSeverityToLevel(severity: string): ErrorLevel {
    switch (severity) {
      case 'critical':
        return ErrorLevel.CRITICAL;
      case 'high':
        return ErrorLevel.ERROR;
      case 'medium':
        return ErrorLevel.WARNING;
      case 'low':
        return ErrorLevel.INFO;
      default:
        return ErrorLevel.ERROR;
    }
  }

  /**
   * 生成错误ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 销毁监控服务
   */
  public destroy(): void {
    // 清除定时器
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer);
    }

    // 断开性能观察器
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    // 上报剩余错误
    this.flushErrors().catch(error => {
      logger.error('销毁时上报错误失败', error);
    });

    this.initialized = false;
    logger.info('错误监控服务已销毁');
  }
}

/**
 * 导出单例实例
 */
export const errorMonitoringService = ErrorMonitoringService.getInstance();