import { Check, ChevronRight, Circle   } from 'lucide-react'
import { cn   } from '@/lib/utils'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import * as React from 'react'

/**
* 文件级注释：menubar 组件
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
* @filepath ui\menubar.tsx
 */

/**
* menubar 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <menubar />
 */
const MenubarMenu = MenubarPrimitive.Menu;

/**
 * MenubarGroup组件
 * MenubarGroup组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarGroup = MenubarPrimitive.Group;

/**
 * MenubarPortal组件
 * MenubarPortal组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarPortal = MenubarPrimitive.Portal;

/**
 * MenubarSub组件
 * MenubarSub组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarSub = MenubarPrimitive.Sub;

/**
 * MenubarRadioGroup组件
 * MenubarRadioGroup组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

/**
 * Menubar组件
 * Menubar组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const Menubar = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props  }, ref) => (;
  <MenubarPrimitive.Root
  ref={ ref }
  className={ cn(;
    'flex h-10 items-center space-x-1 rounded-md border bg-background p-1',
    className
  ) }
  { ...props }
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName;

/**
 * MenubarTrigger组件
 * MenubarTrigger组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarTrigger = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props  }, ref) => (;
  <MenubarPrimitive.Trigger
  ref={ ref }
  className={ cn(;
    'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    className
  ) }
  { ...props }
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

/**
 * MenubarSubTrigger组件
 * MenubarSubTrigger组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarSubTrigger = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean 
}
>(({ className, inset, children, ...props  }, ref) => (;
  <MenubarPrimitive.SubTrigger
  ref={ ref }
  className={ cn(;
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
    inset && 'pl-8',
    className
  ) }
  { ...props }
  >
  { children }
  <ChevronRight className='ml-auto h-4 w-4' />;
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

/**
 * MenubarSubContent组件
 * MenubarSubContent组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarSubContent = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props  }, ref) => (;
  <MenubarPrimitive.SubContent
  ref={ ref }
  className={ cn(;
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    className
  ) }
  { ...props }
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

/**
 * MenubarContent组件
 * MenubarContent组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarContent = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Content>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>((
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props  },
    ref
  ) => (;
    <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
    ref={ ref }
    align={ align }
    alignOffset={ alignOffset }
    sideOffset={ sideOffset }
    className={ cn(;
      'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    ) }
    { ...props }
    />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

/**
 * MenubarItem组件
 * MenubarItem组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarItem = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean 
}
>(({ className, inset, ...props  }, ref) => (;
  <MenubarPrimitive.Item
  ref={ ref }
  className={ cn(;
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    inset && 'pl-8',
    className
  ) }
  { ...props }
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

/**
 * MenubarCheckboxItem组件
 * MenubarCheckboxItem组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarCheckboxItem = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props  }, ref) => (;
  <MenubarPrimitive.CheckboxItem
  ref={ ref }
  className={ cn(;
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  ) }
  checked={ checked }
  { ...props }
  >
  <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>;
  <MenubarPrimitive.ItemIndicator>
  <Check className='h-4 w-4' />;
  </MenubarPrimitive.ItemIndicator>
  </span>
  { children }
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

/**
 * MenubarRadioItem组件
 * MenubarRadioItem组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarRadioItem = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props  }, ref) => (;
  <MenubarPrimitive.RadioItem
  ref={ ref }
  className={ cn(;
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  ) }
  { ...props }
  >
  <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>;
  <MenubarPrimitive.ItemIndicator>
  <Circle className='h-2 w-2 fill-current' />;
  </MenubarPrimitive.ItemIndicator>
  </span>
  { children }
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

/**
 * MenubarLabel组件
 * MenubarLabel组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarLabel = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Label>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean 
}
>(({ className, inset, ...props  }, ref) => (;
  <MenubarPrimitive.Label
  ref={ ref }
  className={ cn(;
    'px-2 py-1.5 text-sm font-semibold',
    inset && 'pl-8',
    className
  ) }
  { ...props }
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

/**
 * MenubarSeparator组件
 * MenubarSeparator组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarSeparator = React.forwardRef<;
React.ElementRef<typeof MenubarPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props  }, ref) => (;
  <MenubarPrimitive.Separator
  ref={ ref }
  className={ cn('-mx-1 my-1 h-px bg-muted', className) }
  { ...props }
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

/**
 * MenubarShortcut组件
 * MenubarShortcut组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MenubarShortcut = ( { className,
  ...props }: React.HTMLAttributes<HTMLSpanElement>) => { return (;
    <span
    className={cn(;
      'ml-auto text-xs tracking-widest text-muted-foreground',
      className
    ) }
    { ...props }
    />
  ) }
MenubarShortcut.displayname = 'MenubarShortcut';

export { Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut }
