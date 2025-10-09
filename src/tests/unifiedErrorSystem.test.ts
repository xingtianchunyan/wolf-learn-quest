/**
 * 文件级注释：统一错误处理系统测试
 * 测试统一错误处理系统的各项功能和集成能力
 *
 * 测试范围：
 * - 错误标准化和分类
 * - 错误处理策略执行
 * - 重试机制和备用方案
 * - 错误统计和历史记录
 * - 与现有错误处理器的集成
 *
 * @author SOLO Coding
 * @version 2.0.0
 */
import  { describe, it, expect, beforeEach, afterEach, vi  } from 'vitest';
import { UnifiedErrorSystem  } from
  unifiedErrorSystem,
  ErrorType,
  ErrorSeverity,
  ErrorHandlingStrategy  } from '@/utils/unifiedErrorSystem';
import { AppError, ErrorCode  } from '@/utils/errorHandler';
import { SkillErrorType  } from '@/utils/skillErrorHandler';

// Mock logger
vi.mock('@/lib/logger', () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn() 
}) }));

// Mock window对象
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000/test',
    reload: vi.fn() 
},
  writable: true 
});

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn() 
},
  writable: true 
});

/**
 * 模拟技能错误类
 * 用于测试技能错误处理
 */
class MockSkillError  {
  type: SkillErrorType;
  message: string;
  skillName: string;
  userId: string;
  gameStateId: string;
  details?: Record<string, any>;

  constructor(
    type: SkillErrorType,
    message: string,
    skillName: string,
    userId: string,
    gameStateId: string,
    details?: Record<string, any>
  ) {
    this.type = type;
    this.message = message;
    this.skillName = skillName;
    this.userId = userId;
    this.gameStateId = gameStateId;
    this.details = details
}
}

