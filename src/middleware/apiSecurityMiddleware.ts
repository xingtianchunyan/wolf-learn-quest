import { enhancedInputValidator  } from '@/utils/enhancedInputValidation';
import { enhancedPermissionSystem  } from '@/utils/enhancedPermissionSystem';
import { GlobalErrorMonitor  } from '@/utils/globalErrorMonitor';
import { MasterErrorHandler  } from '@/utils/masterErrorHandler';
import { Request, Response, NextFunction  } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

/**
* 文件级注释：API安全中间件系统
*
* 该文件实现了一个全面的API安全中间件系统，旨在：
* - 提供多层API安全防护机制
* - 实施速率限制和访问控制
* - 防护常见的API攻击（SQL注入、XSS、CSRF等）
* - 实现API密钥管理和JWT验证
* - 提供安全审计和监控功能
*
* 主要功能：
* - 请求验证和过滤
* - 身份认证和授权
* - 速率限制和防护
* - 安全头部设置
* - 审计日志记录
*
* @author SOLO Coding
* @version 1.0.0
 */

/**
* 接口注释：API安全配置
* 定义API安全中间件的配置选项
 */
export interface ApiSecurityConfig { /** 是否启用安全中间件  */
  enabled: boolean;
  /** JWT配置  */
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
    audience: string;,
};
  /** 速率限制配置  */
  rateLimit: { windowMs: number;
    max: number;
    message: string;
    standardHeaders: boolean;
    legacyHeaders: boolean;,
};
  /** CORS配置  */
  cors: { origin: string | string[] | boolean;
    credentials: boolean;
    optionsSuccessStatus: number;
    methods: string[];
    allowedHeaders: string[];,
};
  /** 安全头部配置  */
  helmet: { contentSecurityPolicy: boolean;
    crossOriginEmbedderPolicy: boolean;
    crossOriginOpenerPolicy: boolean;
    crossOriginResourcePolicy: boolean;
    dnsPrefetchControl: boolean;
    frameguard: boolean;
    hidePoweredBy: boolean;
    hsts: boolean;
    ieNoOpen: boolean;
    noSniff: boolean;
    originAgentCluster: boolean;
    permittedCrossDomainPolicies: boolean;
    referrerPolicy: boolean;
    xssFilter: boolean;,
};
  /** API密钥配置  */
  apiKey: { enabled: boolean;
    headerName: string;
    validKeys: string[];
    keyRotationInterval: number;,
};
  /** 输入验证配置  */
  inputValidation: { enabled: boolean;
    maxBodySize: string;
    maxParameterLength: number;
    allowedMethods: string[];
    blockedPatterns: string[];,
};
  /** 审计配置  */
  audit: { enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    includeRequestBody: boolean;
    includeResponseBody: boolean;
    sensitiveFields: string[];,
};,
}

/**
* 接口注释：API请求上下文
* 定义API请求的安全上下文信息
 */
export interface ApiRequestContext { /** 请求ID  */
  requestId: string;
  /** 用户ID  */
  userId?: string;
  /** 会话ID  */
  sessionId?: string;
  /** 客户端IP  */
  clientIp: string;
  /** 用户代理  */
  userAgent: string;
  /** 请求时间戳  */
  timestamp: number;
  /** 认证状态  */
  authenticated: boolean;
  /** 权限列表  */
  permissions: string[];
  /** API密钥信息  */
  apiKey?: {
    keyId: string;
    scope: string[];,
};
  /** 安全标记  */
  securityFlags: { suspicious: boolean;
    rateLimited: boolean;
    blocked: boolean;
    reasons: string[];,
};,
}

/**
* 接口注释：安全审计日志
* 定义安全审计日志的数据结构
 */
export interface SecurityAuditLog { /** 日志ID  */
  id: string;
  /** 请求上下文  */
  context: ApiRequestContext;
  /** 请求信息  */
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    query: Record<string, any>;
    params: Record<string, any>;,
};
  /** 响应信息  */
  response?: { statusCode: number;
    headers: Record<string, string>;
    body?: any;
    responseTime: number;,
};
  /** 安全事件  */
  securityEvents: Array<{ type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    timestamp: number;,
}>;
  /** 处理结果  */
  result: 'allowed' | 'blocked' | 'rate_limited' | 'error';
  /** 错误信息  */
  error?: string;,
}

/**
* 类级注释：API安全中间件
*
* 实现全面的API安全防护，提供：
* - 多层安全验证
* - 实时威胁检测
* - 访问控制管理
* - 安全审计记录
 */
export class ApiSecurityMiddleware { private static instance: ApiSecurityMiddleware;
  private config: ApiSecurityConfig;
  private masterErrorHandler: MasterErrorHandler;
  private globalErrorMonitor: GlobalErrorMonitor;
  private auditLogs: SecurityAuditLog[] = [];
  private suspiciousIps: Map<string, { count: number; lastSeen: number  }> = new Map();
  private apiKeyCache: Map<string, { keyId: string; scope: string[]; lastUsed: number  }> = new Map();

  /**
  * 构造函数级注释：初始化API安全中间件
  * 设置默认配置和初始化安全组件
   */
  private constructor() { this.config = this.getDefaultConfig();
    this.masterErrorHandler = MasterErrorHandler.getInstance();
    this.globalErrorMonitor = GlobalErrorMonitor.getInstance();

    this.startCleanupTasks();,
}

  /**
  * 函数级注释：获取单例实例
  * 实现单例模式，确保全局只有一个中间件实例
   */
  public static getInstance(): ApiSecurityMiddleware { if (!ApiSecurityMiddleware.instance) {
      ApiSecurityMiddleware.instance = new ApiSecurityMiddleware();,
}
    return ApiSecurityMiddleware.instance;,
}

