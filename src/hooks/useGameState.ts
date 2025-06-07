
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type GamePhase = 'day' | 'evening' | 'night' | 'dawn';
export type GameStatus = 'waiting' | 'active' | 'paused' | 'ended';

interface GameState {
  id: string;
  room_id: string;
  current_phase: GamePhase;
  current_round: number;
  phase_start_time: string;
  phase_duration: number;
  auto_advance: boolean;
  status: GameStatus;
  created_at: string;
  updated_at: string;
}

interface GameStateManager {
  gameState: GameState | null;
  loading: boolean;
  error: string | null;
  timeRemaining: number;
  startGame: () => Promise<boolean>;
  advancePhase: () => Promise<boolean>;
  pauseGame: () => Promise<boolean>;
  resumeGame: () => Promise<boolean>;
  endGame: () => Promise<boolean>;
  initializeGameState: () => Promise<boolean>;
}

export const useGameState = (roomId: string): GameStateManager => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  // Helper function to convert Supabase data to typed GameState
  const convertToGameState = (data: any): GameState => {
    return {
      id: data.id,
      room_id: data.room_id,
      current_phase: data.current_phase as GamePhase,
      current_round: data.current_round,
      phase_start_time: data.phase_start_time,
      phase_duration: data.phase_duration,
      auto_advance: data.auto_advance,
      status: data.status as GameStatus,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  };

  // 获取游戏状态
  const fetchGameState = useCallback(async () => {
    if (!roomId) return;

    try {
      const { data, error } = await supabase
        .from('game_states')
        .select('*')
        .eq('room_id', roomId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching game state:', error);
        setError(error.message);
        return;
      }

      if (data) {
        setGameState(convertToGameState(data));
      } else {
        setGameState(null);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching game state:', err);
      setError('获取游戏状态失败');
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  // 计算剩余时间
  useEffect(() => {
    if (!gameState || gameState.status !== 'active') {
      setTimeRemaining(0);
      return;
    }

    const calculateTimeRemaining = () => {
      const phaseStartTime = new Date(gameState.phase_start_time).getTime();
      const currentTime = new Date().getTime();
      const elapsed = Math.floor((currentTime - phaseStartTime) / 1000);
      const remaining = Math.max(0, gameState.phase_duration - elapsed);
      setTimeRemaining(remaining);
      return remaining;
    };

    // 立即计算一次
    const remaining = calculateTimeRemaining();

    // 如果还有时间，设置定时器
    if (remaining > 0) {
      const interval = setInterval(() => {
        const newRemaining = calculateTimeRemaining();
        
        // 如果时间到了且开启了自动推进，自动切换阶段
        if (newRemaining === 0 && gameState.auto_advance) {
          advancePhase();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  // 实时订阅游戏状态变化
  useEffect(() => {
    if (!roomId) return;

    fetchGameState();

    const channel = supabase
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
          console.log('Game state update received:', payload);
          if (payload.eventType === 'DELETE') {
            setGameState(null);
          } else {
            setGameState(convertToGameState(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, fetchGameState]);

  // 初始化游戏状态
  const initializeGameState = async (): Promise<boolean> => {
    if (!roomId) return false;

    try {
      const { data, error } = await supabase.rpc('initialize_game_state', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error initializing game state:', error);
        toast({
          title: '初始化失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '游戏状态初始化成功',
        description: '游戏已准备就绪'
      });

      return true;
    } catch (err) {
      console.error('Error initializing game state:', err);
      toast({
        title: '初始化失败',
        description: '游戏状态初始化失败',
        variant: 'destructive'
      });
      return false;
    }
  };

  // 开始游戏
  const startGame = async (): Promise<boolean> => {
    if (!roomId) return false;

    try {
      const { data, error } = await supabase.rpc('start_game', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error starting game:', error);
        toast({
          title: '开始游戏失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '游戏开始',
        description: '游戏已开始，当前阶段：白天'
      });

      return true;
    } catch (err) {
      console.error('Error starting game:', err);
      toast({
        title: '开始游戏失败',
        description: '无法开始游戏',
        variant: 'destructive'
      });
      return false;
    }
  };

  // 推进到下一阶段
  const advancePhase = async (): Promise<boolean> => {
    if (!roomId) return false;

    try {
      const { data, error } = await supabase.rpc('advance_game_phase', {
        p_room_id: roomId
      });

      if (error) {
        console.error('Error advancing phase:', error);
        toast({
          title: '阶段切换失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      if (data && data.length > 0) {
        const { new_phase, new_round } = data[0];
        const phaseNames: Record<GamePhase, string> = {
          day: '白天',
          evening: '傍晚',
          night: '夜晚',
          dawn: '黎明'
        };

        toast({
          title: '阶段切换',
          description: `当前阶段：${phaseNames[new_phase as GamePhase]}，第${new_round}轮`
        });
      }

      return true;
    } catch (err) {
      console.error('Error advancing phase:', err);
      toast({
        title: '阶段切换失败',
        description: '无法切换到下一阶段',
        variant: 'destructive'
      });
      return false;
    }
  };

  // 暂停游戏
  const pauseGame = async (): Promise<boolean> => {
    if (!roomId || !gameState) return false;

    try {
      const { error } = await supabase
        .from('game_states')
        .update({ status: 'paused' })
        .eq('room_id', roomId);

      if (error) {
        console.error('Error pausing game:', error);
        toast({
          title: '暂停失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '游戏暂停',
        description: '游戏已暂停'
      });

      return true;
    } catch (err) {
      console.error('Error pausing game:', err);
      return false;
    }
  };

  // 恢复游戏
  const resumeGame = async (): Promise<boolean> => {
    if (!roomId || !gameState) return false;

    try {
      const { error } = await supabase
        .from('game_states')
        .update({ 
          status: 'active',
          phase_start_time: new Date().toISOString()
        })
        .eq('room_id', roomId);

      if (error) {
        console.error('Error resuming game:', error);
        toast({
          title: '恢复失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '游戏恢复',
        description: '游戏已恢复'
      });

      return true;
    } catch (err) {
      console.error('Error resuming game:', err);
      return false;
    }
  };

  // 结束游戏
  const endGame = async (): Promise<boolean> => {
    if (!roomId || !gameState) return false;

    try {
      const { error } = await supabase
        .from('game_states')
        .update({ status: 'ended' })
        .eq('room_id', roomId);

      if (error) {
        console.error('Error ending game:', error);
        toast({
          title: '结束游戏失败',
          description: error.message,
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: '游戏结束',
        description: '游戏已结束'
      });

      return true;
    } catch (err) {
      console.error('Error ending game:', err);
      return false;
    }
  };

  return {
    gameState,
    loading,
    error,
    timeRemaining,
    startGame,
    advancePhase,
    pauseGame,
    resumeGame,
    endGame,
    initializeGameState
  };
};
