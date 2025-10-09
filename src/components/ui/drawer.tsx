import { cn   } from '@/lib/utils'
import { Drawer as DrawerPrimitive   } from 'vaul'
import * as React from 'react'

/**
* 文件级注释：drawer 组件
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
* @filepath ui\drawer.tsx
 */

/**
* drawer 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <drawer />
 */
const Drawer = ( { shouldScaleBackground = true,
  ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (;
  <DrawerPrimitive.Root
  shouldScaleBackground={ shouldScaleBackground }
  { ...props }
  />
)
Drawer.displayName = 'Drawer';

/**
 * DrawerTrigger组件
 * DrawerTrigger组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * DrawerPortal组件
 * DrawerPortal组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerPortal = DrawerPrimitive.Portal;

/**
 * DrawerClose组件
 * DrawerClose组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerClose = DrawerPrimitive.Close;

/**
 * DrawerOverlay组件
 * DrawerOverlay组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerOverlay = React.forwardRef<;
React.ElementRef<typeof DrawerPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props  }, ref) => (;
  <DrawerPrimitive.Overlay
  ref={ ref }
  className={ cn('fixed inset-0 z-50 bg-black/80', className) }
  { ...props }
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/**
 * DrawerContent组件
 * DrawerContent组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerContent = React.forwardRef<;
React.ElementRef<typeof DrawerPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props  }, ref) => (;
  <DrawerPortal>
  <DrawerOverlay />
  <DrawerPrimitive.Content
  ref={ ref }
  className={ cn(;
    'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
    className
  ) }
  { ...props }
  >
  <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />;
  { children }
  </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent';

/**
 * DrawerHeader组件
 * 页头组件，显示导航和标题
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerHeader = ( { className,
  ...props }: React.HTMLAttributes<HTMLDivElement>) => (;
  <div
  className={ cn('grid gap-1.5 p-4 text-center sm:text-left', className) }
  { ...props }
  />
)
DrawerHeader.displayName = 'DrawerHeader';

/**
 * DrawerFooter组件
 * 页脚组件，显示版权和链接
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerFooter = ( { className,
  ...props }: React.HTMLAttributes<HTMLDivElement>) => (;
  <div
  className={ cn('mt-auto flex flex-col gap-2 p-4', className) }
  { ...props }
  />
)
DrawerFooter.displayName = 'DrawerFooter';

/**
 * DrawerTitle组件
 * DrawerTitle组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerTitle = React.forwardRef<;
React.ElementRef<typeof DrawerPrimitive.Title>,
React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props  }, ref) => (;
  <DrawerPrimitive.Title
  ref={ ref }
  className={ cn(;
    'text-lg font-semibold leading-none tracking-tight',
    className
  ) }
  { ...props }
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

/**
 * DrawerDescription组件
 * DrawerDescription组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DrawerDescription = React.forwardRef<;
React.ElementRef<typeof DrawerPrimitive.Description>,
React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props  }, ref) => (;
  <DrawerPrimitive.Description
  ref={ ref }
  className={ cn('text-sm text-muted-foreground', className) }
  { ...props }
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription }
