import { cn  } from '@/lib/utils'
import { GripVertical  } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

/**
* 文件级注释：resizable 组件
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
* @filepath ui\resizable.tsx
 */

/**
* resizable 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <resizable />
 */
const ResizablePanelGroup = ({ className,
  ...props,
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (;
  <ResizablePrimitive.PanelGroup
  className={ cn(;
    'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
    className
  ) }
  { ...props }
  />
)

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({ withHandle,
  className,
  ...props,
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { withHandle?: boolean,
}) => (;
  <ResizablePrimitive.PanelResizeHandle
  className={ cn(;
    'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
    className
  ) }
  { ...props }
  >
  { withHandle && (
    <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>;
    <GripVertical className='h-2.5 w-2.5' />;
    </div>
  ) }
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle  }
