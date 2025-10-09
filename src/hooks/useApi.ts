/**
 * 文件级注释：API请求Hook
 * 提供API请求状态管理功能
 */
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * API状态接口
 */
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * API请求配置接口
 */
export interface ApiConfig {
  immediate?: boolean; // 是否立即执行
  onSuccess?: (data: any) => void; // 成功回调
  onError?: (error: string) => void; // 错误回调
}

/**
 * API请求Hook
 * 提供API请求的状态管理
 * @param apiFunction - API请求函数
 * @param config - 配置选项
 * @returns [状态, 执行函数, 重置函数]
 */
export function useApi<T, P extends any[] = []>(
  apiFunction: (...args: P) => Promise<T>,
  config: ApiConfig = {}
): [ApiState<T>, (...args: P) => Promise<void>, () => void] {
  const { immediate = false, onSuccess, onError } = config;

  // 状态管理
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // 用于取消请求的引用
  const cancelRef = useRef<boolean>(false);

  // 执行API请求的函数
  const execute = useCallback(
    async (...args: P) => {
      cancelRef.current = false;

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await apiFunction(...args);

        // 检查是否已取消
        if (cancelRef.current) {
          return;
        }

        setState({
          data: result,
          loading: false,
          error: null,
        });

        // 调用成功回调
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (error) {
        // 检查是否已取消
        if (cancelRef.current) {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : '请求失败';

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        // 调用错误回调
        if (onError) {
          onError(errorMessage);
        }
      }
    },
    [apiFunction, onSuccess, onError]
  );

  // 重置状态的函数
  const reset = useCallback(() => {
    cancelRef.current = true;
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  // 立即执行（如果配置了immediate）
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  // 组件卸载时取消请求
  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  return [state, execute, reset];
}

/**
 * 分页API请求Hook
 * 专门用于分页数据的API请求
 * @param apiFunction - 分页API请求函数
 * @param pageSize - 每页大小
 * @returns [状态, 加载更多函数, 重置函数, 刷新函数]
 */
export function usePaginatedApi<T>(
  apiFunction: (
    page: number,
    pageSize: number
  ) => Promise<{ data: T[]; total: number; hasMore: boolean }>,
  pageSize: number = 10
): [
  ApiState<T[]> & { hasMore: boolean; total: number },
  () => Promise<void>,
  () => void,
  () => Promise<void>,
] {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const [state, execute, reset] = useApi(
    (currentPage: number) => apiFunction(currentPage, pageSize),
    {
      onSuccess: result => {
        if (page === 1) {
          // 第一页，替换数据
          setAllData(result.data);
        } else {
          // 后续页，追加数据
          setAllData(prev => [...prev, ...result.data]);
        }
        setHasMore(result.hasMore);
        setTotal(result.total);
      },
    }
  );

  // 加载更多
  const loadMore = useCallback(async () => {
    if (!state.loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await execute(nextPage);
    }
  }, [state.loading, hasMore, page, execute]);

  // 重置所有状态
  const resetAll = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    setTotal(0);
    reset();
  }, [reset]);

  // 刷新数据
  const refresh = useCallback(async () => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    await execute(1);
  }, [execute]);

  // 初始加载
  useEffect(() => {
    execute(1);
  }, []);

  return [
    {
      ...state,
      data: allData,
      hasMore,
      total,
    },
    loadMore,
    resetAll,
    refresh,
  ];
}

/**
 * 轮询API请求Hook
 * 提供定时轮询API请求功能
 * @param apiFunction - API请求函数
 * @param interval - 轮询间隔（毫秒）
 * @param config - 配置选项
 * @returns [状态, 开始轮询函数, 停止轮询函数]
 */
export function usePollingApi<T, P extends any[] = []>(
  apiFunction: (...args: P) => Promise<T>,
  interval: number = 5000,
  config: ApiConfig = {}
): [ApiState<T>, (...args: P) => void, () => void] {
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const argsRef = useRef<P>();

  const [state, execute] = useApi(apiFunction, config);

  // 开始轮询
  const startPolling = useCallback(
    (...args: P) => {
      argsRef.current = args;
      setIsPolling(true);

      // 立即执行一次
      execute(...args);

      // 设置定时器
      intervalRef.current = setInterval(() => {
        if (argsRef.current) {
          execute(...argsRef.current);
        }
      }, interval);
    },
    [execute, interval]
  );

  // 停止轮询
  const stopPolling = useCallback(() => {
    setIsPolling(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return [state, startPolling, stopPolling];
}
