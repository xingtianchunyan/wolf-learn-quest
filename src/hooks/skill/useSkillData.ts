// 技能数据获取和管理
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';
import { getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
import { standardizeSkillTargets } from '@/utils/skillEffectStandardization';

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
  skill_effects: Record<string, unknown> | null;
  conditions_met: Record<string, unknown> | null;
  result?: Record<string, unknown> | null;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
  chinese_name?: string;
  skill_config?: Record<string, unknown> | null;
}

export interface SkillEffectQueueItem {
  id: string;
  skill_use_id: string;
  status: string;
  [key: string]: unknown;
}

export interface SkillTarget {
  id: string;
  skill_use_id: string;
  is_active: boolean;
  [key: string]: unknown;
}

const logger = createLogger('skill-data');

export const useSkillData = (gameStateId?: string) => {
  const [skillUses, setSkillUses] = useState<EnhancedSkillUse[]>([]);
  const [skillEffectsQueue, setSkillEffectsQueue] = useState<
    SkillEffectQueueItem[]
  >([]);
  const [skillTargets, setSkillTargets] = useState<SkillTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const { toast } = useToast();
  const { t } = useLanguage();

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
          .select(
            `
            *,
            skill_uses!inner(game_state_id)
          `
          )
          .eq('skill_uses.game_state_id', gameStateId)
          .order('created_at', { ascending: false }),
      ]);

      // 处理技能使用数据，添加中文名称和配置信息
      if (skillUsesResult.data) {
        const enhancedSkillUses = skillUsesResult.data.map(use => {
          const config = getSkillConfigByEnglish(use.skill_name);
          return {
            ...use,
            chinese_name: config?.chineseName || use.skill_name,
            skill_config: config,
          } as EnhancedSkillUse;
        });
        setSkillUses(enhancedSkillUses);
      }

      if (queueResult.data) {
        setSkillEffectsQueue(queueResult.data);
      }

      if (targetsResult.data) {
        const standardizedTargets = standardizeSkillTargets(targetsResult.data);
        setSkillTargets(standardizedTargets);
      }

      setLastSyncTime(new Date());
    } catch (error) {
      logger.error('Failed to load skill data', error);
      toast({
        title: t('hook.skill_data.load_failed_title'),
        description: t('hook.skill_data.load_failed_desc'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [gameStateId, toast, t]);

  // 初始数据加载
  useEffect(() => {
    fetchAllSkillData();
  }, [fetchAllSkillData]);

  return {
    skillUses,
    setSkillUses,
    skillEffectsQueue,
    setSkillEffectsQueue,
    skillTargets,
    setSkillTargets,
    loading,
    lastSyncTime,
    fetchAllSkillData,
  };
};
