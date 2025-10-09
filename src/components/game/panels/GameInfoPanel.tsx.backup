import { Card, CardHeader, CardTitle  } from '@/components/ui/card';
import { GamepadIcon, Clock, Play, Pause  } from 'lucide-react';
import { supabase  } from '@/integrations/supabase/client';
import { useGameState  } from '@/hooks/useGameState';
import { usePlayersRealtime  } from '@/hooks/usePlayersRealtime';
import React, { useState, useEffect  } from 'react';
import GamePlayerStatusDisplay from '../displays/GamePlayerStatusDisplay';

/**
* 文件级注释：GameInfoPanel 组件
*
* 该文件实现了一个处理游戏逻辑和状态管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category game
* @filepath game\panels\GameInfoPanel.tsx
 */

interface GameInfoPanelProps { roomId: string;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;,
}

/**
* GameInfoPanel 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { GameInfoPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useGameState, usePlayersRealtime
*
* @example
* // 使用示例
* <GameInfoPanel { ...props } />
 */
const GameInfoPanel: React.FC<GameInfoPanelProps> = ({ roomId,
  selectedTargetId,
  onTargetSelect,
  canSelectTargets = false;,
}) => { const { gameState, getPhaseDisplayName, formatTime, timeRemaining  } = useGameState(roomId);
  const { players: realPlayers  } = usePlayersRealtime(roomId);
  const [maxPlayers, setMaxPlayers] = useState(8);

  useEffect(() => { const fetchRoomData = async () => {
      const { data  } = await supabase;
      .from('rooms')
      .select('max_players')
      .eq('id', roomId)
      .single();
      if (data && data.max_players) { setMaxPlayers(data.max_players);,
}
    };
    if (roomId) { fetchRoomData();,
}
  }, [roomId]);

  const getGameStatusDisplay = () => { if (!gameState) return '准备阶段 - 等待中';

    switch (gameState.status) {
      case 'waiting':
      return '准备阶段 - 等待开始';
      case 'active':
      return `第${gameState.currentRound }轮 - ${ getPhaseDisplayName(gameState.currentPhase) }阶段`;
      case 'ended':
      return '游戏已结束';
      default:
      return '未知状态';,
}
  };

  const showTimer = gameState?.status === 'active' && gameState.phaseEndTime && !gameState.isPaused;

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full overflow-hidden flex flex-col'>;
    <CardHeader className='pb-3 flex-shrink-0'>;
    <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>;
    <div className='flex items-center'>;
    <GamepadIcon className='mr-2 h-5 w-5' />;
    游戏信息
    </div>
    { gameState?.status === 'active' && (;
      <div className='flex items-center text-sm'>;
      {gameState.isPaused ? (
        <div className='flex items-center text-yellow-400'>;
        <Pause className='h-4 w-4 mr-1' />;
        已暂停
        </div>
      ) : (
        <div className='flex items-center text-green-400'>;
        <Play className='h-4 w-4 mr-1' />;
        进行中
        </div>
      ) }
      </div>
    )}
    </CardTitle>
    </CardHeader>

    { /*  当前游戏轮次和阶段  */ }
    <div className='text-center p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0 m-4 mb-3'>;
    <h2 className='text-lg font-bold text-werewolf-purple mb-2'>;
    { getGameStatusDisplay() }
    </h2>

    { /*  显示倒计时  */ }
    { showTimer && (
      <div className='flex items-center justify-center text-sm font-semibold'>;
      <Clock className='h-4 w-4 mr-2 text-werewolf-purple' />;
      <span className={`${
        timeRemaining <= 10 ? 'text-red-400' :;
        timeRemaining <= 30 ? 'text-yellow-400' :;
        'text-werewolf-purple',
}`}>
      剩余时间: { formatTime(timeRemaining) }
      </span>
      </div>
    )}

    { /*  游戏状态说明  */ }
    { gameState && (
      <div className='text-xs text-gray-400 mt-1'>;
      {gameState.status === 'waiting' && '等待法官开始游戏' }
      { gameState.status === 'active' && gameState.currentPhase === 1 && '白天讨论阶段' }
      { gameState.status === 'active' && gameState.currentPhase === 2 && '傍晚答题阶段' }
      { gameState.status === 'active' && gameState.currentPhase === 3 && '夜晚行动阶段' }
      { gameState.status === 'active' && gameState.currentPhase === 4 && '黎明答题阶段' }
      { gameState.status === 'ended' && '游戏结束，可查看结算' }
      </div>
    )}
    </div>

    { /*  玩家状态标题  */ }
    <div className='flex items-center justify-between flex-shrink-0 mx-4 mb-3'>;
    <h3 className='font-semibold text-werewolf-purple text-sm'>;
    玩家状态 { canSelectTargets && '(点击选择目标)' }
    </h3>
    <div className='flex items-center gap-2 text-xs text-gray-400'>;
    <span className='inline-flex items-center gap-1'>;
    <span className='inline-block w-2 h-2 rounded-full border border-green-400'></span>正常;
    </span>
    <span className='inline-flex items-center gap-1'>;
    <span className='inline-block w-2 h-2 rounded-full border border-yellow-400'></span>虚弱;
    </span>
    <span className='inline-flex items-center gap-1'>;
    <span className='inline-block w-2 h-2 rounded-full border border-red-400 animate-pulse'></span>濒死;
    </span>
    <span className='inline-flex items-center gap-1'>;
    <span className='inline-block w-2 h-2 rounded-full border border-white'></span>淘汰;
    </span>
    </div>
    </div>

    { /*  玩家状态列表  */ }
    <div className='flex-1 min-h-0 overflow-hidden mx-4 mb-4'>;
    <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-werewolf-purple/50 scrollbar-track-transparent'>;
    <GamePlayerStatusDisplay
    players={ realPlayers }
    roomId={ roomId }
    maxPlayers={ maxPlayers }
    selectedTargetId={ selectedTargetId }
    onTargetSelect={ onTargetSelect }
    canSelectTargets={ canSelectTargets }
    currentPhase={ gameState?.currentPhase }
    />
    </div>
    </div>
    </Card>
  );,
};

export default GameInfoPanel;