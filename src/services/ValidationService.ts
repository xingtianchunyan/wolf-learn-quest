/**
 * @fileoverview 验证服务
 * 专业化的数据验证服务，提供统一的验证逻辑和规则管理
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import  { validateValue  } from
  validateGroup,
  validateObject,
  VALIDATION_RULE_GROUPS,
  type ValidationRule,
  type ValidationResult,
  type ValidationContext  } from '@/config/validationRules';
import { formatError  } from '@/config/errorMessages';
import { EventEmitter  } from '@/patterns/observer/EventEmitter';
import { MemoryCache  } from '@/utils/common/cacheUtils';

/**
 * 验证配置接口
 */
export interface ValidationConfig  {
  /** 是否启用缓存 */
  enableCache: boolean;
  /** 缓存TTL（毫秒） */
  cacheTtl: number;
  /** 是否启用异步验证 */
  enableAsync: boolean;
  /** 异步验证超时时间 */
  asyncTimeout: number;
  /** 是否启用详细日志 */
  enableDetailedLogging: boolean;
  /** 最大验证深度 */
  maxValidationDepth: number
}

/**
 * 验证任务接口
 */
export interface ValidationTask  {
  /** 任务ID */
  id: string;
  /** 验证类型 */
  type: string;
  /** 验证数据 */
  data: any;
  /** 验证规则 */
  rules: ValidationRule[];
  /** 验证上下文 */
  context?: ValidationContext;
  /** 创建时间 */
  createdAt: number;
  /** 状态 */
  status: 'pending' | 'running' | 'completed' | 'failed';
  /** 结果 */
  result?: ValidationResult;
  /** 错误信息 */
  error?: string
}

/**
 * 批量验证结果接口
 */
export interface BatchValidationResult  {
  /** 总数 */
  total: number;
  /** 成功数 */
  success: number;
  /** 失败数 */
  failed: number;
  /** 详细结果 */
results: Array< {
    id: string;
    success: boolean;
    result: ValidationResult;
    error?: string
}>;
  /** 执行时间 */
  duration: number
}

/**
 * 验证统计接口
 */
export interface ValidationStats  {
  /** 总验证次数 */
  totalValidations: number;
  /** 成功次数 */
  successCount: number;
  /** 失败次数 */
  failureCount: number;
  /** 平均执行时间 */
  averageExecutionTime: number;
  /** 缓存命中率 */
  cacheHitRate: number;
  /** 按类型统计 */
  byType: Record<
    string,
    {
      count: number;
      successRate: number;
      averageTime: number
}
  >
}

/**
 * 自定义验证器接口
 */
export interface CustomValidator  {
  /** 验证器名称 */
  name: string;
  /** 验证函数 */
  validate: (
    value: any,
    context?: ValidationContext
  ) => ValidationResult | Promise<ValidationResult>;
  /** 验证器描述 */
  description?: string;
  /** 是否异步 */
  isAsync?: boolean
}

/**
 * 验证服务类
 */
export class ValidationService  { private static instance: ValidationService;
  private eventEmitter: EventEmitter;
  private config: ValidationConfig;
  private validationCache: MemoryCache<ValidationResult>;
  private customValidators: Map<string, CustomValidator>;
  private validationTasks: Map<string, ValidationTask>;
  private stats: ValidationStats;

  /**
 * 构造函数
 */
private constructor()  {
    this.eventEmitter = new EventEmitter();
    this.config = {
      enableCache: true,
      cacheTtl: 300000, // 5分钟
      enableAsync: true,
      asyncTimeout: 10000, // 10秒
      enableDetailedLogging: false,
      maxValidationDepth: 10  
};

    this.validationCache = new MemoryCache<ValidationResult>({
      maxSize: 1000,
      ttl: this.config.cacheTtl 
});

    this.customValidators = new Map();
    this.validationTasks = new Map();

    this.stats = {
      totalValidations: 0,
      successCount: 0,
      failureCount: 0,
      averageExecutionTime: 0,
      cacheHitRate: 0,
      byType: {
} };

    this.initializeBuiltinValidators()
}

