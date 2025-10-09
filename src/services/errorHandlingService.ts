import { createLogger  } from '@/lib/logger';

/**
* 错误处理专用服务类
* 提供统一的错误捕获、分类、处理和报告功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('error-handling-service');

/**
* 错误类型枚举
 */
export enum ErrorType { NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  BUSINESS_LOGIC = 'business_logic',
  SYSTEM = 'system',
  UI = 'ui',
  DATABASE = 'database',
  WEBSOCKET = 'websocket',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  UNKNOWN = 'unknown';,
}

/**
* 错误严重程度枚举
 */
export enum ErrorSeverity { LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical';,
}

/**
* 错误恢复策略枚举
 */
export enum ErrorRecoveryStrategy { RETRY = 'retry',
  FALLBACK = 'fallback',
  IGNORE = 'ignore',
  REDIRECT = 'redirect',
  REFRESH = 'refresh',
  LOGOUT = 'logout',
  MANUAL = 'manual';,
}

/**
* 标准化错误接口
 */
export interface StandardizedError { id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  code: string;
  message: string;
  userMessage: string;
  details?: Record<string, any>;
  stack?: string;
  timestamp: Date;
  source: {
    component?: string;
    function?: string;
    file?: string;
    line?: number;,
};
  context?: { userId?: string;
    sessionId?: string;
    requestId?: string;
    url?: string;
    userAgent?: string;
    additionalData?: Record<string, any>;,
};
  recoveryStrategy?: ErrorRecoveryStrategy;
  retryCount?: number;
  maxRetries?: number;
  resolved?: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;,
}

/**
* 错误处理配置接口
 */
export interface ErrorHandlingConfig { enabled: boolean;
  logErrors: boolean;
  reportErrors: boolean;
  showUserFriendlyMessages: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  enableFallback: boolean;
  enableRecovery: boolean;
  captureStackTrace: boolean;
  captureContext: boolean;
  filterSensitiveData: boolean;
  errorReportingUrl?: string;
  errorReportingApiKey?: string;,
}

/**
* 错误统计接口
 */
export interface ErrorStatistics { totalErrors: number;
  errorsByType: Record<ErrorType, number>;
  errorsBySeverity: Record<ErrorSeverity, number>;
  errorsByComponent: Record<string, number>;
  resolvedErrors: number;
  unresolvedErrors: number;
  averageResolutionTime: number;
  errorRate: number;
  timeRange: {
    start: Date;
    end: Date;,
};,
}

/**
* 错误恢复结果接口
 */
export interface ErrorRecoveryResult { success: boolean;
  strategy: ErrorRecoveryStrategy;
  message: string;
  data?: any;
  nextAction?: string;,
}

/**
* 错误处理专用服务类
* 提供全面的错误管理功能
 */
export class ErrorHandlingService { private static instance: ErrorHandlingService;
  private readonly logger = createLogger('error-handling-service');

  private errors: Map<string, StandardizedError> = new Map();
  private config: ErrorHandlingConfig;
  private errorHandlers: Map<ErrorType, Array<(error: StandardizedError) => Promise<ErrorRecoveryResult | null>>> = new Map();
  private globalErrorHandler: ((error: StandardizedError) => void) | null = null;

  private constructor() {
    this.config = this.getDefaultConfig();
    this.initializeErrorHandling();,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): ErrorHandlingService { if (!ErrorHandlingService.instance) {
      ErrorHandlingService.instance = new ErrorHandlingService();,
}
    return ErrorHandlingService.instance;,
}

  /**
  * 获取默认配置
   */
  private getDefaultConfig(): ErrorHandlingConfig { return {
      enabled: true,
      logErrors: true,
      reportErrors: true,
      showUserFriendlyMessages: true,
      enableRetry: true,
      maxRetries: 3,
      retryDelay: 1000,
      enableFallback: true,
      enableRecovery: true,
      captureStackTrace: true,
      captureContext: true,
      filterSensitiveData: true,
};,
}

  /**
  * 初始化错误处理
   */
  private initializeErrorHandling(): void { if (!this.config.enabled) {
      return;,
}

    try { // 设置全局错误处理器
      this.setupGlobalErrorHandlers();

      // 注册默认错误处理器
      this.registerDefaultErrorHandlers();

      this.logger.info('错误处理服务初始化完成', { config: this.config  });,
} catch (error) { this.logger.error('错误处理服务初始化失败', { error  });,
}
  }

