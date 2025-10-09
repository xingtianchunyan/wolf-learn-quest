/**
 * @fileoverview 错误消息配置文件
 * 统一管理所有错误消息，包括用户友好的错误提示、系统错误码、多语言支持等
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */

/**
 * 错误级别枚举
 */
export enum ErrorLevel {
  /** 信息级别 */
  INFO = 'info',
  /** 警告级别 */
  WARNING = 'warning',
  /** 错误级别 */
  ERROR = 'error',
  /** 严重错误级别 */
  CRITICAL = 'critical',
}

/**
 * 错误类别枚举
 */
export enum ErrorCategory {
  /** 验证错误 */
  VALIDATION = 'validation',
  /** 认证错误 */
  AUTHENTICATION = 'authentication',
  /** 授权错误 */
  AUTHORIZATION = 'authorization',
  /** 网络错误 */
  NETWORK = 'network',
  /** 服务器错误 */
  SERVER = 'server',
  /** 游戏逻辑错误 */
  GAME_LOGIC = 'game_logic',
  /** 技能错误 */
  SKILL = 'skill',
  /** 数据库错误 */
  DATABASE = 'database',
  /** 系统错误 */
  SYSTEM = 'system',
}

/**
 * 错误消息接口
 */
export interface ErrorMessage {
  /** 错误码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 详细描述 */
  description?: string;
  /** 错误级别 */
  level: ErrorLevel;
  /** 错误类别 */
  category: ErrorCategory;
  /** 用户友好的消息 */
  userMessage: string;
  /** 建议的解决方案 */
  solution?: string;
  /** 相关文档链接 */
  docUrl?: string;
  /** 是否可重试 */
  retryable: boolean;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 最大重试次数 */
  maxRetries?: number;
}

/**
 * 多语言错误消息接口
 */
export interface LocalizedErrorMessage
  extends Omit<
    ErrorMessage,
    'message' | 'userMessage' | 'description' | 'solution'
  > {
  /** 多语言消息 */
  message: Record<string, string>;
  /** 多语言用户消息 */
  userMessage: Record<string, string>;
  /** 多语言描述 */
  description?: Record<string, string>;
  /** 多语言解决方案 */
  solution?: Record<string, string>;
}

/**
 * 验证错误消息
 */
export const VALIDATION_ERRORS: Record<string, ErrorMessage> = {
  INVALID_USERNAME: {
    code: 'VALIDATION_001',
    message: 'Invalid username format',
    description:
      'Username must be 2-20 characters long and contain only letters, numbers, Chinese characters, underscores, and hyphens',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage:
      '用户名格式无效，必须是2-20个字符，只能包含字母、数字、中文、下划线和连字符',
    solution: '请输入符合要求的用户名',
    retryable: true,
  },

  INVALID_EMAIL: {
    code: 'VALIDATION_002',
    message: 'Invalid email format',
    description: 'Email address format is not valid',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '邮箱格式无效',
    solution: '请输入有效的邮箱地址',
    retryable: true,
  },

  INVALID_PASSWORD: {
    code: 'VALIDATION_003',
    message: 'Invalid password format',
    description:
      'Password must be at least 8 characters long and contain uppercase, lowercase letters and numbers',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '密码格式无效，必须至少8位，包含大小写字母和数字',
    solution: '请输入符合要求的密码',
    retryable: true,
  },

  INVALID_ROOM_NAME: {
    code: 'VALIDATION_004',
    message: 'Invalid room name format',
    description: 'Room name must be 1-30 characters long',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '房间名格式无效，必须是1-30个字符',
    solution: '请输入符合要求的房间名',
    retryable: true,
  },

  INVALID_PLAYER_COUNT: {
    code: 'VALIDATION_005',
    message: 'Invalid player count',
    description: 'Player count must be between 6 and 12',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '玩家数量无效，必须在6-12之间',
    solution: '请选择6-12之间的玩家数量',
    retryable: true,
  },

  MESSAGE_TOO_LONG: {
    code: 'VALIDATION_006',
    message: 'Message too long',
    description: 'Message cannot exceed 500 characters',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '消息过长，不能超过500个字符',
    solution: '请缩短消息内容',
    retryable: true,
  },

  EMPTY_MESSAGE: {
    code: 'VALIDATION_007',
    message: 'Empty message',
    description: 'Message cannot be empty',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.VALIDATION,
    userMessage: '消息不能为空',
    solution: '请输入消息内容',
    retryable: true,
  },
};

