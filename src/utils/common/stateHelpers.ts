/**
 * @fileoverview 状态管理公共函数库
 * 统一项目中的状态管理逻辑，消除重复代码
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { createLogger } from '@/lib/logger';
import { GamePhase, RoleStatus, SkillType } from '@/types/skillSystem.types';

const logger = createLogger('state-helpers');

/**
 * 状态变化记录接口
 */
export interface StateChangeRecord {
  /** 时间戳 */
  timestamp: number;
  /** 变化类型 */
  type: 'game_phase' | 'role_status' | 'skill_usage' | 'player_action';
  /** 变化前的值 */
  previousValue: any;
  /** 变化后的值 */
  currentValue: any;
  /** 触发者ID */
  triggeredBy?: string;
  /** 变化原因 */
  reason?: string;
  /** 额外数据 */
  metadata?: Record<string, any>;
}

/**
 * 状态历史管理器
 */
export class StateHistoryManager {
  private history: StateChangeRecord[] = [];
  private maxHistorySize: number = 1000;

  /**
   * 构造函数
   * @param maxSize - 最大历史记录数量
   */
  constructor(maxSize: number = 1000) {
    this.maxHistorySize = maxSize;
  }

  /**
   * 记录状态变化
   * @param record - 状态变化记录
   */
  recordChange(record: Omit<StateChangeRecord, 'timestamp'>): void {
    const fullRecord: StateChangeRecord = {
      ...record,
      timestamp: Date.now(),
    };

    this.history.push(fullRecord);

    // 保持历史记录在限制范围内
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
    }

    logger.debug('记录状态变化', fullRecord);
  }

  /**
   * 获取指定类型的历史记录
   * @param type - 状态变化类型
   * @param limit - 限制数量
   * @returns 历史记录列表
   */
  getHistory(
    type?: StateChangeRecord['type'],
    limit?: number
  ): StateChangeRecord[] {
    let filtered = this.history;

    if (type) {
      filtered = filtered.filter(record => record.type === type);
    }

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * 清空历史记录
   */
  clearHistory(): void {
    this.history = [];
    logger.info('清空状态历史记录');
  }

  /**
   * 获取最近的状态变化
   * @param type - 状态变化类型
   * @returns 最近的状态变化记录
   */
  getLatestChange(type?: StateChangeRecord['type']): StateChangeRecord | null {
    const history = this.getHistory(type, 1);
    return history.length > 0 ? history[0] : null;
  }
}

/**
 * 全局状态历史管理器实例
 */
export const globalStateHistory = new StateHistoryManager();
/**
 * 游戏阶段状态管理器
 */
export class GamePhaseManager {
  private currentPhase: GamePhase = 'day';
  private phaseStartTime: number = Date.now();
  private phaseHistory: Array<{
    phase: GamePhase;
    startTime: number;
    endTime?: number;
  }> = [];

  /**
   * 设置当前游戏阶段
   * @param newPhase - 新的游戏阶段
   * @param triggeredBy - 触发者ID
   * @param reason - 变化原因
   */
  setPhase(newPhase: GamePhase, triggeredBy?: string, reason?: string): void {
    const previousPhase = this.currentPhase;
    const now = Date.now();

    // 结束当前阶段
    if (this.phaseHistory.length > 0) {
      const currentPhaseRecord =
        this.phaseHistory[this.phaseHistory.length - 1];
      if (!currentPhaseRecord.endTime) {
        currentPhaseRecord.endTime = now;
      }
    }

    // 记录状态变化
    globalStateHistory.recordChange({
      type: 'game_phase',
      previousValue: previousPhase,
      currentValue: newPhase,
      triggeredBy,
      reason,
      metadata: {
        phaseDuration: now - this.phaseStartTime,
      },
    });

    // 更新当前阶段
    this.currentPhase = newPhase;
    this.phaseStartTime = now;

    // 添加到历史记录
    this.phaseHistory.push({
      phase: newPhase,
      startTime: now,
    });

    logger.info('游戏阶段变化', {
      from: previousPhase,
      to: newPhase,
      triggeredBy,
      reason,
    });
  }

  /**
   * 获取当前游戏阶段
   * @returns 当前游戏阶段
   */
  getCurrentPhase(): GamePhase {
    return this.currentPhase;
  }

  /**
   * 获取当前阶段持续时间
   * @returns 持续时间（毫秒）
   */
  getCurrentPhaseDuration(): number {
    return Date.now() - this.phaseStartTime;
  }

  /**
   * 获取阶段历史记录
   * @param limit - 限制数量
   * @returns 阶段历史记录
   */
  getPhaseHistory(
    limit?: number
  ): Array<{ phase: GamePhase; startTime: number; endTime?: number }> {
    const history = [...this.phaseHistory];
    return limit ? history.slice(-limit) : history;
  }

