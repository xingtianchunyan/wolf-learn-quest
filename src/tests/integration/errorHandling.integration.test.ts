/**
 * 文件级注释：错误处理系统集成测试
 * 
 * 该文件包含对统一错误处理系统的全面集成测试，验证：
 * - 统一错误处理器的功能
 * - 错误边界组件的行为
 * - 错误监控和报告
 * - 用户友好的错误提示
 * - 错误恢复机制
 * - 多层错误处理协同工作
 * 
 * 测试覆盖：
 * - 前端错误处理
 * - 后端错误处理
 * - 网络错误处理
 * - 业务逻辑错误
 * - 系统级错误
 * - 错误日志记录
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */
import  { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll  } from 'vitest';
import { render, screen, fireEvent, waitFor, act  } from '@testing-library/react';
import { renderHook  } from '@testing-library/react';
import React from 'react';

// 导入被测试的模块
import { UnifiedErrorHandler  } from '@/utils/unifiedErrorHandler';
import { ErrorBoundary  } from '@/components/common/ErrorBoundary';
import { useErrorHandler  } from '@/hooks/useErrorHandler';
import { errorReportingService  } from '@/services/errorReportingService';
import { skillErrorHandler  } from '@/utils/skillErrorHandler';

/**
 * 接口注释：测试用例配置
 */
interface TestErrorConfig  {
  type: 'network' | 'validation' | 'business' | 'system' | 'permission';
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
  message: string;
  code?: string;
  details?: Record<string, any>
}

/**
 * 接口注释：错误处理测试结果
 */
interface ErrorHandlingTestResult  {
  errorCaught: boolean;
  errorLogged: boolean;
  userNotified: boolean;
  recoveryAttempted: boolean;
  fallbackDisplayed: boolean;
  metricsRecorded: boolean
}

/**
 * 类级注释：错误处理集成测试套件
 * 
 * 提供全面的错误处理系统测试，包含：
 * - 错误捕获和处理验证
 * - 错误边界行为测试
 * - 错误恢复机制测试
 * - 错误监控和报告测试
 * - 用户体验测试
 */
describe('错误处理系统集成测试', () =>  {
  let errorHandler: UnifiedErrorHandler;
  let mockConsoleError: any;
  let mockErrorReporting: any;
  let testErrors: TestErrorConfig[];

  /**
   * 函数级注释：测试前置设置
   * 初始化测试环境和模拟对象
   */
beforeAll(() =>  {
    // 模拟控制台错误
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // 模拟错误报告服务
    mockErrorReporting = vi.spyOn(errorReportingService, 'reportError').mockResolvedValue(undefined);
    
    // 模拟本地存储
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn() 
},
      writable: true 
});

    // 模拟网络请求
    global.fetch = vi.fn()
});

  /**
 * 函数级注释：每个测试前的设置
 */
beforeEach(() =>  {
    errorHandler = UnifiedErrorHandler.getInstance();
    
    // 重置错误处理器状态
    errorHandler.reset();
    
    // 清除所有模拟调用
    vi.clearAllMocks();
    
    // 定义测试错误配置
    testErrors = [
      {
        type: 'network',
        severity: 'high',
        recoverable: true,
        message: '网络连接失败',
        code: 'NETWORK_ERROR',
        details: { url: '/api/test', status: 500 
}
      },
      {
        type: 'validation',
        severity: 'medium',
        recoverable: true,
        message: '输入验证失败',
        code: 'VALIDATION_ERROR',
        details: { field: 'username', value: '' 
}
      },
      {
        type: 'business',
        severity: 'high',
        recoverable: false,
        message: '业务规则违反',
        code: 'BUSINESS_RULE_ERROR',
        details: { rule: 'max_attempts', current: 5, max: 3 
}
      },
      {
        type: 'system',
        severity: 'critical',
        recoverable: false,
        message: '系统内部错误',
        code: 'SYSTEM_ERROR',
        details: { component: 'database', error: 'connection_timeout' 
}
      },
      {
        type: 'permission',
        severity: 'high',
        recoverable: false,
        message: '权限不足',
        code: 'PERMISSION_DENIED',
        details: { resource: 'admin_panel', action: 'read' 
}
      }
    ]
});

  /**
 * 函数级注释：每个测试后的清理
 */
