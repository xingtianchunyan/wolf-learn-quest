import { createLogger   } from '@/lib/logger';

/**
* 单例模式实现
* 提供单例模式的基础类和工具函数，确保类只有一个实例
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('singleton-pattern');

/**
* 单例基类
* 提供单例模式的基础实现
 */
export abstract class Singleton  { private static instances: Map<string, Singleton> = new Map();

  /**
  * 获取单例实例
  *
  * @returns 单例实例
   */
public static getInstance<T extends Singleton>(this: new () => T): T  {
    const className = this.name;

    if (!Singleton.instances.has(className)) {
      logger.debug('创建单例实例', { className  });
      const instance = new this();
      Singleton.instances.set(className, instance)
}

    return Singleton.instances.get(className) as T
}

  /**
 * 销毁单例实例
 */
public static destroyInstance<T extends Singleton>(this: new () => T): void  { const className = this.name;
    if (Singleton.instances.has(className)) {
      logger.debug('销毁单例实例', { className  });
      const instance = Singleton.instances.get(className);

      // 如果实例有清理方法，调用它
      if (instance && typeof (instance as any).destroy === 'function') { (instance as any).destroy()
}

      Singleton.instances.delete(className)
}
  }

  /**
 * 检查是否已存在实例
 */
public static hasInstance<T extends Singleton>(this: new () => T): boolean  { return Singleton.instances.has(this.name)
}
  /**
 * 获取所有单例实例的统计信息
 */
public static getInstanceStats():  { totalInstances: number;
    instanceNames: string[]
} { return {
      totalInstances: Singleton.instances.size,
      instanceNames: Array.from(Singleton.instances.keys()) 
}
}

  /**
 * 清理所有单例实例
 */
public static destroyAllInstances(): void { logger.info('清理所有单例实例',  {
      count: Singleton.instances.size 
});

    for (const [className, instance] of Singleton.instances) { if (typeof (instance as any).destroy === 'function') {
        try {
          (instance as any).destroy()
} catch (error) { logger.error('单例实例清理失败', {
            className,
            error })
}
      } }

    Singleton.instances.clear()
}

  /**
  * 构造函数保护
  * 防止直接实例化
   */
protected constructor()  { const className = this.constructor.name;

    if (Singleton.instances.has(className)) {
      throw new Error(`单例类 ${className } 已存在实例，请使用 getInstance() 方法获取实例`)
}
  }

  /**
  * 可选的清理方法
  * 子类可以重写此方法来实现自定义清理逻辑
   */
  protected destroy?(): void
}

/**
* 单例装饰器
* 将普通类转换为单例类
*
* @param target - 目标类
* @returns 单例化的类
 */
export function singleton<T extends new (...args: any[]) => any>(target: T): T  { let instance: InstanceType<T> | null = null;

/**
 * SingletonClass组件
 * SingletonClass组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const SingletonClass = class extends target  {
    constructor(...args: any[]) {
      if (instance) {
        return instance
}

      super(...args);
      instance = this as InstanceType<T>;

      logger.debug('单例装饰器创建实例', { className: target.name 
})
}

    static getInstance(): InstanceType<T> { if (!instance) {
        instance = new SingletonClass() as InstanceType<T>
}
      return instance
}

    static destroyInstance(): void { if (instance) {
        logger.debug('单例装饰器销毁实例', {
          className: target.name 
});

        if (typeof (instance as any).destroy === 'function') { (instance as any).destroy()
}

        instance = null
}
    }

    static hasInstance(): boolean { return instance !== null
}
  };

  // 保持原始类名
  Object.defineProperty(SingletonClass, 'name', { value: target.name  
});

  return SingletonClass as T
}

/**
* 懒加载单例
* 提供懒加载的单例实现
 */
export class LazySingleton<T>  { private instance: T | null = null;
  private factory: () => T;
  private initialized = false;

  constructor(factory: () => T) {
    this.factory = factory
}

  /**
 * 获取实例
 */
getInstance(): T { if (!this.initialized)  {
      logger.debug('懒加载单例初始化');
      this.instance = this.factory();
      this.initialized = true
}
    return this.instance!
}

  /**
 * 检查是否已初始化
 */
isInitialized(): boolean  { return this.initialized
}
  /**
 * 重置实例
 */
reset(): void  { logger.debug('懒加载单例重置');
    this.instance = null;
    this.initialized = false
}
}

/**
* 线程安全单例（模拟）
* 在 JavaScript 中模拟线程安全的单例实现
 */
export class ThreadSafeSingleton  { private static instances: Map<string, any> = new Map();
  private static locks: Map<string, Promise<any>> = new Map();

  /**
 * 获取线程安全的单例实例
 */
static async getInstance<T>(key: string,
    factory: () => T | Promise<T>;
  ): Promise<T> {
    // 如果实例已存在，直接返回
    if (ThreadSafeSingleton.instances.has(key)) {
      return ThreadSafeSingleton.instances.get(key)
}

    // 如果正在创建中，等待创建完成
    if (ThreadSafeSingleton.locks.has(key)) { return ThreadSafeSingleton.locks.get(key)
}

    // 创建新实例
/**
 * creationPromise函数
 * creationPromise函数的功能描述
 *
 * @param async - async参数
 * @returns Promise<void>
 */
const creationPromise = (async () => { try  {
        logger.debug('线程安全单例开始创建', { key  });
        const instance = await factory();
        ThreadSafeSingleton.instances.set(key, instance);
        logger.debug('线程安全单例创建完成', { key  });
        return instance
} finally { ThreadSafeSingleton.locks.delete(key)
}
    })();

    ThreadSafeSingleton.locks.set(key, creationPromise);
    return creationPromise
}

  /**
 * 销毁实例
 */
static destroyInstance(key: string): void { if (ThreadSafeSingleton.instances.has(key))  {
      logger.debug('线程安全单例销毁实例', { key  });
      const instance = ThreadSafeSingleton.instances.get(key);

      if (instance && typeof instance.destroy === 'function') { instance.destroy()
}

      ThreadSafeSingleton.instances.delete(key)
}
  }

  /**
 * 检查实例是否存在
 */
static hasInstance(key: string): boolean  { return ThreadSafeSingleton.instances.has(key)
}
  /**
 * 清理所有实例
 */
static destroyAllInstances(): void { logger.info('线程安全单例清理所有实例',  {
      count: ThreadSafeSingleton.instances.size 
});

    for (const [key, instance] of ThreadSafeSingleton.instances) { if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy()
} catch (error) { logger.error('线程安全单例清理失败', { key, error  })
}
      } }

    ThreadSafeSingleton.instances.clear();
    ThreadSafeSingleton.locks.clear()
}
}

