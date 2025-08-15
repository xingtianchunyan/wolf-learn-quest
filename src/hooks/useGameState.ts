import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GameState {
  id: string;
  roomId: string;
  status: 'waiting' | 'active' | 'paused' | 'ended';
  currentPhase: number; // 改为数字类型：1=白天, 2=傍晚, 3=夜晚, 4=黎明
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
            currentPhase: stateData.current_phase as number, // 现在是数字类型
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
              currentPhase: newData.current_phase as number, // 现在是数字类型
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

  // Start game - 修改以直接操作数据库而不使用过时的函数
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

      // 计算阶段结束时间（首轮从傍晚开始，如果是自动模式则设置结束时间）
      const settings = existingSettings || {
        is_auto_advance: true,
        evening_duration: 40
      };
      
      const now = new Date();
      const phaseEndTime = settings.is_auto_advance 
        ? new Date(now.getTime() + (settings.evening_duration || 40) * 1000).toISOString()
        : null;

      // 创建或更新游戏状态（首轮进入傍晚：2）
      const { data: gameStateData, error: gameStateError } = await supabase
        .from('game_states')
        .upsert({
          room_id: roomId,
          status: 'active',
          current_phase: 2, // 2 = 傍晚
          current_round: 1,
          phase_start_time: now.toISOString(),
          phase_end_time: phaseEndTime,
          is_paused: false,
          total_paused_duration: 0,
          auto_advance: settings.is_auto_advance,
          phase_duration: settings.evening_duration || 40
        }, {
          onConflict: 'room_id'
        })
        .select()
        .single();

      if (gameStateError) {
        console.error('Error starting game:', gameStateError);
        toast({
          title: '开始游戏失败',
          description: gameStateError.message,
          variant: 'destructive',
        });
        return false;
      }

      // 初始化角色状态（基于角色选择）
      const { data: initCount, error: initError } = await supabase.rpc('initialize_room_role_states', {
        p_room_id: roomId
      });
      if (initError) {
        console.error('初始化角色状态失败:', initError);
        // 不中断流程
      } else {
        console.log('已初始化角色状态数量:', initCount);
      }

      // 记录游戏开始的第一个阶段（傍晚）
      const { error: historyError } = await supabase
        .from('game_phase_history')
        .insert({
          game_state_id: gameStateData.id,
          phase: '2', // 存储为字符串以兼容现有表结构
          round_number: 1,
          started_at: now.toISOString()
        });

      if (historyError) {
        console.error('Error recording phase history:', historyError);
        // 不阻止游戏开始，只记录错误
      }

      toast({
        title: '游戏开始',
        description: '游戏已成功开始，进入傍晚阶段',
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

      // Step 1.5: Update room status to 'ended'
      const { error: roomUpdateError } = await supabase
        .from('rooms')
        .update({ status: 'ended' })
        .eq('id', gameState.roomId);

      if (roomUpdateError) {
        console.error('Error ending game (updating room):', roomUpdateError);
        toast({
          title: '结束游戏失败',
          description: roomUpdateError.message,
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

  const getPhaseDisplayName = (phase: number) => {
    const phaseNames = {
      1: '白天',
      2: '傍晚',
      3: '夜晚',
      4: '黎明'
    };
    return phaseNames[phase as keyof typeof phaseNames] || '未知';
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
