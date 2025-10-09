import { createLogger   } from '@/lib/logger';
import { Loader2   } from 'lucide-react';
import React, { ComponentType, ReactNode   } from 'react';

/**
* 加载状态高阶组件
* 为组件提供统一的加载状态管理和UI展示
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('loading-hoc');

/**
* 加载配置接口
 */
export interface LoadingConfig  { /** 加载文本 */
  loadingText?: string;
  /** 是否显示加载文本 */
  showLoadingText?: boolean;
  /** 加载图标大小 */
  iconSize?: number;
  /** 最小加载时间（毫秒） */
  minLoadingTime?: number;
  /** 自定义加载组件 */
  customLoadingComponent?: ComponentType<LoadingComponentProps>;
  /** 加载容器样式类名 */
  containerClassName?: string;
  /** 是否全屏加载 */
  fullScreen?: boolean;
  /** 背景遮罩透明度 */
  overlayOpacity?: number
}

/**
* 加载组件属性接口
 */
export interface LoadingComponentProps  { /** 加载文本 */
  loadingText?: string;
  /** 是否显示加载文本 */
  showLoadingText?: boolean;
  /** 加载图标大小 */
  iconSize?: number;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 是否全屏加载 */
  fullScreen?: boolean;
  /** 背景遮罩透明度 */
  overlayOpacity?: number
}

/**
* 带加载状态的组件属性接口
 */
export interface WithLoadingProps  { /** 是否正在加载 */
  loading?: boolean;
  /** 加载配置 */
  loadingConfig?: LoadingConfig
}

/**
 * 默认加载组件
 */
const DefaultLoadingComponent: React.FC<LoadingComponentProps> = ( { loadingText = '加载中...',
  showLoadingText = true,
  iconSize = 24,
  containerClassName = '',
  fullScreen = false,
  overlayOpacity = 0.5
}) => { const baseClasses = fullScreen;
  ? 'fixed inset-0 z-50 flex items-center justify-center'
  : 'flex items-center justify-center min-h-[100px] w-full';

  const overlayClasses = fullScreen;
  ? `bg-white bg-opacity-${Math.round(overlayOpacity * 100) }`
  : 'bg-transparent';

  return (;
    <div className={ `${baseClasses } ${ overlayClasses } ${ containerClassName }`}>;
    <div className='flex flex-col items-center space-y-3'>;
    <Loader2
    className='animate-spin text-blue-600';
    size={ iconSize }
    />
    { showLoadingText && (
      <p className='text-sm text-gray-600 font-medium'>;
      {loadingText }
      </p>
    )}
    </div>
    </div>
  )
};

/**
 * 骨架屏加载组件
 */
const SkeletonLoadingComponent: React.FC<LoadingComponentProps> = ( { containerClassName = ''
}) => { return (;
    <div className={`animate-pulse space-y-4 p-4 ${containerClassName }`}>;
    <div className='h-4 bg-gray-200 rounded w-3/4'></div>;
    <div className='space-y-2'>;
    <div className='h-4 bg-gray-200 rounded'></div>;
    <div className='h-4 bg-gray-200 rounded w-5/6'></div>;
    </div>
    <div className='h-32 bg-gray-200 rounded'></div>;
    <div className='flex space-x-4'>;
    <div className='h-10 bg-gray-200 rounded w-20'></div>;
    <div className='h-10 bg-gray-200 rounded w-20'></div>;
    </div>
    </div>
  )
};

/**
 * 点状加载组件
 */
const DotsLoadingComponent: React.FC<LoadingComponentProps> = ( { loadingText = '加载中',
  showLoadingText = true,
  containerClassName = ''
}) => { return (;
    <div className={`flex items-center justify-center min-h-[100px] ${containerClassName }`}>;
    <div className='flex items-center space-x-2'>;
    { showLoadingText && (
      <span className='text-sm text-gray-600 font-medium'>;
      {loadingText }
      </span>
    )}
    <div className='flex space-x-1'>;
    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'></div>;
    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' style={ { animationDelay: '0.1s'  
}}></div>;
    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' style={ { animationDelay: '0.2s'  
}}></div>;
    </div>
    </div>
    </div>
  )
};

/**
 * 进度条加载组件
 */
const ProgressLoadingComponent: React.FC<LoadingComponentProps & { progress?: number  
}> = ( { loadingText = '加载中...',
  showLoadingText = true,
  containerClassName = '',
  progress = 0
}) => { return (;
    <div className={`flex flex-col items-center justify-center min-h-[100px] space-y-4 ${containerClassName }`}>;
    { showLoadingText && (
      <p className='text-sm text-gray-600 font-medium'>;
      {loadingText }
      </p>
    )}
    <div className='w-full max-w-xs'>;
    <div className='bg-gray-200 rounded-full h-2'>;
    <div
    className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out';
    style={ { width: `${Math.min(100, Math.max(0, progress)) }%` }}
    ></div>
    </div>
    <div className='text-xs text-gray-500 mt-1 text-center'>;
    { Math.round(progress) }%
    </div>
    </div>
    </div>
  )
};

/**
* 加载状态高阶组件
*
* @param config - 加载配置
* @returns 高阶组件函数
 */
