import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { ScrollArea   } from '@/components/ui/scroll-area';
import { supabase   } from '@/integrations/supabase/client';
import { useAuth   } from '@/providers/AuthProvider';
import { usePlayersRealtime   } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns   } from '@/hooks/useRoleDesigns';
import { useRoleStates   } from '@/hooks/useRoleStates';
import { useVotingSystem   } from '@/hooks/useVotingSystem';
import { Vote, Users, Clock, CheckCircle, AlertTriangle, Gavel   } from 'lucide-react';
import React, { useState, useMemo, useEffect   } from 'react';

/**
* 文件级注释：VotingPanel 组件
*
* 该文件实现了一个提供裁判功能和游戏管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category judge
* @filepath voting\VotingPanel.tsx
 */
interface VotingPanelProps  { roomId: string;
  gameStateId?: string;
  currentPhase?: number;
  currentRound?: number;
  isJudge: boolean; // 移除默认值，强制上层传入
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void
}

/**
* VotingPanel 组件
*
* 提供裁判功能和游戏管理
*
* @component
* @param { VotingPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useMemo, useEffect, useVotingSystem, useAuth, usePlayersRealtime, useRoleStates, useRoleDesigns
*
* @example
* // 使用示例
* <VotingPanel { ...props } />
 */
