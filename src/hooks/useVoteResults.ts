
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useGameState } from './useGameState';
import { useVotingActions } from './useVotingActions';

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

/**
 * @deprecated 请使用 useVotingActions 替代
 * 该 hook 将在未来版本中移除，建议迁移到新的投票系统
 */
export const useVoteResults = (roomId: string) => {
  const { gameState } = useGameState(roomId);
  
  // 使用新的投票系统
  const {
    voteRecords,
    loading,
    fetchVoteResults
  } = useVotingActions(roomId, gameState?.id || '');

  // 兼容性：保持原有的调用接口
  useEffect(() => {
    fetchVoteResults();
  }, [fetchVoteResults]);

  return { voteRecords, loading };
};
