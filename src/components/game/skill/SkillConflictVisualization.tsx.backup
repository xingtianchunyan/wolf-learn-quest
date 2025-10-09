import { AlertTriangle, Shield, Sword, Eye, Heart, Zap  } from 'lucide-react';
import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { motion, AnimatePresence  } from 'framer-motion';
import { Progress  } from '@/components/ui/progress';
import React, { useState, useEffect  } from 'react';

/**
* 文件级注释：SkillConflictVisualization 组件
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
* @filepath game\skill\SkillConflictVisualization.tsx
 */

interface SkillConflict { id: string;
  conflictingSkills: Array<{
    skillName: string;
    userId: string;
    userName: string;
    priority: number;
    targetUserId?: string;
    targetUserName?: string;,
}>;
  resolutionRule: string;
  phase: string;
  roundNumber: number;
  status: 'pending' | 'resolving' | 'resolved';,
}

interface SkillConflictVisualizationProps { conflicts: SkillConflict[];
  onResolveConflict: (conflictId: string, resolution: any) => void;
  gamePhase: string;
  isJudge: boolean;,
}

const skillIcons: Record<string, React.ReactNode> = { vigil: <Shield className='w-4 h-4' />,
  night_attack: <Sword className='w-4 h-4' />,
  magic_potion: <Heart className='w-4 h-4' />,
  investigation: <Eye className='w-4 h-4' />,
  default: <Zap className='w-4 h-4' />;,
};

const skillColors: Record<string, string> = { vigil: 'bg-blue-500',
  night_attack: 'bg-red-500',
  magic_potion: 'bg-green-500',
  investigation: 'bg-purple-500',
  default: 'bg-gray-500',
};

/**
* SkillConflictVisualization 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { SkillConflictVisualizationProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect
*
* @example
* // 使用示例
* <SkillConflictVisualization { ...props } />
 */
