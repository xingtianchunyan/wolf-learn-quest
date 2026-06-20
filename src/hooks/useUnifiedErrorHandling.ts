/**
 * 文件级注释：统一错误处理Hook
 * 整合所有错误处理机制，为React组件提供统一的错误处理接口
 * 支持错误捕获、分类、通知、监控和恢复
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createLogger } from '@/lib/logger';
import {
  unifiedErrorManager,
  UnifiedErrorData,
  ErrorContext,
  ErrorHandlingOptions,
  ErrorHandlingResult,
} from '@/utils/unifiedErrorManager';
import {
  enhancedUserNotificationSystem,
  NotificationType,
  NotificationPosition,
} from '@/utils/enhancedUserNotificationSystem';
import { ErrorSeverity } from '@/utils/unifiedErrorHandler';

const logger = createLogger('use-unified-error-handling');

/**
 * Hook选项接口
 */
export interface UseUnifiedErrorHandlingOptions {
  /** 组件名称（用于错误上下文） */
  componentName?: string;
  /** 默认错误上下文 */
  defaultContext?: Partial<ErrorContext>;
  /** 默认处理选项 */
  defaultOptions?: Partial<ErrorHandlingOptions>;
  /** 是否自动显示通知 */
  autoNotify?: boolean;
  /** 通知位置 */
  notificationPosition?: NotificationPosition;
  /** 是否启用错误边界 */
  enableErrorBoundary?: boolean;
  /** 错误恢复策略 */
  recoveryStrategy?: 'silent' | 'notify' | 'redirect' | 'reload';
  /** 最大重试次数 */
  maxRetries?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
}

/**
 * Hook返回值接口
 */
export interface UseUnifiedErrorHandlingReturn {
  /** 处理错误 */
  handleError: (
    error: any,
    context?: Partial<ErrorContext>,
    options?: Partial<ErrorHandlingOptions>
  ) => Promise<ErrorHandlingResult>;

  /** 包装异步函数 */
  wrapAsync: <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: Partial<ErrorContext>
  ) => (...args: T) => Promise<R | null>;

  /** 包装同步函数 */
  wrapSync: <T extends any[], R>(
    fn: (...args: T) => R,
    context?: Partial<ErrorContext>
  ) => (...args: T) => R | null;

  /** 重试操作 */
  retry: <T>(
    operation: () => Promise<T>,
    options?: { maxRetries?: number; delay?: number }
  ) => Promise<T | null>;

  /** 显示通知 */
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    loading: (message: string) => void;
  };

  /** 错误状态 */
  errorState: {
    /** 当前错误 */
    currentError: UnifiedErrorData | null;
    /** 错误历史 */
    errorHistory: UnifiedErrorData[];
    /** 是否有错误 */
    hasError: boolean;
    /** 错误统计 */
    errorStats: {
      total: number;
      recent: number;
      byType: Record<string, number>;
      bySeverity: Record<ErrorSeverity, number>;
    };
  };

  /** 清理错误状态 */
  clearError: () => void;

  /** 清理所有错误 */
  clearAllErrors: () => void;

  /** 获取错误恢复建议 */
  getRecoverySuggestion: (error?: UnifiedErrorData) => string;
}

/**
 * 统一错误处理Hook
 * @param options - Hook选项
 * @returns 错误处理接口
 */
