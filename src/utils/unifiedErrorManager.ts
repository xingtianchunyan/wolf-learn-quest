/**
 * 文件级注释：统一错误管理器
 * 整合所有错误处理机制，提供一致的错误处理策略和用户体验
 * 解决现有错误处理系统的不一致性和重复问题
 */

import { createLogger } from '@/lib/logger';
import { ErrorCode, AppError, getErrorMessage } from './errorHandler';
import { SkillErrorType, SkillError } from './skillErrorHandler';
import { ErrorSeverity, ErrorHandlingStrategy } from './unifiedErrorHandler';
import { ErrorClassifier, ErrorClassification } from './errorClassifier';
import {
  UserNotificationSystem,
  NotificationType,
} from './userNotificationSystem';
import { ErrorMonitoringService } from '@/services/errorMonitoringService';

const logger = createLogger('unified-error-manager');

/**
 * 统一错误接口
 */
export interface UnifiedErrorData {
  /** 错误唯一标识 */
  id: string;
  /** 错误类型 */
  type:
    | 'app'
    | 'skill'
    | 'network'
    | 'validation'
    | 'business'
    | 'system'
    | 'security';
  /** 错误代码 */
  code: string;
  /** 原始错误消息 */
  message: string;
  /** 用户友好消息 */
  userMessage: string;
  /** 技术详情 */
  technicalDetails?: string;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 处理策略 */
  strategy: ErrorHandlingStrategy;
  /** 错误上下文 */
  context: ErrorContext;
  /** 时间戳 */
  timestamp: Date;
  /** 是否可重试 */
  retryable: boolean;
  /** 最大重试次数 */
  maxRetries: number;
  /** 当前重试次数 */
  currentRetries: number;
  /** 错误堆栈 */
  stack?: string;
  /** 用户操作建议 */
  actionSuggestion?: string;
}

/**
 * 错误上下文接口
 */
export interface ErrorContext {
  /** 用户ID */
  userId?: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 房间ID */
  roomId?: string;
  /** 技能名称 */
  skillName?: string;
  /** 当前页面/组件 */
  component?: string;
  /** 操作类型 */
  action?: string;
  /** 请求URL */
  url?: string;
  /** 用户代理 */
  userAgent?: string;
  /** 会话ID */
  sessionId?: string;
  /** 额外数据 */
  metadata?: Record<string, unknown>;
}

/**
 * 错误处理选项接口
 */
export interface ErrorHandlingOptions {
  /** 是否显示用户通知 */
  showNotification?: boolean;
  /** 自定义用户消息 */
  customUserMessage?: string;
  /** 通知类型 */
  notificationType?: NotificationType;
  /** 是否自动重试 */
  autoRetry?: boolean;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 是否记录错误 */
  logError?: boolean;
  /** 是否上报监控 */
  reportToMonitoring?: boolean;
  /** 错误回调 */
  onError?: (error: UnifiedErrorData) => void;
  /** 重试回调 */
  onRetry?: (error: UnifiedErrorData, retryCount: number) => void;
  /** 成功回调 */
  onSuccess?: () => void;
  /** 恢复策略 */
  recoveryStrategy?: 'silent' | 'notify' | 'redirect' | 'reload';
}

/**
 * 错误处理结果接口
 */
export interface ErrorHandlingResult {
  /** 是否成功处理 */
  handled: boolean;
  /** 错误ID */
  errorId: string;
  /** 用户友好消息 */
  userMessage: string;
  /** 是否需要重试 */
  shouldRetry: boolean;
  /** 重试延迟 */
  retryDelay?: number;
  /** 处理策略 */
  strategy: ErrorHandlingStrategy;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 恢复建议 */
  recoverySuggestion?: string;
}

/**
 * 统一错误管理器类
 * 整合所有错误处理机制，提供一致的错误处理策略
 */
export class UnifiedErrorManager {
  private static instance: UnifiedErrorManager;
  private classifier: ErrorClassifier;
  private notificationSystem: UserNotificationSystem;
  private monitoringService: ErrorMonitoringService;
  private errorHistory: UnifiedErrorData[] = [];
  private retryTimers = new Map<string, ReturnType<typeof setInterval>>();
  private readonly MAX_HISTORY_SIZE = 500;
  private readonly DEFAULT_RETRY_DELAY = 1000;

