import { cn   } from '@/lib/utils'
import * as React from 'react'

/**
* 文件级注释：textarea 组件
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
* @filepath ui\textarea.tsx
 */

export interface TextareaProps
extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
* textarea 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <textarea />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(;
  ({ className, ...props  }, ref) => { return (;
      <textarea
      className={cn(;
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      ) }
      ref={ ref }
      { ...props }
      />
    ) }
)
Textarea.displayName = 'Textarea';

export { Textarea  }
