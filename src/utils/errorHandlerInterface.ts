import { ErrorSeverity } from './unifiedErrorHandler';

/**
 * 文件级注释：统一错误处理接口
 * 定义所有错误处理器必须实现的标准接口
 * 确保错误处理的一致性和可扩展性
 */

/**
 * 错误处理结果接口
 */
export interface ErrorHandlingResult {
  /** 是否成功处理 */ handled: boolean;
  /** 错误ID */
  errorId: string;
  /** 用户友好消息 */
  userMessage: string;
  /** 是否需要重试 */
  shouldRetry: boolean;
  /** 建议的重试延迟（毫秒） */
  retryDelay?: number;
  /** 错误分类 */
  category: string;
  /** 处理时间戳 */
  timestamp: number;
}

/**
 * 错误处理选项接口
 */
export interface StandardErrorOptions {
  /** 错误上下文 */ context?: string;
  /** 错误严重级别 */
  severity?: ErrorSeverity;
  /** 是否显示用户提示 */
  showToUser?: boolean;
  /** 自定义用户消息 */
  customMessage?: string;
  /** 是否可重试 */
  retryable?: boolean;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 是否记录日志 */
  logError?: boolean;
  /** 是否上报监控 */
  reportToMonitoring?: boolean;
}

/**
 * 标准错误处理器接口
 * 所有错误处理器都应该实现此接口
 */
export interface IErrorHandler {
  /**
   * 处理错误的主要方法
   * @param error - 错误对象
   * @param options - 处理选项
   * @returns 处理结果
   */
  handleError(
    error: any,
    options?: StandardErrorOptions
  ): Promise<ErrorHandlingResult>;

  /**
   * 获取错误统计信息
   * @returns 错误统计
   */
  getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<ErrorSeverity, number>;
    recent: number; // 最近1小时的错误数
  };

  /**
   * 获取错误历史记录
   * @param limit - 返回记录数限制
   * @returns 错误历史
   */
  getErrorHistory(limit?: number): Array<{
    id: string;
    type: string;
    message: string;
    timestamp: number;
    severity: ErrorSeverity;
  }>;

  /**
   * 清理错误历史
   * @param olderThan - 清理指定时间之前的记录（毫秒时间戳）
   */
  clearErrorHistory(olderThan?: number): void;
}

/**
 * 用户通知接口
 */
export interface IUserNotifier {
  /**
   * 显示成功消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showSuccess(message: string, duration?: number): void;

  /**
   * 显示警告消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showWarning(message: string, duration?: number): void;

  /**
   * 显示错误消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showError(message: string, duration?: number): void;

  /**
   * 显示信息消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showInfo(message: string, duration?: number): void;
}

/**
 * 错误恢复策略接口
 */
export interface IErrorRecoveryStrategy {
  /**
   * 检查是否可以恢复
   * @param error - 错误对象
   * @returns 是否可以恢复
   */
  canRecover(error: any): boolean;

  /**
   * 执行恢复操作
   * @param error - 错误对象
   * @returns 恢复结果
   */
  recover(error: any): Promise<boolean>;

  /**
   * 获取恢复建议
   * @param error - 错误对象
   * @returns 恢复建议
   */
  getRecoverySuggestion(error: any): string;
}

/**
 * 错误分类器接口
 */
export interface IErrorClassifier {
  /**
   * 分类错误
   * @param error - 错误对象
   * @returns 错误分类信息
   */
  classify(error: any): {
    type: string;
    category: string;
    severity: ErrorSeverity;
    isRetryable: boolean;
    expectedRecoveryTime?: number;
  };
}
