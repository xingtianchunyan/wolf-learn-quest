import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  showDetails: boolean;
  isRecovering: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
  maxRetries?: number;
  componentName?: string;
  enableAutoRecovery?: boolean;
  autoRecoveryDelay?: number;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private autoRecoveryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      showDetails: false,
      isRecovering: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (
      this.props.enableAutoRecovery &&
      this.state.retryCount < (this.props.maxRetries || 3)
    ) {
      this.scheduleAutoRecovery();
    }
  }

  componentWillUnmount() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }
  }

  private scheduleAutoRecovery() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }

    this.setState({ isRecovering: true });

    this.autoRecoveryTimer = setTimeout(() => {
      this.handleRetry();
    }, this.props.autoRecoveryDelay || 3000);
  }

  private handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    const maxRetries = this.props.maxRetries || 3;

    if (newRetryCount <= maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: newRetryCount,
        showDetails: false,
        isRecovering: false,
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

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      showDetails: false,
      isRecovering: false,
    });

    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
      this.autoRecoveryTimer = null;
    }
  };

  private toggleDetails = () => {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, retryCount, showDetails, isRecovering } = this.state;
      const maxRetries = this.props.maxRetries || 3;
      const canRetry = retryCount < maxRetries;

      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full'>
              <AlertTriangle className='w-6 h-6 text-red-600' />
            </div>

            <div className='mt-4 text-center'>
              <h3 className='text-lg font-medium text-gray-900'>
                页面出现错误
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                {this.props.componentName
                  ? `${this.props.componentName} 组件`
                  : '应用程序'}
                遇到了一个意外错误
              </p>
            </div>

            {error && showDetails && (
              <div className='mt-4 p-3 bg-gray-100 rounded text-sm'>
                <p className='font-medium text-gray-700'>错误详情:</p>
                <p className='mt-1 text-gray-600 break-words'>
                  {error.message}
                </p>
                {error.stack && (
                  <details className='mt-2'>
                    <summary className='cursor-pointer text-gray-500 hover:text-gray-700'>
                      查看堆栈跟踪
                    </summary>
                    <pre className='mt-2 text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto'>
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className='mt-6 flex flex-col space-y-3'>
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  disabled={isRecovering}
                  className='w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  {isRecovering ? (
                    <>
                      <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                      恢复中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className='w-4 h-4 mr-2' />
                      重试 ({retryCount}/{maxRetries})
                    </>
                  )}
                </button>
              )}

              <button
                onClick={this.handleReset}
                className='w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
              >
                <Home className='w-4 h-4 mr-2' />
                重置应用
              </button>

              <button
                onClick={this.toggleDetails}
                className='w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
              >
                {showDetails ? '隐藏' : '显示'}错误详情
              </button>
            </div>

            {retryCount > 0 && (
              <div className='mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded'>
                <p className='text-sm text-yellow-800'>
                  已尝试 {retryCount} 次重试。如果问题持续存在，请联系技术支持。
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary
      {...errorBoundaryProps}
      componentName={Component.displayName || Component.name}
    >
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

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

  return { captureError, resetError };
}

export default ErrorBoundary;
