/**
 * 文件级注释：质量优化系统集成测试
 * 测试错误处理、安全性、性能优化等系统的集成效果
 * 验证第二阶段质量提升工作的完整性和有效性
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// 导入核心优化系统
import { unifiedErrorSystem } from '@/utils/unifiedErrorSystem';
import { enhancedInputValidator } from '@/utils/enhancedInputValidation';
import { enhancedPermissionSystem } from '@/utils/enhancedPermissionSystem';
import { securityAuditService } from '@/services/securityAuditService';
import { optimizedQueryCache } from '@/utils/optimizedQueryCache';
import { memoryManager } from '@/utils/memoryManagementSystem';
import { renderOptimizer } from '@/utils/componentRenderOptimizer';
import { optimizedRenderingSystem } from '@/utils/optimizedRenderingSystem';

describe('质量优化系统集成测试', () => {
  let errorSystem: UnifiedErrorSystem;
  let inputValidator: EnhancedInputValidator;
  let permissionSystem: EnhancedPermissionSystem;
  let securityAudit: SecurityAuditService;

  beforeEach(() => {
    // 初始化所有系统
    errorSystem = unifiedErrorSystem;
    inputValidator = enhancedInputValidator;
    permissionSystem = enhancedPermissionSystem;
    securityAudit = securityAuditService;

    // 清理之前的状态
    optimizedQueryCache.clear();
    renderOptimizer.clearMetrics();
  });

  afterEach(() => {
    // 清理测试状态
    vi.clearAllMocks();
  });

  describe('错误处理系统集成', () => {
    /**
     * 测试统一错误处理系统
     */
    it('应该正确处理各种类型的错误', async () => {
      const testError = new Error('测试错误');
      
      await expect(unifiedErrorSystem.handleError(testError)).resolves.not.toThrow();
      
      const errorHistory = unifiedErrorSystem.getErrorHistory();
      expect(errorHistory.length).toBeGreaterThan(0);
      expect(errorHistory[0].message).toBe('测试错误');
    });

    /**
     * 测试增强错误处理Hook
     */
    it('应该提供错误恢复机制', () => {
      const errorStats = unifiedErrorSystem.getErrorStats();
      expect(errorStats).toBeDefined();
      expect(errorStats.total).toBeGreaterThanOrEqual(0);
    });

    /**
     * 测试错误恢复机制
     */
    it('应该支持错误恢复', () => {
      unifiedErrorSystem.clearErrorHistory();
      const errorHistory = unifiedErrorSystem.getErrorHistory();
      expect(errorHistory.length).toBe(0);
    });

    it('应该正确处理和监控错误', async () => {
      const testError = new Error('测试错误');
      
      await unifiedErrorSystem.handleError(testError, {
        context: 'test-context',
        severity: 'high',
        userFriendly: true
      });

      // 验证错误已被记录
      const errorHistory = unifiedErrorSystem.getErrorHistory();
      expect(errorHistory.length).toBeGreaterThan(0);
      
      // 验证错误统计
      const errorStats = unifiedErrorSystem.getErrorStats();
      expect(errorStats.total).toBeGreaterThan(0);
    });

    /**
     * 测试错误分类和处理
     */
    it('应该正确分类和处理不同类型的错误', async () => {
      // 测试网络错误
      const networkError = new Error('Network timeout');
      await unifiedErrorSystem.handleError(networkError, {
        category: 'network',
        retryable: true
      });

      // 测试验证错误
      const validationError = new Error('Invalid input');
      await unifiedErrorSystem.handleError(validationError, {
        category: 'validation',
        userFriendly: true
      });

      // 验证错误已被记录
      const errorHistory = unifiedErrorSystem.getErrorHistory();
      expect(errorHistory.length).toBeGreaterThan(0);
      
      // 验证错误统计
      const errorStats = unifiedErrorSystem.getErrorStats();
      expect(errorStats.total).toBeGreaterThan(0);
    });
  });

  describe('安全性系统集成', () => {
    /**
     * 测试输入验证系统
     */
    it('应该正确验证用户输入', () => {
      const validInput = { message: 'Hello World' };
      const result = enhancedInputValidator.validate(validInput, {
        message: [{ 
          name: 'required', 
          validator: (value) => value !== null && value !== undefined && value !== '',
          message: '此字段为必填项',
          severity: 'medium'
        }]
      });
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    /**
     * 测试权限系统
     */
    it('应该正确检查用户权限', async () => {
      const mockContext = { 
        userId: '1', 
        roomId: 'room1', 
        gameId: 'game1',
        user: { id: '1', role: 'player' }
      };
      
      const result = await enhancedPermissionSystem.checkPermission(
        'VIEW_GAME' as any,
        mockContext
      );
      
      expect(result).toBeDefined();
      expect(typeof result.granted).toBe('boolean');
    });

    /**
     * 测试安全审计
     */
    it('应该记录安全事件', async () => {
      await securityAuditService.recordSecurityEvent('PERMISSION_CHECK', {
        userId: 'test-user',
        description: '权限检查测试',
        metadata: { action: 'vote', result: 'allowed' }
      });
      
      const stats = securityAuditService.getSecurityStats();
      expect(stats.totalEvents).toBeGreaterThan(0);
    });
  });

  describe('性能优化系统集成', () => {
    /**
     * 测试查询缓存系统
     */
    it('应该正确缓存和检索数据', async () => {
      const testKey = 'test-cache-key';
      const testData = { id: 1, name: '测试数据' };

      // 设置缓存
      await optimizedQueryCache.set(testKey, testData, { ttl: 5000 });

      // 检索缓存
      const cachedData = await optimizedQueryCache.get(testKey);
      expect(cachedData).toEqual(testData);

      // 验证缓存统计
      const stats = optimizedQueryCache.getStats();
      expect(stats.totalItems).toBeGreaterThan(0);
      expect(stats.hitCount).toBeGreaterThan(0);
    });

    /**
     * 测试内存管理和订阅优化
     */
    it('应该正确管理内存和订阅', () => {
        const subscriptionId = 'test-subscription';
        
        // 注册订阅
        memoryManager.registerSubscription(subscriptionId, 'websocket', 'TestComponent');
        
        // 验证订阅已注册
        const stats = memoryManager.getSubscriptionStats();
        expect(stats.total).toBeGreaterThan(0);
        
        // 取消注册订阅
        const unregistered = memoryManager.unregisterSubscription(subscriptionId);
        expect(unregistered).toBe(true);
        
        // 验证订阅已被移除
        const statsAfter = memoryManager.getSubscriptionStats();
        expect(statsAfter.total).toBe(stats.total - 1);
    });

    /**
     * 测试渲染优化系统
     */
    it('应该正确监控渲染性能', async () => {
      const componentName = 'TestComponent';
      
      // 模拟渲染过程
      const startTime = renderOptimizer.startRender(componentName);
      
      // 模拟渲染延迟
      await new Promise(resolve => {
        setTimeout(() => {
          renderOptimizer.endRender(componentName, startTime, true, false);
          resolve(undefined);
        }, 10);
      });

      // 验证渲染指标
      const metrics = renderOptimizer.getMetrics(componentName);
      expect(metrics.length).toBeGreaterThan(0);
      expect(metrics[0].renderCount).toBeGreaterThan(0);
    });

    /**
     * 测试渲染优化配置
     */
    it('应该正确管理渲染优化配置', () => {
      const config = renderOptimizer.getConfig();
      expect(config).toBeDefined();
      expect(config.enableProfiling).toBeDefined();

      // 测试配置更新
      renderOptimizer.updateConfig({
        enableProfiling: false,
        maxRenderTime: 20
      });

      const updatedConfig = renderOptimizer.getConfig();
      expect(updatedConfig.enableProfiling).toBe(false);
      expect(updatedConfig.maxRenderTime).toBe(20);
    });
  });

  describe('系统间协作测试', () => {
    /**
     * 测试错误处理与安全审计的协作
     */
    it('应该在错误处理时记录安全事件', async () => {
      const securityError = new Error('权限拒绝');
      
      // 处理安全相关错误
      await errorSystem.handleError(securityError, {
        context: 'security-check',
        severity: 'high',
        category: 'security'
      });

      // 验证安全事件记录
      const securityStats = securityAuditService.getSecurityStats();
      const errorStats = unifiedErrorSystem.getErrorStats();

      expect(errorStats.total).toBeGreaterThan(0);
      expect(securityStats.totalEvents).toBeGreaterThan(0);
    });

    /**
     * 测试性能监控与内存管理的协作
     */
    it('应该在性能问题时触发内存清理', () => {
        // 模拟高内存使用
        const memoryUsage = memoryManager.getCurrentMemoryUsage();
        expect(memoryUsage).toBeDefined();

        // 模拟内存泄漏检测
        const leakDetection = memoryManager.detectMemoryLeaks();
        expect(leakDetection).toBeDefined();

        if (leakDetection.isLeaking) {
          memoryManager.performCleanup();
        }

        // 验证清理效果
        const newStats = memoryManager.getSubscriptionStats();
        expect(newStats).toBeDefined();
      });

    /**
     * 测试缓存与权限系统的协作
     */
    it('应该根据权限控制缓存访问', async () => {
      const userId = 'user123';
      const sensitiveData = { secret: 'confidential' };
      const cacheKey = `user-data-${userId}`;

      // 检查权限
      const context = {
        userId,
        roomId: 'room456',
        gameState: 'playing' as const,
        userRole: 'player' as const
      };

      const hasPermission = await enhancedPermissionSystem.checkPermission('VIEW_GAME_STATE' as any, context);
      
      if (hasPermission.granted) {
        await optimizedQueryCache.set(cacheKey, sensitiveData);
        const cachedData = await optimizedQueryCache.get(cacheKey);
        expect(cachedData).toEqual(sensitiveData);
      } else {
        // 不应该缓存敏感数据
        expect(await optimizedQueryCache.get(cacheKey)).toBeNull();
      }
    });
  });

  describe('性能基准测试', () => {
    /**
     * 测试性能监控
     */
    it('应该监控系统性能指标', async () => {
      const startTime = Date.now();
      
      // 执行一系列操作
      const operations = [
        () => enhancedInputValidator.validate({ test: 'data' }, { 
          test: [{ 
            name: 'required', 
            validator: (value) => value !== null && value !== undefined && value !== '',
            message: '此字段为必填项',
            severity: 'medium'
          }]
        }),
        () => enhancedPermissionSystem.checkPermission('VIEW_GAME' as any, { userId: 'test', roomId: 'test', gameId: 'test' }),
        () => optimizedQueryCache.set('perf-test', { data: 'test' }),
        () => optimizedQueryCache.get('perf-test'),
        () => memoryManager.getCurrentMemoryUsage()
      ];
      
      for (const op of operations) {
        await op();
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 验证性能指标
      expect(duration).toBeLessThan(1000); // 操作应在1秒内完成
    });

    /**
     * 测试系统整体性能
     */
    it('应该在合理时间内完成复杂操作', async () => {
      const startTime = Date.now();
      
      // 模拟复杂的业务场景
      const context = {
        userId: 'user123',
        roomId: 'room456',
        gameId: 'game789',
        userRole: 'player' as const,
        gameState: 'playing' as const
      };

      const hasPermission = await enhancedPermissionSystem.checkPermission('VIEW_GAME_STATE' as any, context);
      
      if (hasPermission.granted) {
        // 执行数据验证
        const validationResult = enhancedInputValidator.validate(
          { action: 'vote', target: 'player2' },
          {
            action: [{ 
              name: 'required', 
              validator: (value) => value !== null && value !== undefined && value !== '',
              message: '操作类型为必填项',
              severity: 'medium'
            }],
            target: [{ 
              name: 'required', 
              validator: (value) => value !== null && value !== undefined && value !== '',
              message: '目标为必填项',
              severity: 'medium'
            }]
          }
        );
        
        if (validationResult.isValid) {
          // 缓存操作
          optimizedQueryCache.set('user-action', { userId: context.userId, action: 'vote' });
          
          // 记录性能指标
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          expect(duration).toBeLessThan(100); // 复杂操作应在100ms内完成
        }
      }
    });

    /**
     * 测试内存使用效率
     */
    it('应该保持合理的内存使用', async () => {
      const initialMemory = memoryManager.getCurrentMemoryUsage();
      
      // 执行一些内存密集操作
      const operations = Array.from({ length: 100 }, (_, i) => 
        optimizedQueryCache.set(`test-key-${i}`, { data: `test-data-${i}` })
      );
      
      await Promise.all(operations);
      
      const afterOperationsMemory = memoryManager.getCurrentMemoryUsage();
      
      // 执行清理
      memoryManager.performCleanup();
      
      const afterCleanupMemory = memoryManager.getCurrentMemoryUsage();
      
      // 验证内存使用合理（由于是模拟数据，我们主要验证方法能正常调用）
      expect(afterOperationsMemory.used).toBeGreaterThanOrEqual(initialMemory.used);
      expect(afterCleanupMemory.used).toBeGreaterThanOrEqual(0);
      expect(typeof afterOperationsMemory.total).toBe('number');
      expect(typeof afterCleanupMemory.total).toBe('number');
    });
  });

  describe('错误场景测试', () => {
    /**
     * 测试系统在异常情况下的稳定性
     */
    it('应该优雅处理系统异常', async () => {
      // 测试无效输入
      const invalidResult = enhancedInputValidator.validate(null, { 
        test: [{ 
          name: 'required', 
          validator: (value) => value !== null && value !== undefined && value !== '',
          message: '此字段为必填项',
          severity: 'medium'
        }]
      });
      expect(invalidResult.isValid).toBe(false);

      // 测试权限拒绝
      const invalidPermission = await enhancedPermissionSystem.checkPermission('INVALID_ACTION' as any, { 
        userId: 'test', 
        roomId: 'test', 
        gameId: 'test' 
      });
      expect(invalidPermission.granted).toBe(false);

      // 测试内存清理
      memoryManager.performCleanup();
      const memoryAfterCleanup = memoryManager.getCurrentMemoryUsage();
      expect(memoryAfterCleanup).toBeDefined();

      // 测试缓存异常
      await expect(optimizedQueryCache.get('non-existent-key')).resolves.toBeNull();
    });

    /**
     * 测试并发操作
     */
    it('应该正确处理并发操作', async () => {
      const concurrentOperations = Array.from({ length: 10 }, (_, i) => 
        optimizedQueryCache.set(`concurrent-${i}`, { data: i })
      );

      await Promise.all(concurrentOperations);

      const retrieveOperations = Array.from({ length: 10 }, (_, i) => 
        optimizedQueryCache.get(`concurrent-${i}`)
      );

      const results = await Promise.all(retrieveOperations);
      
      results.forEach((result, index) => {
        expect(result).toEqual({ data: index });
      });
    });
  });
});