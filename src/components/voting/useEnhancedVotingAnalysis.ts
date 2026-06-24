import { useMemo } from 'react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { Player } from '@/hooks/usePlayersRealtime';

interface VoteSummary {
  hasVotes: boolean;
  abstentions: number;
  votesByTarget: Record<string, number>;
  voteDetails: Record<string, Array<{ voterId: string; targetId?: string }>>;
}

export interface VoteRecord {
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
  isHighest: boolean;
}

export interface VotingResultAnalysis {
  type: 'no_votes' | 'only_abstention' | 'unique_winner' | 'tie';
  message: string;
  winner?: VoteRecord;
  tiedPlayers?: VoteRecord[];
}

export const useEnhancedVotingAnalysis = (
  players: Player[],
  votingSummary: VoteSummary,
  getVotersForTarget: (targetId: string) => Array<{ voterId: string }>
) => {
  const { t } = useLanguage();

  const getPlayerName = (userId?: string) =>
    players.find(p => p.userId === userId)?.name || t('common.unknown_player');

  const voteRecords = useMemo(() => {
    if (!votingSummary.hasVotes) return [];

    const records: VoteRecord[] = [];

    for (const [targetId, voteCount] of Object.entries(
      votingSummary.votesByTarget
    )) {
      const voters = getVotersForTarget(targetId);
      const voterNames = voters.map(voter => getPlayerName(voter.voterId));

      records.push({
        votedPlayerId: targetId,
        votedPlayerName: getPlayerName(targetId),
        voteCount,
        voters: voterNames,
        isHighest: false,
      });
    }

    if (votingSummary.abstentions > 0) {
      const abstentionVoters = votingSummary.voteDetails?.['abstention'] || [];
      const abstentionVoterNames = abstentionVoters.map(vote =>
        getPlayerName(vote.voterId)
      );

      records.push({
        votedPlayerId: 'abstention',
        votedPlayerName: t('voting.results.abstention'),
        voteCount: votingSummary.abstentions,
        voters: abstentionVoterNames,
        isHighest: false,
      });
    }

    records.sort((a, b) => b.voteCount - a.voteCount);
    if (records.length > 0) {
      const maxVotes = records[0].voteCount;
      records.forEach(record => {
        record.isHighest = record.voteCount === maxVotes;
      });
    }

    return records;
  }, [players, votingSummary, getVotersForTarget]);

  const resultAnalysis = useMemo((): VotingResultAnalysis => {
    if (voteRecords.length === 0) {
      return { type: 'no_votes', message: t('voting.analysis.no_votes') };
    }

    const maxVotes = Math.max(...voteRecords.map(r => r.voteCount));
    const topVotedPlayers = voteRecords.filter(
      r => r.voteCount === maxVotes && r.votedPlayerId !== 'abstention'
    );

    if (topVotedPlayers.length === 0) {
      return {
        type: 'only_abstention',
        message: t('voting.analysis.only_abstention'),
      };
    } else if (topVotedPlayers.length === 1) {
      return {
        type: 'unique_winner',
        message: t('voting.analysis.unique_winner', {
          name: topVotedPlayers[0].votedPlayerName,
          count: maxVotes,
        }),
        winner: topVotedPlayers[0],
      };
    } else {
      const tiedPlayerNames = topVotedPlayers
        .map(p => p.votedPlayerName)
        .join('、');
      return {
        type: 'tie',
        message: t('voting.analysis.tie', {
          names: tiedPlayerNames,
          count: maxVotes,
        }),
        tiedPlayers: topVotedPlayers,
      };
    }
  }, [voteRecords, t]);

  return { voteRecords, resultAnalysis };
};
