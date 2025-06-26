
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  const [skillUses, setSkillUses] = useState<SkillUse[]>([]);
  const [skillEffectsQueue, setSkillEffectsQueue] = useState<SkillEffectsQueue[]>([]);
  const [skillTargets, setSkillTargets] = useState<SkillTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 获取技能使用记录
  const fetchSkillUses = useCallback(async () => {
    if (!gameStateId) return;

    const { data, error } = await supabase
      .from('skill_uses')
      .select('*')
      .eq('game_state_id', gameStateId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取技能使用记录失败:', error);
      return;
    }

    setSkillUses((data || []) as SkillUse[]);
  }, [gameStateId]);

  // 获取技能效果队列
  const fetchSkillEffectsQueue = useCallback(async () => {
    if (!gameStateId) return;

    const { data, error } = await supabase
      .from('skill_effects_queue')
      .select('*')
      .eq('game_state_id', gameStateId)
      .order('priority', { ascending: true });

    if (error) {
      console.error('获取技能效果队列失败:', error);
      return;
    }

    setSkillEffectsQueue((data || []) as SkillEffectsQueue[]);
  }, [gameStateId]);

  // 获取技能目标记录
  const fetchSkillTargets = useCallback(async () => {
    if (!gameStateId) return;

    const { data, error } = await supabase
      .from('skill_targets')
      .select(`
        *,
        skill_uses!inner(game_state_id)
      `)
      .eq('skill_uses.game_state_id', gameStateId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取技能目标记录失败:', error);
      return;
    }

    setSkillTargets((data || []) as SkillTarget[]);
  }, [gameStateId]);

  // 使用技能
  const useSkill = useCallback(async (
    skillName: string,
    targetUserId?: string,
    skillData: any = {}
  ) => {
    if (!gameStateId || !userId) {
      toast({
        title: '技能使用失败',
        description: '缺少必要的游戏信息',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('use_skill', {
        p_user_id: userId,
        p_game_state_id: gameStateId,
        p_skill_name: skillName,
        p_target_user_id: targetUserId,
        p_skill_data: skillData
      });

      if (error) throw error;

      toast({
        title: '技能使用成功',
        description: `${skillName} 技能已使用`,
      });

      // 刷新技能使用记录
      await fetchSkillUses();
      return data;
    } catch (error: any) {
      console.error('技能使用失败:', error);
      toast({
        title: '技能使用失败',
        description: error.message || '请检查技能使用条件',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, userId, toast, fetchSkillUses]);

  // 队列技能效果
  const queueSkillEffect = useCallback(async (
    skillUseId: string,
    effectType: string,
    effectData: any,
    priority: number = 100,
    conditions: any = {},
    triggerDelaySeconds: number = 0
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('queue_skill_effect', {
        p_skill_use_id: skillUseId,
        p_effect_type: effectType,
        p_effect_data: effectData,
        p_priority: priority,
        p_conditions: conditions,
        p_trigger_delay_seconds: triggerDelaySeconds
      });

      if (error) throw error;

      // 刷新效果队列
      await fetchSkillEffectsQueue();
      return data;
    } catch (error: any) {
      console.error('队列技能效果失败:', error);
      toast({
        title: '技能效果队列失败',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast, fetchSkillEffectsQueue]);

  // 处理技能效果
  const processSkillEffects = useCallback(async () => {
    if (!gameStateId) return 0;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('process_skill_effects', {
        p_game_state_id: gameStateId
      });

      if (error) throw error;

      // 刷新相关数据
      await Promise.all([
        fetchSkillEffectsQueue(),
        fetchSkillTargets(),
        fetchSkillUses()
      ]);

      if (data > 0) {
        toast({
          title: '技能效果处理完成',
          description: `处理了 ${data} 个技能效果`,
        });
      }

      return data;
    } catch (error: any) {
      console.error('处理技能效果失败:', error);
      toast({
        title: '技能效果处理失败',
        description: error.message,
        variant: 'destructive',
      });
      return 0;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, toast, fetchSkillEffectsQueue, fetchSkillTargets, fetchSkillUses]);

  // 清理过期效果
  const cleanupExpiredEffects = useCallback(async () => {
    try {
      const { error } = await supabase.rpc('cleanup_expired_skill_effects');

      if (error) throw error;

      // 刷新数据
      await Promise.all([
        fetchSkillEffectsQueue(),
        fetchSkillTargets()
      ]);
    } catch (error: any) {
      console.error('清理过期效果失败:', error);
    }
  }, [fetchSkillEffectsQueue, fetchSkillTargets]);

  // 获取用户的技能使用记录
  const getUserSkillUses = useCallback((targetUserId: string): SkillUse[] => {
    return skillUses.filter(skill => skill.user_id === targetUserId);
  }, [skillUses]);

  // 获取用户当前的技能效果
  const getUserSkillEffects = useCallback((targetUserId: string): SkillTarget[] => {
    return skillTargets.filter(target => 
      target.target_user_id === targetUserId && target.is_active
    );
  }, [skillTargets]);

  // 检查用户是否有特定效果
  const hasActiveEffect = useCallback((targetUserId: string, effectType: string): boolean => {
    return skillTargets.some(target => 
      target.target_user_id === targetUserId && 
      target.is_active && 
      target.target_type === effectType
    );
  }, [skillTargets]);

  // 实时监听技能使用变化
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`skill-system-${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`
        },
        () => fetchSkillUses()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_effects_queue',
          filter: `game_state_id=eq.${gameStateId}`
        },
        () => fetchSkillEffectsQueue()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_targets'
        },
        () => fetchSkillTargets()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId, fetchSkillUses, fetchSkillEffectsQueue, fetchSkillTargets]);

  // 初始化数据
  useEffect(() => {
    if (gameStateId) {
      Promise.all([
        fetchSkillUses(),
        fetchSkillEffectsQueue(),
        fetchSkillTargets()
      ]);
    }
  }, [gameStateId, fetchSkillUses, fetchSkillEffectsQueue, fetchSkillTargets]);

  // 定期清理过期效果
  useEffect(() => {
    const interval = setInterval(() => {
      cleanupExpiredEffects();
    }, 30000); // 每30秒清理一次

    return () => clearInterval(interval);
  }, [cleanupExpiredEffects]);

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
