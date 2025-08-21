// 增强的技能服务 - 实现完整的技能逻辑和安全验证
import { supabase } from '@/integrations/supabase/client';
import { 
  SKILL_MAPPING_CONFIG, 
  getSkillConfigByChinese,
  getSkillConfigByEnglish,
  resolveSkillConflicts,
  type SkillConfig 
} from '@/utils/skillMappingConfig';

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
    if (!roleDesign?.skill_name) return null;
    
    // 尝试通过英文名匹配
    let skillConfig = getSkillConfigByEnglish(roleDesign.skill_name);
    
    // 如果没找到，尝试通过中文名匹配
    if (!skillConfig && roleDesign.skill_description) {
      skillConfig = getSkillConfigByChinese(roleDesign.skill_description);
    }
    
    return skillConfig;
  }

  /**
   * 验证技能使用条件
   */
  public static validateSkillUsage(context: SkillUsageContext): SkillValidationResult {
    const { roleState, roleDesign, currentPhase, targetUserId } = context;
    
    // 获取技能配置
    const skillConfig = this.getRoleSkillConfig(roleDesign);
    if (!skillConfig) {
      return {
        isValid: false,
        reason: '未找到技能配置',
        suggestedAction: '请检查角色设计配置'
      };
    }

    // 验证角色状态
    const currentStatus = this.getStatusName(roleState?.role_status || 1);
    if (!skillConfig.requiredStatus.includes(currentStatus as any)) {
      return {
        isValid: false,
        reason: `当前状态 "${currentStatus}" 不满足技能使用要求`,
        suggestedAction: `需要状态：${skillConfig.requiredStatus.join(' 或 ')}`
      };
    }

    // 验证使用阶段
    const currentPhaseName = this.PHASE_NAMES[currentPhase - 1] || 'day';
    if (skillConfig.phase !== currentPhaseName) {
      return {
        isValid: false,
        reason: `当前阶段 "${currentPhaseName}" 不是技能使用阶段`,
        suggestedAction: `需要在 "${skillConfig.phase}" 阶段使用`
      };
    }

    // 验证目标选择
    if (skillConfig.targetType === 'single' && !targetUserId) {
      return {
        isValid: false,
        reason: '该技能需要选择目标',
        suggestedAction: '请先选择一个目标玩家'
      };
    }

    if (skillConfig.targetType === 'none' && targetUserId) {
      return {
        isValid: false,
        reason: '该技能不需要选择目标',
        suggestedAction: '取消目标选择'
      };
    }

    // 验证使用次数
    if (skillConfig.usageLimit !== 'unlimited') {
      const usedCount = this.getSkillUsedCount(roleState, skillConfig.id);
      if (usedCount >= skillConfig.usageLimit) {
        return {
          isValid: false,
          reason: `技能使用次数已达上限 (${skillConfig.usageLimit})`,
          suggestedAction: '该技能在本局游戏中不能再次使用'
        };
      }
    }

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
      console.warn('技能冲突检测到:', conflictCheck.conflicts);
    }

    // 调用原始技能使用函数
    const { data, error } = await supabase.rpc('use_skill', {
      p_user_id: context.userId,
      p_game_state_id: context.gameStateId,
      p_skill_name: skillConfig.englishName,
      p_target_user_id: context.targetUserId || null,
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
    await this.updateSkillUsageCount(context.userId, context.gameStateId, skillConfig.id);

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
      console.error('获取活跃技能失败:', error);
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
    skillId: string
  ): Promise<void> {
    // 获取当前角色状态
    const { data: roleState, error: fetchError } = await supabase
      .from('role_states')
      .select('skill_uses_remaining')
      .eq('user_id', userId)
      .eq('game_state_id', gameStateId)
      .single();

    if (fetchError) {
      console.error('获取角色状态失败:', fetchError);
      return;
    }

    // 更新使用次数
    const currentUses = (roleState?.skill_uses_remaining as Record<string, any>) || {};
    const skillUses = currentUses[skillId] as { used?: number; remaining?: number } || { used: 0, remaining: 0 };
    
    const updatedUses = {
      ...currentUses,
      [skillId]: {
        used: (skillUses.used || 0) + 1,
        remaining: Math.max(0, (skillUses.remaining || 0) - 1)
      }
    };

    // 保存更新
    const { error: updateError } = await supabase
      .from('role_states')
      .update({ skill_uses_remaining: updatedUses })
      .eq('user_id', userId)
      .eq('game_state_id', gameStateId);

    if (updateError) {
      console.error('更新技能使用次数失败:', updateError);
    }
  }

  /**
   * 处理技能效果冲突解决 - 统一在数据库层处理
   * @deprecated 冲突处理现在统一在数据库层进行，前端只负责触发检测
   */
  public static async resolveSkillConflictsInRound(
    gameStateId: string, 
    roundNumber: number
  ): Promise<{ resolved: number; cancelled: number }> {
    console.warn('前端冲突处理已废弃，请使用数据库 detect_skill_conflicts 函数');
    
    await this.validateUserAuth();

    // 调用数据库函数统一处理冲突
    const { data, error } = await supabase.rpc('detect_skill_conflicts', {
      p_game_state_id: gameStateId,
      p_round_number: roundNumber,
      p_phase: 'night' // 这里需要传入正确的阶段
    });

    if (error) {
      console.error('调用冲突检测函数失败:', error);
      return { resolved: 0, cancelled: 0 };
    }

    // 返回处理结果（具体格式依赖数据库函数的实现）
    return { resolved: data ? 1 : 0, cancelled: 0 };
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