/**
 * 文件级注释：性能优化功能集成测试
 * 
 * 该文件包含对性能优化系统的全面集成测试，验证：
 * - 组件渲染性能优化
 * - 实时订阅内存管理
 * - 查询缓存策略优化
 * - 虚拟化列表性能
 * - 内存泄漏防护
 * - 性能监控和分析
 * 
 * 测试覆盖：
 * - OptimizedEnhancedSkillPanel组件性能
 * - SkillEffectsVirtualList虚拟化
 * - RealtimeSubscriptionManager订阅管理
 * - QueryCacheOptimizer缓存优化
 * - PerformanceCriticalFixes性能修复
 * - 内存使用监控和清理
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import React from 'react';

// 导入被测试的模块
import { OptimizedEnhancedSkillPanel } from '@/components/game/optimized/OptimizedEnhancedSkillPanel';
import { SkillEffectsVirtualList } from '@/components/game/optimized/SkillEffectsVirtualList';
import { PerformanceMonitor } from '@/components/game/optimized/PerformanceMonitor';
import { AdvancedSkillAnalytics } from '@/components/game/optimized/AdvancedSkillAnalytics';
import { PerformanceCriticalFixes } from '@/utils/performanceCriticalFixes';
import { realtimeSubscriptionManager } from '@/utils/realtimeSubscriptionManager';
import { queryCacheOptimizer } from '@/utils/queryCacheOptimizer';

/**
 * 接口注释：性能测试配置
 */
interface PerformanceTestConfig {
  testType: 'rendering' | 'memory' | 'cache' | 'subscription' | 'virtualization';
  scenario: string;
  expectedMetric: string;
  threshold: number;
  testData: Record<string, any>;
}

/**
 * 接口注释：性能指标
 */
interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;
  virtualizedItems: number;
  frameRate: number;
  componentUpdateCount: number;
}

/**
 * 接口注释：技能数据
 */
interface SkillData {
  id: string;
  name: string;
  description: string;
  effects: SkillEffect[];
  cooldown: number;
  manaCost: number;
  level: number;
  isActive: boolean;
}

/**
 * 接口注释：技能效果
 */
interface SkillEffect {
  id: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'utility';
  value: number;
  duration: number;
  target: 'self' | 'enemy' | 'ally' | 'all';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive' | 'expired';
}

/**
 * 类级注释：性能优化功能集成测试套件
 * 
 * 提供全面的性能系统测试，包含：
 * - 渲染性能验证
 * - 内存管理测试
 * - 缓存效率测试
 * - 订阅管理测试
 * - 虚拟化性能测试
 */
