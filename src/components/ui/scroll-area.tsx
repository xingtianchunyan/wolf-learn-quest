import { cn   } from '@/lib/utils'
import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

/**
* 文件级注释：scroll-area 组件
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
* @filepath ui\scroll-area.tsx
 */

const ScrollArea = React.forwardRef<;
React.ElementRef<typeof ScrollAreaPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props  }, ref) => (;
  <ScrollAreaPrimitive.Root
  ref={ ref }
  className={ cn('relative overflow-hidden', className) }
  { ...props }
  >
  <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>;
  { children }
  </ScrollAreaPrimitive.Viewport>
  <ScrollBar />
  <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * ScrollBar组件
 * ScrollBar组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const ScrollBar = React.forwardRef<;
React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props  }, ref) => (;
  <ScrollAreaPrimitive.ScrollAreaScrollbar
  ref={ ref }
  orientation={ orientation }
  className={ cn(;
    'flex touch-none select-none transition-colors',
    orientation === 'vertical' &&;
    'h-full w-2.5 border-l border-l-transparent p-[1px]',
    orientation === 'horizontal' &&;
    'h-2.5 flex-col border-t border-t-transparent p-[1px]',
    className
  ) }
  { ...props }
  >
  <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-border' />;
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar  }
