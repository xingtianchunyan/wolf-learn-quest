import { createLogger   } from '@/lib/logger';
import { Request, Response, NextFunction   } from 'express';
import { MasterErrorHandler   } from '../utils/masterErrorHandler';
import { UnifiedPermissionManager, PermissionContext   } from '../utils/unifiedPermissionManager';

/**
* 文件级注释：权限验证中间件
*
* 该文件实现了全面的权限验证中间件系统，用于在API层面进行权限检查和拦截：
* - Express中间件集成
* - 动态权限验证
* - 角色基础访问控制
* - 资源级权限检查
* - 权限缓存优化
* - 详细的审计日志
*
* 主要特性：
* - 灵活的权限配置
* - 多层权限检查
* - 性能优化缓存
* - 实时权限监控
* - 错误处理集成
* - 安全审计追踪
*
* @author SOLO Coding
* @version 2.0.0
 */

const logger = createLogger('permission-middleware');

/**
* 权限检查模式枚举
 */
export enum PermissionCheckMode  { STRICT = 'strict',           // 严格模式 - 必须有明确权限
  LENIENT = 'lenient',         // 宽松模式 - 允许部分权限
  CONDITIONAL = 'conditional', // 条件模式 - 基于条件检查
  BYPASS = 'bypass'            // 绕过模式 - 跳过权限检查 }

/**
* 权限检查策略枚举
 */
export enum PermissionStrategy  { ALL_REQUIRED = 'all_required',     // 需要所有权限
  ANY_REQUIRED = 'any_required',     // 需要任一权限
  ROLE_BASED = 'role_based',         // 基于角色
  RESOURCE_BASED = 'resource_based', // 基于资源
  CUSTOM = 'custom'                  // 自定义策略 }

/**
* 接口注释：权限中间件配置
 */
export interface PermissionMiddlewareConfig  { // 基础配置
  mode: PermissionCheckMode;
  strategy: PermissionStrategy;

  // 权限配置
  permissions?: string[];
  roles?: string[];
  resources?: string[];

  // 条件配置
  conditions?: Array<{
    field: string;
    operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches';
    value: any
}>;

  // 自定义检查函数
  customCheck?: (req: Request, context: PermissionContext) => Promise<boolean>;

  // 错误处理
  onError?: (error: Error, req: Request, res: Response) => void;
  onDenied?: (req: Request, res: Response) => void;

  // 缓存配置
  cache?: { enabled: boolean;
    ttl: number;
    keyGenerator?: (req: Request) => string
};

  // 审计配置
  audit?: { enabled: boolean;
    logLevel: 'basic' | 'detailed' | 'verbose';
    includeRequestData: boolean;
    includeResponseData: boolean
};

  // 性能配置
  performance?: { timeout: number;
    enableParallelChecks: boolean;
    enableEarlyReturn: boolean
}
}

/**
 * 接口注释：权限检查结果
 */
export interface PermissionCheckResult  { allowed: boolean;
  reason?: string;
  permissions: Array<{
    name: string;
    granted: boolean;
    reason?: string
}>;
  roles: Array<{ name: string;
    active: boolean
}>;
  context: PermissionContext;
  duration: number;
  cached: boolean
}

/**
 * 接口注释：权限审计记录
 */
export interface PermissionAuditRecord  { id: string;
  timestamp: number;
  userId: string;
  endpoint: string;
  method: string;
  permissions: string[];
  result: 'granted' | 'denied' | 'error';
  reason?: string;
  duration: number;
  ip: string;
  userAgent: string;
  requestData?: any;
  responseData?: any;
  context: PermissionContext
}

/**
 * 接口注释：扩展的Express请求
 */
export interface AuthenticatedRequest extends Request { user?:  {
    id: string;
    username: string;
    email: string;
    roles: string[];
    permissions: string[];
    [key: string]: any
};
  permissions?: { granted: string[];
    denied: string[];
    context: PermissionContext
}
}

/**
* 类级注释：权限中间件
*
* 实现全面的权限验证中间件，提供：
* - 灵活的权限检查策略
* - 高性能缓存机制
* - 详细的审计日志
* - 错误处理集成
 */
export class PermissionMiddleware  { private static instance: PermissionMiddleware;

