/**
 * 文件级注释：安全审计服务
 * 提供全面的安全事件监控、威胁检测和安全报告功能
 * 支持实时安全监控、异常检测和自动响应机制
 */

import { createLogger } from '@/lib/logger';
import { enhancedInputValidator } from '@/utils/enhancedInputValidation';
import {
  enhancedPermissionSystem,
  Permission,
} from '@/utils/enhancedPermissionSystem';

const logger = createLogger('security-audit');

/**
 * 安全事件类型枚举
 */
export enum SecurityEventType {
  // 认证相关
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
  LOGOUT = 'logout',
  SESSION_EXPIRED = 'session_expired',

  // 权限相关
  PERMISSION_GRANTED = 'permission_granted',
  PERMISSION_DENIED = 'permission_denied',
  PRIVILEGE_ESCALATION_ATTEMPT = 'privilege_escalation_attempt',

  // 输入验证
  INPUT_VALIDATION_FAILURE = 'input_validation_failure',
  MALICIOUS_INPUT_DETECTED = 'malicious_input_detected',
  XSS_ATTEMPT = 'xss_attempt',
  SQL_INJECTION_ATTEMPT = 'sql_injection_attempt',

  // 系统安全
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  BRUTE_FORCE_ATTEMPT = 'brute_force_attempt',
  DATA_BREACH_ATTEMPT = 'data_breach_attempt',

  // 游戏安全
  CHEATING_ATTEMPT = 'cheating_attempt',
  GAME_MANIPULATION = 'game_manipulation',
  SKILL_ABUSE = 'skill_abuse',

  // 系统事件
  SYSTEM_ERROR = 'system_error',
  CONFIGURATION_CHANGE = 'configuration_change',
  ADMIN_ACTION = 'admin_action',
}

/**
 * 安全威胁级别枚举
 */
export enum ThreatLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * 安全事件接口
 */
export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  threatLevel: ThreatLevel;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: number;
  description: string;
  details: Record<string, any>;
  source: string;
  resolved: boolean;
  responseActions: string[];
}

/**
 * 安全威胁检测规则接口
 */
export interface ThreatDetectionRule {
  id: string;
  name: string;
  eventTypes: SecurityEventType[];
  condition: (events: SecurityEvent[]) => boolean;
  threatLevel: ThreatLevel;
  description: string;
  responseAction: (events: SecurityEvent[]) => Promise<void>;
  enabled: boolean;
}

/**
 * 安全统计接口
 */
export interface SecurityStats {
  totalEvents: number;
  eventsByType: Record<SecurityEventType, number>;
  eventsByThreatLevel: Record<ThreatLevel, number>;
  topThreats: Array<{ type: SecurityEventType; count: number }>;
  recentEvents: SecurityEvent[];
  threatTrends: Array<{
    date: string;
    count: number;
    threatLevel: ThreatLevel;
  }>;
}

/**
 * 安全配置接口
 */
export interface SecurityConfig {
  enableRealTimeMonitoring: boolean;
  enableThreatDetection: boolean;
  enableAutoResponse: boolean;
  maxEventsInMemory: number;
  eventRetentionDays: number;
  alertThresholds: Record<ThreatLevel, number>;
  rateLimits: Record<string, { requests: number; window: number }>;
}

/**
 * 安全审计服务类
 */
class SecurityAuditService {
  private static instance: SecurityAuditService;
  private events: SecurityEvent[] = [];
  private threatRules: Map<string, ThreatDetectionRule> = new Map();
  private config: SecurityConfig = {
    enableRealTimeMonitoring: true,
    enableThreatDetection: true,
    enableAutoResponse: true,
    maxEventsInMemory: 10000,
    eventRetentionDays: 30,
    alertThresholds: {
      [ThreatLevel.LOW]: 100,
      [ThreatLevel.MEDIUM]: 50,
      [ThreatLevel.HIGH]: 10,
      [ThreatLevel.CRITICAL]: 1,
    },
    rateLimits: {
      login: { requests: 5, window: 300000 }, // 5次/5分钟
      api: { requests: 100, window: 60000 }, // 100次/分钟
      skill_use: { requests: 10, window: 60000 }, // 10次/分钟
    },
  };
  private rateLimitTracking: Map<
    string,
    Array<{ timestamp: number; count: number }>
  > = new Map();

  private constructor() {
    this.initializeThreatDetectionRules();
    this.startPeriodicCleanup();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): SecurityAuditService {
    if (!SecurityAuditService.instance) {
      SecurityAuditService.instance = new SecurityAuditService();
    }
    return SecurityAuditService.instance;
  }

