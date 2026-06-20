/**
 * 统一错误处理系统测试
 * 测试统一错误处理的核心功能
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  UnifiedErrorHandler,
  unifiedErrorHandler,
  ErrorSeverity,
  ErrorHandlingStrategy,
  withUnifiedErrorHandling,
  createErrorWrapper,
  type UnifiedError,
  type ErrorContext,
  type ErrorHandlingOptions,
} from '../unifiedErrorHandler';
import { AppError, ErrorCode } from '../errorHandler';
import { SkillErrorType, SkillError } from '../skillErrorHandler';

// Mock logger
vi.mock('@/lib/logger', () => ({
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  })),
}));

// Mock window object
const mockWindow = {
  showToast: vi.fn(),
  showErrorModal: vi.fn(),
  location: { href: '' },
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
});

describe('UnifiedErrorHandler', () => {
  let handler: UnifiedErrorHandler;

  beforeEach(() => {
    handler = UnifiedErrorHandler.getInstance();
    handler.clearErrorHistory();
    vi.clearAllMocks();
  });

  afterEach(() => {
    handler.cleanup();
  });

  describe('单例模式', () => {
    /**
     * 测试单例模式实现
     */
    it('应该返回同一个实例', () => {
      const instance1 = UnifiedErrorHandler.getInstance();
      const instance2 = UnifiedErrorHandler.getInstance();

      expect(instance1).toBe(instance2);
      expect(instance1).toBe(unifiedErrorHandler);
    });
  });

  describe('错误处理', () => {
    /**
     * 测试 AppError 处理
     */
    it('应该正确处理 AppError', async () => {
      const appError = new AppError('测试错误', ErrorCode.DATA_NOT_FOUND, {
        test: 'data',
      });
      const context: ErrorContext = {
        userId: 'test-user',
        component: 'TestComponent',
      };

      await handler.handleError(appError, context);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);

      const unifiedError = history[0];
      expect(unifiedError.type).toBe('app');
      expect(unifiedError.code).toBe(ErrorCode.DATA_NOT_FOUND);
      expect(unifiedError.message).toBe('测试错误');
      expect(unifiedError.context?.userId).toBe('test-user');
      expect(unifiedError.context?.component).toBe('TestComponent');
    });

    /**
     * 测试 SkillError 处理
     */
    it('应该正确处理 SkillError', async () => {
      const skillError: SkillError = {
        type: SkillErrorType.VALIDATION_ERROR,
        code: 'SKILL_VALIDATION_FAILED',
        message: '技能验证失败',
        skillName: 'test_skill',
        userId: 'test-user',
        gameStateId: 'test-game',
        timestamp: Date.now(),
      };

      await handler.handleError(skillError);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);

      const unifiedError = history[0];
      expect(unifiedError.type).toBe('skill');
      expect(unifiedError.code).toBe('SKILL_VALIDATION_FAILED');
      expect(unifiedError.userMessage).toBe('技能使用条件不满足');
      expect(unifiedError.context?.skillName).toBe('test_skill');
      expect(unifiedError.context?.userId).toBe('test-user');
    });

    /**
     * 测试网络错误处理
     */
    it('应该正确处理网络错误', async () => {
      const networkError = new Error('Network request failed');
      networkError.name = 'NetworkError';

      await handler.handleError(networkError);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);

      const unifiedError = history[0];
      expect(unifiedError.type).toBe('network');
      expect(unifiedError.code).toBe('NETWORK_ERROR');
      expect(unifiedError.retryable).toBe(true);
      expect(unifiedError.maxRetries).toBe(5);
    });

    /**
     * 测试验证错误处理
     */
    it('应该正确处理验证错误', async () => {
      const validationError = new Error('Validation failed: invalid input');
      validationError.name = 'ValidationError';

      await handler.handleError(validationError);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);

      const unifiedError = history[0];
      expect(unifiedError.type).toBe('validation');
      expect(unifiedError.code).toBe('VALIDATION_ERROR');
      expect(unifiedError.retryable).toBe(false);
      expect(unifiedError.severity).toBe(ErrorSeverity.LOW);
    });

    /**
     * 测试通用错误处理
     */
    it('应该正确处理通用错误', async () => {
      const genericError = new Error('Something went wrong');

      await handler.handleError(genericError);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);

      const unifiedError = history[0];
      expect(unifiedError.type).toBe('system');
      expect(unifiedError.code).toBe('UNKNOWN_ERROR');
      expect(unifiedError.userMessage).toBe('系统发生未知错误，请稍后重试');
    });
  });

  describe('错误处理策略', () => {
    /**
     * 测试 Toast 策略
     */
    it('应该正确执行 Toast 策略', async () => {
      const error = new AppError('测试错误', ErrorCode.DATA_INVALID);

      await handler.handleError(error, undefined, { showUserMessage: true });

      expect(mockWindow.showToast).toHaveBeenCalledWith({
        title: '提示',
        description: expect.any(String),
        variant: 'default',
      });
    });

    /**
     * 测试静默策略
     */
    it('应该正确执行静默策略', async () => {
      const error = new Error('Silent error');

      // 模拟一个会触发静默策略的错误
      await handler.handleError(error, undefined, { showUserMessage: false });

      // 静默策略不应该显示任何用户界面
      expect(mockWindow.showToast).not.toHaveBeenCalled();
      expect(mockWindow.showErrorModal).not.toHaveBeenCalled();
    });

    /**
     * 测试重定向策略
     */
    it('应该正确执行重定向策略', async () => {
      const authError = new AppError('认证失败', ErrorCode.AUTH_REQUIRED);

      await handler.handleError(authError);

      // 检查是否设置了重定向URL
      expect(mockWindow.location.href).toContain('/error');
      expect(mockWindow.location.href).toContain('code=AUTH_REQUIRED');
    });
  });

  describe('异步函数包装', () => {
    /**
     * 测试成功的异步函数包装
     */
    it('应该正确包装成功的异步函数', async () => {
      const successFn = vi.fn().mockResolvedValue('success');
      const onSuccess = vi.fn();

      const wrappedFn = handler.wrapAsync(successFn, undefined, { onSuccess });
      const result = await wrappedFn('test');

      expect(result).toBe('success');
      expect(successFn).toHaveBeenCalledWith('test');
      expect(onSuccess).toHaveBeenCalled();
      expect(handler.getErrorHistory()).toHaveLength(0);
    });

    /**
     * 测试失败的异步函数包装
     */
    it('应该正确包装失败的异步函数', async () => {
      const errorFn = vi.fn().mockRejectedValue(new Error('Async error'));
      const onError = vi.fn();

      const wrappedFn = handler.wrapAsync(errorFn, undefined, { onError });
      const result = await wrappedFn('test');

      expect(result).toBeNull();
      expect(errorFn).toHaveBeenCalledWith('test');
      expect(onError).toHaveBeenCalled();
      expect(handler.getErrorHistory()).toHaveLength(1);
    });
  });

  describe('同步函数包装', () => {
    /**
     * 测试成功的同步函数包装
     */
    it('应该正确包装成功的同步函数', () => {
      const successFn = vi.fn().mockReturnValue('success');
      const onSuccess = vi.fn();

      const wrappedFn = handler.wrapSync(successFn, undefined, { onSuccess });
      const result = wrappedFn('test');

      expect(result).toBe('success');
      expect(successFn).toHaveBeenCalledWith('test');
      expect(onSuccess).toHaveBeenCalled();
      expect(handler.getErrorHistory()).toHaveLength(0);
    });

    /**
     * 测试失败的同步函数包装
     */
    it('应该正确包装失败的同步函数', async () => {
      const errorFn = vi.fn().mockImplementation(() => {
        throw new Error('Sync error');
      });
      const onError = vi.fn();

      const wrappedFn = handler.wrapSync(errorFn, undefined, { onError });
      const result = wrappedFn('test');

      expect(result).toBeNull();
      expect(errorFn).toHaveBeenCalledWith('test');

      // 等待异步错误处理完成
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(onError).toHaveBeenCalled();
      expect(handler.getErrorHistory()).toHaveLength(1);
    });
  });

  describe('错误历史管理', () => {
    /**
     * 测试错误历史记录
     */
    it('应该正确记录错误历史', async () => {
      const error1 = new Error('Error 1');
      const error2 = new Error('Error 2');
      const error3 = new Error('Error 3');

      await handler.handleError(error1);
      await handler.handleError(error2);
      await handler.handleError(error3);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(3);
      expect(history[0].message).toBe('Error 1');
      expect(history[1].message).toBe('Error 2');
      expect(history[2].message).toBe('Error 3');
    });

    /**
     * 测试错误历史清空
     */
    it('应该正确清空错误历史', async () => {
      await handler.handleError(new Error('Test error'));
      expect(handler.getErrorHistory()).toHaveLength(1);

      handler.clearErrorHistory();
      expect(handler.getErrorHistory()).toHaveLength(0);
    });

    /**
     * 测试错误历史大小限制
     */
    it('应该限制错误历史大小', async () => {
      // 添加超过限制的错误数量
      for (let i = 0; i < 250; i++) {
        await handler.handleError(new Error(`Error ${i}`));
      }

      const history = handler.getErrorHistory();
      expect(history.length).toBeLessThanOrEqual(200); // 默认最大历史大小
    });
  });

  describe('错误统计', () => {
    /**
     * 测试错误统计功能
     */
    it('应该正确统计错误信息', async () => {
      // 添加不同类型的错误
      await handler.handleError(
        new AppError('App error 1', ErrorCode.DATA_NOT_FOUND)
      );
      await handler.handleError(
        new AppError('App error 2', ErrorCode.NETWORK_ERROR)
      );

      // 创建网络错误，确保能被正确识别
      const networkError = new Error('network request failed');
      networkError.name = 'NetworkError';
      await handler.handleError(networkError);

      const skillError: SkillError = {
        type: SkillErrorType.VALIDATION_ERROR,
        code: 'SKILL_ERROR',
        message: 'Skill error',
        timestamp: Date.now(),
      };
      await handler.handleError(skillError);

      const stats = handler.getErrorStats();

      expect(stats.total).toBe(4);
      expect(stats.byType.app).toBe(2);
      expect(stats.byType.network).toBe(1);
      expect(stats.byType.skill).toBe(1);
      expect(stats.bySeverity[ErrorSeverity.MEDIUM]).toBeGreaterThan(0);
      expect(stats.byStrategy[ErrorHandlingStrategy.TOAST]).toBeGreaterThan(0);
    });
  });

  describe('装饰器', () => {
    /**
     * 测试错误处理装饰器功能（通过类方法方式）
     */
    it('应该正确应用错误处理装饰器功能', async () => {
      // 创建一个测试类来模拟装饰器的使用
      class TestClass {
        async testMethod() {
          throw new Error('Decorator test error');
        }
      }

      // 手动应用装饰器
      const instance = new TestClass();
      const descriptor = {
        value: instance.testMethod,
        writable: true,
        enumerable: true,
        configurable: true,
      };

      withUnifiedErrorHandling({ component: 'TestClass' })(
        TestClass.prototype,
        'testMethod',
        descriptor
      );

      // 替换方法
      instance.testMethod = descriptor.value;

      try {
        await instance.testMethod();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Decorator test error');
      }

      // 验证错误被记录
      const history = handler.getErrorHistory();
      expect(history.length).toBeGreaterThan(0);
      const lastError = history[history.length - 1];
      expect(lastError.context?.component).toBe('TestClass');
    });
  });

  describe('错误包装器', () => {
    /**
     * 测试创建错误包装器
     */
    it('应该正确创建错误包装器', async () => {
      const context: ErrorContext = { component: 'TestWrapper' };
      const wrapper = createErrorWrapper(context, { logError: true });

      // 测试异步包装器
      const asyncFn = vi
        .fn()
        .mockRejectedValue(new Error('Wrapper async error'));
      const wrappedAsync = wrapper.async(asyncFn);

      const asyncResult = await wrappedAsync('test');
      expect(asyncResult).toBeNull();
      expect(asyncFn).toHaveBeenCalledWith('test');

      // 测试同步包装器
      const syncFn = vi.fn().mockImplementation(() => {
        throw new Error('Wrapper sync error');
      });
      const wrappedSync = wrapper.sync(syncFn);

      const syncResult = wrappedSync('test');
      expect(syncResult).toBeNull();
      expect(syncFn).toHaveBeenCalledWith('test');

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(2);
      expect(history[0].context?.component).toBe('TestWrapper');
      expect(history[1].context?.component).toBe('TestWrapper');
    });
  });

  describe('严重级别和策略确定', () => {
    /**
     * 测试严重级别确定
     */
    it('应该正确确定错误严重级别', async () => {
      const criticalError = new AppError('Critical', ErrorCode.AUTH_FAILED);
      const highError = new AppError('High', ErrorCode.DATA_CONFLICT);
      const mediumError = new AppError('Medium', ErrorCode.NETWORK_ERROR);
      const lowError = new AppError('Low', ErrorCode.DATA_INVALID);

      await handler.handleError(criticalError);
      await handler.handleError(highError);
      await handler.handleError(mediumError);
      await handler.handleError(lowError);

      const history = handler.getErrorHistory();
      expect(history[0].severity).toBe(ErrorSeverity.CRITICAL);
      expect(history[1].severity).toBe(ErrorSeverity.HIGH);
      expect(history[2].severity).toBe(ErrorSeverity.MEDIUM);
      expect(history[3].severity).toBe(ErrorSeverity.LOW);
    });

    /**
     * 测试处理策略确定
     */
    it('应该正确确定错误处理策略', async () => {
      const redirectError = new AppError('Redirect', ErrorCode.AUTH_REQUIRED);
      const retryError = new AppError('Retry', ErrorCode.NETWORK_ERROR);
      const modalError = new AppError('Modal', ErrorCode.DATA_CONFLICT);
      const toastError = new AppError('Toast', ErrorCode.DATA_INVALID);

      await handler.handleError(redirectError);
      await handler.handleError(retryError);
      await handler.handleError(modalError);
      await handler.handleError(toastError);

      const history = handler.getErrorHistory();
      expect(history[0].strategy).toBe(ErrorHandlingStrategy.REDIRECT);
      expect(history[1].strategy).toBe(ErrorHandlingStrategy.RETRY);
      expect(history[2].strategy).toBe(ErrorHandlingStrategy.MODAL);
      expect(history[3].strategy).toBe(ErrorHandlingStrategy.TOAST);
    });
  });

  describe('重试机制', () => {
    /**
     * 测试可重试错误识别
     */
    it('应该正确识别可重试错误', async () => {
      const retryableError = new AppError('Retryable', ErrorCode.NETWORK_ERROR);
      const nonRetryableError = new AppError(
        'Non-retryable',
        ErrorCode.DATA_INVALID
      );

      await handler.handleError(retryableError);
      await handler.handleError(nonRetryableError);

      const history = handler.getErrorHistory();
      expect(history[0].retryable).toBe(true);
      expect(history[1].retryable).toBe(false);
    });

    /**
     * 测试最大重试次数设置
     */
    it('应该正确设置最大重试次数', async () => {
      const networkError = new AppError('Network', ErrorCode.NETWORK_ERROR);
      const apiError = new AppError('API', ErrorCode.API_ERROR);

      await handler.handleError(networkError);
      await handler.handleError(apiError);

      const history = handler.getErrorHistory();
      expect(history[0].maxRetries).toBe(5); // NETWORK_ERROR 的重试次数
      expect(history[1].maxRetries).toBe(3); // API_ERROR 的重试次数
    });
  });

  describe('资源清理', () => {
    /**
     * 测试资源清理功能
     */
    it('应该正确清理资源', async () => {
      // 添加一些错误到历史记录
      await handler.handleError(new Error('Test error 1'));
      await handler.handleError(new Error('Test error 2'));

      expect(handler.getErrorHistory()).toHaveLength(2);

      // 执行清理
      handler.cleanup();

      // 验证资源已清理
      expect(handler.getErrorHistory()).toHaveLength(0);
    });
  });

  describe('边界情况', () => {
    /**
     * 测试 null 和 undefined 错误处理
     */
    it('应该正确处理 null 和 undefined 错误', async () => {
      await handler.handleError(null);
      await handler.handleError(undefined);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(2);
      expect(history[0].type).toBe('system');
      expect(history[1].type).toBe('system');
    });

    /**
     * 测试空字符串错误消息
     */
    it('应该正确处理空字符串错误消息', async () => {
      const emptyError = new Error('');

      await handler.handleError(emptyError);

      const history = handler.getErrorHistory();
      expect(history).toHaveLength(1);
      expect(history[0].userMessage).toBe('系统发生未知错误，请稍后重试');
    });

    /**
     * 测试错误处理器自身错误
     */
    it('应该处理错误处理器自身的错误', async () => {
      // 模拟一个会导致处理器内部错误的情况
      const problematicError = {
        get message() {
          throw new Error('Property access error');
        },
      };

      // 这不应该导致程序崩溃
      await expect(
        handler.handleError(problematicError)
      ).resolves.not.toThrow();
    });
  });
});
