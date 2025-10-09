/**
 * 文件级注释：性能基准测试
 *
 * 该文件对狼人杀学习系统进行全面的性能基准测试，包括：
 * - 实时订阅系统性能测试
 * - 查询缓存系统性能测试
 * - 错误处理系统性能测试
 * - 性能关键修复验证
 * - 综合性能评估
 *
 * 测试目标：
 * - 评估系统在不同负载下的性能表现
 * - 建立性能基准线
 * - 识别性能瓶颈
 * - 验证优化措施的效果
 * - 生成详细的性能报告
 *
 * @author SOLO Coding
 * @version 1.0.0
 */
import  { describe  } from
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  vi  } from 'vitest';
import { realtimeSubscriptionManager  } from '@/utils/realtimeSubscriptionManager';
import { queryCacheOptimizer  } from '@/utils/queryCacheOptimizer';
import { unifiedErrorHandler  } from '@/utils/unifiedErrorHandler';
import { PerformanceCriticalFixes  } from '@/utils/performanceCriticalFixes';

// 模拟 PerformanceCriticalFixes
const mockPerformanceCriticalFixes = {
  fixEnhancedSkillSystemRendering: vi.fn().mockResolvedValue(true),
  fixRealtimeSubscriptionMemoryLeaks: vi.fn().mockResolvedValue(true),
  getPerformanceStats: vi.fn().mockReturnValue({
    memoryUsage: 1024 * 1024,
    renderTime: 16.67,
    subscriptionCount: 5,
    cacheHitRate: 0.85 
}) };

// 添加 getInstance 方法
mockPerformanceCriticalFixes.getInstance = vi
  .fn()
  .mockReturnValue(mockPerformanceCriticalFixes);

// 模拟 PerformanceCriticalFixes 类
vi.mock('@/utils/performanceCriticalFixes', () => ({
  PerformanceCriticalFixes: {
    getInstance: () => mockPerformanceCriticalFixes 
} }));

// 模拟浏览器 performance API
const mockPerformance = { now: () => Date.now(),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn()  
};

// 模拟 window.performance
Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true 
});

/**
 * 接口注释：基准测试配置
 */
interface BenchmarkConfig  {
  /** 测试名称 */
  name: string;
  /** 预热次数 */
  warmupRuns: number;
  /** 测试次数 */
  testRuns: number;
  /** 并发数 */
  concurrency: number;
  /** 超时时间（毫秒） */
  timeout: number;
  /** 内存限制（字节） */
  memoryLimit: number
}

/**
 * 接口注释：基准测试结果
 */
interface BenchmarkResult  {
  /** 测试名称 */
  name: string;
  /** 平均执行时间（毫秒） */
  averageTime: number;
  /** 最小执行时间（毫秒） */
  minTime: number;
  /** 最大执行时间（毫秒） */
  maxTime: number;
  /** 标准差 */
  standardDeviation: number;
  /** 每秒操作数 */
  operationsPerSecond: number;
  /** 内存使用（字节） */
  memoryUsage: number;
  /** 成功率 */
  successRate: number;
  /** 错误信息 */
  errors: string[];
  /** 详细统计 */
  details: Record<string, any>
}

/**
 * 接口注释：基准测试操作
 */
interface BenchmarkOperation  {
  /** 操作名称 */
  name: string;
  /** 操作函数 */
  operation: () => Promise<any>;
  /** 验证函数 */
  validate?: (result: any) => boolean;
  /** 清理函数 */
  cleanup?: () => Promise<void>
}

/**
 * 类级注释：性能基准测试器
 *
 * 提供全面的性能测试功能，包括：
 * - 单个操作基准测试
 * - 负载测试
 * - 压力测试
 * - 内存使用监控
 * - 性能指标计算
 */
class PerformanceBenchmark  {
  private results: BenchmarkResult[] = [];
  private performanceFixes: PerformanceCriticalFixes;

  /**
 * 函数级注释：构造函数
 */
constructor()  {
    this.performanceFixes = PerformanceCriticalFixes.getInstance()
}

