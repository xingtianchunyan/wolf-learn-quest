import { createLogger   } from '@/lib/logger';
import { securityAuditService, SecurityEventType   } from '@/services/securityAuditService';
import { enhancedInputValidator   } from './enhancedInputValidation';
import { enhancedPermissionSystem, Permission   } from './enhancedPermissionSystem';
import { securityEnhancement   } from './securityEnhancement';

/**
* 文件级注释：安全中间件
* 提供API请求的安全检查和防护功能
* 包括认证验证、权限检查、输入验证、请求限制等
 */

const logger = createLogger('security-middleware');

/**
 * 安全中间件选项接口
 */
export interface SecurityMiddlewareOptions  {
  requireAuth?: boolean;
  requiredPermissions?: Permission[];
  enableRateLimit?: boolean;
  rateLimitConfig?: {
    maxRequests: number;
    windowMs: number
}
  enableInputValidation?: boolean;
  enableCSRFProtection?: boolean;
  enableXSSProtection?: boolean;
  enableSQLInjectionProtection?: boolean;
  customValidation?: (request: any) => Promise<{ valid: boolean; error?: string  
}>
}

/**
 * 安全检查结果接口
 */
export interface SecurityCheckResult  { passed: boolean;
  errors: string[];
  warnings: string[];
  metadata?: Record<string, any>
}

/**
 * 请求上下文接口
 */
export interface RequestContext  { userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  body?: any;
  query?: Record<string, any>
}

/**
 * 安全中间件类
 */
export class SecurityMiddleware  { private static instance: SecurityMiddleware;
  private constructor() { }

  /**
 * 获取单例实例
 */
public static getInstance(): SecurityMiddleware { if (!SecurityMiddleware.instance)  {
      SecurityMiddleware.instance = new SecurityMiddleware()
}
    return SecurityMiddleware.instance
}

