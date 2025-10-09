import { createLogger  } from '@/lib/logger';
import { ErrorCode, AppError, getErrorMessage, logError  } from './errorHandler';
import { SkillErrorType, SkillError, SkillErrorHandler  } from './skillErrorHandler';

/**
* 统一错误处理系统
* 整合所有错误处理机制，提供一致的错误处理策略
 */

const logger = createLogger('unified-error-handler');

/**
* 错误严重级别枚举
 */
export enum ErrorSeverity { LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical';,
}

/**
* 错误处理策略枚举
 */
export enum ErrorHandlingStrategy { SILENT = 'silent',           // 静默处理，仅记录日志
  TOAST = 'toast',             // 显示Toast消息
  MODAL = 'modal',             // 显示模态框
  REDIRECT = 'redirect',       // 重定向到错误页面
  RETRY = 'retry',             // 自动重试
  FALLBACK = 'fallback'        // 使用备用方案,
}

/**
* 统一错误接口
 */
export interface UnifiedError { /** 错误ID  */
  id: string;
  /** 错误类型  */
  type: 'app' | 'skill' | 'network' | 'validation' | 'business' | 'system';
  /** 错误代码  */
  code: string;
  /** 错误消息  */
  message: string;
  /** 用户友好消息  */
  userMessage: string;
  /** 错误严重级别  */
  severity: ErrorSeverity;
  /** 处理策略  */
  strategy: ErrorHandlingStrategy;
  /** 错误详情  */
  details?: Record<string, unknown>;
  /** 错误上下文  */
  context?: ErrorContext;
  /** 时间戳  */
  timestamp: Date;
  /** 是否可重试  */
  retryable: boolean;
  /** 最大重试次数  */
  maxRetries?: number;
  /** 当前重试次数  */
  currentRetries?: number;,
}

/**
* 错误上下文接口
 */
export interface ErrorContext { /** 用户ID  */
  userId?: string;
  /** 游戏状态ID  */
  gameStateId?: string;
  /** 房间ID  */
  roomId?: string;
  /** 技能名称  */
  skillName?: string;
  /** 当前页面/组件  */
  component?: string;
  /** 操作类型  */
  action?: string;
  /** 请求URL  */
  url?: string;
  /** 用户代理  */
  userAgent?: string;
  /** 额外数据  */
  extra?: Record<string, unknown>;,
}

/**
* 错误处理选项接口
 */
export interface ErrorHandlingOptions { /** 是否显示用户消息  */
  showUserMessage?: boolean;
  /** 自定义用户消息  */
  customUserMessage?: string;
  /** 是否自动重试  */
  autoRetry?: boolean;
  /** 重试延迟（毫秒）  */
  retryDelay?: number;
  /** 是否记录错误  */
  logError?: boolean;
  /** 回调函数  */
  onError?: (error: UnifiedError) => void;
  /** 重试回调函数  */
  onRetry?: (error: UnifiedError, retryCount: number) => void;
  /** 成功回调函数  */
  onSuccess?: () => void;,
}

/**
* 统一错误处理器类
 */
export class UnifiedErrorHandler { private static instance: UnifiedErrorHandler;
  private errorHistory: UnifiedError[] = [];
  private maxHistorySize = 200;
  private retryTimers = new Map<string, NodeJS.Timeout>();

  /**
  * 获取单例实例
   */
  static getInstance(): UnifiedErrorHandler {
    if (!UnifiedErrorHandler.instance) {
      UnifiedErrorHandler.instance = new UnifiedErrorHandler();,
}
    return UnifiedErrorHandler.instance;,
}

  /**
  * 处理错误的主要方法
  * @param error - 原始错误对象
  * @param context - 错误上下文
  * @param options - 处理选项
   */
  async handleError(
    error: Error | AppError | SkillError | unknown,
    context?: ErrorContext,
    options: ErrorHandlingOptions = {}
  ): Promise<void> { try {
      // 转换为统一错误格式
      const unifiedError = this.normalizeError(error, context);

      // 记录错误历史
      this.addToHistory(unifiedError);

      // 记录日志
      if (options.logError !== false) {
        this.logUnifiedError(unifiedError);,
}

      // 执行错误处理策略
      await this.executeHandlingStrategy(unifiedError, options);

      // 调用错误回调
      if (options.onError) { options.onError(unifiedError);,
}

    } catch (handlingError) { logger.error('错误处理器本身发生错误', handlingError);
      console.error('[UnifiedErrorHandler] 处理错误时发生异常:', handlingError);,
}
  }

