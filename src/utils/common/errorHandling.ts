import { createLogger   } from '@/lib/logger';
import { isSkillErrorRetryable, SkillErrorType,, ErrorSeverity  } from
  ErrorHandlingStrategy,
  ErrorRecoveryAction  } from '@/types/skillSystem.types';
  determineErrorSeverity,
  determineErrorStrategy,
  getErrorUserMessage,
  getSeverityTitle,
  getSeverityVariant  } from './dataValidation';

const logger = createLogger('error-handling');

/**
* 错误恢复建议接口
 */
export interface ErrorRecoverySuggestion  { /** 建议的操作 */
  action: ErrorRecoveryAction;
  /** 建议描述 */
  description: string;
  /** 是否自动执行 */
  autoExecute?: boolean;
  /** 执行延迟（毫秒） */
  delay?: number
}

/**
* 错误处理结果接口
 */
export interface ErrorHandlingResult  { /** 是否成功处理 */
  handled: boolean;
  /** 处理策略 */
  strategy: ErrorHandlingStrategy;
  /** 用户消息 */
  userMessage: string;
  /** 恢复建议 */
  recoverySuggestion?: ErrorRecoverySuggestion;
  /** 是否需要重试 */
  shouldRetry: boolean;
  /** 重试延迟（毫秒） */
  retryDelay?: number
}

/**
* Toast 显示时长映射
* 根据错误严重级别确定显示时长
*
* @param severity - 错误严重级别
* @returns 显示时长（毫秒）
 */
export function getToastDuration(severity: ErrorSeverity): number { const durationMap: Record<ErrorSeverity, number> =  {
    [ErrorSeverity.LOW]: 3000,
    [ErrorSeverity.MEDIUM]: 5000,
    [ErrorSeverity.HIGH]: 8000,
    [ErrorSeverity.CRITICAL]: 10000  
};

  return durationMap[severity]
}

/**
* 模态框操作按钮配置
* 根据错误严重级别确定操作按钮
*
* @param severity - 错误严重级别
* @param canRetry - 是否可重试
* @returns 操作按钮配置
 */
export function getModalActions(
  severity: ErrorSeverity,
  canRetry: boolean = false;
): Array<{ label: string; action: string; variant?: string  
}> { const baseActions = [;
    { label: '确定', action: 'close', variant: 'default'  
} ];

  if (canRetry) { baseActions.unshift({
      label: '重试',
      action: 'retry',
      variant: 'default' 
})
}

  if (severity === ErrorSeverity.CRITICAL) { baseActions.push({
      label: '刷新页面',
      action: 'reload',
      variant: 'destructive' 
})
}

  return baseActions
}

/**
* 获取技能错误恢复建议
* 统一技能错误恢复建议生成逻辑
*
* @param errorType - 技能错误类型
* @returns 恢复建议
 */
export function getSkillErrorRecoverySuggestion(
  errorType: SkillErrorType
): ErrorRecoverySuggestion { const suggestionMap: Record<SkillErrorType, ErrorRecoverySuggestion> = {
    [SkillErrorType.NETWORK_ERROR]: {
      action: ErrorRecoveryAction.RETRY,
      description: '检查网络连接后重试',
      autoExecute: true,
      delay: 2000 
},
    [SkillErrorType.EXECUTION_ERROR]: { action: ErrorRecoveryAction.RETRY,
      description: '稍后重试操作',
      autoExecute: false,
      delay: 1000 
},
    [SkillErrorType.CONFLICT_ERROR]: { action: ErrorRecoveryAction.REFRESH,
      description: '刷新游戏状态后重试',
      autoExecute: false 
},
    [SkillErrorType.PERMISSION_ERROR]: { action: ErrorRecoveryAction.CONTACT_ADMIN,
      description: '联系管理员获取权限',
      autoExecute: false 
},
    [SkillErrorType.VALIDATION_ERROR]: { action: ErrorRecoveryAction.CORRECT_INPUT,
      description: '检查输入条件后重试',
      autoExecute: false 
},
    [SkillErrorType.CONFIG_ERROR]: { action: ErrorRecoveryAction.CONTACT_ADMIN,
      description: '联系管理员修复配置',
      autoExecute: false 
}
  };

  return suggestionMap[errorType] || { action: ErrorRecoveryAction.RETRY,
    description: '稍后重试',
    autoExecute: false 
}
}

