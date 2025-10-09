/**
 * 文件级注释：安全配置文件
 * 统一管理应用程序的安全设置和策略
 * 包括认证、权限、输入验证、请求限制等配置
 */

import { Permission } from '@/utils/enhancedPermissionSystem';
import { SecurityMiddlewareOptions } from '@/utils/securityMiddleware';

/**
 * 安全级别枚举
 */
export enum SecurityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * API端点安全配置接口
 */
export interface APISecurityConfig {
  path: string;
  methods: string[];
  securityLevel: SecurityLevel;
  requireAuth: boolean;
  requiredPermissions: Permission[];
  rateLimit: {
    maxRequests: number;
    windowMs: number;
  };
  enableCSRF: boolean;
  enableInputValidation: boolean;
  enableXSSProtection: boolean;
  enableSQLInjectionProtection: boolean;
  customRules?: string[];
}

/**
 * 全局安全配置
 */
export const SECURITY_CONFIG = {
  // 全局安全设置
  global: {
    enableSecurityHeaders: true,
    enableHTTPS: true,
    enableCORS: true,
    corsOrigins: ['http://localhost:3000', 'http://localhost:5173'],
    sessionTimeout: 3600000, // 1小时
    maxLoginAttempts: 5,
    lockoutDuration: 900000, // 15分钟
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    enableTwoFactor: false,
    showDetailedErrors: process.env.NODE_ENV !== 'production',
    enableSecurityLogging: true,
    regenerateSessionOnLogin: true
  },

  // 默认请求限制
  defaultRateLimit: {
    [SecurityLevel.LOW]: { maxRequests: 1000, windowMs: 60000 },
    [SecurityLevel.MEDIUM]: { maxRequests: 100, windowMs: 60000 },
    [SecurityLevel.HIGH]: { maxRequests: 20, windowMs: 60000 },
    [SecurityLevel.CRITICAL]: { maxRequests: 5, windowMs: 60000 }
  },

  // 输入验证规则
  inputValidation: {
    maxStringLength: 10000,
    maxArrayLength: 1000,
    maxObjectDepth: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt'],
    maxFileSize: 10485760, // 10MB
    enableSanitization: true,
    strictMode: true
  },

  // 数据保护配置
  dataProtection: {
    enableEncryption: true,
    sanitizeLogs: true,
    filterSensitiveFields: true,
    secureBackups: true,
    enableDataMasking: true,
    retentionPeriod: 2592000000, // 30天
    encryptionAlgorithm: 'aes-256-gcm',
    keyRotationInterval: 7776000000 // 90天
  },

  // 业务逻辑安全配置
  businessLogic: {
    enableStrictValidation: true,
    enableConcurrencyControl: true,
    validateWorkflow: true,
    enforceDataConsistency: true,
    enforceBusinessLimits: true,
    enableTransactionIntegrity: true,
    maxConcurrentOperations: 10,
    operationTimeout: 30000 // 30秒
  },

  // 安全头配置
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.siliconflow.cn wss: https:",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },

  // 监控和审计配置
  monitoring: {
    enableSecurityMonitoring: true,
    enableAuditLogging: true,
    enableThreatDetection: true,
    enableAnomalyDetection: true,
    logLevel: 'info' as 'debug' | 'info' | 'warn' | 'error',
    auditRetentionPeriod: 7776000000, // 90天
    alertThresholds: {
      failedLogins: 5,
      suspiciousActivity: 10,
      dataAccess: 100
    },
    realTimeAlerts: true,
    alertChannels: ['log', 'email']
  },

  // 加密配置
  encryption: {
    enableTransitEncryption: true,
    enableAtRestEncryption: true,
    algorithm: 'aes-256-gcm',
    keyLength: 256,
    enableKeyRotation: true,
    keyRotationInterval: 7776000000, // 90天
    enableHSM: false,
    enablePerfectForwardSecrecy: true
  },

  // 认证配置
  authentication: {
    enableMultiFactor: false,
    enableBiometric: false,
    enableSSO: false,
    sessionManagement: {
      enableSecureCookies: true,
      enableHttpOnly: true,
      enableSameSite: true,
      cookieSecure: true,
      sessionIdLength: 32,
      enableSessionFixationProtection: true
    },
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 5,
      maxAge: 7776000000 // 90天
    }
  },

  // 授权配置
  authorization: {
    enableRBAC: true,
    enableABAC: false,
    enableDynamicPermissions: true,
    enablePermissionCaching: true,
    permissionCacheTTL: 300000, // 5分钟
    enableAuditTrail: true,
    enablePrivilegeEscalationDetection: true
  }
};

