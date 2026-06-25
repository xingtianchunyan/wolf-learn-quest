import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayersList from '@/components/room/PlayersList';

vi.mock('@/components/layout/LanguageSwitcher', () => ({
  useLanguage: () => ({
    language: 'zh',
    setLanguage: vi.fn(),
    t: (key: string) => key,
  }),
}));

const defaultProps = {
  players: [
    {
      id: 'p1',
      name: 'You',
      avatar: '',
      isReady: false,
      isHost: true,
      isAI: false,
      userId: 'user-1',
    },
  ],
  maxPlayers: 6,
  isReady: false,
  allReady: false,
  selectedCharacter: null,
  loading: false,
  onReadyToggle: vi.fn(),
  onLeaveRoom: vi.fn(),
  onStartGame: vi.fn(),
  onAddAIPlayer: vi.fn(),
  onRemoveAIPlayer: vi.fn(),
  onMaxPlayersChange: vi.fn(),
  onlinePlayers: ['user-1'],
  allPlayersSelectedRoles: false,
  canSelectRoles: false,
  currentPlayerHasSelectedRole: false,
  hideReadyButton: true,
  currentUserId: 'user-1',
};

describe('PlayersList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows add AI player button when room is not full', () => {
    render(<PlayersList {...defaultProps} />);

    expect(screen.getByTestId('add-ai-player')).toBeInTheDocument();
    expect(screen.queryByTestId('remove-ai-player')).not.toBeInTheDocument();
  });

  it('shows remove AI player button when room is full and AI players exist (host only)', () => {
    render(
      <PlayersList
        {...defaultProps}
        players={[
          ...defaultProps.players,
          {
            id: 'ai1',
            name: 'AI-Player-ai1',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai2',
            name: 'AI-Player-ai2',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai3',
            name: 'AI-Player-ai3',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai4',
            name: 'AI-Player-ai4',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai5',
            name: 'AI-Player-ai5',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
        ]}
        maxPlayers={6}
      />
    );

    expect(screen.queryByTestId('add-ai-player')).not.toBeInTheDocument();
    expect(screen.getByTestId('remove-ai-player')).toBeInTheDocument();
  });

  it('does not show remove AI player button for non-host players', () => {
    render(
      <PlayersList
        {...defaultProps}
        players={[
          { ...defaultProps.players[0], isHost: false },
          {
            id: 'ai1',
            name: 'AI-Player-ai1',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai2',
            name: 'AI-Player-ai2',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai3',
            name: 'AI-Player-ai3',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai4',
            name: 'AI-Player-ai4',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai5',
            name: 'AI-Player-ai5',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
        ]}
        maxPlayers={6}
      />
    );

    expect(screen.queryByTestId('add-ai-player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('remove-ai-player')).not.toBeInTheDocument();
  });

  it('does not show remove AI player button when room is full but no AI players', () => {
    render(
      <PlayersList
        {...defaultProps}
        players={[
          defaultProps.players[0],
          {
            id: 'p2',
            name: 'Player2',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: false,
            userId: 'user-2',
          },
          {
            id: 'p3',
            name: 'Player3',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: false,
            userId: 'user-3',
          },
          {
            id: 'p4',
            name: 'Player4',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: false,
            userId: 'user-4',
          },
          {
            id: 'p5',
            name: 'Player5',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: false,
            userId: 'user-5',
          },
          {
            id: 'p6',
            name: 'Player6',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: false,
            userId: 'user-6',
          },
        ]}
        maxPlayers={6}
      />
    );

    expect(screen.queryByTestId('add-ai-player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('remove-ai-player')).not.toBeInTheDocument();
  });

  it('calls onRemoveAIPlayer when remove AI player button is clicked', async () => {
    const onRemoveAIPlayer = vi.fn();
    render(
      <PlayersList
        {...defaultProps}
        onRemoveAIPlayer={onRemoveAIPlayer}
        players={[
          ...defaultProps.players,
          {
            id: 'ai1',
            name: 'AI-Player-ai1',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai2',
            name: 'AI-Player-ai2',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai3',
            name: 'AI-Player-ai3',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai4',
            name: 'AI-Player-ai4',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
          {
            id: 'ai5',
            name: 'AI-Player-ai5',
            avatar: '',
            isReady: false,
            isHost: false,
            isAI: true,
          },
        ]}
        maxPlayers={6}
      />
    );

    await userEvent.click(screen.getByTestId('remove-ai-player'));
    expect(onRemoveAIPlayer).toHaveBeenCalledTimes(1);
  });
});
