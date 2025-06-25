
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

    // 使用新的投票系统处理结果
    // 首先获取当前活跃的投票会话
    const { data: votingSession, error: sessionError } = await supabase
      .from('voting_sessions')
      .select('*')
      .eq('game_state_id', gameStateId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sessionError) {
      console.error('获取投票会话失败:', sessionError);
      return false;
    }

    if (!votingSession) {
      console.error('没有找到活跃的投票会话');
      return false;
    }

    // 计算投票结果
    const { error: calculateError } = await supabase.rpc('calculate_voting_results', {
      p_voting_session_id: votingSession.id
    });

    if (calculateError) {
      console.error('计算投票结果失败:', calculateError);
      return false;
    }

    // 获取计算后的结果
    const { data: results, error: resultsError } = await supabase
      .from('voting_results')
      .select('*')
      .eq('voting_session_id', votingSession.id)
      .eq('result_type', 'eliminated')
      .order('total_votes', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (resultsError) {
      console.error('获取投票结果失败:', resultsError);
      return false;
    }

    // 如果有被淘汰的玩家，处理结果
    if (results && results.target_id) {
      const { data: processResult, error: processError } = await supabase.rpc('process_voting_result', {
        p_voting_result_id: results.id
      });

      if (processError) {
        console.error('处理投票结果失败:', processError);
        return false;
      }

      console.log('投票结果处理成功:', processResult);
      return true;
    }

    console.log('投票无淘汰结果，处理完成');
    return true;

  } catch (error) {
    console.error('处理投票结果时发生未知错误:', error);
    return false;
  }
};

// 获取投票统计信息（保持向后兼容）
export const getVoteStats = async (
  gameStateId: string,
  currentRound: number,
  currentPhase: number
) => {
  try {
    // 获取当前投票会话的投票记录
    const { data: votingSession } = await supabase
      .from('voting_sessions')
      .select('id')
      .eq('game_state_id', gameStateId)
      .eq('round_number', currentRound)
      .eq('phase', currentPhase)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!votingSession) {
      return { voteCount: 0, mostVotedPlayer: null };
    }

    // 获取投票统计
    const { data: votes } = await supabase
      .from('votes')
      .select('target_id, voter_id')
      .eq('voting_session_id', votingSession.id)
      .eq('is_valid', true);

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
