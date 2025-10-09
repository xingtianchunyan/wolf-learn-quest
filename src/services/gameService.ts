import { supabase } from '@/integrations/supabase/client';

export class GameServiceError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'GameServiceError';
    this.code = code;
  }
}

export class GameService {
  static async requireAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new GameServiceError('Authentication required');
    }
    return true;
  }

  static async startGame(roomId: string): Promise<string> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('start_game', { p_room_id: roomId });

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }

    return data;
  }

  static async advanceGamePhase(roomId: string): Promise<{ new_phase: number; new_round: number; phase_end_time: string | null }> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('advance_game_phase', { p_room_id: roomId });

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }

    return data[0];
  }

  static async toggleGamePause(roomId: string): Promise<boolean> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('toggle_game_pause', { p_room_id: roomId });

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }

    return data;
  }

  static async updateGameSettings(roomId: string, settings: {
    day_duration?: number;
    evening_duration?: number;
    night_duration?: number;
    dawn_duration?: number;
    is_auto_advance?: boolean;
  }): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('game_settings')
      .upsert({
        room_id: roomId,
        ...settings
      });

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }
  }

  static async endGame(roomId: string, reason: string, winnerFaction?: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('game_states')
      .update({
        status: 'ended',
        end_reason: reason,
        winner_faction: winnerFaction
      })
      .eq('room_id', roomId)
      .eq('status', 'active');

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }
  }

  static async initializeRoleStates(roomId: string): Promise<number> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('initialize_room_role_states', { p_room_id: roomId });

    if (error) {
      throw new GameServiceError(error.message, error.code);
    }

    return data;
  }
}