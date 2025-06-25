
// 技能系统辅助函数

export interface SkillEffects {
  target_type: string[];
  effect_type: string | string[];
  active_phases: string[];
  required_status: string[];
  cooldown: number;
  priority: number;
}

export interface RoleAttributes {
  victory_condition: string;
  special_abilities: string[];
}

// 检查角色是否可以在当前阶段使用技能
export const canUseSkillInPhase = (skillEffects: SkillEffects, currentPhase: string): boolean => {
  if (!skillEffects?.active_phases) return false;
  return skillEffects.active_phases.includes(currentPhase);
};

// 检查角色是否在可用技能的状态
export const canUseSkillWithStatus = (skillEffects: SkillEffects, currentStatus: string): boolean => {
  if (!skillEffects?.required_status) return false;
  return skillEffects.required_status.includes(currentStatus);
};

// 获取技能的目标类型
export const getSkillTargetTypes = (skillEffects: SkillEffects): string[] => {
  return skillEffects?.target_type || [];
};

// 获取技能效果类型
export const getSkillEffectTypes = (skillEffects: SkillEffects): string[] => {
  if (!skillEffects?.effect_type) return [];
  return Array.isArray(skillEffects.effect_type) ? skillEffects.effect_type : [skillEffects.effect_type];
};

// 获取技能优先级
export const getSkillPriority = (skillEffects: SkillEffects): number => {
  return skillEffects?.priority || 0;
};

// 检查角色是否有特殊能力
export const hasSpecialAbility = (roleAttributes: RoleAttributes, abilityName: string): boolean => {
  if (!roleAttributes?.special_abilities) return false;
  return roleAttributes.special_abilities.includes(abilityName);
};

// 获取角色的胜利条件
export const getVictoryCondition = (roleAttributes: RoleAttributes): string => {
  return roleAttributes?.victory_condition || '未知胜利条件';
};

// 检查角色是否属于好人阵营
export const isGoodFaction = (roleAttributes: RoleAttributes): boolean => {
  return roleAttributes?.victory_condition === '好人阵营获得胜利';
};

// 检查角色是否属于狼人阵营
export const isWolfFaction = (roleAttributes: RoleAttributes): boolean => {
  return roleAttributes?.victory_condition === '狼人阵营获得胜利';
};

// 根据阶段名称转换为数字
export const getPhaseNumber = (phaseName: string): number => {
  switch (phaseName) {
    case 'day': return 1;
    case 'evening': return 2;
    case 'night': return 3;
    case 'dawn': return 4;
    default: return 1;
  }
};

// 根据数字转换为阶段名称
export const getPhaseName = (phaseNumber: number): string => {
  switch (phaseNumber) {
    case 1: return 'day';
    case 2: return 'evening';
    case 3: return 'night';
    case 4: return 'dawn';
    default: return 'day';
  }
};

// 检查角色是否可以在当前游戏状态下使用技能
export const canUseSkillInGameState = (
  skillEffects: SkillEffects,
  roleStatus: number,
  currentPhase: number
): boolean => {
  const phaseName = getPhaseName(currentPhase);
  const statusName = getStatusName(roleStatus);
  
  return canUseSkillInPhase(skillEffects, phaseName) && 
         canUseSkillWithStatus(skillEffects, statusName);
};

// 将角色状态数字转换为状态名称
const getStatusName = (status: number): string => {
  switch (status) {
    case 1: return 'normal';
    case 2: return 'dying';
    case 3: return 'weak';
    case 4: return 'eliminated';
    default: return 'normal';
  }
};
