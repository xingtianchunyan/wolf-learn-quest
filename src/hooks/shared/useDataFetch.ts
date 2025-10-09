/**
 * @fileoverview 数据获取Hook
 * 提供统一的数据获取、缓存、重试和错误处理功能
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { createLogger } from '@/lib/logger';
import { globalMemoryCache } from '@/utils/common/cacheUtils';

const logger = createLogger('use-data-fetch');

/**
 * 数据获取配置接口
 */
export interface DataFetchConfig<T> {
  /** 是否立即执行 */
  immediate?: boolean;
  /** 缓存键 */
  cacheKey?: string;
  /** 缓存时间（毫秒） */
  cacheTTL?: number;
  /** 是否启用缓存 */
  enableCache?: boolean;
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 依赖项列表 */
  deps?: any[];
  /** 数据转换函数 */
  transform?: (data: any) => T;
  /** 错误处理函数 */
  onError?: (error: Error) => void;
  /** 成功回调函数 */
  onSuccess?: (data: T) => void;
  /** 加载状态变化回调 */
  onLoadingChange?: (loading: boolean) => void;
  /** 是否在组件卸载时取消请求 */
  cancelOnUnmount?: boolean;
  /** 轮询间隔（毫秒），0表示不轮询 */
  pollingInterval?: number;
  /** 是否在窗口获得焦点时重新获取 */
  refetchOnWindowFocus?: boolean;
  /** 是否在网络重连时重新获取 */
  refetchOnReconnect?: boolean;
  /** 数据验证函数 */
  validate?: (data: any) => boolean;
  /** 默认数据 */
  defaultData?: T;
}

/**
 * 数据获取状态接口
 */
export interface DataFetchState<T> {
  /** 数据 */
  data: T | null;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: Error | null;
  /** 是否已完成首次加载 */
  initialized: boolean;
  /** 最后更新时间 */
  lastUpdated: number;
  /** 重试次数 */
  retryCount: number;
  /** 是否来自缓存 */
  fromCache: boolean;
}

/**
 * 数据获取操作接口
 */
export interface DataFetchActions<T> {
  /** 执行数据获取 */
  execute: () => Promise<T | null>;
  /** 重新获取数据 */
  refetch: () => Promise<T | null>;
  /** 重试 */
  retry: () => Promise<T | null>;
  /** 重置状态 */
  reset: () => void;
  /** 设置数据 */
  setData: (data: T | null) => void;
  /** 清除错误 */
  clearError: () => void;
  /** 取消请求 */
  cancel: () => void;
  /** 手动触发缓存更新 */
  invalidateCache: () => void;
}

/**
 * 默认配置
 */
const DEFAULT_CONFIG: Required<
  Omit<
    DataFetchConfig<any>,
    | 'transform'
    | 'onError'
    | 'onSuccess'
    | 'onLoadingChange'
    | 'validate'
    | 'defaultData'
  >
> = {
  immediate: true,
  cacheKey: '',
  cacheTTL: 5 * 60 * 1000, // 5分钟
  enableCache: true,
  retryCount: 3,
  retryDelay: 1000,
  timeout: 30000,
  deps: [],
  cancelOnUnmount: true,
  pollingInterval: 0,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

/**
 * 创建可取消的Promise
 */
function createCancelablePromise<T>(
  promise: Promise<T>,
  timeoutMs?: number
): { promise: Promise<T>; cancel: () => void } {
  let isCanceled = false;
  let timeoutId: NodeJS.Timeout | undefined;

  const cancelablePromise = new Promise<T>((resolve, reject) => {
    // 设置超时
    if (timeoutMs && timeoutMs > 0) {
      timeoutId = setTimeout(() => {
        if (!isCanceled) {
          isCanceled = true;
          reject(new Error(`请求超时 (${timeoutMs}ms)`));
        }
      }, timeoutMs);
    }

    promise
      .then(result => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (!isCanceled) {
          resolve(result);
        }
      })
      .catch(error => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (!isCanceled) {
          reject(error);
        }
      });
  });

  /**
   * cancel函数
   * cancel函数的功能描述
   * @returns void
   */
  const cancel = () => {
    isCanceled = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return { promise: cancelablePromise, cancel };
}

/**
 * 数据获取Hook
 * @param fetchFunction - 数据获取函数
 * @param config - 配置选项
 * @returns 数据状态和操作函数
 */
