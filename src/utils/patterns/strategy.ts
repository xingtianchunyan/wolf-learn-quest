import { createLogger   } from '@/lib/logger';

/**
* 策略模式实现
* 提供策略模式的基础类和工具函数，用于算法的动态选择和切换
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('strategy-pattern');

/**
* 策略接口
* 定义策略的基本契约
 */
export interface Strategy<TInput = any, TOutput = any>  { execute(input: TInput): TOutput | Promise<TOutput>;
  getName?(): string;
  getDescription?(): string
}

/**
 * 异步策略接口
 */
export interface AsyncStrategy<TInput = any, TOutput = any>  { execute(input: TInput): Promise<TOutput>;
  getName?(): string;
  getDescription?(): string
}

/**
* 策略上下文
* 管理策略的执行环境
 */
export class StrategyContext<TInput = any, TOutput = any>  { private strategy: Strategy<TInput, TOutput> | null = null;
  private strategies: Map<string, Strategy<TInput, TOutput>> = new Map();

  /**
  * 注册策略
  *
  * @param name - 策略名称
  * @param strategy - 策略实例
   */
registerStrategy(name: string, strategy: Strategy<TInput, TOutput>): void  {
    logger.debug('策略上下文注册策略', {
      name,
      strategyName: strategy.getName?.() || 'unnamed' 
});
    this.strategies.set(name, strategy)
}

  /**
  * 注销策略
  *
  * @param name - 策略名称
   */
unregisterStrategy(name: string): boolean { if (this.strategies.has(name))  {
      logger.debug('策略上下文注销策略', { name  });
      this.strategies.delete(name);

      // 如果当前策略被注销，清空当前策略
      if (this.strategy === this.strategies.get(name)) { this.strategy = null
}

      return true
}
    return false
}

  /**
  * 设置当前策略
  *
  * @param name - 策略名称
   */
setStrategy(name: string): void  { const strategy = this.strategies.get(name);
    if (!strategy) {
      const error = new Error(`未找到策略: ${name 
}`);
      logger.error('策略上下文设置策略失败', { name,
        availableStrategies: this.getStrategyNames() 
});
      throw error
}

    logger.debug('策略上下文设置策略', { name,
      strategyName: strategy.getName?.() || 'unnamed' 
});
    this.strategy = strategy
}

  /**
  * 直接设置策略实例
  *
  * @param strategy - 策略实例
   */
setStrategyInstance(strategy: Strategy<TInput, TOutput>): void { logger.debug('策略上下文设置策略实例',  {
      strategyName: strategy.getName?.() || 'unnamed' 
});
    this.strategy = strategy
}

  /**
 * 获取当前策略
 */
getCurrentStrategy(): Strategy<TInput, TOutput> | null  { return this.strategy
}
  /**
  * 获取策略
  *
  * @param name - 策略名称
   */
getStrategy(name: string): Strategy<TInput, TOutput> | undefined  { return this.strategies.get(name)
}

  /**
  * 检查策略是否存在
  *
  * @param name - 策略名称
   */
hasStrategy(name: string): boolean  { return this.strategies.has(name)
}

  /**
 * 获取所有策略名称
 */
getStrategyNames(): string[]  { return Array.from(this.strategies.keys())
}
  /**
  * 执行当前策略
  *
  * @param input - 输入参数
   */
execute(input: TInput): TOutput | Promise<TOutput> { if (!this.strategy)  {
      const error = new Error('未设置策略');
      logger.error('策略上下文执行失败', {
        availableStrategies: this.getStrategyNames() 
});
      throw error
}

    try { logger.debug('策略上下文执行策略', {
        strategyName: this.strategy.getName?.() || 'unnamed' 
});
      return this.strategy.execute(input)
} catch (error) { logger.error('策略执行失败', {
        strategyName: this.strategy.getName?.() || 'unnamed',
        error });
      throw error
}
  }