  /**
 * 获取单例实例
 */
public static getInstance(): ValidationService  {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService()
}
    return ValidationService.instance
}

  /**
 * 初始化内置验证器
 */
private initializeBuiltinValidators(): void  {
    // 游戏数据验证器
    this.registerValidator({
      name: 'gameData',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(value, VALIDATION_RULE_GROUPS.GAME_DATA, context)
},
      description: '游戏数据验证器' 
});

    // 用户数据验证器
    this.registerValidator({
      name: 'userData',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(value, VALIDATION_RULE_GROUPS.USER_DATA, context)
},
      description: '用户数据验证器' 
});

    // 技能使用验证器
    this.registerValidator({
      name: 'skillUse',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(value, VALIDATION_RULE_GROUPS.SKILL_USE, context)
},
      description: '技能使用验证器' 
});

    // 投票数据验证器
    this.registerValidator({
      name: 'voteData',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(value, VALIDATION_RULE_GROUPS.VOTE_DATA, context)
},
      description: '投票数据验证器' 
});

    // 聊天消息验证器
    this.registerValidator({
      name: 'chatMessage',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(
          value,
          VALIDATION_RULE_GROUPS.CHAT_MESSAGE,
          context
        )
},
      description: '聊天消息验证器' 
});

    // 玩家状态验证器
    this.registerValidator({
      name: 'playerState',
      validate: (value: any, context?: ValidationContext) => {
  return validateValue(
          value,
          VALIDATION_RULE_GROUPS.PLAYER_STATE,
          context
        )
},
      description: '玩家状态验证器' 
})

}

  /**
   * 注册自定义验证器
   * @param validator - 自定义验证器
   */
public registerValidator(validator: CustomValidator): void  {
    this.customValidators.set(validator.name, validator);

    this.eventEmitter.emit('validatorRegistered', {
      name: validator.name,
      description: validator.description,
      isAsync: validator.isAsync,
      timestamp: Date.now() 
})
}

  /**
   * 注销验证器
   * @param name - 验证器名称
   */
public unregisterValidator(name: string): boolean  {
    const removed = this.customValidators.delete(name);

    if (removed) {
      this.eventEmitter.emit('validatorUnregistered', {
        name,
        timestamp: Date.now() 
})
}

    return removed
}

  /**
   * 获取验证器
   * @param name - 验证器名称
   * @returns 验证器
   */
public getValidator(name: string): CustomValidator | undefined  {
    return this.customValidators.get(name)
}

  /**
   * 获取所有验证器
   * @returns 验证器列表
   */
