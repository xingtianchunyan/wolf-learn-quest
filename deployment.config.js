/**
 * 生产环境部署配置文件
 * @fileoverview 配置生产环境的各种参数和优化设置
 * @author Wolf Learn Quest Team
 * @version 2.0
 */

/**
 * 部署环境配置接口
 * @interface DeploymentConfig
 */
interface DeploymentConfig {
  /** 环境名称 */
  environment: 'production' | 'staging' | 'development';
  /** 应用配置 */
  app: {
    /** 应用名称 */
    name: string;
    /** 应用版本 */
    version: string;
    /** 应用端口 */
    port: number;
  };
  /** 性能优化配置 */
  performance: {
    /** 启用缓存 */
    enableCaching: boolean;
    /** 缓存TTL（毫秒） */
    cacheTTL: number;
    /** 启用压缩 */
    enableCompression: boolean;
    /** 启用性能监控 */
    enablePerformanceMonitoring: boolean;
  };
  /** 安全配置 */
  security: {
    /** 启用HTTPS */
    enableHTTPS: boolean;
    /** 启用CSRF保护 */
    enableCSRFProtection: boolean;
    /** 启用XSS保护 */
    enableXSSProtection: boolean;
    /** 会话超时时间（毫秒） */
    sessionTimeout: number;
    /** 最大登录尝试次数 */
    maxLoginAttempts: number;
  };
  /** 错误处理配置 */
  errorHandling: {
    /** 启用错误日志 */
    enableErrorLogging: boolean;
    /** 启用用户通知 */
    enableUserNotification: boolean;
    /** 启用自动重试 */
    enableAutoRetry: boolean;
    /** 最大重试次数 */
    maxRetryAttempts: number;
  };
  /** 监控配置 */
  monitoring: {
    /** 启用实时监控 */
    enableRealTimeMonitoring: boolean;
    /** 启用健康检查 */
    enableHealthCheck: boolean;
    /** 健康检查间隔（毫秒） */
    healthCheckInterval: number;
    /** 启用指标收集 */
    enableMetricsCollection: boolean;
  };
}

/**
 * 生产环境配置
 * @type {DeploymentConfig}
 */
const productionConfig: DeploymentConfig = {
  environment: 'production',
  app: {
    name: 'Wolf Learn Quest',
    version: '2.0.0',
    port: 3000
  },
  performance: {
    enableCaching: true,
    cacheTTL: 300000, // 5分钟
    enableCompression: true,
    enablePerformanceMonitoring: true
  },
  security: {
    enableHTTPS: true,
    enableCSRFProtection: true,
    enableXSSProtection: true,
    sessionTimeout: 1800000, // 30分钟
    maxLoginAttempts: 5
  },
  errorHandling: {
    enableErrorLogging: true,
    enableUserNotification: true,
    enableAutoRetry: true,
    maxRetryAttempts: 3
  },
  monitoring: {
    enableRealTimeMonitoring: true,
    enableHealthCheck: true,
    healthCheckInterval: 30000, // 30秒
    enableMetricsCollection: true
  }
};

/**
 * 预发布环境配置
 * @type {DeploymentConfig}
 */
const stagingConfig: DeploymentConfig = {
  ...productionConfig,
  environment: 'staging',
  app: {
    ...productionConfig.app,
    port: 3001
  },
  security: {
    ...productionConfig.security,
    sessionTimeout: 900000, // 15分钟
    maxLoginAttempts: 10
  }
};

/**
 * 开发环境配置
 * @type {DeploymentConfig}
 */
const developmentConfig: DeploymentConfig = {
  ...productionConfig,
  environment: 'development',
  app: {
    ...productionConfig.app,
    port: 5173
  },
  performance: {
    ...productionConfig.performance,
    enableCaching: false,
    enablePerformanceMonitoring: false
  },
  security: {
    ...productionConfig.security,
    enableHTTPS: false,
    sessionTimeout: 3600000, // 1小时
    maxLoginAttempts: 100
  },
  monitoring: {
    ...productionConfig.monitoring,
    enableRealTimeMonitoring: false,
    healthCheckInterval: 60000 // 1分钟
  }
};

