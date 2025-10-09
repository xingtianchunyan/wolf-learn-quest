import { cn   } from '@/lib/utils'
import { X   } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

/**
* 文件级注释：dialog 组件
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
* @filepath ui\dialog.tsx
 */

/**
* dialog 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <dialog />
 */
const Dialog = DialogPrimitive.Root;

/**
 * DialogTrigger组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * DialogPortal组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * DialogClose组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogClose = DialogPrimitive.Close;

/**
 * DialogOverlay组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogOverlay = React.forwardRef<;
React.ElementRef<typeof DialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props  }, ref) => (;
  <DialogPrimitive.Overlay
  ref={ ref }
  className={ cn(;
    'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    className
  ) }
  { ...props }
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * DialogContent组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogContent = React.forwardRef<;
React.ElementRef<typeof DialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props  }, ref) => (;
  <DialogPortal>
  <DialogOverlay />
  <DialogPrimitive.Content
  ref={ ref }
  className={ cn(;
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
    className
  ) }
  { ...props }
  >
  { children }
  <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>;
  <X className='h-4 w-4' />;
  <span className='sr-only'>Close</span>;
  </DialogPrimitive.Close>
  </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * DialogHeader组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogHeader = ( { className,
  ...props }: React.HTMLAttributes<HTMLDivElement>) => (;
  <div
  className={ cn(;
    'flex flex-col space-y-1.5 text-center sm:text-left',
    className
  ) }
  { ...props }
  />
)
DialogHeader.displayName = 'DialogHeader';

/**
 * DialogFooter组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogFooter = ( { className,
  ...props }: React.HTMLAttributes<HTMLDivElement>) => (;
  <div
  className={ cn(;
    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    className
  ) }
  { ...props }
  />
)
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogTitle = React.forwardRef<;
React.ElementRef<typeof DialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props  }, ref) => (;
  <DialogPrimitive.Title
  ref={ ref }
  className={ cn(;
    'text-lg font-semibold leading-none tracking-tight',
    className
  ) }
  { ...props }
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * DialogDescription组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const DialogDescription = React.forwardRef<;
React.ElementRef<typeof DialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props  }, ref) => (;
  <DialogPrimitive.Description
  ref={ ref }
  className={ cn('text-sm text-muted-foreground', className) }
  { ...props }
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription }
