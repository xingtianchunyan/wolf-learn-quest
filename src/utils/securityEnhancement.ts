/**
 * 文件级注释：安全增强工具
 * 提供额外的安全防护措施，包括请求限制、CSRF防护、XSS防护等
 * 用于增强应用程序的整体安全性
 */

import { createLogger } from '@/lib/logger';
import { securityAuditService, SecurityEventType } from '@/services/securityAuditService';

const logger = createLogger('security-enhancement');

/**
 * 请求限制器接口
 */
interface RateLimiter {
  key: string;
  requests: number;
  window: number; // 时间窗口（毫秒）
  lastReset: number;
  count: number;
}

/**
 * CSRF令牌接口
 */
interface CSRFToken {
  token: string;
  userId: string;
  sessionId: string;
  expiry: number;
  used: boolean;
}

/**
 * 安全增强类
 */
export class SecurityEnhancement {
  private static instance: SecurityEnhancement;
  private rateLimiters: Map<string, RateLimiter> = new Map();
  private csrfTokens: Map<string, CSRFToken> = new Map();
  private blockedIPs: Set<string> = new Set();
  private suspiciousActivities: Map<string, number> = new Map();

  private constructor() {
    this.startPeriodicCleanup();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): SecurityEnhancement {
    if (!SecurityEnhancement.instance) {
      SecurityEnhancement.instance = new SecurityEnhancement();
    }
    return SecurityEnhancement.instance;
  }

  /**
   * 请求限制检查
   */
  public checkRateLimit(
    identifier: string,
    action: string,
    maxRequests: number = 100,
    windowMs: number = 60000
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const key = `${identifier}:${action}`;
    const now = Date.now();
    
    let limiter = this.rateLimiters.get(key);
    
    if (!limiter) {
      limiter = {
        key,
        requests: maxRequests,
        window: windowMs,
        lastReset: now,
        count: 0
      };
      this.rateLimiters.set(key, limiter);
    }

    // 检查是否需要重置计数器
    if (now - limiter.lastReset >= limiter.window) {
      limiter.count = 0;
      limiter.lastReset = now;
    }

    // 检查是否超过限制
    if (limiter.count >= limiter.requests) {
      // 记录限制超出事件
      securityAuditService.recordSecurityEvent(SecurityEventType.RATE_LIMIT_EXCEEDED, {
        description: `请求限制超出: ${action}`,
        metadata: {
          identifier,
          action,
          currentCount: limiter.count,
          limit: limiter.requests,
          window: limiter.window
        },
        source: 'rate_limiter'
      });

      return {
        allowed: false,
        remaining: 0,
        resetTime: limiter.lastReset + limiter.window
      };
    }

    limiter.count++;
    
    return {
      allowed: true,
      remaining: limiter.requests - limiter.count,
      resetTime: limiter.lastReset + limiter.window
    };
  }

  /**
   * 生成CSRF令牌
   */
  public generateCSRFToken(userId: string, sessionId: string): string {
    const token = this.generateSecureToken();
    const expiry = Date.now() + 3600000; // 1小时过期

    this.csrfTokens.set(token, {
      token,
      userId,
      sessionId,
      expiry,
      used: false
    });

    logger.debug('生成CSRF令牌', { userId, sessionId, token: token.substring(0, 8) + '...' });
    
    return token;
  }

  /**
   * 验证CSRF令牌
   */
  public validateCSRFToken(
    token: string,
    userId: string,
    sessionId: string
  ): { valid: boolean; reason?: string } {
    const csrfToken = this.csrfTokens.get(token);

    if (!csrfToken) {
      securityAuditService.recordSecurityEvent(SecurityEventType.SUSPICIOUS_ACTIVITY, {
        description: 'CSRF令牌不存在',
        metadata: { token: token.substring(0, 8) + '...', userId, sessionId },
        source: 'csrf_protection'
      });
      return { valid: false, reason: '令牌不存在' };
    }

    if (csrfToken.used) {
      securityAuditService.recordSecurityEvent(SecurityEventType.SUSPICIOUS_ACTIVITY, {
        description: 'CSRF令牌重复使用',
        metadata: { token: token.substring(0, 8) + '...', userId, sessionId },
        source: 'csrf_protection'
      });
      return { valid: false, reason: '令牌已使用' };
    }

    if (Date.now() > csrfToken.expiry) {
      this.csrfTokens.delete(token);
      return { valid: false, reason: '令牌已过期' };
    }

    if (csrfToken.userId !== userId || csrfToken.sessionId !== sessionId) {
      securityAuditService.recordSecurityEvent(SecurityEventType.SUSPICIOUS_ACTIVITY, {
        description: 'CSRF令牌用户不匹配',
        metadata: { 
          token: token.substring(0, 8) + '...', 
          expectedUserId: csrfToken.userId,
          actualUserId: userId,
          expectedSessionId: csrfToken.sessionId,
          actualSessionId: sessionId
        },
        source: 'csrf_protection'
      });
      return { valid: false, reason: '令牌用户不匹配' };
    }

    // 标记令牌为已使用
    csrfToken.used = true;
    
    return { valid: true };
  }

  /**
   * XSS防护 - 清理HTML内容
   */
  public sanitizeHTML(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }

    // 移除危险的标签和属性
    const dangerousTags = /<(script|iframe|object|embed|form|input|textarea|select|button|link|meta|style)[^>]*>.*?<\/\1>|<(script|iframe|object|embed|form|input|textarea|select|button|link|meta|style)[^>]*\/?>|<\/?(script|iframe|object|embed|form|input|textarea|select|button|link|meta|style)[^>]*>/gi;
    
    let sanitized = input.replace(dangerousTags, '');

    // 移除危险的事件处理器
    const dangerousEvents = /on\w+\s*=\s*["'][^"']*["']|on\w+\s*=\s*[^>\s]+/gi;
    sanitized = sanitized.replace(dangerousEvents, '');

    // 移除javascript:协议
    const javascriptProtocol = /javascript\s*:/gi;
    sanitized = sanitized.replace(javascriptProtocol, '');

    // 移除data:协议（除了安全的图片格式）
    const dataProtocol = /data:(?!image\/(png|jpg|jpeg|gif|svg\+xml))[^;,]+[;,]/gi;
    sanitized = sanitized.replace(dataProtocol, '');

