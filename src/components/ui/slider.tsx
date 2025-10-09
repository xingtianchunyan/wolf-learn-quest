import { cn   } from '@/lib/utils'
import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

/**
* 文件级注释：slider 组件
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
* @filepath ui\slider.tsx
 */

/**
* slider 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <slider />
 */
const Slider = React.forwardRef<;
React.ElementRef<typeof SliderPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props  }, ref) => (;
  <SliderPrimitive.Root
  ref={ ref }
  className={ cn(;
    'relative flex w-full touch-none select-none items-center',
    className
  ) }
  { ...props }
  >
  <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'>;
  <SliderPrimitive.Range className='absolute h-full bg-primary' />;
  </SliderPrimitive.Track>
  <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />;
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider  }