  /**
  * 执行指定策略
  *
  * @param name - 策略名称
  * @param input - 输入参数
   */
executeStrategy(name: string, input: TInput): TOutput | Promise<TOutput>  { const strategy = this.strategies.get(name);
    if (!strategy) {
      const error = new Error(`未找到策略: ${name 
}`);
      logger.error('策略上下文执行指定策略失败', { name,
        availableStrategies: this.getStrategyNames() 
});
      throw error
}

    try { logger.debug('策略上下文执行指定策略', {
        name,
        strategyName: strategy.getName?.() || 'unnamed' 
});
      return strategy.execute(input)
} catch (error) { logger.error('指定策略执行失败', { name, error  });
      throw error
}
  }

  /**
  * 批量执行策略
  *
  * @param strategyNames - 策略名称数组
  * @param input - 输入参数
   */
  async executeBatch(
    strategyNames: string[],
    input: TInput
  ): Promise<Array<{ name: string; result: TOutput; error?: Error  
}>> { logger.debug('策略上下文批量执行策略', {
      strategies: strategyNames 
});

    const results = await Promise.allSettled(;
      strategyNames.map(async name => { const strategy = this.strategies.get(name);
        if (!strategy) {
          throw new Error(`未找到策略: ${name 
}`)
}
        const result = await strategy.execute(input);
        return { name, result  }
})
    );

    return results.map((result, index) => { const name = strategyNames[index];
      if (result.status === 'fulfilled') {
        return result.value
} else { return { name, result: undefined as any, error: result.reason  
}
}
    })
}

  /**
 * 清理所有策略
 */
clear(): void { logger.info('策略上下文清理所有策略',  {
      count: this.strategies.size 
});
    this.strategies.clear();
    this.strategy = null
}

  /**
 * 获取策略统计信息
 */
getStats():  { totalStrategies: number;
    currentStrategy: string | null;
    strategyNames: string[]
} { return {
      totalStrategies: this.strategies.size,
      currentStrategy: this.strategy?.getName?.() || null,
      strategyNames: this.getStrategyNames() 
}
}
}

/**
* 条件策略选择器
* 根据条件自动选择策略
 */
export class ConditionalStrategySelector<TInput = any, TOutput = any> { private conditions: Array< {
    name: string;
    condition: (input: TInput) => boolean;
    strategy: Strategy<TInput, TOutput>
}> = [];

  /**
  * 添加条件策略
  *
  * @param name - 条件名称
  * @param condition - 条件函数
  * @param strategy - 策略实例
   */
  addCondition(name: string,
    condition: (input: TInput) => boolean,
    strategy: Strategy<TInput, TOutput>
  ): this { logger.debug('条件策略选择器添加条件', {
      name,
      strategyName: strategy.getName?.() || 'unnamed' 
});
    this.conditions.push({ name, condition, strategy  });
    return this
}

  /**
  * 移除条件策略
  *
  * @param name - 条件名称
   */
removeCondition(name: string): boolean  { const index = this.conditions.findIndex(c => c.name === name);
    if (index !== -1) {
      logger.debug('条件策略选择器移除条件', { name  });
      this.conditions.splice(index, 1);
      return true
}
    return false
}

  /**
  * 选择策略
  *
  * @param input - 输入参数
   */
selectStrategy(input: TInput): Strategy<TInput, TOutput> | null { for (const { name, condition, strategy  } of this.conditions) { if (condition(input))  {
        logger.debug('条件策略选择器匹配条件', {
          name,
          strategyName: strategy.getName?.() || 'unnamed' 
});
        return strategy
}
    }

    logger.warn('条件策略选择器未找到匹配条件', { conditionCount: this.conditions.length 
});
    return null
}

  /**
  * 执行条件策略
  *
  * @param input - 输入参数
   */
execute(input: TInput): TOutput | Promise<TOutput>  { const strategy = this.selectStrategy(input);
    if (!strategy) {
      const error = new Error('没有匹配的条件策略');
      logger.error('条件策略选择器执行失败', {
        conditionCount: this.conditions.length 
});
      throw error
}

    return strategy.execute(input)
}

