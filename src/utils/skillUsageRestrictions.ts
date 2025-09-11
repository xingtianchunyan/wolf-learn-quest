// 技能使用限制工具函数
import { createLogger } from '@/lib/logger';

const logger = createLogger('skill-usage-restrictions');

export interface SkillUseRecord {
  id: string;
  user_id: string;
  skill_name: string;
  round_number: number;
  phase: string;
  created_at: string;
}

export interface UsageRestriction {
  canUse: boolean;
  reason?: string;
  remainingUses?: number;
  nextAvailableRound?: number;
}

/**
 * 检查夜晚技能使用限制
 * 除女巫外，其他玩家在夜晚阶段不可重复使用技能
 */
export function checkNightSkillRestriction(
  roleName: string,
  currentPhase: number,
  currentRound: number,
  userSkillUses: SkillUseRecord[]
): UsageRestriction {
  // 非夜晚阶段不限制
  if (currentPhase !== 3) {
    return { canUse: true };
  }

  const roleNameLower = roleName?.toLowerCase() || '';
  const isWitch = roleNameLower.includes('witch') || roleNameLower.includes('女巫');

  // 女巫不受夜晚使用限制
  if (isWitch) {
    return { 
      canUse: true,
      reason: '女巫角色在夜晚可多次使用技能'
    };
  }

  // 检查其他角色是否已在当前回合的夜晚阶段使用过技能
  const hasUsedInCurrentNight = userSkillUses.some(use => 
    use.round_number === currentRound && 
    use.phase === 'night'
  );

  if (hasUsedInCurrentNight) {
    return {
      canUse: false,
      reason: '你在本轮夜晚已经使用过技能，每轮夜晚只能使用一次',
      nextAvailableRound: currentRound + 1
    };
  }

  return { canUse: true };
}

/**
 * 检查技能特定的使用限制
 */
export function checkSkillSpecificRestrictions(
  skillName: string,
  roleName: string,
  userSkillUses: SkillUseRecord[],
  gameContext?: {
    currentRound: number;
    currentPhase: number;
    totalGameRounds?: number;
  }
): UsageRestriction {
  const roleNameLower = roleName?.toLowerCase() || '';
  
  // 女巫魔药限制检查
  if (skillName === 'magic_potion' && (roleNameLower.includes('witch') || roleNameLower.includes('女巫'))) {
    const potionUses = userSkillUses.filter(use => use.skill_name === 'magic_potion');
    
    // 女巫总共只能使用2次魔药（解药1次，毒药1次）
    if (potionUses.length >= 2) {
      return {
        canUse: false,
        reason: '魔药已全部使用完毕（解药和毒药各1次）',
        remainingUses: 0
      };
    }

    return {
      canUse: true,
      remainingUses: 2 - potionUses.length
    };
  }

  // 猎人濒死射击限制
  if (skillName === 'dying_shot' && (roleNameLower.includes('hunter') || roleNameLower.includes('猎人'))) {
    const shotUses = userSkillUses.filter(use => use.skill_name === 'dying_shot');
    
    if (shotUses.length >= 1) {
      return {
        canUse: false,
        reason: '濒死射击只能使用一次',
        remainingUses: 0
      };
    }

    return { canUse: true, remainingUses: 1 };
  }

  // 暗夜术士巫毒限制
  if (skillName === 'voodoo' && (roleNameLower.includes('warlock') || roleNameLower.includes('暗夜术士'))) {
    const voodooUses = userSkillUses.filter(use => use.skill_name === 'voodoo');
    
    if (voodooUses.length >= 1) {
      return {
        canUse: false,
        reason: '巫毒术只能使用一次',
        remainingUses: 0
      };
    }

    return { canUse: true, remainingUses: 1 };
  }

  // 白狼王自爆限制
  if (skillName === 'self_destruct' && (roleNameLower.includes('white') || roleNameLower.includes('白狼'))) {
    const destructUses = userSkillUses.filter(use => use.skill_name === 'self_destruct');
    
    if (destructUses.length >= 1) {
      return {
        canUse: false,
        reason: '自爆技能只能使用一次',
        remainingUses: 0
      };
    }

    return { canUse: true, remainingUses: 1 };
  }

  // 其他技能默认每轮可使用一次
  return { canUse: true };
}

/**
 * 综合检查所有技能使用限制
 */
export function validateSkillUsage(
  roleName: string,
  skillName: string,
  currentPhase: number,
  currentRound: number,
  userSkillUses: SkillUseRecord[]
): UsageRestriction {
  // 检查夜晚使用限制
  const nightRestriction = checkNightSkillRestriction(
    roleName,
    currentPhase,
    currentRound,
    userSkillUses
  );

  if (!nightRestriction.canUse) {
    return nightRestriction;
  }

  // 检查技能特定限制
  const skillSpecificRestriction = checkSkillSpecificRestrictions(
    skillName,
    roleName,
    userSkillUses,
    { currentRound, currentPhase }
  );

  if (!skillSpecificRestriction.canUse) {
    return skillSpecificRestriction;
  }

  return { canUse: true };
}

/**
 * 获取技能使用限制的友好提示信息
 */
export function getSkillUsageHint(
  roleName: string,
  skillName: string,
  currentPhase: number
): string {
  const roleNameLower = roleName?.toLowerCase() || '';
  const isWitch = roleNameLower.includes('witch') || roleNameLower.includes('女巫');

  if (currentPhase === 3) { // 夜晚阶段
    if (isWitch) {
      return '女巫可在夜晚多次使用技能，但每种药剂只能使用一次';
    } else {
      return '除女巫外，每个角色在夜晚只能使用一次技能';
    }
  }

  // 其他阶段的提示
  switch (skillName) {
    case 'dying_shot':
      return '猎人技能只能在濒死状态时使用';
    case 'magic_potion':
      return '女巫的解药和毒药各只能使用一次';
    case 'voodoo':
      return '暗夜术士的巫毒术只能使用一次';
    case 'self_destruct':
      return '白狼王的自爆技能只能使用一次';
    default:
      return '每轮只能使用一次技能';
  }
}

/**
 * 记录技能使用限制的统计信息
 */
export function logSkillUsageRestriction(
  userId: string,
  roleName: string,
  skillName: string,
  restriction: UsageRestriction
): void {
  if (!restriction.canUse) {
    logger.info('技能使用被限制', {
      userId,
      roleName,
      skillName,
      reason: restriction.reason,
      remainingUses: restriction.remainingUses,
      nextAvailableRound: restriction.nextAvailableRound
    });
  } else {
    logger.debug('技能使用验证通过', {
      userId,
      roleName,
      skillName,
      remainingUses: restriction.remainingUses
    });
  }
}