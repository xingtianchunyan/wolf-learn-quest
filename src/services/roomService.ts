import { supabase } from '@/integrations/supabase/client';

export class RoomServiceError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'RoomServiceError';
    this.code = code;
  }
}

export class RoomService {
  static async requireAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new RoomServiceError('Authentication required');
    }
    return true;
  }

  static async joinRoom(roomId: string, userId: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('room_players')
      .insert({
        room_id: roomId,
        user_id: userId,
        is_ready: false,
        is_ai: false,
      });

    if (error) {
      throw new RoomServiceError(error.message, error.code);
    }
  }

  static async leaveRoom(roomId: string, userId: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('room_players')
      .delete()
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      throw new RoomServiceError(error.message, error.code);
    }
  }

  static async clearRoleSelection(roomId: string, userId: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('role_selections')
      .delete()
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      throw new RoomServiceError(error.message, error.code);
    }
  }

  static async updatePlayerReadyStatus(roomId: string, userId: string, isReady: boolean): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .from('room_players')
      .update({ is_ready: isReady })
      .eq('room_id', roomId)
      .eq('user_id', userId);

    if (error) {
      throw new RoomServiceError(error.message, error.code);
    }
  }

  static async createNextRoom(roomId: string): Promise<string> {
    await this.requireAuth();
    
    const { data, error } = await supabase
      .rpc('create_next_room', { p_room_id: roomId });

    if (error) {
      throw new RoomServiceError(error.message, error.code);
    }

    return data;
  }
}