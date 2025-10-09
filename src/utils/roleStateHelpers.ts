
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

// 检查是否是猎人反击状态
export const isHunterRevenge = (statusEffects: any): boolean => {
  return statusEffects?.is_hunter_revenge === true;
};

// 获取猎人反击剩余时间（秒）
export const getHunterRevengeTimeLeft = (statusEffects: any): number => {
  if (!statusEffects?.is_hunter_revenge || !statusEffects?.hunter_revenge_end_time) {
    return 0;
  }
  
  const endTime = new Date(statusEffects.hunter_revenge_end_time);
  const timeLeft = Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000));
  return timeLeft;
};

// 将角色状态数字转换为技能系统可识别的状态名称
export const getStatusNameForSkillSystem = (status: number): string => {
  switch (status) {
    case ROLE_STATUS.NORMAL:
      return 'normal';
    case ROLE_STATUS.DYING:
      return 'dying';
    case ROLE_STATUS.WEAK:
      return 'weak';
    case ROLE_STATUS.ELIMINATED:
      return 'eliminated';
    default:
      return 'normal';
  }
};

// 检查角色是否可以在当前状态下使用技能（基于新的技能系统）
export const canUseSkillWithCurrentStatus = (
  roleStatus: number,
  requiredStatuses: string[]
): boolean => {
  const currentStatusName = getStatusNameForSkillSystem(roleStatus);
  return requiredStatuses.includes(currentStatusName);
};