describe('统一错误处理系统测试', () => {
  let errorSystem: UnifiedErrorSystem;

  beforeEach(() => {
  // 获取新的实例进行测试
    errorSystem = UnifiedErrorSystem.getInstance();
    // 清理之前的状态
    errorSystem.clearHistory();
    errorSystem.resetStatistics()

});

  afterEach(() => {
  // 清理资源
    errorSystem.cleanup();
    vi.clearAllMocks()

});

  describe('错误标准化测试', () => {
    it('应该正确标准化AppError', async () => {
      const appError = new AppError(ErrorCode.DATA_NOT_FOUND, '数据未找到');

      const result = await errorSystem.handleError(appError, {
        component: 'TestComponent',
        operation: 'data_fetch' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.APP);
      expect(result.classification.category).toBe('application');
      expect(result.severity).toBe(ErrorSeverity.MEDIUM)
});

    it('应该正确标准化SkillError', async () => {
      const skillError = new MockSkillError(
        SkillErrorType.VALIDATION_ERROR,
        '技能验证失败',
        'testSkill',
        'user123',
        'game456'
      );

      const result = await errorSystem.handleError(skillError, {
        component: 'SkillComponent' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.SKILL);
      expect(result.classification.category).toBe('skill');
      expect(result.severity).toBe(ErrorSeverity.LOW)
});

    it('应该正确标准化网络错误', async () => {
      const networkError = new Error('fetch failed');
      networkError.name = 'NetworkError';

      const result = await errorSystem.handleError(networkError, {
        component: 'ApiComponent',
        url: '/api/test' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.NETWORK);
      expect(result.severity).toBe(ErrorSeverity.MEDIUM);
      expect(result.shouldRetry).toBe(false); // 因为没有自定义恢复函数
    });

    it('应该正确标准化验证错误', async () => {
      const validationError = new Error('validation failed');
      validationError.name = 'ValidationError';

      const result = await errorSystem.handleError(validationError, {
        component: 'FormComponent' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.VALIDATION);
      expect(result.severity).toBe(ErrorSeverity.LOW)
});

    it('应该正确标准化权限错误', async () => {
      const permissionError = new Error('unauthorized');
      (permissionError as any).status = 401;

      const result = await errorSystem.handleError(permissionError, {
        component: 'AuthComponent' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.PERMISSION);
      expect(result.severity).toBe(ErrorSeverity.HIGH)
});

    it('应该正确标准化未知错误', async () => {
      const unknownError = new Error('unknown error');

      const result = await errorSystem.handleError(unknownError, {
        component: 'UnknownComponent' 
});

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.UNKNOWN);
      expect(result.severity).toBe(ErrorSeverity.MEDIUM)
})
});

  describe('错误处理策略测试', () => {
    it('应该执行静默处理策略', async () => {
      const error = new Error('test error');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          silent: true 
}
      );

      expect(result.handled).toBe(true);
      expect(result.requiresUserAction).toBe(false)
});

    it('应该执行Toast处理策略', async () => {
      const error = new AppError(ErrorCode.DATA_INVALID, '数据无效');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          showNotification: false, // 避免实际显示通知
        }
      );

      expect(result.handled).toBe(true);
      expect(result.requiresUserAction).toBe(false)
});

    it('应该执行模态框处理策略', async () => {
      const error = new AppError(ErrorCode.PERMISSION_DENIED, '权限不足');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          showNotification: false 
}
      );

      expect(result.handled).toBe(true);
      expect(result.requiresUserAction).toBe(true)
});

    it('应该执行重试处理策略', async () => {
      const networkError = new Error('network timeout');
      networkError.name = 'NetworkError';

      let retryCount = 0;
      const customRecovery = vi.fn().mockImplementation(() => {
  retryCount++;
        return Promise.resolve(retryCount <= 2); // 前两次重试成功
      
});

      const result = await errorSystem.handleError(
        networkError,
        {},
        {
          attemptRecovery: true,
          customRecovery,
          showNotification: false 
}
      );

      expect(result.handled).toBe(true);
      expect(customRecovery).toHaveBeenCalled()
})
});

  describe('重试机制测试', () => {
    it('应该正确执行重试逻辑', async () => {
      const retryableError = new AppError(ErrorCode.NETWORK_ERROR, '网络错误');

      let attemptCount = 0;
      const customRecovery = vi.fn().mockImplementation(() => {
  attemptCount++;
        return Promise.resolve(attemptCount >= 2); // 第二次重试成功
      
});

      const result = await errorSystem.handleError(
        retryableError,
        {},
        {
          attemptRecovery: true,
          customRecovery,
          maxRetries: 3,
          retryDelay: 100 
}
      );

      expect(result.handled).toBe(true);
      expect(customRecovery).toHaveBeenCalled()
});

    it('应该在达到最大重试次数后停止重试', async () => {
      const retryableError = new AppError(ErrorCode.API_ERROR, 'API错误');

      const customRecovery = vi.fn().mockResolvedValue(false); // 总是失败

      const result = await errorSystem.handleError(
        retryableError,
        {},
        {
          attemptRecovery: true,
          customRecovery,
          maxRetries: 2,
          retryDelay: 50 
}
      );

      expect(result.handled).toBe(true);
      expect(customRecovery).toHaveBeenCalled()
})
});

  describe('错误统计测试', () => {
    it('应该正确记录错误历史', async () => {
      const error = new AppError(ErrorCode.DATA_NOT_FOUND, '数据未找到');

      await unifiedErrorSystem.handleError(error, {
        component: 'TestComponent' 
});

      const history = unifiedErrorSystem.getErrorHistory();
      expect(history).toHaveLength(1);
      expect(history[0].code).toBe(ErrorCode.DATA_NOT_FOUND);
      expect(history[0].type).toBe(ErrorType.APP)
});

    it('应该正确更新统计信息', async () => {
      // 清理之前的统计
      unifiedErrorSystem.resetStatistics();

      const error1 = new AppError(ErrorCode.DATA_NOT_FOUND, '数据未找到');
      const error2 = new AppError(ErrorCode.NETWORK_ERROR, '网络错误');

      await unifiedErrorSystem.handleError(error1, {
        component: 'TestComponent1' 
});
      await unifiedErrorSystem.handleError(error2, {
        component: 'TestComponent2' 
});

      const stats = unifiedErrorSystem.getStatistics();
      expect(stats.total).toBe(2);
      expect(stats.byType[ErrorType.APP]).toBe(1);
      expect(stats.byType[ErrorType.NETWORK]).toBe(1)
});

    it('应该限制历史记录大小', async () => {
      // 清理历史记录
      unifiedErrorSystem.clearHistory();

      // 创建超过最大历史记录数量的错误
      for (let i = 0; i < 1005; i++) {
        const error = new AppError(ErrorCode.DATA_NOT_FOUND, `错误${i}`);
        await unifiedErrorSystem.handleError(error, {
          component: 'TestComponent' 
})
}

      const history = unifiedErrorSystem.getErrorHistory();
      expect(history.length).toBeLessThanOrEqual(1000); // 实际最大历史记录为1000
    })
});

  describe('函数包装测试', () => {
    it('应该正确包装异步函数', async () => {
      const asyncFunction = vi.fn().mockRejectedValue(new Error('async error'));

      const wrappedFunction = errorSystem.wrapAsync(
        asyncFunction,
        { component: 'TestComponent' 
},
        { silent: true 
}
      );

      const result = await wrappedFunction('test', 123);

      expect(result).toBeNull();
      expect(asyncFunction).toHaveBeenCalledWith('test', 123)
});

    it('应该正确包装同步函数', () => {
      const syncFunction = vi.fn().mockImplementation(() => {
  throw new Error('sync error')

});

      const wrappedFunction = errorSystem.wrapSync(
        syncFunction,
        { component: 'TestComponent' 
},
        { silent: true 
}
      );

      const result = wrappedFunction('test', 123);

      expect(result).toBeNull();
      expect(syncFunction).toHaveBeenCalledWith('test', 123)
})
});

  describe('选项覆盖测试', () => {
    it('应该正确应用策略覆盖', async () => {
      const error = new AppError(ErrorCode.DATA_INVALID, '数据无效');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          strategyOverride: ErrorHandlingStrategy.MODAL,
          showNotification: false 
}
      );

      expect(result.handled).toBe(true);
      expect(result.requiresUserAction).toBe(true)
});

    it('应该正确应用严重级别覆盖', async () => {
      const error = new Error('test error');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          severityOverride: ErrorSeverity.CRITICAL,
          silent: true 
}
      );

      expect(result.severity).toBe(ErrorSeverity.CRITICAL)
});

    it('应该正确应用自定义消息', async () => {
      const error = new Error('test error');

      const result = await errorSystem.handleError(
        error,
        {},
        {
          customMessage: '自定义错误消息',
          silent: true 
}
      );

      expect(result.userMessage).toBe('自定义错误消息')
})
});

  describe('资源清理测试', () => {
    it('应该正确清理错误历史', () => {
  // 添加一些错误到历史
      errorSystem.handleError(new Error('test1'));
      errorSystem.handleError(new Error('test2'));

      expect(errorSystem.getErrorHistory().length).toBeGreaterThan(0);

      errorSystem.clearHistory();
      expect(errorSystem.getErrorHistory()).toHaveLength(0)

});

    it('应该正确重置统计信息', async () => {
  // 处理一些错误
      await errorSystem.handleError(new Error('test1'));
      await errorSystem.handleError(new Error('test2'));

      expect(errorSystem.getStatistics().total).toBeGreaterThan(0);

      errorSystem.resetStatistics();
      expect(errorSystem.getStatistics().total).toBe(0)

});

    it('应该正确清理所有资源', async () => {
  // 添加一些数据
      await errorSystem.handleError(new Error('test'));

      expect(errorSystem.getErrorHistory().length).toBeGreaterThan(0);
      expect(errorSystem.getStatistics().total).toBeGreaterThan(0);

      errorSystem.cleanup();

      expect(errorSystem.getErrorHistory()).toHaveLength(0);
      expect(errorSystem.getStatistics().total).toBe(0)
})

});

  describe('错误处理器本身的错误处理', () => {
    it('应该处理错误处理过程中的异常', async () => {
      // 模拟一个会导致处理器内部错误的情况
      const problematicError = {
        get message() {
          throw new Error('getter error')
} };

      const result = await errorSystem.handleError(problematicError);

      expect(result.handled).toBe(false);
      expect(result.userMessage).toContain('系统发生未知错误');
      expect(result.classification.type).toBe(ErrorType.SYSTEM)
})
});

  describe('边界条件测试', () => {
    it('应该处理null错误', async () => {
  const result = await errorSystem.handleError(null);

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.UNKNOWN)

});

    it('应该处理undefined错误', async () => {
  const result = await errorSystem.handleError(undefined);

      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.UNKNOWN)

});

    it('应该处理字符串错误', async () => {
  const result = await errorSystem.handleError('string error');

      expect(result.handled).toBe(true);
      // 字符串错误会被转换为通用错误消息
      expect(result.userMessage).toContain('系统发生未知错误')

});

    it('应该处理数字错误', async () => {
  const result = await errorSystem.handleError(404);

      expect(result.handled).toBe(true);
      expect(result.userMessage).toContain('系统发生未知错误')
})
})

});
