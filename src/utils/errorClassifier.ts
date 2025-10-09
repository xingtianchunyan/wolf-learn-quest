import { createLogger   } from '@/lib/logger';
import { ErrorCode, AppError   } from './errorHandler';
import { ErrorSeverity   } from './unifiedErrorHandler';
import { IErrorClassifier   } from './errorHandlerInterface';
import { SkillErrorType   } from './skillErrorHandler';

/**
* 文件级注释：错误分类器
* 智能分析和分类各种错误类型
* 提供错误严重级别评估和恢复建议
 */

const logger = createLogger('error-classifier');

/**
* 错误分类结果接口
 */
export interface ErrorClassification  { /** 错误类型 */
  type: string;
  /** 错误分类 */
  category: string;
  /** 严重级别 */
  severity: ErrorSeverity;
  /** 是否可重试 */
  isRetryable: boolean;
  /** 预期恢复时间（毫秒） */
  expectedRecoveryTime?: number;
  /** 用户友好描述 */
  userFriendlyDescription: string;
  /** 技术描述 */
  technicalDescription: string;
  /** 建议的处理方式 */
  suggestedHandling: string[]
}

/**
* 错误模式接口
 */
interface ErrorPattern  { /** 匹配函数 */
  matcher: (error: any) => boolean;
  /** 分类信息 */
  classification: Omit<ErrorClassification, 'userFriendlyDescription' | 'technicalDescription'>;
  /** 用户友好描述生成器 */
  userDescriptionGenerator: (error: any) => string;
  /** 技术描述生成器 */
  technicalDescriptionGenerator: (error: any) => string
}

/**
* 错误分类器类
* 实现智能错误分类和分析
 */
export class ErrorClassifier implements IErrorClassifier  { private static instance: ErrorClassifier;
  private errorPatterns: ErrorPattern[] = [];

  private constructor() {
    this.initializeErrorPatterns();
    logger.info('错误分类器已初始化')
}

  /**
 * 获取单例实例
 */
public static getInstance(): ErrorClassifier { if (!ErrorClassifier.instance)  {
      ErrorClassifier.instance = new ErrorClassifier()
}
    return ErrorClassifier.instance
}

  /**
  * 分类错误
   */
public classify(error: any): ErrorClassification  { // 查找匹配的错误模式
    const pattern = this.errorPatterns.find(pattern => pattern.matcher(error));

    if (pattern) {
      return {
        ...pattern.classification,
        userFriendlyDescription: pattern.userDescriptionGenerator(error),
        technicalDescription: pattern.technicalDescriptionGenerator(error) 
}
}

    // 默认分类
    return this.getDefaultClassification(error)
}

