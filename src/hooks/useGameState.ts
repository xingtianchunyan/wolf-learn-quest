import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GameState {
  id: string;
  roomId: string;
  status: 'waiting' | 'active' | 'paused' | 'ended';
  currentPhase: 'day' | 'evening' | 'night' | 'dawn';
  currentRound: number;
  phaseStartTime: string;
  phaseEndTime: string | null;
  isPaused: boolean;
  pausedAt: string | null;
  totalPausedDuration: number;
  autoAdvance: boolean;
  phaseDuration: number;
  createdAt: string;
}

export interface GameSettings {
  id: string;
  roomId: string;
  isAutoAdvance: boolean;
  dayDuration: number;
  eveningDuration: number;
  nightDuration: number;
  dawnDuration: number;
}

export const useGameState = (roomId: string) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  // Fetch initial game state and settings
  useEffect(() => {
    if (!roomId) return;

    const fetchGameData = async () => {
      try {
        // Fetch game state
        const { data: stateData, error: stateError } = await supabase
          .from('game_states')
          .select('*')
          .eq('room_id', roomId)
          .maybeSingle();

        if (stateError && stateError.code !== 'PGRST116') {
          console.error('Error fetching game state:', stateError);
          return;
        }

        // Fetch game settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('game_settings')
          .select('*')
          .eq('room_id', roomId)
          .maybeSingle();

        if (settingsError && settingsError.code !== 'PGRST116') {
          console.error('Error fetching game settings:', settingsError);
          return;
        }

        if (stateData) {
          setGameState({
            id: stateData.id,
            roomId: stateData.room_id,
            status: stateData.status as 'waiting' | 'active' | 'paused' | 'ended',
            currentPhase: stateData.current_phase as 'day' | 'evening' | 'night' | 'dawn',
            currentRound: stateData.current_round,
            phaseStartTime: stateData.phase_start_time,
            phaseEndTime: stateData.phase_end_time,
            isPaused: stateData.is_paused,
            pausedAt: stateData.paused_at,
            totalPausedDuration: stateData.total_paused_duration,
            autoAdvance: stateData.auto_advance,
            phaseDuration: stateData.phase_duration,
            createdAt: stateData.created_at,
          });
        }

        if (settingsData) {
          setGameSettings({
            id: settingsData.id,
            roomId: settingsData.room_id,
            isAutoAdvance: settingsData.is_auto_advance,
            dayDuration: settingsData.day_duration,
            eveningDuration: settingsData.evening_duration,
            nightDuration: settingsData.night_duration,
            dawnDuration: settingsData.dawn_duration,
          });
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [roomId]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!roomId) return;

    const stateChannel = supabase
      .channel(`game_state_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_states',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Game state update:', payload);
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as any;
            setGameState({
              id: newData.id,
              roomId: newData.room_id,
              status: newData.status as 'waiting' | 'active' | 'paused' | 'ended',
              currentPhase: newData.current_phase as 'day' | 'evening' | 'night' | 'dawn',
              currentRound: newData.current_round,
              phaseStartTime: newData.phase_start_time,
              phaseEndTime: newData.phase_end_time,
              isPaused: newData.is_paused,
              pausedAt: newData.paused_at,
              totalPausedDuration: newData.total_paused_duration,
              autoAdvance: newData.auto_advance,
              phaseDuration: newData.phase_duration,
              createdAt: newData.created_at,
            });
          }
        }
      )
      .subscribe();

    const settingsChannel = supabase
      .channel(`game_settings_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_settings',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Game settings update:', payload);
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as any;
            setGameSettings({
              id: newData.id,
              roomId: newData.room_id,
              isAutoAdvance: newData.is_auto_advance,
              dayDuration: newData.day_duration,
              eveningDuration: newData.evening_duration,
              nightDuration: newData.night_duration,
              dawnDuration: newData.dawn_duration,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(stateChannel);
      supabase.removeChannel(settingsChannel);
    };
  }, [roomId]);

  // Advance phase function - stable reference
  const advancePhase = useCallback(async () => {
    if (!roomId) return false;

    try {
      const { error } = await supabase.rpc('advance_game_phase', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error advancing phase:', error);
        toast({
          title: '阶段切换失败',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error advancing phase:', error);
      return false;
    }
  }, [roomId, toast]);

  // Use ref to access latest advancePhase without causing dependency cycles
  const advancePhaseRef = useRef(advancePhase);
  advancePhaseRef.current = advancePhase;

  // Timer effect - simplified to avoid infinite type instantiation
  useEffect(() => {
    // Early return if no end time or paused
    const phaseEndTime = gameState?.phaseEndTime;
    const isPaused = gameState?.isPaused;
    const currentPhase = gameState?.currentPhase;
    const gameId = gameState?.id;
    const isAutoAdvance = gameSettings?.isAutoAdvance;

    if (!phaseEndTime || isPaused) {
      setTimeRemaining(0);
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = new Date(phaseEndTime).getTime();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);

      // Handle auto-advance when timer reaches zero
      if (remaining === 0 && isAutoAdvance && currentPhase && gameId) {
        const isAnsweringPhase = currentPhase === 'evening' || currentPhase === 'dawn';
        
        if (isAnsweringPhase) {
          // Handle timeout for unanswered players
          const handleTimeout = async () => {
            try {
              const { data: players } = await supabase
                .from('room_players')
                .select('user_id')
                .eq('room_id', roomId)
                .eq('is_ai', false);

              if (!players) return;

              const { data: existingAnswers } = await supabase
                .from('player_answers')
                .select('player_id')
                .eq('game_id', gameId)
                .eq('game_phase', currentPhase);

              const answeredPlayerIds = existingAnswers?.map(a => a.player_id) || [];
              const unansweredPlayers = players.filter(p => !answeredPlayerIds.includes(p.user_id));

              if (unansweredPlayers.length > 0) {
                const timeoutRecords = unansweredPlayers.map(player => ({
                  game_id: gameId,
                  player_id: player.user_id,
                  game_phase: currentPhase,
                  is_timeout: true,
                  response_time: null,
                  selected_option: null,
                  is_correct: null
                }));

                await supabase
                  .from('player_answers')
                  .insert(timeoutRecords);
              }
            } catch (error) {
              console.error('Error handling phase timeout:', error);
            }
          };

          // Execute timeout handling then advance
          handleTimeout().then(() => {
            advancePhaseRef.current();
          });
        } else {
          // Direct advance for non-answering phases
          advancePhaseRef.current();
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [phaseEndTime, isPaused, currentPhase, gameId, isAutoAdvance, roomId]);

  // Start game - 修改以确保正确初始化游戏设置
  const startGame = async () => {
    if (!roomId) return false;

    try {
      // 首先确保游戏设置存在
      const { data: existingSettings } = await supabase
        .from('game_settings')
        .select('*')
        .eq('room_id', roomId)
        .maybeSingle();

      if (!existingSettings) {
        // 创建默认游戏设置
        const { error: settingsError } = await supabase
          .from('game_settings')
          .insert({
            room_id: roomId,
            is_auto_advance: true,
            day_duration: 300,
            evening_duration: 40,
            night_duration: 180,
            dawn_duration: 40
          });

        if (settingsError) {
          console.error('Error creating game settings:', settingsError);
          toast({
            title: '初始化游戏设置失败',
            description: settingsError.message,
            variant: 'destructive',
          });
          return false;
        }
      }

      // 调用开始游戏函数
      const { error } = await supabase.rpc('start_game', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error starting game:', error);
        toast({
          title: '开始游戏失败',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: '游戏开始',
        description: '游戏已成功开始，进入白天阶段',
      });
      return true;
    } catch (error) {
      console.error('Error starting game:', error);
      toast({
        title: '开始游戏时发生错误',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Toggle pause
  const togglePause = async () => {
    if (!roomId) return false;

    try {
      const { data, error } = await supabase.rpc('toggle_game_pause', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error toggling pause:', error);
        toast({
          title: '暂停/恢复失败',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: data ? '游戏已暂停' : '游戏已恢复',
        description: data ? '游戏已暂停，计时器停止' : '游戏已恢复，计时器继续',
      });
      return true;
    } catch (error) {
      console.error('Error toggling pause:', error);
      return false;
    }
  };

  // Update game settings
  const updateGameSettings = async (settings: Partial<Omit<GameSettings, 'id' | 'roomId'>>) => {
    if (!roomId) return false;

    const dbUpdates: { [key: string]: any } = {};
    if (settings.isAutoAdvance !== undefined) dbUpdates.is_auto_advance = settings.isAutoAdvance;
    if (settings.dayDuration !== undefined) dbUpdates.day_duration = settings.dayDuration;
    if (settings.eveningDuration !== undefined) dbUpdates.evening_duration = settings.eveningDuration;
    if (settings.nightDuration !== undefined) dbUpdates.night_duration = settings.nightDuration;
    if (settings.dawnDuration !== undefined) dbUpdates.dawn_duration = settings.dawnDuration;

    if (Object.keys(dbUpdates).length === 0) return true;

    try {
      const { error } = await supabase
        .from('game_settings')
        .update(dbUpdates)
        .eq('room_id', roomId);

      if (error) {
        console.error('Error updating game settings:', error);
        toast({
          title: '设置更新失败',
          description: error.message,
          variant: 'destructive',
        });
        return false;
      }
      
      toast({
        title: '游戏设置已更新',
      });
      return true;
    } catch (error) {
      console.error('Error updating game settings:', error);
      return false;
    }
  };

  // End game
  const endGame = async () => {
    if (!gameState) return false;

    try {
      // Step 1: Update game state to 'ended'
      const { error: updateError } = await supabase
        .from('game_states')
        .update({ status: 'ended' })
        .eq('id', gameState.id);

      if (updateError) {
        console.error('Error ending game (updating state):', updateError);
        toast({
          title: '结束游戏失败',
          description: updateError.message,
          variant: 'destructive',
        });
        return false;
      }

      // Step 2: Get game start time from history to calculate duration
      const { data: historyData, error: historyError } = await supabase
        .from('game_phase_history')
        .select('started_at')
        .eq('game_state_id', gameState.id)
        .order('started_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      let startTime = new Date(gameState.createdAt); // Fallback to state creation time
      if (historyData?.started_at) {
        startTime = new Date(historyData.started_at);
      } else if (historyError) {
        console.error('Error fetching game start time:', historyError);
      }
      
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

      // Step 3: Create a game session record for the archive
      const { error: sessionError } = await supabase
        .from('game_sessions')
        .insert({
          room_id: gameState.roomId,
          status: 'completed',
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          final_round: gameState.currentRound,
          total_duration_seconds: duration,
          end_reason: '法官结束游戏',
        });

      if (sessionError) {
        console.error('Error creating game session archive:', sessionError);
        toast({
          title: '游戏已结束',
          description: `但归档时出错: ${sessionError.message}`,
          variant: 'destructive'
        });
        return true; // Game is ended anyway
      }

      toast({
        title: '游戏结束',
        description: '游戏已结束并成功归档。',
      });
      return true;
    } catch (error) {
      console.error('Error ending game:', error);
      toast({
        title: '结束游戏时发生未知错误',
        variant: 'destructive',
      });
      return false;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseDisplayName = (phase: string) => {
    const phaseNames = {
      day: '白天',
      evening: '傍晚',
      night: '夜晚',
      dawn: '黎明'
    };
    return phaseNames[phase as keyof typeof phaseNames] || phase;
  };

  return {
    gameState,
    gameSettings,
    loading,
    timeRemaining,
    startGame,
    advancePhase,
    togglePause,
    updateGameSettings,
    endGame,
    formatTime,
    getPhaseDisplayName,
  };
};
