import { cn   } from '@/lib/utils';
import { Loader2   } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：LoadingSpinner 组件
*
* 该文件实现了一个提供通用功能组件，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category common
* @filepath core\LoadingSpinner.tsx
 */
interface LoadingSpinnerProps  { size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string
}

/**
* LoadingSpinner 组件
*
* 提供通用功能组件
*
* @component
* @param { LoadingSpinnerProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <LoadingSpinner { ...props } />
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ( { size = 'md',
  text,
  className }) => { const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'  
};

  return (;
    <div className={ cn('flex items-center justify-center', className) }>;
    <Loader2 className={ cn('animate-spin text-werewolf-purple', sizeClasses[size]) } />;
    { text && <span className='ml-2 text-sm text-muted-foreground'>{text }</span>}
    </div>
  )
};

/**
 * LoadingSpinner组件
 * 加载组件，显示加载状态
 * @param props - 组件属性
 * @returns JSX元素
 */
export default LoadingSpinner;