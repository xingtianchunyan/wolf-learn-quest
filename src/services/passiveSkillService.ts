// 被动技能服务 - 处理恶魔免疫、多重保护等被动技能逻辑
import { supabase } from '@/integrations/supabase/client';
import { SystemAnnouncementService } from './systemAnnouncementService';
import { createLogger } from '@/lib/logger';

const logger = createLogger('passive-skill-service');

export interface SkillEffect {
  skillUseId: string;
  userId: string;
  targetUserId: string;
  effectType: string;
  skillName: string;
  priority: number;
}

export class PassiveSkillService {
  /**
   * 处理恶魔免疫狼杀的被动技能 - 增强版本，使用数据库函数
   */
  static async processDemonImmunity(
    targetUserId: string,
    attackerUserId: string,
    gameStateId: string,
    roomId: string
  ): Promise<{ isImmune: boolean; reason?: string }> {
    try {
      logger.debug('检查恶魔免疫', { targetUserId, attackerUserId, gameStateId });

      // 使用数据库函数检查恶魔免疫
      const { data, error } = await supabase.rpc('check_demon_immunity', {
        p_target_user_id: targetUserId,
        p_attacker_user_id: attackerUserId,
        p_game_state_id: gameStateId
      });

      if (error) {
        logger.error('恶魔免疫检查失败', error);
        return { isImmune: false };
      }

      const isImmune = data || false;

      if (isImmune) {
        logger.info('恶魔免疫狼人攻击', { targetUserId, attackerUserId });
        
        // 创建系统公告
        await SystemAnnouncementService.createSkillUsageAnnouncement({
          type: 'skill_usage',
          actorUserId: targetUserId,
          actorName: 'Unknown', // 需要获取实际姓名
          actorRole: 'demon',
          skillName: '恶魔被动',
          skillType: '免疫',
          roomId,
          gameRound: 1, // 需要获取实际轮次
          gamePhase: 'night'
        });

        return { 
          isImmune: true, 
          reason: '恶魔免疫狼人攻击' 
        };
      }

      return { isImmune: false };
    } catch (error) {
      logger.error('恶魔免疫处理异常', error);
      return { isImmune: false };
    }
  }

  /**
   * 处理多重保护导致淘汰的逻辑 - 增强版本，使用数据库函数
   */
  static async processMultipleProtection(
    targetUserId: string,
    gameStateId: string,
    roomId: string,
    currentRound: number
  ): Promise<{ shouldEliminate: boolean; reason?: string }> {
    try {
      logger.debug('检查多重保护', { targetUserId, gameStateId, currentRound });

      // 使用数据库函数检查多重保护
      const { data, error } = await supabase.rpc('check_multiple_protection', {
        p_target_user_id: targetUserId,
        p_game_state_id: gameStateId,
        p_round_number: currentRound
      });

      if (error) {
        logger.error('多重保护检查失败', error);
        return { shouldEliminate: false };
      }

      const shouldEliminate = (data as any)?.should_eliminate || false;

      if (shouldEliminate) {
        logger.info('多重保护导致淘汰', { 
          targetUserId, 
          protectionCount: (data as any)?.protection_count,
          reason: (data as any)?.reason 
        });

        // 创建系统公告
        await SystemAnnouncementService.createStatusChangeAnnouncement({
          type: 'status_change',
          actorUserId: '',
          actorName: '',
          actorRole: '',
          targetUserId: targetUserId,
          targetName: 'Unknown', // 需要获取实际姓名
          targetRole: 'Unknown', // 需要获取实际角色
          skillName: '多重保护',
          skillType: '特殊判定',
          finalStatus: '淘汰',
          roomId,
          gameRound: currentRound,
          gamePhase: 'night'
        });

        return { 
          shouldEliminate: true, 
          reason: (data as any)?.reason || '多重保护导致淘汰' 
        };
      }

      return { shouldEliminate: false };
    } catch (error) {
      logger.error('多重保护处理异常', error);
      return { shouldEliminate: false };
    }
  }

