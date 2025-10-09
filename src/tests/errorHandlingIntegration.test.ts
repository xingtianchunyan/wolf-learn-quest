/**
 * 文件级注释：错误处理集成测试
 * 
 * 该文件实现了错误处理系统的集成测试，旨在：
 * - 验证统一错误处理系统的功能
 * - 测试错误边界组件的行为
 * - 验证用户友好错误界面
 * - 测试全局错误监控
 * - 验证错误恢复机制
 * 
 * 测试覆盖：
 * - MasterErrorHandler功能测试
 * - ErrorBoundary组件测试
 * - EnhancedUserErrorInterface测试
 * - GlobalErrorMonitor测试
 * - 错误处理流程集成测试
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */
import  { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll  } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup  } from '@testing-library/react';
import { renderHook, act  } from '@testing-library/react';
import React from 'react';

// 导入被测试的模块
import { MasterErrorHandler  } from '../utils/masterErrorHandler';
import { EnhancedUserErrorInterface  } from '../utils/enhancedUserErrorInterface';
import { GlobalErrorMonitor  } from '../utils/globalErrorMonitor';
import { ErrorBoundary, withErrorBoundary  } from '../components/ErrorBoundary';
import { ErrorDisplayComponent  } from '../components/ErrorDisplayComponent';

/**
 * 接口注释：测试错误类型
 * 定义测试中使用的错误类型
 */
interface TestError extends Error  {
  code?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  context?: any;
  recoverable?: boolean
}

/**
 * 接口注释：测试组件属性
 * 定义测试组件的属性
 */
interface TestComponentProps  {
  shouldThrow?: boolean;
  errorType?: string;
  errorMessage?: string
}

/**
 * 类级注释：测试组件
 * 用于测试错误边界的组件
 */
const TestComponent: React.FC<TestComponentProps> = ( { 
  shouldThrow = false, 
  errorType = 'generic',
  errorMessage = 'Test error'
}) => {
  if (shouldThrow) {
    const error = new Error(errorMessage) as TestError;
    error.code = errorType;
    error.severity = 'medium';
    throw error
}
  
  return <div data-testid="test-component">Test Component Content</div>
};

/**
 * 类级注释：错误处理集成测试套件
 * 
 * 测试错误处理系统的各个组件和集成功能
 */
describe('错误处理集成测试', () =>  {
  let masterErrorHandler: MasterErrorHandler;
  let userErrorInterface: EnhancedUserErrorInterface;
  let globalErrorMonitor: GlobalErrorMonitor;
  let consoleErrorSpy: any;
  let consoleWarnSpy: any;

  /**
   * 函数级注释：测试前置设置
   * 在每个测试前初始化测试环境
   */
beforeAll(() =>  {
    // 模拟console方法以避免测试输出污染
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
  })

});

  /**
   * 函数级注释：测试后置清理
   * 在所有测试后清理测试环境
   */
afterAll(() =>  {
  consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore()

});

  /**
   * 函数级注释：每个测试前的设置
   * 在每个测试前重置实例和状态
   */
beforeEach(() =>  {
  // 重置单例实例
    masterErrorHandler = MasterErrorHandler.getInstance();
    userErrorInterface = EnhancedUserErrorInterface.getInstance();
    globalErrorMonitor = GlobalErrorMonitor.getInstance();
    
    // 清除之前的错误记录
    vi.clearAllMocks()

});

  /**
   * 函数级注释：每个测试后的清理
   * 在每个测试后清理状态
   */
afterEach(() =>  {
  // 清理定时器和监听器
    vi.clearAllTimers()

});

  /**
 * 测试组：MasterErrorHandler功能测试
 */
