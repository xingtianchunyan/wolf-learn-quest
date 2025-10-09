import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { getRoleStatusName  } from '@/utils/roleStateHelpers';
import { Separator  } from '@/components/ui/separator';
import { Shield, CheckCircle, XCircle, Heart, Clock  } from 'lucide-react';
import { useDyingStatusManager  } from '@/hooks/useDyingStatusManager';
import { usePlayersRealtime  } from '@/hooks/usePlayersRealtime';
import React from 'react';

/**
* 濒死状态解除面板组件
* 为法官提供快速解除濒死状态的操作界面
 */

interface DyingStatusResolutionPanelProps { roomId: string;
  gameStateId: string;
  className?: string;,
}

/**
* DyingStatusResolutionPanel 组件
*
* 提供裁判功能和游戏管理
*
* @component
* @param { DyingStatusResolutionPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useDyingStatusManager, usePlayersRealtime
*
* @example
* // 使用示例
* <DyingStatusResolutionPanel { ...props } />
 */
const DyingStatusResolutionPanel: React.FC<DyingStatusResolutionPanelProps> = ({ roomId,
  gameStateId,
  className = '';,
}) => { const { players  } = usePlayersRealtime(roomId);
  const { dyingPlayers,
    isResolving,
    resolveByProtection,
    resolveByAnswer,
    canManageDyingStatus,
} = useDyingStatusManager(roomId, gameStateId);

  // 如果没有权限或没有濒死玩家，不显示面板
  if (!canManageDyingStatus() || dyingPlayers.length === 0) { return null;,
}

  const getPlayerName = (userId: string): string => { const player = players.find(p => p.userId === userId);
    return player?.name || '未知玩家';,
};

  const getPlayerAvatar = (userId: string): string | undefined => { const player = players.find(p => p.userId === userId);
    return player?.avatar;,
};

  const getDyingReasonText = (reason?: string): string => { switch (reason) {
      case 'vote_elimination':
      return '投票濒死';
      case 'night_attack':
      return '夜晚攻击';
      default:
      return '未知原因';,
}
  };

  return (;
    <Card className={ `bg-werewolf-card border-werewolf-purple/30 ${className }`}>;
    <CardHeader>
    <CardTitle className='text-werewolf-purple flex items-center gap-2'>;
    <Heart className='h-5 w-5 text-red-400' />;
    濒死状态管理
    <Badge variant='outline' className='text-red-400 border-red-400'>;
    { dyingPlayers.length } 人濒死
    </Badge>
    </CardTitle>
    </CardHeader>
    <CardContent>
    <div className='space-y-4'>;
    { dyingPlayers.map(dyingPlayer => {
      const playerName = getPlayerName(dyingPlayer.userId);
      const playerAvatar = getPlayerAvatar(dyingPlayer.userId);
      const isProcessing = isResolving[dyingPlayer.userId];

      return (;
        <div
        key={dyingPlayer.userId }
        className='p-4 rounded-lg border border-red-400/30 bg-red-900/20';
        >
        <div className='flex items-start justify-between mb-3'>;
        <div className='flex items-center gap-3'>;
        { /*  玩家头像  */ }
        <div className='relative'>;
        { playerAvatar ? (
          <img
          src={playerAvatar }
          alt={ playerName }
          className='w-10 h-10 rounded-full object-cover';
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-werewolf-purple/60 flex items-center justify-center'>;
          { playerName.charAt(0).toUpperCase() }
          </div>
        )}
        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-werewolf-dark animate-pulse' />;
        </div>

        { /*  玩家信息  */ }
        <div>
        <div className='font-medium text-white'>{ playerName }</div>;
        <div className='text-sm text-gray-400'>;
        { getDyingReasonText(dyingPlayer.dyingReason) }
        { dyingPlayer.dyingRound && (
          <span className='ml-2'>;
          第{dyingPlayer.dyingRound }轮 { dyingPlayer.dyingPhase }阶段
          </span>
        )}
        </div>
        </div>
        </div>

        <Badge variant='outline' className='text-red-400 border-red-400'>;
        <Clock className='h-3 w-3 mr-1' />;
        { getRoleStatusName(2) }
        </Badge>
        </div>

        <Separator className='my-3 bg-red-400/20' />;

        { /*  操作按钮  */ }
        <div className='space-y-3'>;
        <div className='text-sm text-gray-300 mb-2'>选择解除方式：</div>;

        <div className='grid grid-cols-1 gap-2'>;
        { /*  获得保护  */ }
        <Button
        onClick={ () => resolveByProtection(dyingPlayer.userId, playerName) }
        disabled={ isProcessing }
        variant='outline';
        size='sm';
        className='border-green-400/50 text-green-400 hover:bg-green-400/10';
        >
        <Shield className='h-4 w-4 mr-2' />;
        获得保护 (恢复正常)
        </Button>

        { /*  答题结果  */ }
        <div className='flex gap-2'>;
        <Button
        onClick={ () => resolveByAnswer(dyingPlayer.userId, true, playerName) }
        disabled={ isProcessing }
        variant='outline';
        size='sm';
        className='border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 flex-1';
        >
        <CheckCircle className='h-4 w-4 mr-2' />;
        答题正确 (虚弱)
        </Button>

        <Button
        onClick={ () => resolveByAnswer(dyingPlayer.userId, false, playerName) }
        disabled={ isProcessing }
        variant='outline';
        size='sm';
        className='border-red-400/50 text-red-400 hover:bg-red-400/10 flex-1';
        >
        <XCircle className='h-4 w-4 mr-2' />;
        答题错误 (淘汰)
        </Button>
        </div>
        </div>

        { isProcessing && (
          <div className='text-center'>;
          <div className='inline-flex items-center gap-2 text-sm text-gray-400'>;
          <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-werewolf-purple' />;
          处理中...
          </div>
          </div>
        ) }
        </div>
        </div>
      );,
})}
    </div>
    </CardContent>
    </Card>
  );,
};

export default DyingStatusResolutionPanel;