/**
 * @fileoverview 验证规则配置文件
 * 统一管理所有数据验证规则，包括用户输入、游戏状态、技能使用等验证逻辑
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
import type { SkillType } from '@/types/skill';

/**
 * 验证规则接口
 */
export interface ValidationRule<T = any> {
  /** 规则名称 */
  name: string;
  /** 规则描述 */
  description: string;
  /** 验证函数 */
  validate: (value: T, context?: any) => boolean;
  /** 错误消息 */
  errorMessage: string | ((value: T, context?: any) => string);
  /** 是否为必需验证 */
  required: boolean;
  /** 验证优先级 */
  priority: number;
}

/**
 * 验证结果接口
 */
export interface ValidationResult {
  /** 是否通过验证 */
  isValid: boolean;
  /** 错误消息列表 */
  errors: string[];
  /** 警告消息列表 */
  warnings: string[];
  /** 验证的字段名 */
  field?: string;
  /** 验证的值 */
  value?: any;
}

/**
 * 验证上下文接口
 */
export interface ValidationContext {
  /** 当前用户ID */
  userId?: string;
  /** 当前游戏ID */
  gameId?: string;
  /** 当前游戏阶段 */
  gamePhase?: GamePhase;
  /** 当前用户角色 */
  userRole?: RoleType;
  /** 游戏模式 */
  gameMode?: GameMode;
  /** 难度等级 */
  difficulty?: DifficultyLevel;
  /** 玩家数量 */
  playerCount?: number;
  /** 额外数据 */
  extra?: Record<string, any>;
}

/**
 * 字符串验证规则
 */
export const STRING_VALIDATION_RULES = {
  /** 用户名验证 */
  USERNAME: {
    name: 'username',
    description: '用户名格式验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      return /^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,20}$/.test(value.trim());
    },
    errorMessage:
      '用户名必须是2-20个字符，只能包含字母、数字、中文、下划线和连字符',
    required: true,
    priority: 1,
  } as ValidationRule<string>,

  /** 房间名验证 */
  ROOM_NAME: {
    name: 'roomName',
    description: '房间名格式验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      return /^[a-zA-Z0-9\u4e00-\u9fa5\s_-]{1,30}$/.test(value.trim());
    },
    errorMessage:
      '房间名必须是1-30个字符，只能包含字母、数字、中文、空格、下划线和连字符',
    required: true,
    priority: 1,
  } as ValidationRule<string>,

  /** 聊天消息验证 */
  CHAT_MESSAGE: {
    name: 'chatMessage',
    description: '聊天消息格式验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      const trimmed = value.trim();
      return trimmed.length > 0 && trimmed.length <= 500;
    },
    errorMessage: '消息不能为空且不能超过500个字符',
    required: true,
    priority: 1,
  } as ValidationRule<string>,

  /** 密码验证 */
  PASSWORD: {
    name: 'password',
    description: '密码强度验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8 }$/.test(
        value
      );
    },
    errorMessage: '密码必须至少8位，包含大小写字母和数字',
    required: true,
    priority: 1,
  } as ValidationRule<string>,

  /** 邮箱验证 */
  EMAIL: {
    name: 'email',
    description: '邮箱格式验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    errorMessage: '请输入有效的邮箱地址',
    required: true,
    priority: 1,
  } as ValidationRule<string>,

  /** 游戏ID验证 */
  GAME_ID: {
    name: 'gameId',
    description: '游戏ID格式验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return false;
      }
      return /^[a-zA-Z0-9-]{6,36}$/.test(value);
    },
    errorMessage: '游戏ID格式无效',
    required: true,
    priority: 1,
  } as ValidationRule<string>,
};

/**
 * 数字验证规则
 */