describe('MasterErrorHandler功能测试', () =>  {
    /**
     * 函数级注释：测试基本错误处理
     * 验证MasterErrorHandler能够正确处理基本错误
     */
it('应该能够处理基本错误', async () =>  {
      const testError = new Error('测试错误') as TestError;
      testError.code = 'TEST_ERROR';
      testError.severity = 'medium';

      const result = await masterErrorHandler.handleError(testError, {
        context: 'test',
        userId: 'test-user'
});

      expect(result.handled).toBe(true);
      expect(result.errorId).toBeDefined();
      expect(result.userMessage).toBeDefined();
      expect(result.recovered).toBeDefined()
});

    /**
     * 函数级注释：测试异步函数包装
     * 验证wrapAsync方法能够正确包装异步函数
     */
it('应该能够包装异步函数并处理错误', async () =>  {
      const asyncFunction = async (shouldFail: boolean) => {
        if (shouldFail) {
          throw new Error('异步函数错误')
}
        return '成功结果'
};

      const wrappedFunction = masterErrorHandler.wrapAsync(asyncFunction);

      // 测试成功情况
      const successResult = await wrappedFunction(false);
      expect(successResult).toBe('成功结果');

      // 测试失败情况
      const failResult = await wrappedFunction(true);
      expect(failResult).toBeNull()
});

    /**
     * 函数级注释：测试同步函数包装
     * 验证wrapSync方法能够正确包装同步函数
     */
it('应该能够包装同步函数并处理错误', () =>  {
      const syncFunction = (shouldFail: boolean) => {
        if (shouldFail) {
          throw new Error('同步函数错误')
}
        return '成功结果'
};

      const wrappedFunction = masterErrorHandler.wrapSync(syncFunction);

      // 测试成功情况
      const successResult = wrappedFunction(false);
      expect(successResult).toBe('成功结果');

      // 测试失败情况
      const failResult = wrappedFunction(true);
      expect(failResult).toBeNull()
});

    /**
     * 函数级注释：测试错误分类
     * 验证错误能够被正确分类
     */
it('应该能够正确分类错误', async () =>  {
  const networkError = new Error('网络连接失败') as TestError;
      networkError.code = 'NETWORK_ERROR';
      
      const validationError = new Error('输入验证失败') as TestError;
      validationError.code = 'VALIDATION_ERROR';
      
      const authError = new Error('认证失败') as TestError;
      authError.code = 'AUTH_ERROR';

      const networkResult = await masterErrorHandler.handleError(networkError);
      const validationResult = await masterErrorHandler.handleError(validationError);
      const authResult = await masterErrorHandler.handleError(authError);

      expect(networkResult.category).toBeDefined();
      expect(validationResult.category).toBeDefined();
      expect(authResult.category).toBeDefined()
})

});

  /**
 * 测试组：ErrorBoundary组件测试
 */