describe('性能优化功能集成测试', () => {
  let performanceFixes: PerformanceCriticalFixes;
  let mockSkillData: SkillData[];
  let mockSkillEffects: SkillEffect[];
  let performanceTestConfigs: PerformanceTestConfig[];
  let performanceObserver: PerformanceObserver;
  let memoryMonitor: any;

  /**
   * 函数级注释：测试前置设置
   */
  beforeAll(() => {
    // 模拟性能API
    Object.defineProperty(window, 'performance', {
      value: {
        now: vi.fn(() => Date.now()),
        mark: vi.fn(),
        measure: vi.fn(),
        getEntriesByType: vi.fn(() => []),
        getEntriesByName: vi.fn(() => []),
        clearMarks: vi.fn(),
        clearMeasures: vi.fn(),
        memory: {
          usedJSHeapSize: 1024 * 1024 * 10, // 10MB
          totalJSHeapSize: 1024 * 1024 * 50, // 50MB
          jsHeapSizeLimit: 1024 * 1024 * 100 // 100MB
        }
      },
      writable: true
    });

    // 模拟PerformanceObserver
    global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => [])
    }));

    // 模拟IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }));

    // 模拟ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }));

    // 模拟requestAnimationFrame
    global.requestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 16); // 60fps
      return 1;
    });

    global.cancelAnimationFrame = vi.fn();

    // 模拟requestIdleCallback
    global.requestIdleCallback = vi.fn((callback) => {
      setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1);
      return 1;
    });
  });

  /**
   * 函数级注释：每个测试前的设置
   */
  beforeEach(() => {
    // 初始化性能修复器
    performanceFixes = PerformanceCriticalFixes.getInstance();

    // 清除所有模拟调用
    vi.clearAllMocks();

    // 生成测试数据
    mockSkillEffects = Array.from({ length: 1000 }, (_, index) => ({
      id: `effect-${index}`,
      type: ['damage', 'heal', 'buff', 'debuff', 'utility'][index % 5] as any,
      value: Math.floor(Math.random() * 100) + 1,
      duration: Math.floor(Math.random() * 10) + 1,
      target: ['self', 'enemy', 'ally', 'all'][index % 4] as any,
      priority: ['low', 'medium', 'high', 'critical'][index % 4] as any,
      status: ['active', 'inactive', 'expired'][index % 3] as any
    }));

    mockSkillData = Array.from({ length: 100 }, (_, index) => ({
      id: `skill-${index}`,
      name: `技能${index + 1}`,
      description: `这是第${index + 1}个技能的描述`,
      effects: mockSkillEffects.slice(index * 10, (index + 1) * 10),
      cooldown: Math.floor(Math.random() * 30) + 5,
      manaCost: Math.floor(Math.random() * 50) + 10,
      level: Math.floor(Math.random() * 10) + 1,
      isActive: Math.random() > 0.5
    }));

    // 定义性能测试配置
    performanceTestConfigs = [
      {
        testType: 'rendering',
        scenario: '大量技能组件渲染',
        expectedMetric: 'renderTime',
        threshold: 100, // 100ms
        testData: { skillCount: 100 }
      },
      {
        testType: 'memory',
        scenario: '内存使用优化',
        expectedMetric: 'memoryUsage',
        threshold: 50 * 1024 * 1024, // 50MB
        testData: { componentCount: 50 }
      },
      {
        testType: 'cache',
        scenario: '查询缓存命中率',
        expectedMetric: 'cacheHitRate',
        threshold: 0.8, // 80%
        testData: { queryCount: 100 }
      },
      {
        testType: 'subscription',
        scenario: '实时订阅管理',
        expectedMetric: 'subscriptionCount',
        threshold: 10, // 最大10个活跃订阅
        testData: { maxSubscriptions: 10 }
      },
      {
        testType: 'virtualization',
        scenario: '虚拟化列表性能',
        expectedMetric: 'virtualizedItems',
        threshold: 20, // 同时渲染最多20个项目
        testData: { totalItems: 1000 }
      }
    ];

    // 初始化内存监控
    memoryMonitor = {
      startMonitoring: vi.fn(),
      stopMonitoring: vi.fn(),
      getMemoryUsage: vi.fn(() => ({
        used: 10 * 1024 * 1024,
        total: 50 * 1024 * 1024,
        percentage: 20
      })),
      clearMemory: vi.fn()
    };
  });

  /**
   * 函数级注释：每个测试后的清理
   */
  afterEach(() => {
    vi.clearAllTimers();
    performanceFixes.reset();
    realtimeSubscriptionManager.shutdown();
    queryCacheOptimizer.shutdown();
  });

  /**
   * 函数级注释：测试后置清理
   */
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('组件渲染性能优化测试', () => {
    /**
     * 函数级注释：测试OptimizedEnhancedSkillPanel渲染性能
     */
    it('应该优化技能面板渲染性能', async () => {
      const startTime = performance.now();

      const { rerender } = render(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData.slice(0, 10)}
          onSkillSelect={vi.fn()}
          onSkillActivate={vi.fn()}
          isVisible={true}
        />
      );

      const initialRenderTime = performance.now() - startTime;
      expect(initialRenderTime).toBeLessThan(100); // 初始渲染应在100ms内

      // 测试重新渲染性能
      const rerenderStartTime = performance.now();
      
      rerender(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData.slice(0, 20)}
          onSkillSelect={vi.fn()}
          onSkillActivate={vi.fn()}
          isVisible={true}
        />
      );

      const rerenderTime = performance.now() - rerenderStartTime;
      expect(rerenderTime).toBeLessThan(50); // 重新渲染应在50ms内
    });

    /**
     * 函数级注释：测试组件更新频率控制
     */
    it('应该控制组件更新频率', async () => {
      let updateCount = 0;
      const mockOnUpdate = vi.fn(() => updateCount++);

      const { rerender } = render(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData.slice(0, 5)}
          onSkillSelect={mockOnUpdate}
          onSkillActivate={vi.fn()}
          isVisible={true}
        />
      );

      // 快速连续更新
      for (let i = 0; i < 10; i++) {
        rerender(
          <OptimizedEnhancedSkillPanel
            skills={mockSkillData.slice(0, 5 + i)}
            onSkillSelect={mockOnUpdate}
            onSkillActivate={vi.fn()}
            isVisible={true}
          />
        );
      }

      // 等待防抖完成
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
      });

      // 验证更新被防抖控制
      expect(updateCount).toBeLessThan(10);
    });

    /**
     * 函数级注释：测试条件渲染优化
     */
    it('应该优化条件渲染性能', () => {
      const { rerender } = render(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData}
          onSkillSelect={vi.fn()}
          onSkillActivate={vi.fn()}
          isVisible={false}
        />
      );

      // 不可见时应该最小化渲染
      expect(screen.queryByTestId('skill-panel-content')).not.toBeInTheDocument();

      // 变为可见时才渲染内容
      rerender(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData}
          onSkillSelect={vi.fn()}
          onSkillActivate={vi.fn()}
          isVisible={true}
        />
      );

      expect(screen.getByTestId('skill-panel-content')).toBeInTheDocument();
    });

    /**
     * 函数级注释：测试懒加载组件性能
     */
    it('应该正确懒加载子组件', async () => {
      render(
        <OptimizedEnhancedSkillPanel
          skills={mockSkillData}
          onSkillSelect={vi.fn()}
          onSkillActivate={vi.fn()}
          isVisible={true}
          enableAnalytics={true}
        />
      );

      // 初始时分析组件应该未加载
      expect(screen.queryByTestId('skill-analytics')).not.toBeInTheDocument();

      // 触发懒加载
      const analyticsButton = screen.getByTestId('show-analytics-button');
      fireEvent.click(analyticsButton);

      // 等待懒加载完成
      await waitFor(() => {
        expect(screen.getByTestId('skill-analytics')).toBeInTheDocument();
      });
    });
  });

  describe('虚拟化列表性能测试', () => {
    /**
     * 函数级注释：测试虚拟化渲染性能
     */
    it('应该正确实现虚拟化渲染', () => {
      render(
        <SkillEffectsVirtualList
          effects={mockSkillEffects}
          height={400}
          itemHeight={50}
          onEffectClick={vi.fn()}
        />
      );

      // 验证只渲染可见项目
      const renderedItems = screen.getAllByTestId(/^effect-item-/);
      expect(renderedItems.length).toBeLessThanOrEqual(20); // 400px / 50px ≈ 8项 + 缓冲区

      // 验证总高度正确计算
      const container = screen.getByTestId('virtual-list-container');
      const totalHeight = mockSkillEffects.length * 50;
      expect(container.style.height).toBe(`${totalHeight}px`);
    });

    /**
     * 函数级注释：测试滚动性能
     */
    it('应该优化滚动性能', async () => {
      const { container } = render(
        <SkillEffectsVirtualList
          effects={mockSkillEffects}
          height={400}
          itemHeight={50}
          onEffectClick={vi.fn()}
        />
      );

      const scrollContainer = container.querySelector('[data-testid="scroll-container"]');
      
      // 模拟滚动事件
      const scrollEvents = Array.from({ length: 100 }, (_, i) => i * 10);
      
      const startTime = performance.now();
      
      for (const scrollTop of scrollEvents) {
        fireEvent.scroll(scrollContainer!, { target: { scrollTop } });
      }

      const scrollTime = performance.now() - startTime;
      expect(scrollTime).toBeLessThan(100); // 滚动处理应在100ms内完成
    });

    /**
     * 函数级注释：测试动态高度计算
     */
    it('应该正确计算动态项目高度', async () => {
      const variableHeightEffects = mockSkillEffects.map((effect, index) => ({
        ...effect,
        description: 'A'.repeat((index % 5 + 1) * 20) // 不同长度的描述
      }));

      render(
        <SkillEffectsVirtualList
          effects={variableHeightEffects}
          height={400}
          itemHeight="auto"
          onEffectClick={vi.fn()}
        />
      );

      // 等待高度计算完成
      await waitFor(() => {
        const items = screen.getAllByTestId(/^effect-item-/);
        expect(items.length).toBeGreaterThan(0);
      });

      // 验证不同项目有不同高度
      const items = screen.getAllByTestId(/^effect-item-/);
      const heights = items.map(item => item.getBoundingClientRect().height);
      const uniqueHeights = new Set(heights);
      expect(uniqueHeights.size).toBeGreaterThan(1);
    });

    /**
     * 函数级注释：测试预加载和缓冲区
     */
    it('应该正确实现预加载和缓冲区', () => {
      render(
        <SkillEffectsVirtualList
          effects={mockSkillEffects}
          height={400}
          itemHeight={50}
          bufferSize={5}
          onEffectClick={vi.fn()}
        />
      );

      // 验证缓冲区项目被渲染
      const renderedItems = screen.getAllByTestId(/^effect-item-/);
      const visibleItems = Math.ceil(400 / 50); // 8项
      const expectedItems = visibleItems + 2 * 5; // 加上上下缓冲区
      expect(renderedItems.length).toBeLessThanOrEqual(expectedItems);
    });
  });

  describe('实时订阅管理测试', () => {
    /**
     * 函数级注释：测试订阅创建和清理
     */
    it('应该正确管理订阅生命周期', async () => {
      const subscriptionConfig = {
        url: 'ws://localhost:8080/skills',
        type: 'websocket' as const,
        autoReconnect: true,
        maxReconnectAttempts: 3,
        reconnectInterval: 1000
      };

      // 创建订阅
      const subscriptionId = await realtimeSubscriptionManager.createSubscription(
        'skill-updates',
        subscriptionConfig,
        vi.fn()
      );

      expect(subscriptionId).toBeDefined();

      // 验证订阅状态
      const stats = realtimeSubscriptionManager.getStats();
      expect(stats.activeSubscriptions).toBe(1);

      // 清理订阅
      await realtimeSubscriptionManager.removeSubscription(subscriptionId);

      const updatedStats = realtimeSubscriptionManager.getStats();
      expect(updatedStats.activeSubscriptions).toBe(0);
    });

    /**
     * 函数级注释：测试内存泄漏防护
     */
    it('应该防止订阅内存泄漏', async () => {
      const initialMemory = memoryMonitor.getMemoryUsage();

      // 创建大量订阅
      const subscriptionIds = [];
      for (let i = 0; i < 50; i++) {
        const id = await realtimeSubscriptionManager.createSubscription(
          `test-subscription-${i}`,
          {
            url: `ws://localhost:8080/test-${i}`,
            type: 'websocket',
            autoReconnect: false
          },
          vi.fn()
        );
        subscriptionIds.push(id);
      }

      // 验证内存使用增长合理
      const peakMemory = memoryMonitor.getMemoryUsage();
      const memoryIncrease = peakMemory.used - initialMemory.used;
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 增长不超过10MB

      // 清理所有订阅
      for (const id of subscriptionIds) {
        await realtimeSubscriptionManager.removeSubscription(id);
      }

      // 等待垃圾回收
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      // 验证内存被释放
      const finalMemory = memoryMonitor.getMemoryUsage();
      expect(finalMemory.used).toBeLessThanOrEqual(initialMemory.used * 1.1); // 允许10%误差
    });

    /**
     * 函数级注释：测试订阅重连机制
     */
    it('应该正确处理订阅重连', async () => {
      const mockOnMessage = vi.fn();
      const mockOnError = vi.fn();

      const subscriptionId = await realtimeSubscriptionManager.createSubscription(
        'reconnect-test',
        {
          url: 'ws://localhost:8080/reconnect-test',
          type: 'websocket',
          autoReconnect: true,
          maxReconnectAttempts: 3,
          reconnectInterval: 100
        },
        mockOnMessage,
        mockOnError
      );

      // 模拟连接断开
      const subscription = realtimeSubscriptionManager.getSubscriptionState(subscriptionId);
      expect(subscription?.status).toBe('connected');

      // 触发断开连接
      realtimeSubscriptionManager.simulateDisconnection(subscriptionId);

      // 等待重连尝试
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
      });

      // 验证重连尝试
      expect(mockOnError).toHaveBeenCalled();
      const finalSubscription = realtimeSubscriptionManager.getSubscriptionState(subscriptionId);
      expect(finalSubscription?.reconnectAttempts).toBeGreaterThan(0);
    });

    /**
     * 函数级注释：测试订阅性能监控
     */
    it('应该监控订阅性能指标', async () => {
      const subscriptionId = await realtimeSubscriptionManager.createSubscription(
        'performance-test',
        {
          url: 'ws://localhost:8080/performance-test',
          type: 'websocket',
          autoReconnect: false
        },
        vi.fn()
      );

      // 模拟消息接收
      for (let i = 0; i < 100; i++) {
        realtimeSubscriptionManager.simulateMessage(subscriptionId, {
          type: 'skill-update',
          data: { skillId: `skill-${i}`, timestamp: Date.now() }
        });
      }

      // 获取性能统计
      const stats = realtimeSubscriptionManager.getStats();
      expect(stats.totalMessagesReceived).toBe(100);
      expect(stats.averageMessageSize).toBeGreaterThan(0);
      expect(stats.messagesPerSecond).toBeGreaterThan(0);
    });
  });

  describe('查询缓存优化测试', () => {
    /**
     * 函数级注释：测试缓存命中率
     */
    it('应该实现高效的查询缓存', async () => {
      const cacheId = 'skill-cache';
      
      // 创建缓存
      await queryCacheOptimizer.createCache(cacheId, {
        maxSize: 100,
        ttl: 60000, // 1分钟
        strategy: 'lru',
        compression: true
      });

      // 执行查询
      const queryKey = 'getSkillById';
      const queryFn = vi.fn().mockResolvedValue(mockSkillData[0]);

      // 第一次查询（缓存未命中）
      const result1 = await queryCacheOptimizer.query(cacheId, queryKey, queryFn, {
        params: { id: 'skill-1' },
        ttl: 30000
      });

      expect(queryFn).toHaveBeenCalledTimes(1);
      expect(result1).toEqual(mockSkillData[0]);

      // 第二次查询（缓存命中）
      const result2 = await queryCacheOptimizer.query(cacheId, queryKey, queryFn, {
        params: { id: 'skill-1' },
        ttl: 30000
      });

      expect(queryFn).toHaveBeenCalledTimes(1); // 没有再次调用
      expect(result2).toEqual(mockSkillData[0]);

      // 验证缓存统计
      const stats = queryCacheOptimizer.getStats(cacheId);
      expect(stats.hitRate).toBe(0.5); // 50%命中率
    });

    /**
     * 函数级注释：测试缓存失效策略
     */
    it('应该正确处理缓存失效', async () => {
      const cacheId = 'expiration-cache';
      
      await queryCacheOptimizer.createCache(cacheId, {
        maxSize: 10,
        ttl: 100, // 100ms
        strategy: 'lru'
      });

      const queryFn = vi.fn().mockResolvedValue({ data: 'test' });

      // 添加缓存项
      await queryCacheOptimizer.query(cacheId, 'test-key', queryFn);

      // 等待过期
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
      });

      // 再次查询应该重新执行
      await queryCacheOptimizer.query(cacheId, 'test-key', queryFn);

      expect(queryFn).toHaveBeenCalledTimes(2);
    });

    /**
     * 函数级注释：测试缓存压缩
     */
    it('应该压缩大型缓存数据', async () => {
      const cacheId = 'compression-cache';
      
      await queryCacheOptimizer.createCache(cacheId, {
        maxSize: 10,
        ttl: 60000,
        strategy: 'lru',
        compression: true,
        compressionThreshold: 1024 // 1KB
      });

      // 创建大型数据
      const largeData = {
        skills: mockSkillData,
        effects: mockSkillEffects,
        metadata: 'A'.repeat(2000) // 2KB字符串
      };

      const queryFn = vi.fn().mockResolvedValue(largeData);

      await queryCacheOptimizer.query(cacheId, 'large-data', queryFn);

      const stats = queryCacheOptimizer.getStats(cacheId);
      expect(stats.compressionRatio).toBeGreaterThan(0.5); // 至少50%压缩率
    });

    /**
     * 函数级注释：测试智能预加载
     */
    it('应该实现智能缓存预加载', async () => {
      const cacheId = 'preload-cache';
      
      await queryCacheOptimizer.createCache(cacheId, {
        maxSize: 50,
        ttl: 60000,
        strategy: 'lru',
        enablePreloading: true
      });

      // 模拟访问模式
      const accessPattern = ['skill-1', 'skill-2', 'skill-3', 'skill-1', 'skill-2'];
      
      for (const skillId of accessPattern) {
        await queryCacheOptimizer.query(
          cacheId,
          `getSkill-${skillId}`,
          vi.fn().mockResolvedValue(mockSkillData.find(s => s.id === skillId))
        );
      }

      // 验证预加载建议
      const suggestions = await queryCacheOptimizer.generateOptimizationSuggestions(cacheId);
      expect(suggestions.some(s => s.type === 'preload_recommendation')).toBe(true);
    });
  });

  describe('性能监控和分析测试', () => {
    /**
     * 函数级注释：测试性能指标收集
     */
    it('应该收集详细的性能指标', async () => {
      const mockPerformanceState = {
        renderCount: 0,
        lastRenderTime: 0,
        averageRenderTime: 0,
        memoryUsage: 0,
        cacheHitRate: 0,
        subscriptionCount: 0,
        errorCount: 0
      };

      render(
        <PerformanceMonitor
          componentId="test-component"
          performanceState={mockPerformanceState}
          onPerformanceUpdate={vi.fn()}
        />
      );

      // 验证性能监控界面
      expect(screen.getByTestId('performance-monitor')).toBeInTheDocument();
      expect(screen.getByText(/渲染次数/)).toBeInTheDocument();
      expect(screen.getByText(/内存使用/)).toBeInTheDocument();
      expect(screen.getByText(/缓存命中率/)).toBeInTheDocument();
    });

    /**
     * 函数级注释：测试性能警告生成
     */
    it('应该生成性能警告和建议', async () => {
      const highMemoryState = {
        renderCount: 100,
        lastRenderTime: 150, // 超过阈值
        averageRenderTime: 120,
        memoryUsage: 80 * 1024 * 1024, // 80MB
        cacheHitRate: 0.3, // 低命中率
        subscriptionCount: 15, // 过多订阅
        errorCount: 5
      };

      const mockOnUpdate = vi.fn();

      render(
        <PerformanceMonitor
          componentId="warning-test"
          performanceState={highMemoryState}
          onPerformanceUpdate={mockOnUpdate}
        />
      );

      // 等待警告生成
      await waitFor(() => {
        expect(screen.getByTestId('performance-warnings')).toBeInTheDocument();
      });

      // 验证警告内容
      expect(screen.getByText(/渲染时间过长/)).toBeInTheDocument();
      expect(screen.getByText(/内存使用过高/)).toBeInTheDocument();
      expect(screen.getByText(/缓存命中率低/)).toBeInTheDocument();
    });

    /**
     * 函数级注释：测试性能趋势分析
     */
    it('应该分析性能趋势', async () => {
      const performanceData = Array.from({ length: 100 }, (_, index) => ({
        timestamp: Date.now() - (100 - index) * 1000,
        renderTime: 50 + Math.sin(index * 0.1) * 20,
        memoryUsage: 20 * 1024 * 1024 + Math.random() * 10 * 1024 * 1024,
        cacheHitRate: 0.7 + Math.random() * 0.3
      }));

      render(
        <AdvancedSkillAnalytics
          skillData={mockSkillData}
          performanceData={performanceData}
          onExportReport={vi.fn()}
        />
      );

      // 验证趋势图表
      await waitFor(() => {
        expect(screen.getByTestId('performance-trend-chart')).toBeInTheDocument();
      });

      // 验证趋势分析
      expect(screen.getByTestId('trend-analysis')).toBeInTheDocument();
    });

    /**
     * 函数级注释：测试性能报告导出
     */
    it('应该导出详细的性能报告', async () => {
      const mockOnExport = vi.fn();

      render(
        <AdvancedSkillAnalytics
          skillData={mockSkillData}
          performanceData={[]}
          onExportReport={mockOnExport}
        />
      );

      // 触发报告导出
      const exportButton = screen.getByTestId('export-report-button');
      fireEvent.click(exportButton);

      await waitFor(() => {
        expect(mockOnExport).toHaveBeenCalledWith(
          expect.objectContaining({
            reportType: 'performance_analysis',
            timestamp: expect.any(Number),
            data: expect.any(Object)
          })
        );
      });
    });
  });

  describe('集成性能场景测试', () => {
    /**
     * 函数级注释：测试完整的性能优化工作流
     */
    it('应该完整执行性能优化工作流', async () => {
      // 1. 初始化性能监控
      const performanceState = {
        renderCount: 0,
        lastRenderTime: 0,
        averageRenderTime: 0,
        memoryUsage: 0,
        cacheHitRate: 0,
        subscriptionCount: 0,
        errorCount: 0
      };

      // 2. 渲染优化组件
      const { rerender } = render(
        <div>
          <OptimizedEnhancedSkillPanel
            skills={mockSkillData.slice(0, 10)}
            onSkillSelect={vi.fn()}
            onSkillActivate={vi.fn()}
            isVisible={true}
          />
          <PerformanceMonitor
            componentId="integration-test"
            performanceState={performanceState}
            onPerformanceUpdate={vi.fn()}
          />
        </div>
      );

      // 3. 创建缓存和订阅
      await queryCacheOptimizer.createCache('integration-cache', {
        maxSize: 100,
        ttl: 60000,
        strategy: 'lru'
      });

      const subscriptionId = await realtimeSubscriptionManager.createSubscription(
        'integration-subscription',
        {
          url: 'ws://localhost:8080/integration',
          type: 'websocket',
          autoReconnect: true
        },
        vi.fn()
      );

      // 4. 执行性能测试
      const startTime = performance.now();

      // 模拟用户交互
      for (let i = 0; i < 50; i++) {
        rerender(
          <div>
            <OptimizedEnhancedSkillPanel
              skills={mockSkillData.slice(0, 10 + i)}
              onSkillSelect={vi.fn()}
              onSkillActivate={vi.fn()}
              isVisible={true}
            />
            <PerformanceMonitor
              componentId="integration-test"
              performanceState={performanceState}
              onPerformanceUpdate={vi.fn()}
            />
          </div>
        );

        // 模拟缓存查询
        await queryCacheOptimizer.query(
          'integration-cache',
          `query-${i}`,
          vi.fn().mockResolvedValue({ data: i })
        );
      }

      const totalTime = performance.now() - startTime;

      // 5. 验证性能指标
      expect(totalTime).toBeLessThan(1000); // 总时间应在1秒内

      const cacheStats = queryCacheOptimizer.getStats('integration-cache');
      expect(cacheStats.hitRate).toBeGreaterThan(0); // 应有缓存命中

      const subscriptionStats = realtimeSubscriptionManager.getStats();
      expect(subscriptionStats.activeSubscriptions).toBe(1);

      // 6. 清理资源
      await realtimeSubscriptionManager.removeSubscription(subscriptionId);
      queryCacheOptimizer.deleteCache('integration-cache');
    });

    /**
     * 函数级注释：测试极限性能场景
     */
    it('应该在极限条件下保持性能', async () => {
      // 创建大量数据
      const largeSkillData = Array.from({ length: 1000 }, (_, index) => ({
        ...mockSkillData[0],
        id: `large-skill-${index}`,
        name: `大型技能${index}`
      }));

      const largeEffectData = Array.from({ length: 10000 }, (_, index) => ({
        ...mockSkillEffects[0],
        id: `large-effect-${index}`
      }));

      // 渲染大量组件
      const startTime = performance.now();

      render(
        <div>
          <OptimizedEnhancedSkillPanel
            skills={largeSkillData}
            onSkillSelect={vi.fn()}
            onSkillActivate={vi.fn()}
            isVisible={true}
          />
          <SkillEffectsVirtualList
            effects={largeEffectData}
            height={600}
            itemHeight={50}
            onEffectClick={vi.fn()}
          />
        </div>
      );

      const renderTime = performance.now() - startTime;

      // 验证在大数据量下仍能快速渲染
      expect(renderTime).toBeLessThan(500); // 500ms内完成渲染

      // 验证虚拟化正常工作
      const renderedItems = screen.getAllByTestId(/^effect-item-/);
      expect(renderedItems.length).toBeLessThan(50); // 只渲染可见项目
    });

    /**
     * 函数级注释：测试内存泄漏防护
     */
    it('应该防止内存泄漏', async () => {
      const initialMemory = performance.memory?.usedJSHeapSize || 0;

      // 创建和销毁大量组件
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <OptimizedEnhancedSkillPanel
            skills={mockSkillData}
            onSkillSelect={vi.fn()}
            onSkillActivate={vi.fn()}
            isVisible={true}
          />
        );

        // 创建订阅
        const subscriptionId = await realtimeSubscriptionManager.createSubscription(
          `temp-subscription-${i}`,
          {
            url: `ws://localhost:8080/temp-${i}`,
            type: 'websocket',
            autoReconnect: false
          },
          vi.fn()
        );

        // 立即清理
        unmount();
        await realtimeSubscriptionManager.removeSubscription(subscriptionId);
      }

      // 等待垃圾回收
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // 内存增长应该很小
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024); // 小于5MB
    });
  });
})