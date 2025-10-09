/**
 * @fileoverview 技能执行服务
 * 专业化的技能执行服务，负责处理所有技能相关的业务逻辑，包括技能验证、执行、效果计算等
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import type  { SkillEffect  } from '@/types/skill';
import type { RoleType, GamePhase  } from '@/types/game';
import { getSkillConfig  } from
  isSkillAvailable,
  calculateSkillDamage,
  calculateSkillCooldown,
  type CompleteSkillConfig  } from '@/config/skillConfig';
import { validateValue  } from
  VALIDATION_RULE_GROUPS  } from '@/config/validationRules';
import { formatError  } from '@/config/errorMessages';
import { EventEmitter  } from '@/patterns/observer/EventEmitter';
import { MemoryCache  } from '@/utils/common/cacheUtils';

/**
 * 技能执行上下文接口
 */
export interface SkillExecutionContext  {
  /** 执行者ID */
  executorId: string;
  /** 执行者角色 */
  executorRole: RoleType;
  /** 目标ID（可选） */
  targetId?: string;
  /** 游戏ID */
  gameId: string;
  /** 当前游戏阶段 */
  gamePhase: GamePhase;
  /** 执行时间戳 */
  timestamp: number;
  /** 额外参数 */
  params?: Record<string, any>
}

/**
 * 技能执行结果接口
 */
export interface SkillExecutionResult  {
  /** 是否执行成功 */
  success: boolean;
  /** 技能ID */
  skillId: string;
  /** 执行上下文 */
  context: SkillExecutionContext;
  /** 技能效果 */
  effects: SkillEffectResult[];
  /** 错误信息（如果失败） */
error?:  {
    code: string;
    message: string;
    details?: any
}
  /** 执行耗时（毫秒） */
  duration: number;
  /** 下次可用时间 */
  nextAvailableTime?: number
}

/**
 * 技能效果结果接口
 */
export interface SkillEffectResult  {
  /** 效果类型 */
  type: SkillEffect;
  /** 目标ID */
  targetId: string;
  /** 效果值 */
  value: number;
  /** 是否暴击 */
  isCritical: boolean;
  /** 效果持续时间 */
  duration: number;
  /** 效果描述 */
  description: string
}

/**
 * 技能冷却信息接口
 */
export interface SkillCooldownInfo  {
  /** 技能ID */
  skillId: string;
  /** 用户ID */
  userId: string;
  /** 冷却开始时间 */
  startTime: number;
  /** 冷却持续时间 */
  duration: number;
  /** 剩余冷却时间 */
  remainingTime: number;
  /** 是否正在冷却 */
  isOnCooldown: boolean
}

/**
 * 技能使用统计接口
 */
export interface SkillUsageStats  {
  /** 技能ID */
  skillId: string;
  /** 用户ID */
  userId: string;
  /** 本轮使用次数 */
  turnUsageCount: number;
  /** 本局使用次数 */
  gameUsageCount: number;
  /** 总使用次数 */
  totalUsageCount: number;
  /** 最后使用时间 */
  lastUsedTime: number;
  /** 成功率 */
  successRate: number
}

/**
 * 技能执行服务类
 */
export class SkillExecutionService  {
  private static instance: SkillExecutionService;
  private eventEmitter: EventEmitter;
  private cooldownCache: MemoryCache<SkillCooldownInfo>;
  private usageStatsCache: MemoryCache<SkillUsageStats>;
  private executionHistory: Map<string, SkillExecutionResult[]>;

  /**
 * 构造函数
 */
private constructor()  {
    this.eventEmitter = new EventEmitter();
    this.cooldownCache = new MemoryCache<SkillCooldownInfo>({
      maxSize: 1000,
      ttl: 3600000, // 1小时
    });
    this.usageStatsCache = new MemoryCache<SkillUsageStats>({
      maxSize: 1000,
      ttl: 7200000, // 2小时
    });
    this.executionHistory = new Map()
}

