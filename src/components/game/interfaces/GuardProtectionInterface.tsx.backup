import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { Shield  } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：GuardProtectionInterface 组件
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
* @filepath game\interfaces\GuardProtectionInterface.tsx
 */

interface GuardProtectionInterfaceProps { onProtect: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string  }>;,
}

/**
* GuardProtectionInterface 组件
*
* 提供通用功能组件
*
* @component
* @param { GuardProtectionInterfaceProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <GuardProtectionInterface { ...props } />
 */
const GuardProtectionInterface: React.FC<GuardProtectionInterfaceProps> = ({ onProtect,
  availablePlayers,
}) => { return (;
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>;
    <CardHeader>
    <CardTitle className='flex items-center gap-2'>;
    <Shield className='w-4 h-4 text-green-400' />;
    守卫保护
    <Badge variant='outline' className='text-green-400'>守卫技能</Badge>;
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-2'>;
    {availablePlayers.map(player => (;
      <Button
      key={player.userId }
      variant='outline';
      size='sm';
      onClick={ () => onProtect(player.userId) }
      className='w-full justify-start text-green-400 border-green-400';
      >
      保护 { player.name }
      </Button>
    ))}
    </CardContent>
    </Card>
  );,
};

export default GuardProtectionInterface;