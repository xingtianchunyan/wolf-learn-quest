/**
 * 增强的投票结果处理服务
 * 实现优化的游戏状态处理逻辑，包括投票结果处理、平票处理机制和状态同步
 */
import { supabase } from '@/integrations/supabase/client';
import { SystemAnnouncementService } from './systemAnnouncementService';

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
  currentRound: number;
  currentPhase: number;
  resultType: VoteResultType;
  targetPlayerId?: string;
  targetPlayerName?: string;
  voteCount?: number;
  tiedPlayers?: Array<{
    playerId: string;
    playerName: string;
    voteCount: number;
  }>;
}

/**
 * 增强的投票结果处理服务类
 */
export class EnhancedVotingResultService {
  
  /**
   * 处理投票结果的主函数
   * @param sessionId 投票会话ID
   * @param roomId 房间ID
   * @param gameStateId 游戏状态ID
   * @returns Promise<boolean> 处理是否成功
   */
  static async processVotingResult(
    sessionId: string,
    roomId: string,
    gameStateId: string
  ): Promise<boolean> {
    try {
      // 1. 获取游戏状态信息
      const gameState = await this.getGameState(gameStateId);
      if (!gameState) {
        console.error('游戏状态不存在');
        return false;
      }

      // 2. 分析投票结果
      const resultData = await this.analyzeVotingResults(
        sessionId,
        roomId,
        gameStateId,
        gameState.currentRound,
        gameState.currentPhase
      );

      if (!resultData) {
        console.error('无法分析投票结果');
        return false;
      }

      // 3. 根据结果类型执行相应处理
      switch (resultData.resultType) {
        case VoteResultType.UNIQUE_WINNER:
          return await this.handleUniqueWinner(resultData);
        
        case VoteResultType.TIE:
          return await this.handleTieResult(resultData);
        
        case VoteResultType.NO_VOTES:
          return await this.handleNoVotes(resultData);
        
        default:
          console.error('未知的投票结果类型');
          return false;
      }
    } catch (error) {
      console.error('处理投票结果时发生错误:', error);
      return false;
    }
  }

