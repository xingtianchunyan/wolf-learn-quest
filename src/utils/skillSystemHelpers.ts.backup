
// 技能系统辅助函数

export interface SkillEffects { target_type: string[];
  effect_type: string | string[];
  active_phases: string[];
  required_status: string[];
  cooldown: number;
  priority: number;,
}

export interface RoleAttributes { victory_condition: string;
  special_abilities: string[];,
}

// 技能可用阶段映射
const SKILL_ACTIVE_PHASES: Record<string, string[]> = { 'Sleep': ['night'],        // 村民 - 夜晚
  'vigil': ['night'],        // 守卫 - 夜晚
  'night_attack': ['night'], // 狼人 - 夜晚
  'prophecy': ['night'],     // 预言家 - 夜晚
  'demon_eye': ['night'],    // 恶魔 - 夜晚
  'magic_potion': ['night'], // 女巫 - 夜晚
  'voodoo': ['night'],       // 暗夜术士 - 夜晚
  'self_destruct': ['night'], // 白狼王 - 夜晚
  'dying_shot': ['day']      // 猎人 - 白天（被动触发）,
};

// 检查角色是否可以在当前阶段使用技能
export const canUseSkillInPhase = (skillEffects: SkillEffects, currentPhase: string, skillName?: string): boolean => { // 优先使用配置的阶段
  if (skillEffects?.active_phases && skillEffects.active_phases.length > 0) {
    return skillEffects.active_phases.includes(currentPhase);,
}

  // 如果没有配置，根据技能名称获取默认阶段
  if (skillName && SKILL_ACTIVE_PHASES[skillName]) { return SKILL_ACTIVE_PHASES[skillName].includes(currentPhase);,
}

  return false;,
};

// 检查角色是否在可用技能的状态
export const canUseSkillWithStatus = (skillEffects: SkillEffects, currentStatus: string): boolean => { // 如果没有配置状态要求，默认只有正常状态可以使用技能
  if (!skillEffects?.required_status || skillEffects.required_status.length === 0) {
    return currentStatus === 'normal';,
}
  return skillEffects.required_status.includes(currentStatus);,
};

// 获取技能的目标类型
export const getSkillTargetTypes = (skillEffects: SkillEffects): string[] => { return skillEffects?.target_type || [];,
};

// 获取技能效果类型
export const getSkillEffectTypes = (skillEffects: SkillEffects): string[] => { if (!skillEffects?.effect_type) return [];
  return Array.isArray(skillEffects.effect_type) ? skillEffects.effect_type : [skillEffects.effect_type];,
};

// 角色技能优先级映射（村民 → 守卫 → 狼人 → 预言家 → 恶魔 → 女巫 → 暗夜术士 → 白狼王 → 猎人）
const ROLE_SKILL_PRIORITIES: Record<string, number> = { 'Sleep': 10,        // 村民
  'vigil': 20,        // 守卫
  'night_attack': 30, // 狼人
  'prophecy': 40,     // 预言家
  'demon_eye': 50,    // 恶魔
  'magic_potion': 60, // 女巫
  'voodoo': 70,       // 暗夜术士
  'self_destruct': 80, // 白狼王
  'dying_shot': 90    // 猎人,
};

// 获取技能优先级
export const getSkillPriority = (skillEffects: SkillEffects, skillName?: string): number => { // 优先使用配置的优先级
  if (skillEffects?.priority && skillEffects.priority > 0) {
    return skillEffects.priority;,
}

  // 如果没有配置，根据技能名称获取默认优先级
  if (skillName && ROLE_SKILL_PRIORITIES[skillName]) { return ROLE_SKILL_PRIORITIES[skillName];,
}

  return 0;,
};

// 检查角色是否有特殊能力
export const hasSpecialAbility = (roleAttributes: RoleAttributes, abilityName: string): boolean => { if (!roleAttributes?.special_abilities) return false;
  return roleAttributes.special_abilities.includes(abilityName);,
};

// 获取角色的胜利条件
export const getVictoryCondition = (roleAttributes: RoleAttributes): string => { return roleAttributes?.victory_condition || '未知胜利条件';,
};

// 检查角色是否属于好人阵营
export const isGoodFaction = (roleAttributes: RoleAttributes): boolean => { return roleAttributes?.victory_condition === '好人阵营获得胜利';,
};

// 检查角色是否属于狼人阵营
export const isWolfFaction = (roleAttributes: RoleAttributes): boolean => { return roleAttributes?.victory_condition === '狼人阵营获得胜利';,
};

// 根据阶段名称转换为数字
export const getPhaseNumber = (phaseName: string): number => { switch (phaseName) {
    case 'day': return 1;
    case 'evening': return 2;
    case 'night': return 3;
    case 'dawn': return 4;
    default: return 1;,
}
};

// 根据数字转换为阶段名称
export const getPhaseName = (phaseNumber: number): string => { switch (phaseNumber) {
    case 1: return 'day';
    case 2: return 'evening';
    case 3: return 'night';
    case 4: return 'dawn';
    default: return 'day';,
}
};

// 检查角色是否可以在当前游戏状态下使用技能
export const canUseSkillInGameState = (;
  skillEffects: SkillEffects,
  roleStatus: number,
  currentPhase: number,
  skillName?: string
): boolean => { const phaseName = getPhaseName(currentPhase);
  const statusName = getStatusName(roleStatus);

  // 检查角色状态（必须是正常状态才能使用技能）
  if (roleStatus !== 1) {
    return false;,
}

  return canUseSkillInPhase(skillEffects, phaseName, skillName) &&;
  canUseSkillWithStatus(skillEffects, statusName);,
};

// 将角色状态数字转换为状态名称
const getStatusName = (status: number): string => { switch (status) {
    case 1: return 'normal';
    case 2: return 'dying';
    case 3: return 'weak';
    case 4: return 'eliminated';
    default: return 'normal';,
}
};
