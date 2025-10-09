/**
 * @fileoverview 技能配置文件
 * 统一管理所有技能相关的配置信息，包括技能定义、冷却时间、效果参数等
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import type { SkillType, SkillEffect, SkillTarget } from '@/types/skill';
import type { RoleType } from '@/types/game';

/**
 * 技能基础配置接口
 */
export interface BaseSkillConfig {
  /** 技能ID */
  id: string;
  /** 技能名称 */
  name: string;
  /** 技能描述 */
  description: string;
  /** 技能类型 */
  type: SkillType;
  /** 技能图标 */
  icon?: string;
  /** 是否启用 */
  enabled: boolean;
  /** 技能等级 */
  level: number;
  /** 最大等级 */
  maxLevel: number;
}

/**
 * 技能执行配置接口
 */
export interface SkillExecutionConfig {
  /** 冷却时间（毫秒） */
  cooldown: number;
  /** 持续时间（毫秒） */
  duration: number;
  /** 消耗的能量/法力值 */
  cost: number;
  /** 施放时间（毫秒） */
  castTime: number;
  /** 技能范围 */
  range: number;
  /** 最大目标数量 */
  maxTargets: number;
  /** 是否可以被打断 */
  interruptible: boolean;
  /** 是否需要目标 */
  requiresTarget: boolean;
  /** 允许的目标类型 */
  allowedTargets: SkillTarget[];
}

/**
 * 技能效果配置接口
 */
export interface SkillEffectConfig {
  /** 基础伤害/治疗量 */
  basePower: number;
  /** 等级加成系数 */
  levelMultiplier: number;
  /** 暴击率 */
  criticalChance: number;
  /** 暴击倍数 */
  criticalMultiplier: number;
  /** 命中率 */
  accuracy: number;
  /** 效果类型 */
  effectType: SkillEffect;
  /** 附加效果 */
  additionalEffects: Array<{
    type: SkillEffect;
    chance: number;
    duration: number;
    power: number;
  }>;
}

/**
 * 技能限制配置接口
 */
export interface SkillRestrictionConfig {
  /** 每回合最大使用次数 */
  maxUsesPerTurn: number;
  /** 每游戏最大使用次数 */
  maxUsesPerGame: number;
  /** 使用条件 */
  conditions: Array<{
    type: 'health' | 'energy' | 'phase' | 'target_count' | 'custom';
    operator: '>' | '<' | '>=' | '<=' | '==' | '!=';
    value: any;
    message: string;
  }>;
  /** 禁用的游戏阶段 */
  disabledPhases: string[];
  /** 需要的前置技能 */
  prerequisites: string[];
}

/**
 * 完整技能配置接口
 */
export interface CompleteSkillConfig extends BaseSkillConfig {
  /** 执行配置 */
  execution: SkillExecutionConfig;
  /** 效果配置 */
  effects: SkillEffectConfig;
  /** 限制配置 */
  restrictions: SkillRestrictionConfig;
  /** 角色专属配置 */
  roleSpecific?: Partial<
    Record<RoleType, Partial<SkillExecutionConfig & SkillEffectConfig>>
  >;
  /** 升级配置 */
  upgrade?: {
    costPerLevel: number;
    maxUpgrades: number;
    bonusPerLevel: Partial<SkillExecutionConfig & SkillEffectConfig>;
  };
}

/**
 * 技能类别配置
 */
export const SKILL_CATEGORIES = {
  /** 攻击技能 */
  ATTACK: {
    name: '攻击技能',
    description: '用于对敌人造成伤害的技能',
    color: '#ff4444',
    icon: 'sword',
  },
  /** 防御技能 */
  DEFENSE: {
    name: '防御技能',
    description: '用于保护自己或队友的技能',
    color: '#4444ff',
    icon: 'shield',
  },
  /** 治疗技能 */
  HEALING: {
    name: '治疗技能',
    description: '用于恢复生命值的技能',
    color: '#44ff44',
    icon: 'heart',
  },
  /** 辅助技能 */
  SUPPORT: {
    name: '辅助技能',
    description: '用于增强能力或提供特殊效果的技能',
    color: '#ffff44',
    icon: 'star',
  },
  /** 控制技能 */
  CONTROL: {
    name: '控制技能',
    description: '用于限制敌人行动的技能',
    color: '#ff44ff',
    icon: 'lock',
  },
  /** 特殊技能 */
  SPECIAL: {
    name: '特殊技能',
    description: '具有独特效果的技能',
    color: '#44ffff',
    icon: 'magic',
  },
} as const;

/**
 * 默认技能配置
 */
export const DEFAULT_SKILL_CONFIG: Omit<
  CompleteSkillConfig,
  'id' | 'name' | 'description' | 'type'
