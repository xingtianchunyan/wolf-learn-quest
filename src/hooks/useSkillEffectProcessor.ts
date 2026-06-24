// 自动化技能效果处理系统
import { useState, useEffect, useCallback, useRef } from 'react';
import { createLogger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const logger = createLogger('skill-effect-processor');

export interface EffectProcessorStats {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  lastProcessTime: Date | null;
  processingStatus: 'idle' | 'processing' | 'error';
  averageProcessTime: number;
}

export interface ProcessorConfig {
  autoProcess: boolean;
  intervalMs: number;
  batchSize: number;
  retryAttempts: number;
  enableLogging: boolean;
}

const DEFAULT_CONFIG: ProcessorConfig = {
  autoProcess: true,
  intervalMs: 5000, // 5秒处理一次
  batchSize: 10,
  retryAttempts: 3,
  enableLogging: true,
};

export const useSkillEffectProcessor = (
  gameStateId?: string,
  config: Partial<ProcessorConfig> = {}
) => {
  const [stats, setStats] = useState<EffectProcessorStats>({
    totalProcessed: 0,
    successCount: 0,
    failureCount: 0,
    lastProcessTime: null,
    processingStatus: 'idle',
    averageProcessTime: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processingRef = useRef(false);
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // 处理技能效果的核心函数
  const processEffects = useCallback(async (): Promise<number> => {
    if (!gameStateId || processingRef.current) {
      return 0;
    }

    processingRef.current = true;
    const startTime = Date.now();

    try {
      setStats(prev => ({ ...prev, processingStatus: 'processing' }));

      // 调用数据库函数处理技能效果
      const { data, error } = await supabase.rpc('process_skill_effects', {
        p_game_state_id: gameStateId,
      });

      if (error) {
        throw new Error(`处理失败: ${error.message}`);
      }

      const processedCount = data || 0;
      const processingTime = Date.now() - startTime;

      // 更新统计数据
      setStats(prev => {
        const newTotal = prev.totalProcessed + processedCount;
        const newAverage =
          newTotal > 0
            ? (prev.averageProcessTime * prev.totalProcessed + processingTime) /
              newTotal
            : processingTime;

        return {
          totalProcessed: newTotal,
          successCount: prev.successCount + (processedCount > 0 ? 1 : 0),
          failureCount: prev.failureCount,
          lastProcessTime: new Date(),
          processingStatus: 'idle',
          averageProcessTime: newAverage,
        };
      });

      if (finalConfig.enableLogging && processedCount > 0) {
        logger.info(`成功处理 ${processedCount} 个技能效果`, {
          gameStateId,
          processingTime,
          processedCount,
        });
      }

      return processedCount;
    } catch (error: any) {
      logger.error('技能效果处理失败', error, { gameStateId });

      setStats(prev => ({
        ...prev,
        failureCount: prev.failureCount + 1,
        processingStatus: 'error',
        lastProcessTime: new Date(),
      }));

      // 错误率过高时显示通知
      if (stats.failureCount % 5 === 4) {
        // 每5次失败显示一次
        toast({
          title: t('hook.skill_effect.process_error_title'),
          description: t('hook.skill_effect.process_error_desc', {
            count: stats.failureCount + 1,
          }),
          variant: 'destructive',
        });
      }

      throw error;
    } finally {
      processingRef.current = false;
    }
  }, [gameStateId, finalConfig.enableLogging, stats.failureCount, toast, t]);

  // 清理过期效果
  const cleanupExpiredEffects = useCallback(async (): Promise<void> => {
    if (!gameStateId) return;

    try {
      const { error } = await supabase.rpc('cleanup_expired_skill_effects');

      if (error) {
        throw new Error(`清理失败: ${error.message}`);
      }

      if (finalConfig.enableLogging) {
        logger.info('成功清理过期技能效果', { gameStateId });
      }
    } catch (error: any) {
      logger.error('清理过期效果失败', error, { gameStateId });
    }
  }, [gameStateId, finalConfig.enableLogging]);

  // 手动触发处理
  const manualProcess = useCallback(async (): Promise<number> => {
    try {
      const processed = await processEffects();

      toast({
        title: t('hook.skill_effect.manual_success_title'),
        description: t('hook.skill_effect.manual_success_desc', {
          count: processed,
        }),
      });

      return processed;
    } catch (error: any) {
      toast({
        title: t('hook.skill_effect.manual_failed_title'),
        description: error.message,
        variant: 'destructive',
      });
      return 0;
    }
  }, [processEffects, toast, t]);

  // 启动自动处理
  const startAutoProcess = useCallback(() => {
    if (!gameStateId || !finalConfig.autoProcess || isRunning) {
      return;
    }

    setIsRunning(true);

    intervalRef.current = setInterval(async () => {
      try {
        await processEffects();

        // 每次处理后也清理过期效果
        if (Math.random() < 0.1) {
          // 10%概率清理，避免过于频繁
          await cleanupExpiredEffects();
        }
      } catch (error) {
        // 错误已在processEffects中处理
      }
    }, finalConfig.intervalMs);

    logger.info('技能效果自动处理已启动', {
      gameStateId,
      intervalMs: finalConfig.intervalMs,
    });
  }, [
    gameStateId,
    finalConfig.autoProcess,
    finalConfig.intervalMs,
    isRunning,
    processEffects,
    cleanupExpiredEffects,
  ]);

  // 停止自动处理
  const stopAutoProcess = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);

    logger.info('技能效果自动处理已停止', { gameStateId });
  }, [gameStateId]);

  // 重置统计数据
  const resetStats = useCallback(() => {
    setStats({
      totalProcessed: 0,
      successCount: 0,
      failureCount: 0,
      lastProcessTime: null,
      processingStatus: 'idle',
      averageProcessTime: 0,
    });
  }, []);

  // 自动启动和清理
  useEffect(() => {
    if (gameStateId && finalConfig.autoProcess) {
      startAutoProcess();
    }

    return () => {
      stopAutoProcess();
    };
  }, [gameStateId, finalConfig.autoProcess, startAutoProcess, stopAutoProcess]);

  // 页面卸载时清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    // 状态
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
    config: finalConfig,
  };
};
