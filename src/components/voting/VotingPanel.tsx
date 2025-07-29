
import React, { useState, useMemo } from 'react';
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
  isJudge?: boolean;
}

const VotingPanel: React.FC<VotingPanelProps> = ({
  roomId,
  gameStateId,
  currentPhase,
  isJudge = false
}) => {
  const { currentUser } = useAuth();
  const { players } = usePlayersRealtime(roomId);
  const { roleStates } = useRoleStates(roomId);
  const { roleDesigns } = useRoleDesigns();
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  
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
    if (success) {
      setSelectedTarget('');
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

            {/* 玩家投票界面 */}
            {!isJudge && canVote && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-werewolf-purple">选择投票目标</h3>
                  {!canVoteForSelf && (
                    <div className="flex items-center text-xs text-yellow-400">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      不能投票给自己
                    </div>
                  )}
                </div>
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {votablePlayers.map(player => {
                      const isCurrentUser = player.userId === currentUser?.id;
                      return (
                        <div
                          key={player.id}
                          className={`p-2 rounded-md border cursor-pointer transition-colors ${
                            selectedTarget === player.userId
                              ? 'border-werewolf-purple bg-werewolf-purple/20'
                              : 'border-werewolf-purple/30 hover:border-werewolf-purple/50'
                          } ${isCurrentUser ? 'bg-yellow-500/10 border-yellow-500/30' : ''}`}
                          onClick={() => setSelectedTarget(player.userId || '')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-300">{player.name}</span>
                              {isCurrentUser && (
                                <Badge variant="outline" className="text-yellow-400 text-xs">
                                  自己
                                </Badge>
                              )}
                            </div>
                            <Badge 
                              variant="outline" 
                              className={getVoteStatusColor(player.userId || '')}
                            >
                              {getTargetVoteCount(player.userId || '')} 票
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* 弃权选项 */}
                    <div
                      className={`p-2 rounded-md border cursor-pointer transition-colors ${
                        selectedTarget === ''
                          ? 'border-werewolf-purple bg-werewolf-purple/20'
                          : 'border-werewolf-purple/30 hover:border-werewolf-purple/50'
                      }`}
                      onClick={() => setSelectedTarget('')}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">弃权</span>
                        <Badge variant="outline" className="bg-gray-500/20 text-gray-400">
                          弃权票
                        </Badge>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                <Button
                  onClick={() => handleVote(selectedTarget || undefined)}
                  disabled={loading || (!selectedTarget && selectedTarget !== '')}
                  className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
                >
                  {selectedTarget ? '确认投票' : '确认弃权'}
                </Button>
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