  // 核心组件
  private permissionManager: UnifiedPermissionManager;
  private errorHandler: MasterErrorHandler;

  // 缓存和监控
  private checkCache: Map<string, { result: PermissionCheckResult; timestamp: number  
}> = new Map();
  private auditRecords: PermissionAuditRecord[] = [];
  private performanceMetrics: Array<{ endpoint: string; duration: number; timestamp: number  
}> = [];

  // 配置
  private globalConfig: Partial<PermissionMiddlewareConfig> = { mode: PermissionCheckMode.STRICT,
    strategy: PermissionStrategy.ALL_REQUIRED,
    cache: {
      enabled: true,
      ttl: 300000 // 5分钟 
},
    audit: { enabled: true,
      logLevel: 'detailed',
      includeRequestData: false,
      includeResponseData: false 
},
    performance: { timeout: 5000,
      enableParallelChecks: true,
      enableEarlyReturn: true 
}
  };

  /**
  * 函数级注释：构造函数
  * 初始化权限中间件
   */
private constructor()  { this.permissionManager = UnifiedPermissionManager.getInstance();
    this.errorHandler = MasterErrorHandler.getInstance();

    this.startCleanupTimer()
}

  /**
 * 函数级注释：获取单例实例
 */
public static getInstance(): PermissionMiddleware { if (!PermissionMiddleware.instance)  {
      PermissionMiddleware.instance = new PermissionMiddleware()
}
    return PermissionMiddleware.instance
}

  /**
  * 函数级注释：创建权限检查中间件
  * 主要的中间件创建方法
   */
  public requirePermission(
    config: string | string[] | PermissionMiddlewareConfig
  ) { return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const startTime = performance.now();

      try {
        // 标准化配置
        const normalizedConfig = this.normalizeConfig(config);

        // 检查是否绕过权限检查
        if (normalizedConfig.mode === PermissionCheckMode.BYPASS) {
          return next()
}

        // 获取用户信息
        const userId = this.extractUserId(req);
        if (!userId) { return this.handleUnauthorized(req, res, '用户未认证')
}

        // 构建权限上下文
        const context = this.buildPermissionContext(req, normalizedConfig);

        // 检查缓存
        const cacheKey = this.generateCacheKey(req, normalizedConfig);
        if (normalizedConfig.cache?.enabled) { const cached = this.checkCache.get(cacheKey);
          if (cached && Date.now() - cached.timestamp < (normalizedConfig.cache.ttl || 300000)) {
            if (cached.result.allowed) {
              this.attachPermissionInfo(req, cached.result);
              return next()
} else { return this.handlePermissionDenied(req, res, cached.result, normalizedConfig)
}
          } }

        // 执行权限检查
        const checkResult = await this.performPermissionCheck(userId, normalizedConfig, context);

        // 缓存结果
        if (normalizedConfig.cache?.enabled) { this.cacheResult(cacheKey, checkResult)
}

        // 记录审计日志
        if (normalizedConfig.audit?.enabled) { this.recordAudit(req, checkResult, normalizedConfig, performance.now() - startTime)
}

        // 处理检查结果
        if (checkResult.allowed) { this.attachPermissionInfo(req, checkResult);
          next()
} else { this.handlePermissionDenied(req, res, checkResult, normalizedConfig)
}

      } catch (error) { this.handleMiddlewareError(error, req, res, next, config)
} finally { // 记录性能指标
        this.recordPerformanceMetric(req.path, performance.now() - startTime)
}
    }
}

  /**
  * 函数级注释：创建角色检查中间件
  * 基于角色的权限检查
   */
public requireRole(roles: string | string[], options?: Partial<PermissionMiddlewareConfig>) { const config: PermissionMiddlewareConfig =  {
      ...this.globalConfig,
      ...options,
      strategy: PermissionStrategy.ROLE_BASED,
      roles: Array.isArray(roles) ? roles : [roles]  
};

    return this.requirePermission(config)
}

  /**
  * 函数级注释：创建资源权限检查中间件
  * 基于资源的权限检查
   */
  public requireResourcePermission(
    resource: string,
    action: string,
    options?: Partial<PermissionMiddlewareConfig>
  ) { const permission = `${resource }.${ action }`;
    const config: PermissionMiddlewareConfig = { ...this.globalConfig,
      ...options,
      strategy: PermissionStrategy.RESOURCE_BASED,
      permissions: [permission],
      resources: [resource]  
};

    return this.requirePermission(config)
}

  /**
  * 函数级注释：创建条件权限检查中间件
  * 基于条件的权限检查
   */
  public requireConditionalPermission(
    permissions: string[],
    conditions: Array<{ field: string;
      operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches';
      value: any
}>,
    options?: Partial<PermissionMiddlewareConfig>
  ) { const config: PermissionMiddlewareConfig = {
      ...this.globalConfig,
      ...options,
      mode: PermissionCheckMode.CONDITIONAL,
      permissions,
      conditions  };

    return this.requirePermission(config)
}

  /**
  * 函数级注释：创建自定义权限检查中间件
  * 使用自定义检查函数
   */
  public requireCustomPermission(customCheck: (req: AuthenticatedRequest, context: PermissionContext) => Promise<boolean>,
    options?: Partial<PermissionMiddlewareConfig>
  ) { const config: PermissionMiddlewareConfig = {
      ...this.globalConfig,
      ...options,
      strategy: PermissionStrategy.CUSTOM,
      customCheck  };

    return this.requirePermission(config)
}

  /**
  * 函数级注释：批量权限检查中间件
  * 同时检查多个权限
   */
public requireAnyPermission(permissions: string[], options?: Partial<PermissionMiddlewareConfig>) { const config: PermissionMiddlewareConfig =  {
      ...this.globalConfig,
      ...options,
      strategy: PermissionStrategy.ANY_REQUIRED,
      permissions  };

    return this.requirePermission(config)
}

  /**
 * 函数级注释：更新全局配置
 */
public updateGlobalConfig(config: Partial<PermissionMiddlewareConfig>): void { this.globalConfig =  { ...this.globalConfig, ...config  }
}
  /**
 * 函数级注释：获取审计记录
 */
public getAuditRecords(filter?:  { userId?: string;
    endpoint?: string;
    result?: 'granted' | 'denied' | 'error';
    startTime?: number;
    endTime?: number
}): PermissionAuditRecord[] { let records = [...this.auditRecords];

    if (filter) {
      records = records.filter(record => {
  if (filter.userId && record.userId !== filter.userId) return false;
        if (filter.endpoint && !record.endpoint.includes(filter.endpoint)) return false;
        if (filter.result && record.result !== filter.result) return false;
        if (filter.startTime && record.timestamp < filter.startTime) return false;
        if (filter.endTime && record.timestamp > filter.endTime) return false;
        return true
})
}

    return records

}

  /**
 * 函数级注释：获取性能统计
 */
public getPerformanceStats():  { averageResponseTime: number;
    totalRequests: number;
    cacheHitRate: number;
    slowestEndpoints: Array<{ endpoint: string; averageTime: number  
}>
} { const totalRequests = this.performanceMetrics.length;
    const averageResponseTime = totalRequests > 0;
    ? this.performanceMetrics.reduce((sum, metric) => sum + metric.duration, 0) / totalRequests;
    : 0;

    // 计算缓存命中率
    const cacheHits = this.performanceMetrics.filter(metric => metric.duration < 1).length;
    const cacheHitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;

    // 找出最慢的端点
    const endpointStats = new Map<string, { total: number; count: number  
}>();
    this.performanceMetrics.forEach(metric => { const stats = endpointStats.get(metric.endpoint) || { total: 0, count: 0   
};
      stats.total += metric.duration;
      stats.count += 1;
      endpointStats.set(metric.endpoint, stats)
});

    const slowestEndpoints = Array.from(endpointStats.entries());
    .map(([endpoint, stats]) => ({ endpoint,
      averageTime: stats.total / stats.count 
}))
    .sort((a, b) => b.averageTime - a.averageTime);
    .slice(0, 10);

    return { averageResponseTime,
      totalRequests,
      cacheHitRate,
      slowestEndpoints }
}