  /**
 * 获取单例实例
 */
public static getInstance(): SkillExecutionService  {
    if (!SkillExecutionService.instance) {
      SkillExecutionService.instance = new SkillExecutionService()
}
    return SkillExecutionService.instance
}

  /**
   * 执行技能
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @returns 执行结果
   */
  public async executeSkill(
    skillId: string,
    context: SkillExecutionContext
  ): Promise<SkillExecutionResult> {
    const startTime = Date.now();

    try {
      // 1. 验证技能执行请求
      const validationResult = await this.validateSkillExecution(
        skillId,
        context
      );
      if (!validationResult.success) {
        return this.createFailureResult(
          skillId,
          context,
          validationResult.error!,
          startTime
        )
}

      // 2. 获取技能配置
      const skillConfig = getSkillConfig(skillId);
      if (!skillConfig) {
        return this.createFailureResult(
          skillId,
          context,
          formatError('SKILL_001'),
          startTime
        )
}

      // 3. 检查技能可用性
      const availabilityCheck = this.checkSkillAvailability(skillId, context);
      if (!availabilityCheck.available) {
        return this.createFailureResult(
          skillId,
          context,
          availabilityCheck.error!,
          startTime
        )
}

      // 4. 执行技能前置处理
      await this.preExecuteSkill(skillId, context, skillConfig);

      // 5. 计算技能效果
      const effects = await this.calculateSkillEffects(
        skillId,
        context,
        skillConfig
      );

      // 6. 应用技能效果
      await this.applySkillEffects(effects, context);

      // 7. 执行技能后置处理
      await this.postExecuteSkill(skillId, context, skillConfig);

      // 8. 创建成功结果
      const result: SkillExecutionResult = { success: true,
        skillId,
        context,
        effects,
        duration: Date.now() - startTime,
        nextAvailableTime: this.calculateNextAvailableTime(
          skillId,
          context,
          skillConfig
        )  };

      // 9. 记录执行历史
      this.recordExecutionHistory(result);

      // 10. 发送事件
      this.eventEmitter.emit('skillExecuted', result);

      return result
} catch (error) {
      // 处理执行异常
      const errorResult = this.createFailureResult(
        skillId,
        context,
        formatError('SKILL_006', error),
        startTime
      );

      this.eventEmitter.emit('skillExecutionFailed', errorResult);
      return errorResult
}
  }

  /**
   * 验证技能执行请求
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @returns 验证结果
   */
  private async validateSkillExecution(
    skillId: string,
    context: SkillExecutionContext
  ): Promise<{ success: boolean; error?: any 
}> { // 验证技能使用数据
    const skillUseData = {
      skillId,
      userId: context.executorId,
      targetId: context.targetId  
};

    const validationResult = validateValue(
      skillUseData,
      VALIDATION_RULE_GROUPS.SKILL_USE,
      {
        userId: context.executorId,
        gameId: context.gameId,
        gamePhase: context.gamePhase,
        userRole: context.executorRole 
}
    );

    if (!validationResult.isValid) {
      return {
        success: false,
        error: formatError('VALIDATION_001', validationResult.errors) }
}

    return { success: true 
}
}

  /**
   * 检查技能可用性
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @returns 可用性检查结果
   */
  private checkSkillAvailability(
    skillId: string,
    context: SkillExecutionContext
  ): { available: boolean; error?: any 
} {
    // 检查基本可用性
    const usageStats = this.getSkillUsageStats(skillId, context.executorId);
    const isAvailable = isSkillAvailable(skillId, {
      phase: context.gamePhase,
      playerRole: context.executorRole,
      usageCount: usageStats.turnUsageCount,
      gameUsageCount: usageStats.gameUsageCount 
});

    if (!isAvailable) {
      return {
        available: false,
        error: formatError('SKILL_002') 
}
}

    // 检查冷却时间
    const cooldownInfo = this.getSkillCooldown(skillId, context.executorId);
    if (cooldownInfo.isOnCooldown) {
      return {
        available: false,
        error: formatError('SKILL_003', {
          remainingTime: cooldownInfo.remainingTime 
}) }
}

    return { available: true 
}
}