> = {
  icon: 'default',
  enabled: true,
  level: 1,
  maxLevel: 5,
  execution: {
    cooldown: 3000,
    duration: 0,
    cost: 10,
    castTime: 1000,
    range: 1,
    maxTargets: 1,
    interruptible: true,
    requiresTarget: true,
    allowedTargets: ['enemy'],
  },
  effects: {
    basePower: 100,
    levelMultiplier: 1.2,
    criticalChance: 0.1,
    criticalMultiplier: 2.0,
    accuracy: 0.9,
    effectType: 'damage',
    additionalEffects: [],
  },
  restrictions: {
    maxUsesPerTurn: 1,
    maxUsesPerGame: -1, // -1 表示无限制
    conditions: [],
    disabledPhases: [],
    prerequisites: [],
  },
};

/**
 * 狼人技能配置
 */
export const WEREWOLF_SKILLS: Record<string, CompleteSkillConfig> = {
  // 狼人击杀技能
  WEREWOLF_KILL: {
    id: 'werewolf_kill',
    name: '狼人击杀',
    description: '在夜晚阶段击杀一名村民',
    type: 'attack',
    icon: 'wolf',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 0,
      cost: 0,
      castTime: 2000,
      range: 999,
      maxTargets: 1,
      interruptible: false,
      requiresTarget: true,
      allowedTargets: ['villager'],
    },
    effects: {
      basePower: 999,
      levelMultiplier: 1.0,
      criticalChance: 1.0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'instant_kill',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: -1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'night',
          message: '只能在夜晚使用',
        },
      ],
      disabledPhases: ['day', 'voting'],
      prerequisites: [],
    },
  },

  // 狼人嗅探技能
  WEREWOLF_SNIFF: {
    id: 'werewolf_sniff',
    name: '嗅探',
    description: '嗅探一名玩家的身份信息',
    type: 'detection',
    icon: 'nose',
    enabled: true,
    level: 1,
    maxLevel: 3,
    execution: {
      cooldown: 5000,
      duration: 0,
      cost: 20,
      castTime: 1500,
      range: 999,
      maxTargets: 1,
      interruptible: true,
      requiresTarget: true,
      allowedTargets: ['any'],
    },
    effects: {
      basePower: 0,
      levelMultiplier: 1.0,
      criticalChance: 0,
      criticalMultiplier: 1.0,
      accuracy: 0.8,
      effectType: 'detection',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: 3,
      conditions: [],
      disabledPhases: ['voting'],
      prerequisites: [],
    },
  },
};

/**
 * 村民技能配置
 */
export const VILLAGER_SKILLS: Record<string, CompleteSkillConfig> = {
  // 预言家技能
  SEER_DIVINE: {
    id: 'seer_divine',
    name: '预言',
    description: '查看一名玩家的真实身份',
    type: 'detection',
    icon: 'eye',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 0,
      cost: 0,
      castTime: 2000,
      range: 999,
      maxTargets: 1,
      interruptible: false,
      requiresTarget: true,
      allowedTargets: ['any'],
    },
    effects: {
      basePower: 0,
      levelMultiplier: 1.0,
      criticalChance: 0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'detection',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: -1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'night',
          message: '只能在夜晚使用',
        },
      ],
      disabledPhases: ['day', 'voting'],
      prerequisites: [],
    },
  },

  // 女巫毒药技能
  WITCH_POISON: {
    id: 'witch_poison',
    name: '毒药',
    description: '使用毒药杀死一名玩家',
    type: 'attack',
    icon: 'poison',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 0,
      cost: 0,
      castTime: 2000,
      range: 999,
      maxTargets: 1,
      interruptible: false,
      requiresTarget: true,
      allowedTargets: ['any'],
    },
    effects: {
      basePower: 999,
      levelMultiplier: 1.0,
      criticalChance: 1.0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'instant_kill',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: 1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'night',
          message: '只能在夜晚使用',
        },
      ],
      disabledPhases: ['day', 'voting'],
      prerequisites: [],
    },
  },

  // 女巫解药技能
  WITCH_ANTIDOTE: {
    id: 'witch_antidote',
    name: '解药',
    description: '救活一名被杀死的玩家',
    type: 'healing',
    icon: 'potion',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 0,
      cost: 0,
      castTime: 2000,
      range: 999,
      maxTargets: 1,
      interruptible: false,
      requiresTarget: true,
      allowedTargets: ['dead'],
    },
    effects: {
      basePower: 999,
      levelMultiplier: 1.0,
      criticalChance: 1.0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'resurrection',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: 1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'night',
          message: '只能在夜晚使用',
        },
      ],
      disabledPhases: ['day', 'voting'],
      prerequisites: [],
    },
  },

  // 守卫保护技能
  GUARD_PROTECT: {
    id: 'guard_protect',
    name: '守护',
    description: '保护一名玩家免受夜晚攻击',
    type: 'defense',
    icon: 'shield',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 24 * 60 * 60 * 1000, // 持续到下一个夜晚
      cost: 0,
      castTime: 2000,
      range: 999,
      maxTargets: 1,
      interruptible: false,
      requiresTarget: true,
      allowedTargets: ['alive'],
    },
    effects: {
      basePower: 0,
      levelMultiplier: 1.0,
      criticalChance: 0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'protection',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: -1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'night',
          message: '只能在夜晚使用',
        },
        {
          type: 'custom',
          operator: '!=',
          value: 'self',
          message: '不能保护自己',
        },
      ],
      disabledPhases: ['day', 'voting'],
      prerequisites: [],
    },
  },
};