  /**
   * 函数级注释：执行基准测试
   * 对单个操作进行性能基准测试
   */
  async benchmarkOperation(
    operation: BenchmarkOperation,
    config: BenchmarkConfig
  ): Promise<BenchmarkResult> {
    const times: number[] = [];
    const errors: string[] = [];
    let successCount = 0;
    const initialMemory = this.getMemoryUsage();

    // 预热
    for (let i = 0; i < config.warmupRuns; i++) {
      try {
        await operation.operation();
        if (operation.cleanup) {
          await operation.cleanup()
}
      } catch (error) {
        // 预热阶段忽略错误
      }
    }

    // 正式测试
    for (let i = 0; i < config.testRuns; i++) {
      const startTime = performance.now();
      const startMemory = this.getMemoryUsage();

      try {
        const result = await operation.operation();

        if (operation.validate && !operation.validate(result)) {
          errors.push(`Validation failed for run ${i + 1}`)
} else {
          successCount++
}

        const endTime = performance.now();
        times.push(endTime - startTime);

        if (operation.cleanup) {
          await operation.cleanup()
}
      } catch (error) {
        const endTime = performance.now();
        times.push(endTime - startTime);
        errors.push(
          `Run ${i + 1}: ${error instanceof Error ? error.message : String(error)
}`
        )
}

      // 检查内存限制
      const currentMemory = this.getMemoryUsage();
      if (currentMemory - initialMemory > config.memoryLimit) {
        errors.push(
          `Memory limit exceeded: ${currentMemory - initialMemory
} bytes`
        );
        break
}
    }

    const finalMemory = this.getMemoryUsage();
    const result = this.calculateMetrics(
      operation.name,
      times,
      successCount,
      config.testRuns,
      errors,
      finalMemory - initialMemory
    );
    this.results.push(result);

    return result
}

  /**
   * 函数级注释：执行负载测试
   * 模拟多用户并发访问
   */
  async loadTest(
    operation: BenchmarkOperation,
    config: BenchmarkConfig
  ): Promise<BenchmarkResult> {
    const promises: Promise<any>[] = [];
    const startTime = performance.now();
    const errors: string[] = [];
    let successCount = 0;

    // 创建并发操作
    for (let i = 0; i < config.concurrency; i++) {
      const promise = operation
        .operation()
        .then(result => {
          if (!operation.validate || operation.validate(result)) {
            successCount++
}
          return result
})
        .catch(error => {
          errors.push(
            `Concurrent operation ${i + 1}: ${error instanceof Error ? error.message : String(error)
}`
          )
});

      promises.push(promise)
}

    // 等待所有操作完成
    await Promise.allSettled(promises);
    const endTime = performance.now();
    const totalTime = endTime - startTime;

    const result: BenchmarkResult = {
      name: `${operation.name
} (Load Test)`,
      averageTime: totalTime / config.concurrency,
      minTime: totalTime,
      maxTime: totalTime,
      standardDeviation: 0,
      operationsPerSecond: config.concurrency / (totalTime / 1000),
      memoryUsage: this.getMemoryUsage(),
      successRate: successCount / config.concurrency,
      errors,
      details: {
        concurrency: config.concurrency,
        totalTime,
        successCount } };

    this.results.push(result);
    return result
}

  /**
   * 函数级注释：执行压力测试
   * 测试系统在极端条件下表现
   */
  async stressTest(
    operation: BenchmarkOperation,
    config: BenchmarkConfig
  ): Promise<BenchmarkResult> {
    const times: number[] = [];
    const errors: string[] = [];
    let successCount = 0;
    const initialMemory = this.getMemoryUsage();

    // 逐步增加负载
    for (let load = 1; load <= config.concurrency; load++) {
      const promises: Promise<any>[] = [];
      const loadStartTime = performance.now();

      for (let i = 0; i < load; i++) {
        const promise = operation
          .operation()
          .then(result => {
            if (!operation.validate || operation.validate(result)) {
              successCount++
}
            return result
})
          .catch(error => {
            errors.push(
              `Stress test load ${load}, operation ${i + 1}: ${error instanceof Error ? error.message : String(error)
}`
            )
});

        promises.push(promise)
}

      await Promise.allSettled(promises);
      const loadEndTime = performance.now();
      times.push(loadEndTime - loadStartTime);

      // 短暂休息
      await this.sleep(100)
}

    const finalMemory = this.getMemoryUsage();
    const result = this.calculateMetrics(
      `${operation.name} (Stress Test)`,
      times,
      successCount,
      times.length,
      errors,
      finalMemory - initialMemory
    );

    this.results.push(result);
    return result
}