public getAllValidators(): CustomValidator[]  {
    return Array.from(this.customValidators.values())
}

  /**
   * 验证数据
   * @param data - 要验证的数据
   * @param validatorName - 验证器名称
   * @param context - 验证上下文
   * @returns 验证结果
   */
  public async validate(
    data: any,
    validatorName: string,
    context?: ValidationContext
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      // 检查缓存
      if (this.config.enableCache) {
        const cacheKey = this.generateCacheKey(data, validatorName, context);
        const cachedResult = this.validationCache.get(cacheKey);

        if (cachedResult) {
          this.updateStats('cache_hit', validatorName, Date.now() - startTime);
          return cachedResult
}
      }

      // 获取验证器
      const validator = this.customValidators.get(validatorName);
      if (!validator) {
        throw new Error(
          formatError('VALIDATION_002', { validatorName }).message
        )
}

      // 执行验证
      let result: ValidationResult;

      if (validator.isAsync && this.config.enableAsync) {
        result = await this.executeAsyncValidation(validator, data, context)
} else {
        result = await validator.validate(data, context)
}

      // 缓存结果
      if (this.config.enableCache && result.isValid) {
        const cacheKey = this.generateCacheKey(data, validatorName, context);
        this.validationCache.set(cacheKey, result)
}

      // 更新统计
      this.updateStats(
        result.isValid ? 'success' : 'failure',
        validatorName,
        Date.now() - startTime
      );

      // 发送事件
      this.eventEmitter.emit('validationCompleted', {
        validatorName,
        result,
        duration: Date.now() - startTime,
        timestamp: Date.now() 
});

      return result
} catch (error) { const errorResult: ValidationResult = {
        isValid: false,
        errors: [error instanceof Error ? error.message : String(error)],
        warnings: [],
        data: null  
};

      this.updateStats('failure', validatorName, Date.now() - startTime);

      this.eventEmitter.emit('validationFailed', {
        validatorName,
        error,
        duration: Date.now() - startTime,
        timestamp: Date.now() 
});

      return errorResult
}
  }

  /**
   * 批量验证
   * @param items - 验证项目列表
   * @returns 批量验证结果
   */
  public async validateBatch(
    items: Array<{
      id: string;
      data: any;
      validatorName: string;
      context?: ValidationContext
}>
  ): Promise<BatchValidationResult> {
    const startTime = Date.now();
    const results: BatchValidationResult['results'] = [];

    let successCount = 0;
    let failedCount = 0;

    // 并行执行验证
    const validationPromises = items.map(async item => {
      try {
        const result = await this.validate(
          item.data,
          item.validatorName,
          item.context
        );

        if (result.isValid) {
          successCount++
} else {
          failedCount++
}

        return {
          id: item.id,
          success: result.isValid,
          result,
          error: result.isValid ? undefined : result.errors.join(', ') }
} catch (error) {
        failedCount++;
        return {
          id: item.id,
          success: false,
          result: {
            isValid: false,
            errors: [error instanceof Error ? error.message : String(error)],
            warnings: [],
            data: null 
},
          error: error instanceof Error ? error.message : String(error) 
}
}
    });

    const resolvedResults = await Promise.all(validationPromises);
    results.push(...resolvedResults);

    const batchResult: BatchValidationResult = { total: items.length,
      success: successCount,
      failed: failedCount,
      results,
      duration: Date.now() - startTime  
};

    this.eventEmitter.emit('batchValidationCompleted', {
      batchResult,
      timestamp: Date.now() 
});

    return batchResult
}

  /**
   * 创建验证任务
   * @param type - 验证类型
   * @param data - 验证数据
   * @param rules - 验证规则
   * @param context - 验证上下文
   * @returns 任务ID
   */
  public createValidationTask(
    type: string,
    data: any,
    rules: ValidationRule[],
    context?: ValidationContext
  ): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const task: ValidationTask = { id: taskId,
      type,
      data,
      rules,
      context,
      createdAt: Date.now(),
      status: 'pending'  
};

    this.validationTasks.set(taskId, task);

    this.eventEmitter.emit('validationTaskCreated', {
      taskId,
      type,
      timestamp: Date.now() 
});

    return taskId
}

  /**
   * 执行验证任务
   * @param taskId - 任务ID
   * @returns 验证结果
   */
  public async executeValidationTask(
    taskId: string
  ): Promise<ValidationResult> {
    const task = this.validationTasks.get(taskId);

    if (!task) {
      throw new Error(formatError('VALIDATION_003', { taskId }).message)
}

    if (task.status !== 'pending') {
      throw new Error(
        formatError('VALIDATION_004', { taskId, status: task.status 
}).message
      )
}

    try {
      task.status = 'running';

      const result = validateGroup(task.data, task.rules, task.context);

      task.status = 'completed';
      task.result = result;

      this.eventEmitter.emit('validationTaskCompleted', {
        taskId,
        result,
        timestamp: Date.now() 
});

      return result
} catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);

      this.eventEmitter.emit('validationTaskFailed', {
        taskId,
        error: task.error,
        timestamp: Date.now() 
});

      throw error
}
  }

  /**
   * 获取验证任务
   * @param taskId - 任务ID
   * @returns 验证任务
   */