export function withLoading<P extends object>(
  config: LoadingConfig = {
}
) { return function <T extends ComponentType<P>>(;
    WrappedComponent: T
  ): ComponentType<P & WithLoadingProps> {

/**
 * LoadingHOC组件
 * 加载组件，显示加载状态
 * @param props - 组件属性
 * @returns JSX元素
 */
const LoadingHOC: React.FC<P & WithLoadingProps> = props =>  {
      const { loading = false, loadingConfig, ...restProps  } = props;

      // 合并配置
      const finalConfig: LoadingConfig = { loadingText: '加载中...',
        showLoadingText: true,
        iconSize: 24,
        minLoadingTime: 0,
        fullScreen: false,
        overlayOpacity: 0.5,
        ...config,
        ...loadingConfig  };

      // 最小加载时间处理
      const [showLoading, setShowLoading] = React.useState(loading);
      const [minTimeElapsed, setMinTimeElapsed] = React.useState(false);

      React.useEffect(() => { if (loading) {
          setShowLoading(true);
          setMinTimeElapsed(false);

          if (finalConfig.minLoadingTime && finalConfig.minLoadingTime > 0) {
            const timer = setTimeout(() => {
  setMinTimeElapsed(true)
}, finalConfig.minLoadingTime);

            return () => clearTimeout(timer)

} else { setMinTimeElapsed(true)
}
        } else if (minTimeElapsed) { setShowLoading(false)
}
      }, [loading, minTimeElapsed, finalConfig.minLoadingTime]);

      // 记录加载状态变化
      React.useEffect(() => { if (loading) {
          logger.debug('组件开始加载', {
            component: WrappedComponent.name,
            config: finalConfig 
})
} else { logger.debug('组件加载完成', {
            component: WrappedComponent.name 
})
}
      }, [loading]);

      if (showLoading) { const LoadingComponent = finalConfig.customLoadingComponent || DefaultLoadingComponent;

        return (;
          <LoadingComponent
          loadingText={finalConfig.loadingText }
          showLoadingText={ finalConfig.showLoadingText }
          iconSize={ finalConfig.iconSize }
          containerClassName={ finalConfig.containerClassName }
          fullScreen={ finalConfig.fullScreen }
          overlayOpacity={ finalConfig.overlayOpacity }
          />
        )
}

      return <WrappedComponent { ...(restProps as P) } />
};

    // 设置显示名称
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    LoadingHOC.displayName = `withLoading(${ wrappedComponentName })`;

    return LoadingHOC
}
}

/**
* 加载状态装饰器
* 用于类组件的装饰器语法
*
* @param config - 加载配置
* @returns 装饰器函数
 */
export function Loading(config: LoadingConfig = {
}) { return function <T extends ComponentType<any>>(target: T): T  {
    return withLoading(config)(target) as T
}
}

/**
* 快速加载包装函数
* 用于快速包装组件
*
* @param component - 要包装的组件
* @param config - 加载配置
* @returns 包装后的组件
 */
export function wrapWithLoading<P extends object>(
  component: ComponentType<P>,
  config: LoadingConfig = {
}
): ComponentType<P & WithLoadingProps> { return withLoading(config)(component)
}

/**
* 预设配置的加载组件
 */
export const LoadingPresets =  { /**
 * 默认加载 - 旋转图标 + 文本
 */
default:  {
    loadingText: '加载中...',
    showLoadingText: true,
    iconSize: 24 
} as LoadingConfig,

  /**
 * 骨架屏加载
 */
skeleton:  { customLoadingComponent: SkeletonLoadingComponent,
    showLoadingText: false 
} as LoadingConfig,

  /**
 * 点状加载
 */
dots:  { customLoadingComponent: DotsLoadingComponent,
    loadingText: '加载中',
    showLoadingText: true 
} as LoadingConfig,

  /**
 * 全屏加载
 */
fullScreen:  { loadingText: '正在加载，请稍候...',
    showLoadingText: true,
    iconSize: 32,
    fullScreen: true,
    overlayOpacity: 0.8 
} as LoadingConfig,

  /**
 * 小尺寸加载
 */
small:  { loadingText: '加载中',
    showLoadingText: false,
    iconSize: 16,
    containerClassName: 'min-h-[50px]' 
} as LoadingConfig,

  /**
 * 大尺寸加载
 */
large:  { loadingText: '正在加载内容...',
    showLoadingText: true,
    iconSize: 40,
    containerClassName: 'min-h-[200px]' 
} as LoadingConfig,

  /**
 * 技能加载 - 针对技能相关操作
 */
skill:  { loadingText: '技能执行中...',
    showLoadingText: true,
    iconSize: 20,
    minLoadingTime: 500 
} as LoadingConfig,

  /**
 * 游戏加载 - 针对游戏相关操作
 */
game:  { loadingText: '游戏加载中...',
    showLoadingText: true,
    iconSize: 28,
    minLoadingTime: 1000 
} as LoadingConfig };

/**
* 自定义 Hook：使用加载状态
*
* @param initialLoading - 初始加载状态
* @returns 加载状态和控制函数
 */
export function useLoading(initialLoading: boolean = false)  { const [loading, setLoading] = React.useState(initialLoading);
  const [loadingText, setLoadingText] = React.useState<string>('加载中...');

  const startLoading = React.useCallback((text?: string) => {
    if (text) setLoadingText(text);
    setLoading(true);
    logger.debug('开始加载', { text  })
}, []);

  const stopLoading = React.useCallback(() => {
  setLoading(false);
    logger.debug('停止加载')

}, []);

  const withLoadingWrapper = React.useCallback(;
    async <T>(
      asyncFn: () => Promise<T>,
      text?: string
    ): Promise<T> => { try {
        startLoading(text);
        const result = await asyncFn();
        return result
} finally { stopLoading()
}
    },
    [startLoading, stopLoading]
  );

  return { loading,
    loadingText,
    startLoading,
    stopLoading,
    withLoading: withLoadingWrapper 
}
}