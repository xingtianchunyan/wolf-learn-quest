import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/components/layout/LanguageSwitcher', () => ({
  useLanguage: () => ({
    language: 'zh',
    setLanguage: vi.fn(),
    t: (key: string) => key,
  }),
}));

describe('usePlayersRealtime', () => {
  const roomId = 'room-1';

  beforeEach(() => {
    vi.clearAllMocks();

    const mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    };
    vi.mocked(supabase.channel).mockReturnValue(mockChannel as any);

    // rooms 查询
    const roomQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValue({ data: { host_id: 'host-1' }, error: null }),
    };

    // room_players 查询
    const playersQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      then: vi.fn(resolve => resolve({ data: [], error: null })),
    };

    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === 'rooms') return roomQuery as any;
      if (table === 'room_players') return playersQuery as any;
      return {} as any;
    });

    vi.mocked(supabase.rpc).mockResolvedValue({
      data: null,
      error: null,
    } as any);
  });

  it('calls add_ai_player RPC when addAIPlayer is invoked', async () => {
    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.addAIPlayer();

    expect(success).toBe(true);
    expect(supabase.rpc).toHaveBeenCalledWith('add_ai_player', {
      p_room_id: roomId,
    });
  });

  it('returns false when addAIPlayer RPC fails', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({
      data: null,
      error: { message: 'room full' },
    } as any);

    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.addAIPlayer();

    expect(success).toBe(false);
    expect(supabase.rpc).toHaveBeenCalledWith('add_ai_player', {
      p_room_id: roomId,
    });
  });

  it('calls remove_ai_player RPC when removeAIPlayer is invoked', async () => {
    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.removeAIPlayer();

    expect(success).toBe(true);
    expect(supabase.rpc).toHaveBeenCalledWith('remove_ai_player', {
      p_room_id: roomId,
    });
  });

  it('returns false when removeAIPlayer RPC fails', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({
      data: null,
      error: { message: 'no ai player' },
    } as any);

    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.removeAIPlayer();

    expect(success).toBe(false);
    expect(supabase.rpc).toHaveBeenCalledWith('remove_ai_player', {
      p_room_id: roomId,
    });
  });

  it('calls assign_ai_roles RPC when assignAIRoles is invoked', async () => {
    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.assignAIRoles();

    expect(success).toBe(true);
    expect(supabase.rpc).toHaveBeenCalledWith('assign_ai_roles', {
      p_room_id: roomId,
    });
  });

  it('returns false when assignAIRoles RPC fails', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({
      data: null,
      error: { message: 'not all humans selected' },
    } as any);

    const { result } = renderHook(() => usePlayersRealtime(roomId));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.assignAIRoles();

    expect(success).toBe(false);
    expect(supabase.rpc).toHaveBeenCalledWith('assign_ai_roles', {
      p_room_id: roomId,
    });
  });
});
