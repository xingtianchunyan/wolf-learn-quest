import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { createLogger } from '@/lib/logger';

const logger = createLogger('error-handler');

interface ErrorHandlerOptions {
  showToast?: boolean;
  logLevel?: 'error' | 'warn' | 'info';
  retryable?: boolean;
  context?: string;
}

interface ErrorHandlerReturn {
  handleError: (error: Error | unknown, options?: ErrorHandlerOptions) => void;
  handleAsyncError: <T>(
    asyncFn: () => Promise<T>,
    options?: ErrorHandlerOptions
  ) => Promise<T | null>;
  withErrorHandling: <T extends (...args: any[]) => any>(
    fn: T,
    options?: ErrorHandlerOptions
  ) => T;
}

export const useErrorHandler = (): ErrorHandlerReturn => {
  const { toast } = useToast();

  const handleError = useCallback((
    error: Error | unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logLevel = 'error',
      context = '未知操作'
    } = options;

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    // 记录到日志系统
    logger[logLevel](`错误处理: ${context}`, {
      message: errorMessage,
      stack: errorStack,
      context
    });

    // 显示用户友好的错误提示
    if (showToast) {
      toast({
        title: "操作失败",
        description: getUserFriendlyMessage(errorMessage),
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [toast]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }, [handleError]);

  const withErrorHandling = useCallback(<T extends (...args: any[]) => any>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ): T => {
    return ((...args: Parameters<T>) => {
      try {
        const result = fn(...args);
        
        // 如果是 Promise，处理异步错误
        if (result instanceof Promise) {
          return result.catch((error: any): null => {
            handleError(error, options);
            return null;
          });
        }
        
        return result;
      } catch (error) {
        handleError(error, options);
        return null;
      }
    }) as T;
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    withErrorHandling
  };
};

// 将技术错误信息转换为用户友好的消息
function getUserFriendlyMessage(errorMessage: string): string {
  const errorMappings: Record<string, string> = {
    'Network Error': '网络连接失败，请检查网络设置',
    'Unauthorized': '权限不足，请重新登录',
    'Forbidden': '没有权限执行此操作',
    'Not Found': '请求的资源不存在',
    'Internal Server Error': '服务器内部错误，请稍后重试',
    'Bad Request': '请求参数错误',
    'Timeout': '请求超时，请重试',
    'PGRST116': '数据不存在或已被删除',
    'PGRST301': '权限不足，无法访问数据',
    'Authentication required': '请先登录',
    'Invalid credentials': '用户名或密码错误'
  };

  // 检查是否有匹配的友好消息
  for (const [key, friendlyMessage] of Object.entries(errorMappings)) {
    if (errorMessage.includes(key)) {
      return friendlyMessage;
    }
  }

  // 如果没有匹配的映射，返回通用错误消息
  if (errorMessage.length > 100) {
    return '操作失败，请稍后重试';
  }

  return errorMessage || '未知错误，请联系技术支持';
}