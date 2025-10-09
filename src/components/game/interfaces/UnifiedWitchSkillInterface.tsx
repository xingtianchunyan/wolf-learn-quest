import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle   } from '@/components/ui/dialog';
import { Heart, Skull, Target   } from 'lucide-react';
import { useWitchPotionManager   } from '@/hooks/useWitchPotionManager';
import React, { useState, useEffect   } from 'react';

/**
* 文件级注释：UnifiedWitchSkillInterface 组件
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
* @filepath game\interfaces\UnifiedWitchSkillInterface.tsx
 */
interface UnifiedWitchSkillInterfaceProps  { gameStateId: string;
  userId: string;
  currentRound: number;
  currentPhase: number;
  canUseSkill: boolean;
  onUseSkill: (skillData: any) => void;
  availableTargets: Array<{ userId: string; name: string; roleStatus: number  
}>
}

/**
* UnifiedWitchSkillInterface 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { UnifiedWitchSkillInterfaceProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useWitchPotionManager, useProtectionPotion, useAttackPotion
*
* @example
* // 使用示例
* <UnifiedWitchSkillInterface { ...props } />
 */
export const UnifiedWitchSkillInterface: React.FC<UnifiedWitchSkillInterfaceProps> = ( { gameStateId,
  userId,
  currentRound,
  currentPhase,
  canUseSkill,
  onUseSkill,
  availableTargets }) => { const [showTargetSelection, setShowTargetSelection] = useState(false);
  const [potionType, setPotionType] = useState<'attack' | 'protection'>('attack');

  const {
    potionStatus,
    loading,
    useProtectionPotion,
    useAttackPotion } = useWitchPotionManager(gameStateId, userId, currentRound);

  // 处理解药使用
/**
 * handleUseAntidote函数
 * 处理事件
 * @returns Promise<void>
 */
const handleUseAntidote = async () =>  { if (!canUseSkill || currentPhase !== 3 || potionStatus.protectionUsed) return;

    const success = await useProtectionPotion();
    if (success) {
      onUseSkill({
        skillType: 'protection',
        potionType: 'protection',
        effectType: 'witch_antidote' 
})
}
  };

  // 处理毒药使用
/**
 * handleUsePoison函数
 * 处理事件
 *
 * @param targetUserId? - targetUserId?参数
 * @returns void
 */
const handleUsePoison = (targetUserId?: string) =>  { if (!canUseSkill || currentPhase !== 3 || potionStatus.attackUsed) return;

    if (targetUserId) {
      // 直接使用毒药
      useAttackPotion(targetUserId).then(success => {
        if (success) {
          onUseSkill({
            skillType: 'elimination',
            targetId: targetUserId,
            potionType: 'attack',
            effectType: 'witch_poison' 
});
          setShowTargetSelection(false)
}
      })
} else { // 显示目标选择对话框
      setPotionType('attack');
      setShowTargetSelection(true)
}
  };

  return (;
    <>
    <Card className='bg-green-900/20 border-green-500/30'>;
    <CardHeader>
    <CardTitle className='flex items-center gap-2 text-green-400'>;
    <Heart className='w-5 h-5' />;
    女巫技能
    <Badge variant='default' className='ml-2 text-xs bg-green-600'>;
    夜晚专用
    </Badge>
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>;
    <div className='text-sm text-gray-300'>;
    <p>你拥有解药和毒药各一瓶，可以在夜晚使用。</p>
    <p className='text-green-400 mt-2'>• 解药：救活当晚死亡的玩家</p>;
    <p className='text-red-400'>• 毒药：毒死一名玩家</p>;
    <p className='text-yellow-400'>• 每种药剂最多使用一次</p>;
    </div>

    <div className='space-y-3'>;
    { /*  解药按钮  */ }
    <Button
    variant='outline';
    className={ `justify-start w-full border-green-500/30 hover:bg-green-500/20 ${
      potionStatus.protectionUsed ? 'opacity-50' : '' 
}`}
    onClick={ handleUseAntidote }
    disabled={ !canUseSkill || currentPhase !== 3 || potionStatus.protectionUsed || loading }
    >
    <Heart className='w-4 h-4 mr-2' />;
    解药
    { potionStatus.protectionUsed && (
      <Badge variant='secondary' className='ml-auto text-xs'>;
      已使用
      </Badge>
    ) }
    </Button>

    { /*  毒药按钮  */ }
    <Button
    variant='outline';
    className={ `justify-start w-full border-red-500/30 hover:bg-red-500/20 ${
      potionStatus.attackUsed ? 'opacity-50' : '' 
}`}
    onClick={ () => handleUsePoison() }
    disabled={ !canUseSkill || currentPhase !== 3 || potionStatus.attackUsed || loading || availableTargets.length === 0 }
    >
    <Skull className='w-4 h-4 mr-2' />;
    毒药
    { potionStatus.attackUsed && (
      <Badge variant='secondary' className='ml-auto text-xs'>;
      已使用
      </Badge>
    ) }
    </Button>
    </div>
    </CardContent>
    </Card>

    { /*  目标选择对话框  */ }
    <Dialog open={ showTargetSelection } onOpenChange={ setShowTargetSelection }>;
    <DialogContent className='bg-werewolf-dark border-werewolf-purple/30'>;
    <DialogHeader>
    <DialogTitle className='text-red-400'>;
    <Skull className='w-5 h-5 inline mr-2' />;
    选择毒药目标
    </DialogTitle>
    </DialogHeader>
    <div className='space-y-3'>;
    <p className='text-sm text-gray-300'>选择要毒杀的目标玩家：</p>;
    <div className='grid grid-cols-1 gap-2'>;
    { availableTargets.map(target => (;
      <Button
      key={target.userId }
      variant='outline';
      className='justify-start border-red-500/30 hover:bg-red-500/20';
      onClick={ () => handleUsePoison(target.userId) }
      disabled={ loading }
      >
      <Target className='w-4 h-4 mr-2' />;
      毒杀 { target.name }
      </Button>
    ))}
    </div>
    </div>
    </DialogContent>
    </Dialog>
    </>
  )
};

/**
 * UnifiedWitchSkillInterface组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default UnifiedWitchSkillInterface;