    return sanitized;
  }

  /**
   * SQL注入防护 - 检测潜在的SQL注入
   */
  public detectSQLInjection(input: string): { detected: boolean; patterns: string[] } {
    if (typeof input !== 'string') {
      return { detected: false, patterns: [] };
    }

    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi,
      /(--|\/\*|\*\/|;|'|"|`)/g,
      /(\bOR\b|\bAND\b)\s+\w+\s*=\s*\w+/gi,
      /\b(UNION|SELECT)\b.*\b(FROM|WHERE)\b/gi,
      /'.*(\bOR\b|\bAND\b).*'/gi,
      /\b(EXEC|EXECUTE)\b\s*\(/gi
    ];

    const detectedPatterns: string[] = [];

    for (const pattern of sqlPatterns) {
      if (pattern.test(input)) {
        detectedPatterns.push(pattern.source);
      }
    }

    if (detectedPatterns.length > 0) {
      securityAuditService.recordSecurityEvent(SecurityEventType.SQL_INJECTION_ATTEMPT, {
        description: 'SQL注入尝试检测',
        metadata: {
          input: input.substring(0, 200),
          patterns: detectedPatterns
        },
        source: 'sql_injection_detector'
      });
    }

    return {
      detected: detectedPatterns.length > 0,
      patterns: detectedPatterns
    };
  }

  /**
   * IP地址封禁
   */
  public blockIP(ipAddress: string, reason: string): void {
    this.blockedIPs.add(ipAddress);
    
    securityAuditService.recordSecurityEvent(SecurityEventType.ADMIN_ACTION, {
      description: `IP地址已封禁: ${ipAddress}`,
      metadata: { ipAddress, reason },
      source: 'ip_blocker'
    });

    logger.warn('IP地址已封禁', { ipAddress, reason });
  }

  /**
   * 检查IP是否被封禁
   */
  public isIPBlocked(ipAddress: string): boolean {
    return this.blockedIPs.has(ipAddress);
  }

  /**
   * 记录可疑活动
   */
  public recordSuspiciousActivity(
    identifier: string,
    activity: string,
    threshold: number = 5
  ): { blocked: boolean; count: number } {
    const key = `${identifier}:${activity}`;
    const currentCount = (this.suspiciousActivities.get(key) || 0) + 1;
    
    this.suspiciousActivities.set(key, currentCount);

    if (currentCount >= threshold) {
      securityAuditService.recordSecurityEvent(SecurityEventType.SUSPICIOUS_ACTIVITY, {
        description: `可疑活动阈值达到: ${activity}`,
        metadata: {
          identifier,
          activity,
          count: currentCount,
          threshold
        },
        source: 'suspicious_activity_detector'
      });

      // 如果是IP地址，考虑封禁
      if (this.isValidIP(identifier)) {
        this.blockIP(identifier, `可疑活动过多: ${activity}`);
        return { blocked: true, count: currentCount };
      }
    }

    return { blocked: false, count: currentCount };
  }

  /**
   * 生成安全令牌
   */
  private generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * 验证IP地址格式
   */
  private isValidIP(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  }

  /**
   * 定期清理过期数据
   */
  private startPeriodicCleanup(): void {
    setInterval(() => {
      const now = Date.now();

      // 清理过期的CSRF令牌
      for (const [token, csrfToken] of this.csrfTokens.entries()) {
        if (now > csrfToken.expiry) {
          this.csrfTokens.delete(token);
        }
      }

      // 清理旧的限制器
      for (const [key, limiter] of this.rateLimiters.entries()) {
        if (now - limiter.lastReset > limiter.window * 2) {
          this.rateLimiters.delete(key);
        }
      }

      // 清理可疑活动记录（24小时后）
      // 注意：这里简化处理，实际应该记录时间戳
      if (this.suspiciousActivities.size > 1000) {
        this.suspiciousActivities.clear();
      }

      logger.debug('安全数据清理完成', {
        csrfTokens: this.csrfTokens.size,
        rateLimiters: this.rateLimiters.size,
        blockedIPs: this.blockedIPs.size,
        suspiciousActivities: this.suspiciousActivities.size
      });
    }, 300000); // 每5分钟清理一次
  }

  /**
   * 获取安全统计信息
   */
  public getSecurityStats(): {
    rateLimiters: number;
    csrfTokens: number;
    blockedIPs: number;
    suspiciousActivities: number;
  } {
    return {
      rateLimiters: this.rateLimiters.size,
      csrfTokens: this.csrfTokens.size,
      blockedIPs: this.blockedIPs.size,
      suspiciousActivities: this.suspiciousActivities.size
    };
  }
}

// 导出单例实例
export const securityEnhancement = SecurityEnhancement.getInstance();

// 导出便捷函数
export const checkRateLimit = (identifier: string, action: string, maxRequests?: number, windowMs?: number) => {
  return securityEnhancement.checkRateLimit(identifier, action, maxRequests, windowMs);
};

export const generateCSRFToken = (userId: string, sessionId: string) => {
  return securityEnhancement.generateCSRFToken(userId, sessionId);
};

export const validateCSRFToken = (token: string, userId: string, sessionId: string) => {
  return securityEnhancement.validateCSRFToken(token, userId, sessionId);
};

export const sanitizeHTML = (input: string) => {
  return securityEnhancement.sanitizeHTML(input);
};

export const detectSQLInjection = (input: string) => {
  return securityEnhancement.detectSQLInjection(input);
};