/**
 * 认证错误消息
 */
export const AUTHENTICATION_ERRORS: Record<string, ErrorMessage> = {
  INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    message: 'Invalid credentials',
    description: 'Username or password is incorrect',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHENTICATION,
    userMessage: '用户名或密码错误',
    solution: '请检查用户名和密码是否正确',
    retryable: true,
    retryDelay: 1000,
    maxRetries: 3,
  },

  TOKEN_EXPIRED: {
    code: 'AUTH_002',
    message: 'Token expired',
    description: 'Authentication token has expired',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHENTICATION,
    userMessage: '登录已过期，请重新登录',
    solution: '请重新登录',
    retryable: false,
  },

  TOKEN_INVALID: {
    code: 'AUTH_003',
    message: 'Invalid token',
    description: 'Authentication token is invalid',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHENTICATION,
    userMessage: '登录信息无效，请重新登录',
    solution: '请重新登录',
    retryable: false,
  },

  USER_NOT_FOUND: {
    code: 'AUTH_004',
    message: 'User not found',
    description: 'User account does not exist',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHENTICATION,
    userMessage: '用户不存在',
    solution: '请检查用户名是否正确或注册新账户',
    retryable: true,
  },

  ACCOUNT_LOCKED: {
    code: 'AUTH_005',
    message: 'Account locked',
    description:
      'User account has been locked due to multiple failed login attempts',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHENTICATION,
    userMessage: '账户已被锁定，请稍后再试',
    solution: '请等待一段时间后再次尝试登录',
    retryable: true,
    retryDelay: 300000, // 5分钟
    maxRetries: 1,
  },
};

/**
 * 授权错误消息
 */
export const AUTHORIZATION_ERRORS: Record<string, ErrorMessage> = {
  ACCESS_DENIED: {
    code: 'AUTHZ_001',
    message: 'Access denied',
    description: 'User does not have permission to perform this action',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHORIZATION,
    userMessage: '没有权限执行此操作',
    solution: '请联系管理员获取相应权限',
    retryable: false,
  },

  INSUFFICIENT_PRIVILEGES: {
    code: 'AUTHZ_002',
    message: 'Insufficient privileges',
    description: 'User role does not have sufficient privileges',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHORIZATION,
    userMessage: '权限不足',
    solution: '请联系管理员提升权限',
    retryable: false,
  },

  ROLE_NOT_ALLOWED: {
    code: 'AUTHZ_003',
    message: 'Role not allowed',
    description: 'Current user role is not allowed to perform this action',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.AUTHORIZATION,
    userMessage: '当前角色不允许执行此操作',
    solution: '请使用具有相应权限的角色',
    retryable: false,
  },
};

/**
 * 网络错误消息
 */
export const NETWORK_ERRORS: Record<string, ErrorMessage> = {
  CONNECTION_FAILED: {
    code: 'NETWORK_001',
    message: 'Connection failed',
    description: 'Failed to establish connection to server',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.NETWORK,
    userMessage: '连接服务器失败',
    solution: '请检查网络连接并重试',
    retryable: true,
    retryDelay: 3000,
    maxRetries: 5,
  },

  CONNECTION_TIMEOUT: {
    code: 'NETWORK_002',
    message: 'Connection timeout',
    description: 'Connection to server timed out',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.NETWORK,
    userMessage: '连接超时',
    solution: '请检查网络连接并重试',
    retryable: true,
    retryDelay: 5000,
    maxRetries: 3,
  },

  WEBSOCKET_DISCONNECTED: {
    code: 'NETWORK_003',
    message: 'WebSocket disconnected',
    description: 'WebSocket connection has been lost',
    level: ErrorLevel.WARNING,
    category: ErrorCategory.NETWORK,
    userMessage: '连接已断开，正在尝试重连...',
    solution: '系统将自动重连，请稍等',
    retryable: true,
    retryDelay: 2000,
    maxRetries: 10,
  },

  REQUEST_FAILED: {
    code: 'NETWORK_004',
    message: 'Request failed',
    description: 'HTTP request failed',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.NETWORK,
    userMessage: '请求失败',
    solution: '请重试或检查网络连接',
    retryable: true,
    retryDelay: 1000,
    maxRetries: 3,
  },
};

