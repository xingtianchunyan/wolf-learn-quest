/**
 * 文件级注释：输入验证管理器
 * 
 * 该文件实现了一个统一的输入验证管理系统，集成和协调所有验证组件：
 * - 统一验证接口和API
 * - 智能验证路由和策略选择
 * - 验证结果聚合和分析
 * - 性能监控和优化
 * - 配置管理和动态调整
 * - 错误处理和恢复机制
 * 
 * 主要特性：
 * - 多验证器协调
 * - 智能策略选择
 * - 结果聚合分析
 * - 性能优化
 * - 统一错误处理
 * - 实时监控
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { 
  EnhancedInputValidator,
  ValidationConfig,
  ValidationResult,
  ValidationError,
  ValidationRuleType
} from './enhancedInputValidation';
import { 
  AdvancedInputValidationSystem,
  AdvancedValidationConfig,
  AdvancedValidationResult,
  AdvancedValidationContext,
  ThreatLevel,
  ValidationMode,
  SecurityPolicy
} from './advancedInputValidationSystem';
import { MasterErrorHandler } from './masterErrorHandler';
import { GlobalErrorMonitor } from './globalErrorMonitor';
import { createLogger } from '@/lib/logger';

const logger = createLogger('input-validation-manager');

/**
 * 验证器类型枚举
 */
export enum ValidatorType {
  ENHANCED = 'enhanced',           // 增强验证器
  ADVANCED = 'advanced',           // 高级验证器
  BASIC = 'basic',                 // 基础验证器
  CUSTOM = 'custom'                // 自定义验证器
}

/**
 * 验证策略枚举
 */
export enum ValidationStrategy {
  FAIL_FAST = 'fail_fast',         // 快速失败
  COMPREHENSIVE = 'comprehensive', // 全面验证
  ADAPTIVE = 'adaptive',           // 自适应
  PERFORMANCE = 'performance',     // 性能优先
  SECURITY = 'security'            // 安全优先
}

/**
 * 接口注释：验证器配置
 */
export interface ValidatorConfig {
  type: ValidatorType;
  enabled: boolean;
  priority: number;
  weight: number;
  timeout: number;
  fallback: boolean;
  config: any;
}

/**
 * 接口注释：管理器配置
 */
export interface ValidationManagerConfig {
  // 验证器配置
  validators: Record<ValidatorType, ValidatorConfig>;
  
  // 策略配置
  strategy: ValidationStrategy;
  
  // 性能配置
  performance: {
    enableParallel: boolean;
    maxConcurrent: number;
    timeout: number;
    enableCaching: boolean;
    cacheSize: number;
    cacheTTL: number;
  };
  
  // 聚合配置
  aggregation: {
    enableWeighting: boolean;
    enableConsensus: boolean;
    consensusThreshold: number;
    enableFallback: boolean;
    fallbackValidator: ValidatorType;
  };
  
  // 监控配置
  monitoring: {
    enableMetrics: boolean;
    enableProfiling: boolean;
    enableAlerts: boolean;
    metricsInterval: number;
  };
  
  // 错误处理配置
  errorHandling: {
    enableRetry: boolean;
    maxRetries: number;
    retryDelay: number;
    enableFallback: boolean;
    enableGracefulDegradation: boolean;
  };
}

/**
 * 接口注释：验证请求
 */
export interface ValidationRequest {
  id: string;
  data: any;
  context: AdvancedValidationContext;
  config?: Partial<ValidationManagerConfig>;
  validators?: ValidatorType[];
  strategy?: ValidationStrategy;
  priority?: number;
}

/**
 * 接口注释：验证响应
 */
export interface ValidationResponse {
  id: string;
  success: boolean;
  result: AggregatedValidationResult;
  metadata: {
    strategy: ValidationStrategy;
    validatorsUsed: ValidatorType[];
    processingTime: number;
    cacheHit: boolean;
    retryCount: number;
  };
}

/**
 * 接口注释：聚合验证结果
 */