  /**
  * 设置全局错误处理器
   */
  private setupGlobalErrorHandlers(): void { if (typeof window !== 'undefined') {
      // 捕获未处理的JavaScript错误
      window.addEventListener('error', event => {
        const error = this.createStandardizedError({
          type: ErrorType.SYSTEM,
          severity: ErrorSeverity.HIGH,
          code: 'UNHANDLED_ERROR',
          message: event.message,
          userMessage: '系统发生未知错误，请刷新页面重试',
          originalError: event.error,
          source: {
            file: event.filename,
            line: event.lineno,
            function: 'global',
},
          context: { url: window.location.href,
            userAgent: navigator.userAgent,
}
        });

        this.handleError(error);,
});

      // 捕获未处理的Promise拒绝
      window.addEventListener('unhandledrejection', event => { const error = this.createStandardizedError({
          type: ErrorType.SYSTEM,
          severity: ErrorSeverity.HIGH,
          code: 'UNHANDLED_PROMISE_REJECTION',
          message: event.reason?.message || 'Unhandled promise rejection',
          userMessage: '系统发生异步错误，请重试操作',
          originalError: event.reason,
          source: {
            function: 'promise',
},
          context: { url: window.location.href,
            userAgent: navigator.userAgent,
}
        });

        this.handleError(error);,
});,
}
  }

  /**
  * 注册默认错误处理器
   */
  private registerDefaultErrorHandlers(): void { // 网络错误处理器
    this.registerErrorHandler(ErrorType.NETWORK, async error => {
      if (error.retryCount && error.retryCount < (error.maxRetries || this.config.maxRetries)) {
        return {
          success: true,
          strategy: ErrorRecoveryStrategy.RETRY,
          message: '网络错误，正在重试...',
          nextAction: 'retry',
};,
}

      return { success: false,
        strategy: ErrorRecoveryStrategy.FALLBACK,
        message: '网络连接失败，请检查网络设置',
        nextAction: 'show_offline_mode',
};,
});

    // 认证错误处理器
    this.registerErrorHandler(ErrorType.AUTHENTICATION, async error => { return {
        success: true,
        strategy: ErrorRecoveryStrategy.REDIRECT,
        message: '登录已过期，正在跳转到登录页面...',
        nextAction: 'redirect_to_login',
};,
});

    // 授权错误处理器
    this.registerErrorHandler(ErrorType.AUTHORIZATION, async error => { return {
        success: false,
        strategy: ErrorRecoveryStrategy.MANUAL,
        message: '您没有权限执行此操作',
        nextAction: 'show_permission_denied',
};,
});

    // 验证错误处理器
    this.registerErrorHandler(ErrorType.VALIDATION, async error => { return {
        success: false,
        strategy: ErrorRecoveryStrategy.MANUAL,
        message: error.userMessage || '输入数据验证失败',
        nextAction: 'show_validation_errors',
};,
});

    // 数据库错误处理器
    this.registerErrorHandler(ErrorType.DATABASE, async error => { if (error.code === 'CONNECTION_TIMEOUT' || error.code === 'CONNECTION_LOST') {
        return {
          success: true,
          strategy: ErrorRecoveryStrategy.RETRY,
          message: '数据库连接超时，正在重试...',
          nextAction: 'retry',
};,
}

      return { success: false,
        strategy: ErrorRecoveryStrategy.FALLBACK,
        message: '数据库操作失败，请稍后重试',
        nextAction: 'show_error_message',
};,
});

    // WebSocket错误处理器
    this.registerErrorHandler(ErrorType.WEBSOCKET, async error => { return {
        success: true,
        strategy: ErrorRecoveryStrategy.RETRY,
        message: '连接断开，正在重新连接...',
        nextAction: 'reconnect_websocket',
};,
});

    // 性能错误处理器
    this.registerErrorHandler(ErrorType.PERFORMANCE, async error => { return {
        success: true,
        strategy: ErrorRecoveryStrategy.FALLBACK,
        message: '系统响应缓慢，已启用简化模式',
        nextAction: 'enable_performance_mode',
};,
});

    // 安全错误处理器
    this.registerErrorHandler(ErrorType.SECURITY, async error => { return {
        success: true,
        strategy: ErrorRecoveryStrategy.LOGOUT,
        message: '检测到安全威胁，正在退出登录...',
        nextAction: 'force_logout',
};,
});,
}

