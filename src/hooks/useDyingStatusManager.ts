/**
 * 濒死状态管理Hook
 * 处理濒死状态的监听、转换和管理
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleStates } from './useRoleStates';
import { DyingStatusService, DyingResolutionType } from '@/services/dyingStatusService';
import { ROLE_STATUS } from '@/utils/roleStateHelpers';
import { useToast } from '@/hooks/use-toast';

interface DyingPlayer {
  userId: string;
  userName: string;
  userAvatar?: string;
  dyingReason?: string;
  dyingRound?: number;
  dyingPhase?: string;
  statusEffects?: any;
}

export const useDyingStatusManager = (roomId: string | null | undefined, gameStateId: string | null | undefined) => {
  const { currentUser } = useAuth();
  const { roleStates } = useRoleStates(roomId);
  const { toast } = useToast();
  const [dyingPlayers, setDyingPlayers] = useState<DyingPlayer[]>([]);
  const [isResolving, setIsResolving] = useState<Record<string, boolean>>({});

  // 监听濒死状态变更
  useEffect(() => {
    if (!roleStates || roleStates.length === 0) {
      setDyingPlayers([]);
      return;
    }

    const dyingPlayersList: DyingPlayer[] = [];
    
    roleStates.forEach(roleState => {
      if (roleState.role_status === ROLE_STATUS.DYING) {
        dyingPlayersList.push({
          userId: roleState.user_id,
          userName: '', // 需要从其他地方获取用户名
          dyingReason: roleState.status_effects?.dying_reason,
          dyingRound: roleState.status_effects?.dying_round,
          dyingPhase: roleState.status_effects?.dying_phase,
          statusEffects: roleState.status_effects
        });
      }
    });

    setDyingPlayers(dyingPlayersList);
  }, [roleStates]);

  /**
   * 解除濒死状态
   */
  const resolveDyingStatus = useCallback(async (
    userId: string, 
    resolutionType: DyingResolutionType,
    userName?: string
  ): Promise<boolean> => {
    if (!gameStateId) {
      toast({
        title: '错误',
        description: '游戏状态ID不存在',
        variant: 'destructive',
      });
      return false;
    }

    setIsResolving(prev => ({ ...prev, [userId]: true }));

    try {
      const success = await DyingStatusService.resolveDyingStatus({
        userId,
        gameStateId,
        resolutionType
      });

      if (success) {
        const resolutionMessages = {
          [DyingResolutionType.PROTECTED]: '获得保护，恢复正常状态',
          [DyingResolutionType.ANSWER_CORRECT]: '答题正确，转为虚弱状态',
          [DyingResolutionType.ANSWER_WRONG]: '答题错误，已被淘汰'
        };

        toast({
          title: '状态更新成功',
          description: `${userName || '玩家'}${resolutionMessages[resolutionType]}`,
        });

        return true;
      } else {
        toast({
          title: '状态更新失败',
          description: '请稍后重试',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('解除濒死状态失败:', error);
      toast({
        title: '操作失败',
        description: '网络错误，请检查连接后重试',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsResolving(prev => ({ ...prev, [userId]: false }));
    }
  }, [gameStateId, toast]);

  /**
   * 通过保护解除濒死状态
   */
  const resolveByProtection = useCallback((userId: string, userName?: string) => {
    return resolveDyingStatus(userId, DyingResolutionType.PROTECTED, userName);
  }, [resolveDyingStatus]);

  /**
   * 通过答题结果解除濒死状态
   */
  const resolveByAnswer = useCallback((userId: string, isCorrect: boolean, userName?: string) => {
    const resolutionType = isCorrect ? DyingResolutionType.ANSWER_CORRECT : DyingResolutionType.ANSWER_WRONG;
    return resolveDyingStatus(userId, resolutionType, userName);
  }, [resolveDyingStatus]);

  /**
   * 检查用户是否处于濒死状态
   */
  const isPlayerDying = useCallback((userId: string): boolean => {
    return dyingPlayers.some(player => player.userId === userId);
  }, [dyingPlayers]);

  /**
   * 获取濒死玩家的详细信息
   */
  const getDyingPlayerInfo = useCallback((userId: string): DyingPlayer | null => {
    return dyingPlayers.find(player => player.userId === userId) || null;
  }, [dyingPlayers]);

  /**
   * 检查当前用户是否可以管理濒死状态（如是否为法官）
   */
  const canManageDyingStatus = useCallback((): boolean => {
    // 这里可以添加更复杂的权限检查逻辑
    return true; // 暂时返回true，实际应该检查法官权限
  }, []);

  return {
    dyingPlayers,
    isResolving,
    resolveDyingStatus,
    resolveByProtection,
    resolveByAnswer,
    isPlayerDying,
    getDyingPlayerInfo,
    canManageDyingStatus
  };
};