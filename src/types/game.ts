
export type GamePhase = 'day' | 'evening' | 'night' | 'dawn';
export type GameStatus = 'waiting' | 'active' | 'paused' | 'ended';

export interface GameState {
  id: string;
  room_id: string;
  current_phase: GamePhase;
  current_round: number;
  phase_start_time: string;
  phase_duration: number;
  auto_advance: boolean;
  status: GameStatus;
  created_at: string;
  updated_at: string;
}

export interface GamePhaseHistory {
  id: string;
  game_state_id: string;
  phase: GamePhase;
  round_number: number;
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  created_at: string;
}

export interface GameStateManager {
  gameState: GameState | null;
  loading: boolean;
  error: string | null;
  timeRemaining: number;
  startGame: () => Promise<boolean>;
  advancePhase: () => Promise<boolean>;
  pauseGame: () => Promise<boolean>;
  resumeGame: () => Promise<boolean>;
  endGame: () => Promise<boolean>;
  initializeGameState: () => Promise<boolean>;
}
