import { createLogger  } from '@/lib/logger';
import { ErrorCode, AppError, getErrorMessage  } from './errorHandler';
import { SkillErrorType, SkillError  } from './skillErrorHandler';

/**
* 文件级注释：统一错误处理系统
* 整合所有现有错误处理器，提供一致的错误处理策略和用户体验
*
* 主要功能：
* - 统一错误分类和标准化处理
* - 智能错误恢复和重试机制
* - 用户友好的错误通知系统
* - 完整的错误监控和报告
* - 错误历史记录和分析
* - 性能优化的错误处理流程
*
* @author SOLO Coding
* @version 2.0.0
 */

const logger = createLogger('unified-error-system');

/**
* 错误严重级别枚举
* 定义错误的严重程度，用于确定处理策略
 */
export enum ErrorSeverity { /** 低级错误：不影响核心功能  */
  LOW = 'low',
  /** 中级错误：影响部分功能  */
  MEDIUM = 'medium',
  /** 高级错误：影响核心功能  */
  HIGH = 'high',
  /** 严重错误：系统无法正常运行  */
  CRITICAL = 'critical';,
}

/**
* 错误处理策略枚举
* 定义不同的错误处理方式
 */
export enum ErrorHandlingStrategy { /** 静默处理：仅记录日志  */
  SILENT = 'silent',
  /** 显示提示消息  */
  TOAST = 'toast',
  /** 显示模态框  */
  MODAL = 'modal',
  /** 重定向到错误页面  */
  REDIRECT = 'redirect',
  /** 自动重试  */
  RETRY = 'retry',
  /** 使用备用方案  */
  FALLBACK = 'fallback',
  /** 刷新页面  */
  REFRESH = 'refresh';,
}

/**
* 错误类型枚举
* 定义错误的分类
 */
export enum ErrorType { /** 应用错误  */
  APP = 'app',
  /** 技能错误  */
  SKILL = 'skill',
  /** 网络错误  */
  NETWORK = 'network',
  /** 验证错误  */
  VALIDATION = 'validation',
  /** 权限错误  */
  PERMISSION = 'permission',
  /** 业务逻辑错误  */
  BUSINESS = 'business',
  /** 系统错误  */
  SYSTEM = 'system',
  /** 未知错误  */
  UNKNOWN = 'unknown';,
}

/**
* 错误上下文接口
* 提供错误发生时的环境信息
 */
export interface ErrorContext { /** 组件名称  */
  component?: string;
  /** 用户ID  */
  userId?: string;
  /** 游戏状态ID  */
  gameStateId?: string;
  /** 房间ID  */
  roomId?: string;
  /** 技能名称  */
  skillName?: string;
  /** 操作类型  */
  operation?: string;
  /** 请求URL  */
  url?: string;
  /** 用户代理  */
  userAgent?: string;
  /** 时间戳  */
  timestamp?: number;
  /** 会话ID  */
  sessionId?: string;
  /** 额外元数据  */
  metadata?: Record<string, any>;,
}

/**
* 错误处理选项接口
* 配置错误处理的行为
 */
export interface ErrorHandlingOptions { /** 是否显示用户通知  */
  showNotification?: boolean;
  /** 是否记录日志  */
  logError?: boolean;
  /** 是否上报监控  */
  reportToMonitoring?: boolean;
  /** 是否尝试自动恢复  */
  attemptRecovery?: boolean;
  /** 最大重试次数  */
  maxRetries?: number;
  /** 重试延迟（毫秒）  */
  retryDelay?: number;
  /** 自定义恢复函数  */
  customRecovery?: () => Promise<boolean>;
  /** 自定义通知消息  */
  customMessage?: string;
  /** 是否静默处理  */
  silent?: boolean;
  /** 错误处理策略覆盖  */
  strategyOverride?: ErrorHandlingStrategy;
  /** 严重级别覆盖  */
  severityOverride?: ErrorSeverity;,
}

/**
* 统一错误对象接口
* 标准化所有类型的错误
 */
export interface UnifiedError { /** 错误唯一标识  */
  id: string;
  /** 错误类型  */
  type: ErrorType;
  /** 错误代码  */
  code: string;
  /** 错误消息  */
  message: string;
  /** 用户友好消息  */
  userMessage: string;
  /** 原始错误对象  */
  originalError: any;
  /** 错误上下文  */
  context: ErrorContext;
  /** 时间戳  */
  timestamp: number;
  /** 错误严重级别  */
  severity: ErrorSeverity;
  /** 处理策略  */
  strategy: ErrorHandlingStrategy;
  /** 堆栈跟踪  */
  stack?: string;
  /** 是否可重试  */
  retryable: boolean;
  /** 最大重试次数  */
  maxRetries: number;
  /** 当前重试次数  */
  currentRetries: number;
  /** 错误详情  */
  details?: Record<string, any>;
  /** 恢复建议  */
  recoverySuggestion?: string;,
}

/**
* 错误处理结果接口
* 描述错误处理的结果
 */