describe('ErrorBoundary组件测试', () =>  {
    /**
     * 函数级注释：测试错误捕获
     * 验证ErrorBoundary能够捕获子组件的错误
     */
it('应该能够捕获子组件的错误', () =>  {
      render(
        <ErrorBoundary>
          <TestComponent shouldThrow={true} errorMessage="组件错误测试" />
        </ErrorBoundary>
      );

      // 验证错误界面显示
      expect(screen.getByText(/出现了错误/)).toBeInTheDocument();
      expect(screen.getByText(/组件错误测试/)).toBeInTheDocument()
});

    /**
     * 函数级注释：测试错误恢复
     * 验证ErrorBoundary的错误恢复功能
     */
it('应该能够从错误中恢复', async () =>  {
      const { rerender } = render(
        <ErrorBoundary>
          <TestComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // 验证错误状态
      expect(screen.getByText(/出现了错误/)).toBeInTheDocument();

      // 点击重试按钮
      const retryButton = screen.getByText(/重试/);
      fireEvent.click(retryButton);

      // 重新渲染不抛出错误的组件
      rerender(
        <ErrorBoundary>
          <TestComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      // 验证恢复状态
      await waitFor(() => {
  expect(screen.getByTestId('test-component')).toBeInTheDocument()
})

});

    /**
     * 函数级注释：测试高阶组件包装
     * 验证withErrorBoundary高阶组件功能
     */
it('应该能够使用高阶组件包装组件', () =>  {
      const WrappedComponent = withErrorBoundary(TestComponent, {
        fallback: <div>自定义错误界面</div>
});

      render(<WrappedComponent shouldThrow={true} />);

      expect(screen.getByText('自定义错误界面')).toBeInTheDocument()
})
});

  /**
 * 测试组：EnhancedUserErrorInterface测试
 */
describe('EnhancedUserErrorInterface测试', () =>  {
    /**
     * 函数级注释：测试用户友好错误信息生成
     * 验证能够生成用户友好的错误信息
     */
it('应该能够生成用户友好的错误信息', async () =>  {
      const error = new Error('数据库连接失败') as TestError;
      error.code = 'DB_CONNECTION_ERROR';
      error.severity = 'high';

      const userFriendlyInfo = await userErrorInterface.generateUserFriendlyError(error, {
        language: 'zh-CN',
        userLevel: 'beginner'
});

      expect(userFriendlyInfo.title).toBeDefined();
      expect(userFriendlyInfo.message).toBeDefined();
      expect(userFriendlyInfo.solutions).toHaveLength(expect.any(Number));
      expect(userFriendlyInfo.helpLinks).toHaveLength(expect.any(Number))
});

    /**
     * 函数级注释：测试解决方案推荐
     * 验证能够推荐合适的解决方案
     */
it('应该能够推荐解决方案', async () =>  {
      const error = new Error('网络请求超时') as TestError;
      error.code = 'NETWORK_TIMEOUT';

      const solutions = await userErrorInterface.generateSolutions(error, {
        context: 'api_request',
        userAgent: 'test-agent'
});

      expect(solutions).toHaveLength(expect.any(Number));
      expect(solutions[0]).toHaveProperty('title');
      expect(solutions[0]).toHaveProperty('description');
      expect(solutions[0]).toHaveProperty('steps')
});

    /**
     * 函数级注释：测试用户反馈收集
     * 验证能够收集和处理用户反馈
     */
it('应该能够收集用户反馈', async () => { const feedback =  {
        errorId: 'test-error-123',
        helpful: true,
        solutionUsed: 'solution-1',
        additionalComments: '这个解决方案很有帮助',
        userRating: 5
};

      const result = await userErrorInterface.collectFeedback(feedback);

      expect(result.success).toBe(true);
      expect(result.feedbackId).toBeDefined()
})
});

  /**
 * 测试组：GlobalErrorMonitor测试
 */
describe('GlobalErrorMonitor测试', () =>  {
    /**
     * 函数级注释：测试全局错误捕获
     * 验证能够捕获全局JavaScript错误
     */
it('应该能够捕获全局错误', () =>  {
      const errorHandler = vi.fn();
      globalErrorMonitor.addErrorHandler(errorHandler);

      // 模拟全局错误
      const error = new Error('全局错误测试');
      window.dispatchEvent(new ErrorEvent('error', {
        error,
        message: error.message,
        filename: 'test.js',
        lineno: 1,
        colno: 1
}));

      expect(errorHandler).toHaveBeenCalledWith(expect.objectContaining({
        type: 'javascript_error',
        error: expect.any(Error)
}))
});

    /**
     * 函数级注释：测试Promise拒绝捕获
     * 验证能够捕获未处理的Promise拒绝
     */
it('应该能够捕获未处理的Promise拒绝', () =>  {
      const rejectionHandler = vi.fn();
      globalErrorMonitor.addRejectionHandler(rejectionHandler);

      // 模拟未处理的Promise拒绝
      const reason = new Error('Promise拒绝测试');
      window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection', {
        promise: Promise.reject(reason),
        reason
      }));

      expect(rejectionHandler).toHaveBeenCalledWith(expect.objectContaining({
        type: 'unhandled_rejection',
        reason: expect.any(Error)
}))
});

    /**
     * 函数级注释：测试错误统计
     * 验证错误统计功能
     */
it('应该能够统计错误', async () =>  {
  // 触发一些错误
      await masterErrorHandler.handleError(new Error('错误1'));
      await masterErrorHandler.handleError(new Error('错误2'));
      await masterErrorHandler.handleError(new Error('错误3'));

      const stats = globalErrorMonitor.getErrorStats();

      expect(stats.totalErrors).toBeGreaterThan(0);
      expect(stats.errorsByType).toBeDefined();
      expect(stats.errorsByHour).toBeDefined()
})

});

  /**
 * 测试组：ErrorDisplayComponent测试
 */