  /**
  * 函数级注释：获取默认配置
  * 返回默认的API安全配置
   */
  private getDefaultConfig(): ApiSecurityConfig { return {
      enabled: true,
      jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
        expiresIn: '24h',
        issuer: 'wolf-learn-quest',
        audience: 'wolf-learn-quest-api',
},
      rateLimit: { windowMs: 15 * 60 * 1000, // 15分钟
        max: 100, // 每个IP最多100个请求
        message: '请求过于频繁，请稍后再试',
        standardHeaders: true,
        legacyHeaders: false,
},
      cors: { origin: process.env.NODE_ENV === 'production' ? false : true,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID'],
},
      helmet: { contentSecurityPolicy: true,
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        crossOriginResourcePolicy: true,
        dnsPrefetchControl: true,
        frameguard: true,
        hidePoweredBy: true,
        hsts: true,
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: true,
        referrerPolicy: true,
        xssFilter: true,
},
      apiKey: { enabled: false,
        headerName: 'X-API-Key',
        validKeys: [],
        keyRotationInterval: 30 * 24 * 60 * 60 * 1000 // 30天,
},
      inputValidation: { enabled: true,
        maxBodySize: '10mb',
        maxParameterLength: 1000,
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        blockedPatterns: ['<script',
          'javascript:',
          'vbscript:',
          'onload=',
          'onerror=',
          'eval(',
          'setTimeout(',
          'setInterval(',
          'Function(',
          'constructor',
],
},
      audit: { enabled: true,
        logLevel: 'info',
        includeRequestBody: false,
        includeResponseBody: false,
        sensitiveFields: ['password', 'token', 'secret', 'key', 'authorization'],
}
    };,
}

  /**
  * 函数级注释：创建安全中间件栈
  * 创建完整的安全中间件处理栈
   */
  public createSecurityStack() { const middlewares = [];

    if (!this.config.enabled) {
      return middlewares;,
}

    // 1. 基础安全头部
    middlewares.push(helmet(this.config.helmet));

    // 2. CORS配置
    middlewares.push(cors(this.config.cors));

    // 3. 速率限制
    middlewares.push(this.createRateLimitMiddleware());

    // 4. 请求上下文初始化
    middlewares.push(this.initializeRequestContext.bind(this));

    // 5. 输入验证
    if (this.config.inputValidation.enabled) { middlewares.push(this.validateInput.bind(this));,
}

    // 6. API密钥验证
    if (this.config.apiKey.enabled) { middlewares.push(this.validateApiKey.bind(this));,
}

    // 7. JWT认证
    middlewares.push(this.authenticateJWT.bind(this));

    // 8. 权限验证
    middlewares.push(this.authorizeRequest.bind(this));

    // 9. 威胁检测
    middlewares.push(this.detectThreats.bind(this));

    // 10. 审计日志
    if (this.config.audit.enabled) { middlewares.push(this.auditRequest.bind(this));,
}

    return middlewares;,
}

  /**
  * 函数级注释：创建速率限制中间件
  * 创建自定义的速率限制中间件
   */
  private createRateLimitMiddleware() { return rateLimit({
      ...this.config.rateLimit,
      keyGenerator: (req: Request) => {
        // 使用IP和用户ID组合作为限制键
        const ip = this.getClientIp(req);
        const userId = (req as any).userId || 'anonymous';
        return `${ip }:${ userId }`;,
},
      handler: (req: Request, res: Response) => { const context = (req as any).securityContext as ApiRequestContext;
        if (context) {
          context.securityFlags.rateLimited = true;
          context.securityFlags.reasons.push('Rate limit exceeded');,
}

        this.logSecurityEvent(req, 'rate_limit_exceeded', 'medium', '请求频率超过限制');

        res.status(429).json({ error: 'Too Many Requests',
          message: this.config.rateLimit.message,
          retryAfter: Math.ceil(this.config.rateLimit.windowMs / 1000),
});,
}
    });,
}

  /**
  * 函数级注释：初始化请求上下文
  * 为每个请求创建安全上下文
   */
  private initializeRequestContext(req: Request, res: Response, next: NextFunction) { const requestId = this.generateRequestId();
    const clientIp = this.getClientIp(req);
    const userAgent = req.get('User-Agent') || 'Unknown';

    const context: ApiRequestContext = {
      requestId,
      clientIp,
      userAgent,
      timestamp: Date.now(),
      authenticated: false,
      permissions: [],
      securityFlags: {
        suspicious: false,
        rateLimited: false,
        blocked: false,
        reasons: [],
}
    };

    // 检查可疑IP
    if (this.isSuspiciousIp(clientIp)) { context.securityFlags.suspicious = true;
      context.securityFlags.reasons.push('Suspicious IP address');,
}

    (req as any).securityContext = context;
    res.setHeader('X-Request-ID', requestId);

    next();,
}

  /**
  * 函数级注释：验证输入
  * 验证和清理请求输入
   */
  private async validateInput(req: Request, res: Response, next: NextFunction) { try {
      const context = (req as any).securityContext as ApiRequestContext;

      // 检查HTTP方法
      if (!this.config.inputValidation.allowedMethods.includes(req.method)) {
        context.securityFlags.blocked = true;
        context.securityFlags.reasons.push('HTTP method not allowed');

        return res.status(405).json({
          error: 'Method Not Allowed',
          message: `HTTP方法 ${req.method } 不被允许`,
});,
}

      // 检查参数长度
      for (const [key, value] of Object.entries(req.query)) { if (typeof value === 'string' && value.length > this.config.inputValidation.maxParameterLength) {
          context.securityFlags.blocked = true;
          context.securityFlags.reasons.push('Parameter too long');

          return res.status(400).json({
            error: 'Bad Request',
            message: `参数 ${key } 长度超过限制`,
});,
}
      }

      // 检查恶意模式
      const allInputs = [;
        ...Object.values(req.query),
        ...Object.values(req.params),
        ...(req.body ? Object.values(req.body) : []),
];

      for (const input of allInputs) { if (typeof input === 'string') {
          for (const pattern of this.config.inputValidation.blockedPatterns) {
            if (input.toLowerCase().includes(pattern.toLowerCase())) {
              context.securityFlags.blocked = true;
              context.securityFlags.reasons.push(`Malicious pattern detected: ${pattern }`);

              this.logSecurityEvent(req, 'malicious_input_detected', 'high', `检测到恶意输入模式: ${ pattern }`);

              return res.status(400).json({ error: 'Bad Request',
                message: '输入包含不允许的内容',
});,
}
          },
}
      }

      // 使用增强输入验证器
      if (req.body) { const validationResult = await enhancedInputValidator.validateInput(req.body, {
          maxStringLength: this.config.inputValidation.maxParameterLength,
          allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
          maxFileSize: 10 * 1024 * 1024, // 10MB
          enableSanitization: true,
          enableXSSProtection: true,
          enableSQLInjectionProtection: true,
});

        if (!validationResult.isValid) { context.securityFlags.blocked = true;
          context.securityFlags.reasons.push('Input validation failed');

          return res.status(400).json({
            error: 'Validation Error',
            message: '输入验证失败',
            details: validationResult.errors,
});,
}

        // 使用清理后的数据
        req.body = validationResult.sanitizedData;,
}

      next();,
} catch (error) { this.handleMiddlewareError(error, req, res, next);,
}
  }

  /**
  * 函数级注释：验证API密钥
  * 验证API密钥的有效性和权限
   */
  private validateApiKey(req: Request, res: Response, next: NextFunction) { const context = (req as any).securityContext as ApiRequestContext;
    const apiKey = req.get(this.config.apiKey.headerName);

    if (!apiKey) {
      context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('Missing API key');

      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API密钥缺失',
});,
}

    // 检查API密钥缓存
    const cachedKey = this.apiKeyCache.get(apiKey);
    if (cachedKey) { context.apiKey = {
        keyId: cachedKey.keyId,
        scope: cachedKey.scope,
};
      cachedKey.lastUsed = Date.now();
      return next();,
}

    // 验证API密钥
    if (!this.config.apiKey.validKeys.includes(apiKey)) { context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('Invalid API key');

      this.logSecurityEvent(req, 'invalid_api_key', 'medium', '无效的API密钥');

      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API密钥无效',
});,
}

    // 缓存有效的API密钥
    const keyId = this.generateKeyId(apiKey);
    this.apiKeyCache.set(apiKey, { keyId,
      scope: ['read', 'write'], // 可以根据实际需求配置
      lastUsed: Date.now(),
});

    context.apiKey = { keyId,
      scope: ['read', 'write'],
};

    next();,
}

  /**
  * 函数级注释：JWT认证
  * 验证JWT令牌并提取用户信息
   */
  private authenticateJWT(req: Request, res: Response, next: NextFunction) { const context = (req as any).securityContext as ApiRequestContext;
    const authHeader = req.get('Authorization');

    // 如果没有Authorization头部，跳过JWT验证（可能是公开API）
    if (!authHeader) {
      return next();,
}

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try { const decoded = jwt.verify(token, this.config.jwt.secret, {
        issuer: this.config.jwt.issuer,
        audience: this.config.jwt.audience,
}) as any;

      context.authenticated = true;
      context.userId = decoded.userId || decoded.sub;
      context.sessionId = decoded.sessionId;
      context.permissions = decoded.permissions || [];

      (req as any).user = decoded;

      next();,
} catch (error) { context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('Invalid JWT token');

      this.logSecurityEvent(req, 'invalid_jwt_token', 'medium', 'JWT令牌验证失败');

      return res.status(401).json({
        error: 'Unauthorized',
        message: 'JWT令牌无效或已过期',
});,
}
  }

  /**
  * 函数级注释：授权请求
  * 检查用户权限和访问控制
   */
  private async authorizeRequest(req: Request, res: Response, next: NextFunction) { try {
      const context = (req as any).securityContext as ApiRequestContext;

      // 如果是公开路由，跳过权限检查
      if (this.isPublicRoute(req.path)) {
        return next();,
}

      // 如果用户未认证，拒绝访问
      if (!context.authenticated) { context.securityFlags.blocked = true;
        context.securityFlags.reasons.push('Authentication required');

        return res.status(401).json({
          error: 'Unauthorized',
          message: '需要身份认证',
});,
}

      // 检查权限
      const requiredPermission = this.getRequiredPermission(req.method, req.path);
      if (requiredPermission) { const hasPermission = await enhancedPermissionSystem.checkPermission(;
          context.userId!,
          requiredPermission
        );

        if (!hasPermission) {
          context.securityFlags.blocked = true;
          context.securityFlags.reasons.push('Insufficient permissions');

          this.logSecurityEvent(req, 'insufficient_permissions', 'medium', `权限不足: ${requiredPermission }`);

          return res.status(403).json({ error: 'Forbidden',
            message: '权限不足',
});,
}
      }

      next();,
} catch (error) { this.handleMiddlewareError(error, req, res, next);,
}
  }

  /**
  * 函数级注释：威胁检测
  * 检测和防护各种安全威胁
   */
  private detectThreats(req: Request, res: Response, next: NextFunction) { const context = (req as any).securityContext as ApiRequestContext;

    // 检测SQL注入
    if (this.detectSQLInjection(req)) {
      context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('SQL injection attempt detected');

      this.logSecurityEvent(req, 'sql_injection_attempt', 'high', 'SQL注入攻击尝试');

      return res.status(400).json({
        error: 'Bad Request',
        message: '请求被安全系统拦截',
});,
}

    // 检测XSS攻击
    if (this.detectXSS(req)) { context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('XSS attempt detected');

      this.logSecurityEvent(req, 'xss_attempt', 'high', 'XSS攻击尝试');

      return res.status(400).json({
        error: 'Bad Request',
        message: '请求被安全系统拦截',
});,
}

    // 检测路径遍历
    if (this.detectPathTraversal(req)) { context.securityFlags.blocked = true;
      context.securityFlags.reasons.push('Path traversal attempt detected');

      this.logSecurityEvent(req, 'path_traversal_attempt', 'high', '路径遍历攻击尝试');

      return res.status(400).json({
        error: 'Bad Request',
        message: '请求被安全系统拦截',
});,
}

    next();,
}

  /**
  * 函数级注释：审计请求
  * 记录请求的安全审计日志
   */
  private auditRequest(req: Request, res: Response, next: NextFunction) { const context = (req as any).securityContext as ApiRequestContext;
    const startTime = Date.now();

    // 记录请求信息
    const auditLog: SecurityAuditLog = {
      id: this.generateAuditId(),
      context: { ...context  },
      request: { method: req.method,
        url: req.url,
        headers: this.sanitizeHeaders(req.headers),
        body: this.config.audit.includeRequestBody ? this.sanitizeBody(req.body) : undefined,
        query: req.query,
        params: req.params,
},
      securityEvents: [],
      result: 'allowed',
};

    // 监听响应完成
    res.on('finish', () => { const responseTime = Date.now() - startTime;

      auditLog.response = {
        statusCode: res.statusCode,
        headers: this.sanitizeHeaders(res.getHeaders()),
        responseTime,
};

      // 确定结果状态
      if (context.securityFlags.blocked) { auditLog.result = 'blocked';,
} else if (context.securityFlags.rateLimited) { auditLog.result = 'rate_limited';,
} else if (res.statusCode >= 400) { auditLog.result = 'error';,
}

      this.saveAuditLog(auditLog);,
});

    (req as any).auditLog = auditLog;
    next();,
}

  /**
  * 函数级注释：获取客户端IP
  * 获取真实的客户端IP地址
   */
  private getClientIp(req: Request): string { return (;
      req.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
      req.get('X-Real-IP') ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown'
    );,
}

  /**
  * 函数级注释：生成请求ID
  * 生成唯一的请求标识符
   */
  private generateRequestId(): string { return `req_${Date.now() }_${ crypto.randomBytes(8).toString('hex') }`;,
}

  /**
  * 函数级注释：生成密钥ID
  * 为API密钥生成标识符
   */
  private generateKeyId(apiKey: string): string { return crypto.createHash('sha256').update(apiKey).digest('hex').slice(0, 16);,
}

  /**
  * 函数级注释：生成审计ID
  * 生成唯一的审计日志标识符
   */
  private generateAuditId(): string { return `audit_${Date.now() }_${ crypto.randomBytes(8).toString('hex') }`;,
}

  /**
  * 函数级注释：检查可疑IP
  * 检查IP是否被标记为可疑
   */
  private isSuspiciousIp(ip: string): boolean { const suspiciousInfo = this.suspiciousIps.get(ip);
    if (!suspiciousInfo) return false;

    // 如果最近1小时内有超过10次可疑活动，标记为可疑
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    return suspiciousInfo.count > 10 && suspiciousInfo.lastSeen > oneHourAgo;,
}

  /**
  * 函数级注释：检查公开路由
  * 检查路由是否为公开访问
   */
  private isPublicRoute(path: string): boolean { const publicRoutes = [;
      '/api/health',
      '/api/status',
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh',
      '/api/public',
];

    return publicRoutes.some(route => path.startsWith(route));,
}

  /**
  * 函数级注释：获取所需权限
  * 根据HTTP方法和路径确定所需权限
   */
  private getRequiredPermission(method: string, path: string): string | null { // 这里可以实现更复杂的权限映射逻辑
    const pathSegments = path.split('/').filter(Boolean);

    if (pathSegments.includes('admin')) {
      return 'admin';,
}

    if (method === 'GET') { return 'read';,
} else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) { return 'write';,
}

    return null;,
}

  /**
  * 函数级注释：检测SQL注入
  * 检测请求中的SQL注入攻击模式
   */
  private detectSQLInjection(req: Request): boolean { const sqlPatterns = [;
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\'|\")(\s*)(OR|AND)(\s*)(\'|\")/i,
      /(\-\-|\#|\/\*|\*\/)/,
      /(\b(SLEEP|BENCHMARK|WAITFOR)\b)/i,
];

    const allInputs = [;
      ...Object.values(req.query),
      ...Object.values(req.params),
      ...(req.body ? Object.values(req.body) : []),
];

    return allInputs.some(input => {
      if (typeof input === 'string') {
        return sqlPatterns.some(pattern => pattern.test(input));,
}
      return false;,
});,
}

  /**
  * 函数级注释：检测XSS攻击
  * 检测请求中的XSS攻击模式
   */
  private detectXSS(req: Request): boolean { const xssPatterns = [;
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i,
      /<iframe\b[^>]*>/i,
      /<object\b[^>]*>/i,
      /<embed\b[^>]*>/i,
];

    const allInputs = [;
      ...Object.values(req.query),
      ...Object.values(req.params),
      ...(req.body ? Object.values(req.body) : []),
];

    return allInputs.some(input => {
      if (typeof input === 'string') {
        return xssPatterns.some(pattern => pattern.test(input));,
}
      return false;,
});,
}

  /**
  * 函数级注释：检测路径遍历
  * 检测请求中的路径遍历攻击模式
   */
  private detectPathTraversal(req: Request): boolean { const pathTraversalPatterns = [;
      /\.\.\// ,
      /\.\.\\/,
      /%2e%2e%2f/i,
      /%2e%2e%5c/i,
      /\.\.%2f/i,
      /\.\.%5c/i,
];

    const allInputs = [;
      req.url,
      ...Object.values(req.query),
      ...Object.values(req.params),
      ...(req.body ? Object.values(req.body) : []),
];

    return allInputs.some(input => {
      if (typeof input === 'string') {
        return pathTraversalPatterns.some(pattern => pattern.test(input));,
}
      return false;,
});,
}

  /**
  * 函数级注释：记录安全事件
  * 记录安全相关事件
   */
  private logSecurityEvent(
    req: Request,
    type: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    description: string
  ) { const context = (req as any).securityContext as ApiRequestContext;
    const auditLog = (req as any).auditLog as SecurityAuditLog;

    const event = {
      type,
      severity,
      description,
      timestamp: Date.now(),
};

    if (auditLog) { auditLog.securityEvents.push(event);,
}

    // 更新可疑IP统计
    if (severity === 'high' || severity === 'critical') { const suspiciousInfo = this.suspiciousIps.get(context.clientIp) || { count: 0, lastSeen: 0  };
      suspiciousInfo.count++;
      suspiciousInfo.lastSeen = Date.now();
      this.suspiciousIps.set(context.clientIp, suspiciousInfo);,
}

    // 报告给全局错误监控
    if (severity === 'high' || severity === 'critical') { this.globalErrorMonitor.reportError(new Error(`Security event: ${description }`), { type: 'security_event',
        severity,
        clientIp: context.clientIp,
        userAgent: context.userAgent,
        requestId: context.requestId,
});,
}
  }

  /**
  * 函数级注释：清理头部信息
  * 清理敏感的头部信息用于日志记录
   */
  private sanitizeHeaders(headers: any): Record<string, string> { const sanitized = { ...headers  };

    this.config.audit.sensitiveFields.forEach(field => { if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';,
}
    });

    return sanitized;,
}

  /**
  * 函数级注释：清理请求体
  * 清理敏感的请求体信息用于日志记录
   */
  private sanitizeBody(body: any): any { if (!body || typeof body !== 'object') return body;

    const sanitized = { ...body  };

    this.config.audit.sensitiveFields.forEach(field => { if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';,
}
    });

    return sanitized;,
}

  /**
  * 函数级注释：保存审计日志
  * 保存安全审计日志
   */
  private saveAuditLog(auditLog: SecurityAuditLog) { this.auditLogs.push(auditLog);

    // 限制日志数量
    if (this.auditLogs.length > 10000) {
      this.auditLogs = this.auditLogs.slice(-5000);,
}

    // 这里可以集成外部日志系统
    if (this.config.audit.logLevel === 'debug' || auditLog.securityEvents.length > 0) { console.log('Security Audit Log:', JSON.stringify(auditLog, null, 2));,
}
  }

  /**
  * 函数级注释：处理中间件错误
  * 统一处理中间件中的错误
   */
  private handleMiddlewareError(error: any, req: Request, res: Response, next: NextFunction) { const context = (req as any).securityContext as ApiRequestContext;

    this.logSecurityEvent(req, 'middleware_error', 'high', `中间件错误: ${error.message }`);

    this.masterErrorHandler.handleError(error, { middleware: true,
      requestId: context?.requestId,
      clientIp: context?.clientIp,
});

    res.status(500).json({ error: 'Internal Server Error',
      message: '服务器内部错误',
});,
}

  /**
  * 函数级注释：启动清理任务
  * 启动定期清理任务
   */
  private startCleanupTasks() { // 每小时清理一次过期的缓存和日志
    setInterval(() => {
      this.cleanupExpiredData();,
}, 60 * 60 * 1000);,
}

  /**
  * 函数级注释：清理过期数据
  * 清理过期的缓存和日志数据
   */
  private cleanupExpiredData() { const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    // 清理API密钥缓存
    for (const [key, value] of this.apiKeyCache.entries()) {
      if (value.lastUsed < oneHourAgo) {
        this.apiKeyCache.delete(key);,
}
    }

    // 清理可疑IP记录
    for (const [ip, info] of this.suspiciousIps.entries()) { if (info.lastSeen < oneHourAgo) {
        this.suspiciousIps.delete(ip);,
}
    }

    // 清理旧的审计日志
    this.auditLogs = this.auditLogs.filter(log =>;
    log.context.timestamp > oneHourAgo
  );,
}

