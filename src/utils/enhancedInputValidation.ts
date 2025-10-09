/**
 * 文件级注释：增强输入验证系统
 * 
 * 该文件实现了一个全面的输入验证系统，旨在：
 * - 提供多层输入验证和清理
 * - 防护XSS、SQL注入等安全威胁
 * - 支持自定义验证规则和模式
 * - 实现智能数据类型检测和转换
 * - 提供详细的验证错误信息
 * 
 * 主要功能：
 * - 数据类型验证
 * - 格式验证（邮箱、电话、URL等）
 * - 安全过滤和清理
 * - 文件上传验证
 * - 自定义验证规则
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';
import { MasterErrorHandler } from './masterErrorHandler';
import { GlobalErrorMonitor } from './globalErrorMonitor';

/**
 * 接口注释：验证规则类型枚举
 * 定义支持的验证规则类型
 */
export enum ValidationRuleType {
  REQUIRED = 'required',
  TYPE = 'type',
  LENGTH = 'length',
  RANGE = 'range',
  PATTERN = 'pattern',
  EMAIL = 'email',
  URL = 'url',
  PHONE = 'phone',
  DATE = 'date',
  CUSTOM = 'custom',
  FILE = 'file',
  ARRAY = 'array',
  OBJECT = 'object'
}

/**
 * 接口注释：数据类型枚举
 * 定义支持的数据类型
 */
export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  DATE = 'date',
  EMAIL = 'email',
  URL = 'url',
  PHONE = 'phone',
  ARRAY = 'array',
  OBJECT = 'object',
  FILE = 'file',
  JSON = 'json'
}

/**
 * 接口注释：验证规则
 * 定义单个验证规则的结构
 */
export interface ValidationRule {
  /** 规则类型 */
  type: ValidationRuleType;
  /** 规则参数 */
  params?: any;
  /** 错误消息 */
  message?: string;
  /** 是否必需 */
  required?: boolean;
  /** 自定义验证函数 */
  validator?: (value: any, context?: ValidationContext) => boolean | Promise<boolean>;
}

/**
 * 接口注释：字段验证配置
 * 定义字段的验证配置
 */
export interface FieldValidationConfig {
  /** 字段名称 */
  name: string;
  /** 数据类型 */
  type: DataType;
  /** 验证规则列表 */
  rules: ValidationRule[];
  /** 是否必需 */
  required?: boolean;
  /** 默认值 */
  defaultValue?: any;
  /** 字段描述 */
  description?: string;
  /** 是否启用清理 */
  sanitize?: boolean;
  /** 自定义清理函数 */
  sanitizer?: (value: any) => any;
}

/**
 * 接口注释：验证配置
 * 定义整体验证配置
 */
export interface ValidationConfig {
  /** 字段配置列表 */
  fields: FieldValidationConfig[];
  /** 全局配置 */
  global?: {
    /** 最大字符串长度 */
    maxStringLength?: number;
    /** 最大数组长度 */
    maxArrayLength?: number;
    /** 最大对象深度 */
    maxObjectDepth?: number;
    /** 允许的文件类型 */
    allowedFileTypes?: string[];
    /** 最大文件大小 */
    maxFileSize?: number;
    /** 是否启用清理 */
    enableSanitization?: boolean;
    /** 是否启用XSS防护 */
    enableXSSProtection?: boolean;
    /** 是否启用SQL注入防护 */
    enableSQLInjectionProtection?: boolean;
    /** 严格模式 */
    strictMode?: boolean;
  };
  /** 自定义验证器 */
  customValidators?: Record<string, (value: any, context?: ValidationContext) => boolean | Promise<boolean>>;
}

/**
 * 接口注释：验证上下文
 * 定义验证时的上下文信息
 */
export interface ValidationContext {
  /** 字段名称 */
  fieldName: string;
  /** 完整数据对象 */
  data: any;
  /** 验证配置 */
  config: ValidationConfig;
  /** 当前路径 */
  path: string[];
  /** 验证深度 */
  depth: number;
  /** 用户信息 */
  user?: {
    id: string;
    role: string;
  };
  /** 请求信息 */
  request?: {
    ip: string;
    userAgent: string;
  };
}

/**
 * 接口注释：验证错误
 * 定义验证错误的结构
 */