  /**
   * 记录安全事件
   */
  public async recordSecurityEvent(
    type: SecurityEventType,
    details: {
      userId?: string;
      sessionId?: string;
      ipAddress?: string;
      userAgent?: string;
      description: string;
      metadata?: Record<string, any>;
      source?: string;
    }
  ): Promise<SecurityEvent> {
    try {
      const event: SecurityEvent = {
        id: this.generateEventId(),
        type,
        threatLevel: this.determineThreatLevel(type, details.metadata),
        userId: details.userId,
        sessionId: details.sessionId,
        ipAddress: details.ipAddress,
        userAgent: details.userAgent,
        timestamp: Date.now(),
        description: details.description,
        details: details.metadata || {},
        source: details.source || 'system',
        resolved: false,
        responseActions: [],
      };

      // 添加到事件列表
      this.events.push(event);

      // 维护内存中事件数量
      if (this.events.length > this.config.maxEventsInMemory) {
        this.events = this.events.slice(-this.config.maxEventsInMemory / 2);
      }

      // 实时威胁检测
      if (this.config.enableThreatDetection) {
        await this.performThreatDetection(event);
      }

      // 记录到日志
      this.logSecurityEvent(event);

      return event;
    } catch (error) {
      logger.error('记录安全事件失败', { type, details, error });
      throw error;
    }
  }

  /**
   * 检查速率限制
   */
  public checkRateLimit(
    key: string,
    identifier: string,
    customLimit?: { requests: number; window: number }
  ): { allowed: boolean; remaining: number; resetTime: number } {
    try {
      const limit = customLimit || this.config.rateLimits[key];
      if (!limit) {
        return { allowed: true, remaining: Infinity, resetTime: 0 };
      }

      const trackingKey = `${key}:${identifier}`;
      const now = Date.now();
      const windowStart = now - limit.window;

      // 获取或创建跟踪记录
      let tracking = this.rateLimitTracking.get(trackingKey) || [];

      // 清理过期记录
      tracking = tracking.filter(record => record.timestamp > windowStart);

      // 计算当前窗口内的请求数
      const currentRequests = tracking.reduce(
        (sum, record) => sum + record.count,
        0
      );

      // 检查是否超过限制
      const allowed = currentRequests < limit.requests;
      const remaining = Math.max(0, limit.requests - currentRequests);
      const resetTime =
        tracking.length > 0
          ? tracking[0].timestamp + limit.window
          : now + limit.window;

      if (allowed) {
        // 添加新的请求记录
        tracking.push({ timestamp: now, count: 1 });
        this.rateLimitTracking.set(trackingKey, tracking);
      } else {
        // 记录速率限制超出事件
        this.recordSecurityEvent(SecurityEventType.RATE_LIMIT_EXCEEDED, {
          description: `速率限制超出: ${key}`,
          metadata: {
            key,
            identifier,
            currentRequests,
            limit: limit.requests,
            window: limit.window,
          },
          source: 'rate_limiter',
        });
      }

      return { allowed, remaining, resetTime };
    } catch (error) {
      logger.error('检查速率限制失败', { key, identifier, error });
      return { allowed: true, remaining: 0, resetTime: 0 };
    }
  }

  /**
   * 验证输入安全性
   */
  public async validateInputSecurity(
    input: any,
    context: { userId?: string; source: string; type: string }
  ): Promise<{ safe: boolean; issues: string[]; sanitized?: any }> {
    try {
      const issues: string[] = [];

      // 使用增强的输入验证器
      const validationResult = enhancedInputValidator.validate(
        input,
        {},
        {
          enableSecurityChecks: true,
          enableSanitization: true,
          strictMode: true,
        }
      );

      // 检查验证结果
      if (!validationResult.isValid) {
        issues.push(...validationResult.errors.map(e => e.message));

        // 记录输入验证失败事件
        await this.recordSecurityEvent(
          SecurityEventType.INPUT_VALIDATION_FAILURE,
          {
            userId: context.userId,
            description: '输入验证失败',
            metadata: {
              inputType: context.type,
              source: context.source,
              errors: validationResult.errors,
              securityWarnings: validationResult.securityWarnings,
            },
            source: context.source,
          }
        );
      }

      // 检查安全警告
      if (validationResult.securityWarnings.length > 0) {
        issues.push(...validationResult.securityWarnings);

        // 记录恶意输入检测事件
        await this.recordSecurityEvent(
          SecurityEventType.MALICIOUS_INPUT_DETECTED,
          {
            userId: context.userId,
            description: '检测到恶意输入',
            metadata: {
              inputType: context.type,
              source: context.source,
              warnings: validationResult.securityWarnings,
              input:
                typeof input === 'string'
                  ? input.substring(0, 100)
                  : 'non-string',
            },
            source: context.source,
          }
        );
      }

      return {
        safe:
          validationResult.isValid &&
          validationResult.securityWarnings.length === 0,
        issues,
        sanitized: validationResult.sanitizedData,
      };
    } catch (error) {
      logger.error('输入安全验证失败', { context, error });
      return {
        safe: false,
        issues: ['输入安全验证系统错误'],
      };
    }
  }

  /**
   * 检查权限安全性
   */
  public async checkPermissionSecurity(
    permission: Permission,
    context: any,
    userId?: string
  ): Promise<{ granted: boolean; securityIssues: string[] }> {
    try {
      const securityIssues: string[] = [];

      // 使用增强的权限系统检查权限
      const permissionResult = await enhancedPermissionSystem.checkPermission(
        permission,
        {
          ...context,
          userId,
        }
      );

      // 记录权限检查事件
      const eventType = permissionResult.granted
        ? SecurityEventType.PERMISSION_GRANTED
        : SecurityEventType.PERMISSION_DENIED;

      await this.recordSecurityEvent(eventType, {
        userId,
        description: `权限检查: ${permission}`,
        metadata: {
          permission,
          granted: permissionResult.granted,
          reason: permissionResult.reason,
          context,
          checkDuration: permissionResult.checkDuration,
        },
        source: 'permission_system',
      });

      // 检查是否存在权限提升尝试
      if (
        !permissionResult.granted &&
        permissionResult.reason?.includes('角色')
      ) {
        securityIssues.push('检测到可能的权限提升尝试');

        await this.recordSecurityEvent(
          SecurityEventType.PRIVILEGE_ESCALATION_ATTEMPT,
          {
            userId,
            description: '权限提升尝试',
            metadata: {
              attemptedPermission: permission,
              userRole: permissionResult.requiredRole,
              context,
            },
            source: 'permission_system',
          }
        );
      }

      return {
        granted: permissionResult.granted,
        securityIssues,
      };
    } catch (error) {
      logger.error('权限安全检查失败', { permission, context, userId, error });
      return {
        granted: false,
        securityIssues: ['权限安全检查系统错误'],
      };
    }
  }

