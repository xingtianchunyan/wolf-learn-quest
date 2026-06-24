import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGameState } from './useGameState';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

export interface VoteRecord {
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
}

// 帮助函数：通过用户ID获取玩家名称
const getPlayerNames = async (
  userIds: string[]
): Promise<Map<string, string>> => {
  if (userIds.length === 0) {
    return new Map();
  }
  const { data, error } = await supabase.rpc(
    'get_public_user_profiles_by_ids',
    { p_user_ids: userIds }
  );

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

export const useVoteResults = (roomId: string) => {
  const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { gameState } = useGameState(roomId);

  const fetchVoteResults = useCallback(async () => {
    if (
      !roomId ||
      !gameState ||
      gameState.status === 'waiting' ||
      gameState.status === 'ended'
    ) {
      setVoteRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      // 获取当前活跃的投票会话
      const { data: votingSessions, error: sessionError } = await supabase
        .from('voting_sessions')
        .select('id')
        .eq('room_id', roomId)
        .eq('game_state_id', gameState.id)
        .eq('round_number', gameState.currentRound)
        .eq('phase', gameState.currentPhase)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);

      if (sessionError) {
        console.error('获取投票会话失败:', sessionError);
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      if (!votingSessions || votingSessions.length === 0) {
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      const currentSessionId = votingSessions[0].id;

      // 获取投票记录
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('voter_id, target_id')
        .eq('voting_session_id', currentSessionId)
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

      // 聚合投票结果并收集所有玩家ID
      const allPlayerIds = new Set<string>();
      const voteCounts: Record<string, { voters: string[] }> = {};

      votes.forEach(vote => {
        if (vote.target_id && vote.voter_id) {
          if (!voteCounts[vote.target_id]) {
            voteCounts[vote.target_id] = { voters: [] };
          }
          voteCounts[vote.target_id].voters.push(vote.voter_id);
          allPlayerIds.add(vote.target_id);
          allPlayerIds.add(vote.voter_id);
        }
      });

      // 获取玩家名称
      const playerNamesMap = await getPlayerNames(Array.from(allPlayerIds));

      // 格式化投票记录
      const formattedRecords: VoteRecord[] = Object.entries(voteCounts).map(
        ([votedPlayerId, { voters }]) => {
          return {
            votedPlayerId,
            votedPlayerName: playerNamesMap.get(votedPlayerId) || t('common.unknown_player'),
            voteCount: voters.length,
            voters: voters.map(
              voterId => playerNamesMap.get(voterId) || t('common.unknown_player')
            ),
          };
        }
      );

      // 按票数降序排序
      formattedRecords.sort((a, b) => b.voteCount - a.voteCount);

      setVoteRecords(formattedRecords);
    } catch (error) {
      console.error('处理投票结果时出错:', error);
    } finally {
      setLoading(false);
    }
  }, [roomId, gameState, t]);

  useEffect(() => {
    fetchVoteResults();
  }, [fetchVoteResults]);

  // 设置实时订阅
  useEffect(() => {
    const channel = supabase
      .channel(`votes-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'votes',
        },
        () => {
          fetchVoteResults();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'votes',
        },
        () => {
          fetchVoteResults();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, fetchVoteResults]);

  return { voteRecords, loading };
};
