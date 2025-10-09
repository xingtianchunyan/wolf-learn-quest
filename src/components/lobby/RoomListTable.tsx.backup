import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from '@/components/ui/card';
import { Table,
import { User, Gavel  } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：RoomListTable 组件
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
* @filepath lobby\RoomListTable.tsx
 */

  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface GameRoom { id: string;
  roomId: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  hasAI: boolean;
  isPrivate: boolean;
  status: string;
  judgeUserId?: string;
  judgeName?: string;,
}

interface RoomListTableProps { gameRooms: GameRoom[];
  playerRoom: { roomDbId: string | null  };
  t: (key: string) => string;
  joinRoom: (roomId: string) => Promise<void>;
  playAsJudge: (roomId: string) => Promise<void>;
  currentUser: any;,
}

/**
* RoomListTable 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { RoomListTableProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <RoomListTable { ...props } />
 */
const RoomListTable: React.FC<RoomListTableProps> = ({ gameRooms,
  playerRoom,
  t,
  joinRoom,
  playAsJudge,
  currentUser,
 }) => (;
  <Card className='bg-werewolf-card border-werewolf-purple/30'>;
  <CardHeader>
  <CardTitle>{ t('game_rooms') }</CardTitle>
  <CardDescription>
  { playerRoom.roomDbId
  ? t('leave_first')
  : t('join_existing'),
}
</CardDescription>
</CardHeader>
<CardContent>
<div className='rounded-md border border-werewolf-purple/20'>;
<Table>
<TableHeader className='bg-werewolf-dark/60'>;
<TableRow>
<TableHead className='text-werewolf-purple w-[180px]'>{ t('room_id') }</TableHead>;
<TableHead className='text-werewolf-purple text-center'>{ t('players') }</TableHead>;
<TableHead className='text-werewolf-purple text-center'>{ t('max_players') }</TableHead>;
<TableHead className='text-werewolf-purple text-center'>{ t('status') }</TableHead>;
<TableHead className='text-werewolf-purple text-center'>{ t('judge') }</TableHead>;
<TableHead className='text-werewolf-purple text-center'>{ t('action') }</TableHead>;
</TableRow>
</TableHeader>
<TableBody>
<TableRow className='h-2 border-transparent'>;
<TableCell colSpan={ 6 }></TableCell>;
</TableRow>
{ gameRooms.length === 0 ? (;
  <TableRow>
  <TableCell colSpan={6 } className='text-center text-gray-400 py-8'>;
  { t('no_rooms') }
  </TableCell>
  </TableRow>
) : (
  gameRooms.map(room => (;
    <TableRow key={ room.id } className='border-b border-werewolf-purple/10'>;
    <TableCell className='font-medium'>{ room.roomId }</TableCell>;
    <TableCell className='text-center'>{ room.players }</TableCell>;
    <TableCell className='text-center'>{ room.maxPlayers }</TableCell>;
    <TableCell className='text-center'>;
    <span className={ `px-2 py-1 rounded text-xs ${
      room.status === 'waiting';
      ? 'bg-green-900/40 text-green-300'
      : 'bg-amber-900/40 text-amber-300',
}`}>
    { room.status === 'waiting' ? t('waiting') : t('started') }
    </span>
    </TableCell>
    <TableCell className='text-center'>;
    { room.hasAI ? (
      <span className='text-blue-400'>AI {t('judge') }</span>;
    ) : room.judgeUserId ? (
      <span className='text-green-400'>;
      { /*  只显示'已有法官'  */ }
      已有法官
      </span>
    ) : (<Button
      variant='outline';
      size='sm';
      onClick={ () => playAsJudge(room.id) }
      className='bg-werewolf-dark/40 border-werewolf-purple/30 hover:bg-werewolf-purple/20';
      disabled={ !currentUser }
      >
      <Gavel className='h-3 w-3 mr-1' />;
      { t('play_judge') }
      </Button>
    )}
    </TableCell>
    <TableCell className='text-center'>;
    { /*  检查房间是否已满 - 玩家数 >= 最大玩家数  */ }
    { room.players >= room.maxPlayers ? (;
      <span className='text-amber-400'>{t('full') }</span>;
    ) : room.status !== 'waiting' ? (;
      <span className='text-gray-400'>{ t('started') }</span>;
    ) : (<Button
      variant='default';
      size='sm';
      onClick={ () => joinRoom(room.id) }
      className='bg-werewolf-purple hover:bg-werewolf-light';
      disabled={ !currentUser || !!playerRoom.roomDbId }
      >
      <User className='h-3 w-3 mr-1' />;
      { t('join') }
      </Button>
    )}
    </TableCell>
    </TableRow>
  ))
)}
</TableBody>
</Table>
</div>
</CardContent>
</Card>
);

export default RoomListTable;

