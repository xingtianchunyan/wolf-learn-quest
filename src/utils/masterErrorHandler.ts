/**
 * 文件级注释：主错误处理器
 * 统一整合所有错误处理机制，提供一致的错误处理策略和用户体验
 * 解决现有多个错误处理器之间的不一致性和重复问题
 *
 * 主要功能：
 * - 统一错误分类和标准化
 * - 智能错误恢复和重试机制
 * - 用户友好的错误通知
 * - 完整的错误监控和报告
 * - 错误历史记录和分析
 *
 * @author SOLO Coding
 * @version 3.0.0
 */

import { createLogger } from '@/lib/logger';
import { ErrorCode, AppError, getErrorMessage } from './errorHandler';
import { SkillErrorType, SkillErrorHandler } from './skillErrorHandler';
import type { SkillError } from './skillErrorHandler';
import { ErrorSeverity, ErrorHandlingStrategy } from './unifiedErrorHandler';

const logger = createLogger('master-error-handler');

/**
 * 错误上下文接口
 * 提供错误发生时的环境信息
 */
export interface ErrorContext {
  /** 组件名称 */
  component?: string;
  /** 用户ID */
  userId?: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 技能名称 */
  skillName?: string;
  /** 操作类型 */
  operation?: string;
  /** 请求URL */
  url?: string;
  /** 用户代理 */
  userAgent?: string;
  /** 时间戳 */
  timestamp?: number;
  /** 额外数据 */
  metadata?: Record<string, any>;
}

/**
 * 错误处理选项接口
 */
export interface ErrorHandlingOptions {
  /** 是否记录日志 */
  logError?: boolean;
  /** 是否显示用户通知 */
  showNotification?: boolean;
  /** 是否尝试自动恢复 */
  attemptRecovery?: boolean;
  /** 是否上报监控系统 */
  reportToMonitoring?: boolean;
  /** 自定义用户消息 */
  customMessage?: string;
  /** 是否静默处理 */
  silent?: boolean;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 错误回调函数 */
  onError?: (error: UnifiedError) => void;
  /** 恢复回调函数 */
  onRecovery?: (error: UnifiedError) => void;
}

/**
 * 错误分类接口
 */
export interface ErrorClassification {
  /** 错误类别 */
  category:
    | 'network'
    | 'validation'
    | 'permission'
    | 'business'
    | 'system'
    | 'internal';
  /** 严重级别 */
  severity: ErrorSeverity;
  /** 是否可重试 */
  isRetryable: boolean;
  /** 用户友好消息 */
  userMessage: string;
  /** 技术详情 */
  technicalDetails: string;
  /** 建议操作 */
  suggestedAction: string;
}

/**
 * 统一错误接口
 */
export interface UnifiedError {
  /** 错误唯一标识 */
  id: string;
  /** 错误类型 */
  type: 'app' | 'skill' | 'network' | 'validation' | 'permission' | 'unknown';
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 原始错误对象 */
  originalError: any;
  /** 错误上下文 */
  context: ErrorContext;
  /** 时间戳 */
  timestamp: number;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 错误分类 */
  classification: ErrorClassification;
  /** 堆栈跟踪 */
  stack?: string;
  /** 是否可重试 */
  retryable: boolean;
  /** 最大重试次数 */
  maxRetries: number;
}

/**
 * 错误处理结果接口
 */
export interface ErrorHandlingResult {
  /** 错误ID */
  errorId: string;
  /** 是否成功处理 */
  handled: boolean;
  /** 是否已恢复 */
  recovered: boolean;
  /** 用户友好消息 */
  userMessage: string;
  /** 是否应该重试 */
  shouldRetry: boolean;
  /** 当前重试次数 */
  retryCount: number;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 错误分类 */
  classification: ErrorClassification;
  /** 处理时间（毫秒） */
  processingTime?: number;
  /** 恢复建议 */
  recoverySuggestion?: string;
}

