import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JudgeActionPanel from '@/components/judge/management/JudgeActionPanel';
import { supabase } from '@/integrations/supabase/client';

const navigateMock = vi.fn();
const toastMock = vi.fn();

let mockGameState: any = { status: 'waiting', id: 'game-1' };
let mockPlayers: any[] = [
  {
    id: 'p1',
    name: 'You',
    isHost: true,
    isAI: false,
    userId: 'judge-user-id',
  },
];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    currentUser: { id: 'judge-user-id' },
    user: { id: 'judge-user-id' },
    loading: false,
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: toastMock }),
}));

vi.mock('@/hooks/useGameState', () => ({
  useGameState: () => ({
    gameState: mockGameState,
    advancePhase: vi.fn(),
    togglePause: vi.fn(),
    endGame: vi.fn(),
  }),
}));

vi.mock('@/hooks/usePlayersRealtime', () => ({
  usePlayersRealtime: () => ({
    players: mockPlayers,
  }),
}));

vi.mock('@/hooks/useVotingSystem', () => ({
  useVotingSystem: () => ({
    createVotingSession: vi.fn(),
  }),
}));

vi.mock('@/contexts/JudgePageContext', () => ({
  useJudgePage: () => ({
    refreshLinkedQuestions: vi.fn(),
  }),
}));

vi.mock('@/components/voting/EnhancedVotingManager', () => ({
  default: () => <div data-testid='enhanced-voting-manager' />,
}));

vi.mock('@/components/judge/management/PreparationPhaseDialog', () => ({
  default: () => <div data-testid='preparation-phase-dialog' />,
}));

vi.mock('@/components/layout/LanguageSwitcher', () => ({
  useLanguage: () => ({
    language: 'zh',
    setLanguage: vi.fn(),
    t: (key: string) => key,
  }),
}));

vi.mock('@/lib/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  }),
}));

describe('JudgeActionPanel', () => {
  const roomId = 'room-1';

  beforeEach(() => {
    vi.clearAllMocks();
    mockGameState = { status: 'waiting', id: 'game-1' };
    mockPlayers = [
      {
        id: 'p1',
        name: 'You',
        isHost: true,
        isAI: false,
        userId: 'judge-user-id',
      },
    ];
  });

  it('updates rooms with last_human_activity and navigates to room page on quit', async () => {
    const updateMock = vi.fn().mockReturnThis();
    const eqMock = vi.fn().mockReturnThis();

    vi.mocked(supabase.from).mockReturnValue({
      update: updateMock,
      eq: eqMock,
    } as any);

    render(<JudgeActionPanel roomId={roomId} />);

    const quitButton = screen.getByRole('button', { name: /quitJudge/i });
    await userEvent.click(quitButton);

    await waitFor(() => expect(updateMock).toHaveBeenCalled());

    const updateArg = updateMock.mock.calls[0][0];
    expect(updateArg).toHaveProperty('judge_user_id', null);
    expect(updateArg).toHaveProperty('last_human_activity');

    expect(navigateMock).toHaveBeenCalledWith(`/room/${roomId}`);
  });

  it('navigates to lobby when quitting judge and current user is not a room player', async () => {
    mockPlayers = [
      {
        id: 'p1',
        name: 'Someone',
        isHost: true,
        isAI: false,
        userId: 'other-user-id',
      },
    ];

    const updateMock = vi.fn().mockReturnThis();
    vi.mocked(supabase.from).mockReturnValue({
      update: updateMock,
      eq: vi.fn().mockReturnThis(),
    } as any);

    render(<JudgeActionPanel roomId={roomId} />);

    const quitButton = screen.getByRole('button', { name: /quitJudge/i });
    await userEvent.click(quitButton);

    await waitFor(() => expect(updateMock).toHaveBeenCalled());
    expect(navigateMock).toHaveBeenCalledWith('/lobby');
  });

  it('does not call supabase update when game is active', async () => {
    mockGameState = { status: 'active', id: 'game-1' };

    const updateMock = vi.fn();
    vi.mocked(supabase.from).mockReturnValue({
      update: updateMock,
    } as any);

    render(<JudgeActionPanel roomId={roomId} />);

    const quitButton = screen.getByRole('button', { name: /quitJudge/i });
    expect(quitButton).toBeDisabled();

    await userEvent.click(quitButton);

    expect(updateMock).not.toHaveBeenCalled();
  });
});
