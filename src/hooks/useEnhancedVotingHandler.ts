/**
 * 增强的投票处理Hook
 * 集成优化的投票结果处理逻辑，包括状态同步和平票重投机制
 */
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedVotingResultService } from '@/services/enhancedVotingResultService';
import { useVotingSystem } from '@/hooks/useVotingSystem';

/**
 * 增强投票处理Hook的返回类型
 */
export interface UseEnhancedVotingHandlerReturn {
  processEnhancedVotingResult: (
    sessionId: string,
    roomId: string,
    gameStateId: string
  ) => Promise<boolean>;
  calculateAndProcessResults: (
    sessionId: string,
    roomId: string,
    gameStateId: string
  ) => Promise<boolean>;
}

/**
 * 增强的投票处理Hook
 * @param gameStateId 游戏状态ID
 * @param roomId 房间ID
 * @returns 增强投票处理函数
 */
export const useEnhancedVotingHandler = (
  gameStateId?: string,
  roomId?: string
): UseEnhancedVotingHandlerReturn => {
  const { toast } = useToast();
  const { calculateResults } = useVotingSystem(gameStateId, roomId);

  /**
   * 处理增强的投票结果
   * @param sessionId 投票会话ID
   * @param roomId 房间ID
   * @param gameStateId 游戏状态ID
   * @returns 处理是否成功
   */
  const processEnhancedVotingResult = useCallback(async (
    sessionId: string,
    roomId: string,
    gameStateId: string
  ): Promise<boolean> => {
    try {
      // 检查投票会话是否可以处理
      const canProcess = await EnhancedVotingResultService.canProcessVotingSession(sessionId);
      if (!canProcess) {
        toast({
          title: '投票处理失败',
          description: '投票会话状态不允许处理结果',
          variant: 'destructive',
        });
        return false;
      }

      // 使用增强的投票结果处理服务
      const success = await EnhancedVotingResultService.processVotingResult(
        sessionId,
        roomId,
        gameStateId
      );

      if (success) {
        toast({
          title: '投票结果处理完成',
          description: '投票结果已按照游戏规则处理完成',
        });
      } else {
        toast({
          title: '投票结果处理失败',
          description: '处理投票结果时发生错误，请重试',
          variant: 'destructive',
        });
      }

      return success;
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

  /**
   * 计算并处理投票结果
   * @param sessionId 投票会话ID
   * @param roomId 房间ID
   * @param gameStateId 游戏状态ID
   * @returns 处理是否成功
   */
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
    processEnhancedVotingResult,
    calculateAndProcessResults
  };
};