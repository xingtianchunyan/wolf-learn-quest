import { cn  } from '@/lib/utils'
import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

/**
* 文件级注释：separator 组件
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
* @filepath ui\separator.tsx
 */

/**
* separator 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <separator />
 */
const Separator = React.forwardRef<;
React.ElementRef<typeof SeparatorPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>((
    { className, orientation = 'horizontal', decorative = true, ...props  },
    ref
  ) => (;
    <SeparatorPrimitive.Root
    ref={ ref }
    decorative={ decorative }
    orientation={ orientation }
    className={ cn(;
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    ) }
    { ...props }
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator  }