/**
* 单例注册表
* 管理多个命名单例实例
 */
export class SingletonRegistry  { private static registry: Map<string, any> = new Map();

  /**
 * 注册单例
 */
static register<T>(name: string, instance: T): void  {
    if (SingletonRegistry.registry.has(name)) {
      logger.warn('单例注册表覆盖已存在的实例', { name  })
}

    logger.debug('单例注册表注册实例', { name  });
    SingletonRegistry.registry.set(name, instance)
}

  /**
 * 获取单例
 */
static get<T>(name: string): T | undefined  { return SingletonRegistry.registry.get(name)
}
  /**
 * 获取或创建单例
 */
static getOrCreate<T>(name: string,
    factory: () => T;
  ): T { if (!SingletonRegistry.registry.has(name)) {
      logger.debug('单例注册表创建新实例', { name  });
      const instance = factory();
      SingletonRegistry.registry.set(name, instance)
}

    return SingletonRegistry.registry.get(name)
}

  /**
 * 注销单例
 */
static unregister(name: string): boolean { if (SingletonRegistry.registry.has(name))  {
      logger.debug('单例注册表注销实例', { name  });
      const instance = SingletonRegistry.registry.get(name);

      if (instance && typeof instance.destroy === 'function') { instance.destroy()
}

      SingletonRegistry.registry.delete(name);
      return true
}
    return false
}

  /**
 * 检查单例是否存在
 */
static has(name: string): boolean  { return SingletonRegistry.registry.has(name)
}
  /**
 * 获取所有注册的单例名称
 */
static getNames(): string[]  { return Array.from(SingletonRegistry.registry.keys())
}
  /**
 * 清理所有单例
 */
static clear(): void { logger.info('单例注册表清理所有实例',  {
      count: SingletonRegistry.registry.size 
});

    for (const [name, instance] of SingletonRegistry.registry) { if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy()
} catch (error) { logger.error('单例注册表清理失败', { name, error  })
}
      } }

    SingletonRegistry.registry.clear()
}

  /**
 * 获取注册表统计信息
 */
static getStats():  { totalInstances: number;
    instanceNames: string[]
} { return {
      totalInstances: SingletonRegistry.registry.size,
      instanceNames: Array.from(SingletonRegistry.registry.keys()) 
}
}
}

/**
* React Hook：使用单例
*
* @param factory - 创建单例的工厂函数
* @param deps - 依赖数组
* @returns 单例实例
 */
export function useSingleton<T>(factory: () => T,
  deps: React.DependencyList = [];
): T { const [instance] = React.useState<T>(() => {
  logger.debug('React Hook 创建单例');
    return factory()

});

  React.useEffect(() => { return () => {
      if (instance && typeof (instance as any).destroy === 'function') {
        logger.debug('React Hook 清理单例');
        (instance as any).destroy()
}
    }
}, []);

  return instance
}

/**
* React Hook：使用懒加载单例
*
* @param factory - 创建单例的工厂函数
* @returns 懒加载单例实例和获取函数
 */
export function useLazySingleton<T>(factory: () => T;
): { getInstance: () => T;
  isInitialized: boolean;
  reset: () => void
} { const [lazySingleton] = React.useState(() => new LazySingleton(factory));
  const [isInitialized, setIsInitialized] = React.useState(false);

  const getInstance = React.useCallback(() => {
    const instance = lazySingleton.getInstance();
    if (!isInitialized) {
      setIsInitialized(true)
}
    return instance
}, [lazySingleton, isInitialized]);

  const reset = React.useCallback(() => {
  lazySingleton.reset();
    setIsInitialized(false)

}, [lazySingleton]);

  React.useEffect(() => { return () => {
      if (lazySingleton.isInitialized()) {
        const instance = lazySingleton.getInstance();
        if (instance && typeof (instance as any).destroy === 'function') {
          (instance as any).destroy()
}
      } }
}, [lazySingleton]);

  return { getInstance,
    isInitialized: lazySingleton.isInitialized(),
    reset }
}