/**
 * 错误统计接口
 */
export interface ErrorStatistics {
  /** 总错误数 */
  total: number;
  /** 已处理数 */
  handled: number;
  /** 已恢复数 */
  recovered: number;
  /** 失败数 */
  failed: number;
  /** 按类型分组 */
  byType: Record<string, number>;
  /** 按严重级别分组 */
  bySeverity: Record<ErrorSeverity, number>;
  /** 平均处理时间 */
  averageProcessingTime: number;
}

/**
 * 主错误处理器类
 * 统一管理所有错误处理逻辑
 */
export class MasterErrorHandler {
  private static instance: MasterErrorHandler;
  private errorHistory: UnifiedError[] = [];
  private retryCounters: Map<string, number> = new Map();
  private errorStats: ErrorStatistics = {
    total: 0,
    handled: 0,
    recovered: 0,
    failed: 0,
    byType: {},
    bySeverity: {
      [ErrorSeverity.LOW]: 0,
      [ErrorSeverity.MEDIUM]: 0,
      [ErrorSeverity.HIGH]: 0,
      [ErrorSeverity.CRITICAL]: 0,
    },
    averageProcessingTime: 0,
  };
  private processingTimes: number[] = [];

  /**
   * 获取单例实例
   */
  public static getInstance(): MasterErrorHandler {
    if (!MasterErrorHandler.instance) {
      MasterErrorHandler.instance = new MasterErrorHandler();
    }
    return MasterErrorHandler.instance;
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
    const errorId = this.generateErrorId();

    try {
      // 1. 标准化错误对象
      const unifiedError = this.normalizeError(error, context, errorId);

      // 2. 记录错误历史
      this.addToHistory(unifiedError);

      // 3. 更新统计信息
      this.updateStats(unifiedError);

      // 4. 记录日志
      if (options.logError !== false) {
        this.logError(unifiedError);
      }

      // 5. 上报监控
      if (options.reportToMonitoring !== false) {
        await this.reportToMonitoring(unifiedError);
      }

      // 6. 尝试自动恢复
      let recovered = false;
      if (options.attemptRecovery !== false && unifiedError.retryable) {
        recovered = await this.attemptRecovery(unifiedError, options);
      }

      // 7. 显示用户通知
      if (options.showNotification !== false && !options.silent) {
        await this.showUserNotification(unifiedError, options, recovered);
      }

      // 8. 构建处理结果
      const result: ErrorHandlingResult = {
        errorId,
        handled: true,
        recovered,
        userMessage: this.getUserFriendlyMessage(unifiedError, options),
        shouldRetry: unifiedError.retryable && !recovered,
        retryCount: this.retryCounters.get(errorId) || 0,
        severity: unifiedError.severity,
        classification: unifiedError.classification,
        processingTime: Date.now() - startTime,
        recoverySuggestion: this.getRecoverySuggestion(unifiedError),
      };

      // 9. 更新恢复统计
      if (recovered) {
        this.errorStats.recovered++;
      } else {
        this.errorStats.failed++;
      }

      // 10. 调用回调
      if (options.onError) {
        options.onError(unifiedError);
      }

      if (recovered && options.onRecovery) {
        options.onRecovery(unifiedError);
      }

      return result;
    } catch (handlingError) {
      logger.error('错误处理器本身发生错误', handlingError);

      // 返回默认错误处理结果
      return {
        errorId,
        handled: false,
        recovered: false,
        userMessage: options.customMessage || '系统发生未知错误，请稍后重试',
        shouldRetry: false,
        retryCount: 0,
        severity: ErrorSeverity.HIGH,
        classification: {
          category: 'internal',
          severity: ErrorSeverity.HIGH,
          isRetryable: false,
          userMessage: '系统内部错误',
          technicalDetails: String(handlingError),
          suggestedAction: '请联系技术支持',
        },
        processingTime: Date.now() - startTime,
      };
    }
  }

  /**
   * 标准化错误对象
   * @param error - 原始错误
   * @param context - 错误上下文
   * @param errorId - 错误ID
   * @returns 统一错误对象
   */
  private normalizeError(
    error: Error | AppError | SkillError | unknown,
    context: ErrorContext,
    errorId: string
  ): UnifiedError {
    let type: UnifiedError['type'] = 'unknown';
    let code = 'UNKNOWN_ERROR';
    let message = '未知错误';
    let severity = ErrorSeverity.MEDIUM;
    let retryable = false;
    let maxRetries = 0;

    // 根据错误类型进行分类
    if (error instanceof AppError) {
      type = 'app';
      code = error.code || 'APP_ERROR';
      message = error.message;
      severity = this.mapAppErrorSeverity(error.code);
      retryable = this.isAppErrorRetryable(error.code);
    } else if (error instanceof SkillError) {
      type = 'skill';
      code = error.type || 'SKILL_ERROR';
      message = error.message;
      severity = this.mapSkillErrorSeverity(error.type);
      retryable = this.isSkillErrorRetryable(error.type);
    } else if (error instanceof Error) {
      if (error.name === 'NetworkError' || error.message.includes('fetch')) {
        type = 'network';
        code = 'NETWORK_ERROR';
        severity = ErrorSeverity.HIGH;
        retryable = true;
        maxRetries = 3;
      } else if (error.name === 'ValidationError') {
        type = 'validation';
        code = 'VALIDATION_ERROR';
        severity = ErrorSeverity.MEDIUM;
        retryable = false;
      } else if (error.name === 'PermissionError') {
        type = 'permission';
        code = 'PERMISSION_DENIED';
        severity = ErrorSeverity.HIGH;
        retryable = false;
      }
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object') {
      message = JSON.stringify(error);
    }

    // 生成错误分类
    const classification = this.classifyError(type, code, message, severity);

    return {
      id: errorId,
      type,
      code,
      message,
      originalError: error,
      context: {
        ...context,
        timestamp: context.timestamp || Date.now(),
      },
      timestamp: Date.now(),
      severity,
      classification,
      stack: error instanceof Error ? error.stack : undefined,
      retryable,
      maxRetries: maxRetries || (retryable ? 3 : 0),
    };
  }

  /**
   * 错误分类方法
   * @param type - 错误类型
   * @param code - 错误代码
   * @param message - 错误消息
   * @param severity - 严重级别
   * @returns 错误分类
   */
  private classifyError(
    type: string,
    code: string,
    message: string,
    severity: ErrorSeverity
  ): ErrorClassification {
    const categories = {
      network: {
        category: 'network' as const,
        userMessage: '网络连接出现问题，请检查网络设置',
        technicalDetails: `网络错误: ${message}`,
        suggestedAction: '请检查网络连接并重试',
      },
      validation: {
        category: 'validation' as const,
        userMessage: '输入的数据格式不正确',
        technicalDetails: `验证错误: ${message}`,
        suggestedAction: '请检查输入数据的格式',
      },
      permission: {
        category: 'permission' as const,
        userMessage: '您没有执行此操作的权限',
        technicalDetails: `权限错误: ${message}`,
        suggestedAction: '请联系管理员获取相应权限',
      },
      business: {
        category: 'business' as const,
        userMessage: '操作无法完成，请检查操作条件',
        technicalDetails: `业务逻辑错误: ${message}`,
        suggestedAction: '请检查操作条件并重试',
      },
      system: {
        category: 'system' as const,
        userMessage: '系统暂时不可用，请稍后重试',
        technicalDetails: `系统错误: ${message}`,
        suggestedAction: '请稍后重试或联系技术支持',
      },
    };

    const defaultCategory = {
      category: 'internal' as const,
      userMessage: '发生了未知错误',
      technicalDetails: message,
      suggestedAction: '请重试或联系技术支持',
    };

    const categoryInfo =
      categories[type as keyof typeof categories] || defaultCategory;

    return {
      ...categoryInfo,
      severity,
      isRetryable: this.isErrorRetryable(type, code),
    };
  }

  /**
   * 判断错误是否可重试
   * @param type - 错误类型
   * @param code - 错误代码
   * @returns 是否可重试
   */
  private isErrorRetryable(type: string, code: string): boolean {
    const retryableTypes = ['network'];
    const retryableCodes = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'SERVER_ERROR'];

    return retryableTypes.includes(type) || retryableCodes.includes(code);
  }

  /**
   * 映射应用错误严重级别
   * @param code - 错误代码
   * @returns 严重级别
   */
  private mapAppErrorSeverity(code?: string): ErrorSeverity {
    const severityMap: Record<string, ErrorSeverity> = {
      [ErrorCode.AUTH_REQUIRED]: ErrorSeverity.HIGH,
      [ErrorCode.AUTH_FAILED]: ErrorSeverity.HIGH,
      [ErrorCode.PERMISSION_DENIED]: ErrorSeverity.HIGH,
      [ErrorCode.DATA_NOT_FOUND]: ErrorSeverity.MEDIUM,
      [ErrorCode.DATA_INVALID]: ErrorSeverity.MEDIUM,
      [ErrorCode.NETWORK_ERROR]: ErrorSeverity.HIGH,
      [ErrorCode.API_ERROR]: ErrorSeverity.HIGH,
      [ErrorCode.UNKNOWN_ERROR]: ErrorSeverity.CRITICAL,
    };

    return severityMap[code || ''] || ErrorSeverity.MEDIUM;
  }

  /**
   * 判断应用错误是否可重试
   * @param code - 错误代码
   * @returns 是否可重试
   */
  private isAppErrorRetryable(code?: string): boolean {
    const retryableCodes = [ErrorCode.NETWORK_ERROR, ErrorCode.API_ERROR];

    return retryableCodes.includes(code as ErrorCode);
  }

  /**
   * 映射技能错误严重级别
   * @param type - 技能错误类型
   * @returns 严重级别
   */
  private mapSkillErrorSeverity(type?: SkillErrorType): ErrorSeverity {
    const severityMap: Record<SkillErrorType, ErrorSeverity> = {
      [SkillErrorType.INVALID_SKILL]: ErrorSeverity.MEDIUM,
      [SkillErrorType.SKILL_NOT_AVAILABLE]: ErrorSeverity.MEDIUM,
      [SkillErrorType.INVALID_TARGET]: ErrorSeverity.MEDIUM,
      [SkillErrorType.COOLDOWN_ACTIVE]: ErrorSeverity.LOW,
      [SkillErrorType.INSUFFICIENT_RESOURCES]: ErrorSeverity.MEDIUM,
      [SkillErrorType.SKILL_FAILED]: ErrorSeverity.HIGH,
    };

    return (
      severityMap[type || SkillErrorType.SKILL_FAILED] || ErrorSeverity.MEDIUM
    );
  }

  /**
   * 判断技能错误是否可重试
   * @param type - 技能错误类型
   * @returns 是否可重试
   */
  private isSkillErrorRetryable(type?: SkillErrorType): boolean {
    const retryableTypes = [
      SkillErrorType.SKILL_FAILED,
      SkillErrorType.INSUFFICIENT_RESOURCES,
    ];

    return retryableTypes.includes(type as SkillErrorType);
  }

  /**
   * 尝试自动恢复
   * @param error - 统一错误对象
   * @param options - 处理选项
   * @returns 是否恢复成功
   */
  private async attemptRecovery(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): Promise<boolean> {
    if (!error.retryable) {
      return false;
    }

    const currentRetries = this.retryCounters.get(error.id) || 0;
    const maxRetries = options.maxRetries || error.maxRetries || 3;

    if (currentRetries >= maxRetries) {
      logger.warn('达到最大重试次数', {
        errorId: error.id,
        retries: currentRetries,
      });
      return false;
    }

    // 更新重试计数
    this.retryCounters.set(error.id, currentRetries + 1);

    // 计算重试延迟
    const baseDelay = options.retryDelay || 1000;
    const delay = baseDelay * Math.pow(2, currentRetries); // 指数退避

    logger.info('尝试自动恢复', {
      errorId: error.id,
      attempt: currentRetries + 1,
      maxRetries,
      delay,
    });

    // 等待延迟
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      // 根据错误类型执行不同的恢复策略
      switch (error.type) {
        case 'network':
          return await this.recoverNetworkError(error);
        case 'skill':
          return await this.recoverSkillError(error);
        case 'app':
          return await this.recoverAppError(error);
        default:
          return false;
      }
    } catch (recoveryError) {
      logger.error('恢复过程中发生错误', { errorId: error.id, recoveryError });
      return false;
    }
  }

  /**
   * 恢复网络错误
   * @param error - 错误对象
   * @returns 是否恢复成功
   */
  private async recoverNetworkError(error: UnifiedError): Promise<boolean> {
    // 简单的网络连接测试
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        timeout: 5000,
      } as any);
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * 恢复技能错误
   * @param error - 错误对象
   * @returns 是否恢复成功
   */
  private async recoverSkillError(error: UnifiedError): Promise<boolean> {
    // 技能错误通常需要重新验证状态
    if (error.code === SkillErrorType.COOLDOWN_ACTIVE) {
      // 冷却时间错误，等待一段时间后可能恢复
      return true;
    }
    return false;
  }

  /**
   * 恢复应用错误
   * @param error - 错误对象
   * @returns 是否恢复成功
   */
  private async recoverAppError(error: UnifiedError): Promise<boolean> {
    // 应用错误的恢复策略
    if (error.code === ErrorCode.NETWORK_ERROR) {
      return await this.recoverNetworkError(error);
    }
    return false;
  }

  /**
   * 显示用户通知
   * @param error - 错误对象
   * @param options - 处理选项
   * @param recovered - 是否已恢复
   */
  private async showUserNotification(
    error: UnifiedError,
    options: ErrorHandlingOptions,
    recovered: boolean
  ): Promise<void> {
    const message =
      options.customMessage || this.getUserFriendlyMessage(error, options);

    // 根据严重级别选择通知方式
    const notificationType = this.getNotificationType(
      error.severity,
      recovered
    );

    // 这里应该调用实际的通知系统
    // 暂时使用console输出
    if (recovered) {
      console.info(`[恢复成功] ${message}`);
    } else {
      console.error(`[错误] ${message}`);
    }
  }

  /**
   * 获取通知类型
   * @param severity - 严重级别
   * @param recovered - 是否已恢复
   * @returns 通知类型
   */
  private getNotificationType(
    severity: ErrorSeverity,
    recovered: boolean
  ): string {
    if (recovered) {
      return 'success';
    }

    switch (severity) {
      case ErrorSeverity.LOW:
        return 'info';
      case ErrorSeverity.MEDIUM:
        return 'warning';
      case ErrorSeverity.HIGH:
      case ErrorSeverity.CRITICAL:
        return 'error';
      default:
        return 'warning';
    }
  }

  /**
   * 获取用户友好消息
   * @param error - 错误对象
   * @param options - 处理选项
   * @returns 用户友好消息
   */
  private getUserFriendlyMessage(
    error: UnifiedError,
    options: ErrorHandlingOptions
  ): string {
    if (options.customMessage) {
      return options.customMessage;
    }

    return error.classification.userMessage || '操作失败，请重试';
  }

  /**
   * 获取恢复建议
   * @param error - 错误对象
   * @returns 恢复建议
   */
  private getRecoverySuggestion(error: UnifiedError): string {
    return error.classification.suggestedAction || '请重试或联系技术支持';
  }

  /**
   * 记录错误日志
   * @param error - 错误对象
   */
  private logError(error: UnifiedError): void {
    const logData = {
      errorId: error.id,
      type: error.type,
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      timestamp: error.timestamp,
      stack: error.stack,
    };

    switch (error.severity) {
      case ErrorSeverity.LOW:
        logger.info('低级错误', logData);
        break;
      case ErrorSeverity.MEDIUM:
        logger.warn('中级错误', logData);
        break;
      case ErrorSeverity.HIGH:
        logger.error('高级错误', logData);
        break;
      case ErrorSeverity.CRITICAL:
        logger.error('严重错误', logData);
        break;
    }
  }

  /**
   * 上报监控系统
   * @param error - 错误对象
   */
  private async reportToMonitoring(error: UnifiedError): Promise<void> {
    try {
      // 这里应该调用实际的监控系统API
      // 暂时使用日志记录
      logger.info('上报错误到监控系统', {
        errorId: error.id,
        type: error.type,
        severity: error.severity,
        timestamp: error.timestamp,
      });
    } catch (reportError) {
      logger.error('上报监控系统失败', reportError);
    }
  }

  /**
   * 添加到错误历史
   * @param error - 错误对象
   */
  private addToHistory(error: UnifiedError): void {
    this.errorHistory.unshift(error);

    // 保持历史记录在合理范围内
    if (this.errorHistory.length > 1000) {
      this.errorHistory = this.errorHistory.slice(0, 500);
    }
  }

  /**
   * 更新统计信息
   * @param error - 错误对象
   */
  private updateStats(error: UnifiedError): void {
    this.errorStats.total++;
    this.errorStats.handled++;

    // 按类型统计
    this.errorStats.byType[error.type] =
      (this.errorStats.byType[error.type] || 0) + 1;

    // 按严重级别统计
    this.errorStats.bySeverity[error.severity]++;
  }

  /**
   * 生成错误ID
   * @returns 错误ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 获取错误统计信息
   * @returns 错误统计
   */
  public getStatistics(): ErrorStatistics {
    return { ...this.errorStats };
  }

  /**
   * 获取错误历史
   * @param limit - 限制数量
   * @returns 错误历史
   */
  public getErrorHistory(limit: number = 50): UnifiedError[] {
    return this.errorHistory.slice(0, limit);
  }

  /**
   * 清理过期的错误记录
   * @param maxAge - 最大保留时间（毫秒）
   */
  public cleanupExpiredErrors(maxAge: number = 24 * 60 * 60 * 1000): void {
    const cutoffTime = Date.now() - maxAge;
    this.errorHistory = this.errorHistory.filter(
      error => error.timestamp > cutoffTime
    );

    // 清理重试计数器
    for (const [errorId, _] of this.retryCounters.entries()) {
      const error = this.errorHistory.find(e => e.id === errorId);
      if (!error) {
        this.retryCounters.delete(errorId);
      }
    }
  }

  /**
   * 重置统计信息
   */
  public resetStatistics(): void {
    this.errorStats = {
      total: 0,
      handled: 0,
      recovered: 0,
      failed: 0,
      byType: {},
      bySeverity: {
        [ErrorSeverity.LOW]: 0,
        [ErrorSeverity.MEDIUM]: 0,
        [ErrorSeverity.HIGH]: 0,
        [ErrorSeverity.CRITICAL]: 0,
      },
      averageProcessingTime: 0,
    };
    this.processingTimes = [];
  }
}

// 导出单例实例
export const masterErrorHandler = MasterErrorHandler.getInstance();

// 导出便捷方法
export const handleError = (
  error: Error | AppError | SkillError | unknown,
  context?: ErrorContext,
  options?: ErrorHandlingOptions
) => masterErrorHandler.handleError(error, context, options);

export default masterErrorHandler;
