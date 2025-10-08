import { Badge  } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { getSkillEffectTypes, getSkillTargetTypes, hasSpecialAbility  } from '@/utils/skillSystemHelpers';
import { Shield, Sword, Eye, Ban  } from 'lucide-react';
import React from 'react';
import type { SkillEffects, RoleAttributes  } from '@/utils/skillSystemHelpers';

/**
* 文件级注释：RoleSkillInfo 组件
*
* 该文件实现了一个处理游戏逻辑和状态管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category game
* @filepath game\displays\RoleSkillInfo.tsx
 */

interface RoleSkillInfoProps { roleName: string;
  skillEffects?: SkillEffects;
  roleAttributes?: RoleAttributes;
  className?: string;,
}

/**
* RoleSkillInfo 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { RoleSkillInfoProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <RoleSkillInfo { ...props } />
 */
const RoleSkillInfo: React.FC<RoleSkillInfoProps> = ({ roleName,
  skillEffects,
  roleAttributes,
  className = '';,
}) => { const getSkillIcon = (effectType: string) => {
    switch (effectType) {
      case 'attack':
      return <Sword className='h-3 w-3' />;
      case 'protect':
      return <Shield className='h-3 w-3' />;
      case 'check':
      return <Eye className='h-3 w-3' />;
      case 'none':
      return <Ban className='h-3 w-3' />;
      default:
      return null;,
}
  };

  const getSkillTypeColor = (effectType: string) => { switch (effectType) {
      case 'attack':
      return 'bg-red-500/20 text-red-400 border-red-400';
      case 'protect':
      return 'bg-green-500/20 text-green-400 border-green-400';
      case 'check':
      return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'none':
      return 'bg-gray-500/20 text-gray-400 border-gray-400';
      default:
      return 'bg-gray-500/20 text-gray-400 border-gray-400';,
}
  };

  const getTargetTypeText = (targetTypes: string[]) => { return targetTypes.map(type => {
      switch (type) {
        case 'single': return '单个目标';
        case 'self': return '自己';
        case 'multiple': return '多个目标';
        case 'all': return '所有人';
        default: return type;,
}
    }).join(', ');,
};

  const getPhaseText = (phases: string[]) => { return phases.map(phase => {
      switch (phase) {
        case 'day': return '白天';
        case 'evening': return '傍晚';
        case 'night': return '夜晚';
        case 'dawn': return '黎明';
        default: return phase;,
}
    }).join(', ');,
};

  const getFactionColor = (isWolfFaction: boolean) => { return isWolfFaction ? 'text-red-400' : 'text-blue-400';,
};

  if (!skillEffects && !roleAttributes) { return null;,
}

  return (;
    <Card className={ `bg-werewolf-dark/40 border-werewolf-purple/30 ${className }`}>;
    <CardHeader className='pb-2'>;
    <CardTitle className='text-sm text-werewolf-purple flex items-center justify-between'>;
    <span>{ roleName } 技能信息</span>
    { roleAttributes && (
      <Badge
      variant='outline';
      className={getFactionColor(roleAttributes.victory_condition.includes('狼人')) }
      >
      { roleAttributes.victory_condition.includes('狼人') ? '狼人阵营' : '好人阵营' }
      </Badge>
    )}
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-3'>;
    { skillEffects && (
      <div className='space-y-2'>;
      <div className='flex flex-wrap gap-1'>;
      {getSkillEffectTypes(skillEffects).map((effectType, index) => (;
        <Badge
        key={index }
        variant='outline';
        className={ `text-xs ${getSkillTypeColor(effectType) }`}
        >
        { getSkillIcon(effectType) }
        <span className='ml-1'>;
        { effectType === 'attack' ? '攻击' :;
        effectType === 'protect' ? '保护' :;
        effectType === 'check' ? '查看' :;
        effectType === 'none' ? '无技能' : effectType }
        </span>
        </Badge>
      ))}
      </div>

      <div className='text-xs text-gray-400 space-y-1'>;
      <div>目标类型: { getTargetTypeText(getSkillTargetTypes(skillEffects)) }</div>
      <div>发动阶段: { getPhaseText(skillEffects.active_phases) }</div>
      <div>优先级: { skillEffects.priority }</div>
      </div>
      </div>
    )}

    { roleAttributes && roleAttributes.special_abilities.length > 0 && (<div className='space-y-1'>;
      <div className='text-xs font-medium text-werewolf-purple'>特殊能力:</div>;
      {roleAttributes.special_abilities.map((ability, index) => (;
        <Badge
        key={index }
        variant='outline';
        className='text-xs bg-purple-500/20 text-purple-400 border-purple-400';
        >
        { ability }
        </Badge>
      ))}
      </div>
    )}
    </CardContent>
    </Card>
  );,
};

export default RoleSkillInfo;
