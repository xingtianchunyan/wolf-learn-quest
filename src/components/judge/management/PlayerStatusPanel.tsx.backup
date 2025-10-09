import { Badge  } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { createLogger  } from '@/lib/logger';
import { ScrollArea  } from '@/components/ui/scroll-area';
import { supabase  } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow  } from '@/components/ui/table';
import { useAuth  } from '@/providers/AuthProvider';
import { usePlayerPresence  } from '@/hooks/usePlayerPresence';
import { usePlayersRealtime  } from '@/hooks/usePlayersRealtime';
import { useRoleSelection  } from '@/hooks/useRoleSelection';
import { useRoleStates  } from '@/hooks/useRoleStates';
import { Users, Wifi, WifiOff, UserCheck, UserX, Crown, Bot  } from 'lucide-react';
import React, { useState, useEffect  } from 'react';

/**
* 文件级注释：PlayerStatusPanel 组件
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
* @filepath judge\management\PlayerStatusPanel.tsx
 */

const logger = createLogger('player-status-panel');

interface Player { id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
  role?: string;
  userId?: string;,
}

interface PlayerStatusPanelProps { roomId: string;
  className?: string;,
}

/**
* PlayerStatusPanel 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { PlayerStatusPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, usePlayersRealtime, usePlayerPresence, useAuth, useRoleSelection, useRoleStates
*
* @example
* // 使用示例
* <PlayerStatusPanel { ...props } />
 */
const PlayerStatusPanel: React.FC<PlayerStatusPanelProps> = ({ roomId, className  }) => { const { currentUser  } = useAuth();
  const { players, loading: playersLoading  } = usePlayersRealtime(roomId);
  const { getOnlinePlayers  } = usePlayerPresence(roomId, currentUser);
  const onlinePlayersList = getOnlinePlayers();

  const [maxPlayers, setMaxPlayers] = useState(8);

  useEffect(() => { const fetchRoomData = async () => {
      if (!roomId) return;
      const { data, error  } = await supabase;
      .from('rooms')
      .select('max_players')
      .eq('id', roomId)
      .single();

      if (error) { logger.error('Error fetching max players for PlayerStatusPanel:', error);,
} else if (data && data.max_players) { setMaxPlayers(data.max_players);,
}
    };
    fetchRoomData();,
}, [roomId]);

  const { getSelectedRoleByUser, loading: roleSelectionLoading  } = useRoleSelection(;
    roomId,
    currentUser?.id || null,
    players.length,
    maxPlayers
  );

  const { roleStates  } = useRoleStates(roomId);

  const getPlayerRoleStatus = (userId?: string) => { if (!userId) return 1; // 默认正常
    const rs = roleStates.find(r => r.user_id === userId);
    return rs?.role_status ?? 1;,
};

  const getStatusMeta = (status: number) => { switch (status) {
      case 1: // 正常
      return { label: '正常', barClass: 'bg-green-400', badgeClass: 'text-green-400 border-green-400', breath: false  };
      case 3: // 虚弱
      return { label: '虚弱', barClass: 'bg-yellow-400', badgeClass: 'text-yellow-400 border-yellow-400', breath: false  };
      case 2: // 濒死
      return { label: '濒死', barClass: 'bg-red-400', badgeClass: 'text-red-400 border-red-400', breath: true  };
      case 4: // 淘汰
      return { label: '淘汰', barClass: 'bg-white', badgeClass: 'text-white border-white', breath: false  };
      default:
      return { label: '未知', barClass: 'bg-gray-400', badgeClass: 'text-gray-400 border-gray-400', breath: false  };,
}
  };

  const isPlayerOnline = (player: Player) => { if (player.isAI) {
      return true;,
}

    if (!player.userId) { return false;,
}

    return onlinePlayersList.some(onlinePlayer => onlinePlayer.user_id === player.userId);,
};

  return (;
    <Card className={ `bg-werewolf-card border-werewolf-purple/30 ${className }`}>;
    <CardHeader className='pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center text-lg'>;
    <Users className='mr-2 h-5 w-5' />;
    玩家状态
    </CardTitle>
    </CardHeader>
    <CardContent className='p-4 pt-0 h-[calc(100%-80px)]'>;
    <ScrollArea className='h-full'>;
    <div className='border border-werewolf-purple/30 rounded-md'>;
    <Table>
    <TableHeader>
    <TableRow className='border-werewolf-purple/30'>;
    <TableHead className='text-werewolf-purple'>玩家ID</TableHead>;
    <TableHead className='text-werewolf-purple'>角色</TableHead>;
    <TableHead className='text-werewolf-purple'>在线状态</TableHead>;
    <TableHead className='text-werewolf-purple'>准备状态</TableHead>;
    <TableHead className='text-werewolf-purple'>特殊标识</TableHead>;
    </TableRow>
    </TableHeader>
    <TableBody>
    { playersLoading || roleSelectionLoading ? (
      <TableRow>
      <TableCell colSpan={5 } className='text-center text-gray-400 py-4'>;
      加载中...
      </TableCell>
      </TableRow>
    ) : players.length === 0 ? (;
      <TableRow>
      <TableCell colSpan={ 5 } className='text-center text-gray-400 py-4'>;
      暂无玩家
      </TableCell>
      </TableRow>
    ) : (
      players.map(player => { const playerOnline = isPlayerOnline(player);
        const selectedRole = player.userId ? getSelectedRoleByUser(player.userId) : null;
        const roleName = selectedRole?.roleName || '未选择';
        const statusNum = getPlayerRoleStatus(player.userId);
        const meta = getStatusMeta(statusNum);

        return (;
          <TableRow key={player.id } className='border-werewolf-purple/30'>;
          <TableCell className='text-gray-300 font-medium'>;
          <div className='flex items-center gap-2'>;
          <span className={ `inline-block h-4 w-1 rounded bg-werewolf-purple` } aria-hidden='true'></span>;
          { player.name }
          </div>
          </TableCell>
          <TableCell className='text-gray-300'>;
          { roleName }
          </TableCell>
          <TableCell>
          <div className='flex items-center space-x-2'>;
          { playerOnline ? (
            <Wifi className='h-4 w-4 text-green-400' />;
          ) : (
            <WifiOff className='h-4 w-4 text-red-400' />;
          ) }
          <span className={ `text-sm ${playerOnline ? 'text-green-400' : 'text-red-400' }`}>;
          { playerOnline ? '在线' : '离线' }
          </span>
          </div>
          </TableCell>
          <TableCell>
          <div className='flex items-center space-x-2'>;
          { player.isReady ? (
            <UserCheck className='h-4 w-4 text-green-400' />;
          ) : (
            <UserX className='h-4 w-4 text-red-400' />;
          ) }
          <span className={ `text-sm ${player.isReady ? 'text-green-400' : 'text-red-400' }`}>;
          { player.isReady ? '已准备' : '未准备' }
          </span>
          </div>
          </TableCell>
          <TableCell>
          <div className='flex items-center space-x-2'>;
          <Badge variant='outline' className='text-werewolf-purple border-werewolf-purple/50'>{ meta.label }</Badge>;
          { player.isHost && <Crown className='h-4 w-4 text-yellow-400' /> }
          { player.isAI && <Bot className='h-4 w-4 text-blue-400' /> }
          </div>
          </TableCell>
          </TableRow>
        );,
})
    )}
    </TableBody>
    </Table>
    </div>
    </ScrollArea>
    </CardContent>
    </Card>
  );,
};

export default PlayerStatusPanel;
