import { useToast } from '@/hooks/use-toast';
import { logError } from '@/utils/errorHandler';
import { useEnhancedErrorHandler } from './useEnhancedErrorHandler';
import { recordOperation } from '@/services/errorMonitoringService';

/**
 * 兼容性错误处理 Hook
 * 保持原有接口的同时，内部使用增强的错误处理系统
 * @deprecated 建议使用 useEnhancedErrorHandler 获得更好的功能
 */
export const useErrorHandler = () => {
  const { toast } = useToast();
  const enhancedHandler = useEnhancedErrorHandler();

  const handleError = (error: unknown, context?: string) => {
    // 记录操作（用于错误率计算）
    recordOperation();

    // 使用增强的错误处理系统
    enhancedHandler.handleError(error, {
      category: context || 'legacy',
      customMessage: undefined, // 让系统自动生成消息
      silent: false,
    });

    // 保持原有的日志记录（向后兼容）
    logError(error, context);
  };

  const handleAsyncError = async (
    asyncFn: () => Promise<unknown>,
    context?: string
  ) => {
    // 记录操作
    recordOperation();

    return enhancedHandler.handleAsyncError(asyncFn, {
      category: context || 'legacy-async',
    });
  };

  const withErrorHandling = <T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    context?: string
  ) => {
    return enhancedHandler.withErrorHandling(fn, {
      category: context || 'legacy-wrapper',
    });
  };

  return {
    handleError,
    handleAsyncError,
    withErrorHandling,
  };
};
