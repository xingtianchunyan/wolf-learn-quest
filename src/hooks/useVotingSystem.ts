
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VotingService } from '@/services/votingService';
import { useAuth } from '@/providers/AuthProvider';

export interface VotingSession {
  id: string;
  game_state_id: string;
  room_id: string;
  round_number: number;
  phase: number;
  session_type: string;
  status: string;
  start_time: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Vote {
  id: string;
  voting_session_id: string;
  voter_id: string;
  target_id?: string;
  vote_time: string;
  is_valid: boolean;
  vote_weight: number;
  created_at?: string;
}

export interface VotingResult {
  id: string;
  voting_session_id: string;
  target_id?: string;
  total_votes: number;
  vote_percentage?: number;
  is_majority: boolean;
  is_tied: boolean;
  result_type: string;
  processing_status: string;
  processed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export const useVotingSystem = (gameStateId?: string, roomId?: string) => {
  const [currentSession, setCurrentSession] = useState<VotingSession | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [results, setResults] = useState<VotingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { requireAuth } = useAuth();

  // 获取当前投票会话
  const fetchCurrentSession = useCallback(async (roundNumber?: number, phase?: number) => {
    if (!gameStateId) return;

    try {
      // 如果提供了轮次和阶段，先检查是否已存在该轮次阶段的投票会话
      if (roundNumber && phase) {
        const { data: existingData, error: existingError } = await supabase
          .from('voting_sessions')
          .select('*')
          .eq('game_state_id', gameStateId)
          .eq('round_number', roundNumber)
          .eq('phase', phase)
          .order('created_at', { ascending: false })
          .limit(1);

        if (existingError) throw existingError;
        if (existingData && existingData.length > 0) {
          setCurrentSession(existingData[0]);
          return existingData[0];
        }
      }

      // 否则获取当前活跃的投票会话
      const { data, error } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('game_state_id', gameStateId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      const session = data?.[0] || null;
      setCurrentSession(session);
      return session;
    } catch (error) {
      console.error('Error fetching voting session:', error);
      return null;
    }
  }, [gameStateId]);


  // 获取投票记录
  const fetchVotes = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('voting_session_id', sessionId)
        .order('vote_time', { ascending: true });

      if (error) throw error;
      setVotes(data || []);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  }, []);