export const NUMBER_VALIDATION_RULES = {
  /** 玩家数量验证 */
  PLAYER_COUNT: {
    name: 'playerCount',
    description: '玩家数量验证',
    validate: (value: number) => {
      return Number.isInteger(value) && value >= 6 && value <= 12;
    },
    errorMessage: '玩家数量必须是6-12之间的整数',
    required: true,
    priority: 1,
  } as ValidationRule<number>,

  /** 技能等级验证 */
  SKILL_LEVEL: {
    name: 'skillLevel',
    description: '技能等级验证',
    validate: (value: number) => {
      return Number.isInteger(value) && value >= 1 && value <= 10;
    },
    errorMessage: '技能等级必须是1-10之间的整数',
    required: true,
    priority: 1,
  } as ValidationRule<number>,

  /** 时间验证 */
  DURATION: {
    name: 'duration',
    description: '时间长度验证',
    validate: (value: number) => {
      return Number.isInteger(value) && value >= 0 && value <= 3600;
    },
    errorMessage: '时间长度必须是0-3600秒之间的整数',
    required: true,
    priority: 1,
  } as ValidationRule<number>,

  /** 分数验证 */
  SCORE: {
    name: 'score',
    description: '分数验证',
    validate: (value: number) => {
      return Number.isInteger(value) && value >= 0 && value <= 10000;
    },
    errorMessage: '分数必须是0-10000之间的整数',
    required: true,
    priority: 1,
  } as ValidationRule<number>,
};

/**
 * 枚举验证规则
 */
export const ENUM_VALIDATION_RULES = {
  /** 角色类型验证 */
  ROLE_TYPE: {
    name: 'roleType',
    description: '角色类型验证',
    validate: (value: RoleType) => {
      const validRoles: RoleType[] = [
        'werewolf',
        'seer',
        'witch',
        'guard',
        'hunter',
        'villager',
        'fool',
      ];
      return validRoles.includes(value);
    },
    errorMessage: '无效的角色类型',
    required: true,
    priority: 1,
  } as ValidationRule<RoleType>,

  /** 游戏阶段验证 */
  GAME_PHASE: {
    name: 'gamePhase',
    description: '游戏阶段验证',
    validate: (value: GamePhase) => {
      const validPhases: GamePhase[] = [
        'preparation',
        'day',
        'voting',
        'night',
        'result',
      ];
      return validPhases.includes(value);
    },
    errorMessage: '无效的游戏阶段',
    required: true,
    priority: 1,
  } as ValidationRule<GamePhase>,

  /** 游戏模式验证 */
  GAME_MODE: {
    name: 'gameMode',
    description: '游戏模式验证',
    validate: (value: GameMode) => {
      const validModes: GameMode[] = ['classic', 'simple', 'chaos', 'training'];
      return validModes.includes(value);
    },
    errorMessage: '无效的游戏模式',
    required: true,
    priority: 1,
  } as ValidationRule<GameMode>,

  /** 难度等级验证 */
  DIFFICULTY_LEVEL: {
    name: 'difficultyLevel',
    description: '难度等级验证',
    validate: (value: DifficultyLevel) => {
      const validLevels: DifficultyLevel[] = [
        'easy',
        'normal',
        'hard',
        'expert',
      ];
      return validLevels.includes(value);
    },
    errorMessage: '无效的难度等级',
    required: true,
    priority: 1,
  } as ValidationRule<DifficultyLevel>,

  /** 技能类型验证 */
  SKILL_TYPE: {
    name: 'skillType',
    description: '技能类型验证',
    validate: (value: SkillType) => {
      const validTypes: SkillType[] = [
        'attack',
        'defense',
        'healing',
        'detection',
        'communication',
        'special',
      ];
      return validTypes.includes(value);
    },
    errorMessage: '无效的技能类型',
    required: true,
    priority: 1,
  } as ValidationRule<SkillType>,
};

/**
 * 对象验证规则
 */
