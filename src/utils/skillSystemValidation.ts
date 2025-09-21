// 统一技能系统验证 - 整合增强版本和原版本
import { createLogger } from '@/lib/logger';
import { SKILL_MAPPING_CONFIG as _SKILL_MAPPING_CONFIG, type SkillConfig } from '@/utils/skillMappingConfig';

const logger = createLogger('skill-validation-unified');

export interface SkillValidationError {
  code: string;
  message: string;
  details?: Record<string, any>;
  suggestedAction?: string;
}

export interface ValidationResult {
  valid: boolean;
  canUse: boolean; // 兼容旧接口
  reason?: string;
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
  currentRound: number,
  currentPhase?: number
): SkillUseLimitValidation => {
  logger.debug('验证技能使用次数限制', { 
    skillId: skillConfig.id, 
    usageLimit: skillConfig.usageLimit,
    currentRound,
    currentPhase
  });

  // 无限使用的技能检查当前回合和阶段是否已使用
  if (skillConfig.usageLimit === 'unlimited') {
    const roundUses = roleState?.round_skill_uses || {};
    const currentRoundUses = roundUses[currentRound] || [];
    
    // 对于村民睡觉技能，需要检查当前轮次的夜晚阶段是否已使用
    if (skillConfig.id === 'villager_sleep' && currentPhase === 3) {
      // 检查当前轮次的夜晚阶段是否已使用睡觉技能
      const phaseKey = `${currentRound}_night`;
      if (currentRoundUses.includes(phaseKey)) {
        return {
          canUse: false,
          reason: '本轮夜晚阶段已使用睡觉技能'
        };
      }
    } else if (currentRoundUses.includes(skillConfig.id)) {
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
      reason: '该技能不需要目标'
    };
  }
  
  return { valid: true };
};

/**
 * 狼人夜袭技能目标验证
 * 验证狼人不能攻击自己和其他狼人、白狼队友
 */