/**
 * 服务器错误消息
 */
export const SERVER_ERRORS: Record<string, ErrorMessage> = {
  INTERNAL_SERVER_ERROR: {
    code: 'SERVER_001',
    message: 'Internal server error',
    description: 'An unexpected error occurred on the server',
    level: ErrorLevel.CRITICAL,
    category: ErrorCategory.SERVER,
    userMessage: '服务器内部错误',
    solution: '请稍后重试，如果问题持续存在请联系技术支持',
    retryable: true,
    retryDelay: 5000,
    maxRetries: 2,
  },

  SERVICE_UNAVAILABLE: {
    code: 'SERVER_002',
    message: 'Service unavailable',
    description: 'Server is temporarily unavailable',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SERVER,
    userMessage: '服务暂时不可用',
    solution: '请稍后重试',
    retryable: true,
    retryDelay: 10000,
    maxRetries: 3,
  },

  MAINTENANCE_MODE: {
    code: 'SERVER_003',
    message: 'Maintenance mode',
    description: 'Server is under maintenance',
    level: ErrorLevel.INFO,
    category: ErrorCategory.SERVER,
    userMessage: '服务器正在维护中',
    solution: '请稍后再试',
    retryable: true,
    retryDelay: 60000,
    maxRetries: 1,
  },
};

/**
 * 游戏逻辑错误消息
 */
export const GAME_LOGIC_ERRORS: Record<string, ErrorMessage> = {
  GAME_NOT_FOUND: {
    code: 'GAME_001',
    message: 'Game not found',
    description: 'The specified game does not exist',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '游戏不存在',
    solution: '请检查游戏ID是否正确',
    retryable: false,
  },

  GAME_FULL: {
    code: 'GAME_002',
    message: 'Game is full',
    description:
      'Cannot join game because it has reached maximum player capacity',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '游戏房间已满',
    solution: '请加入其他房间或等待有玩家离开',
    retryable: true,
  },

  GAME_ALREADY_STARTED: {
    code: 'GAME_003',
    message: 'Game already started',
    description: 'Cannot join game because it has already started',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '游戏已经开始',
    solution: '请等待游戏结束或加入其他房间',
    retryable: false,
  },

  INVALID_GAME_PHASE: {
    code: 'GAME_004',
    message: 'Invalid game phase',
    description: 'Action is not allowed in current game phase',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '当前游戏阶段不允许此操作',
    solution: '请等待合适的游戏阶段',
    retryable: false,
  },

  PLAYER_NOT_IN_GAME: {
    code: 'GAME_005',
    message: 'Player not in game',
    description: 'Player is not a participant in this game',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '您不在此游戏中',
    solution: '请先加入游戏',
    retryable: false,
  },

  PLAYER_ALREADY_DEAD: {
    code: 'GAME_006',
    message: 'Player already dead',
    description: 'Cannot perform action because player is dead',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '您已经死亡，无法执行此操作',
    solution: '死亡玩家无法参与游戏',
    retryable: false,
  },

  INVALID_VOTE_TARGET: {
    code: 'GAME_007',
    message: 'Invalid vote target',
    description: 'Cannot vote for the specified target',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '无效的投票目标',
    solution: '请选择有效的投票目标',
    retryable: true,
  },

  VOTE_ALREADY_CAST: {
    code: 'GAME_008',
    message: 'Vote already cast',
    description: 'Player has already voted in this round',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.GAME_LOGIC,
    userMessage: '您已经投过票了',
    solution: '每轮只能投票一次',
    retryable: false,
  },
};

/**
 * 技能错误消息
 */
