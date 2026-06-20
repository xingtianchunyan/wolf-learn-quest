/**
 * 文件级注释：React错误边界组件
 * 
 * 该文件实现了一个增强的React错误边界组件，旨在：
 * - 捕获React组件树中的JavaScript错误
 * - 提供优雅的错误降级界面
 * - 集成统一错误处理系统
 * - 支持错误恢复和重试机制
 * - 提供错误监控和报告功能
 * 
 * 主要功能：
 * - 错误捕获和处理
 * - 错误信息展示
 * - 自动错误恢复
 * - 错误统计和监控
 * - 用户友好的降级界面
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { MasterErrorHandler } from '@/utils/masterErrorHandler';
import { ErrorDisplayComponent } from './ErrorDisplayComponent';
import { useEnhancedUserErrorInterface } from '@/utils/enhancedUserErrorInterface';
import { ErrorSeverity, ErrorCategory } from '@/utils/unifiedErrorHandler';

/**
 * 接口注释：错误边界状态
 * 定义错误边界组件的状态接口
 */
interface ErrorBoundaryState {
  /** 是否有错误 */
  hasError: boolean;
  /** 错误对象 */
  error: Error | null;
  /** 错误信息 */
  errorInfo: ErrorInfo | null;
  /** 错误ID */
  errorId: string | null;
  /** 重试次数 */
  retryCount: number;
  /** 是否显示详细错误 */
  showDetails: boolean;
  /** 是否正在恢复 */
  isRecovering: boolean;
}

/**
 * 接口注释：错误边界属性
 * 定义错误边界组件的属性接口
 */
interface ErrorBoundaryProps {
  /** 子组件 */
  children: ReactNode;
  /** 降级组件 */
  fallback?: ReactNode;
  /** 错误回调 */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** 重试回调 */
  onRetry?: () => void;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 组件名称 */
  componentName?: string;
  /** 是否启用自动恢复 */
  enableAutoRecovery?: boolean;
  /** 自动恢复延迟（毫秒） */
  autoRecoveryDelay?: number;
  /** 是否显示用户友好界面 */
  showUserFriendlyUI?: boolean;
}

