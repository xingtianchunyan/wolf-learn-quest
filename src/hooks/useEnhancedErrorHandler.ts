import { createLogger   } from '@/lib/logger';
import { handleError, UnifiedErrorType, ErrorHandlingOptions   } from '@/utils/unifiedErrorSystem';
import { useCallback, useRef   } from 'react';
import { useToast   } from '@/hooks/useToast';

/**
* 文件级注释：增强的错误处理 Hook
* 提供统一的错误处理接口，支持自动重试、用户友好提示和错误恢复
 */

const logger = createLogger('enhanced-error-handler');

/**
 * 错误恢复策略
 */
export interface ErrorRecoveryStrategy  { retryAction?: () => Promise<void> | void;
  fallbackAction?: () => Promise<void> | void;
  refreshAction?: () => Promise<void> | void
}

/**
 * 增强错误处理选项
 */
export interface EnhancedErrorOptions extends ErrorHandlingOptions  { recovery?: ErrorRecoveryStrategy;
  customMessage?: string;
  silent?: boolean;
  category?: string
}

/**
* 增强的错误处理 Hook
* 提供统一的错误处理、用户友好的提示和自动恢复功能
 */
export const useEnhancedErrorHandler = () => { const  { toast  } = useToast();
  const retryCountRef = useRef<Map<string, number>>(new Map());

  /**
 * 处理错误的主要方法
 */
const handleErrorEnhanced = useCallback(async (;
    error: any,
    options: EnhancedErrorOptions = {
}
  ) => { const {
      recovery,
      customMessage,
      silent = false,
      category = 'general',
      maxRetries = 3,
      ...restOptions } = options;

    try { // 记录错误
      logger.error(`错误处理 [${category }]`, { error: error.message || error,
        category,
        options });

      // 静默模式下不显示 toast
      const enhancedOptions: ErrorHandlingOptions = { ...restOptions,
        showToast: !silent,
        maxRetries  };

      // 使用统一错误系统处理
      await handleError(error, enhancedOptions);

      // 显示用户友好的错误提示
      if (!silent) { showErrorToast(error, customMessage)
}

      // 尝试错误恢复
      if (recovery) { await attemptRecovery(error, recovery, category, maxRetries)
}

    } catch (handlingError) { logger.error('错误处理失败', {
        originalError: error,
        handlingError,
        category });

      // 显示通用错误提示
      if (!silent) { toast({
          title: '系统错误',
          description: '处理错误时发生异常，请刷新页面重试',
          variant: 'destructive' 
})
}
    } }, [toast]);

  /**
 * 显示错误 Toast 提示
 */
const showErrorToast = useCallback((error: any, customMessage?: string) =>  { let title = '操作失败';
    let description = customMessage || '发生了未知错误，请稍后重试';

    // 根据错误类型自定义消息
    if (error.type) {
      switch (error.type) {
        case UnifiedErrorType.NETWORK:
        title = '网络错误';
        description = customMessage || '网络连接异常，请检查网络设置';
        break;
        case UnifiedErrorType.PERMISSION:
        title = '权限不足';
        description = customMessage || '您没有执行此操作的权限';
        break;
        case UnifiedErrorType.VALIDATION:
        title = '输入错误';
        description = customMessage || '输入的数据格式不正确';
        break;
        case UnifiedErrorType.SKILL:
        title = '技能使用失败';
        description = customMessage || '技能使用条件不满足或执行失败';
        break
}
    }

    // 显示 toast
    toast({ title,
      description,
      variant: 'destructive' 
})
}, [toast]);

  /**
 * 尝试错误恢复
 */
const attemptRecovery = useCallback(async (;
    error: any,
    recovery: ErrorRecoveryStrategy,
    category: string,
    maxRetries: number
  ) => { const retryKey = `${category }_${ error.code || 'unknown' }`;
    const currentRetries = retryCountRef.current.get(retryKey) || 0;

    try { // 如果有重试动作且未超过最大重试次数
      if (recovery.retryAction && currentRetries < maxRetries) {
        retryCountRef.current.set(retryKey, currentRetries + 1);

        logger.info(`尝试恢复 [${category }] - 第 ${ currentRetries + 1 } 次重试`);

        await recovery.retryAction();

        // 重试成功，重置计数器
        retryCountRef.current.delete(retryKey);

        toast({ title: '操作成功',
          description: '重试成功，操作已完成',
          variant: 'default' 
});

        return
}

      // 如果重试失败或无重试动作，尝试回退动作
      if (recovery.fallbackAction) { logger.info(`执行回退动作 [${category }]`);
        await recovery.fallbackAction();

        toast({ title: '已切换到备用方案',
          description: '使用备用方案继续操作',
          variant: 'default' 
});

        return
}

      // 如果有刷新动作
      if (recovery.refreshAction) { logger.info(`执行刷新动作 [${category }]`);
        await recovery.refreshAction();

        toast({ title: '数据已刷新',
          description: '已重新加载最新数据',
          variant: 'default' 
})
}

    } catch (recoveryError) { logger.error(`错误恢复失败 [${category }]`, { originalError: error,
        recoveryError,
        retryCount: currentRetries 
});

      toast({ title: '恢复失败',
        description: '自动恢复失败，请手动刷新页面',
        variant: 'destructive' 
})
}
  }, [toast]);

  /**
 * 处理异步操作的错误
 */
const handleAsyncError = useCallback(async <T>(;
    asyncOperation: () => Promise<T>,
    options: EnhancedErrorOptions = {
}
  ): Promise<T | null> => { try {
      return await asyncOperation()
} catch (error) { await handleErrorEnhanced(error, options);
      return null
}
  }, [handleErrorEnhanced]);

  /**
 * 创建带错误处理的异步函数包装器
 */
const withErrorHandling = useCallback(<T extends any[], R>(;
    fn: (...args: T) => Promise<R>,
    options: EnhancedErrorOptions = {
}
  ) => { return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args)
} catch (error) { await handleErrorEnhanced(error, options);
        return null
}
    }
}, [handleErrorEnhanced]);

  /**
 * 创建带重试的异步函数
 */
