import { Badge   } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { Clock, Zap, Users, Target, AlertCircle   } from 'lucide-react';
import { formatVoteTime   } from '@/utils/votingSystemHelpers';
import { Progress   } from '@/components/ui/progress';
import { useEnhancedSkillSystem   } from '@/hooks/useEnhancedSkillSystem';
import React from 'react';

/**
* 文件级注释：SkillEffectsDisplay 组件
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
* @filepath game\displays\SkillEffectsDisplay.tsx
 */
interface SkillEffectsDisplayProps  { roomId: string;
  gameStateId: string;
  players: Array<{ userId: string; name: string; roleStatus: number  
}>
}

/**
* SkillEffectsDisplay 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { SkillEffectsDisplayProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useEnhancedSkillSystem
*
* @example
* // 使用示例
* <SkillEffectsDisplay { ...props } />
 */
const SkillEffectsDisplay: React.FC<SkillEffectsDisplayProps> = ( { roomId,
  gameStateId,
  players }) => { const {
    skillEffectsQueue,
    skillTargets,
    loading: _loading 
} = useEnhancedSkillSystem(roomId, gameStateId);

  // 获取活跃的技能效果
  const _activeEffects = skillTargets.filter(target => target.is_active);

  // 获取排队中的技能效果
  const queuedEffects = skillEffectsQueue.filter(effect =>;
  effect.status === 'queued' || effect.status === 'processing';
);

// 按目标用户分组效果
const _effectsByUser = _activeEffects.reduce((acc, effect) => { const userId = effect.target_user_id;
  if (!userId) return acc;

  if (!acc[userId]) {
    acc[userId] = []
}
  acc[userId].push(effect);
  return acc
}, {} as Record<string, typeof _activeEffects>);

/**
 * getPlayerName函数
 * 获取数据
 *
 * @param userId - userId参数
 * @returns void
 */
const getPlayerName = (userId: string) =>  {
  return players.find(p => p.userId === userId)?.name || '未知玩家'

};

/**
 * getEffectColor函数
 * 获取数据
 *
 * @param effectType - effectType参数
 * @returns void
 */
const getEffectColor = (effectType: string) => { switch (effectType)  {
    case 'protection': return 'bg-green-500';
    case 'elimination': return 'bg-red-500';
    case 'investigation': return 'bg-blue-500';
    case 'status_change': return 'bg-yellow-500';
    default: return 'bg-gray-500'
}
};

/**
 * getStatusColor函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusColor = (status: string) => { switch (status)  {
    case 'queued': return 'bg-yellow-500';
    case 'processing': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'failed': return 'bg-red-500';
    case 'cancelled': return 'bg-gray-500';
    default: return 'bg-gray-400'
}
};

/**
 * getRemainingTime函数
 * 获取数据
 *
 * @param endTime - endTime参数
 * @returns void
 */
const getRemainingTime = (endTime: string) =>  { const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const remaining = Math.max(0, end - now);

  if (remaining === 0) return '已过期';

  const minutes = Math.floor(remaining / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return `${minutes }:${ seconds.toString().padStart(2, '0') }`
};

/**
 * getProgressPercentage函数
 * 获取数据
 *
 * @param startTime - startTime参数
 * @param endTime? - endTime?参数
 * @returns void
 */
const getProgressPercentage = (startTime: string, endTime?: string) =>  {
  if (!endTime) return 100;

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();

  const total = end - start;
  const elapsed = now - start;

  return Math.max(0, Math.min(100, (elapsed / total) * 100))

};

return (;
  <div className='space-y-4'>;
  { /*  技能效果队列  */ }
  <Card>
  <CardHeader>
  <CardTitle className='flex items-center gap-2'>;
  <Clock className='w-4 h-4' />;
  技能效果队列
  { queuedEffects.length > 0 && (
    <Badge variant='secondary'>{queuedEffects.length }</Badge>;
  )}
  </CardTitle>
  </CardHeader>
  <CardContent>
  { queuedEffects.length > 0 ? (<div className='space-y-2'>;
    {queuedEffects
    .sort((a, b) => a.priority - b.priority);
    .map(effect => (;
      <div
      key={effect.id }
      className='flex items-center justify-between p-3 border rounded';
      >
      <div className='flex items-center gap-3'>;
      <div className='flex items-center gap-2'>;
      <Zap className='w-4 h-4' />;
      <span className='font-medium'>{ effect.effect_type }</span>;
      </div>
      <Badge variant='outline'>优先级 { effect.priority }</Badge>;
      </div>
      <div className='flex items-center gap-2'>;
      { effect.trigger_time && (
        <span className='text-sm text-muted-foreground'>;
        {formatVoteTime(effect.trigger_time) }
        </span>
      )}
      <Badge className={ getStatusColor(effect.status) }>;
      { effect.status }
      </Badge>
      </div>
      </div>
    ))}
    </div>
  ) : (
    <p className='text-sm text-muted-foreground'>当前没有排队的技能效果</p>;
  )}
  </CardContent>
  </Card>

  { /*  移除当前技能效果显示 - 根据需求第4点删除  */ }
  </div>
)
};

/**
 * SkillEffectsDisplay组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default SkillEffectsDisplay;