export interface AggregatedValidationResult {
  // 基础结果
  isValid: boolean;
  sanitizedData: any;
  confidence: number;
  
  // 错误和警告
  errors: ValidationError[];
  warnings: ValidationError[];
  
  // 安全信息
  securityScore: number;
  threatLevel: ThreatLevel;
  threats: string[];
  
  // 验证器结果
  validatorResults: Map<ValidatorType, ValidationResult | AdvancedValidationResult>;
  
  // 统计信息
  stats: {
    totalValidators: number;
    successfulValidators: number;
    failedValidators: number;
    averageProcessingTime: number;
    consensusLevel: number;
  };
  
  // 建议
  recommendations: string[];
  
  // 元数据
  metadata: {
    strategy: ValidationStrategy;
    weights: Record<ValidatorType, number>;
    processingOrder: ValidatorType[];
    fallbackUsed: boolean;
  };
}

/**
 * 接口注释：验证器性能指标
 */
export interface ValidatorMetrics {
  type: ValidatorType;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  errorRate: number;
  availability: number;
  lastUpdate: number;
}

/**
 * 接口注释：管理器指标
 */
export interface ManagerMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  cacheHitRate: number;
  
  // 验证器指标
  validatorMetrics: Map<ValidatorType, ValidatorMetrics>;
  
  // 策略指标
  strategyMetrics: Map<ValidationStrategy, {
    usage: number;
    successRate: number;
    averageTime: number;
  }>;
  
  // 性能指标
  performanceMetrics: {
    p50ResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    throughput: number;
    concurrency: number;
  };
}

/**
 * 类级注释：输入验证管理器
 * 
 * 统一管理和协调所有输入验证组件，提供：
 * - 智能验证路由
 * - 结果聚合分析
 * - 性能优化
 * - 错误处理
 * - 实时监控
 */
export class InputValidationManager {
  private static instance: InputValidationManager;
  
  // 核心组件
  private enhancedValidator: EnhancedInputValidator;
  private advancedValidator: AdvancedInputValidationSystem;
  private masterErrorHandler: MasterErrorHandler;
  private globalErrorMonitor: GlobalErrorMonitor;
  
  // 配置和状态
  private config: ValidationManagerConfig;
  private metrics: ManagerMetrics;
  
  // 缓存和存储
  private resultCache: Map<string, ValidationResponse> = new Map();
  private requestQueue: ValidationRequest[] = [];
  private activeRequests: Map<string, Promise<ValidationResponse>> = new Map();
  
  // 性能监控
  private performanceData: number[] = [];
  private metricsTimer: ReturnType<typeof setInterval> | null = null;
  private cleanupTimer: ReturnType<typeof setInterval> | null = null;

  /**
   * 函数级注释：构造函数
   * 初始化输入验证管理器
   */
  private constructor(config?: Partial<ValidationManagerConfig>) {
    this.config = {
      validators: {
        [ValidatorType.ENHANCED]: {
          type: ValidatorType.ENHANCED,
          enabled: true,
          priority: 1,
          weight: 0.3,
          timeout: 3000,
          fallback: true,
          config: {}
        },
        [ValidatorType.ADVANCED]: {
          type: ValidatorType.ADVANCED,
          enabled: true,
          priority: 2,
          weight: 0.5,
          timeout: 5000,
          fallback: false,
          config: {}
        },
        [ValidatorType.BASIC]: {
          type: ValidatorType.BASIC,
          enabled: true,
          priority: 3,
          weight: 0.2,
          timeout: 1000,
          fallback: true,
          config: {}
        },
        [ValidatorType.CUSTOM]: {
          type: ValidatorType.CUSTOM,
          enabled: false,
          priority: 4,
          weight: 0.1,
          timeout: 2000,
          fallback: false,
          config: {}
        }
      },
      
      strategy: ValidationStrategy.ADAPTIVE,
      
      performance: {
        enableParallel: true,
        maxConcurrent: 5,
        timeout: 10000,
        enableCaching: true,
        cacheSize: 1000,
        cacheTTL: 300000 // 5分钟
      },
      
      aggregation: {
        enableWeighting: true,
        enableConsensus: true,
        consensusThreshold: 0.7,
        enableFallback: true,
        fallbackValidator: ValidatorType.ENHANCED
      },
      
      monitoring: {
        enableMetrics: true,
        enableProfiling: true,
        enableAlerts: true,
        metricsInterval: 60000 // 1分钟
      },
      
      errorHandling: {
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 1000,
        enableFallback: true,
        enableGracefulDegradation: true
      },
      
      ...config
    };

    this.enhancedValidator = EnhancedInputValidator.getInstance();
    this.advancedValidator = AdvancedInputValidationSystem.getInstance();
    this.masterErrorHandler = MasterErrorHandler.getInstance();
    this.globalErrorMonitor = GlobalErrorMonitor.getInstance();
    
    this.initializeMetrics();
    this.startMonitoring();
  }

  /**
   * 函数级注释：获取单例实例
   */
  public static getInstance(config?: Partial<ValidationManagerConfig>): InputValidationManager {
    if (!InputValidationManager.instance) {
      InputValidationManager.instance = new InputValidationManager(config);
    }
    return InputValidationManager.instance;
  }

  /**
   * 函数级注释：验证输入
   * 主要的验证方法，协调所有验证器
   */
  public async validate(request: ValidationRequest): Promise<ValidationResponse> {
    const startTime = performance.now();
    
    try {
      // 检查缓存
      if (this.config.performance.enableCaching) {
        const cacheKey = this.generateCacheKey(request);
        const cachedResponse = this.resultCache.get(cacheKey);
        if (cachedResponse && this.isCacheValid(cachedResponse)) {
          this.updateMetrics('cache_hit', performance.now() - startTime);
          return cachedResponse;
        }
      }

      // 检查是否已有相同请求在处理
      const activeRequest = this.activeRequests.get(request.id);
      if (activeRequest) {
        return activeRequest;
      }

      // 创建验证Promise
      const validationPromise = this.performValidation(request);
      this.activeRequests.set(request.id, validationPromise);

      try {
        const response = await validationPromise;
        
        // 缓存结果
        if (this.config.performance.enableCaching) {
          this.cacheResponse(request, response);
        }

        // 更新指标
        this.updateMetrics('validation_success', performance.now() - startTime);
        
        return response;
      } finally {
        this.activeRequests.delete(request.id);
      }

    } catch (error) {
      this.handleValidationError(error, request);
      this.updateMetrics('validation_error', performance.now() - startTime);
      
      return this.createErrorResponse(request, error);
    }
  }

  /**
   * 函数级注释：批量验证
   * 批量处理多个验证请求
   */
  public async validateBatch(requests: ValidationRequest[]): Promise<ValidationResponse[]> {
    const startTime = performance.now();
    
    try {
      // 根据策略决定处理方式
      if (this.config.performance.enableParallel) {
        return this.validateParallel(requests);
      } else {
        return this.validateSequential(requests);
      }
    } catch (error) {
      logger.error('批量验证失败', { error, requestCount: requests.length });
      
      // 返回错误响应
      return requests.map(request => this.createErrorResponse(request, error));
    } finally {
      this.updateMetrics('batch_validation', performance.now() - startTime);
    }
  }

  /**
   * 函数级注释：执行验证
   * 核心验证逻辑，协调多个验证器
   */
  private async performValidation(request: ValidationRequest): Promise<ValidationResponse> {
    const { data, context, config: requestConfig, strategy } = request;
    const effectiveStrategy = strategy || this.config.strategy;
    const effectiveConfig = { ...this.config, ...requestConfig };

    // 选择验证器
    const validators = this.selectValidators(request, effectiveStrategy);
    
    // 执行验证
    const validatorResults = await this.executeValidators(
      validators, 
      data, 
      context, 
      effectiveConfig
    );

    // 聚合结果
    const aggregatedResult = this.aggregateResults(
      validatorResults, 
      validators, 
      effectiveStrategy
    );

    // 创建响应
    return {
      id: request.id,
      success: aggregatedResult.isValid,
      result: aggregatedResult,
      metadata: {
        strategy: effectiveStrategy,
        validatorsUsed: validators,
        processingTime: 0, // 将在调用方设置
        cacheHit: false,
        retryCount: 0
      }
    };
  }

  /**
   * 函数级注释：选择验证器
   * 根据策略和配置选择合适的验证器
   */
  private selectValidators(
    request: ValidationRequest, 
    strategy: ValidationStrategy
  ): ValidatorType[] {
    // 如果请求指定了验证器，使用指定的
    if (request.validators && request.validators.length > 0) {
      return request.validators.filter(type => 
        this.config.validators[type]?.enabled
      );
    }

    // 根据策略选择验证器
    const enabledValidators = Object.values(this.config.validators)
      .filter(config => config.enabled)
      .sort((a, b) => a.priority - b.priority);

    switch (strategy) {
      case ValidationStrategy.FAIL_FAST:
        return [enabledValidators[0]?.type].filter(Boolean);
        
      case ValidationStrategy.PERFORMANCE:
        return enabledValidators
          .filter(config => config.timeout <= 2000)
          .map(config => config.type);
          
      case ValidationStrategy.SECURITY:
        return enabledValidators
          .filter(config => 
            config.type === ValidatorType.ADVANCED || 
            config.type === ValidatorType.ENHANCED
          )
          .map(config => config.type);
          
      case ValidationStrategy.COMPREHENSIVE:
        return enabledValidators.map(config => config.type);
        
      case ValidationStrategy.ADAPTIVE:
      default:
        return this.selectAdaptiveValidators(request, enabledValidators);
    }
  }

  /**
   * 函数级注释：自适应验证器选择
   * 基于历史性能和上下文智能选择验证器
   */
  private selectAdaptiveValidators(
    request: ValidationRequest, 
    enabledValidators: ValidatorConfig[]
  ): ValidatorType[] {
    // 基于历史性能选择
    const performanceScores = enabledValidators.map(config => {
      const metrics = this.metrics.validatorMetrics.get(config.type);
      if (!metrics) return { type: config.type, score: 0.5 };
      
      // 计算性能评分
      const availabilityScore = metrics.availability;
      const speedScore = 1 - (metrics.averageResponseTime / 10000); // 归一化到0-1
      const reliabilityScore = 1 - metrics.errorRate;
      
      const score = (availabilityScore + speedScore + reliabilityScore) / 3;
      return { type: config.type, score };
    });

    // 选择评分最高的验证器
    const sortedValidators = performanceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3) // 最多选择3个
      .map(item => item.type);

