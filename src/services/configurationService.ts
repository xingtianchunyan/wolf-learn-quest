import { createLogger  } from '@/lib/logger';

/**
* 配置管理专用服务类
* 提供统一的应用配置管理、环境变量处理和配置验证功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('configuration-service');

/**
* 配置类型枚举
 */
export enum ConfigurationType { APP = 'app',
  DATABASE = 'database',
  API = 'api',
  UI = 'ui',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  LOGGING = 'logging',
  CACHE = 'cache',
  WEBSOCKET = 'websocket',
  GAME = 'game';,
}

/**
* 配置环境枚举
 */
export enum ConfigurationEnvironment { DEVELOPMENT = 'development',
  TESTING = 'testing',
  STAGING = 'staging',
  PRODUCTION = 'production';,
}

/**
* 配置项接口
 */
export interface ConfigurationItem { key: string;
  value: any;
  type: ConfigurationType;
  environment: ConfigurationEnvironment;
  description?: string;
  required?: boolean;
  sensitive?: boolean;
  validation?: {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'url' | 'email';
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];,
};
  defaultValue?: any;
  lastModified?: Date;
  modifiedBy?: string;,
}

/**
* 配置模式接口
 */
export interface ConfigurationSchema { [key: string]: {
    type: ConfigurationType;
    required: boolean;
    description: string;
    validation?: ConfigurationItem['validation'];
    defaultValue?: any;
    sensitive?: boolean;,
};,
}

/**
* 配置验证结果接口
 */
export interface ConfigurationValidationResult { isValid: boolean;
  errors: Array<{
    key: string;
    message: string;
    severity: 'error' | 'warning';,
}>;
  warnings: Array<{ key: string;
    message: string;,
}>;,
}

/**
* 配置更新事件接口
 */
export interface ConfigurationUpdateEvent { key: string;
  oldValue: any;
  newValue: any;
  type: ConfigurationType;
  environment: ConfigurationEnvironment;
  timestamp: Date;
  source: 'api' | 'file' | 'env' | 'default';,
}

/**
* 配置管理专用服务类
* 提供全面的配置管理功能
 */
export class ConfigurationService { private static instance: ConfigurationService;
  private readonly logger = createLogger('configuration-service');

  private configurations: Map<string, ConfigurationItem> = new Map();
  private schemas: Map<ConfigurationType, ConfigurationSchema> = new Map();
  private listeners: Map<string, Array<(event: ConfigurationUpdateEvent) => void>> = new Map();
  private currentEnvironment: ConfigurationEnvironment;

