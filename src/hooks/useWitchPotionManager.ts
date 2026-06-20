// 女巫魔药管理Hook - 专门处理女巫魔药的使用逻辑
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
          title: '无法使用保护魔药',
          description: '保护魔药不可用或已使用',
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
            title: '保护魔药使用失败',
            description: error.message,
            variant: 'destructive',
          });
          return false;
        }

        toast({
          title: '保护魔药使用成功',
          description: '解药已使用，将拯救今夜的死者',
        });

        // 刷新状态
        await checkPotionStatus();
        return true;
      } catch (error: any) {
        logger.error('使用保护魔药失败', error);
        toast({
          title: '保护魔药使用失败',
          description: error.message || '系统错误',
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gameStateId, potionStatus.canUseProtection, toast, checkPotionStatus]
  );

  // 使用攻击魔药
  const useAttackPotion = useCallback(
    async (targetUserId: string) => {
      if (!potionStatus.canUseAttack) {
        toast({
          title: '无法使用攻击魔药',
          description: '攻击魔药不可用或已使用',
          variant: 'destructive',
        });
        return false;
      }

      if (!targetUserId) {
        toast({
          title: '请选择目标',
          description: '使用攻击魔药需要选择一个目标',
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
            title: '攻击魔药使用失败',
            description: error.message,
            variant: 'destructive',
          });
          return false;
        }

        toast({
          title: '攻击魔药使用成功',
          description: '毒药已使用，目标将在夜晚结束时死亡',
        });

        // 刷新状态
        await checkPotionStatus();
        return true;
      } catch (error: any) {
        logger.error('使用攻击魔药失败', error);
        toast({
          title: '攻击魔药使用失败',
          description: error.message || '系统错误',
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [gameStateId, potionStatus.canUseAttack, toast, checkPotionStatus]
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