  /**
   * 获取安全统计
   */
  public getSecurityStats(timeRange?: {
    start: number;
    end: number;
  }): SecurityStats {
    try {
      let events = this.events;

      // 应用时间范围过滤
      if (timeRange) {
        events = events.filter(
          event =>
            event.timestamp >= timeRange.start &&
            event.timestamp <= timeRange.end
        );
      }

      // 按类型统计
      const eventsByType: Record<SecurityEventType, number> = {} as any;
      for (const type of Object.values(SecurityEventType)) {
        eventsByType[type] = events.filter(e => e.type === type).length;
      }

      // 按威胁级别统计
      const eventsByThreatLevel: Record<ThreatLevel, number> = {} as any;
      for (const level of Object.values(ThreatLevel)) {
        eventsByThreatLevel[level] = events.filter(
          e => e.threatLevel === level
        ).length;
      }

      // 获取最高威胁
      const topThreats = Object.entries(eventsByType)
        .map(([type, count]) => ({ type: type as SecurityEventType, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // 获取最近事件
      const recentEvents = events
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 50);

      // 生成威胁趋势（按天）
      const threatTrends = this.generateThreatTrends(events);

      return {
        totalEvents: events.length,
        eventsByType,
        eventsByThreatLevel,
        topThreats,
        recentEvents,
        threatTrends,
      };
    } catch (error) {
      logger.error('获取安全统计失败', error);
      throw error;
    }
  }

  /**
   * 初始化威胁检测规则
   */
  private initializeThreatDetectionRules(): void {
    const rules: ThreatDetectionRule[] = [
      {
        id: 'brute_force_login',
        name: '暴力破解登录检测',
        eventTypes: [SecurityEventType.LOGIN_FAILURE],
        condition: events => {
          const recentFailures = events.filter(
            e =>
              e.type === SecurityEventType.LOGIN_FAILURE &&
              Date.now() - e.timestamp < 300000 // 5分钟内
          );
          return recentFailures.length >= 5;
        },
        threatLevel: ThreatLevel.HIGH,
        description: '检测到暴力破解登录尝试',
        responseAction: async events => {
          const userIds = [
            ...new Set(events.map(e => e.userId).filter(Boolean)),
          ];
          logger.warn('暴力破解登录检测触发', {
            userIds,
            eventCount: events.length,
          });
          // 这里可以实现自动封禁等响应措施
        },
        enabled: true,
      },
      {
        id: 'multiple_permission_denials',
        name: '多次权限拒绝检测',
        eventTypes: [SecurityEventType.PERMISSION_DENIED],
        condition: events => {
          const recentDenials = events.filter(
            e =>
              e.type === SecurityEventType.PERMISSION_DENIED &&
              Date.now() - e.timestamp < 600000 // 10分钟内
          );
          return recentDenials.length >= 10;
        },
        threatLevel: ThreatLevel.MEDIUM,
        description: '检测到异常的权限访问模式',
        responseAction: async events => {
          const userIds = [
            ...new Set(events.map(e => e.userId).filter(Boolean)),
          ];
          logger.warn('多次权限拒绝检测触发', {
            userIds,
            eventCount: events.length,
          });
        },
        enabled: true,
      },
      {
        id: 'malicious_input_pattern',
        name: '恶意输入模式检测',
        eventTypes: [
          SecurityEventType.MALICIOUS_INPUT_DETECTED,
          SecurityEventType.XSS_ATTEMPT,
        ],
        condition: events => {
          const recentMalicious = events.filter(
            e =>
              (e.type === SecurityEventType.MALICIOUS_INPUT_DETECTED ||
                e.type === SecurityEventType.XSS_ATTEMPT) &&
              Date.now() - e.timestamp < 3600000 // 1小时内
          );
          return recentMalicious.length >= 3;
        },
        threatLevel: ThreatLevel.HIGH,
        description: '检测到持续的恶意输入攻击',
        responseAction: async events => {
          const ipAddresses = [
            ...new Set(events.map(e => e.ipAddress).filter(Boolean)),
          ];
          logger.error('恶意输入模式检测触发', {
            ipAddresses,
            eventCount: events.length,
          });
        },
        enabled: true,
      },
    ];

    rules.forEach(rule => {
      this.threatRules.set(rule.id, rule);
    });
  }

  /**
   * 执行威胁检测
   */
  private async performThreatDetection(newEvent: SecurityEvent): Promise<void> {
    try {
      for (const rule of this.threatRules.values()) {
        if (!rule.enabled || !rule.eventTypes.includes(newEvent.type)) {
          continue;
        }

        // 获取相关事件
        const relevantEvents = this.events.filter(
          event =>
            rule.eventTypes.includes(event.type) &&
            (!newEvent.userId || event.userId === newEvent.userId) &&
            (!newEvent.ipAddress || event.ipAddress === newEvent.ipAddress)
        );

        // 检查威胁条件
        if (rule.condition(relevantEvents)) {
          logger.warn(`威胁检测规则触发: ${rule.name}`, {
            ruleId: rule.id,
            eventCount: relevantEvents.length,
            threatLevel: rule.threatLevel,
          });

          // 记录威胁检测事件
          await this.recordSecurityEvent(
            SecurityEventType.SUSPICIOUS_ACTIVITY,
            {
              userId: newEvent.userId,
              ipAddress: newEvent.ipAddress,
              description: `威胁检测: ${rule.description}`,
              metadata: {
                ruleId: rule.id,
                ruleName: rule.name,
                triggerEventId: newEvent.id,
                relatedEventCount: relevantEvents.length,
              },
              source: 'threat_detection',
            }
          );

          // 执行响应动作
          if (this.config.enableAutoResponse) {
            try {
              await rule.responseAction(relevantEvents);
            } catch (error) {
              logger.error(`威胁响应动作执行失败: ${rule.name}`, error);
            }
          }
        }
      }
    } catch (error) {
      logger.error('威胁检测执行失败', { newEvent, error });
    }
  }

  /**
   * 确定威胁级别
   */
  private determineThreatLevel(
    type: SecurityEventType,
    metadata?: Record<string, any>
  ): ThreatLevel {
    const criticalEvents = [
      SecurityEventType.DATA_BREACH_ATTEMPT,
      SecurityEventType.PRIVILEGE_ESCALATION_ATTEMPT,
      SecurityEventType.SQL_INJECTION_ATTEMPT,
    ];

    const highEvents = [
      SecurityEventType.MALICIOUS_INPUT_DETECTED,
      SecurityEventType.XSS_ATTEMPT,
      SecurityEventType.BRUTE_FORCE_ATTEMPT,
      SecurityEventType.CHEATING_ATTEMPT,
    ];

    const mediumEvents = [
      SecurityEventType.PERMISSION_DENIED,
      SecurityEventType.INPUT_VALIDATION_FAILURE,
      SecurityEventType.RATE_LIMIT_EXCEEDED,
      SecurityEventType.SUSPICIOUS_ACTIVITY,
    ];

    if (criticalEvents.includes(type)) {
      return ThreatLevel.CRITICAL;
    } else if (highEvents.includes(type)) {
      return ThreatLevel.HIGH;
    } else if (mediumEvents.includes(type)) {
      return ThreatLevel.MEDIUM;
    } else {
      return ThreatLevel.LOW;
    }
  }

  /**
   * 生成威胁趋势
   */
  private generateThreatTrends(
    events: SecurityEvent[]
  ): Array<{ date: string; count: number; threatLevel: ThreatLevel }> {
    const trends: Array<{
      date: string;
      count: number;
      threatLevel: ThreatLevel;
    }> = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayStart = date.getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayEvents = events.filter(
        e => e.timestamp >= dayStart && e.timestamp < dayEnd
      );

      for (const level of Object.values(ThreatLevel)) {
        const count = dayEvents.filter(e => e.threatLevel === level).length;
        if (count > 0) {
          trends.push({ date: dateStr, count, threatLevel: level });
        }
      }
    }

    return trends;
  }

  /**
   * 记录安全事件到日志
   */
  private logSecurityEvent(event: SecurityEvent): void {
    const logLevel =
      event.threatLevel === ThreatLevel.CRITICAL ||
      event.threatLevel === ThreatLevel.HIGH
        ? 'error'
        : event.threatLevel === ThreatLevel.MEDIUM
          ? 'warn'
          : 'info';

    logger[logLevel]('安全事件', {
      eventId: event.id,
      type: event.type,
      threatLevel: event.threatLevel,
      userId: event.userId,
      description: event.description,
      source: event.source,
    });
  }

  /**
   * 生成事件ID
   */
  private generateEventId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 启动定期清理
   */
  private startPeriodicCleanup(): void {
    setInterval(
      () => {
        this.cleanupOldEvents();
        this.cleanupRateLimitTracking();
      },
      60 * 60 * 1000
    ); // 每小时清理一次
  }

  /**
   * 清理过期事件
   */
  private cleanupOldEvents(): void {
    const cutoffTime =
      Date.now() - this.config.eventRetentionDays * 24 * 60 * 60 * 1000;
    const beforeCount = this.events.length;
    this.events = this.events.filter(event => event.timestamp > cutoffTime);
    const afterCount = this.events.length;

    if (beforeCount !== afterCount) {
      logger.info('清理过期安全事件', {
        removed: beforeCount - afterCount,
        remaining: afterCount,
      });
    }
  }

  /**
   * 清理速率限制跟踪
   */
  private cleanupRateLimitTracking(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, tracking] of this.rateLimitTracking.entries()) {
      const filtered = tracking.filter(
        record => now - record.timestamp < 24 * 60 * 60 * 1000
      );
      if (filtered.length === 0) {
        this.rateLimitTracking.delete(key);
        cleanedCount++;
      } else if (filtered.length !== tracking.length) {
        this.rateLimitTracking.set(key, filtered);
      }
    }

    if (cleanedCount > 0) {
      logger.info('清理速率限制跟踪记录', { cleanedKeys: cleanedCount });
    }
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<SecurityConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('安全审计配置已更新', this.config);
  }

  /**
   * 获取配置
   */
  public getConfig(): SecurityConfig {
    return { ...this.config };
  }
}

// 导出单例实例
export const securityAuditService = SecurityAuditService.getInstance();

// 导出便捷方法
export const recordSecurityEvent = (type: SecurityEventType, details: any) => {
  return securityAuditService.recordSecurityEvent(type, details);
};

export const checkRateLimit = (
  key: string,
  identifier: string,
  customLimit?: any
) => {
  return securityAuditService.checkRateLimit(key, identifier, customLimit);
};

export const validateInputSecurity = (input: any, context: any) => {
  return securityAuditService.validateInputSecurity(input, context);
};

export const checkPermissionSecurity = (
  permission: Permission,
  context: any,
  userId?: string
) => {
  return securityAuditService.checkPermissionSecurity(
    permission,
    context,
    userId
  );
};