  private constructor() {
    this.currentEnvironment = this.detectEnvironment();
    this.initializeDefaultSchemas();
    this.loadConfigurations();,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): ConfigurationService { if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();,
}
    return ConfigurationService.instance;,
}

  /**
  * 检测当前环境
   */
  private detectEnvironment(): ConfigurationEnvironment { const nodeEnv = process.env.NODE_ENV?.toLowerCase();

    switch (nodeEnv) {
      case 'production':
      return ConfigurationEnvironment.PRODUCTION;
      case 'staging':
      return ConfigurationEnvironment.STAGING;
      case 'test':
      case 'testing':
      return ConfigurationEnvironment.TESTING;
      default:
      return ConfigurationEnvironment.DEVELOPMENT;,
}
  }

  /**
  * 初始化默认配置模式
   */
  private initializeDefaultSchemas(): void { // 应用配置模式
    this.schemas.set(ConfigurationType.APP, {
      'app.name': {
        type: ConfigurationType.APP,
        required: true,
        description: '应用名称',
        validation: { type: 'string', min: 1, max: 100  },
        defaultValue: 'Wolf Learn Quest',
},
      'app.version': { type: ConfigurationType.APP,
        required: true,
        description: '应用版本',
        validation: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$'  },
        defaultValue: '1.0.0',
},
      'app.debug': { type: ConfigurationType.APP,
        required: false,
        description: '调试模式',
        validation: { type: 'boolean'  },
        defaultValue: false,
},
      'app.locale': { type: ConfigurationType.APP,
        required: false,
        description: '默认语言',
        validation: { type: 'string', enum: ['zh-CN', 'en-US']  },
        defaultValue: 'zh-CN',
}
    });

    // 数据库配置模式
    this.schemas.set(ConfigurationType.DATABASE, { 'database.url': {
        type: ConfigurationType.DATABASE,
        required: true,
        description: 'Supabase数据库URL',
        validation: { type: 'url'  },
        sensitive: true,
},
      'database.anon_key': { type: ConfigurationType.DATABASE,
        required: true,
        description: 'Supabase匿名密钥',
        validation: { type: 'string', min: 10  },
        sensitive: true,
},
      'database.service_role_key': { type: ConfigurationType.DATABASE,
        required: false,
        description: 'Supabase服务角色密钥',
        validation: { type: 'string', min: 10  },
        sensitive: true,
},
      'database.connection_timeout': { type: ConfigurationType.DATABASE,
        required: false,
        description: '数据库连接超时时间（毫秒）',
        validation: { type: 'number', min: 1000, max: 30000  },
        defaultValue: 10000,
}
    });

    // API配置模式
    this.schemas.set(ConfigurationType.API, { 'api.base_url': {
        type: ConfigurationType.API,
        required: true,
        description: 'API基础URL',
        validation: { type: 'url'  },
        defaultValue: '/api',
},
      'api.timeout': { type: ConfigurationType.API,
        required: false,
        description: 'API请求超时时间（毫秒）',
        validation: { type: 'number', min: 1000, max: 60000  },
        defaultValue: 15000,
},
      'api.retry_attempts': { type: ConfigurationType.API,
        required: false,
        description: 'API重试次数',
        validation: { type: 'number', min: 0, max: 5  },
        defaultValue: 3,
},
      'api.rate_limit': { type: ConfigurationType.API,
        required: false,
        description: 'API速率限制（请求/分钟）',
        validation: { type: 'number', min: 1, max: 1000  },
        defaultValue: 100,
}
    });

    // UI配置模式
    this.schemas.set(ConfigurationType.UI, { 'ui.theme': {
        type: ConfigurationType.UI,
        required: false,
        description: '界面主题',
        validation: { type: 'string', enum: ['light', 'dark', 'auto']  },
        defaultValue: 'auto',
},
      'ui.animation_enabled': { type: ConfigurationType.UI,
        required: false,
        description: '启用动画效果',
        validation: { type: 'boolean'  },
        defaultValue: true,
},
      'ui.page_size': { type: ConfigurationType.UI,
        required: false,
        description: '分页大小',
        validation: { type: 'number', min: 5, max: 100  },
        defaultValue: 20,
},
      'ui.auto_save_interval': { type: ConfigurationType.UI,
        required: false,
        description: '自动保存间隔（秒）',
        validation: { type: 'number', min: 10, max: 300  },
        defaultValue: 30,
}
    });

    // 性能配置模式
    this.schemas.set(ConfigurationType.PERFORMANCE, { 'performance.monitoring_enabled': {
        type: ConfigurationType.PERFORMANCE,
        required: false,
        description: '启用性能监控',
        validation: { type: 'boolean'  },
        defaultValue: true,
},
      'performance.sample_rate': { type: ConfigurationType.PERFORMANCE,
        required: false,
        description: '性能监控采样率',
        validation: { type: 'number', min: 0, max: 1  },
        defaultValue: 0.1,
},
      'performance.cache_size': { type: ConfigurationType.PERFORMANCE,
        required: false,
        description: '缓存大小（MB）',
        validation: { type: 'number', min: 1, max: 1000  },
        defaultValue: 50,
},
      'performance.lazy_loading': { type: ConfigurationType.PERFORMANCE,
        required: false,
        description: '启用懒加载',
        validation: { type: 'boolean'  },
        defaultValue: true,
}
    });

    // 安全配置模式
    this.schemas.set(ConfigurationType.SECURITY, { 'security.session_timeout': {
        type: ConfigurationType.SECURITY,
        required: false,
        description: '会话超时时间（分钟）',
        validation: { type: 'number', min: 5, max: 1440  },
        defaultValue: 60,
},
      'security.max_login_attempts': { type: ConfigurationType.SECURITY,
        required: false,
        description: '最大登录尝试次数',
        validation: { type: 'number', min: 3, max: 10  },
        defaultValue: 5,
},
      'security.password_min_length': { type: ConfigurationType.SECURITY,
        required: false,
        description: '密码最小长度',
        validation: { type: 'number', min: 6, max: 50  },
        defaultValue: 8,
},
      'security.enable_2fa': { type: ConfigurationType.SECURITY,
        required: false,
        description: '启用双因素认证',
        validation: { type: 'boolean'  },
        defaultValue: false,
}
    });

    // 日志配置模式
    this.schemas.set(ConfigurationType.LOGGING, { 'logging.level': {
        type: ConfigurationType.LOGGING,
        required: false,
        description: '日志级别',
        validation: { type: 'string', enum: ['debug', 'info', 'warn', 'error']  },
        defaultValue: 'info',
},
      'logging.console_enabled': { type: ConfigurationType.LOGGING,
        required: false,
        description: '启用控制台日志',
        validation: { type: 'boolean'  },
        defaultValue: true,
},
      'logging.file_enabled': { type: ConfigurationType.LOGGING,
        required: false,
        description: '启用文件日志',
        validation: { type: 'boolean'  },
        defaultValue: false,
},
      'logging.max_file_size': { type: ConfigurationType.LOGGING,
        required: false,
        description: '日志文件最大大小（MB）',
        validation: { type: 'number', min: 1, max: 100  },
        defaultValue: 10,
}
    });

    // 缓存配置模式
    this.schemas.set(ConfigurationType.CACHE, { 'cache.enabled': {
        type: ConfigurationType.CACHE,
        required: false,
        description: '启用缓存',
        validation: { type: 'boolean'  },
        defaultValue: true,
},
      'cache.ttl': { type: ConfigurationType.CACHE,
        required: false,
        description: '缓存生存时间（秒）',
        validation: { type: 'number', min: 60, max: 86400  },
        defaultValue: 3600,
},
      'cache.max_size': { type: ConfigurationType.CACHE,
        required: false,
        description: '缓存最大条目数',
        validation: { type: 'number', min: 100, max: 10000  },
        defaultValue: 1000,
},
      'cache.compression': { type: ConfigurationType.CACHE,
        required: false,
        description: '启用缓存压缩',
        validation: { type: 'boolean'  },
        defaultValue: false,
}
    });

    // WebSocket配置模式
    this.schemas.set(ConfigurationType.WEBSOCKET, { 'websocket.url': {
        type: ConfigurationType.WEBSOCKET,
        required: true,
        description: 'WebSocket服务器URL',
        validation: { type: 'url'  },
},
      'websocket.reconnect_interval': { type: ConfigurationType.WEBSOCKET,
        required: false,
        description: '重连间隔（毫秒）',
        validation: { type: 'number', min: 1000, max: 30000  },
        defaultValue: 5000,
},
      'websocket.max_reconnect_attempts': { type: ConfigurationType.WEBSOCKET,
        required: false,
        description: '最大重连次数',
        validation: { type: 'number', min: 1, max: 20  },
        defaultValue: 10,
},
      'websocket.heartbeat_interval': { type: ConfigurationType.WEBSOCKET,
        required: false,
        description: '心跳间隔（秒）',
        validation: { type: 'number', min: 10, max: 300  },
        defaultValue: 30,
}
    });

    // 游戏配置模式
    this.schemas.set(ConfigurationType.GAME, { 'game.max_players': {
        type: ConfigurationType.GAME,
        required: false,
        description: '最大玩家数',
        validation: { type: 'number', min: 4, max: 20  },
        defaultValue: 12,
},
      'game.min_players': { type: ConfigurationType.GAME,
        required: false,
        description: '最小玩家数',
        validation: { type: 'number', min: 4, max: 10  },
        defaultValue: 6,
},
      'game.day_duration': { type: ConfigurationType.GAME,
        required: false,
        description: '白天阶段时长（秒）',
        validation: { type: 'number', min: 60, max: 600  },
        defaultValue: 300,
},
      'game.night_duration': { type: ConfigurationType.GAME,
        required: false,
        description: '夜晚阶段时长（秒）',
        validation: { type: 'number', min: 30, max: 300  },
        defaultValue: 120,
},
      'game.voting_duration': { type: ConfigurationType.GAME,
        required: false,
        description: '投票阶段时长（秒）',
        validation: { type: 'number', min: 30, max: 180  },
        defaultValue: 90,
},
      'game.auto_start': { type: ConfigurationType.GAME,
        required: false,
        description: '自动开始游戏',
        validation: { type: 'boolean'  },
        defaultValue: false,
}
    });

    this.logger.info('默认配置模式已初始化', { schemaCount: this.schemas.size,
});,
}

  /**
  * 加载配置
   */
  private loadConfigurations(): void { try {
      // 从环境变量加载配置
      this.loadFromEnvironmentVariables();

      // 从默认值加载配置
      this.loadDefaultValues();

      // 验证配置
      const validationResult = this.validateAllConfigurations();
      if (!validationResult.isValid) {
        this.logger.warn('配置验证发现问题', {
          errors: validationResult.errors,
          warnings: validationResult.warnings,
});,
}

      this.logger.info('配置加载完成', { configCount: this.configurations.size,
        environment: this.currentEnvironment,
});,
} catch (error) { this.logger.error('配置加载失败', { error  });,
}
  }

  /**
  * 从环境变量加载配置
   */
  private loadFromEnvironmentVariables(): void { const envMappings: Record<string, string> = {
      // 应用配置
      'VITE_APP_NAME': 'app.name',
      'VITE_APP_VERSION': 'app.version',
      'VITE_APP_DEBUG': 'app.debug',
      'VITE_APP_LOCALE': 'app.locale',

      // 数据库配置
      'VITE_SUPABASE_URL': 'database.url',
      'VITE_SUPABASE_ANON_KEY': 'database.anon_key',
      'SUPABASE_SERVICE_ROLE_KEY': 'database.service_role_key',
      'DATABASE_CONNECTION_TIMEOUT': 'database.connection_timeout',

      // API配置
      'VITE_API_BASE_URL': 'api.base_url',
      'API_TIMEOUT': 'api.timeout',
      'API_RETRY_ATTEMPTS': 'api.retry_attempts',
      'API_RATE_LIMIT': 'api.rate_limit',

      // WebSocket配置
      'VITE_WEBSOCKET_URL': 'websocket.url',
      'WEBSOCKET_RECONNECT_INTERVAL': 'websocket.reconnect_interval',
      'WEBSOCKET_MAX_RECONNECT_ATTEMPTS': 'websocket.max_reconnect_attempts',
      'WEBSOCKET_HEARTBEAT_INTERVAL': 'websocket.heartbeat_interval',
};

    for (const [envKey, configKey] of Object.entries(envMappings)) { const envValue = process.env[envKey];
      if (envValue !== undefined) {
        const schema = this.findSchemaForKey(configKey);
        if (schema) {
          const parsedValue = this.parseEnvironmentValue(envValue, schema.validation?.type || 'string');
          this.setConfiguration(configKey, parsedValue, 'env');,
}
      },
}
  }

  /**
  * 解析环境变量值
  *
  * @param value - 环境变量值
  * @param type - 期望的类型
  * @returns 解析后的值
   */
  private parseEnvironmentValue(value: string, type: string): any { switch (type) {
      case 'boolean':
      return value.toLowerCase() === 'true';
      case 'number':
      return Number(value);
      case 'array':
      try {
        return JSON.parse(value);,
} catch { return value.split(',').map(v => v.trim());,
}
      case 'object':
      try { return JSON.parse(value);,
} catch { return value;,
}
      default:
      return value;,
}
  }

  /**
  * 加载默认值
   */
  private loadDefaultValues(): void { for (const [type, schema] of this.schemas.entries()) {
      for (const [key, config] of Object.entries(schema)) {
        if (!this.configurations.has(key) && config.defaultValue !== undefined) {
          this.setConfiguration(key, config.defaultValue, 'default');,
}
      },
}
  }

  /**
  * 查找配置键对应的模式
  *
  * @param key - 配置键
  * @returns 模式配置
   */
  private findSchemaForKey(key: string): ConfigurationSchema[string] | null { for (const [type, schema] of this.schemas.entries()) {
      if (schema[key]) {
        return schema[key];,
}
    }
    return null;,
}

  /**
  * 设置配置
  *
  * @param key - 配置键
  * @param value - 配置值
  * @param source - 配置来源
   */
  private setConfiguration(key: string, value: any, source: 'api' | 'file' | 'env' | 'default'): void { const schema = this.findSchemaForKey(key);
    if (!schema) {
      this.logger.warn('未找到配置键的模式定义', { key  });
      return;,
}

    const oldValue = this.configurations.get(key)?.value;

    const configItem: ConfigurationItem = { key,
      value,
      type: schema.type,
      environment: this.currentEnvironment,
      description: schema.description,
      required: schema.required,
      sensitive: schema.sensitive,
      validation: schema.validation,
      defaultValue: schema.defaultValue,
      lastModified: new Date(),
      modifiedBy: source,
};

    this.configurations.set(key, configItem);

    // 触发更新事件
    if (oldValue !== value) { const event: ConfigurationUpdateEvent = {
        key,
        oldValue,
        newValue: value,
        type: schema.type,
        environment: this.currentEnvironment,
        timestamp: new Date(),
        source,
};

      this.emitConfigurationUpdate(event);,
}
  }

  /**
  * 获取配置值
  *
  * @param key - 配置键
  * @param defaultValue - 默认值
  * @returns 配置值
   */
  public get<T = any>(key: string, defaultValue?: T): T { const config = this.configurations.get(key);
    if (config) {
      return config.value as T;,
}

    if (defaultValue !== undefined) { return defaultValue;,
}

    const schema = this.findSchemaForKey(key);
    if (schema?.defaultValue !== undefined) { return schema.defaultValue as T;,
}

    throw new Error(`配置键 '${ key }' 未找到且无默认值`);,
}

  /**
  * 设置配置值
  *
  * @param key - 配置键
  * @param value - 配置值
  * @returns 是否设置成功
   */
  public set(key: string, value: any): boolean { try {
      // 验证配置值
      const validationResult = this.validateConfiguration(key, value);
      if (!validationResult.isValid) {
        this.logger.error('配置值验证失败', {
          key,
          value,
          errors: validationResult.errors,
});
        return false;,
}

      this.setConfiguration(key, value, 'api');
      return true;,
} catch (error) { this.logger.error('设置配置失败', { error, key, value  });
      return false;,
}
  }

  /**
  * 批量设置配置
  *
  * @param configs - 配置对象
  * @returns 设置结果
   */
  public setBatch(configs: Record<string, any>): { success: string[];
    failed: Array<{ key: string; error: string  }>;,
} { const result = {
      success: [] as string[],
      failed: [] as Array<{ key: string; error: string  }>,
};

    for (const [key, value] of Object.entries(configs)) { try {
        if (this.set(key, value)) {
          result.success.push(key);,
} else { result.failed.push({ key, error: '配置验证失败'  });,
}
      } catch (error) { result.failed.push({
          key,
          error: error instanceof Error ? error.message : '未知错误',
});,
}
    }

    return result;,
}

  /**
  * 验证单个配置
  *
  * @param key - 配置键
  * @param value - 配置值
  * @returns 验证结果
   */
  public validateConfiguration(key: string, value: any): ConfigurationValidationResult { const result: ConfigurationValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
};

    const schema = this.findSchemaForKey(key);
    if (!schema) { result.isValid = false;
      result.errors.push({
        key,
        message: '未找到配置键的模式定义',
        severity: 'error',
});
      return result;,
}

    // 检查必需性
    if (schema.required && (value === undefined || value === null || value === '')) { result.isValid = false;
      result.errors.push({
        key,
        message: '该配置项为必需项',
        severity: 'error',
});
      return result;,
}

    // 类型验证
    if (value !== undefined && value !== null && schema.validation) { const validation = schema.validation;

      switch (validation.type) {
        case 'string':
        if (typeof value !== 'string') {
          result.isValid = false;
          result.errors.push({
            key,
            message: '配置值必须为字符串类型',
            severity: 'error',
});,
} else { if (validation.min && value.length < validation.min) {
            result.isValid = false;
            result.errors.push({
              key,
              message: `字符串长度不能少于${validation.min }个字符`,
              severity: 'error',
});,
}
          if (validation.max && value.length > validation.max) { result.isValid = false;
            result.errors.push({
              key,
              message: `字符串长度不能超过${validation.max }个字符`,
              severity: 'error',
});,
}
          if (validation.pattern && !new RegExp(validation.pattern).test(value)) { result.isValid = false;
            result.errors.push({
              key,
              message: '字符串格式不符合要求',
              severity: 'error',
});,
}
          if (validation.enum && !validation.enum.includes(value)) { result.isValid = false;
            result.errors.push({
              key,
              message: `配置值必须为以下值之一：${validation.enum.join(', ') }`,
              severity: 'error',
});,
}
        }
        break;

        case 'number':
        if (typeof value !== 'number' || isNaN(value)) { result.isValid = false;
          result.errors.push({
            key,
            message: '配置值必须为数字类型',
            severity: 'error',
});,
} else { if (validation.min !== undefined && value < validation.min) {
            result.isValid = false;
            result.errors.push({
              key,
              message: `数值不能小于${validation.min }`,
              severity: 'error',
});,
}
          if (validation.max !== undefined && value > validation.max) { result.isValid = false;
            result.errors.push({
              key,
              message: `数值不能大于${validation.max }`,
              severity: 'error',
});,
}
        }
        break;

        case 'boolean':
        if (typeof value !== 'boolean') { result.isValid = false;
          result.errors.push({
            key,
            message: '配置值必须为布尔类型',
            severity: 'error',
});,
}
        break;

        case 'array':
        if (!Array.isArray(value)) { result.isValid = false;
          result.errors.push({
            key,
            message: '配置值必须为数组类型',
            severity: 'error',
});,
}
        break;

        case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) { result.isValid = false;
          result.errors.push({
            key,
            message: '配置值必须为对象类型',
            severity: 'error',
});,
}
        break;

        case 'url':
        if (typeof value !== 'string') { result.isValid = false;
          result.errors.push({
            key,
            message: 'URL必须为字符串类型',
            severity: 'error',
});,
} else { try {
            new URL(value);,
} catch { result.isValid = false;
            result.errors.push({
              key,
              message: 'URL格式不正确',
              severity: 'error',
});,
}
        }
        break;

        case 'email':
        if (typeof value !== 'string') { result.isValid = false;
          result.errors.push({
            key,
            message: '邮箱地址必须为字符串类型',
            severity: 'error',
});,
} else { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            result.isValid = false;
            result.errors.push({
              key,
              message: '邮箱地址格式不正确',
              severity: 'error',
});,
}
        }
        break;,
}
    }

    return result;,
}

  /**
  * 验证所有配置
  *
  * @returns 验证结果
   */
  public validateAllConfigurations(): ConfigurationValidationResult { const result: ConfigurationValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
};

    for (const [key, config] of this.configurations.entries()) { const validationResult = this.validateConfiguration(key, config.value);

      if (!validationResult.isValid) {
        result.isValid = false;
        result.errors.push(...validationResult.errors);,
}

      result.warnings.push(...validationResult.warnings);,
}

    return result;,
}

  /**
  * 获取配置类型的所有配置
  *
  * @param type - 配置类型
  * @returns 配置列表
   */
  public getConfigurationsByType(type: ConfigurationType): ConfigurationItem[] { const configs: ConfigurationItem[] = [];

    for (const [key, config] of this.configurations.entries()) {
      if (config.type === type) {
        configs.push(config);,
}
    }

    return configs;,
}

  /**
  * 获取所有配置
  *
  * @param includeSensitive - 是否包含敏感配置
  * @returns 配置列表
   */
  public getAllConfigurations(includeSensitive: boolean = false): ConfigurationItem[] { const configs: ConfigurationItem[] = [];

    for (const [key, config] of this.configurations.entries()) {
      if (!config.sensitive || includeSensitive) {
        configs.push(config);,
}
    }

    return configs;,
}

  /**
  * 重置配置为默认值
  *
  * @param key - 配置键，如果不提供则重置所有配置
   */
  public resetToDefault(key?: string): void { if (key) {
      const schema = this.findSchemaForKey(key);
      if (schema && schema.defaultValue !== undefined) {
        this.setConfiguration(key, schema.defaultValue, 'default');
        this.logger.info('配置已重置为默认值', { key  });,
}
    } else { for (const [type, schema] of this.schemas.entries()) {
        for (const [configKey, config] of Object.entries(schema)) {
          if (config.defaultValue !== undefined) {
            this.setConfiguration(configKey, config.defaultValue, 'default');,
}
        },
}
      this.logger.info('所有配置已重置为默认值');,
}
  }

  /**
  * 监听配置更新
  *
  * @param key - 配置键，如果不提供则监听所有配置
  * @param callback - 回调函数
  * @returns 取消监听的函数
   */
  public onConfigurationUpdate(key: string | null,
    callback: (event: ConfigurationUpdateEvent) => void;
  ): () => void { const listenerKey = key || '*';

    if (!this.listeners.has(listenerKey)) {
      this.listeners.set(listenerKey, []);,
}

    this.listeners.get(listenerKey)!.push(callback);

    // 返回取消监听的函数
    return () => { const listeners = this.listeners.get(listenerKey);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);,
}
      },
};,
}

  /**
  * 触发配置更新事件
  *
  * @param event - 更新事件
   */
  private emitConfigurationUpdate(event: ConfigurationUpdateEvent): void { // 触发特定键的监听器
    const keyListeners = this.listeners.get(event.key);
    if (keyListeners) {
      keyListeners.forEach(callback => {
        try {
          callback(event);,
} catch (error) { this.logger.error('配置更新监听器执行失败', { error, key: event.key  });,
}
      });,
}

    // 触发全局监听器
    const globalListeners = this.listeners.get('*');
    if (globalListeners) { globalListeners.forEach(callback => {
        try {
          callback(event);,
} catch (error) { this.logger.error('全局配置更新监听器执行失败', { error, key: event.key  });,
}
      });,
}

    this.logger.debug('配置更新事件已触发', { key: event.key,
      type: event.type,
      source: event.source,
});,
}

  /**
  * 导出配置
  *
  * @param type - 配置类型，如果不提供则导出所有配置
  * @param includeSensitive - 是否包含敏感配置
  * @returns 配置对象
   */
  public exportConfigurations(
    type?: ConfigurationType,
    includeSensitive: boolean = false;
  ): Record<string, any> { const exported: Record<string, any> = { };

    for (const [key, config] of this.configurations.entries()) { if (type && config.type !== type) continue;
      if (config.sensitive && !includeSensitive) continue;

      exported[key] = config.value;,
}

    return exported;,
}

  /**
  * 导入配置
  *
  * @param configs - 配置对象
  * @param overwrite - 是否覆盖现有配置
  * @returns 导入结果
   */
  public importConfigurations(
    configs: Record<string, any>,
    overwrite: boolean = false;
  ): { imported: string[];
    skipped: string[];
    failed: Array<{ key: string; error: string  }>;,
} { const result = {
      imported: [] as string[],
      skipped: [] as string[],
      failed: [] as Array<{ key: string; error: string  }>,
};

    for (const [key, value] of Object.entries(configs)) { try {
        if (!overwrite && this.configurations.has(key)) {
          result.skipped.push(key);
          continue;,
}

        if (this.set(key, value)) { result.imported.push(key);,
} else { result.failed.push({ key, error: '配置验证失败'  });,
}
      } catch (error) { result.failed.push({
          key,
          error: error instanceof Error ? error.message : '未知错误',
});,
}
    }

    this.logger.info('配置导入完成', { result  });

    return result;,
}

  /**
  * 获取当前环境
   */
  public getCurrentEnvironment(): ConfigurationEnvironment { return this.currentEnvironment;,
}

  /**
  * 切换环境
  *
  * @param environment - 新环境
   */
  public switchEnvironment(environment: ConfigurationEnvironment): void { const oldEnvironment = this.currentEnvironment;
    this.currentEnvironment = environment;

    // 重新加载配置
    this.loadConfigurations();

    this.logger.info('环境已切换', {
      oldEnvironment,
      newEnvironment: environment,
});,
}
}

// 导出单例实例
export const configurationService = ConfigurationService.getInstance();