import { useState, useEffect } from 'react';
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

  // Calculate time remaining
  useEffect(() => {
    if (!gameState || !gameState.phaseEndTime || gameState.isPaused) {
      setTimeRemaining(0);
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endTime = new Date(gameState.phaseEndTime!).getTime();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [gameState?.phaseEndTime, gameState?.isPaused]);

  // Start game
  const startGame = async () => {
    if (!roomId) return false;

    try {
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
      return false;
    }
  };

  // Advance phase
  const advancePhase = async () => {
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
      const { error } = await supabase
        .from('game_states')
        .update({ status: 'ended' })
        .eq('id', gameState.id);

      if (error) {
        console.error('Error ending game:', error);
        return false;
      }

      toast({
        title: '游戏结束',
        description: '游戏已结束',
      });
      return true;
    } catch (error) {
      console.error('Error ending game:', error);
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
