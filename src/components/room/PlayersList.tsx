import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { ScrollArea   } from '@/components/ui/scroll-area';
import { useLanguage   } from '@/components/layout/LanguageSwitcher';
import { Users, Crown, Bot, Plus, Minus, UserCheck, UserX, Wifi, WifiOff   } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：PlayersList 组件
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
* @filepath room\PlayersList.tsx
 */
interface Player  { id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
  userId?: string; // 添加userId字段用于在线状态检查 
}

interface PlayersListProps { players: Player[];
  maxPlayers: number;
  isReady: boolean;
  allReady: boolean;
  selectedCharacter: string | null;
  loading: boolean;
  onReadyToggle: () => void;
  onLeaveRoom: () => void;
  onStartGame: () => void;
  onAddAIPlayer: () => void;
  onMaxPlayersChange: (increment: number) => void;
  onlinePlayers: string[];
  allPlayersSelectedRoles: boolean;
  canSelectRoles: boolean;
  currentPlayerHasSelectedRole?: boolean; // 新增：当前玩家是否已选择角色 
}

/**
* PlayersList 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { PlayersListProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useLanguage
*
* @example
* // 使用示例
* <PlayersList { ...props } />
 */
const PlayersList: React.FC<PlayersListProps> = ( { players,
  maxPlayers,
  isReady,
  allReady,
  selectedCharacter,
  loading,
  onReadyToggle,
  onLeaveRoom,
  onStartGame,
  onAddAIPlayer,
  onMaxPlayersChange,
  onlinePlayers,
  allPlayersSelectedRoles,
  canSelectRoles,
  currentPlayerHasSelectedRole = false
}) => { const { t  } = useLanguage();

  // 检查是否可以点击准备按钮
/**
 * canToggleReady函数
 * canToggleReady函数的功能描述
 * @returns void
 */
const canToggleReady = () =>  { // 必须先开放角色选择功能
    if (!canSelectRoles) {
      return false
}
    // 所有玩家都必须选择角色后才能准备
    if (!allPlayersSelectedRoles) { return false
}
    // 如果要进入准备状态，必须先选择角色（使用数据库状态而非本地状态）
    if (!isReady && !currentPlayerHasSelectedRole) { return false
}
    return true
};

/**
 * getReadyButtonText函数
 * 获取数据
 * @returns void
 */
const getReadyButtonText = () => { if (!canSelectRoles)  {
      return `等待人数达到${maxPlayers }人`
}
    if (!allPlayersSelectedRoles) { return '等待所有玩家选择角色'
}
    if (!isReady && !currentPlayerHasSelectedRole) { return '请先选择角色'
}
    return isReady ? t('cancel_ready') : t('ready')
};

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader>
    <CardTitle className='text-werewolf-purple flex items-center'>;
    <Users className='mr-2 h-5 w-5' />;
    { t('players_list') } ({ players.length }/{ maxPlayers })
    </CardTitle>
    </CardHeader>
    <CardContent>
    <div className='space-y-4'>;
    { /*  人数调整控制  */ }
    <div className='flex items-center justify-between p-2 bg-werewolf-dark/20 rounded'>;
    <span className='text-sm text-gray-400'>{ t('max_players') }</span>;
    <div className='flex items-center gap-2'>;
    <Button
    variant='outline';
    size='sm';
    onClick={ () => onMaxPlayersChange(-1) }
    disabled={ maxPlayers <= 6 }
    className='h-6 w-6 p-0';
    >
    <Minus className='h-3 w-3' />;
    </Button>
    <span className='text-sm font-bold w-8 text-center'>{ maxPlayers }</span>;
    <Button
    variant='outline';
    size='sm';
    onClick={ () => onMaxPlayersChange(1) }
    disabled={ maxPlayers >= 12 }
    className='h-6 w-6 p-0';
    >
    <Plus className='h-3 w-3' />;
    </Button>
    </div>
    </div>

    { /*  游戏状态提示  */ }
    <div className='p-2 bg-werewolf-dark/20 rounded'>;
    <div className='text-xs text-gray-400 space-y-1'>;
    <div className='flex justify-between'>;
    <span>角色选择:</span>
    <span className={ canSelectRoles ? 'text-green-400' : 'text-yellow-400' 
}>;
    { canSelectRoles ? '已开放' : '等待人数' 
}
    </span>
    </div>
    <div className='flex justify-between'>;
    <span>准备功能:</span>
    <span className={ allPlayersSelectedRoles ? 'text-green-400' : 'text-yellow-400' 
}>;
    { allPlayersSelectedRoles ? '已开放' : '等待选角' 
}
    </span>
    </div>
    </div>
    </div>

    { /*  玩家列表  */ }
    <ScrollArea className='h-48'>;
    <div className='space-y-2'>;
    { loading ? (
      <div className='text-center text-gray-400 py-4'>;
      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto'></div>;
      <p className='mt-2'>{t('loading') }</p>;
      </div>
    ) : (
      players.map(player => (;
        <div
        key={ player.id }
        className={ `flex items-center justify-between p-2 rounded ${
          player.isReady ? 'bg-green-900/30' : 'bg-werewolf-dark/40' 
}`}
        >
        <div className='flex items-center space-x-2'>;
        <div className='relative'>;
        { player.avatar ? (
          <img
          src={player.avatar }
          alt={ player.name }
          className='w-8 h-8 rounded-full';
          />
        ) : (
          <div className='w-8 h-8 rounded-full bg-werewolf-purple/60 flex items-center justify-center'>;
          <span className='text-xs font-bold'>;
          { player.name.charAt(0).toUpperCase() }
          </span>
          </div>
        )}
        { /*  在线状态指示器  */ }
        <div className='absolute -top-1 -right-1'>;
        { player.isAI ? (
          <Bot className='h-3 w-3 text-blue-400' />;
        ) : player.userId && onlinePlayers.includes(player.userId) ? (
          <Wifi className='h-3 w-3 text-green-400' />;
        ) : (
          <WifiOff className='h-3 w-3 text-red-400' />;
        ) }
        </div>
        </div>
        <div>
        <div className='flex items-center space-x-1'>;
        <span className='font-medium'>{ player.name }</span>;
        { player.isHost && <Crown className='h-4 w-4 text-yellow-400' /> }
        { player.isAI && <Bot className='h-4 w-4 text-blue-400' /> }
        </div>
        </div>
        </div>
        <div className='flex items-center space-x-2'>;
        { player.isReady ? (
          <Badge variant='secondary' className='bg-green-600 text-white'>;
          <UserCheck className='h-3 w-3 mr-1' />;
          {t('ready') }
          </Badge>
        ) : (
          <Badge variant='outline' className='border-gray-400 text-gray-400'>;
          <UserX className='h-3 w-3 mr-1' />;
          { t('not_ready') }
          </Badge>
        )}
        </div>
        </div>
      ))
    )}
    </div>
    </ScrollArea>

    { /*  添加AI玩家按钮  */
} { players.length < maxPlayers && (
      <Button
      onClick={onAddAIPlayer }
      variant='outline';
      className='w-full border-werewolf-purple/50 hover:bg-werewolf-purple/20';
      >
      <Plus className='mr-2 h-4 w-4' />;
      { t('add_ai_player') }
      </Button>
    )}

    { /*  准备按钮  */ }
    <Button
    onClick={ onReadyToggle }
    disabled={ !canToggleReady() }
    className={ `w-full ${
      isReady
      ? 'bg-yellow-600 hover:bg-yellow-700'
      : canToggleReady()
      ? 'bg-green-600 hover:bg-green-700'
      : 'bg-gray-600 cursor-not-allowed' 
}`}
    >
    { getReadyButtonText() }
    </Button>

    { /*  开始游戏按钮 - 只有房主可见  */
} { players.find(p => p.name === 'You')?.isHost && (;
      <Button
      onClick={onStartGame }
      disabled={ !allReady }
      className='w-full bg-werewolf-purple hover:bg-werewolf-light disabled:bg-gray-600';
      >
      { t('start_game') }
      </Button>
    )}

    { /*  离开房间按钮  */ }
    <Button
    onClick={ onLeaveRoom }
    variant='destructive';
    className='w-full';
    >
    { t('leave_room') }
    </Button>
    </div>
    </CardContent>
    </Card>
  )
};

/**
 * PlayersList组件
 * 玩家相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default PlayersList;
