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

  const handleError = (error: any, context?: string) => {
    // 记录操作（用于错误率计算）
    recordOperation();

    // 使用增强的错误处理系统
    enhancedHandler.handleError(error, {
      category: context || 'legacy',
      customMessage: undefined, // 让系统自动生成消息
      silent: false
    });

    // 保持原有的日志记录（向后兼容）
    logError(error, context);
  };

  const handleAsyncError = async (asyncFn: () => Promise<any>, context?: string) => {
    // 记录操作
    recordOperation();

    return enhancedHandler.handleAsyncError(asyncFn, {
      category: context || 'legacy-async'
    });
  };

  const withErrorHandling = <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: string
  ) => {
    return enhancedHandler.withErrorHandling(fn, {
      category: context || 'legacy-wrapper'
    });
  };

  return {
    handleError,
    handleAsyncError,
    withErrorHandling,
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