  /**
 * 获取所有条件名称
 */
getConditionNames(): string[]  { return this.conditions.map(c => c.name)
}
  /**
 * 清理所有条件
 */
clear(): void { logger.info('条件策略选择器清理所有条件',  {
      count: this.conditions.length 
});
    this.conditions = []
}
}

/**
* 策略链
* 按顺序执行多个策略
 */
export class StrategyChain<TInput = any, TOutput = any> { private strategies: Array< {
    name: string;
    strategy: Strategy<TInput, TOutput>;
    condition?: (input: TInput, previousResult?: TOutput) => boolean
}> = [];

  /**
  * 添加策略到链中
  *
  * @param name - 策略名称
  * @param strategy - 策略实例
  * @param condition - 执行条件（可选）
   */
  addStrategy(name: string,
    strategy: Strategy<TInput, TOutput>,
    condition?: (input: TInput, previousResult?: TOutput) => boolean;
  ): this { logger.debug('策略链添加策略', {
      name,
      strategyName: strategy.getName?.() || 'unnamed',
      hasCondition: !!condition 
});
    this.strategies.push({ name, strategy, condition  });
    return this
}

  /**
  * 移除策略
  *
  * @param name - 策略名称
   */
removeStrategy(name: string): boolean  { const index = this.strategies.findIndex(s => s.name === name);
    if (index !== -1) {
      logger.debug('策略链移除策略', { name  });
      this.strategies.splice(index, 1);
      return true
}
    return false
}

  /**
  * 执行策略链
  *
  * @param input - 输入参数
   */
async execute(input: TInput): Promise<TOutput[]> { logger.debug('策略链开始执行',  {
      strategyCount: this.strategies.length 
});

    const results: TOutput[] = [];
    let previousResult: TOutput | undefined;

    for (const { name, strategy, condition  } of this.strategies) { // 检查执行条件
      if (condition && !condition(input, previousResult)) {
        logger.debug('策略链跳过策略', {
          name,
          reason: 'condition not met' 
});
        continue
}

      try { logger.debug('策略链执行策略', {
          name,
          strategyName: strategy.getName?.() || 'unnamed' 
});

        const result = await strategy.execute(input);
        results.push(result);
        previousResult = result
} catch (error) { logger.error('策略链执行失败', { name, error  });
        throw error
}
    }

    logger.debug('策略链执行完成', { resultCount: results.length 
});
    return results
}

  /**
 * 获取策略名称列表
 */
getStrategyNames(): string[]  { return this.strategies.map(s => s.name)
}
  /**
 * 清理策略链
 */
clear(): void { logger.info('策略链清理所有策略',  {
      count: this.strategies.length 
});
    this.strategies = []
}
}

/**
* 策略装饰器
* 为类方法添加策略功能
*
* @param strategyName - 策略名称
 */
export function strategy(strategyName: string)  { return function(;
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      logger.debug('策略装饰器执行', {
        strategyName,
        method: propertyKey 
});
      return originalMethod.apply(this, args)
};

    // 添加策略信息
    if (!target.constructor._strategies) { target.constructor._strategies = new Map()
}
    target.constructor._strategies.set(strategyName, { method: propertyKey,
      originalMethod });

    return descriptor
}
}

/**
* React Hook：使用策略上下文
*
* @param initialStrategies - 初始策略
* @returns 策略上下文和相关操作函数
 */