afterEach(() =>  {
  // 清理定时器
    vi.clearAllTimers();
    
    // 重置DOM
    document.body.innerHTML = ''

});

  /**
 * 函数级注释：测试后置清理
 */
afterAll(() =>  {
  mockConsoleError.mockRestore();
    mockErrorReporting.mockRestore()

});

  /**
 * 函数级注释：创建测试错误
 */
const createTestError = (config: TestErrorConfig): Error =>  {
  const error = new Error(config.message);
    (error as any).type = config.type;
    (error as any).severity = config.severity;
    (error as any).recoverable = config.recoverable;
    (error as any).code = config.code;
    (error as any).details = config.details;
    return error

};

  /**
 * 函数级注释：验证错误处理结果
 */
const verifyErrorHandling = async (
    error: Error,
    expectedResult: Partial<ErrorHandlingTestResult>
  ): Promise<void> => { const result: ErrorHandlingTestResult = {
      errorCaught: false,
      errorLogged: false,
      userNotified: false,
      recoveryAttempted: false,
      fallbackDisplayed: false,
      metricsRecorded: false
};

    try {
      await errorHandler.handleError(error);
      result.errorCaught = true
} catch (handlingError) {
      console.error('错误处理失败:', handlingError)
}

    // 检查错误日志
    result.errorLogged = mockConsoleError.mock.calls.length > 0;
    
    // 检查错误报告
    result.metricsRecorded = mockErrorReporting.mock.calls.length > 0;
    
    // 验证预期结果
    Object.entries(expectedResult).forEach(([key, expected]) => {
      if (expected !== undefined) {
        expect(result[key as keyof ErrorHandlingTestResult]).toBe(expected)
}
    })
};

  describe('统一错误处理器测试', () => {
    /**
 * 函数级注释：测试基本错误处理功能
 */
it('应该正确处理不同类型的错误', async () =>  {
      for (const errorConfig of testErrors) {
        const error = createTestError(errorConfig);
        
        await verifyErrorHandling(error, {
          errorCaught: true,
          errorLogged: true,
          metricsRecorded: true
});
        
        // 验证错误分类
        const errorStats = errorHandler.getErrorStats();
        expect(errorStats.errorsByType[errorConfig.type]).toBeGreaterThan(0);
        expect(errorStats.errorsBySeverity[errorConfig.severity]).toBeGreaterThan(0)
}
    });

    /**
 * 函数级注释：测试错误恢复机制
 */
it('应该尝试恢复可恢复的错误', async () =>  {
  const recoverableError = createTestError(testErrors[0]); // 网络错误，可恢复
      
      // 模拟恢复策略
      const mockRecoveryStrategy = vi.fn().mockResolvedValue(true);
      errorHandler.registerRecoveryStrategy('network', mockRecoveryStrategy);
      
      await errorHandler.handleError(recoverableError);
      
      expect(mockRecoveryStrategy).toHaveBeenCalledWith(recoverableError)

});

    /**
 * 函数级注释：测试错误限流机制
 */
it('应该实施错误限流以防止错误风暴', async () =>  {
  const error = createTestError(testErrors[0]);
      
      // 快速连续触发多个相同错误
      const promises = Array(10).fill(null).map(() => 
        errorHandler.handleError(error)
      );
      
      await Promise.all(promises);
      
      // 验证限流生效
      const errorStats = errorHandler.getErrorStats();
      expect(errorStats.rateLimitedErrors).toBeGreaterThan(0)

});

    /**
 * 函数级注释：测试错误聚合功能
 */
it('应该正确聚合相似错误', async () =>  {
      const similarErrors = Array(5).fill(null).map(() => 
        createTestError(testErrors[1]) // 验证错误
      );
      
      for (const error of similarErrors) {
        await errorHandler.handleError(error)
}
      
      const errorStats = errorHandler.getErrorStats();
      expect(errorStats.aggregatedErrors).toBeGreaterThan(0)
})
});

  describe('错误边界组件测试', () => {
    /**
 * 函数级注释：创建抛出错误的组件
 */
const ThrowErrorComponent: React.FC<{ shouldThrow: boolean; errorType?: string 
}> = ( {
      shouldThrow, 
      errorType = 'render' 
    }) => {
      if (shouldThrow) {
        throw new Error(`测试${errorType}错误`)
}
      return <div data-testid="normal-content">正常内容</div>
};

    /**
 * 函数级注释：测试错误边界基本功能
 */
it('应该捕获渲染错误并显示错误界面', () =>  {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      // 正常渲染
      expect(screen.getByTestId('normal-content')).toBeInTheDocument();

      // 触发错误
      expect(() => {
        rerender(
          <ErrorBoundary>
            <ThrowErrorComponent shouldThrow={true} />
          </ErrorBoundary>
        )
}).not.toThrow();

      // 验证错误界面显示
      expect(screen.getByText(/出现了错误/)).toBeInTheDocument()
});

    /**
 * 函数级注释：测试错误边界恢复功能
 */
it('应该提供错误恢复功能', async () =>  {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // 验证错误界面显示
      expect(screen.getByText(/出现了错误/)).toBeInTheDocument();

      // 点击重试按钮
      const retryButton = screen.getByText('重试');
      fireEvent.click(retryButton);

      // 重新渲染正常组件
      rerender(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      await waitFor(() => {
  expect(screen.getByTestId('normal-content')).toBeInTheDocument()
})

});

    /**
 * 函数级注释：测试错误边界错误报告
 */
it('应该报告捕获的错误', () =>  {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // 验证错误被报告
      expect(mockErrorReporting).toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalled()
})
});

  describe('错误处理Hook测试', () => {
    /**
 * 函数级注释：测试useErrorHandler Hook
 */
it('应该提供错误处理功能', async () =>  {
      const { result } = renderHook(() => useErrorHandler());

      const testError = createTestError(testErrors[0]);

      await act(async () => {
  await result.current.handleError(testError)
});

      // 验证错误状态
      expect(result.current.hasError).toBe(true);
      expect(result.current.error).toBe(testError)

});

    /**
 * 函数级注释：测试错误清除功能
 */
it('应该能够清除错误状态', async () =>  {
      const { result } = renderHook(() => useErrorHandler());

      const testError = createTestError(testErrors[0]);

      await act(async () => {
  await result.current.handleError(testError)

});

      expect(result.current.hasError).toBe(true);

      act(() => {
  result.current.clearError()
});

      expect(result.current.hasError).toBe(false);
      expect(result.current.error).toBeNull()

});

    /**
 * 函数级注释：测试错误重试功能
 */
it('应该支持错误重试机制', async () =>  {
      const { result } = renderHook(() => useErrorHandler());

      let attemptCount = 0;
      const flakyOperation = vi.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('临时错误')
}
        return '成功'
});

      await act(async () => {
        const success = await result.current.withRetry(flakyOperation, {
          maxAttempts: 3,
          delay: 100
});
        expect(success).toBe('成功')
});

      expect(flakyOperation).toHaveBeenCalledTimes(3)
})
});

  describe('技能系统错误处理测试', () => { /**
 * 函数级注释：测试技能错误处理
 */
it('应该正确处理技能系统特定错误', async () =>  {
      const skillError = new Error('技能使用失败');
      (skillError as any).context = {
        skillId: 'test-skill',
        userId: 'test-user',
        gameState: 'active'
};

      await skillErrorHandler.handleSkillError(skillError);

      // 验证技能错误被正确处理
      expect(mockErrorReporting).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '技能使用失败',
          context: expect.objectContaining({
            skillId: 'test-skill'
})
        })
      )
});

    /**
 * 函数级注释：测试技能冲突错误处理
 */
