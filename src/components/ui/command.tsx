import { cn   } from '@/lib/utils'
import { Command as CommandPrimitive   } from 'cmdk'
import { Dialog, DialogContent   } from '@/components/ui/dialog'
import { Search   } from 'lucide-react'
import { type DialogProps   } from '@radix-ui/react-dialog'
import * as React from 'react'

/**
* 文件级注释：command 组件
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
* @filepath ui\command.tsx
 */

/**
* command 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <command />
 */
const Command = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props  }, ref) => (;
  <CommandPrimitive
  ref={ ref }
  className={ cn(;
    'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
    className
  ) }
  { ...props }
  />
))
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

/**
 * CommandDialog组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandDialog = ({ children, ...props  }: CommandDialogProps) =>  { return (;
    <Dialog {...props }>
    <DialogContent className='overflow-hidden p-0 shadow-lg'>;
    <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>;
    { children }
    </Command>
    </DialogContent>
    </Dialog>
  ) }

/**
 * CommandInput组件
 * 输入框组件，支持验证和格式化
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandInput = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.Input>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props  }, ref) => (;
  <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>;
  <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />;
  <CommandPrimitive.Input
  ref={ ref }
  className={ cn(;
    'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    className
  ) }
  { ...props }
  />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * CommandList组件
 * CommandList组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandList = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.List>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props  }, ref) => (;
  <CommandPrimitive.List
  ref={ ref }
  className={ cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className) }
  { ...props }
  />
))

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * CommandEmpty组件
 * CommandEmpty组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandEmpty = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.Empty>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (;
  <CommandPrimitive.Empty
  ref={ ref }
  className='py-6 text-center text-sm';
  { ...props }
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * CommandGroup组件
 * CommandGroup组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandGroup = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.Group>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props  }, ref) => (;
  <CommandPrimitive.Group
  ref={ ref }
  className={ cn(;
    'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
    className
  ) }
  { ...props }
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * CommandSeparator组件
 * CommandSeparator组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandSeparator = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props  }, ref) => (;
  <CommandPrimitive.Separator
  ref={ ref }
  className={ cn('-mx-1 h-px bg-border', className) }
  { ...props }
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * CommandItem组件
 * CommandItem组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandItem = React.forwardRef<;
React.ElementRef<typeof CommandPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props  }, ref) => (;
  <CommandPrimitive.Item
  ref={ ref }
  className={ cn(;
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
    className
  ) }
  { ...props }
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * CommandShortcut组件
 * CommandShortcut组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const CommandShortcut = ( { className,
  ...props }: React.HTMLAttributes<HTMLSpanElement>) => { return (;
    <span
    className={cn(;
      'ml-auto text-xs tracking-widest text-muted-foreground',
      className
    ) }
    { ...props }
    />
  ) }
CommandShortcut.displayName = 'CommandShortcut';

export { Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator }
