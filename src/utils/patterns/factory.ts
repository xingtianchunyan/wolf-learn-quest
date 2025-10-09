import { createLogger   } from '@/lib/logger';

/**
* 工厂模式实现
* 提供工厂模式的基础类和工具函数，用于创建对象实例
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('factory-pattern');

/**
* 工厂接口
* 定义工厂的基本契约
 */
export interface Factory<T>  { create(...args: any[]): T
}

/**
* 抽象工厂基类
* 提供工厂模式的基础实现
 */
export abstract class AbstractFactory<T> implements Factory<T>  { protected registry: Map<string, new (...args: any[]) => T> = new Map();

  /**
  * 注册产品类型
  *
  * @param type - 产品类型标识
  * @param constructor - 产品构造函数
   */
register(type: string, constructor: new (...args: any[]) => T): void  {
    logger.debug('工厂注册产品类型', { type, constructor: constructor.name  
});
    this.registry.set(type, constructor)
}

  /**
  * 注销产品类型
  *
  * @param type - 产品类型标识
   */
unregister(type: string): boolean { if (this.registry.has(type))  {
      logger.debug('工厂注销产品类型', { type  });
      this.registry.delete(type);
      return true
}
    return false
}

  /**
  * 检查产品类型是否已注册
  *
  * @param type - 产品类型标识
   */
hasType(type: string): boolean  { return this.registry.has(type)
}

  /**
 * 获取所有已注册的产品类型
 */
getRegisteredTypes(): string[]  { return Array.from(this.registry.keys())
}
  /**
  * 创建产品实例
  *
  * @param type - 产品类型标识
  * @param args - 构造参数
   */
create(type: string, ...args: any[]): T  { const Constructor = this.registry.get(type);

    if (!Constructor) {
      const error = new Error(`未知的产品类型: ${type 
}`);
      logger.error('工厂创建失败', { type, availableTypes: this.getRegisteredTypes()  
});
      throw error
}

    try { logger.debug('工厂创建产品实例', { type, constructor: Constructor.name  
});
      return new Constructor(...args)
} catch (error) { logger.error('工厂实例化失败', { type, error  });
      throw error
}
  }

  /**
  * 批量创建产品实例
  *
  * @param configs - 产品配置数组
   */
createBatch(configs: Array<{ type: string; args?: any[]  
}>): T[] { logger.debug('工厂批量创建产品',  { count: configs.length  
});

    return configs.map(config => {
  return this.create(config.type, ...(config.args || []))
})

}

  /**
 * 清理工厂注册表
 */
clear(): void { logger.info('工厂清理注册表',  { count: this.registry.size  
});
    this.registry.clear()
}
}

/**
* 简单工厂
* 提供简单的工厂实现
 */
export class SimpleFactory<T> extends AbstractFactory<T> { constructor(initialTypes?: Record<string, new (...args: any[]) => T>)  {
    super();

    if (initialTypes) {
      Object.entries(initialTypes).forEach(([type, constructor]) => {
  this.register(type, constructor)
})
}
  } 
}

/**
* 工厂建造者
* 提供链式调用的工厂配置方式
 */
export class FactoryBuilder<T>  { private factory: SimpleFactory<T>;

  constructor() {
    this.factory = new SimpleFactory<T>()
}

  /**
 * 注册产品类型
 */
register(type: string, constructor: new (...args: any[]) => T): this  { this.factory.register(type, constructor);
    return this
}

  /**
 * 批量注册产品类型
 */
registerBatch(types: Record<string, new (...args: any[]) => T>): this { Object.entries(types).forEach(([type, constructor]) =>  {
  this.factory.register(type, constructor)
});
    return this

}

  /**
 * 构建工厂
 */
build(): SimpleFactory<T>  { return this.factory
}
}

/**
* 异步工厂
* 支持异步创建产品实例
 */
export class AsyncFactory<T>  { private registry: Map<string, (...args: any[]) => Promise<T>> = new Map();

  /**
  * 注册异步产品创建函数
  *
  * @param type - 产品类型标识
  * @param factory - 异步工厂函数
   */
register(type: string, factory: (...args: any[]) => Promise<T>): void  {
    logger.debug('异步工厂注册产品类型', { type  });
    this.registry.set(type, factory)
}

  /**
 * 注销产品类型
 */
unregister(type: string): boolean { if (this.registry.has(type))  {
      logger.debug('异步工厂注销产品类型', { type  });
      this.registry.delete(type);
      return true
}
    return false
}

  /**
 * 检查产品类型是否已注册
 */
hasType(type: string): boolean  { return this.registry.has(type)
}
  /**
 * 获取所有已注册的产品类型
 */
getRegisteredTypes(): string[]  { return Array.from(this.registry.keys())
}
  /**
  * 异步创建产品实例
  *
  * @param type - 产品类型标识
  * @param args - 构造参数
   */
async create(type: string, ...args: any[]): Promise<T>  { const factory = this.registry.get(type);

    if (!factory) {
      const error = new Error(`未知的产品类型: ${type 
}`);
      logger.error('异步工厂创建失败', { type, availableTypes: this.getRegisteredTypes()  
});
      throw error
}

    try { logger.debug('异步工厂创建产品实例', { type  });
      return await factory(...args)
} catch (error) { logger.error('异步工厂实例化失败', { type, error  });
      throw error
}
  }

  /**
  * 批量异步创建产品实例
  *
  * @param configs - 产品配置数组
   */
async createBatch(configs: Array<{ type: string; args?: any[]  
}>): Promise<T[]> { logger.debug('异步工厂批量创建产品',  { count: configs.length  
});

    const promises = configs.map(config => {
  return this.create(config.type, ...(config.args || []))
});

    return Promise.all(promises)

}

  /**
  * 并发创建产品实例（限制并发数）
  *
  * @param configs - 产品配置数组
  * @param concurrency - 并发限制
   */
  async createConcurrent(
    configs: Array<{ type: string; args?: any[]  
}>,
    concurrency: number = 5;
  ): Promise<T[]> { logger.debug('异步工厂并发创建产品', {
      count: configs.length,
      concurrency });

    const results: T[] = [];

    for (let i = 0; i < configs.length; i += concurrency) { const batch = configs.slice(i, i + concurrency);
      const batchResults = await this.createBatch(batch);
      results.push(...batchResults)
}

    return results
}

  /**
 * 清理工厂注册表
 */
clear(): void { logger.info('异步工厂清理注册表',  { count: this.registry.size  
});
    this.registry.clear()
}
}

/**
* 条件工厂
* 根据条件选择不同的工厂策略
 */
export class ConditionalFactory<T> { private conditions: Array< {
    condition: (...args: any[]) => boolean;
    factory: Factory<T>;
    name: string
}> = [];

  /**
  * 添加条件工厂
  *
  * @param name - 条件名称
  * @param condition - 条件函数
  * @param factory - 工厂实例
   */
  addCondition(name: string,
    condition: (...args: any[]) => boolean,
    factory: Factory<T>
  ): this { logger.debug('条件工厂添加条件', { name  });
    this.conditions.push({ name, condition, factory  });
    return this
}

  /**
  * 移除条件工厂
  *
  * @param name - 条件名称
   */
removeCondition(name: string): boolean  { const index = this.conditions.findIndex(c => c.name === name);
    if (index !== -1) {
      logger.debug('条件工厂移除条件', { name  });
      this.conditions.splice(index, 1);
      return true
}
    return false
}

  /**
  * 根据条件创建产品实例
  *
  * @param args - 参数
   */
create(...args: any[]): T { for (const { name, condition, factory  } of this.conditions) { if (condition(...args))  {
        logger.debug('条件工厂匹配条件', { name  });
        return factory.create(...args)
}
    }

    const error = new Error('没有匹配的条件工厂');
    logger.error('条件工厂创建失败', { conditionCount: this.conditions.length 
});
    throw error
}