const withRetry = useCallback(<T extends any[], R>(;
    fn: (...args: T) => Promise<R>,
    retryOptions: { maxRetries?: number;
      retryDelay?: number;
      category?: string
} = {}
  ) => { const { maxRetries = 3, retryDelay = 1000, category = 'retry'  } = retryOptions;

    return async (...args: T): Promise<R | null> => { let lastError: any;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await fn(...args)
} catch (error) { lastError = error;

          if (attempt < maxRetries) {
            logger.info(`重试操作 [${category }] - 第 ${ attempt + 1 } 次`, { error: error.message,
              nextRetryIn: retryDelay 
});

            await new Promise(resolve => setTimeout(resolve, retryDelay))
}
        } }

      // 所有重试都失败了
      await handleErrorEnhanced(lastError, { category,
        customMessage: `操作失败，已重试 ${maxRetries 
} 次` });

      return null
}
}, [handleErrorEnhanced]);

  /**
 * 清除重试计数器
 */
const clearRetryCount = useCallback((category?: string) => { if (category)  {
      // 清除特定类别的重试计数
      const keysToDelete = Array.from(retryCountRef.current.keys());
      .filter(key => key.startsWith(category));
      keysToDelete.forEach(key => retryCountRef.current.delete(key))
} else { // 清除所有重试计数
      retryCountRef.current.clear()
}
  }, []);

  /**
 * 获取重试统计
 */
const getRetryStats = useCallback(() =>  { const stats = new Map<string, number>();
    retryCountRef.current.forEach((count, key) => {
  const category = key.split('_')[0];
      stats.set(category, (stats.get(category) || 0) + count)
});
    return Object.fromEntries(stats)

}, []);

  return { handleError: handleErrorEnhanced,
    handleAsyncError,
    withErrorHandling,
    withRetry,
    clearRetryCount,
    getRetryStats,
    showErrorToast }
};

/**
 * 错误边界组件的 Hook
 */
export const useErrorBoundary = () => { const  { handleError  } = useEnhancedErrorHandler();
  const captureError = useCallback((error: Error, errorInfo?: any) => { handleError(error, {
      category: 'error-boundary',
      customMessage: '组件渲染出现错误',
      recovery: {
        refreshAction: () => window.location.reload()
}
    })
}, [handleError]);

  return { captureError  }
};