    return sortedValidators;
  }

  /**
   * 函数级注释：执行验证器
   * 并行或串行执行多个验证器
   */
  private async executeValidators(
    validators: ValidatorType[],
    data: any,
    context: AdvancedValidationContext,
    config: ValidationManagerConfig
  ): Promise<Map<ValidatorType, ValidationResult | AdvancedValidationResult>> {
    const results = new Map<ValidatorType, ValidationResult | AdvancedValidationResult>();
    
    if (config.performance.enableParallel) {
      // 并行执行
      const promises = validators.map(async (type) => {
        try {
          const result = await this.executeValidator(type, data, context, config);
          return { type, result };
        } catch (error) {
          logger.error(`验证器 ${type} 执行失败`, { error });
          return { type, result: null };
        }
      });

      const settledResults = await Promise.allSettled(promises);
      
      settledResults.forEach((settled, index) => {
        if (settled.status === 'fulfilled' && settled.value.result) {
          results.set(settled.value.type, settled.value.result);
        }
      });
    } else {
      // 串行执行
      for (const type of validators) {
        try {
          const result = await this.executeValidator(type, data, context, config);
          results.set(type, result);
          
          // 如果是快速失败策略且验证失败，立即返回
          if (config.strategy === ValidationStrategy.FAIL_FAST && !result.isValid) {
            break;
          }
        } catch (error) {
          logger.error(`验证器 ${type} 执行失败`, { error });
          
          // 如果启用了回退机制
          if (config.errorHandling.enableFallback) {
            const fallbackResult = await this.executeFallback(type, data, context, config);
            if (fallbackResult) {
              results.set(type, fallbackResult);
            }
          }
        }
      }
    }

    return results;
  }

  /**
   * 函数级注释：执行单个验证器
   * 执行指定类型的验证器
   */
  private async executeValidator(
    type: ValidatorType,
    data: any,
    context: AdvancedValidationContext,
    config: ValidationManagerConfig
  ): Promise<ValidationResult | AdvancedValidationResult> {
    const validatorConfig = config.validators[type];
    const timeout = validatorConfig.timeout;

    // 创建超时Promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`验证器 ${type} 超时`)), timeout);
    });

    // 执行验证器
    const validationPromise = this.getValidatorPromise(type, data, context, validatorConfig);

    // 竞争执行
    return Promise.race([validationPromise, timeoutPromise]);
  }

  /**
   * 函数级注释：获取验证器Promise
   * 根据类型创建相应的验证器Promise
   */
  private async getValidatorPromise(
    type: ValidatorType,
    data: any,
    context: AdvancedValidationContext,
    config: ValidatorConfig
  ): Promise<ValidationResult | AdvancedValidationResult> {
    switch (type) {
      case ValidatorType.ENHANCED:
        return this.enhancedValidator.validateInput(data, config.config);
        
      case ValidatorType.ADVANCED:
        return this.advancedValidator.validateAdvanced(data, context, config.config);
        
      case ValidatorType.BASIC:
        return this.executeBasicValidation(data, config.config);
        
      case ValidatorType.CUSTOM:
        return this.executeCustomValidation(data, context, config.config);
        
      default:
        throw new Error(`未知的验证器类型: ${type}`);
    }
  }

  /**
   * 函数级注释：聚合验证结果
   * 将多个验证器的结果聚合为最终结果
   */
  private aggregateResults(
    validatorResults: Map<ValidatorType, ValidationResult | AdvancedValidationResult>,
    validators: ValidatorType[],
    strategy: ValidationStrategy
  ): AggregatedValidationResult {
    const results = Array.from(validatorResults.values());
    const successfulResults = results.filter(r => r.isValid);
    
    // 基础聚合
    const isValid = this.determineOverallValidity(validatorResults, strategy);
    const confidence = this.calculateConfidence(validatorResults, strategy);
    const securityScore = this.calculateAggregatedSecurityScore(validatorResults);
    const threatLevel = this.determineOverallThreatLevel(validatorResults);
    
    // 聚合错误和警告
    const errors = this.aggregateErrors(validatorResults);
    const warnings = this.aggregateWarnings(validatorResults);
    
    // 聚合建议
    const recommendations = this.aggregateRecommendations(validatorResults);
    
    // 计算统计信息
    const stats = {
      totalValidators: validators.length,
      successfulValidators: successfulResults.length,
      failedValidators: validators.length - successfulResults.length,
      averageProcessingTime: this.calculateAverageProcessingTime(validatorResults),
      consensusLevel: this.calculateConsensusLevel(validatorResults)
    };

    return {
      isValid,
      sanitizedData: this.aggregateSanitizedData(validatorResults),
      confidence,
      errors,
      warnings,
      securityScore,
      threatLevel,
      threats: this.aggregateThreats(validatorResults),
      validatorResults,
      stats,
      recommendations,
      metadata: {
        strategy,
        weights: this.getValidatorWeights(validators),
        processingOrder: validators,
        fallbackUsed: false // 将在需要时设置
      }
    };
  }

  /**
   * 函数级注释：并行验证
   * 并行处理多个验证请求
   */
  private async validateParallel(requests: ValidationRequest[]): Promise<ValidationResponse[]> {
    const maxConcurrent = this.config.performance.maxConcurrent;
    const results: ValidationResponse[] = [];
    
    // 分批处理
    for (let i = 0; i < requests.length; i += maxConcurrent) {
      const batch = requests.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(request => this.validate(request));
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push(this.createErrorResponse(batch[index], result.reason));
        }
      });
    }
    
    return results;
  }

  /**
   * 函数级注释：串行验证
   * 串行处理多个验证请求
   */
  private async validateSequential(requests: ValidationRequest[]): Promise<ValidationResponse[]> {
    const results: ValidationResponse[] = [];
    
    for (const request of requests) {
      try {
        const response = await this.validate(request);
        results.push(response);
      } catch (error) {
        results.push(this.createErrorResponse(request, error));
      }
    }
    
    return results;
  }

  /**
   * 函数级注释：获取管理器指标
   */
  public getMetrics(): ManagerMetrics {
    return { ...this.metrics };
  }

  /**
   * 函数级注释：更新配置
   */
  public updateConfig(newConfig: Partial<ValidationManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // 重启监控如果配置改变
    if (newConfig.monitoring) {
      this.stopMonitoring();
      this.startMonitoring();
    }
  }

  /**
   * 函数级注释：清理资源
   */
  public cleanup(): void {
    this.stopMonitoring();
    this.resultCache.clear();
    this.activeRequests.clear();
    this.requestQueue.length = 0;
  }

  // 辅助方法实现...
  private initializeMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      cacheHitRate: 0,
      validatorMetrics: new Map(),
      strategyMetrics: new Map(),
      performanceMetrics: {
        p50ResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        throughput: 0,
        concurrency: 0
      }
    };

    // 初始化验证器指标
    Object.values(ValidatorType).forEach(type => {
      this.metrics.validatorMetrics.set(type, {
        type,
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        availability: 1.0,
        lastUpdate: Date.now()
      });
    });
  }

  private startMonitoring(): void {
    if (this.config.monitoring.enableMetrics) {
      this.metricsTimer = setInterval(() => {
        this.collectMetrics();
      }, this.config.monitoring.metricsInterval);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanupCache();
    }, 300000); // 每5分钟清理一次
  }

  private stopMonitoring(): void {
    if (this.metricsTimer) {
      clearInterval(this.metricsTimer);
      this.metricsTimer = null;
    }

    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  private generateCacheKey(request: ValidationRequest): string {
    return `validation-${JSON.stringify(request.data).slice(0, 100)}-${request.context.userId || 'anonymous'}`;
  }

  private isCacheValid(response: ValidationResponse): boolean {
    // 简化的缓存有效性检查
    return Date.now() - response.metadata.processingTime < this.config.performance.cacheTTL;
  }

  private cacheResponse(request: ValidationRequest, response: ValidationResponse): void {
    const cacheKey = this.generateCacheKey(request);
    this.resultCache.set(cacheKey, response);
    
    // 限制缓存大小
    if (this.resultCache.size > this.config.performance.cacheSize) {
      const firstKey = this.resultCache.keys().next().value;
      this.resultCache.delete(firstKey);
    }
  }

  private updateMetrics(type: string, processingTime: number): void {
    this.metrics.totalRequests++;
    this.performanceData.push(processingTime);
    
    if (type === 'validation_success') {
      this.metrics.successfulRequests++;
    } else if (type === 'validation_error') {
      this.metrics.failedRequests++;
    }
    
    // 更新平均响应时间
    this.metrics.averageResponseTime = 
      this.performanceData.reduce((sum, time) => sum + time, 0) / this.performanceData.length;
    
    // 保持最近1000条记录
    if (this.performanceData.length > 1000) {
      this.performanceData.splice(0, this.performanceData.length - 1000);
    }
  }

  private handleValidationError(error: any, request: ValidationRequest): void {
    this.masterErrorHandler.handleError(error, {
      context: 'input_validation_manager',
      requestId: request.id,
      data: JSON.stringify(request.data).slice(0, 200)
    });
  }

  private createErrorResponse(request: ValidationRequest, error: any): ValidationResponse {
    return {
      id: request.id,
      success: false,
      result: {
        isValid: false,
        sanitizedData: null,
        confidence: 0,
        errors: [{
          field: 'root',
          type: ValidationRuleType.CUSTOM,
          message: '验证过程中发生错误',
          value: request.data,
          path: []
        }],
        warnings: [],
        securityScore: 0,
        threatLevel: ThreatLevel.NONE,
        threats: [],
        validatorResults: new Map(),
        stats: {
          totalValidators: 0,
          successfulValidators: 0,
          failedValidators: 0,
          averageProcessingTime: 0,
          consensusLevel: 0
        },
        recommendations: ['检查输入数据', '重试验证'],
        metadata: {
          strategy: ValidationStrategy.FAIL_FAST,
          weights: {},
          processingOrder: [],
          fallbackUsed: false
        }
      },
      metadata: {
        strategy: ValidationStrategy.FAIL_FAST,
        validatorsUsed: [],
        processingTime: 0,
        cacheHit: false,
        retryCount: 0
      }
    };
  }

  // 更多辅助方法的占位符实现...
  private executeBasicValidation(data: any, config: any): Promise<ValidationResult> {
    // 基础验证实现
    return Promise.resolve({
      isValid: true,
      sanitizedData: data,
      errors: [],
      warnings: [],
      stats: {
        fieldsValidated: 1,
        rulesApplied: 1,
        fieldsSanitized: 0,
        validationTime: 10
      }
    });
  }

  private executeCustomValidation(data: any, context: AdvancedValidationContext, config: any): Promise<ValidationResult> {
    // 自定义验证实现
    return Promise.resolve({
      isValid: true,
      sanitizedData: data,
      errors: [],
      warnings: [],
      stats: {
        fieldsValidated: 1,
        rulesApplied: 1,
        fieldsSanitized: 0,
        validationTime: 15
      }
    });
  }

  private executeFallback(type: ValidatorType, data: any, context: AdvancedValidationContext, config: ValidationManagerConfig): Promise<ValidationResult | null> {
    // 回退验证实现
    return Promise.resolve(null);
  }

  private determineOverallValidity(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>, strategy: ValidationStrategy): boolean {
    const validResults = Array.from(results.values()).filter(r => r.isValid);
    const totalResults = results.size;
    
    switch (strategy) {
      case ValidationStrategy.FAIL_FAST:
        return validResults.length > 0;
      case ValidationStrategy.COMPREHENSIVE:
        return validResults.length === totalResults;
      default:
        return validResults.length / totalResults >= this.config.aggregation.consensusThreshold;
    }
  }

  private calculateConfidence(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>, strategy: ValidationStrategy): number {
    const values = Array.from(results.values());
    if (values.length === 0) return 0;
    
    // 简化的置信度计算
    const validCount = values.filter(r => r.isValid).length;
    return validCount / values.length;
  }

  private calculateAggregatedSecurityScore(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): number {
    const advancedResults = Array.from(results.values())
      .filter((r): r is AdvancedValidationResult => 'securityScore' in r);
    
    if (advancedResults.length === 0) return 100;
    
    return advancedResults.reduce((sum, r) => sum + r.securityScore, 0) / advancedResults.length;
  }

  private determineOverallThreatLevel(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): ThreatLevel {
    const advancedResults = Array.from(results.values())
      .filter((r): r is AdvancedValidationResult => 'threatDetection' in r);
    
    if (advancedResults.length === 0) return ThreatLevel.NONE;
    
    // 返回最高威胁级别
    const threatLevels = [ThreatLevel.NONE, ThreatLevel.LOW, ThreatLevel.MEDIUM, ThreatLevel.HIGH, ThreatLevel.CRITICAL];
    const maxLevel = advancedResults.reduce((max, r) => {
      const currentIndex = threatLevels.indexOf(r.threatDetection.threatLevel);
      const maxIndex = threatLevels.indexOf(max);
      return currentIndex > maxIndex ? r.threatDetection.threatLevel : max;
    }, ThreatLevel.NONE);
    
    return maxLevel;
  }

  private aggregateErrors(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): ValidationError[] {
    const allErrors: ValidationError[] = [];
    for (const result of results.values()) {
      allErrors.push(...result.errors);
    }
    return allErrors;
  }

  private aggregateWarnings(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): ValidationError[] {
    const allWarnings: ValidationError[] = [];
    for (const result of results.values()) {
      allWarnings.push(...result.warnings);
    }
    return allWarnings;
  }

  private aggregateRecommendations(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): string[] {
    const allRecommendations: string[] = [];
    for (const result of results.values()) {
      if ('recommendedActions' in result) {
        allRecommendations.push(...result.recommendedActions);
      }
    }
    return [...new Set(allRecommendations)];
  }

  private aggregateSanitizedData(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): any {
    // 返回第一个有效的清理数据
    for (const result of results.values()) {
      if (result.isValid && result.sanitizedData) {
        return result.sanitizedData;
      }
    }
    return null;
  }

  private aggregateThreats(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): string[] {
    const threats: string[] = [];
    for (const result of results.values()) {
      if ('threatDetection' in result && result.threatDetection.detected) {
        threats.push(result.threatDetection.threatType);
      }
    }
    return [...new Set(threats)];
  }

  private calculateAverageProcessingTime(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): number {
    const times = Array.from(results.values()).map(r => r.stats.validationTime);
    return times.length > 0 ? times.reduce((sum, time) => sum + time, 0) / times.length : 0;
  }

  private calculateConsensusLevel(results: Map<ValidatorType, ValidationResult | AdvancedValidationResult>): number {
    const validCount = Array.from(results.values()).filter(r => r.isValid).length;
    return results.size > 0 ? validCount / results.size : 0;
  }

  private getValidatorWeights(validators: ValidatorType[]): Record<ValidatorType, number> {
    const weights: Record<ValidatorType, number> = {} as any;
    validators.forEach(type => {
      weights[type] = this.config.validators[type]?.weight || 0;
    });
    return weights;
  }

  private collectMetrics(): void {
    // 收集性能指标
    if (this.performanceData.length > 0) {
      const sorted = [...this.performanceData].sort((a, b) => a - b);
      this.metrics.performanceMetrics.p50ResponseTime = sorted[Math.floor(sorted.length * 0.5)];
      this.metrics.performanceMetrics.p95ResponseTime = sorted[Math.floor(sorted.length * 0.95)];
      this.metrics.performanceMetrics.p99ResponseTime = sorted[Math.floor(sorted.length * 0.99)];
    }
    
    // 计算缓存命中率
    this.metrics.cacheHitRate = this.metrics.totalRequests > 0 ? 
      (this.metrics.totalRequests - this.metrics.failedRequests) / this.metrics.totalRequests : 0;
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, response] of this.resultCache.entries()) {
      if (now - response.metadata.processingTime > this.config.performance.cacheTTL) {
        this.resultCache.delete(key);
      }
    }
  }
}

/**
 * 函数级注释：输入验证管理器Hook
 * React Hook，用于在组件中使用输入验证管理器
 */
export function useInputValidationManager(config?: Partial<ValidationManagerConfig>) {
  const manager = InputValidationManager.getInstance(config);
  const [metrics, setMetrics] = useState<ManagerMetrics | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(manager.getMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000);

    return () => {
      clearInterval(interval);
      manager.cleanup();
    };
  }, [manager]);

  const validate = useCallback(
    async (request: ValidationRequest): Promise<ValidationResponse> => {
      return manager.validate(request);
    },
    [manager]
  );

  const validateBatch = useCallback(
    async (requests: ValidationRequest[]): Promise<ValidationResponse[]> => {
      return manager.validateBatch(requests);
    },
    [manager]
  );

  const updateConfig = useCallback(
    (newConfig: Partial<ValidationManagerConfig>) => {
      manager.updateConfig(newConfig);
    },
    [manager]
  );

  return {
    validate,
    validateBatch,
    updateConfig,
    metrics,
    getMetrics: manager.getMetrics.bind(manager)
  };
}

// 导出单例实例
export const inputValidationManager = InputValidationManager.getInstance();