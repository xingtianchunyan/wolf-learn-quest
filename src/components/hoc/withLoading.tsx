/**
 * 文件级注释：加载状态高阶组件
 * 为组件添加加载状态管理功能
 */

import React from 'react';

/**
 * 加载状态属性接口
 */
export interface WithLoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * 加载组件属性接口
 */
interface LoadingComponentProps {
  text?: string;
}

/**
 * 默认加载组件
 * @param props - 加载组件属性
 * @returns 加载组件
 */
const LoadingComponent: React.FC<LoadingComponentProps> = ({
  text = '加载中...',
}) => (
  <div className='flex items-center justify-center p-4'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
    <span className='ml-2 text-gray-600'>{text}</span>
  </div>
);

/**
 * 加载状态高阶组件
 * 为组件添加加载状态显示功能
 * @param WrappedComponent - 被包装的组件
 * @returns 带有加载状态的组件
 */
export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
  /**
   * 带加载状态的组件类
   */
  const WithLoadingComponent: React.FC<P & WithLoadingProps> = props => {
    const { isLoading, loadingText, ...restProps } = props;

    if (isLoading) {
      return <LoadingComponent text={loadingText} />;
    }

    return <WrappedComponent {...(restProps as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithLoadingComponent;
}
