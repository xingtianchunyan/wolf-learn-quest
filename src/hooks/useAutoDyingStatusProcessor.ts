import { DyingStatusService, DyingResolutionType  } from '@/services/dyingStatusService';
import { supabase  } from '@/integrations/supabase/client';
import { useEffect, useRef  } from 'react';
import { useToast  } from '@/hooks/useToast';

/**
* 自动濒死状态处理Hook
* 监听濒死状态变化并自动处理状态转换
 */

interface MinimalGameState { id: string;
  currentPhase: number;
  currentRound: number;,
}

interface AutoProcessingConfig { enableProtectionResolution: boolean;
  enableAnswerBasedResolution: boolean;
  protectionDelay: number; // 延迟时间(毫秒)
  answerCheckDelay: number; // 答题检查延迟(毫秒),
}

const DEFAULT_CONFIG: AutoProcessingConfig = { enableProtectionResolution: true,
  enableAnswerBasedResolution: true,
  protectionDelay: 2000, // 2秒后自动判断保护
  answerCheckDelay: 5000, // 5秒后检查答题结果,
};

export const useAutoDyingStatusProcessor = (;
  roomId: string,
  gameState?: MinimalGameState | null,
  config: Partial<AutoProcessingConfig> = {}
) => { const { toast  } = useToast();
  const processingRef = useRef<Set<string>>(new Set());
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const effectiveConfig = { ...DEFAULT_CONFIG, ...config  };

  // 清理定时器
  const clearPlayerTimeout = (userId: string) => { const timeout = timeoutsRef.current.get(userId);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(userId);,
}
  };

  // 清理所有定时器
  const clearAllTimeouts = () => { timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current.clear();,
};

  // 自动保护判断逻辑
  const autoResolveByProtection = async (userId: string, gameStateId: string) => { if (!effectiveConfig.enableProtectionResolution || processingRef.current.has(userId)) {
      return;,
}

    processingRef.current.add(userId);

    try { // 检查是否有保护技能生效
      // 这里可以根据具体的游戏逻辑来判断
      // 例如：检查守卫技能、医生技能等
      const hasProtection = await checkProtectionEffects(userId, gameStateId);

      if (hasProtection) {
        const success = await DyingStatusService.resolveDyingStatus({
          userId,
          gameStateId,
          resolutionType: DyingResolutionType.PROTECTED,
});

        if (success) { toast({
            title: '自动保护生效',
            description: '玩家获得保护，濒死状态已自动解除',
           });,
}
      },
} catch (error) { console.error('自动保护判断失败:', error);,
} finally { processingRef.current.delete(userId);,
}
  };

  // 自动答题结果判断逻辑
  const autoResolveByAnswer = async (userId: string, gameStateId: string) => { if (!effectiveConfig.enableAnswerBasedResolution || processingRef.current.has(userId)) {
      return;,
}

    processingRef.current.add(userId);

    try { // 检查玩家答题结果
      const answerResult = await checkPlayerAnswerResult(userId, gameStateId);

      if (answerResult !== null) {
        const resolutionType = answerResult;
        ? DyingResolutionType.ANSWER_CORRECT
        : DyingResolutionType.ANSWER_WRONG;

        const success = await DyingStatusService.resolveDyingStatus({
          userId,
          gameStateId,
          resolutionType,
});

        if (success) { const statusText = answerResult ? '转为虚弱状态' : '被淘汰';
          toast({
            title: '自动答题判定',
            description: `基于答题结果，玩家${statusText }`,
          });,
}
      },
} catch (error) { console.error('自动答题判断失败:', error);,
} finally { processingRef.current.delete(userId);,
}
  };

  // 检查保护效果
  const checkProtectionEffects = async (userId: string, gameStateId: string): Promise<boolean> => { try {
      // 查询是否有针对该玩家的保护技能
      const { data: protectionEffects, error  } = await supabase;
      .from('standardized_skill_targets')
      .select('*')
      .eq('target_user_id', userId)
      .eq('target_type', 'protection')
      .eq('is_active', true)
      .gte('effect_end_time', new Date().toISOString());

      if (error) { console.error('查询保护效果失败:', error);
        return false;,
}

      return protectionEffects && protectionEffects.length > 0;,
} catch (error) { console.error('检查保护效果异常:', error);
      return false;,
}
  };

  // 检查玩家答题结果
  const checkPlayerAnswerResult = async (userId: string, gameStateId: string): Promise<boolean | null> => { try {
      // 获取当前轮次和阶段
      const { data: gameData, error: gameError  } = await supabase;
      .from('game_states')
      .select('current_round, current_phase')
      .eq('id', gameStateId)
      .single();

      if (gameError || !gameData) { console.error('获取游戏状态失败:', gameError);
        return null;,
}

      // 查询玩家在当前轮次的答题记录
      const { data: answers, error: answersError  } = await supabase;
      .from('room_answers')
      .select('is_correct')
      .eq('user_id', userId)
      .eq('question_order', gameData.current_round)
      .order('created_at', { ascending: false  })
      .limit(1);

      if (answersError) { console.error('查询答题记录失败:', answersError);
        return null;,
}

      if (!answers || answers.length === 0) { return null; // 尚未答题,
}

      return answers[0].is_correct;,
} catch (error) { console.error('检查答题结果异常:', error);
      return null;,
}
  };

  // 处理新的濒死状态
  const handleNewDyingStatus = (userId: string, gameStateId: string) => { // 清除该玩家之前的定时器
    clearPlayerTimeout(userId);

    // 设置保护判断定时器
    if (effectiveConfig.enableProtectionResolution) {
      const protectionTimeout = setTimeout(() => {
        autoResolveByProtection(userId, gameStateId);,
}, effectiveConfig.protectionDelay);

      timeoutsRef.current.set(`${ userId }_protection`, protectionTimeout);,
}

    // 设置答题结果判断定时器
    if (effectiveConfig.enableAnswerBasedResolution) { const answerTimeout = setTimeout(() => {
        autoResolveByAnswer(userId, gameStateId);,
}, effectiveConfig.answerCheckDelay);

      timeoutsRef.current.set(`${ userId }_answer`, answerTimeout);,
}
  };

  // 监听濒死状态变化
  useEffect(() => { if (!roomId || !gameState?.id) {
      clearAllTimeouts();
      return;,
}

    // 订阅角色状态变化
    const channel = supabase;
    .channel(`dying_status_${ roomId }`)
    .on(
      'postgres_changes',
      { event: 'UPDATE',
        schema: 'public',
        table: 'role_states',
        filter: `room_id=eq.${roomId }`,
      },
      payload => { const newRecord = payload.new as any;
        const oldRecord = payload.old as any;

        // 检查是否有玩家新进入濒死状态
        if (newRecord.role_status === 2 && oldRecord.role_status !== 2) {
          handleNewDyingStatus(newRecord.user_id, newRecord.game_state_id);,
}

        // 检查是否有玩家脱离濒死状态
        if (oldRecord.role_status === 2 && newRecord.role_status !== 2) { clearPlayerTimeout(newRecord.user_id);
          processingRef.current.delete(newRecord.user_id);,
}
      }
    )
    .subscribe();

    return () => { supabase.removeChannel(channel);
      clearAllTimeouts();
      processingRef.current.clear();,
};,
}, [roomId, gameState?.id, effectiveConfig]);

  // 组件卸载时清理
  useEffect(() => { return () => {
      clearAllTimeouts();
      processingRef.current.clear();,
};,
}, []);

  return { isProcessing: (userId: string) => processingRef.current.has(userId),
    clearPlayerTimeout,
    clearAllTimeouts,
   };,
};