  private constructor() {
    this.classifier = ErrorClassifier.getInstance();
    this.notificationSystem = UserNotificationSystem.getInstance();
    this.monitoringService = ErrorMonitoringService.getInstance();

    logger.info('统一错误管理器已初始化');
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): UnifiedErrorManager {
    if (!UnifiedErrorManager.instance) {
      UnifiedErrorManager.instance = new UnifiedErrorManager();
    }
    return UnifiedErrorManager.instance;
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
  ): Promise<ErrorHandlingResult> {
    const startTime = Date.now();

    try {
      // 1. 标准化错误对象
      const unifiedError = this.normalizeError(error, context);

      // 2. 分类错误
      const classification = this.classifier.classify(error);
      this.enrichErrorWithClassification(unifiedError, classification);

      // 3. 记录错误历史
      this.addToHistory(unifiedError);

      // 4. 记录日志
      if (options.logError !== false) {
        this.logError(unifiedError);
      }

      // 5. 上报监控
      if (options.reportToMonitoring !== false) {
        await this.reportToMonitoring(unifiedError);
      }

      // 6. 执行处理策略
      const result = await this.executeHandlingStrategy(unifiedError, options);

      // 7. 调用回调
      if (options.onError) {
        options.onError(unifiedError);
      }

      // 8. 记录处理时间
      const processingTime = Date.now() - startTime;
      logger.debug('错误处理完成', {
        errorId: unifiedError.id,
        processingTime,
        strategy: unifiedError.strategy,
      });

      return result;
    } catch (handlingError) {
      logger.error('错误处理器本身发生错误', handlingError);

      // 返回默认错误处理结果
      return {
        handled: false,
        errorId: this.generateErrorId(),
        userMessage: '系统发生未知错误，请稍后重试',
        shouldRetry: false,
        strategy: ErrorHandlingStrategy.TOAST,
        severity: ErrorSeverity.HIGH,
      };
    }
  }