/**
* 函数级注释：更新配置
* 更新安全中间件配置
 */
public updateConfig(newConfig: Partial<ApiSecurityConfig>) { this.config = { ...this.config, ...newConfig  };,
}

/**
* 函数级注释：获取安全统计
* 获取安全相关的统计信息
 */
public getSecurityStats() { const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  const recentLogs = this.auditLogs.filter(log => log.context.timestamp > oneHourAgo);

  return {
    totalRequests: recentLogs.length,
    blockedRequests: recentLogs.filter(log => log.result === 'blocked').length,
    rateLimitedRequests: recentLogs.filter(log => log.result === 'rate_limited').length,
    securityEvents: recentLogs.reduce((sum, log) => sum + log.securityEvents.length, 0),
    suspiciousIps: this.suspiciousIps.size,
    cachedApiKeys: this.apiKeyCache.size,
};,
}

/**
* 函数级注释：获取审计日志
* 获取安全审计日志
 */
public getAuditLogs(limit: number = 100): SecurityAuditLog[] { return this.auditLogs.slice(-limit);,
}
}

/**
* 函数级注释：创建API安全中间件
* 创建并配置API安全中间件实例
 */
export function createApiSecurityMiddleware(config?: Partial<ApiSecurityConfig>) { const middleware = ApiSecurityMiddleware.getInstance();
  if (config) {
    middleware.updateConfig(config);,
}
  return middleware;,
}

/**
* 函数级注释：获取API安全中间件
* 获取API安全中间件实例
 */
export function getApiSecurityMiddleware() { return ApiSecurityMiddleware.getInstance();,
}

export default ApiSecurityMiddleware;