  /**
 * 执行安全检查
 */
public async performSecurityCheck(
    context: RequestContext,
    options: SecurityMiddlewareOptions = {
}
  ): Promise<SecurityCheckResult> { const result: SecurityCheckResult = {
      passed: true,
      errors: [],
      warnings: [],
      metadata: { 
} };

    try { // 1. IP封禁检查
      if (context.ipAddress && securityEnhancement.isIPBlocked(context.ipAddress)) {
        result.passed = false;
        result.errors.push('IP地址已被封禁');

        await securityAuditService.recordSecurityEvent(SecurityEventType.SUSPICIOUS_ACTIVITY, {
          description: '被封禁IP尝试访问',
          metadata: { ipAddress: context.ipAddress, path: context.path  
},
          source: 'security_middleware' 
});

        return result
}

      // 2. 请求限制检查
      if (options.enableRateLimit) { const identifier = context.userId || context.ipAddress || 'anonymous';
        const rateLimitResult = securityEnhancement.checkRateLimit(;
          identifier,
          context.path,
          options.rateLimitConfig?.maxRequests,
          options.rateLimitConfig?.windowMs
        );

        if (!rateLimitResult.allowed) {
          result.passed = false;
          result.errors.push('请求频率超过限制');
          result.metadata.rateLimit = rateLimitResult;
          return result
}

        result.metadata.rateLimit = rateLimitResult
}

      // 3. 认证检查
      if (options.requireAuth && !context.userId) { result.passed = false;
        result.errors.push('需要用户认证');

        await securityAuditService.recordSecurityEvent(SecurityEventType.PERMISSION_DENIED, {
          description: '未认证用户尝试访问受保护资源',
          metadata: { path: context.path, ipAddress: context.ipAddress  
},
          source: 'security_middleware' 
});

        return result
}

      // 4. 权限检查
      if (options.requiredPermissions && options.requiredPermissions.length > 0 && context.userId) { for (const permission of options.requiredPermissions) {
          const permissionResult = await enhancedPermissionSystem.checkPermission(permission, {
            userId: context.userId,
            sessionId: context.sessionId,
            ipAddress: context.ipAddress,
            path: context.path 
});

          if (!permissionResult.granted) { result.passed = false;
            result.errors.push(`缺少权限: ${permission 
}`);

            await securityAuditService.recordSecurityEvent(SecurityEventType.PERMISSION_DENIED, { description: `权限检查失败: ${permission 
}`,
              metadata: { userId: context.userId,
                permission,
                path: context.path,
                reason: permissionResult.reason 
},
              source: 'security_middleware' 
})
}
        }

        if (!result.passed) { return result
}
      }

      // 5. CSRF保护检查
      if (options.enableCSRFProtection && context.method !== 'GET') { const csrfToken = context.headers['x-csrf-token'] || context.headers['csrf-token'];

        if (!csrfToken) {
          result.passed = false;
          result.errors.push('缺少CSRF令牌');
          return result
}

        if (context.userId && context.sessionId) { const csrfResult = securityEnhancement.validateCSRFToken(;
            csrfToken,
            context.userId,
            context.sessionId
          );

          if (!csrfResult.valid) {
            result.passed = false;
            result.errors.push(`CSRF令牌验证失败: ${csrfResult.reason 
}`);
            return result
}
        } }

      // 6. 输入验证
      if (options.enableInputValidation && context.body) { const validationResult = enhancedInputValidator.validate(context.body, { }, { enableSecurityChecks: true,
          enableSanitization: false, // 中间件阶段不进行清理，只检查
          strictMode: true 
});

        if (!validationResult.isValid) { result.passed = false;
          result.errors.push('输入验证失败');
          result.metadata.validationErrors = validationResult.errors;

          await securityAuditService.recordSecurityEvent(SecurityEventType.INPUT_VALIDATION_FAILURE, {
            description: '输入验证失败',
            metadata: {
              path: context.path,
              errors: validationResult.errors,
              userId: context.userId 
},
            source: 'security_middleware' 
})
}

        if (validationResult.securityWarnings.length > 0) { result.warnings.push(...validationResult.securityWarnings);
          result.metadata.securityWarnings = validationResult.securityWarnings
}
      }

      // 7. XSS保护检查
      if (options.enableXSSProtection && context.body) { const xssCheck = this.checkForXSS(context.body);
        if (xssCheck.detected) {
          result.passed = false;
          result.errors.push('检测到XSS攻击尝试');

          await securityAuditService.recordSecurityEvent(SecurityEventType.XSS_ATTEMPT, {
            description: 'XSS攻击尝试',
            metadata: {
              path: context.path,
              patterns: xssCheck.patterns,
              userId: context.userId 
},
            source: 'security_middleware' 
})
}
      }

      // 8. SQL注入保护检查
      if (options.enableSQLInjectionProtection && context.body) { const sqlCheck = securityEnhancement.detectSQLInjection(JSON.stringify(context.body));
        if (sqlCheck.detected) {
          result.passed = false;
          result.errors.push('检测到SQL注入尝试');
          result.metadata.sqlInjectionPatterns = sqlCheck.patterns
}
      }

      // 9. 自定义验证
      if (options.customValidation) { const customResult = await options.customValidation(context);
        if (!customResult.valid) {
          result.passed = false;
          result.errors.push(customResult.error || '自定义验证失败')
}
      }

      // 记录成功的安全检查
      if (result.passed) { logger.debug('安全检查通过', {
          path: context.path,
          userId: context.userId,
          checks: Object.keys(options).filter(key => options[key as keyof SecurityMiddlewareOptions])
})
}

      return result
} catch (error) { logger.error('安全检查执行失败', { context, options, error  });

      result.passed = false;
      result.errors.push('安全检查系统错误');

      await securityAuditService.recordSecurityEvent(SecurityEventType.SYSTEM_ERROR, { description: '安全中间件执行失败',
        metadata: { error: error.message, path: context.path  
},
        source: 'security_middleware' 
});

      return result
}
  }