/**
 * 通用技能配置
 */
export const COMMON_SKILLS: Record<string, CompleteSkillConfig> = {
  // 投票技能
  VOTE: {
    id: 'vote',
    name: '投票',
    description: '在投票阶段投票驱逐一名玩家',
    type: 'special',
    icon: 'vote',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 0,
      duration: 0,
      cost: 0,
      castTime: 1000,
      range: 999,
      maxTargets: 1,
      interruptible: true,
      requiresTarget: true,
      allowedTargets: ['alive'],
    },
    effects: {
      basePower: 0,
      levelMultiplier: 1.0,
      criticalChance: 0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'vote',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: 1,
      maxUsesPerGame: -1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'voting',
          message: '只能在投票阶段使用',
        },
      ],
      disabledPhases: ['night', 'day'],
      prerequisites: [],
    },
  },

  // 发言技能
  SPEAK: {
    id: 'speak',
    name: '发言',
    description: '在白天阶段发表言论',
    type: 'communication',
    icon: 'chat',
    enabled: true,
    level: 1,
    maxLevel: 1,
    execution: {
      cooldown: 1000,
      duration: 0,
      cost: 0,
      castTime: 0,
      range: 999,
      maxTargets: 0,
      interruptible: true,
      requiresTarget: false,
      allowedTargets: [],
    },
    effects: {
      basePower: 0,
      levelMultiplier: 1.0,
      criticalChance: 0,
      criticalMultiplier: 1.0,
      accuracy: 1.0,
      effectType: 'communication',
      additionalEffects: [],
    },
    restrictions: {
      maxUsesPerTurn: -1,
      maxUsesPerGame: -1,
      conditions: [
        {
          type: 'phase',
          operator: '==',
          value: 'day',
          message: '只能在白天发言',
        },
      ],
      disabledPhases: ['night', 'voting'],
      prerequisites: [],
    },
  },
};

/**
 * 所有技能配置
 */
export const ALL_SKILLS: Record<string, CompleteSkillConfig> = {
  ...WEREWOLF_SKILLS,
  ...VILLAGER_SKILLS,
  ...COMMON_SKILLS,
};

/**
 * 角色技能映射
 */
export const ROLE_SKILL_MAPPING: Record<RoleType, string[]> = {
  werewolf: ['werewolf_kill', 'werewolf_sniff', 'vote', 'speak'],
  seer: ['seer_divine', 'vote', 'speak'],
  witch: ['witch_poison', 'witch_antidote', 'vote', 'speak'],
  guard: ['guard_protect', 'vote', 'speak'],
  villager: ['vote', 'speak'],
  hunter: ['vote', 'speak'], // 猎人技能待添加
  fool: ['vote', 'speak'], // 白痴技能待添加
};

/**
 * 技能冷却时间配置
 */
export const SKILL_COOLDOWN_CONFIG = {
  /** 全局冷却时间倍数 */
  globalMultiplier: 1.0,
  /** 角色特定冷却时间倍数 */
  roleMultipliers: {
    werewolf: 1.0,
    seer: 1.0,
    witch: 1.0,
    guard: 1.0,
    villager: 1.0,
    hunter: 1.0,
    fool: 1.0,
  },
  /** 技能等级冷却时间减少 */
  levelReduction: 0.1, // 每级减少10%
  /** 最小冷却时间 */
  minimumCooldown: 500,
};

/**
 * 技能效果配置
 */
export const SKILL_EFFECT_CONFIG = {
  /** 伤害计算公式参数 */
  damage: {
    baseMultiplier: 1.0,
    levelBonus: 0.2,
    criticalMultiplier: 2.0,
    randomVariance: 0.1,
  },
  /** 治疗计算公式参数 */
  healing: {
    baseMultiplier: 1.0,
    levelBonus: 0.15,
    criticalMultiplier: 1.5,
    randomVariance: 0.05,
  },
  /** 命中率配置 */
  accuracy: {
    baseAccuracy: 0.9,
    levelBonus: 0.02,
    maximumAccuracy: 0.99,
  },
  /** 暴击率配置 */
  critical: {
    baseChance: 0.1,
    levelBonus: 0.01,
    maximumChance: 0.5,
  },
};