describe('ErrorDisplayComponent测试', () =>  {
    /**
     * 函数级注释：测试错误显示
     * 验证错误显示组件的基本功能
     */
it('应该能够显示错误信息', () =>  {
      const errorInfo = {
        title: '测试错误',
        message: '这是一个测试错误消息',
        severity: 'medium' as const,
        solutions: [
          {
            id: 'solution-1',
            title: '解决方案1',
            description: '这是第一个解决方案',
            steps: ['步骤1', '步骤2'],
            successRate: 0.8
}
        ],
        helpLinks: [
          {
            id: 'help-1',
            title: '帮助文档',
            url: 'https://example.com/help',
            type: 'documentation' as const
}
        ]
      };

      render(
        <ErrorDisplayComponent
          error={errorInfo}
          onClose={() => {
  }
}
          onRetry={() => {
  }}
        />
      );

      expect(screen.getByText('测试错误')).toBeInTheDocument();
      expect(screen.getByText('这是一个测试错误消息')).toBeInTheDocument();
      expect(screen.getByText('解决方案1')).toBeInTheDocument()

});

    /**
     * 函数级注释：测试交互功能
     * 验证错误显示组件的交互功能
     */
it('应该能够处理用户交互', () =>  { const onClose = vi.fn();
      const onRetry = vi.fn();
      const onFeedback = vi.fn();

      const errorInfo = {
        title: '测试错误',
        message: '测试消息',
        severity: 'medium' as const,
        solutions: [],
        helpLinks: []
};

      render(
        <ErrorDisplayComponent
          error={errorInfo}
          onClose={onClose}
          onRetry={onRetry}
          onFeedback={onFeedback}
        />
      );

      // 测试关闭按钮
      const closeButton = screen.getByLabelText(/关闭/);
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();

      // 测试重试按钮
      const retryButton = screen.getByText(/重试/);
      fireEvent.click(retryButton);
      expect(onRetry).toHaveBeenCalled()
})
});

  /**
 * 测试组：集成测试
 */