  /**
   * 获取游戏状态信息
   * @param gameStateId 游戏状态ID
   * @returns 游戏状态数据
   */
  private static async getGameState(gameStateId: string) {
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
   * 分析投票结果
   * @param sessionId 投票会话ID
   * @param roomId 房间ID
   * @param gameStateId 游戏状态ID
   * @param currentRound 当前轮次
   * @param currentPhase 当前阶段
   * @returns 投票结果数据
   */
  private static async analyzeVotingResults(
    sessionId: string,
    roomId: string,
    gameStateId: string,
    currentRound: number,
    currentPhase: number
  ): Promise<VotingResultData | null> {
    try {
      // 获取投票统计结果
      const { data: votingResults, error } = await supabase
        .from('voting_results')
        .select(`
          *,
          voting_sessions!inner(
            room_id,
            game_state_id
          )
        `)
        .eq('voting_session_id', sessionId)
        .order('total_votes', { ascending: false });

      if (error) {
        console.error('获取投票结果失败:', error);
        return null;
      }

      if (!votingResults || votingResults.length === 0) {
        return {
          sessionId,
          roomId,
          gameStateId,
          currentRound,
          currentPhase,
          resultType: VoteResultType.NO_VOTES
        };
      }

      // 获取最高票数
      const maxVotes = votingResults[0].total_votes;
      
      // 找出所有最高票数的玩家
      const topVotedPlayers = votingResults.filter(result => result.total_votes === maxVotes);

      if (topVotedPlayers.length === 1) {
        // 唯一最高票数玩家
        const winner = topVotedPlayers[0];
        const playerInfo = await this.getPlayerInfo(winner.target_id);
        
        return {
          sessionId,
          roomId,
          gameStateId,
          currentRound,
          currentPhase,
          resultType: VoteResultType.UNIQUE_WINNER,
          targetPlayerId: winner.target_id,
          targetPlayerName: playerInfo?.name || '未知玩家',
          voteCount: winner.total_votes
        };
      } else {
        // 平票情况
        const tiedPlayersInfo = await Promise.all(
          topVotedPlayers.map(async (player) => {
            const playerInfo = await this.getPlayerInfo(player.target_id);
            return {
              playerId: player.target_id,
              playerName: playerInfo?.name || '未知玩家',
              voteCount: player.total_votes
            };
          })
        );

        return {
          sessionId,
          roomId,
          gameStateId,
          currentRound,
          currentPhase,
          resultType: VoteResultType.TIE,
          tiedPlayers: tiedPlayersInfo
        };
      }
    } catch (error) {
      console.error('分析投票结果时发生错误:', error);
      return null;
    }
  }

  /**
   * 获取玩家信息
   * @param userId 用户ID
   * @returns 玩家信息
   */
  private static async getPlayerInfo(userId: string) {
    const { data, error } = await supabase
      .from('room_participants')
      .select(`
        *,
        users!inner(
          id,
          name
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('获取玩家信息失败:', error);
      return null;
    }

    return data?.users;
  }

  /**
   * 处理唯一最高票数玩家
   * @param resultData 投票结果数据
   * @returns 处理是否成功
   */
  private static async handleUniqueWinner(resultData: VotingResultData): Promise<boolean> {
    try {
      if (!resultData.targetPlayerId) {
        console.error('目标玩家ID不存在');
        return false;
      }

      // 1. 将玩家状态变更为濒死状态 (role_status = 2)
      const { error: updateError } = await supabase
        .from('role_states')
        .update({
          role_status: 2, // 濒死状态
          updated_at: new Date().toISOString()
        })
        .eq('user_id', resultData.targetPlayerId)
        .eq('game_state_id', resultData.gameStateId);

      if (updateError) {
        console.error('更新玩家状态失败:', updateError);
        return false;
      }

      // 2. 发送系统公告
      await this.sendVotingResultAnnouncement(
        resultData.roomId,
        resultData.currentRound,
        resultData.currentPhase,
        `投票结果：${resultData.targetPlayerName} 获得 ${resultData.voteCount} 票，进入濒死状态`
      );

      console.log(`玩家 ${resultData.targetPlayerName} 被投票进入濒死状态`);
      return true;
    } catch (error) {
      console.error('处理唯一获胜者时发生错误:', error);
      return false;
    }
  }

  /**
   * 处理平票结果
   * @param resultData 投票结果数据
   * @returns 处理是否成功
   */
  private static async handleTieResult(resultData: VotingResultData): Promise<boolean> {
    try {
      // 1. 废弃当前投票会话
      const { error: sessionError } = await supabase
        .from('voting_sessions')
        .update({
          status: 'cancelled',
          end_time: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', resultData.sessionId);

      if (sessionError) {
        console.error('废弃投票会话失败:', sessionError);
        return false;
      }

      // 2. 发送平票公告
      const tiedPlayerNames = resultData.tiedPlayers?.map(p => p.playerName).join('、') || '';
      await this.sendVotingResultAnnouncement(
        resultData.roomId,
        resultData.currentRound,
        resultData.currentPhase,
        `因玩家得票数未出现唯一最大值，已完成的投票作废，将重新进行本轮白天阶段的投票。平票玩家：${tiedPlayerNames}`
      );

      // 3. 创建新的投票会话
      const newSessionResult = await this.createNewVotingSession(
        resultData.gameStateId,
        resultData.roomId,
        resultData.currentRound,
        resultData.currentPhase
      );

      if (!newSessionResult) {
        console.error('创建新投票会话失败');
        return false;
      }

      console.log('平票处理完成，已创建新的投票会话');
      return true;
    } catch (error) {
      console.error('处理平票结果时发生错误:', error);
      return false;
    }
  }

  /**
   * 处理无投票情况
   * @param resultData 投票结果数据
   * @returns 处理是否成功
   */
  private static async handleNoVotes(resultData: VotingResultData): Promise<boolean> {
    try {
      // 发送无投票公告
      await this.sendVotingResultAnnouncement(
        resultData.roomId,
        resultData.currentRound,
        resultData.currentPhase,
        '本轮投票无人获得选票，投票结束'
      );

      console.log('无投票情况处理完成');
      return true;
    } catch (error) {
      console.error('处理无投票情况时发生错误:', error);
      return false;
    }
  }

  /**
   * 创建新的投票会话
   * @param gameStateId 游戏状态ID
   * @param roomId 房间ID
   * @param roundNumber 轮次
   * @param phase 阶段
   * @returns 创建是否成功
   */
  private static async createNewVotingSession(
    gameStateId: string,
    roomId: string,
    roundNumber: number,
    phase: number
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('create_voting_session', {
          p_game_state_id: gameStateId,
          p_room_id: roomId,
          p_round_number: roundNumber,
          p_phase: phase,
          p_session_type: 'day_vote'
        });

      if (error) {
        console.error('创建投票会话失败:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('创建投票会话时发生错误:', error);
      return false;
    }
  }

  /**
   * 发送投票结果系统公告
   * @param roomId 房间ID
   * @param gameRound 游戏轮次
   * @param gamePhase 游戏阶段
   * @param message 公告消息
   */
  private static async sendVotingResultAnnouncement(
    roomId: string,
    gameRound: number,
    gamePhase: number,
    message: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          sender_id: 'system',
          message: message,
          chat_type: 'system',
          game_round: gameRound,
          game_phase: this.getPhaseString(gamePhase),
          metadata: {
            announcement_type: 'voting_result',
            visibility: {
              isVisibleToJudge: true,
              isVisibleToActor: false,
              isVisibleToTarget: false,
              isVisibleToWerewolves: false,
              isVisibleToRescuers: false,
              isVisibleToAll: true
            }
          }
        });

      if (error) {
        console.error('发送系统公告失败:', error);
      }
    } catch (error) {
      console.error('发送系统公告时发生错误:', error);
    }
  }

  /**
   * 获取阶段字符串
   * @param phase 阶段数字
   * @returns 阶段字符串
   */
  private static getPhaseString(phase: number): string {
    switch (phase) {
      case 1: return '白天';
      case 2: return '傍晚';
      case 3: return '夜晚';
      case 4: return '黎明';
      default: return '未知';
    }
  }

  /**
   * 检查投票会话是否可以处理结果
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

      if (error) {
        console.error('检查投票会话状态失败:', error);
        return false;
      }

      return data?.status === 'active';
    } catch (error) {
      console.error('检查投票会话时发生错误:', error);
      return false;
    }
  }
}