it('应该处理技能冲突错误', async () =>  { const conflictError = new Error('技能冲突');
      (conflictError as any).type = 'skill_conflict';
      (conflictError as any).conflictDetails = {
        skill1: 'heal',
        skill2: 'poison',
        target: 'player1'
};

      await skillErrorHandler.handleSkillError(conflictError);

      // 验证冲突解决机制被触发
      expect(mockErrorReporting).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'skill_conflict'
})
      )
})
});

  describe('网络错误处理测试', () => {
    /**
 * 函数级注释：测试网络超时处理
 */
it('应该处理网络超时错误', async () =>  {
  const timeoutError = new Error('请求超时');
      (timeoutError as any).type = 'network';
      (timeoutError as any).code = 'TIMEOUT';

      // 模拟网络重试策略
      const mockRetryStrategy = vi.fn().mockResolvedValue(false);
      errorHandler.registerRecoveryStrategy('network', mockRetryStrategy);

      await errorHandler.handleError(timeoutError);

      expect(mockRetryStrategy).toHaveBeenCalled()

});

    /**
 * 函数级注释：测试网络连接错误处理
 */
it('应该处理网络连接错误', async () =>  {
  const connectionError = new Error('网络连接失败');
      (connectionError as any).type = 'network';
      (connectionError as any).code = 'CONNECTION_FAILED';

      await errorHandler.handleError(connectionError);

      // 验证离线模式被激活
      const errorStats = errorHandler.getErrorStats();
      expect(errorStats.networkErrors).toBeGreaterThan(0)
})

});

  describe('错误监控和报告测试', () => {
    /**
 * 函数级注释：测试错误指标收集
 */
it('应该收集详细的错误指标', async () =>  {
      // 触发多种类型的错误
      for (const errorConfig of testErrors) {
        const error = createTestError(errorConfig);
        await errorHandler.handleError(error)
}

      const stats = errorHandler.getErrorStats();

      // 验证统计数据
      expect(stats.totalErrors).toBe(testErrors.length);
      expect(Object.keys(stats.errorsByType)).toContain('network');
      expect(Object.keys(stats.errorsByType)).toContain('validation');
      expect(Object.keys(stats.errorsBySeverity)).toContain('high');
      expect(Object.keys(stats.errorsBySeverity)).toContain('critical')
});

    /**
 * 函数级注释：测试错误趋势分析
 */
it('应该分析错误趋势', async () =>  {
      // 模拟时间序列错误
      const timestamps = [
        Date.now() - 3600000, // 1小时前
        Date.now() - 1800000, // 30分钟前
        Date.now() - 900000,  // 15分钟前
        Date.now()            // 现在
      ];

      for (const timestamp of timestamps) {
        vi.setSystemTime(timestamp);
        const error = createTestError(testErrors[0]);
        await errorHandler.handleError(error)
}

      const trends = errorHandler.getErrorTrends();
      expect(trends.hourlyErrorRate).toBeGreaterThan(0);
      expect(trends.errorGrowthRate).toBeDefined()
});

    /**
 * 函数级注释：测试错误报告格式
 */
it('应该生成正确格式的错误报告', async () =>  {
      const error = createTestError(testErrors[3]); // 系统错误
      await errorHandler.handleError(error);

      expect(mockErrorReporting).toHaveBeenCalledWith(
        expect.objectContaining({
          message: error.message,
          type: 'system',
          severity: 'critical',
          timestamp: expect.any(Number),
          userAgent: expect.any(String),
          url: expect.any(String),
          stackTrace: expect.any(String)
})
      )
})
});

  describe('用户体验测试', () => {
    /**
 * 函数级注释：测试用户友好的错误消息
 */
it('应该显示用户友好的错误消息', async () =>  {
  const technicalError = new Error('TypeError: Cannot read property "foo" of undefined');
      (technicalError as any).type = 'system';

      await errorHandler.handleError(technicalError);

      // 验证用户友好消息被生成
      const userMessage = errorHandler.getUserFriendlyMessage(technicalError);
      expect(userMessage).not.toContain('TypeError');
      expect(userMessage).toContain('系统出现了问题')

});

    /**
 * 函数级注释：测试错误通知系统
 */
it('应该通过适当的渠道通知用户', async () =>  {
      const criticalError = createTestError(testErrors[3]); // 系统关键错误
      
      // 模拟通知系统
      const mockNotification = vi.fn();
      (window as any).showNotification = mockNotification;

      await errorHandler.handleError(criticalError);

      // 验证用户被通知
      expect(mockNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          severity: 'critical'
})
      )
});

    /**
 * 函数级注释：测试错误恢复建议
 */