describe('错误处理流程集成测试', () =>  {
    /**
     * 函数级注释：测试完整错误处理流程
     * 验证从错误发生到用户界面显示的完整流程
     */
it('应该能够完成完整的错误处理流程', async () =>  {
      // 创建一个会抛出错误的组件
      const ErrorThrowingComponent = () => {
        const [shouldThrow, setShouldThrow] = React.useState(false);

        React.useEffect(() => {
          if (shouldThrow) {
            throw new Error('集成测试错误')
}
        }, [shouldThrow]);

        return (
          <div>
            <button onClick={() => setShouldThrow(true)}>
              触发错误
            </button>
            <div data-testid="normal-content">正常内容</div>
          </div>
        )
};

      render(
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      );

      // 验证正常状态
      expect(screen.getByTestId('normal-content')).toBeInTheDocument();

      // 触发错误
      const triggerButton = screen.getByText('触发错误');
      fireEvent.click(triggerButton);

      // 验证错误界面显示
      await waitFor(() => {
  expect(screen.getByText(/出现了错误/)).toBeInTheDocument()
})

});

    /**
     * 函数级注释：测试错误恢复流程
     * 验证错误恢复的完整流程
     */
it('应该能够从错误中恢复', async () =>  {
      let shouldThrow = true;

      const RecoverableComponent = () => {
        if (shouldThrow) {
          throw new Error('可恢复的错误')
}
        return <div data-testid="recovered-content">已恢复的内容</div>
};

      const { rerender } = render(
        <ErrorBoundary>
          <RecoverableComponent />
        </ErrorBoundary>
      );

      // 验证错误状态
      expect(screen.getByText(/出现了错误/)).toBeInTheDocument();

      // 模拟错误修复
      shouldThrow = false;

      // 点击重试
      const retryButton = screen.getByText(/重试/);
      fireEvent.click(retryButton);

      // 重新渲染
      rerender(
        <ErrorBoundary>
          <RecoverableComponent />
        </ErrorBoundary>
      );

      // 验证恢复状态
      await waitFor(() => {
  expect(screen.getByTestId('recovered-content')).toBeInTheDocument()
})

});

    /**
     * 函数级注释：测试多层错误边界
     * 验证多层错误边界的行为
     */
it('应该能够处理多层错误边界', () =>  {
      const InnerComponent = ({ shouldThrow }: { shouldThrow: boolean 
}) => {
        if (shouldThrow) {
          throw new Error('内层错误')
}
        return <div data-testid="inner-content">内层内容</div>
};

      const MiddleComponent = ({ shouldThrow }: { shouldThrow: boolean 
}) => {
        return (
          <ErrorBoundary fallback={<div>内层错误边界</div>}>
            <InnerComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
        )
};

      render(
        <ErrorBoundary fallback={<div>外层错误边界</div>}>
          <MiddleComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // 验证内层错误边界捕获了错误
      expect(screen.getByText('内层错误边界')).toBeInTheDocument();
      expect(screen.queryByText('外层错误边界')).not.toBeInTheDocument()
})
});

  /**
 * 测试组：性能测试
 */
describe('错误处理性能测试', () =>  {
    /**
     * 函数级注释：测试大量错误处理性能
     * 验证系统能够处理大量错误而不影响性能
     */
it('应该能够高效处理大量错误', async () =>  {
      const startTime = Date.now();
      const errorCount = 100;
      const promises: Promise<any>[] = [];

      for (let i = 0; i < errorCount; i++) {
        const error = new Error(`批量错误 ${i}`);
        promises.push(masterErrorHandler.handleError(error))
}

      await Promise.all(promises);
      const endTime = Date.now();
      const duration = endTime - startTime;

      // 验证处理时间合理（每个错误平均不超过10ms）
      expect(duration).toBeLessThan(errorCount * 10)
});

    /**
     * 函数级注释：测试内存使用
     * 验证错误处理不会导致内存泄漏
     */
it('应该不会导致内存泄漏', async () =>  {
      const initialMemory = process.memoryUsage().heapUsed;

      // 处理大量错误
      for (let i = 0; i < 1000; i++) {
        const error = new Error(`内存测试错误 ${i}`);
        await masterErrorHandler.handleError(error)
}

      // 强制垃圾回收（如果可用）
      if (global.gc) {
        global.gc()
}

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // 验证内存增长在合理范围内（不超过10MB）
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024)
})
});

  /**
 * 测试组：边界情况测试
 */
describe('边界情况测试', () =>  {
    /**
     * 函数级注释：测试null和undefined错误
     * 验证系统能够处理null和undefined错误
     */
it('应该能够处理null和undefined错误', async () =>  {
  const nullResult = await masterErrorHandler.handleError(null as any);
      const undefinedResult = await masterErrorHandler.handleError(undefined as any);

      expect(nullResult.handled).toBe(true);
      expect(undefinedResult.handled).toBe(true)

});

    /**
     * 函数级注释：测试循环引用错误
     * 验证系统能够处理包含循环引用的错误对象
     */
it('应该能够处理循环引用错误', async () =>  {
  const error = new Error('循环引用错误') as any;
      error.circular = error; // 创建循环引用

      const result = await masterErrorHandler.handleError(error);
      expect(result.handled).toBe(true)

});

    /**
     * 函数级注释：测试非标准错误对象
     * 验证系统能够处理非标准的错误对象
     */
it('应该能够处理非标准错误对象', async () =>  {
      const customError = {
        message: '自定义错误对象',
        code: 'CUSTOM_ERROR',
        details: { custom: true 
}
      };

      const result = await masterErrorHandler.handleError(customError as any);
      expect(result.handled).toBe(true)
})
})
});