/**
 * 类级注释：React错误边界组件
 * 
 * 实现React错误边界功能，提供：
 * - 错误捕获和处理
 * - 优雅的错误降级
 * - 自动恢复机制
 * - 错误监控集成
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private masterErrorHandler: MasterErrorHandler;
  private autoRecoveryTimer: ReturnType<typeof setInterval> | null = null;

  /**
   * 构造函数级注释：初始化错误边界
   * 设置初始状态和错误处理器
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      showDetails: false,
      isRecovering: false
    };

    this.masterErrorHandler = MasterErrorHandler.getInstance();
  }

  /**
   * 函数级注释：从错误中获取派生状态
   * React错误边界生命周期方法，用于更新状态
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  /**
   * 函数级注释：组件捕获错误
   * React错误边界生命周期方法，处理错误信息
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = this.generateErrorId();
    
    this.setState({
      errorInfo,
      errorId
    });

    // 使用主错误处理器处理错误
    this.handleError(error, errorInfo, errorId);

    // 调用外部错误回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 启用自动恢复
    if (this.props.enableAutoRecovery && this.state.retryCount < (this.props.maxRetries || 3)) {
      this.scheduleAutoRecovery();
    }
  }

  /**
   * 函数级注释：生成错误ID
   * 生成唯一的错误标识符
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 函数级注释：处理错误
   * 使用主错误处理器处理错误
   */
  private async handleError(error: Error, errorInfo: ErrorInfo, errorId: string) {
    try {
      await this.masterErrorHandler.handleError(error, {
        component: this.props.componentName || 'UnknownComponent',
        errorBoundary: true,
        errorId,
        componentStack: errorInfo.componentStack,
        retryCount: this.state.retryCount,
        timestamp: new Date().toISOString()
      });
    } catch (handlingError) {
      console.error('错误处理器本身发生错误:', handlingError);
    }
  }

  /**
   * 函数级注释：安排自动恢复
   * 设置自动恢复定时器
   */
  private scheduleAutoRecovery() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }

    this.setState({ isRecovering: true });

    this.autoRecoveryTimer = setTimeout(() => {
      this.handleRetry();
    }, this.props.autoRecoveryDelay || 3000);
  }

  /**
   * 函数级注释：处理重试
   * 重置错误状态并重试渲染
   */
  private handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    const maxRetries = this.props.maxRetries || 3;

    if (newRetryCount <= maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        retryCount: newRetryCount,
        showDetails: false,
        isRecovering: false
      });

      if (this.props.onRetry) {
        this.props.onRetry();
      }
    } else {
      this.setState({ isRecovering: false });
    }

    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
      this.autoRecoveryTimer = null;
    }
  };

  /**
   * 函数级注释：处理重置
   * 完全重置错误边界状态
   */
  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      showDetails: false,
      isRecovering: false
    });

    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
      this.autoRecoveryTimer = null;
    }
  };

  /**
   * 函数级注释：切换详细信息显示
   * 切换错误详细信息的显示状态
   */
  private toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  /**
   * 函数级注释：渲染默认错误界面
   * 渲染简单的错误降级界面
   */
  private renderDefaultErrorUI() {
    const { error, retryCount, showDetails, isRecovering } = this.state;
    const maxRetries = this.props.maxRetries || 3;
    const canRetry = retryCount < maxRetries;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              页面出现错误
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {this.props.componentName ? `${this.props.componentName} 组件` : '应用程序'}遇到了一个意外错误
            </p>
          </div>

          {error && showDetails && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <p className="font-medium text-gray-700">错误详情:</p>
              <p className="mt-1 text-gray-600 break-words">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                    查看堆栈跟踪
                  </summary>
                  <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-3">
            {canRetry && (
              <button
                onClick={this.handleRetry}
                disabled={isRecovering}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRecovering ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    恢复中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重试 ({retryCount}/{maxRetries})
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              重置应用
            </button>
            
            <button
              onClick={this.toggleDetails}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <Bug className="w-4 h-4 mr-2" />
              {showDetails ? '隐藏' : '显示'}错误详情
            </button>
          </div>

          {retryCount > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                已尝试 {retryCount} 次重试。如果问题持续存在，请联系技术支持。
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /**
   * 函数级注释：渲染用户友好错误界面
   * 使用ErrorDisplayComponent渲染增强的错误界面
   */
  private renderUserFriendlyErrorUI() {
    const { error, errorId } = this.state;
    
    if (!error || !errorId) {
      return this.renderDefaultErrorUI();
    }

    // 创建用户友好的错误信息
    const userFriendlyErrorInfo = {
      id: errorId,
      title: '组件渲染错误',
      description: `${this.props.componentName || '应用组件'}在渲染过程中遇到了错误`,
      details: error.message,
      severity: ErrorSeverity.HIGH,
      classification: {
        category: ErrorCategory.FRONTEND,
        subcategory: 'component_error',
        tags: ['react', 'rendering', 'component']
      },
      icon: <AlertTriangle className="w-6 h-6" />,
      retryable: this.state.retryCount < (this.props.maxRetries || 3),
      impactScope: 'feature',
      estimatedResolutionTime: '1-2分钟',
      solutions: [
        {
          id: 'retry_component',
          title: '重新加载组件',
          description: '尝试重新渲染组件以解决临时错误',
          type: 'automatic' as const,
          recommended: true,
          estimatedTime: '几秒钟',
          successRate: 0.8,
          steps: [
            '清除组件状态',
            '重新初始化组件',
            '重新渲染界面'
          ],
          action: async () => {
            this.handleRetry();
            return true;
          }
        },
        {
          id: 'reset_application',
          title: '重置应用状态',
          description: '完全重置应用状态以解决深层错误',
          type: 'manual' as const,
          recommended: false,
          estimatedTime: '1分钟',
          successRate: 0.95,
          steps: [
            '保存当前工作（如有需要）',
            '点击重置按钮',
            '重新开始使用应用'
          ]
        }
      ],
      helpLinks: [
        {
          title: '组件错误排查指南',
          url: '#',
          description: '了解如何排查和解决组件错误'
        },
        {
          title: '联系技术支持',
          url: '#',
          description: '如果问题持续存在，请联系我们的技术支持团队'
        }
      ]
    };

    return (
      <ErrorDisplayComponent
        errorInfo={userFriendlyErrorInfo}
        onClose={this.handleReset}
        onRetry={this.handleRetry}
        visible={true}
      />
    );
  }

  /**
   * 函数级注释：组件卸载清理
   * 清理定时器和资源
   */
  componentWillUnmount() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }
  }

  /**
   * 函数级注释：渲染组件
   * 根据错误状态渲染相应的界面
   */
  render() {
    if (this.state.hasError) {
      // 如果提供了自定义降级组件，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 根据配置选择错误界面类型
      if (this.props.showUserFriendlyUI !== false) {
        return this.renderUserFriendlyErrorUI();
      } else {
        return this.renderDefaultErrorUI();
      }
    }

    return this.props.children;
  }
}

/**
 * 函数级注释：高阶组件包装器
 * 创建一个HOC来简化错误边界的使用
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps} componentName={Component.displayName || Component.name}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * 函数级注释：错误边界Hook
 * 提供一个Hook来在函数组件中使用错误边界功能
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    captureError,
    resetError
  };
}

export default ErrorBoundary;