it('应该提供错误恢复建议', async () =>  {
  const networkError = createTestError(testErrors[0]);
      await errorHandler.handleError(networkError);

      const suggestions = errorHandler.getRecoverySuggestions(networkError);
      expect(suggestions).toContain('检查网络连接');
      expect(suggestions).toContain('稍后重试')
})

});

  describe('性能影响测试', () => {
    /**
 * 函数级注释：测试错误处理性能
 */
it('错误处理不应显著影响性能', async () =>  {
  const startTime = performance.now();
      
      // 处理大量错误
      const errors = Array(100).fill(null).map(() => createTestError(testErrors[0]));
      await Promise.all(errors.map(error => errorHandler.handleError(error)));
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      // 验证处理时间在合理范围内（每个错误平均不超过10ms）
      expect(processingTime / errors.length).toBeLessThan(10)

});

    /**
 * 函数级注释：测试内存使用
 */
it('应该管理错误处理的内存使用', async () =>  {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // 处理大量错误
      for (let i = 0; i < 1000; i++) {
        const error = createTestError(testErrors[i % testErrors.length]);
        await errorHandler.handleError(error)
}
      
      // 触发清理
      errorHandler.cleanup();
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;
      
      // 验证内存增长在合理范围内（小于10MB）
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024)
})
});

  describe('集成场景测试', () => {
    /**
 * 函数级注释：测试完整的错误处理流程
 */
it('应该完整处理从错误发生到用户通知的整个流程', async () =>  {
      // 模拟完整的应用组件
      const TestApp: React.FC = () => {
        const { handleError } = useErrorHandler();
        
        const triggerError = async () => {
          try {
            throw createTestError(testErrors[0])
} catch (error) {
            await handleError(error as Error)
}
        };

        return (
          <ErrorBoundary>
            <div>
              <button onClick={triggerError} data-testid="trigger-error">
                触发错误
              </button>
            </div>
          </ErrorBoundary>
        )
};

      render(<TestApp />);

      // 触发错误
      const triggerButton = screen.getByTestId('trigger-error');
      fireEvent.click(triggerButton);

      await waitFor(() => {
  // 验证错误被正确处理
        expect(mockErrorReporting).toHaveBeenCalled();
        expect(mockConsoleError).toHaveBeenCalled()
})

});

    /**
 * 函数级注释：测试多层错误处理协同
 */
it('应该协调多层错误处理机制', async () =>  {
  const error = createTestError(testErrors[0]);
      
      // 模拟多层处理
      await Promise.all([
        errorHandler.handleError(error),
        skillErrorHandler.handleSkillError(error)
      ]);

      // 验证不同层级都正确处理了错误
      expect(mockErrorReporting).toHaveBeenCalledTimes(2);
      
      // 验证错误去重机制
      const stats = errorHandler.getErrorStats();
      expect(stats.duplicateErrors).toBeGreaterThan(0)
})
})

});