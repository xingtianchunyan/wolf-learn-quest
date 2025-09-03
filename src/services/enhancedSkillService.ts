// 增强的技能服务 - 实现完整的技能逻辑和安全验证
import { supabase } from '@/integrations/supabase/client';
import { createLogger } from '@/lib/logger';
import { 
  SKILL_MAPPING_CONFIG, 
  getSkillConfigByChinese,
  getSkillConfigByEnglish,
  resolveSkillConflicts,
  type SkillConfig 
} from '@/utils/skillMappingConfig';
import {
  validateSkillUseLimits,
  validateRoleStatus,
  validateSkillPhase,
  validateSkillTarget,
  createSkillValidationError
} from '@/utils/skillSystemValidation';

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

export interface SkillUsageContext {
  userId: string;
  gameStateId: string;
  roomId: string;
  currentPhase: number;
  currentRound: number;
  roleState: any;
  roleDesign: any;
  targetUserId?: string;
  additionalData?: Record<string, any>;
}

export interface SkillValidationResult {
  isValid: boolean;
  reason?: string;
  conflictingSkills?: string[];
  suggestedAction?: string;
}

const logger = createLogger('enhanced-skill-service');

export class EnhancedSkillService {
  private static readonly PHASE_NAMES = ['day', 'evening', 'night', 'dawn'] as const;
  
