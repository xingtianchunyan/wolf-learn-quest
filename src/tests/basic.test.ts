/**
 * 文件级注释：基础功能测试
 * 
 * 该文件实现了基础功能的测试，旨在：
 * - 验证测试环境配置正确
 * - 测试基本的错误处理功能
 * - 验证安全工具类功能
 * - 测试性能监控基础功能
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * 接口注释：测试错误接口
 * 定义测试中使用的错误结构
 */
interface TestError {
  message: string;
  code?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * 类级注释：基础错误处理器类
 * 
 * 提供基础的错误处理功能用于测试
 */
class BasicErrorHandler {
  private errors: TestError[] = [];
  private handlers: Array<(error: TestError) => void> = [];

  /**
   * 函数级注释：处理错误
   * 处理传入的错误
   */
  handleError(error: TestError): void {
    this.errors.push(error);
    this.handlers.forEach(handler => {
      try {
        handler(error);
      } catch (e) {
        console.error('Error in error handler:', e);
      }
    });
  }

  /**
   * 函数级注释：添加错误处理器
   * 添加错误处理回调函数
   */
  addHandler(handler: (error: TestError) => void): void {
    this.handlers.push(handler);
  }

  /**
   * 函数级注释：获取错误列表
   * 获取所有已处理的错误
   */
  getErrors(): TestError[] {
    return [...this.errors];
  }