  /**
 * 获取所有条件名称
 */
getConditionNames(): string[]  { return this.conditions.map(c => c.name)
}
  /**
 * 清理所有条件
 */
clear(): void { logger.info('条件工厂清理所有条件',  {
      count: this.conditions.length 
});
    this.conditions = []
}
}

/**
* 工厂装饰器
* 为类添加工厂方法
*
* @param factoryMethod - 工厂方法名称
 */
export function factory(factoryMethod: string = 'create') { return function <T extends new (...args: any[]) => any>(target: T): T  {
/**
 * FactoryClass组件
 * FactoryClass组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const FactoryClass = class extends target  {
      static [factoryMethod](...args: any[]): InstanceType<T> {
        logger.debug('工厂装饰器创建实例', {
          className: target.name,
          factoryMethod });
        return new target(...args)
}
    };

    // 保持原始类名
    Object.defineProperty(FactoryClass, 'name', { value: target.name  
});

    return FactoryClass as T
}
}

/**
* 工厂方法装饰器
* 为方法添加工厂功能
*
* @param type - 产品类型
 */
export function factoryMethod(type: string)  { return function(;
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      logger.debug('工厂方法装饰器调用', {
        type,
        method: propertyKey 
});
      return originalMethod.apply(this, args)
};

    // 添加类型信息
    if (!target.constructor._factoryTypes) { target.constructor._factoryTypes = new Set()
}
    target.constructor._factoryTypes.add(type);

    return descriptor
}
}

/**
* React Hook：使用工厂
*
* @param factory - 工厂实例
* @returns 工厂实例和创建函数
 */
export function useFactory<T>(factory: Factory<T>):  { factory: Factory<T>;
  create: (type: string, ...args: any[]) => T
} { const create = React.useCallback((type: string, ...args: any[]) => {
  return factory.create(type, ...args)

}, [factory]);

  return { factory, create  }
}

/**
* React Hook：使用异步工厂
*
* @param factory - 异步工厂实例
* @returns 异步工厂实例和创建函数
 */
export function useAsyncFactory<T>(factory: AsyncFactory<T>):  { factory: AsyncFactory<T>;
  create: (type: string, ...args: any[]) => Promise<T>;
  createBatch: (configs: Array<{ type: string; args?: any[]  
}>) => Promise<T[]>
} { const create = React.useCallback(async (type: string, ...args: any[]) => {
  return factory.create(type, ...args)

}, [factory]);

  const createBatch = React.useCallback(async (;
    configs: Array<{ type: string; args?: any[]  
}>
  ) => {
  return factory.createBatch(configs)

}, [factory]);

  return { factory, create, createBatch  }
}

/**
* 工厂管理器
* 管理多个工厂实例
 */
export class FactoryManager  { private static factories: Map<string, Factory<any>> = new Map();

  /**
 * 注册工厂
 */
static register<T>(name: string, factory: Factory<T>): void  {
    logger.debug('工厂管理器注册工厂', { name  });
    FactoryManager.factories.set(name, factory)
}

  /**
 * 获取工厂
 */
static get<T>(name: string): Factory<T> | undefined  { return FactoryManager.factories.get(name)
}
  /**
 * 注销工厂
 */
static unregister(name: string): boolean { if (FactoryManager.factories.has(name))  {
      logger.debug('工厂管理器注销工厂', { name  });
      FactoryManager.factories.delete(name);
      return true
}
    return false
}

  /**
 * 检查工厂是否存在
 */
static has(name: string): boolean  { return FactoryManager.factories.has(name)
}
  /**
 * 获取所有工厂名称
 */
static getFactoryNames(): string[]  { return Array.from(FactoryManager.factories.keys())
}
  /**
 * 清理所有工厂
 */
static clear(): void { logger.info('工厂管理器清理所有工厂',  {
      count: FactoryManager.factories.size 
});
    FactoryManager.factories.clear()
}

  /**
 * 获取工厂统计信息
 */
static getStats():  { totalFactories: number;
    factoryNames: string[]
} { return {
      totalFactories: FactoryManager.factories.size,
      factoryNames: Array.from(FactoryManager.factories.keys()) 
}
}
}