public getValidationTask(taskId: string): ValidationTask | undefined  {
    return this.validationTasks.get(taskId)
}

  /**
   * 获取所有验证任务
   * @param status - 状态过滤
   * @returns 验证任务列表
   */
  public getAllValidationTasks(
    status?: ValidationTask['status']
  ): ValidationTask[] {
    const tasks = Array.from(this.validationTasks.values());

    if (status) {
      return tasks.filter(task => task.status === status)
}

    return tasks
}

  /**
   * 删除验证任务
   * @param taskId - 任务ID
   * @returns 是否删除成功
   */
public deleteValidationTask(taskId: string): boolean  {
    const removed = this.validationTasks.delete(taskId);

    if (removed) {
      this.eventEmitter.emit('validationTaskDeleted', {
        taskId,
        timestamp: Date.now() 
})
}

    return removed
}

  /**
   * 验证对象
   * @param obj - 要验证的对象
   * @param schema - 验证模式
   * @param context - 验证上下文
   * @returns 验证结果
   */
  public async validateObject(
    obj: Record<string, any>,
    schema: Record<string, ValidationRule[]>,
    context?: ValidationContext
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const result = validateObject(obj, schema, context);

      this.updateStats(
        result.isValid ? 'success' : 'failure',
        'object',
        Date.now() - startTime
      );

      return result
} catch (error) {
      this.updateStats('failure', 'object', Date.now() - startTime);
      throw error
}
  }

  /**
   * 验证表单数据
   * @param formData - 表单数据
   * @param validatorName - 验证器名称
   * @param context - 验证上下文
   * @returns 验证结果
   */
  public async validateForm(
    formData: Record<string, any>,
    validatorName: string,
    context?: ValidationContext
  ): Promise<ValidationResult> { // 添加表单特定的上下文
    const formContext: ValidationContext = {
      ...context,
      formData: true,
      fieldCount: Object.keys(formData).length  
};

    return this.validate(formData, validatorName, formContext)
}

  /**
   * 验证API请求
   * @param requestData - 请求数据
   * @param endpoint - API端点
   * @param method - HTTP方法
   * @returns 验证结果
   */
  public async validateApiRequest(
    requestData: any,
    endpoint: string,
    method: string
  ): Promise<ValidationResult> { const context: ValidationContext = {
      apiRequest: true,
      endpoint,
      method,
      timestamp: Date.now()  
};

    // 根据端点选择验证器
    let validatorName = 'userData'; // 默认验证器

    if (endpoint.includes('/game/')) {
      validatorName = 'gameData'
} else if (endpoint.includes('/skill/')) {
      validatorName = 'skillUse'
} else if (endpoint.includes('/vote/')) {
      validatorName = 'voteData'
} else if (endpoint.includes('/chat/')) {
      validatorName = 'chatMessage'
}

    return this.validate(requestData, validatorName, context)
}

  /**
   * 执行异步验证
   * @param validator - 验证器
   * @param data - 验证数据
   * @param context - 验证上下文
   * @returns 验证结果
   */
  private async executeAsyncValidation(
    validator: CustomValidator,
    data: any,
    context?: ValidationContext
  ): Promise<ValidationResult> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
  reject(new Error('验证超时'))

}, this.config.asyncTimeout);

      Promise.resolve(validator.validate(data, context))
        .then(result => {
  clearTimeout(timeout);
          resolve(result)

})
        .catch(error => {
  clearTimeout(timeout);
          reject(error)
})
})

}

  /**
   * 生成缓存键
   * @param data - 数据
   * @param validatorName - 验证器名称
   * @param context - 上下文
   * @returns 缓存键
   */
  private generateCacheKey(
    data: any,
    validatorName: string,
    context?: ValidationContext
  ): string {
    const dataHash = this.hashObject(data);
    const contextHash = context ? this.hashObject(context) : '';
    return `${validatorName}_${dataHash}_${contextHash}`
}

  /**
   * 对象哈希
   * @param obj - 对象
   * @returns 哈希值
   */