  /**
   * 检查是否可以切换到指定阶段
   * @param targetPhase - 目标阶段
   * @returns 是否可以切换
   */
  canTransitionTo(targetPhase: GamePhase): boolean {
    const validTransitions: Record<GamePhase, GamePhase[]> = {
      day: ['evening'],
      evening: ['night'],
      night: ['dawn'],
      dawn: ['day'],
    };

    return validTransitions[this.currentPhase]?.includes(targetPhase) ?? false;
  }
}

/**
 * 角色状态管理器
 */
export class RoleStatusManager {
  private statusMap: Map<string, RoleStatus> = new Map();
  private statusEffects: Map<
    string,
    Array<{ effect: string; expiresAt: number }>
  > = new Map();

  /**
   * 设置角色状态
   * @param userId - 用户ID
   * @param status - 角色状态
   * @param triggeredBy - 触发者ID
   * @param reason - 变化原因
   */
  setStatus(
    userId: string,
    status: RoleStatus,
    triggeredBy?: string,
    reason?: string
  ): void {
    const previousStatus = this.statusMap.get(userId) || RoleStatus.NORMAL;

    // 记录状态变化
    globalStateHistory.recordChange({
      type: 'role_status',
      previousValue: previousStatus,
      currentValue: status,
      triggeredBy,
      reason,
      metadata: { userId },
    });

    this.statusMap.set(userId, status);

    logger.info('角色状态变化', {
      userId,
      from: previousStatus,
      to: status,
      triggeredBy,
      reason,
    });
  }

  /**
   * 获取角色状态
   * @param userId - 用户ID
   * @returns 角色状态
   */
  getStatus(userId: string): RoleStatus {
    return this.statusMap.get(userId) || RoleStatus.NORMAL;
  }

  /**
   * 批量获取角色状态
   * @param userIds - 用户ID列表
   * @returns 状态映射
   */
  getBatchStatus(userIds: string[]): Map<string, RoleStatus> {
    const result = new Map<string, RoleStatus>();
    userIds.forEach(userId => {
      result.set(userId, this.getStatus(userId));
    });
    return result;
  }

  /**
   * 添加状态效果
   * @param userId - 用户ID
   * @param effect - 效果名称
   * @param duration - 持续时间（毫秒）
   */
  addStatusEffect(userId: string, effect: string, duration: number): void {
    const effects = this.statusEffects.get(userId) || [];
    const expiresAt = Date.now() + duration;

    effects.push({ effect, expiresAt });
    this.statusEffects.set(userId, effects);

    logger.debug('添加状态效果', { userId, effect, duration, expiresAt });
  }

  /**
   * 移除过期的状态效果
   * @param userId - 用户ID（可选，不传则清理所有用户）
   */
  cleanupExpiredEffects(userId?: string): void {
    const now = Date.now();
    const userIds = userId ? [userId] : Array.from(this.statusEffects.keys());

    userIds.forEach(uid => {
      const effects = this.statusEffects.get(uid) || [];
      const validEffects = effects.filter(effect => effect.expiresAt > now);

      if (validEffects.length !== effects.length) {
        this.statusEffects.set(uid, validEffects);
        logger.debug('清理过期状态效果', {
          userId: uid,
          removed: effects.length - validEffects.length,
        });
      }
    });
  }

  /**
   * 获取用户的活跃状态效果
   * @param userId - 用户ID
   * @returns 活跃效果列表
   */
  getActiveEffects(userId: string): string[] {
    this.cleanupExpiredEffects(userId);
    const effects = this.statusEffects.get(userId) || [];
    return effects.map(effect => effect.effect);
  }
}

/**
 * 技能使用状态管理器
 */
export class SkillUsageManager {
  private usageHistory: Map<
    string,
    Array<{ skillType: SkillType; usedAt: number; targetId?: string }>
  > = new Map();
  private cooldowns: Map<string, Map<SkillType, number>> = new Map();

  /**
   * 记录技能使用
   * @param userId - 用户ID
   * @param skillType - 技能类型
   * @param targetId - 目标ID（可选）
   * @param cooldownDuration - 冷却时间（毫秒）
   */
  recordSkillUsage(
    userId: string,
    skillType: SkillType,
    targetId?: string,
    cooldownDuration?: number
  ): void {
    const now = Date.now();

    // 记录使用历史
    const history = this.usageHistory.get(userId) || [];
    history.push({ skillType, usedAt: now, targetId });
    this.usageHistory.set(userId, history);

    // 设置冷却时间
    if (cooldownDuration && cooldownDuration > 0) {
      const userCooldowns = this.cooldowns.get(userId) || new Map();
      userCooldowns.set(skillType, now + cooldownDuration);
      this.cooldowns.set(userId, userCooldowns);
    }

    // 记录状态变化
    globalStateHistory.recordChange({
      type: 'skill_usage',
      previousValue: null,
      currentValue: { skillType, targetId },
      triggeredBy: userId,
      metadata: { usedAt: now, cooldownDuration },
    });

    logger.info('记录技能使用', {
      userId,
      skillType,
      targetId,
      cooldownDuration,
    });
  }

