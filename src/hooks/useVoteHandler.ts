
import { useCallback } from 'react';
import { handleVoteResult } from '@/utils/voteResultHandler';
import { useToast } from '@/hooks/use-toast';

export const useVoteHandler = () => {
  const { toast } = useToast();

  const processVoteResult = useCallback(async (
    roomId: string, 
    gameStateId: string, 
    mostVotedPlayerId: string
  ) => {
    try {
      const success = await handleVoteResult(roomId, gameStateId, mostVotedPlayerId);
      
      if (success) {
        toast({
          title: "投票结果已处理",
          description: "玩家状态已更新",
        });
      } else {
        toast({
          title: "处理投票结果失败",
          description: "请检查网络连接或联系管理员",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('处理投票结果时出错:', error);
      toast({
        title: "处理投票结果时出错",
        description: "请重试或联系管理员",
        variant: "destructive",
      });
    }
  }, [toast]);

  return { processVoteResult };
};
