/**
* 服务层统一导出文件
* 提供所有专用服务类的统一访问接口
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

// 技能系统服务
export { SkillSystemService,
  skillSystemService,
  type SkillUsageOptions,
  type SkillValidationResult,
  type SkillEffectResult,
  type SkillStatistics,
  type SkillConflictResolution,
  type SkillSystemConfig  } from './skillSystemService';

// 性能监控服务
export { PerformanceMonitoringService,
  performanceMonitoringService,
  PerformanceMetricType,
  PerformanceThreshold,
  type PerformanceMetric,
  type PerformanceAnalysis,
  type PerformanceIssue,
  type PerformanceRecommendation,
  type PerformanceTrend,
  type PerformanceMonitoringConfig  } from './performanceMonitoringService';

// 配置管理服务
export { ConfigurationService,
  configurationService,
  ConfigurationType,
  ConfigurationEnvironment,
  type ConfigurationItem,
  type ConfigurationSchema,
  type ConfigurationValidationResult,
  type ConfigurationUpdateEvent  } from './configurationService';

// 错误处理服务
export { ErrorHandlingService,
  errorHandlingService,
  ErrorType,
  ErrorSeverity,
  ErrorRecoveryStrategy,
  type StandardizedError,
  type ErrorHandlingConfig,
  type ErrorStatistics,
  type ErrorRecoveryResult  } from './errorHandlingService';

// 缓存管理服务
export { CacheService,
  cacheService,
  CacheStrategy,
  CacheStorageType,
  CachePriority,
  type CacheItem,
  type CacheConfig,
  type CacheStatistics,
  type CacheEvent,
  type CacheQueryOptions,
  type CacheBatchResult  } from './cacheService';

/**
* 服务管理器类
* 提供统一的服务管理和协调功能
 */
export class ServiceManager  { private static instance: ServiceManager;
  private services: Map<string, any> = new Map();
  private initialized = false;

  private constructor() {
    this.registerServices()
}

  /**
 * 获取单例实例
 */
public static getInstance(): ServiceManager { if (!ServiceManager.instance)  {
      ServiceManager.instance = new ServiceManager()
}
    return ServiceManager.instance
}

  /**
 * 注册所有服务
 */
private registerServices(): void  { this.services.set('skillSystem', skillSystemService);
    this.services.set('performanceMonitoring', performanceMonitoringService);
    this.services.set('configuration', configurationService);
    this.services.set('errorHandling', errorHandlingService);
    this.services.set('cache', cacheService)
}

  /**
 * 初始化所有服务
 */
public async initialize(): Promise<void> { if (this.initialized)  {
      return
}

    try { // 按依赖顺序初始化服务
      const initOrder = [;
        'configuration',
        'errorHandling',
        'cache',
        'performanceMonitoring',
        'skillSystem' ];

      for (const serviceName of initOrder) {
        const service = this.services.get(serviceName);
        if (service && typeof service.initialize === 'function') {
          await service.initialize()
}
      }

      this.initialized = true;
      console.log('所有服务初始化完成')
} catch (error) { console.error('服务初始化失败:', error);
      throw error
}
  }

  /**
  * 获取服务实例
  *
  * @param serviceName - 服务名称
  * @returns 服务实例
   */
public getService<T>(serviceName: string): T | null  { return this.services.get(serviceName) || null
}

  /**
  * 检查服务是否已注册
  *
  * @param serviceName - 服务名称
  * @returns 是否已注册
   */
public hasService(serviceName: string): boolean  { return this.services.has(serviceName)
}

  /**
  * 获取所有服务名称
  *
  * @returns 服务名称数组
   */
public getServiceNames(): string[]  { return Array.from(this.services.keys())
}

  /**
  * 获取服务状态
  *
  * @returns 服务状态信息
   */
public getServiceStatus(): Record<string, any> { const status: Record<string, any> =  {  };

    for (const [name, service] of this.services.entries()) { status[name] = {
        available: !!service,
        initialized: this.initialized,
        type: service.constructor.name,
        methods: Object.getOwnPropertyNames(Object.getPrototypeOf(service))
        .filter(name => name !== 'constructor' && typeof service[name] === 'function')
}
}

    return status
}