export interface ValidationError {
  /** 字段名称 */
  field: string;
  /** 错误类型 */
  type: ValidationRuleType;
  /** 错误消息 */
  message: string;
  /** 错误值 */
  value: any;
  /** 字段路径 */
  path: string[];
  /** 规则参数 */
  ruleParams?: any;
}

/**
 * 接口注释：验证结果
 * 定义验证结果的结构
 */
export interface ValidationResult {
  /** 是否验证通过 */
  isValid: boolean;
  /** 清理后的数据 */
  sanitizedData: any;
  /** 验证错误列表 */
  errors: ValidationError[];
  /** 警告信息 */
  warnings: string[];
  /** 验证统计 */
  stats: {
    /** 验证字段数 */
    fieldsValidated: number;
    /** 应用的规则数 */
    rulesApplied: number;
    /** 清理的字段数 */
    fieldsSanitized: number;
    /** 验证耗时 */
    validationTime: number;
  };
}

/**
 * 接口注释：文件验证配置
 * 定义文件验证的配置
 */
export interface FileValidationConfig {
  /** 允许的文件类型 */
  allowedTypes: string[];
  /** 最大文件大小（字节） */
  maxSize: number;
  /** 最小文件大小（字节） */
  minSize?: number;
  /** 允许的MIME类型 */
  allowedMimeTypes?: string[];
  /** 是否检查文件内容 */
  checkContent?: boolean;
  /** 是否扫描病毒 */
  scanVirus?: boolean;
}

/**
 * 类级注释：增强输入验证器
 * 
 * 实现全面的输入验证，提供：
 * - 多层验证机制
 * - 安全过滤清理
 * - 自定义验证规则
 * - 性能优化缓存
 * - 详细错误报告
 */
export class EnhancedInputValidator {
  private static instance: EnhancedInputValidator;
  private masterErrorHandler: MasterErrorHandler;
  private globalErrorMonitor: GlobalErrorMonitor;
  private validationCache: Map<string, ValidationResult> = new Map();
  private customValidators: Map<string, Function> = new Map();
  private securityPatterns: Map<string, RegExp[]> = new Map();

  /**
   * 构造函数级注释：初始化输入验证器
   * 设置默认配置和安全模式
   */
  private constructor() {
    this.masterErrorHandler = MasterErrorHandler.getInstance();
    this.globalErrorMonitor = GlobalErrorMonitor.getInstance();
    
    this.initializeSecurityPatterns();
    this.initializeCustomValidators();
    this.startCacheCleanup();
  }

  /**
   * 函数级注释：获取单例实例
   * 实现单例模式，确保全局只有一个验证器实例
   */
  public static getInstance(): EnhancedInputValidator {
    if (!EnhancedInputValidator.instance) {
      EnhancedInputValidator.instance = new EnhancedInputValidator();
    }
    return EnhancedInputValidator.instance;
  }