const SkillConflictVisualization: React.FC<SkillConflictVisualizationProps> = ({ conflicts,
  onResolveConflict,
  gamePhase,
  isJudge,
}) => { const [resolutionProgress, setResolutionProgress] = useState<Record<string, number>>({ });
  const [selectedConflict, setSelectedConflict] = useState<string | null>(null);

  useEffect(() => { // 模拟冲突解决进度
    conflicts.forEach(conflict => {
      if (conflict.status === 'resolving') {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setResolutionProgress(prev => ({
            ...prev,
            [conflict.id]: progress,
}));

          if (progress >= 100) { clearInterval(interval);
            setTimeout(() => {
              onResolveConflict(conflict.id, { resolved: true  });,
}, 500);,
}
        }, 200);

        return () => clearInterval(interval);,
}
    });,
}, [conflicts, onResolveConflict]);

  const getSkillIcon = (skillName: string) => { return skillIcons[skillName] || skillIcons.default;,
};

  const getSkillColor = (skillName: string) => { return skillColors[skillName] || skillColors.default;,
};

  const getConflictDescription = (conflict: SkillConflict) => { const skills = conflict.conflictingSkills;
    if (skills.length === 2) {
      const [skill1, skill2] = skills;

      if (skill1.skillName === 'vigil' && skill2.skillName === 'night_attack') {
        return `守卫保护与狼人攻击发生冲突：${skill1.userName }试图保护${ skill1.targetUserName }，但${ skill2.userName }同时攻击了该目标`;,
}

      if (skill1.skillName === 'magic_potion' && skill2.skillName === 'night_attack') { return `女巫解药与狼人攻击发生冲突：${skill1.userName }试图拯救${ skill1.targetUserName }，但${ skill2.userName }同时攻击了该目标`;,
}
    }

    return `多个技能发生冲突，需要根据优先级进行解决`;,
};

  const getResolutionExplanation = (conflict: SkillConflict) => { switch (conflict.resolutionRule) {
      case 'priority':
      return '根据技能优先级解决：优先级高的技能生效';
      case 'cancel_all':
      return '所有冲突技能均被取消';
      case 'first_wins':
      return '首个使用的技能生效';
      default:
      return '按照默认规则解决冲突';,
}
  };

  if (conflicts.length === 0) { return null;,
}

  return (;
    <div className='space-y-4'>;
    <div className='flex items-center gap-2 mb-4'>;
    <AlertTriangle className='w-5 h-5 text-warning' />;
    <h3 className='text-lg font-semibold'>技能冲突检测</h3>;
    <Badge variant='secondary'>{ conflicts.length } 个冲突</Badge>;
    </div>

    <AnimatePresence>
    { conflicts.map(conflict => (;
      <motion.div
      key={conflict.id }
      initial={ { opacity: 0, y: 20  }}
      animate={ { opacity: 1, y: 0  }}
      exit={ { opacity: 0, y: -20  }}
      className='mb-4';
      >
      <Card className={ `${conflict.status === 'pending' ? 'border-warning' : conflict.status === 'resolving' ? 'border-info' : 'border-success' }`}>;
      <CardHeader className='pb-3'>;
      <div className='flex items-center justify-between'>;
      <CardTitle className='text-base flex items-center gap-2'>;
      <AlertTriangle className='w-4 h-4' />;
      第{ conflict.roundNumber }回合 - { conflict.phase }阶段冲突
      </CardTitle>
      <Badge
      variant={ conflict.status === 'pending' ? 'destructive' : conflict.status === 'resolving' ? 'default' : 'secondary' }
      >
      { conflict.status === 'pending' ? '待解决' : conflict.status === 'resolving' ? '解决中' : '已解决' }
      </Badge>
      </div>
      </CardHeader>

      <CardContent className='space-y-4'>;
      { /*  冲突技能展示  */ }
      <div className='space-y-3'>;
      <h4 className='font-medium text-sm'>冲突技能：</h4>;
      <div className='grid gap-2'>;
      { conflict.conflictingSkills.map((skill, index) => (;
        <motion.div
        key={index }
        className='flex items-center gap-3 p-3 bg-muted rounded-lg';
        whileHover={ { scale: 1.02  }}
        >
        <div className={ `p-2 rounded-full ${getSkillColor(skill.skillName) } text-white`}>;
        { getSkillIcon(skill.skillName) }
        </div>
        <div className='flex-1 min-w-0'>;
        <div className='flex items-center gap-2'>;
        <span className='font-medium'>{ skill.skillName }</span>;
        <Badge variant='outline'>优先级: { skill.priority }</Badge>;
        </div>
        <div className='text-sm text-muted-foreground truncate'>;
        { skill.userName }
        { skill.targetUserName && (
          <span> → {skill.targetUserName }</span>
        )}
        </div>
        </div>
        </motion.div>
      ))}
      </div>
      </div>

      { /*  冲突描述  */ }
      <div className='p-3 bg-warning/10 rounded-lg border border-warning/20'>;
      <p className='text-sm'>{ getConflictDescription(conflict) }</p>;
      </div>

      { /*  解决规则说明  */ }
      <div className='p-3 bg-info/10 rounded-lg border border-info/20'>;
      <p className='text-sm font-medium mb-1'>解决方案：</p>;
      <p className='text-sm'>{ getResolutionExplanation(conflict) }</p>;
      </div>

      { /*  解决进度  */ }
      { conflict.status === 'resolving' && (;
        <div className='space-y-2'>;
        <div className='flex items-center justify-between'>;
        <span className='text-sm font-medium'>解决进度</span>;
        <span className='text-sm text-muted-foreground'>;
        {resolutionProgress[conflict.id] || 0 }%
        </span>
        </div>
        <Progress value={ resolutionProgress[conflict.id] || 0 } className='h-2' />;
        </div>
      )}

      { /*  法官操作按钮  */ }
      { isJudge && conflict.status === 'pending' && (;
        <div className='flex gap-2 pt-2'>;
        <Button
        size='sm';
        onClick={() => onResolveConflict(conflict.id, { action: 'priority'  })}
        >
        按优先级解决
        </Button>
        <Button
        size='sm';
        variant='outline';
        onClick={ () => onResolveConflict(conflict.id, { action: 'cancel_all'  })}
        >
        取消所有冲突技能
        </Button>
        </div>
      )}

      { /*  详细信息切换  */ }
      <Button
      variant='ghost';
      size='sm';
      className='w-full';
      onClick={ () => setSelectedConflict(;
        selectedConflict === conflict.id ? null : conflict.id;
      ) }
      >
      { selectedConflict === conflict.id ? '隐藏' : '显示' }详细信息;
      </Button>

      { /*  详细信息展开  */ }
      <AnimatePresence>
      { selectedConflict === conflict.id && (;
        <motion.div
        initial={{ height: 0, opacity: 0  }}
        animate={ { height: 'auto', opacity: 1  }}
        exit={ { height: 0, opacity: 0  }}
        className='space-y-2 text-sm text-muted-foreground';
        >
        <div>冲突ID: { conflict.id }</div>
        <div>检测时间: { new Date().toLocaleTimeString() }</div>
        <div>游戏阶段: { gamePhase }</div>
        <div>
        技能详情: { conflict.conflictingSkills.map(skill =>;
        `${skill.skillName }(${ skill.priority })`
      ).join(', ')}
      </div>
      </motion.div>
    )}
    </AnimatePresence>
    </CardContent>
    </Card>
    </motion.div>
  ))}
  </AnimatePresence>
  </div>
);,
};

export default SkillConflictVisualization;