import { createLogger   } from '@/lib/logger';
import { supabase   } from '@/integrations/supabase/client';
import { useState, useEffect, useCallback, useRef   } from 'react';
import { useToast   } from '@/hooks/useToast';

// 自动化技能效果处理系统

const logger = createLogger('skill-effect-processor');

export interface EffectProcessorStats { totalProcessed: number;
  successCount: number;
  failureCount: number;
  lastProcessTime: Date | null;
  processingStatus: 'idle' | 'processing' | 'error';
  averageProcessTime: number
}

export interface ProcessorConfig { autoProcess: boolean;
  intervalMs: number;
  batchSize: number;
  retryAttempts: number;
  enableLogging: boolean
}

/**
 * DEFAULT组件
 * DEFAULT组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const DEFAULT_CONFIG: ProcessorConfig =  { autoProcess: true,
  intervalMs: 5000, // 5秒处理一次
  batchSize: 10,
  retryAttempts: 3,
  enableLogging: true  
};

/**
 * useSkillEffectProcessor函数
 * 自定义Hook
 * @returns void
 */
export const useSkillEffectProcessor = (
  gameStateId?: string,
  config: Partial<ProcessorConfig> = {
}
) => { const [stats, setStats] = useState<EffectProcessorStats>({
    totalProcessed: 0,
    successCount: 0,
    failureCount: 0,
    lastProcessTime: null,
    processingStatus: 'idle',
    averageProcessTime: 0 
});

  const [isRunning, setIsRunning] = useState(false);
  const { toast  } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const processingRef = useRef(false);
  const finalConfig = { ...DEFAULT_CONFIG, ...config   };

  // 处理技能效果的核心函数
  const processEffects = useCallback(async (): Promise<number> => { if (!gameStateId || processingRef.current) {
      return 0
}

    processingRef.current = true;
    const startTime = Date.now();

    try { setStats(prev => ({ ...prev, processingStatus: 'processing'  
}));

      // 调用数据库函数处理技能效果
      const { data, error  } = await supabase.rpc('process_skill_effects', { p_game_state_id: gameStateId 
});

      if (error) { throw new Error(`处理失败: ${error.message 
}`)
}

      const processedCount = data || 0;
      const processingTime = Date.now() - startTime;

      // 更新统计数据
      setStats(prev => { const newTotal = prev.totalProcessed + processedCount;
        const newAverage = newTotal > 0;
        ? (prev.averageProcessTime * prev.totalProcessed + processingTime) / newTotal
        : processingTime;

        return {
          totalProcessed: newTotal,
          successCount: prev.successCount + (processedCount > 0 ? 1 : 0),
          failureCount: prev.failureCount,
          lastProcessTime: new Date(),
          processingStatus: 'idle',
          averageProcessTime: newAverage 
}
});

      if (finalConfig.enableLogging && processedCount > 0) { logger.info(`成功处理 ${processedCount } 个技能效果`, { gameStateId,
          processingTime,
          processedCount })
}

      return processedCount
} catch (error: any) { logger.error('技能效果处理失败', error, { gameStateId  });

      setStats(prev => ({ ...prev,
        failureCount: prev.failureCount + 1,
        processingStatus: 'error',
        lastProcessTime: new Date() 
}));

      // 错误率过高时显示通知
      if (stats.failureCount % 5 === 4) { // 每5次失败显示一次
      toast({
        title: '技能效果处理异常',
        description: `已连续失败 ${stats.failureCount + 1 
} 次，请检查系统状态`,
        variant: 'destructive' 
})
}

    throw error
} finally { processingRef.current = false
}
}, [gameStateId, finalConfig.enableLogging, stats.failureCount, toast]);

// 清理过期效果
const cleanupExpiredEffects = useCallback(async (): Promise<void> => { if (!gameStateId) return;

  try {
    const { error  } = await supabase.rpc('cleanup_expired_skill_effects');

    if (error) { throw new Error(`清理失败: ${error.message 
}`)
}

    if (finalConfig.enableLogging) { logger.info('成功清理过期技能效果', { gameStateId  })
}
  } catch (error: any) { logger.error('清理过期效果失败', error, { gameStateId  })
}
}, [gameStateId, finalConfig.enableLogging]);

// 手动触发处理
const manualProcess = useCallback(async (): Promise<number> => { try {
    const processed = await processEffects();

    toast({
      title: '手动处理完成',
      description: `处理了 ${processed 
} 个技能效果` });

    return processed
} catch (error: any) { toast({
      title: '手动处理失败',
      description: error.message,
      variant: 'destructive' 
});
    return 0
}
}, [processEffects, toast]);

// 启动自动处理
const startAutoProcess = useCallback(() => { if (!gameStateId || !finalConfig.autoProcess || isRunning) {
    return
}

  setIsRunning(true);

  intervalRef.current = setInterval(async () => { try {
      await processEffects();

      // 每次处理后也清理过期效果
      if (Math.random() < 0.1) { // 10%概率清理，避免过于频繁
      await cleanupExpiredEffects()
}
  } catch (error) { // 错误已在processEffects中处理 }
}, finalConfig.intervalMs);

logger.info('技能效果自动处理已启动', { gameStateId,
  intervalMs: finalConfig.intervalMs 
})
}, [gameStateId, finalConfig.autoProcess, finalConfig.intervalMs, isRunning, processEffects, cleanupExpiredEffects]);

// 停止自动处理
const stopAutoProcess = useCallback(() => { if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null
}
  setIsRunning(false);

  logger.info('技能效果自动处理已停止', { gameStateId  })
}, [gameStateId]);

// 重置统计数据
const resetStats = useCallback(() => { setStats({
    totalProcessed: 0,
    successCount: 0,
    failureCount: 0,
    lastProcessTime: null,
    processingStatus: 'idle',
    averageProcessTime: 0 
})
}, []);

// 自动启动和清理
useEffect(() => { if (gameStateId && finalConfig.autoProcess) {
    startAutoProcess()
}

  return () => {
  stopAutoProcess()
}

}, [gameStateId, finalConfig.autoProcess, startAutoProcess, stopAutoProcess]);

// 页面卸载时清理
useEffect(() => { return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
}
  }
}, []);

return { // 状态
  stats,
  isRunning,
  isProcessing: processingRef.current,

  // 控制函数
  startAutoProcess,
  stopAutoProcess,
  manualProcess,
  cleanupExpiredEffects,
  resetStats,

  // 配置
  config: finalConfig 
}
};