// 女巫魔药管理Hook - 专门处理女巫魔药的使用逻辑
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';

const logger = createLogger('witch-potion-manager');

export interface PotionUsageStatus {
  protectionUsed: boolean;
  attackUsed: boolean;
  canUseProtection: boolean;
  canUseAttack: boolean;
  nightDeaths?: any[];
}

export const useWitchPotionManager = (
  gameStateId: string,
  userId: string,
  currentRound: number
) => {
  const [potionStatus, setPotionStatus] = useState<PotionUsageStatus>({
    protectionUsed: false,
    attackUsed: false,
    canUseProtection: false,
    canUseAttack: false,
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // 检查魔药使用状态
  const checkPotionStatus = useCallback(async () => {
    if (!gameStateId || !userId) return;

    setLoading(true);
    try {
      // 获取女巫的技能使用记录
      const { data: skillUses, error } = await supabase
        .from('skill_uses')
        .select('*')
        .eq('game_state_id', gameStateId)
        .eq('user_id', userId)
        .eq('skill_name', 'magic_potion')
        .eq('round_number', currentRound);

      if (error) {
        logger.error('获取魔药使用状态失败', error);
        return;
      }

      // 分析使用记录
      const protectionUses =
        skillUses?.filter(use => {
          const effects = use.skill_effects as any;
          return effects?.potionType === 'protection';
        }) || [];

      const attackUses =
        skillUses?.filter(use => {
          const effects = use.skill_effects as any;
          return effects?.potionType === 'attack';
        }) || [];

      // 验证保护魔药可用性
      const protectionValidation = await supabase.rpc(
        'validate_witch_potion_usage',
        {
          p_user_id: userId,
          p_game_state_id: gameStateId,
          p_potion_type: 'protection',
        }
      );

      // 验证攻击魔药可用性
      const attackValidation = await supabase.rpc(
        'validate_witch_potion_usage',
        {
          p_user_id: userId,
          p_game_state_id: gameStateId,
          p_potion_type: 'attack',
        }
      );

      setPotionStatus({
        protectionUsed: protectionUses.length > 0,
        attackUsed: attackUses.length > 0,
        canUseProtection: (protectionValidation.data as any)?.can_use || false,
        canUseAttack: (attackValidation.data as any)?.can_use || false,
        nightDeaths: (protectionValidation.data as any)?.night_deaths || [],
      });
    } catch (error) {
      logger.error('检查魔药状态失败', error);
    } finally {
      setLoading(false);
    }
  }, [gameStateId, userId, currentRound]);

  // 使用保护魔药
  const useProtectionPotion = useCallback(
    async (targetUserId?: string) => {
      if (!potionStatus.canUseProtection) {
        toast({
          title: t('hook.witch.protection_unavailable_title'),
          description: t('hook.witch.protection_unavailable_desc'),
          variant: 'destructive',
        });
        return false;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('use_skill_enhanced', {
          p_game_state_id: gameStateId,
          p_skill_name: 'magic_potion',
          p_target_user_id: targetUserId,
          p_skill_data: {
            potionType: 'protection',
            effectType: 'witch_antidote',
          },
        });

        if (error) {
          toast({
            title: t('hook.witch.protection_failed_title'),
            description: error.message,
            variant: 'destructive',
          });
          return false;
        }

        toast({
          title: t('hook.witch.protection_success_title'),
          description: t('hook.witch.protection_success_desc'),
        });

        // 刷新状态
        await checkPotionStatus();
        return true;
      } catch (error: any) {
        logger.error('Protection potion failed', error);
        toast({
          title: t('hook.witch.protection_failed_title'),
          description: error.message || t('common.system_error'),
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gameStateId, potionStatus.canUseProtection, toast, t, checkPotionStatus]
  );

  // 使用攻击魔药
  const useAttackPotion = useCallback(
    async (targetUserId: string) => {
      if (!potionStatus.canUseAttack) {
        toast({
          title: t('hook.witch.attack_unavailable_title'),
          description: t('hook.witch.attack_unavailable_desc'),
          variant: 'destructive',
        });
        return false;
      }

      if (!targetUserId) {
        toast({
          title: t('hook.witch.select_target_title'),
          description: t('hook.witch.select_target_desc'),
          variant: 'destructive',
        });
        return false;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.rpc('use_skill_enhanced', {
          p_game_state_id: gameStateId,
          p_skill_name: 'magic_potion',
          p_target_user_id: targetUserId,
          p_skill_data: {
            potionType: 'attack',
            effectType: 'witch_poison',
          },
        });

        if (error) {
          toast({
            title: t('hook.witch.attack_failed_title'),
            description: error.message,
            variant: 'destructive',
          });
          return false;
        }

        toast({
          title: t('hook.witch.attack_success_title'),
          description: t('hook.witch.attack_success_desc'),
        });

        // 刷新状态
        await checkPotionStatus();
        return true;
      } catch (error: any) {
        logger.error('Attack potion failed', error);
        toast({
          title: t('hook.witch.attack_failed_title'),
          description: error.message || t('common.system_error'),
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gameStateId, potionStatus.canUseAttack, toast, t, checkPotionStatus]
  );

  // 初始化时检查状态
  useEffect(() => {
    checkPotionStatus();
  }, [checkPotionStatus]);

  // 订阅技能使用变化
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`witch_potions_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        () => {
          // 技能使用发生变化时重新检查状态
          checkPotionStatus();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId, checkPotionStatus]);

  return {
    potionStatus,
    loading,
    useProtectionPotion,
    useAttackPotion,
    checkPotionStatus,
  };
};
