import { AppError, ErrorCode  } from './errorHandler';
import { ErrorSeverity  } from './unifiedErrorHandler';
import { improvedErrorSystem  } from './improvedErrorSystem';
import { userNotificationSystem  } from './userNotificationSystem';

/**
* 文件级注释：错误处理使用示例
* 展示如何在不同场景下使用改进的错误处理系统
* 提供最佳实践和常见用法模式
 */

/**
* API 调用错误处理示例
 */
export class ApiErrorHandlingExample { /**
  * 带错误处理的 API 调用
   */
  static async fetchUserData(userId: string): Promise<any> {
    try {
      const response = await fetch(`/api/users/${userId }`);

      if (!response.ok) { throw new AppError(;
          `Failed to fetch user data: ${response.statusText }`,
          response.status === 404 ? ErrorCode.DATA_NOT_FOUND : ErrorCode.API_ERROR;
        );,
}

      return await response.json();,
} catch (error) { // 使用改进的错误处理系统
      const result = await improvedErrorSystem.handleError(error, {
        context: `fetchUserData:${userId }`,
        severity: ErrorSeverity.MEDIUM,
        showToUser: true,
        retryable: true,
        maxRetries: 3,
});

      if (result.shouldRetry) { // 可以在这里实现自动重试逻辑
        console.log('API 调用失败，建议重试');,
}

      throw error;,
}
  }

  /**
  * 批量 API 调用错误处理
   */
  static async fetchMultipleUsers(userIds: string[]): Promise<any[]> { const results = [];
    const errors = [];

    for (const userId of userIds) {
      try {
        const userData = await this.fetchUserData(userId);
        results.push(userData);,
} catch (error) { errors.push({ userId, error  });

        // 对于批量操作，使用较低的严重级别
        await improvedErrorSystem.handleError(error, { context: `batchFetchUsers:${userId }`,
          severity: ErrorSeverity.LOW,
          showToUser: false, // 批量操作不逐个显示错误
          logError: true,
});,
}
    }

    // 如果有错误，显示汇总信息
    if (errors.length > 0) { userNotificationSystem.showWarning(
        `${errors.length } 个用户数据获取失败，已跳过`
      );,
}

    return results;,
}
}

/**
* 表单验证错误处理示例
 */
export class FormValidationExample { /**
  * 表单提交错误处理
   */
  static async submitForm(formData: Record<string, any>): Promise<boolean> {
    try {
      // 客户端验证
      const validationErrors = this.validateForm(formData);
      if (validationErrors.length > 0) {
        // 显示验证错误
        validationErrors.forEach(error => {
          improvedErrorSystem.handleError(error, {
            context: 'formValidation',
            severity: ErrorSeverity.LOW,
            showToUser: true,
});,
});
        return false;,
}

      // 提交表单
      const response = await fetch('/api/submit', { method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify(formData),
});

      if (!response.ok) { const errorData = await response.json();
        throw new AppError(;
          errorData.message || 'Form submission failed',
          ErrorCode.API_ERROR,
          errorData
        );,
}

      userNotificationSystem.showSuccess('表单提交成功！');
      return true;,
} catch (error) { await improvedErrorSystem.handleError(error, {
        context: 'formSubmission',
        severity: ErrorSeverity.HIGH,
        showToUser: true,
        customMessage: '表单提交失败，请检查输入后重试',
});

      return false;,
}
  }

  /**
  * 表单验证
   */
  private static validateForm(formData: Record<string, any>): Error[] { const errors: Error[] = [];

    if (!formData.email) {
      errors.push(new AppError('邮箱地址不能为空', ErrorCode.DATA_INVALID));,
} else if (!this.isValidEmail(formData.email)) { errors.push(new AppError('邮箱地址格式不正确', ErrorCode.DATA_INVALID));,
}

    if (!formData.password) { errors.push(new AppError('密码不能为空', ErrorCode.DATA_INVALID));,
} else if (formData.password.length < 6) { errors.push(new AppError('密码长度至少6位', ErrorCode.DATA_INVALID));,
}

    return errors;,
}

  /**
  * 邮箱格式验证
   */
  private static isValidEmail(email: string): boolean { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);,
}
}

/**
* 游戏操作错误处理示例
 */
