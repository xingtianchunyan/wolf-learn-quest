/**
 * 文件级注释：加载状态高阶组件
 * 为组件提供加载状态管理功能
 */

import React, { ComponentType, ReactNode } from 'react';

/**
 * 加载状态属性接口
 */
interface WithLoadingProps {
  isLoading?: boolean;
  loadingComponent?: ReactNode;
}

/**
 * 默认加载组件
 */
const DefaultLoadingComponent: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span className="ml-2 text-gray-600">加载中...</span>
  </div>
);

/**
 * 加载状态高阶组件
 * @param WrappedComponent - 被包装的组件
 * @returns 带有加载状态的组件
 */
export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  /**
   * 带加载状态的组件
   */
  const WithLoadingComponent: React.FC<P & WithLoadingProps> = ({
    isLoading = false,
    loadingComponent,
    ...props
  }) => {
    if (isLoading) {
      return (
        <>
          {loadingComponent || <DefaultLoadingComponent />}
        </>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || Wra