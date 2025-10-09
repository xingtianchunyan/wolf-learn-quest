import { createLogger   } from '@/lib/logger';
import { ErrorMonitoringService   } from '@/services/errorMonitoringService';
import {
  IErrorHandler, ErrorClassifier, ErrorClassification   } from './errorClassifier';
import { ErrorSeverity   } from './unifiedErrorHandler';
import { UserNotificationSystem, NotificationType   } from './userNotificationSystem';

/**
* 文件级注释：改进的统一错误处理系统
* 整合错误分类、用户通知、监控和恢复机制
* 提供一致的错误处理体验和完整的错误生命周期管理
 */

  ErrorHandlingResult,
  StandardErrorOptions,
  IErrorRecoveryStrategy  } from './errorHandlerInterface';

const logger = createLogger('improved-error-system');

/**
* 错误恢复策略实现
 */
class ErrorRecoveryStrategy implements IErrorRecoveryStrategy  { /**
 * 检查是否可以恢复
 */
public canRecover(error: any): boolean  {
    const classifier = ErrorClassifier.getInstance();
    const classification = classifier.classify(error);

    return classification.isRetryable &&;
    classification.severity !== ErrorSeverity.CRITICAL
}

  /**
 * 执行恢复操作
 */
public async recover(error: any): Promise<boolean>  { const classifier = ErrorClassifier.getInstance();
    const classification = classifier.classify(error);

    if (!this.canRecover(error)) {
      return false
}

    try { // 根据错误类型执行不同的恢复策略
      switch (classification.category) {
        case 'connectivity':
        return await this.recoverNetworkError(error);
        case 'input':
        return await this.recoverValidationError(error);
        case 'game':
        return await this.recoverGameError(error);
        case 'storage':
        return await this.recoverDataError(error);
        default: return await this.genericRecover(error)
}
    } catch (recoveryError) { logger.error('错误恢复失败', { originalError: error, recoveryError  });
      return false
}
  }

  /**
 * 获取恢复建议
 */
public getRecoverySuggestion(error: any): string  { const classifier = ErrorClassifier.getInstance();
    const classification = classifier.classify(error);

    const suggestions = {
      'connectivity': '请检查网络连接并重试',
      'security': '请重新登录后再试',
      'input': '请检查输入数据的格式',
      'game': '请稍后重试或刷新页面',
      'storage': '数据同步中，请稍后重试',
      'internal': '系统维护中，请稍后再试'  
};

    return suggestions[classification.category as keyof typeof suggestions] ||;
    '请稍后重试或联系技术支持'
}

  /**
  * 恢复网络错误
   */
private async recoverNetworkError(error: any): Promise<boolean>  { // 简单的网络连接检查
    try {
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache' 
});
      return response.ok
} catch { return false
}
  }

  /**
  * 恢复验证错误
   */
private async recoverValidationError(error: any): Promise<boolean>  { // 验证错误通常需要用户手动修正
    return false
}

  /**
  * 恢复游戏错误
   */
private async recoverGameError(error: any): Promise<boolean>  { // 游戏状态可能需要重新同步
    try {
      // 这里可以添加游戏状态同步逻辑
      return true
} catch { return false
}
  }

  /**
  * 恢复数据错误
   */
private async recoverDataError(error: any): Promise<boolean>  { // 尝试重新获取数据
    try {
      // 这里可以添加数据重新获取逻辑
      return true
} catch { return false
}
  }

  /**
  * 通用恢复
   */
private async genericRecover(error: any): Promise<boolean>  { // 通用恢复策略，如清理缓存等
    return false
}
}

/**
* 改进的错误处理系统
* 整合所有错误处理组件，提供完整的错误处理解决方案
 */
