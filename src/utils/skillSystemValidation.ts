// 技能系统验证和错误处理统一模块
import { createLogger } from '@/lib/logger';
import { SKILL_MAPPING_CONFIG, type SkillConfig } from '@/utils/skillMappingConfig';

const logger = createLogger('skill-validation');

export interface SkillValidationError {
  code: string;
  message: string;
  details?: Record<string, any>;
  suggestedAction?: string;
}

export interface SkillUseLimitValidation {
  canUse: boolean;
  remainingUses?: number;
  reason?: string;
}

/**
 * 技能使用次数限制验证
 */
export const validateSkillUseLimits = (
  skillConfig: SkillConfig,
  roleState: any,
  currentRound: number
): SkillUseLimitValidation => {
  logger.debug('验证技能使用次数限制', { 
    skillId: skillConfig.id, 
    usageLimit: skillConfig.usageLimit,
    currentRound 
  });

  // 无限使用的技能检查当前回合是否已使用
  if (skillConfig.usageLimit === 'unlimited') {
    const roundUses = roleState?.round_skill_uses || {};
    const currentRoundUses = roundUses[currentRound] || [];
    
    if (currentRoundUses.includes(skillConfig.id)) {
      return {
        canUse: false,
        reason: '本轮已使用该技能'
      };
    }
    
    return { canUse: true };
  }

  // 有限次数技能验证
  if (typeof skillConfig.usageLimit === 'number') {
    const skillUses = roleState?.skill_uses_remaining || {};
    const skillData = skillUses[skillConfig.id] || { used: 0, remaining: skillConfig.usageLimit };
    
    if (skillData.used >= skillConfig.usageLimit) {
      return {
        canUse: false,
        remainingUses: 0,
        reason: `技能使用次数已达上限 (${skillConfig.usageLimit})`
      };
    }
    
    return {
      canUse: true,
      remainingUses: skillConfig.usageLimit - skillData.used
    };
  }

  logger.warn('未知的技能使用限制类型', { usageLimit: skillConfig.usageLimit });
  return { canUse: true };
};

/**
 * 角色状态验证
 */
export const validateRoleStatus = (
  requiredStatus: string[],
  currentStatus: number
): { valid: boolean; reason?: string } => {
  const statusNames = {
    1: 'normal',
    2: 'dying', 
    3: 'weak',
    4: 'eliminated'
  };
  
  const currentStatusName = statusNames[currentStatus as keyof typeof statusNames] || 'normal';
  
  if (!requiredStatus.includes(currentStatusName)) {
    return {
      valid: false,
      reason: `当前状态 "${currentStatusName}" 不满足技能使用要求`
    };
  }
  
  return { valid: true };
};

/**
 * 技能阶段验证
 */
export const validateSkillPhase = (
  requiredPhase: string,
  currentPhase: number
): { valid: boolean; reason?: string } => {
  const phaseNames = ['day', 'evening', 'night', 'dawn'];
  const currentPhaseName = phaseNames[currentPhase - 1] || 'day';
  
  if (requiredPhase !== currentPhaseName) {
    return {
      valid: false,
      reason: `当前阶段 "${currentPhaseName}" 不是技能使用阶段，需要在 "${requiredPhase}" 阶段使用`
    };
  }
  
  return { valid: true };
};

/**
 * 技能目标验证
 */
export const validateSkillTarget = (
  targetType: string,
  targetUserId?: string
): { valid: boolean; reason?: string } => {
  if (targetType === 'single' && !targetUserId) {
    return {
      valid: false,
      reason: '该技能需要选择目标'
    };
  }
  
  if (targetType === 'none' && targetUserId) {
    return {
      valid: false,
      reason: '该技能不需要选择目标'
    };
  }
  
  return { valid: true };
};

/**
 * 统一的技能验证错误处理
 */
export const createSkillValidationError = (
  code: string,
  message: string,
  details?: Record<string, any>,
  suggestedAction?: string
): SkillValidationError => {
  logger.error('技能验证失败', { code, message, details });
  
  return {
    code,
    message,
    details,
    suggestedAction
  };
};