  /**
 * 销毁所有服务
 */
public async destroy(): Promise<void> { try  {
      // 按相反顺序销毁服务
      const destroyOrder = [;
        'skillSystem',
        'performanceMonitoring',
        'cache',
        'errorHandling',
        'configuration' ];

      for (const serviceName of destroyOrder) {
        const service = this.services.get(serviceName);
        if (service && typeof service.destroy === 'function') {
          await service.destroy()
}
      }

      this.services.clear();
      this.initialized = false;
      console.log('所有服务已销毁')
} catch (error) { console.error('服务销毁失败:', error);
      throw error
}
  } }

// 导出服务管理器单例
export const serviceManager = ServiceManager.getInstance();

/**
* 服务工具函数
 */
export const ServiceUtils =  { /**
 * 快速初始化所有服务
 */
async initializeAll(): Promise<void>  {
    await serviceManager.initialize()
},

  /**
 * 获取技能系统服务
 */
getSkillSystemService()  { return serviceManager.getService('skillSystem')
},
  /**
 * 获取性能监控服务
 */
getPerformanceMonitoringService()  { return serviceManager.getService('performanceMonitoring')
},
  /**
 * 获取配置管理服务
 */
getConfigurationService()  { return serviceManager.getService('configuration')
},
  /**
 * 获取错误处理服务
 */
getErrorHandlingService()  { return serviceManager.getService('errorHandling')
},
  /**
 * 获取缓存管理服务
 */
getCacheService()  { return serviceManager.getService('cache')
},
  /**
 * 检查所有服务是否可用
 */
areAllServicesAvailable(): boolean  { const requiredServices = [;
      'skillSystem',
      'performanceMonitoring',
      'configuration',
      'errorHandling',
      'cache' ];

    return requiredServices.every(serviceName =>;
    serviceManager.hasService(serviceName)
  )
},

/**
 * 获取服务健康状态
 */
getHealthStatus():  { healthy: boolean;
  services: Record<string, boolean>;
  issues: string[]
} { const status = serviceManager.getServiceStatus();
  const issues: string[] = [];
  const services: Record<string, boolean> = {  };

  for (const [name, serviceStatus] of Object.entries(status)) { const isHealthy = serviceStatus.available && serviceStatus.initialized;
    services[name] = isHealthy;

    if (!isHealthy) {
      if (!serviceStatus.available) {
        issues.push(`服务 ${name } 不可用`)
}
      if (!serviceStatus.initialized) { issues.push(`服务 ${name } 未初始化`)
}
    } }

  return { healthy: issues.length === 0,
    services,
    issues }
}
};

/**
 * 服务常量
 */
export const SERVICE_CONSTANTS = { NAMES:  {
    SKILL_SYSTEM: 'skillSystem',
    PERFORMANCE_MONITORING: 'performanceMonitoring',
    CONFIGURATION: 'configuration',
    ERROR_HANDLING: 'errorHandling',
    CACHE: 'cache' 
},

  EVENTS: { SERVICE_INITIALIZED: 'service:initialized',
    SERVICE_DESTROYED: 'service:destroyed',
    SERVICE_ERROR: 'service:error',
    ALL_SERVICES_READY: 'services:all-ready' 
},

  PRIORITIES: { CRITICAL: 1,
    HIGH: 2,
    NORMAL: 3,
    LOW: 4 
}
} as const;

/**
 * 服务类型定义
 */
export interface ServiceMetadata  { name: string;
  version: string;
  description: string;
  dependencies: string[];
  priority: number;
  initialized: boolean;
  healthy: boolean
}

/**
 * 服务配置接口
 */
export interface ServiceConfiguration  { enabled: boolean;
  autoStart: boolean;
  retryOnFailure: boolean;
  maxRetries: number;
  retryDelay: number;
  healthCheckInterval: number;
  dependencies: string[];
  config: Record<string, any>
}

// 默认导出服务管理器
export default serviceManager;