/**
 * @fileoverview 游戏配置文件
 * 统一管理所有游戏相关的配置信息，包括游戏规则、时间设置、玩家配置等
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import type {
  RoleType,
  GamePhase,
  GameMode,
  DifficultyLevel,
} from '@/types/game';

/**
 * 游戏基础配置接口
 */
export interface GameBaseConfig {
  /** 游戏名称 */
  name: string;
  /** 游戏版本 */
  version: string;
  /** 游戏描述 */
  description: string;
  /** 最小玩家数 */
  minPlayers: number;
  /** 最大玩家数 */
  maxPlayers: number;
  /** 默认游戏模式 */
  defaultMode: GameMode;
  /** 默认难度等级 */
  defaultDifficulty: DifficultyLevel;
  /** 是否启用调试模式 */
  debugMode: boolean;
}

/**
 * 游戏时间配置接口
 */
export interface GameTimeConfig {
  /** 白天阶段时长（秒） */
  dayPhaseDuration: number;
  /** 夜晚阶段时长（秒） */
  nightPhaseDuration: number;
  /** 投票阶段时长（秒） */
  votingPhaseDuration: number;
  /** 讨论阶段时长（秒） */
  discussionPhaseDuration: number;
  /** 技能使用时长（秒） */
  skillUseDuration: number;
  /** 遗言时长（秒） */
  lastWordsDuration: number;
  /** 游戏准备时长（秒） */
  preparationDuration: number;
  /** 结果展示时长（秒） */
  resultDisplayDuration: number;
  /** 自动进入下一阶段的延迟（秒） */
  autoAdvanceDelay: number;
  /** 是否启用自动进入下一阶段 */
  enableAutoAdvance: boolean;
}

/**
 * 角色配置接口
 */
export interface RoleConfig {
  /** 角色类型 */
  type: RoleType;
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description: string;
  /** 角色阵营 */
  faction: 'werewolf' | 'villager' | 'neutral';
  /** 角色图标 */
  icon: string;
  /** 角色颜色 */
  color: string;
  /** 胜利条件 */
  winCondition: string;
  /** 特殊能力描述 */
  abilities: string[];
  /** 是否在游戏开始时公开身份 */
  isPublic: boolean;
  /** 优先级（用于技能执行顺序） */
  priority: number;
  /** 是否可以被预言家查验 */
  canBeDetected: boolean;
  /** 查验结果（好人/坏人） */
  detectionResult: 'good' | 'evil';
}

/**
 * 游戏规则配置接口
 */
export interface GameRulesConfig {
  /** 是否允许平票 */
  allowTies: boolean;
  /** 平票时的处理方式 */
  tieResolution: 'no_elimination' | 'random_elimination' | 'revote';
  /** 是否允许弃票 */
  allowAbstention: boolean;
  /** 是否显示投票结果 */
  showVoteResults: boolean;
  /** 是否允许遗言 */
  allowLastWords: boolean;
  /** 是否允许死者观战 */
  allowSpectating: boolean;
  /** 是否启用技能冷却 */
  enableSkillCooldown: boolean;
  /** 是否启用角色平衡 */
  enableRoleBalance: boolean;
  /** 是否启用随机事件 */
  enableRandomEvents: boolean;
  /** 是否启用成就系统 */
  enableAchievements: boolean;
  /** 是否启用经验系统 */
  enableExperience: boolean;
  /** 是否启用排行榜 */
  enableLeaderboard: boolean;
}

/**
 * 胜利条件配置接口
 */