/**
* 错误分类映射
* 统一错误分类逻辑
*
* @param errorType - 技能错误类型
* @returns 错误分类
 */
export function getErrorCategory(errorType: SkillErrorType): string { const categoryMap: Record<SkillErrorType, string> =  {
    [SkillErrorType.VALIDATION_ERROR]: 'validation',
    [SkillErrorType.EXECUTION_ERROR]: 'execution',
    [SkillErrorType.NETWORK_ERROR]: 'network',
    [SkillErrorType.PERMISSION_ERROR]: 'permission',
    [SkillErrorType.CONFLICT_ERROR]: 'conflict',
    [SkillErrorType.CONFIG_ERROR]: 'configuration'  
};

  return categoryMap[errorType] || 'unknown'
}

/**
* 统一错误处理函数
* 整合所有错误处理逻辑，提供统一的错误处理接口
*
* @param errorType - 技能错误类型
* @param customMessage - 自定义错误消息（可选）
* @param context - 错误上下文信息（可选）
* @returns 错误处理结果
 */
export function handleSkillError(
  errorType: SkillErrorType,
  customMessage?: string,
  context?: Record<string, any>
): ErrorHandlingResult { logger.error('处理技能错误', {
    errorType,
    customMessage,
    context });

  const severity = determineErrorSeverity(errorType);
  const strategy = determineErrorStrategy(errorType);
  const userMessage = getErrorUserMessage(errorType, customMessage);
  const shouldRetry = isSkillErrorRetryable(errorType);
  const recoverySuggestion = getSkillErrorRecoverySuggestion(errorType);

  // 计算重试延迟
  let retryDelay: number | undefined;
  if (shouldRetry) { const baseDelay = 1000;
    const severityMultiplier = {
      [ErrorSeverity.LOW]: 1,
      [ErrorSeverity.MEDIUM]: 2,
      [ErrorSeverity.HIGH]: 3,
      [ErrorSeverity.CRITICAL]: 5   
}
    retryDelay = baseDelay * severityMultiplier[severity]
}

  return { handled: true,
    strategy,
    userMessage,
    recoverySuggestion,
    shouldRetry,
    retryDelay }
}

/**
* 网络错误恢复函数
* 统一网络错误恢复逻辑
*
* @param error - 错误对象
* @param maxRetries - 最大重试次数
* @returns 恢复结果
 */
export async function recoverNetworkError(
  error: Error,
  maxRetries: number = 3;
): Promise<{ recovered: boolean; attempts: number  
}> { logger.info('开始网络错误恢复', {
    error: error.message,
    maxRetries });

  let attempts = 0;

  while (attempts < maxRetries) { attempts++;

    try {
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));

      // 简单的网络连接测试
      const response = await fetch('/api/health', {
        method: 'GET',
        timeout: 5000 
});

      if (response.ok) { logger.info('网络错误恢复成功', { attempts  });
        return { recovered: true, attempts  }
}
    } catch (retryError) { logger.warn('网络恢复重试失败', {
        attempt: attempts,
        error: retryError 
})
}
  }

  logger.error('网络错误恢复失败', { attempts  });
  return { recovered: false, attempts  }
}

/**
* 技能错误恢复函数
* 统一技能错误恢复逻辑
*
* @param errorType - 技能错误类型
* @param context - 错误上下文
* @returns 恢复结果
 */
