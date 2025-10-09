/**
* 设计模式库统一导出
* 提供常用设计模式的实现，包括观察者、单例、工厂和策略模式
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

// 观察者模式
export { EventEmitter,
  TypedEventEmitter,
  globalEventEmitter,
  EventNames,
  useEventListener,
  useEventEmitter  } from './observer';

// 单例模式
export { Singleton,
  singleton,
  LazySingleton,
  ThreadSafeSingleton,
  SingletonRegistry,
  useSingleton,
  useLazySingleton  } from './singleton';

// 工厂模式
export { type Factory,
  AbstractFactory,
  SimpleFactory,
  FactoryBuilder,
  AsyncFactory,
  ConditionalFactory,
  factory,
  factoryMethod,
  useFactory,
  useAsyncFactory,
  FactoryManager  } from './factory';

// 策略模式
export { type Strategy,
  type AsyncStrategy,
  StrategyContext,
  ConditionalStrategySelector,
  StrategyChain,
  strategy,
  useStrategyContext,
  useConditionalStrategy,
  StrategyManager  } from './strategy';

/**
* 设计模式工具类
* 提供设计模式的快速使用方法
 */
export class PatternUtils  { /**
  * 创建简单工厂
  *
  * @param types - 产品类型映射
  * @returns 工厂实例
   */
  static createSimpleFactory<T>(types: Record<string, new (...args: any[]) => T>;
  ): SimpleFactory<T> {
    return new SimpleFactory(types)
}

  /**
  * 创建策略上下文
  *
  * @param strategies - 策略映射
  * @returns 策略上下文实例
   */
  static createStrategyContext<TInput = any, TOutput = any>(;
    strategies?: Record<string, Strategy<TInput, TOutput>>
  ): StrategyContext<TInput, TOutput> { const context = new StrategyContext<TInput, TOutput>();

    if (strategies) {
      Object.entries(strategies).forEach(([name, strategy]) => {
  context.registerStrategy(name, strategy)
})
}

    return context

}

  /**
  * 创建事件发射器
  *
  * @returns 事件发射器实例
   */
static createEventEmitter(): EventEmitter  { return new EventEmitter()
}

  /**
  * 创建类型化事件发射器
  *
  * @returns 类型化事件发射器实例
   */
static createTypedEventEmitter<T extends Record<string, any>>(): TypedEventEmitter<T>  { return new TypedEventEmitter<T>()
}

  /**
  * 创建懒加载单例
  *
  * @param factory - 工厂函数
  * @returns 懒加载单例实例
   */
static createLazySingleton<T>(factory: () => T): LazySingleton<T>  { return new LazySingleton(factory)
}

  /**
  * 创建条件策略选择器
  *
  * @returns 条件策略选择器实例
   */
static createConditionalStrategySelector<TInput = any, TOutput = any>(): ConditionalStrategySelector<TInput, TOutput>  { return new ConditionalStrategySelector<TInput, TOutput>()
}

  /**
  * 创建策略链
  *
  * @returns 策略链实例
   */
static createStrategyChain<TInput = any, TOutput = any>(): StrategyChain<TInput, TOutput>  { return new StrategyChain<TInput, TOutput>()
}

  /**
  * 创建异步工厂
  *
  * @returns 异步工厂实例
   */
static createAsyncFactory<T>(): AsyncFactory<T>  { return new AsyncFactory<T>()
}

  /**
  * 创建条件工厂
  *
  * @returns 条件工厂实例
   */
static createConditionalFactory<T>(): ConditionalFactory<T>  { return new ConditionalFactory<T>()
}
}

/**
* 设计模式常量
 */
export const PATTERN_CONSTANTS =  { // 事件名称
  EVENTS: {
    PATTERN_CREATED: 'pattern:created',
    PATTERN_DESTROYED: 'pattern:destroyed',
    STRATEGY_CHANGED: 'strategy:changed',
    FACTORY_REGISTERED: 'factory:registered',
    SINGLETON_CREATED: 'singleton:created' 
},

  // 默认配置
  DEFAULTS: { MAX_LISTENERS: 100,
    RETRY_ATTEMPTS: 3,
    TIMEOUT: 5000 
}
} as const;

