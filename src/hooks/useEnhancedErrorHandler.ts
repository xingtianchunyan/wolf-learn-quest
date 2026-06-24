/**
 * 文件级注释：增强的错误处理 Hook
 * 提供统一的错误处理接口，支持自动重试、用户友好提示和错误恢复
 */

import { useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  handleError,
  UnifiedErrorType,
  ErrorHandlingOptions,
} from '@/utils/unifiedErrorHandler';
import { createLogger } from '@/lib/logger';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const logger = createLogger('enhanced-error-handler');

/**
 * 错误恢复策略
 */
export interface ErrorRecoveryStrategy {
  retryAction?: () => Promise<void> | void;
  fallbackAction?: () => Promise<void> | void;
  refreshAction?: () => Promise<void> | void;
}

/**
 * 增强错误处理选项
 */
export interface EnhancedErrorOptions extends ErrorHandlingOptions {
  recovery?: ErrorRecoveryStrategy;
  customMessage?: string;
  silent?: boolean;
  category?: string;
}

/**
 * 增强的错误处理 Hook
 * 提供统一的错误处理、用户友好的提示和自动恢复功能
 */
export const useEnhancedErrorHandler = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const retryCountRef = useRef<Map<string, number>>(new Map());

  /**
   * 处理错误的主要方法
   */
  const handleErrorEnhanced = useCallback(
    async (error: unknown, options: EnhancedErrorOptions = {}) => {
      const {
        recovery,
        customMessage,
        silent = false,
        category = 'general',
        maxRetries = 3,
        ...restOptions
      } = options;

      try {
        // 记录错误
        logger.error(`错误处理 [${category}]`, {
          error:
            error && typeof error === 'object' && 'message' in error
              ? (error as Error).message
              : String(error),
          category,
          options,
        });

        // 静默模式下不显示 toast
        const enhancedOptions: ErrorHandlingOptions = {
          ...restOptions,
          showToast: !silent,
          maxRetries,
        };

        // 使用统一错误系统处理
        await handleError(error, enhancedOptions);

        // 显示用户友好的错误提示
        if (!silent) {
          showErrorToast(error, customMessage);
        }

        // 尝试错误恢复
        if (recovery) {
          await attemptRecovery(error, recovery, category, maxRetries);
        }
      } catch (handlingError) {
        logger.error('错误处理失败', {
          originalError: error,
          handlingError,
          category,
        });

        // 显示通用错误提示
        if (!silent) {
          toast({
            title: t('hook.enhanced.system_error_title'),
            description: t('hook.enhanced.system_error_desc'),
            variant: 'destructive',
          });
        }
      }
    },
    [toast, t]
  );

  /**
   * 显示错误 Toast 提示
   */
  const showErrorToast = useCallback(
    (error: unknown, customMessage?: string) => {
      let title = t('common.operation_failed');
      let description = customMessage || t('common.unexpected_error');

      // 根据错误类型自定义消息
      if (
        error &&
        typeof error === 'object' &&
        'type' in error &&
        typeof error.type === 'string'
      ) {
        switch (error.type) {
          case UnifiedErrorType.NETWORK:
            title = t('hook.enhanced.network_error_title');
            description = customMessage || t('hook.enhanced.network_error_desc');
            break;
          case UnifiedErrorType.PERMISSION:
            title = t('hook.enhanced.permission_denied_title');
            description = customMessage || t('hook.enhanced.permission_denied_desc');
            break;
          case UnifiedErrorType.VALIDATION:
            title = t('hook.enhanced.validation_error_title');
            description = customMessage || t('hook.enhanced.validation_error_desc');
            break;
          case UnifiedErrorType.SKILL:
            title = t('hook.enhanced.skill_error_title');
            description = customMessage || t('hook.enhanced.skill_error_desc');
            break;
        }
      }

      // 显示 toast
      toast({
        title,
        description,
        variant: 'destructive',
      });
    },
    [toast, t]
  );

  /**
   * 尝试错误恢复
   */
  const attemptRecovery = useCallback(
    async (
      error: unknown,
      recovery: ErrorRecoveryStrategy,
      category: string,
      maxRetries: number
    ) => {
      const errorCode =
        error &&
        typeof error === 'object' &&
        'code' in error &&
        typeof error.code === 'string'
          ? error.code
          : 'unknown';
      const retryKey = `${category}_${errorCode}`;
      const currentRetries = retryCountRef.current.get(retryKey) || 0;

      try {
        // 如果有重试动作且未超过最大重试次数
        if (recovery.retryAction && currentRetries < maxRetries) {
          retryCountRef.current.set(retryKey, currentRetries + 1);

          logger.info(
            `尝试恢复 [${category}] - 第 ${currentRetries + 1} 次重试`
          );

          await recovery.retryAction();

          // 重试成功，重置计数器
          retryCountRef.current.delete(retryKey);

          toast({
            title: t('hook.enhanced.retry_success_title'),
            description: t('hook.enhanced.retry_success_desc'),
            variant: 'default',
          });

          return;
        }

        // 如果重试失败或无重试动作，尝试回退动作
        if (recovery.fallbackAction) {
          logger.info(`执行回退动作 [${category}]`);
          await recovery.fallbackAction();

          toast({
            title: t('hook.enhanced.fallback_title'),
            description: t('hook.enhanced.fallback_desc'),
            variant: 'default',
          });

          return;
        }

        // 如果有刷新动作
        if (recovery.refreshAction) {
          logger.info(`执行刷新动作 [${category}]`);
          await recovery.refreshAction();

          toast({
            title: t('hook.enhanced.refresh_title'),
            description: t('hook.enhanced.refresh_desc'),
            variant: 'default',
          });
        }
      } catch (recoveryError) {
        logger.error(`错误恢复失败 [${category}]`, {
          originalError: error,
          recoveryError,
          retryCount: currentRetries,
        });

        toast({
          title: t('hook.enhanced.recovery_failed_title'),
          description: t('hook.enhanced.recovery_failed_desc'),
          variant: 'destructive',
        });
      }
    },
    [toast, t]
  );

  /**
   * 处理异步操作的错误
   */
  const handleAsyncError = useCallback(
    async <T>(
      asyncOperation: () => Promise<T>,
      options: EnhancedErrorOptions = {}
    ): Promise<T | null> => {
      try {
        return await asyncOperation();
      } catch (error) {
        await handleErrorEnhanced(error, options);
        return null;
      }
    },
    [handleErrorEnhanced]
  );

  /**
   * 创建带错误处理的异步函数包装器
   */
  const withErrorHandling = useCallback(
    <T extends unknown[], R>(
      fn: (...args: T) => Promise<R>,
      options: EnhancedErrorOptions = {}
    ) => {
      return async (...args: T): Promise<R | null> => {
        try {
          return await fn(...args);
        } catch (error) {
          await handleErrorEnhanced(error, options);
          return null;
        }
      };
    },
    [handleErrorEnhanced]
  );

  /**
   * 创建带重试的异步函数
   */
  const withRetry = useCallback(
    <T extends unknown[], R>(
      fn: (...args: T) => Promise<R>,
      retryOptions: {
        maxRetries?: number;
        retryDelay?: number;
        category?: string;
      } = {}
    ) => {
      const {
        maxRetries = 3,
        retryDelay = 1000,
        category = 'retry',
      } = retryOptions;

      return async (...args: T): Promise<R | null> => {
        let lastError: unknown;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
          try {
            return await fn(...args);
          } catch (error) {
            lastError = error;

            if (attempt < maxRetries) {
              const errorMessage =
                error &&
                typeof error === 'object' &&
                'message' in error &&
                typeof error.message === 'string'
                  ? error.message
                  : String(error);
              logger.info(`重试操作 [${category}] - 第 ${attempt + 1} 次`, {
                error: errorMessage,
                nextRetryIn: retryDelay,
              });

              await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
          }
        }

        // 所有重试都失败了
        await handleErrorEnhanced(lastError, {
          category,
          customMessage: t('hook.enhanced.retry_exhausted', { count: maxRetries }),
        });

        return null;
      };
    },
    [handleErrorEnhanced]
  );

  /**
   * 清除重试计数器
   */
  const clearRetryCount = useCallback((category?: string) => {
    if (category) {
      // 清除特定类别的重试计数
      const keysToDelete = Array.from(retryCountRef.current.keys()).filter(
        key => key.startsWith(category)
      );
      keysToDelete.forEach(key => retryCountRef.current.delete(key));
    } else {
      // 清除所有重试计数
      retryCountRef.current.clear();
    }
  }, []);

  /**
   * 获取重试统计
   */
  const getRetryStats = useCallback(() => {
    const stats = new Map<string, number>();
    retryCountRef.current.forEach((count, key) => {
      const category = key.split('_')[0];
      stats.set(category, (stats.get(category) || 0) + count);
    });
    return Object.fromEntries(stats);
  }, []);

  return {
    handleError: handleErrorEnhanced,
    handleAsyncError,
    withErrorHandling,
    withRetry,
    clearRetryCount,
    getRetryStats,
    showErrorToast,
  };
};

/**
 * 错误边界组件的 Hook
 */
export const useErrorBoundary = () => {
  const { handleError } = useEnhancedErrorHandler();
  const { t } = useLanguage();

  const captureError = useCallback(
    (error: Error, errorInfo?: unknown) => {
      handleError(error, {
        category: 'error-boundary',
        customMessage: t('hook.enhanced.component_render_error'),
        recovery: {
          refreshAction: () => window.location.reload(),
        },
      });
    },
    [handleError, t]
  );

  return { captureError };
};
