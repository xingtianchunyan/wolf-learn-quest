/**
 * @deprecated 旧版技能服务，请使用 EnhancedSkillService 替代
 * 
 * 该服务将在未来版本中移除，建议迁移到增强版技能服务：
 * - 更完善的技能配置管理
 * - 统一的冲突处理逻辑
 * - 更好的类型安全和验证
 * - 改进的错误处理机制
 * 
 * 迁移指南：
 * 1. 替换 import：SkillService → EnhancedSkillService
 * 2. 更新方法调用：useSkill → useSkillEnhanced
 * 3. 适配新的参数结构和返回类型
 * 4. 使用新的配置化技能定义
 * 
 * @example
 * // 旧用法 (已废弃)
 * await SkillService.useSkill(userId, gameStateId, skillName);
 * 
 * // 新用法 (推荐)
 * await EnhancedSkillService.useSkillEnhanced(context);
 */

import { supabase } from '@/integrations/supabase/client';

export class SkillServiceError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'SkillServiceError';
    this.code = code;
  }
}

/**
 * @deprecated 请使用 EnhancedSkillService 替代
 */
export class SkillService {
  static async requireAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new SkillServiceError('Authentication required');
    }
    return true;
  }

  /**
   * @deprecated 请使用 EnhancedSkillService.useSkillEnhanced 替代
   */
  static async useSkill(
    userId: string,
    gameStateId: string,
    skillName: string,
    targetUserId?: string,
    skillData?: Record<string, any>
  ): Promise<string> {
    console.warn('SkillService.useSkill is deprecated. Please use EnhancedSkillService.useSkillEnhanced instead.');
    
    await this.requireAuth();
    
    // 调用修复后的 RPC 函数 - 移除 p_user_id 参数
    const { data, error } = await supabase.rpc('use_skill', {
      p_game_state_id: gameStateId,
      p_skill_name: skillName,
      p_target_user_id: targetUserId || undefined,
      p_skill_data: skillData || {}
    });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  /**
   * @deprecated 请使用 EnhancedSkillService.validateSkillUsage 替代
   */
  static async canUseSkill(roleStateId: string): Promise<boolean> {
    console.warn('SkillService.canUseSkill is deprecated. Please use EnhancedSkillService.validateSkillUsage instead.');
    
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('can_use_skill', {
        p_role_state_id: roleStateId
      });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async queueSkillEffect(
    skillUseId: string,
    effectType: string,
    effectData: any,
    priority?: number,
    conditions?: any,
    triggerDelaySeconds?: number
  ): Promise<string> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('queue_skill_effect', {
        p_skill_use_id: skillUseId,
        p_effect_type: effectType,
        p_effect_data: effectData,
        p_priority: priority || 100,
        p_conditions: conditions || {},
        p_trigger_delay_seconds: triggerDelaySeconds || 0
      });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async processSkillEffects(gameStateId: string): Promise<number> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('process_skill_effects', {
        p_game_state_id: gameStateId
      });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async cleanupExpiredEffects(): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .rpc('cleanup_expired_skill_effects');

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }
  }
}