export class GameOperationExample { /**
  * 技能使用错误处理
   */
  static async useSkill(skillId: string, targetId?: string): Promise<boolean> {
    const loadingToast = userNotificationSystem.showLoading('正在使用技能...');

    try {
      const response = await fetch('/api/game/use-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify({ skillId, targetId  }),
});

      if (!response.ok) { const errorData = await response.json();
        throw new AppError(;
          errorData.message || 'Skill usage failed',
          ErrorCode.SKILL_ERROR,
          { skillId, targetId, ...errorData  }
        );,
}

      const result = await response.json();
      userNotificationSystem.updateLoadingToSuccess(loadingToast, '技能使用成功！');

      return true;,
} catch (error) { userNotificationSystem.updateLoadingToError(loadingToast, '技能使用失败');

      await improvedErrorSystem.handleError(error, {
        context: `useSkill:${skillId }`,
        severity: ErrorSeverity.MEDIUM,
        showToUser: false, // 已经通过 toast 显示了
        retryable: true,
        maxRetries: 2,
});

      return false;,
}
  }

  /**
  * 投票操作错误处理
   */
  static async submitVote(targetId: string): Promise<boolean> { try {
      const response = await fetch('/api/game/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify({ targetId  }),
});

      if (!response.ok) { const errorData = await response.json();

        // 根据错误类型提供不同的处理
        if (errorData.code === 'VOTE_ALREADY_SUBMITTED') {
          userNotificationSystem.showWarning('您已经投过票了');
          return false;,
}

        if (errorData.code === 'VOTE_PHASE_ENDED') { userNotificationSystem.showInfo('投票阶段已结束');
          return false;,
}

        throw new AppError(;
          errorData.message || 'Vote submission failed',
          ErrorCode.VOTE_ERROR,
          errorData
        );,
}

      userNotificationSystem.showSuccess('投票成功！');
      return true;,
} catch (error) { await improvedErrorSystem.handleError(error, {
        context: `submitVote:${targetId }`,
        severity: ErrorSeverity.MEDIUM,
        showToUser: true,
        customMessage: '投票失败，请重试',
});

      return false;,
}
  },
}

/**
* 文件上传错误处理示例
 */
export class FileUploadExample { /**
  * 文件上传错误处理
   */
  static async uploadFile(file: File): Promise<string | null> {
    // 文件大小检查
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      await improvedErrorSystem.handleError(
        new AppError('文件大小超过限制', ErrorCode.DATA_INVALID),
        {
          context: 'fileUpload',
          severity: ErrorSeverity.LOW,
          showToUser: true,
          customMessage: '文件大小不能超过 5MB',
}
      );
      return null;,
}

    // 文件类型检查
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) { await improvedErrorSystem.handleError(
        new AppError('不支持的文件类型', ErrorCode.DATA_INVALID),
        {
          context: 'fileUpload',
          severity: ErrorSeverity.LOW,
          showToUser: true,
          customMessage: '只支持 JPG、PNG、GIF 格式的图片',
}
      );
      return null;,
}

    const loadingToast = userNotificationSystem.showLoading('正在上传文件...');

    try { const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
});

      if (!response.ok) { throw new AppError(;
          'File upload failed',
          ErrorCode.API_ERROR,
          { status: response.status  }
        );,
}

      const result = await response.json();
      userNotificationSystem.updateLoadingToSuccess(loadingToast, '文件上传成功！');

      return result.url;,
} catch (error) { userNotificationSystem.updateLoadingToError(loadingToast, '文件上传失败');

      await improvedErrorSystem.handleError(error, {
        context: 'fileUpload',
        severity: ErrorSeverity.MEDIUM,
        showToUser: false, // 已经通过 toast 显示了
        retryable: true,
        maxRetries: 2,
});

      return null;,
}
  },
}

/**
* 错误处理最佳实践示例
 */
export class ErrorHandlingBestPractices { /**
  * 包装异步操作的通用方法
   */
  static async withErrorHandling<T>(operation: () => Promise<T>,
    context: string,
    options: {
      severity?: ErrorSeverity;
      showToUser?: boolean;
      customMessage?: string;
      retryable?: boolean;
      fallback?: () => T;,
} = {}
  ): Promise<T | null> { try {
      return await operation();,
} catch (error) { await improvedErrorSystem.handleError(error, {
        context,
        severity: options.severity || ErrorSeverity.MEDIUM,
        showToUser: options.showToUser !== false,
        customMessage: options.customMessage,
        retryable: options.retryable || false,
});

      // 如果有回退方案，使用回退方案
      if (options.fallback) { try {
          return options.fallback();,
} catch (fallbackError) { await improvedErrorSystem.handleError(fallbackError, {
            context: `${context }:fallback`,
            severity: ErrorSeverity.HIGH,
            showToUser: true,
            customMessage: '备用方案也失败了，请稍后重试',
});,
}
      }

      return null;,
}
  }

  /**
  * 批量操作错误处理
   */
  static async processBatch<T, R>(items: T[],
    processor: (item: T) => Promise<R>,
    options: { continueOnError?: boolean;
      maxErrors?: number;
      context?: string;,
} = {}
  ): Promise<{ results: R[]; errors: Array<{ item: T; error: any  }> }> { const results: R[] = [];
    const errors: Array<{ item: T; error: any  }> = [];
    const maxErrors = options.maxErrors || items.length;

    for (const item of items) { try {
        const result = await processor(item);
        results.push(result);,
} catch (error) { errors.push({ item, error  });

        await improvedErrorSystem.handleError(error, { context: options.context || 'batchProcessing',
          severity: ErrorSeverity.LOW,
          showToUser: false,
          logError: true,
});

        // 如果错误太多，停止处理
        if (errors.length >= maxErrors && !options.continueOnError) { userNotificationSystem.showError(
            `批量处理失败，错误数量过多（${errors.length }/${ items.length }）`
          );
          break;,
}
      },
}

    // 显示处理结果摘要
    if (errors.length > 0) { userNotificationSystem.showWarning(
        `批量处理完成：成功 ${results.length } 个，失败 ${ errors.length } 个`
      );,
} else { userNotificationSystem.showSuccess(
        `批量处理完成：成功处理 ${results.length } 个项目`
      );,
}

    return { results, errors  };,
}
}