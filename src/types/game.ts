/**
 * 游戏核心类型定义
 * 统一导出角色、玩家、游戏状态、投票等核心实体类型
 */

import { Tables } from '@/integrations/supabase/types';

export type RoleDesign = Tables<'role_design'>;

export interface Player {
  id: string;
  name: string;
  userId?: string;
  isAI: boolean;
  isReady: boolean;
  role?: string;
}

export interface GameState {
  id: string;
  roomId: string;
  status: 'waiting' | 'active' | 'paused' | 'ended';
  currentPhase: number; // 1=白天, 2=傍晚, 3=夜晚, 4=黎明
  currentRound: number;
  phaseStartTime: string;
  phaseEndTime: string | null;
  isPaused: boolean;
  pausedAt: string | null;
  totalPausedDuration: number;
  autoAdvance: boolean;
  phaseDuration: number;
  createdAt: string;
}

export interface GameSettings {
  id: string;
  roomId: string;
  isAutoAdvance: boolean;
  dayDuration: number;
  eveningDuration: number;
  nightDuration: number;
  dawnDuration: number;
}
