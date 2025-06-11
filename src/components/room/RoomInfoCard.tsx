
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RoomInfoCardProps {
  roomId: string;
}

interface RoomInfo {
  roomId: string;
  hostPlayerId: string;
  topic: string;
  maxPlayers: number;
  currentPlayers: number;
  onlinePlayers: number;
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({ roomId }) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        console.log('Fetching room info for:', roomId);

        // 获取房间基本信息
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select(`
            room_id,
            max_players,
            host_id,
            users!rooms_host_id_fkey(player_name)
          `)
          .eq('id', roomId)
          .single();

        if (roomError) {
          console.error('Error fetching room:', roomError);
          toast({
            title: '错误',
            description: '获取房间信息失败',
            variant: "destructive",
          });
          return;
        }

        // 获取房间玩家数量
        const { data: playersData, error: playersError } = await supabase
          .from('room_players')
          .select('id')
          .eq('room_id', roomId);

        if (playersError) {
          console.error('Error fetching players:', playersError);
        }

        const roomInfo: RoomInfo = {
          roomId: roomData.room_id,
          hostPlayerId: roomData.users?.player_name || 'Unknown',
          topic: '元素周期表', // 固定主题
          maxPlayers: roomData.max_players,
          currentPlayers: playersData?.length || 0,
          onlinePlayers: playersData?.length || 0 // 简化处理，后续可以集成实际在线状态
        };

        setRoomInfo(roomInfo);
      } catch (error) {
        console.error('Error fetching room info:', error);
        toast({
          title: '错误',
          description: '获取房间信息失败',
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomInfo();
    }
  }, [roomId, toast]);

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-400 py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto"></div>
            <p className="mt-2">加载中...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!roomInfo) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-400 py-4">
            <p>无法获取房间信息</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">房间信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">房间ID</p>
            <p className="font-bold">{roomInfo.roomId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">房主ID</p>
            <p>{roomInfo.hostPlayerId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">学习主题</p>
            <p>{roomInfo.topic}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">房间人数</p>
            <p>{roomInfo.currentPlayers} / {roomInfo.maxPlayers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">在线玩家</p>
            <p>{roomInfo.onlinePlayers} / {roomInfo.currentPlayers}</p>
          </div>
          
          <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
            <p className="text-xs text-gray-400 text-center">
              游戏开始后自动关闭房间
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomInfoCard;
