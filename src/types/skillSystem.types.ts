/**
 * 技能系统类型定义文件
 * 提供严格的类型安全，替换项目中的 any 类型使用
 */

/**
 * 角色状态枚举
 */
export enum RoleStatus {
  NORMAL = 1,
  DYING = 2,
  WEAK = 3,
  ELIMINATED = 4
}

/**
 * 技能使用限制类型
 */
export type SkillUsageLimit = 'unlimited' | 'once_per_game' | 'once_per_round' | number;

/**
 * 技能目标类型
 */
export type SkillTargetType = 'none' | 'single' | 'multiple' | 'self' | 'all';

/**
 * 技能效果类型
 */
export type SkillEffectType = 
  | 'passive' 
  | 'elimination' 
  | 'protection' 
  | 'investigation' 
  | 'manipulation' 
  | 'healing' 
  | 'status_change';

/**
 * 游戏阶段类型
 */
export type GamePhase = 'day' | 'evening' | 'night' | 'dawn';

/**
 * 技能使用记录接口
 */
export interface SkillUsageRecord {
  /** 技能ID */
  skillId: string;
  /** 已使用次数 */
  used: number;
  /** 剩余使用次数 */
  remaining: number;
  /** 总使用次数限制 */
  total: number;
  /** 最后使用时间 */
  lastUsed?: number;
}

/**
 * 角色技能使用状态接口
 */
export interface RoleSkillUsageState {
  /** 技能使用记录映射 */
  [skillId: string]: SkillUsageRecord;
}

/**
 * 回合技能使用记录接口
 */
export interface RoundSkillUsage {
  /** 回合号到技能ID列表的映射 */
  [roundNumber: number]: string[];
}

/**
 * 角色状态接口
 */
export interface RoleState {
  /** 用户ID */
  user_id: string;
  /** 游戏状态ID */
  game_state_id: string;
  /** 角色状态 */
  role_status: RoleStatus;
  /** 技能使用剩余次数 */
  skill_uses_remaining: RoleSkillUsageState | LegacySkillUsageState;
  /** 回合技能使用记录 */
  round_skill_uses: RoundSkillUsage;
  /** 角色特殊状态 */
  special_status?: Record<string, unknown>;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}

/**
 * 旧版技能使用状态（向后兼容）
 */
export interface LegacySkillUsageState {
  /** 总使用次数 */
  total: number;
  /** 剩余使用次数 */
  remaining: number;
}

/**
 * 角色设计接口
 */
export interface RoleDesign {
  /** 角色ID */
  id: string;
  /** 角色名称 */
  role_name: string;
  /** 技能名称（英文） */
  skill_name: string;
  /** 技能描述（中文） */
  skill_description?: string;
  /** 角色描述 */
  role_description?: string;
  /** 角色阵营 */
  faction?: 'werewolf' | 'villager' | 'neutral';
  /** 角色优先级 */
  priority?: number;
  /** 是否启用 */
  is_enabled?: boolean;
  /** 创建时间 */
  created_at?: string;
  /** 更新时间 */
  updated_at?: string;
}

/**
 * 技能配置接口
 */
export interface SkillConfig {
  /** 技能唯一标识 */
  id: string;
  /** 中文名称 */
  chineseName: string;
  /** 英文名称 */
  englishName: string;
  /** 优先级（数字越大优先级越高） */
  priority: number;
  /** 适用阶段 */
  phase: GamePhase;
  /** 使用限制 */
  usageLimit: SkillUsageLimit;
  /** 需要的角色状态 */
  requiredStatus: string[];
  /** 目标类型 */
  targetType: SkillTargetType;
  /** 效果类型 */
  effectType: SkillEffectType[];
  /** 是否为被动技能 */
  isPassive: boolean;
  /** 冲突的技能ID列表 */
  conflictsWith: string[];
  /** 技能描述 */
  description?: string;
  /** 冷却时间（回合数） */
  cooldown?: number;
}

/**
 * 技能使用上下文接口
 */
export interface SkillUsageContext {
  /** 用户ID */
  userId: string;
  /** 游戏状态ID */
  gameStateId: string;
  /** 房间ID */
  roomId: string;
  /** 当前阶段 */
  currentPhase: number;
  /** 当前回合 */
  currentRound: number;
  /** 角色状态 */
  roleState: RoleState;
  /** 角色设计 */
  roleDesign: RoleDesign;
  /** 目标用户ID */
  targetUserId?: string;
  /** 额外数据 */
  additionalData?: SkillAdditionalData;
}

/**
 * 技能额外数据接口
 */
export interface SkillAdditionalData {
  /** 魔药类型（女巫专用） */
  potionType?: 'heal' | 'poison';
  /** 效果类型 */
  effectType?: SkillEffectType;
  /** 技能配置ID */
  skill_config_id?: string;
  /** 中文名称 */
  chinese_name?: string;
  /** 优先级 */
  priority?: number;
  /** 其他自定义数据 */
  [key: string]: unknown;
}

/**
 * 技能验证结果接口
 */
export interface SkillValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 失败原因 */
  reason?: string;
  /** 冲突的技能列表 */
  conflictingSkills?: string[];
  /** 建议的操作 */
  suggestedAction?: string;
  /** 验证详情 */
  details?: SkillValidationDetails;
}

/**
 * 技能验证详情接口
 */
export interface SkillValidationDetails {
  /** 阶段检查结果 */
  phaseCheck: boolean;
  /** 状态检查结果 */
  statusCheck: boolean;
  /** 使用次数检查结果 */
  usageCheck: boolean;
  /** 目标检查结果 */
  targetCheck: boolean;
  /** 冲突检查结果 */
  conflictCheck: boolean;
  /** 权限检查结果 */
  permissionCheck: boolean;
}

