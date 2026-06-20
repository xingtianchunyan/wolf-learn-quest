/**
 * 统一的技能验证规则配置
 */
import { supabase } from '@/integrations/supabase/client';

export interface SkillValidationRule {
  skillName: string;
  phases: number[]; // 允许的游戏阶段 (1=day, 2=evening, 3=night, 4=dawn)
  maxUsesPerGame?: number; // 每局游戏最大使用次数
  maxUsesPerRound?: number; // 每回合最大使用次数
  requiresTarget: boolean; // 是否需要目标
  targetValidation?: (
    targetId: string,
    gameStateId: string
  ) => Promise<boolean>;
  customValidation?: (
    userId: string,
    gameStateId: string,
    skillData: any
  ) => Promise<boolean>;
}

export const SKILL_VALIDATION_RULES: Record<string, SkillValidationRule> = {
  werewolf_attack: {
    skillName: 'werewolf_attack',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活且不是狼人
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      // 简化验证，只检查目标是否存活
      return data?.role_status !== 4;
    },
  },

  night_attack: {
    skillName: 'night_attack',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活且不是狼人阵营
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      // 简化验证，只检查目标是否存活
      return data?.role_status !== 4;
    },
  },

  seer_divination: {
    skillName: 'seer_divination',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      return data?.role_status !== 4;
    },
  },

  prophecy: {
    skillName: 'prophecy',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      return data?.role_status !== 4;
    },
  },

  magic_potion: {
    skillName: 'magic_potion',
    phases: [3], // 夜晚阶段
    maxUsesPerGame: 2, // 解药和毒药各一次
    requiresTarget: false, // 解药可能无目标
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证女巫魔药使用次数
      const potionType = skillData.potionType;
      const { data } = await supabase
        .from('skill_uses')
        .select('skill_effects')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .eq('skill_name', 'magic_potion');

      const usedPotions =
        data?.filter(use => {
          const effects = use.skill_effects as any;
          return effects?.potionType === potionType;
        }) || [];

      return usedPotions.length === 0;
    },
  },

  guard_protection: {
    skillName: 'guard_protection',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证不能连续保护同一人
      const targetId = skillData.targetUserId;
      const { data } = await supabase
        .from('skill_uses')
        .select('target_user_id, round_number')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .eq('skill_name', 'guard_protection')
        .order('round_number', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        return data[0].target_user_id !== targetId;
      }

      return true;
    },
  },

  vigil: {
    skillName: 'vigil',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证不能连续保护同一人
      const targetId = skillData.targetUserId;
      const { data } = await supabase
        .from('skill_uses')
        .select('target_user_id, round_number')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .eq('skill_name', 'vigil')
        .order('round_number', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        return data[0].target_user_id !== targetId;
      }

      return true;
    },
  },

  hunter_revenge: {
    skillName: 'hunter_revenge',
    phases: [1, 2, 3, 4], // 任何阶段（被淘汰时触发）
    maxUsesPerGame: 1,
    requiresTarget: true,
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证猎人是否处于濒死状态
      const { data } = await supabase
        .from('role_states')
        .select('role_status, updated_at')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .single();

      if (data?.role_status === 2) {
        // 濒死状态
        return true;
      }

      return false;
    },
  },

  dying_shot: {
    skillName: 'dying_shot',
    phases: [1, 2, 3, 4], // 任何阶段（被淘汰时触发）
    maxUsesPerGame: 1,
    requiresTarget: true,
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证猎人是否处于濒死状态
      const { data } = await supabase
        .from('role_states')
        .select('role_status, updated_at')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .single();

      if (data?.role_status === 2) {
        // 濒死状态
        return true;
      }

      return false;
    },
  },

  demon_eye: {
    skillName: 'demon_eye',
    phases: [3], // 夜晚阶段
    maxUsesPerRound: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      return data?.role_status !== 4;
    },
  },

  voodoo: {
    skillName: 'voodoo',
    phases: [3], // 夜晚阶段
    maxUsesPerGame: 1,
    requiresTarget: true,
    targetValidation: async (targetId, gameStateId) => {
      // 验证目标是否存活
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', targetId)
        .eq('game_state_id', gameStateId)
        .single();

      return data?.role_status !== 4;
    },
  },

  self_destruct: {
    skillName: 'self_destruct',
    phases: [3], // 夜晚阶段
    maxUsesPerGame: 1,
    requiresTarget: true,
    customValidation: async (userId, gameStateId, skillData) => {
      // 验证白狼王是否处于濒死状态
      const { data } = await supabase
        .from('role_states')
        .select('role_status')
        .eq('user_id', userId)
        .eq('game_state_id', gameStateId)
        .single();

      return data?.role_status === 2; // 濒死状态才能使用
    },
  },

  Sleep: {
    skillName: 'Sleep',
    phases: [3], // 夜晚阶段
    requiresTarget: false,
    customValidation: async () => true, // 村民睡觉无特殊限制
  },
};

