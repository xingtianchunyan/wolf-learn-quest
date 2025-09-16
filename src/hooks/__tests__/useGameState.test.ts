import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGameState } from '../useGameState';

// Mock dependencies
const mockToast = vi.fn();
const mockUser = { id: 'test-user-id' };

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast })
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ requireAuth: vi.fn() })
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          maybeSingle: vi.fn()
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      }))
    })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      })),
      unsubscribe: vi.fn()
    })),
    removeChannel: vi.fn()
  }
}));

// Import the mocked module
import { supabase } from '@/integrations/supabase/client';
const mockSupabase = vi.mocked(supabase);

describe('useGameState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useGameState('test-room-id'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.gameState).toBeNull();
    expect(result.current.gameSettings).toBeNull();
  });

  it('should handle empty roomId', () => {
    const { result } = renderHook(() => useGameState(''));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.gameState).toBeNull();
  });

  it('should fetch game state and settings on mount', () => {
    renderHook(() => useGameState('test-room-id'));
    
    expect(mockSupabase.from).toHaveBeenCalledWith('game_states');
    expect(mockSupabase.from).toHaveBeenCalledTimes(1);
  });

  it('should set up realtime subscriptions', () => {
    renderHook(() => useGameState('test-room-id'));
    
    expect(mockSupabase.channel).toHaveBeenCalledWith('game_state_test-room-id');
    expect(mockSupabase.channel).toHaveBeenCalledWith('game_settings_test-room-id');
  });

  it('should return correct interface', () => {
    const { result } = renderHook(() => useGameState('test-room-id'));
    
    expect(result.current).toHaveProperty('gameState');
    expect(result.current).toHaveProperty('gameSettings');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('timeRemaining');
    expect(result.current).toHaveProperty('startGame');
    expect(result.current).toHaveProperty('advancePhase');
    expect(result.current).toHaveProperty('togglePause');
    expect(result.current).toHaveProperty('updateGameSettings');
    expect(result.current).toHaveProperty('endGame');
    expect(result.current).toHaveProperty('formatTime');
    expect(result.current).toHaveProperty('getPhaseDisplayName');
  });

  it('should provide function methods', () => {
    const { result } = renderHook(() => useGameState('test-room-id'));
    
    expect(typeof result.current.startGame).toBe('function');
    expect(typeof result.current.advancePhase).toBe('function');
    expect(typeof result.current.togglePause).toBe('function');
    expect(typeof result.current.updateGameSettings).toBe('function');
    expect(typeof result.current.endGame).toBe('function');
    expect(typeof result.current.formatTime).toBe('function');
    expect(typeof result.current.getPhaseDisplayName).toBe('function');
  });
});