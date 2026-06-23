/**
 * 统一错误处理工具
 */

export enum ErrorCode {
  // 认证相关
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  AUTH_FAILED = 'AUTH_FAILED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',

  // 数据相关
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  DATA_INVALID = 'DATA_INVALID',
  DATA_CONFLICT = 'DATA_CONFLICT',

  // 网络相关
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',

  // 业务逻辑
  GAME_ERROR = 'GAME_ERROR',
  SKILL_ERROR = 'SKILL_ERROR',
  VOTE_ERROR = 'VOTE_ERROR',

  // 系统错误
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: unknown;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

/**
 * 错误消息映射
 */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.AUTH_REQUIRED]: '请先登录',
  [ErrorCode.AUTH_FAILED]: '认证失败',
  [ErrorCode.PERMISSION_DENIED]: '权限不足',
  [ErrorCode.DATA_NOT_FOUND]: '数据不存在',
  [ErrorCode.DATA_INVALID]: '数据格式错误',
  [ErrorCode.DATA_CONFLICT]: '数据冲突',
  [ErrorCode.NETWORK_ERROR]: '网络连接失败',
  [ErrorCode.API_ERROR]: 'API 调用失败',
  [ErrorCode.GAME_ERROR]: '游戏操作失败',
  [ErrorCode.SKILL_ERROR]: '技能使用失败',
  [ErrorCode.VOTE_ERROR]: '投票操作失败',
  [ErrorCode.UNKNOWN_ERROR]: '未知错误',
};

/**
 * 获取用户友好的错误消息
 */
export const getErrorMessage = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    return ERROR_MESSAGES[error.code] || error.message;
  }

  // Supabase 错误处理
  if (error.message.includes('JWT')) {
    return ERROR_MESSAGES[ErrorCode.AUTH_REQUIRED];
  }

  if (error.message.includes('permission')) {
    return ERROR_MESSAGES[ErrorCode.PERMISSION_DENIED];
  }

  if (error.message.includes('network') || error.message.includes('fetch')) {
    return ERROR_MESSAGES[ErrorCode.NETWORK_ERROR];
  }

  return error.message || ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
};

/**
 * 记录错误日志
 */
export const logError = (error: Error | AppError, context?: string): void => {
  const errorInfo = {
    message: error.message,
    code: error instanceof AppError ? error.code : ErrorCode.UNKNOWN_ERROR,
    details: error instanceof AppError ? error.details : undefined,
    context,
    timestamp: new Date().toISOString(),
    stack: error.stack,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', errorInfo);
  }

  // 在生产环境中，这里可以发送到错误监控服务
  // 例如 Sentry, LogRocket 等
};

/**
 * 包装异步函数，统一错误处理
 */
export const withErrorHandler = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(
              error instanceof Error ? error.message : 'Unknown error',
              ErrorCode.UNKNOWN_ERROR,
              error
            );

      logError(appError, context);
      throw appError;
    }
  };
};

import React from 'react';

/**
 * React 错误边界工具
 */

export const createErrorBoundary = (
  fallbackComponent: React.ComponentType<{ error: Error }>
) => {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logError(error, `React Error Boundary: ${errorInfo.componentStack}`);
    }

    render() {
      if (this.state.hasError && this.state.error) {
        return React.createElement(fallbackComponent, {
          error: this.state.error,
        });
      }

      return this.props.children;
    }
  };
};
