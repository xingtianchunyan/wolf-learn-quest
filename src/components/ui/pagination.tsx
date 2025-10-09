import { ButtonProps, buttonVariants   } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal   } from 'lucide-react'
import { cn   } from '@/lib/utils'
import * as React from 'react'

/**
* 文件级注释：pagination 组件
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
* @filepath ui\pagination.tsx
 */

/**
* pagination 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <pagination />
 */
const Pagination = ( { className, ...props  }: React.ComponentProps<'nav'>) => (;
  <nav
  role='navigation';
  aria-label='pagination';
  className={ cn('mx-auto flex w-full justify-center', className) }
  { ...props }
  />
)
Pagination.displayName = 'Pagination';

/**
 * PaginationContent组件
 * PaginationContent组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationContent = React.forwardRef<;
HTMLUListElement,
React.ComponentProps<'ul'>
>(({ className, ...props  }, ref) => (;
  <ul
  ref={ ref }
  className={ cn('flex flex-row items-center gap-1', className) }
  { ...props }
  />
))
PaginationContent.displayName = 'PaginationContent';

/**
 * PaginationItem组件
 * PaginationItem组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationItem = React.forwardRef<;
HTMLLIElement,
React.ComponentProps<'li'>
>(({ className, ...props  }, ref) => (;
  <li ref={ ref } className={ cn('', className) } { ...props } />;
))
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = { isActive?: boolean 
} & Pick<ButtonProps, 'size'> &
React.ComponentProps<'a'>

/**
 * PaginationLink组件
 * PaginationLink组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationLink = ( { className,
  isActive,
  size = 'icon',
  ...props }: PaginationLinkProps) => (;
  <a
  aria-current={ isActive ? 'page' : undefined 
}
  className={ cn(;
    buttonVariants({
      variant: isActive ? 'outline' : 'ghost',
      size }),
    className
  )}
  { ...props }
  />
)
PaginationLink.displayName = 'PaginationLink';

/**
 * PaginationPrevious组件
 * PaginationPrevious组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationPrevious = ( { className,
  ...props }: React.ComponentProps<typeof PaginationLink>) => (;
  <PaginationLink
  aria-label='Go to previous page';
  size='default';
  className={ cn('gap-1 pl-2.5', className) }
  { ...props }
  >
  <ChevronLeft className='h-4 w-4' />;
  <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * PaginationNext组件
 * PaginationNext组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationNext = ( { className,
  ...props }: React.ComponentProps<typeof PaginationLink>) => (;
  <PaginationLink
  aria-label='Go to next page';
  size='default';
  className={ cn('gap-1 pr-2.5', className) }
  { ...props }
  >
  <span>Next</span>
  <ChevronRight className='h-4 w-4' />;
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext';

/**
 * PaginationEllipsis组件
 * PaginationEllipsis组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const PaginationEllipsis = ( { className,
  ...props }: React.ComponentProps<'span'>) => (;
  <span
  aria-hidden
  className={ cn('flex h-9 w-9 items-center justify-center', className) }
  { ...props }
  >
  <MoreHorizontal className='h-4 w-4' />;
  <span className='sr-only'>More pages</span>;
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis';

export { Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious }
