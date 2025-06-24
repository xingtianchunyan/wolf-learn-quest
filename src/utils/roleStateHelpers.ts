
// 角色状态常量
export const ROLE_STATUS = {
  NORMAL: 1,    // 正常状态
  DYING: 2,     // 濒死状态
  WEAK: 3,      // 虚弱状态
  ELIMINATED: 4 // 淘汰状态
} as const;

export type RoleStatusType = typeof ROLE_STATUS[keyof typeof ROLE_STATUS];

// 获取状态名称
export const getRoleStatusName = (status: number): string => {
  switch (status) {
    case ROLE_STATUS.NORMAL:
      return '正常';
    case ROLE_STATUS.DYING:
      return '濒死';
    case ROLE_STATUS.WEAK:
      return '虚弱';
    case ROLE_STATUS.ELIMINATED:
      return '淘汰';
    default:
      return '未知';
  }
};

// 获取状态颜色
export const getRoleStatusColor = (status: number): string => {
  switch (status) {
    case ROLE_STATUS.NORMAL:
      return 'text-green-400';
    case ROLE_STATUS.DYING:
      return 'text-yellow-400';
    case ROLE_STATUS.WEAK:
      return 'text-orange-400';
    case ROLE_STATUS.ELIMINATED:
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

// 检查能否进行某项操作
export const canPerformAction = (statusEffects: any, action: string): boolean => {
  if (!statusEffects || typeof statusEffects !== 'object') {
    return false;
  }
  return statusEffects[action] === true;
};

// 获取技能剩余使用次数
export const getSkillUsesRemaining = (skillUses: any): number | 'unlimited' => {
  if (!skillUses || typeof skillUses !== 'object') {
    return 0;
  }
  
  if (skillUses.unlimited === true) {
    return 'unlimited';
  }
  
  return skillUses.remaining || 0;
};

// 检查是否可以使用技能
export const canUseSkill = (skillUses: any): boolean => {
  const remaining = getSkillUsesRemaining(skillUses);
  return remaining === 'unlimited' || (typeof remaining === 'number' && remaining > 0);
};