export function useUnifiedErrorHandling(
  options: UseUnifiedErrorHandlingOptions = {}
): UseUnifiedErrorHandlingReturn {
  const {
    componentName,
    defaultContext = {},
    defaultOptions = {},
    autoNotify = true,
    notificationPosition = NotificationPosition.TOP_RIGHT,
    enableErrorBoundary = true,
    recoveryStrategy = 'notify',
    maxRetries = 3,
    retryDelay = 1000,
  } = options;

  // 状态管理
  const [currentError, setCurrentError] = useState<UnifiedErrorData | null>(
    null
  );
  const [errorHistory, setErrorHistory] = useState<UnifiedErrorData[]>([]);
  const [errorStats, setErrorStats] = useState({
    total: 0,
    recent: 0,
    byType: {} as Record<string, number>,
    bySeverity: {} as Record<ErrorSeverity, number>,
  });

  // 引用管理
  const componentRef = useRef<string>(componentName || 'UnknownComponent');
  const mountedRef = useRef(true);

  // 更新错误统计
  const updateErrorStats = useCallback(() => {
    const stats = unifiedErrorManager.getErrorStats();
    if (mountedRef.current) {
      setErrorStats(stats);
    }
  }, []);

  // 处理错误的主要方法
  const handleError = useCallback(
    async (
      error: any,
      context: Partial<ErrorContext> = {},
      options: Partial<ErrorHandlingOptions> = {}
    ): Promise<ErrorHandlingResult> => {
      try {
        // 构建完整的错误上下文
        const fullContext: ErrorContext = {
          component: componentRef.current,
          ...defaultContext,
          ...context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        };

        // 构建完整的处理选项
        const fullOptions: ErrorHandlingOptions = {
          showNotification: autoNotify,
          recoveryStrategy,
          autoRetry: true,
          retryDelay,
          ...defaultOptions,
          ...options,

          // 错误回调
          onError: (errorData: UnifiedErrorData) => {
            if (mountedRef.current) {
              setCurrentError(errorData);
              setErrorHistory(prev => [errorData, ...prev.slice(0, 49)]); // 保留最近50个错误
            }

            // 调用用户自定义回调
            if (options.onError) {
              options.onError(errorData);
            }

            // 更新统计
            updateErrorStats();
          },
        };

        // 使用统一错误管理器处理错误
        const result = await unifiedErrorManager.handleError(
          error,
          fullContext,
          fullOptions
        );

        logger.debug('错误处理完成', {
          component: componentRef.current,
          errorId: result.errorId,
          handled: result.handled,
        });

        return result;
      } catch (handlingError) {
        logger.error('错误处理失败', handlingError);

        // 返回默认结果
        return {
          handled: false,
          errorId: 'unknown',
          userMessage: '系统发生未知错误',
          shouldRetry: false,
          strategy: 'toast' as any,
          severity: ErrorSeverity.HIGH,
        };
      }
    },
    [
      componentRef,
      defaultContext,
      defaultOptions,
      autoNotify,
      recoveryStrategy,
      retryDelay,
      updateErrorStats,
    ]
  );

  // 包装异步函数
  const wrapAsync = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => Promise<R>,
      context: Partial<ErrorContext> = {}
    ) => {
      return async (...args: T): Promise<R | null> => {
        try {
          return await fn(...args);
        } catch (error) {
          await handleError(error, context);
          return null;
        }
      };
    },
    [handleError]
  );

  // 包装同步函数
  const wrapSync = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => R,
      context: Partial<ErrorContext> = {}
    ) => {
      return (...args: T): R | null => {
        try {
          return fn(...args);
        } catch (error) {
          handleError(error, context);
          return null;
        }
      };
    },
    [handleError]
  );

  // 重试操作
  const retry = useCallback(
    async <T>(
      operation: () => Promise<T>,
      retryOptions: { maxRetries?: number; delay?: number } = {}
    ): Promise<T | null> => {
      const maxAttempts = retryOptions.maxRetries || maxRetries;
      const delay = retryOptions.delay || retryDelay;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          if (attempt > 1) {
            // 等待重试延迟
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
          }

          const result = await operation();

          if (attempt > 1) {
            // 重试成功，显示成功通知
            enhancedUserNotificationSystem.success(
              `操作重试成功（第${attempt}次尝试）`,
              { position: notificationPosition }
            );
          }

          return result;
        } catch (error) {
          if (attempt === maxAttempts) {
            // 最后一次重试失败
            await handleError(error, {
              action: 'retry_failed',
              metadata: { attempts: attempt, maxAttempts },
            });
            break;
          }

          // 记录重试失败
          logger.warn('重试失败，继续尝试', {
            component: componentRef.current,
            attempt,
            maxAttempts,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      return null;
    },
    [handleError, maxRetries, retryDelay, notificationPosition]
  );

  // 通知方法
  const notify = {
    success: useCallback(
      (message: string) => {
        enhancedUserNotificationSystem.success(message, {
          position: notificationPosition,
        });
      },
      [notificationPosition]
    ),

    error: useCallback(
      (message: string) => {
        enhancedUserNotificationSystem.error(message, {
          position: notificationPosition,
        });
      },
      [notificationPosition]
    ),

    warning: useCallback(
      (message: string) => {
        enhancedUserNotificationSystem.warning(message, {
          position: notificationPosition,
        });
      },
      [notificationPosition]
    ),

    info: useCallback(
      (message: string) => {
        enhancedUserNotificationSystem.info(message, {
          position: notificationPosition,
        });
      },
      [notificationPosition]
    ),

    loading: useCallback(
      (message: string) => {
        enhancedUserNotificationSystem.loading(message, {
          position: notificationPosition,
        });
      },
      [notificationPosition]
    ),
  };

  // 清理错误状态
  const clearError = useCallback(() => {
    if (mountedRef.current) {
      setCurrentError(null);
    }
  }, []);

  // 清理所有错误
  const clearAllErrors = useCallback(() => {
    if (mountedRef.current) {
      setCurrentError(null);
      setErrorHistory([]);
    }

    // 清理通知
    enhancedUserNotificationSystem.closeAll();

    // 清理错误管理器历史
    unifiedErrorManager.cleanupHistory();

    updateErrorStats();
  }, [updateErrorStats]);

  // 获取错误恢复建议
  const getRecoverySuggestion = useCallback(
    (error?: UnifiedErrorData): string => {
      const targetError = error || currentError;

      if (!targetError) {
        return '暂无错误信息';
      }

      return targetError.actionSuggestion || '请稍后重试或联系技术支持';
    },
    [currentError]
  );

  // 错误边界处理
  useEffect(() => {
    if (!enableErrorBoundary) return;

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleError(event.reason, {
        action: 'unhandled_promise_rejection',
        component: componentRef.current,
      });
    };

    const handleError = (event: ErrorEvent) => {
      handleError(event.error, {
        action: 'unhandled_error',
        component: componentRef.current,
        url: event.filename,
        metadata: {
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
      window.removeEventListener('error', handleError);
    };
  }, [enableErrorBoundary, handleError]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 初始化时更新统计
  useEffect(() => {
    updateErrorStats();
  }, [updateErrorStats]);

  // 定期更新错误统计
  useEffect(() => {
    const interval = setInterval(updateErrorStats, 30000); // 每30秒更新一次
    return () => clearInterval(interval);
  }, [updateErrorStats]);

  return {
    handleError,
    wrapAsync,
    wrapSync,
    retry,
    notify,
    errorState: {
      currentError,
      errorHistory,
      hasError: currentError !== null,
      errorStats,
    },
    clearError,
    clearAllErrors,
    getRecoverySuggestion,
  };
}

/**
 * 错误边界Hook
 * 专门用于React错误边界的错误处理
 */
export function useErrorBoundary(componentName?: string) {
  const { handleError } = useUnifiedErrorHandling({
    componentName: componentName || 'ErrorBoundary',
    autoNotify: true,
    enableErrorBoundary: false, // 避免重复监听
    recoveryStrategy: 'notify',
  });

  const captureError = useCallback(
    (error: Error, errorInfo?: any) => {
      handleError(error, {
        component: componentName || 'ErrorBoundary',
        action: 'component_error_boundary',
        metadata: {
          errorInfo,
          componentStack: errorInfo?.componentStack,
        },
      });
    },
    [handleError, componentName]
  );

  return { captureError };
}

/**
 * 异步操作Hook
 * 专门用于处理异步操作中的错误
 */
export function useAsyncErrorHandling(componentName?: string) {
  const { handleError, wrapAsync, retry } = useUnifiedErrorHandling({
    componentName: componentName || 'AsyncOperation',
    autoNotify: true,
    recoveryStrategy: 'notify',
    maxRetries: 3,
  });

  const executeAsync = useCallback(
    async <T>(
      operation: () => Promise<T>,
      context?: Partial<ErrorContext>
    ): Promise<T | null> => {
      const wrappedOperation = wrapAsync(operation, context);
      return await wrappedOperation();
    },
    [wrapAsync]
  );

  const executeWithRetry = useCallback(
    async <T>(
      operation: () => Promise<T>,
      retryOptions?: { maxRetries?: number; delay?: number }
    ): Promise<T | null> => {
      return await retry(operation, retryOptions);
    },
    [retry]
  );

  return {
    handleError,
    executeAsync,
    executeWithRetry,
  };
}

/**
 * 表单错误处理Hook
 * 专门用于表单验证和提交错误处理
 */
export function useFormErrorHandling(formName?: string) {
  const { handleError, notify } = useUnifiedErrorHandling({
    componentName: formName || 'Form',
    autoNotify: false, // 表单错误通常需要自定义处理
    recoveryStrategy: 'notify',
  });

  const handleValidationError = useCallback(
    (fieldErrors: Record<string, string[]>, generalError?: string) => {
      // 显示字段错误
      Object.entries(fieldErrors).forEach(([field, errors]) => {
        errors.forEach(error => {
          notify.error(`${field}: ${error}`);
        });
      });

      // 显示通用错误
      if (generalError) {
        notify.error(generalError);
      }

      // 记录验证错误
      handleError(new Error('表单验证失败'), {
        action: 'form_validation',
        metadata: { fieldErrors, generalError },
      });
    },
    [handleError, notify]
  );

  const handleSubmitError = useCallback(
    (error: any) => {
      handleError(error, {
        action: 'form_submit',
        metadata: { formName },
      });
    },
    [handleError, formName]
  );

  return {
    handleValidationError,
    handleSubmitError,
    notify,
  };
}