  /**
  * 创建标准化错误
  *
  * @param options - 错误选项
  * @returns 标准化错误
   */
  public createStandardizedError(options: { type: ErrorType;
    severity: ErrorSeverity;
    code: string;
    message: string;
    userMessage: string;
    originalError?: Error;
    details?: Record<string, any>;
    source?: {
      component?: string;
      function?: string;
      file?: string;
      line?: number;,
};
    context?: { userId?: string;
      sessionId?: string;
      requestId?: string;
      url?: string;
      userAgent?: string;
      additionalData?: Record<string, any>;,
};
    recoveryStrategy?: ErrorRecoveryStrategy;
    maxRetries?: number;,
}): StandardizedError { const error: StandardizedError = {
      id: this.generateErrorId(),
      type: options.type,
      severity: options.severity,
      code: options.code,
      message: options.message,
      userMessage: options.userMessage,
      details: options.details,
      timestamp: new Date(),
      source: options.source || { },
      context: options.context,
      recoveryStrategy: options.recoveryStrategy,
      retryCount: 0,
      maxRetries: options.maxRetries || this.config.maxRetries,
      resolved: false,
};

    // 捕获堆栈跟踪
    if (this.config.captureStackTrace && options.originalError) { error.stack = options.originalError.stack;,
}

    // 过滤敏感数据
    if (this.config.filterSensitiveData) { error.details = this.filterSensitiveData(error.details);
      if (error.context?.additionalData) {
        error.context.additionalData = this.filterSensitiveData(error.context.additionalData);,
}
    }

    return error;,
}

  /**
  * 处理错误
  *
  * @param error - 标准化错误或原始错误
  * @returns 错误处理结果
   */
  public async handleError(error: StandardizedError | Error): Promise<ErrorRecoveryResult | null> { try {
      let standardizedError: StandardizedError;

      if (error instanceof Error) {
        // 将原始错误转换为标准化错误
        standardizedError = this.createStandardizedError({
          type: this.classifyError(error),
          severity: this.determineSeverity(error),
          code: error.name || 'UNKNOWN_ERROR',
          message: error.message,
          userMessage: this.generateUserFriendlyMessage(error),
          originalError: error,
});,
} else { standardizedError = error;,
}

      // 存储错误
      this.errors.set(standardizedError.id, standardizedError);

      // 记录错误日志
      if (this.config.logErrors) { this.logError(standardizedError);,
}

      // 尝试错误恢复
      let recoveryResult: ErrorRecoveryResult | null = null;
      if (this.config.enableRecovery) { recoveryResult = await this.attemptErrorRecovery(standardizedError);,
}

      // 报告错误
      if (this.config.reportErrors) { await this.reportError(standardizedError);,
}

      // 触发全局错误处理器
      if (this.globalErrorHandler) { this.globalErrorHandler(standardizedError);,
}

      // 触发错误事件
      this.emitErrorEvent(standardizedError, recoveryResult);

      return recoveryResult;,
} catch (handlingError) { this.logger.error('错误处理过程中发生错误', {
        handlingError,
        originalError: error,
});
      return null;,
}
  }

  /**
  * 分类错误
  *
  * @param error - 原始错误
  * @returns 错误类型
   */
  private classifyError(error: Error): ErrorType { const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();

    if (message.includes('network') || message.includes('fetch') || name.includes('networkerror')) {
      return ErrorType.NETWORK;,
}

    if (message.includes('unauthorized') || message.includes('authentication')) { return ErrorType.AUTHENTICATION;,
}

    if (message.includes('forbidden') || message.includes('permission')) { return ErrorType.AUTHORIZATION;,
}

    if (message.includes('validation') || message.includes('invalid')) { return ErrorType.VALIDATION;,
}

    if (message.includes('database') || message.includes('sql')) { return ErrorType.DATABASE;,
}

    if (message.includes('websocket') || message.includes('connection')) { return ErrorType.WEBSOCKET;,
}

    if (message.includes('performance') || message.includes('timeout')) { return ErrorType.PERFORMANCE;,
}

    if (message.includes('security') || message.includes('csrf') || message.includes('xss')) { return ErrorType.SECURITY;,
}

    return ErrorType.UNKNOWN;,
}

