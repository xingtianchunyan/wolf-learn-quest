
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VotingSession {
  id: string;
  game_state_id: string;
  room_id: string;
  round_number: number;
  phase: number;
  session_type: string;
  status: 'active' | 'completed' | 'cancelled';
  start_time: string;
  end_time?: string;
}

export interface Vote {
  id: string;
  voting_session_id: string;
  voter_id: string;
  target_id?: string;
  vote_time: string;
  is_valid: boolean;
  vote_weight: number;
}

export interface VotingResult {
  id: string;
  voting_session_id: string;
  target_id?: string;
  total_votes: number;
  vote_percentage?: number;
  is_majority: boolean;
  is_tied: boolean;
  result_type: 'eliminated' | 'saved' | 'tied' | 'no_result';
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  processed_at?: string;
}

export const useVotingSystem = (roomId: string, gameStateId?: string) => {
  const [currentSession, setCurrentSession] = useState<VotingSession | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [results, setResults] = useState<VotingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 获取当前活跃的投票会话
  const fetchCurrentSession = useCallback(async () => {
    if (!gameStateId) return;
    
    const { data, error } = await supabase
      .from('voting_sessions')
      .select('*')
      .eq('game_state_id', gameStateId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('获取投票会话失败:', error);
      return;
    }

    setCurrentSession(data);
  }, [gameStateId]);

  // 获取投票记录
  const fetchVotes = useCallback(async (sessionId: string) => {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('voting_session_id', sessionId)
      .order('vote_time', { ascending: true });

    if (error) {
      console.error('获取投票记录失败:', error);
      return;
    }

    setVotes(data || []);
  }, []);

  // 获取投票结果
  const fetchResults = useCallback(async (sessionId: string) => {
    const { data, error } = await supabase
      .from('voting_results')
      .select('*')
      .eq('voting_session_id', sessionId)
      .order('total_votes', { ascending: false });

    if (error) {
      console.error('获取投票结果失败:', error);
      return;
    }

    setResults(data || []);
  }, []);

  // 创建投票会话
  const createVotingSession = useCallback(async (
    roundNumber: number,
    phase: number,
    sessionType: string = 'day_vote'
  ) => {
    if (!gameStateId) {
      toast({
        title: '创建投票会话失败',
        description: '游戏状态ID不存在',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('create_voting_session', {
        p_game_state_id: gameStateId,
        p_room_id: roomId,
        p_round_number: roundNumber,
        p_phase: phase,
        p_session_type: sessionType
      });

      if (error) throw error;

      toast({
        title: '投票会话已创建',
        description: '玩家现在可以开始投票',
      });

      await fetchCurrentSession();
      return data;
    } catch (error) {
      console.error('创建投票会话失败:', error);
      toast({
        title: '创建投票会话失败',
        description: '请检查网络连接或联系管理员',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, roomId, toast, fetchCurrentSession]);

  // 投票
  const castVote = useCallback(async (
    voterId: string,
    targetId?: string
  ) => {
    if (!currentSession) {
      toast({
        title: '投票失败',
        description: '当前没有活跃的投票会话',
        variant: 'destructive',
      });
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('cast_vote', {
        p_voting_session_id: currentSession.id,
        p_voter_id: voterId,
        p_target_id: targetId
      });

      if (error) throw error;

      toast({
        title: '投票成功',
        description: targetId ? '已投票给指定玩家' : '已投弃权票',
      });

      // 刷新投票记录
      await fetchVotes(currentSession.id);
      return true;
    } catch (error) {
      console.error('投票失败:', error);
      toast({
        title: '投票失败',
        description: error.message || '请检查投票权限或网络连接',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSession, toast, fetchVotes]);

  // 计算投票结果
  const calculateResults = useCallback(async (sessionId?: string) => {
    const targetSessionId = sessionId || currentSession?.id;
    if (!targetSessionId) {
      toast({
        title: '计算结果失败',
        description: '没有指定的投票会话',
        variant: 'destructive',
      });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase.rpc('calculate_voting_results', {
        p_voting_session_id: targetSessionId
      });

      if (error) throw error;

      // 刷新结果
      await fetchResults(targetSessionId);
      
      toast({
        title: '投票结果已计算',
        description: '投票统计完成',
      });

      return true;
    } catch (error) {
      console.error('计算投票结果失败:', error);
      toast({
        title: '计算结果失败',
        description: '请重试或联系管理员',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSession, toast, fetchResults]);

  // 处理投票结果
  const processResult = useCallback(async (resultId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('process_voting_result', {
        p_voting_result_id: resultId
      });

      if (error) throw error;

      toast({
        title: '投票结果已处理',
        description: '玩家状态已更新',
      });

      // 刷新结果状态
      if (currentSession) {
        await fetchResults(currentSession.id);
      }

      return data;
    } catch (error) {
      console.error('处理投票结果失败:', error);
      toast({
        title: '处理结果失败',
        description: '请重试或联系管理员',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSession, toast, fetchResults]);

  // 获取用户在当前会话的投票
  const getUserVote = useCallback((userId: string): Vote | null => {
    return votes.find(vote => vote.voter_id === userId) || null;
  }, [votes]);

  // 获取某个目标的得票数
  const getTargetVoteCount = useCallback((targetId: string): number => {
    return votes.filter(vote => vote.target_id === targetId && vote.is_valid).length;
  }, [votes]);

  // 实时监听投票会话变化
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`voting-session-${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voting_sessions',
          filter: `game_state_id=eq.${gameStateId}`
        },
        () => fetchCurrentSession()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId, fetchCurrentSession]);

  // 实时监听投票变化
  useEffect(() => {
    if (!currentSession) return;

    const channel = supabase
      .channel(`votes-${currentSession.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
          filter: `voting_session_id=eq.${currentSession.id}`
        },
        () => fetchVotes(currentSession.id)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentSession, fetchVotes]);

  // 实时监听投票结果变化
  useEffect(() => {
    if (!currentSession) return;

    const channel = supabase
      .channel(`voting-results-${currentSession.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voting_results',
          filter: `voting_session_id=eq.${currentSession.id}`
        },
        () => fetchResults(currentSession.id)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentSession, fetchResults]);

  // 初始化数据
  useEffect(() => {
    fetchCurrentSession();
  }, [fetchCurrentSession]);

  // 当投票会话变化时，获取相关数据
  useEffect(() => {
    if (currentSession) {
      fetchVotes(currentSession.id);
      fetchResults(currentSession.id);
    }
  }, [currentSession, fetchVotes, fetchResults]);

  return {
    currentSession,
    votes,
    results,
    loading,
    createVotingSession,
    castVote,
    calculateResults,
    processResult,
    getUserVote,
    getTargetVoteCount,
  };
};
