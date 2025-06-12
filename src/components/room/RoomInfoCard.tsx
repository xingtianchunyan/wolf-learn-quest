
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';

interface RoomInfoCardProps {
  roomId: string;
}

interface RoomInfo {
  roomId: string;
  hostPlayerId: string;
  maxPlayers: number;
  currentPlayers: number;
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({ roomId }) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // 获取玩家列表
  const { players } = usePlayersRealtime(roomId);

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
          console.error('Error fetching room data:', roomError);
          toast({
            title: '错误',
            description: '获取房间信息失败',
            variant: "destructive",
          });
          return;
        }

        const roomInfo: RoomInfo = {
          roomId: roomData.room_id,
          hostPlayerId: roomData.users?.player_name || 'Unknown',
          maxPlayers: roomData.max_players,
          currentPlayers: players.length
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
  }, [roomId, toast, players.length]);

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
            <p className="text-sm text-gray-400">房间人数</p>
            <p>{roomInfo.currentPlayers} / {roomInfo.maxPlayers}</p>
          </div>
          
          <div className="mt-4 p-3 bg-werewolf-dark/20 rounded-md">
            <p className="text-xs text-gray-400 text-center">
              游戏开始后将玩家拉入对应游戏页面
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomInfoCard;