export interface WinConditionConfig {
  /** 狼人胜利条件 */
  werewolf: {
    /** 狼人数量大于等于村民数量 */
    outnumberVillagers: boolean;
    /** 消灭所有村民 */
    eliminateAllVillagers: boolean;
    /** 消灭所有特殊角色 */
    eliminateSpecialRoles: boolean;
  };
  /** 村民胜利条件 */
  villager: {
    /** 消灭所有狼人 */ eliminateAllWerewolves: boolean;
    /** 存活到游戏结束 */
    surviveToEnd: boolean;
  };
  /** 第三方胜利条件 */
  thirdParty: {
    /** 独狼胜利条件 */
    loneWolf: {
      /** 成为最后存活者 */
      lastSurvivor: boolean;
    };
    /** 丘比特胜利条件 */
    cupid: {
      /** 情侣双双存活 */
      loversSurvive: boolean;
    };
  };
}

/**
 * 难度等级配置接口
 */
export interface DifficultyConfig {
  /** 难度等级 */
  level: DifficultyLevel;
  /** 难度名称 */
  name: string;
  /** 难度描述 */
  description: string;
  /** 时间倍数 */
  timeMultiplier: number;
  /** 技能冷却倍数 */
  skillCooldownMultiplier: number;
  /** 提示等级 */
  hintLevel: 'none' | 'basic' | 'detailed';
  /** 是否显示角色提示 */
  showRoleHints: boolean;
  /** 是否显示技能提示 */
  showSkillHints: boolean;
  /** 是否启用新手保护 */
  enableNewbieProtection: boolean;
}

/**
 * 游戏模式配置接口
 */
export interface GameModeConfig {
  /** 游戏模式 */
  mode: GameMode;
  /** 模式名称 */
  name: string;
  /** 模式描述 */
  description: string;
  /** 推荐玩家数 */
  recommendedPlayers: number[];
  /** 角色配置 */
  roleDistribution: Record<
    RoleType,
    number | ((playerCount: number) => number)
  >;
  /** 特殊规则 */
  specialRules: string[];
  /** 是否启用特殊角色 */
  enableSpecialRoles: boolean;
  /** 是否启用随机角色 */
  enableRandomRoles: boolean;
}

/**
 * 默认游戏基础配置
 */
export const DEFAULT_GAME_CONFIG: GameBaseConfig = {
  name: '狼人杀学习任务',
  version: '1.0.0',
  description: '一个教育性的狼人杀游戏，帮助玩家学习逻辑推理和团队协作',
  minPlayers: 6,
  maxPlayers: 12,
  defaultMode: 'classic',
  defaultDifficulty: 'normal',
  debugMode: false,
};

/**
 * 默认游戏时间配置
 */
export const DEFAULT_TIME_CONFIG: GameTimeConfig = {
  dayPhaseDuration: 300, // 5分钟
  nightPhaseDuration: 120, // 2分钟
  votingPhaseDuration: 180, // 3分钟
  discussionPhaseDuration: 240, // 4分钟
  skillUseDuration: 30, // 30秒
  lastWordsDuration: 60, // 1分钟
  preparationDuration: 30, // 30秒
  resultDisplayDuration: 10, // 10秒
  autoAdvanceDelay: 5, // 5秒
  enableAutoAdvance: true,
};

/**
 * 角色配置
 */
