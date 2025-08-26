
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGameState } from './useGameState';

export interface VoteRecord {
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

export const useVoteResults = (roomId: string) => {
  const [voteRecords, setVoteRecords] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { gameState } = useGameState(roomId);

  const fetchVoteResults = useCallback(async () => {
    if (!roomId || !gameState || gameState.status === 'waiting' || gameState.status === 'ended') {
      setVoteRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      // 使用 gameState.id 作为 game_id 来查询
      const gameId = gameState.id;

      // 获取当前回合和阶段的投票动作
      const { data: voteActions, error: actionsError } = await supabase
        .from('game_actions')
        .select('actor_id, target_id')
        .eq('game_id', gameId)
        .eq('round', gameState.currentRound)
        .eq('phase', gameState.currentPhase.toString()); // 转换为字符串
      
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
  }, [roomId, gameState]);

  useEffect(() => {
    fetchVoteResults();
  }, [fetchVoteResults]);

  // 设置实时订阅
  useEffect(() => {
    const channel = supabase
      .channel(`game-actions-votes-${roomId}`)
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
  }, [roomId, fetchVoteResults]);

  return { voteRecords, loading };
};
