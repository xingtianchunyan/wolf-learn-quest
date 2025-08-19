import { supabase } from '@/integrations/supabase/client';

export class SkillServiceError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'SkillServiceError';
    this.code = code;
  }
}

export class SkillService {
  static async requireAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new SkillServiceError('Authentication required');
    }
    return true;
  }

  static async useSkill(
    userId: string,
    gameStateId: string,
    skillName: string,
    targetUserId?: string,
    skillData?: Record<string, any>
  ): Promise<string> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('use_skill', {
        p_user_id: userId,
        p_game_state_id: gameStateId,
        p_skill_name: skillName,
        p_target_user_id: targetUserId || null,
        p_skill_data: skillData || {}
      });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async canUseSkill(roleStateId: string): Promise<boolean> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('can_use_skill', { p_role_state_id: roleStateId });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async processSkillEffects(gameStateId: string): Promise<number> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('process_skill_effects', { p_game_state_id: gameStateId });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }

  static async queueSkillEffect(
    skillUseId: string,
    effectType: string,
    effectData: Record<string, any>,
    priority: number = 100,
    conditions: Record<string, any> = {},
    triggerDelaySeconds: number = 0
  ): Promise<string> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('queue_skill_effect', {
        p_skill_use_id: skillUseId,
        p_effect_type: effectType,
        p_effect_data: effectData,
        p_priority: priority,
        p_conditions: conditions,
        p_trigger_delay_seconds: triggerDelaySeconds
      });

    if (error) {
      throw new SkillServiceError(error.message, error.code);
    }

    return data;
  }
}