export const ROLE_CONFIGS: Record<RoleType, RoleConfig> = {
  werewolf: {
    type: 'werewolf',
    name: '狼人',
    description: '夜晚可以击杀村民的邪恶角色',
    faction: 'werewolf',
    icon: 'wolf',
    color: '#dc2626',
    winCondition: '消灭所有村民或使狼人数量大于等于村民数量',
    abilities: ['夜晚击杀', '狼人间交流', '伪装身份'],
    isPublic: false,
    priority: 1,
    canBeDetected: true,
    detectionResult: 'evil',
  },
  seer: {
    type: 'seer',
    name: '预言家',
    description: '每晚可以查验一名玩家身份的神职',
    faction: 'villager',
    icon: 'eye',
    color: '#2563eb',
    winCondition: '消灭所有狼人',
    abilities: ['夜晚查验身份', '获得准确信息'],
    isPublic: false,
    priority: 2,
    canBeDetected: true,
    detectionResult: 'good',
  },
  witch: {
    type: 'witch',
    name: '女巫',
    description: '拥有毒药和解药的神职角色',
    faction: 'villager',
    icon: 'potion',
    color: '#7c3aed',
    winCondition: '消灭所有狼人',
    abilities: ['解药救人', '毒药杀人', '获得死亡信息'],
    isPublic: false,
    priority: 3,
    canBeDetected: true,
    detectionResult: 'good',
  },
  guard: {
    type: 'guard',
    name: '守卫',
    description: '每晚可以保护一名玩家的神职',
    faction: 'villager',
    icon: 'shield',
    color: '#059669',
    winCondition: '消灭所有狼人',
    abilities: ['夜晚保护', '阻止击杀', '不能连续保护同一人'],
    isPublic: false,
    priority: 4,
    canBeDetected: true,
    detectionResult: 'good',
  },
  hunter: {
    type: 'hunter',
    name: '猎人',
    description: '死亡时可以开枪带走一名玩家',
    faction: 'villager',
    icon: 'crosshair',
    color: '#ea580c',
    winCondition: '消灭所有狼人',
    abilities: ['死亡开枪', '选择目标', '不能被毒死开枪'],
    isPublic: false,
    priority: 5,
    canBeDetected: true,
    detectionResult: 'good',
  },
  villager: {
    type: 'villager',
    name: '村民',
    description: '普通的村民，只能通过投票参与游戏',
    faction: 'villager',
    icon: 'user',
    color: '#6b7280',
    winCondition: '消灭所有狼人',
    abilities: ['白天发言', '投票驱逐', '逻辑推理'],
    isPublic: false,
    priority: 6,
    canBeDetected: true,
    detectionResult: 'good',
  },
  fool: {
    type: 'fool',
    name: '白痴',
    description: '被投票出局后翻牌，失去投票权但可以继续发言',
    faction: 'villager',
    icon: 'smile',
    color: '#f59e0b',
    winCondition: '消灭所有狼人',
    abilities: ['翻牌后继续发言', '失去投票权', '不会被夜晚击杀'],
    isPublic: false,
    priority: 7,
    canBeDetected: true,
    detectionResult: 'good',
  },
};

/**
 * 默认游戏规则配置
 */
export const DEFAULT_RULES_CONFIG: GameRulesConfig = {
  allowTies: true,
  tieResolution: 'no_elimination',
  allowAbstention: true,
  showVoteResults: true,
  allowLastWords: true,
  allowSpectating: true,
  enableSkillCooldown: true,
  enableRoleBalance: true,
  enableRandomEvents: false,
  enableAchievements: true,
  enableExperience: true,
  enableLeaderboard: true,
};

/**
 * 胜利条件配置
 */
export const WIN_CONDITIONS: WinConditionConfig = {
  werewolf: {
    outnumberVillagers: true,
    eliminateAllVillagers: false,
    eliminateSpecialRoles: false,
  },
  villager: {
    eliminateAllWerewolves: true,
    surviveToEnd: false,
  },
  thirdParty: {
    loneWolf: {
      lastSurvivor: true,
    },
    cupid: {
      loversSurvive: true,
    },
  },
};

/**
 * 难度配置
 */
export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    level: 'easy',
    name: '简单',
    description: '适合新手玩家，有详细提示和较长思考时间',
    timeMultiplier: 1.5,
    skillCooldownMultiplier: 0.8,
    hintLevel: 'detailed',
    showRoleHints: true,
    showSkillHints: true,
    enableNewbieProtection: true,
  },
  normal: {
    level: 'normal',
    name: '普通',
    description: '标准难度，平衡的游戏体验',
    timeMultiplier: 1.0,
    skillCooldownMultiplier: 1.0,
    hintLevel: 'basic',
    showRoleHints: true,
    showSkillHints: false,
    enableNewbieProtection: false,
  },
  hard: {
    level: 'hard',
    name: '困难',
    description: '适合有经验的玩家，时间紧张，无提示',
    timeMultiplier: 0.7,
    skillCooldownMultiplier: 1.2,
    hintLevel: 'none',
    showRoleHints: false,
    showSkillHints: false,
    enableNewbieProtection: false,
  },
  expert: {
    level: 'expert',
    name: '专家',
    description: '极限挑战，最短时间，最高难度',
    timeMultiplier: 0.5,
    skillCooldownMultiplier: 1.5,
    hintLevel: 'none',
    showRoleHints: false,
    showSkillHints: false,
    enableNewbieProtection: false,
  },
};

