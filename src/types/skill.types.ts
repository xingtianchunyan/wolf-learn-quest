/**
 * 技能系统完整类型定义
 * 替换项目中所有 any 类型，提升类型安全
 */

// ============= 基础类型定义 =============

export type RoleStatus = 0 | 1 | 2 | 3; // 0: 存活, 1: 死亡, 2: 出局, 3: 其他

export type Phase = 'night' | 'day' | 'voting' | 'discussion';

export type ExecutionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'failed';

export type TargetType = 'player' | 'room' | 'phase' | 'global';

// ============= 技能效果相关 =============

export interface SkillEffectData {
  effect_type: string;
  target_type?: TargetType;
  duration?: number;
  stack_count?: number;
  data?: Record<string, unknown>;
}

export interface SkillEffects {
  // 狼人技能效果
  werewolf_kill?: boolean;
  werewolf_target?: string;

  // 预言家技能效果
  seer_check?: boolean;
  seer_result?: 'werewolf' | 'villager' | null;

  // 女巫技能效果
  witch_save?: boolean;
  witch_poison?: boolean;
  witch_save_used?: boolean;
  witch_poison_used?: boolean;

  // 守卫技能效果
  guard_protect?: boolean;
  guard_last_target?: string;

  // 猎人技能效果
  hunter_shoot?: boolean;
  hunter_shoot_used?: boolean;

  // 村民技能效果（睡觉）
  villager_sleep?: boolean;

  // 通用字段
  [key: string]: unknown;
}

// ============= 角色属性相关 =============

export interface RoleAttributes {
  // 女巫属性
  hasSavePotion?: boolean;
  hasPoisonPotion?: boolean;
  saveUsedRounds?: number[];
  poisonUsedRounds?: number[];

  // 守卫属性
  lastProtectedTarget?: string;

  // 猎人属性
  hasShot?: boolean;

  // 预言家属性
  checkHistory?: Array<{
    round: number;
    target: string;
    result: 'werewolf' | 'villager';
  }>;

  // 通用字段
  [key: string]: unknown;
}

// ============= 技能使用相关 =============

export interface SkillData {
  skillName: string;
  targetUserId?: string;
  effectType: string;
  skillType?: string; // 兼容旧代码
  metadata?: Record<string, unknown>;
  [key: string]: unknown; // 支持动态属性
}

export interface SkillUseRecord {
  id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  skill_chinese_name?: string;
  target_user_id?: string;
  round_number: number;
  phase: Phase | string; // 兼容 string 类型
  skill_priority: number;
  execution_status: ExecutionStatus | string; // 兼容 string 类型
  skill_effects: SkillEffectData;
  conditions_met: Record<string, unknown>;
  result?: SkillResult;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface SkillResult {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  // 查验结果
  seer_result?: 'werewolf' | 'villager';
  // 其他结果字段
  [key: string]: unknown;
}

// ============= 技能目标相关 =============

export interface SkillTarget {
  id: string;
  skill_use_id: string;
  skill_effects_queue_id?: string;
  target_user_id?: string;
  target_type: TargetType;
  effect_applied: SkillEffectData;
  effect_duration?: number;
  effect_start_time: string;
  effect_end_time?: string;
  stack_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailableTarget {
  userId: string;
  name: string;
  roleStatus: RoleStatus | number; // 兼容 number 类型
  roleName?: string;
}

// ============= 技能限制相关 =============

export interface UsageRestriction {
  canUse: boolean;
  reason?: string;
  remainingUses?: number;
  maxUses?: number;
  usedInCurrentRound?: boolean;
}

// ============= 游戏状态相关 =============

// 游戏状态类型 - 从统一类型定义导出
export type { GameState } from '@/types/game';

// ============= 组件Props类型 =============

export interface RoleSpecificSkillsProps {
  roleName: string;
  skillEffects: SkillEffects | Record<string, unknown>; // 兼容动态数据
  roleAttributes: RoleAttributes | Record<string, unknown>; // 兼容动态数据
  canUseSkill: boolean;
  onUseSkill: (
    skillData: SkillData | Record<string, unknown>
  ) => void | Promise<void>; // 兼容多种类型
  availableTargets: AvailableTarget[];
  currentPhase: number;
  userSkillUses?: Array<{
    round_number: number;
    phase: string;
    skill_name: string;
  }>;
  usageRestriction?: UsageRestriction;
  gameStateId?: string;
  userId?: string;
  currentRound?: number;
  fullSkillUses?: SkillUseRecord[];
}

export interface SkillConflictData {
  id: string;
  game_state_id: string;
  round_number: number;
  phase: string;
  conflicting_skills: ConflictingSkill[] | unknown; // 兼容数据库Json类型
  resolution_rule: string;
  resolved_skill_id: string;
  created_at: string;
  updated_at?: string;
}

export interface ConflictingSkill {
  skill_use_id: string;
  skill_name: string;
  user_id: string;
  priority: number;
  [key: string]: unknown;
}

// ============= 性能监控相关 =============

export interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };
}

export interface ResourceStats {
  memoryUsage: string;
  registeredIntervals: number;
  registeredTimeouts: number;
  lastCleanup?: string;
}
