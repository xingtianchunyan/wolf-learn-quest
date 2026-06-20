
// 技能效果管理工具函数

export interface SkillEffectConfig {
  type: string;
  priority: number;
  duration?: number;
  conditions?: any;
  data: any;
}

// 预定义的技能效果配置
export const SKILL_EFFECT_CONFIGS = {
  // 狼人击杀
  werewolf_kill: {
    type: 'elimination',
    priority: 90,
    data: {
      effect_type: 'kill',
      can_be_protected: true
    }
  },
  
  // 女巫毒药
  witch_poison: {
    type: 'elimination',
    priority: 85,
    data: {
      effect_type: 'poison',
      can_be_protected: false
    }
  },
  
  // 女巫解药
  witch_antidote: {
    type: 'protection',
    priority: 95,
    duration: 86400, // 24小时
    data: {
      effect_type: 'heal',
      protection_type: 'antidote'
    }
  },
  
  // 守卫保护
  guard_protect: {
    type: 'protection',
    priority: 80,
    duration: 43200, // 12小时
    data: {
      effect_type: 'guard',
      protection_type: 'guard'
    }
  },
  
  // 预言家查验
  seer_investigation: {
    type: 'investigation',
    priority: 70,
    data: {
      effect_type: 'identity_check',
      reveal_faction: true
    }
  },
  
  // 猎人反击
  hunter_revenge: {
    type: 'elimination',
    priority: 100, // 最高优先级
    data: {
      effect_type: 'revenge_kill',
      can_be_protected: false
    }
  }
};

// 创建技能效果
export const createSkillEffect = (
  skillName: string,
  targetUserId?: string,
  customData: any = {}
): SkillEffectConfig | null => {
  const config = SKILL_EFFECT_CONFIGS[skillName as keyof typeof SKILL_EFFECT_CONFIGS];
  
  if (!config) {
    console.warn(`未找到技能 ${skillName} 的效果配置`);
    return null;
  }
  
  return {
    ...config,
    data: {
      ...config.data,
      ...customData,
      target_user_id: targetUserId
    }
  };
};

// 检查技能效果冲突
export const checkEffectConflicts = (
  effects: SkillEffectConfig[]
): { conflicts: boolean; resolution: any } => {
  // 按优先级排序
  const sortedEffects = [...effects].sort((a, b) => b.priority - a.priority);
  
  // 检查保护效果 vs 伤害效果
  const protectionEffects = sortedEffects.filter(e => e.type === 'protection');
  const eliminationEffects = sortedEffects.filter(e => e.type === 'elimination');
  
  const conflicts: any[] = [];
  
  eliminationEffects.forEach(elimination => {
    const targetId = elimination.data.target_user_id;
    const protection = protectionEffects.find(p => 
      p.data.target_user_id === targetId && 
      p.priority >= elimination.priority &&
      elimination.data.can_be_protected !== false
    );
    
    if (protection) {
      conflicts.push({
        type: 'protection_vs_elimination',
        protection,
        elimination,
        resolution: 'protection_wins'
      });
    }
  });
  
  return {
    conflicts: conflicts.length > 0,
    resolution: conflicts
  };
};

// 应用技能效果解决方案
export const resolveSkillEffects = (
  effects: SkillEffectConfig[]
): SkillEffectConfig[] => {
  const { conflicts, resolution } = checkEffectConflicts(effects);
  
  if (!conflicts) {
    return effects;
  }
  
  let resolvedEffects = [...effects];
  
  resolution.forEach((conflict: any) => {
    if (conflict.resolution === 'protection_wins') {
      // 移除被保护的伤害效果
      resolvedEffects = resolvedEffects.filter(e => 
        e !== conflict.elimination
      );
      
      // 保留保护效果
    }
  });
  
  return resolvedEffects;
};

// 格式化技能效果描述
export const formatSkillEffectDescription = (effect: SkillEffectConfig): string => {
  const { type, data } = effect;
  
  switch (type) {
    case 'elimination':
      return `淘汰效果 (${data.effect_type})`;
    case 'protection':
      return `保护效果 (${data.protection_type})`;
    case 'investigation':
      return `调查效果 (${data.effect_type})`;
    case 'status_change':
      return `状态变更效果`;
    default:
      return `未知效果 (${type})`;
  }
};

// 计算技能效果持续时间
export const calculateEffectDuration = (
  effect: SkillEffectConfig,
  gamePhase: string
): number => {
  if (effect.duration) {
    return effect.duration;
  }
  
  // 根据游戏阶段计算默认持续时间
  switch (effect.type) {
    case 'protection':
      return gamePhase === 'night' ? 43200 : 21600; // 夜晚12小时，白天6小时
    case 'investigation':
      return 0; // 即时效果
    case 'elimination':
      return 0; // 即时效果
    default:
      return 3600; // 默认1小时
  }
};

// 验证技能使用条件
export const validateSkillConditions = (
  skillName: string,
  userId: string,
  targetUserId: string | undefined,
  gameState: any,
  roleState: any
): { valid: boolean; reason?: string } => {
  // 基础验证
  if (!userId || !gameState || !roleState) {
    return { valid: false, reason: '缺少必要的游戏信息' };
  }
  
  // 角色状态验证
  if (roleState.role_status !== 1) { // 必须是正常状态
    return { valid: false, reason: '角色状态不允许使用技能' };
  }
  
  // 技能特定验证
  switch (skillName) {
    case 'werewolf_kill':
      if (!targetUserId) {
        return { valid: false, reason: '必须选择攻击目标' };
      }
      if (gameState.current_phase !== 3) { // 必须是夜晚
        return { valid: false, reason: '狼人只能在夜晚行动' };
      }
      break;
      
    case 'seer_investigation':
      if (!targetUserId) {
        return { valid: false, reason: '必须选择调查目标' };
      }
      if (gameState.current_phase !== 3) { // 必须是夜晚
        return { valid: false, reason: '预言家只能在夜晚查验' };
      }
      break;
      
    case 'guard_protect':
      if (!targetUserId) {
        return { valid: false, reason: '必须选择保护目标' };
      }
      if (gameState.current_phase !== 3) { // 必须是夜晚
        return { valid: false, reason: '守卫只能在夜晚保护' };
      }
      break;
      
    case 'hunter_revenge':
      if (!targetUserId) {
        return { valid: false, reason: '必须选择反击目标' };
      }
      if (roleState.role_status !== 2) { // 必须是濒死状态
        return { valid: false, reason: '猎人只能在濒死时反击' };
      }
      break;
  }
  
  return { valid: true };
};