  /**
   * 函数级注释：初始化安全模式
   * 初始化各种安全威胁的检测模式
   */
  private initializeSecurityPatterns() {
    // XSS攻击模式
    this.securityPatterns.set('xss', [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^>]*>/gi,
      /<object\b[^>]*>/gi,
      /<embed\b[^>]*>/gi,
      /<link\b[^>]*>/gi,
      /<meta\b[^>]*>/gi,
      /expression\s*\(/gi,
      /url\s*\(/gi,
      /@import/gi
    ]);

    // SQL注入模式
    this.securityPatterns.set('sql_injection', [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
      /(\'|\")(\s*)(OR|AND)(\s*)(\'|\")/gi,
      /(\-\-|\#|\/\*|\*\/)/g,
      /(\b(SLEEP|BENCHMARK|WAITFOR)\b)/gi,
      /(\b(CHAR|ASCII|SUBSTRING|LENGTH|USER|DATABASE|VERSION)\b)/gi,
      /(UNION\s+(ALL\s+)?SELECT)/gi,
      /(INTO\s+(OUT|DUMP)FILE)/gi
    ]);

    // 路径遍历模式
    this.securityPatterns.set('path_traversal', [
      /\.\.\//g,
      /\.\.\\/, 
      /%2e%2e%2f/gi,
      /%2e%2e%5c/gi,
      /\.\.%2f/gi,
      /\.\.%5c/gi,
      /\.\.\\/g,
      /\.\.%255c/gi
    ]);

    // 命令注入模式
    this.securityPatterns.set('command_injection', [
      /(\||&|;|`|\$\(|\$\{)/g,
      /(nc|netcat|wget|curl|ping|nslookup|dig)/gi,
      /(rm|del|format|fdisk)/gi,
      /(cat|type|more|less|head|tail)/gi,
      /(chmod|chown|sudo|su)/gi
    ]);

    // LDAP注入模式
    this.securityPatterns.set('ldap_injection', [
      /(\*|\(|\)|\\|\/|\||&)/g,
      /(objectClass=\*)/gi,
      /(cn=\*)/gi
    ]);
  }

  /**
   * 函数级注释：初始化自定义验证器
   * 初始化常用的自定义验证器
   */
  private initializeCustomValidators() {
    // 中国身份证验证
    this.customValidators.set('chinese_id_card', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      return pattern.test(value);
    });

    // 中国手机号验证
    this.customValidators.set('chinese_mobile', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      const pattern = /^1[3-9]\d{9}$/;
      return pattern.test(value);
    });

    // 强密码验证
    this.customValidators.set('strong_password', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      // 至少8位，包含大小写字母、数字和特殊字符
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return pattern.test(value);
    });

    // 银行卡号验证
    this.customValidators.set('bank_card', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      // Luhn算法验证
      return this.validateLuhn(value);
    });

    // IP地址验证
    this.customValidators.set('ip_address', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      return validator.isIP(value);
    });

    // MAC地址验证
    this.customValidators.set('mac_address', (value: string) => {
      if (!value || typeof value !== 'string') return false;
      const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
      return pattern.test(value);
    });
  }

  /**
   * 函数级注释：验证输入数据
   * 主要的输入验证方法
   */
  public async validateInput(
    data: any,
    config: ValidationConfig | FieldValidationConfig[]
  ): Promise<ValidationResult> {
    const startTime = Date.now();
    
    try {
      // 标准化配置
      const normalizedConfig = this.normalizeConfig(config);
      
      // 检查缓存
      const cacheKey = this.generateCacheKey(data, normalizedConfig);
      const cachedResult = this.validationCache.get(cacheKey);
      if (cachedResult && this.isCacheValid(cachedResult)) {
        return cachedResult;
      }

      // 执行验证
      const result = await this.performValidation(data, normalizedConfig);
      
      // 计算验证时间
      result.stats.validationTime = Date.now() - startTime;
      
      // 缓存结果
      this.cacheResult(cacheKey, result);
      
      return result;
    } catch (error) {
      this.masterErrorHandler.handleError(error, {
        context: 'input_validation',
        data: this.sanitizeDataForLogging(data)
      });
      
      return {
        isValid: false,
        sanitizedData: null,
        errors: [{
          field: 'root',
          type: ValidationRuleType.CUSTOM,
          message: '验证过程中发生错误',
          value: data,
          path: []
        }],
        warnings: [],
        stats: {
          fieldsValidated: 0,
          rulesApplied: 0,
          fieldsSanitized: 0,
          validationTime: Date.now() - startTime
        }
      };
    }
  }

  /**
   * 函数级注释：标准化配置
   * 将不同格式的配置标准化为统一格式
   */
  private normalizeConfig(config: ValidationConfig | FieldValidationConfig[]): ValidationConfig {
    if (Array.isArray(config)) {
      return {
        fields: config,
        global: {}
      };
    }
    return config;
  }

  /**
   * 函数级注释：执行验证
   * 执行实际的验证逻辑
   */
  private async performValidation(data: any, config: ValidationConfig): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      sanitizedData: {},
      errors: [],
      warnings: [],
      stats: {
        fieldsValidated: 0,
        rulesApplied: 0,
        fieldsSanitized: 0,
        validationTime: 0
      }
    };

    const context: ValidationContext = {
      fieldName: '',
      data,
      config,
      path: [],
      depth: 0
    };

    // 全局安全检查
    if (config.global?.enableXSSProtection || config.global?.enableSQLInjectionProtection) {
      await this.performSecurityValidation(data, result, config);
    }

    // 验证每个字段
    for (const fieldConfig of config.fields) {
      context.fieldName = fieldConfig.name;
      context.path = [fieldConfig.name];
      
      const fieldValue = this.getFieldValue(data, fieldConfig.name);
      const fieldResult = await this.validateField(fieldValue, fieldConfig, context);
      
      // 合并结果
      result.errors.push(...fieldResult.errors);
      result.warnings.push(...fieldResult.warnings);
      result.stats.fieldsValidated++;
      result.stats.rulesApplied += fieldConfig.rules.length;
      
      // 设置清理后的值
      if (fieldResult.sanitizedValue !== undefined) {
        this.setFieldValue(result.sanitizedData, fieldConfig.name, fieldResult.sanitizedValue);
        result.stats.fieldsSanitized++;
      } else if (fieldValue !== undefined) {
        this.setFieldValue(result.sanitizedData, fieldConfig.name, fieldValue);
      } else if (fieldConfig.defaultValue !== undefined) {
        this.setFieldValue(result.sanitizedData, fieldConfig.name, fieldConfig.defaultValue);
      }
    }

    // 检查严格模式
    if (config.global?.strictMode) {
      this.validateStrictMode(data, config, result);
    }

    result.isValid = result.errors.length === 0;
    return result;
  }

  /**
   * 函数级注释：执行安全验证
   * 执行XSS、SQL注入等安全威胁检测
   */
  private async performSecurityValidation(
    data: any,
    result: ValidationResult,
    config: ValidationConfig
  ) {
    const flattenedData = this.flattenObject(data);
    
    for (const [path, value] of Object.entries(flattenedData)) {
      if (typeof value === 'string') {
        // XSS检测
        if (config.global?.enableXSSProtection && this.detectXSS(value)) {
          result.errors.push({
            field: path,
            type: ValidationRuleType.CUSTOM,
            message: '检测到XSS攻击模式',
            value,
            path: path.split('.')
          });
        }

        // SQL注入检测
        if (config.global?.enableSQLInjectionProtection && this.detectSQLInjection(value)) {
          result.errors.push({
            field: path,
            type: ValidationRuleType.CUSTOM,
            message: '检测到SQL注入攻击模式',
            value,
            path: path.split('.')
          });
        }

        // 路径遍历检测
        if (this.detectPathTraversal(value)) {
          result.errors.push({
            field: path,
            type: ValidationRuleType.CUSTOM,
            message: '检测到路径遍历攻击模式',
            value,
            path: path.split('.')
          });
        }

        // 命令注入检测
        if (this.detectCommandInjection(value)) {
          result.errors.push({
            field: path,
            type: ValidationRuleType.CUSTOM,
            message: '检测到命令注入攻击模式',
            value,
            path: path.split('.')
          });
        }
      }
    }
  }

  /**
   * 函数级注释：验证字段
   * 验证单个字段
   */
  private async validateField(
    value: any,
    config: FieldValidationConfig,
    context: ValidationContext
  ): Promise<{
    errors: ValidationError[];
    warnings: string[];
    sanitizedValue?: any;
  }> {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];
    let sanitizedValue = value;

    // 检查必需字段
    if (config.required && (value === undefined || value === null || value === '')) {
      errors.push({
        field: config.name,
        type: ValidationRuleType.REQUIRED,
        message: `字段 ${config.name} 是必需的`,
        value,
        path: context.path
      });
      return { errors, warnings };
    }

    // 如果值为空且不是必需字段，跳过验证
    if (value === undefined || value === null || value === '') {
      return { errors, warnings, sanitizedValue: config.defaultValue };
    }

    // 数据类型验证和转换
    const typeResult = await this.validateAndConvertType(value, config.type, context);
    if (typeResult.error) {
      errors.push(typeResult.error);
      return { errors, warnings };
    }
    sanitizedValue = typeResult.convertedValue;

    // 应用验证规则
    for (const rule of config.rules) {
      const ruleResult = await this.applyValidationRule(sanitizedValue, rule, context);
      if (ruleResult.error) {
        errors.push(ruleResult.error);
      }
      if (ruleResult.warning) {
        warnings.push(ruleResult.warning);
      }
      if (ruleResult.sanitizedValue !== undefined) {
        sanitizedValue = ruleResult.sanitizedValue;
      }
    }

    // 应用清理
    if (config.sanitize !== false && typeof sanitizedValue === 'string') {
      sanitizedValue = this.sanitizeString(sanitizedValue, context.config.global);
    }

    // 应用自定义清理器
    if (config.sanitizer) {
      try {
        sanitizedValue = config.sanitizer(sanitizedValue);
      } catch (error) {
        warnings.push(`自定义清理器执行失败: ${error.message}`);
      }
    }

    return { errors, warnings, sanitizedValue };
  }

  /**
   * 函数级注释：验证和转换数据类型
   * 验证数据类型并进行必要的转换
   */
  private async validateAndConvertType(
    value: any,
    type: DataType,
    context: ValidationContext
  ): Promise<{
    convertedValue: any;
    error?: ValidationError;
  }> {
    try {
      switch (type) {
        case DataType.STRING:
          return { convertedValue: String(value) };
          
        case DataType.NUMBER:
          const num = Number(value);
          if (isNaN(num)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.TYPE,
                message: '必须是有效的数字',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: num };
          
        case DataType.INTEGER:
          const int = parseInt(value, 10);
          if (isNaN(int) || int !== Number(value)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.TYPE,
                message: '必须是有效的整数',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: int };
          
        case DataType.BOOLEAN:
          if (typeof value === 'boolean') {
            return { convertedValue: value };
          }
          if (typeof value === 'string') {
            const lower = value.toLowerCase();
            if (lower === 'true' || lower === '1' || lower === 'yes') {
              return { convertedValue: true };
            }
            if (lower === 'false' || lower === '0' || lower === 'no') {
              return { convertedValue: false };
            }
          }
          return {
            convertedValue: value,
            error: {
              field: context.fieldName,
              type: ValidationRuleType.TYPE,
              message: '必须是有效的布尔值',
              value,
              path: context.path
            }
          };
          
        case DataType.DATE:
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.TYPE,
                message: '必须是有效的日期',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: date };
          
        case DataType.EMAIL:
          if (typeof value !== 'string' || !validator.isEmail(value)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.EMAIL,
                message: '必须是有效的邮箱地址',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: value.toLowerCase() };
          
        case DataType.URL:
          if (typeof value !== 'string' || !validator.isURL(value)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.URL,
                message: '必须是有效的URL',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: value };
          
        case DataType.PHONE:
          if (typeof value !== 'string' || !validator.isMobilePhone(value, 'any')) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.PHONE,
                message: '必须是有效的手机号码',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: value };
          
        case DataType.ARRAY:
          if (!Array.isArray(value)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.TYPE,
                message: '必须是数组',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: value };
          
        case DataType.OBJECT:
          if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return {
              convertedValue: value,
              error: {
                field: context.fieldName,
                type: ValidationRuleType.TYPE,
                message: '必须是对象',
                value,
                path: context.path
              }
            };
          }
          return { convertedValue: value };
          
        case DataType.JSON:
          if (typeof value === 'string') {
            try {
              const parsed = JSON.parse(value);
              return { convertedValue: parsed };
            } catch {
              return {
                convertedValue: value,
                error: {
                  field: context.fieldName,
                  type: ValidationRuleType.TYPE,
                  message: '必须是有效的JSON字符串',
                  value,
                  path: context.path
                }
              };
            }
          }
          return { convertedValue: value };
          
        default:
          return { convertedValue: value };
      }
    } catch (error) {
      return {
        convertedValue: value,
        error: {
          field: context.fieldName,
          type: ValidationRuleType.TYPE,
          message: `类型转换失败: ${error.message}`,
          value,
          path: context.path
        }
      };
    }
  }

  /**
   * 函数级注释：应用验证规则
   * 应用单个验证规则
   */
  private async applyValidationRule(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): Promise<{
    error?: ValidationError;
    warning?: string;
    sanitizedValue?: any;
  }> {
    try {
      switch (rule.type) {
        case ValidationRuleType.LENGTH:
          return this.validateLength(value, rule, context);
          
        case ValidationRuleType.RANGE:
          return this.validateRange(value, rule, context);
          
        case ValidationRuleType.PATTERN:
          return this.validatePattern(value, rule, context);
          
        case ValidationRuleType.CUSTOM:
          return await this.validateCustom(value, rule, context);
          
        case ValidationRuleType.FILE:
          return await this.validateFile(value, rule, context);
          
        case ValidationRuleType.ARRAY:
          return await this.validateArray(value, rule, context);
          
        case ValidationRuleType.OBJECT:
          return await this.validateObject(value, rule, context);
          
        default:
          return {};
      }
    } catch (error) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || `验证规则执行失败: ${error.message}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }
  }

  /**
   * 函数级注释：验证长度
   * 验证字符串或数组的长度
   */
  private validateLength(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): { error?: ValidationError; warning?: string } {
    const { min, max } = rule.params || {};
    let length: number;

    if (typeof value === 'string' || Array.isArray(value)) {
      length = value.length;
    } else {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '长度验证只适用于字符串或数组',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (min !== undefined && length < min) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || `长度不能少于 ${min}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (max !== undefined && length > max) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || `长度不能超过 ${max}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    return {};
  }

  /**
   * 函数级注释：验证范围
   * 验证数值范围
   */
  private validateRange(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): { error?: ValidationError; warning?: string } {
    const { min, max } = rule.params || {};
    
    if (typeof value !== 'number') {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '范围验证只适用于数字',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (min !== undefined && value < min) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || `值不能小于 ${min}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (max !== undefined && value > max) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || `值不能大于 ${max}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    return {};
  }

  /**
   * 函数级注释：验证模式
   * 使用正则表达式验证模式
   */
  private validatePattern(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): { error?: ValidationError; warning?: string } {
    if (typeof value !== 'string') {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '模式验证只适用于字符串',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    const pattern = new RegExp(rule.params.pattern, rule.params.flags || '');
    if (!pattern.test(value)) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: rule.message || '格式不正确',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    return {};
  }

  /**
   * 函数级注释：验证自定义规则
   * 执行自定义验证函数
   */
  private async validateCustom(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): Promise<{ error?: ValidationError; warning?: string }> {
    let validator = rule.validator;
    
    // 如果没有提供验证器，尝试从注册的验证器中查找
    if (!validator && rule.params?.validatorName) {
      validator = this.customValidators.get(rule.params.validatorName);
    }

    if (!validator) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '自定义验证器未找到',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    try {
      const isValid = await validator(value, context);
      if (!isValid) {
        return {
          error: {
            field: context.fieldName,
            type: rule.type,
            message: rule.message || '自定义验证失败',
            value,
            path: context.path,
            ruleParams: rule.params
          }
        };
      }
    } catch (error) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: `自定义验证器执行失败: ${error.message}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    return {};
  }

  /**
   * 函数级注释：验证文件
   * 验证上传的文件
   */
  private async validateFile(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): Promise<{ error?: ValidationError; warning?: string }> {
    const config: FileValidationConfig = rule.params;
    
    if (!value || typeof value !== 'object') {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '无效的文件对象',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    // 检查文件大小
    if (config.maxSize && value.size > config.maxSize) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: `文件大小不能超过 ${this.formatFileSize(config.maxSize)}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (config.minSize && value.size < config.minSize) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: `文件大小不能小于 ${this.formatFileSize(config.minSize)}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    // 检查文件类型
    if (config.allowedTypes && config.allowedTypes.length > 0) {
      const fileExtension = this.getFileExtension(value.name || '');
      if (!config.allowedTypes.includes(fileExtension.toLowerCase())) {
        return {
          error: {
            field: context.fieldName,
            type: rule.type,
            message: `不支持的文件类型，允许的类型: ${config.allowedTypes.join(', ')}`,
            value,
            path: context.path,
            ruleParams: rule.params
          }
        };
      }
    }

    // 检查MIME类型
    if (config.allowedMimeTypes && config.allowedMimeTypes.length > 0) {
      if (!config.allowedMimeTypes.includes(value.type)) {
        return {
          error: {
            field: context.fieldName,
            type: rule.type,
            message: `不支持的MIME类型，允许的类型: ${config.allowedMimeTypes.join(', ')}`,
            value,
            path: context.path,
            ruleParams: rule.params
          }
        };
      }
    }

    return {};
  }

  /**
   * 函数级注释：验证数组
   * 验证数组及其元素
   */
  private async validateArray(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): Promise<{ error?: ValidationError; warning?: string }> {
    if (!Array.isArray(value)) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '必须是数组',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    const { maxLength, minLength, elementType, elementRules } = rule.params || {};

    // 检查数组长度
    if (maxLength !== undefined && value.length > maxLength) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: `数组长度不能超过 ${maxLength}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    if (minLength !== undefined && value.length < minLength) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: `数组长度不能少于 ${minLength}`,
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    // 验证数组元素
    if (elementType || elementRules) {
      for (let i = 0; i < value.length; i++) {
        const elementContext = {
          ...context,
          fieldName: `${context.fieldName}[${i}]`,
          path: [...context.path, i.toString()]
        };

        if (elementType) {
          const typeResult = await this.validateAndConvertType(value[i], elementType, elementContext);
          if (typeResult.error) {
            return { error: typeResult.error };
          }
        }

        if (elementRules) {
          for (const elementRule of elementRules) {
            const ruleResult = await this.applyValidationRule(value[i], elementRule, elementContext);
            if (ruleResult.error) {
              return { error: ruleResult.error };
            }
          }
        }
      }
    }

    return {};
  }

  /**
   * 函数级注释：验证对象
   * 验证对象及其属性
   */
  private async validateObject(
    value: any,
    rule: ValidationRule,
    context: ValidationContext
  ): Promise<{ error?: ValidationError; warning?: string }> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return {
        error: {
          field: context.fieldName,
          type: rule.type,
          message: '必须是对象',
          value,
          path: context.path,
          ruleParams: rule.params
        }
      };
    }

    const { properties, required, additionalProperties } = rule.params || {};

    // 检查必需属性
    if (required && Array.isArray(required)) {
      for (const requiredProp of required) {
        if (!(requiredProp in value)) {
          return {
            error: {
              field: context.fieldName,
              type: rule.type,
              message: `缺少必需属性: ${requiredProp}`,
              value,
              path: context.path,
              ruleParams: rule.params
            }
          };
        }
      }
    }

    // 验证属性
    if (properties) {
      for (const [propName, propConfig] of Object.entries(properties)) {
        if (propName in value) {
          const propContext = {
            ...context,
            fieldName: `${context.fieldName}.${propName}`,
            path: [...context.path, propName]
          };

          const propResult = await this.validateField(value[propName], propConfig as FieldValidationConfig, propContext);
          if (propResult.errors.length > 0) {
            return { error: propResult.errors[0] };
          }
        }
      }
    }

    // 检查额外属性
    if (additionalProperties === false) {
      const allowedProps = properties ? Object.keys(properties) : [];
      for (const propName of Object.keys(value)) {
        if (!allowedProps.includes(propName)) {
          return {
            error: {
              field: context.fieldName,
              type: rule.type,
              message: `不允许的属性: ${propName}`,
              value,
              path: context.path,
              ruleParams: rule.params
            }
          };
        }
      }
    }

    return {};
  }

  /**
   * 函数级注释：清理字符串
   * 清理字符串中的危险内容
   */
  private sanitizeString(value: string, globalConfig?: ValidationConfig['global']): string {
    let sanitized = value;

    // XSS防护
    if (globalConfig?.enableXSSProtection !== false) {
      sanitized = DOMPurify.sanitize(sanitized, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
      });
    }

    // 移除控制字符
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

    // 标准化空白字符
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    return sanitized;
  }

  /**
   * 函数级注释：检测XSS攻击
   * 检测字符串中的XSS攻击模式
   */
  private detectXSS(value: string): boolean {
    const patterns = this.securityPatterns.get('xss') || [];
    return patterns.some(pattern => pattern.test(value));
  }

  /**
   * 函数级注释：检测SQL注入
   * 检测字符串中的SQL注入攻击模式
   */
  private detectSQLInjection(value: string): boolean {
    const patterns = this.securityPatterns.get('sql_injection') || [];
    return patterns.some(pattern => pattern.test(value));
  }

  /**
   * 函数级注释：检测路径遍历
   * 检测字符串中的路径遍历攻击模式
   */
  private detectPathTraversal(value: string): boolean {
    const patterns = this.securityPatterns.get('path_traversal') || [];
    return patterns.some(pattern => pattern.test(value));
  }

  /**
   * 函数级注释：检测命令注入
   * 检测字符串中的命令注入攻击模式
   */
  private detectCommandInjection(value: string): boolean {
    const patterns = this.securityPatterns.get('command_injection') || [];
    return patterns.some(pattern => pattern.test(value));
  }

  /**
   * 函数级注释：验证Luhn算法
   * 使用Luhn算法验证银行卡号
   */
  private validateLuhn(value: string): boolean {
    const digits = value.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  /**
   * 函数级注释：获取字段值
   * 从对象中获取嵌套字段的值
   */
  private getFieldValue(data: any, fieldPath: string): any {
    const paths = fieldPath.split('.');
    let current = data;

    for (const path of paths) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[path];
    }

    return current;
  }

  /**
   * 函数级注释：设置字段值
   * 在对象中设置嵌套字段的值
   */
  private setFieldValue(data: any, fieldPath: string, value: any): void {
    const paths = fieldPath.split('.');
    let current = data;

    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i];
      if (!(path in current) || typeof current[path] !== 'object') {
        current[path] = {};
      }
      current = current[path];
    }

    current[paths[paths.length - 1]] = value;
  }

  /**
   * 函数级注释：扁平化对象
   * 将嵌套对象扁平化为点分隔的键值对
   */
  private flattenObject(obj: any, prefix: string = ''): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  }

  /**
   * 函数级注释：验证严格模式
   * 在严格模式下验证额外的约束
   */
  private validateStrictMode(data: any, config: ValidationConfig, result: ValidationResult) {
    const definedFields = new Set(config.fields.map(f => f.name));
    const dataFields = new Set(Object.keys(data));

    // 检查未定义的字段
    for (const field of dataFields) {
      if (!definedFields.has(field)) {
        result.warnings.push(`严格模式: 未定义的字段 ${field}`);
      }
    }
  }

  /**
   * 函数级注释：获取文件扩展名
   * 从文件名中提取扩展名
   */
  private getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex > 0 ? filename.slice(lastDotIndex + 1) : '';
  }

  /**
   * 函数级注释：格式化文件大小
   * 将字节数格式化为可读的文件大小
   */
  private formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  /**
   * 函数级注释：生成缓存键
   * 为验证结果生成缓存键
   */
  private generateCacheKey(data: any, config: ValidationConfig): string {
    const dataHash = this.hashObject(data);
    const configHash = this.hashObject(config);
    return `${dataHash}_${configHash}`;
  }

  /**
   * 函数级注释：哈希对象
   * 为对象生成哈希值
   */
  private hashObject(obj: any): string {
    const str = JSON.stringify(obj, Object.keys(obj).sort());
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return hash.toString(36);
  }

  /**
   * 函数级注释：检查缓存有效性
   * 检查验证结果缓存是否有效
   */
  private isCacheValid(result: ValidationResult): boolean {
    // 简单的缓存策略：5分钟有效期
    const cacheTimeout = 5 * 60 * 1000;
    return Date.now() - result.stats.validationTime < cacheTimeout;
  }

  /**
   * 函数级注释：缓存结果
   * 缓存验证结果
   */
  private cacheResult(cacheKey: string, result: ValidationResult) {
    this.validationCache.set(cacheKey, result);

    // 限制缓存大小
    if (this.validationCache.size > 1000) {
      const oldestKeys = Array.from(this.validationCache.keys()).slice(0, 100);
      oldestKeys.forEach(key => this.validationCache.delete(key));
    }
  }

  /**
   * 函数级注释：清理敏感数据用于日志
   * 清理数据中的敏感信息用于日志记录
   */
  private sanitizeDataForLogging(data: any): any {
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
    
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sanitized = { ...data };
    
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * 函数级注释：启动缓存清理
   * 启动定期缓存清理任务
   */
  private startCacheCleanup() {
    setInterval(() => {
      this.cleanupExpiredCache();
    }, 10 * 60 * 1000); // 每10分钟清理一次
  }

  /**
   * 函数级注释：清理过期缓存
   * 清理过期的验证缓存
   */
  private cleanupExpiredCache() {
    for (const [key, result] of this.validationCache.entries()) {
      if (!this.isCacheValid(result)) {
        this.validationCache.delete(key);
      }
    }
  }

  /**
   * 函数级注释：注册自定义验证器
   * 注册新的自定义验证器
   */
  public registerCustomValidator(
    name: string,
    validator: (value: any, context?: ValidationContext) => boolean | Promise<boolean>
  ) {
    this.customValidators.set(name, validator);
  }

  /**
   * 函数级注释：获取验证统计
   * 获取验证器的统计信息
   */
  public getValidationStats() {
    return {
      cacheSize: this.validationCache.size,
      customValidators: this.customValidators.size,
      securityPatterns: Array.from(this.securityPatterns.keys())
    };
  }
}

/**
 * 函数级注释：创建输入验证器实例
 * 创建并返回输入验证器实例
 */
export function createEnhancedInputValidator() {
  return EnhancedInputValidator.getInstance();
}

// 导出单例实例
export const enhancedInputValidator = EnhancedInputValidator.getInstance();