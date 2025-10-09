import { AlertTriangle, Zap, Shield, Target, Clock   } from 'lucide-react';
import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { createLogger   } from '@/lib/logger';
import { ScrollArea   } from '@/components/ui/scroll-area';
import { Separator   } from '@/components/ui/separator';
import { supabase   } from '@/integrations/supabase/client';
import { toPhaseName   } from '@/utils/phaseUtils';
import React, { useState, useEffect   } from 'react';
import type { SkillConflictData, ConflictingSkill   } from '@/types/skill.types';

/**
* 文件级注释：SkillConflictResolver 组件
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
* @filepath game\interfaces\SkillConflictResolver.tsx
 */

const logger = createLogger('skill-conflict-resolver');

// 类型别名用于组件内部
type SkillConflict = SkillConflictData;

interface SkillConflictResolverProps { gameStateId: string;
  currentRound: number;
  currentPhase: number;
  isJudge: boolean;
  onConflictResolved?: (conflictId: string) => void
}

/**
* SkillConflictResolver 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { SkillConflictResolverProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect
*
* @example
* // 使用示例
* <SkillConflictResolver { ...props } />
 */
export const SkillConflictResolver: React.FC<SkillConflictResolverProps> = ( { gameStateId,
  currentRound,
  currentPhase,
  isJudge,
  onConflictResolved }) => { const [conflicts, setConflicts] = useState<SkillConflict[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingConflictId, setProcessingConflictId] = useState<string | null>(null);

  // 获取技能冲突记录
  useEffect(() => {
/**
 * fetchConflicts函数
 * 获取远程数据
 * @returns Promise<void>
 */
const fetchConflicts = async () =>  {
      const { data, error  } = await supabase;
      .from('skill_conflicts')
      .select('*')
      .eq('game_state_id', gameStateId)
      .order('created_at', { ascending: false  
});

      if (error) { logger.error('Error fetching skill conflicts:', error)
} else if (data) { setConflicts(data as unknown as SkillConflict[])
}
    };

    fetchConflicts()
}, [gameStateId]);

  // 实时监听冲突变化
  useEffect(() => { const channel = supabase;
    .channel(`skill_conflicts_${gameStateId }`)
    .on(
      'postgres_changes',
      { event: '*',
        schema: 'public',
        table: 'skill_conflicts',
        filter: `game_state_id=eq.${gameStateId 
}` },
      payload => { if (payload.new && typeof payload.new === 'object') {
          const newConflict = payload.new as SkillConflict;
          if (payload.eventType === 'INSERT') {
            setConflicts(current => [newConflict, ...current])
} else if (payload.eventType === 'UPDATE') { setConflicts(current =>;
            current.map(c => c.id === newConflict.id ? newConflict : c);
          )
}
      } }
  )
  .subscribe();

  return () => {
  supabase.removeChannel(channel)
}

}, [gameStateId]);

// 检测技能冲突
/**
 * detectConflicts函数
 * detectConflicts函数的功能描述
 * @returns Promise<void>
 */
const detectConflicts = async () =>  { setLoading(true);
  try {
    const { data, error  } = await supabase.rpc('detect_skill_conflicts', { p_game_state_id: gameStateId,
      p_round_number: currentRound,
      p_phase: toPhaseName(currentPhase as 1 | 2 | 3 | 4) 
});

    if (error) { logger.error('Error detecting conflicts:', error)
} else if (data) { logger.debug('Conflicts detected:', data)
}
  } catch (error) { logger.error('Error detecting conflicts:', error)
} finally { setLoading(false)
}
};

// 手动解决冲突
/**
 * resolveConflict函数
 * resolveConflict函数的功能描述
 *
 * @param conflictId - conflictId参数
 * @param resolvedSkillId - resolvedSkillId参数
 * @returns Promise<void>
 */
const resolveConflict = async (conflictId: string, resolvedSkillId: string) =>  { setProcessingConflictId(conflictId);
  try {
    const { error  } = await supabase;
    .from('skill_conflicts')
    .update({ resolved_skill_id: resolvedSkillId,
      resolution_rule: 'manual' 
})
    .eq('id', conflictId);

    if (error) { logger.error('Error resolving conflict:', error)
} else { onConflictResolved?.(conflictId)
}
  } catch (error) { logger.error('Error resolving conflict:', error)
} finally { setProcessingConflictId(null)
}
};

// 获取技能优先级颜色
/**
 * getPriorityColor函数
 * 获取数据
 *
 * @param priority - priority参数
 * @returns void
 */
const getPriorityColor = (priority: number) =>  {
  if (priority <= 50) return 'text-red-400';
  if (priority <= 100) return 'text-yellow-400';
  return 'text-green-400'

};

// 获取解决规则文本
/**
 * getResolutionRuleText函数
 * 获取数据
 *
 * @param rule - rule参数
 * @returns void
 */
const getResolutionRuleText = (rule: string) => { switch (rule)  {
    case 'priority':
    return '按优先级解决';
    case 'manual':
    return '手动解决';
    case 'random':
    return '随机解决';
    default: return '未知规则'
}
};

const currentPhaseConflicts = conflicts.filter(;
  c => c.round_number === currentRound && c.phase === toPhaseName(currentPhase as 1 | 2 | 3 | 4);
);

return (;
  <Card className='bg-werewolf-card border-werewolf-purple/30'>;
  <CardHeader>
  <CardTitle className='flex items-center justify-between text-werewolf-purple'>;
  <div className='flex items-center gap-2'>;
  <AlertTriangle className='w-5 h-5' />;
  技能冲突解决
  </div>
  { isJudge && (
    <Button
    onClick={detectConflicts }
    disabled={ loading }
    size='sm';
    variant='outline';
    className='border-werewolf-purple/30 hover:bg-werewolf-purple/20';
    >
    { loading ? (
      <>
      <Clock className='w-4 h-4 mr-2 animate-spin' />;
      检测中...
      </>
    ) : (
      <>
      <Zap className='w-4 h-4 mr-2' />;
      检测冲突
      </>
    ) }
    </Button>
  )}
  </CardTitle>
  </CardHeader>
  <CardContent className='space-y-4'>;
  { /*  当前回合冲突  */
} { currentPhaseConflicts.length > 0 ? (
    <div className='space-y-3'>;
    <h4 className='text-sm font-medium text-yellow-400 flex items-center gap-2'>;
    <AlertTriangle className='w-4 h-4' />;
    当前回合冲突 (第{currentRound }轮 - { toPhaseName(currentPhase as 1 | 2 | 3 | 4) })
    </h4>

    { currentPhaseConflicts.map(conflict => (;
      <Card key={conflict.id } className='bg-yellow-500/10 border-yellow-500/30'>;
      <CardContent className='p-4 space-y-3'>;
      <div className='flex items-center justify-between'>;
      <Badge variant='outline' className='border-yellow-500 text-yellow-400'>;
      冲突 #{ conflict.id.slice(-8) }
      </Badge>
      <Badge variant='secondary'>;
      { getResolutionRuleText(conflict.resolution_rule) }
      </Badge>
      </div>

      { /*  冲突技能列表  */ }
      <div className='space-y-2'>;
      <h5 className='text-xs font-medium text-gray-300'>冲突技能:</h5>;
      <ScrollArea className='h-32'>;
      <div className='space-y-2'>;
      { (Array.isArray(conflict.conflicting_skills) ? conflict.conflicting_skills : []).map((skill: ConflictingSkill, index: number) => (;
        <div
        key={index }
        className={ `p-2 rounded border transition-all ${
          skill.skill_use_id === conflict.resolved_skill_id;
          ? 'bg-green-500/20 border-green-500/50'
          : 'bg-werewolf-dark/50 border-werewolf-purple/30' 
}`}
        >
        <div className='flex items-center justify-between'>;
        <div className='flex items-center gap-2'>;
        <Target className='w-3 h-3' />;
        <span className='text-xs font-medium'>;
        { skill.skill_name }
        </span>
        </div>
        <div className='flex items-center gap-2'>;
        <span className={ `text-xs ${getPriorityColor(skill.priority) }`}>;
        优先级: { skill.priority 
}
        </span>
        { skill.skill_use_id === conflict.resolved_skill_id && (;
          <Badge variant='default' className='text-xs'>;
          已选中
          </Badge>
        ) }
        </div>
        </div>

        { isJudge && !conflict.resolved_skill_id && (<Button
          onClick={() => resolveConflict(conflict.id, skill.skill_use_id) }
          disabled={ processingConflictId === conflict.id }
          size='sm';
          variant='outline';
          className='mt-2 w-full text-xs';
          >
          { processingConflictId === conflict.id ? '处理中...' : '选择此技能' 
}
          </Button>
        )}
        </div>
      ))}
      </div>
      </ScrollArea>
      </div>

      { conflict.resolved_skill_id && (
        <div className='flex items-center gap-2 text-green-400 text-xs'>;
        <Shield className='w-3 h-3' />;
        冲突已解决
        </div>
      ) }
      </CardContent>
      </Card>
    ))}
    </div>
  ) : (
    <div className='text-center py-4'>;
    <Shield className='w-8 h-8 mx-auto mb-2 text-green-400' />;
    <p className='text-sm text-green-400'>当前回合无技能冲突</p>;
    </div>
  )}

  <Separator className='bg-werewolf-purple/30' />;

  { /*  历史冲突  */ }
  <div className='space-y-2'>;
  <h4 className='text-sm font-medium text-werewolf-purple'>历史冲突记录</h4>;
  <ScrollArea className='h-32'>;
  <div className='space-y-1'>;
  { conflicts.filter(c => !(c.round_number === currentRound && c.phase === toPhaseName(currentPhase as 1 | 2 | 3 | 4))).length > 0 ? (;
    conflicts
    .filter(c => !(c.round_number === currentRound && c.phase === toPhaseName(currentPhase as 1 | 2 | 3 | 4)));
    .slice(0, 5)
    .map(conflict => (;
      <div key={conflict.id } className='flex items-center justify-between p-2 bg-werewolf-dark/30 rounded text-xs'>;
      <span className='text-gray-300'>;
      第{ conflict.round_number }轮 - { conflict.phase }
      </span>
      <div className='flex items-center gap-2'>;
      <Badge variant='outline' className='text-xs'>;
      { (Array.isArray(conflict.conflicting_skills) ? conflict.conflicting_skills.length : 0) 
} 个冲突
      </Badge>
      <Badge
      variant={ conflict.resolved_skill_id ? 'default' : 'secondary' 
}
      className='text-xs';
      >
      { conflict.resolved_skill_id ? '已解决' : '未解决' 
}
      </Badge>
      </div>
      </div>
    ))
  ) : (
    <p className='text-xs text-gray-400 text-center py-2'>暂无历史冲突记录</p>;
  )}
  </div>
  </ScrollArea>
  </div>

  { /*  冲突解决说明  */ }
  <div className='bg-werewolf-dark/30 p-3 rounded-lg'>;
  <h5 className='text-xs font-medium text-werewolf-purple mb-2'>冲突解决规则</h5>;
  <div className='text-xs text-gray-400 space-y-1'>;
  <p>• 优先级低的技能优先执行（数字越小优先级越高）</p>
  <p>• 相同优先级时按技能类型解决冲突</p>
  <p>• 法官可以手动选择执行的技能</p>
  </div>
  </div>
  </CardContent>
  </Card>
)
};

/**
 * SkillConflictResolver组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default SkillConflictResolver;