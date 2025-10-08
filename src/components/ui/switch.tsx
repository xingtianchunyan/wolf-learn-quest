import { cn  } from '@/lib/utils'
import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

/**
* 文件级注释：switch 组件
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
* @filepath ui\switch.tsx
 */

/**
* switch 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <switch />
 */
const Switch = React.forwardRef<;
React.ElementRef<typeof SwitchPrimitives.Root>,
React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { checkedLabel?: string;
  uncheckedLabel?: string;,
}
>(({ className, checkedLabel, uncheckedLabel, ...props  }, ref) => (;
  <SwitchPrimitives.Root
  className={ cn(;
    'peer group relative inline-flex h-7 w-[120px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    className
  ) }
  { ...props }
  ref={ ref }
  >
  { checkedLabel && (
    <span className='absolute left-4 text-xs font-medium text-white opacity-0 transition-opacity group-data-[state=checked]:opacity-100'>;
    {checkedLabel }
    </span>
  )}
  { uncheckedLabel && (
    <span className='absolute right-4 text-xs font-medium text-gray-300 opacity-100 transition-opacity group-data-[state=checked]:opacity-0'>;
    {uncheckedLabel }
    </span>
  )}
  <SwitchPrimitives.Thumb
  className={ cn(;
    'pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[90px] data-[state=unchecked]:translate-x-0.5';
  ) }
  />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch  }
