/**
 * 文件级注释：权限控制高阶组件
 * 为组件提供权限验证功能
 */

import React, { ComponentType, ReactNode } from 'react';

/**
 * 权限类型枚举
 */
export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  ADMIN = 'admin',
  JUDGE = 'judge',
  PLAYER = 'player',
}

/**
 * 权限控制属性接口
 */
interface WithPermissionProps {
  userPermissions?: Permission[];
  requiredPermissions?: Permission[];
  fallbackComponent?: ReactNode;
  onUnauthorized?: () => void;
}

/**
 * 默认无权限组件
 */
const DefaultUnauthorizedComponent: React.FC = () => (
  <div className='flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg'>
    <div className='text-center'>
      <div className='text-red-500 text-4xl mb-2'>🚫</div>
      <h3 className='text-lg font-semibold text-red-700 mb-1'>访问被拒绝</h3>
      <p className='text-red-600'>您没有权限访问此内容</p>
    </div>
  </div>
);

/**
 * 检查用户是否有所需权限
 * @param userPermissions - 用户权限列表
 * @param requiredPermissions - 所需权限列表
 * @returns 是否有权限
 */
function hasPermission(
  userPermissions: Permission[] = [],
  requiredPermissions: Permission[] = []
): boolean {
  if (requiredPermissions.length === 0) {return true;}
  if (userPermissions.includes(Permission.ADMIN)) {return true;}

  return requiredPermissions.some(permission =>
    userPermissions.includes(permission)
  );
}

/**
 * 权限控制高阶组件
 * @param WrappedComponent - 被包装的组件
 * @param defaultRequiredPermissions - 默认所需权限
 * @returns 带有权限控制的组件
 */
export function withPermission<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultRequiredPermissions: Permission[] = []
) {
  /**
   * 带权限控制的组件
   */
  const WithPermissionComponent: React.FC<P & WithPermissionProps> = ({
    userPermissions = [],
    requiredPermissions = defaultRequiredPermissions,
    fallbackComponent,
    onUnauthorized,
    ...props
  }) => {
    const hasAccess = hasPermission(userPermissions, requiredPermissions);

    if (!hasAccess) {
      if (onUnauthorized) {
        onUnauthorized();
      }

      return <>{fallbackComponent || <DefaultUnauthorizedComponent />}</>;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  WithPermissionComponent.displayName = `withPermission(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithPermissionComponent;
}

export default withPerm;