export const SKILL_ERRORS: Record<string, ErrorMessage> = {
  SKILL_NOT_FOUND: {
    code: 'SKILL_001',
    message: 'Skill not found',
    description: 'The specified skill does not exist',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '技能不存在',
    solution: '请检查技能ID是否正确',
    retryable: false,
  },

  SKILL_NOT_AVAILABLE: {
    code: 'SKILL_002',
    message: 'Skill not available',
    description: 'Skill is not available for current player role',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '您无法使用此技能',
    solution: '请使用您角色可用的技能',
    retryable: false,
  },

  SKILL_ON_COOLDOWN: {
    code: 'SKILL_003',
    message: 'Skill on cooldown',
    description: 'Skill is currently on cooldown',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '技能正在冷却中',
    solution: '请等待冷却时间结束',
    retryable: true,
  },

  SKILL_ALREADY_USED: {
    code: 'SKILL_004',
    message: 'Skill already used',
    description: 'Skill has already been used this turn/game',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '技能已经使用过了',
    solution: '此技能在本轮/本局游戏中只能使用一次',
    retryable: false,
  },

  INVALID_SKILL_TARGET: {
    code: 'SKILL_005',
    message: 'Invalid skill target',
    description: 'The specified target is not valid for this skill',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '无效的技能目标',
    solution: '请选择有效的技能目标',
    retryable: true,
  },

  SKILL_EXECUTION_FAILED: {
    code: 'SKILL_006',
    message: 'Skill execution failed',
    description: 'Failed to execute skill due to game state',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SKILL,
    userMessage: '技能执行失败',
    solution: '请检查游戏状态并重试',
    retryable: true,
  },
};

/**
 * 数据库错误消息
 */
export const DATABASE_ERRORS: Record<string, ErrorMessage> = {
  CONNECTION_FAILED: {
    code: 'DB_001',
    message: 'Database connection failed',
    description: 'Failed to connect to database',
    level: ErrorLevel.CRITICAL,
    category: ErrorCategory.DATABASE,
    userMessage: '数据库连接失败',
    solution: '请稍后重试，如果问题持续存在请联系技术支持',
    retryable: true,
    retryDelay: 5000,
    maxRetries: 3,
  },

  QUERY_FAILED: {
    code: 'DB_002',
    message: 'Database query failed',
    description: 'Failed to execute database query',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.DATABASE,
    userMessage: '数据查询失败',
    solution: '请重试操作',
    retryable: true,
    retryDelay: 1000,
    maxRetries: 2,
  },

  TRANSACTION_FAILED: {
    code: 'DB_003',
    message: 'Database transaction failed',
    description: 'Database transaction was rolled back',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.DATABASE,
    userMessage: '数据操作失败',
    solution: '请重试操作',
    retryable: true,
    retryDelay: 2000,
    maxRetries: 2,
  },
};

/**
 * 系统错误消息
 */
export const SYSTEM_ERRORS: Record<string, ErrorMessage> = {
  UNKNOWN_ERROR: {
    code: 'SYS_001',
    message: 'Unknown error',
    description: 'An unknown error occurred',
    level: ErrorLevel.ERROR,
    category: ErrorCategory.SYSTEM,
    userMessage: '发生未知错误',
    solution: '请重试操作，如果问题持续存在请联系技术支持',
    retryable: true,
    retryDelay: 3000,
    maxRetries: 2,
  },

  CONFIGURATION_ERROR: {
    code: 'SYS_002',
    message: 'Configuration error',
    description: 'System configuration is invalid',
    level: ErrorLevel.CRITICAL,
    category: ErrorCategory.SYSTEM,
    userMessage: '系统配置错误',
    solution: '请联系技术支持',
    retryable: false,
  },

  RESOURCE_EXHAUSTED: {
    code: 'SYS_003',
    message: 'Resource exhausted',
    description: 'System resources have been exhausted',
    level: ErrorLevel.CRITICAL,
    category: ErrorCategory.SYSTEM,
    userMessage: '系统资源不足',
    solution: '请稍后重试',
    retryable: true,
    retryDelay: 10000,
    maxRetries: 1,
  },
};

/**
 * 所有错误消息
 */
export const ALL_ERROR_MESSAGES = {
  ...VALIDATION_ERRORS,
  ...AUTHENTICATION_ERRORS,
  ...AUTHORIZATION_ERRORS,
  ...NETWORK_ERRORS,
  ...SERVER_ERRORS,
  ...GAME_LOGIC_ERRORS,
  ...SKILL_ERRORS,
  ...DATABASE_ERRORS,
  ...SYSTEM_ERRORS,
};

/**
 * 错误消息工具类
 */
export class ErrorMessageManager {
  private static instance: ErrorMessageManager;
  private currentLanguage: string = 'zh-CN';
  private customMessages: Record<string, ErrorMessage> = {};

  /**
   * 获取单例实例
   */
  public static getInstance(): ErrorMessageManager {
    if (!ErrorMessageManager.instance) {
      ErrorMessageManager.instance = new ErrorMessageManager();
    }
    return ErrorMessageManager.instance;
  }

