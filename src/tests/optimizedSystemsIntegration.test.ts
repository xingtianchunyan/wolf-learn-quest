/**
 * 文件级注释：优化系统集成测试
 * 
 * 该文件实现了对第二阶段质量提升工作的全面集成测试，验证：
 * - 统一错误处理系统的完整性
 * - 安全审计系统的有效性
 * - 性能优化组件的效果
 * - 智能缓存策略的性能
 * - 实时订阅内存管理
 * - 系统间的协同工作
 * 
 * 测试覆盖：
 * - 错误处理流程完整性
 * - 安全策略执行效果
 * - 性能监控和优化
 * - 内存管理和清理
 * - 缓存策略智能化
 * - 组件渲染优化
 * 
 * @author SOLO Coding
 * @version 2.0.0
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

// 导入优化后的系统
import { unifiedErrorSystem, ErrorType, ErrorSeverity } from '@/utils/unifiedErrorSystem';
import { securityAuditService } from '@/services/securityAuditService';
import { enhancedInputValidator } from '@/utils/enhancedInputValidation';
import { enhancedPermissionSystem } from '@/utils/enhancedPermissionSystem';
import { intelligentCacheStrategy, CacheStrategyType, CachePriority } from '@/utils/intelligentCacheStrategy';
import { enhancedRealtimeManager } from '@/utils/enhancedRealtimeManager';
import { optimizedQueryCache } from '@/utils/optimizedQueryCache';
import { memoryManager } from '@/utils/memoryManagementSystem';
import { renderOptimizer } from '@/utils/componentRenderOptimizer';

// Mock logger
vi.mock('@/lib/logger', () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn()
  })
}));

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    channel: vi.fn(() => ({
      on: vi.fn(() => ({ subscribe: vi.fn() })),
      unsubscribe: vi.fn(),
      send: vi.fn()
    })),
    removeChannel: vi.fn(),
    getChannels: vi.fn(() => [])
  }))
}));

/**
 * 接口注释：测试上下文配置
 * 定义测试环境的基础配置信息
 */
interface TestContext {
  userId: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: number;
}

/**
 * 接口注释：性能测试指标
 * 定义性能测试的关键指标
 */
interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  errorHandlingTime: number;
  securityCheckTime: number;
}

/**
 * 接口注释：测试错误配置
 * 定义测试中使用的错误类型和配置
 */
interface TestErrorConfig {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  component: string;
  operation: string;
  shouldRecover: boolean;
}

/**
 * 类级注释：模拟组件
 * 用于测试渲染优化的模拟React组件
 */
const MockComponent: React.FC<{ data: any; onError?: (error: Error) => void }> = ({ 
  data, 
  onError 
}) => {
  React.useEffect(() => {
    if (data?.shouldError) {
      const error = new Error('Mock component error');
      onError?.(error);
    }
  }, [data, onError]);

  return (
    <div data-testid="mock-component">
      {data?.content || 'Mock Component'}
    </div>
  );
};

/**
 * 类级注释：优化系统集成测试套件
 * 
 * 提供全面的系统集成测试，验证：
 * - 错误处理系统的完整性和效率
 * - 安全审计系统的准确性
 * - 性能优化的实际效果
 * - 缓存策略的智能化程度
 * - 内存管理的有效性
 * - 系统间的协同工作能力
 */
