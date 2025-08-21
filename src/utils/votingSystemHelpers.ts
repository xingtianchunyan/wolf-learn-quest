
// 投票系统辅助函数

export interface VotingSummary {
  totalVotes: number;
  validVotes: number;
  abstentions: number;
  topCandidate?: {
    playerId: string;
    playerName: string;
    voteCount: number;
    percentage: number;
  };
  isTied: boolean;
  hasMajority: boolean;
}

// 计算投票摘要信息（支持投票权重）
export const calculateVotingSummary = (
  votes: Array<{ target_id?: string; is_valid: boolean; vote_weight?: number }>,
  players: Array<{ userId?: string; name: string }>,
  totalPlayers: number
): VotingSummary => {
  const validVotes = votes.filter(vote => vote.is_valid);
  const abstentions = validVotes.filter(vote => !vote.target_id).length;
  const targetVotes = validVotes.filter(vote => vote.target_id);

  // 统计每个候选人的得票（考虑权重）
  const voteCounts = new Map<string, number>();
  targetVotes.forEach(vote => {
    if (vote.target_id) {
      const weight = vote.vote_weight || 1;
      voteCounts.set(vote.target_id, (voteCounts.get(vote.target_id) || 0) + weight);
    }
  });

  // 找出最高票数
  const maxVotes = Math.max(...Array.from(voteCounts.values()), 0);
  const topCandidates = Array.from(voteCounts.entries()).filter(([_, count]) => count === maxVotes);

  const topCandidate = topCandidates.length > 0 ? (() => {
    const [playerId, voteCount] = topCandidates[0];
    const player = players.find(p => p.userId === playerId);
    return {
      playerId,
      playerName: player?.name || '未知玩家',
      voteCount,
      percentage: Math.round((voteCount / validVotes.length) * 100)
    };
  })() : undefined;

  return {
    totalVotes: votes.length,
    validVotes: validVotes.length,
    abstentions,
    topCandidate,
    isTied: topCandidates.length > 1 && maxVotes > 0,
    hasMajority: topCandidate ? topCandidate.voteCount > totalPlayers / 2 : false
  };
};

// 获取投票结果描述
export const getVotingResultDescription = (
  resultType: string,
  targetName?: string
): string => {
  switch (resultType) {
    case 'eliminated':
      return `${targetName || '目标玩家'}被投票淘汰`;
    case 'tied':
      return '投票结果平票，无人被淘汰';
    case 'saved':
      return `${targetName || '目标玩家'}被救下，免于淘汰`;
    case 'no_result':
      return '投票无有效结果';
    default:
      return '未知投票结果';
  }
};

// 检查是否可以开始投票
export const canStartVoting = (
  gamePhase: number,
  gameStatus: string,
  playersCount: number
): { canStart: boolean; reason?: string } => {
  if (gameStatus !== 'active') {
    return { canStart: false, reason: '游戏未开始' };
  }

  if (playersCount < 3) {
    return { canStart: false, reason: '玩家人数不足' };
  }

  if (gamePhase === 1) { // 白天阶段
    return { canStart: true };
  }

  return { canStart: false, reason: '当前阶段不允许投票' };
};

// 获取投票会话类型显示名称
export const getSessionTypeDisplayName = (sessionType: string): string => {
  switch (sessionType) {
    case 'day_vote':
      return '白天投票';
    case 'exile_vote':
      return '放逐投票';
    case 'emergency_vote':
      return '紧急投票';
    default:
      return '投票';
  }
};

// 检查玩家是否有投票权限
export const hasVotingPermission = (
  statusEffects: any,
  roleStatus: number
): boolean => {
  // 检查状态效果中的投票权限
  if (statusEffects?.can_vote === false) {
    return false;
  }

  // 检查角色状态
  switch (roleStatus) {
    case 1: // 正常状态
      return true;
    case 2: // 濒死状态
      return false;
    case 3: // 虚弱状态
      return false;
    case 4: // 淘汰状态
      return false;
    default:
      return false;
  }
};

// 检查玩家是否可以被投票
export const canBeVoted = (
  statusEffects: any,
  roleStatus: number
): boolean => {
  // 检查状态效果中的被投票权限
  if (statusEffects?.can_be_voted === false) {
    return false;
  }

  // 检查角色状态
  switch (roleStatus) {
    case 1: // 正常状态
      return true;
    case 2: // 濒死状态（猎人反击期间）
      return false;
    case 3: // 虚弱状态
      return true;
    case 4: // 淘汰状态
      return false;
    default:
      return false;
  }
};

// 计算投票权重（用于特殊角色）
export const calculateVoteWeight = (
  roleEffects: any,
  statusEffects: any
): number => {
  // 检查角色特殊技能是否影响投票权重
  if (roleEffects?.vote_weight) {
    return roleEffects.vote_weight;
  }

  // 检查状态效果是否影响投票权重
  if (statusEffects?.vote_weight) {
    return statusEffects.vote_weight;
  }

  return 1; // 默认权重
};

// 格式化投票时间
export const formatVoteTime = (voteTime: string): string => {
  const date = new Date(voteTime);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);

  if (diffSecs < 60) {
    return `${diffSecs}秒前`;
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};
