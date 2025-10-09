import { createLogger   } from '@/lib/logger';
import { SkillType, ValidationResult,, RoleStatus  } from
  GamePhase,
  SkillUsageLimit,
  SkillValidationResult,
  SkillExecutionContext  } from '@/types/skillSystem.types';
  validateRoleStatus,
  validateGamePhase,
  validateSkillTarget,
  validateRequired,
  validateNumberRange  } from './dataValidation';

const logger = createLogger('skill-validation');

/**
* 技能使用限制检查结果接口
 */
export interface SkillUsageLimitResult  { /** 是否允许使用 */
  allowed: boolean;
  /** 剩余使用次数 */
  remainingUses?: number;
  /** 限制原因 */
  reason?: string;
  /** 重置时间（如果有） */
  resetTime?: Date
}

/**
* 技能冲突检查结果接口
 */
export interface SkillConflictResult  { /** 是否存在冲突 */
  hasConflict: boolean;
  /** 冲突的技能列表 */
  conflictingSkills?: SkillType[];
  /** 冲突原因 */
  reason?: string
}

/**
* 技能链验证结果接口
 */
export interface SkillChainValidationResult  { /** 验证是否通过 */
  valid: boolean;
  /** 执行顺序 */
  executionOrder?: SkillType[];
  /** 验证失败原因 */
  reason?: string;
  /** 冲突详情 */
  conflicts?: SkillConflictResult[]
}

/**
* 统一技能数据验证
* 整合所有技能数据验证逻辑
*
* @param skillType - 技能类型
* @param context - 技能执行上下文
* @returns 验证结果
 */
export function validateSkillData(
  skillType: SkillType,
  context: SkillExecutionContext
): SkillValidationResult { logger.debug('开始技能数据验证', { skillType, context  });

  const errors: string[] = [];

  // 1. 基础数据验证
  const requiredValidation = validateRequired(skillType, '技能类型');
  if (!requiredValidation.valid) { errors.push(requiredValidation.reason!)
}

  const contextValidation = validateRequired(context, '技能上下文');
  if (!contextValidation.valid) { errors.push(contextValidation.reason!)
}

  // 2. 用户ID验证
  if (context.userId) { const userIdValidation = validateRequired(context.userId, '用户ID');
    if (!userIdValidation.valid) {
      errors.push(userIdValidation.reason!)
}
  }

  // 3. 游戏ID验证
  if (context.gameId) { const gameIdValidation = validateRequired(context.gameId, '游戏ID');
    if (!gameIdValidation.valid) {
      errors.push(gameIdValidation.reason!)
}
  }

  // 4. 角色状态验证
  if (context.roleStatus) { const roleStatusValidation = validateRoleStatus(context.roleStatus);
    if (!roleStatusValidation.valid) {
      errors.push(roleStatusValidation.reason!)
}
  }

  // 5. 游戏阶段验证
  if (context.gamePhase) { const phaseValidation = validateGamePhase(context.gamePhase);
    if (!phaseValidation.valid) {
      errors.push(phaseValidation.reason!)
}
  }

  // 6. 目标验证（如果有目标）
  if (context.targetUserId || context.targetUserIds) { const targetType = context.targetUserIds ? 'multiple' : 'single';
    const targetValidation = validateSkillTarget(;
      targetType,
      context.targetUserId,
      context.targetUserIds
    );
    if (!targetValidation.valid) {
      errors.push(targetValidation.reason!)
}
  }

  return { valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    skillType,
    context }
}

/**
* 技能使用限制验证
* 统一技能使用次数和时间限制验证
*
* @param skillType - 技能类型
* @param userId - 用户ID
* @param usageLimit - 使用限制配置
* @param currentUsage - 当前使用情况
* @returns 限制检查结果
 */
export function validateSkillUseLimits(
  skillType: SkillType,
  userId: string,
  usageLimit: SkillUsageLimit,
  currentUsage: { count: number; lastUsed?: Date  
}
): SkillUsageLimitResult { logger.debug('验证技能使用限制', {
    skillType,
    userId,
    usageLimit,
    currentUsage });

  // 检查每日使用限制
  if (usageLimit.dailyLimit !== undefined) { const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUsed = currentUsage.lastUsed;
    const isToday = lastUsed && lastUsed >= today;

    if (isToday && currentUsage.count >= usageLimit.dailyLimit) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return {
        allowed: false,
        remainingUses: 0,
        reason: `今日使用次数已达上限（${usageLimit.dailyLimit 
}次）`,
        resetTime: tomorrow 
}
}

    const remainingDaily = usageLimit.dailyLimit - (isToday ? currentUsage.count : 0);

    return { allowed: true,
      remainingUses: remainingDaily,
      resetTime: new Date(today.getTime() + 24 * 60 * 60 * 1000) 
}
}

  // 检查总使用限制
  if (usageLimit.totalLimit !== undefined) { if (currentUsage.count >= usageLimit.totalLimit) {
      return {
        allowed: false,
        remainingUses: 0,
        reason: `总使用次数已达上限（${usageLimit.totalLimit 
}次）` }
}

    return { allowed: true,
      remainingUses: usageLimit.totalLimit - currentUsage.count 
}
}

  // 检查冷却时间
  if (usageLimit.cooldownMs && currentUsage.lastUsed) { const now = new Date();
    const timeSinceLastUse = now.getTime() - currentUsage.lastUsed.getTime();

    if (timeSinceLastUse < usageLimit.cooldownMs) {
      const resetTime = new Date(currentUsage.lastUsed.getTime() + usageLimit.cooldownMs);
      const remainingMs = usageLimit.cooldownMs - timeSinceLastUse;

      return {
        allowed: false,
        reason: `技能冷却中，剩余 ${Math.ceil(remainingMs / 1000) 
} 秒`,
        resetTime }
}
  }

  return { allowed: true,
    remainingUses: usageLimit.dailyLimit || usageLimit.totalLimit 
}
}