export const OBJECT_VALIDATION_RULES = {
  /** 玩家数据验证 */
  PLAYER_DATA: {
    name: 'playerData',
    description: '玩家数据验证',
    validate: (value: any) => {
      if (!value || typeof value !== 'object') {
        return false;
      }
      return (
        typeof value.id === 'string' &&
        typeof value.username === 'string' &&
        typeof value.role === 'string' &&
        typeof value.isAlive === 'boolean'
      );
    },
    errorMessage: '玩家数据格式无效',
    required: true,
    priority: 1,
  } as ValidationRule<any>,

  /** 游戏状态验证 */
  GAME_STATE: {
    name: 'gameState',
    description: '游戏状态验证',
    validate: (value: any) => {
      if (!value || typeof value !== 'object') {
        return false;
      }
      return (
        typeof value.id === 'string' &&
        typeof value.phase === 'string' &&
        typeof value.round === 'number' &&
        Array.isArray(value.players)
      );
    },
    errorMessage: '游戏状态数据格式无效',
    required: true,
    priority: 1,
  } as ValidationRule<any>,

  /** 技能使用数据验证 */
  SKILL_USE_DATA: {
    name: 'skillUseData',
    description: '技能使用数据验证',
    validate: (value: any) => {
      if (!value || typeof value !== 'object') {
        return false;
      }
      return (
        typeof value.skillId === 'string' &&
        typeof value.userId === 'string' &&
        (value.targetId === null || typeof value.targetId === 'string')
      );
    },
    errorMessage: '技能使用数据格式无效',
    required: true,
    priority: 1,
  } as ValidationRule<any>,
};

/**
 * 业务逻辑验证规则
 */
export const BUSINESS_VALIDATION_RULES = {
  /** 技能使用权限验证 */
  SKILL_PERMISSION: {
    name: 'skillPermission',
    description: '技能使用权限验证',
    validate: (value: any, context?: ValidationContext) => {
      if (!value || !context) {
        return false;
      }

      const { skillId, userId } = value;
      const { userRole, gamePhase } = context;

      // 这里应该根据实际的技能配置进行验证
      // 简化示例：只检查基本条件
      if (!skillId || !userId || !userRole || !gamePhase) {
        return false;
      }

      // 检查角色是否有权使用该技能
      const roleSkillMap: Record<RoleType, string[]> = {
        werewolf: ['werewolf_kill', 'werewolf_sniff'],
        seer: ['seer_divine'],
        witch: ['witch_poison', 'witch_antidote'],
        guard: ['guard_protect'],
        hunter: ['hunter_shoot'],
        villager: ['vote', 'speak'],
        fool: ['vote', 'speak'],
      };

      const allowedSkills = roleSkillMap[userRole] || [];
      return allowedSkills.includes(skillId);
    },
    errorMessage: '您没有权限使用该技能',
    required: true,
    priority: 2,
  } as ValidationRule<any>,

  /** 游戏阶段权限验证 */
  PHASE_PERMISSION: {
    name: 'phasePermission',
    description: '游戏阶段权限验证',
    validate: (value: any, context?: ValidationContext) => {
      if (!value || !context) {
        return false;
      }

      const { action } = value;
      const { gamePhase, userRole } = context;

      if (!action || !gamePhase || !userRole) {
        return false;
      }

      // 检查当前阶段是否允许该操作
      const phaseActionMap: Record<GamePhase, string[]> = {
        preparation: ['join', 'leave', 'ready'],
        day: ['speak', 'chat'],
        voting: ['vote', 'speak'],
        night: ['skill_use', 'werewolf_chat'],
        result: ['view_result'],
      };

      const allowedActions = phaseActionMap[gamePhase] || [];
      return allowedActions.includes(action);
    },
    errorMessage: '当前阶段不允许该操作',
    required: true,
    priority: 2,
  } as ValidationRule<any>,

  /** 投票目标验证 */
  VOTE_TARGET: {
    name: 'voteTarget',
    description: '投票目标验证',
    validate: (value: any, context?: ValidationContext) => {
      if (!value || !context) {
        return false;
      }

      const { targetId, voterId } = value;
      const { gamePhase } = context;

      if (!targetId || !voterId) {
        return false;
      }

      // 不能投票给自己
      if (targetId === voterId) {
        return false;
      }

      // 只能在投票阶段投票
      if (gamePhase !== 'voting') {
        return false;
      }

      // 这里应该检查目标是否存活等更多条件
      return true;
    },
    errorMessage: '无效的投票目标',
    required: true,
    priority: 2,
  } as ValidationRule<any>,

  /** 技能目标验证 */
  SKILL_TARGET: {
    name: 'skillTarget',
    description: '技能目标验证',
    validate: (value: any, context?: ValidationContext) => {
      if (!value || !context) {
        return false;
      }

      const { skillId, targetId, userId } = value;
      const { userRole } = context;

      if (!skillId || !userId) {
        return false;
      }

      // 某些技能不需要目标
      const noTargetSkills = ['werewolf_sniff', 'speak'];
      if (noTargetSkills.includes(skillId)) {
        return true;
      }

      // 需要目标的技能必须有目标
      if (!targetId) {
        return false;
      }

      // 某些技能不能以自己为目标
      const noSelfTargetSkills = ['werewolf_kill', 'guard_protect'];
      if (noSelfTargetSkills.includes(skillId) && targetId === userId) {
        return false;
      }

      return true;
    },
    errorMessage: '无效的技能目标',
    required: true,
    priority: 2,
  } as ValidationRule<any>,
};