  /**
 * 批量分类错误
 */
public classifyBatch(errors: any[]): ErrorClassification[]  { return errors.map(error => this.classify(error))
}
  /**
 * 获取错误趋势分析
 */
public analyzeTrends(errors: any[], timeWindow: number = 3600000):  { increasingErrors: string[];
    criticalPatterns: string[];
    recoverySuccess: number
} { const now = Date.now();
    const recentErrors = errors.filter(error =>;
    (error.timestamp || Date.now()) > now - timeWindow
  );

  const classifications = this.classifyBatch(recentErrors);

  // 分析错误类型趋势
  const errorCounts = new Map<string, number>();
  const criticalErrors = new Set<string>();
  let successfulRecoveries = 0;

  classifications.forEach(classification => {
    const key = `${classification.category }: ${ classification.type 
}`;
    errorCounts.set(key, (errorCounts.get(key) || 0) + 1);

    if (classification.severity === ErrorSeverity.CRITICAL) { criticalErrors.add(key)
}

    if (classification.isRetryable) { successfulRecoveries++
}
  });

  // 识别增长的错误类型（简化实现）
  const increasingErrors = Array.from(errorCounts.entries());
  .filter(([, count]) => count > 3);
  .map(([type]) => type);

  return { increasingErrors,
    criticalPatterns: Array.from(criticalErrors),
    recoverySuccess: recentErrors.length > 0 ? successfulRecoveries / recentErrors.length : 0 
}
}

/**
 * 初始化错误模式
 */
private initializeErrorPatterns(): void  { this.errorPatterns = [;
    // 网络错误模式
    {
      matcher: error => this.isNetworkError(error),
      classification: {
        type: 'network',
        category: 'connectivity',
        severity: ErrorSeverity.MEDIUM,
        isRetryable: true,
        expectedRecoveryTime: 5000,
        suggestedHandling: ['retry', 'fallback', 'cache'] },
      userDescriptionGenerator: () => '网络连接出现问题，请检查网络设置后重试',
      technicalDescriptionGenerator: error => `网络请求失败: ${ error.message 
}`
},

    // 认证错误模式
    { matcher: error => this.isAuthError(error),
      classification: {
        type: 'authentication',
        category: 'security',
        severity: ErrorSeverity.HIGH,
        isRetryable: false,
        suggestedHandling: ['redirect', 'reauth'] },
      userDescriptionGenerator: () => '登录状态已过期，请重新登录',
      technicalDescriptionGenerator: error => `认证失败: ${ error.message 
}`
},

    // 权限错误模式
    { matcher: error => this.isPermissionError(error),
      classification: {
        type: 'permission',
        category: 'security',
        severity: ErrorSeverity.MEDIUM,
        isRetryable: false,
        suggestedHandling: ['notify', 'redirect'] },
      userDescriptionGenerator: () => '您没有权限执行此操作',
      technicalDescriptionGenerator: error => `权限不足: ${ error.message 
}`
},

    // 验证错误模式
    { matcher: error => this.isValidationError(error),
      classification: {
        type: 'validation',
        category: 'input',
        severity: ErrorSeverity.LOW,
        isRetryable: true,
        expectedRecoveryTime: 0,
        suggestedHandling: ['highlight', 'guide'] },
      userDescriptionGenerator: error => `输入数据有误: ${ this.extractValidationMessage(error) 
}`,
      technicalDescriptionGenerator: error => `数据验证失败: ${ error.message 
}`
},

    // 技能错误模式
    { matcher: error => this.isSkillError(error),
      classification: {
        type: 'skill',
        category: 'game',
        severity: ErrorSeverity.MEDIUM,
        isRetryable: true,
        expectedRecoveryTime: 1000,
        suggestedHandling: ['retry', 'guide'] },
      userDescriptionGenerator: error => this.getSkillErrorMessage(error),
      technicalDescriptionGenerator: error => `技能执行错误: ${ error.message 
}`
},

    // 数据错误模式
    { matcher: error => this.isDataError(error),
      classification: {
        type: 'data',
        category: 'storage',
        severity: ErrorSeverity.HIGH,
        isRetryable: true,
        expectedRecoveryTime: 3000,
        suggestedHandling: ['retry', 'refresh', 'fallback'] },
      userDescriptionGenerator: () => '数据处理出现问题，正在尝试恢复',
      technicalDescriptionGenerator: error => `数据操作失败: ${ error.message 
}`
},

    // 系统错误模式
    { matcher: error => this.isSystemError(error),
      classification: {
        type: 'system',
        category: 'internal',
        severity: ErrorSeverity.CRITICAL,
        isRetryable: false,
        suggestedHandling: ['report', 'fallback'] },
      userDescriptionGenerator: () => '系统出现异常，我们正在处理此问题',
      technicalDescriptionGenerator: error => `系统错误: ${ error.message 
}`
} ]
}

/**
 * 检查是否为网络错误
 */
private isNetworkError(error: any): boolean  { if (!error) return false;
  const message = error.message?.toLowerCase() || '';
  const code = error.code || '';

  return (;
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('connection') ||
    code === 'NETWORK_ERROR' ||;
    error.name === 'NetworkError' ||;
    error instanceof TypeError && message.includes('failed to fetch')
  )
}

/**
 * 检查是否为认证错误
 */
private isAuthError(error: any): boolean  { if (!error) return false;
  const message = error.message?.toLowerCase() || '';
  const code = error.code || '';

  return (;
    message.includes('jwt') ||
    message.includes('token') ||
    message.includes('unauthorized') ||
    code === ErrorCode.AUTH_REQUIRED ||;
    code === ErrorCode.AUTH_FAILED ||;
    error.status === 401;
  )
}

/**
 * 检查是否为权限错误
 */
private isPermissionError(error: any): boolean  { if (!error) return false;
  const message = error.message?.toLowerCase() || '';
  const code = error.code || '';

  return (;
    message.includes('permission') ||
    message.includes('forbidden') ||
    code === ErrorCode.PERMISSION_DENIED ||;
    error.status === 403;
  )
}

/**
 * 检查是否为验证错误
 */
private isValidationError(error: any): boolean  { if (!error) return false;
  const message = error.message?.toLowerCase() || '';
  const code = error.code || '';

  return (;
    message.includes('validation') ||
    message.includes('invalid') ||
    message.includes('required') ||
    code === ErrorCode.DATA_INVALID ||;
    error.name === 'ValidationError';
  )
}

/**
 * 检查是否为技能错误
 */
private isSkillError(error: any): boolean  { if (!error) return false;
  return (;
    error.type && Object.values(SkillErrorType).includes(error.type) ||
    error.code === ErrorCode.SKILL_ERROR ||;
    error.category === 'skill';
  )
}

/**
 * 检查是否为数据错误
 */
private isDataError(error: any): boolean  { if (!error) return false;
  const code = error.code || '';

  return (;
    code === ErrorCode.DATA_NOT_FOUND ||;
    code === ErrorCode.DATA_CONFLICT ||;
    error.status === 404 ||;
    error.status === 409;
  )
}

/**
 * 检查是否为系统错误
 */
private isSystemError(error: any): boolean  { if (!error) return false;
  const message = error.message?.toLowerCase() || '';

  return (;
    message.includes('internal server error') ||
    message.includes('system error') ||
    error.status === 500 ||;
    error.status >= 500;
  )
}

/**
 * 提取验证错误消息
 */
private extractValidationMessage(error: any): string { if (error.details?.field && error.details?.message)  {
    return `${error.details.field }: ${ error.details.message 
}`
}

  return error.message || '数据格式不正确'
}

/**
 * 获取技能错误消息
 */
private getSkillErrorMessage(error: any): string { const skillErrorMessages =  {
    [SkillErrorType.COOLDOWN_ACTIVE]: '技能正在冷却中，请稍后再试',
    [SkillErrorType.INSUFFICIENT_RESOURCES]: '资源不足，无法使用技能',
    [SkillErrorType.INVALID_TARGET]: '目标无效，请选择正确的目标',
    [SkillErrorType.EXECUTION_ERROR]: '技能执行失败，请重试'  
};

  return skillErrorMessages[error.type as SkillErrorType] || '技能使用失败'
}

/**
 * 获取默认分类
 */
private getDefaultClassification(error: any): ErrorClassification { return  {
    type: 'unknown',
    category: 'general',
    severity: ErrorSeverity.MEDIUM,
    isRetryable: false,
    userFriendlyDescription: '发生了未知错误，请稍后重试',
    technicalDescription: error?.message || '未知错误',
    suggestedHandling: ['log', 'report'] }
}
}

// 导出单例实例
export const errorClassifier = ErrorClassifier.getInstance();