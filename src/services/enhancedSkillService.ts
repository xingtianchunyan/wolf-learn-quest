// 增强的技能服务 - 使用统一验证和错误处理
import { supabase } from '@/integrations/supabase/client';
import {
  createTranslator,
  defaultLanguage,
  type LanguageCode,
} from '@/lib/translations';
import { skillSystemValidation } from './skillSystemValidation';
import { performanceMonitoringService } from './performanceMonitoringService';
import { createLogger } from '@/lib/logger';
import {
  SKILL_MAPPING_CONFIG,
  getSkillConfigByChinese,
  getSkillConfigByEnglish,
  resolveSkillConflicts,
  type SkillConfig,
} from '@/utils/skillMappingConfig';
import { validateSkillUnified } from '@/utils/skillValidationRules';
import {
  SkillErrorHandler,
  SkillErrorType,
  handleSkillErrors,
} from '@/utils/skillErrorHandler';
import {
  SkillUsageContext,
  SkillValidationResult,
  RoleState,
  RoleDesign,
  SkillConfig as SkillConfigType,
  SkillErrorType as SkillErrorTypeEnum,
  SkillError,
  RoleSkillUsageState,
  LegacySkillUsageState,
  isRoleSkillUsageState,
  isLegacySkillUsageState,
  DEFAULT_SKILL_CONFIGS,
} from '../types/skillSystem.types';

/**
 * 技能服务错误类
 * 提供统一的技能相关错误处理
 */
export class SkillServiceError extends Error {
  /**
   * 创建技能服务错误实例
   * @param message - 错误消息
   * @param code - 错误代码
   * @param skillName - 技能名称（可选）
   * @param userId - 用户ID（可选）
   */
  constructor(
    message: string,
    public code: string,
    public skillName?: string,
    public userId?: string
  ) {
    super(message);
    this.name = 'SkillServiceError';
  }
}

export class EnhancedSkillServiceError extends Error {
  code?: string;
  skillId?: string;

  constructor(message: string, code?: string, skillId?: string) {
    super(message);
    this.name = 'EnhancedSkillServiceError';
    this.code = code;
    this.skillId = skillId;
  }
}

const logger = createLogger('enhanced-skill-service');

const getT = (language?: LanguageCode) =>
  createTranslator(language || defaultLanguage);

export class EnhancedSkillService {
  private static readonly PHASE_NAMES = [
    'day',
    'evening',
    'night',
    'dawn',
  ] as const;