/**
 * 游戏模式配置
 */
export const GAME_MODE_CONFIGS: Record<GameMode, GameModeConfig> = {
  classic: {
    mode: 'classic',
    name: '经典模式',
    description: '标准的狼人杀游戏模式',
    recommendedPlayers: [6, 7, 8, 9, 10, 11, 12],
    roleDistribution: {
      werewolf: (playerCount: number) => Math.floor(playerCount / 3),
      seer: 1,
      witch: 1,
      guard: (playerCount: number) => (playerCount >= 8 ? 1 : 0),
      hunter: (playerCount: number) => (playerCount >= 9 ? 1 : 0),
      villager: (playerCount: number) => {
        const werewolves = Math.floor(playerCount / 3);
        const specialRoles =
          2 + (playerCount >= 8 ? 1 : 0) + (playerCount >= 9 ? 1 : 0);
        return playerCount - werewolves - specialRoles;
      },
      fool: 0,
    },
    specialRules: [
      '预言家每晚查验一人',
      '女巫拥有一瓶毒药和一瓶解药',
      '守卫每晚保护一人，不能连续保护同一人',
      '猎人死亡时可以开枪带走一人',
    ],
    enableSpecialRoles: true,
    enableRandomRoles: false,
  },
  simple: {
    mode: 'simple',
    name: '简化模式',
    description: '只有狼人、预言家和村民的简单模式',
    recommendedPlayers: [6, 7, 8],
    roleDistribution: {
      werewolf: (playerCount: number) => Math.floor(playerCount / 3),
      seer: 1,
      witch: 0,
      guard: 0,
      hunter: 0,
      villager: (playerCount: number) =>
        playerCount - Math.floor(playerCount / 3) - 1,
      fool: 0,
    },
    specialRules: [
      '只有狼人、预言家和村民',
      '预言家每晚查验一人',
      '没有其他特殊角色',
    ],
    enableSpecialRoles: false,
    enableRandomRoles: false,
  },
  chaos: {
    mode: 'chaos',
    name: '混乱模式',
    description: '随机角色分配的混乱模式',
    recommendedPlayers: [8, 9, 10, 11, 12],
    roleDistribution: {
      werewolf: (playerCount: number) => Math.floor(playerCount / 4),
      seer: (playerCount: number) => (Math.random() > 0.5 ? 1 : 0),
      witch: (playerCount: number) => (Math.random() > 0.5 ? 1 : 0),
      guard: (playerCount: number) => (Math.random() > 0.5 ? 1 : 0),
      hunter: (playerCount: number) => (Math.random() > 0.5 ? 1 : 0),
      villager: (playerCount: number) => {
        // 动态计算剩余村民数量
        return Math.max(1, playerCount - Math.floor(playerCount / 4) - 2);
      },
      fool: (playerCount: number) => (Math.random() > 0.8 ? 1 : 0),
    },
    specialRules: [
      '随机角色分配',
      '每局游戏角色组合都不同',
      '增加游戏的不确定性和挑战性',
    ],
    enableSpecialRoles: true,
    enableRandomRoles: true,
  },
  training: {
    mode: 'training',
    name: '训练模式',
    description: '用于学习和练习的训练模式',
    recommendedPlayers: [6, 7, 8],
    roleDistribution: {
      werewolf: 2,
      seer: 1,
      witch: 1,
      guard: 0,
      hunter: 0,
      villager: (playerCount: number) => playerCount - 4,
      fool: 0,
    },
    specialRules: [
      '固定角色配置便于学习',
      '提供详细的游戏指导',
      '支持暂停和回放功能',
    ],
    enableSpecialRoles: true,
    enableRandomRoles: false,
  },
};

