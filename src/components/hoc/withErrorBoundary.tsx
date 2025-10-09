/**
 * 文件级注释：错误边界高阶组件
 * 为组件添加错误捕获和处理功能
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * 错误边界状态接口
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * 错误边界属性接口
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error?: Error; errorInfo?: ErrorInfo }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * 默认错误显示组件
 */
const DefaultErrorFallback: React.FC<{
  error?: Error;
  errorInfo?: ErrorInfo;
}> = ({ error, errorInfo }) => (
  <div className='min-h-screen flex items-center justify-center bg-gray-50'>
    <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6'>
      <div className='flex items-center mb-4'>
        <div className='flex-shrink-0'>
          <svg
            className='h-8 w-8 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <div className='ml-3'>
          <h3 className='text-lg font-medium text-gray-900'>出现错误</h3>
        </div>
      </div>
      <div className='text-sm text-gray-600 mb-4'>
        <p>抱歉，应用程序遇到了一个错误。请刷新页面重试。</p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className='mt-4'>
            <summary className='cursor-pointer text-red-600 font-medium'>
              错误详情
            </summary>
            <pre className='mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto'>
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
        )}
      </div>
      <button
        onClick={() => window.location.reload()}
        className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors'
      >
        刷新页面
      </button>
    </div>
  </div>
);

/**
 * 错误边界组件类
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * 静态方法：从错误中获取派生状态
   * @param error - 错误对象
   * @returns 新的状态
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * 组件捕获错误时调用
   * @param error - 错误对象
   * @param errorInfo - 错误信息
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // 调用错误处理回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 在开发环境下打印错误信息
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  /**
   * 渲染方法
   * @returns 渲染结果
   */
  render() {
    if (this.state.hasError) {
      /**
       * FallbackComponent组件
       * FallbackComponent组件的功能描述
       * @param props - 组件属性
       * @returns JSX元素
       */
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * 错误边界高阶组件
 * 为组件添加错误捕获功能
 * @param WrappedComponent - 被包装的组件
 * @param fallback - 自定义错误显示组件
 * @param onError - 错误处理回调
 * @returns 带有错误边界的组件
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error?: Error; errorInfo?: ErrorInfo }>,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
): React.FC<P> {
  /**
   * 带错误边界的组件
   */
  const WithErrorBoundaryComponent: React.FC<P> = props => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}

export { ErrorBoundary };
