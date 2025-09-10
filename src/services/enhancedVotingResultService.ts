/**
 * 增强的投票结果处理服务
 * 提供投票结果相关的辅助功能和数据查询
 * 注意：实际的投票结果处理现在由数据库函数 process_voting_result 完成
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * 投票结果类型枚举
 */
export enum VoteResultType {
  UNIQUE_WINNER = 'unique_winner',
  TIE = 'tie',
  NO_VOTES = 'no_votes'
}

/**
 * 投票结果数据接口
 */
export interface VotingResultData {
  sessionId: string;
  roomId: string;
  gameStateId: string;
  roundNumber: number;
  phase: number;
  resultType: VoteResultType;
  winnerUserId?: string;
  winnerName?: string;
  tiedPlayerIds?: string[];
  tiedPlayerNames?: string[];
  totalVotes: number;
  voteBreakdown: Record<string, number>;
}

/**
 * 增强的投票结果处理服务类
 * 注意：实际的投票结果处理现在由数据库函数 process_voting_result 完成
 */
export class EnhancedVotingResultService {
  /**
   * 获取游戏状态信息
   * @param gameStateId 游戏状态ID
   * @returns 游戏状态数据
   */
  static async getGameState(gameStateId: string) {
    const { data, error } = await supabase
      .from('game_states')
      .select('*')
      .eq('id', gameStateId)
      .single();

    if (error) {
      console.error('获取游戏状态失败:', error);
      return null;
    }

    return data;
  }

  /**
   * 分析投票结果（用于前端显示）
   * @param sessionId 投票会话ID
   * @param roomId 房间ID
   * @param gameStateId 游戏状态ID
   * @param roundNumber 回合数
   * @param phase 阶段
   * @returns 投票结果数据
   */
  static async analyzeVotingResults(
    sessionId: string,
    roomId: string,
    gameStateId: string,
    roundNumber: number,
    phase: number
  ): Promise<VotingResultData | null> {
    try {
      // 获取投票结果统计
      const { data: voteResults, error: voteError } = await supabase
        .from('voting_results')
        .select('*')
        .eq('voting_session_id', sessionId)
        .order('total_votes', { ascending: false });

      if (voteError) {
        console.error('获取投票结果失败:', voteError);
        return null;
      }

      if (!voteResults || voteResults.length === 0) {
        return {
          sessionId,
          roomId,
          gameStateId,
          roundNumber,
          phase,
          resultType: VoteResultType.NO_VOTES,
          totalVotes: 0,
          voteBreakdown: {}
        };
      }

      // 分析投票结果
      const maxVotes = voteResults[0].total_votes;
      const winners = voteResults.filter(result => result.total_votes === maxVotes);
      
      // 计算总票数和投票分布
      const totalVotes = voteResults.reduce((sum, result) => sum + result.total_votes, 0);
      const voteBreakdown = voteResults.reduce((acc, result) => {
        if (result.target_id) {
          acc[result.target_id] = result.total_votes;
        }
        return acc;
      }, {} as Record<string, number>);

      if (winners.length === 1 && winners[0].target_id) {
        // 唯一获胜者
        const winner = winners[0];
        const playerInfo = await this.getPlayerInfo(winner.target_id);
        
        return {
          sessionId,
          roomId,
          gameStateId,
          roundNumber,
          phase,
          resultType: VoteResultType.UNIQUE_WINNER,
          winnerUserId: winner.target_id,
          winnerName: playerInfo?.name || '未知玩家',
          totalVotes,
          voteBreakdown
        };
      } else if (winners.length > 1) {
        // 平票情况
        const tiedPlayerIds = winners
          .filter(w => w.target_id)
          .map(w => w.target_id!);
        
        const tiedPlayerNames = await Promise.all(
          tiedPlayerIds.map(async (playerId) => {
            const playerInfo = await this.getPlayerInfo(playerId);
            return playerInfo?.name || '未知玩家';
          })
        );

        return {
          sessionId,
          roomId,
          gameStateId,
          roundNumber,
          phase,
          resultType: VoteResultType.TIE,
          tiedPlayerIds,
          tiedPlayerNames,
          totalVotes,
          voteBreakdown
        };
      } else {
        // 无有效票数
        return {
          sessionId,
          roomId,
          gameStateId,
          roundNumber,
          phase,
          resultType: VoteResultType.NO_VOTES,
          totalVotes,
          voteBreakdown
        };
      }
    } catch (error) {
      console.error('分析投票结果时发生异常:', error);
      return null;
    }
  }

  /**
   * 获取玩家信息
   * @param userId 用户ID
   * @returns 玩家信息
   */
  static async getPlayerInfo(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('user_id, player_name')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('获取玩家信息失败:', error);
      return null;
    }

    return { name: data?.player_name, id: data?.user_id };
  }

  /**
   * 检查投票会话是否可以处理
   * @param sessionId 投票会话ID
   * @returns 是否可以处理
   */
  static async canProcessVotingSession(sessionId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('voting_sessions')
        .select('status')
        .eq('id', sessionId)
        .single();

      if (error || !data) {
        console.error('获取投票会话状态失败:', error);
        return false;
      }

      return data.status === 'active' || data.status === 'completed';
    } catch (error) {
      console.error('检查投票会话状态时发生异常:', error);
      return false;
    }
  }
}