export function useDataFetch<T>(
  fetchFunction: () => Promise<T>,
  config: DataFetchConfig<T> = {}
): [DataFetchState<T>, DataFetchActions<T>] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const [state, setState] = useState<DataFetchState<T>>({
    data: config.defaultData || null,
    loading: false,
    error: null,
    initialized: false,
    lastUpdated: 0,
    retryCount: 0,
    fromCache: false,
  });

  const cancelRef = useRef<(() => void) | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  /**
   * 更新状态
   */
  const updateState = useCallback((updates: Partial<DataFetchState<T>>) => {
    if (mountedRef.current) {
      setState(prev => ({ ...prev, ...updates }));
    }
  }, []);

  /**
   * 生成缓存键
   */
  const getCacheKey = useCallback(() => {
    if (!mergedConfig.cacheKey) {
      return '';
    }

    const depsHash =
      mergedConfig.deps.length > 0 ? JSON.stringify(mergedConfig.deps) : '';

    return `${mergedConfig.cacheKey}${depsHash ? `_${btoa(depsHash)}` : ''}`;
  }, [mergedConfig.cacheKey, mergedConfig.deps]);

  /**
   * 从缓存获取数据
   */
  const getFromCache = useCallback((): T | null => {
    if (!mergedConfig.enableCache) {
      return null;
    }

    const cacheKey = getCacheKey();
    if (!cacheKey) {
      return null;
    }

    const cached = globalMemoryCache.get(cacheKey);
    if (cached) {
      logger.debug('从缓存获取数据', { cacheKey });
      return cached;
    }

    return null;
  }, [mergedConfig.enableCache, getCacheKey]);

  /**
   * 设置缓存数据
   */
  const setToCache = useCallback(
    (data: T) => {
      if (!mergedConfig.enableCache) {
        return;
      }

      const cacheKey = getCacheKey();
      if (!cacheKey) {
        return;
      }

      globalMemoryCache.set(cacheKey, data, mergedConfig.cacheTTL);
      logger.debug('设置缓存数据', { cacheKey, ttl: mergedConfig.cacheTTL });
    },
    [mergedConfig.enableCache, getCacheKey, mergedConfig.cacheTTL]
  );

  /**
   * 清除缓存
   */
  const invalidateCache = useCallback(() => {
    if (!mergedConfig.enableCache) {
      return;
    }

    const cacheKey = getCacheKey();
    if (cacheKey) {
      globalMemoryCache.delete(cacheKey);
      logger.debug('清除缓存', { cacheKey });
    }
  }, [mergedConfig.enableCache, getCacheKey]);

  /**
   * 执行数据获取
   */
  const execute = useCallback(async (): Promise<T | null> => {
    // 取消之前的请求
    if (cancelRef.current) {
      cancelRef.current();
    }

    // 首先尝试从缓存获取
    const cachedData = getFromCache();
    if (cachedData && state.initialized) {
      updateState({
        data: cachedData,
        fromCache: true,
        lastUpdated: Date.now(),
      });

      if (mergedConfig.onSuccess) {
        mergedConfig.onSuccess(cachedData);
      }

      return cachedData;
    }

    updateState({
      loading: true,
      error: null,
      fromCache: false,
    });

    if (mergedConfig.onLoadingChange) {
      mergedConfig.onLoadingChange(true);
    }

    try {
      const { promise, cancel } = createCancelablePromise(
        fetchFunction(),
        mergedConfig.timeout
      );

      cancelRef.current = cancel;

      let result = await promise;

      // 数据转换
      if (mergedConfig.transform) {
        result = mergedConfig.transform(result);
      }

      // 数据验证
      if (mergedConfig.validate && !mergedConfig.validate(result)) {
        throw new Error('数据验证失败');
      }

      // 设置缓存
      setToCache(result);

      updateState({
        data: result,
        loading: false,
        error: null,
        initialized: true,
        lastUpdated: Date.now(),
        retryCount: 0,
        fromCache: false,
      });

      if (mergedConfig.onSuccess) {
        mergedConfig.onSuccess(result);
      }

      if (mergedConfig.onLoadingChange) {
        mergedConfig.onLoadingChange(false);
      }

      logger.debug('数据获取成功', {
        cacheKey: getCacheKey(),
        dataSize: JSON.stringify(result).length,
      });

      return result;
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));

      updateState({
        loading: false,
        error: errorObj,
        initialized: true,
      });

      if (mergedConfig.onError) {
        mergedConfig.onError(errorObj);
      }

      if (mergedConfig.onLoadingChange) {
        mergedConfig.onLoadingChange(false);
      }

      logger.error('数据获取失败', {
        error: errorObj.message,
        cacheKey: getCacheKey(),
      });

      return null;
    } finally {
      cancelRef.current = null;
    }
  }, [
    fetchFunction,
    getFromCache,
    setToCache,
    getCacheKey,
    state.initialized,
    mergedConfig,
    updateState,
  ]);

  /**
   * 重试机制
   */
  const retry = useCallback(async (): Promise<T | null> => {
    if (state.retryCount >= mergedConfig.retryCount) {
      logger.warn('达到最大重试次数', {
        retryCount: state.retryCount,
        maxRetries: mergedConfig.retryCount,
      });
      return null;
    }

    updateState({ retryCount: state.retryCount + 1 });

    // 延迟重试
    if (mergedConfig.retryDelay > 0) {
      await new Promise(resolve =>
        setTimeout(resolve, mergedConfig.retryDelay)
      );
    }

    logger.info('重试数据获取', {
      attempt: state.retryCount + 1,
      maxRetries: mergedConfig.retryCount,
    });

    return execute();
  }, [
    state.retryCount,
    mergedConfig.retryCount,
    mergedConfig.retryDelay,
    execute,
    updateState,
  ]);

  /**
   * 重新获取数据
   */
  const refetch = useCallback(async (): Promise<T | null> => {
    invalidateCache();
    updateState({ retryCount: 0 });
    return execute();
  }, [execute, invalidateCache, updateState]);

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current();
    }

    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    updateState({
      data: config.defaultData || null,
      loading: false,
      error: null,
      initialized: false,
      lastUpdated: 0,
      retryCount: 0,
      fromCache: false,
    });

    logger.debug('重置数据获取状态');
  }, [config.defaultData, updateState]);

  /**
   * 设置数据
   */
  const setData = useCallback(
    (data: T | null) => {
      updateState({
        data,
        lastUpdated: Date.now(),
        fromCache: false,
      });

      if (data) {
        setToCache(data);
      }
    },
    [updateState, setToCache]
  );

  /**
   * 清除错误
   */
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  /**
   * 取消请求
   */
  const cancel = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current();
      cancelRef.current = null;
    }

    updateState({ loading: false });

    if (mergedConfig.onLoadingChange) {
      mergedConfig.onLoadingChange(false);
    }
  }, [mergedConfig, updateState]);

  /**
   * 设置轮询
   */
  useEffect(() => {
    if (
      mergedConfig.pollingInterval > 0 &&
      state.initialized &&
      !state.loading
    ) {
      pollingRef.current = setInterval(() => {
        execute();
      }, mergedConfig.pollingInterval);

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      };
    }
  }, [mergedConfig.pollingInterval, state.initialized, state.loading, execute]);

  /**
   * 窗口焦点事件
   */
  useEffect(() => {
    if (!mergedConfig.refetchOnWindowFocus) {
      return;
    }

    /**
     * handleFocus函数
     * 处理事件
     * @returns void
     */
    const handleFocus = () => {
      if (state.initialized && !state.loading) {
        execute();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [
    mergedConfig.refetchOnWindowFocus,
    state.initialized,
    state.loading,
    execute,
  ]);

  /**
   * 网络重连事件
   */
  useEffect(() => {
    if (!mergedConfig.refetchOnReconnect) {
      return;
    }

    /**
     * handleOnline函数
     * 处理事件
     * @returns void
     */
    const handleOnline = () => {
      if (state.initialized && !state.loading) {
        execute();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [
    mergedConfig.refetchOnReconnect,
    state.initialized,
    state.loading,
    execute,
  ]);

  /**
   * 依赖项变化时重新获取
   */
  useEffect(() => {
    if (mergedConfig.immediate && mergedConfig.deps.length > 0) {
      execute();
    }
  }, mergedConfig.deps);

  /**
   * 初始执行
   */
  useEffect(() => {
    if (mergedConfig.immediate && mergedConfig.deps.length === 0) {
      execute();
    }
  }, []);

  /**
   * 组件卸载时清理
   */
  useEffect(() => {
    return () => {
      mountedRef.current = false;

      if (mergedConfig.cancelOnUnmount && cancelRef.current) {
        cancelRef.current();
      }

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [mergedConfig.cancelOnUnmount]);

  const actions: DataFetchActions<T> = {
    execute,
    refetch,
    retry,
    reset,
    setData,
    clearError,
    cancel,
    invalidateCache,
  };

  return [state, actions];
}

/**
 * 简化版数据获取Hook
 */
export function useSimpleFetch<T>(
  fetchFunction: () => Promise<T>,
  deps: any[] = []
) {
  return useDataFetch(fetchFunction, {
    immediate: true,
    deps,
    enableCache: false,
    retryCount: 1,
  });
}

/**
 * 带缓存的数据获取Hook
 */
export function useCachedFetch<T>(
  fetchFunction: () => Promise<T>,
  cacheKey: string,
  cacheTTL: number = 5 * 60 * 1000
) {
  return useDataFetch(fetchFunction, {
    immediate: true,
    enableCache: true,
    cacheKey,
    cacheTTL,
  });
}

/**
 * 轮询数据获取Hook
 */
export function usePollingFetch<T>(
  fetchFunction: () => Promise<T>,
  interval: number,
  config: Partial<DataFetchConfig<T>> = {}
) {
  return useDataFetch(fetchFunction, {
    ...config,
    immediate: true,
    pollingInterval: interval,
  });
}
