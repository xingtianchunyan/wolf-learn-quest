import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGameState } from './useGameState';

export interface VoteRecord {
  id: string;
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
}

// 帮助函数：通过用户ID获取玩家名称
const getPlayerNames = async (userIds: string[]): Promise<Map<string, string>> => {
  if (userIds.length === 0) {
    return new Map();
  }
  const { data, error } = await supabase
    .from('users')
    .select('id, player_name')
    .in('id', userIds);

  if (error) {
    console.error('获取玩家名称失败:', error);
    return new Map();
  }

  const nameMap = new Map<string, string>();
  data.forEach(user => {
    if (user.id && user.player_name) {
      nameMap.set(user.id, user.player_name);
    }
  });
  return nameMap;
};

export const useVoteResults = (gameId: string | null) => {
  const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVoteResults = useCallback(async () => {
    if (!gameId) {
      setVoteRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      // 获取当前游戏的投票动作
      const { data: voteActions, error: actionsError } = await supabase
        .from('game_actions')
        .select('actor_id, target_id')
        .eq('game_id', gameId)
        .eq('action_type', 'vote');
      
      if (actionsError) {
        console.error('获取投票动作失败:', actionsError);
        setVoteRecords([]);
        setLoading(false);
        return;
      }
      
      if (!voteActions || voteActions.length === 0) {
        setVoteRecords([]);
        setLoading(false);
        return;
      }

      // 聚合投票结果并收集所有玩家ID
      const allPlayerIds = new Set<string>();
      const voteCounts: Record<string, {voters: string[]}> = {};
      
      voteActions.forEach(action => {
        if (action.target_id && action.actor_id) {
          if (!voteCounts[action.target_id]) {
            voteCounts[action.target_id] = { voters: [] };
          }
          voteCounts[action.target_id].voters.push(action.actor_id);
          allPlayerIds.add(action.target_id);
          allPlayerIds.add(action.actor_id);
        }
      });
      
      // 获取玩家名称
      const playerNamesMap = await getPlayerNames(Array.from(allPlayerIds));

      // 格式化投票记录
      const formattedRecords: VoteRecord[] = Object.entries(voteCounts).map(([votedPlayerId, {voters}]) => {
        return {
          id: votedPlayerId, // Use votedPlayerId as the id
          votedPlayerId: votedPlayerId,
          votedPlayerName: playerNamesMap.get(votedPlayerId) || '未知玩家',
          voteCount: voters.length,
          voters: voters.map(voterId => playerNamesMap.get(voterId) || '未知玩家'),
        };
      });

      // 按票数降序排序
      formattedRecords.sort((a, b) => b.voteCount - a.voteCount);

      setVoteRecords(formattedRecords);

    } catch (error) {
      console.error('处理投票结果时出错:', error);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchVoteResults();
  }, [fetchVoteResults]);

  // 设置实时订阅
  useEffect(() => {
    if (!gameId) return;

    const channel = supabase
      .channel(`game-actions-votes-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_actions',
        },
        (payload) => {
            const newAction = payload.new as { action_type: string };
            if (newAction.action_type === 'vote') {
                fetchVoteResults();
            }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, fetchVoteResults]);

  return { voteRecords, loading };
};
