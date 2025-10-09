import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { supabase   } from '@/integrations/supabase/client';
import { usePlayersRealtime   } from '@/hooks/usePlayersRealtime';
import { useToast   } from '@/hooks/useToast';
import React, { useState, useEffect   } from 'react';

/**
* 房间信息卡片组件
*
* 功能说明：
* - 显示房间基本信息（房间ID、房主、人数等）
* - 实时更新房间状态
* - 处理房主信息的安全获取
*
* 修复说明：
* - 使用 get_public_user_profile RPC 函数获取房主信息，避免权限问题
* - 确保所有玩家都能正确查看房主信息
 */
interface RoomInfoCardProps  { roomId: string
}

interface RoomInfo { roomId: string;
  hostPlayerId: string;
  maxPlayers: number;
  currentPlayers: number
}

/**
* RoomInfoCard 组件
*
* 提供用户界面交互功能
*
* @component
* @param { RoomInfoCardProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useToast, usePlayersRealtime
*
* @example
* // 使用示例
* <RoomInfoCard { ...props } />
 */
const RoomInfoCard: React.FC<RoomInfoCardProps> = ({ roomId  
}) =>  { const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast  } = useToast();

  // 获取玩家列表
  const { players  } = usePlayersRealtime(roomId);

  /**
  * 获取房间信息的副作用钩子
  *
  * 功能：
  * - 从数据库获取房间基本信息
  * - 通过 RPC 函数安全获取房主信息
  * - 处理错误情况并显示适当的提示
   */
useEffect(() =>  { /**
    * 异步获取房间信息函数
    *
    * 修复要点：
    * - 分离房间基本信息查询和房主信息查询
    * - 使用 get_public_user_profile RPC 确保权限正确
    * - 提供友好的错误处理
     */
/**
 * fetchRoomInfo函数
 * 获取远程数据
 * @returns Promise<void>
 */
const fetchRoomInfo = async () =>  {
      try {
        console.log('Fetching room info for:', roomId);

        // 获取房间基本信息
        const { data: roomData, error: roomError  
} = await supabase;
        .from('rooms')
        .select(`
        room_id,
        max_players,
        host_id
        `)
        .eq('id', roomId)
        .single();

        if (roomError) { console.error('Error fetching room data:', roomError);
          toast({
            title: '错误',
            description: '获取房间信息失败',
            variant: 'destructive' 
});
          return
}

        // 获取房主信息
        let hostPlayerName = 'Unknown';
        if (roomData.host_id) { const { data: hostData  
} = await supabase;
          .rpc('get_public_user_profile', { p_user_id: roomData.host_id  
});

          if (hostData && Array.isArray(hostData) && hostData.length > 0) { hostPlayerName = hostData[0].player_name
}
        }

        const roomInfo: RoomInfo = { roomId: roomData.room_id,
          hostPlayerId: hostPlayerName,
          maxPlayers: roomData.max_players,
          currentPlayers: players.length  
};

        setRoomInfo(roomInfo)
} catch (error) { console.error('Error fetching room info:', error);
        toast({
          title: '错误',
          description: '获取房间信息失败',
          variant: 'destructive' 
})
} finally { setLoading(false)
}
    };

    if (roomId) { fetchRoomInfo()
}
  }, [roomId, toast, players.length]);

  if (loading) { return (;
      <Card className='bg-werewolf-card border-werewolf-purple/30'>;
      <CardHeader>
      <CardTitle className='text-werewolf-purple'>房间信息</CardTitle>;
      </CardHeader>
      <CardContent>
      <div className='text-center text-gray-400 py-4'>;
      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto'></div>;
      <p className='mt-2'>加载中...</p>;
      </div>
      </CardContent>
      </Card>
    )
}

  if (!roomInfo) { return (;
      <Card className='bg-werewolf-card border-werewolf-purple/30'>;
      <CardHeader>
      <CardTitle className='text-werewolf-purple'>房间信息</CardTitle>;
      </CardHeader>
      <CardContent>
      <div className='text-center text-gray-400 py-4'>;
      <p>无法获取房间信息</p>
      </div>
      </CardContent>
      </Card>
    )
}

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader>
    <CardTitle className='text-werewolf-purple'>房间信息</CardTitle>;
    </CardHeader>
    <CardContent>
    <div className='space-y-4'>;
    <div>
    <p className='text-sm text-gray-400'>房间ID</p>;
    <p className='font-bold'>{ roomInfo.roomId }</p>;
    </div>
    <div>
    <p className='text-sm text-gray-400'>房主ID</p>;
    <p>{ roomInfo.hostPlayerId }</p>
    </div>
    <div>
    <p className='text-sm text-gray-400'>房间人数</p>;
    <p>{ roomInfo.currentPlayers } / { roomInfo.maxPlayers }</p>
    </div>

    <div className='mt-4 p-3 bg-werewolf-dark/20 rounded-md'>;
    <p className='text-xs text-gray-400 text-center'>;
    游戏开始后将玩家拉入对应游戏页面
    </p>
    </div>
    </div>
    </CardContent>
    </Card>
  )
};

/**
 * RoomInfoCard组件
 * 卡片组件，用于内容分组展示
 * @param props - 组件属性
 * @returns JSX元素
 */
export default RoomInfoCard;
