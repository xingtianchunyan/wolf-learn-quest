import { Badge  } from '@/components/ui/badge';
import { cn  } from '@/lib/utils';
import React from 'react';

/**
* 文件级注释：StatusBadge 组件
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
* @filepath core\StatusBadge.tsx
 */

interface StatusBadgeProps { status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;,
}

/**
* StatusBadge 组件
*
* 提供用户界面交互功能
*
* @component
* @param { StatusBadgeProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <StatusBadge { ...props } />
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status,
  variant = 'default',
  className,
}) => { const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
      case '可用':
      case 'available':
      return 'text-green-400 border-green-400';
      case 'used':
      case '已使用':
      return 'text-yellow-400 border-yellow-400';
      case 'blocked':
      case '禁用':
      case 'disabled':
      return 'text-red-400 border-red-400';
      case 'pending':
      case '等待':
      return 'text-blue-400 border-blue-400';
      default:
      return 'text-werewolf-purple border-werewolf-purple/50';,
}
  };

  return (;
    <Badge
    variant={ variant }
    className={ cn(getStatusColor(status), className) }
    >
    { status }
    </Badge>
  );,
};

export default StatusBadge;