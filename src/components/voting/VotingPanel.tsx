
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Vote, Users, Clock, CheckCircle } from 'lucide-react';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { useAuth } from '@/providers/AuthProvider';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

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
  } = useVotingSystem(roomId, gameStateId);

  const userVote = currentUser ? getUserVote(currentUser.id) : null;
  const canVote = currentSession?.status === 'active' && !userVote;

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

  if (!currentSession && !isJudge) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardContent className="p-6 text-center">
          <div className="text-gray-400">
            <Vote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>当前没有进行中的投票</p>
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
                  {votes.filter(v => v.is_valid).length} / {players.length} 已投票
                </span>
              </div>
            </div>

            {/* 玩家投票界面 */}
            {!isJudge && canVote && (
              <div className="space-y-3">
                <h3 className="font-semibold text-werewolf-purple">选择投票目标</h3>
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {players.map(player => (
                      <div
                        key={player.id}
                        className={`p-2 rounded-md border cursor-pointer transition-colors ${
                          selectedTarget === player.userId
                            ? 'border-werewolf-purple bg-werewolf-purple/20'
                            : 'border-werewolf-purple/30 hover:border-werewolf-purple/50'
                        }`}
                        onClick={() => setSelectedTarget(player.userId || '')}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">{player.name}</span>
                          <Badge 
                            variant="outline" 
                            className={getVoteStatusColor(player.userId || '')}
                          >
                            {getTargetVoteCount(player.userId || '')} 票
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
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
                  disabled={loading}
                  className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
                >
                  确认投票
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
