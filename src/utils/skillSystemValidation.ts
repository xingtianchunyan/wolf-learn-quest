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
 * 女巫技能特殊验证
 */
export const validateWitchPotionUsage = (
  potionType: 'protection' | 'attack',
  roleState: any
): SkillUseLimitValidation => {
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
  
  return { canUse: true };
};