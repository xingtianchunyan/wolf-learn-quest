
import { supabase } from '@/integrations/supabase/client';
import { ROLE_STATUS } from './roleStateHelpers';

// 猎人角色的反击时间（秒）
const HUNTER_REVENGE_TIME = 40;

// 检查角色是否是猎人
const isHunterRole = async (roleId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('role_design')
    .select('role_name')
    .eq('id', roleId)
    .single();
    
  if (error) {
    console.error('检查猎人角色失败:', error);
    return false;
  }
  
  return data?.role_name === '猎人';
};

// 处理投票结果，处理被投票最多的玩家
export const handleVoteResult = async (roomId: string, gameStateId: string, votedPlayerId: string): Promise<boolean> => {
  try {
    // 获取被投票玩家的角色状态
    const { data: roleState, error: roleStateError } = await supabase
      .from('role_states')
      .select('*')
      .eq('room_id', roomId)
      .eq('game_state_id', gameStateId)
      .eq('user_id', votedPlayerId)
      .single();
    
    if (roleStateError || !roleState) {
      console.error('获取角色状态失败:', roleStateError);
      return false;
    }
    
    // 检查是否是猎人角色
    const isHunter = await isHunterRole(roleState.role_id);
    
    if (isHunter) {
      // 猎人进入濒死状态，设置反击时间
      const { error: updateError } = await supabase
        .from('role_states')
        .update({
          role_status: ROLE_STATUS.DYING,
          status_effects: {
            can_chat: false,
            can_vote: false,
            can_use_skill: true,
            can_be_targeted: false,
            can_answer_questions: true,
            can_be_voted: false,
            hunter_revenge_end_time: new Date(Date.now() + HUNTER_REVENGE_TIME * 1000).toISOString(),
            is_hunter_revenge: true
          }
        })
        .eq('id', roleState.id);
      
      if (updateError) {
        console.error('更新猎人状态失败:', updateError);
        return false;
      }
      
      console.log(`猎人 ${votedPlayerId} 进入濒死状态，有 ${HUNTER_REVENGE_TIME} 秒反击时间`);
      
      // 设置定时器，40秒后自动淘汰猎人
      setTimeout(async () => {
        await eliminateHunterAfterRevenge(roleState.id);
      }, HUNTER_REVENGE_TIME * 1000);
      
    } else {
      // 非猎人直接淘汰
      const { error: updateError } = await supabase
        .from('role_states')
        .update({
          role_status: ROLE_STATUS.ELIMINATED
        })
        .eq('id', roleState.id);
      
      if (updateError) {
        console.error('更新玩家淘汰状态失败:', updateError);
        return false;
      }
      
      console.log(`玩家 ${votedPlayerId} 被投票淘汰`);
    }
    
    return true;
  } catch (error) {
    console.error('处理投票结果时出错:', error);
    return false;
  }
};

// 猎人反击时间结束后自动淘汰
const eliminateHunterAfterRevenge = async (roleStateId: string): Promise<void> => {
  try {
    // 检查猎人是否仍在濒死状态（可能已经被治疗或其他状态变化）
    const { data: currentState, error: checkError } = await supabase
      .from('role_states')
      .select('role_status, status_effects')
      .eq('id', roleStateId)
      .single();
    
    if (checkError || !currentState) {
      console.error('检查猎人当前状态失败:', checkError);
      return;
    }
    
    // 只有当猎人仍在反击状态时才自动淘汰
    const statusEffects = currentState.status_effects as any;
    if (currentState.role_status === ROLE_STATUS.DYING && statusEffects?.is_hunter_revenge) {
      const { error: updateError } = await supabase
        .from('role_states')
        .update({
          role_status: ROLE_STATUS.ELIMINATED
        })
        .eq('id', roleStateId);
      
      if (updateError) {
        console.error('自动淘汰猎人失败:', updateError);
      } else {
        console.log(`猎人反击时间结束，自动淘汰`);
      }
    }
  } catch (error) {
    console.error('处理猎人自动淘汰时出错:', error);
  }
};

// 检查猎人反击时间是否已结束
export const checkHunterRevengeTimeout = (statusEffects: any): boolean => {
  if (!statusEffects?.is_hunter_revenge || !statusEffects?.hunter_revenge_end_time) {
    return false;
  }
  
  const endTime = new Date(statusEffects.hunter_revenge_end_time);
  return Date.now() > endTime.getTime();
};

// 获取猎人剩余反击时间（秒）
export const getHunterRevengeTimeLeft = (statusEffects: any): number => {
  if (!statusEffects?.is_hunter_revenge || !statusEffects?.hunter_revenge_end_time) {
    return 0;
  }
  
  const endTime = new Date(statusEffects.hunter_revenge_end_time);
  const timeLeft = Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000));
  return timeLeft;
};
