
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SkillUse {
  id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  target_user_id?: string;
  round_number: number;
  phase: string;
  skill_priority: number;
  execution_status: string;
  skill_effects: any;
  conditions_met: any;
  result?: any;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface SkillEffectsQueue {
  id: string;
  skill_use_id: string;
  game_state_id: string;
  room_id: string;
  effect_type: string;
  effect_data: any;
  priority: number;
  execution_order: number;
  status: string;
  conditions?: any;
  trigger_time?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  processed_at?: string;
}

export interface SkillTarget {
  id: string;
  skill_use_id: string;
  skill_effects_queue_id?: string;
  target_user_id?: string;
  target_type: string;
  effect_applied: any;
  effect_duration?: number;
  effect_start_time: string;
  effect_end_time?: string;
  is_active: boolean;
  stack_count: number;
  created_at: string;
  updated_at: string;
}

export const useSkillSystem = (roomId: string, gameStateId?: string, userId?: string) => {
  const [skillUses] = useState<SkillUse[]>([]);
  const [skillEffectsQueue] = useState<SkillEffectsQueue[]>([]);
  const [skillTargets] = useState<SkillTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock implementations - these tables don't exist in the current schema
  const useSkill = useCallback(async (
    skillName: string,
    targetUserId?: string,
    skillData: any = {}
  ) => {
    setLoading(true);
    toast({
      title: '技能系统暂未启用',
      description: '技能功能正在开发中',
      variant: 'destructive',
    });
    setLoading(false);
    return null;
  }, [toast]);

  const queueSkillEffect = useCallback(async () => {
    return null;
  }, []);

  const processSkillEffects = useCallback(async () => {
    return 0;
  }, []);

  const cleanupExpiredEffects = useCallback(async () => {
    // Mock implementation
  }, []);

  const getUserSkillUses = useCallback((targetUserId: string): SkillUse[] => {
    return [];
  }, []);

  const getUserSkillEffects = useCallback((targetUserId: string): SkillTarget[] => {
    return [];
  }, []);

  const hasActiveEffect = useCallback((targetUserId: string, effectType: string): boolean => {
    return false;
  }, []);

  return {
    skillUses,
    skillEffectsQueue,
    skillTargets,
    loading,
    useSkill,
    queueSkillEffect,
    processSkillEffects,
    cleanupExpiredEffects,
    getUserSkillUses,
    getUserSkillEffects,
    hasActiveEffect,
  };
};