/**
 * API端点安全配置
 */
export const API_SECURITY_CONFIGS: APISecurityConfig[] = [
  // 认证相关端点
  {
    path: '/api/auth/login',
    methods: ['POST'],
    securityLevel: SecurityLevel.HIGH,
    requireAuth: false,
    requiredPermissions: [],
    rateLimit: { maxRequests: 5, windowMs: 300000 }, // 5次/5分钟
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },
  {
    path: '/api/auth/register',
    methods: ['POST'],
    securityLevel: SecurityLevel.HIGH,
    requireAuth: false,
    requiredPermissions: [],
    rateLimit: { maxRequests: 3, windowMs: 3600000 }, // 3次/小时
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },
  {
    path: '/api/auth/logout',
    methods: ['POST'],
    securityLevel: SecurityLevel.MEDIUM,
    requireAuth: true,
    requiredPermissions: [],
    rateLimit: { maxRequests: 10, windowMs: 60000 },
    enableCSRF: true,
    enableInputValidation: false,
    enableXSSProtection: false,
    enableSQLInjectionProtection: false
  },

  // 游戏相关端点
  {
    path: '/api/game/create',
    methods: ['POST'],
    securityLevel: SecurityLevel.MEDIUM,
    requireAuth: true,
    requiredPermissions: [Permission.CREATE_GAME],
    rateLimit: { maxRequests: 10, windowMs: 300000 }, // 10次/5分钟
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },
  {
    path: '/api/game/join',
    methods: ['POST'],
    securityLevel: SecurityLevel.MEDIUM,
    requireAuth: true,
    requiredPermissions: [Permission.JOIN_GAME],
    rateLimit: { maxRequests: 20, windowMs: 60000 },
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },
  {
    path: '/api/game/vote',
    methods: ['POST'],
    securityLevel: SecurityLevel.HIGH,
    requireAuth: true,
    requiredPermissions: [Permission.VOTE],
    rateLimit: { maxRequests: 10, windowMs: 60000 },
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },
  {
    path: '/api/game/skill',
    methods: ['POST'],
    securityLevel: SecurityLevel.HIGH,
    requireAuth: true,
    requiredPermissions: [Permission.USE_SKILL],
    rateLimit: { maxRequests: 5, windowMs: 60000 },
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },

  // 聊天相关端点
  {
    path: '/api/chat/send',
    methods: ['POST'],
    securityLevel: SecurityLevel.MEDIUM,
    requireAuth: true,
    requiredPermissions: [Permission.CHAT],
    rateLimit: { maxRequests: 60, windowMs: 60000 }, // 60次/分钟
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },

  // 管理员端点
  {
    path: '/api/admin/*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    securityLevel: SecurityLevel.CRITICAL,
    requireAuth: true,
    requiredPermissions: [Permission.ADMIN_PANEL],
    rateLimit: { maxRequests: 100, windowMs: 60000 },
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },

  // 文件上传端点
  {
    path: '/api/upload/*',
    methods: ['POST'],
    securityLevel: SecurityLevel.HIGH,
    requireAuth: true,
    requiredPermissions: [Permission.UPLOAD_FILE],
    rateLimit: { maxRequests: 10, windowMs: 300000 }, // 10次/5分钟
    enableCSRF: true,
    enableInputValidation: true,
    enableXSSProtection: true,
    enableSQLInjectionProtection: true
  },

  // 公开端点
  {
    path: '/api/public/*',
    methods: ['GET'],
    securityLevel: SecurityLevel.LOW,
    requireAuth: false,
    requiredPermissions: [],
    rateLimit: { maxRequests: 1000, windowMs: 60000 },
    enableCSRF: false,
    enableInputValidation: false,
    enableXSSProtection: false,
    enableSQLInjectionProtection: false
  }
];

/**
 * 获取API端点的安全配置
 */