const VotingPanel: React.FC<VotingPanelProps> = ( { roomId,
  gameStateId,
  currentPhase,
  currentRound = 1,
  isJudge,
  selectedTargetId,
  onTargetSelect }) => { const { currentUser, requireAuth, isLoggedIn  } = useAuth();

  // 自动加入房间
  useEffect(() => { const joinRoom = async () => {
      if (!currentUser || !roomId) return;

      try {
        await supabase.rpc('join_room_as_player', { p_room_id: roomId  
});
        console.log('Successfully joined room')
} catch (error) { console.error('Failed to join room:', error)
}
    };

    joinRoom()
}, [currentUser, roomId]);

  // 检查认证状态
  if (!isLoggedIn || !currentUser) { return (;
      <Card className='bg-werewolf-card border-werewolf-purple/30'>;
      <CardContent className='p-6 text-center'>;
      <div className='text-gray-400'>;
      <Vote className='h-12 w-12 mx-auto mb-4 opacity-50' />;
      <p>请先登录以参与投票</p>
      </div>
      </CardContent>
      </Card>
    )
}
  const { players  } = usePlayersRealtime(roomId);
  const { roleStates  } = useRoleStates(roomId);
  const { roleDesigns  } = useRoleDesigns();
  // 使用外部传入的选中目标，而不是内部状态
  const selectedTarget = selectedTargetId || '';

  const { currentSession,
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
    getVotersForTarget } = useVotingSystem(gameStateId, roomId);

  const userVote = currentUser ? getUserVote(currentUser.id) : null;
  const canVote = currentSession?.status === 'active' && !userVote;
  const votingSummary = getVotingSummary();

  // 获取当前用户的角色信息
  const currentUserRole = useMemo(() => {
  if (!currentUser) return null;
    const roleState = roleStates.find(rs => rs.user_id === currentUser.id);
    if (!roleState) return null;
    return roleDesigns.find(role => role.id === roleState.role_id)

}, [currentUser, roleStates, roleDesigns]);

  // 检查是否可以投票给自己（只有白狼王可以）
  const canVoteForSelf = useMemo(() => {
  return currentUserRole?.role_name === 'whitewolf'

}, [currentUserRole]);

  // 过滤可投票的玩家列表
  const votablePlayers = useMemo(() => { return players.filter(player => {
      // 如果是当前用户且不能投票给自己，过滤掉
      if (player.userId === currentUser?.id && !canVoteForSelf) {
        return false
}
      return true
})
}, [players, currentUser?.id, canVoteForSelf]);

/**
 * handleVote函数
 * 处理事件
 *
 * @param targetId? - targetId?参数
 * @returns Promise<void>
 */
const handleVote = async (targetId?: string) =>  { // 再次确保用户已登录（双重保护）
    if (!requireAuth() || !currentUser) return;

    const success = await castVote(currentUser.id, targetId);
    if (success && onTargetSelect) {
      onTargetSelect(''); // 清除选中状态 }
  };

/**
 * handleCalculateResults函数
 * 处理事件
 * @returns Promise<void>
 */
const handleCalculateResults = async () =>  {
  await calculateResults()

};

/**
 * handleProcessResult函数
 * 处理事件
 *
 * @param resultId - resultId参数
 * @returns Promise<void>
 */
const handleProcessResult = async (resultId: string) =>  {
  await processResult(resultId)

};

/**
 * getVoteStatusColor函数
 * 获取数据
 *
 * @param targetId - targetId参数
 * @returns void
 */
const getVoteStatusColor = (targetId: string) =>  {
  const voteCount = getTargetVoteCount(targetId);
    if (voteCount === 0) return 'bg-gray-500/20 text-gray-400';
    if (voteCount >= players.length / 2) return 'bg-red-500/20 text-red-400';
    return 'bg-yellow-500/20 text-yellow-400'

};

  // 手动创建投票会话
/**
 * handleCreateSession函数
 * 创建新项
 * @returns Promise<void>
 */
const handleCreateSession = async () =>  { if (!gameStateId || !roomId) return;
    const sessionId = await createVotingSession(currentRound, currentPhase || 1, 'day_vote');
    if (sessionId) {
      console.log('Manual voting session created:', sessionId)
}
  };

  // 渲染无会话状态 - 显示创建选项而不是隐藏整个界面
/**
 * renderNoSessionState函数
 * renderNoSessionState函数的功能描述
 * @returns void
 */
  const renderNoSessionState = () => (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader className='pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center justify-between'>;
    <div className='flex items-center'>;
    <Vote className='mr-2 h-5 w-5' />;
    投票系统
    </div>
    <Badge variant='outline' className='text-yellow-400 border-yellow-400'>;
    未激活
    </Badge>
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>;
    <div className='text-center p-6'>;
    <AlertTriangle className='h-12 w-12 mx-auto mb-4 text-yellow-400 opacity-70' />;
    <p className='text-gray-300 mb-4'>投票会话尚未创建</p>;
    <p className='text-sm text-gray-400 mb-4'>;
    当前轮次: { currentRound 
}, 阶段: { currentPhase === 1 ? '白天' : currentPhase === 2 ? '傍晚' : currentPhase === 3 ? '夜晚' : '黎明' 
}
    </p>

    { /*  显示可投票的玩家列表  */ }
    <div className='p-3 bg-werewolf-dark/20 rounded-md mb-4'>;
    <h4 className='text-sm font-medium text-werewolf-purple mb-2'>可投票玩家列表</h4>;
    <div className='grid grid-cols-2 gap-2'>;
    { votablePlayers.map(player => (;
      <div key={player.userId } className='p-2 bg-werewolf-dark/40 rounded text-sm text-gray-300'>;
      { player.name }
      </div>
    ))}
    </div>
    </div>

    { (isJudge || currentPhase === 1) && (;
      <Button
      onClick={handleCreateSession }
      disabled={ loading }
      className='bg-werewolf-purple hover:bg-werewolf-purple/80';
      >
      { loading ? '创建中...' : '创建投票会话' 
}
      </Button>
    )}
    </div>
    </CardContent>
    </Card>
  );

  if (!currentSession) { return renderNoSessionState()
}

  return (;
    <div className='space-y-4'>;
    { /*  投票情况列表  */ }
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader className='pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center justify-between'>;
    <div className='flex items-center'>;
    <Vote className='mr-2 h-5 w-5' />;
    投票情况
    </div>
    { currentSession && (
      <Badge variant='outline' className='text-green-400 border-green-400'>;
      {currentSession.session_type === 'day_vote' ? '白天投票' : '放逐投票' 
}
      </Badge>
    )}
    </CardTitle>
    </CardHeader>

    <CardContent className='space-y-4'>;
    { currentSession ? (
      <>
      {/*  投票状态统计  */ }
      <div className='flex items-center justify-between p-3 bg-werewolf-dark/40 rounded-md'>;
      <div className='flex items-center space-x-2'>;
      <Clock className='h-4 w-4 text-werewolf-purple' />;
      <span className='text-sm text-gray-300'>投票进行中</span>;
      </div>
      <div className='flex items-center space-x-2'>;
      <Users className='h-4 w-4 text-werewolf-purple' />;
      <span className='text-sm text-gray-300'>;
      { votingSummary.totalVotes } / { players.length } 已投票
      </span>
      { votingSummary.abstentions > 0 && (
        <Badge variant='outline' className='text-gray-400 text-xs'>;
        {votingSummary.abstentions } 弃权
        </Badge>
      )}
      </div>
      </div>

      { /*  投票详情列表  */ }
      <div className='space-y-2'>;
      <h4 className='text-sm font-medium text-werewolf-purple'>投票详情 (按得票数排序)</h4>;
      <ScrollArea className='max-h-48'>;
      <div className='space-y-2'>;
      { /*  显示有票数的目标 - 按得票数从高到低排序  */
} { Object.entries(votingSummary.votesByTarget)
      .sort(([, aVoteCount], [, bVoteCount]) => bVoteCount - aVoteCount);
      .map(([targetId, voteCount]) => {
        const targetPlayer = players.find(p => p.userId === targetId);
        const voters = getVotersForTarget(targetId);
        return (;
          <div key={targetId } className='border border-werewolf-purple/20 rounded-md p-3'>;
          <div className='flex items-center justify-between mb-2'>;
          <span className='text-gray-300 font-medium'>{ targetPlayer?.name || '未知玩家' }</span>;
          <Badge variant='outline' className='text-werewolf-purple'>;
          { voteCount } 票
          </Badge>
          </div>
          { voters.length > 0 && (
            <div className='text-xs text-gray-400'>;
            投票者: {voters.map(voter => {
  const voterPlayer = players.find(p => p.userId === voter.voterId);
              return voterPlayer?.name || '未知玩家'
}).join(', ')}
            </div>
          )}
          </div>
        )
})
}

      { /*  显示弃权票  */
} { votingSummary.voteDetails['abstention'] && (
        <div className='border border-gray-500/20 rounded-md p-3'>;
        <div className='flex items-center justify-between mb-2'>;
        <span className='text-gray-300 font-medium'>弃权</span>;
        <Badge variant='outline' className='text-gray-400'>;
        {votingSummary.abstentions } 票
        </Badge>
        </div>
        <div className='text-xs text-gray-400'>;
        弃权者: { votingSummary.voteDetails['abstention'].map(vote => {
  const voterPlayer = players.find(p => p.userId === vote.voterId);
          return voterPlayer?.name || '未知玩家'
}).join(', ')}
        </div>
        </div>
      )
}

      { /*  如果没有投票记录  */
} { !votingSummary.hasVotes && (
        <div className='text-center p-4 text-gray-400'>;
        <Users className='h-8 w-8 mx-auto mb-2 opacity-50' />;
        <p className='text-sm'>暂无投票记录</p>;
        </div>
      ) }
      </div>
      </ScrollArea>
      </div>

      { /*  投票结果  */
} { results.length > 0 && (
        <div className='space-y-3'>;
        <h4 className='text-sm font-medium text-werewolf-purple'>投票结果</h4>;
        <ScrollArea className='max-h-32'>;
        <div className='space-y-2'>;
        {results.map(result => (;
          <div key={result.id } className='p-2 bg-werewolf-dark/40 rounded-md'>;
          <div className='flex items-center justify-between'>;
          <span className='text-gray-300'>;
          { result.target_id ?
          players.find(p => p.userId === result.target_id)?.name || '未知玩家' : unknown;
          '无目标' }
        </span>
        <div className='flex items-center space-x-2'>;
        <Badge variant='outline' className='text-werewolf-purple'>;
        { result.total_votes } 票
        </Badge>
        <Badge
        variant='outline';
        className={ result.result_type === 'eliminated' ? 'text-red-400 border-red-400' : unknown;
          result.result_type === 'tied' ? 'text-yellow-400 border-yellow-400' : unknown;
          'text-gray-400 border-gray-400' }
        >
        { result.result_type === 'eliminated' ? '被淘汰' : unknown;
        result.result_type === 'tied' ? '平票' : unknown;
        result.result_type === 'saved' ? '获救' : '无结果' 
}
        </Badge>
        { result.processing_status !== 'completed' && (;
          <Badge variant='outline' className='text-orange-400 border-orange-400'>;
          {result.processing_status === 'pending' ? '待处理' : unknown;
          result.processing_status === 'processing' ? '处理中' : '失败' 
}
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
  ) : (
    <div className='text-center p-6'>;
    <AlertTriangle className='h-12 w-12 mx-auto mb-4 text-yellow-400 opacity-70' />;
    <p className='text-gray-300 mb-2'>投票会话尚未创建</p>;
    <p className='text-sm text-gray-400'>;
    当前轮次: { currentRound 
}, 阶段: { currentPhase === 1 ? '白天' : currentPhase === 2 ? '傍晚' : currentPhase === 3 ? '夜晚' : '黎明' 
}
    </p>
    </div>
  )}
  </CardContent>
  </Card>

  { /*  投票动作按钮  */
} { !isJudge && (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader className='pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center'>;
    <Gavel className='mr-2 h-5 w-5' />;
    投票动作
    </CardTitle>
    </CardHeader>

    <CardContent className='space-y-4'>;
    {userVote ? (
      /*  已投票状态  */
      <div className='p-4 bg-green-500/20 border border-green-500/30 rounded-md text-center'>;
      <div className='flex items-center justify-center space-x-2 mb-2'>;
      <CheckCircle className='h-5 w-5 text-green-400' />;
      <span className='text-green-400 font-medium'>已完成投票</span>;
      </div>
      <p className='text-sm text-gray-300'>;
      {userVote.target_id ? `投票目标: ${
        players.find(p => p.userId === userVote.target_id)?.name || '未知玩家'
}` : '选择弃权'
}
      </p>
      </div>
    ) : canVote ? (
      /*  投票操作界面  */
<div className='space-y-4'>; { /*  选择目标显示  */
} { selectedTarget ? (
        <div className='p-3 bg-werewolf-purple/20 border border-werewolf-purple/50 rounded-md'>;
        <div className='flex items-center justify-between'>;
        <span className='text-werewolf-purple font-medium'>;
        选择目标: {players.find(p => p.userId === selectedTarget)?.name || '未知玩家' 
}
        </span>
        <Badge variant='outline' className='text-werewolf-purple'>;
        当前 { getTargetVoteCount(selectedTarget) } 票
        </Badge>
        </div>
        </div>
      ) : (
        <div className='p-3 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>;
        <p className='text-sm text-gray-400'>请在游戏信息面板中点击玩家卡片选择投票目标</p>;
        </div>
      )}

      { /*  投票按钮  */ }
      <div className='grid grid-cols-2 gap-3'>;
      <Button
      onClick={ () => handleVote(selectedTarget || undefined) }
      disabled={ loading || !selectedTarget }
      className='bg-werewolf-purple hover:bg-werewolf-purple/80 disabled:opacity-50';
      >
      { loading ? '投票中...' : '确认投票' 
}
      </Button>
      <Button
      onClick={ () => handleVote(undefined) }
      disabled={ loading }
      variant='outline';
      className='border-gray-500 text-gray-300 hover:bg-gray-500/20';
      >
      { loading ? '处理中...' : '弃权' 
}
      </Button>
      </div>
      </div>
    ) : (
      /*  不可投票状态  */
      <div className='p-4 bg-gray-500/20 border border-gray-500/30 rounded-md text-center'>;
      <p className='text-sm text-gray-400'>;
      { currentSession?.status !== 'active' ? '投票会话已结束' : '当前无法投票' 
}
      </p>
      </div>
    )}

    { /*  手动创建投票会话按钮  */
} { !currentSession && (isJudge || currentPhase === 1) && (;
      <div className='pt-4 border-t border-werewolf-purple/20'>;
      <Button
      onClick={handleCreateSession }
      disabled={ loading }
      variant='outline';
      className='w-full border-werewolf-purple text-werewolf-purple hover:bg-werewolf-purple/20';
      >
      { loading ? '创建中...' : '创建投票会话' 
}
      </Button>
      </div>
    )}
    </CardContent>
    </Card>
  )}
  </div>
)
};

/**
 * VotingPanel组件
 * VotingPanel组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default VotingPanel;
