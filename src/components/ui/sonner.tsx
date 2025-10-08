import { Toaster as Sonner, toast  } from 'sonner'
import { useTheme  } from 'next-themes'

/**
* 文件级注释：sonner 组件
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
* @filepath ui\sonner.tsx
 */

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props  }: ToasterProps) => { const { theme = 'system'  } = useTheme();

  return (;
    <Sonner
    theme={ theme as ToasterProps['theme'] }
    className='toaster group';
    toastOptions={ {
      classNames: {
        toast:
        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
       },
    }}
    { ...props }
    />
  ),
}

export { Toaster, toast  }
