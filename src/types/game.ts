/**
 * 游戏核心类型定义
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
  room_id: string;
  status: string;
  current_phase: number | null;
  current_round: number;
  phase_end_time: string | null;
}
