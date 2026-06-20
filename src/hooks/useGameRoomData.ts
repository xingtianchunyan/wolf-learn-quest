import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

export interface GameRoomData {
  id: string;
  roomId: string;
  hostPlayerId: string;
  maxPlayers: number;
  judge_user_id?: string | null;
}

export interface UseGameRoomDataReturn {
  currentUser: any;
  currentUserId: string | null;
  roomData: GameRoomData | null;
  judgeName: string | null;
  isLoading: boolean;
  setRoomData: React.Dispatch<React.SetStateAction<GameRoomData | null>>;
  setJudgeName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useGameRoomData = (
  id: string | undefined
): UseGameRoomDataReturn => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<GameRoomData | null>(null);
  const [judgeName, setJudgeName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 监听法官变化并更新法官名字
  useEffect(() => {
    const judgeUserId = roomData?.judge_user_id;

    const fetchJudgeName = async (userId: string) => {
      const { data, error } = await supabase.rpc('get_public_user_profile', {
        p_user_id: userId,
      });

      if (!error && Array.isArray(data) && data.length > 0) {
        setJudgeName(data[0].player_name);
      } else {
        console.error('Error fetching judge name for realtime update', error);
        setJudgeName('未知');
      }
    };

    if (judgeUserId) {
      fetchJudgeName(judgeUserId);
    } else {
      setJudgeName(null);
    }
  }, [roomData?.judge_user_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          setCurrentUserId(session.user.id);

          const { data: userData } = await supabase
            .from('users')
            .select('player_name')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (userData) {
            setCurrentUser({
              ...session.user,
              player_name: userData.player_name,
            });
          }
        }

        if (id) {
          const { data: roomDataRaw, error: roomError } = await supabase
            .from('rooms')
            .select(
              `
              id,
              room_id,
              max_players,
              host_id,
              judge_user_id,
              room_players(id, user_id)
            `
            )
            .eq('id', id)
            .maybeSingle();

          if (roomError) {
            console.error('Error fetching room:', roomError);
            toast({
              title: t('error'),
              description: t('error_loading_room'),
              variant: 'destructive',
            });
            return;
          }

          if (roomDataRaw) {
            let hostPlayerName = 'Unknown';
            if (roomDataRaw.host_id) {
              const { data: hostData } = await supabase.rpc(
                'get_public_user_profile',
                { p_user_id: roomDataRaw.host_id }
              );

              if (hostData && Array.isArray(hostData) && hostData.length > 0) {
                hostPlayerName = hostData[0].player_name;
              }
            }

            setRoomData({
              id: roomDataRaw.id,
              roomId: roomDataRaw.room_id,
              hostPlayerId: hostPlayerName,
              maxPlayers: roomDataRaw.max_players,
              judge_user_id: roomDataRaw.judge_user_id,
            });
          }
        } else if (session?.user) {
          const { data: roomPlayerData } = await supabase
            .from('room_players')
            .select(
              `
              id,
              room_id,
              rooms!inner(
                id,
                room_id,
                max_players,
                host_id,
                judge_user_id
              )
            `
            )
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (roomPlayerData?.rooms) {
            const room = roomPlayerData.rooms;

            let hostPlayerName = 'Unknown';
            if (room.host_id) {
              const { data: hostData } = await supabase.rpc(
                'get_public_user_profile',
                { p_user_id: room.host_id }
              );

              if (hostData && Array.isArray(hostData) && hostData.length > 0) {
                hostPlayerName = hostData[0].player_name;
              }
            }

            setRoomData({
              id: room.id,
              roomId: room.room_id,
              hostPlayerId: hostPlayerName,
              maxPlayers: room.max_players,
              judge_user_id: room.judge_user_id,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: t('error'),
          description: t('error_loading_room'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, t, id]);

  return {
    currentUser,
    currentUserId,
    roomData,
    judgeName,
    isLoading,
    setRoomData,
    setJudgeName,
    setIsLoading,
  };
};
