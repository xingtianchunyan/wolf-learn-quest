import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { useAuth } from '@/providers/AuthProvider';

export interface GameRoom {
  id: string;
  roomId: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  hasAI: boolean;
  isPrivate: boolean;
  status: string;
  judgeUserId?: string;
  judgeName?: string | null;
}

export const useGameLobby = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { currentUser, initializing, setIsLoginOpen } = useAuth();
  const { playerRoom, leaveCurrentRoom } = usePlayerRoom();

  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isCreatingAIRoom, setIsCreatingAIRoom] = useState(false);
  const [isLeavingRoom, setIsLeavingRoom] = useState(false);
  const [judgeRoomId, setJudgeRoomId] = useState<string | null>(null);

  useRoomCleanup();

  const generateRoomId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const sequence = Math.floor(Math.random() * 99) + 1;
    return `${year}/${month}/${day}-${String(sequence).padStart(2, '0')}`;
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select(
          `
          id,
          room_id,
          max_players,
          status,
          human_judge,
          host_id,
          judge_user_id,
          users!rooms_host_id_fkey(player_name)
        `
        )
        .in('status', ['waiting', 'active']);

      if (error) {
        console.error('Error fetching rooms:', error);
        return;
      }

      const { data: playerCounts, error: playerCountError } =
        await supabase.rpc('get_waiting_room_player_counts');

      if (playerCountError) {
        console.error('Error fetching player counts:', playerCountError);
      }

      const playerCountMap = new Map<string, number>();
      if (playerCounts) {
        playerCounts.forEach(
          (item: { room_id: string; player_count: number }) => {
            playerCountMap.set(item.room_id, Number(item.player_count));
          }
        );
      }

      const roomsWithJudges = await Promise.all(
        (data || []).map(async room => {
          let judgeName: string | null = null;

          if (room.judge_user_id) {
            const { data: judgeData } = await supabase.rpc(
              'get_public_user_profile',
              { p_user_id: room.judge_user_id }
            );

            judgeName =
              Array.isArray(judgeData) && judgeData.length > 0
                ? judgeData[0].player_name
                : null;
          }

          const playerCount = playerCountMap.get(room.id) || 0;

          return {
            id: room.id,
            roomId: room.room_id,
            name: `Game Room ${room.room_id}`,
            host: room.users?.player_name || 'Unknown',
            players: playerCount,
            maxPlayers: room.max_players || 8,
            hasAI: !room.human_judge,
            isPrivate: false,
            status: room.status,
            judgeUserId: room.judge_user_id,
            judgeName,
          };
        })
      );

      setGameRooms(roomsWithJudges);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    if (!initializing && !currentUser) {
      setIsLoginOpen(true);
    } else if (currentUser && !playerRoom.roomDbId) {
      fetchRooms();
    }
  }, [initializing, currentUser, playerRoom.roomDbId]);

  useEffect(() => {
    if (
      !initializing &&
      currentUser &&
      !playerRoom.isLoading &&
      playerRoom.roomDbId
    ) {
      navigate(`/room/${playerRoom.roomDbId}`);
    }
  }, [initializing, currentUser, playerRoom, navigate]);

  useEffect(() => {
    const fetchJudgeRoom = async () => {
      if (!currentUser) {
        setJudgeRoomId(null);
        return;
      }

      const { data, error } = await supabase
        .from('rooms')
        .select('id')
        .eq('judge_user_id', currentUser.id)
        .eq('status', 'waiting')
        .maybeSingle();

      if (error || !data) {
        setJudgeRoomId(null);
        return;
      }
      setJudgeRoomId(data.id);
    };

    if (!initializing && currentUser && !playerRoom.isLoading) {
      fetchJudgeRoom();
    }
  }, [initializing, currentUser, playerRoom.isLoading]);

  useEffect(() => {
    if (!initializing && currentUser && !playerRoom.isLoading) {
      if (judgeRoomId) {
        navigate(`/room/${judgeRoomId}/judge`);
      } else if (playerRoom.roomDbId) {
        navigate(`/room/${playerRoom.roomDbId}`);
      }
    }
  }, [
    initializing,
    currentUser,
    playerRoom,
    playerRoom.roomDbId,
    judgeRoomId,
    navigate,
  ]);

  useEffect(() => {
    if (!currentUser || playerRoom.roomDbId) return;

    const roomsChannel = supabase
      .channel('public:rooms')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms',
          filter: `status=in.(waiting,active)`,
        },
        () => fetchRooms()
      )
      .subscribe();

    const playersChannel = supabase
      .channel('public:room_players')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
        },
        () => fetchRooms()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomsChannel);
      supabase.removeChannel(playersChannel);
    };
  }, [currentUser, playerRoom.roomDbId]);

  const handleLeaveCurrentRoom = async () => {
    if (!playerRoom.roomDbId) return;

    setIsLeavingRoom(true);

    try {
      const success = await leaveCurrentRoom();

      if (success) {
        toast({
          title: t('room_leave_success'),
          description: t('room_leave_success'),
        });
        fetchRooms();
      } else {
        toast({
          title: t('room_leave_failed'),
          description: t('room_leave_error'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      toast({
        title: t('room_leave_failed'),
        description: t('room_leave_error'),
        variant: 'destructive',
      });
    } finally {
      setIsLeavingRoom(false);
    }
  };

  const createRoomCore = async (humanJudge: boolean) => {
    if (!currentUser) {
      toast({
        title: t('auth_required'),
        description: t('sign_in_required'),
        variant: 'destructive',
      });
      return;
    }

    if (playerRoom.roomDbId) {
      toast({
        title: t('already_in_room'),
        description: t('leave_first'),
        variant: 'destructive',
      });
      return;
    }

    const setLoading = humanJudge ? setIsCreatingRoom : setIsCreatingAIRoom;
    setLoading(true);

    try {
      const roomId = generateRoomId();

      const { data: newRoom, error: roomError } = await supabase
        .from('rooms')
        .insert({
          room_id: roomId,
          host_id: currentUser.id,
          max_players: 12,
          status: 'waiting',
          human_judge: humanJudge,
        })
        .select()
        .single();

      if (roomError) {
        console.error('Error creating room:', roomError);
        toast({
          title: t('room_create_failed'),
          description: roomError.message || t('room_create_error'),
          variant: 'destructive',
        });
        return;
      }

      const { error: playerError } = await supabase.rpc('join_room_as_player', {
        p_room_id: newRoom.id,
      });

      if (playerError) {
        console.error('Error adding player to room:', playerError);
        toast({
          title: t('room_create_failed'),
          description: playerError.message || t('room_create_error'),
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('room_created'),
        description: t('room_created_desc'),
      });

      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: t('room_create_failed'),
        description: t('room_create_error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = () => createRoomCore(true);
  const handleCreateAIJudge = async () => {
    toast({
      title: t('ai_judge_unavailable'),
      description: t('ai_judge_unavailable_desc'),
    });
  };

  const joinRoom = async (roomId: string) => {
    if (!currentUser) {
      toast({
        title: t('auth_required'),
        description: t('sign_in_required'),
        variant: 'destructive',
      });
      return;
    }

    if (playerRoom.roomDbId) {
      toast({
        title: t('already_in_room'),
        description: t('leave_first'),
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomId)
        .single();

      if (roomError) {
        console.error('Error fetching room data:', roomError);
        toast({
          title: t('room_join_failed'),
          description: t('room_join_error'),
          variant: 'destructive',
        });
        return;
      }

      const { count: currentPlayerCount } = await supabase
        .from('room_players')
        .select('*', { count: 'exact', head: true })
        .eq('room_id', roomId);

      if (
        currentPlayerCount &&
        currentPlayerCount >= (roomData.max_players || 8)
      ) {
        toast({
          title: t('room_join_failed'),
          description: t('room_full'),
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.rpc('join_room_as_player', {
        p_room_id: roomId,
      });

      if (error) {
        console.error('Error joining room:', error);
        toast({
          title: t('room_join_failed'),
          description: error.message || t('room_join_error'),
          variant: 'destructive',
        });
        return;
      }

      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: t('room_join_failed'),
        description: t('room_join_error'),
        variant: 'destructive',
      });
    }
  };

  const playAsJudge = async (roomId: string) => {
    if (!currentUser) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to play as judge',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('rooms')
        .update({ judge_user_id: currentUser.id })
        .eq('id', roomId)
        .is('judge_user_id', null);

      if (error) {
        console.error('Error setting judge:', error);
        toast({
          title: 'Failed to become judge',
          description: 'Another player may have already become the judge',
          variant: 'destructive',
        });
        return;
      }

      navigate(`/room/${roomId}/judge`);
      fetchRooms();
    } catch (error) {
      console.error('Error playing as judge:', error);
      toast({
        title: 'Failed to join as judge',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return {
    initializing,
    currentUser,
    playerRoom,
    gameRooms,
    isCreatingRoom,
    isCreatingAIRoom,
    isLeavingRoom,
    t,
    navigate,
    handleLeaveCurrentRoom,
    handleCreateRoom,
    handleCreateAIJudge,
    joinRoom,
    playAsJudge,
  };
};
