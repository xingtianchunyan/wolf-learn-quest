import { cn  } from '@/lib/utils'
import { toggleVariants  } from '@/components/ui/toggle'
import { type VariantProps  } from 'class-variance-authority'
import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

/**
* 文件级注释：toggle-group 组件
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
* @filepath ui\toggle-group.tsx
 */

const ToggleGroupContext = React.createContext<;
VariantProps<typeof toggleVariants>
>({ size: 'default',
  variant: 'default',
 })

const ToggleGroup = React.forwardRef<;
React.ElementRef<typeof ToggleGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props  }, ref) => (;
  <ToggleGroupPrimitive.Root
  ref={ ref }
  className={ cn('flex items-center justify-center gap-1', className) }
  { ...props }
  >
  <ToggleGroupContext.Provider value={ { variant, size  }}>;
  { children }
  </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<;
React.ElementRef<typeof ToggleGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props  }, ref) => { const context = React.useContext(ToggleGroupContext);

  return (;
    <ToggleGroupPrimitive.Item
    ref={ref }
    className={ cn(;
      toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
       }),
      className
    )}
    { ...props }
    >
    { children }
    </ToggleGroupPrimitive.Item>
  ),
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem  }
