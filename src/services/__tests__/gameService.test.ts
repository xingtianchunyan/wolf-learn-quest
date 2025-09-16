import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameService, GameServiceError } from '../gameService';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    },
    rpc: vi.fn()
  }
}));

// Import the mocked module
import { supabase } from '@/integrations/supabase/client';
const mockSupabase = vi.mocked(supabase);

describe('GameService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GameServiceError', () => {
    it('should create error with message and code', () => {
      const error = new GameServiceError('Test error', 'TEST_CODE');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('GameServiceError');
    });

    it('should create error without code', () => {
      const error = new GameServiceError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.code).toBeUndefined();
    });
  });

  describe('requireAuth', () => {
    it('should return true when user is authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } }
      });

      const result = await GameService.requireAuth();
      expect(result).toBe(true);
    });

    it('should throw GameServiceError when user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null }
      });

      await expect(GameService.requireAuth()).rejects.toThrow(GameServiceError);
      await expect(GameService.requireAuth()).rejects.toThrow('Authentication required');
    });
  });

  describe('startGame', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } }
      });
    });

    it('should start game successfully', async () => {
      const gameStateId = 'game-state-id';
      mockSupabase.rpc.mockResolvedValue({
        data: gameStateId,
        error: null
      });

      const result = await GameService.startGame('room-id');
      expect(result).toBe(gameStateId);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('start_game', { p_room_id: 'room-id' });
    });

    it('should throw GameServiceError on RPC error', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: null,
        error: { message: 'RPC Error', code: 'RPC_ERROR' }
      });

      await expect(GameService.startGame('room-id')).rejects.toThrow(GameServiceError);
      await expect(GameService.startGame('room-id')).rejects.toThrow('RPC Error');
    });
  });

  describe('advanceGamePhase', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } }
      });
    });

    it('should advance game phase successfully', async () => {
      const phaseData = {
        new_phase: 2,
        new_round: 1,
        phase_end_time: '2024-01-01T12:00:00Z'
      };
      mockSupabase.rpc.mockResolvedValue({
        data: [phaseData],
        error: null
      });

      const result = await GameService.advanceGamePhase('room-id');
      expect(result).toEqual(phaseData);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('advance_game_phase', { p_room_id: 'room-id' });
    });

    it('should throw GameServiceError on RPC error', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: null,
        error: { message: 'Phase advance failed', code: 'PHASE_ERROR' }
      });

      await expect(GameService.advanceGamePhase('room-id')).rejects.toThrow(GameServiceError);
      await expect(GameService.advanceGamePhase('room-id')).rejects.toThrow('Phase advance failed');
    });
  });

  describe('toggleGamePause', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } }
      });
    });

    it('should toggle game pause successfully', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: true,
        error: null
      });

      const result = await GameService.toggleGamePause('room-id');
      expect(result).toBe(true);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('toggle_game_pause', { p_room_id: 'room-id' });
    });

    it('should throw GameServiceError on RPC error', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: null,
        error: { message: 'Pause toggle failed', code: 'PAUSE_ERROR' }
      });

      await expect(GameService.toggleGamePause('room-id')).rejects.toThrow(GameServiceError);
      await expect(GameService.toggleGamePause('room-id')).rejects.toThrow('Pause toggle failed');
    });
  });

  describe('authentication requirement', () => {
    it('should require authentication for all methods', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null }
      });

      await expect(GameService.startGame('room-id')).rejects.toThrow('Authentication required');
      await expect(GameService.advanceGamePhase('room-id')).rejects.toThrow('Authentication required');
      await expect(GameService.toggleGamePause('room-id')).rejects.toThrow('Authentication required');
    });
  });
});