// 新的投票行为系统 - 替代 game_actions 表
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VoteRecord {
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
}

export interface VotingAction {
  id: string;
  voting_session_id: string;
  voter_id: string;
  target_id: string | null;
  vote_time: string;
  is_valid: boolean;
  vote_weight: number;
}

export const useVotingActions = (roomId: string, gameStateId: string) => {
  const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentVotingSession, setCurrentVotingSession] = useState<string | null>(null);
  const { toast } = useToast();

  // 获取当前活跃的投票会话
  const fetchCurrentVotingSession = useCallback(async () => {
    if (!gameStateId) return null;

    try {
      const { data: session, error } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('game_state_id', gameStateId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('获取投票会话失败:', error);
        return null;
      }

      setCurrentVotingSession(session?.id || null);
      return session?.id || null;
    } catch (error) {
      console.error('获取投票会话时出错:', error);
      return null;
    }
  }, [gameStateId]);

  // 获取投票结果
  const fetchVoteResults = useCallback(async () => {
    if (!gameStateId) {
      setVoteRecords([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // 先获取当前投票会话
      const sessionId = await fetchCurrentVotingSession();
      if (!sessionId) {
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      // 获取投票记录
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('voter_id, target_id, vote_weight')
        .eq('voting_session_id', sessionId)
        .eq('is_valid', true);

      if (votesError) {
        console.error('获取投票记录失败:', votesError);
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      if (!votes || votes.length === 0) {
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      // 聚合投票结果
      const allPlayerIds = new Set<string>();
      const voteCounts: Record<string, { voters: string[]; totalWeight: number }> = {};

      votes.forEach(vote => {
        if (vote.target_id && vote.voter_id) {
          if (!voteCounts[vote.target_id]) {
            voteCounts[vote.target_id] = { voters: [], totalWeight: 0 };
          }
          voteCounts[vote.target_id].voters.push(vote.voter_id);
          voteCounts[vote.target_id].totalWeight += vote.vote_weight || 1;
          allPlayerIds.add(vote.target_id);
          allPlayerIds.add(vote.voter_id);
        }
      });

      // 获取玩家名称
      const playerNamesMap = await getPlayerNames(Array.from(allPlayerIds));

      // 格式化投票记录
      const formattedRecords: VoteRecord[] = Object.entries(voteCounts).map(([votedPlayerId, { voters, totalWeight }]) => {
        return {
          votedPlayerId: votedPlayerId,
          votedPlayerName: playerNamesMap.get(votedPlayerId) || '未知玩家',
          voteCount: totalWeight,
          voters: voters.map(voterId => playerNamesMap.get(voterId) || '未知玩家'),
        };
      });

      // 按票数降序排序
      formattedRecords.sort((a, b) => b.voteCount - a.voteCount);
      setVoteRecords(formattedRecords);

    } catch (error) {
      console.error('处理投票结果时出错:', error);
      toast({
        title: '获取投票数据失败',
        description: '无法获取投票信息，请刷新页面重试',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [gameStateId, fetchCurrentVotingSession, toast]);

  // 投票
  const castVote = useCallback(async (targetUserId: string | null) => {
    if (!currentVotingSession) {
      toast({
        title: '投票失败',
        description: '当前没有活跃的投票会话',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        toast({
          title: '投票失败',
          description: '请先登录',
          variant: 'destructive'
        });
        return false;
      }

      // 使用数据库函数投票
      const { error } = await supabase.rpc('cast_vote', {
        p_voting_session_id: currentVotingSession,
        p_voter_id: user.id,
        p_target_id: targetUserId
      });

      if (error) {
        console.error('投票失败:', error);
        toast({
          title: '投票失败',
          description: error.message || '请重试',
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '投票成功',
        description: targetUserId ? '已投票给目标玩家' : '已投弃权票'
      });

      // 刷新投票结果
      await fetchVoteResults();
      return true;

    } catch (error: any) {
      console.error('投票时发生错误:', error);
      toast({
        title: '投票失败',
        description: error.message || '系统错误，请重试',
        variant: 'destructive'
      });
      return false;
    }
  }, [currentVotingSession, toast, fetchVoteResults]);

  // 获取投票统计信息
  const getVoteStats = useCallback(() => {
    const totalVotes = voteRecords.reduce((sum, record) => sum + record.voteCount, 0);
    const mostVotedPlayer = voteRecords.length > 0 ? voteRecords[0] : null;
    
    return {
      totalVotes,
      mostVotedPlayer: mostVotedPlayer?.votedPlayerId || null,
      voteCounts: voteRecords.reduce((acc, record) => {
        acc[record.votedPlayerId] = record.voteCount;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [voteRecords]);

  // 初始化数据
  useEffect(() => {
    fetchCurrentVotingSession();
    fetchVoteResults();
  }, [fetchCurrentVotingSession, fetchVoteResults]);

  // 实时订阅投票变化
  useEffect(() => {
    if (!gameStateId) return;

    const votingChannel = supabase
      .channel(`voting_changes_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes'
        },
        () => {
          // 投票发生变化时刷新数据
          fetchVoteResults();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voting_sessions'
        },
        () => {
          // 投票会话变化时刷新数据
          fetchCurrentVotingSession();
          fetchVoteResults();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(votingChannel);
    };
  }, [gameStateId, fetchVoteResults, fetchCurrentVotingSession]);

  return {
    voteRecords,
    loading,
    currentVotingSession,
    castVote,
    getVoteStats,
    fetchVoteResults,
    fetchCurrentVotingSession
  };
};

// 帮助函数：通过用户ID获取玩家名称
const getPlayerNames = async (userIds: string[]): Promise<Map<string, string>> => {
  if (userIds.length === 0) {
    return new Map();
  }
  
  const { data, error } = await supabase
    .rpc('get_public_user_profiles_by_ids', { p_user_ids: userIds });

  if (error) {
    console.error('获取玩家名称失败:', error);
    return new Map();
  }

  const nameMap = new Map<string, string>();
  data.forEach(user => {
    if (user.user_id && user.player_name) {
      nameMap.set(user.user_id, user.player_name);
    }
  });
  return nameMap;
};