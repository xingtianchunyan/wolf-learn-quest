/**
 * @fileoverview 加载状态高阶组件
 * 为组件提供统一的加载状态管理和UI展示
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import React, { ComponentType } from 'react';
import { createLogger } from '@/lib/logger';
import { Loader2, AlertCircle } from 'lucide-react';

const logger = createLogger('loading-hoc');

/**
 * 加载状态配置接口
 */
export interface LoadingConfig {
  /** 加载文本 */
  loadingText?: string;
  /** 加载组件 */
  loadingComponent?: ComponentType<LoadingProps>;
  /** 最小加载时间（毫秒），防止闪烁 */
  minLoadingTime?: number;
  /** 加载超时时间（毫秒） */
  timeout?: number;
  /** 超时回调 */
  onTimeout?: () => void;
  /** 是否显示加载进度 */
  showProgress?: boolean;
  /** 是否显示取消按钮 */
  showCancelButton?: boolean;
  /** 取消回调 */
  onCancel?: () => void;
  /** 加载大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否全屏加载 */
  fullscreen?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 加载组件属性接口
 */
export interface LoadingProps {
  /** 是否正在加载 */
  isLoading: boolean;
  /** 加载文本 */
  loadingText?: string;
  /** 加载进度（0-100） */
  progress?: number;
  /** 配置选项 */
  config: LoadingConfig;
  /** 取消函数 */
  onCancel?: () => void;
}

/**
 * 加载状态接口
 */
export interface LoadingState {
  /** 是否正在加载 */
  isLoading: boolean;
  /** 加载开始时间 */
  startTime: number;
  /** 是否已超时 */
  isTimeout: boolean;
  /** 加载进度 */
  progress: number;
}

/**
 * 默认加载配置
 */
const DEFAULT_CONFIG: LoadingConfig = {
  loadingText: '加载中...',
  minLoadingTime: 300,
  timeout: 30000,
  showProgress: false,
  showCancelButton: false,
  size: 'medium',
  fullscreen: false,
};

/**
 * 获取加载器大小样式
 */
const getLoaderSize = (size: LoadingConfig['size']) => {
  switch (size) {
    case 'small':
      return 'h-4 w-4';
    case 'large':
      return 'h-8 w-8';
    default:
      return 'h-6 w-6';
  }
};

/**
 * 获取容器样式
 */
const getContainerStyles = (config: LoadingConfig) => {
  const baseStyles = 'flex items-center justify-center';

  if (config.fullscreen) {
    return `${baseStyles} fixed inset-0 bg-white bg-opacity-80 z-50`;
  }

  return `${baseStyles} p-8 min-h-[200px]`;
};

/**
 * 默认加载组件
 */
const DefaultLoadingComponent: React.FC<LoadingProps> = ({
  isLoading,
  loadingText,
  progress,
  config,
  onCancel,
}) => {
  if (!isLoading) {
    return null;
  }

  const loaderSize = getLoaderSize(config.size);
  const containerStyles = getContainerStyles(config);

  return (
    <div className={`${containerStyles} ${config.className || ''}`}>
      <div className='text-center max-w-sm w-full'>
        {/* 加载图标 */}
        <div className='flex justify-center mb-4'>
          <Loader2 className={`${loaderSize} animate-spin text-blue-600`} />
        </div>
        {/* 加载文本 */}{' '}
        {loadingText && (
          <p className='text-gray-600 mb-4 text-sm md:text-base'>
            {loadingText}
          </p>
        )}
        {/* 进度条 */}{' '}
        {config.showProgress && typeof progress === 'number' && (
          <div className='mb-4'>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              {Math.round(progress)}%
            </p>
          </div>
        )}
        {/* 取消按钮 */}{' '}
        {config.showCancelButton && onCancel && (
          <button
            onClick={onCancel}
            className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
          >
            取消
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * 超时提示组件
 */
const TimeoutComponent: React.FC<{
  config: LoadingConfig;
  onRetry?: () => void;
  onCancel?: () => void;
}> = ({ config, onRetry, onCancel }) => {
  const containerStyles = getContainerStyles(config);

  return (
    <div className={`${containerStyles} ${config.className || ''}`}>
      <div className='text-center max-w-sm w-full'>
        <div className='flex justify-center mb-4'>
          <AlertCircle className='h-8 w-8 text-orange-500' />
        </div>

        <h3 className='text-lg font-semibold text-gray-900 mb-2'>加载超时</h3>

        <p className='text-gray-600 mb-4 text-sm'>
          请求处理时间过长，请检查网络连接或稍后重试
        </p>

        <div className='flex gap-2 justify-center'>
          {onRetry && (
            <button
              onClick={onRetry}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm'
            >
              重试
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className='px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm'
            >
              取消
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 加载状态高阶组件
 * @param config - 加载配置
 * @returns HOC函数
 */
export function withLoading<P extends object>(config: LoadingConfig = {}) {
  return function <T extends ComponentType<P>>(
    WrappedComponent: T
  ): ComponentType<P & { isLoading?: boolean; loadingProgress?: number }> {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    /**
     * LoadingWrapper组件
     * 加载组件，显示加载状态
     * @param props - 组件属性
     * @returns JSX元素
     */
    const LoadingWrapper: React.FC<
      P & { isLoading?: boolean; loadingProgress?: number }
    > = ({ isLoading = false, loadingProgress, ...props }) => {
      const [loadingState, setLoadingState] = React.useState<LoadingState>({
        isLoading: false,
        startTime: 0,
        isTimeout: false,
        progress: 0,
      });

      const timeoutRef = React.useRef<NodeJS.Timeout>();
      const minTimeRef = React.useRef<NodeJS.Timeout>();

      // 处理加载状态变化
      React.useEffect(() => {
        if (isLoading && !loadingState.isLoading) {
          // 开始加载
          const startTime = Date.now();
          setLoadingState(prev => ({
            ...prev,
            isLoading: true,
            startTime,
            isTimeout: false,
            progress: 0,
          }));

          // 设置超时定时器
          if (mergedConfig.timeout && mergedConfig.timeout > 0) {
            timeoutRef.current = setTimeout(() => {
              setLoadingState(prev => ({ ...prev, isTimeout: true }));
              if (mergedConfig.onTimeout) {
                mergedConfig.onTimeout();
              }
              logger.warn('加载超时', { timeout: mergedConfig.timeout });
            }, mergedConfig.timeout);
          }

          logger.debug('开始加载', { startTime });
        } else if (!isLoading && loadingState.isLoading) {
          // 结束加载
          const endTime = Date.now();
          const loadingDuration = endTime - loadingState.startTime;
          const minTime = mergedConfig.minLoadingTime || 0;

          // 清除超时定时器
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
          }

          // 确保最小加载时间
          if (loadingDuration < minTime) {
            minTimeRef.current = setTimeout(() => {
              setLoadingState(prev => ({
                ...prev,
                isLoading: false,
                isTimeout: false,
              }));
            }, minTime - loadingDuration);
          } else {
            setLoadingState(prev => ({
              ...prev,
              isLoading: false,
              isTimeout: false,
            }));
          }

          logger.debug('结束加载', {
            loadingDuration,
            minTime,
            actualDuration: Math.max(loadingDuration, minTime),
          });
        }

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          if (minTimeRef.current) {
            clearTimeout(minTimeRef.current);
          }
        };
      }, [
        isLoading,
        loadingState.isLoading,
        loadingState.startTime,
        mergedConfig,
      ]);

      // 更新进度
      React.useEffect(() => {
        if (typeof loadingProgress === 'number') {
          setLoadingState(prev => ({
            ...prev,
            progress: loadingProgress,
          }));
        }
      }, [loadingProgress]);

      // 取消处理
      const handleCancel = React.useCallback(() => {
        if (mergedConfig.onCancel) {
          mergedConfig.onCancel();
        }
        setLoadingState(prev => ({
          ...prev,
          isLoading: false,
          isTimeout: false,
        }));
        logger.debug('用户取消加载');
      }, [mergedConfig]);

      // 重试处理
      const handleRetry = React.useCallback(() => {
        setLoadingState(prev => ({
          ...prev,
          isTimeout: false,
          startTime: Date.now(),
        }));
        logger.debug('用户重试加载');
      }, []);

      // 如果超时，显示超时组件
      if (loadingState.isTimeout) {
        return (
          <TimeoutComponent
            config={mergedConfig}
            onRetry={handleRetry}
            onCancel={handleCancel}
          />
        );
      }

      // 如果正在加载，显示加载组件
      if (loadingState.isLoading) {
        /**
         * LoadingComponent组件
         * 加载组件，显示加载状态
         * @param props - 组件属性
         * @returns JSX元素
         */
        const LoadingComponent =
          mergedConfig.loadingComponent || DefaultLoadingComponent;

        return (
          <LoadingComponent
            isLoading={loadingState.isLoading}
            loadingText={mergedConfig.loadingText}
            progress={loadingState.progress}
            config={mergedConfig}
            onCancel={mergedConfig.showCancelButton ? handleCancel : undefined}
          />
        );
      }

      // 渲染原组件
      return <WrappedComponent {...(props as P)} />;
    };

    // 设置显示名称
    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';
    LoadingWrapper.displayName = `withLoading(${wrappedComponentName})`;

    return LoadingWrapper;
  };
}

/**
 * 加载状态Hook
 */
export function useLoading(config: LoadingConfig = {}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<Error | null>(null);

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    setError(null);
    logger.debug('Hook开始加载');
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
    setProgress(100);
    logger.debug('Hook结束加载');
  }, []);

  const updateProgress = React.useCallback((newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)));
  }, []);

  const setLoadingError = React.useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
    logger.error('Hook加载错误', { error });
  }, []);

