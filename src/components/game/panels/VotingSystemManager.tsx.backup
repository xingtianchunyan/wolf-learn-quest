import { Badge as _Badge  } from '@/components/ui/badge';
import { Card, CardContent, CardHeader as _CardHeader, CardTitle as _CardTitle  } from '@/components/ui/card';
import { Separator as _Separator  } from '@/components/ui/separator';
import { useGameState  } from '@/hooks/useGameState';
import { useVotingSystem  } from '@/hooks/useVotingSystem';
import { Vote, Clock as _Clock, Users as _Users, Gavel as _Gavel  } from 'lucide-react';
import React, { useEffect  } from 'react';
import VotingPanel from '@/components/voting/VotingPanel';

/**
* 文件级注释：VotingSystemManager 组件
*
* 该文件实现了一个提供通用功能组件，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category common
* @filepath game\panels\VotingSystemManager.tsx
 */

interface VotingSystemManagerProps { roomId: string;
  isJudge: boolean; // 移除默认值，强制上层传入,
}

/**
* VotingSystemManager 组件
*
* 提供通用功能组件
*
* @component
* @param { VotingSystemManagerProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useEffect, useGameState, useVotingSystem
*
* @example
* // 使用示例
* <VotingSystemManager { ...props } />
 */
const VotingSystemManager: React.FC<VotingSystemManagerProps> = ({ roomId,
  isJudge,
}) => { const { gameState  } = useGameState(roomId);
  const { currentSession: _currentSession, ensureDayVotingSession, fetchCurrentSession  } = useVotingSystem(gameState?.id, roomId);

  // 检查是否是投票阶段 - 白天和傍晚阶段都显示投票系统
  const isVotingPhase = gameState?.currentPhase === 1 || gameState?.currentPhase === 2; // 白天和傍晚阶段
  const gameStateId = gameState?.id;

  // 确保投票会话存在
  useEffect(() => { if (!gameStateId || !gameState) return;

    const handleVotingSession = async () => {
      if (gameState.currentPhase === 1) {
        // 白天阶段：确保有投票会话存在
        await ensureDayVotingSession(gameState.currentRound, gameState.currentPhase);,
} else if (gameState.currentPhase === 2) { // 傍晚阶段：获取白天阶段的投票会话
        await fetchCurrentSession(gameState.currentRound, 1);,
}
    };

    handleVotingSession();,
}, [gameState, gameState?.currentPhase, gameState?.currentRound, gameStateId, ensureDayVotingSession, fetchCurrentSession]);

  return (;
    <div className='space-y-4'>;

    { /*  投票面板 - 白天和傍晚阶段都显示  */ }
    { gameStateId && isVotingPhase && (
      <VotingPanel
      roomId={roomId }
      gameStateId={ gameStateId }
      currentPhase={ gameState?.currentPhase }
      currentRound={ gameState?.currentRound }
      isJudge={ isJudge }
      />
    )}

    { /*  非投票阶段提示  */ }
    { !isVotingPhase && (
      <Card>
      <CardContent className='py-6'>;
      <div className='text-center text-muted-foreground'>;
      <Vote className='h-12 w-12 mx-auto mb-2 opacity-50' />;
      <p className='text-sm'>;
      {gameState?.currentPhase === 3;
      ? '夜晚阶段 - 投票已结束'
      : gameState?.currentPhase === 4;
      ? '黎明阶段 - 准备新的一天'
      : '当前阶段不可投票',
}
    </p>
    </div>
    </CardContent>
    </Card>
  )}
  </div>
);,
};

export default VotingSystemManager;