  /**
   * 技能执行前置处理
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   */
  private async preExecuteSkill(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig
  ): Promise<void> {
    // 设置技能冷却
    this.setSkillCooldown(skillId, context, config);

    // 更新使用统计
    this.updateSkillUsageStats(skillId, context.executorId);

    // 发送技能开始事件
    this.eventEmitter.emit('skillExecutionStarted', {
      skillId,
      context,
      config })
}

  /**
   * 计算技能效果
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   * @returns 技能效果数组
   */
  private async calculateSkillEffects(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig
  ): Promise<SkillEffectResult[]> {
    const effects: SkillEffectResult[] = [];
    const targetId = context.targetId || context.executorId;

    // 计算主要效果
    const mainEffect = this.calculateMainEffect(
      skillId,
      context,
      config,
      targetId
    );
    if (mainEffect) {
      effects.push(mainEffect)
}

    // 计算附加效果
    const additionalEffects = this.calculateAdditionalEffects(
      skillId,
      context,
      config,
      targetId
    );
    effects.push(...additionalEffects);

    return effects
}

  /**
   * 计算主要效果
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   * @param targetId - 目标ID
   * @returns 主要效果
   */
  private calculateMainEffect(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig,
    targetId: string
  ): SkillEffectResult | null {
    const { effects } = config;

    // 检查命中率
    const hitRoll = Math.random();
    if (hitRoll > effects.accuracy) {
      return null; // 未命中
    }

    // 检查暴击
    const critRoll = Math.random();
    const isCritical = critRoll <= effects.criticalChance;

    // 计算效果值
    let value = 0;
    switch (effects.effectType) {
      case 'damage':
      case 'instant_kill':
        value = calculateSkillDamage(skillId, config.level, isCritical);
        break;
      case 'healing':
        value = this.calculateHealingValue(skillId, config, isCritical);
        break;
      case 'protection':
      case 'detection':
      case 'vote':
      case 'communication':
        value = effects.basePower;
        break;
      default: value = effects.basePower
}

    return {
      type: effects.effectType,
      targetId,
      value,
      isCritical,
      duration: config.execution.duration,
      description: this.generateEffectDescription(
        effects.effectType,
        value,
        isCritical
      ) }
}

  /**
   * 计算附加效果
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   * @param targetId - 目标ID
   * @returns 附加效果数组
   */
  private calculateAdditionalEffects(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig,
    targetId: string
  ): SkillEffectResult[] {
    const additionalEffects: SkillEffectResult[] = [];

    for (const effect of config.effects.additionalEffects) {
      const chanceRoll = Math.random();
      if (chanceRoll <= effect.chance) {
        additionalEffects.push({
          type: effect.type,
          targetId,
          value: effect.power,
          isCritical: false,
          duration: effect.duration,
          description: this.generateEffectDescription(
            effect.type,
            effect.power,
            false
          ) })
}
    }

    return additionalEffects
}

  /**
   * 计算治疗值
   * @param skillId - 技能ID
   * @param config - 技能配置
   * @param isCritical - 是否暴击
   * @returns 治疗值
   */
  private calculateHealingValue(
    skillId: string,
    config: CompleteSkillConfig,
    isCritical: boolean
  ): number {
    const { basePower, levelMultiplier, criticalMultiplier } = config.effects;

    let healing = basePower;
    healing *= Math.pow(levelMultiplier, config.level - 1);

    if (isCritical) {
      healing *= criticalMultiplier
}

    // 添加随机变化
    const variance = 1 + (Math.random() - 0.5) * 0.1; // ±5%
    healing *= variance;

    return Math.round(healing)
}