  /**
   * 验证用户权限
   */
  private static async validateUserAuth(
    language?: LanguageCode
  ): Promise<boolean> {
    const t = getT(language);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new EnhancedSkillServiceError(
        t('hook.service.enhancedSkill.auth_required'),
        'AUTH_REQUIRED'
      );
    }
    return true;
  }

  /**
   * 获取角色技能配置
   * @param roleDesign - 角色设计对象
   * @returns 技能配置对象
   * @throws {SkillServiceError} 当角色设计无效或技能配置不存在时
   */
  static getRoleSkillConfig(
    roleDesign: RoleDesign,
    language?: LanguageCode
  ): SkillConfigType {
    const startTime = performance.now();
    const t = getT(language);

    try {
      if (!roleDesign?.skill_name) {
        throw new SkillServiceError(
          t('hook.service.enhancedSkill.missing_skill_name'),
          'MISSING_SKILL_NAME',
          undefined,
          undefined
        );
      }

      // 首先尝试从 SKILL_MAPPING_CONFIG 通过 ID 获取
      const skillConfigById = SKILL_MAPPING_CONFIG[roleDesign.skill_name];
      if (skillConfigById) {
        performanceMonitoringService.recordMetric(
          'skill_config_retrieval',
          performance.now() - startTime
        );
        return skillConfigById;
      }

      // 然后尝试通过英文名获取
      const skillConfig = getSkillConfigByEnglish(roleDesign.skill_name);
      if (skillConfig) {
        performanceMonitoringService.recordMetric(
          'skill_config_retrieval',
          performance.now() - startTime
        );
        return skillConfig;
      }

      // 如果配置中没有，尝试从默认配置获取
      const defaultConfig = DEFAULT_SKILL_CONFIGS[roleDesign.skill_name];
      if (defaultConfig) {
        performanceMonitoringService.recordMetric(
          'skill_config_retrieval',
          performance.now() - startTime
        );
        return defaultConfig;
      }

      throw new SkillServiceError(
        t('hook.service.enhancedSkill.config_not_found', {
          skillName: roleDesign.skill_name,
        }),
        'SKILL_CONFIG_NOT_FOUND',
        roleDesign.skill_name,
        undefined
      );
    } catch (error) {
      performanceMonitoringService.recordMetric(
        'skill_config_retrieval_error',
        performance.now() - startTime
      );
      throw error;
    }
  }

  /**
   * 验证技能使用条件 - 使用统一验证模块
   */
  public static async validateSkillUsage(
    context: SkillUsageContext,
    language?: LanguageCode
  ): Promise<SkillValidationResult> {
    const t = getT(language);
    const { userId, gameStateId, currentPhase, targetUserId } = context;

    // 获取技能配置
    let skillConfig;
    try {
      skillConfig = this.getRoleSkillConfig(context.roleDesign, language);
    } catch (error) {
      logger.warn('技能配置获取失败', {
        roleDesign: context.roleDesign,
        error,
      });
      return {
        isValid: false,
        reason: t('hook.service.enhancedSkill.config_missing_reason'),
        suggestedAction: t('hook.service.enhancedSkill.check_role_design'),
      };
    }

    if (!skillConfig) {
      logger.warn('技能配置获取失败', { roleDesign: context.roleDesign });
      return {
        isValid: false,
        reason: t('hook.service.enhancedSkill.config_missing_reason'),
        suggestedAction: t('hook.service.enhancedSkill.check_role_design'),
      };
    }

    logger.debug('开始验证技能使用条件', {
      skillName: skillConfig.chineseName,
      currentPhase,
      roleStatus: context.roleState?.role_status,
    });

    // 使用统一的验证函数
    const validation = await validateSkillUnified(
      skillConfig.englishName,
      userId,
      gameStateId,
      currentPhase,
      {
        targetUserId,
        ...(context.additionalData || {}),
      }
    );

    logger.debug('技能验证结果', {
      skillName: skillConfig.chineseName,
      valid: validation.valid,
      reason: validation.reason,
    });

    return {
      isValid: validation.valid,
      reason: validation.reason,
      suggestedAction: validation.valid
        ? undefined
        : t('hook.service.enhancedSkill.check_usage_conditions'),
    };
  }

  /**
   * 获取技能已使用次数
   * @param roleState - 角色状态对象
   * @param skillName - 技能名称
   * @returns 已使用次数
   */
  static getSkillUsedCount(roleState: RoleState, skillName: string): number {
    const startTime = performance.now();

    try {
      if (!roleState?.skill_uses_remaining) {
        performanceMonitoringService.recordMetric(
          'skill_usage_count_retrieval',
          performance.now() - startTime
        );
        return 0;
      }

      const skillUsageState = roleState.skill_uses_remaining;

      // 检查是否为新版格式
      if (isRoleSkillUsageState(skillUsageState)) {
        const skillUsage = skillUsageState[skillName];
        if (skillUsage) {
          performanceMonitoringService.recordMetric(
            'skill_usage_count_retrieval',
            performance.now() - startTime
          );
          return skillUsage.used || 0;
        }
      }

      // 检查是否为旧版格式
      if (isLegacySkillUsageState(skillUsageState)) {
        const used = skillUsageState.total - skillUsageState.remaining;
        performanceMonitoringService.recordMetric(
          'skill_usage_count_retrieval',
          performance.now() - startTime
        );
        return Math.max(0, used);
      }

      performanceMonitoringService.recordMetric(
        'skill_usage_count_retrieval',
        performance.now() - startTime
      );
      return 0;
    } catch (error) {
      performanceMonitoringService.recordMetric(
        'skill_usage_count_retrieval_error',
        performance.now() - startTime
      );
      logger.error('获取技能使用次数失败', {
        error,
        skillName,
        userId: roleState.user_id,
      });
      return 0;
    }
  }

  /**
   * 检查技能在当前回合是否已使用
   * @param roleState - 角色状态对象
   * @param skillName - 技能名称
   * @param currentRound - 当前回合数
   * @returns 是否已在当前回合使用过该技能
   */
  static hasSkillUsedInCurrentRound(
    roleState: RoleState,
    skillName: string,
    currentRound: number
  ): boolean {
    const startTime = performance.now();

    try {
      if (!roleState?.round_skill_uses) {
        performanceMonitoringService.recordMetric(
          'skill_round_usage_check',
          performance.now() - startTime
        );
        return false;
      }

      const roundSkillUses = roleState.round_skill_uses[currentRound];
      if (!Array.isArray(roundSkillUses)) {
        performanceMonitoringService.recordMetric(
          'skill_round_usage_check',
          performance.now() - startTime
        );
        return false;
      }

      const hasUsed = roundSkillUses.includes(skillName);
      performanceMonitoringService.recordMetric(
        'skill_round_usage_check',
        performance.now() - startTime
      );
      return hasUsed;
    } catch (error) {
      performanceMonitoringService.recordMetric(
        'skill_round_usage_check_error',
        performance.now() - startTime
      );
      logger.error('检查技能回合使用状态失败', {
        error,
        skillName,
        currentRound,
        userId: roleState.user_id,
      });
      return false;
    }
  }

  /**
   * 将角色状态数字转换为状态名称
   */
  private static getStatusName(status: number): string {
    switch (status) {
      case 1:
        return 'normal';
      case 2:
        return 'dying';
      case 3:
        return 'weak';
      case 4:
        return 'eliminated';
      default:
        return 'normal';
    }
  }

  /**
   * 使用技能 - 增强版本，带错误处理
   */
  public static async useSkillEnhanced(
    context: SkillUsageContext,
    language?: LanguageCode
  ): Promise<string> {
    const t = getT(language);
    await this.validateUserAuth(language);

    // 验证技能使用条件
    const validation = await this.validateSkillUsage(context, language);
    if (!validation.isValid) {
      const skillError = SkillErrorHandler.createError(
        SkillErrorType.VALIDATION_ERROR,
        'VALIDATION_FAILED',
        validation.reason ||
          t('hook.service.enhancedSkill.usage_conditions_not_met'),
        validation,
        this.getRoleSkillConfig(context.roleDesign, language)?.chineseName,
        context.userId,
        context.gameStateId
      );

      throw skillError;
    }

    const skillConfig = this.getRoleSkillConfig(context.roleDesign, language);
    if (!skillConfig) {
      throw new EnhancedSkillServiceError(
        t('hook.service.enhancedSkill.config_not_exist'),
        'CONFIG_NOT_FOUND'
      );
    }

    try {
      // 调用增强版技能使用函数，使用统一验证
      const { data, error } = await supabase.rpc('use_skill_enhanced', {
        p_game_state_id: context.gameStateId,
        p_skill_name: skillConfig.englishName,
        p_target_user_id: context.targetUserId,
        p_skill_data: {
          ...(context.additionalData || {}),
          skill_config_id: skillConfig.id,
          chinese_name: skillConfig.chineseName,
          priority: skillConfig.priority,
          // 女巫魔药的特殊处理
          potionType: context.additionalData?.potionType,
          effectType: context.additionalData?.effectType,
        },
      });

      if (error) {
        const skillError = SkillErrorHandler.createError(
          SkillErrorType.EXECUTION_ERROR,
          error.code || 'EXECUTION_FAILED',
          t('hook.service.enhancedSkill.use_failed', {
            message: error.message,
          }),
          error,
          skillConfig.chineseName,
          context.userId,
          context.gameStateId
        );

        throw skillError;
      }

      logger.info('技能使用成功', {
        skillName: skillConfig.chineseName,
        userId: context.userId,
        gameStateId: context.gameStateId,
        targetUserId: context.targetUserId,
      });

      return data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t('hook.service.enhancedSkill.use_failed', { message: '' });
      const errorCode =
        error instanceof SkillServiceError ? error.code : 'SKILL_USE_ERROR';

      // 网络错误处理
      if (
        error instanceof Error &&
        (error.name === 'NetworkError' || error.message?.includes('fetch'))
      ) {
        const networkError = SkillErrorHandler.createError(
          SkillErrorType.NETWORK_ERROR,
          'NETWORK_ERROR',
          t('hook.service.enhancedSkill.network_error'),
          error,
          skillConfig.chineseName,
          context.userId,
          context.gameStateId
        );

        throw networkError;
      }

      logger.error('技能使用失败', {
        error: error,
        context: {
          userId: context.userId,
          skillName: skillConfig.chineseName,
          gameStateId: context.gameStateId,
        },
      });
      throw error;
    }
  }

  /**
   * 获取当前活跃的技能
   */
  private static async getActiveSkills(
    gameStateId: string,
    currentRound: number
  ): Promise<SkillConfig[]> {
    const { data, error } = await supabase
      .from('skill_uses')
      .select('skill_name, skill_effects')
      .eq('game_state_id', gameStateId)
      .eq('round_number', currentRound)
      .eq('execution_status', 'pending');

    if (error) {
      return [];
    }

    const activeSkills: SkillConfig[] = [];
    for (const skillUse of data || []) {
      const config = getSkillConfigByEnglish(skillUse.skill_name);
      if (config) {
        activeSkills.push(config);
      }
    }

    return activeSkills;
  }

  /**
   * 检查技能冲突
   */
  private static checkForConflicts(
    newSkills: SkillConfig[],
    existingSkills: SkillConfig[]
  ): { hasConflicts: boolean; conflicts: string[] } {
    const allSkills = [...existingSkills, ...newSkills];
    const conflicts: string[] = [];

    for (let i = 0; i < allSkills.length; i++) {
      for (let j = i + 1; j < allSkills.length; j++) {
        const skill1 = allSkills[i];
        const skill2 = allSkills[j];

        if (
          skill1.conflictsWith.includes(skill2.id) ||
          skill2.conflictsWith.includes(skill1.id)
        ) {
          conflicts.push(`${skill1.chineseName} vs ${skill2.chineseName}`);
        }
      }
    }

    return {
      hasConflicts: conflicts.length > 0,
      conflicts,
    };
  }

  /**
   * 更新技能使用计数
   */
  private static async updateSkillUsageCount(
    userId: string,
    gameStateId: string,
    skillId: string,
    currentRound: number
  ): Promise<void> {
    // 获取当前角色状态
    const { data: roleState, error: fetchError } = await supabase
      .from('role_states')
      .select('skill_uses_remaining')
      .eq('user_id', userId)
      .eq('game_state_id', gameStateId)
      .single();

    if (fetchError) {
      return;
    }

    // 更新使用次数
    const currentUses =
      (roleState?.skill_uses_remaining as Record<string, any>) || {};
    const skillUses = (currentUses[skillId] as {
      used?: number;
      remaining?: number;
    }) || { used: 0, remaining: 0 };

    // 更新回合使用记录
    const roundUses = (roleState as any)?.round_skill_uses || {};
    const currentRoundUses = roundUses[currentRound] || [];

    const updatedUses = {
      ...currentUses,
      [skillId]: {
        used: (skillUses.used || 0) + 1,
        remaining: Math.max(0, (skillUses.remaining || 0) - 1),
      },
    };

    const updatedRoundUses = {
      ...roundUses,
      [currentRound]: [...currentRoundUses, skillId],
    };

    // 保存更新
    const { error: updateError } = await supabase
      .from('role_states')
      .update({
        skill_uses_remaining: updatedUses,
        round_skill_uses: updatedRoundUses,
      })
      .eq('user_id', userId)
      .eq('game_state_id', gameStateId);

    if (updateError) {
    }
  }

  /**
   * 触发技能冲突检测 - 增强版本
   */
  public static async detectSkillConflicts(
    gameStateId: string,
    roundNumber: number,
    phaseName: string,
    language?: LanguageCode
  ): Promise<{ conflicts: number; details: any }> {
    const t = getT(language);
    await this.validateUserAuth(language);

    logger.debug('开始检测技能冲突', { gameStateId, roundNumber, phaseName });

    // 调用增强的数据库冲突检测函数
    const { data, error } = await supabase.rpc('detect_skill_conflicts', {
      p_game_state_id: gameStateId,
      p_round_number: roundNumber,
      p_phase: phaseName,
    });

    if (error) {
      logger.error('技能冲突检测失败', error);
      throw new EnhancedSkillServiceError(
        t('hook.service.enhancedSkill.conflict_detect_failed', {
          message: error.message,
        }),
        error.code
      );
    }

    logger.debug('技能冲突检测完成', { result: data });
    return {
      conflicts: (data as any)?.conflicts_detected || 0,
      details: data,
    };
  }

  /**
   * 验证女巫药剂使用
   */
  public static async validateWitchPotion(
    userId: string,
    gameStateId: string,
    potionType: 'protection' | 'attack',
    targetUserId?: string,
    language?: LanguageCode
  ): Promise<{ canUse: boolean; reason?: string; nightDeaths?: any[] }> {
    const t = getT(language);
    await this.validateUserAuth(language);

    const { data, error } = await supabase.rpc('validate_witch_potion_usage', {
      p_user_id: userId,
      p_game_state_id: gameStateId,
      p_potion_type: potionType,
      p_target_user_id: targetUserId,
    });

    if (error) {
      logger.error('女巫药剂验证失败', error);
      throw new EnhancedSkillServiceError(
        t('hook.service.enhancedSkill.potion_validate_failed', {
          message: error.message,
        }),
        error.code
      );
    }

    return {
      canUse: (data as any)?.can_use || false,
      reason: (data as any)?.reason,
      nightDeaths: (data as any)?.night_deaths,
    };
  }

  /**
   * 触发猎人濒死技能
   */
  public static async triggerHunterDyingSkill(
    hunterUserId: string,
    gameStateId: string,
    triggerReason: string = 'elimination'
  ): Promise<boolean> {
    await this.validateUserAuth();

    const { data, error } = await supabase.rpc('trigger_hunter_dying_skill', {
      p_hunter_user_id: hunterUserId,
      p_game_state_id: gameStateId,
      p_trigger_reason: triggerReason,
    });

    if (error) {
      logger.error('猎人濒死技能触发失败', error);
      return false;
    }

    return data || false;
  }

  /**
   * 检查恶魔免疫
   */
  public static async checkDemonImmunity(
    targetUserId: string,
    attackerUserId: string,
    gameStateId: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('check_demon_immunity', {
      p_target_user_id: targetUserId,
      p_attacker_user_id: attackerUserId,
      p_game_state_id: gameStateId,
    });

    if (error) {
      logger.error('恶魔免疫检查失败', error);
      return false;
    }

    return data || false;
  }

  /**
   * 检查多重保护
   */
  public static async checkMultipleProtection(
    targetUserId: string,
    gameStateId: string,
    roundNumber: number
  ): Promise<{
    shouldEliminate: boolean;
    reason?: string;
    protectionCount?: number;
  }> {
    const { data, error } = await supabase.rpc('check_multiple_protection', {
      p_target_user_id: targetUserId,
      p_game_state_id: gameStateId,
      p_round_number: roundNumber,
    });

    if (error) {
      logger.error('多重保护检查失败', error);
      return { shouldEliminate: false };
    }

    return {
      shouldEliminate: (data as any)?.should_eliminate || false,
      reason: (data as any)?.reason,
      protectionCount: (data as any)?.protection_count,
    };
  }

  /**
   * 处理技能效果冲突解决 - 统一在数据库层处理
   * @deprecated 冲突处理现在统一在数据库层进行，前端只负责触发检测
   */
  public static async resolveSkillConflictsInRound(
    gameStateId: string,
    roundNumber: number
  ): Promise<{ resolved: number; cancelled: number }> {
    logger.warn('此方法已废弃，请使用 detectSkillConflicts');

    await this.validateUserAuth();

    // 调用数据库函数统一处理冲突
    const { data, error } = await supabase.rpc('detect_skill_conflicts', {
      p_game_state_id: gameStateId,
      p_round_number: roundNumber,
      p_phase: 'night', // 这里需要传入正确的阶段
    });

    if (error) {
      logger.error('技能冲突处理失败', error);
      return { resolved: 0, cancelled: 0 };
    }

    // 返回处理结果（具体格式依赖数据库函数的实现）
    return { resolved: (data as any)?.conflicts_detected || 0, cancelled: 0 };
  }

  /**
   * 获取技能使用建议
   */
  public static async getSkillUsageSuggestion(
    context: SkillUsageContext,
    language?: LanguageCode
  ): Promise<{
    canUse: boolean;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    timing: string;
  }> {
    const t = getT(language);
    const validation = await this.validateSkillUsage(context, language);
    const skillConfig = this.getRoleSkillConfig(context.roleDesign, language);

    if (!validation.isValid || !skillConfig) {
      return {
        canUse: false,
        suggestion:
          validation.reason ||
          t('hook.service.enhancedSkill.skill_unavailable'),
        priority: 'low',
        timing: t('hook.service.enhancedSkill.cannot_use'),
      };
    }

    // 根据技能类型提供使用建议
    const suggestions = {
      elimination: t('hook.service.enhancedSkill.suggestion_elimination'),
      protection: t('hook.service.enhancedSkill.suggestion_protection'),
      investigation: t('hook.service.enhancedSkill.suggestion_investigation'),
      status_change: t('hook.service.enhancedSkill.suggestion_status_change'),
      passive: t('hook.service.enhancedSkill.suggestion_passive'),
    };

    const timing =
      skillConfig.phase === 'night'
        ? t('hook.service.enhancedSkill.timing_night')
        : skillConfig.phase === 'day'
          ? t('hook.service.enhancedSkill.timing_day')
          : t('hook.service.enhancedSkill.timing_specific');

    return {
      canUse: true,
      suggestion:
        suggestions[skillConfig.effectType[0] as keyof typeof suggestions] ||
        t('hook.service.enhancedSkill.suggestion_default'),
      priority:
        skillConfig.priority <= 3
          ? 'high'
          : skillConfig.priority <= 6
            ? 'medium'
            : 'low',
      timing,
    };
  }
}
