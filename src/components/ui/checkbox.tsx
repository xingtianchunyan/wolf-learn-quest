import { Check  } from 'lucide-react'
import { cn  } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

/**
* 文件级注释：checkbox 组件
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
* @filepath ui\checkbox.tsx
 */

/**
* checkbox 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <checkbox />
 */
const Checkbox = React.forwardRef<;
React.ElementRef<typeof CheckboxPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props  }, ref) => (;
  <CheckboxPrimitive.Root
  ref={ ref }
  className={ cn(;
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    className
  ) }
  { ...props }
  >
  <CheckboxPrimitive.Indicator
  className={ cn('flex items-center justify-center text-current') }
  >
  <Check className='h-4 w-4' />;
  </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox  }