/**
 * 安全验证规则
 */
export const SECURITY_VALIDATION_RULES = {
  /** SQL注入防护 */
  SQL_INJECTION: {
    name: 'sqlInjection',
    description: 'SQL注入防护验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return true;
      }

      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
        /(--|\/\*|\*\/|;)/,
        /(\b(OR|AND)\b.*=.*)/i,
        /'.*'/,
      ];

      return !sqlPatterns.some(pattern => pattern.test(value));
    },
    errorMessage: '输入包含不安全的字符',
    required: true,
    priority: 3,
  } as ValidationRule<string>,

  /** XSS防护 */
  XSS_PROTECTION: {
    name: 'xssProtection',
    description: 'XSS攻击防护验证',
    validate: (value: string) => {
      if (!value || typeof value !== 'string') {
        return true;
      }

      const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
      ];

      return !xssPatterns.some(pattern => pattern.test(value));
    },
    errorMessage: '输入包含不安全的脚本',
    required: true,
    priority: 3,
  } as ValidationRule<string>,

  /** 速率限制验证 */
  RATE_LIMIT: {
    name: 'rateLimit',
    description: '速率限制验证',
    validate: (value: any, context?: ValidationContext) => {
      if (!value || !context) {
        return false;
      }

      const { action, timestamp } = value;
      const { userId, extra } = context;

      if (!action || !timestamp || !userId) {
        return false;
      }

      // 这里应该检查用户的操作频率
      // 简化示例：假设从extra中获取历史操作记录
      const userActions = extra?.userActions || [];
      const recentActions = userActions.filter(
        (a: any) =>
          a.userId === userId &&
          a.action === action &&
          timestamp - a.timestamp < 60000 // 1分钟内
      );

      // 不同操作有不同的频率限制
      const rateLimits: Record<string, number> = {
        chat: 30, // 每分钟最多30条消息
        vote: 5, // 每分钟最多5次投票
        skill_use: 10, // 每分钟最多10次技能使用
        join: 3, // 每分钟最多3次加入房间
      };

      const limit = rateLimits[action] || 10;
      return recentActions.length < limit;
    },
    errorMessage: '操作过于频繁，请稍后再试',
    required: true,
    priority: 3,
  } as ValidationRule<any>,
};

/**
 * 所有验证规则
 */
export const ALL_VALIDATION_RULES = {
  ...STRING_VALIDATION_RULES,
  ...NUMBER_VALIDATION_RULES,
  ...ENUM_VALIDATION_RULES,
  ...OBJECT_VALIDATION_RULES,
  ...BUSINESS_VALIDATION_RULES,
  ...SECURITY_VALIDATION_RULES,
};

/**
 * 验证规则组
 */
export const VALIDATION_RULE_GROUPS = {
  /** 用户注册验证组 */
  USER_REGISTRATION: [
    'username',
    'email',
    'password',
    'sqlInjection',
    'xssProtection',
  ],

  /** 游戏创建验证组 */
  GAME_CREATION: [
    'roomName',
    'gameMode',
    'difficultyLevel',
    'playerCount',
    'sqlInjection',
    'xssProtection',
  ],

  /** 聊天消息验证组 */
  CHAT_MESSAGE: ['chatMessage', 'sqlInjection', 'xssProtection', 'rateLimit'],

  /** 技能使用验证组 */
  SKILL_USE: [
    'skillUseData',
    'skillPermission',
    'skillTarget',
    'phasePermission',
    'rateLimit',
  ],

  /** 投票验证组 */
  VOTING: ['voteTarget', 'phasePermission', 'rateLimit'],

  /** 游戏状态验证组 */
  GAME_STATE: ['gameState', 'gamePhase', 'playerData'],
};