  /**
  * 确定错误严重程度
  *
  * @param error - 原始错误
  * @returns 错误严重程度
   */
  private determineSeverity(error: Error): ErrorSeverity { const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();

    if (message.includes('critical') || message.includes('fatal') || name.includes('syntaxerror')) {
      return ErrorSeverity.CRITICAL;,
}

    if (message.includes('security') || message.includes('unauthorized') || message.includes('forbidden')) { return ErrorSeverity.HIGH;,
}

    if (message.includes('validation') || message.includes('network') || message.includes('timeout')) { return ErrorSeverity.MEDIUM;,
}

    return ErrorSeverity.LOW;,
}

  /**
  * 生成用户友好的错误消息
  *
  * @param error - 原始错误
  * @returns 用户友好的消息
   */
  private generateUserFriendlyMessage(error: Error): string { const type = this.classifyError(error);

    switch (type) {
      case ErrorType.NETWORK:
      return '网络连接失败，请检查网络设置后重试';
      case ErrorType.AUTHENTICATION:
      return '登录已过期，请重新登录';
      case ErrorType.AUTHORIZATION:
      return '您没有权限执行此操作';
      case ErrorType.VALIDATION:
      return '输入的数据格式不正确，请检查后重试';
      case ErrorType.DATABASE:
      return '数据操作失败，请稍后重试';
      case ErrorType.WEBSOCKET:
      return '连接断开，正在尝试重新连接...';
      case ErrorType.PERFORMANCE:
      return '系统响应缓慢，请稍后重试';
      case ErrorType.SECURITY:
      return '检测到安全问题，请联系管理员';
      default:
      return '系统发生错误，请刷新页面重试';,
}
  }

  /**
  * 记录错误日志
  *
  * @param error - 标准化错误
   */
  private logError(error: StandardizedError): void { const logData = {
      id: error.id,
      type: error.type,
      severity: error.severity,
      code: error.code,
      message: error.message,
      source: error.source,
      context: error.context,
      timestamp: error.timestamp,
};

    switch (error.severity) { case ErrorSeverity.CRITICAL:
      this.logger.error('严重错误', logData);
      break;
      case ErrorSeverity.HIGH:
      this.logger.error('高级错误', logData);
      break;
      case ErrorSeverity.MEDIUM:
      this.logger.warn('中级错误', logData);
      break;
      case ErrorSeverity.LOW:
      this.logger.info('低级错误', logData);
      break;,
}
  }

  /**
  * 尝试错误恢复
  *
  * @param error - 标准化错误
  * @returns 恢复结果
   */
  private async attemptErrorRecovery(error: StandardizedError): Promise<ErrorRecoveryResult | null> { try {
      // 获取错误类型的处理器
      const handlers = this.errorHandlers.get(error.type);
      if (!handlers || handlers.length === 0) {
        return null;,
}

      // 尝试每个处理器
      for (const handler of handlers) { try {
          const result = await handler(error);
          if (result && result.success) {
            // 更新错误状态
            error.resolved = true;
            error.resolvedAt = new Date();
            error.resolvedBy = 'auto_recovery';

            this.logger.info('错误自动恢复成功', {
              errorId: error.id,
              strategy: result.strategy,
});

            return result;,
}
        } catch (handlerError) { this.logger.error('错误处理器执行失败', {
            handlerError,
            errorId: error.id,
});,
}
      }

      return null;,
} catch (recoveryError) { this.logger.error('错误恢复过程失败', {
        recoveryError,
        errorId: error.id,
});
      return null;,
}
  }