/**
 * 游戏阶段配置
 */
export const GAME_PHASE_CONFIG = {
  /** 阶段顺序 */
  phaseOrder: [
    'preparation',
    'day',
    'voting',
    'night',
    'result',
  ] as GamePhase[],
  /** 阶段名称 */
  phaseNames: {
    preparation: '准备阶段',
    day: '白天讨论',
    voting: '投票阶段',
    night: '夜晚行动',
    result: '结果公布',
  },
  /** 阶段描述 */
  phaseDescriptions: {
    preparation: '游戏准备中，请等待所有玩家就绪',
    day: '白天时间，所有玩家可以自由讨论',
    voting: '投票时间，请选择要驱逐的玩家',
    night: '夜晚时间，特殊角色可以使用技能',
    result: '公布本轮结果',
  },
  /** 阶段图标 */
  phaseIcons: {
    preparation: 'clock',
    day: 'sun',
    voting: 'vote',
    night: 'moon',
    result: 'trophy',
  },
  /** 阶段颜色 */
  phaseColors: {
    preparation: '#6b7280',
    day: '#f59e0b',
    voting: '#dc2626',
    night: '#1e40af',
    result: '#059669',
  },
};

/**
 * 游戏事件配置
 */
export const GAME_EVENT_CONFIG = {
  /** 事件类型 */
  eventTypes: {
    GAME_START: 'game_start',
    GAME_END: 'game_end',
    PHASE_CHANGE: 'phase_change',
    PLAYER_DEATH: 'player_death',
    PLAYER_ELIMINATION: 'player_elimination',
    SKILL_USE: 'skill_use',
    VOTE_CAST: 'vote_cast',
    CHAT_MESSAGE: 'chat_message',
    SYSTEM_MESSAGE: 'system_message',
  },
  /** 事件优先级 */
  eventPriorities: {
    CRITICAL: 1,
    HIGH: 2,
    NORMAL: 3,
    LOW: 4,
  },
  /** 事件持久化配置 */
  persistence: {
    saveToDatabase: true,
    maxHistoryLength: 1000,
    compressionEnabled: true,
  },
};

/**
 * 性能配置
 */
export const PERFORMANCE_CONFIG = {
  /** WebSocket配置 */
  websocket: {
    heartbeatInterval: 30000, // 30秒
    reconnectAttempts: 5,
    reconnectDelay: 3000, // 3秒
    messageQueueSize: 100,
  },
  /** 缓存配置 */
  cache: {
    gameStateTTL: 3600000, // 1小时
    playerDataTTL: 1800000, // 30分钟
    skillDataTTL: 600000, // 10分钟
    maxCacheSize: 1000,
  },
  /** 渲染配置 */
  rendering: {
    maxFPS: 60,
    enableVSync: true,
    enableHardwareAcceleration: true,
    batchUpdateInterval: 16, // ~60fps
  },
};

/**
 * 安全配置
 */
export const SECURITY_CONFIG = {
  /** 输入验证 */
  validation: {
    maxMessageLength: 500,
    maxNicknameLength: 20,
    allowedCharacters: /^[a-zA-Z0-9\u4e00-\u9fa5\s\-_]+$/,
    profanityFilter: true,
  },
  /** 速率限制 */
  rateLimit: {
    messagesPerMinute: 30,
    actionsPerMinute: 60,
    skillUsesPerMinute: 10,
  },
  /** 反作弊 */
  antiCheat: {
    enableInputValidation: true,
    enableTimingValidation: true,
    enableBehaviorAnalysis: true,
    suspiciousActivityThreshold: 5,
  },
};

