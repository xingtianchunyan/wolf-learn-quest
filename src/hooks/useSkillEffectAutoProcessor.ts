// 技能效果自动处理Hook - 修复核心数据流问题
import { useState, useEffect, useCallback, useRef } from 'react';
import { createLogger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const logger = createLogger('skill-effect-auto-processor');

export interface ProcessorStats {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  lastProcessTime: Date | null;
  isRunning: boolean;
}

export const useSkillEffectAutoProcessor = (
  gameStateId?: string,
  currentPhase?: number,
  isJudge: boolean = false
) => {
  const [stats, setStats] = useState<ProcessorStats>({
    totalProcessed: 0,
    successCount: 0,
    failureCount: 0,
    lastProcessTime: null,
    isRunning: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processingRef = useRef(false);

  // 核心处理函数 - 修复技能效果处理流程
  const processSkillEffects = useCallback(async (): Promise<number> => {
    if (!gameStateId || processingRef.current) {
      return 0;
    }

    processingRef.current = true;
    setIsProcessing(true);
    const startTime = Date.now();

    try {
      logger.info('开始处理技能效果', { gameStateId });

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
      setStats(prev => ({
        totalProcessed: prev.totalProcessed + processedCount,
        successCount: prev.successCount + 1,
        failureCount: prev.failureCount,
        lastProcessTime: new Date(),
        isRunning: prev.isRunning,
      }));

      if (processedCount > 0) {
        logger.info(`成功处理 ${processedCount} 个技能效果`, {
          gameStateId,
          processingTime,
          processedCount,
        });

        // 显示成功通知
        if (isJudge) {
          toast({
            title: '技能效果处理完成',
            description: `成功处理了 ${processedCount} 个技能效果`,
          });
        }
      }

      return processedCount;
    } catch (error: any) {
      logger.error('技能效果处理失败', error, { gameStateId });

      setStats(prev => ({
        ...prev,
        failureCount: prev.failureCount + 1,
        lastProcessTime: new Date(),
      }));

      // 显示错误通知
      if (isJudge) {
        toast({
          title: '技能效果处理失败',
          description: error.message || '系统错误，请重试',
          variant: 'destructive',
        });
      }

      throw error;
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
    }
  }, [gameStateId, isJudge, toast]);

  // 清理过期效果
  const cleanupExpiredEffects = useCallback(async (): Promise<void> => {
    if (!gameStateId) return;

    try {
      const { error } = await supabase.rpc(
        'cleanup_expired_standardized_skill_effects'
      );

      if (error) {
        throw new Error(`清理失败: ${error.message}`);
      }

      logger.info('成功清理过期技能效果', { gameStateId });
    } catch (error: any) {
      logger.error('清理过期效果失败', error, { gameStateId });
    }
  }, [gameStateId]);

  // 手动触发处理
  const manualProcess = useCallback(async (): Promise<number> => {
    try {
      const processed = await processSkillEffects();

      toast({
        title: '手动处理完成',
        description: `处理了 ${processed} 个技能效果`,
      });

      return processed;
    } catch (error: any) {
      toast({
        title: '手动处理失败',
        description: error.message,
        variant: 'destructive',
      });
      return 0;
    }
  }, [processSkillEffects, toast]);

  // 启动自动处理
  const startAutoProcess = useCallback(() => {
    if (!gameStateId || !isJudge || stats.isRunning) {
      return;
    }

    setStats(prev => ({ ...prev, isRunning: true }));

    // 每10秒检查一次技能效果队列
    intervalRef.current = setInterval(async () => {
      try {
        await processSkillEffects();

        // 每次处理后也清理过期效果
        if (Math.random() < 0.2) {
          // 20%概率清理
          await cleanupExpiredEffects();
        }
      } catch (error) {
        // 错误已在processSkillEffects中处理
      }
    }, 10000); // 10秒间隔

    logger.info('技能效果自动处理已启动', { gameStateId });
  }, [
    gameStateId,
    isJudge,
    stats.isRunning,
    processSkillEffects,
    cleanupExpiredEffects,
  ]);

  // 停止自动处理
  const stopAutoProcess = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStats(prev => ({ ...prev, isRunning: false }));

    logger.info('技能效果自动处理已停止', { gameStateId });
  }, [gameStateId]);

  // 重置统计数据
  const resetStats = useCallback(() => {
    setStats({
      totalProcessed: 0,
      successCount: 0,
      failureCount: 0,
      lastProcessTime: null,
      isRunning: false,
    });
  }, []);

  // 阶段切换时自动处理技能效果
  useEffect(() => {
    if (gameStateId && isJudge && currentPhase) {
      // 在阶段切换后延迟2秒处理技能效果
      const timeout = setTimeout(() => {
        processSkillEffects();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [gameStateId, isJudge, currentPhase, processSkillEffects]);

  // 自动启动和清理
  useEffect(() => {
    if (gameStateId && isJudge) {
      startAutoProcess();
    }

    return () => {
      stopAutoProcess();
    };
  }, [gameStateId, isJudge, startAutoProcess, stopAutoProcess]);

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
    isProcessing,

    // 控制函数
    startAutoProcess,
    stopAutoProcess,
    manualProcess,
    processSkillEffects,
    cleanupExpiredEffects,
    resetStats,
  };
};