  /**
   * 设置当前语言
   * @param language - 语言代码
   */
  public setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  /**
   * 获取错误消息
   * @param code - 错误码
   * @returns 错误消息对象
   */
  public getError(code: string): ErrorMessage | null {
    return this.customMessages[code] || ALL_ERROR_MESSAGES[code] || null;
  }

  /**
   * 获取用户友好的错误消息
   * @param code - 错误码
   * @param params - 参数对象（用于消息模板）
   * @returns 用户友好的错误消息
   */
  public getUserMessage(code: string, params?: Record<string, any>): string {
    const error = this.getError(code);
    if (!error) {
      return '发生未知错误';
    }

    let message = error.userMessage;

    // 替换消息中的参数
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        message = message.replace(
          new RegExp(`\\{${key}\\}`, 'g'),
          String(value)
        );
      });
    }

    return message;
  }

  /**
   * 获取错误解决方案
   * @param code - 错误码
   * @returns 解决方案
   */
  public getSolution(code: string): string | null {
    const error = this.getError(code);
    return error?.solution || null;
  }

  /**
   * 检查错误是否可重试
   * @param code - 错误码
   * @returns 是否可重试
   */
  public isRetryable(code: string): boolean {
    const error = this.getError(code);
    return error?.retryable || false;
  }

  /**
   * 获取重试配置
   * @param code - 错误码
   * @returns 重试配置
   */
  public getRetryConfig(
    code: string
  ): { delay: number; maxRetries: number } | null {
    const error = this.getError(code);
    if (!error || !error.retryable) {
      return null;
    }

    return {
      delay: error.retryDelay || 1000,
      maxRetries: error.maxRetries || 3,
    };
  }

  /**
   * 注册自定义错误消息
   * @param code - 错误码
   * @param message - 错误消息
   */
  public registerError(code: string, message: ErrorMessage): void {
    this.customMessages[code] = message;
  }

  /**
   * 移除自定义错误消息
   * @param code - 错误码
   */
  public unregisterError(code: string): void {
    delete this.customMessages[code];
  }

  /**
   * 格式化错误对象
   * @param code - 错误码
   * @param details - 错误详情
   * @param params - 参数对象
   * @returns 格式化的错误对象
   */
  public formatError(
    code: string,
    details?: any,
    params?: Record<string, any>
  ): {
    code: string;
    message: string;
    userMessage: string;
    level: ErrorLevel;
    category: ErrorCategory;
    retryable: boolean;
    solution?: string;
    details?: any;
  } {
    const error = this.getError(code);

    if (!error) {
      return {
        code: 'SYS_001',
        message: 'Unknown error',
        userMessage: '发生未知错误',
        level: ErrorLevel.ERROR,
        category: ErrorCategory.SYSTEM,
        retryable: true,
        details,
      };
    }

    return {
      code: error.code,
      message: error.message,
      userMessage: this.getUserMessage(code, params),
      level: error.level,
      category: error.category,
      retryable: error.retryable,
      solution: error.solution,
      details,
    };
  }
}

/**
 * 获取错误消息管理器实例
 */
export const errorManager = ErrorMessageManager.getInstance();
/**
 * 快捷函数：获取用户友好的错误消息
 * @param code - 错误码
 * @param params - 参数对象
 * @returns 用户友好的错误消息
 */
export function getUserErrorMessage(
  code: string,
  params?: Record<string, any>
): string {
  return errorManager.getUserMessage(code, params);
}

/**
 * 快捷函数：检查错误是否可重试
 * @param code - 错误码
 * @returns 是否可重试
 */
export function isErrorRetryable(code: string): boolean {
  return errorManager.isRetryable(code);
}

/**
 * 快捷函数：获取重试配置
 * @param code - 错误码
 * @returns 重试配置
 */
export function getErrorRetryConfig(
  code: string
): { delay: number; maxRetries: number } | null {
  return errorManager.getRetryConfig(code);
}

/**
 * 快捷函数：格式化错误
 * @param code - 错误码
 * @param details - 错误详情
 * @param params - 参数对象
 * @returns 格式化的错误对象
 */
export function formatError(
  code: string,
  details?: any,
  params?: Record<string, any>
) {
  return errorManager.formatError(code, details, params);
}