export const validateWerewolfAttackTarget = async (
  attackerUserId: string,
  targetUserId: string,
  _gameStateId: string
): Promise<{ valid: boolean; reason?: string }> => {
  try {
    // 这里需要从数据库获取攻击者和目标的角色信息
    // 由于这是前端代码，实际的验证应该在后端RPC函数中进行
    // 这里只是提供验证逻辑的框架
    
    if (attackerUserId === targetUserId) {
      return {
        valid: false,
        reason: '不能攻击自己'
      };
    }
    
    // 实际的同阵营检查需要在后端进行
    // 因为前端无法安全地获取其他玩家的角色信息
    
    return { valid: true };
  } catch (error) {
    logger.error('验证狼人攻击目标时出错', error);
    return {
      valid: false,
      reason: '目标验证失败'
    };
  }
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

// ============ 增强版简化验证系统 ============

/**
 * 简化的技能使用验证 - 减少误判，提高用户体验
 */
export const validateSkillUsageSimplified = (
  roleDesign: any,
  roleState: any,
  currentPhase: number,
  targetUserId?: string
): ValidationResult => {
  // 基础检查
  if (!roleDesign?.skill_name) {
    return {
      valid: false,
      canUse: false,
      reason: '角色没有可用技能',
      suggestedAction: '请检查角色配置'
    };
  }

  // 角色状态检查 - 只检查是否被淘汰
  if (roleState?.role_status === 4) {
    return {
      valid: false,
      canUse: false,
      reason: '已淘汰的角色无法使用技能',
      suggestedAction: '等待游戏结束'
    };
  }

  // 简化的阶段检查 - 只检查夜晚技能是否在夜晚使用
  const nightSkills = ['night_attack', 'prophecy', 'vigil', 'magic_potion', 'demon_eye', 'voodoo', 'self_destruct'];
  const isNightSkill = nightSkills.includes(roleDesign.skill_name);
  
  if (isNightSkill && currentPhase !== 3) {
    return {
      valid: false,
      canUse: false,
      reason: '该技能只能在夜晚阶段使用',
      suggestedAction: '等待夜晚阶段'
    };
  }

  // 目标检查 - 只对需要目标的技能进行检查
  const requiresTarget = ['night_attack', 'prophecy', 'vigil', 'demon_eye', 'voodoo'];
  
  if (requiresTarget.includes(roleDesign.skill_name) && !targetUserId) {
    return {
      valid: false,
      canUse: false,
      reason: '该技能需要选择目标',
      suggestedAction: '请选择一个目标玩家'
    };
  }

  logger.debug('技能验证通过', {
    skillName: roleDesign.skill_name,
    currentPhase,
    hasTarget: !!targetUserId
  });

  return { valid: true, canUse: true };
};

/**
 * 获取技能使用建议
 */
export const getSkillUsageSuggestion = (
  roleDesign: any,
  roleState: any,
  currentPhase: number,
  availablePlayers: any[] = []
): string => {
  if (!roleDesign?.skill_name) {
    return '当前角色没有可用技能';
  }

  const skillName = roleDesign.skill_name;
  const phaseName = ['', 'day', 'evening', 'night', 'dawn'][currentPhase] || 'unknown';

  // 基于角色和阶段的建议
  switch (skillName) {
    case 'Sleep':
      return currentPhase === 3 ? '村民夜晚休息，保持警惕' : '等待夜晚阶段';
    
    case 'night_attack':
      if (currentPhase !== 3) return '等待夜晚阶段进行攻击';
      if (availablePlayers.length === 0) return '没有可攻击的目标';
      return `选择一个目标进行攻击 (${availablePlayers.length}个可选目标)`;
    
    case 'prophecy':
      if (currentPhase !== 3) return '等待夜晚阶段进行占卜';
      if (availablePlayers.length === 0) return '没有可占卜的目标';
      return `选择一个玩家进行占卜 (${availablePlayers.length}个可选目标)`;
    
    case 'vigil':
      if (currentPhase !== 3) return '等待夜晚阶段进行保护';
      if (availablePlayers.length === 0) return '没有可保护的目标';
      return `选择一个玩家进行保护 (${availablePlayers.length}个可选目标)`;
    
    case 'magic_potion':
      if (currentPhase !== 3) return '等待夜晚阶段使用魔药';
      return '可以使用解药救人或毒药杀人，也可以选择跳过';
    
    case 'demon_eye':
      if (currentPhase !== 3) return '等待夜晚阶段使用恶魔之眼';
      if (availablePlayers.length === 0) return '没有可查看的目标';
      return `选择一个玩家查看身份 (${availablePlayers.length}个可选目标)`;
    
    case 'dying_shot':
      return roleState?.role_status === 2 ? '濒死状态可以发动猎人技能' : '等待濒死状态触发';
    
    default:
      return `当前阶段 (${phaseName}) 可以使用技能`;
  }
};

/**
 * 检查技能冷却时间
 */
export const checkSkillCooldown = (
  skillName: string,
  lastUsedRound: number,
  currentRound: number
): ValidationResult => {
  // 大部分技能每轮只能使用一次
  const cooldownSkills = ['night_attack', 'prophecy', 'vigil', 'demon_eye', 'voodoo'];
  
  if (cooldownSkills.includes(skillName) && lastUsedRound === currentRound) {
    return {
      valid: false,
      canUse: false,
      reason: '该技能在本轮已经使用过',
      suggestedAction: '等待下一轮'
    };
  }

  return { valid: true, canUse: true };
};

/**
 * 检查技能使用次数限制
 */
export const checkSkillUsageLimit = (
  skillName: string,
  usedCount: number,
  roleState: any
): ValidationResult => {
  // 女巫的魔药特殊处理
  if (skillName === 'magic_potion') {
    const witchUses = roleState?.skill_uses_remaining?.witch_potion || {};
    const protectionUsed = witchUses.protection_used || false;
    const attackUsed = witchUses.attack_used || false;
    
    // 如果两种药都用过了，就不能再使用
    if (protectionUsed && attackUsed) {
      return {
        valid: false,
        canUse: false,
        reason: '解药和毒药都已经使用过',
        suggestedAction: '女巫的魔药已用完'
      };
    }
  }

  // 猎人的濒死技能只能使用一次
  if (skillName === 'dying_shot' && usedCount > 0) {
    return {
      valid: false,
      canUse: false,
      reason: '猎人技能已经使用过',
      suggestedAction: '猎人技能只能使用一次'
    };
  }

  return { valid: true, canUse: true };
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