/**
 * 执行验证
 * @param value - 要验证的值
 * @param rules - 验证规则数组
 * @param context - 验证上下文
 * @returns 验证结果
 */
export function validateValue(
  value: any,
  rules: string[] | ValidationRule[],
  context?: ValidationContext
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 转换规则名称为规则对象
  const ruleObjects = rules
    .map(rule => {
      if (typeof rule === 'string') {
        return ALL_VALIDATION_RULES[rule];
      }
      return rule;
    })
    .filter(Boolean);

  // 按优先级排序
  ruleObjects.sort((a, b) => a.priority - b.priority);

  // 执行验证
  for (const rule of ruleObjects) {
    try {
      const isValid = rule.validate(value, context);

      if (!isValid) {
        const errorMessage =
          typeof rule.errorMessage === 'function'
            ? rule.errorMessage(value, context)
            : rule.errorMessage;

        if (rule.required) {
          errors.push(errorMessage);
        } else {
          warnings.push(errorMessage);
        }
      }
    } catch (error) {
      errors.push(`验证规则 ${rule.name} 执行失败: ${error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    value,
  };
}

/**
 * 执行验证组
 * @param value - 要验证的值
 * @param groupName - 验证组名称
 * @param context - 验证上下文
 * @returns 验证结果
 */
export function validateGroup(
  value: any,
  groupName: keyof typeof VALIDATION_RULE_GROUPS,
  context?: ValidationContext
): ValidationResult {
  const rules = VALIDATION_RULE_GROUPS[groupName] || [];
  return validateValue(value, rules, context);
}

/**
 * 批量验证对象
 * @param data - 要验证的数据对象
 * @param fieldRules - 字段验证规则映射
 * @param context - 验证上下文
 * @returns 验证结果映射
 */
export function validateObject(
  data: Record<string, any>,
  fieldRules: Record<string, string[] | ValidationRule[]>,
  context?: ValidationContext
): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};

  for (const [field, rules] of Object.entries(fieldRules)) {
    const value = data[field];
    const result = validateValue(value, rules, context);
    result.field = field;
    results[field] = result;
  }

  return results;
}

/**
 * 检查验证结果是否全部通过
 * @param results - 验证结果数组或对象
 * @returns 是否全部通过
 */
export function isAllValid(
  results: ValidationResult[] | Record<string, ValidationResult>
): boolean {
  const resultArray = Array.isArray(results) ? results : Object.values(results);

  return resultArray.every(result => result.isValid);
}

/**
 * 获取所有错误消息
 * @param results - 验证结果数组或对象
 * @returns 错误消息数组
 */
export function getAllErrors(
  results: ValidationResult[] | Record<string, ValidationResult>
): string[] {
  const resultArray = Array.isArray(results) ? results : Object.values(results);

  return resultArray.flatMap(result => result.errors);
}

/**
 * 获取所有警告消息
 * @param results - 验证结果数组或对象
 * @returns 警告消息数组
 */
export function getAllWarnings(
  results: ValidationResult[] | Record<string, ValidationResult>
): string[] {
  const resultArray = Array.isArray(results) ? results : Object.values(results);

  return resultArray.flatMap(result => result.warnings);
}

/**
 * 创建自定义验证规则
 * @param config - 验证规则配置
 * @returns 验证规则对象
 */
export function createValidationRule<T = any>(
  config: Omit<ValidationRule<T>, 'priority'> & { priority?: number }
): ValidationRule<T> {
  return {
    priority: 1,
    ...config,
  };
}

/**
 * 注册自定义验证规则
 * @param name - 规则名称
 * @param rule - 验证规则
 */
export function registerValidationRule(
  name: string,
  rule: ValidationRule
): void {
  (ALL_VALIDATION_RULES as any)[name] = rule;
}

/**
 * 移除验证规则
 * @param name - 规则名称
 */
export function unregisterValidationRule(name: string): void {
  delete (ALL_VALIDATION_RULES as any)[name];
}