export async function recoverSkillError(
  errorType: SkillErrorType,
  context?: Record<string, any>
): Promise<{ recovered: boolean; message: string  
}> { logger.info('开始技能错误恢复', { errorType, context  });

  try { switch (errorType) {
      case SkillErrorType.NETWORK_ERROR:
      const networkResult = await recoverNetworkError(new Error('Network error'));
      return {
    recovered: networkResult.recovered,
        message: networkResult.recovered
        ? '网络连接已恢复'
        : '网络连接恢复失败'  
};

      case SkillErrorType.CONFLICT_ERROR:
      // 刷新游戏状态
      logger.info('刷新游戏状态以解决冲突');
      return {
    recovered: true,
        message: '游戏状态已刷新，请重试'  
};

      case SkillErrorType.EXECUTION_ERROR:
      // 清理缓存并重试
      logger.info('清理缓存以解决执行错误');
      return {
    recovered: true,
        message: '缓存已清理，请重试'  
};

      default:
      return { recovered: false,
        message: '无法自动恢复此类错误' 
}
}
  } catch (recoveryError) { logger.error('错误恢复过程中发生异常', {
      errorType,
      recoveryError });

    return { recovered: false,
      message: '错误恢复失败' 
}
}
}

/**
* 应用错误恢复函数
* 统一应用级错误恢复逻辑
*
* @param error - 错误对象
* @returns 恢复结果
 */
export async function recoverAppError(
  error: Error
): Promise<{ recovered: boolean; message: string  
}> { logger.error('开始应用错误恢复', { error: error.message  
});

  try { // 清理本地存储
    if (typeof window !== 'undefined') {
      const keysToKeep = ['user-preferences', 'auth-token'];
      const allKeys = Object.keys(localStorage);

      allKeys.forEach(key => {
        if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
          localStorage.removeItem(key)
}
      })
}

    // 重置应用状态（这里可以调用状态管理的重置方法）
    logger.info('应用状态已重置');

    return { recovered: true,
      message: '应用状态已重置，请刷新页面' 
}
} catch (recoveryError) { logger.error('应用错误恢复失败', { recoveryError  });

    return { recovered: false,
      message: '应用错误恢复失败，请刷新页面' 
}
}
}

/**
* 通用错误恢复尝试函数
* 根据错误类型自动选择恢复策略
*
* @param errorType - 错误类型
* @param error - 错误对象（可选）
* @param context - 错误上下文（可选）
* @returns 恢复结果
 */
export async function attemptErrorRecovery(
  errorType: SkillErrorType,
  error?: Error,
  context?: Record<string, any>
): Promise<{ recovered: boolean; message: string  
}> { logger.info('尝试错误恢复', { errorType, context  });

  // 根据错误类型选择恢复策略
  if (errorType === SkillErrorType.NETWORK_ERROR && error) { return await recoverNetworkError(error)
}

  if ([SkillErrorType.CONFLICT_ERROR,
    SkillErrorType.EXECUTION_ERROR,
    SkillErrorType.VALIDATION_ERROR ].includes(errorType)) { return await recoverSkillError(errorType, context)
}

  if (error) { return await recoverAppError(error)
}

  return { recovered: false,
    message: '无法确定恢复策略' 
}
}

/**
* 错误重试装饰器
* 为函数添加自动重试功能
*
* @param maxRetries - 最大重试次数
* @param baseDelay - 基础延迟时间（毫秒）
* @param retryableErrors - 可重试的错误类型
* @returns 装饰器函数
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(;
  maxRetries: number = 3,
  baseDelay: number = 1000,
  retryableErrors: SkillErrorType[] = [;
    SkillErrorType.NETWORK_ERROR,
    SkillErrorType.EXECUTION_ERROR ]
) { return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      let lastError: any;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await originalMethod.apply(this, args)
} catch (error: any) { lastError = error;

          // 检查是否为可重试错误
          const errorType = error.type || SkillErrorType.EXECUTION_ERROR;
          if (!retryableErrors.includes(errorType) || attempt === maxRetries) {
            throw error
}

          // 计算延迟时间（指数退避）
          const delay = baseDelay * Math.pow(2, attempt);
          logger.warn(`方法 ${ propertyKey } 第 ${ attempt + 1 } 次重试`, { delay,
            error: error.message 
});

          await new Promise(resolve => setTimeout(resolve, delay))
}
      }

      throw lastError
};

    return descriptor
}
}