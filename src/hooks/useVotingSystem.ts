import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VotingService } from '@/services/votingService';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';

const logger = createLogger('voting-system');

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
  const [currentSession, setCurrentSession] = useState<VotingSession | null>(
    null
  );
  const [votes, setVotes] = useState<Vote[]>([]);
  const [results, setResults] = useState<VotingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { requireAuth } = useAuth();

  // 获取当前投票会话
  const fetchCurrentSession = useCallback(
    async (roundNumber?: number, phase?: number) => {
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
        logger.error('获取投票会话失败', {
          error,
          gameStateId,
          roundNumber,
          phase,
        });
        return null;
      }
    },
    [gameStateId]
  );

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
      logger.error('获取投票记录失败', { error, sessionId });
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
      logger.error('获取投票结果失败', { error, sessionId });
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
          filter: `game_state_id=eq.${gameStateId}`,
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
          filter: `voting_session_id=eq.${currentSession.id}`,
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
          filter: `voting_session_id=eq.${currentSession.id}`,
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
  const createVotingSession = useCallback(
    async (
      roundNumber: number,
      phase: number,
      sessionType: string = 'day_vote'
    ) => {
      // 检查认证状态
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !gameStateId) {
        console.error('User not authenticated or gameStateId missing', {
          user: !!user,
          gameStateId,
        });
        return null;
      }

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
        const sessionId = await VotingService.createVotingSession(
          gameStateId,
          roomId,
          roundNumber,
          phase,
          sessionType
        );

        // 获取新创建的会话
        await fetchCurrentSession(roundNumber, phase);

        toast({
          title: t('hook.vote.session_started_title'),
          description: t('hook.vote.session_started_desc'),
        });

        return sessionId;
      } catch (error) {
        console.error('Failed to create voting session:', error);

        // 检查是否是权限问题
        if (error instanceof Error) {
          if (error.message.includes('Authentication required')) {
            console.error(
              'User not authenticated, cannot create voting session'
            );
            toast({
              title: t('hook.vote.auth_failed_title'),
              description: t('hook.vote.sign_in_required'),
              variant: 'destructive',
            });
          } else if (error.message.includes('not a participant')) {
            console.error('User is not a room participant');
            toast({
              title: t('hook.vote.not_participant_title'),
              description: t('hook.vote.not_participant_desc'),
              variant: 'destructive',
            });
          } else {
            toast({
              title: t('hook.vote.create_failed_title'),
              description: t('common.retry_later'),
              variant: 'destructive',
            });
          }
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [gameStateId, roomId, toast, t, requireAuth]
  );

  // 确保白天阶段投票会话存在
  const ensureDayVotingSession = useCallback(
    async (roundNumber: number, phase: number) => {
      if (!gameStateId || !roomId || phase !== 1) return;

      try {
        logger.debug('检查现有投票会话', { gameStateId, roundNumber, phase });

        // 检查是否已存在该轮次阶段的投票会话
        const existingSession = await fetchCurrentSession(roundNumber, phase);

        if (!existingSession) {
          logger.info('创建缺失的投票会话', {
            gameStateId,
            roomId,
            roundNumber,
            phase,
          });

          const sessionId = await createVotingSession(
            roundNumber,
            phase,
            'day_vote'
          );
          if (sessionId) {
            logger.info('投票会话创建成功', { sessionId });
            // 重新获取创建的会话
            await fetchCurrentSession(roundNumber, phase);
            toast({
              title: t('hook.vote.session_created_title'),
              description: t('hook.vote.session_created_desc', {
                round: roundNumber,
              }),
            });
          } else {
            logger.error('创建投票会话失败 - 未返回会话ID');
          }
        } else {
          logger.debug('找到现有投票会话', { sessionId: existingSession.id });
        }
      } catch (error) {
        logger.error('确保白天投票会话失败', {
          error,
          gameStateId,
          roundNumber,
          phase,
        });
      }
    },
    [gameStateId, roomId, fetchCurrentSession, createVotingSession, toast, t]
  );

  // 投票
  const castVote = useCallback(
    async (voterId: string, targetId?: string) => {
      if (!requireAuth() || !currentSession) return false;

      setLoading(true);
      try {
        await VotingService.castVote(currentSession.id, voterId, targetId);

        // Refresh the local vote list immediately so the UI reflects the vote
        // even when the real-time subscription is delayed or dropped.
        await fetchVotes(currentSession.id);

        toast({
          title: t('hook.vote.cast_success_title'),
          description: targetId
            ? t('hook.vote.cast_voted_desc')
            : t('hook.vote.cast_abstain_desc'),
        });

        return true;
      } catch (error) {
        logger.error('Vote failed', {
          error,
          voterId,
          targetId,
          sessionId: currentSession?.id,
        });
        toast({
          title: t('hook.vote.cast_failed_title'),
          description: t('common.retry_later'),
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentSession, fetchVotes, toast, t]
  );

  // 计算投票结果
  const calculateResults = useCallback(
    async (sessionId?: string) => {
      if (!requireAuth()) return false;
      const targetSessionId = sessionId || currentSession?.id;
      if (!targetSessionId) return false;

      setLoading(true);
      try {
        await VotingService.calculateVotingResults(targetSessionId);

        // Refresh votes and results immediately so the judge panel reflects
        // the computed outcome even when real-time subscriptions lag.
        await fetchVotes(targetSessionId);
        await fetchResults(targetSessionId);

        toast({
          title: t('hook.vote.results_calculated_title'),
          description: t('hook.vote.results_calculated_desc'),
        });

        return true;
      } catch (error) {
        logger.error('Failed to calculate vote results', {
          error,
          sessionId: targetSessionId,
        });
        toast({
          title: t('hook.vote.calculate_failed_title'),
          description: t('common.retry_later'),
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentSession, fetchVotes, fetchResults, toast, t]
  );

  // 处理投票结果
  const processResult = useCallback(
    async (resultId: string) => {
      if (!requireAuth()) return false;
      setLoading(true);
      try {
        await VotingService.processVotingResult(resultId);

        toast({
          title: t('hook.vote.result_processed_title'),
          description: t('hook.vote.result_processed_desc'),
        });

        return true;
      } catch (error) {
        logger.error('Failed to process vote result', { error, resultId });
        toast({
          title: t('hook.vote.process_failed_title'),
          description: t('common.retry_later'),
          variant: 'destructive',
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [toast, t]
  );

  // 获取用户投票
  const getUserVote = useCallback(
    (userId: string): Vote | null => {
      return votes.find(vote => vote.voter_id === userId) || null;
    },
    [votes]
  );

  // 获取目标得票数（使用权重）
  const getTargetVoteCount = useCallback(
    (targetId: string): number => {
      return votes
        .filter(vote => vote.target_id === targetId && vote.is_valid)
        .reduce((sum, vote) => sum + (vote.vote_weight || 1), 0);
    },
    [votes]
  );

  // 获取投票统计信息
  const getVotingSummary = useCallback(() => {
    const validVotes = votes.filter(v => v.is_valid);
    const abstentions = votes.filter(v => v.is_valid && !v.target_id).length;

    // 按目标分组统计投票
    const votesByTarget = validVotes.reduce(
      (acc, vote) => {
        if (vote.target_id) {
          acc[vote.target_id] = (acc[vote.target_id] || 0) + vote.vote_weight;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 获取详细的投票信息：谁投票给谁
    const voteDetails = validVotes.reduce(
      (acc, vote) => {
        const targetId = vote.target_id || 'abstention';
        if (!acc[targetId]) {
          acc[targetId] = [];
        }
        acc[targetId].push({
          voterId: vote.voter_id,
          voteTime: vote.vote_time,
          voteWeight: vote.vote_weight,
        });
        return acc;
      },
      {} as Record<
        string,
        Array<{ voterId: string; voteTime: string; voteWeight: number }>
      >
    );

    return {
      totalVotes: validVotes.length,
      abstentions,
      votesByTarget,
      voteDetails,
      hasVotes: validVotes.length > 0,
    };
  }, [votes]);

  // 获取投票给特定目标的玩家列表
  const getVotersForTarget = useCallback(
    (targetId: string) => {
      return votes
        .filter(vote => vote.is_valid && vote.target_id === targetId)
        .map(vote => ({
          voterId: vote.voter_id,
          voteTime: vote.vote_time,
          voteWeight: vote.vote_weight,
        }));
    },
    [votes]
  );

  // 增强的投票结果处理功能（从 useEnhancedVotingHandler 合并）
  const processEnhancedVotingResult = useCallback(
    async (
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
          logger.error('Failed to get vote results', {
            error: resultsError,
            sessionId,
          });
          toast({
            title: t('hook.vote.process_error_title'),
            description: t('hook.vote.process_error_desc'),
            variant: 'destructive',
          });
          return false;
        }

        if (!votingResults || votingResults.length === 0) {
          toast({
            title: t('hook.vote.no_pending_title'),
            description: t('hook.vote.no_pending_desc'),
          });
          return true;
        }

        // 处理每个投票结果
        let allSuccess = true;
        for (const result of votingResults) {
          try {
            const { error: processError } = await supabase.rpc(
              'process_voting_result',
              {
                p_voting_result_id: result.id,
              }
            );

            if (processError) {
              logger.error('Failed to process vote result', {
                error: processError,
                resultId: result.id,
              });
              allSuccess = false;
            }
          } catch (error) {
            logger.error('Exception processing vote result', {
              error,
              resultId: result.id,
            });
            allSuccess = false;
          }
        }

        if (allSuccess) {
          toast({
            title: t('hook.vote.all_processed_title'),
            description: t('hook.vote.all_processed_desc'),
          });
        } else {
          toast({
            title: t('hook.vote.partial_failed_title'),
            description: t('hook.vote.partial_failed_desc'),
            variant: 'destructive',
          });
        }

        return allSuccess;
      } catch (error) {
        logger.error('Error processing enhanced vote result', {
          error,
          sessionId,
          roomId,
          gameStateId,
        });
        toast({
          title: t('hook.vote.process_system_error_title'),
          description: t('hook.vote.process_system_error_desc'),
          variant: 'destructive',
        });
        return false;
      }
    },
    [toast, t]
  );

  // 计算并处理投票结果
  const calculateAndProcessResults = useCallback(
    async (
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
        return await processEnhancedVotingResult(
          sessionId,
          roomId,
          gameStateId
        );
      } catch (error) {
        logger.error('Error calculating and processing vote results', {
          error,
          sessionId,
          roomId,
          gameStateId,
        });
        toast({
          title: t('hook.vote.handle_error_title'),
          description: t('hook.vote.handle_error_desc'),
          variant: 'destructive',
        });
        return false;
      }
    },
    [calculateResults, processEnhancedVotingResult, toast, t]
  );

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