export function getAPISecurityConfig(path: string, method: string): SecurityMiddlewareOptions {
  // 查找匹配的配置
  const config = API_SECURITY_CONFIGS.find(config => {
    const pathMatches = config.path.endsWith('*') 
      ? path.startsWith(config.path.slice(0, -1))
      : config.path === path;
    const methodMatches = config.methods.includes(method.toUpperCase());
    return pathMatches && methodMatches;
  });

  if (!config) {
    // 默认安全配置
    return {
      requireAuth: true,
      requiredPermissions: [],
      enableRateLimit: true,
      rateLimitConfig: SECURITY_CONFIG.defaultRateLimit[SecurityLevel.MEDIUM],
      enableInputValidation: true,
      enableCSRFProtection: true,
      enableXSSProtection: true,
      enableSQLInjectionProtection: true
    };
  }

  return {
    requireAuth: config.requireAuth,
    requiredPermissions: config.requiredPermissions,
    enableRateLimit: true,
    rateLimitConfig: config.rateLimit,
    enableInputValidation: config.enableInputValidation,
    enableCSRFProtection: config.enableCSRF,
    enableXSSProtection: config.enableXSSProtection,
    enableSQLInjectionProtection: config.enableSQLInjectionProtection
  };
}

/**
 * 获取安全级别对应的默认配置
 */
export function getSecurityLevelConfig(level: SecurityLevel): SecurityMiddlewareOptions {
  const baseConfig = {
    requireAuth: level !== SecurityLevel.LOW,
    requiredPermissions: [],
    enableRateLimit: true,
    rateLimitConfig: SECURITY_CONFIG.defaultRateLimit[level],
    enableInputValidation: level !== SecurityLevel.LOW,
    enableCSRFProtection: level === SecurityLevel.HIGH || level === SecurityLevel.CRITICAL,
    enableXSSProtection: level !== SecurityLevel.LOW,
    enableSQLInjectionProtection: level !== SecurityLevel.LOW
  };

  return baseConfig;
}

/**
 * 验证密码强度
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // 长度检查
  if (password.length < SECURITY_CONFIG.global.passwordMinLength) {
    feedback.push(`密码长度至少需要${SECURITY_CONFIG.global.passwordMinLength}个字符`);
  } else {
    score += 1;
  }

  // 包含大写字母
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('密码应包含大写字母');
  }

  // 包含小写字母
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('密码应包含小写字母');
  }

  // 包含数字
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('密码应包含数字');
  }

  // 包含特殊字符
  if (SECURITY_CONFIG.global.passwordRequireSpecialChars) {
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      feedback.push('密码应包含特殊字符');
    }
  }

  // 避免常见密码
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    feedback.push('请避免使用常见密码');
    score = Math.max(0, score - 2);
  }

  return {
    valid: score >= 3 && feedback.length === 0,
    score,
    feedback
  };
}

/**
 * 生成安全的随机字符串
 */
export function generateSecureRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  
  return result;
}

/**
 * 检查是否为安全的URL
 */
export function isSecureURL(url: string): boolean {
  try {
    const parsedURL = new URL(url);
    
    // 只允许HTTPS和HTTP协议
    if (!['https:', 'http:'].includes(parsedURL.protocol)) {
      return false;
    }
    
    // 检查是否为允许的域名
    const allowedDomains = [
      'localhost',
      '127.0.0.1',
      'api.siliconflow.cn'
    ];
    
    const hostname = parsedURL.hostname;
    const isAllowed = allowedDomains.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    return isAllowed;
  } catch {
    return false;
  }
}

/**
 * 导出安全配置常量
 */
export const SECURITY_CONSTANTS = {
  MAX_LOGIN_ATTEMPTS: SECURITY_CONFIG.global.maxLoginAttempts,
  LOCKOUT_DURATION: SECURITY_CONFIG.global.lockoutDuration,
  SESSION_TIMEOUT: SECURITY_CONFIG.global.sessionTimeout,
  PASSWORD_MIN_LENGTH: SECURITY_CONFIG.global.passwordMinLength,
  MAX_FILE_SIZE: SECURITY_CONFIG.inputValidation.maxFileSize,
  ALLOWED_FILE_TYPES: SECURITY_CONFIG.inputValidation.allowedFileTypes,
  CORS_ORIGINS: SECURITY_CONFIG.global.corsOrigins,
  SECURITY_HEADERS: SECURITY_CONFIG.securityHeaders
} as const;