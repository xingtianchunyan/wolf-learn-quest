import { useMemo } from 'react';
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
  const voteRecords = useMemo(() => {
    if (!votingSummary.hasVotes) return [];

    const records: VoteRecord[] = [];

    for (const [targetId, voteCount] of Object.entries(
      votingSummary.votesByTarget
    )) {
      const targetPlayer = players.find(p => p.userId === targetId);
      const voters = getVotersForTarget(targetId);
      const voterNames = voters.map(
        voter =>
          players.find(p => p.userId === voter.voterId)?.name || '未知玩家'
      );

      records.push({
        votedPlayerId: targetId,
        votedPlayerName: targetPlayer?.name || '未知玩家',
        voteCount,
        voters: voterNames,
        isHighest: false,
      });
    }

    if (votingSummary.abstentions > 0) {
      const abstentionVoters = votingSummary.voteDetails?.['abstention'] || [];
      const abstentionVoterNames = abstentionVoters.map(
        vote => players.find(p => p.userId === vote.voterId)?.name || '未知玩家'
      );

      records.push({
        votedPlayerId: 'abstention',
        votedPlayerName: '弃权',
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
      return { type: 'no_votes', message: '暂无投票记录' };
    }

    const maxVotes = Math.max(...voteRecords.map(r => r.voteCount));
    const topVotedPlayers = voteRecords.filter(
      r => r.voteCount === maxVotes && r.votedPlayerId !== 'abstention'
    );

    if (topVotedPlayers.length === 0) {
      return { type: 'only_abstention', message: '仅有弃权票' };
    } else if (topVotedPlayers.length === 1) {
      return {
        type: 'unique_winner',
        message: `${topVotedPlayers[0].votedPlayerName} 获得最高票数 (${maxVotes} 票)`,
        winner: topVotedPlayers[0],
      };
    } else {
      const tiedPlayerNames = topVotedPlayers
        .map(p => p.votedPlayerName)
        .join('、');
      return {
        type: 'tie',
        message: `平票：${tiedPlayerNames} 各获得 ${maxVotes} 票`,
        tiedPlayers: topVotedPlayers,
      };
    }
  }, [voteRecords]);

  return { voteRecords, resultAnalysis };
};