/**
 * 女巫技能特殊验证 - 增强版本
 */
export const validateWitchPotionUsage = (
  potionType: 'protection' | 'attack',
  roleState: any,
  gameContext?: {
    gameStateId: string;
    currentRound: number;
    nightDeaths?: any[];
  }
): SkillUseLimitValidation => {
  logger.debug('验证女巫药剂使用', { potionType, roleState: roleState?.id });
  
  const witchUses = roleState?.skill_uses_remaining?.witch_potion || { 
    protection_used: false, 
    attack_used: false 
  };
  
  const usedKey = `${potionType}_used`;
  
  if (witchUses[usedKey]) {
    return {
      canUse: false,
      reason: `${potionType === 'protection' ? '解药' : '毒药'}已使用过`
    };
  }
  
  // 解药特殊验证：需要有死亡信息才能使用
  if (potionType === 'protection') {
    if (!gameContext?.nightDeaths || gameContext.nightDeaths.length === 0) {
      return {
        canUse: false,
        reason: '当夜没有死亡信息，无法使用解药'
      };
    }
  }
  
  return { canUse: true };
};

/**
 * 被动技能触发条件验证
 */
export const validatePassiveSkillTrigger = (
  skillType: string,
  triggerContext: {
    userRole: string;
    targetRole?: string;
    attackerRole?: string;
    currentStatus: number;
    gamePhase: number;
  }
): { canTrigger: boolean; reason?: string } => {
  switch (skillType) {
    case 'demon_immunity':
      if (triggerContext.userRole !== 'demon') {
        return { canTrigger: false, reason: '只有恶魔角色具有免疫能力' };
      }
      if (!['werewolf', 'whitewolf'].includes(triggerContext.attackerRole || '')) {
        return { canTrigger: false, reason: '恶魔只免疫狼人攻击' };
      }
      return { canTrigger: true };
      
    case 'hunter_dying':
      if (triggerContext.userRole !== 'hunter') {
        return { canTrigger: false, reason: '只有猎人角色可以触发濒死技能' };
      }
      if (triggerContext.currentStatus === 4) {
        return { canTrigger: false, reason: '猎人已经淘汰，无法触发濒死技能' };
      }
      return { canTrigger: true };
      
    case 'multiple_protection':
      // 多重保护检查不需要特殊条件，由系统自动检测
      return { canTrigger: true };
      
    default:
      logger.warn('未知的被动技能类型', { skillType });
      return { canTrigger: false, reason: '未知的被动技能类型' };
  }
};

/**
 * 技能执行优先级验证
 */
export const validateSkillExecutionOrder = (
  skillQueue: Array<{
    skillName: string;
    priority: number;
    userId: string;
    targetUserId?: string;
  }>
): { validOrder: boolean; conflicts: string[]; suggestedOrder: any[] } => {
  const conflicts: string[] = [];
  const sortedQueue = [...skillQueue].sort((a, b) => a.priority - b.priority);
  
  // 检查是否有相同目标的冲突技能
  const targetMap = new Map<string, any[]>();
  
  sortedQueue.forEach(skill => {
    if (skill.targetUserId) {
      if (!targetMap.has(skill.targetUserId)) {
        targetMap.set(skill.targetUserId, []);
      }
      targetMap.get(skill.targetUserId)!.push(skill);
    }
  });
  
  // 检查每个目标是否有冲突技能
  targetMap.forEach((skills, targetId) => {
    if (skills.length > 1) {
      const conflictingSkills = skills.map(s => s.skillName);
      
      // 检查特定冲突组合
      if (conflictingSkills.includes('vigil') && conflictingSkills.includes('night_attack')) {
        conflicts.push(`目标 ${targetId}: 守卫保护与狼人攻击冲突`);
      }
      
      if (conflictingSkills.includes('magic_potion') && conflictingSkills.includes('night_attack')) {
        conflicts.push(`目标 ${targetId}: 女巫解药与狼人攻击冲突`);
      }
    }
  });
  
  return {
    validOrder: conflicts.length === 0,
    conflicts,
    suggestedOrder: sortedQueue
  };
};