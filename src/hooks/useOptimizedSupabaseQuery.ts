import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { useDataCache } from './useDataCache';
import { createLogger } from '@/lib/logger';
import { PerformanceMonitor } from '@/lib/debugUtils';

const logger = createLogger('optimized-supabase-query');

interface QueryOptions {
  enableCache?: boolean;
  cacheTTL?: number;
  enableRealtime?: boolean;
  debounceMs?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  lastFetched: number | null;
}

/**
 * 优化的 Supabase 查询 Hook
 */
export const useOptimizedSupabaseQuery = <T = unknown>(
  tableName: string,
  queryFn?: (
    query: PostgrestFilterBuilder<any, any, T>
  ) => PostgrestFilterBuilder<any, any, T>,
  options: QueryOptions = {}
) => {
  const {
    enableCache = true,
    cacheTTL = 5 * 60 * 1000, // 5分钟
    enableRealtime = false,
    debounceMs = 300,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: true,
    error: null,
    lastFetched: null,
  });

  const cache = useDataCache<T>(`supabase_${tableName}`, {
    ttl: cacheTTL,
    enablePersistence: true,
  });

  const abortControllerRef = useRef<AbortController>();
  const debounceTimeoutRef = useRef<ReturnType<typeof setInterval>>();
  const subscriptionRef = useRef<RealtimeChannel | null>(null);

  // 生成查询键
  const generateQueryKey = useCallback(() => {
    const queryString = queryFn ? queryFn.toString() : 'all';
    return `${tableName}_${btoa(queryString).slice(0, 10)}`;
  }, [tableName, queryFn]);

  // 执行查询
  const executeQuery = useCallback(
    async (attempt = 1): Promise<T | null> => {
      const queryKey = generateQueryKey();

      // 检查缓存
      if (enableCache) {
        const cached = cache.get(queryKey);
        if (cached) {
          logger.debug(`使用缓存数据: ${tableName}`, { queryKey });
          setState(prev => ({
            ...prev,
            data: cached,
            loading: false,
            error: null,
            lastFetched: Date.now(),
          }));
          return cached;
        }
      }

      try {
        // 取消之前的请求
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setState(prev => ({ ...prev, loading: true, error: null }));

        // 性能监控
        const perfLabel = `query_${tableName}_${queryKey}`;
        PerformanceMonitor.start(perfLabel);

        // 构建查询
        let query = supabase.from(tableName).select('*');
        if (queryFn) {
          query = queryFn(query);
        }

        const { data, error } = await query;

        PerformanceMonitor.end(perfLabel);

        if (error) {
          throw new Error(error.message);
        }

        const result = data as T;

        // 更新状态
        setState({
          data: result,
          loading: false,
          error: null,
          lastFetched: Date.now(),
        });

        // 缓存结果
        if (enableCache && result) {
          cache.set(queryKey, result);
        }

        logger.debug(`查询成功: ${tableName}`, {
          queryKey,
          resultCount: Array.isArray(result) ? result.length : 1,
        });

        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));

        // 重试逻辑
        if (
          attempt < retryAttempts &&
          !abortControllerRef.current?.signal.aborted
        ) {
          logger.warn(`查询失败，第 ${attempt} 次重试: ${tableName}`, {
            error: errorObj.message,
            attempt,
            maxAttempts: retryAttempts,
          });

          await new Promise(resolve =>
            setTimeout(resolve, retryDelay * attempt)
          );
          return executeQuery(attempt + 1);
        }

        setState(prev => ({
          ...prev,
          loading: false,
          error: errorObj,
        }));

        logger.error(`查询失败: ${tableName}`, {
          error: errorObj.message,
          stack: errorObj.stack,
          attempts: attempt,
        });

        return null;
      }
    },
    [
      tableName,
      queryFn,
      generateQueryKey,
      enableCache,
      cache,
      retryAttempts,
      retryDelay,
    ]
  );

  // 防抖查询
  const debouncedQuery = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      executeQuery();
    }, debounceMs);
  }, [executeQuery, debounceMs]);

  // 立即查询
  const refetch = useCallback(() => {
    const queryKey = generateQueryKey();
    if (enableCache) {
      cache.remove(queryKey);
    }
    return executeQuery();
  }, [executeQuery, generateQueryKey, enableCache, cache]);

  // 设置实时订阅
  useEffect(() => {
    if (!enableRealtime) return;

    logger.debug(`设置实时订阅: ${tableName}`);

    const subscription = supabase
      .channel(`realtime_${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        payload => {
          logger.debug(`实时数据变化: ${tableName}`, payload);

          // 清除缓存并重新查询
          const queryKey = generateQueryKey();
          if (enableCache) {
            cache.remove(queryKey);
          }
          debouncedQuery();
        }
      )
      .subscribe();

    subscriptionRef.current = subscription;

    return () => {
      logger.debug(`清理实时订阅: ${tableName}`);
      subscription.unsubscribe();
    };
  }, [
    tableName,
    enableRealtime,
    generateQueryKey,
    enableCache,
    cache,
    debouncedQuery,
  ]);

  // 初始查询
  useEffect(() => {
    debouncedQuery();

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery]);

  // 清理
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    lastFetched: state.lastFetched,
    refetch,
    isStale: enableCache
      ? Date.now() - (state.lastFetched || 0) > cacheTTL
      : false,
  };
};