export function useStrategyContext<TInput = any, TOutput = any>(;
  initialStrategies?: Record<string, Strategy<TInput, TOutput>>
): { context: StrategyContext<TInput, TOutput>;
  setStrategy: (name: string) => void;
  execute: (input: TInput) => TOutput | Promise<TOutput>;
  executeStrategy: (name: string, input: TInput) => TOutput | Promise<TOutput>;
  registerStrategy: (name: string, strategy: Strategy<TInput, TOutput>) => void;
  getStrategyNames: () => string[]
} { const [context] = React.useState(() => {
    const ctx = new StrategyContext<TInput, TOutput>();

    if (initialStrategies) {
      Object.entries(initialStrategies).forEach(([name, strategy]) => {
  ctx.registerStrategy(name, strategy)
})
}

    return ctx

});

  const setStrategy = React.useCallback((name: string) => {
  context.setStrategy(name)

}, [context]);

  const execute = React.useCallback((input: TInput) => {
  return context.execute(input)

}, [context]);

  const executeStrategy = React.useCallback((name: string, input: TInput) => {
  return context.executeStrategy(name, input)

}, [context]);

  const registerStrategy = React.useCallback((;
    name: string,
    strategy: Strategy<TInput, TOutput>
  ) => {
  context.registerStrategy(name, strategy)

}, [context]);

  const getStrategyNames = React.useCallback(() => {
  return context.getStrategyNames()

}, [context]);

  return { context,
    setStrategy,
    execute,
    executeStrategy,
    registerStrategy,
    getStrategyNames }
}

/**
* React Hook：使用条件策略选择器
*
* @returns 条件策略选择器和相关操作函数
 */
export function useConditionalStrategy<TInput = any, TOutput = any>():  { selector: ConditionalStrategySelector<TInput, TOutput>;
  addCondition: (name: string,
    condition: (input: TInput) => boolean,
    strategy: Strategy<TInput, TOutput>
  ) => void;
  execute: (input: TInput) => TOutput | Promise<TOutput>;
  selectStrategy: (input: TInput) => Strategy<TInput, TOutput> | null
} { const [selector] = React.useState(() => new ConditionalStrategySelector<TInput, TOutput>());

  const addCondition = React.useCallback((;
    name: string,
    condition: (input: TInput) => boolean,
    strategy: Strategy<TInput, TOutput>
  ) => {
  selector.addCondition(name, condition, strategy)

}, [selector]);

  const execute = React.useCallback((input: TInput) => {
  return selector.execute(input)

}, [selector]);

  const selectStrategy = React.useCallback((input: TInput) => {
  return selector.selectStrategy(input)

}, [selector]);

  return { selector,
    addCondition,
    execute,
    selectStrategy }
}

/**
* 策略管理器
* 全局策略管理
 */
export class StrategyManager  { private static contexts: Map<string, StrategyContext<any, any>> = new Map();

  /**
 * 注册策略上下文
 */
static registerContext<TInput = any, TOutput = any>(;
    name: string,
    context: StrategyContext<TInput, TOutput>
  ): void {
    logger.debug('策略管理器注册上下文', { name  });
    StrategyManager.contexts.set(name, context)
}

  /**
 * 获取策略上下文
 */
static getContext<TInput = any, TOutput = any>(;
    name: string
  ): StrategyContext<TInput, TOutput> | undefined { return StrategyManager.contexts.get(name)
}

  /**
 * 注销策略上下文
 */
static unregisterContext(name: string): boolean { if (StrategyManager.contexts.has(name))  {
      logger.debug('策略管理器注销上下文', { name  });
      StrategyManager.contexts.delete(name);
      return true
}
    return false
}

  /**
 * 获取所有上下文名称
 */
static getContextNames(): string[]  { return Array.from(StrategyManager.contexts.keys())
}
  /**
 * 清理所有上下文
 */
static clear(): void { logger.info('策略管理器清理所有上下文',  {
      count: StrategyManager.contexts.size 
});
    StrategyManager.contexts.clear()
}

  /**
 * 获取管理器统计信息
 */
static getStats():  { totalContexts: number;
    contextNames: string[]
} { return {
      totalContexts: StrategyManager.contexts.size,
      contextNames: Array.from(StrategyManager.contexts.keys()) 
}
}
}