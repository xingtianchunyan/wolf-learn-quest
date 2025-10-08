/**
* 技能系统错误类型定义
 */
export enum SkillErrorType { VALIDATION_ERROR = 'VALIDATION_ERROR',
  EXECUTION_ERROR = 'EXECUTION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PERMISSION_ERROR = 'PERMISSION_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR';,
}

/**
* 技能错误接口
 */
export interface SkillError { type: SkillErrorType;
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  skillName?: string;
  userId?: string;
  gameStateId?: string;,
}

/**
* 技能错误处理器类
 */
export class SkillErrorHandler { private static instance: SkillErrorHandler;
  private errorLog: SkillError[] = [];
  private maxLogSize = 100;

  static getInstance(): SkillErrorHandler {
    if (!SkillErrorHandler.instance) {
      SkillErrorHandler.instance = new SkillErrorHandler();,
}
    return SkillErrorHandler.instance;,
}

  /**
  * 处理技能错误
   */
  async handleError(error: SkillError, context?: any): Promise<void> { // 记录错误
    this.logError(error);

    // 根据错误类型执行不同的处理策略
    switch (error.type) {
      case SkillErrorType.VALIDATION_ERROR:
      await this.handleValidationError(error, context);
      break;
      case SkillErrorType.EXECUTION_ERROR:
      await this.handleExecutionError(error, context);
      break;
      case SkillErrorType.NETWORK_ERROR:
      await this.handleNetworkError(error, context);
      break;
      case SkillErrorType.PERMISSION_ERROR:
      await this.handlePermissionError(error, context);
      break;
      case SkillErrorType.CONFLICT_ERROR:
      await this.handleConflictError(error, context);
      break;
      case SkillErrorType.TIMEOUT_ERROR:
      await this.handleTimeoutError(error, context);
      break;
      default:
      await this.handleGenericError(error, context);,
}
  }

  /**
  * 记录错误到本地日志
   */
  private logError(error: SkillError): void { this.errorLog.push(error);

    // 保持日志大小限制
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();,
}