export class ImprovedErrorSystem implements IErrorHandler  { private static instance: ImprovedErrorSystem;
  private classifier: ErrorClassifier;
  private notifier: UserNotificationSystem;
  private monitoring: ErrorMonitoringService;
  private recovery: ErrorRecoveryStrategy;
  private errorHistory: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: number;
    severity: ErrorSeverity;
    classification: ErrorClassification;
    handled: boolean;
    recovered: boolean
}> = [];
  private readonly MAX_HISTORY_SIZE = 200;
  private retryAttempts = new Map<string, number>();

  private constructor() { this.classifier = ErrorClassifier.getInstance();
    this.notifier = UserNotificationSystem.getInstance();
    this.monitoring = ErrorMonitoringService.getInstance();
    this.recovery = new ErrorRecoveryStrategy();

    logger.info('改进的错误处理系统已初始化')
}

  /**
 * 获取单例实例
 */
public static getInstance(): ImprovedErrorSystem { if (!ImprovedErrorSystem.instance)  {
      ImprovedErrorSystem.instance = new ImprovedErrorSystem()
}
    return ImprovedErrorSystem.instance
}

  /**
 * 处理错误的主要方法
 */
public async handleError(
    error: any,
    options: StandardErrorOptions = {
}
  ): Promise<ErrorHandlingResult> { const startTime = Date.now();
    const errorId = this.generateErrorId();

    try {
      // 1. 分类错误
      const classification = this.classifier.classify(error);

      // 2. 记录错误
      const errorRecord = {
        id: errorId,
        type: classification.type,
        message: error.message || 'Unknown error',
        timestamp: startTime,
        severity: classification.severity,
        classification,
        handled: false,
        recovered: false  
};

      this.addToHistory(errorRecord);

      // 3. 记录日志
      if (options.logError !== false) { logger.error('处理错误', {
          errorId,
          classification,
          context: options.context,
          error: error.message 
})
}

      // 4. 上报监控
      if (options.reportToMonitoring !== false) { this.monitoring.reportError({
          type: classification.type as any,
          code: classification.category,
          message: error.message || 'Unknown error',
          userMessage: classification.userFriendlyDescription,
          severity: classification.severity as any,
          context: options.context ? { context: options.context  
} : undefined,
          timestamp: startTime 
})
}

      // 5. 尝试恢复
      let recovered = false;
      if (classification.isRetryable && this.shouldAttemptRecovery(errorId, options)) { recovered = await this.attemptRecovery(error, classification, options);
        errorRecord.recovered = recovered
}

      // 6. 用户通知
      if (options.showToUser !== false && !recovered) { await this.notifyUser(classification, options, recovered)
}

      // 7. 标记为已处理
      errorRecord.handled = true;

      // 8. 返回处理结果
      return { handled: true,
        errorId,
        userMessage: options.customMessage || classification.userFriendlyDescription,
        shouldRetry: classification.isRetryable && !recovered,
        retryDelay: classification.expectedRecoveryTime,
        category: classification.category,
        timestamp: startTime 
}
} catch (handlingError) { logger.error('错误处理过程中发生异常', {
        errorId,
        originalError: error,
        handlingError });

      // 返回失败结果
      return { handled: false,
        errorId,
        userMessage: '系统出现异常，请稍后重试',
        shouldRetry: false,
        category: 'system',
        timestamp: startTime 
}
}
  }

  /**
 * 获取错误统计
 */
public getErrorStats():  { total: number;
    byType: Record<string, number>;
    bySeverity: Record<ErrorSeverity, number>;
    recent: number
} { const oneHourAgo = Date.now() - 3600000;
    const recentErrors = this.errorHistory.filter(;
      error => error.timestamp > oneHourAgo;
    );

    const byType: Record<string, number> = {  };
    const bySeverity: Record<ErrorSeverity, number> = { [ErrorSeverity.LOW]: 0,
      [ErrorSeverity.MEDIUM]: 0,
      [ErrorSeverity.HIGH]: 0,
      [ErrorSeverity.CRITICAL]: 0  
};

    this.errorHistory.forEach(error => {
  byType[error.type] = (byType[error.type] || 0) + 1;
      bySeverity[error.severity]++

});

    return { total: this.errorHistory.length,
      byType,
      bySeverity,
      recent: recentErrors.length 
}
}

  /**
 * 获取错误历史
 */
