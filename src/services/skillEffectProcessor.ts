/**
 * 文件级注释：技能效果处理服务
 * - 处理技能使用后的状态变更逻辑
 * - 确保攻击类技能正确触发目标玩家的濒死状态
 * - 修复技能效果与角色状态的联动机制
 */

import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

/**
 * 接口注释：技能效果配置
 */
interface SkillEffect {
  skillName: string;
  targetUserId: string;
  actorUserId: string;
  effect: 'attack' | 'protect' | 'heal' | 'investigate' | 'eliminate';
  priority: number;
}

/**
 * 函数级注释：处理技能使用后的状态变更
 * - 根据技能类型更新目标玩家的角色状态
 * - 处理攻击、保护、治疗等效果的联动
 */
export const processSkillEffects = async (
  roomId: string,
  gameStateId: string,
  skillEffects: SkillEffect[]
): Promise<boolean> => {
  try {
    logger.info('开始处理技能效果', { roomId, gameStateId, effectsCount: skillEffects.length });

    // 按优先级排序技能效果
    const sortedEffects = skillEffects.sort((a, b) => a.priority - b.priority);

    for (const effect of sortedEffects) {
      await processIndividualSkillEffect(roomId, gameStateId, effect);
    }

    return true;
  } catch (error) {
    logger.error('处理技能效果失败:', error);
    return false;
  }
};

/**
 * 函数级注释：处理单个技能效果
 */
const processIndividualSkillEffect = async (
  roomId: string,
  gameStateId: string,
  effect: SkillEffect
): Promise<void> => {
  try {
    logger.debug('处理单个技能效果', effect);

    switch (effect.effect) {
      case 'attack':
        await processAttackEffect(roomId, effect.targetUserId);
        break;
      case 'protect':
        await processProtectEffect(roomId, effect.targetUserId);
        break;
      case 'heal':
        await processHealEffect(roomId, effect.targetUserId);
        break;
      case 'eliminate':
        await processEliminateEffect(roomId, effect.targetUserId);
        break;
      default:
        logger.warn('未知的技能效果类型:', effect.effect);
    }
  } catch (error) {
    logger.error('处理单个技能效果失败:', effect, error);
  }
};

/**
 * 函数级注释：处理攻击效果
 * - 将目标玩家状态设置为濒死（2）
 */
const processAttackEffect = async (roomId: string, targetUserId: string): Promise<void> => {
  // 检查目标是否受到保护
  const { data: protectionEffects } = await supabase
    .from('skill_effects_queue')
    .select('*')
    .eq('room_id', roomId)
    .eq('status', 'active')
    .contains('effect_data', { targetUserId })
    .eq('effect_type', 'protection');

  if (protectionEffects && protectionEffects.length > 0) {
    logger.info('目标受到保护，攻击无效', { targetUserId });
    return;
  }

  // 更新目标玩家状态为濒死
  const { error } = await supabase
    .from('role_states')
    .update({ 
      role_status: 2, // 濒死状态
      status_effects: {
        is_dying: true,
        dying_reason: 'werewolf_attack'
      },
      updated_at: new Date().toISOString()
    })
    .eq('room_id', roomId)
    .eq('user_id', targetUserId);

  if (error) {
    logger.error('更新攻击目标状态失败:', error);
    throw error;
  }

  logger.info('攻击效果已处理', { targetUserId, newStatus: 'dying' });
};

/**
 * 函数级注释：处理保护效果
 */
const processProtectEffect = async (roomId: string, targetUserId: string): Promise<void> => {
  // 需要游戏状态ID，暂时使用临时ID
  const gameStateId = 'temp-id'; // 实际使用时需要传入正确的game_state_id
  
  // 添加保护效果到队列
  const { error } = await supabase
    .from('skill_effects_queue')
    .insert({
      game_state_id: gameStateId,
      skill_use_id: gameStateId, // 临时使用相同ID
      room_id: roomId,
      effect_type: 'protection',
      effect_data: { targetUserId },
      status: 'active',
      priority: 100,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24小时后过期
    });

  if (error) {
    logger.error('添加保护效果失败:', error);
    throw error;
  }

  logger.info('保护效果已添加', { targetUserId });
};

/**
 * 函数级注释：处理治疗效果
 * - 将濒死玩家状态恢复为正常（1）
 */
const processHealEffect = async (roomId: string, targetUserId: string): Promise<void> => {
  const { error } = await supabase
    .from('role_states')
    .update({ 
      role_status: 1, // 正常状态
      status_effects: {
        is_healed: true
      },
      updated_at: new Date().toISOString()
    })
    .eq('room_id', roomId)
    .eq('user_id', targetUserId);

  if (error) {
    logger.error('更新治疗目标状态失败:', error);
    throw error;
  }

  logger.info('治疗效果已处理', { targetUserId, newStatus: 'normal' });
};

/**
 * 函数级注释：处理淘汰效果
 * - 将玩家状态设置为淘汰（4）
 */
const processEliminateEffect = async (roomId: string, targetUserId: string): Promise<void> => {
  const { error } = await supabase
    .from('role_states')
    .update({ 
      role_status: 4, // 淘汰状态
      status_effects: {
        is_eliminated: true,
        elimination_reason: 'skill_effect'
      },
      updated_at: new Date().toISOString()
    })
    .eq('room_id', roomId)
    .eq('user_id', targetUserId);

  if (error) {
    logger.error('更新淘汰目标状态失败:', error);
    throw error;
  }

  logger.info('淘汰效果已处理', { targetUserId, newStatus: 'eliminated' });
};

/**
 * 函数级注释：获取并应用排队的技能效果
 * - 在阶段结束时调用，处理所有排队的技能效果
 */
export const processQueuedSkillEffects = async (roomId: string, gameStateId: string): Promise<boolean> => {
  try {
    // 获取排队的技能效果
    const { data: queuedEffects, error } = await supabase
      .from('skill_effects_queue')
      .select('*')
      .eq('room_id', roomId)
      .eq('status', 'queued')
      .order('priority', { ascending: true });

    if (error) {
      logger.error('获取排队技能效果失败:', error);
      return false;
    }

    if (!queuedEffects || queuedEffects.length === 0) {
      logger.info('没有排队的技能效果需要处理');
      return true;
    }

    // 转换为标准格式并处理
    const skillEffects: SkillEffect[] = queuedEffects.map(effect => {
      const effectData = effect.effect_data as any;
      return {
        skillName: effect.effect_type,
        targetUserId: effectData?.targetUserId || '',
        actorUserId: effectData?.actorUserId || '',
        effect: effect.effect_type as any,
        priority: effect.priority
      };
    });

    const success = await processSkillEffects(roomId, gameStateId, skillEffects);

    if (success) {
      // 标记效果为已处理
      const { error: updateError } = await supabase
        .from('skill_effects_queue')
        .update({ status: 'processed', processed_at: new Date().toISOString() })
        .eq('room_id', roomId)
        .eq('status', 'queued');

      if (updateError) {
        logger.error('更新技能效果状态失败:', updateError);
      }
    }

    return success;
  } catch (error) {
    logger.error('处理排队技能效果失败:', error);
    return false;
  }
};