/**
 * 获取游戏配置
 * @param mode - 游戏模式
 * @param difficulty - 难度等级
 * @param playerCount - 玩家数量
 * @returns 完整的游戏配置
 */
export function getGameConfig(
  mode: GameMode = 'classic',
  difficulty: DifficultyLevel = 'normal',
  playerCount: number = 8
) {
  const modeConfig = GAME_MODE_CONFIGS[mode];
  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];
  const timeConfig = { ...DEFAULT_TIME_CONFIG };

  // 应用难度时间倍数
  Object.keys(timeConfig).forEach(key => {
    if (key.includes('Duration') || key.includes('Delay')) {
      (timeConfig as any)[key] *= difficultyConfig.timeMultiplier;
    }
  });

  return {
    base: DEFAULT_GAME_CONFIG,
    time: timeConfig,
    rules: DEFAULT_RULES_CONFIG,
    mode: modeConfig,
    difficulty: difficultyConfig,
    roles: ROLE_CONFIGS,
    winConditions: WIN_CONDITIONS,
    phases: GAME_PHASE_CONFIG,
    events: GAME_EVENT_CONFIG,
    performance: PERFORMANCE_CONFIG,
    security: SECURITY_CONFIG,
    playerCount,
  };
}

/**
 * 计算角色分配
 * @param mode - 游戏模式
 * @param playerCount - 玩家数量
 * @returns 角色分配结果
 */
export function calculateRoleDistribution(
  mode: GameMode,
  playerCount: number
): Record<RoleType, number> {
  const modeConfig = GAME_MODE_CONFIGS[mode];
  const distribution: Record<RoleType, number> = {} as any;

  Object.entries(modeConfig.roleDistribution).forEach(([role, count]) => {
    if (typeof count === 'function') {
      distribution[role as RoleType] = count(playerCount);
    } else {
      distribution[role as RoleType] = count;
    }
  });

  return distribution;
}

/**
 * 验证游戏配置
 * @param config - 游戏配置
 * @returns 验证结果
 */
export function validateGameConfig(config: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 验证玩家数量
  if (config.playerCount < DEFAULT_GAME_CONFIG.minPlayers) {
    errors.push(`玩家数量不能少于${DEFAULT_GAME_CONFIG.minPlayers}人`);
  }
  if (config.playerCount > DEFAULT_GAME_CONFIG.maxPlayers) {
    errors.push(`玩家数量不能超过${DEFAULT_GAME_CONFIG.maxPlayers}人`);
  }

  // 验证角色分配
  const roleDistribution = calculateRoleDistribution(
    config.mode?.mode || 'classic',
    config.playerCount
  );
  const totalRoles = Object.values(roleDistribution).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalRoles !== config.playerCount) {
    errors.push(
      `角色分配总数(${totalRoles})与玩家数量(${config.playerCount})不匹配`
    );
  }

  // 验证狼人数量
  const werewolfCount = roleDistribution.werewolf || 0;
  const villagerCount = config.playerCount - werewolfCount;

  if (werewolfCount >= villagerCount) {
    errors.push('狼人数量不能大于等于村民数量');
  }

  if (werewolfCount < 1) {
    errors.push('至少需要1个狼人');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 获取推荐的游戏配置
 * @param playerCount - 玩家数量
 * @returns 推荐的游戏配置
 */
export function getRecommendedGameConfig(playerCount: number) {
  let recommendedMode: GameMode = 'classic';
  let recommendedDifficulty: DifficultyLevel = 'normal';

  // 根据玩家数量推荐模式
  if (playerCount <= 6) {
    recommendedMode = 'simple';
  } else if (playerCount >= 10) {
    recommendedMode = 'classic';
  } else {
    recommendedMode = 'classic';
  }

  // 根据玩家数量推荐难度
  if (playerCount <= 6) {
    recommendedDifficulty = 'easy';
  } else if (playerCount >= 10) {
    recommendedDifficulty = 'normal';
  }

  return getGameConfig(recommendedMode, recommendedDifficulty, playerCount);
}