  /**
   * 检查技能是否在冷却中
   * @param userId - 用户ID
   * @param skillType - 技能类型
   * @returns 是否在冷却中
   */
  isSkillOnCooldown(userId: string, skillType: SkillType): boolean {
    const userCooldowns = this.cooldowns.get(userId);
    if (!userCooldowns) {
      return false;
    }

    const cooldownEnd = userCooldowns.get(skillType);
    if (!cooldownEnd) {
      return false;
    }

    const isOnCooldown = Date.now() < cooldownEnd;

    // 如果冷却已结束，清理记录
    if (!isOnCooldown) {
      userCooldowns.delete(skillType);
    }

    return isOnCooldown;
  }

  /**
   * 获取技能剩余冷却时间
   * @param userId - 用户ID
   * @param skillType - 技能类型
   * @returns 剩余冷却时间（毫秒），0表示无冷却
   */
  getSkillCooldownRemaining(userId: string, skillType: SkillType): number {
    const userCooldowns = this.cooldowns.get(userId);
    if (!userCooldowns) {
      return 0;
    }

    const cooldownEnd = userCooldowns.get(skillType);
    if (!cooldownEnd) {
      return 0;
    }

    const remaining = Math.max(0, cooldownEnd - Date.now());

    // 如果冷却已结束，清理记录
    if (remaining === 0) {
      userCooldowns.delete(skillType);
    }

    return remaining;
  }

  /**
   * 获取用户的技能使用历史
   * @param userId - 用户ID
   * @param skillType - 技能类型（可选）
   * @param limit - 限制数量
   * @returns 使用历史记录
   */
  getSkillUsageHistory(
    userId: string,
    skillType?: SkillType,
    limit?: number
  ): Array<{ skillType: SkillType; usedAt: number; targetId?: string }> {
    let history = this.usageHistory.get(userId) || [];

    if (skillType) {
      history = history.filter(record => record.skillType === skillType);
    }

    if (limit) {
      history = history.slice(-limit);
    }

    return history.sort((a, b) => b.usedAt - a.usedAt);
  }

  /**
   * 清理过期的冷却记录
   */
  cleanupExpiredCooldowns(): void {
    const now = Date.now();

    this.cooldowns.forEach((userCooldowns, userId) => {
      const validCooldowns = new Map<SkillType, number>();

      userCooldowns.forEach((cooldownEnd, skillType) => {
        if (cooldownEnd > now) {
          validCooldowns.set(skillType, cooldownEnd);
        }
      });

      if (validCooldowns.size > 0) {
        this.cooldowns.set(userId, validCooldowns);
      } else {
        this.cooldowns.delete(userId);
      }
    });
  }
}

/**
 * 全局状态管理器实例
 */
export const globalGamePhaseManager = new GamePhaseManager();
export const globalRoleStatusManager = new RoleStatusManager();
export const globalSkillUsageManager = new SkillUsageManager();

/**
 * 状态同步工具函数
 */
export const stateHelpers = {
  /**
   * 批量更新角色状态
   * @param updates - 状态更新列表
   * @param triggeredBy - 触发者ID
   * @param reason - 变化原因
   */
  batchUpdateRoleStatus(
    updates: Array<{ userId: string; status: RoleStatus }>,
    triggeredBy?: string,
    reason?: string
  ): void {
    updates.forEach(({ userId, status }) => {
      globalRoleStatusManager.setStatus(userId, status, triggeredBy, reason);
    });
  },

  /**
   * 重置所有状态管理器
   */
  resetAllStates(): void {
    globalStateHistory.clearHistory();
    logger.info('重置所有状态管理器');
  },

  /**
   * 获取状态摘要
   * @returns 状态摘要信息
   */
  getStateSummary(): {
    currentPhase: GamePhase;
    phaseDuration: number;
    totalStateChanges: number;
    recentChanges: StateChangeRecord[];
  } {
    return {
      currentPhase: globalGamePhaseManager.getCurrentPhase(),
      phaseDuration: globalGamePhaseManager.getCurrentPhaseDuration(),
      totalStateChanges: globalStateHistory.getHistory().length,
      recentChanges: globalStateHistory.getHistory(undefined, 10),
    };
  },
};
