import { cn  } from '@/lib/utils'
import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

/**
* 文件级注释：tabs 组件
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
* @filepath ui\tabs.tsx
 */

/**
* tabs 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <tabs />
 */
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<;
React.ElementRef<typeof TabsPrimitive.List>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props  }, ref) => (;
  <TabsPrimitive.List
  ref={ ref }
  className={ cn(;
    'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    className
  ) }
  { ...props }
  />
))
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<;
React.ElementRef<typeof TabsPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props  }, ref) => (;
  <TabsPrimitive.Trigger
  ref={ ref }
  className={ cn(;
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    className
  ) }
  { ...props }
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<;
React.ElementRef<typeof TabsPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props  }, ref) => (;
  <TabsPrimitive.Content
  ref={ ref }
  className={ cn(;
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  ) }
  { ...props }
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent  }