/**
* 技能阶段验证
* 验证技能是否可在当前游戏阶段使用
*
* @param skillType - 技能类型
* @param currentPhase - 当前游戏阶段
* @returns 验证结果
 */
export function validateSkillPhase(
  skillType: SkillType,
  currentPhase: GamePhase
): ValidationResult { logger.debug('验证技能阶段', { skillType, currentPhase  });

  // 技能阶段限制映射
  const skillPhaseMap: Record<SkillType, GamePhase[]> = { [SkillType.WEREWOLF_ATTACK]: ['night'],
    [SkillType.SEER_INSPECT]: ['night'],
    [SkillType.WITCH_HEAL]: ['night'],
    [SkillType.WITCH_POISON]: ['night'],
    [SkillType.GUARD_PROTECT]: ['night'],
    [SkillType.HUNTER_REVENGE]: ['day', 'night'], // 猎人可在濒死时使用
    [SkillType.VILLAGER_VOTE]: ['day'],
    [SkillType.MAYOR_REVEAL]: ['day'],
    [SkillType.CUPID_LINK]: ['night'] // 仅第一夜  
};

  const allowedPhases = skillPhaseMap[skillType];
  if (!allowedPhases) { return {
      valid: false,
      reason: `未知的技能类型：${skillType 
}` }
}

  const phaseValidation = validateGamePhase(currentPhase, allowedPhases);
  if (!phaseValidation.valid) { const phaseNames = {
      'day': '白天',
      'evening': '黄昏',
      'night': '夜晚',
      'dawn': '黎明'   
}

    const allowedNames = allowedPhases.map(p => phaseNames[p]).join('、');
    return { valid: false,
      reason: `技能'${skillType 
}'只能在${ allowedNames }阶段使用` }
}

  return { valid: true  
}
}

/**
* 技能冲突检测
* 检测多个技能之间是否存在冲突
*
* @param skills - 技能列表
* @param context - 执行上下文
* @returns 冲突检查结果
 */
export function detectSkillConflicts(
  skills: SkillType[],
  context: SkillExecutionContext
): SkillConflictResult { logger.debug('检测技能冲突', { skills, context  });

  // 定义冲突规则
  const conflictRules: Record<SkillType, SkillType[]> = { [SkillType.WITCH_HEAL]: [SkillType.WITCH_POISON], // 女巫同夜不能同时使用解药和毒药
    [SkillType.WITCH_POISON]: [SkillType.WITCH_HEAL],
    [SkillType.WEREWOLF_ATTACK]: [], // 狼人攻击一般不与其他技能冲突
    [SkillType.SEER_INSPECT]: [],
    [SkillType.GUARD_PROTECT]: [],
    [SkillType.HUNTER_REVENGE]: [],
    [SkillType.VILLAGER_VOTE]: [],
    [SkillType.MAYOR_REVEAL]: [],
    [SkillType.CUPID_LINK]: []  
};

  const conflicts: SkillType[] = [];

  for (let i = 0; i < skills.length; i++) { const skill1 = skills[i];
    const conflictingSkills = conflictRules[skill1] || [];

    for (let j = i + 1; j < skills.length; j++) {
      const skill2 = skills[j];

      if (conflictingSkills.includes(skill2)) {
        conflicts.push(skill1, skill2)
}
    } }

  if (conflicts.length > 0) { return {
      hasConflict: true,
      conflictingSkills: [...new Set(conflicts)],
      reason: '检测到技能冲突，无法同时执行' 
}
}

  return { hasConflict: false 
}
}

/**
* 技能执行顺序验证
* 验证技能执行顺序是否正确
*
* @param skills - 技能列表（按执行顺序）
* @returns 验证结果
 */
