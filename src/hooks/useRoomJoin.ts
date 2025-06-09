
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

export const useRoomJoin = (roomId: string | undefined) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const ensurePlayerInRoom = async () => {
    if (!currentUser || !roomId) {
      console.log('Cannot join room: missing user or room ID');
      return false;
    }

    setIsJoining(true);
    
    try {
      console.log('Checking if player is already in room...');
      console.log('User ID:', currentUser.id);
      console.log('Room ID:', roomId);

      // 首先检查玩家是否已在房间中
      const { data: existingPlayer, error: checkError } = await supabase
        .from('room_players')
        .select('id, user_id, room_id')
        .eq('room_id', roomId)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing player:', checkError);
        // 不要抛出错误，继续尝试加入
      }

      if (existingPlayer) {
        console.log('Player already in room:', existingPlayer);
        setIsJoined(true);
        return true;
      }

      console.log('Player not in room, adding...');

      // 检查房间是否存在且有空位
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('id, max_players, status')
        .eq('id', roomId)
        .maybeSingle();

      if (roomError) {
        console.error('Error fetching room:', roomError);
        throw roomError;
      }

      if (!roomData) {
        throw new Error('Room not found');
      }

      if (roomData.status !== 'waiting') {
        throw new Error('Room is not accepting new players');
      }

      // 检查当前房间人数
      const { data: currentPlayers, error: playersError } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', roomId);

      if (playersError) {
        console.error('Error checking current players:', playersError);
        throw playersError;
      }

      const currentPlayerCount = currentPlayers?.length || 0;
      console.log('Current player count:', currentPlayerCount);
      console.log('Max players:', roomData.max_players);

      if (currentPlayerCount >= roomData.max_players) {
        throw new Error('Room is full');
      }

      // 添加玩家到房间
      const { data: newPlayer, error: insertError } = await supabase
        .from('room_players')
        .insert({
          room_id: roomId,
          user_id: currentUser.id,
          is_ready: false,
          is_ai: false,
          status: 'alive'
        })
        .select('id, user_id, room_id')
        .single();

      if (insertError) {
        console.error('Error adding player to room:', insertError);
        throw insertError;
      }

      console.log('Successfully added player to room:', newPlayer);
      setIsJoined(true);
      
      // 只有真正新加入时才显示成功提示
      toast({
        title: '成功加入房间',
        description: '你已成功加入游戏房间',
      });

      return true;
    } catch (error) {
      console.error('Error ensuring player in room:', error);
      setIsJoined(false);
      
      toast({
        title: '加入房间失败',
        description: error instanceof Error ? error.message : '无法加入房间，请重试',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setIsJoining(false);
    }
  };

  // 重置状态的函数
  const resetJoinState = () => {
    setIsJoined(false);
    setIsJoining(false);
  };

  // 页面加载时自动尝试加入房间
  useEffect(() => {
    if (currentUser && roomId && !isJoined && !isJoining) {
      ensurePlayerInRoom();
    }
  }, [currentUser, roomId]);

  return {
    isJoining,
    isJoined,
    ensurePlayerInRoom,
    resetJoinState
  };
};