  /**
   * 应用技能效果
   * @param effects - 技能效果数组
   * @param context - 执行上下文
   */
  private async applySkillEffects(
    effects: SkillEffectResult[],
    context: SkillExecutionContext
  ): Promise<void> {
    for (const effect of effects) {
      await this.applyEffect(effect, context)
}
  }

  /**
   * 应用单个效果
   * @param effect - 技能效果
   * @param context - 执行上下文
   */
  private async applyEffect(
    effect: SkillEffectResult,
    context: SkillExecutionContext
  ): Promise<void> {
    // 发送效果应用事件
    this.eventEmitter.emit('effectApplied', {
      effect,
      context });

    // 这里应该与游戏状态服务交互来实际应用效果
    // 暂时只记录日志
    console.log(
      `Applied effect: ${effect.type
} to ${effect.targetId} with value ${effect.value}`
    )
}

  /**
   * 技能执行后置处理
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   */
  private async postExecuteSkill(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig
  ): Promise<void> {
    // 发送技能完成事件
    this.eventEmitter.emit('skillExecutionCompleted', {
      skillId,
      context,
      config })
}

  /**
   * 设置技能冷却
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   */
  private setSkillCooldown(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig
  ): void { const cooldownDuration = calculateSkillCooldown(
      skillId,
      config.level,
      context.executorRole
    );

    if (cooldownDuration > 0) {
      const cooldownInfo: SkillCooldownInfo = {
        skillId,
        userId: context.executorId,
        startTime: context.timestamp,
        duration: cooldownDuration,
        remainingTime: cooldownDuration,
        isOnCooldown: true   
}

      const cacheKey = `${skillId}_${context.executorId}`;
      this.cooldownCache.set(cacheKey, cooldownInfo, cooldownDuration)
}
  }

  /**
   * 获取技能冷却信息
   * @param skillId - 技能ID
   * @param userId - 用户ID
   * @returns 冷却信息
   */
public getSkillCooldown(skillId: string, userId: string): SkillCooldownInfo  {
    const cacheKey = `${skillId}_${userId}`;
    const cooldownInfo = this.cooldownCache.get(cacheKey);

    if (!cooldownInfo) {
      return {
        skillId,
        userId,
        startTime: 0,
        duration: 0,
        remainingTime: 0,
        isOnCooldown: false 
}
}

    const now = Date.now();
    const elapsed = now - cooldownInfo.startTime;
    const remainingTime = Math.max(0, cooldownInfo.duration - elapsed);

    return {
      ...cooldownInfo,
      remainingTime,
      isOnCooldown: remainingTime > 0 
}
}

  /**
   * 更新技能使用统计
   * @param skillId - 技能ID
   * @param userId - 用户ID
   */
private updateSkillUsageStats(skillId: string, userId: string): void  {
    const cacheKey = `${skillId}_${userId}`;
    let stats = this.usageStatsCache.get(cacheKey);

    if (!stats) {
      stats = {
        skillId,
        userId,
        turnUsageCount: 0,
        gameUsageCount: 0,
        totalUsageCount: 0,
        lastUsedTime: 0,
        successRate: 1.0 
}
}

    stats.turnUsageCount++;
    stats.gameUsageCount++;
    stats.totalUsageCount++;
    stats.lastUsedTime = Date.now();

    this.usageStatsCache.set(cacheKey, stats)
}

  /**
   * 获取技能使用统计
   * @param skillId - 技能ID
   * @param userId - 用户ID
   * @returns 使用统计
   */
public getSkillUsageStats(skillId: string, userId: string): SkillUsageStats  {
    const cacheKey = `${skillId}_${userId}`;
    const stats = this.usageStatsCache.get(cacheKey);

    return (
      stats || {
        skillId,
        userId,
        turnUsageCount: 0,
        gameUsageCount: 0,
        totalUsageCount: 0,
        lastUsedTime: 0,
        successRate: 1.0 
}
    )
}

