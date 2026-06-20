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
// 新增：集成增强的安全系统
import {
  enhancedPermissionSystem,
  type Permission,
  type Role,
  type PermissionContext as SecurityPermissionContext,
} from '@/utils/enhancedPermissionSystem';
import {
  securityAuditService,
  SecurityEventType,
} from '@/services/securityAuditService';
import { useRoomData } from '@/hooks/useRoomData';

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
  // 新增：增强的权限检查方法
  checkEnhancedPermission: (
    permission: Permission,
    context?: Partial<SecurityPermissionContext>
  ) => Promise<boolean>;
  checkMultiplePermissions: (
    permissions: Permission[],
    context?: Partial<SecurityPermissionContext>
  ) => Promise<Record<Permission, boolean>>;
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
      const roleStatus = currentRoleState?.role_status || 1;
      const currentPhase = gameState?.currentPhase || 1;
      const gameStatus = gameState?.status || 'waiting';

      // 创建安全权限上下文
      const securityContext: SecurityPermissionContext = {
        user: currentUser,
        userId: currentUser.id,
        roomId: effectiveRoomId,
        gameId: effectiveRoomId, // 使用 roomId 作为 gameId
        metadata: {
          isJudge,
          isRoomParticipant,
          roleStatus,
          currentPhase,
          gameStatus,
          statusEffects,
        },
      };

      // 使用增强的权限系统检查核心权限
      const [votePermission, skillPermission, chatPermission] =
        await Promise.all([
          enhancedPermissionSystem.checkPermission(
            Permission.VOTE,
            securityContext
          ),
          enhancedPermissionSystem.checkPermission(
            Permission.USE_SKILL,
            securityContext
          ),
          enhancedPermissionSystem.checkPermission(
            Permission.VIEW_GAME,
            securityContext
          ),
        ]);

      // 基本权限从角色状态效果中获取 (处理JSONB类型)
      const effects = (statusEffects as any) || {};
      const canVote =
        (Boolean(effects.can_vote) &&
          gameStatus === 'active' &&
          (currentPhase === 1 || currentPhase === 2)) ||
        votePermission.granted ||
        isJudge;
      const canUseSkill =
        (Boolean(effects.can_use_skill) &&
          gameStatus === 'active' &&
          (currentPhase === 3 || currentPhase === 4)) ||
        skillPermission.granted ||
        isJudge;
      const canAnswerQuestions =
        (Boolean(effects.can_answer_questions) && gameStatus === 'active') ||
        isJudge;
      const canChat =
        (Boolean(effects.can_chat) && gameStatus === 'active') ||
        chatPermission.granted ||
        isJudge;

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

  // 新增：增强的权限检查方法
  const checkEnhancedPermission = async (
    permission: Permission,
    context?: Partial<SecurityPermissionContext>
  ): Promise<boolean> => {
    try {
      const securityContext: SecurityPermissionContext = {
        user: currentUser,
        userId: currentUser?.id,
        roomId: effectiveRoomId,
        gameId: effectiveRoomId,
        ...context,
      };

      const result = await enhancedPermissionSystem.checkPermission(
        permission,
        securityContext
      );
      return result.granted;
    } catch (error) {
      console.error('Enhanced permission check failed:', error);
      return false;
    }
  };

  const checkMultiplePermissions = async (
    permissions: Permission[],
    context?: Partial<SecurityPermissionContext>
  ): Promise<Record<Permission, boolean>> => {
    try {
      const securityContext: SecurityPermissionContext = {
        user: currentUser,
        userId: currentUser?.id,
        roomId: effectiveRoomId,
        gameId: effectiveRoomId,
        ...context,
      };

      const results = await enhancedPermissionSystem.checkMultiplePermissions(
        permissions,
        securityContext
      );
      const booleanResults: Record<Permission, boolean> = {} as any;

      for (const [perm, result] of Object.entries(results)) {
        booleanResults[perm as Permission] = result.granted;
      }

      return booleanResults;
    } catch (error) {
      console.error('Multiple permissions check failed:', error);
      const errorResults: Record<Permission, boolean> = {} as any;
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