  /**
   * 包装异步函数，提供统一错误处理
   * @param fn - 异步函数
   * @param context - 错误上下文
   * @param options - 处理选项
   */
  public wrapAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: ErrorContext,
    options?: ErrorHandlingOptions
  ) {
    return async (...args: T): Promise<R | null> => {
      try {
        const result = await fn(...args);
        if (options?.onSuccess) {
          options.onSuccess();
        }
        return result;
      } catch (error) {
        await this.handleError(error, context, options);
        return null;
      }
    };
  }

  /**
   * 包装同步函数，提供统一错误处理
   * @param fn - 同步函数
   * @param context - 错误上下文
   * @param options - 处理选项
   */
  public wrapSync<T extends any[], R>(
    fn: (...args: T) => R,
    context?: ErrorContext,
    options?: ErrorHandlingOptions
  ) {
    return (...args: T): R | null => {
      try {
        const result = fn(...args);
        if (options?.onSuccess) {
          options.onSuccess();
        }
        return result;
      } catch (error) {
        // 同步处理错误（不等待异步操作）
        this.handleError(error, context, options);
        return null;
      }
    };
  }

  /**
   * 重试操作
   * @param errorId - 错误ID
   * @param operation - 要重试的操作
   * @param options - 重试选项
   */
  public async retry<T>(
    errorId: string,
    operation: () => Promise<T>,
    options: { maxRetries?: number; delay?: number } = {}
  ): Promise<T | null> {
    const error = this.errorHistory.find(e => e.id === errorId);
    if (!error || !error.retryable) {
      logger.warn('错误不可重试', { errorId });
      return null;
    }

    const maxRetries = options.maxRetries || error.maxRetries;
    const delay = options.delay || this.DEFAULT_RETRY_DELAY;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 等待重试延迟
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }

        const result = await operation();

        // 重试成功，清理重试计时器
        this.clearRetryTimer(errorId);

        logger.info('重试成功', { errorId, attempt });
        return result;
      } catch (retryError) {
        error.currentRetries = attempt;

        if (attempt === maxRetries) {
          logger.error('重试失败，已达最大重试次数', {
            errorId,
            maxRetries,
            error: retryError,
          });
          break;
        }

        logger.warn('重试失败，继续重试', {
          errorId,
          attempt,
          maxRetries,
          error: retryError,
        });
      }
    }

    return null;
  }

  /**
   * 获取错误统计信息
   */
  public getErrorStats() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const recentErrors = this.errorHistory.filter(
      error => now - error.timestamp.getTime() < oneHour
    );

    const byType = this.errorHistory.reduce(
      (acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const bySeverity = this.errorHistory.reduce(
      (acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      },
      {} as Record<ErrorSeverity, number>
    );

    return {
      total: this.errorHistory.length,
      recent: recentErrors.length,
      byType,
      bySeverity,
      retryableCount: this.errorHistory.filter(e => e.retryable).length,
      criticalCount: this.errorHistory.filter(
        e => e.severity === ErrorSeverity.CRITICAL
      ).length,
    };
  }

  /**
   * 获取错误历史记录
   * @param limit - 返回记录数限制
   * @param severity - 过滤严重级别
   */
  public getErrorHistory(
    limit = 50,
    severity?: ErrorSeverity
  ): UnifiedErrorData[] {
    let filtered = this.errorHistory;

    if (severity) {
      filtered = filtered.filter(error => error.severity === severity);
    }

    return filtered
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * 清理错误历史记录
   * @param olderThan - 清理指定时间之前的记录（毫秒）
   */
  public cleanupHistory(olderThan = 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - olderThan;
    const initialCount = this.errorHistory.length;

    this.errorHistory = this.errorHistory.filter(
      error => error.timestamp.getTime() > cutoff
    );

    const cleanedCount = initialCount - this.errorHistory.length;
    if (cleanedCount > 0) {
      logger.info('清理错误历史记录', {
        cleanedCount,
        remaining: this.errorHistory.length,
      });
    }
  }

  /**
   * 标准化错误对象
   * @param error - 原始错误
   * @param context - 错误上下文
   */
  private normalizeError(error: any, context: ErrorContext): UnifiedErrorData {
    const errorId = this.generateErrorId();
    const timestamp = new Date();

    // 处理不同类型的错误
    if (error instanceof AppError) {
      return {
        id: errorId,
        type: 'app',
        code: error.code,
        message: error.message,
        userMessage: getErrorMessage(error.code as ErrorCode),
        technicalDetails: error.details
          ? JSON.stringify(error.details)
          : undefined,
        severity: this.mapErrorCodeToSeverity(error.code),
        strategy: this.determineStrategy(error.code),
        context,
        timestamp,
        retryable: this.isRetryable(error.code),
        maxRetries: 3,
        currentRetries: 0,
        stack: error.stack,
        actionSuggestion: this.getActionSuggestion(error.code),
      };
    }

    if (error instanceof SkillError) {
      return {
        id: errorId,
        type: 'skill',
        code: error.type,
        message: error.message,
        userMessage: this.getSkillErrorUserMessage(error.type),
        technicalDetails: error.details
          ? JSON.stringify(error.details)
          : undefined,
        severity: this.mapSkillErrorToSeverity(error.type),
        strategy: ErrorHandlingStrategy.TOAST,
        context,
        timestamp,
        retryable: this.isSkillErrorRetryable(error.type),
        maxRetries: 2,
        currentRetries: 0,
        stack: error.stack,
        actionSuggestion: this.getSkillErrorActionSuggestion(error.type),
      };
    }

    // 处理网络错误
    if (this.isNetworkError(error)) {
      return {
        id: errorId,
        type: 'network',
        code: 'NETWORK_ERROR',
        message: error.message || '网络连接失败',
        userMessage: '网络连接异常，请检查网络设置后重试',
        severity: ErrorSeverity.MEDIUM,
        strategy: ErrorHandlingStrategy.RETRY,
        context,
        timestamp,
        retryable: true,
        maxRetries: 3,
        currentRetries: 0,
        stack: error.stack,
        actionSuggestion: '请检查网络连接并重试',
      };
    }

    // 处理验证错误
    if (this.isValidationError(error)) {
      return {
        id: errorId,
        type: 'validation',
        code: 'VALIDATION_ERROR',
        message: error.message || '数据验证失败',
        userMessage: '输入数据格式不正确，请检查后重试',
        severity: ErrorSeverity.LOW,
        strategy: ErrorHandlingStrategy.TOAST,
        context,
        timestamp,
        retryable: false,
        maxRetries: 0,
        currentRetries: 0,
        stack: error.stack,
        actionSuggestion: '请检查输入数据的格式',
      };
    }

    // 默认错误处理
    return {
      id: errorId,
      type: 'system',
      code: 'UNKNOWN_ERROR',
      message: error?.message || '未知错误',
      userMessage: '系统发生未知错误，请稍后重试',
      severity: ErrorSeverity.MEDIUM,
      strategy: ErrorHandlingStrategy.TOAST,
      context,
      timestamp,
      retryable: false,
      maxRetries: 0,
      currentRetries: 0,
      stack: error?.stack,
      actionSuggestion: '请稍后重试或联系技术支持',
    };
  }

  /**
   * 使用分类结果丰富错误信息
   */
  private enrichErrorWithClassification(
    error: UnifiedErrorData,
    classification: ErrorClassification
  ): void {
    error.severity = classification.severity;
    error.retryable = classification.isRetryable;
    error.userMessage =
      classification.userFriendlyDescription || error.userMessage;
    error.technicalDetails =
      classification.technicalDescription || error.technicalDetails;
  }

  /**
   * 执行错误处理策略
   */
  private async executeHandlingStrategy(
    error: UnifiedErrorData,
    options: ErrorHandlingOptions
  ): Promise<ErrorHandlingResult> {
    const strategy = options.recoveryStrategy
      ? this.mapRecoveryStrategyToHandlingStrategy(options.recoveryStrategy)
      : error.strategy;

    switch (strategy) {
      case ErrorHandlingStrategy.SILENT:
        // 静默处理，仅记录日志
        break;

      case ErrorHandlingStrategy.TOAST:
        if (options.showNotification !== false) {
          await this.showNotification(
            error,
            options.notificationType || NotificationType.ERROR
          );
        }
        break;

      case ErrorHandlingStrategy.MODAL:
        if (options.showNotification !== false) {
          await this.showModal(error);
        }
        break;

      case ErrorHandlingStrategy.REDIRECT:
        await this.handleRedirect(error);
        break;

      case ErrorHandlingStrategy.RETRY:
        if (options.autoRetry !== false && error.retryable) {
          await this.scheduleRetry(error, options);
        }
        break;

      case ErrorHandlingStrategy.FALLBACK:
        await this.executeFallback(error);
        break;
    }

    return {
      handled: true,
      errorId: error.id,
      userMessage: options.customUserMessage || error.userMessage,
      shouldRetry: error.retryable && options.autoRetry !== false,
      retryDelay: options.retryDelay || this.DEFAULT_RETRY_DELAY,
      strategy,
      severity: error.severity,
      recoverySuggestion: error.actionSuggestion,
    };
  }

  /**
   * 显示通知
   */
  private async showNotification(
    error: UnifiedErrorData,
    type: NotificationType
  ): Promise<void> {
    await this.notificationSystem.show({
      type,
      title: this.getNotificationTitle(error.severity),
      message: error.userMessage,
      duration: this.getNotificationDuration(error.severity),
      actions: error.retryable
        ? [
            {
              label: '重试',
              action: () =>
                this.retry(error.id, async () => {
                  // 这里需要重新执行原始操作
                  throw new Error('重试操作需要在调用方实现');
                }),
            },
          ]
        : undefined,
    });
  }

  /**
   * 显示模态框
   */
  private async showModal(error: UnifiedErrorData): Promise<void> {
    // 这里可以集成模态框组件
    logger.info('显示错误模态框', {
      errorId: error.id,
      message: error.userMessage,
    });
  }

  /**
   * 处理重定向
   */
  private async handleRedirect(error: UnifiedErrorData): Promise<void> {
    if (error.code === 'AUTH_REQUIRED') {
      // 重定向到登录页面
      window.location.href = '/login';
    } else if (error.code === 'PERMISSION_DENIED') {
      // 重定向到无权限页面
      window.location.href = '/unauthorized';
    } else {
      // 重定向到错误页面
      window.location.href = '/error';
    }
  }

  /**
   * 安排重试
   */
  private async scheduleRetry(
    error: UnifiedErrorData,
    options: ErrorHandlingOptions
  ): Promise<void> {
    const delay = options.retryDelay || this.DEFAULT_RETRY_DELAY;

    const timer = setTimeout(async () => {
      if (options.onRetry) {
        options.onRetry(error, error.currentRetries + 1);
      }

      // 清理计时器
      this.retryTimers.delete(error.id);
    }, delay);

    this.retryTimers.set(error.id, timer);
  }

  /**
   * 执行备用方案
   */
  private async executeFallback(error: UnifiedErrorData): Promise<void> {
    logger.info('执行备用方案', { errorId: error.id });
    // 这里可以实现具体的备用方案逻辑
  }

  /**
   * 记录错误到历史
   */
  private addToHistory(error: UnifiedErrorData): void {
    this.errorHistory.unshift(error);

    // 限制历史记录大小
    if (this.errorHistory.length > this.MAX_HISTORY_SIZE) {
      this.errorHistory = this.errorHistory.slice(0, this.MAX_HISTORY_SIZE);
    }
  }

  /**
   * 记录错误日志
   */
  private logError(error: UnifiedErrorData): void {
    const logData = {
      errorId: error.id,
      type: error.type,
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      stack: error.stack,
    };

    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
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
        break;
    }
  }

  /**
   * 上报到监控服务
   */
  private async reportToMonitoring(error: UnifiedErrorData): Promise<void> {
    try {
      await this.monitoringService.reportError({
        id: error.id,
        type: error.type as any,
        message: error.message,
        severity: error.severity,
        context: error.context,
        timestamp: error.timestamp,
        stack: error.stack,
      });
    } catch (reportError) {
      logger.error('上报错误监控失败', reportError);
    }
  }

  /**
   * 生成错误ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 清理重试计时器
   */
  private clearRetryTimer(errorId: string): void {
    const timer = this.retryTimers.get(errorId);
    if (timer) {
      clearTimeout(timer);
      this.retryTimers.delete(errorId);
    }
  }

  // 辅助方法
  private mapErrorCodeToSeverity(code: string): ErrorSeverity {
    const criticalCodes = ['SYSTEM_ERROR', 'DATABASE_ERROR'];
    const highCodes = ['AUTH_REQUIRED', 'PERMISSION_DENIED'];
    const mediumCodes = ['NETWORK_ERROR', 'VALIDATION_ERROR'];

    if (criticalCodes.includes(code)) return ErrorSeverity.CRITICAL;
    if (highCodes.includes(code)) return ErrorSeverity.HIGH;
    if (mediumCodes.includes(code)) return ErrorSeverity.MEDIUM;
    return ErrorSeverity.LOW;
  }

  private determineStrategy(code: string): ErrorHandlingStrategy {
    const redirectCodes = ['AUTH_REQUIRED', 'PERMISSION_DENIED'];
    const retryCodes = ['NETWORK_ERROR', 'TIMEOUT_ERROR'];
    const modalCodes = ['SYSTEM_ERROR', 'DATABASE_ERROR'];

    if (redirectCodes.includes(code)) return ErrorHandlingStrategy.REDIRECT;
    if (retryCodes.includes(code)) return ErrorHandlingStrategy.RETRY;
    if (modalCodes.includes(code)) return ErrorHandlingStrategy.MODAL;
    return ErrorHandlingStrategy.TOAST;
  }

  private isRetryable(code: string): boolean {
    const retryableCodes = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'SERVER_ERROR'];
    return retryableCodes.includes(code);
  }

  private getActionSuggestion(code: string): string {
    const suggestions: Record<string, string> = {
      NETWORK_ERROR: '请检查网络连接并重试',
      AUTH_REQUIRED: '请重新登录',
      PERMISSION_DENIED: '请联系管理员获取权限',
      VALIDATION_ERROR: '请检查输入数据的格式',
      SYSTEM_ERROR: '请稍后重试或联系技术支持',
    };
    return suggestions[code] || '请稍后重试';
  }

  private mapSkillErrorToSeverity(type: SkillErrorType): ErrorSeverity {
    switch (type) {
      case SkillErrorType.SKILL_NOT_FOUND:
      case SkillErrorType.INVALID_TARGET:
        return ErrorSeverity.MEDIUM;
      case SkillErrorType.COOLDOWN_ACTIVE:
      case SkillErrorType.INSUFFICIENT_RESOURCES:
        return ErrorSeverity.LOW;
      default:
        return ErrorSeverity.MEDIUM;
    }
  }

  private isSkillErrorRetryable(type: SkillErrorType): boolean {
    const retryableTypes = [
      SkillErrorType.COOLDOWN_ACTIVE,
      SkillErrorType.INSUFFICIENT_RESOURCES,
    ];
    return retryableTypes.includes(type);
  }

  private getSkillErrorUserMessage(type: SkillErrorType): string {
    const messages: Record<SkillErrorType, string> = {
      [SkillErrorType.SKILL_NOT_FOUND]: '技能不存在',
      [SkillErrorType.INVALID_TARGET]: '无效的目标',
      [SkillErrorType.COOLDOWN_ACTIVE]: '技能冷却中，请稍后再试',
      [SkillErrorType.INSUFFICIENT_RESOURCES]: '资源不足，无法使用技能',
    };
    return messages[type] || '技能使用失败';
  }

  private getSkillErrorActionSuggestion(type: SkillErrorType): string {
    const suggestions: Record<SkillErrorType, string> = {
      [SkillErrorType.SKILL_NOT_FOUND]: '请选择有效的技能',
      [SkillErrorType.INVALID_TARGET]: '请选择有效的目标',
      [SkillErrorType.COOLDOWN_ACTIVE]: '请等待技能冷却完成',
      [SkillErrorType.INSUFFICIENT_RESOURCES]: '请等待资源恢复',
    };
    return suggestions[type] || '请重新尝试';
  }

  private isNetworkError(error: any): boolean {
    return (
      error?.name === 'NetworkError' ||
      error?.code === 'NETWORK_ERROR' ||
      error?.message?.includes('fetch') ||
      error?.message?.includes('network')
    );
  }

  private isValidationError(error: any): boolean {
    return (
      error?.name === 'ValidationError' ||
      error?.code === 'VALIDATION_ERROR' ||
      error?.message?.includes('validation')
    );
  }

  private mapRecoveryStrategyToHandlingStrategy(
    strategy: 'silent' | 'notify' | 'redirect' | 'reload'
  ): ErrorHandlingStrategy {
    switch (strategy) {
      case 'silent':
        return ErrorHandlingStrategy.SILENT;
      case 'notify':
        return ErrorHandlingStrategy.TOAST;
      case 'redirect':
        return ErrorHandlingStrategy.REDIRECT;
      case 'reload':
        return ErrorHandlingStrategy.FALLBACK;
      default:
        return ErrorHandlingStrategy.TOAST;
    }
  }

  private getNotificationTitle(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return '严重错误';
      case ErrorSeverity.HIGH:
        return '错误';
      case ErrorSeverity.MEDIUM:
        return '警告';
      case ErrorSeverity.LOW:
        return '提示';
      default:
        return '通知';
    }
  }

  private getNotificationDuration(severity: ErrorSeverity): number {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return 10000; // 10秒
      case ErrorSeverity.HIGH:
        return 7000; // 7秒
      case ErrorSeverity.MEDIUM:
        return 5000; // 5秒
      case ErrorSeverity.LOW:
        return 3000; // 3秒
      default:
        return 5000;
    }
  }
}

/**
 * 导出单例实例
 */
export const unifiedErrorManager = UnifiedErrorManager.getInstance();

/**
 * 便捷的错误处理函数
 */
export const handleError = (
  error: any,
  context?: ErrorContext,
  options?: ErrorHandlingOptions
) => unifiedErrorManager.handleError(error, context, options);

/**
 * 便捷的异步函数包装器
 */
export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: ErrorContext,
  options?: ErrorHandlingOptions
) => unifiedErrorManager.wrapAsync(fn, context, options);

/**
 * 便捷的同步函数包装器
 */
export const withSyncErrorHandling = <T extends any[], R>(
  fn: (...args: T) => R,
  context?: ErrorContext,
  options?: ErrorHandlingOptions
) => unifiedErrorManager.wrapSync(fn, context, options);