  /**
   * 计算下次可用时间
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param config - 技能配置
   * @returns 下次可用时间戳
   */
  private calculateNextAvailableTime(
    skillId: string,
    context: SkillExecutionContext,
    config: CompleteSkillConfig
  ): number {
    const cooldownDuration = calculateSkillCooldown(
      skillId,
      config.level,
      context.executorRole
    );
    return context.timestamp + cooldownDuration
}

  /**
   * 生成效果描述
   * @param effectType - 效果类型
   * @param value - 效果值
   * @param isCritical - 是否暴击
   * @returns 效果描述
   */
  private generateEffectDescription(
    effectType: SkillEffect,
    value: number,
    isCritical: boolean
  ): string {
    const criticalText = isCritical ? '暴击！' : '';

    switch (effectType) {
      case 'damage': return `${criticalText
}造成 ${value} 点伤害`;
      case 'healing': return `${criticalText
}恢复 ${value} 点生命值`;
      case 'instant_kill':
        return '瞬间击杀目标';
      case 'protection':
        return '获得保护效果';
      case 'detection':
        return '获得侦测信息';
      case 'vote':
        return '投出一票';
      case 'communication':
        return '发送消息';
      case 'resurrection':
        return '复活目标';
      default: return `产生 ${effectType
} 效果`
}
  }

  /**
   * 创建失败结果
   * @param skillId - 技能ID
   * @param context - 执行上下文
   * @param error - 错误信息
   * @param startTime - 开始时间
   * @returns 失败结果
   */
  private createFailureResult(
    skillId: string,
    context: SkillExecutionContext,
    error: any,
    startTime: number
  ): SkillExecutionResult {
    return {
      success: false,
      skillId,
      context,
      effects: [],
      error,
      duration: Date.now() - startTime 
}
}

  /**
   * 记录执行历史
   * @param result - 执行结果
   */
private recordExecutionHistory(result: SkillExecutionResult): void  {
    const key = `${result.context.executorId}_${result.context.gameId}`;

    if (!this.executionHistory.has(key)) {
      this.executionHistory.set(key, [])
}

    const history = this.executionHistory.get(key)!;
    history.push(result);

    // 限制历史记录数量
    if (history.length > 100) {
      history.splice(0, history.length - 100)
}
  }

  /**
   * 获取执行历史
   * @param userId - 用户ID
   * @param gameId - 游戏ID
   * @returns 执行历史
   */
  public getExecutionHistory(
    userId: string,
    gameId: string
  ): SkillExecutionResult[] {
    const key = `${userId}_${gameId}`;
    return this.executionHistory.get(key) || []
}

  /**
   * 清除用户数据
   * @param userId - 用户ID
   */
public clearUserData(userId: string): void  {
    // 清除冷却缓存
    for (const [key] of this.cooldownCache.entries()) {
      if (key.endsWith(`_${userId}`)) {
        this.cooldownCache.delete(key)
}
    }

    // 清除使用统计缓存
    for (const [key] of this.usageStatsCache.entries()) {
      if (key.endsWith(`_${userId}`)) {
        this.usageStatsCache.delete(key)
}
    }

    // 清除执行历史
    for (const [key] of this.executionHistory.keys()) {
      if (key.startsWith(`${userId}_`)) {
        this.executionHistory.delete(key)
}
    }
  }

  /**
   * 重置回合数据
   * @param gameId - 游戏ID
   */
public resetTurnData(gameId: string): void  {
    // 重置回合使用次数
    for (const [key, stats] of this.usageStatsCache.entries()) {
      if (stats && key.includes(gameId)) {
        stats.turnUsageCount = 0;
        this.usageStatsCache.set(key, stats)
}
    }

    this.eventEmitter.emit('turnDataReset', { gameId })
}

  /**
   * 监听事件
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public on(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.on(event, listener)
}

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public off(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.off(event, listener)
}
}

/**
 * 技能执行服务单例实例
 */
export const skillExecutionService = SkillExecutionService.getInstance();
