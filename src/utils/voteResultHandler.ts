
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

    // 简化的投票结果处理：直接更新被投票最多的玩家状态
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

      // 更新玩家状态为淘汰
      const { error: updateError } = await supabase
        .from('role_states')
        .update({ 
          role_status: 4, // 淘汰状态
          updated_at: new Date().toISOString()
        })
        .eq('user_id', mostVotedPlayerId)
        .eq('game_state_id', gameStateId);

      if (updateError) {
        console.error('更新玩家状态失败:', updateError);
        return false;
      }

      console.log('投票结果处理成功，玩家已淘汰:', mostVotedPlayerId);
      return true;
    }

    console.log('没有玩家被淘汰');
    return true;

  } catch (error) {
    console.error('处理投票结果时发生未知错误:', error);
    return false;
  }
};

// 获取投票统计信息（使用新的投票系统）
export const getVoteStats = async (
  gameStateId: string,
  currentRound: number,
  currentPhase: number
) => {
  try {
    // 获取当前活跃的投票会话
    const { data: session, error: sessionError } = await supabase
      .from('voting_sessions')
      .select('id')
      .eq('game_state_id', gameStateId)
      .eq('round_number', currentRound)
      .eq('phase', currentPhase)
      .eq('status', 'active')
      .maybeSingle();

    if (sessionError) {
      console.error('获取投票会话失败:', sessionError);
      return { voteCount: 0, mostVotedPlayer: null };
    }

    if (!session) {
      return { voteCount: 0, mostVotedPlayer: null };
    }

    // 获取投票记录
    const { data: votes, error } = await supabase
      .from('votes')
      .select('voter_id, target_id, vote_weight')
      .eq('voting_session_id', session.id)
      .eq('is_valid', true);

    if (error) {
      console.error('获取投票记录失败:', error);
      return { voteCount: 0, mostVotedPlayer: null };
    }

    if (!votes || votes.length === 0) {
      return { voteCount: 0, mostVotedPlayer: null };
    }

    // 统计得票
    const voteCounts: Record<string, number> = {};
    votes.forEach(vote => {
      if (vote.target_id) {
        voteCounts[vote.target_id] = (voteCounts[vote.target_id] || 0) + (vote.vote_weight || 1);
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
