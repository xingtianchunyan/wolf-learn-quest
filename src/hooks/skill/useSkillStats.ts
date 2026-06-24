// 技能系统统计和数据分析
import { useMemo, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';
import { EnhancedSkillService } from '@/services/enhancedSkillService';
import { matchesEffectType } from '@/utils/skillEffectStandardization';
import {
  EnhancedSkillUse,
  SkillEffectQueueItem,
  SkillTarget,
} from './useSkillData';

export interface SkillSystemStats {
  totalUses: number;
  activeEffects: number;
  queuedEffects: number;
  completedEffects: number;
  conflictCount: number;
  userSkillCount: number;
}

const logger = createLogger('skill-stats');

export const useSkillStats = (
  skillUses: EnhancedSkillUse[],
  skillTargets: SkillTarget[],
  skillEffectsQueue: SkillEffectQueueItem[],
  userId?: string,
  gameStateId?: string
) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // 计算统计数据
  const stats = useMemo((): SkillSystemStats => {
    return {
      totalUses: skillUses.length,
      activeEffects: skillTargets.filter(t => t.is_active).length,
      queuedEffects: skillEffectsQueue.filter(e => e.status === 'queued')
        .length,
      completedEffects: skillEffectsQueue.filter(e => e.status === 'completed')
        .length,
      conflictCount: skillUses.filter(s => s.execution_status === 'cancelled')
        .length,
      userSkillCount: userId
        ? skillUses.filter(s => s.user_id === userId).length
        : 0,
    };
  }, [skillUses, skillTargets, skillEffectsQueue, userId]);

  // 获取用户相关的技能数据
  const getUserSkillData = useCallback(
    (targetUserId?: string) => {
      const queryUserId = targetUserId || userId;
      if (!queryUserId) return { uses: [], effects: [], targets: [] };

      return {
        // 只显示用户自己使用的技能记录，不显示其他玩家对自己使用技能的记录
        uses: skillUses.filter(su => su.user_id === queryUserId),
        // 效果队列也只显示自己使用技能产生的效果
        effects: skillEffectsQueue.filter(eq => {
          const relatedUse = skillUses.find(su => su.id === eq.skill_use_id);
          return relatedUse && relatedUse.user_id === queryUserId;
        }),
        // 目标效果仍然显示对自己生效的效果（这是合理的，因为玩家需要知道自己的状态）
        targets: skillTargets.filter(
          st => st.target_user_id === queryUserId && st.is_active
        ),
      };
    },
    [userId, skillUses, skillEffectsQueue, skillTargets]
  );

  // 解决技能冲突
  const resolveSkillConflicts = useCallback(
    async (roundNumber: number) => {
      if (!gameStateId) return { resolved: 0, cancelled: 0 };

      try {
        const result = await EnhancedSkillService.resolveSkillConflictsInRound(
          gameStateId,
          roundNumber,
          language
        );

        toast({
          title: t('hook.skill_stats.conflicts_resolved_title'),
          description: t('hook.skill_stats.conflicts_resolved_desc', {
            resolved: result.resolved,
            cancelled: result.cancelled,
          }),
        });

        return result;
      } catch (error) {
        logger.error('Failed to resolve skill conflicts', error);
        toast({
          title: t('hook.skill_stats.conflicts_failed_title'),
          description: t('hook.skill_stats.conflicts_failed_desc'),
          variant: 'destructive',
        });
        return { resolved: 0, cancelled: 0 };
      }
    },
    [gameStateId, language, toast, t]
  );

  // 检查是否有活跃效果
  const hasActiveEffect = useCallback(
    (targetUserId: string, effectType: string) => {
      const targets = getUserSkillData(targetUserId).targets;
      return targets.some(t => matchesEffectType(t.effect_applied, effectType));
    },
    [getUserSkillData]
  );

  return {
    stats,
    getUserSkillData,
    resolveSkillConflicts,
    hasActiveEffect,
  };
};