  /**
 * 函数级注释：清理资源
 */
public cleanup(): void  { this.checkCache.clear();
    this.auditRecords.length = 0;
    this.performanceMetrics.length = 0
}

  // 私有方法实现...

  /**
  * 函数级注释：标准化配置
  * 将不同格式的配置标准化
   */
private normalizeConfig(config: string | string[] | PermissionMiddlewareConfig): PermissionMiddlewareConfig { if (typeof config === 'string')  {
      return {
        ...this.globalConfig,
        permissions: [config] 
} as PermissionMiddlewareConfig
}

    if (Array.isArray(config)) { return {
        ...this.globalConfig,
        permissions: config 
} as PermissionMiddlewareConfig
}

    return { ...this.globalConfig,
      ...config }
}

  /**
  * 函数级注释：提取用户ID
  * 从请求中提取用户ID
   */
private extractUserId(req: AuthenticatedRequest): string | null  { // 优先从用户对象获取
    if (req.user?.id) {
      return req.user.id
}

    // 从JWT token获取
    if (req.headers.authorization) { try {
        // 这里应该解析JWT token获取用户ID
        // 简化实现，实际应该使用JWT库
        return 'user_from_token'
} catch (error) { logger.warn('JWT token解析失败', { error  })
}
    }

    // 从session获取
    if ((req as any).session?.userId) { return (req as any).session.userId
}

    return null
}

  /**
  * 函数级注释：构建权限上下文
  * 构建权限检查所需的上下文信息
   */
private buildPermissionContext(req: AuthenticatedRequest, config: PermissionMiddlewareConfig): PermissionContext { return  {
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: Date.now(),
      endpoint: req.path,
      method: req.method,
      query: req.query,
      params: req.params,
      body: config.audit?.includeRequestData ? req.body : undefined,
      headers: {
        'content-type': req.get('Content-Type'),
        'accept': req.get('Accept'),
        'referer': req.get('Referer') 
}
    }
}

  /**
  * 函数级注释：生成缓存键
  * 为权限检查结果生成缓存键
   */
private generateCacheKey(req: AuthenticatedRequest, config: PermissionMiddlewareConfig): string { if (config.cache?.keyGenerator)  {
      return config.cache.keyGenerator(req)
}

    const userId = this.extractUserId(req);
    const permissions = config.permissions?.join(',') || '';
    const roles = config.roles?.join(',') || '';
    const endpoint = req.path;
    const method = req.method;

    return `${ userId }: ${ endpoint 
}: ${ method 
}: ${ permissions 
}: ${ roles 
}`
}

