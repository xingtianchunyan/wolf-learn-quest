import React, { useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { useAuth } from '@/providers/AuthProvider';
import { usePlayersRealtime, type Player } from '@/hooks/usePlayersRealtime';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { VotingNoSession } from './VotingNoSession';
import { VotingResults } from './VotingResults';
import { VotingActions } from './VotingActions';

interface VotingPanelProps {
  roomId: string;
  gameStateId?: string;
  currentPhase?: number;
  currentRound?: number;
  isJudge: boolean;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
}

const VotingPanel: React.FC<VotingPanelProps> = ({
  roomId,
  gameStateId,
  currentPhase,
  currentRound = 1,
  isJudge,
  selectedTargetId,
  onTargetSelect,
}) => {
  const { currentUser, requireAuth, isLoggedIn } = useAuth();

  useEffect(() => {
    const joinRoom = async () => {
      if (!currentUser || !roomId) return;
      try {
        await supabase.rpc('join_room_as_player', { p_room_id: roomId });
      } catch (error) {
        console.error('Failed to join room:', error);
      }
    };
    joinRoom();
  }, [currentUser, roomId]);

  if (!isLoggedIn || !currentUser) {
    return (
      <VotingNoSession
        currentRound={currentRound}
        currentPhase={currentPhase}
        isJudge={isJudge}
        loading={false}
        votablePlayers={[]}
        onCreateSession={() => {}}
      />
    );
  }

  const { players } = usePlayersRealtime(roomId);
  const { roleStates } = useRoleStates(roomId);
  const { roleDesigns } = useRoleDesigns();
  const selectedTarget = selectedTargetId || '';

  const {
    currentSession,
    results,
    loading,
    createVotingSession,
    castVote,
    calculateResults,
    processResult,
    getUserVote,
    getTargetVoteCount,
    getVotingSummary,
  } = useVotingSystem(gameStateId, roomId);

  const userVote = currentUser ? getUserVote(currentUser.id) : null;
  const canVote = currentSession?.status === 'active' && !userVote;
  const votingSummary = getVotingSummary();

  const currentUserRole = useMemo(() => {
    if (!currentUser) return null;
    const roleState = roleStates.find(rs => rs.user_id === currentUser.id);
    if (!roleState) return null;
    return roleDesigns.find(role => role.id === roleState.role_id);
  }, [currentUser, roleStates, roleDesigns]);

  const canVoteForSelf = useMemo(() => {
    return currentUserRole?.role_name === 'whitewolf';
  }, [currentUserRole]);

  const votablePlayers = useMemo(() => {
    return players.filter(player => {
      if (player.userId === currentUser?.id && !canVoteForSelf) {
        return false;
      }
      return true;
    });
  }, [players, currentUser?.id, canVoteForSelf]);

  const handleVote = async (targetId?: string) => {
    if (!requireAuth() || !currentUser) return;
    await castVote(currentUser.id, targetId);
  };

  const handleCalculateResults = async () => {
    await calculateResults();
  };

  const handleProcessResult = async (resultId: string) => {
    await processResult(resultId);
  };

  const handleCreateSession = async () => {
    if (!gameStateId || !roomId) return;
    await createVotingSession(currentRound, currentPhase || 1, 'day_vote');
  };

  const handleClearSelection = () => {
    onTargetSelect?.('');
  };

  if (!currentSession) {
    return (
      <VotingNoSession
        currentRound={currentRound}
        currentPhase={currentPhase}
        isJudge={isJudge}
        loading={loading}
        votablePlayers={votablePlayers as Player[]}
        onCreateSession={handleCreateSession}
      />
    );
  }

  return (
    <div className='space-y-4'>
      <VotingResults
        currentSession={currentSession}
        players={players as Player[]}
        votingSummary={votingSummary}
        results={results}
        onProcessResult={handleProcessResult}
      />

      {!isJudge && (
        <VotingActions
          currentSession={currentSession}
          userVote={userVote}
          canVote={canVote}
          selectedTarget={selectedTarget}
          players={players as Player[]}
          loading={loading}
          getTargetVoteCount={getTargetVoteCount}
          onVote={handleVote}
          onClearSelection={handleClearSelection}
        />
      )}
    </div>
  );
};

export default VotingPanel;