  /**
  * 包装异步函数，提供统一错误处理
  * @param fn - 异步函数
  * @param context - 错误上下文
  * @param options - 处理选项
   */
  wrapAsync<T extends any[], R>(fn: (...args: T) => Promise<R>,
    context?: ErrorContext,
    options: ErrorHandlingOptions = {}
  ) { return async (...args: T): Promise<R | null> => {
      try {
        const result = await fn(...args);
        if (options.onSuccess) {
          options.onSuccess();,
}
        return result;,
} catch (error) { await this.handleError(error, context, options);
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
  wrapSync<T extends any[], R>(fn: (...args: T) => R,
    context?: ErrorContext,
    options: ErrorHandlingOptions = {}
  ) { return (...args: T): R | null => {
      try {
        const result = fn(...args);
        if (options.onSuccess) {
          options.onSuccess();,
}
        return result;,
} catch (error) { this.handleError(error, context, options);
        return null;,
}
    };,
}

  /**
  * 重试机制
  * @param fn - 要重试的函数
  * @param error - 错误对象
  * @param options - 处理选项
   */
  private async retryOperation(fn: () => Promise<any>,
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<void> { if (!error.retryable || (error.currentRetries || 0) >= (error.maxRetries || 3)) {
      logger.warn('操作不可重试或已达到最大重试次数', {
        errorId: error.id,
        currentRetries: error.currentRetries,
        maxRetries: error.maxRetries,
});
      return;,
}

    const retryCount = (error.currentRetries || 0) + 1;
    const delay = options.retryDelay || Math.pow(2, retryCount) * 1000; // 指数退避

    logger.info('准备重试操作', { errorId: error.id,
      retryCount,
      delay,
});

    // 清除之前的重试定时器
    const existingTimer = this.retryTimers.get(error.id);
    if (existingTimer) { clearTimeout(existingTimer);,
}

    // 设置新的重试定时器
    const timer = setTimeout(async () => { try {
        error.currentRetries = retryCount;

        if (options.onRetry) {
          options.onRetry(error, retryCount);,
}

        await fn();

        // 重试成功，清除定时器
        this.retryTimers.delete(error.id);

        if (options.onSuccess) { options.onSuccess();,
}

        logger.info('重试操作成功', { errorId: error.id, retryCount  });,
} catch (retryError) { logger.warn('重试操作失败', {
          errorId: error.id,
          retryCount,
          retryError,
});

        // 递归重试
        await this.retryOperation(fn, error, options);,
}
    }, delay);

    this.retryTimers.set(error.id, timer);,
}

  /**
  * 将各种错误类型转换为统一格式
  * @param error - 原始错误
  * @param context - 错误上下文
   */
  private normalizeError(error: any, context?: ErrorContext): UnifiedError { const errorId = this.generateErrorId();
    const timestamp = new Date();

    // 处理 AppError
    if (error instanceof AppError) {
      return {
        id: errorId,
        type: 'app',
        code: error.code,
        message: error.message,
        userMessage: getErrorMessage(error),
        severity: this.determineSeverity(error.code),
        strategy: this.determineStrategy(error.code),
        details: error.details,
        context,
        timestamp,
        retryable: this.isRetryable(error.code),
        maxRetries: this.getMaxRetries(error.code),
};,
}

    // 处理 SkillError
    if (this.isSkillError(error)) { return {
        id: errorId,
        type: 'skill',
        code: error.code || error.type,
        message: error.message,
        userMessage: this.getSkillErrorUserMessage(error),
        severity: this.determineSkillErrorSeverity(error.type),
        strategy: this.determineSkillErrorStrategy(error.type),
        details: error.details || { skillName: error.skillName, userId: error.userId  },
        context: { ...context,
          skillName: error.skillName,
          userId: error.userId,
          gameStateId: error.gameStateId,
},
        timestamp,
        retryable: this.isSkillErrorRetryable(error.type),
        maxRetries: 3,
};,
}

    // 处理网络错误
    if (this.isNetworkError(error)) { return {
        id: errorId,
        type: 'network',
        code: 'NETWORK_ERROR',
        message: error.message || '网络连接失败',
        userMessage: '网络连接失败，请检查网络设置',
        severity: ErrorSeverity.MEDIUM,
        strategy: ErrorHandlingStrategy.RETRY,
        context,
        timestamp,
        retryable: true,
        maxRetries: 5,
};,
}

    // 处理验证错误
    if (this.isValidationError(error)) { return {
        id: errorId,
        type: 'validation',
        code: 'VALIDATION_ERROR',
        message: error.message || '数据验证失败',
        userMessage: error.message || '输入数据格式不正确',
        severity: ErrorSeverity.LOW,
        strategy: ErrorHandlingStrategy.TOAST,
        context,
        timestamp,
        retryable: false,
};,
}

    // 处理通用错误
    return { id: errorId,
      type: 'system',
      code: 'UNKNOWN_ERROR',
      message: error?.message || '未知错误',
      userMessage: '系统发生未知错误，请稍后重试',
      severity: ErrorSeverity.MEDIUM,
      strategy: ErrorHandlingStrategy.TOAST,
      details: { originalError: error  },
      context,
      timestamp,
      retryable: false,
};,
}

  /**
  * 执行错误处理策略
  * @param error - 统一错误对象
  * @param options - 处理选项
   */
  private async executeHandlingStrategy(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<void> { const showMessage = options.showUserMessage !== false;
    const userMessage = options.customUserMessage || error.userMessage;

    switch (error.strategy) {
      case ErrorHandlingStrategy.SILENT:
      // 静默处理，仅记录日志
      break;

      case ErrorHandlingStrategy.TOAST:
      if (showMessage && typeof window !== 'undefined') {
        // 在浏览器环境中显示 toast
        this.showToast(userMessage, error.severity);,
}
      break;

      case ErrorHandlingStrategy.MODAL:
      if (showMessage && typeof window !== 'undefined') { // 显示模态框
        this.showModal(userMessage, error);,
}
      break;

      case ErrorHandlingStrategy.REDIRECT:
      if (typeof window !== 'undefined') { // 重定向到错误页面
        this.redirectToErrorPage(error);,
}
      break;

      case ErrorHandlingStrategy.RETRY:
      if (options.autoRetry !== false && error.retryable) { // 自动重试（需要传入重试函数）
        logger.info('准备自动重试', { errorId: error.id  });,
}
      break;

      case ErrorHandlingStrategy.FALLBACK:
      // 使用备用方案
      await this.executeFallback(error);
      break;

      default:
      logger.warn('未知的错误处理策略', { strategy: error.strategy  });,
}
  }

  /**
  * 显示 Toast 消息
  * @param message - 消息内容
  * @param severity - 严重级别
   */
  private showToast(message: string, severity: ErrorSeverity): void { // 这里需要根据实际的 Toast 组件实现
    // 例如使用 react-hot-toast 或其他 Toast 库
    console.warn('[Toast]', message, { severity  });

    // 如果有全局的 toast 函数，可以在这里调用
    if (typeof window !== 'undefined' && (window as any).showToast) { (window as any).showToast({
        title: this.getSeverityTitle(severity),
        description: message,
        variant: this.getSeverityVariant(severity),
});,
}
  }

  /**
  * 显示模态框
  * @param message - 消息内容
  * @param error - 错误对象
   */
  private showModal(message: string, error: UnifiedError): void { // 这里需要根据实际的模态框组件实现
    console.error('[Modal]', message, error);

    // 如果有全局的模态框函数，可以在这里调用
    if (typeof window !== 'undefined' && (window as any).showErrorModal) {
      (window as any).showErrorModal({
        title: '系统错误',
        message,
        error,
});,
}
  }

  /**
  * 重定向到错误页面
  * @param error - 错误对象
   */
  private redirectToErrorPage(error: UnifiedError): void { const errorPageUrl = `/error?code=${error.code }&id=${ error.id }`;
    window.location.href = errorPageUrl;,
}

  /**
  * 执行备用方案
  * @param error - 错误对象
   */
  private async executeFallback(error: UnifiedError): Promise<void> { logger.info('执行备用方案', { errorId: error.id, errorType: error.type  });

    // 根据错误类型执行不同的备用方案
    switch (error.type) { case 'network':
      // 网络错误的备用方案：使用缓存数据
      break;
      case 'skill':
      // 技能错误的备用方案：重置技能状态
      break;
      default:
      // 通用备用方案
      break;,
}
  }

  /**
  * 记录统一错误日志
  * @param error - 统一错误对象
   */
  private logUnifiedError(error: UnifiedError): void { const logData = {
      id: error.id,
      type: error.type,
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      timestamp: error.timestamp.toISOString(),
      retryable: error.retryable,
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
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift();,
}
  }

  /**
  * 生成错误ID
   */
  private generateErrorId(): string { return `err_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

  /**
  * 确定错误严重级别
  * @param code - 错误代码
   */
  private determineSeverity(code: string): ErrorSeverity { const criticalCodes = ['AUTH_FAILED', 'PERMISSION_DENIED'];
    const highCodes = ['DATA_CONFLICT', 'API_ERROR'];
    const mediumCodes = ['NETWORK_ERROR', 'DATA_NOT_FOUND'];

    if (criticalCodes.includes(code)) return ErrorSeverity.CRITICAL;
    if (highCodes.includes(code)) return ErrorSeverity.HIGH;
    if (mediumCodes.includes(code)) return ErrorSeverity.MEDIUM;
    return ErrorSeverity.LOW;,
}

  /**
  * 确定错误处理策略
  * @param code - 错误代码
   */
  private determineStrategy(code: string): ErrorHandlingStrategy { const redirectCodes = ['AUTH_REQUIRED', 'PERMISSION_DENIED'];
    const retryCodes = ['NETWORK_ERROR', 'API_ERROR'];
    const modalCodes = ['DATA_CONFLICT'];

    if (redirectCodes.includes(code)) return ErrorHandlingStrategy.REDIRECT;
    if (retryCodes.includes(code)) return ErrorHandlingStrategy.RETRY;
    if (modalCodes.includes(code)) return ErrorHandlingStrategy.MODAL;
    return ErrorHandlingStrategy.TOAST;,
}

  /**
  * 判断错误是否可重试
  * @param code - 错误代码
   */
  private isRetryable(code: string): boolean { const retryableCodes = ['NETWORK_ERROR', 'API_ERROR', 'TIMEOUT_ERROR'];
    return retryableCodes.includes(code);,
}

  /**
  * 获取最大重试次数
  * @param code - 错误代码
   */
  private getMaxRetries(code: string): number { const retryConfig: Record<string, number> = {
      'NETWORK_ERROR': 5,
      'API_ERROR': 3,
      'TIMEOUT_ERROR': 3,
};
    return retryConfig[code] || 1;,
}

  /**
  * 判断是否为技能错误
  * @param error - 错误对象
   */
  private isSkillError(error: any): error is SkillError { return error && typeof error === 'object' &&;
    ('type' in error && Object.values(SkillErrorType).includes(error.type));,
}

  /**
  * 判断是否为网络错误
  * @param error - 错误对象
   */
  private isNetworkError(error: any): boolean { if (!error) return false;
    const message = error.message || '';
    return message.includes('network') ||;
    message.includes('fetch') ||
    message.includes('timeout') ||
    error.name === 'NetworkError';,
}

  /**
  * 判断是否为验证错误
  * @param error - 错误对象
   */
  private isValidationError(error: any): boolean { if (!error) return false;
    const message = error.message || '';
    return message.includes('validation') ||;
    message.includes('invalid') ||
    error.name === 'ValidationError';,
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
  private determineSkillErrorSeverity(type: SkillErrorType): ErrorSeverity { switch (type) {
      case SkillErrorType.PERMISSION_ERROR:
      return ErrorSeverity.HIGH;
      case SkillErrorType.CONFLICT_ERROR:
      case SkillErrorType.EXECUTION_ERROR:
      return ErrorSeverity.MEDIUM;
      case SkillErrorType.VALIDATION_ERROR:
      case SkillErrorType.NETWORK_ERROR:
      case SkillErrorType.TIMEOUT_ERROR:
      return ErrorSeverity.LOW;
      default:
      return ErrorSeverity.MEDIUM;,
}
  }

  /**
  * 确定技能错误处理策略
  * @param type - 技能错误类型
   */
  private determineSkillErrorStrategy(type: SkillErrorType): ErrorHandlingStrategy { switch (type) {
      case SkillErrorType.NETWORK_ERROR:
      case SkillErrorType.TIMEOUT_ERROR:
      return ErrorHandlingStrategy.RETRY;
      case SkillErrorType.CONFLICT_ERROR:
      return ErrorHandlingStrategy.FALLBACK;
      case SkillErrorType.PERMISSION_ERROR:
      return ErrorHandlingStrategy.MODAL;
      default:
      return ErrorHandlingStrategy.TOAST;,
}
  }

  /**
  * 判断技能错误是否可重试
  * @param type - 技能错误类型
   */
  private isSkillErrorRetryable(type: SkillErrorType): boolean { return [;
      SkillErrorType.NETWORK_ERROR,
      SkillErrorType.TIMEOUT_ERROR,
      SkillErrorType.EXECUTION_ERROR,
].includes(type);,
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
  * 获取错误历史记录
   */
  getErrorHistory(): UnifiedError[] { return [...this.errorHistory];,
}

  /**
  * 清空错误历史记录
   */
  clearErrorHistory(): void { this.errorHistory = [];,
}

  /**
  * 获取错误统计信息
   */
  getErrorStats(): { total: number;
    byType: Record<string, number>;
    bySeverity: Record<ErrorSeverity, number>;
    byStrategy: Record<ErrorHandlingStrategy, number>;,
} { const stats = {
      total: this.errorHistory.length,
      byType: { } as Record<string, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      byStrategy: {} as Record<ErrorHandlingStrategy, number>,
};

    this.errorHistory.forEach(error => { // 按类型统计
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;

      // 按严重级别统计
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;

      // 按处理策略统计
      stats.byStrategy[error.strategy] = (stats.byStrategy[error.strategy] || 0) + 1;,
});

    return stats;,
}

  /**
  * 清理资源
   */
  cleanup(): void { // 清除所有重试定时器
    this.retryTimers.forEach(timer => clearTimeout(timer));
    this.retryTimers.clear();

    // 清空错误历史
    this.clearErrorHistory();,
}
}

/**
* 导出单例实例
 */
export const unifiedErrorHandler = UnifiedErrorHandler.getInstance();

/**
* 错误处理装饰器
* @param context - 错误上下文
* @param options - 处理选项
 */
export function withUnifiedErrorHandling(
  context?: ErrorContext,
  options: ErrorHandlingOptions = {}
) { return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function(...args: any[]): Promise<any> {
      try {
        return await method.apply(this, args);,
} catch (error) { await unifiedErrorHandler.handleError(error, context, options);
        throw error;,
}
    };

    return descriptor;,
};,
}

/**
* 创建错误处理包装器
* @param context - 错误上下文
* @param options - 处理选项
 */
export function createErrorWrapper(
  context?: ErrorContext,
  options: ErrorHandlingOptions = {}
) { return {
    async: <T extends any[], R>(fn: (...args: T) => Promise<R>) =>;
    unifiedErrorHandler.wrapAsync(fn, context, options),

    sync: <T extends any[], R>(fn: (...args: T) => R) =>;
    unifiedErrorHandler.wrapSync(fn, context, options),
};,
}