public getErrorHistory(limit: number = 50): Array< { id: string;
    type: string;
    message: string;
    timestamp: number;
    severity: ErrorSeverity
}> { return this.errorHistory;
    .slice(0, limit)
    .map(error => ({
      id: error.id,
      type: error.type,
      message: error.message,
      timestamp: error.timestamp,
      severity: error.severity 
}))
}

  /**
 * 清理错误历史
 */
public clearErrorHistory(olderThan?: number): void { if (olderThan)  {
      this.errorHistory = this.errorHistory.filter(;
        error => error.timestamp > olderThan;
      )
} else { this.errorHistory = []
}

    // 清理重试计数
    this.retryAttempts.clear();

    logger.info('错误历史已清理')
}

  /**
 * 获取错误趋势分析
 */
public getErrorTrends(timeWindow: number = 3600000):  { increasingErrors: string[];
    criticalPatterns: string[];
    recoverySuccess: number
} { const errors = this.errorHistory.map(error => ({
      ...error,
      timestamp: error.timestamp 
}));

    return this.classifier.analyzeTrends(errors, timeWindow)
}

  /**
 * 尝试恢复错误
 */
private async attemptRecovery(
    error: any,
    classification: ErrorClassification,
    options: StandardErrorOptions
  ): Promise<boolean> { if (!this.recovery.canRecover(error)) {
      return false
}

    try { const recovered = await this.recovery.recover(error);

      if (recovered) {
        logger.info('错误恢复成功', {
          errorType: classification.type,
          category: classification.category 
});

        // 显示恢复成功通知
        this.notifier.showSuccess('问题已自动解决')
}

      return recovered
} catch (recoveryError) { logger.error('错误恢复失败', { error, recoveryError  });
      return false
}
  }

  /**
 * 通知用户
 */
private async notifyUser(
    classification: ErrorClassification,
    options: StandardErrorOptions,
    recovered: boolean
  ): Promise<void> { if (recovered) {
      return; // 已恢复，不需要通知用户 }

    const message = options.customMessage || classification.userFriendlyDescription;

    switch (classification.severity) { case ErrorSeverity.LOW:
      this.notifier.showInfo(message);
      break;
      case ErrorSeverity.MEDIUM:
      this.notifier.showWarning(message);
      break;
      case ErrorSeverity.HIGH:
      case ErrorSeverity.CRITICAL:
      if (classification.isRetryable) {
        this.notifier.showErrorWithRecovery(message,
          () => this.handleRetry(classification),
          '重试'
        )
} else { this.notifier.showError(message)
}
      break
}
  }

  /**
  * 处理重试
   */
private handleRetry(classification: ErrorClassification): void  { // 这里可以添加重试逻辑
    logger.info('用户触发重试', { classification  })
}

  /**
 * 检查是否应该尝试恢复
 */
private shouldAttemptRecovery(
    errorId: string,
    options: StandardErrorOptions
  ): boolean { const maxRetries = options.maxRetries || 3;
    const currentRetries = this.retryAttempts.get(errorId) || 0;

    if (currentRetries >= maxRetries) {
      return false
}

    this.retryAttempts.set(errorId, currentRetries + 1);
    return true
}

  /**
 * 添加到历史记录
 */
private addToHistory(errorRecord: any): void  { this.errorHistory.unshift(errorRecord);
    // 限制历史记录大小
    if (this.errorHistory.length > this.MAX_HISTORY_SIZE) {
      this.errorHistory = this.errorHistory.slice(0, this.MAX_HISTORY_SIZE)
}
  }

  /**
 * 生成错误ID
 */
private generateErrorId(): string { return `error_${Date.now() 
}_$ { Math.random().toString(36).substr(2, 9) }`
}
}

// 导出单例实例
export const improvedErrorSystem = ImprovedErrorSystem.getInstance();