/**
 * 获取当前环境配置
 * @function getCurrentConfig
 * @returns {DeploymentConfig} 当前环境的配置
 */
function getCurrentConfig(): DeploymentConfig {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    case 'development':
    default:
      return developmentConfig;
  }
}

/**
 * 验证配置有效性
 * @function validateConfig
 * @param {DeploymentConfig} config - 要验证的配置
 * @returns {boolean} 配置是否有效
 */
function validateConfig(config: DeploymentConfig): boolean {
  try {
    // 验证必需字段
    if (!config.app.name || !config.app.version) {
      console.error('应用名称和版本是必需的');
      return false;
    }

    // 验证端口范围
    if (config.app.port < 1 || config.app.port > 65535) {
      console.error('端口号必须在1-65535范围内');
      return false;
    }

    // 验证超时时间
    if (config.security.sessionTimeout < 60000) {
      console.error('会话超时时间不能少于1分钟');
      return false;
    }

    // 验证重试次数
    if (config.errorHandling.maxRetryAttempts < 0 || config.errorHandling.maxRetryAttempts > 10) {
      console.error('最大重试次数必须在0-10范围内');
      return false;
    }

    return true;
  } catch (error) {
    console.error('配置验证失败:', error);
    return false;
  }
}

/**
 * 应用配置到环境变量
 * @function applyConfigToEnv
 * @param {DeploymentConfig} config - 要应用的配置
 */
function applyConfigToEnv(config: DeploymentConfig): void {
  // 设置环境变量
  process.env.APP_NAME = config.app.name;
  process.env.APP_VERSION = config.app.version;
  process.env.PORT = config.app.port.toString();
  
  // 性能配置
  process.env.ENABLE_CACHING = config.performance.enableCaching.toString();
  process.env.CACHE_TTL = config.performance.cacheTTL.toString();
  process.env.ENABLE_COMPRESSION = config.performance.enableCompression.toString();
  
  // 安全配置
  process.env.ENABLE_HTTPS = config.security.enableHTTPS.toString();
  process.env.SESSION_TIMEOUT = config.security.sessionTimeout.toString();
  process.env.MAX_LOGIN_ATTEMPTS = config.security.maxLoginAttempts.toString();
  
  // 错误处理配置
  process.env.ENABLE_ERROR_LOGGING = config.errorHandling.enableErrorLogging.toString();
  process.env.MAX_RETRY_ATTEMPTS = config.errorHandling.maxRetryAttempts.toString();
  
  // 监控配置
  process.env.ENABLE_MONITORING = config.monitoring.enableRealTimeMonitoring.toString();
  process.env.HEALTH_CHECK_INTERVAL = config.monitoring.healthCheckInterval.toString();
}

// 导出配置
module.exports = {
  productionConfig,
  stagingConfig,
  developmentConfig,
  getCurrentConfig,
  validateConfig,
  applyConfigToEnv
};

// 如果直接运行此文件，则应用当前环境配置
if (require.main === module) {
  const config = getCurrentConfig();
  
  if (validateConfig(config)) {
    applyConfigToEnv(config);
    console.log(`✅ ${config.environment} 环境配置已应用`);
    console.log(`📱 应用: ${config.app.name} v${config.app.version}`);
    console.log(`🚀 端口: ${config.app.port}`);
    console.log(`🔒 安全: ${config.security.enableHTTPS ? 'HTTPS' : 'HTTP'}`);
    console.log(`⚡ 缓存: ${config.performance.enableCaching ? '启用' : '禁用'}`);
    console.log(`📊 监控: ${config.monitoring.enableRealTimeMonitoring ? '启用' : '禁用'}`);
  } else {
    console.error('❌ 配置验证失败，请检查配置文件');
    process.exit(1);
  }
}