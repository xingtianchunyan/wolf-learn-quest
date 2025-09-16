// 增强的技能系统验证 - 简化逻辑，减少误判
import { createLogger } from '@/lib/logger';

const logger = createLogger('skill-validation-enhanced');

export interface ValidationResult {
  valid: boolean;
  canUse: boolean; // 兼容旧接口
  reason?: string;
  suggestedAction?: string;
}

// 简化的技能使用验证
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
  const mightRequireTarget = ['magic_potion']; // 女巫的解药需要目标，毒药也需要
  
  if (requiresTarget.includes(roleDesign.skill_name) && !targetUserId) {
    return {
      valid: false,
      canUse: false,
      reason: '该技能需要选择目标',
      suggestedAction: '请选择一个目标玩家'
    };
  }

  if (mightRequireTarget.includes(roleDesign.skill_name)) {
    // 女巫技能的特殊处理 - 如果没有选择目标，可能是想跳过
    // 这里不强制要求目标，让技能逻辑自己处理
  }

  logger.debug('技能验证通过', {
    skillName: roleDesign.skill_name,
    currentPhase,
    hasTarget: !!targetUserId
  });

  return { valid: true, canUse: true };
};

// 获取技能使用建议
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

// 检查技能冷却时间
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

// 检查技能使用次数限制
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