  /**
  * 报告错误
  *
  * @param error - 标准化错误
   */
  private async reportError(error: StandardizedError): Promise<void> { try {
      if (!this.config.errorReportingUrl) {
        return;,
}

      const reportData = { id: error.id,
        type: error.type,
        severity: error.severity,
        code: error.code,
        message: error.message,
        details: error.details,
        stack: error.stack,
        timestamp: error.timestamp,
        source: error.source,
        context: error.context,
};

      const response = await fetch(this.config.errorReportingUrl, { method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.errorReportingApiKey && {
            'Authorization': `Bearer ${this.config.errorReportingApiKey }`,
}),
},
        body: JSON.stringify(reportData),
});

      if (!response.ok) { throw new Error(`错误报告失败: ${response.status } ${ response.statusText }`);,
}

      this.logger.debug('错误报告已发送', { errorId: error.id  });,
} catch (reportingError) { this.logger.error('错误报告发送失败', {
        reportingError,
        errorId: error.id,
});,
}
  }

  /**
  * 触发错误事件
  *
  * @param error - 标准化错误
  * @param recoveryResult - 恢复结果
   */
  private emitErrorEvent(error: StandardizedError, recoveryResult: ErrorRecoveryResult | null): void { try {
      const event = new CustomEvent('error-handling:error', {
        detail: {
          error,
          recoveryResult,
}
      });

      if (typeof window !== 'undefined') { window.dispatchEvent(event);,
}

    } catch (eventError) { this.logger.error('错误事件触发失败', { eventError, errorId: error.id  });,
}
  }

  /**
  * 注册错误处理器
  *
  * @param type - 错误类型
  * @param handler - 处理器函数
   */
  public registerErrorHandler(type: ErrorType,
    handler: (error: StandardizedError) => Promise<ErrorRecoveryResult | null>;
  ): void { if (!this.errorHandlers.has(type)) {
      this.errorHandlers.set(type, []);,
}

    this.errorHandlers.get(type)!.push(handler);

    this.logger.debug('错误处理器已注册', { type  });,
}

  /**
  * 设置全局错误处理器
  *
  * @param handler - 全局处理器函数
   */
  public setGlobalErrorHandler(handler: (error: StandardizedError) => void): void { this.globalErrorHandler = handler;
    this.logger.debug('全局错误处理器已设置');,
}

  /**
  * 重试错误
  *
  * @param errorId - 错误ID
  * @returns 重试结果
   */
  public async retryError(errorId: string): Promise<ErrorRecoveryResult | null> { const error = this.errors.get(errorId);
    if (!error) {
      throw new Error(`错误 ${errorId } 未找到`);,
}

    if (error.retryCount && error.retryCount >= (error.maxRetries || this.config.maxRetries)) { return {
        success: false,
        strategy: ErrorRecoveryStrategy.MANUAL,
        message: '已达到最大重试次数',
        nextAction: 'manual_intervention',
};,
}

    // 增加重试次数
    error.retryCount = (error.retryCount || 0) + 1;

    // 延迟重试
    await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));

    // 尝试恢复
    return await this.attemptErrorRecovery(error);,
}

  /**
  * 标记错误为已解决
  *
  * @param errorId - 错误ID
  * @param resolvedBy - 解决者
   */
  public markErrorAsResolved(errorId: string, resolvedBy: string = 'manual'): void { const error = this.errors.get(errorId);
    if (error) {
      error.resolved = true;
      error.resolvedAt = new Date();
      error.resolvedBy = resolvedBy;

      this.logger.info('错误已标记为已解决', { errorId, resolvedBy  });,
}
  }

  /**
  * 获取错误统计
  *
  * @param timeRange - 时间范围（小时）
  * @returns 错误统计
   */
  public getErrorStatistics(timeRange: number = 24): ErrorStatistics { const now = new Date();
    const startTime = new Date(now.getTime() - (timeRange * 60 * 60 * 1000));

    const filteredErrors = Array.from(this.errors.values());
    .filter(error => error.timestamp >= startTime);

    const stats: ErrorStatistics = {
      totalErrors: filteredErrors.length,
      errorsByType: { } as Record<ErrorType, number>,
      errorsBySeverity: {} as Record<ErrorSeverity, number>,
      errorsByComponent: {},
      resolvedErrors: 0,
      unresolvedErrors: 0,
      averageResolutionTime: 0,
      errorRate: 0,
      timeRange: { start: startTime,
        end: now,
}
    };

    // 初始化计数器
    Object.values(ErrorType).forEach(type => { stats.errorsByType[type] = 0;,
});

    Object.values(ErrorSeverity).forEach(severity => { stats.errorsBySeverity[severity] = 0;,
});

    let totalResolutionTime = 0;
    let resolvedCount = 0;

    // 统计错误
    filteredErrors.forEach(error => { stats.errorsByType[error.type]++;
      stats.errorsBySeverity[error.severity]++;

      const component = error.source.component || 'unknown';
      stats.errorsByComponent[component] = (stats.errorsByComponent[component] || 0) + 1;

      if (error.resolved) {
        stats.resolvedErrors++;
        if (error.resolvedAt) {
          totalResolutionTime += error.resolvedAt.getTime() - error.timestamp.getTime();
          resolvedCount++;,
}
      } else { stats.unresolvedErrors++;,
}
    });

    // 计算平均解决时间
    if (resolvedCount > 0) { stats.averageResolutionTime = totalResolutionTime / resolvedCount;,
}

    // 计算错误率（每小时错误数）
    stats.errorRate = filteredErrors.length / timeRange;

    return stats;,
}

  /**
  * 获取错误详情
  *
  * @param errorId - 错误ID
  * @returns 错误详情
   */
  public getError(errorId: string): StandardizedError | null { return this.errors.get(errorId) || null;,
}

  /**
  * 获取错误列表
  *
  * @param filters - 过滤条件
  * @returns 错误列表
   */
  public getErrors(filters?: { type?: ErrorType;
    severity?: ErrorSeverity;
    resolved?: boolean;
    component?: string;
    timeRange?: number;,
}): StandardizedError[] { let errors = Array.from(this.errors.values());

    if (filters) {
      if (filters.type) {
        errors = errors.filter(error => error.type === filters.type);,
}

      if (filters.severity) { errors = errors.filter(error => error.severity === filters.severity);,
}

      if (filters.resolved !== undefined) { errors = errors.filter(error => error.resolved === filters.resolved);,
}

      if (filters.component) { errors = errors.filter(error => error.source.component === filters.component);,
}

      if (filters.timeRange) { const cutoffTime = new Date(Date.now() - (filters.timeRange * 60 * 60 * 1000));
        errors = errors.filter(error => error.timestamp >= cutoffTime);,
}
    }

    return errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());,
}

  /**
  * 清理旧错误
  *
  * @param olderThanHours - 清理多少小时前的错误
   */
  public cleanupOldErrors(olderThanHours: number = 168): void { // 默认7天
  const cutoffTime = new Date(Date.now() - (olderThanHours * 60 * 60 * 1000));
  let cleanedCount = 0;

  for (const [id, error] of this.errors.entries()) {
    if (error.timestamp < cutoffTime && error.resolved) {
      this.errors.delete(id);
      cleanedCount++;,
}
  }

  this.logger.info('旧错误清理完成', { cleanedCount,
    remainingCount: this.errors.size,
});,
}

/**
* 过滤敏感数据
*
* @param data - 原始数据
* @returns 过滤后的数据
 */
private filterSensitiveData(data: any): any { if (!data || typeof data !== 'object') {
    return data;,
}

  const sensitiveKeys = [;
    'password', 'token', 'secret', 'key', 'auth', 'credential',
    'ssn', 'social', 'credit', 'card', 'cvv', 'pin',
];

  const filtered = { ...data  };

  for (const key of Object.keys(filtered)) { const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      filtered[key] = '[FILTERED]';,
} else if (typeof filtered[key] === 'object') { filtered[key] = this.filterSensitiveData(filtered[key]);,
}
  }

  return filtered;,
}

/**
* 生成错误ID
 */
private generateErrorId(): string { return `error_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

/**
* 更新配置
*
* @param newConfig - 新配置
 */
public updateConfig(newConfig: Partial<ErrorHandlingConfig>): void { this.config = { ...this.config, ...newConfig  };
  this.logger.info('错误处理配置已更新', { config: this.config  });,
}

/**
* 获取当前配置
 */
public getConfig(): ErrorHandlingConfig { return { ...this.config  };,
}
}

// 导出单例实例
export const errorHandlingService = ErrorHandlingService.getInstance();