  /**
  * 函数级注释：执行权限检查
  * 根据策略执行权限检查
   */
  private async performPermissionCheck(
    userId: string,
    config: PermissionMiddlewareConfig,
    context: PermissionContext
  ): Promise<PermissionCheckResult> { const startTime = performance.now();

    try {
      let allowed = false;
      const permissions: Array<{ name: string; granted: boolean; reason?: string  
}> = [];
      const roles: Array<{ name: string; active: boolean  
}> = [];

      switch (config.strategy) { case PermissionStrategy.ALL_REQUIRED:
        allowed = await this.checkAllPermissions(userId, config.permissions || [], permissions, context);
        break;

        case PermissionStrategy.ANY_REQUIRED:
        allowed = await this.checkAnyPermission(userId, config.permissions || [], permissions, context);
        break;

        case PermissionStrategy.ROLE_BASED:
        allowed = await this.checkRoles(userId, config.roles || [], roles, context);
        break;

        case PermissionStrategy.RESOURCE_BASED:
        allowed = await this.checkResourcePermissions(userId, config, permissions, context);
        break;

        case PermissionStrategy.CUSTOM:
        if (config.customCheck) {
          allowed = await config.customCheck({ user: { id: userId  
} } as AuthenticatedRequest, context)
}
        break;

        default: allowed = false
}

      // 检查条件
      if (allowed && config.conditions && config.conditions.length > 0) { allowed = this.evaluateConditions(config.conditions, context)
}

      return { allowed,
        permissions,
        roles,
        context,
        duration: performance.now() - startTime,
        cached: false 
}
} catch (error) { logger.error('权限检查失败', { error, userId, config  });
      return { allowed: false,
        reason: '权限检查过程中发生错误',
        permissions: [],
        roles: [],
        context,
        duration: performance.now() - startTime,
        cached: false 
}
}
  }