/**
 * 技能使用数据库记录接口
 */
export interface SkillUseRecord {
  /** 记录ID */
  id: string;
  /** 游戏状态ID */
  game_state_id: string;
  /** 用户ID */
  user_id: string;
  /** 技能名称 */
  skill_name: string;
  /** 目标用户ID */
  target_user_id?: string;
  /** 回合号 */
  round_number: number;
  /** 阶段 */
  phase: number;
  /** 技能效果数据 */
  skill_effects: SkillEffectData;
  /** 执行状态 */
  execution_status: 'pending' | 'executed' | 'failed' | 'cancelled';
  /** 执行时间 */
  executed_at?: string;
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}

/**
 * 技能效果数据接口
 */
export interface SkillEffectData {
  /** 效果类型 */
  type: SkillEffectType;
  /** 效果值 */
  value?: number | string | boolean;
  /** 持续时间（回合数） */
  duration?: number;
  /** 目标列表 */
  targets?: string[];
  /** 效果描述 */
  description?: string;
  /** 效果元数据 */
  metadata?: Record<string, unknown>;
}

/**
 * 技能冲突检测结果接口
 */
export interface SkillConflictResult {
  /** 是否有冲突 */
  hasConflicts: boolean;
  /** 冲突列表 */
  conflicts: string[];
  /** 冲突详情 */
  conflictDetails?: SkillConflictDetail[];
}

/**
 * 技能冲突详情接口
 */
export interface SkillConflictDetail {
  /** 技能1 */
  skill1: SkillConfig;
  /** 技能2 */
  skill2: SkillConfig;
  /** 冲突类型 */
  conflictType: 'direct' | 'indirect' | 'priority';
  /** 冲突描述 */
  description: string;
  /** 解决建议 */
  resolution?: string;
}

/**
 * 技能队列项接口
 */
export interface SkillQueueItem {
  skillName: string;
  userId: string;
  targetUserId?: string;
  priority: number;
  phase: number;
}

/**
 * 技能效果配置接口
 */
export interface SkillEffectConfig {
  id: string;
  type: string;
  priority: number;
  data: Record<string, unknown>;
}

/**
 * 技能使用建议接口
 */
export interface SkillUsageSuggestion {
  /** 是否可以使用 */
  canUse: boolean;
  /** 建议内容 */
  suggestion: string;
  /** 优先级 */
  priority: 'high' | 'medium' | 'low';
  /** 建议时机 */
  timing: string;
  /** 风险评估 */
  riskAssessment?: 'low' | 'medium' | 'high';
  /** 成功概率 */
  successProbability?: number;
}

/**
 * 技能统计信息接口
 */
export interface SkillStatistics {
  /** 总使用次数 */
  totalUses: number;
  /** 成功次数 */
  successCount: number;
  /** 失败次数 */
  failureCount: number;
  /** 成功率 */
  successRate: number;
  /** 平均执行时间 */
  averageExecutionTime: number;
  /** 最后使用时间 */
  lastUsedAt?: string;
  /** 使用频率（每回合） */
  usageFrequency: number;
}

/**
 * 技能错误类型枚举
 */
export enum SkillErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  EXECUTION_ERROR = 'EXECUTION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PERMISSION_ERROR = 'PERMISSION_ERROR',
  CONFIG_ERROR = 'CONFIG_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR'
}

/**
 * 技能错误接口
 */
export interface SkillError {
  /** 错误类型 */
  type: SkillErrorType;
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 技能名称 */
  skillName?: string;
  /** 用户ID */
  userId?: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 原始错误 */
  originalError?: unknown;
  /** 错误时间戳 */
  timestamp: number;
  /** 错误上下文 */
  context?: Record<string, unknown>;
}

/**
 * 类型守卫：检查是否为新版技能使用状态
 */
export function isRoleSkillUsageState(
  state: RoleSkillUsageState | LegacySkillUsageState
): state is RoleSkillUsageState {
  return typeof state === 'object' && 
         state !== null && 
         !('total' in state && 'remaining' in state);
}

/**
 * 类型守卫：检查是否为旧版技能使用状态
 */
export function isLegacySkillUsageState(
  state: RoleSkillUsageState | LegacySkillUsageState
): state is LegacySkillUsageState {
  return typeof state === 'object' && 
         state !== null && 
         'total' in state && 
         'remaining' in state;
}

/**
 * 类型守卫：检查是否为有效的角色状态
 */
export function isValidRoleStatus(status: unknown): status is RoleStatus {
  return typeof status === 'number' && 
         Object.values(RoleStatus).includes(status as RoleStatus);
}

/**
 * 类型守卫：检查是否为有效的游戏阶段
 */
export function isValidGamePhase(phase: unknown): phase is GamePhase {
  return typeof phase === 'string' && 
         ['day', 'evening', 'night', 'dawn'].includes(phase);
}

/**
 * 默认技能配置映射
 */
export const DEFAULT_SKILL_CONFIGS: Record<string, SkillConfig> = {
  'Sleep': {
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
    conflictsWith: []
  },
  'night_attack': {
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
    conflictsWith: []
  },
  'prophecy': {
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
    conflictsWith: []
  },
  'magic_potion': {
    id: 'witch_potion',
    chineseName: '魔药',
    englishName: 'magic_potion',
    priority: 6,
    phase: 'night',
    usageLimit: 'unlimited',
    requiredStatus: ['normal'],
    targetType: 'single',
    effectType: ['protection', 'elimination'],
    isPassive: false,
    conflictsWith: []
  }
};

export default {
  RoleStatus,
  SkillErrorType,
  isRoleSkillUsageState,
  isLegacySkillUsageState,
  isValidRoleStatus,
  isValidGamePhase,
  DEFAULT_SKILL_CONFIGS
};