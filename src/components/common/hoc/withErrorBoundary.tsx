/**
 * 文件级注释：withErrorBoundary 组件
 * 
 * 该文件实现了一个处理错误展示和边界保护，主要功能包括：
 * - 组件渲染和状态管理
 * - 用户交互处理
 * - 数据展示和更新
 * - 响应式设计支持
 * 
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 * @category error
 * @filepath common\hoc\withErrorBoundary.tsx
 */

import { createLogger   } from '@/lib/logger';
import {
  handleSkillError, SkillErrorType   } from '@/types/skillSystem.types';
import React, { Component, ComponentType, ReactNode   } from 'react';

/**
* 错误边界高阶组件
* 为组件提供统一的错误处理和恢复功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

  attemptErrorRecovery,
  ErrorHandlingResult  } from '@/utils/common/errorHandling';

const logger = createLogger('error-boundary-hoc');

/**
* 错误边界配置接口
 */
export interface ErrorBoundaryConfig  { /** 是否显示错误详情 */
  showErrorDetails?: boolean;
  /** 是否允许重试 */
  allowRetry?: boolean;
  /** 自定义错误消息 */
  customErrorMessage?: string;
  /** 错误回调函数 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** 恢复回调函数 */
  onRecover?: () => void;
  /** 自定义错误UI */
  fallbackComponent?: ComponentType<ErrorFallbackProps>
}

/**
* 错误回退组件属性接口
 */
export interface ErrorFallbackProps  { /** 错误对象 */
  error: Error;
  /** 错误信息 */
  errorInfo: React.ErrorInfo;
  /** 重试函数 */
  retry: () => void;
  /** 配置选项 */
  config: ErrorBoundaryConfig;
  /** 错误处理结果 */
  handlingResult?: ErrorHandlingResult
}

/**
* 错误边界状态接口
 */
interface ErrorBoundaryState  { /** 是否有错误 */
  hasError: boolean;
  /** 错误对象 */
  error?: Error;
  /** 错误信息 */
  errorInfo?: React.ErrorInfo;
  /** 重试次数 */
  retryCount: number;
  /** 错误处理结果 */
  handlingResult?: ErrorHandlingResult
}

/**
 * 默认错误回退组件
 */
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ( { error,
  errorInfo,
  retry,
  config,
  handlingResult }) => { return (;
    <div className='min-h-[200px] flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg'>;
    <div className='text-center max-w-md'>;
    <div className='mb-4'>;
    <svg
    className='mx-auto h-12 w-12 text-red-400';
    fill='none';
    viewBox='0 0 24 24';
    stroke='currentColor';
    >
    <path
    strokeLinecap='round';
    strokeLinejoin='round';
    strokeWidth={2 }
    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z';
    />
    </svg>
    </div>

    <h3 className='text-lg font-medium text-red-800 mb-2'>;
    { handlingResult?.userMessage || config.customErrorMessage || '组件发生错误' }
    </h3>

    { config.showErrorDetails && (
      <div className='mb-4 p-3 bg-red-100 rounded text-sm text-red-700 text-left'>;
      <p className='font-medium mb-1'>错误详情：</p>;
      <p className='mb-2'>{error.message }</p>;
      { errorInfo.componentStack && (
        <details className='mt-2'>;
        <summary className='cursor-pointer font-medium'>组件堆栈</summary>;
        <pre className='mt-1 text-xs overflow-auto'>;
        {errorInfo.componentStack }
        </pre>
        </details>
      )}
      </div>
    )}

    <div className='flex justify-center space-x-3'>;
    { config.allowRetry && (
      <button
      onClick={retry }
      className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors';
      >
      重试
      </button>
    )}

    <button
    onClick={ () => window.location.reload() }
    className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors';
    >
    刷新页面
    </button>
    </div>

    { handlingResult?.recoverySuggestion && (
      <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded'>;
      <p className='text-sm text-blue-800'>;
      <strong>建议：</strong>
      {handlingResult.recoverySuggestion.description }
      </p>
      </div>
    )}
    </div>
    </div>
  )
};

/**
* 错误边界高阶组件
*
* @param config - 错误边界配置
* @returns 高阶组件函数
 */
