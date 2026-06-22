import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAuth } from '@/providers/AuthProvider';
// 新增：从路由参数自动解析 roomId，避免未传递 roomId 时权限判断失效
import { useParams } from 'react-router-dom';
import {
  enhancedPermissionSystem,
  type PermissionContext as SecurityPermissionContext,
} from '@/utils/enhancedPermissionSystem';
import {
  securityAuditService,
  SecurityEventType,
} from '@/services/securityAuditService';
import { useRoomData } from '@/hooks/useRoomData';

/**
 * 类型注释：权限名称
 * 当前上下文对外暴露字符串权限名，避免把仅存在于类型层的接口当作运行时枚举使用。
 */
type PermissionName = string;

export interface PermissionState {
  isJudge: boolean;
  isRoomParticipant: boolean;
  canVote: boolean;
  canUseSkill: boolean;
  canAnswerQuestions: boolean;
  canChat: boolean;
  loading: boolean;
}

interface PermissionContextType extends PermissionState {
  refreshPermissions: () => Promise<void>;
  requireAuth: () => boolean;
  checkEnhancedPermission: (
    permission: PermissionName,
    context?: Partial<SecurityPermissionContext>
  ) => Promise<boolean>;
  checkMultiplePermissions: (
    permissions: PermissionName[],
    context?: Partial<SecurityPermissionContext>
  ) => Promise<Record<PermissionName, boolean>>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export const usePermissions = (roomId?: string) => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: ReactNode;
  roomId?: string;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
  roomId,
}) => {
  const { currentUser, isLoggedIn, initializing, requireAuth } = useAuth();
  // 当未显式传入 roomId 时，自动从 URL 参数获取
  const params = useParams();
  const effectiveRoomId = roomId ?? params.id; // 可能为 undefined，后续逻辑已做防御

  const [permissions, setPermissions] = useState<PermissionState>({
    isJudge: false,
    isRoomParticipant: false,
    canVote: false,
    canUseSkill: false,
    canAnswerQuestions: false,
    canChat: false,
    loading: true,
  });

  // 统一数据层：房间、玩家、游戏状态、角色状态
  const {
    room,
    players,
    gameState,
    roleStates,
    loading: roomDataLoading,
  } = useRoomData(effectiveRoomId);

  /**
   * 函数级注释：构建增强权限系统所需上下文
   * 仅传入该系统真实支持的字段，其余房间相关信息统一放入 customContext。
   */
  const buildSecurityContext = (
    context?: Partial<SecurityPermissionContext>
  ): SecurityPermissionContext => ({
    ...context,
    userId: currentUser?.id ?? context?.userId ?? '',
    timestamp: context?.timestamp ?? Date.now(),
    customContext: {
      roomId: effectiveRoomId,
      gameId: effectiveRoomId,
      ...(context?.customContext ?? {}),
    },
  });

  const checkPermissions = async () => {
    if (!effectiveRoomId || !currentUser?.id || !isLoggedIn) {
      setPermissions({
        isJudge: false,
        isRoomParticipant: false,
        canVote: false,
        canUseSkill: false,
        canAnswerQuestions: false,
        canChat: false,
        loading: false,
      });
      return;
    }

    setPermissions(prev => ({ ...prev, loading: true }));

    try {
      // 记录权限检查开始
      await securityAuditService.recordSecurityEvent(
        SecurityEventType.PERMISSION_GRANTED,
        {
          userId: currentUser.id,
          description: '开始权限检查',
          metadata: {
            roomId: effectiveRoomId,
            action: 'permission_check_start',
          },
          source: 'permission_context',
        }
      );

      // 从统一数据层读取房间信息、玩家状态、角色状态、游戏状态
      const isJudge = room?.judge_user_id === currentUser.id;
      const isRoomParticipant =
        players.some(p => p.userId === currentUser.id) || isJudge;

      const currentRoleState = roleStates.find(
        rs => rs.user_id === currentUser.id
      );
      const statusEffects = currentRoleState?.status_effects || {};
      const currentPhase = gameState?.currentPhase || 1;
      const gameStatus = gameState?.status || 'waiting';
      const isActiveGame = gameStatus === 'active';
      const isVotePhase = currentPhase === 1 || currentPhase === 2;
      const isSkillPhase = currentPhase === 3 || currentPhase === 4;

      // 基本权限从角色状态效果中获取 (处理JSONB类型)
      const effects = (statusEffects as Record<string, unknown>) || {};
      const canVote =
        isJudge ||
        (isRoomParticipant && Boolean(effects.can_vote) && isActiveGame && isVotePhase);
      const canUseSkill =
        isJudge ||
        (isRoomParticipant &&
          Boolean(effects.can_use_skill) &&
          isActiveGame &&
          isSkillPhase);
      const canAnswerQuestions =
        isJudge ||
        (isRoomParticipant &&
          Boolean(effects.can_answer_questions) &&
          isActiveGame);
      const canChat =
        isJudge ||
        isRoomParticipant ||
        (Boolean(effects.can_chat) && isActiveGame);

      setPermissions({
        isJudge,
        isRoomParticipant,
        canVote,
        canUseSkill,
        canAnswerQuestions,
        canChat,
        loading: false,
      });

      // 记录权限检查完成
      await securityAuditService.recordSecurityEvent(
        SecurityEventType.PERMISSION_GRANTED,
        {
          userId: currentUser.id,
          description: '权限检查完成',
          metadata: {
            roomId: effectiveRoomId,
            permissions: {
              isJudge,
              isRoomParticipant,
              canVote,
              canUseSkill,
              canAnswerQuestions,
              canChat,
            },
            action: 'permission_check_complete',
          },
          source: 'permission_context',
        }
      );
    } catch (error) {
      console.error('Error checking permissions:', error);

      // 记录权限检查错误
      await securityAuditService.recordSecurityEvent(
        SecurityEventType.SYSTEM_ERROR,
        {
          userId: currentUser?.id,
          description: '权限检查失败',
          metadata: {
            roomId: effectiveRoomId,
            error: error instanceof Error ? error.message : 'Unknown error',
            action: 'permission_check_error',
          },
          source: 'permission_context',
        }
      );

      setPermissions({
        isJudge: false,
        isRoomParticipant: false,
        canVote: false,
        canUseSkill: false,
        canAnswerQuestions: false,
        canChat: false,
        loading: false,
      });
    }
  };

  // 数据变化时重新计算权限（统一数据层已负责实时订阅）
  useEffect(() => {
    if (!initializing && !roomDataLoading) {
      checkPermissions();
    }
  }, [
    effectiveRoomId,
    currentUser?.id,
    isLoggedIn,
    initializing,
    roomDataLoading,
    room,
    players,
    gameState,
    roleStates,
  ]);

  const checkEnhancedPermission = async (
    permission: PermissionName,
    context?: Partial<SecurityPermissionContext>
  ): Promise<boolean> => {
    try {
      if (!currentUser?.id) {
        return false;
      }

      return await enhancedPermissionSystem.checkPermission(
        currentUser.id,
        permission,
        effectiveRoomId,
        buildSecurityContext(context)
      );
    } catch (error) {
      console.error('Enhanced permission check failed:', error);
      return false;
    }
  };

  const checkMultiplePermissions = async (
    permissions: PermissionName[],
    context?: Partial<SecurityPermissionContext>
  ): Promise<Record<PermissionName, boolean>> => {
    try {
      const permissionResults = await Promise.all(
        permissions.map(async permission => [
          permission,
          await checkEnhancedPermission(permission, context),
        ] as const)
      );
      return Object.fromEntries(permissionResults);
    } catch (error) {
      console.error('Multiple permissions check failed:', error);
      const errorResults: Record<PermissionName, boolean> = {};
      permissions.forEach(perm => {
        errorResults[perm] = false;
      });
      return errorResults;
    }
  };

  const value: PermissionContextType = {
    ...permissions,
    refreshPermissions: checkPermissions,
    requireAuth,
    checkEnhancedPermission,
    checkMultiplePermissions,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};