  /**
 * 检查XSS攻击
 */
private checkForXSS(data: any): { detected: boolean; patterns: string[]  
}  { const dataString = JSON.stringify(data).toLowerCase();
    const xssPatterns = [;
      /<script[^>]*>.*?<\/script>/gi,
      /javascript\s*:/gi,
      /on\w+\s*=\s*[''][^'']*["']/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>/gi,
      /eval\s*\(/gi,
      /expression\s*\(/gi,
      /vbscript\s*:/gi ];

    const detectedPatterns: string[] = [];

    for (const pattern of xssPatterns) {
      if (pattern.test(dataString)) {
        detectedPatterns.push(pattern.source)
}
    }

    return { detected: detectedPatterns.length > 0,
      patterns: detectedPatterns 
}
}

  /**
 * 创建Express中间件
 */
public createExpressMiddleware(options: SecurityMiddlewareOptions) { return async (req: any, res: any, next: any) =>  {
      try {
        const context: RequestContext = {
          userId: req.user?.id,
          sessionId: req.sessionID,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent'),
          method: req.method,
          path: req.path,
          headers: req.headers,
          body: req.body,
          query: req.query  
};

        const result = await this.performSecurityCheck(context, options);

        if (!result.passed) { return res.status(403).json({
            error: 'Security check failed',
            details: result.errors,
            warnings: result.warnings 
})
}

        // 将安全检查结果添加到请求对象
        req.securityCheck = result;

        next()
} catch (error) { logger.error('Express安全中间件错误', error);
        res.status(500).json({
          error: 'Internal security error' 
})
}
    }
}

  /**
 * 创建Supabase Edge Function中间件
 */
public createSupabaseMiddleware(options: SecurityMiddlewareOptions) { return async (req: Request): Promise<{ passed: boolean; response?: Response  
}> => { try  {
        const url = new URL(req.url);
        const headers: Record<string, string> = {  };
        req.headers.forEach((value, key) => {
  headers[key] = value

});

        let body: any;
        if (req.method !== 'GET' && req.method !== 'HEAD') { try {
            body = await req.json()
} catch { // 忽略JSON解析错误 }
        }

        const context: RequestContext = { userId: headers['x-user-id'],
          sessionId: headers['x-session-id'],
          ipAddress: headers['x-forwarded-for'] || headers['x-real-ip'],
          userAgent: headers['user-agent'],
          method: req.method,
          path: url.pathname,
          headers,
          body,
          query: Object.fromEntries(url.searchParams)  
};

        const result = await this.performSecurityCheck(context, options);

        if (!result.passed) { return {
            passed: false,
            response: new Response(JSON.stringify({
              error: 'Security check failed',
              details: result.errors,
              warnings: result.warnings 
}), { status: 403,
              headers: { 'Content-Type': 'application/json'  
} }) }
}

        return { passed: true  
}
} catch (error) { logger.error('Supabase安全中间件错误', error);
        return {
          passed: false,
          response: new Response(JSON.stringify({
            error: 'Internal security error' 
}), { status: 500,
            headers: { 'Content-Type': 'application/json'  
} }) }
}
    }
}
}

// 导出单例实例
export const securityMiddleware = SecurityMiddleware.getInstance();

// 导出便捷函数
/**
 * createSecurityMiddleware函数
 * 创建新项
 *
 * @param options - options参数
 * @returns void
 */
export const createSecurityMiddleware = (options: SecurityMiddlewareOptions) =>  {
  return securityMiddleware.createExpressMiddleware(options)

};

/**
 * createSupabaseSecurityMiddleware函数
 * 创建新项
 *
 * @param options - options参数
 * @returns void
 */
export const createSupabaseSecurityMiddleware = (options: SecurityMiddlewareOptions) =>  {
  return securityMiddleware.createSupabaseMiddleware(options)

};