  /**
   * 处理猎人濒死被动技能触发 - 增强版本，使用数据库函数
   */
  static async processHunterDyingTrigger(
    hunterUserId: string,
    gameStateId: string,
    roomId: string,
    triggerReason: string = 'elimination'
  ): Promise<boolean> {
    try {
      logger.debug('触发猎人濒死技能', { hunterUserId, gameStateId, triggerReason });

      // 使用数据库函数触发猎人濒死技能
      const { data, error } = await supabase.rpc('trigger_hunter_dying_skill', {
        p_hunter_user_id: hunterUserId,
        p_game_state_id: gameStateId,
        p_trigger_reason: triggerReason
      });

      if (error) {
        logger.error('猎人濒死技能触发失败', error);
        return false;
      }

      const success = data || false;

      if (success) {
        logger.info('猎人濒死技能触发成功', { hunterUserId, triggerReason });

        // 发送猎人濒死广播
        await SystemAnnouncementService.createHunterDeathBroadcast({
          type: 'hunter_broadcast',
          actorUserId: hunterUserId,
          actorName: 'Unknown', // 需要获取实际姓名
          actorRole: 'hunter',
          roomId,
          gameRound: 1, // 需要获取实际轮次
          gamePhase: 'day'
        });
      }

      return success;
    } catch (error) {
      logger.error('猎人濒死技能处理异常', error);
      return false;
    }
  }

  /**
   * 处理技能冲突解决
   */
  static async resolveSkillConflicts(
    conflictingSkills: SkillEffect[],
    gameStateId: string
  ): Promise<SkillEffect[]> {
    try {
      // 按优先级排序（数字越小优先级越高）
      const sortedSkills = conflictingSkills.sort((a, b) => a.priority - b.priority);
      
      // 检查是否有冲突的技能
      const hasConflicts = this.checkSkillConflicts(sortedSkills);
      
      if (!hasConflicts) {
        return sortedSkills;
      }

      // 解决冲突：优先级高的生效，其他取消
      const resolvedSkills: SkillEffect[] = [];
      const cancelledSkills: SkillEffect[] = [];

      for (const skill of sortedSkills) {
        const hasConflictWithResolved = resolvedSkills.some(resolved => 
          this.skillsConflict(skill, resolved)
        );

        if (!hasConflictWithResolved) {
          resolvedSkills.push(skill);
        } else {
          cancelledSkills.push(skill);
        }
      }

      // 取消冲突的技能
      for (const skill of cancelledSkills) {
        await supabase
          .from('skill_uses')
          .update({
            execution_status: 'cancelled',
            failure_reason: '技能冲突，优先级较低'
          })
          .eq('id', skill.skillUseId);
      }

      return resolvedSkills;
    } catch (error) {
      console.error('Error resolving skill conflicts:', error);
      return conflictingSkills;
    }
  }

  /**
   * 检查技能列表是否存在冲突
   */
  private static checkSkillConflicts(skills: SkillEffect[]): boolean {
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        if (this.skillsConflict(skills[i], skills[j])) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 检查两个技能是否冲突
   */
  private static skillsConflict(skill1: SkillEffect, skill2: SkillEffect): boolean {
    // 守卫保护与狼人攻击冲突
    if ((skill1.skillName === 'vigil' && skill2.skillName === 'night_attack') ||
        (skill1.skillName === 'night_attack' && skill2.skillName === 'vigil')) {
      return skill1.targetUserId === skill2.targetUserId;
    }

    // 女巫解药与狼人攻击冲突
    if ((skill1.skillName === 'magic_potion' && skill1.effectType === 'protection' && 
         skill2.skillName === 'night_attack') ||
        (skill1.skillName === 'night_attack' && 
         skill2.skillName === 'magic_potion' && skill2.effectType === 'protection')) {
      return skill1.targetUserId === skill2.targetUserId;
    }

    return false;
  }
}