  const reset = React.useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    isLoading,
    progress,
    error,
    startLoading,
    stopLoading,
    updateProgress,
    setError: setLoadingError,
    reset,
  };
}

/**
 * 异步操作加载Hook
 */
export function useAsyncLoading<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T,
  config: LoadingConfig = {}
) {
  const {
    isLoading,
    progress,
    error,
    startLoading,
    stopLoading,
    setError,
    updateProgress,
  } = useLoading(config);

  const execute = React.useCallback(
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
      try {
        startLoading();
        const result = await asyncFunction(...args);
        stopLoading();
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        return null;
      }
    },
    [asyncFunction, startLoading, stopLoading, setError]
  );

  return {
    execute,
    isLoading,
    progress,
    error,
    updateProgress,
  };
}

/**
 * 加载工具函数
 */
export const loadingUtils = {
  /**
   * 创建带加载状态的组件
   */
  createLoadingComponent<P extends object>(
    Component: ComponentType<P>,
    config?: LoadingConfig
  ): ComponentType<P & { isLoading?: boolean; loadingProgress?: number }> {
    return withLoading(config)(Component);
  },

  /**
   * 包装异步函数，自动管理加载状态
   */
  wrapAsyncFunction<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: Error) => void
  ): T {
    return (async (...args: Parameters<T>) => {
      try {
        if (onStart) {
          onStart();
        }
        const result = await fn(...args);
        if (onEnd) {
          onEnd();
        }
        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));
        if (onError) {
          onError(errorObj);
        } else {
          throw errorObj;
        }
      }
    }) as T;
  },

  /**
   * 创建进度跟踪器
   */
  createProgressTracker(onProgress: (progress: number) => void) {
    let currentProgress = 0;

    return {
      setProgress: (progress: number) => {
        currentProgress = Math.min(100, Math.max(0, progress));
        onProgress(currentProgress);
      },
      increment: (amount: number = 1) => {
        currentProgress = Math.min(100, currentProgress + amount);
        onProgress(currentProgress);
      },
      complete: () => {
        currentProgress = 100;
        onProgress(currentProgress);
      },
      reset: () => {
        currentProgress = 0;
        onProgress(currentProgress);
      },
      getCurrentProgress: () => currentProgress,
    };
  },
};