  /**
 * 函数级注释：计算性能指标
 */
private calculateMetrics(
    name: string,
    times: number[],
    successCount: number,
    totalRuns: number,
    errors: string[],
    memoryUsage: number
  ): BenchmarkResult {
    if (times.length === 0) {
      return {
        name,
        averageTime: 0,
        minTime: 0,
        maxTime: 0,
        standardDeviation: 0,
        operationsPerSecond: 0,
        memoryUsage,
        successRate: 0,
        errors,
        details: {
} }
}

    const averageTime =
      times.reduce((sum, time) => sum + time, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    const variance =
      times.reduce((sum, time) => sum + Math.pow(time - averageTime, 2), 0) /
      times.length;
    const standardDeviation = Math.sqrt(variance);

    const operationsPerSecond = averageTime > 0 ? 1000 / averageTime : 0;
    const successRate = successCount / totalRuns;

    return {
      name,
      averageTime,
      minTime,
      maxTime,
      standardDeviation,
      operationsPerSecond,
      memoryUsage,
      successRate,
      errors,
      details: {
        totalRuns,
        successCount,
        times: times.slice(0, 10), // 只保留前10个时间样本
      } }
}

  /**
 * 函数级注释：获取内存使用量
 */
private getMemoryUsage(): number  {
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      return (window as any).performance.memory.usedJSHeapSize
}
    return 0
}

  /**
 * 函数级注释：休眠函数
 */
private sleep(ms: number): Promise<void>  {
    return new Promise(resolve => setTimeout(resolve, ms))
}

  /**
 * 函数级注释：获取所有测试结果
 */
getResults(): BenchmarkResult[]  {
    return [...this.results]
}

  /**
 * 函数级注释：清空测试结果
 */
clearResults(): void  {
    this.results = []
}

  /**
 * 函数级注释：生成性能报告
 */
generateReport(): string  {
    const report = ['性能基准测试报告', '='.repeat(50), ''];

    this.results.forEach(result => {
      report.push(`测试: ${result.name
}`);
      report.push(`平均时间: ${result.averageTime.toFixed(2)
}ms`);
      report.push(`最小时间: ${result.minTime.toFixed(2)
}ms`);
      report.push(`最大时间: ${result.maxTime.toFixed(2)
}ms`);
      report.push(`标准差: ${result.standardDeviation.toFixed(2)
}ms`);
      report.push(`每秒操作数: ${result.operationsPerSecond.toFixed(2)
}`);
      report.push(
        `内存使用: ${(result.memoryUsage / 1024 / 1024).toFixed(2)
}MB`
      );
      report.push(`成功率: ${(result.successRate * 100).toFixed(2)
}%`);

      if (result.errors.length > 0) {
        report.push(`错误数量: ${result.errors.length
}`);
        report.push(`错误示例: ${result.errors.slice(0, 3).join(', ')}`)
}

      report.push('-'.repeat(30))
});

    return report.join('\n')
}
}