/**
 * 统一的技能验证函数
 */
export const validateSkillUnified = async (
  skillName: string,
  userId: string,
  gameStateId: string,
  currentPhase: number,
  skillData: any = {}
): Promise<{ valid: boolean; reason?: string }> => {
  const rule = SKILL_VALIDATION_RULES[skillName];

  if (!rule) {
    return { valid: false, reason: '未知技能' };
  }

  // 验证游戏阶段
  if (!rule.phases.includes(currentPhase)) {
    const phaseNames = ['', '白天', '黄昏', '夜晚', '黎明'];
    return {
      valid: false,
      reason: `当前阶段 "${phaseNames[currentPhase]}" 不是技能使用阶段，需要在指定阶段使用`,
    };
  }

  // 验证使用次数限制
  if (rule.maxUsesPerGame || rule.maxUsesPerRound) {
    const usageValid = await validateSkillUsageLimits(
      skillName,
      userId,
      gameStateId,
      rule.maxUsesPerGame,
      rule.maxUsesPerRound
    );

    if (!usageValid.valid) {
      return usageValid;
    }
  }

  // 验证目标
  if (rule.requiresTarget && !skillData.targetUserId) {
    return { valid: false, reason: '该技能需要选择目标' };
  }

  if (rule.targetValidation && skillData.targetUserId) {
    const targetValid = await rule.targetValidation(
      skillData.targetUserId,
      gameStateId
    );

    if (!targetValid) {
      return { valid: false, reason: '目标无效' };
    }
  }

  // 自定义验证
  if (rule.customValidation) {
    const customValid = await rule.customValidation(
      userId,
      gameStateId,
      skillData
    );

    if (!customValid) {
      return { valid: false, reason: '技能使用条件不满足' };
    }
  }

  return { valid: true };
};

/**
 * 验证技能使用次数限制
 */
const validateSkillUsageLimits = async (
  skillName: string,
  userId: string,
  gameStateId: string,
  maxUsesPerGame?: number,
  maxUsesPerRound?: number
): Promise<{ valid: boolean; reason?: string }> => {
  const { data } = await supabase
    .from('skill_uses')
    .select('round_number')
    .eq('user_id', userId)
    .eq('game_state_id', gameStateId)
    .eq('skill_name', skillName);

  if (!data) {
    return { valid: true };
  }

  // 检查每局游戏使用次数
  if (maxUsesPerGame && data.length >= maxUsesPerGame) {
    return { valid: false, reason: '技能使用次数已达上限' };
  }

  // 检查每回合使用次数
  if (maxUsesPerRound) {
    const { data: gameState } = await supabase
      .from('game_states')
      .select('current_round')
      .eq('id', gameStateId)
      .single();

    const currentRoundUses = data.filter(
      use => use.round_number === gameState?.current_round
    );

    if (currentRoundUses.length >= maxUsesPerRound) {
      return { valid: false, reason: '本回合技能使用次数已达上限' };
    }
  }

  return { valid: true };
};
