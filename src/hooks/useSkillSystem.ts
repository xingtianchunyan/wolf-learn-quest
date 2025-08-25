/**
 * @deprecated 旧版技能系统，请使用 useEnhancedSkillSystem 替代
 * 
 * 该 hook 将在未来版本中移除，建议迁移到增强版技能系统：
 * - 更好的类型安全
 * - 统一的冲突处理机制  
 * - 配置化的技能定义
 * - 改进的错误处理
 * 
 * 迁移指南：
 * 1. 替换 import：useSkillSystem → useEnhancedSkillSystem
 * 2. 更新方法调用：useSkill → useSkillEnhanced
 * 3. 检查新的接口定义和参数结构
 * 
 * @example
 * // 旧用法 (已废弃)
 * const { useSkill } = useSkillSystem();
 * 
 * // 新用法 (推荐)
 * const { useSkillEnhanced } = useEnhancedSkillSystem();
 */

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
  effect_end_time?: string;
  is_active: boolean;
  stack_count: number;
  effect_start_time: string;
  created_at: string;
  updated_at: string;
}

/**
 * @deprecated 请使用 useEnhancedSkillSystem 替代
 */
export const useSkillSystem = (gameStateId: string, roomId: string) => {
  const [skillUses, setSkillUses] = useState<SkillUse[]>([]);
  const [skillEffectsQueue, setSkillEffectsQueue] = useState<SkillEffectsQueue[]>([]);
  const [skillTargets, setSkillTargets] = useState<SkillTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 获取技能使用记录
  const fetchSkillUses = useCallback(async () => {
    if (!gameStateId) return;
    
    try {
      const { data, error } = await supabase
        .from('skill_uses')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkillUses(data || []);
    } catch (error) {
      console.error('Error fetching skill uses:', error);
    }
  }, [gameStateId]);

  // 获取技能效果队列
  const fetchSkillEffectsQueue = useCallback(async () => {
    if (!gameStateId) return;
    
    try {
      const { data, error } = await supabase
        .from('skill_effects_queue')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('priority', { ascending: true });

      if (error) throw error;
      setSkillEffectsQueue(data || []);
    } catch (error) {
      console.error('Error fetching skill effects queue:', error);
    }
  }, [gameStateId]);

  // 获取技能目标 - 修复安全漏洞：必须过滤 game_state_id
  const fetchSkillTargets = useCallback(async () => {
    if (!gameStateId) return;
    
    try {
      const { data, error } = await supabase
        .from('standardized_skill_targets')
        .select(`
          *,
          skill_uses!inner(game_state_id)
        `)
        .eq('skill_uses.game_state_id', gameStateId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkillTargets(data || []);
    } catch (error) {
      console.error('Error fetching skill targets:', error);
    }
  }, [gameStateId]);

  // 初始化数据
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchSkillUses(),
        fetchSkillEffectsQueue(),
        fetchSkillTargets()
      ]);
    };

    initializeData();
  }, [fetchSkillUses, fetchSkillEffectsQueue, fetchSkillTargets]);

  // 监听技能使用变化
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`skill_uses_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setSkillUses(current => [payload.new as SkillUse, ...current]);
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setSkillUses(current =>
              current.map(use => use.id === payload.new!.id ? payload.new as SkillUse : use)
            );
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
    skillData?: any
  ): Promise<string | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) {
      toast({
        title: "错误",
        description: "请先登录",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      const skillUseId = await SkillService.useSkill(
        user.id,
        gameStateId,
        skillName,
        targetUserId,
        skillData
      );

      toast({
        title: "技能使用成功",
        description: `已使用技能：${skillName}`,
      });

      return skillUseId;
    } catch (error: any) {
      console.error('Error using skill:', error);
      toast({
        title: "技能使用失败",
        description: error.message || "请重试",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, toast]);

  // 队列技能效果
  const queueSkillEffect = useCallback(async (
    skillUseId: string,
    effectType: string,
    effectData: any,
    priority?: number,
    conditions?: any,
    triggerDelaySeconds?: number
  ): Promise<string | null> => {
    setLoading(true);
    try {
      const effectId = await SkillService.queueSkillEffect(
        skillUseId,
        effectType,
        effectData,
        priority,
        conditions,
        triggerDelaySeconds
      );

      return effectId;
    } catch (error: any) {
      console.error('Error queueing skill effect:', error);
      toast({
        title: "技能效果队列失败",
        description: error.message || "请重试",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 处理技能效果
  const processSkillEffects = useCallback(async (gameStateId: string): Promise<number> => {
    setLoading(true);
    try {
      const processed = await SkillService.processSkillEffects(gameStateId);
      
      toast({
        title: "技能效果处理完成",
        description: `处理了 ${processed} 个效果`,
      });

      return processed;
    } catch (error: any) {
      console.error('Error processing skill effects:', error);
      toast({
        title: "技能效果处理失败",
        description: error.message || "请重试",
        variant: "destructive",
      });
      return 0;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 清理过期效果
  const cleanupExpiredEffects = useCallback(async (): Promise<void> => {
    try {
      await SkillService.cleanupExpiredEffects();
      await fetchSkillTargets(); // 刷新目标列表
    } catch (error: any) {
      console.error('Error cleaning up expired effects:', error);
      toast({
        title: "清理过期效果失败",
        description: error.message || "请重试",
        variant: "destructive",
      });
    }
  }, [fetchSkillTargets, toast]);

  // 获取用户的技能使用记录
  const getUserSkillUses = useCallback((targetUserId: string): SkillUse[] => {
    return skillUses.filter(use => 
      use.user_id === targetUserId || use.target_user_id === targetUserId
    );
  }, [skillUses]);

  // 获取用户的技能效果
  const getUserSkillEffects = useCallback((targetUserId: string): SkillTarget[] => {
    return skillTargets.filter(target => target.target_user_id === targetUserId);
  }, [skillTargets]);

  // 检查是否有活跃效果 - 修复字段不一致问题：统一使用 effect_type
  const hasActiveEffect = useCallback((targetUserId: string, effectType: string): boolean => {
    return skillTargets.some(target => 
      target.target_user_id === targetUserId && 
      target.is_active &&
      (target.effect_applied?.effect_type === effectType || target.effect_applied?.type === effectType)
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
    hasActiveEffect
  };
};