  /**
   * 函数级注释：清空错误
   * 清空所有错误记录
   */
  clear(): void {
    this.errors = [];
  }
}

/**
 * 类级注释：基础安全验证器类
 * 
 * 提供基础的安全验证功能用于测试
 */
class BasicSecurityValidator {
  /**
   * 函数级注释：验证输入
   * 验证用户输入是否安全
   */
  validateInput(input: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 检查XSS
    if (this.containsXSS(input)) {
      errors.push('检测到潜在的XSS攻击');
    }

    // 检查SQL注入
    if (this.containsSQLInjection(input)) {
      errors.push('检测到潜在的SQL注入攻击');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 函数级注释：检测XSS
   * 检测输入中是否包含XSS攻击载荷
   */
  private containsXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * 函数级注释：检测SQL注入
   * 检测输入中是否包含SQL注入攻击载荷
   */
  private containsSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(';|--;|\/\*|\*\/)/gi,
      /(\bOR\b.*=.*\bOR\b)|(\bAND\b.*=.*\bAND\b)/gi,
      /('.*OR.*'.*=.*')/gi
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }
}

/**
 * 类级注释：基础性能监控器类
 * 
 * 提供基础的性能监控功能用于测试
 */
class BasicPerformanceMonitor {
  private metrics: Array<{ name: string; duration: number; timestamp: number }> = [];

  /**
   * 函数级注释：测量执行时间
   * 测量函数执行时间
   */
  async measureTime<T>(name: string, fn: () => T | Promise<T>): Promise<{ result: T; duration: number }> {
    const startTime = performance.now();
    const result = await fn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    this.metrics.push({
      name,
      duration,
      timestamp: Date.now()
    });

    return { result, duration };
  }

  /**
   * 函数级注释：获取性能指标
   * 获取所有性能指标
   */
  getMetrics(): Array<{ name: string; duration: number; timestamp: number }> {
    return [...this.metrics];
  }

  /**
   * 函数级注释：获取平均执行时间
   * 获取指定操作的平均执行时间
   */
  getAverageTime(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) {return 0;}

    const totalTime = relevantMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalTime / relevantMetrics.length;
  }

  /**
   * 函数级注释：清空指标
   * 清空所有性能指标
   */
  clear(): void {
    this.metrics = [];
  }
}

/**
 * 类级注释：基础功能测试套件
 * 
 * 测试基础功能的各个方面
 */
describe('基础功能测试', () => {
  let errorHandler: BasicErrorHandler;
  let securityValidator: BasicSecurityValidator;
  let performanceMonitor: BasicPerformanceMonitor;

  /**
   * 函数级注释：每个测试前的设置
   * 在每个测试前初始化组件
   */
  beforeEach(() => {
    errorHandler = new BasicErrorHandler();
    securityValidator = new BasicSecurityValidator();
    performanceMonitor = new BasicPerformanceMonitor();
  });

  /**
   * 函数级注释：每个测试后的清理
   * 在每个测试后清理资源
   */
  afterEach(() => {
    errorHandler.clear();
    performanceMonitor.clear();
  });

  /**
   * 测试组：错误处理测试
   */
  describe('错误处理测试', () => {
    /**
     * 函数级注释：测试基本错误处理
     * 验证基本的错误处理功能
     */
    it('应该能够处理基本错误', () => {
      const testError: TestError = {
        message: '测试错误',
        code: 'TEST_ERROR',
        severity: 'medium'
      };

      errorHandler.handleError(testError);

      const errors = errorHandler.getErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0]).toEqual(testError);
    });

    /**
     * 函数级注释：测试错误处理器回调
     * 验证错误处理器回调功能
     */
    it('应该能够调用错误处理器回调', () => {
      const mockHandler = vi.fn();
      errorHandler.addHandler(mockHandler);

      const testError: TestError = {
        message: '回调测试错误',
        severity: 'high'
      };

      errorHandler.handleError(testError);

      expect(mockHandler).toHaveBeenCalledWith(testError);
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    /**
     * 函数级注释：测试多个错误处理
     * 验证处理多个错误的功能
     */
    it('应该能够处理多个错误', () => {
      const errors: TestError[] = [
        { message: '错误1', severity: 'low' },
        { message: '错误2', severity: 'medium' },
        { message: '错误3', severity: 'high' }
      ];

      errors.forEach(error => errorHandler.handleError(error));

      const handledErrors = errorHandler.getErrors();
      expect(handledErrors).toHaveLength(3);
      expect(handledErrors).toEqual(errors);
    });
  });

  /**
   * 测试组：安全验证测试
   */
  describe('安全验证测试', () => {
    /**
     * 函数级注释：测试正常输入验证
     * 验证正常输入通过验证
     */
    it('应该允许正常输入', () => {
      const normalInputs = [
        'Hello World',
        '用户名123',
        'test@example.com',
        '这是一段正常的文本内容'
      ];

      normalInputs.forEach(input => {
        const result = securityValidator.validateInput(input);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    /**
     * 函数级注释：测试XSS检测
     * 验证XSS攻击检测功能
     */
    it('应该检测XSS攻击', () => {
      const xssInputs = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">'
      ];

      xssInputs.forEach(input => {
        const result = securityValidator.validateInput(input);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(error => error.includes('XSS'))).toBe(true);
      });
    });

    /**
     * 函数级注释：测试SQL注入检测
     * 验证SQL注入攻击检测功能
     */
    it('应该检测SQL注入攻击', () => {
      const sqlInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "UNION SELECT * FROM users"
      ];

      sqlInputs.forEach(input => {
        const result = securityValidator.validateInput(input);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(error => error.includes('SQL注入'))).toBe(true);
      });
    });
  });

  /**
   * 测试组：性能监控测试
   */
  describe('性能监控测试', () => {
    /**
     * 函数级注释：测试执行时间测量
     * 验证执行时间测量功能
     */
    it('应该能够测量执行时间', async () => {
      const testFunction = () => {
        // 模拟一些工作
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      };

      const { result, duration } = await performanceMonitor.measureTime('test-function', testFunction);

      expect(result).toBe(499500); // 0+1+2+...+999的和
      expect(duration).toBeGreaterThan(0);
      expect(duration).toBeLessThan(100); // 应该很快完成

      const metrics = performanceMonitor.getMetrics();
      expect(metrics).toHaveLength(1);
      expect(metrics[0].name).toBe('test-function');
      expect(metrics[0].duration).toBe(duration);
    });

    /**
     * 函数级注释：测试异步函数时间测量
     * 验证异步函数执行时间测量
     */
    it('应该能够测量异步函数执行时间', async () => {
      const asyncFunction = async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'async result';
      };

      const { result, duration } = await performanceMonitor.measureTime('async-function', asyncFunction);

      expect(result).toBe('async result');
      expect(duration).toBeGreaterThanOrEqual(45); // 至少50ms，允许一些误差
      expect(duration).toBeLessThan(100); // 不应该太长
    });

    /**
     * 函数级注释：测试平均时间计算
     * 验证平均执行时间计算功能
     */
    it('应该能够计算平均执行时间', async () => {
      const testFunction = () => Math.random() * 100;

      // 执行多次测量
      for (let i = 0; i < 5; i++) {
        await performanceMonitor.measureTime('repeated-function', testFunction);
      }

      const averageTime = performanceMonitor.getAverageTime('repeated-function');
      const metrics = performanceMonitor.getMetrics();

      expect(metrics).toHaveLength(5);
      expect(averageTime).toBeGreaterThan(0);

      // 验证平均时间计算正确
      const totalTime = metrics.reduce((sum, m) => sum + m.duration, 0);
      const expectedAverage = totalTime / metrics.length;
      expect(averageTime).toBe(expectedAverage);
    });

    /**
     * 函数级注释：测试性能监控不影响结果
     * 验证性能监控不会影响函数执行结果
     */
    it('性能监控不应该影响函数执行结果', async () => {
      const complexFunction = (n: number) => {
        if (n <= 1) {return n;}
        return complexFunction(n - 1) + complexFunction(n - 2);
      };

      const directResult = complexFunction(10);
      const { result: monitoredResult } = await performanceMonitor.measureTime('fibonacci', () => complexFunction(10));

      expect(monitoredResult).toBe(directResult);
    });
  });

  /**
   * 测试组：集成测试
   */
  describe('集成测试', () => {
    /**
     * 函数级注释：测试错误处理与安全验证集成
     * 验证错误处理和安全验证的集成功能
     */
    it('应该能够集成错误处理和安全验证', () => {
      const securityErrorHandler = vi.fn();
      errorHandler.addHandler(securityErrorHandler);

      const maliciousInput = '<script>alert("XSS")</script>';
      const validationResult = securityValidator.validateInput(maliciousInput);

      if (!validationResult.isValid) {
        const securityError: TestError = {
          message: `安全验证失败: ${validationResult.errors.join(', ')}`,
          code: 'SECURITY_VALIDATION_FAILED',
          severity: 'high'
        };
        errorHandler.handleError(securityError);
      }

      expect(securityErrorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'SECURITY_VALIDATION_FAILED',
          severity: 'high'
        })
      );
    });

    /**
     * 函数级注释：测试性能监控与错误处理集成
     * 验证性能监控和错误处理的集成功能
     */
    it('应该能够集成性能监控和错误处理', async () => {
      const performanceErrorHandler = vi.fn();
      errorHandler.addHandler(performanceErrorHandler);

      const slowFunction = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'slow result';
      };

      const { duration } = await performanceMonitor.measureTime('slow-function', slowFunction);

      // 如果执行时间超过阈值，记录性能警告
      if (duration > 80) {
        const performanceError: TestError = {
          message: `函数执行时间过长: ${duration.toFixed(2)}ms`,
          code: 'PERFORMANCE_WARNING',
          severity: 'medium'
        };
        errorHandler.handleError(performanceError);
      }

      expect(performanceErrorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'PERFORMANCE_WARNING',
          severity: 'medium'
        })
      );
    });

