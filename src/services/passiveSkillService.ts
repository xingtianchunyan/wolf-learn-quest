// 被动技能服务 - 处理恶魔免疫、多重保护等被动技能逻辑
import { supabase } from '@/integrations/supabase/client';
import { SystemAnnouncementService } from './systemAnnouncementService';

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
   * 处理恶魔免疫狼杀的被动技能
   */
  static async processDemonImmunity(
    targetUserId: string,
    attackerUserId: string,
    gameStateId: string,
    roomId: string
  ): Promise<{ isImmune: boolean; reason?: string }> {
    try {
      // 检查目标的角色状态和设计
      const { data: targetRoleState } = await supabase
        .from('role_states')
        .select('*, role_id')
        .eq('user_id', targetUserId)
        .eq('game_state_id', gameStateId)
        .single();

      if (!targetRoleState) {
        return { isImmune: false };
      }

      // 获取角色设计信息
      const { data: targetRoleDesign } = await supabase
        .from('role_design')
        .select('role_name, skill_name')
        .eq('id', targetRoleState.role_id)
        .single();

      if (!targetRoleDesign || targetRoleDesign.role_name !== 'demon') {
        return { isImmune: false };
      }

      // 检查攻击者的角色状态和设计
      const { data: attackerRoleState } = await supabase
        .from('role_states')
        .select('*, role_id')
        .eq('user_id', attackerUserId)
        .eq('game_state_id', gameStateId)
        .single();

      if (!attackerRoleState) {
        return { isImmune: false };
      }

      // 获取攻击者角色设计信息
      const { data: attackerRoleDesign } = await supabase
        .from('role_design')
        .select('role_name')
        .eq('id', attackerRoleState.role_id)
        .single();

      const isWerewolfAttack = ['werewolf', 'whitewolf'].includes(
        attackerRoleDesign?.role_name || ''
      );

      if (isWerewolfAttack) {
        // 恶魔免疫狼人攻击
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
      console.error('Error processing demon immunity:', error);
      return { isImmune: false };
    }
  }

  /**
   * 处理多重保护导致淘汰的逻辑
   */
  static async processMultipleProtection(
    targetUserId: string,
    gameStateId: string,
    roomId: string,
    currentRound: number
  ): Promise<{ shouldEliminate: boolean; reason?: string }> {
    try {
      // 获取当前轮次对目标的所有保护技能
      const { data: protectionSkills } = await supabase
        .from('skill_uses')
        .select(`
          *,
          skill_targets!inner (
            target_user_id,
            effect_applied
          )
        `)
        .eq('game_state_id', gameStateId)
        .eq('round_number', currentRound)
        .eq('skill_targets.target_user_id', targetUserId)
        .in('skill_name', ['vigil', 'magic_potion']) // 守卫守夜、女巫解药
        .eq('execution_status', 'completed');

      if (!protectionSkills || protectionSkills.length < 2) {
        return { shouldEliminate: false };
      }

      // 检查是否有多个不同来源的保护
      const protectionSources = protectionSkills.map(skill => skill.user_id);
      const uniqueSources = [...new Set(protectionSources)];

      if (uniqueSources.length >= 2) {
        // 多重保护导致淘汰
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
          reason: '多重保护导致淘汰' 
        };
      }

      return { shouldEliminate: false };
    } catch (error) {
      console.error('Error processing multiple protection:', error);
      return { shouldEliminate: false };
    }
  }

  /**
   * 处理猎人濒死被动技能触发
   */
  static async processHunterDyingTrigger(
    hunterUserId: string,
    gameStateId: string,
    roomId: string
  ): Promise<boolean> {
    try {
      // 更新猎人状态为濒死，并设置技能可用
      const { error: updateError } = await supabase
        .from('role_states')
        .update({
          role_status: 2, // 濒死状态
          status_effects: {
            can_chat: false,
            can_vote: false,
            can_use_skill: true, // 可以使用技能
            can_be_targeted: true,
            can_answer_questions: true,
            can_be_voted: false,
            is_hunter_revenge: true,
            hunter_revenge_end_time: new Date(Date.now() + 40000).toISOString() // 40秒后结束
          }
        })
        .eq('user_id', hunterUserId)
        .eq('game_state_id', gameStateId);

      if (updateError) {
        console.error('Error updating hunter status:', updateError);
        return false;
      }

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

      return true;
    } catch (error) {
      console.error('Error processing hunter dying trigger:', error);
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