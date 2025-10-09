import { AlertTriangle, RefreshCw, Home, Bug  } from 'lucide-react';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from '@/components/ui/card';
import { createLogger  } from '@/lib/logger';
import { unifiedErrorSystem, ErrorType, ErrorSeverity  } from '@/utils/unifiedErrorSystem';
import React, { Component, ErrorInfo, ReactNode  } from 'react';

/**
* 文件级注释：全局错误边界组件
* 提供React应用级别的错误捕获和处理，集成统一错误处理系统
*
* 主要功能：
* - 捕获React组件树中的JavaScript错误
* - 显示用户友好的错误界面
* - 集成统一错误处理系统
* - 提供错误恢复机制
* - 错误报告和监控
*
* @author SOLO Coding
* @version 2.0.0
 */

const logger = createLogger('error-boundary');

/**
* 错误边界状态接口
* 定义错误边界组件的状态结构
 */
interface ErrorBoundaryState { /** 是否有错误  */
  hasError: boolean;
  /** 错误对象  */
  error: Error | null;
  /** 错误信息  */
  errorInfo: ErrorInfo | null;
  /** 错误ID  */
  errorId: string | null;
  /** 是否正在重试  */
  isRetrying: boolean;
  /** 重试次数  */
  retryCount: number;
  /** 错误严重级别  */
  severity: ErrorSeverity;
  /** 用户友好的错误消息  */
  userMessage: string;,
}

/**
* 错误边界属性接口
* 定义错误边界组件的属性
 */
interface ErrorBoundaryProps { /** 子组件  */
  children: ReactNode;
  /** 组件名称（用于错误上下文）  */
  componentName?: string;
  /** 自定义错误回退UI  */
  fallback?: (error: Error, errorInfo: ErrorInfo, retry: () => void) => ReactNode;
  /** 错误发生时的回调  */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** 是否启用自动重试  */
  enableRetry?: boolean;
  /** 最大重试次数  */
  maxRetries?: number;
  /** 是否显示详细错误信息（开发模式）  */
  showDetails?: boolean;,
}

