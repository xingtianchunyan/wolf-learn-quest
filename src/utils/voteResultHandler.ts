import { supabase } from '@/integrations/supabase/client';

// 处理投票结果的主函数
export const handleVoteResult = async (
  roomId: string,
  gameStateId: string,
  mostVotedPlayerId: string
): Promise<boolean> => {
  try {
    console.log('开始处理投票结果:', {
      roomId,
      gameStateId,
      mostVotedPlayerId
    });

    // 获取最新的投票结果
    const { data: votingResults, error: resultsError } = await supabase
      .from('voting_results')
      .select('*')
      .eq('target_id', mostVotedPlayerId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (resultsError) {
      console.error('获取投票结果失败:', resultsError);
      return false;
    }

    if (votingResults && votingResults.length > 0) {
      const votingResult = votingResults[0];
      
      // 使用数据库函数处理投票结果
      const { data: processResult, error: processError } = await supabase
        .rpc('process_voting_result', {
          p_voting_result_id: votingResult.id
        });

      if (processError) {
        console.error('处理投票结果失败:', processError);
        return false;
      }

      console.log('投票结果处理成功');
      return processResult;
    }

    // 如果没有找到投票结果记录，进行简化处理
    if (mostVotedPlayerId) {
      // 检查目标玩家是否存在
      const { data: targetPlayer, error: playerError } = await supabase
        .from('role_states')
        .select('*')
        .eq('user_id', mostVotedPlayerId)
        .eq('game_state_id', gameStateId)
        .maybeSingle();

      if (playerError) {
        console.error('查询目标玩家失败:', playerError);
        return false;
      }

      if (!targetPlayer) {
        console.error('未找到目标玩家');
        return false;
      }

      // 更新玩家状态为虚弱（按新的游戏规则）
      const { error: updateError } = await supabase
        .from('role_states')
        .update({ 
          role_status: 3, // 虚弱状态
          updated_at: new Date().toISOString()
        })
        .eq('user_id', mostVotedPlayerId)
        .eq('game_state_id', gameStateId);

      if (updateError) {
        console.error('更新玩家状态失败:', updateError);
        return false;
      }

      console.log('投票结果处理成功，玩家状态更新为虚弱:', mostVotedPlayerId);
      return true;
    }

    console.log('没有玩家被投票');
    return true;

  } catch (error) {
    console.error('处理投票结果时发生未知错误:', error);
    return false;
  }
};

// 获取投票统计信息（使用新的投票系统表）
export const getVoteStats = async (
  gameStateId: string,
  currentRound: number,
  currentPhase: number
) => {
  try {
    // 获取当前投票会话
    const { data: votingSessions, error: sessionError } = await supabase
      .from('voting_sessions')
      .select('id')
      .eq('game_state_id', gameStateId)
      .eq('round_number', currentRound)
      .eq('phase', currentPhase)
      .order('created_at', { ascending: false })
      .limit(1);

    if (sessionError) {
      console.error('获取投票会话失败:', sessionError);
      return { voteCount: 0, mostVotedPlayer: null };
    }

    if (!votingSessions || votingSessions.length === 0) {
      return { voteCount: 0, mostVotedPlayer: null };
    }

    const sessionId = votingSessions[0].id;

    // 从 votes 表获取投票记录
    const { data: votes, error } = await supabase
      .from('votes')
      .select('voter_id, target_id')
      .eq('voting_session_id', sessionId)
      .eq('is_valid', true);

    if (error) {
      console.error('获取投票统计失败:', error);
      return { voteCount: 0, mostVotedPlayer: null };
    }

    if (!votes || votes.length === 0) {
      return { voteCount: 0, mostVotedPlayer: null };
    }

    // 统计得票
    const voteCounts: Record<string, number> = {};
    votes.forEach(vote => {
      if (vote.target_id) {
        voteCounts[vote.target_id] = (voteCounts[vote.target_id] || 0) + 1;
      }
    });

    // 找出得票最多的玩家
    const mostVotedPlayerId = Object.entries(voteCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    return {
      voteCount: votes.length,
      mostVotedPlayer: mostVotedPlayerId || null,
      voteCounts
    };

  } catch (error) {
    console.error('获取投票统计失败:', error);
    return { voteCount: 0, mostVotedPlayer: null };
  }
};