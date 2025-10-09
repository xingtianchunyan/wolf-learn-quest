/**
 * 文件级注释：高阶组件库索引文件
 * 统一导出所有高阶组件
 */

export { withErrorBoundary } from './withErrorBoundary';
export { withLoading } from './withLoading';
export { withPermission, Permission } from './withPermission';
export { withForm } from './withForm';

/**
 * 高阶组件使用示例
 *
 * @example
 * // 错误边界
 * const SafeComponent = withErrorBoundary(MyComponent);
 *
 * @example
 * // 加载状态
 * const LoadingComponent = withLoading(MyComponent);
 * <LoadingComponent isLoading={true} />
 *
 * @example
 * // 权限控制
 * const ProtectedComponent = withPermission(MyComponent, [Permission.ADMIN]);
 * <ProtectedComponent userPermissions={[Permission.ADMIN]} />
 *
 * @example
 * // 表单增强
 * const FormComponent = withForm(MyComponent);
 *
 * @example
 * // 组合使用
 * const EnhancedComponent = withErrorBoundary(
 *   withLoading(
 *     withPermission(MyComponent, [Permission.READ])
 *   )
 * );
 */