  // 获取投票结果
  const fetchResults = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('voting_results')
        .select('*')
        .eq('voting_session_id', sessionId)
        .order('total_votes', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching voting results:', error);
    }
  }, []);

  // 监听实时更新
  useEffect(() => {
    if (!gameStateId) return;

    fetchCurrentSession();

    const sessionChannel = supabase
      .channel(`voting_sessions_${gameStateId}`)
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
      supabase.removeChannel(sessionChannel);
    };
  }, [gameStateId, fetchCurrentSession]);

  useEffect(() => {
    if (!currentSession) return;

    fetchVotes(currentSession.id);
    fetchResults(currentSession.id);

    const votesChannel = supabase
      .channel(`votes_${currentSession.id}`)
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

    const resultsChannel = supabase
      .channel(`results_${currentSession.id}`)
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
      supabase.removeChannel(votesChannel);
      supabase.removeChannel(resultsChannel);
    };
  }, [currentSession, fetchVotes, fetchResults]);

  // 创建投票会话
  const createVotingSession = useCallback(async (
    roundNumber: number,
    phase: number,
    sessionType: string = 'day_vote'
  ) => {
    // 检查认证状态
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !gameStateId) {
      console.error('User not authenticated or gameStateId missing', { user: !!user, gameStateId });
      return null;
    }

    console.log('Creating voting session with params:', {
      gameStateId,
      roomId,
      roundNumber,
      phase,
      sessionType,
      userId: user.id
    });

    // 先检查是否已存在该轮次阶段的投票会话
    try {
      const { data: existingData, error: existingError } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('game_state_id', gameStateId)
        .eq('round_number', roundNumber)
        .eq('phase', phase)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingError) throw existingError;
      
      if (existingData && existingData.length > 0) {
        // 如果已存在，直接返回现有会话
        setCurrentSession(existingData[0]);
        return existingData[0].id;
      }
    } catch (error) {
      console.error('Error checking existing voting session:', error);
    }

    setLoading(true);
    try {
      console.log('Calling create_voting_session RPC with:', {
        p_game_state_id: gameStateId,
        p_room_id: roomId,
        p_round_number: roundNumber,
        p_phase: phase,
        p_session_type: sessionType
      });
      
      const sessionId = await VotingService.createVotingSession(
        gameStateId,
        roomId,
        roundNumber,
        phase,
        sessionType
      );
      
      console.log('Voting session created successfully:', sessionId);
      
      // 获取新创建的会话
      await fetchCurrentSession(roundNumber, phase);

      toast({
        title: '投票开始',
        description: '新的投票会话已创建',
      });

      return sessionId;
    } catch (error) {
      console.error('Failed to create voting session:', error);
      
      // 检查是否是权限问题
      if (error instanceof Error) {
        if (error.message.includes('Authentication required')) {
          console.error('用户未认证，无法创建投票会话');
          toast({
            title: '认证失败',
            description: '请先登录后再试',
            variant: 'destructive',
          });
        } else if (error.message.includes('not a participant')) {
          console.error('用户不是房间参与者，无法创建投票会话');
          toast({
            title: '权限不足',
            description: '您不是房间参与者，无法创建投票会话',
            variant: 'destructive',
          });
        } else {
          toast({
            title: '创建投票会话失败',
            description: '请重试',
            variant: 'destructive',
          });
        }
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameStateId, roomId, toast, requireAuth]);

  // 确保白天阶段投票会话存在
  const ensureDayVotingSession = useCallback(async (roundNumber: number, phase: number) => {
    if (!gameStateId || !roomId || phase !== 1) return;

    try {
      console.log('Checking for existing voting session:', { gameStateId, roundNumber, phase });
      
      // 检查是否已存在该轮次阶段的投票会话
      const existingSession = await fetchCurrentSession(roundNumber, phase);
      
      if (!existingSession) {
        console.log(`Creating missing voting session for round ${roundNumber}, phase ${phase}`, {
          gameStateId,
          roomId,
          roundNumber,
          phase
        });
        
        const sessionId = await createVotingSession(roundNumber, phase, 'day_vote');
        if (sessionId) {
          console.log('Voting session created successfully:', sessionId);
          // 重新获取创建的会话
          await fetchCurrentSession(roundNumber, phase);
          toast({
            title: '投票会话已创建',
            description: `第${roundNumber}轮白天投票已开始`,
          });
        } else {
          console.error('Failed to create voting session - no session ID returned');
        }
      } else {
        console.log('Existing voting session found:', existingSession);
      }
    } catch (error) {
      console.error('Error ensuring day voting session:', error);
    }
  }, [gameStateId, roomId, fetchCurrentSession, createVotingSession, toast]);

  // 投票
  const castVote = useCallback(async (
    voterId: string,
    targetId?: string
  ) => {
    if (!requireAuth() || !currentSession) return false;

    setLoading(true);
    try {
      await VotingService.castVote(
        currentSession.id,
        voterId,
        targetId
      );

      toast({
        title: '投票成功',
        description: targetId ? '您已成功投票' : '您已弃权',
      });

      return true;
    } catch (error) {
      console.error('Error casting vote:', error);
      toast({
        title: '投票失败',
        description: '请重试',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSession, toast]);

  // 计算投票结果
  const calculateResults = useCallback(async (sessionId?: string) => {
    if (!requireAuth()) return false;
    const targetSessionId = sessionId || currentSession?.id;
    if (!targetSessionId) return false;

    setLoading(true);
    try {
      await VotingService.calculateVotingResults(targetSessionId);

      toast({
        title: '投票结果已计算',
        description: '投票结果统计完成',
      });

      return true;
    } catch (error) {
      console.error('Error calculating results:', error);
      toast({
        title: '计算投票结果失败',
        description: '请重试',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSession, toast]);

  // 处理投票结果
  const processResult = useCallback(async (resultId: string) => {
    if (!requireAuth()) return false;
    setLoading(true);
    try {
      await VotingService.processVotingResult(resultId);

      toast({
        title: '投票结果处理完成',
        description: '玩家状态已更新',
      });

      return true;
    } catch (error) {
      console.error('Error processing result:', error);
      toast({
        title: '处理投票结果失败',
        description: '请重试',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 获取用户投票
  const getUserVote = useCallback((userId: string): Vote | null => {
    return votes.find(vote => vote.voter_id === userId) || null;
  }, [votes]);

  // 获取目标得票数（使用权重）
  const getTargetVoteCount = useCallback((targetId: string): number => {
    return votes
      .filter(vote => vote.target_id === targetId && vote.is_valid)
      .reduce((sum, vote) => sum + (vote.vote_weight || 1), 0);
  }, [votes]);

  // 获取投票统计信息
  const getVotingSummary = useCallback(() => {
    const validVotes = votes.filter(v => v.is_valid);
    const abstentions = votes.filter(v => v.is_valid && !v.target_id).length;
    
    // 按目标分组统计投票
    const votesByTarget = validVotes.reduce((acc, vote) => {
      if (vote.target_id) {
        acc[vote.target_id] = (acc[vote.target_id] || 0) + vote.vote_weight;
      }
      return acc;
    }, {} as Record<string, number>);

    // 获取详细的投票信息：谁投票给谁
    const voteDetails = validVotes.reduce((acc, vote) => {
      const targetId = vote.target_id || 'abstention';
      if (!acc[targetId]) {
        acc[targetId] = [];
      }
      acc[targetId].push({
        voterId: vote.voter_id,
        voteTime: vote.vote_time,
        voteWeight: vote.vote_weight
      });
      return acc;
    }, {} as Record<string, Array<{voterId: string, voteTime: string, voteWeight: number}>>);

    return {
      totalVotes: validVotes.length,
      abstentions,
      votesByTarget,
      voteDetails,
      hasVotes: validVotes.length > 0
    };
  }, [votes]);

  // 获取投票给特定目标的玩家列表
  const getVotersForTarget = useCallback((targetId: string) => {
    return votes
      .filter(vote => vote.is_valid && vote.target_id === targetId)
      .map(vote => ({
        voterId: vote.voter_id,
        voteTime: vote.vote_time,
        voteWeight: vote.vote_weight
      }));
  }, [votes]);

  // 增强的投票结果处理功能（从 useEnhancedVotingHandler 合并）
  const processEnhancedVotingResult = useCallback(async (
    sessionId: string,
    roomId: string,
    gameStateId: string
  ): Promise<boolean> => {
    try {
      // 首先获取投票结果记录
      const { data: votingResults, error: resultsError } = await supabase
        .from('voting_results')
        .select('id, result_type, target_id, processing_status')
        .eq('voting_session_id', sessionId)
        .eq('processing_status', 'pending');

      if (resultsError) {
        console.error('获取投票结果失败:', resultsError);
        toast({
          title: '处理失败',
          description: '无法获取投票结果',
          variant: 'destructive',
        });
        return false;
      }

      if (!votingResults || votingResults.length === 0) {
        toast({
          title: '无需处理',
          description: '没有待处理的投票结果',
        });
        return true;
      }

      // 处理每个投票结果
      let allSuccess = true;
      for (const result of votingResults) {
        try {
          const { error: processError } = await supabase.rpc('process_voting_result', {
            p_voting_result_id: result.id
          });

          if (processError) {
            console.error(`处理投票结果 ${result.id} 失败:`, processError);
            allSuccess = false;
          }
        } catch (error) {
          console.error(`处理投票结果 ${result.id} 异常:`, error);
          allSuccess = false;
        }
      }

      if (allSuccess) {
        toast({
          title: '投票结果处理完成',
          description: '所有投票结果已按照游戏规则处理完成',
        });
      } else {
        toast({
          title: '部分处理失败',
          description: '某些投票结果处理时发生错误',
          variant: 'destructive',
        });
      }

      return allSuccess;
    } catch (error) {
      console.error('处理增强投票结果时发生错误:', error);
      toast({
        title: '投票结果处理错误',
        description: '系统错误，请联系管理员',
        variant: 'destructive',
      });
      return false;
    }
  }, [toast]);

  // 计算并处理投票结果
  const calculateAndProcessResults = useCallback(async (
    sessionId: string,
    roomId: string,
    gameStateId: string
  ): Promise<boolean> => {
    try {
      // 1. 先计算投票结果
      if (calculateResults) {
        await calculateResults(sessionId);
        
        // 等待一小段时间确保数据库更新完成
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 2. 然后处理投票结果
      return await processEnhancedVotingResult(sessionId, roomId, gameStateId);
    } catch (error) {
      console.error('计算并处理投票结果时发生错误:', error);
      toast({
        title: '投票处理错误',
        description: '计算或处理投票结果时发生错误',
        variant: 'destructive',
      });
      return false;
    }
  }, [calculateResults, processEnhancedVotingResult, toast]);

  return {
    currentSession,
    votes,
    results,
    loading,
    createVotingSession,
    castVote,
    calculateResults,
    calculateVotingResults: calculateResults, // 添加别名以保持兼容性
    processResult,
    getUserVote,
    getTargetVoteCount,
    getVotingSummary,
    getVotersForTarget,
    fetchCurrentSession,
    ensureDayVotingSession,
    // 新增的增强功能
    processEnhancedVotingResult,
    calculateAndProcessResults,
  };
};