export interface ErrorHandlingResult { /** 错误ID  */
  errorId: string;
  /** 是否成功处理  */
  handled: boolean;
  /** 是否成功恢复  */
  recovered: boolean;
  /** 用户友好消息  */
  userMessage: string;
  /** 是否需要重试  */
  shouldRetry: boolean;
  /** 重试次数  */
  retryCount: number;
  /** 错误严重级别  */
  severity: ErrorSeverity;
  /** 错误分类  */
  classification: {
    type: ErrorType;
    category: string;
    subcategory?: string;,
};
  /** 处理耗时（毫秒）  */
  processingTime: number;
  /** 恢复建议  */
  recoverySuggestion?: string;
  /** 是否需要用户干预  */
  requiresUserAction: boolean;,
}

/**
* 错误统计信息接口
 */
export interface ErrorStatistics { /** 总错误数  */
  total: number;
  /** 按类型统计  */
  byType: Record<ErrorType, number>;
  /** 按严重级别统计  */
  bySeverity: Record<ErrorSeverity, number>;
  /** 按策略统计  */
  byStrategy: Record<ErrorHandlingStrategy, number>;
  /** 成功恢复数  */
  recovered: number;
  /** 失败数  */
  failed: number;
  /** 重试成功数  */
  retrySucceeded: number;
  /** 重试失败数  */
  retryFailed: number;
  /** 平均处理时间  */
  averageProcessingTime: number;,
}

/**
* 统一错误处理系统类
* 整合所有错误处理逻辑的核心类
 */
export class UnifiedErrorSystem { private static instance: UnifiedErrorSystem;

  /** 错误历史记录  */
  private errorHistory: UnifiedError[] = [];
  /** 重试计数器  */
  private retryCounters = new Map<string, number>();
  /** 重试定时器  */
  private retryTimers = new Map<string, NodeJS.Timeout>();
  /** 错误统计  */
  private statistics: ErrorStatistics = {
    total: 0,
    byType: { } as Record<ErrorType, number>,
    bySeverity: {} as Record<ErrorSeverity, number>,
    byStrategy: {} as Record<ErrorHandlingStrategy, number>,
    recovered: 0,
    failed: 0,
    retrySucceeded: 0,
    retryFailed: 0,
    averageProcessingTime: 0,
};

  private readonly MAX_HISTORY_SIZE = 1000;
  private readonly DEFAULT_RETRY_DELAY = 1000;
  private readonly MAX_RETRY_ATTEMPTS = 3;

  private constructor() { logger.info('统一错误处理系统已初始化');
    this.initializeErrorHandlers();,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): UnifiedErrorSystem { if (!UnifiedErrorSystem.instance) {
      UnifiedErrorSystem.instance = new UnifiedErrorSystem();,
}
    return UnifiedErrorSystem.instance;,
}

  /**
  * 处理错误的主要方法
  * @param error - 原始错误对象
  * @param context - 错误上下文
  * @param options - 处理选项
  * @returns 错误处理结果
   */
  public async handleError(
    error: Error | AppError | SkillError | unknown,
    context: ErrorContext = {},
    options: ErrorHandlingOptions = {}
  ): Promise<ErrorHandlingResult> { const startTime = Date.now();
    const errorId = this.generateErrorId();

    try {
      // 1. 标准化错误对象
      const unifiedError = this.normalizeError(error, context, errorId);

      // 2. 应用选项覆盖
      this.applyOptionsOverride(unifiedError, options);

      // 3. 记录错误历史
      this.addToHistory(unifiedError);

      // 4. 更新统计信息
      this.updateStatistics(unifiedError);

      // 5. 记录日志
      if (options.logError !== false) {
        this.logError(unifiedError);,
}

      // 6. 执行错误处理策略
      const result = await this.executeHandlingStrategy(unifiedError, options);

      // 7. 计算处理时间
      const processingTime = Date.now() - startTime;
      result.processingTime = processingTime;

      // 8. 更新平均处理时间
      this.updateAverageProcessingTime(processingTime);

      logger.debug('错误处理完成', { errorId,
        handled: result.handled,
        recovered: result.recovered,
        processingTime,
});

      return result;,
} catch (handlingError) { logger.error('错误处理器本身发生错误', {
        originalError: error,
        handlingError,
        errorId,
});

      // 返回基本的错误处理结果
      return { errorId,
        handled: false,
        recovered: false,
        userMessage: '系统发生未知错误，请稍后重试',
        shouldRetry: false,
        retryCount: 0,
        severity: ErrorSeverity.HIGH,
        classification: {
          type: ErrorType.SYSTEM,
          category: 'handler_error',
},
        processingTime: Date.now() - startTime,
        requiresUserAction: true,
};,
}
  }

  /**
  * 包装异步函数，提供统一错误处理
  * @param fn - 异步函数
  * @param context - 错误上下文
  * @param options - 处理选项
   */
  public wrapAsync<T extends any[], R>(fn: (...args: T) => Promise<R>,
    context?: ErrorContext,
    options: ErrorHandlingOptions = {}
  ) { return async (...args: T): Promise<R | null> => {
      try {
        const result = await fn(...args);
        return result;,
} catch (error) { const handlingResult = await this.handleError(error, context, options);

        // 如果错误可以恢复且有自定义恢复函数，尝试恢复
        if (handlingResult.shouldRetry && options.customRecovery) {
          try {
            const recovered = await options.customRecovery();
            if (recovered) {
              return await fn(...args);,
}
          } catch (recoveryError) { logger.warn('自定义恢复失败', { recoveryError  });,
}
        }

        return null;,
}
    };,
}

