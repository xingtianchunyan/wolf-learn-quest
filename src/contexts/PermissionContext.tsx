import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
// 新增：从路由参数自动解析 roomId，避免未传递 roomId 时权限判断失效
import { useParams } from 'react-router-dom';

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
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

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

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children, roomId }) => {
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
    loading: true
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
        loading: false
      });
      return;
    }

    setPermissions(prev => ({ ...prev, loading: true }));

    try {
      // 并行查询房间信息、玩家状态、角色状态、游戏状态
      const [roomData, playerData, roleStateData, gameStateData] = await Promise.all([
        supabase.from('rooms').select('judge_user_id').eq('id', effectiveRoomId).single(),
        supabase.from('room_players').select('id').eq('room_id', effectiveRoomId).eq('user_id', currentUser.id).single(),
        supabase.from('role_states').select('role_status, status_effects').eq('room_id', effectiveRoomId).eq('user_id', currentUser.id).single(),
        supabase.from('game_states').select('current_phase, status').eq('room_id', effectiveRoomId).single()
      ]);

      const isJudge = roomData.data?.judge_user_id === currentUser.id;
      const isRoomParticipant = !!playerData.data || isJudge;
      
      // 基于角色状态和游戏阶段计算权限
      const statusEffects = roleStateData.data?.status_effects || {};
      const roleStatus = roleStateData.data?.role_status || 1;
      const currentPhase = gameStateData.data?.current_phase || 1;
      const gameStatus = gameStateData.data?.status || 'waiting';

      // 基本权限从角色状态效果中获取 (处理JSONB类型)
      const effects = statusEffects as any || {};
      const canVote = Boolean(effects.can_vote) && gameStatus === 'active' && (currentPhase === 1 || currentPhase === 2); // 白天或黄昏
      const canUseSkill = Boolean(effects.can_use_skill) && gameStatus === 'active' && (currentPhase === 3 || currentPhase === 4); // 夜晚或黎明
      const canAnswerQuestions = Boolean(effects.can_answer_questions) && gameStatus === 'active';
      const canChat = Boolean(effects.can_chat) && gameStatus === 'active';

      setPermissions({
        isJudge,
        isRoomParticipant,
        canVote: canVote || isJudge, // 法官总是可以操作
        canUseSkill: canUseSkill || isJudge,
        canAnswerQuestions: canAnswerQuestions || isJudge,
        canChat: canChat || isJudge,
        loading: false
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
        loading: false
      });
    }
  };

  useEffect(() => {
    if (!initializing) {
      checkPermissions();
    }
  }, [effectiveRoomId, currentUser?.id, isLoggedIn, initializing]);

  // 实时监听权限变化
  useEffect(() => {
    if (!effectiveRoomId || !currentUser?.id) return;

    const channel = supabase
      .channel(`permissions_${effectiveRoomId}_${currentUser.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'role_states', filter: `room_id=eq.${effectiveRoomId}` }, () => {
        checkPermissions();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'game_states', filter: `room_id=eq.${effectiveRoomId}` }, () => {
        checkPermissions();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${effectiveRoomId}` }, () => {
        checkPermissions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [effectiveRoomId, currentUser?.id]);

  const value: PermissionContextType = {
    ...permissions,
    refreshPermissions: checkPermissions,
    requireAuth
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};