// 增强的技能系统Hook - 统一状态管理和性能优化
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedSkillService, type SkillUsageContext } from '@/services/enhancedSkillService';
import { SKILL_MAPPING_CONFIG, getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
import { matchesEffectType, standardizeSkillTargets } from '@/utils/skillEffectStandardization';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// 扩展原有接口
export interface EnhancedSkillUse {
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
  // 增强字段
  chinese_name?: string;
  skill_config?: any;
}

export interface SkillSystemStats {
  totalUses: number;
  activeEffects: number;
  queuedEffects: number;
  completedEffects: number;
  conflictCount: number;
  userSkillCount: number;
}

export interface SkillSuggestion {
  canUse: boolean;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  timing: string;
  conflicts?: string[];
}

export const useEnhancedSkillSystem = (
  roomId: string, 
  gameStateId?: string, 
  userId?: string
) => {
  // 状态管理
  const [skillUses, setSkillUses] = useState<EnhancedSkillUse[]>([]);
  const [skillEffectsQueue, setSkillEffectsQueue] = useState<any[]>([]);
  const [skillTargets, setSkillTargets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  
  const { toast } = useToast();

  // 计算统计数据
  const stats = useMemo((): SkillSystemStats => {
    return {
      totalUses: skillUses.length,
      activeEffects: skillTargets.filter(t => t.is_active).length,
      queuedEffects: skillEffectsQueue.filter(e => e.status === 'queued').length,
      completedEffects: skillEffectsQueue.filter(e => e.status === 'completed').length,
      conflictCount: skillUses.filter(s => s.execution_status === 'cancelled').length,
      userSkillCount: userId ? skillUses.filter(s => s.user_id === userId).length : 0
    };
  }, [skillUses, skillTargets, skillEffectsQueue, userId]);

  // 统一数据获取函数
  const fetchAllSkillData = useCallback(async () => {
    if (!gameStateId) return;

    setLoading(true);
    try {
      // 并行获取所有技能相关数据
      const [skillUsesResult, queueResult, targetsResult] = await Promise.all([
        supabase
          .from('skill_uses')
          .select('*')
          .eq('game_state_id', gameStateId)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('skill_effects_queue')
          .select('*')
          .eq('game_state_id', gameStateId)
          .order('priority', { ascending: true })
          .order('execution_order', { ascending: true }),
        
        supabase
          .from('standardized_skill_targets')
          .select(`
            *,
            skill_uses!inner(game_state_id)
          `)
          .eq('skill_uses.game_state_id', gameStateId)
          .order('created_at', { ascending: false })
      ]);

      // 处理技能使用数据，添加中文名称和配置信息
      if (skillUsesResult.data) {
        const enhancedSkillUses = skillUsesResult.data.map(use => {
          const config = getSkillConfigByEnglish(use.skill_name);
          return {
            ...use,
            chinese_name: config?.chineseName || use.skill_name,
            skill_config: config
          } as EnhancedSkillUse;
        });
        setSkillUses(enhancedSkillUses);
      }

      if (queueResult.data) {
        setSkillEffectsQueue(queueResult.data);
      }

      if (targetsResult.data) {
        // 标准化技能目标数据结构
        const standardizedTargets = standardizeSkillTargets(targetsResult.data);
        setSkillTargets(standardizedTargets);
      }

      setLastSyncTime(new Date());
    } catch (error) {
      console.error('获取技能数据失败:', error);
      toast({
        title: '数据加载失败',
        description: '无法获取技能系统数据，请刷新页面重试',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [gameStateId, toast]);

  // 初始数据加载
  useEffect(() => {
    fetchAllSkillData();
  }, [fetchAllSkillData]);

  // 优化的实时订阅 - 只订阅必要的表
  useEffect(() => {
    if (!gameStateId) return;

    const skillUsesChannel = supabase
      .channel(`enhanced_skill_uses_${gameStateId}`)
      .on<EnhancedSkillUse>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        (payload: RealtimePostgresChangesPayload<EnhancedSkillUse>) => {
          if (payload.new && typeof payload.new === 'object') {
            const newSkillUse = payload.new as EnhancedSkillUse;
            const config = getSkillConfigByEnglish(newSkillUse.skill_name);
            const enhancedUse = {
              ...newSkillUse,
              chinese_name: config?.chineseName || newSkillUse.skill_name,
              skill_config: config
            };

            if (payload.eventType === 'INSERT') {
              setSkillUses(current => [enhancedUse, ...current]);
            } else if (payload.eventType === 'UPDATE') {
              setSkillUses(current =>
                current.map(su => su.id === enhancedUse.id ? enhancedUse : su)
              );
            } else if (payload.eventType === 'DELETE' && payload.old) {
              setSkillUses(current =>
                current.filter(su => su.id !== (payload.old as EnhancedSkillUse).id)
              );
            }
          }
        }
      )
      .subscribe();

    // 订阅技能效果队列变化
    const queueChannel = supabase
      .channel(`skill_queue_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_effects_queue',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        () => {
          // 技能效果队列变化时重新获取数据
          fetchAllSkillData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(skillUsesChannel);
      supabase.removeChannel(queueChannel);
    };
  }, [gameStateId, fetchAllSkillData]);

  // 增强的技能使用函数
  const useSkillEnhanced = useCallback(async (
    skillName: string,
    targetUserId?: string,
    additionalData: Record<string, any> = {},
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    currentRound?: number
  ) => {
    if (!gameStateId || !userId) {
      toast({
        title: '技能使用失败',
        description: '缺少必要的游戏状态或用户信息',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);
    try {
      const context: SkillUsageContext = {
        userId,
        gameStateId,
        roomId,
        currentPhase: currentPhase || 1,
        currentRound: currentRound || 1,
        roleState,
        roleDesign,
        targetUserId,
        additionalData
      };

      const result = await EnhancedSkillService.useSkillEnhanced(context);

      toast({
        title: '技能使用成功',
        description: `成功使用技能: ${skillName}`,
      });

      // 移除 setTimeout 刷新，依赖实时订阅更新
      // setTimeout(() => fetchAllSkillData(), 500);

      return result;
    } catch (error: any) {
      console.error('技能使用失败:', error);
      toast({
        title: '技能使用失败',
        description: error.message || '系统错误，请重试',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, userId, roomId, toast, fetchAllSkillData]);

  // 获取技能使用建议
  const getSkillSuggestion = useCallback((
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    currentRound?: number,
    targetUserId?: string
  ): SkillSuggestion => {
    if (!gameStateId || !userId) {
      return {
        canUse: false,
        suggestion: '缺少游戏状态信息',
        priority: 'low',
        timing: '无法获取'
      };
    }

    const context: SkillUsageContext = {
      userId,
      gameStateId,
      roomId,
      currentPhase: currentPhase || 1,
      currentRound: currentRound || 1,
      roleState,
      roleDesign,
      targetUserId
    };

    return EnhancedSkillService.getSkillUsageSuggestion(context);
  }, [gameStateId, userId, roomId]);

  // 解决技能冲突
  const resolveSkillConflicts = useCallback(async (roundNumber: number) => {
    if (!gameStateId) return { resolved: 0, cancelled: 0 };

    try {
      const result = await EnhancedSkillService.resolveSkillConflictsInRound(
        gameStateId, 
        roundNumber
      );

      toast({
        title: '技能冲突解决完成',
        description: `解决了 ${result.resolved} 个技能，取消了 ${result.cancelled} 个冲突技能`,
      });

      // 刷新数据
      await fetchAllSkillData();

      return result;
    } catch (error) {
      console.error('解决技能冲突失败:', error);
      toast({
        title: '冲突解决失败',
        description: '无法解决技能冲突，请联系管理员',
        variant: 'destructive',
      });
      return { resolved: 0, cancelled: 0 };
    }
  }, [gameStateId, toast, fetchAllSkillData]);

  // 获取用户相关的技能数据
  const getUserSkillData = useCallback((targetUserId?: string) => {
    const queryUserId = targetUserId || userId;
    if (!queryUserId) return { uses: [], effects: [], targets: [] };

    return {
      uses: skillUses.filter(su => su.user_id === queryUserId || su.target_user_id === queryUserId),
      effects: skillEffectsQueue.filter(eq => {
        const relatedUse = skillUses.find(su => su.id === eq.skill_use_id);
        return relatedUse && (relatedUse.user_id === queryUserId || relatedUse.target_user_id === queryUserId);
      }),
      targets: skillTargets.filter(st => st.target_user_id === queryUserId && st.is_active)
    };
  }, [userId, skillUses, skillEffectsQueue, skillTargets]);

  // 检查技能可用性
  /**
   * 检查技能在当前上下文是否可用
   *
   * 参数说明:
   * - skillName: 技能英文名，用于兼容性描述（当前实现主要依赖 roleDesign 中的配置）
   * - roleState: 当前用户的角色状态（含 role_status 等）
   * - roleDesign: 当前用户的角色设计（含技能配置）
   * - currentPhase: 当前的阶段编号（1=day, 2=evening, 3=night, 4=dawn）
   * - targetUserId: 可选，若技能为单体目标类型，需要传入被选中的目标用户ID以通过校验
   * - currentRound: 可选，当前轮次，缺省为 1
   */
  const canUseSkill = useCallback((
    skillName: string,
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    targetUserId?: string,
    currentRound?: number
  ): boolean => {
    if (!gameStateId || !userId) return false;

    const context: SkillUsageContext = {
      userId,
      gameStateId,
      roomId,
      currentPhase: currentPhase || 1,
      currentRound: currentRound || 1,
      roleState,
      roleDesign,
      // 关键：将目标一并传入，以便单体技能在选择目标后通过校验
      targetUserId
    };

    const validation = EnhancedSkillService.validateSkillUsage(context);
    return validation.isValid;
  }, [gameStateId, userId, roomId]);

  return {
    // 数据状态
    skillUses,
    skillEffectsQueue,
    skillTargets,
    loading,
    stats,
    lastSyncTime,

    // 核心功能
    useSkillEnhanced,
    resolveSkillConflicts,
    fetchAllSkillData,

    // 辅助功能
    getSkillSuggestion,
    getUserSkillData,
    canUseSkill,

    // 兼容性 - 保持原有接口
    useSkill: useSkillEnhanced,
    getUserSkillUses: (targetUserId: string) => getUserSkillData(targetUserId).uses,
    getUserSkillEffects: (targetUserId: string) => getUserSkillData(targetUserId).targets,
    hasActiveEffect: (targetUserId: string, effectType: string) => {
      const targets = getUserSkillData(targetUserId).targets;
      return targets.some(t => matchesEffectType(t.effect_applied, effectType));
    }
  };
};