  /**
   * 验证用户权限
   */
  private static async validateUserAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new EnhancedSkillServiceError('用户未登录', 'AUTH_REQUIRED');
    }
    return true;
  }

  /**
   * 获取角色的技能配置
   */
  private static getRoleSkillConfig(roleDesign: any): SkillConfig | null {
    if (!roleDesign?.skill_name) {
      return null;
    }
    
    // 尝试通过英文名匹配
    let skillConfig = getSkillConfigByEnglish(roleDesign.skill_name);
    
    // 如果没找到，尝试通过中文名匹配
    if (!skillConfig && roleDesign.skill_description) {
      skillConfig = getSkillConfigByChinese(roleDesign.skill_description);
    }
    
    // 如果都没找到，尝试用映射配置直接查找
    if (!skillConfig) {
      // 检查是否是已知的技能名称，提供默认配置
      const defaultConfigs: Record<string, SkillConfig> = {
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
          usageLimit: 2,
          requiredStatus: ['normal'],
          targetType: 'single',
          effectType: ['protection', 'elimination'],
          isPassive: false,
          conflictsWith: []
        }
      };
      
      skillConfig = defaultConfigs[roleDesign.skill_name];
    }
    
    return skillConfig;
  }

  /**
   * 验证技能使用条件 - 使用统一验证模块
   */
  public static validateSkillUsage(context: SkillUsageContext): SkillValidationResult {
    const { roleState, roleDesign, currentPhase, targetUserId } = context;
    
    // 获取技能配置
    const skillConfig = this.getRoleSkillConfig(roleDesign);
    if (!skillConfig) {
      logger.warn('技能配置获取失败', { roleDesign });
      return {
        isValid: false,
        reason: '未找到技能配置',
        suggestedAction: '请检查角色设计配置'
      };
    }

    logger.debug('开始验证技能使用条件', { 
      skillName: skillConfig.chineseName,
      currentPhase,
      roleStatus: roleState?.role_status
    });

    // 验证角色状态
    const statusValidation = validateRoleStatus(skillConfig.requiredStatus, roleState?.role_status || 1);
    if (!statusValidation.valid) {
      return {
        isValid: false,
        reason: statusValidation.reason!,
        suggestedAction: `需要状态：${skillConfig.requiredStatus.join(' 或 ')}`
      };
    }

    // 验证使用阶段
    const phaseValidation = validateSkillPhase(skillConfig.phase, currentPhase);
    if (!phaseValidation.valid) {
      return {
        isValid: false,
        reason: phaseValidation.reason!,
        suggestedAction: `需要在 "${skillConfig.phase}" 阶段使用`
      };
    }

    // 验证目标选择
    const targetValidation = validateSkillTarget(skillConfig.targetType, targetUserId);
    if (!targetValidation.valid) {
      return {
        isValid: false,
        reason: targetValidation.reason!,
        suggestedAction: skillConfig.targetType === 'single' ? '请先选择一个目标玩家' : '取消目标选择'
      };
    }

    // 验证使用次数限制
    const useLimitValidation = validateSkillUseLimits(skillConfig, roleState, context.currentRound);
    if (!useLimitValidation.canUse) {
      return {
        isValid: false,
        reason: useLimitValidation.reason!,
        suggestedAction: skillConfig.usageLimit === 'unlimited' ? '每轮只能使用一次' : '技能使用次数已用完'
      };
    }

    logger.debug('技能验证通过', { skillName: skillConfig.chineseName });
    return { isValid: true };
  }

  /**
   * 获取技能已使用次数
   */
  private static getSkillUsedCount(roleState: any, skillId: string): number {
    // 检查角色状态中的技能使用记录
    const skillUses = roleState?.skill_uses_remaining || {};
    
    if (typeof skillUses === 'object' && skillUses[skillId]) {
      return skillUses[skillId].used || 0;
    }
    
    // 如果 skill_uses_remaining 是旧格式，检查 remaining 字段
    if (skillUses.total && skillUses.remaining !== undefined) {
      return (skillUses.total - skillUses.remaining) || 0;
    }
    
    return 0;
  }

  /**
   * 检查技能是否在当前回合已使用
   */
  private static hasSkillUsedInCurrentRound(roleState: any, skillId: string, currentRound: number): boolean {
    // 检查当前回合的使用记录
    const roundUses = roleState?.round_skill_uses || {};
    const currentRoundUses = roundUses[currentRound] || [];
    
    return currentRoundUses.includes(skillId);
  }

  /**
   * 将角色状态数字转换为状态名称
   */
  private static getStatusName(status: number): string {
    switch (status) {
      case 1: return 'normal';
      case 2: return 'dying';
      case 3: return 'weak';
      case 4: return 'eliminated';
      default: return 'normal';
    }
  }

  /**
   * 使用技能 - 增强版本
   */
  public static async useSkillEnhanced(context: SkillUsageContext): Promise<string> {
    await this.validateUserAuth();

    // 验证技能使用条件
    const validation = this.validateSkillUsage(context);
    if (!validation.isValid) {
      throw new EnhancedSkillServiceError(
        validation.reason || '技能使用条件不满足',
        'VALIDATION_FAILED'
      );
    }

    const skillConfig = this.getRoleSkillConfig(context.roleDesign);
    if (!skillConfig) {
      throw new EnhancedSkillServiceError('技能配置不存在', 'CONFIG_NOT_FOUND');
    }

    // 检查技能冲突
    const activeSkills = await this.getActiveSkills(context.gameStateId, context.currentRound);
    const conflictCheck = this.checkForConflicts([skillConfig], activeSkills);
    
    if (conflictCheck.hasConflicts) {
      // 记录冲突但继续执行，让系统后续解决冲突
      
    }

    // 调用增强版技能使用函数，确保同步到所有相关表
    const { data, error } = await supabase.rpc('use_skill_enhanced', {
      p_game_state_id: context.gameStateId,
      p_skill_name: skillConfig.englishName,
      p_target_user_id: context.targetUserId,
      p_skill_data: {
        ...(context.additionalData || {}),
        skill_config_id: skillConfig.id,
        chinese_name: skillConfig.chineseName,
        priority: skillConfig.priority
      }
    });

    if (error) {
      throw new EnhancedSkillServiceError(
        `技能使用失败: ${error.message}`,
        error.code,
        skillConfig.id
      );
    }

    // 更新角色状态中的技能使用计数
    await this.updateSkillUsageCount(context.userId, context.gameStateId, skillConfig.id, context.currentRound);

    return data;
  }

  /**
   * 获取当前活跃的技能
   */
  private static async getActiveSkills(gameStateId: string, currentRound: number): Promise<SkillConfig[]> {
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
        
        if (skill1.conflictsWith.includes(skill2.id) || skill2.conflictsWith.includes(skill1.id)) {
          conflicts.push(`${skill1.chineseName} vs ${skill2.chineseName}`);
        }
      }
    }

    return {
      hasConflicts: conflicts.length > 0,
      conflicts
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
    const currentUses = (roleState?.skill_uses_remaining as Record<string, any>) || {};
    const skillUses = currentUses[skillId] as { used?: number; remaining?: number } || { used: 0, remaining: 0 };
    
    // 更新回合使用记录
    const roundUses = (roleState as any)?.round_skill_uses || {};
    const currentRoundUses = roundUses[currentRound] || [];
    
    const updatedUses = {
      ...currentUses,
      [skillId]: {
        used: (skillUses.used || 0) + 1,
        remaining: Math.max(0, (skillUses.remaining || 0) - 1)
      }
    };

    const updatedRoundUses = {
      ...roundUses,
      [currentRound]: [...currentRoundUses, skillId]
    };

    // 保存更新
    const { error: updateError } = await supabase
      .from('role_states')
      .update({ 
        skill_uses_remaining: updatedUses,
        round_skill_uses: updatedRoundUses 
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
    phaseName: string
  ): Promise<{ conflicts: number; details: any }> {
    await this.validateUserAuth();

    logger.debug('开始检测技能冲突', { gameStateId, roundNumber, phaseName });

    // 调用增强的数据库冲突检测函数
    const { data, error } = await supabase.rpc('detect_skill_conflicts', {
      p_game_state_id: gameStateId,
      p_round_number: roundNumber,
      p_phase: phaseName
    });

    if (error) {
      logger.error('技能冲突检测失败', error);
      throw new EnhancedSkillServiceError(
        `冲突检测失败: ${error.message}`,
        error.code
      );
    }

    logger.debug('技能冲突检测完成', { result: data });
    return { 
      conflicts: (data as any)?.conflicts_detected || 0, 
      details: data 
    };
  }

  /**
   * 验证女巫药剂使用
   */
  public static async validateWitchPotion(
    userId: string,
    gameStateId: string,
    potionType: 'protection' | 'attack',
    targetUserId?: string
  ): Promise<{ canUse: boolean; reason?: string; nightDeaths?: any[] }> {
    await this.validateUserAuth();

    const { data, error } = await supabase.rpc('validate_witch_potion_usage', {
      p_user_id: userId,
      p_game_state_id: gameStateId,
      p_potion_type: potionType,
      p_target_user_id: targetUserId
    });

    if (error) {
      logger.error('女巫药剂验证失败', error);
      throw new EnhancedSkillServiceError(
        `药剂验证失败: ${error.message}`,
        error.code
      );
    }

    return {
      canUse: (data as any)?.can_use || false,
      reason: (data as any)?.reason,
      nightDeaths: (data as any)?.night_deaths
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
      p_trigger_reason: triggerReason
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
      p_game_state_id: gameStateId
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
  ): Promise<{ shouldEliminate: boolean; reason?: string; protectionCount?: number }> {
    const { data, error } = await supabase.rpc('check_multiple_protection', {
      p_target_user_id: targetUserId,
      p_game_state_id: gameStateId,
      p_round_number: roundNumber
    });

    if (error) {
      logger.error('多重保护检查失败', error);
      return { shouldEliminate: false };
    }

    return {
      shouldEliminate: (data as any)?.should_eliminate || false,
      reason: (data as any)?.reason,
      protectionCount: (data as any)?.protection_count
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
      p_phase: 'night' // 这里需要传入正确的阶段
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
  public static getSkillUsageSuggestion(context: SkillUsageContext): {
    canUse: boolean;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    timing: string;
  } {
    const validation = this.validateSkillUsage(context);
    const skillConfig = this.getRoleSkillConfig(context.roleDesign);
    
    if (!validation.isValid || !skillConfig) {
      return {
        canUse: false,
        suggestion: validation.reason || '技能不可用',
        priority: 'low',
        timing: '无法使用'
      };
    }

    // 根据技能类型提供使用建议
    const suggestions = {
      elimination: '建议选择关键目标，优先淘汰威胁最大的对手',
      protection: '建议保护重要角色，如预言家或确认的好人',
      investigation: '建议调查可疑目标，获取关键信息',
      status_change: '建议在适当时机使用，改变游戏局势',
      passive: '被动技能，系统将自动触发'
    };

    const timing = skillConfig.phase === 'night' ? '夜晚行动阶段' : 
                   skillConfig.phase === 'day' ? '白天讨论阶段' : '特定阶段';

    return {
      canUse: true,
      suggestion: suggestions[skillConfig.effectType[0] as keyof typeof suggestions] || '请合理使用技能',
      priority: skillConfig.priority <= 3 ? 'high' : skillConfig.priority <= 6 ? 'medium' : 'low',
      timing
    };
  }
}