  /**
  * 函数级注释：检查所有权限
  * 检查用户是否拥有所有指定权限
   */
  private async checkAllPermissions(
    userId: string,
    permissionNames: string[],
    results: Array<{ name: string; granted: boolean; reason?: string  
}>,
    context: PermissionContext
  ): Promise<boolean> { let allGranted = true;

    for (const permissionName of permissionNames) {
      try {
        const granted = await this.permissionManager.checkPermission(userId, permissionName, undefined, context);
        results.push({ name: permissionName, granted  });

        if (!granted) { allGranted = false;
          if (!this.globalConfig.performance?.enableEarlyReturn) {
            break; // 早期返回优化 }
        } } catch (error) { results.push({ name: permissionName, granted: false, reason: '检查失败'  
});
        allGranted = false
}
    }

    return allGranted
}

  /**
  * 函数级注释：检查任一权限
  * 检查用户是否拥有任一指定权限
   */
  private async checkAnyPermission(
    userId: string,
    permissionNames: string[],
    results: Array<{ name: string; granted: boolean; reason?: string  
}>,
    context: PermissionContext
  ): Promise<boolean> { let anyGranted = false;

    for (const permissionName of permissionNames) {
      try {
        const granted = await this.permissionManager.checkPermission(userId, permissionName, undefined, context);
        results.push({ name: permissionName, granted  });

        if (granted) { anyGranted = true;
          if (this.globalConfig.performance?.enableEarlyReturn) {
            break; // 早期返回优化 }
        } } catch (error) { results.push({ name: permissionName, granted: false, reason: '检查失败'  
})
}
    }

    return anyGranted
}

  /**
  * 函数级注释：检查角色
  * 检查用户是否拥有指定角色
   */
  private async checkRoles(
    userId: string,
    roleNames: string[],
    results: Array<{ name: string; active: boolean  
}>,
    context: PermissionContext
  ): Promise<boolean> { // 简化实现，实际应该从用户服务获取角色信息
    for (const roleName of roleNames) {
      const hasRole = await this.checkUserRole(userId, roleName);
      results.push({ name: roleName, active: hasRole  
});

      if (hasRole) { return true
}
    }

    return false
}

  /**
  * 函数级注释：检查资源权限
  * 检查用户对特定资源的权限
   */
  private async checkResourcePermissions(
    userId: string,
    config: PermissionMiddlewareConfig,
    results: Array<{ name: string; granted: boolean; reason?: string  
}>,
    context: PermissionContext
  ): Promise<boolean> { if (!config.permissions || config.permissions.length === 0) {
      return false
}

    // 从请求中提取资源ID
    const resourceId = this.extractResourceId(context);

    for (const permissionName of config.permissions) { try {
        const granted = await this.permissionManager.checkPermission(userId, permissionName, resourceId, context);
        results.push({ name: permissionName, granted  });

        if (!granted) { return false
}
      } catch (error) { results.push({ name: permissionName, granted: false, reason: '检查失败'  
});
        return false
}
    }

    return true
}

  /**
  * 函数级注释：评估条件
  * 评估权限条件是否满足
   */
  private evaluateConditions(
    conditions: Array<{ field: string;
      operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches';
      value: any
}>,
    context: PermissionContext
  ): boolean { return conditions.every(condition => {
      const fieldValue = this.getFieldValue(condition.field, context);

      switch (condition.operator) {
        case 'equals':
        return fieldValue === condition.value;
        case 'not_equals':
        return fieldValue !== condition.value;
        case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue);
        case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
        case 'contains':
        return typeof fieldValue === 'string' && fieldValue.includes(condition.value);
        case 'matches':
        return typeof fieldValue === 'string' && new RegExp(condition.value).test(fieldValue);
        default: return false
}
    })
}

  /**
  * 函数级注释：附加权限信息
  * 将权限信息附加到请求对象
   */
private attachPermissionInfo(req: AuthenticatedRequest, result: PermissionCheckResult): void { req.permissions =  {
      granted: result.permissions.filter(p => p.granted).map(p => p.name),
      denied: result.permissions.filter(p => !p.granted).map(p => p.name),
      context: result.context 
}
}

  /**
  * 函数级注释：处理权限拒绝
  * 处理权限检查失败的情况
   */
  private handlePermissionDenied(
    req: AuthenticatedRequest,
    res: Response,
    result: PermissionCheckResult,
    config: PermissionMiddlewareConfig
  ): void { if (config.onDenied) {
      config.onDenied(req, res);
      return
}

    res.status(403).json({ error: 'Permission Denied',
      message: result.reason || '您没有执行此操作的权限',
      code: 'PERMISSION_DENIED',
      details: {
        requiredPermissions: result.permissions.filter(p => !p.granted).map(p => p.name),
        timestamp: Date.now() 
}
    })
}

  /**
  * 函数级注释：处理未认证
  * 处理用户未认证的情况
   */
private handleUnauthorized(req: Request, res: Response, reason: string): void { res.status(401).json( {
      error: 'Unauthorized',
      message: reason,
      code: 'UNAUTHORIZED',
      timestamp: Date.now() 
})
}

  /**
  * 函数级注释：处理中间件错误
  * 处理中间件执行过程中的错误
   */
  private handleMiddlewareError(
    error: any,
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
    config: string | string[] | PermissionMiddlewareConfig
  ): void { logger.error('权限中间件错误', { error, path: req.path, method: req.method  
});

    const normalizedConfig = this.normalizeConfig(config);

    if (normalizedConfig.onError) { normalizedConfig.onError(error, req, res);
      return
}

    this.errorHandler.handleError(error, { context: 'permission_middleware',
      request: {
        path: req.path,
        method: req.method,
        userId: this.extractUserId(req) 
}
    });

    res.status(500).json({ error: 'Internal Server Error',
      message: '权限检查过程中发生错误',
      code: 'PERMISSION_CHECK_ERROR',
      timestamp: Date.now() 
})
}

  /**
  * 函数级注释：缓存结果
  * 缓存权限检查结果
   */
private cacheResult(key: string, result: PermissionCheckResult): void { this.checkCache.set(key,  {
      result: { ...result, cached: true  
},
      timestamp: Date.now() 
});

    // 限制缓存大小
    if (this.checkCache.size > 10000) { const firstKey = this.checkCache.keys().next().value;
      this.checkCache.delete(firstKey)
}
  }

  /**
  * 函数级注释：记录审计日志
  * 记录权限检查的审计信息
   */
  private recordAudit(
    req: AuthenticatedRequest,
    result: PermissionCheckResult,
    config: PermissionMiddlewareConfig,
    duration: number
  ): void { const auditRecord: PermissionAuditRecord = {
      id: this.generateAuditId(),
      timestamp: Date.now(),
      userId: this.extractUserId(req) || 'anonymous',
      endpoint: req.path,
      method: req.method,
      permissions: config.permissions || [],
      result: result.allowed ? 'granted' : 'denied',
      reason: result.reason,
      duration,
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      context: result.context  
};

    if (config.audit?.includeRequestData) { auditRecord.requestData = {
        query: req.query,
        params: req.params,
        body: req.body 
}
}

    this.auditRecords.push(auditRecord);

    // 保持最近10000条记录
    if (this.auditRecords.length > 10000) { this.auditRecords.splice(0, this.auditRecords.length - 10000)
}
  }

  /**
  * 函数级注释：记录性能指标
  * 记录权限检查的性能数据
   */
private recordPerformanceMetric(endpoint: string, duration: number): void { this.performanceMetrics.push( {
      endpoint,
      duration,
      timestamp: Date.now() 
});

    // 保持最近5000条记录
    if (this.performanceMetrics.length > 5000) { this.performanceMetrics.splice(0, this.performanceMetrics.length - 5000)
}
  }

  /**
  * 函数级注释：启动清理定时器
  * 定期清理过期的缓存和记录
   */
private startCleanupTimer(): void { setInterval(() =>  {
  this.cleanupExpiredCache();
      this.cleanupOldRecords()
}, 300000); // 每5分钟清理一次 
}

  /**
  * 函数级注释：清理过期缓存
  * 清理过期的权限检查缓存
   */
private cleanupExpiredCache(): void  { const now = Date.now();
    const ttl = this.globalConfig.cache?.ttl || 300000;

    for (const [key, value] of this.checkCache.entries()) {
      if (now - value.timestamp > ttl) {
        this.checkCache.delete(key)
}
    } }

  /**
  * 函数级注释：清理旧记录
  * 清理过期的审计记录和性能指标
   */
private cleanupOldRecords(): void  { const cutoffTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7天前

    // 清理审计记录
    this.auditRecords = this.auditRecords.filter(record => record.timestamp > cutoffTime);

    // 清理性能指标
    this.performanceMetrics = this.performanceMetrics.filter(metric => metric.timestamp > cutoffTime)
}

  // 辅助方法...
  private async checkUserRole(userId: string, roleName: string): Promise<boolean> { // 简化实现，实际应该查询用户角色
    return true
}

  private extractResourceId(context: PermissionContext): string | undefined { // 从URL参数中提取资源ID
    if (context.params && typeof context.params === 'object') {
      return (context.params as any).id || (context.params as any).resourceId
}
    return undefined
}

  private getFieldValue(field: string, context: PermissionContext): any { const fields = field.split('.');
    let value: any = context;

    for (const f of fields) {
      if (value && typeof value === 'object') {
        value = value[f]
} else { return undefined
}
    }

    return value
}

  private generateAuditId(): string { return `audit_${Date.now() 
}_${ Math.random().toString(36).substr(2, 9) }`
}
}

// 导出单例实例和便捷方法
export const permissionMiddleware = PermissionMiddleware.getInstance();

/**
* 函数级注释：便捷的权限检查方法
* 快速创建权限检查中间件
 */
export const requirePermission = (config: string | string[] | PermissionMiddlewareConfig) =>  {
  return permissionMiddleware.requirePermission(config)

};

/**
* 函数级注释：便捷的角色检查方法
* 快速创建角色检查中间件
 */
export const requireRole = (roles: string | string[], options?: Partial<PermissionMiddlewareConfig>) =>  {
  return permissionMiddleware.requireRole(roles, options)

};

/**
* 函数级注释：便捷的资源权限检查方法
* 快速创建资源权限检查中间件
 */
export const requireResourcePermission = (resource: string, action: string, options?: Partial<PermissionMiddlewareConfig>) =>  {
  return permissionMiddleware.requireResourcePermission(resource, action, options)

};

/**
* 函数级注释：便捷的任一权限检查方法
* 快速创建任一权限检查中间件
 */
export const requireAnyPermission = (permissions: string[], options?: Partial<PermissionMiddlewareConfig>) =>  {
  return permissionMiddleware.requireAnyPermission(permissions, options)

};