export function withErrorBoundary<P extends object>(
  config: ErrorBoundaryConfig = {
}
) { return function <T extends ComponentType<P>>(;
    WrappedComponent: T
  ): ComponentType<P> {

    class ErrorBoundaryHOC extends Component<P, ErrorBoundaryState> {
      private maxRetries = 3;

      constructor(props: P) {
        super(props);

        this.state = {
          hasError: false,
          retryCount: 0 
}
}

      /**
 * 捕获错误并更新状态
 */
static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> { return  {
          hasError: true,
          error }
}

      /**
 * 处理组件错误
 */
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { logger.error('组件错误边界捕获错误',  {
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack 
});

        // 确定错误类型
        let errorType = SkillErrorType.EXECUTION_ERROR;
        if (error.message.includes('Network')) { errorType = SkillErrorType.NETWORK_ERROR
} else if (error.message.includes('Permission')) { errorType = SkillErrorType.PERMISSION_ERROR
} else if (error.message.includes('Validation')) { errorType = SkillErrorType.VALIDATION_ERROR
}

        // 处理错误
        const handlingResult = handleSkillError(;
          errorType,
          config.customErrorMessage,
          { component: WrappedComponent.name,
            props: this.props,
            stack: error.stack 
}
        );

        this.setState({ error,
          errorInfo,
          handlingResult });

        // 调用错误回调
        if (config.onError) { config.onError(error, errorInfo)
}

        // 尝试自动恢复
        if (handlingResult.recoverySuggestion?.autoExecute) { setTimeout(() => {
  this.attemptRecovery()
}, handlingResult.recoverySuggestion.delay || 1000)
}
      
}

      /**
 * 尝试错误恢复
 */
private attemptRecovery = async () => { const  { error, handlingResult  } = this.state;
        if (!error || !handlingResult) return;

        try { logger.info('尝试组件错误恢复');

          // 确定错误类型
          let errorType = SkillErrorType.EXECUTION_ERROR;
          if (error.message.includes('Network')) {
            errorType = SkillErrorType.NETWORK_ERROR
}

          const recoveryResult = await attemptErrorRecovery(;
            errorType,
            error,
            { component: WrappedComponent.name  
}
          );

          if (recoveryResult.recovered) { logger.info('组件错误恢复成功');
            this.handleRetry();

            if (config.onRecover) {
              config.onRecover()
}
          } else { logger.warn('组件错误恢复失败', {
              message: recoveryResult.message 
})
}
        } catch (recoveryError) { logger.error('组件错误恢复过程中发生异常', {
            recoveryError })
}
      };

      /**
 * 处理重试
 */
private handleRetry = () => { const  { retryCount  } = this.state;
        if (retryCount >= this.maxRetries) { logger.warn('组件重试次数已达上限', {
            retryCount,
            maxRetries: this.maxRetries 
});
          return
}

        logger.info('重试组件渲染', { retryCount: retryCount + 1  
});

        this.setState({ hasError: false,
          error: undefined,
          errorInfo: undefined,
          handlingResult: undefined,
          retryCount: retryCount + 1 
})
};

      render(): ReactNode { const { hasError, error, errorInfo, handlingResult  } = this.state;

        if (hasError && error && errorInfo) { const FallbackComponent = config.fallbackComponent || DefaultErrorFallback;

          return (;
            <FallbackComponent
            error={error }
            errorInfo={ errorInfo }
            retry={ this.handleRetry }
            config={ config }
            handlingResult={ handlingResult }
            />
          )
}

        return <WrappedComponent { ...this.props } />
}
    }

    // 设置显示名称
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ErrorBoundaryHOC.displayName = `withErrorBoundary(${ wrappedComponentName })`;

    return ErrorBoundaryHOC as ComponentType<P>
}
}

/**
* 错误边界装饰器
* 用于类组件的装饰器语法
*
* @param config - 错误边界配置
* @returns 装饰器函数
 */
export function ErrorBoundary(config: ErrorBoundaryConfig = {
}) { return function <T extends ComponentType<any>>(target: T): T  {
    return withErrorBoundary(config)(target) as T
}
}

/**
* 快速错误边界包装函数
* 用于快速包装组件
*
* @param component - 要包装的组件
* @param config - 错误边界配置
* @returns 包装后的组件
 */
export function wrapWithErrorBoundary<P extends object>(
  component: ComponentType<P>,
  config: ErrorBoundaryConfig = {
}
): ComponentType<P> { return withErrorBoundary(config)(component)
}

/**
* 预设配置的错误边界
 */
export const ErrorBoundaryPresets =  { /**
 * 开发环境配置 - 显示详细错误信息
 */
development:  {
    showErrorDetails: true,
    allowRetry: true,
    customErrorMessage: '开发环境错误' 
} as ErrorBoundaryConfig,

  /**
 * 生产环境配置 - 隐藏错误详情
 */
production:  { showErrorDetails: false,
    allowRetry: true,
    customErrorMessage: '应用发生错误，请稍后重试' 
} as ErrorBoundaryConfig,

  /**
 * 技能组件配置 - 针对技能相关组件
 */
skill:  { showErrorDetails: false,
    allowRetry: true,
    customErrorMessage: '技能操作失败，请重试' 
} as ErrorBoundaryConfig,

  /**
 * 游戏组件配置 - 针对游戏相关组件
 */
game:  { showErrorDetails: false,
    allowRetry: true,
    customErrorMessage: '游戏功能暂时不可用，请刷新页面' 
} as ErrorBoundaryConfig };