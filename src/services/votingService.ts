import { supabase } from '@/integrations/supabase/client';

export class VotingServiceError extends Error {
  code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'VotingServiceError';
    this.code = code;
  }
}

export class VotingService {
  static async requireAuth(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new VotingServiceError('Authentication required');
    }
    return true;
  }

  static async createVotingSession(
    gameStateId: string,
    roomId: string,
    roundNumber: number,
    phase: number,
    sessionType: string = 'day_vote'
  ): Promise<string> {
    const { data, error } = await supabase
      .rpc('create_voting_session', {
        p_game_state_id: gameStateId,
        p_room_id: roomId,
        p_round_number: roundNumber,
        p_phase: phase,
        p_session_type: sessionType
      });

    if (error) {
      console.error('RPC create_voting_session failed:', error);
      throw new VotingServiceError(error.message, error.code);
    }

    return data;
  }

  static async castVote(
    votingSessionId: string,
    voterId: string,
    targetId?: string
  ): Promise<void> {
    const { error } = await supabase
      .rpc('cast_vote', {
        p_voting_session_id: votingSessionId,
        p_voter_id: voterId,
        p_target_id: targetId || null
      });

    if (error) {
      throw new VotingServiceError(error.message, error.code);
    }
  }

  static async calculateVotingResults(votingSessionId: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .rpc('calculate_voting_results', {
        p_voting_session_id: votingSessionId
      });

    if (error) {
      throw new VotingServiceError(error.message, error.code);
    }
  }

  static async processVotingResult(votingResultId: string): Promise<void> {
    await this.requireAuth();
    
    const { error } = await supabase
      .rpc('process_voting_result', {
        p_voting_result_id: votingResultId
      });

    if (error) {
      throw new VotingServiceError(error.message, error.code);
    }
  }
}