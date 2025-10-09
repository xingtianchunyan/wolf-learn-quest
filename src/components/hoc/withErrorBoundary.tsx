/**
 * 文件级注释：错误边界高阶组件
 * 为组件提供错误捕获和处理功能
 */

import React, { Component, ComponentType, ReactNode } from 'react';

/**
 * 错误边界状态接口
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * 错误边界属性接口
 */
interface ErrorBoundaryProps {
  fallback?: (error: Error) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * 错误边界高阶组件
 * @param WrappedComponent - 被包装的组件
 * @returns 带有错误边界的组件
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  /**
   * 错误边界组件类
   */
  class ErrorBoundary extends Component<
    P & ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: P & ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    /**
     * 捕获错误
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
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      this.props.onError?.(error, errorInfo);
    }

    /**
     * 渲染方法
     * @returns 渲染结果
     */
    render() {
      if (this.state.hasError) {
        if (this.props.fallback && this.state.error) {
          return this.props.fallback(this.state.error);
        }

        return (
          <div className='error-boundary'>
            <h2>出现了一些问题</h2>
            <p>页面遇到错误，请刷新重试</p>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return ErrorBoundary;
}
