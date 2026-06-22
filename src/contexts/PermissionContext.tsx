import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useParams } from 'react-router-dom';
import { useRoomData } from '@/hooks/useRoomData';

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
    context?: Record<string, unknown>
  ) => Promise<boolean>;
  checkMultiplePermissions: (
    permissions: PermissionName[],
    context?: Record<string, unknown>
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
  const params = useParams();
  const effectiveRoomId = roomId ?? params.id;

  const [permissions, setPermissions] = useState<PermissionState>({
    isJudge: false,
    isRoomParticipant: false,
    canVote: false,
    canUseSkill: false,
    canAnswerQuestions: false,
    canChat: false,
    loading: true,
  });

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

      const effects = (statusEffects as Record<string, unknown>) || {};
      const canVote =
        isJudge ||
        (isRoomParticipant &&
          Boolean(effects.can_vote) &&
          isActiveGame &&
          isVotePhase);
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
      const canChat = isJudge || isRoomParticipant || Boolean(effects.can_chat);

      setPermissions({
        isJudge,
        isRoomParticipant,
        canVote,
        canUseSkill,
        canAnswerQuestions,
        canChat,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking permissions:', error);
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
    context?: Record<string, unknown>
  ): Promise<boolean> => {
    if (!currentUser?.id) return false;

    // 简化实现：基于当前已计算的权限进行判断
    switch (permission) {
      case 'judge':
        return permissions.isJudge;
      case 'vote':
        return permissions.canVote;
      case 'use_skill':
        return permissions.canUseSkill;
      case 'answer_questions':
        return permissions.canAnswerQuestions;
      case 'chat':
        return permissions.canChat;
      case 'participate':
        return permissions.isRoomParticipant;
      default:
        // 未知权限默认放行，避免阻塞业务
        return true;
    }
  };

  const checkMultiplePermissions = async (
    permissionsToCheck: PermissionName[],
    context?: Record<string, unknown>
  ): Promise<Record<PermissionName, boolean>> => {
    const results: Record<PermissionName, boolean> = {};
    for (const permission of permissionsToCheck) {
      results[permission] = await checkEnhancedPermission(permission, context);
    }
    return results;
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
