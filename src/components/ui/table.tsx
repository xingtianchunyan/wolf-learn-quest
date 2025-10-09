import { cn   } from '@/lib/utils'
import * as React from 'react'

/**
* 文件级注释：table 组件
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
* @filepath ui\table.tsx
 */

/**
* table 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <table />
 */
const Table = React.forwardRef<;
HTMLTableElement,
React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props  }, ref) => (;
  <div className='relative w-full overflow-auto'>;
  <table
  ref={ ref }
  className={ cn('w-full caption-bottom text-sm', className) }
  { ...props }
  />
  </div>
))
Table.displayName = 'Table';

/**
 * TableHeader组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableHeader = React.forwardRef<;
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props  }, ref) => (;
  <thead ref={ ref } className={ cn('[&_tr]:border-b', className) } { ...props } />;
))
TableHeader.displayName = 'TableHeader';

/**
 * TableBody组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableBody = React.forwardRef<;
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props  }, ref) => (;
  <tbody
  ref={ ref }
  className={ cn('[&_tr:last-child]:border-0', className) }
  { ...props }
  />
))
TableBody.displayName = 'TableBody';

/**
 * TableFooter组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableFooter = React.forwardRef<;
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props  }, ref) => (;
  <tfoot
  ref={ ref }
  className={ cn(;
    'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
    className
  ) }
  { ...props }
  />
))
TableFooter.displayName = 'TableFooter';

/**
 * TableRow组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableRow = React.forwardRef<;
HTMLTableRowElement,
React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props  }, ref) => (;
  <tr
  ref={ ref }
  className={ cn(;
    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    className
  ) }
  { ...props }
  />
))
TableRow.displayName = 'TableRow';

/**
 * TableHead组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableHead = React.forwardRef<;
HTMLTableCellElement,
React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props  }, ref) => (;
  <th
  ref={ ref }
  className={ cn(;
    'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
    className
  ) }
  { ...props }
  />
))
TableHead.displayName = 'TableHead';

/**
 * TableCell组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableCell = React.forwardRef<;
HTMLTableCellElement,
React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props  }, ref) => (;
  <td
  ref={ ref }
  className={ cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className) }
  { ...props }
  />
))
TableCell.displayName = 'TableCell';

/**
 * TableCaption组件
 * 表格组件，用于数据展示和操作
 * @param props - 组件属性
 * @returns JSX元素
 */
const TableCaption = React.forwardRef<;
HTMLTableCaptionElement,
React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props  }, ref) => (;
  <caption
  ref={ ref }
  className={ cn('mt-4 text-sm text-muted-foreground', className) }
  { ...props }
  />
))
TableCaption.displayName = 'TableCaption';

export { Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption }
