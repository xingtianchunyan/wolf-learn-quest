
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SkillService } from '@/services/skillService';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

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
  useEffect(() => {
    if (!gameStateId) return;

    const fetchSkillUses = async () => {
      const { data, error } = await supabase
        .from('skill_uses')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching skill uses:', error);
      } else if (data) {
        setSkillUses(data as SkillUse[]);
      }
    };

    fetchSkillUses();
  }, [gameStateId]);

  // 获取技能效果队列
  useEffect(() => {
    if (!roomId || !gameStateId) return;

    const fetchSkillEffectsQueue = async () => {
      const { data, error } = await supabase
        .from('skill_effects_queue')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('priority', { ascending: true })
        .order('execution_order', { ascending: true });

      if (error) {
        console.error('Error fetching skill effects queue:', error);
      } else if (data) {
        setSkillEffectsQueue(data as SkillEffectsQueue[]);
      }
    };

    fetchSkillEffectsQueue();
  }, [roomId, gameStateId]);

  // 获取技能目标
  useEffect(() => {
    if (!gameStateId) return;

    const fetchSkillTargets = async () => {
      const { data, error } = await supabase
        .from('skill_targets')
        .select(`
          *,
          skill_uses!inner(game_state_id)
        `)
        .eq('skill_uses.game_state_id', gameStateId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching skill targets:', error);
      } else if (data) {
        setSkillTargets(data as SkillTarget[]);
      }
    };

    fetchSkillTargets();
  }, [gameStateId]);

  // 实时订阅技能使用变化
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`skill_uses_${gameStateId}`)
      .on<SkillUse>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        (payload: RealtimePostgresChangesPayload<SkillUse>) => {
          if (payload.new && typeof payload.new === 'object') {
            const newSkillUse = payload.new as SkillUse;
            if (payload.eventType === 'INSERT') {
              setSkillUses(current => [newSkillUse, ...current]);
            } else if (payload.eventType === 'UPDATE') {
              setSkillUses(current =>
                current.map(su => su.id === newSkillUse.id ? newSkillUse : su)
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId]);

  // 使用技能
  const useSkill = useCallback(async (
    skillName: string,
    targetUserId?: string,
    skillData: any = {}
  ) => {
    if (!gameStateId || !userId) {
      toast({
        title: '使用技能失败',
        description: '缺少必要的游戏状态或用户信息',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);
    try {
      const data = await SkillService.useSkill(
        userId,
        gameStateId,
        skillName,
        targetUserId,
        skillData
      );

      toast({
        title: '技能使用成功',
        description: `成功使用技能: ${skillName}`,
      });

      return data;
    } catch (error) {
      console.error('Error using skill:', error);
      toast({
        title: '使用技能失败',
        description: '系统错误，请重试',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, userId, toast]);

  // 队列技能效果
  const queueSkillEffect = useCallback(async (
    skillUseId: string,
    effectType: string,
    effectData: any,
    priority: number = 100,
    conditions: any = {},
    triggerDelaySeconds: number = 0
  ) => {
    try {
      const data = await SkillService.queueSkillEffect(
        skillUseId,
        effectType,
        effectData,
        priority,
        conditions,
        triggerDelaySeconds
      );

      return data;
    } catch (error) {
      console.error('Error queuing skill effect:', error);
      return null;
    }
  }, []);

  // 处理技能效果
  const processSkillEffects = useCallback(async () => {
    if (!gameStateId) return 0;

    try {
      const data = await SkillService.processSkillEffects(gameStateId);
      return data;
    } catch (error) {
      console.error('Error processing skill effects:', error);
      return 0;
    }
  }, [gameStateId]);

  // 清理过期效果
  const cleanupExpiredEffects = useCallback(async () => {
    try {
      const { error } = await supabase.rpc('cleanup_expired_skill_effects');
      if (error) {
        console.error('Error cleaning up expired effects:', error);
      }
    } catch (error) {
      console.error('Error cleaning up expired effects:', error);
    }
  }, []);

  // 获取用户技能使用记录
  const getUserSkillUses = useCallback((targetUserId: string): SkillUse[] => {
    return skillUses.filter(su => su.user_id === targetUserId || su.target_user_id === targetUserId);
  }, [skillUses]);

  // 获取用户技能效果
  const getUserSkillEffects = useCallback((targetUserId: string): SkillTarget[] => {
    return skillTargets.filter(st => st.target_user_id === targetUserId && st.is_active);
  }, [skillTargets]);

  // 检查是否有活跃效果
  const hasActiveEffect = useCallback((targetUserId: string, effectType: string): boolean => {
    return skillTargets.some(st => 
      st.target_user_id === targetUserId && 
      st.is_active && 
      st.effect_applied?.effect_type === effectType
    );
  }, [skillTargets]);

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