/**
* 全局错误边界类
* 捕获React组件树中的错误并提供恢复机制
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> { private retryTimer: NodeJS.Timeout | null = null;
  private readonly maxRetries: number;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.maxRetries = props.maxRetries || 3;

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      isRetrying: false,
      retryCount: 0,
      severity: ErrorSeverity.MEDIUM,
      userMessage: '页面加载出现问题',
};,
}

  /**
  * 静态方法：从错误中获取派生状态
  * @param error - 错误对象
  * @returns 新的状态或null
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> { logger.error('ErrorBoundary捕获到错误', { error  });

    return { hasError: true,
      error,
      severity: ErrorSeverity.HIGH,
      userMessage: '页面渲染出现错误，请尝试刷新页面',
};,
}

  /**
  * 组件捕获错误时的处理方法
  * @param error - 错误对象
  * @param errorInfo - 错误信息
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void { const { componentName, onError  } = this.props;

    logger.error('React组件错误详情', { error,
      errorInfo,
      componentName,
});

    // 调用统一错误处理系统
    this.handleErrorWithUnifiedSystem(error, errorInfo);

    // 更新状态
    this.setState({ errorInfo,
      retryCount: 0,
});

    // 调用自定义错误回调
    if (onError) { onError(error, errorInfo);,
}
  }

  /**
  * 使用统一错误处理系统处理错误
  * @param error - 错误对象
  * @param errorInfo - 错误信息
   */
  private async handleErrorWithUnifiedSystem(error: Error, errorInfo: ErrorInfo): Promise<void> { try {
      const result = await unifiedErrorSystem.handleError(;
        error,
        {
          component: this.props.componentName || 'ErrorBoundary',
          operation: 'component_render',
          metadata: {
            componentStack: errorInfo.componentStack,
            errorBoundary: true,
}
        },
        { showNotification: false, // 错误边界自己处理UI
          logError: true,
          reportToMonitoring: true,
          attemptRecovery: false,
}
      );

      this.setState({ errorId: result.errorId,
        severity: result.severity,
        userMessage: result.userMessage,
});,
} catch (handlingError) { logger.error('统一错误处理系统处理失败', { handlingError  });

      this.setState({ errorId: `fallback_${Date.now() }`,
        severity: ErrorSeverity.HIGH,
        userMessage: '系统发生严重错误，请刷新页面重试',
});,
}
  }

  /**
  * 重试渲染组件
   */
  private handleRetry = (): void => { const { enableRetry = true  } = this.props;
    const { retryCount  } = this.state;

    if (!enableRetry || retryCount >= this.maxRetries) { logger.warn('已达到最大重试次数或重试被禁用', {
        retryCount,
        maxRetries: this.maxRetries,
        enableRetry,
});
      return;,
}

    logger.info('开始重试渲染组件', { retryCount: retryCount + 1,
      maxRetries: this.maxRetries,
});

    this.setState({ isRetrying: true,
      retryCount: retryCount + 1,
});

    // 延迟重试，给系统时间恢复
    this.retryTimer = setTimeout(() => { this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        isRetrying: false,
        severity: ErrorSeverity.MEDIUM,
        userMessage: '页面加载出现问题',
});,
}, 1000);,
};

  /**
  * 刷新页面
   */
  private handleRefresh = (): void => { logger.info('用户选择刷新页面');
    window.location.reload();,
};

  /**
  * 返回首页
   */
  private handleGoHome = (): void => { logger.info('用户选择返回首页');
    window.location.href = '/';,
};

  /**
  * 报告错误
   */
  private handleReportError = (): void => { const { error, errorInfo, errorId  } = this.state;

    logger.info('用户选择报告错误', { errorId  });

    // 这里可以集成错误报告服务
    if (error && errorInfo) { const errorReport = {
        errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
};

      // 发送错误报告到监控服务
      // 这里可以集成如Sentry、LogRocket等服务
      console.log('错误报告:', errorReport);

      // 显示感谢消息
      alert('感谢您的反馈！错误报告已发送给技术团队。');,
}
  };

  /**
  * 获取错误严重级别对应的图标颜色
   */
  private getSeverityColor(): string { switch (this.state.severity) {
      case ErrorSeverity.LOW:
      return 'text-blue-500';
      case ErrorSeverity.MEDIUM:
      return 'text-yellow-500';
      case ErrorSeverity.HIGH:
      return 'text-orange-500';
      case ErrorSeverity.CRITICAL:
      return 'text-red-500';
      default:
      return 'text-gray-500';,
}
  }

  /**
  * 获取错误严重级别对应的标题
   */
  private getSeverityTitle(): string { switch (this.state.severity) {
      case ErrorSeverity.LOW:
      return '轻微问题';
      case ErrorSeverity.MEDIUM:
      return '页面错误';
      case ErrorSeverity.HIGH:
      return '严重错误';
      case ErrorSeverity.CRITICAL:
      return '系统故障';
      default:
      return '未知错误';,
}
  }

  /**
  * 渲染错误回退UI
   */
  private renderErrorFallback(): ReactNode { const { fallback, showDetails = process.env.NODE_ENV === 'development'  } = this.props;
    const { error, errorInfo, isRetrying, retryCount, userMessage  } = this.state;

    // 如果提供了自定义回退UI，使用它
    if (fallback && error && errorInfo) { return fallback(error, errorInfo, this.handleRetry);,
}

    return (;
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>;
      <Card className='w-full max-w-md'>;
      <CardHeader className='text-center'>;
      <div className={ `mx-auto mb-4 ${this.getSeverityColor() }`}>;
      <AlertTriangle size={ 48 } />;
      </div>
      <CardTitle className='text-xl font-semibold text-gray-900'>;
      { this.getSeverityTitle() }
      </CardTitle>
      <CardDescription className='text-gray-600'>;
      { userMessage }
      </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>;
      { /*  操作按钮  */ }
      <div className='flex flex-col space-y-2'>;
      { this.props.enableRetry !== false && retryCount < this.maxRetries && (;
        <Button
        onClick={this.handleRetry }
        disabled={ isRetrying }
        className='w-full';
        variant='default';
        >
        <RefreshCw className={ `mr-2 h-4 w-4 ${isRetrying ? 'animate-spin' : '' }`} />;
        { isRetrying ? '重试中...' : `重试 (${retryCount }/${ this.maxRetries })`}
        </Button>
      )}

      <Button
      onClick={ this.handleRefresh }
      variant='outline';
      className='w-full';
      >
      <RefreshCw className='mr-2 h-4 w-4' />;
      刷新页面
      </Button>

      <Button
      onClick={ this.handleGoHome }
      variant='outline';
      className='w-full';
      >
      <Home className='mr-2 h-4 w-4' />;
      返回首页
      </Button>

      <Button
      onClick={ this.handleReportError }
      variant='ghost';
      className='w-full text-sm';
      >
      <Bug className='mr-2 h-4 w-4' />;
      报告问题
      </Button>
      </div>

      { /*  开发模式下显示详细错误信息  */ }
      { showDetails && error && (
        <details className='mt-4'>;
        <summary className='cursor-pointer text-sm text-gray-500 hover:text-gray-700'>;
        查看技术详情
        </summary>
        <div className='mt-2 p-3 bg-gray-100 rounded-md text-xs font-mono text-gray-700 overflow-auto max-h-40'>;
        <div className='mb-2'>;
        <strong>错误消息:</strong> {error.message }
        </div>
        { error.stack && (
          <div className='mb-2'>;
          <strong>堆栈跟踪:</strong>
          <pre className='whitespace-pre-wrap'>{error.stack }</pre>;
          </div>
        )}
        { errorInfo?.componentStack && (
          <div>
          <strong>组件堆栈:</strong>
          <pre className='whitespace-pre-wrap'>{errorInfo.componentStack }</pre>;
          </div>
        )}
        </div>
        </details>
      )}

      { /*  错误ID  */ }
      { this.state.errorId && (
        <div className='text-xs text-gray-400 text-center'>;
        错误ID: {this.state.errorId }
        </div>
      )}
      </CardContent>
      </Card>
      </div>
    );,
}

  /**
  * 组件卸载时清理资源
   */
  componentWillUnmount(): void { if (this.retryTimer) {
      clearTimeout(this.retryTimer);,
}
  }

  /**
  * 渲染方法
   */
  render(): ReactNode { if (this.state.hasError) {
      return this.renderErrorFallback();,
}

    return this.props.children;,
}
}

/**
* 高阶组件：为组件添加错误边界
* @param WrappedComponent - 要包装的组件
* @param options - 错误边界选项
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: Omit<ErrorBoundaryProps, 'children'> = {}
) { const WithErrorBoundaryComponent = (props: P) => (;
    <ErrorBoundary {...options }>
    <WrappedComponent { ...props } />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName =;
  `withErrorBoundary(${ WrappedComponent.displayName || WrappedComponent.name })`;

  return WithErrorBoundaryComponent;,
}

/**
* Hook：在函数组件中使用错误边界
* @param componentName - 组件名称
 */
export function useErrorHandler(componentName?: string) { const handleError = React.useCallback(;
    (error: Error, errorInfo?: any) => {
      unifiedErrorSystem.handleError(
        error,
        {
          component: componentName || 'FunctionComponent',
          operation: 'hook_error',
          metadata: errorInfo,
},
        { showNotification: true,
          logError: true,
          reportToMonitoring: true,
}
      );,
},
    [componentName]
  );

  return { handleError  };,
}

export default ErrorBoundary;