/**
 * 技能升级配置
 */
export const SKILL_UPGRADE_CONFIG = {
  /** 升级消耗 */
  costs: {
    experience: [100, 200, 400, 800], // 每级所需经验
    gold: [50, 100, 200, 400], // 每级所需金币
    materials: [1, 2, 4, 8], // 每级所需材料
  },
  /** 升级加成 */
  bonuses: {
    power: 0.2, // 每级威力增加20%
    accuracy: 0.02, // 每级命中率增加2%
    critical: 0.01, // 每级暴击率增加1%
    cooldownReduction: 0.1, // 每级冷却时间减少10%
  },
};

/**
 * 获取技能配置
 * @param skillId - 技能ID
 * @returns 技能配置
 */
export function getSkillConfig(skillId: string): CompleteSkillConfig | null {
  return ALL_SKILLS[skillId] || null;
}

/**
 * 获取角色技能列表
 * @param role - 角色类型
 * @returns 技能配置数组
 */
export function getRoleSkills(role: RoleType): CompleteSkillConfig[] {
  const skillIds = ROLE_SKILL_MAPPING[role] || [];
  return skillIds.map(id => ALL_SKILLS[id]).filter(Boolean);
}

/**
 * 检查技能是否可用
 * @param skillId - 技能ID
 * @param context - 检查上下文
 * @returns 是否可用
 */
export function isSkillAvailable(
  skillId: string,
  context: {
    phase: string;
    playerRole: RoleType;
    usageCount: number;
    gameUsageCount: number;
  }
): boolean {
  const skill = getSkillConfig(skillId);
  if (!skill || !skill.enabled) {
    return false;
  }

  // 检查角色权限
  const roleSkills = ROLE_SKILL_MAPPING[context.playerRole] || [];
  if (!roleSkills.includes(skillId)) {
    return false;
  }

  // 检查阶段限制
  if (skill.restrictions.disabledPhases.includes(context.phase)) {
    return false;
  }

  // 检查使用次数限制
  if (
    skill.restrictions.maxUsesPerTurn > 0 &&
    context.usageCount >= skill.restrictions.maxUsesPerTurn
  ) {
    return false;
  }

  if (
    skill.restrictions.maxUsesPerGame > 0 &&
    context.gameUsageCount >= skill.restrictions.maxUsesPerGame
  ) {
    return false;
  }

  return true;
}

/**
 * 计算技能伤害
 * @param skillId - 技能ID
 * @param level - 技能等级
 * @param isCritical - 是否暴击
 * @returns 伤害值
 */
export function calculateSkillDamage(
  skillId: string,
  level: number = 1,
  isCritical: boolean = false
): number {
  const skill = getSkillConfig(skillId);
  if (!skill) {
    return 0;
  }

  const { basePower, levelMultiplier, criticalMultiplier } = skill.effects;
  const { baseMultiplier, levelBonus, randomVariance } =
    SKILL_EFFECT_CONFIG.damage;

  let damage = basePower * baseMultiplier;
  damage *= Math.pow(levelMultiplier, level - 1);
  damage *= 1 + levelBonus * (level - 1);

  if (isCritical) {
    damage *= criticalMultiplier;
  }

  // 添加随机变化
  const variance = 1 + (Math.random() - 0.5) * 2 * randomVariance;
  damage *= variance;

  return Math.round(damage);
}

/**
 * 计算技能冷却时间
 * @param skillId - 技能ID
 * @param level - 技能等级
 * @param role - 角色类型
 * @returns 冷却时间（毫秒）
 */
export function calculateSkillCooldown(
  skillId: string,
  level: number = 1,
  role: RoleType
): number {
  const skill = getSkillConfig(skillId);
  if (!skill) {
    return 0;
  }

  let cooldown = skill.execution.cooldown;

  // 应用全局倍数
  cooldown *= SKILL_COOLDOWN_CONFIG.globalMultiplier;

  // 应用角色倍数
  cooldown *= SKILL_COOLDOWN_CONFIG.roleMultipliers[role] || 1.0;

  // 应用等级减少
  const levelReduction = SKILL_COOLDOWN_CONFIG.levelReduction * (level - 1);
  cooldown *= 1 - levelReduction;

  // 确保不低于最小冷却时间
  cooldown = Math.max(cooldown, SKILL_COOLDOWN_CONFIG.minimumCooldown);

  return Math.round(cooldown);
}
