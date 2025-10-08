import { Circle  } from 'lucide-react'
import { cn  } from '@/lib/utils'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'

/**
* 文件级注释：radio-group 组件
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
* @filepath ui\radio-group.tsx
 */

const RadioGroup = React.forwardRef<;
React.ElementRef<typeof RadioGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props  }, ref) => { return (;
    <RadioGroupPrimitive.Root
    className={cn('grid gap-2', className) }
    { ...props }
    ref={ ref }
    />
  ),
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<;
React.ElementRef<typeof RadioGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props  }, ref) => { return (;
    <RadioGroupPrimitive.Item
    ref={ref }
    className={ cn(;
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    ) }
    { ...props }
    >
    <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>;
    <Circle className='h-2.5 w-2.5 fill-current text-current' />;
    </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  ),
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem  }
