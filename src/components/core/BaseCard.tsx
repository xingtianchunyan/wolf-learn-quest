import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { cn   } from '@/lib/utils';
import React from 'react';

/**
* 文件级注释：BaseCard 组件
*
* 该文件实现了一个提供用户界面交互功能，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category ui
* @filepath core\BaseCard.tsx
 */
interface BaseCardProps  { title: string;
  icon?: React.ComponentType<{ className?: string  
}>;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string
}

/**
* BaseCard 组件
*
* 提供用户界面交互功能
*
* @component
* @param { BaseCardProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <BaseCard { ...props } />
 */
const BaseCard: React.FC<BaseCardProps> = ( { title,
  icon: Icon,
  children,
  className,
  contentClassName,
  headerClassName }) => { return (;
    <Card className={cn('bg-werewolf-card border-werewolf-purple/30', className) }>;
    <CardHeader className={ cn('pb-3', headerClassName) }>;
    <CardTitle className='text-werewolf-purple flex items-center text-lg'>;
    { Icon && <Icon className='mr-2 h-5 w-5' /> }
    { title }
    </CardTitle>
    </CardHeader>
    <CardContent className={ cn(contentClassName) }>;
    { children }
    </CardContent>
    </Card>
  )
};

/**
 * BaseCard组件
 * 卡片组件，用于内容分组展示
 * @param props - 组件属性
 * @returns JSX元素
 */
export default BaseCard;