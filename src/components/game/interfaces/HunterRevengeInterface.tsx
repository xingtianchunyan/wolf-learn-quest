import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { Target  } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：HunterRevengeInterface 组件
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
* @filepath game\interfaces\HunterRevengeInterface.tsx
 */

interface HunterRevengeInterfaceProps { onRevenge: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string  }>;,
}

/**
* HunterRevengeInterface 组件
*
* 提供通用功能组件
*
* @component
* @param { HunterRevengeInterfaceProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <HunterRevengeInterface { ...props } />
 */
const HunterRevengeInterface: React.FC<HunterRevengeInterfaceProps> = ({ onRevenge,
  availablePlayers,
}) => { return (;
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>;
    <CardHeader>
    <CardTitle className='flex items-center gap-2'>;
    <Target className='w-4 h-4' />;
    猎人复仇
    <Badge variant='outline'>猎人技能</Badge>;
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-2'>;
    {availablePlayers.map(player => (;
      <Button
      key={player.userId }
      variant='outline';
      size='sm';
      onClick={ () => onRevenge(player.userId) }
      className='w-full justify-start';
      >
      击杀 { player.name }
      </Button>
    ))}
    </CardContent>
    </Card>
  );,
};

export default HunterRevengeInterface;