private hashObject(obj: any): string  {
    const str = JSON.stringify(obj, Object.keys(obj).sort());
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 转换为32位整数
    }

    return hash.toString(36)
}

  /**
   * 更新统计信息
   * @param type - 统计类型
   * @param validatorName - 验证器名称
   * @param duration - 执行时间
   */
  private updateStats(
    type: 'success' | 'failure' | 'cache_hit',
    validatorName: string,
    duration: number
  ): void {
    this.stats.totalValidations++;

    if (type === 'success') {
      this.stats.successCount++
} else if (type === 'failure') {
      this.stats.failureCount++
}

    // 更新平均执行时间
    const totalTime =
      this.stats.averageExecutionTime * (this.stats.totalValidations - 1) +
      duration;
    this.stats.averageExecutionTime = totalTime / this.stats.totalValidations;

    // 更新缓存命中率
    if (type === 'cache_hit') {
      const cacheHits =
        this.stats.totalValidations * this.stats.cacheHitRate + 1;
      this.stats.cacheHitRate = cacheHits / this.stats.totalValidations
}

    // 更新按类型统计
    if (!this.stats.byType[validatorName]) {
      this.stats.byType[validatorName] = {
        count: 0,
        successRate: 0,
        averageTime: 0 
}
}

    const typeStats = this.stats.byType[validatorName];
    typeStats.count++;

    if (type === 'success') {
      typeStats.successRate =
        (typeStats.successRate * (typeStats.count - 1) + 1) / typeStats.count
} else if (type === 'failure') {
      typeStats.successRate =
        (typeStats.successRate * (typeStats.count - 1)) / typeStats.count
}

    const typeTotalTime =
      typeStats.averageTime * (typeStats.count - 1) + duration;
    typeStats.averageTime = typeTotalTime / typeStats.count
}

  /**
   * 获取验证统计
   * @returns 验证统计
   */
public getValidationStats(): ValidationStats  {
    return { ...this.stats }
}

  /**
 * 重置统计信息
 */
public resetStats(): void  {
    this.stats = {
      totalValidations: 0,
      successCount: 0,
      failureCount: 0,
      averageExecutionTime: 0,
      cacheHitRate: 0,
      byType: {
} };

    this.eventEmitter.emit('statsReset', {
      timestamp: Date.now() 
})
}

  /**
   * 更新配置
   * @param newConfig - 新配置
   */
public updateConfig(newConfig: Partial<ValidationConfig>): void { this.config =  { ...this.config, ...newConfig  };

    // 更新缓存TTL
    if (newConfig.cacheTtl) {
      this.validationCache = new MemoryCache<ValidationResult>({
        maxSize: 1000,
        ttl: newConfig.cacheTtl 
})
}

    this.eventEmitter.emit('configUpdated', {
      config: this.config,
      timestamp: Date.now() 
})
}

  /**
   * 获取配置
   * @returns 当前配置
   */
public getConfig(): ValidationConfig  {
    return { ...this.config }
}

  /**
 * 清理过期数据
 */
public cleanup(): void  {
    // 清理过期任务
    const now = Date.now();
    const expireTime = 24 * 60 * 60 * 1000; // 24小时

    for (const [taskId, task] of this.validationTasks.entries()) {
      if (now - task.createdAt > expireTime) {
        this.validationTasks.delete(taskId)
}
    }

    // 清理缓存
    this.validationCache.clear();

    this.eventEmitter.emit('cleanupCompleted', {
      timestamp: Date.now() 
})
}

  /**
   * 监听事件
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public on(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.on(event, listener)
}

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public off(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.off(event, listener)
}
}

/**
 * 验证服务单例实例
 */
export const validationService = ValidationService.getInstance();