  /**
  * 包装同步函数，提供统一错误处理
  * @param fn - 同步函数
  * @param context - 错误上下文
  * @param options - 处理选项
   */
  public wrapSync<T extends any[], R>(fn: (...args: T) => R,
    context?: ErrorContext,
    options: ErrorHandlingOptions = {}
  ) { return (...args: T): R | null => {
      try {
        const result = fn(...args);
        return result;,
} catch (error) { // 同步处理错误（不等待异步操作）
        this.handleError(error, context, options).catch(handlingError => {
          logger.error('同步错误处理失败', { handlingError  });,
});
        return null;,
}
    };,
}

  /**
  * 标准化错误对象
  * @param error - 原始错误
  * @param context - 错误上下文
  * @param errorId - 错误ID
   */
  private normalizeError(
    error: any,
    context: ErrorContext,
    errorId: string
  ): UnifiedError { const timestamp = Date.now();
    const enhancedContext = {
      ...context,
      timestamp,
      sessionId: this.getSessionId(),
};

    // 处理 AppError
    if (error instanceof AppError) { return {
        id: errorId,
        type: ErrorType.APP,
        code: error.code,
        message: error.message,
        userMessage: getErrorMessage(error),
        originalError: error,
        context: enhancedContext,
        timestamp,
        severity: this.determineSeverity(error.code),
        strategy: this.determineStrategy(error.code),
        stack: error.stack,
        retryable: this.isRetryable(error.code),
        maxRetries: this.getMaxRetries(error.code),
        currentRetries: 0,
        details: error.details,
        recoverySuggestion: this.getRecoverySuggestion(error.code),
};,
}

    // 处理 SkillError
    if (this.isSkillError(error)) { return {
        id: errorId,
        type: ErrorType.SKILL,
        code: error.type,
        message: error.message,
        userMessage: this.getSkillErrorUserMessage(error),
        originalError: error,
        context: {
          ...enhancedContext,
          skillName: error.skillName,
          userId: error.userId,
          gameStateId: error.gameStateId,
},
        timestamp,
        severity: this.determineSkillErrorSeverity(error.type),
        strategy: this.determineSkillErrorStrategy(error.type),
        retryable: this.isSkillErrorRetryable(error.type),
        maxRetries: 3,
        currentRetries: 0,
        details: error.details,
        recoverySuggestion: this.getSkillErrorRecoverySuggestion(error.type),
};,
}

    // 处理网络错误
    if (this.isNetworkError(error)) { return {
        id: errorId,
        type: ErrorType.NETWORK,
        code: 'NETWORK_ERROR',
        message: error.message || '网络连接失败',
        userMessage: '网络连接失败，请检查网络设置后重试',
        originalError: error,
        context: enhancedContext,
        timestamp,
        severity: ErrorSeverity.MEDIUM,
        strategy: ErrorHandlingStrategy.RETRY,
        retryable: true,
        maxRetries: 5,
        currentRetries: 0,
        recoverySuggestion: '检查网络连接或稍后重试',
};,
}

    // 处理验证错误
    if (this.isValidationError(error)) { return {
        id: errorId,
        type: ErrorType.VALIDATION,
        code: 'VALIDATION_ERROR',
        message: error.message || '数据验证失败',
        userMessage: error.message || '输入数据格式不正确，请检查后重试',
        originalError: error,
        context: enhancedContext,
        timestamp,
        severity: ErrorSeverity.LOW,
        strategy: ErrorHandlingStrategy.TOAST,
        retryable: false,
        maxRetries: 0,
        currentRetries: 0,
        recoverySuggestion: '请检查输入数据的格式和内容',
};,
}

    // 处理权限错误
    if (this.isPermissionError(error)) { return {
        id: errorId,
        type: ErrorType.PERMISSION,
        code: 'PERMISSION_DENIED',
        message: error.message || '权限不足',
        userMessage: '您没有执行此操作的权限',
        originalError: error,
        context: enhancedContext,
        timestamp,
        severity: ErrorSeverity.HIGH,
        strategy: ErrorHandlingStrategy.MODAL,
        retryable: false,
        maxRetries: 0,
        currentRetries: 0,
        recoverySuggestion: '请联系管理员获取相应权限',
};,
}

    // 处理通用错误
    return { id: errorId,
      type: ErrorType.UNKNOWN,
      code: 'UNKNOWN_ERROR',
      message: error?.message || String(error) || '未知错误',
      userMessage: '系统发生未知错误，请稍后重试',
      originalError: error,
      context: enhancedContext,
      timestamp,
      severity: ErrorSeverity.MEDIUM,
      strategy: ErrorHandlingStrategy.TOAST,
      stack: error?.stack,
      retryable: false,
      maxRetries: 0,
      currentRetries: 0,
      recoverySuggestion: '如果问题持续存在，请联系技术支持',
};,
}

