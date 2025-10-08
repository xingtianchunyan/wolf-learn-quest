import { Avatar, AvatarFallback, AvatarImage  } from '@/components/ui/avatar';
import { cn  } from '@/lib/utils';
import React from 'react';

/**
* 文件级注释：PlayerAvatar 组件
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
* @filepath core\PlayerAvatar.tsx
 */

interface PlayerAvatarProps { name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'alive' | 'dead' | 'eliminated';
  className?: string;,
}

/**
* PlayerAvatar 组件
*
* 提供用户界面交互功能
*
* @component
* @param { PlayerAvatarProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <PlayerAvatar { ...props } />
 */
const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ name,
  avatarUrl,
  size = 'md',
  status = 'alive',
  className,
}) => { const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
};

  const statusClasses = { alive: '',
    dead: 'opacity-50 grayscale',
    eliminated: 'opacity-30 grayscale',
};

  const getInitials = (name: string) => { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);,
};

  return (;
    <Avatar className={ cn(sizeClasses[size], statusClasses[status], className) }>;
    <AvatarImage src={ avatarUrl } alt={ name } />;
    <AvatarFallback className='bg-werewolf-purple/20 text-werewolf-purple'>;
    { getInitials(name) }
    </AvatarFallback>
    </Avatar>
  );,
};

export default PlayerAvatar;