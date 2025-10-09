/**
 * 文件级注释：防抖Hook
 * 提供防抖功能的自定义Hook
 */
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 防抖值Hook
 * 对值进行防抖处理
 * @param value - 需要防抖的值
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置定时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理定时器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 防抖回调Hook
 * 对回调函数进行防抖处理
 * @param callback - 需要防抖的回调函数
 * @param delay - 延迟时间（毫秒）
 * @param deps - 依赖数组
 * @returns 防抖后的回调函数
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 设置新的定时器
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps]
  ) as T;

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * 防抖状态Hook
 * 提供防抖的状态管理
 * @param initialValue - 初始值
 * @param delay - 延迟时间（毫秒）
 * @returns [当前值, 防抖值, 设置函数]
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, setValue];
}

/**
 * 防抖搜索Hook
 * 专门用于搜索场景的防抖Hook
 * @param searchTerm - 搜索词
 * @param delay - 延迟时间（毫秒）
 * @returns [搜索词, 防抖搜索词, 是否正在搜索]
 */
export function useDebouncedSearch(
  searchTerm: string,
  delay: number = 300
): [string, string, boolean] {
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, debouncedSearchTerm]);

  return [searchTerm, debouncedSearchTerm, isSearching];
}