  /**
  * 应用选项覆盖
  * @param error - 统一错误对象
  * @param options - 处理选项
   */
  private applyOptionsOverride(error: UnifiedError, options: ErrorHandlingOptions): void { if (options.strategyOverride) {
      error.strategy = options.strategyOverride;,
}

    if (options.severityOverride) { error.severity = options.severityOverride;,
}

    if (options.maxRetries !== undefined) { error.maxRetries = options.maxRetries;,
}

    if (options.customMessage) { error.userMessage = options.customMessage;,
}
  }

  /**
  * 执行错误处理策略
  * @param error - 统一错误对象
  * @param options - 处理选项
   */
  private async executeHandlingStrategy(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<ErrorHandlingResult> { const result: ErrorHandlingResult = {
      errorId: error.id,
      handled: false,
      recovered: false,
      userMessage: error.userMessage,
      shouldRetry: false,
      retryCount: error.currentRetries,
      severity: error.severity,
      classification: {
        type: error.type,
        category: this.getErrorCategory(error),
},
      processingTime: 0,
      requiresUserAction: false,
};

    try { // 如果是静默模式，直接返回
      if (options.silent) {
        result.handled = true;
        return result;,
}

      switch (error.strategy) { case ErrorHandlingStrategy.SILENT:
        result.handled = true;
        break;

        case ErrorHandlingStrategy.TOAST:
        if (options.showNotification !== false) {
          await this.showToast(error.userMessage, error.severity);,
}
        result.handled = true;
        break;

        case ErrorHandlingStrategy.MODAL:
        if (options.showNotification !== false) { await this.showModal(error.userMessage, error);,
}
        result.handled = true;
        result.requiresUserAction = true;
        break;

        case ErrorHandlingStrategy.REDIRECT:
        await this.redirectToErrorPage(error);
        result.handled = true;
        result.requiresUserAction = true;
        break;

        case ErrorHandlingStrategy.RETRY:
        if (error.retryable && options.attemptRecovery !== false) { result.shouldRetry = true;
          result.recovered = await this.attemptRetry(error, options);,
}
        result.handled = true;
        break;

        case ErrorHandlingStrategy.FALLBACK:
        result.recovered = await this.executeFallback(error, options);
        result.handled = true;
        break;

        case ErrorHandlingStrategy.REFRESH:
        await this.refreshPage();
        result.handled = true;
        result.requiresUserAction = true;
        break;

        default:
        logger.warn('未知的错误处理策略', { strategy: error.strategy  });
        result.handled = false;,
}

      // 更新恢复建议
      if (error.recoverySuggestion) { result.recoverySuggestion = error.recoverySuggestion;,
}

      return result;,
} catch (strategyError) { logger.error('执行错误处理策略失败', {
        strategy: error.strategy,
        strategyError,
});

      result.handled = false;
      result.userMessage = '错误处理失败，请刷新页面重试';
      return result;,
}
  }

  /**
  * 初始化错误处理器
   */
  private initializeErrorHandlers(): void { // 全局未捕获错误处理
    if (typeof window !== 'undefined') {
      window.addEventListener('error', event => {
        this.handleError(event.error, {
          component: 'global',
          operation: 'unhandled_error',
          url: window.location.href,
});,
});

      window.addEventListener('unhandledrejection', event => { this.handleError(event.reason, {
          component: 'global',
          operation: 'unhandled_promise_rejection',
          url: window.location.href,
});,
});,
}
  }

  // 其他私有方法将在下一部分继续...

  /**
  * 尝试重试操作
  * @param error - 统一错误对象
  * @param options - 处理选项
   */
  private async attemptRetry(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<boolean> { const retryKey = `${error.type }_${ error.code }`;
    const currentRetries = this.retryCounters.get(retryKey) || 0;

    if (currentRetries >= error.maxRetries) { logger.warn('已达到最大重试次数', {
        errorId: error.id,
        currentRetries,
        maxRetries: error.maxRetries,
});
      return false;,
}

    const retryDelay = options.retryDelay || this.calculateRetryDelay(currentRetries);

    logger.info('准备重试操作', { errorId: error.id,
      retryCount: currentRetries + 1,
      delay: retryDelay,
});

    return new Promise(resolve => { const timer = setTimeout(async () => {
        try {
          this.retryCounters.set(retryKey, currentRetries + 1);
          error.currentRetries = currentRetries + 1;

          // 如果有自定义恢复函数，尝试执行
          if (options.customRecovery) {
            const recovered = await options.customRecovery();
            if (recovered) {
              this.statistics.retrySucceeded++;
              logger.info('重试成功', { errorId: error.id  });
              resolve(true);
              return;,
}
          }

          this.statistics.retryFailed++;
          resolve(false);,
} catch (retryError) { logger.error('重试过程中发生错误', {
            errorId: error.id,
            retryError,
});
          this.statistics.retryFailed++;
          resolve(false);,
} finally { this.retryTimers.delete(error.id);,
}
      }, retryDelay);

      this.retryTimers.set(error.id, timer);,
});,
}

  /**
  * 执行备用方案
  * @param error - 统一错误对象
  * @param options - 处理选项
   */
  private async executeFallback(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<boolean> { logger.info('执行备用方案', {
      errorId: error.id,
      errorType: error.type,
});

    try { switch (error.type) {
        case ErrorType.APP:
        return await this.networkFallback(error);
        case ErrorType.SKILL:
        return await this.skillFallback(error);
        case ErrorType.APP:
        return await this.appFallback(error);
        default:
        return await this.genericFallback(error);,
}
    } catch (fallbackError) { logger.error('备用方案执行失败', {
        errorId: error.id,
        fallbackError,
});
      return false;,
}
  }

  /**
  * 网络错误备用方案
  * @param error - 统一错误对象
   */
  private async networkFallback(error: UnifiedError): Promise<boolean> { // 尝试使用缓存数据
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open('app-cache');
        const cachedResponse = await cache.match(error.context.url || '');
        if (cachedResponse) {
          logger.info('使用缓存数据作为备用方案', { errorId: error.id  });
          return true;,
}
      } catch (cacheError) { logger.warn('缓存备用方案失败', { cacheError  });,
}
    }
    return false;,
}

  /**
  * 技能错误备用方案
  * @param error - 统一错误对象
   */
  private async skillFallback(error: UnifiedError): Promise<boolean> { // 重置技能状态或使用默认技能
    logger.info('执行技能错误备用方案', {
      errorId: error.id,
      skillName: error.context.skillName,
});

    // 这里可以实现具体的技能恢复逻辑
    // 例如：重置技能状态、使用默认技能等
    return false;,
}

  /**
  * 应用错误备用方案
  * @param error - 统一错误对象
   */
  private async appFallback(error: UnifiedError): Promise<boolean> { // 根据具体的应用错误类型执行不同的备用方案
    switch (error.code) {
      case ErrorCode.DATA_NOT_FOUND:
      // 使用默认数据
      return true;
      case ErrorCode.DATA_CONFLICT:
      // 尝试合并冲突
      return false;
      default:
      return false;,
}
  }

  /**
  * 通用备用方案
  * @param error - 统一错误对象
   */
  private async genericFallback(error: UnifiedError): Promise<boolean> { // 通用的备用方案，如显示默认内容
    logger.info('执行通用备用方案', { errorId: error.id  });
    return false;,
}

  /**
  * 显示Toast消息
  * @param message - 消息内容
  * @param severity - 严重级别
   */
  private async showToast(message: string, severity: ErrorSeverity): Promise<void> { if (typeof window === 'undefined') return;

    // 尝试使用全局Toast函数
    if ((window as any).showToast) {
      (window as any).showToast({
        title: this.getSeverityTitle(severity),
        description: message,
        variant: this.getSeverityVariant(severity),
        duration: this.getToastDuration(severity),
});,
} else { // 备用方案：使用console输出
      console.warn(`[${this.getSeverityTitle(severity) }] ${ message }`);,
}
  }

  /**
  * 显示模态框
  * @param message - 消息内容
  * @param error - 错误对象
   */
  private async showModal(message: string, error: UnifiedError): Promise<void> { if (typeof window === 'undefined') return;

    // 尝试使用全局模态框函数
    if ((window as any).showErrorModal) {
      (window as any).showErrorModal({
        title: '系统错误',
        message,
        error,
        severity: error.severity,
        actions: this.getModalActions(error),
});,
} else { // 备用方案：使用alert
      alert(`${this.getSeverityTitle(error.severity) }: ${ message }`);,
}
  }

  /**
  * 重定向到错误页面
  * @param error - 错误对象
   */
  private async redirectToErrorPage(error: UnifiedError): Promise<void> { if (typeof window === 'undefined') return;

    const errorPageUrl = `/error?code=${error.code }&id=${ error.id }&type=${ error.type }`;

    // 延迟重定向，给用户时间看到错误信息
    setTimeout(() => { window.location.href = errorPageUrl;,
}, 2000);,
}

  /**
  * 刷新页面
   */
  private async refreshPage(): Promise<void> { if (typeof window === 'undefined') return;

    // 延迟刷新，给用户时间看到错误信息
    setTimeout(() => {
      window.location.reload();,
}, 3000);,
}

  /**
  * 记录错误日志
  * @param error - 统一错误对象
   */
  private logError(error: UnifiedError): void { const logData = {
      id: error.id,
      type: error.type,
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      timestamp: new Date(error.timestamp).toISOString(),
      retryable: error.retryable,
      currentRetries: error.currentRetries,
};

    switch (error.severity) { case ErrorSeverity.CRITICAL:
      logger.error('严重错误', logData);
      break;
      case ErrorSeverity.HIGH:
      logger.error('高级错误', logData);
      break;
      case ErrorSeverity.MEDIUM:
      logger.warn('中级错误', logData);
      break;
      case ErrorSeverity.LOW:
      logger.info('低级错误', logData);
      break;,
}
  }

  /**
  * 添加错误到历史记录
  * @param error - 统一错误对象
   */
  private addToHistory(error: UnifiedError): void { this.errorHistory.push(error);

    // 保持历史记录大小限制
    if (this.errorHistory.length > this.MAX_HISTORY_SIZE) {
      this.errorHistory.shift();,
}
  }

  /**
  * 更新统计信息
  * @param error - 统一错误对象
   */
  private updateStatistics(error: UnifiedError): void { this.statistics.total++;

    // 按类型统计
    this.statistics.byType[error.type] = (this.statistics.byType[error.type] || 0) + 1;

    // 按严重级别统计
    this.statistics.bySeverity[error.severity] = (this.statistics.bySeverity[error.severity] || 0) + 1;

    // 按策略统计
    this.statistics.byStrategy[error.strategy] = (this.statistics.byStrategy[error.strategy] || 0) + 1;,
}

  /**
  * 更新平均处理时间
  * @param processingTime - 处理时间
   */
  private updateAverageProcessingTime(processingTime: number): void { const total = this.statistics.total;
    const currentAverage = this.statistics.averageProcessingTime;

    // 计算新的平均值
    this.statistics.averageProcessingTime =;
    (currentAverage * (total - 1) + processingTime) / total;,
}

  /**
  * 生成错误ID
   */
  private generateErrorId(): string { return `err_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

  /**
  * 获取会话ID
   */
  private getSessionId(): string { if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('error_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;
        sessionStorage.setItem('error_session_id', sessionId);,
}
      return sessionId;,
}
    return 'server_session';,
}

  /**
  * 计算重试延迟（指数退避）
  * @param retryCount - 重试次数
   */
  private calculateRetryDelay(retryCount: number): number { return Math.min(this.DEFAULT_RETRY_DELAY * Math.pow(2, retryCount), 30000);,
}

  /**
  * 确定错误严重级别
  * @param code - 错误代码
   */
  private determineSeverity(code: string): ErrorSeverity { const severityMap: Record<string, ErrorSeverity> = {
      [ErrorCode.AUTH_FAILED]: ErrorSeverity.CRITICAL,
      [ErrorCode.PERMISSION_DENIED]: ErrorSeverity.CRITICAL,
      [ErrorCode.DATA_CONFLICT]: ErrorSeverity.HIGH,
      [ErrorCode.API_ERROR]: ErrorSeverity.HIGH,
      [ErrorCode.NETWORK_ERROR]: ErrorSeverity.MEDIUM,
      [ErrorCode.DATA_NOT_FOUND]: ErrorSeverity.MEDIUM,
      [ErrorCode.DATA_INVALID]: ErrorSeverity.LOW,
      [ErrorCode.VALIDATION_FAILED]: ErrorSeverity.LOW,
};

    return severityMap[code] || ErrorSeverity.MEDIUM;,
}

  /**
  * 确定错误处理策略
  * @param code - 错误代码
   */
  private determineStrategy(code: string): ErrorHandlingStrategy { const strategyMap: Record<string, ErrorHandlingStrategy> = {
      [ErrorCode.AUTH_REQUIRED]: ErrorHandlingStrategy.REDIRECT,
      [ErrorCode.PERMISSION_DENIED]: ErrorHandlingStrategy.MODAL,
      [ErrorCode.NETWORK_ERROR]: ErrorHandlingStrategy.RETRY,
      [ErrorCode.API_ERROR]: ErrorHandlingStrategy.RETRY,
      [ErrorCode.DATA_CONFLICT]: ErrorHandlingStrategy.MODAL,
      [ErrorCode.DATA_INVALID]: ErrorHandlingStrategy.TOAST,
      [ErrorCode.VALIDATION_FAILED]: ErrorHandlingStrategy.TOAST,
};

    return strategyMap[code] || ErrorHandlingStrategy.TOAST;,
}

  /**
  * 判断错误是否可重试
  * @param code - 错误代码
   */
  private isRetryable(code: string): boolean { const retryableCodes = [;
      ErrorCode.NETWORK_ERROR,
      ErrorCode.API_ERROR,
      ErrorCode.TIMEOUT_ERROR,
];
    return retryableCodes.includes(code as ErrorCode);,
}

  /**
  * 获取最大重试次数
  * @param code - 错误代码
   */
  private getMaxRetries(code: string): number { const retryConfig: Record<string, number> = {
      [ErrorCode.NETWORK_ERROR]: 5,
      [ErrorCode.API_ERROR]: 3,
      [ErrorCode.TIMEOUT_ERROR]: 3,
};
    return retryConfig[code] || 1;,
}

  /**
  * 获取恢复建议
  * @param code - 错误代码
   */
  private getRecoverySuggestion(code: string): string { const suggestionMap: Record<string, string> = {
      [ErrorCode.NETWORK_ERROR]: '检查网络连接或稍后重试',
      [ErrorCode.AUTH_FAILED]: '请重新登录',
      [ErrorCode.PERMISSION_DENIED]: '请联系管理员获取权限',
      [ErrorCode.DATA_NOT_FOUND]: '请刷新页面或检查数据是否存在',
      [ErrorCode.DATA_CONFLICT]: '请刷新页面获取最新数据',
      [ErrorCode.DATA_INVALID]: '请检查输入数据的格式和内容',
};

    return suggestionMap[code] || '如果问题持续存在，请联系技术支持';,
}

  /**
  * 判断是否为技能错误
  * @param error - 错误对象
   */
  private isSkillError(error: any): error is SkillError { return error &&;
    typeof error === 'object' &&;
    'type' in error &&
    Object.values(SkillErrorType).includes(error.type);,
}

  /**
  * 判断是否为网络错误
  * @param error - 错误对象
   */
  private isNetworkError(error: any): boolean { if (!error) return false;

    const message = (error.message || '').toLowerCase();
    const name = (error.name || '').toLowerCase();

    return message.includes('network') ||;
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('connection') ||
    name === 'networkerror' ||;
    name === 'typeerror' && message.includes('fetch');,
}

  /**
  * 判断是否为验证错误
  * @param error - 错误对象
   */
  private isValidationError(error: any): boolean { if (!error) return false;

    const message = (error.message || '').toLowerCase();
    const name = (error.name || '').toLowerCase();

    return message.includes('validation') ||;
    message.includes('invalid') ||
    message.includes('required') ||
    name === 'validationerror';,
}

  /**
  * 判断是否为权限错误
  * @param error - 错误对象
   */
  private isPermissionError(error: any): boolean { if (!error) return false;

    const message = (error.message || '').toLowerCase();
    const name = (error.name || '').toLowerCase();

    return message.includes('permission') ||;
    message.includes('unauthorized') ||
    message.includes('forbidden') ||
    name === 'permissionerror' ||;
    (error.status && [401, 403].includes(error.status));,
}

  /**
  * 获取技能错误的用户友好消息
  * @param error - 技能错误对象
   */
  private getSkillErrorUserMessage(error: SkillError): string { const messageMap: Record<SkillErrorType, string> = {
      [SkillErrorType.VALIDATION_ERROR]: '技能使用条件不满足',
      [SkillErrorType.EXECUTION_ERROR]: '技能执行失败，请重试',
      [SkillErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络',
      [SkillErrorType.PERMISSION_ERROR]: '没有权限使用此技能',
      [SkillErrorType.CONFLICT_ERROR]: '技能冲突，请稍后重试',
      [SkillErrorType.TIMEOUT_ERROR]: '技能执行超时，请重试',
};
    return messageMap[error.type] || '技能操作失败';,
}

  /**
  * 确定技能错误严重级别
  * @param type - 技能错误类型
   */
  private determineSkillErrorSeverity(type: SkillErrorType): ErrorSeverity { const severityMap: Record<SkillErrorType, ErrorSeverity> = {
      [SkillErrorType.PERMISSION_ERROR]: ErrorSeverity.HIGH,
      [SkillErrorType.CONFLICT_ERROR]: ErrorSeverity.MEDIUM,
      [SkillErrorType.EXECUTION_ERROR]: ErrorSeverity.MEDIUM,
      [SkillErrorType.VALIDATION_ERROR]: ErrorSeverity.LOW,
      [SkillErrorType.NETWORK_ERROR]: ErrorSeverity.LOW,
      [SkillErrorType.TIMEOUT_ERROR]: ErrorSeverity.LOW,
};
    return severityMap[type] || ErrorSeverity.MEDIUM;,
}

  /**
  * 确定技能错误处理策略
  * @param type - 技能错误类型
   */
  private determineSkillErrorStrategy(type: SkillErrorType): ErrorHandlingStrategy { const strategyMap: Record<SkillErrorType, ErrorHandlingStrategy> = {
      [SkillErrorType.NETWORK_ERROR]: ErrorHandlingStrategy.RETRY,
      [SkillErrorType.TIMEOUT_ERROR]: ErrorHandlingStrategy.RETRY,
      [SkillErrorType.CONFLICT_ERROR]: ErrorHandlingStrategy.FALLBACK,
      [SkillErrorType.PERMISSION_ERROR]: ErrorHandlingStrategy.MODAL,
      [SkillErrorType.VALIDATION_ERROR]: ErrorHandlingStrategy.TOAST,
      [SkillErrorType.EXECUTION_ERROR]: ErrorHandlingStrategy.TOAST,
};
    return strategyMap[type] || ErrorHandlingStrategy.TOAST;,
}

  /**
  * 判断技能错误是否可重试
  * @param type - 技能错误类型
   */
  private isSkillErrorRetryable(type: SkillErrorType): boolean { const retryableTypes = [;
      SkillErrorType.NETWORK_ERROR,
      SkillErrorType.TIMEOUT_ERROR,
      SkillErrorType.EXECUTION_ERROR,
];
    return retryableTypes.includes(type);,
}

  /**
  * 获取技能错误恢复建议
  * @param type - 技能错误类型
   */
  private getSkillErrorRecoverySuggestion(type: SkillErrorType): string { const suggestionMap: Record<SkillErrorType, string> = {
      [SkillErrorType.VALIDATION_ERROR]: '请检查技能使用条件',
      [SkillErrorType.EXECUTION_ERROR]: '请稍后重试或联系技术支持',
      [SkillErrorType.NETWORK_ERROR]: '请检查网络连接',
      [SkillErrorType.PERMISSION_ERROR]: '请联系管理员获取技能使用权限',
      [SkillErrorType.CONFLICT_ERROR]: '请等待其他操作完成后重试',
      [SkillErrorType.TIMEOUT_ERROR]: '请检查网络连接或稍后重试',
};
    return suggestionMap[type] || '请稍后重试';,
}

  /**
  * 获取错误分类
  * @param error - 统一错误对象
   */
  private getErrorCategory(error: UnifiedError): string { switch (error.type) {
      case ErrorType.APP:
      return 'application';
      case ErrorType.SKILL:
      return 'skill';
      case ErrorType.NETWORK:
      return 'network';
      case ErrorType.VALIDATION:
      return 'validation';
      case ErrorType.PERMISSION:
      return 'permission';
      case ErrorType.BUSINESS:
      return 'business';
      case ErrorType.SYSTEM:
      return 'system';
      default:
      return 'unknown';,
}
  }

  /**
  * 获取严重级别对应的标题
  * @param severity - 严重级别
   */
  private getSeverityTitle(severity: ErrorSeverity): string { const titleMap: Record<ErrorSeverity, string> = {
      [ErrorSeverity.LOW]: '提示',
      [ErrorSeverity.MEDIUM]: '警告',
      [ErrorSeverity.HIGH]: '错误',
      [ErrorSeverity.CRITICAL]: '严重错误',
};
    return titleMap[severity];,
}

  /**
  * 获取严重级别对应的变体
  * @param severity - 严重级别
   */
  private getSeverityVariant(severity: ErrorSeverity): string { const variantMap: Record<ErrorSeverity, string> = {
      [ErrorSeverity.LOW]: 'default',
      [ErrorSeverity.MEDIUM]: 'warning',
      [ErrorSeverity.HIGH]: 'destructive',
      [ErrorSeverity.CRITICAL]: 'destructive',
};
    return variantMap[severity];,
}

  /**
  * 获取Toast持续时间
  * @param severity - 严重级别
   */
  private getToastDuration(severity: ErrorSeverity): number { const durationMap: Record<ErrorSeverity, number> = {
      [ErrorSeverity.LOW]: 3000,
      [ErrorSeverity.MEDIUM]: 5000,
      [ErrorSeverity.HIGH]: 8000,
      [ErrorSeverity.CRITICAL]: 10000,
};
    return durationMap[severity];,
}

  /**
  * 获取模态框操作按钮
  * @param error - 统一错误对象
   */
  private getModalActions(error: UnifiedError): Array<{ label: string, action: string }> { const actions = [;
      { label: '确定', action: 'close'  },
];

    if (error.retryable) { actions.unshift({ label: '重试', action: 'retry'  });,
}

    if (error.severity === ErrorSeverity.CRITICAL) { actions.push({ label: '刷新页面', action: 'refresh'  });,
}

    return actions;,
}

  /**
  * 公共方法：获取错误历史记录
   */
  public getErrorHistory(): UnifiedError[] { return [...this.errorHistory];,
}

  /**
  * 公共方法：获取错误统计信息
   */
  public getStatistics(): ErrorStatistics { return { ...this.statistics  };,
}

  /**
  * 公共方法：清空错误历史记录
   */
  public clearHistory(): void { this.errorHistory = [];
    logger.info('错误历史记录已清空');,
}

  /**
  * 公共方法：重置统计信息
   */
  public resetStatistics(): void { this.statistics = {
      total: 0,
      byType: { } as Record<ErrorType, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      byStrategy: {} as Record<ErrorHandlingStrategy, number>,
      recovered: 0,
      failed: 0,
      retrySucceeded: 0,
      retryFailed: 0,
      averageProcessingTime: 0,
};
    logger.info('错误统计信息已重置');,
}

  /**
  * 公共方法：清理资源
   */
  public cleanup(): void { // 清除所有重试定时器
    this.retryTimers.forEach(timer => clearTimeout(timer));
    this.retryTimers.clear();

    // 清空重试计数器
    this.retryCounters.clear();

    // 清空错误历史
    this.clearHistory();

    // 重置统计信息
    this.resetStatistics();

    logger.info('统一错误处理系统资源已清理');,
}
}

/**
* 导出单例实例
 */
export const unifiedErrorSystem = UnifiedErrorSystem.getInstance();

/**
* 错误处理装饰器
* @param context - 错误上下文
* @param options - 处理选项
 */
export function withErrorHandling(
  context?: ErrorContext,
  options: ErrorHandlingOptions = {}
) { return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]): Promise<any> {
      try {
        return await method.apply(this, args);,
} catch (error) { const result = await unifiedErrorSystem.handleError(error, context, options);
        if (!result.recovered) {
          throw error;,
}
        return null;,
}
    };

    return descriptor;,
};,
}