    /**
     * 函数级注释：测试系统整体稳定性
     * 验证系统在综合负载下的稳定性
     */
    it('应该在综合负载下保持稳定', async () => {
      const operations = [];

      // 并发执行多种操作
      for (let i = 0; i < 20; i++) {
        operations.push(
          performanceMonitor.measureTime(`operation-${i}`, async () => {
            // 模拟一些工作
            const input = i % 2 === 0 ? `正常输入${i}` : `<script>alert(${i})</script>`;
            const validationResult = securityValidator.validateInput(input);
            
            if (!validationResult.isValid) {
              errorHandler.handleError({
                message: `验证失败: ${input}`,
                code: 'VALIDATION_FAILED',
                severity: 'low'
              });
            }

            await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
            return `result-${i}`;
          })
        );
      }

      const results = await Promise.all(operations);

      // 验证所有操作都完成
      expect(results).toHaveLength(20);
      results.forEach((result, index) => {
        expect(result.result).toBe(`result-${index}`);
        expect(result.duration).toBeGreaterThan(0);
      });

      // 验证错误处理正常工作
      const errors = errorHandler.getErrors();
      expect(errors.length).toBeGreaterThan(0); // 应该有一些验证失败的错误

      // 验证性能监控正常工作
      const metrics = performanceMonitor.getMetrics();
      expect(metrics).toHaveLength(20);
    });
  });
});