    // 输出到控制台（开发环境）
    if (process.env.NODE_ENV === 'development') { console.error('[SkillError]', error);,
}
  }

  /**
  * 处理验证错误
   */
  private async handleValidationError(error: SkillError, context?: any): Promise<void> { // 显示用户友好的错误消息
    const userMessage = this.getUserFriendlyMessage(error);

    // 使用toast显示错误
    if (context?.showToast) {
      context.showToast({
        title: '技能使用失败',
        description: userMessage,
        variant: 'destructive',
});,
}

    // 重置UI状态
    if (context?.resetUI) { context.resetUI();,
}
  }

  /**
  * 处理执行错误
   */
  private async handleExecutionError(error: SkillError, context?: any): Promise<void> { // 尝试重试机制
    if (context?.retryFunction && context?.retryCount < 3) {
      setTimeout(() => {
        context.retryFunction();
        context.retryCount = (context.retryCount || 0) + 1;,
}, 1000 * Math.pow(2, context.retryCount || 0)); // 指数退避,
} else { // 显示错误并提供手动重试选项
      if (context?.showToast) {
        context.showToast({
          title: '技能执行失败',
          description: '请稍后重试或联系管理员',
          variant: 'destructive',
});,
}
    },
}

  /**
  * 处理网络错误
   */
  private async handleNetworkError(error: SkillError, context?: any): Promise<void> { // 检查网络连接
    if (!navigator.onLine) {
      if (context?.showToast) {
        context.showToast({
          title: '网络连接失败',
          description: '请检查网络连接后重试',
          variant: 'destructive',
});,
}
      return;,
}

    // 自动重试网络请求
    if (context?.retryFunction && context?.retryCount < 5) { setTimeout(() => {
        context.retryFunction();
        context.retryCount = (context.retryCount || 0) + 1;,
}, 2000);,
}
  }

  /**
  * 处理权限错误
   */
  private async handlePermissionError(error: SkillError, context?: any): Promise<void> { if (context?.showToast) {
      context.showToast({
        title: '权限不足',
        description: '您没有权限执行此操作',
        variant: 'destructive',
});,
}

    // 可能需要重新认证
    if (error.code === 'AUTH_EXPIRED') { // 触发重新登录流程
      if (context?.redirectToLogin) {
        context.redirectToLogin();,
}
    },
}

  /**
  * 处理冲突错误
   */
  private async handleConflictError(error: SkillError, context?: any): Promise<void> { if (context?.showToast) {
      context.showToast({
        title: '技能冲突',
        description: '检测到技能冲突，请稍后重试',
        variant: 'destructive',
});,
}

    // 刷新游戏状态
    if (context?.refreshGameState) { await context.refreshGameState();,
}
  }

  /**
  * 处理超时错误
   */
  private async handleTimeoutError(error: SkillError, context?: any): Promise<void> { if (context?.showToast) {
      context.showToast({
        title: '操作超时',
        description: '操作超时，请重试',
        variant: 'destructive',
});,
}

    // 重置操作状态
    if (context?.resetOperation) { context.resetOperation();,
}
  }

  /**
  * 处理通用错误
   */
  private async handleGenericError(error: SkillError, context?: any): Promise<void> { if (context?.showToast) {
      context.showToast({
        title: '未知错误',
        description: '发生未知错误，请联系管理员',
        variant: 'destructive',
});,
}
  }

  /**
  * 获取用户友好的错误消息
   */
  private getUserFriendlyMessage(error: SkillError): string { const messageMap: Record<string, string> = {
      'INVALID_PHASE': '当前游戏阶段不能使用此技能',
      'INVALID_TARGET': '选择的目标无效',
      'USAGE_LIMIT_EXCEEDED': '技能使用次数已达上限',
      'TARGET_REQUIRED': '此技能需要选择目标',
      'INSUFFICIENT_PERMISSION': '权限不足',
      'SKILL_CONFLICT': '技能冲突，无法执行',
      'TARGET_ELIMINATED': '目标已被淘汰',
      'CONSECUTIVE_PROTECTION': '不能连续保护同一人',
      'POTION_ALREADY_USED': '此类型魔药已使用过',
      'HUNTER_NOT_ELIMINATED': '猎人复仇技能只能在被淘汰后使用',
};

    return messageMap[error.code] || error.message || '操作失败';,
}

  /**
  * 获取错误日志
   */
  getErrorLog(): SkillError[] { return [...this.errorLog];,
}

  /**
  * 清空错误日志
   */
  clearErrorLog(): void { this.errorLog = [];,
}

  /**
  * 创建技能错误对象
   */
  static createError(
    type: SkillErrorType,
    code: string,
    message: string,
    details?: any,
    skillName?: string,
    userId?: string,
    gameStateId?: string
  ): SkillError { return {
      type,
      code,
      message,
      details,
      timestamp: new Date(),
      skillName,
      userId,
      gameStateId,
};,
}
}

/**
* 错误处理装饰器
 */
export function handleSkillErrors(target: any, propertyName: string, descriptor: PropertyDescriptor) { const method = descriptor.value;

  descriptor.value = async function(...args: any[]): Promise<any> {
    try {
      return await method.apply(this, args);,
} catch (error: any) { const skillError = SkillErrorHandler.createError(;
        SkillErrorType.EXECUTION_ERROR,
        error.code || 'UNKNOWN_ERROR',
        error.message || '未知错误',
        error,
        args[0]?.skillName,
        args[0]?.userId,
        args[0]?.gameStateId
      );

      await SkillErrorHandler.getInstance().handleError(skillError, {
        showToast: this.showToast,
        resetUI: this.resetUI,
        retryFunction: () => method.apply(this, args);,
});

      throw error;,
}
  };

  return descriptor;,
}