/**
 * 设计模式类型定义
 */
export type PatternType =;
| 'observer'
| 'singleton'
| 'factory'
| 'strategy'
| 'builder'
| 'adapter'
| 'decorator';

/**
 * 模式元数据接口
 */
export interface PatternMetadata  { type: PatternType;
  name: string;
  description: string;
  createdAt: Date;
  version: string
}

/**
* 设计模式注册表
* 统一管理所有设计模式实例
 */
export class PatternRegistry { private static patterns: Map<string,  {
    instance: any;
    metadata: PatternMetadata
}> = new Map();

  /**
  * 注册模式实例
  *
  * @param id - 实例ID
  * @param instance - 模式实例
  * @param metadata - 元数据
   */
  static register(
    id: string,
    instance: any,
    metadata: PatternMetadata
  ): void { PatternRegistry.patterns.set(id, { instance, metadata  });

    // 发送注册事件
    globalEventEmitter.emit(PATTERN_CONSTANTS.EVENTS.PATTERN_CREATED, { id,
      metadata })
}

  /**
  * 获取模式实例
  *
  * @param id - 实例ID
   */
static get<T = any>(id: string): T | undefined  { return PatternRegistry.patterns.get(id)?.instance
}

  /**
  * 获取模式元数据
  *
  * @param id - 实例ID
   */
static getMetadata(id: string): PatternMetadata | undefined  { return PatternRegistry.patterns.get(id)?.metadata
}

  /**
  * 注销模式实例
  *
  * @param id - 实例ID
   */
static unregister(id: string): boolean  { const pattern = PatternRegistry.patterns.get(id);
    if (pattern) {
      // 如果实例有清理方法，调用它
      if (pattern.instance && typeof pattern.instance.destroy === 'function') {
        pattern.instance.destroy()
}

      PatternRegistry.patterns.delete(id);

      // 发送注销事件
      globalEventEmitter.emit(PATTERN_CONSTANTS.EVENTS.PATTERN_DESTROYED, { id,
        metadata: pattern.metadata 
});

      return true
}
    return false
}

  /**
  * 按类型获取模式实例
  *
  * @param type - 模式类型
   */
static getByType<T = any>(type: PatternType): Array<{ id: string; instance: T; metadata: PatternMetadata  
}> { const results: Array< { id: string; instance: T; metadata: PatternMetadata  
}> = [];

    for (const [id, { instance, metadata  }] of PatternRegistry.patterns) { if (metadata.type === type) {
        results.push({ id, instance, metadata  })
}
    }

    return results
}

  /**
  * 检查模式是否存在
  *
  * @param id - 实例ID
   */
static has(id: string): boolean  { return PatternRegistry.patterns.has(id)
}

  /**
 * 获取所有模式ID
 */
static getIds(): string[]  { return Array.from(PatternRegistry.patterns.keys())
}
  /**
 * 清理所有模式
 */
static clear(): void { for (const [id, { instance, metadata  }] of PatternRegistry.patterns) { if (instance && typeof instance.destroy === 'function')  {
        try {
          instance.destroy()
} catch (error) { console.error(`清理模式实例失败: ${id 
}`, error)
}
      }

      globalEventEmitter.emit(PATTERN_CONSTANTS.EVENTS.PATTERN_DESTROYED, { id,
        metadata })
}

    PatternRegistry.patterns.clear()
}

  /**
 * 获取注册表统计信息
 */
static getStats():  { totalPatterns: number;
    patternsByType: Record<PatternType, number>;
    patternIds: string[]
} { const patternsByType: Record<PatternType, number> = {
      observer: 0,
      singleton: 0,
      factory: 0,
      strategy: 0,
      builder: 0,
      adapter: 0,
      decorator: 0  
};

    for (const { metadata  } of PatternRegistry.patterns.values()) { patternsByType[metadata.type]++
}

    return { totalPatterns: PatternRegistry.patterns.size,
      patternsByType,
      patternIds: Array.from(PatternRegistry.patterns.keys()) 
}
}
}