export function validateSkillExecutionOrder(
  skills: SkillType[]
): ValidationResult { logger.debug('验证技能执行顺序', { skills  });

  // 定义技能优先级（数字越小优先级越高）
  const skillPriority: Record<SkillType, number> = { [SkillType.CUPID_LINK]: 1,        // 丘比特连接（第一夜）
    [SkillType.GUARD_PROTECT]: 2,     // 守卫守护
    [SkillType.WEREWOLF_ATTACK]: 3,   // 狼人攻击
    [SkillType.WITCH_HEAL]: 4,        // 女巫解药
    [SkillType.WITCH_POISON]: 5,      // 女巫毒药
    [SkillType.SEER_INSPECT]: 6,      // 预言家查验
    [SkillType.HUNTER_REVENGE]: 7,    // 猎人复仇
    [SkillType.VILLAGER_VOTE]: 8,     // 村民投票
    [SkillType.MAYOR_REVEAL]: 9       // 村长身份公开  
};

  // 检查顺序是否正确
  for (let i = 0; i < skills.length - 1; i++) { const currentSkill = skills[i];
    const nextSkill = skills[i + 1];

    const currentPriority = skillPriority[currentSkill];
    const nextPriority = skillPriority[nextSkill];

    if (currentPriority === undefined || nextPriority === undefined) {
      return {
        valid: false,
        reason: `未知的技能类型：${currentPriority === undefined ? currentSkill : nextSkill 
}`
}
}

    if (currentPriority > nextPriority) { return {
        valid: false,
        reason: `技能执行顺序错误：${nextSkill 
} 应该在 ${ currentSkill } 之前执行` }
}
  }

  return { valid: true  
}
}

/**
* 技能链验证
* 验证一系列技能的执行链是否有效
*
* @param skills - 技能列表
* @param context - 执行上下文
* @returns 技能链验证结果
 */
export function validateSkillChain(
  skills: SkillType[],
  context: SkillExecutionContext
): SkillChainValidationResult { logger.debug('验证技能链', { skills, context  });

  // 1. 检查技能冲突
  const conflictResult = detectSkillConflicts(skills, context);
  if (conflictResult.hasConflict) { return {
      valid: false,
      reason: conflictResult.reason,
      conflicts: [conflictResult] 
}
}

  // 2. 验证执行顺序
  const orderValidation = validateSkillExecutionOrder(skills);
  if (!orderValidation.valid) { return {
      valid: false,
      reason: orderValidation.reason 
}
}

  // 3. 验证每个技能的阶段要求
  if (context.gamePhase) { for (const skill of skills) {
      const phaseValidation = validateSkillPhase(skill, context.gamePhase);
      if (!phaseValidation.valid) {
        return {
          valid: false,
          reason: phaseValidation.reason 
}
}
    } }

  // 4. 生成正确的执行顺序
  const skillPriority: Record<SkillType, number> = { [SkillType.CUPID_LINK]: 1,
    [SkillType.GUARD_PROTECT]: 2,
    [SkillType.WEREWOLF_ATTACK]: 3,
    [SkillType.WITCH_HEAL]: 4,
    [SkillType.WITCH_POISON]: 5,
    [SkillType.SEER_INSPECT]: 6,
    [SkillType.HUNTER_REVENGE]: 7,
    [SkillType.VILLAGER_VOTE]: 8,
    [SkillType.MAYOR_REVEAL]: 9  
};

  const executionOrder = [...skills].sort((a, b) => {
  return skillPriority[a] - skillPriority[b]

});

  return { valid: true,
    executionOrder }
}

/**
* 统一技能验证入口函数
* 整合所有技能验证逻辑，提供统一的验证接口
*
* @param skillType - 技能类型
* @param context - 技能执行上下文
* @param usageLimit - 使用限制（可选）
* @param currentUsage - 当前使用情况（可选）
* @returns 完整的验证结果
 */
export function validateSkillUnified(
  skillType: SkillType,
  context: SkillExecutionContext,
  usageLimit?: SkillUsageLimit,
  currentUsage?: { count: number; lastUsed?: Date  
}
): SkillValidationResult & { usageLimitResult?: SkillUsageLimitResult;
  phaseValidation?: ValidationResult
} { logger.info('开始统一技能验证', {
    skillType,
    context,
    usageLimit,
    currentUsage });

  // 1. 基础数据验证
  const dataValidation = validateSkillData(skillType, context);
  if (!dataValidation.valid) { return dataValidation
}

  // 2. 阶段验证
  let phaseValidation: ValidationResult | undefined;
  if (context.gamePhase) { phaseValidation = validateSkillPhase(skillType, context.gamePhase);
    if (!phaseValidation.valid) {
      return {
        ...dataValidation,
        valid: false,
        errors: [phaseValidation.reason!],
        phaseValidation }
}
  }

  // 3. 使用限制验证
  let usageLimitResult: SkillUsageLimitResult | undefined;
  if (usageLimit && currentUsage && context.userId) { usageLimitResult = validateSkillUseLimits(;
      skillType,
      context.userId,
      usageLimit,
      currentUsage
    );

    if (!usageLimitResult.allowed) {
      return {
        ...dataValidation,
        valid: false,
        errors: [usageLimitResult.reason!],
        usageLimitResult,
        phaseValidation }
}
  }

  logger.info('技能验证通过', { skillType  });

  return { ...dataValidation,
    valid: true,
    usageLimitResult,
    phaseValidation }
}