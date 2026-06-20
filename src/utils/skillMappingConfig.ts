// 技能系统统一配置文件 - 优化版本
// 基于设计文档的完整技能映射和配置，支持标准化数据结构

export interface SkillConfig {
  id: string;
  chineseName: string;
  englishName: string;
  priority: number; // 1-9，对应设计表格中的判定顺序
  phase: 'day' | 'evening' | 'night' | 'dawn';
  usageLimit: number | 'unlimited';
  requiredStatus: ('normal' | 'dying' | 'weak' | 'eliminated')[];
  targetType: 'none' | 'single' | 'multiple' | 'self';
  effectType: (
    | 'elimination'
    | 'protection'
    | 'investigation'
    | 'status_change'
    | 'passive'
  )[];
  isPassive: boolean;
  conflictsWith: string[]; // 与哪些技能冲突
  triggeredBy?: string[]; // 被动技能的触发条件
  // 新增字段用于优化
  cooldownRounds?: number; // 冷却回合数
  maxStackCount?: number; // 最大叠加层数
  category?: 'offensive' | 'defensive' | 'utility' | 'passive'; // 技能分类
  description?: string; // 技能描述
  compatibilityVersion?: string; // 兼容性版本
}

// 基于设计表格的完整技能配置
export const SKILL_MAPPING_CONFIG: Record<string, SkillConfig> = {
  // 村民 - 判定顺序1
  villager_sleep: {
    id: 'villager_sleep',
    chineseName: '睡觉',
    englishName: 'Sleep',
    priority: 1,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'none',
    effectType: ['passive'],
    isPassive: true,
    conflictsWith: [],
    triggeredBy: ['night_phase_start'],
    category: 'passive',
    description: '村民在夜晚安全睡觉，无特殊能力',
    compatibilityVersion: '2.0',
  },

  // 守卫 - 判定顺序2
  guard_vigil: {
    id: 'guard_vigil',
    chineseName: '守夜',
    englishName: 'vigil',
    priority: 2,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'single',
    effectType: ['protection'],
    isPassive: false,
    conflictsWith: ['werewolf_attack'],
    triggeredBy: [],
    category: 'defensive',
    description: '守卫可以保护一名玩家免受夜晚攻击',
    maxStackCount: 1,
    compatibilityVersion: '2.0',
  },

  // 狼人 - 判定顺序3
  werewolf_attack: {
    id: 'werewolf_attack',
    chineseName: '夜袭',
    englishName: 'night_attack',
    priority: 3,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'single',
    effectType: ['elimination'],
    isPassive: false,
    conflictsWith: ['guard_vigil'],
    triggeredBy: [],
    category: 'offensive',
    description: '狼人在夜晚攻击一名玩家',
    compatibilityVersion: '2.0',
  },

  // 预言家 - 判定顺序4
  seer_prophecy: {
    id: 'seer_prophecy',
    chineseName: '占卜',
    englishName: 'prophecy',
    priority: 4,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'single',
    effectType: ['investigation'],
    isPassive: false,
    conflictsWith: [],
    triggeredBy: [],
  },

  // 恶魔 - 判定顺序5
  demon_eye: {
    id: 'demon_eye',
    chineseName: '恶魔之眼',
    englishName: 'demon_eye',
    priority: 5,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'single',
    effectType: ['investigation'],
    isPassive: false,
    conflictsWith: [],
    triggeredBy: [],
  },

  // 女巫 - 判定顺序6
  witch_potion: {
    id: 'witch_potion',
    chineseName: '魔药',
    englishName: 'magic_potion',
    priority: 6,
    phase: 'night',
    usageLimit: 2, // 解药1次，毒药1次
    requiredStatus: ['normal', 'dying'],
    targetType: 'single',
    effectType: ['protection', 'elimination'],
    isPassive: false,
    conflictsWith: [],
    triggeredBy: [],
    category: 'utility',
    description: '女巫可以使用解药或毒药，每种只能使用一次',
    compatibilityVersion: '2.0',
  },

  // 暗夜术士 - 判定顺序7
  warlock_voodoo: {
    id: 'warlock_voodoo',
    chineseName: '巫毒术',
    englishName: 'voodoo',
    priority: 7,
    phase: 'night',
    usageLimit: 1,
    requiredStatus: ['normal', 'dying'],
    targetType: 'single',
    effectType: ['elimination'],
    isPassive: false,
    conflictsWith: [],
    triggeredBy: [],
  },

  // 白狼王 - 判定顺序8
  whitewolf_destruct: {
    id: 'whitewolf_destruct',
    chineseName: '白爆',
    englishName: 'self_destruct',
    priority: 8,
    phase: 'night',
    usageLimit: 1,
    requiredStatus: ['normal', 'dying'],
    targetType: 'single',
    effectType: ['elimination'],
    isPassive: false,
    conflictsWith: [],
    triggeredBy: [],
  },

  // 猎人 - 判定顺序9
  hunter_revenge: {
    id: 'hunter_revenge',
    chineseName: '濒死击毙',
    englishName: 'dying_shot',
    priority: 9,
    phase: 'day', // 可在白天触发
    usageLimit: 1,
    requiredStatus: ['dying'],
    targetType: 'single',
    effectType: ['elimination'],
    isPassive: true, // 被动技能
    conflictsWith: [],
    triggeredBy: ['status_change_to_dying'],
    category: 'offensive',
    description: '猎人濒死时可以击毙一名玩家',
    compatibilityVersion: '2.0',
  },
};