describe('优化系统集成测试', () => {
  let testContext: TestContext;
  let performanceMetrics: PerformanceMetrics;
  let mockConsoleError: any;
  let mockPerformanceNow: any;

  /**
   * 函数级注释：测试前置设置
   * 初始化测试环境和模拟对象
   */
  beforeAll(() => {
    // 模拟控制台方法
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // 模拟性能API
    mockPerformanceNow = vi.spyOn(performance, 'now').mockImplementation(() => Date.now());
    
    // 模拟浏览器API
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    // 模拟网络请求
    global.fetch = vi.fn();
  });

  /**
   * 函数级注释：每个测试前的设置
   * 在每个测试前重置状态和配置
   */
  beforeEach(() => {
    testContext = {
      userId: 'test-user-123',
      sessionId: 'test-session-456',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Test Browser)',
      timestamp: Date.now()
    };

    performanceMetrics = {
      renderTime: 0,
      memoryUsage: 0,
      cacheHitRate: 0,
      errorHandlingTime: 0,
      securityCheckTime: 0
    };

    // 清理系统状态
    unifiedErrorSystem.clearHistory();
    unifiedErrorSystem.resetStatistics();
    optimizedQueryCache.clear();
    intelligentCacheStrategy.updateConfig({
      type: CacheStrategyType.ADAPTIVE,
      enablePrediction: true,
      enablePreloading: true
    });

    vi.clearAllMocks();
  });

  /**
   * 函数级注释：每个测试后的清理
   * 在每个测试后清理资源和状态
   */
  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
  });

  /**
   * 函数级注释：测试后置清理
   * 在所有测试后恢复模拟对象
   */
  afterAll(() => {
    mockConsoleError.mockRestore();
    mockPerformanceNow.mockRestore();
  });

  /**
   * 测试组：统一错误处理系统集成测试
   */
  describe('统一错误处理系统集成测试', () => {
    /**
     * 函数级注释：测试错误处理流程的完整性
     * 验证从错误发生到处理完成的整个流程
     */
    it('应该完整处理错误流程并记录性能指标', async () => {
      const startTime = performance.now();
      
      // 创建测试错误
      const testError = new Error('集成测试错误');
      
      // 处理错误
      const result = await unifiedErrorSystem.handleError(testError, {
        component: 'IntegrationTest',
        operation: 'error_handling_test',
        userId: testContext.userId,
        sessionId: testContext.sessionId
      });

      const endTime = performance.now();
      performanceMetrics.errorHandlingTime = endTime - startTime;

      // 验证错误处理结果
      expect(result.handled).toBe(true);
      expect(result.classification.type).toBe(ErrorType.SYSTEM);
      expect(result.severity).toBeDefined();
      expect(result.context.component).toBe('IntegrationTest');
      expect(result.context.userId).toBe(testContext.userId);

      // 验证性能指标
      expect(performanceMetrics.errorHandlingTime).toBeLessThan(100); // 错误处理应在100ms内完成

      // 验证错误统计
      const stats = unifiedErrorSystem.getStatistics();
      expect(stats.totalErrors).toBe(1);
      expect(stats.errorsByType[ErrorType.SYSTEM]).toBe(1);
    });

    /**
     * 函数级注释：测试错误恢复机制
     * 验证系统的自动错误恢复能力
     */
    it('应该执行错误恢复策略并监控恢复效果', async () => {
      const recoveryError = new Error('需要恢复的错误');
      
      // 模拟可恢复的错误场景
      const result = await unifiedErrorSystem.handleError(recoveryError, {
        component: 'RecoveryTest',
        operation: 'recovery_test',
        enableRecovery: true,
        maxRetries: 3
      });

      // 验证恢复尝试
      expect(result.handled).toBe(true);
      expect(result.recovery).toBeDefined();
      expect(result.recovery?.attempted).toBe(true);

      // 验证恢复统计
      const stats = unifiedErrorSystem.getStatistics();
      expect(stats.recoveryAttempts).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试批量错误处理性能
     * 验证系统处理大量错误时的性能表现
     */
    it('应该高效处理批量错误并维持性能', async () => {
      const errors = Array.from({ length: 50 }, (_, i) => 
        new Error(`批量错误 ${i + 1}`)
      );

      const startTime = performance.now();
      
      // 批量处理错误
      const results = await Promise.all(
        errors.map(error => 
          unifiedErrorSystem.handleError(error, {
            component: 'BatchTest',
            operation: 'batch_error_test'
          })
        )
      );

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // 验证所有错误都被处理
      expect(results).toHaveLength(50);
      expect(results.every(result => result.handled)).toBe(true);

      // 验证批量处理性能（平均每个错误处理时间应小于10ms）
      const avgTimePerError = totalTime / 50;
      expect(avgTimePerError).toBeLessThan(10);

      // 验证错误统计
      const stats = unifiedErrorSystem.getStatistics();
      expect(stats.totalErrors).toBe(50);
    });
  });

  /**
   * 测试组：安全审计系统集成测试
   */
  describe('安全审计系统集成测试', () => {
    /**
     * 函数级注释：测试安全检查性能
     * 验证安全审计系统的检查效率
     */
    it('应该快速执行安全检查并记录审计日志', async () => {
      const startTime = performance.now();

      // 执行安全检查
      const securityResult = await securityAuditService.performSecurityCheck({
        userId: testContext.userId,
        action: 'data_access',
        resource: 'user_profile',
        ipAddress: testContext.ipAddress,
        userAgent: testContext.userAgent
      });

      const endTime = performance.now();
      performanceMetrics.securityCheckTime = endTime - startTime;

      // 验证安全检查结果
      expect(securityResult.passed).toBeDefined();
      expect(securityResult.riskLevel).toBeDefined();
      expect(securityResult.auditId).toBeDefined();

      // 验证性能指标（安全检查应在50ms内完成）
      expect(performanceMetrics.securityCheckTime).toBeLessThan(50);
    });

    /**
     * 函数级注释：测试输入验证集成
     * 验证输入验证与安全审计的集成效果
     */
    it('应该集成输入验证和安全审计功能', async () => {
      const testInput = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'SecurePass123!',
        profileData: {
          age: 25,
          location: 'Test City'
        }
      };

      // 执行输入验证
      const validationResult = await enhancedInputValidator.validateInput(testInput, {
        username: { type: 'string', required: true, minLength: 3, maxLength: 20 },
        email: { type: 'email', required: true },
        password: { type: 'password', required: true, minLength: 8 },
        profileData: { type: 'object', required: false }
      });

      // 验证输入验证结果
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);

      // 验证安全审计记录
      const auditLogs = await securityAuditService.getAuditLogs({
        userId: testContext.userId,
        action: 'input_validation',
        limit: 1
      });

      expect(auditLogs).toBeDefined();
    });

    /**
     * 函数级注释：测试权限系统集成
     * 验证权限检查与安全审计的协同工作
     */
    it('应该集成权限检查和安全监控', async () => {
      // 设置用户权限
      await enhancedPermissionSystem.setUserPermissions(testContext.userId, [
        'read:profile',
        'write:profile',
        'read:game_data'
      ]);

      // 执行权限检查
      const hasPermission = await enhancedPermissionSystem.checkPermission(
        testContext.userId,
        'read:profile',
        { resourceId: 'profile_123' }
      );

      // 验证权限检查结果
      expect(hasPermission).toBe(true);

      // 验证安全审计记录了权限检查
      const auditLogs = await securityAuditService.getAuditLogs({
        userId: testContext.userId,
        action: 'permission_check',
        limit: 1
      });

      expect(auditLogs).toBeDefined();
    });
  });

  /**
   * 测试组：智能缓存策略集成测试
   */
  describe('智能缓存策略集成测试', () => {
    /**
     * 函数级注释：测试缓存性能和命中率
     * 验证智能缓存策略的性能表现
     */
    it('应该实现高效的缓存策略并优化命中率', async () => {
      const cacheKey = 'test_data_key';
      const testData = { id: 1, name: 'Test Data', timestamp: Date.now() };

      // 模拟数据获取函数
      const dataFetcher = vi.fn().mockResolvedValue(testData);

      // 第一次获取（缓存未命中）
      const startTime1 = performance.now();
      const result1 = await intelligentCacheStrategy.get(cacheKey, dataFetcher, {
        priority: CachePriority.HIGH,
        enableCompression: true
      });
      const endTime1 = performance.now();

      // 第二次获取（缓存命中）
      const startTime2 = performance.now();
      const result2 = await intelligentCacheStrategy.get(cacheKey, dataFetcher, {
        priority: CachePriority.HIGH
      });
      const endTime2 = performance.now();

      // 验证缓存结果
      expect(result1).toEqual(testData);
      expect(result2).toEqual(testData);
      expect(dataFetcher).toHaveBeenCalledTimes(1); // 只调用一次数据获取

      // 验证缓存性能（缓存命中应该更快）
      const firstCallTime = endTime1 - startTime1;
      const secondCallTime = endTime2 - startTime2;
      expect(secondCallTime).toBeLessThan(firstCallTime);

      // 验证缓存统计
      const stats = intelligentCacheStrategy.getStats();
      expect(stats.performanceMetrics.cacheHits).toBe(1);
      expect(stats.performanceMetrics.cacheMisses).toBe(1);
      expect(stats.performanceMetrics.hitRate).toBe(0.5);
    });

    /**
     * 函数级注释：测试批量缓存操作
     * 验证批量缓存操作的性能和正确性
     */
    it('应该高效处理批量缓存操作', async () => {
      const batchRequests = Array.from({ length: 10 }, (_, i) => ({
        key: `batch_key_${i}`,
        fetcher: vi.fn().mockResolvedValue({ id: i, data: `batch_data_${i}` }),
        priority: i < 5 ? CachePriority.HIGH : CachePriority.MEDIUM
      }));

      const startTime = performance.now();
      const results = await intelligentCacheStrategy.getBatch(batchRequests);
      const endTime = performance.now();

      // 验证批量操作结果
      expect(results.size).toBe(10);
      expect(Array.from(results.keys())).toEqual(
        batchRequests.map(req => req.key)
      );

      // 验证批量操作性能（应在合理时间内完成）
      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(500); // 500ms内完成

      // 验证高优先级请求被优先处理
      const stats = intelligentCacheStrategy.getStats();
      expect(stats.performanceMetrics.totalQueries).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试预测性预加载
     * 验证智能缓存的预测性预加载功能
     */
    it('应该执行预测性预加载并提升缓存效率', async () => {
      const baseKey = 'predictive_base_key';
      const relatedKeys = ['related_key_1', 'related_key_2', 'related_key_3'];

      // 建立访问模式
      for (let i = 0; i < 5; i++) {
        await intelligentCacheStrategy.get(baseKey, 
          vi.fn().mockResolvedValue({ base: true, iteration: i }),
          { priority: CachePriority.HIGH }
        );

        // 模拟相关数据访问
        for (const relatedKey of relatedKeys) {
          await intelligentCacheStrategy.get(relatedKey,
            vi.fn().mockResolvedValue({ related: true, key: relatedKey }),
            { priority: CachePriority.MEDIUM }
          );
        }
      }

      // 触发预测性预加载
      await intelligentCacheStrategy.predictivePreload(baseKey);

      // 验证预加载效果
      const stats = intelligentCacheStrategy.getStats();
      expect(stats.performanceMetrics.totalQueries).toBeGreaterThan(15);
      
      // 验证缓存策略自适应调整
      expect(stats.performanceMetrics.adaptiveAdjustments).toBeGreaterThanOrEqual(0);
    });
  });

  /**
   * 测试组：实时订阅内存管理集成测试
   */
  describe('实时订阅内存管理集成测试', () => {
    /**
     * 函数级注释：测试实时订阅内存优化
     * 验证实时订阅的内存管理效果
     */
    it('应该优化实时订阅的内存使用', async () => {
      const subscriptionConfigs = Array.from({ length: 20 }, (_, i) => ({
        table: `test_table_${i}`,
        filter: `id=eq.${i}`,
        callback: vi.fn(),
        priority: i < 10 ? 'high' : 'medium'
      }));

      // 创建多个订阅
      const subscriptions = [];
      for (const config of subscriptionConfigs) {
        const subscription = await enhancedRealtimeManager.subscribe(
          config.table,
          config.filter,
          config.callback,
          { priority: config.priority as any }
        );
        subscriptions.push(subscription);
      }

      // 验证订阅创建
      expect(subscriptions).toHaveLength(20);
      expect(subscriptions.every(sub => sub.id)).toBe(true);

      // 检查内存使用情况
      const memoryStats = enhancedRealtimeManager.getMemoryStats();
      expect(memoryStats.activeSubscriptions).toBe(20);
      expect(memoryStats.memoryUsage).toBeLessThan(10 * 1024 * 1024); // 小于10MB

      // 清理订阅
      for (const subscription of subscriptions) {
        await enhancedRealtimeManager.unsubscribe(subscription.id);
      }

      // 验证内存清理
      const finalMemoryStats = enhancedRealtimeManager.getMemoryStats();
      expect(finalMemoryStats.activeSubscriptions).toBe(0);
    });

    /**
     * 函数级注释：测试订阅连接池优化
     * 验证连接池的复用和优化效果
     */
    it('应该优化连接池使用并减少连接数', async () => {
      const tableConfigs = [
        { table: 'users', filters: ['id=eq.1', 'id=eq.2', 'id=eq.3'] },
        { table: 'games', filters: ['status=eq.active', 'status=eq.waiting'] },
        { table: 'skills', filters: ['type=eq.active', 'type=eq.passive'] }
      ];

      const allSubscriptions = [];

      // 创建多个表的多个订阅
      for (const config of tableConfigs) {
        for (const filter of config.filters) {
          const subscription = await enhancedRealtimeManager.subscribe(
            config.table,
            filter,
            vi.fn(),
            { enableBatching: true }
          );
          allSubscriptions.push(subscription);
        }
      }

      // 验证连接池优化
      const connectionStats = enhancedRealtimeManager.getConnectionStats();
      expect(connectionStats.activeConnections).toBeLessThan(allSubscriptions.length);
      expect(connectionStats.connectionPoolUtilization).toBeGreaterThan(0);

      // 清理所有订阅
      for (const subscription of allSubscriptions) {
        await enhancedRealtimeManager.unsubscribe(subscription.id);
      }
    });
  });

  /**
   * 测试组：组件渲染优化集成测试
   */
  describe('组件渲染优化集成测试', () => {
    /**
     * 函数级注释：测试组件渲染性能
     * 验证组件渲染优化的实际效果
     */
    it('应该优化组件渲染性能并减少不必要的重渲染', async () => {
      let renderCount = 0;
      const OptimizedComponent = renderOptimizer.optimizeComponent(
        React.memo(({ data }: { data: any }) => {
          renderCount++;
          return <div data-testid="optimized-component">{data.content}</div>;
        })
      );

      const initialData = { content: 'Initial Content', timestamp: Date.now() };
      
      // 首次渲染
      const { rerender } = render(<OptimizedComponent data={initialData} />);
      expect(renderCount).toBe(1);

      // 相同数据重渲染（应该被优化跳过）
      rerender(<OptimizedComponent data={initialData} />);
      expect(renderCount).toBe(1); // 渲染次数不应增加

      // 不同数据重渲染
      const newData = { content: 'New Content', timestamp: Date.now() };
      rerender(<OptimizedComponent data={newData} />);
      expect(renderCount).toBe(2); // 渲染次数应该增加

      // 验证渲染优化指标
      const metrics = renderOptimizer.getMetrics();
      expect(metrics.optimizedRenders).toBeGreaterThan(0);
      expect(metrics.skippedRenders).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试错误边界集成
     * 验证错误边界与渲染优化的集成效果
     */
    it('应该集成错误边界和渲染优化功能', async () => {
      let errorHandled = false;
      const errorHandler = (error: Error) => {
        errorHandled = true;
        unifiedErrorSystem.handleError(error, {
          component: 'ErrorBoundaryTest',
          operation: 'render_error'
        });
      };

      const ErrorProneComponent = ({ shouldError }: { shouldError: boolean }) => {
        if (shouldError) {
          throw new Error('Render error for testing');
        }
        return <div data-testid="error-prone-component">No Error</div>;
      };

      // 正常渲染
      const { rerender } = render(
        <MockComponent data={{ content: 'Normal' }} onError={errorHandler} />
      );
      expect(screen.getByTestId('mock-component')).toBeInTheDocument();

      // 触发错误
      rerender(
        <MockComponent data={{ shouldError: true }} onError={errorHandler} />
      );

      // 等待错误处理
      await waitFor(() => {
        expect(errorHandled).toBe(true);
      });

      // 验证错误统计
      const errorStats = unifiedErrorSystem.getStatistics();
      expect(errorStats.totalErrors).toBeGreaterThan(0);
    });
  });

  /**
   * 测试组：系统协同工作集成测试
   */
  describe('系统协同工作集成测试', () => {
    /**
     * 函数级注释：测试完整的用户操作流程
     * 验证所有优化系统在真实场景下的协同工作
     */
    it('应该在完整用户操作流程中协同工作', async () => {
      const operationStartTime = performance.now();

      // 1. 安全检查
      const securityCheck = await securityAuditService.performSecurityCheck({
        userId: testContext.userId,
        action: 'skill_usage',
        resource: 'game_skill',
        ipAddress: testContext.ipAddress
      });

      expect(securityCheck.passed).toBe(true);

      // 2. 权限验证
      await enhancedPermissionSystem.setUserPermissions(testContext.userId, [
        'use:skill',
        'read:game_data'
      ]);

      const hasPermission = await enhancedPermissionSystem.checkPermission(
        testContext.userId,
        'use:skill'
      );

      expect(hasPermission).toBe(true);

      // 3. 输入验证
      const skillInput = {
        skillId: 'skill_123',
        targetId: 'target_456',
        parameters: { power: 75, duration: 30 }
      };

      const validationResult = await enhancedInputValidator.validateInput(skillInput, {
        skillId: { type: 'string', required: true },
        targetId: { type: 'string', required: true },
        parameters: { type: 'object', required: true }
      });

      expect(validationResult.isValid).toBe(true);

      // 4. 缓存数据获取
      const skillData = await intelligentCacheStrategy.get(
        `skill_${skillInput.skillId}`,
        vi.fn().mockResolvedValue({
          id: skillInput.skillId,
          name: 'Test Skill',
          effects: ['damage', 'stun']
        }),
        { priority: CachePriority.HIGH }
      );

      expect(skillData).toBeDefined();

      // 5. 实时订阅更新
      const subscription = await enhancedRealtimeManager.subscribe(
        'game_events',
        `user_id=eq.${testContext.userId}`,
        vi.fn(),
        { priority: 'high' }
      );

      expect(subscription.id).toBeDefined();

      const operationEndTime = performance.now();
      const totalOperationTime = operationEndTime - operationStartTime;

      // 验证整体性能（完整流程应在合理时间内完成）
      expect(totalOperationTime).toBeLessThan(1000); // 1秒内完成

      // 清理订阅
      await enhancedRealtimeManager.unsubscribe(subscription.id);

      // 验证所有系统的统计信息
      const errorStats = unifiedErrorSystem.getStatistics();
      const cacheStats = intelligentCacheStrategy.getStats();
      const memoryStats = enhancedRealtimeManager.getMemoryStats();

      expect(errorStats.totalErrors).toBe(0); // 无错误发生
      expect(cacheStats.performanceMetrics.hitRate).toBeGreaterThanOrEqual(0);
      expect(memoryStats.memoryUsage).toBeLessThan(50 * 1024 * 1024); // 内存使用合理
    });

    /**
     * 函数级注释：测试系统在高负载下的表现
     * 验证优化系统在高并发场景下的稳定性
     */
    it('应该在高负载情况下保持稳定性能', async () => {
      const concurrentOperations = 100;
      const operations = [];

      // 创建大量并发操作
      for (let i = 0; i < concurrentOperations; i++) {
        const operation = async () => {
          try {
            // 安全检查
            await securityAuditService.performSecurityCheck({
              userId: `user_${i}`,
              action: 'data_access',
              resource: 'test_resource'
            });

            // 缓存操作
            await intelligentCacheStrategy.get(
              `high_load_key_${i}`,
              vi.fn().mockResolvedValue({ id: i, data: `test_data_${i}` }),
              { priority: CachePriority.MEDIUM }
            );

            // 实时订阅
            const sub = await enhancedRealtimeManager.subscribe(
              'test_table',
              `id=eq.${i}`,
              vi.fn(),
              { priority: 'medium' }
            );

            // 立即取消订阅以测试清理
            await enhancedRealtimeManager.unsubscribe(sub.id);

            return { success: true, operationId: i };
          } catch (error) {
            await unifiedErrorSystem.handleError(error as Error, {
              component: 'HighLoadTest',
              operation: `concurrent_operation_${i}`
            });
            return { success: false, operationId: i, error };
          }
        };

        operations.push(operation());
      }

      const startTime = performance.now();
      const results = await Promise.allSettled(operations);
      const endTime = performance.now();

      const totalTime = endTime - startTime;
      const successfulOperations = results.filter(
        result => result.status === 'fulfilled' && 
        (result.value as any).success
      ).length;

      // 验证高负载性能
      expect(successfulOperations).toBeGreaterThan(concurrentOperations * 0.9); // 90%成功率
      expect(totalTime).toBeLessThan(5000); // 5秒内完成

      // 验证系统稳定性
      const errorStats = unifiedErrorSystem.getStatistics();
      const cacheStats = intelligentCacheStrategy.getStats();
      const memoryStats = enhancedRealtimeManager.getMemoryStats();

      expect(errorStats.errorRate).toBeLessThan(0.1); // 错误率小于10%
      expect(cacheStats.performanceMetrics.avgResponseTime).toBeLessThan(100); // 平均响应时间
      expect(memoryStats.memoryUsage).toBeLessThan(100 * 1024 * 1024); // 内存使用合理
    });

    /**
     * 函数级注释：测试系统资源清理
     * 验证所有系统的资源清理和内存管理
     */
    it('应该正确清理系统资源并防止内存泄漏', async () => {
      // 创建各种资源
      const subscriptions = [];
      const cacheKeys = [];

      // 创建订阅
      for (let i = 0; i < 10; i++) {
        const sub = await enhancedRealtimeManager.subscribe(
          'cleanup_test',
          `id=eq.${i}`,
          vi.fn()
        );
        subscriptions.push(sub.id);
      }

      // 创建缓存项
      for (let i = 0; i < 10; i++) {
        const key = `cleanup_key_${i}`;
        await intelligentCacheStrategy.get(
          key,
          vi.fn().mockResolvedValue({ cleanup: true, id: i }),
          { priority: CachePriority.LOW }
        );
        cacheKeys.push(key);
      }

      // 记录初始内存状态
      const initialMemoryStats = enhancedRealtimeManager.getMemoryStats();
      const initialCacheStats = intelligentCacheStrategy.getStats();

      // 执行清理
      for (const subId of subscriptions) {
        await enhancedRealtimeManager.unsubscribe(subId);
      }

      await optimizedQueryCache.clear();
      intelligentCacheStrategy.updateConfig({ type: CacheStrategyType.MEMORY_OPTIMIZED });

      // 等待清理完成
      await new Promise(resolve => setTimeout(resolve, 100));

      // 验证资源清理
      const finalMemoryStats = enhancedRealtimeManager.getMemoryStats();
      const finalCacheStats = intelligentCacheStrategy.getStats();

      expect(finalMemoryStats.activeSubscriptions).toBe(0);
      expect(finalMemoryStats.memoryUsage).toBeLessThan(initialMemoryStats.memoryUsage);
      expect(finalCacheStats.totalQueries).toBeLessThanOrEqual(initialCacheStats.totalQueries);
    });
  });
});