
import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Vote, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { useAuth } from '@/providers/AuthProvider';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';

interface VotingPanelProps {
  roomId: string;
  gameStateId?: string;
  currentPhase?: number;
  currentRound?: number;
  isJudge?: boolean;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
}

const VotingPanel: React.FC<VotingPanelProps> = ({
  roomId,
  gameStateId,
  currentPhase,
  currentRound = 1,
  isJudge = false,
  selectedTargetId,
  onTargetSelect
}) => {
  const { currentUser } = useAuth();
  const { players } = usePlayersRealtime(roomId);
  const { roleStates } = useRoleStates(roomId);
  const { roleDesigns } = useRoleDesigns();
  // 使用外部传入的选中目标，而不是内部状态
  const selectedTarget = selectedTargetId || '';
  
  const {
    currentSession,
    votes,
    results,
    loading,
    createVotingSession,
    castVote,
    calculateResults,
    processResult,
    getUserVote,
    getTargetVoteCount,
    getVotingSummary,
    getVotersForTarget,
  } = useVotingSystem(roomId, gameStateId);


  const userVote = currentUser ? getUserVote(currentUser.id) : null;
  const canVote = currentSession?.status === 'active' && !userVote;
  const votingSummary = getVotingSummary();

  // 获取当前用户的角色信息
  const currentUserRole = useMemo(() => {
    if (!currentUser) return null;
    const roleState = roleStates.find(rs => rs.user_id === currentUser.id);
    if (!roleState) return null;
    return roleDesigns.find(role => role.id === roleState.role_id);
  }, [currentUser, roleStates, roleDesigns]);

  // 检查是否可以投票给自己（只有白狼王可以）
  const canVoteForSelf = useMemo(() => {
    return currentUserRole?.role_name === 'whitewolf';
  }, [currentUserRole]);

  // 过滤可投票的玩家列表
  const votablePlayers = useMemo(() => {
    return players.filter(player => {
      // 如果是当前用户且不能投票给自己，过滤掉
      if (player.userId === currentUser?.id && !canVoteForSelf) {
        return false;
      }
      return true;
    });
  }, [players, currentUser?.id, canVoteForSelf]);

  const handleVote = async (targetId?: string) => {
    if (!currentUser) return;
    
    const success = await castVote(currentUser.id, targetId);
    if (success && onTargetSelect) {
      onTargetSelect(''); // 清除选中状态
    }
  };

  const handleCalculateResults = async () => {
    await calculateResults();
  };

  const handleProcessResult = async (resultId: string) => {
    await processResult(resultId);
  };

  const getVoteStatusColor = (targetId: string) => {
    const voteCount = getTargetVoteCount(targetId);
    if (voteCount === 0) return 'bg-gray-500/20 text-gray-400';
    if (voteCount >= players.length / 2) return 'bg-red-500/20 text-red-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  if (!currentSession) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="p-6 text-center">
          <div className="text-gray-400">
            <Vote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>正在准备投票会话...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between">
          <div className="flex items-center">
            <Vote className="mr-2 h-5 w-5" />
            投票系统
          </div>
          {currentSession && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              {currentSession.session_type === 'day_vote' ? '白天投票' : '放逐投票'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {currentSession && (
          <>
            {/* 投票状态 */}
            <div className="flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-werewolf-purple" />
                <span className="text-sm text-gray-300">投票进行中</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-werewolf-purple" />
                <span className="text-sm text-gray-300">
                  {votingSummary.totalVotes} / {players.length} 已投票
                </span>
                {votingSummary.abstentions > 0 && (
                  <Badge variant="outline" className="text-gray-400 text-xs">
                    {votingSummary.abstentions} 弃权
                  </Badge>
                )}
              </div>
            </div>

            {/* 投票统计 */}
            {votingSummary.hasVotes && (
              <div className="p-3 bg-werewolf-dark/20 rounded-md">
                <h4 className="text-sm font-medium text-werewolf-purple mb-2">当前投票统计</h4>
                <div className="space-y-2">
                  {Object.entries(votingSummary.votesByTarget).map(([targetId, voteCount]) => {
                    const targetPlayer = players.find(p => p.userId === targetId);
                    const voters = getVotersForTarget(targetId);
                    return (
                      <div key={targetId} className="border border-werewolf-purple/20 rounded-md p-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-300 font-medium">{targetPlayer?.name || '未知玩家'}</span>
                          <Badge variant="outline" className="text-werewolf-purple">
                            {voteCount} 票
                          </Badge>
                        </div>
                        {voters.length > 0 && (
                          <div className="text-xs text-gray-400">
                            投票者: {voters.map(voter => {
                              const voterPlayer = players.find(p => p.userId === voter.voterId);
                              return voterPlayer?.name || '未知玩家';
                            }).join(', ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* 显示弃权票 */}
                  {votingSummary.voteDetails['abstention'] && (
                    <div className="border border-werewolf-purple/20 rounded-md p-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-300 font-medium">弃权</span>
                        <Badge variant="outline" className="text-gray-400">
                          {votingSummary.abstentions} 票
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">
                        弃权者: {votingSummary.voteDetails['abstention'].map(vote => {
                          const voterPlayer = players.find(p => p.userId === vote.voterId);
                          return voterPlayer?.name || '未知玩家';
                        }).join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 投票动作界面 */}
            {!isJudge && canVote && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-werewolf-purple">投票动作</h3>
                  <div className="text-xs text-gray-400">
                    请在上方玩家状态区选择投票目标
                  </div>
                </div>
                
                {selectedTarget && (
                  <div className="p-3 bg-werewolf-purple/20 border border-werewolf-purple/50 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-werewolf-purple font-medium">
                        当前选择: {players.find(p => p.userId === selectedTarget)?.name || '未知玩家'}
                      </span>
                      <Badge variant="outline" className="text-werewolf-purple">
                        {getTargetVoteCount(selectedTarget)} 票
                      </Badge>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleVote(selectedTarget || undefined)}
                    disabled={loading || !selectedTarget}
                    className="flex-1 bg-werewolf-purple hover:bg-werewolf-purple/80"
                  >
                    确认投票
                  </Button>
                  <Button
                    onClick={() => handleVote(undefined)}
                    disabled={loading}
                    variant="outline"
                    className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-500/20"
                  >
                    弃权
                  </Button>
                </div>
              </div>
            )}

            {/* 用户已投票状态 */}
            {!isJudge && userVote && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">已投票</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {userVote.target_id ? `已投票给: ${
                    players.find(p => p.userId === userVote.target_id)?.name || '未知玩家'
                  }` : '已投弃权票'}
                </p>
              </div>
            )}

            {/* 投票结果 */}
            {results.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-werewolf-purple">投票结果</h3>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {results.map(result => (
                      <div key={result.id} className="p-2 bg-werewolf-dark/40 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">
                            {result.target_id ? 
                              players.find(p => p.userId === result.target_id)?.name || '未知玩家' : 
                              '无目标'
                            }
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-werewolf-purple">
                              {result.total_votes} 票
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={
                                result.result_type === 'eliminated' ? 'text-red-400 border-red-400' :
                                result.result_type === 'tied' ? 'text-yellow-400 border-yellow-400' :
                                'text-gray-400 border-gray-400'
                              }
                            >
                              {result.result_type === 'eliminated' ? '被淘汰' :
                               result.result_type === 'tied' ? '平票' :
                               result.result_type === 'saved' ? '获救' : '无结果'}
                            </Badge>
                            {result.processing_status !== 'completed' && (
                              <Badge variant="outline" className="text-orange-400 border-orange-400">
                                {result.processing_status === 'pending' ? '待处理' :
                                 result.processing_status === 'processing' ? '处理中' : '失败'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VotingPanel;