// 工具函数：根据中文名获取技能配置
export const getSkillConfigByChinese = (
  chineseName: string
): SkillConfig | null => {
  return (
    Object.values(SKILL_MAPPING_CONFIG).find(
      config => config.chineseName === chineseName
    ) || null
  );
};

// 工具函数：根据英文名获取技能配置
export const getSkillConfigByEnglish = (
  englishName: string
): SkillConfig | null => {
  return (
    Object.values(SKILL_MAPPING_CONFIG).find(
      config => config.englishName === englishName
    ) || null
  );
};

// 工具函数：根据优先级排序技能
export const sortSkillsByPriority = (
  skillConfigs: SkillConfig[]
): SkillConfig[] => {
  return [...skillConfigs].sort((a, b) => a.priority - b.priority);
};

// 工具函数：检查技能冲突
export const checkSkillConflicts = (
  activeSkills: SkillConfig[]
): { conflicts: boolean; conflictPairs: string[][] } => {
  const conflicts: string[][] = [];

  for (let i = 0; i < activeSkills.length; i++) {
    for (let j = i + 1; j < activeSkills.length; j++) {
      const skill1 = activeSkills[i];
      const skill2 = activeSkills[j];

      if (
        skill1.conflictsWith.includes(skill2.id) ||
        skill2.conflictsWith.includes(skill1.id)
      ) {
        conflicts.push([skill1.id, skill2.id]);
      }
    }
  }

  return {
    conflicts: conflicts.length > 0,
    conflictPairs: conflicts,
  };
};

// 工具函数：解决技能冲突（优先级高的生效）
export const resolveSkillConflicts = (
  conflictingSkills: SkillConfig[]
): SkillConfig[] => {
  if (conflictingSkills.length <= 1) return conflictingSkills;

  // 按优先级排序，数字小的优先级高
  const sorted = sortSkillsByPriority(conflictingSkills);

  const resolved: SkillConfig[] = [];

  for (const skill of sorted) {
    // 检查当前技能是否与已解决的技能冲突
    const hasConflict = resolved.some(
      resolvedSkill =>
        skill.conflictsWith.includes(resolvedSkill.id) ||
        resolvedSkill.conflictsWith.includes(skill.id)
    );

    if (!hasConflict) {
      resolved.push(skill);
    }
  }

  return resolved;
};

// 角色与技能的映射关系
export const ROLE_SKILL_MAPPING: Record<string, string> = {
  villager: 'villager_sleep',
  guard: 'guard_vigil',
  werewolf: 'werewolf_attack',
  seer: 'seer_prophecy',
  demon: 'demon_eye',
  witch: 'witch_potion',
  warlock: 'warlock_voodoo',
  whitewolf: 'whitewolf_destruct',
  hunter: 'hunter_revenge',
};

// 阵营配置
export const FACTION_CONFIG = {
  GOOD: {
    name: '好人阵营',
    roles: ['villager', 'guard', 'seer', 'witch', 'hunter'],
    victoryCondition: '消灭所有狼人',
  },
  WOLF: {
    name: '狼人阵营',
    roles: ['werewolf', 'demon', 'warlock', 'whitewolf'],
    victoryCondition: '消灭所有好人或数量平衡',
  },
} as const;