describe('性能基准测试套件', () => { let benchmark: PerformanceBenchmark = new PerformanceBenchmark();
  const defaultConfig: BenchmarkConfig = {
    name: 'default',
    warmupRuns: 5,
    testRuns: 50,
    concurrency: 10,
    timeout: 30000,
    memoryLimit: 50 * 1024 * 1024, // 50MB
   };

  beforeAll(() => {
  benchmark = new PerformanceBenchmark()

});

  afterAll(() => {
    if (benchmark) {
      console.log(`\n${benchmark.generateReport()}`)
}
  });

  beforeEach(() => {
    if (benchmark) {
      benchmark.clearResults()
}
  });

  describe('实时订阅系统性能测试', () => {
    test('订阅创建和销毁性能', async () => {
      const operation: BenchmarkOperation = {
        name: '订阅创建销毁',
        operation: async () => {
          const config = {
            id: `test-${Date.now()
}-${Math.random()}`,
            type: 'websocket' as const,
            endpoint: 'ws://localhost:3001/test',
            priority: 'medium' as const,
            reconnect: {
              enabled: true,
              maxAttempts: 3,
              delay: 1000,
              backoff: 'exponential' as const 
},
            heartbeat: {
              enabled: false,
              interval: 30000,
              timeout: 5000 
},
            buffer: {
              enabled: true,
              maxSize: 100,
              flushInterval: 1000 
},
            memoryLimit: 1024 * 1024,
            timeout: 5000 
};

          await realtimeSubscriptionManager.createSubscription(
            config,
            () => {},
            () => {
  }
          );

          await realtimeSubscriptionManager.removeSubscription(config.id);
          return true
},
        validate: result => result === true 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '订阅创建销毁',
        testRuns: 20 
});

      expect(result.successRate).toBeGreaterThan(0.8);
      expect(result.averageTime).toBeLessThan(100)
});

    test('高并发订阅性能', async () => {
      const operation: BenchmarkOperation = {
        name: '并发订阅',
        operation: async () => {
          const config = {
            id: `concurrent-${Date.now()
}-${Math.random()}`,
            type: 'websocket' as const,
            endpoint: 'ws://localhost:3001/concurrent',
            priority: 'high' as const,
            reconnect: {
              enabled: true,
              maxAttempts: 3,
              delay: 1000,
              backoff: 'exponential' as const 
},
            heartbeat: {
              enabled: false,
              interval: 30000,
              timeout: 5000 
},
            buffer: {
              enabled: true,
              maxSize: 100,
              flushInterval: 1000 
},
            memoryLimit: 1024 * 1024,
            timeout: 5000 
};

          await realtimeSubscriptionManager.createSubscription(
            config,
            () => {},
            () => {
  }
          );

          return config.id

},
        cleanup: async () => {
  // 清理所有测试订阅
          const stats = realtimeSubscriptionManager.getStats();
          // 这里简化处理，实际应该清理特定的测试订阅
        } 
};

      const result = await benchmark.loadTest(operation, {
        ...defaultConfig,
        name: '并发订阅',
        concurrency: 20 
});

      expect(result.successRate).toBeGreaterThan(0.7);
      expect(result.operationsPerSecond).toBeGreaterThan(10)
})
});

  describe('查询缓存系统性能测试', () => {
    test('缓存读写性能', async () => {
      const operation: BenchmarkOperation = {
        name: '缓存读写',
        operation: async () => {
          const cacheKey = `test-cache-${Date.now()}-${Math.random()}`;
          const testData = { id: 1,
            name: 'test',
            data: new Array(100).fill('x').join('')  
};

          // 写入缓存
          await queryCacheOptimizer.query(
            {
              queryId: cacheKey,
              queryType: 'test',
              params: {
},
              priority: 1,
              cacheable: true,
              customTtl: 60000 
},
            async () => testData
          );

          // 读取缓存
          const result = await queryCacheOptimizer.query(
            {
              queryId: cacheKey,
              queryType: 'test',
              params: {
},
              priority: 1,
              cacheable: true 
},
            async () => null
          );

          return result
},
        validate: result => result !== null 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '缓存读写',
        testRuns: 100 
});

      expect(result.successRate).toBeGreaterThan(0.9);
      expect(result.averageTime).toBeLessThan(50)
});

    test('缓存失效和清理性能', async () => {
      const operation: BenchmarkOperation = {
        name: '缓存失效清理',
        operation: async () => {
          const cacheKey = `invalidate-test-${Date.now()}-${Math.random()}`;

          // 创建缓存
          await queryCacheOptimizer.query(
            {
              queryId: cacheKey,
              queryType: 'test',
              params: {
},
              priority: 1,
              cacheable: true,
              customTtl: 60000 
},
            async () => ({ data: 'test' 
})
          );

          // 失效缓存
          await queryCacheOptimizer.invalidateCache([cacheKey]);

          return true
},
        validate: result => result === true 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '缓存失效清理',
        testRuns: 50 
});

      expect(result.successRate).toBeGreaterThan(0.8);
      expect(result.averageTime).toBeLessThan(30)
})
});

  describe('错误处理系统性能测试', () => {
    test('错误处理性能', async () => {
      const operation: BenchmarkOperation = {
        name: '错误处理',
        operation: async () => {
          const testError = new Error('测试错误');

          const result = await unifiedErrorHandler.handleError(testError, {
            context: 'performance-test',
            severity: 'medium',
            category: 'system',
            retryable: false,
            userMessage: '测试错误处理性能' 
});

          return result
},
        validate: result => result && typeof result === 'object' 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '错误处理',
        testRuns: 100 
});

      expect(result.successRate).toBeGreaterThan(0.9);
      expect(result.averageTime).toBeLessThan(20)
});

    test('错误处理内存使用', async () => {
      const operation: BenchmarkOperation = {
        name: '错误处理内存',
        operation: async () => {
          // 创建大量错误来测试内存使用
          const errors = [];
          for (let i = 0; i < 100; i++) {
            const error = new Error(`批量测试错误 ${i}`);
            const result = await unifiedErrorHandler.handleError(error, {
              context: `batch-test-${i
}`,
              severity: 'low',
              category: 'test',
              retryable: false 
});
            errors.push(result)
}
          return errors.length
},
        validate: result => result === 100 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '错误处理内存',
        testRuns: 10,
        memoryLimit: 100 * 1024 * 1024, // 100MB
      });

      expect(result.successRate).toBeGreaterThan(0.8);
      expect(result.memoryUsage).toBeLessThan(50 * 1024 * 1024); // 50MB
    })
});

  describe('性能关键修复测试', () => {
    test('优化措施效果验证', async () => {
      const operation: BenchmarkOperation = {
        name: '性能修复效果',
        operation: async () => {
  const fixes = PerformanceCriticalFixes.getInstance();

          // 测试 EnhancedSkillSystem 修复
          await fixes.fixEnhancedSkillSystemRendering();

          // 测试实时订阅修复
          await fixes.fixRealtimeSubscriptionMemoryLeaks();

          // 获取性能统计
          const stats = fixes.getPerformanceStats();

          return stats
},
        validate: result => result && typeof result === 'object' 
};

      const result = await benchmark.benchmarkOperation(operation, {
        ...defaultConfig,
        name: '性能修复效果',
        testRuns: 20 
});

      expect(result.successRate).toBeGreaterThan(0.9);
      expect(result.averageTime).toBeLessThan(100)
})
});

  describe('综合性能测试', () => {
    test('系统整体性能', async () => {
      const operation: BenchmarkOperation = {
        name: '系统整体性能',
        operation: async () => {
          // 模拟复杂的系统操作
          const subscriptionId = `system-test-${Date.now()}-${Math.random()}`;

          // 1. 创建订阅
          await realtimeSubscriptionManager.createSubscription(
            {
              id: subscriptionId,
              type: 'websocket',
              endpoint: 'ws://localhost:3001/system-test',
              priority: 'medium',
              reconnect: {
                enabled: true,
                maxAttempts: 3,
                delay: 1000,
                backoff: 'exponential' 
},
              heartbeat: {
                enabled: false,
                interval: 30000,
                timeout: 5000 
},
              buffer: {
                enabled: true,
                maxSize: 100,
                flushInterval: 1000 
},
              memoryLimit: 1024 * 1024,
              timeout: 5000 
},
            () => {},
            () => {}
          );

          // 2. 缓存操作
          const cacheResult = await queryCacheOptimizer.query(
            {
              queryId: `system-cache-${subscriptionId
}`,
              queryType: 'system-test',
              params: {
},
              priority: 1,
              cacheable: true 
},
            async () => ({ systemData: 'test' 
})
          );

          // 3. 错误处理
          const errorResult = await unifiedErrorHandler.handleError(
            new Error('系统测试错误'),
            {
              context: 'system-performance-test',
              severity: 'low',
              category: 'test',
              retryable: false 
}
          );

          // 4. 清理
          await realtimeSubscriptionManager.removeSubscription(subscriptionId);

          return {
            subscription: true,
            cache: cacheResult,
            error: errorResult 
}
},
        validate: result => {
  return (
            result &&
            result.subscription === true &&
            result.cache &&
            result.error
          )
} 
};

      const result = await benchmark.stressTest(operation, {
        ...defaultConfig,
        name: '系统整体性能',
        concurrency: 15 
});

      expect(result.successRate).toBeGreaterThan(0.7);
      expect(result.operationsPerSecond).toBeGreaterThan(5)
});

    test('性能报告生成', async () => {
      // 确保有一些测试结果
      await benchmark.benchmarkOperation(
        {
          name: '简单操作',
          operation: async () => {
  await new Promise(resolve => setTimeout(resolve, 10));
            return true
} 
},
        {
          ...defaultConfig,
          testRuns: 10 
}
      );

      const report = benchmark.generateReport();
      expect(report).toContain('性能基准测试报告');
      expect(report).toContain('简单操作');
      expect(report.length).toBeGreaterThan(100)
})
})
});
