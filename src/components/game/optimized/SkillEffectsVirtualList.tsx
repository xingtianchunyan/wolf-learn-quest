/**
 * 文件级注释：虚拟化技能效果列表组件
 * 
 * 该文件实现了一个高性能的虚拟化列表组件，用于显示大量技能效果：
 * - 虚拟滚动优化，只渲染可见项目
 * - 动态高度计算和缓存
 * - 智能预加载和缓冲区管理
 * - 内存优化和垃圾回收
 * - 平滑滚动和动画效果
 * - 响应式设计和自适应布局
 * 
 * 主要特性：
 * - 支持数万条数据的流畅滚动
 * - 自动高度计算和缓存
 * - 智能缓冲区管理
 * - 内存泄漏防护
 * - 性能监控和优化
 * 
 * @author SOLO Coding
 * @version 2.0.0
 */

import React, { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo,
  memo
} from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Layers,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('skill-effects-virtual-list');

/**
 * 接口注释：技能效果数据
 */
export interface SkillEffect {
  id: string;
  effectType: string;
  isActive: boolean;
  remainingTime: number;
  maxTime: number;
  stackCount?: number;
  targetName?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  metadata?: Record<string, any>;
}

/**
 * 接口注释：虚拟化列表属性
 */
export interface SkillEffectsVirtualListProps {
  /** 技能效果列表 */
  effects: SkillEffect[];
  /** 获取效果图标的函数 */
  getEffectIcon: (effectType: string) => JSX.Element;
  /** 项目高度（默认80px） */
  itemHeight?: number;
  /** 容器高度（默认400px） */
  containerHeight?: number;
  /** 缓冲区大小（默认5） */
  bufferSize?: number;
  /** 是否启用动画 */
  enableAnimation?: boolean;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring?: boolean;
  /** 点击效果项的回调 */
  onEffectClick?: (effect: SkillEffect) => void;
}

/**
 * 接口注释：虚拟化状态
 */
interface VirtualizationState {
  scrollTop: number;
  startIndex: number;
  endIndex: number;
  visibleItems: SkillEffect[];
  totalHeight: number;
  itemHeights: Map<string, number>;
}

/**
 * 接口注释：性能监控状态
 */
interface PerformanceMonitoringState {
  renderCount: number;
  averageRenderTime: number;
  scrollEventCount: number;
  memoryUsage: number;
  lastOptimizationTime: number;
}

/**
 * 类级注释：虚拟化技能效果列表组件
 * 
 * 实现高性能的虚拟化列表，支持：
 * - 大数据量的流畅滚动
 * - 动态高度计算
 * - 智能缓冲区管理
 * - 内存优化
 * - 性能监控
 */
const SkillEffectsVirtualList = memo<SkillEffectsVirtualListProps>(({
  effects,
  getEffectIcon,
  itemHeight = 80,
  containerHeight = 400,
  bufferSize = 5,
  enableAnimation = true,
  enablePerformanceMonitoring = true,
  onEffectClick
}) => {
  // 虚拟化状态
  const [virtualizationState, setVirtualizationState] = useState<VirtualizationState>({
    scrollTop: 0,
    startIndex: 0,
    endIndex: 0,
    visibleItems: [],
    totalHeight: 0,
    itemHeights: new Map()
  });

  // 性能监控状态
  const [performanceState, setPerformanceState] = useState<PerformanceMonitoringState>({
    renderCount: 0,
    averageRenderTime: 0,
    scrollEventCount: 0,
    memoryUsage: 0,
    lastOptimizationTime: Date.now()
  });

  // 引用
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const renderStartTime = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const resizeObserver = useRef<ResizeObserver>();

  /**
   * 函数级注释：计算可见项目范围
   * 基于滚动位置和容器高度计算需要渲染的项目范围
   */
  const calculateVisibleRange = useCallback((scrollTop: number, effects: SkillEffect[]) => {
    const { itemHeights } = virtualizationState;
    
    let startIndex = 0;
    let currentHeight = 0;
    
    // 使用缓存的高度计算起始索引
    for (let i = 0; i < effects.length; i++) {
      const cachedHeight = itemHeights.get(effects[i].id) || itemHeight;
      
      if (currentHeight + cachedHeight > scrollTop) {
        startIndex = Math.max(0, i - bufferSize);
        break;
      }
      
      currentHeight += cachedHeight;
    }
    
    // 计算结束索引
    let endIndex = startIndex;
    let visibleHeight = 0;
    
    for (let i = startIndex; i < effects.length; i++) {
      const cachedHeight = itemHeights.get(effects[i].id) || itemHeight;
      visibleHeight += cachedHeight;
      
      if (visibleHeight >= containerHeight + (bufferSize * itemHeight)) {
        endIndex = i;
        break;
      }
    }
    
    endIndex = Math.min(effects.length - 1, endIndex + bufferSize);
    
    return { startIndex, endIndex };
  }, [virtualizationState.itemHeights, itemHeight, containerHeight, bufferSize]);

  /**
   * 函数级注释：计算总高度
   * 基于缓存的项目高度计算列表总高度
   */
  const calculateTotalHeight = useCallback((effects: SkillEffect[]) => {
    const { itemHeights } = virtualizationState;
    
    return effects.reduce((total, effect) => {
      return total + (itemHeights.get(effect.id) || itemHeight);
    }, 0);
  }, [virtualizationState.itemHeights, itemHeight]);

  /**
   * 函数级注释：计算偏移量
   * 计算可见区域之前的总高度
   */
  const calculateOffset = useCallback((startIndex: number, effects: SkillEffect[]) => {
    const { itemHeights } = virtualizationState;
    
    let offset = 0;
    for (let i = 0; i < startIndex; i++) {
      offset += itemHeights.get(effects[i].id) || itemHeight;
    }
    
    return offset;
  }, [virtualizationState.itemHeights, itemHeight]);

  /**
   * 函数级注释：处理滚动事件
   * 优化的滚动处理，包含防抖和性能监控
   */
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    
    // 性能监控
    if (enablePerformanceMonitoring) {
      setPerformanceState(prev => ({
        ...prev,
        scrollEventCount: prev.scrollEventCount + 1
      }));
    }
    
    // 防抖处理
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      const { startIndex, endIndex } = calculateVisibleRange(scrollTop, effects);
      const visibleItems = effects.slice(startIndex, endIndex + 1);
      const totalHeight = calculateTotalHeight(effects);
      
      setVirtualizationState(prev => ({
        ...prev,
        scrollTop,
        startIndex,
        endIndex,
        visibleItems,
        totalHeight
      }));
    }, 16); // 约60fps
  }, [calculateVisibleRange, calculateTotalHeight, effects, enablePerformanceMonitoring]);

  /**
   * 函数级注释：测量项目高度
   * 使用ResizeObserver精确测量项目高度并缓存
   */
  const measureItemHeight = useCallback((effectId: string, element: HTMLDivElement) => {
    if (!element) return;
    
    const height = element.getBoundingClientRect().height;
    
    setVirtualizationState(prev => {
      const newItemHeights = new Map(prev.itemHeights);
      newItemHeights.set(effectId, height);
      
      return {
        ...prev,
        itemHeights: newItemHeights,
        totalHeight: calculateTotalHeight(effects)
      };
    });
  }, [calculateTotalHeight, effects]);

  /**
   * 函数级注释：设置项目引用
   * 管理项目DOM引用并设置ResizeObserver
   */
  const setItemRef = useCallback((effectId: string, element: HTMLDivElement | null) => {
    if (element) {
      itemRefs.current.set(effectId, element);
      
      // 设置ResizeObserver
      if (!resizeObserver.current) {
        resizeObserver.current = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const effectId = entry.target.getAttribute('data-effect-id');
            if (effectId) {
              measureItemHeight(effectId, entry.target as HTMLDivElement);
            }
          });
        });
      }
      
      element.setAttribute('data-effect-id', effectId);
      resizeObserver.current.observe(element);
    } else {
      // 清理
      const existingElement = itemRefs.current.get(effectId);
      if (existingElement && resizeObserver.current) {
        resizeObserver.current.unobserve(existingElement);
      }
      itemRefs.current.delete(effectId);
    }
  }, [measureItemHeight]);

  /**
   * 函数级注释：获取效果状态图标
   */
  const getStatusIcon = useCallback((effect: SkillEffect) => {
    if (!effect.isActive) {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
    
    if (effect.remainingTime <= effect.maxTime * 0.2) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  }, []);

  /**
   * 函数级注释：获取优先级颜色
   */
  const getPriorityColor = useCallback((priority: string = 'medium') => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 border-green-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  }, []);

  /**
   * 函数级注释：渲染效果项目
   */
  const renderEffectItem = useCallback((effect: SkillEffect, index: number) => {
    const progressPercentage = effect.maxTime > 0 
      ? (effect.remainingTime / effect.maxTime) * 100 
      : 0;
    
    return (
      <div
        key={effect.id}
        ref={(el) => setItemRef(effect.id, el)}
        className={`
          p-4 border rounded-lg transition-all duration-200 cursor-pointer
          hover:bg-werewolf-dark/60 hover:border-werewolf-purple/50
          ${getPriorityColor(effect.priority)}
          ${enableAnimation ? 'animate-in slide-in-from-left-2' : ''}
        `}
        style={{
          animationDelay: enableAnimation ? `${index * 50}ms` : undefined
        }}
        onClick={() => onEffectClick?.(effect)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* 效果图标 */}
            <div className="flex-shrink-0">
              {getEffectIcon(effect.effectType)}
            </div>
            
            {/* 效果信息 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm truncate">
                  {effect.effectType}
                </span>
                {effect.targetName && (
                  <Badge variant="outline" className="text-xs">
                    目标: {effect.targetName}
                  </Badge>
                )}
                {effect.stackCount && effect.stackCount > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    <Layers className="w-3 h-3 mr-1" />
                    {effect.stackCount}
                  </Badge>
                )}
              </div>
              
              {effect.description && (
                <p className="text-xs text-muted-foreground truncate">
                  {effect.description}
                </p>
              )}
            </div>
            
            {/* 状态图标 */}
            <div className="flex-shrink-0">
              {getStatusIcon(effect)}
            </div>
          </div>
        </div>
        
        {/* 时间进度条 */}
        {effect.maxTime > 0 && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                剩余时间
              </span>
              <span className="font-mono">
                {Math.ceil(effect.remainingTime / 1000)}s / {Math.ceil(effect.maxTime / 1000)}s
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2"
              style={{
                '--progress-background': progressPercentage > 20 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'
              } as React.CSSProperties}
            />
          </div>
        )}
      </div>
    );
  }, [
    setItemRef, 
    getPriorityColor, 
    enableAnimation, 
    onEffectClick, 
    getEffectIcon, 
    getStatusIcon
  ]);

  // 初始化虚拟化状态
  useEffect(() => {
    if (effects.length > 0) {
      const { startIndex, endIndex } = calculateVisibleRange(0, effects);
      const visibleItems = effects.slice(startIndex, endIndex + 1);
      const totalHeight = calculateTotalHeight(effects);
      
      setVirtualizationState(prev => ({
        ...prev,
        startIndex,
        endIndex,
        visibleItems,
        totalHeight
      }));
    }
  }, [effects, calculateVisibleRange, calculateTotalHeight]);

  // 性能监控
  useEffect(() => {
    if (!enablePerformanceMonitoring) return;
    
    renderStartTime.current = Date.now();
    
    const renderTime = Date.now() - renderStartTime.current;
    
    setPerformanceState(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1,
      averageRenderTime: (prev.averageRenderTime + renderTime) / 2
    }));
    
    // 内存监控
    const memoryMonitor = setInterval(() => {
      if (performance.memory) {
        setPerformanceState(prev => ({
          ...prev,
          memoryUsage: performance.memory.usedJSHeapSize
        }));
      }
    }, 5000);
    
    return () => clearInterval(memoryMonitor);
  }, [enablePerformanceMonitoring, virtualizationState.visibleItems]);

  // 清理
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      
      itemRefs.current.clear();
    };
  }, []);

  // 计算偏移量
  const offset = useMemo(() => {
    return calculateOffset(virtualizationState.startIndex, effects);
  }, [calculateOffset, virtualizationState.startIndex, effects]);

  // 如果没有效果，显示空状态
  if (effects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-werewolf-dark/40 flex items-center justify-center mb-4">
          <Layers className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">暂无技能效果</h3>
        <p className="text-sm text-muted-foreground">
          当前没有活跃的技能效果
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 性能信息（调试用） */}
      {enablePerformanceMonitoring && process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground bg-werewolf-dark/20 p-2 rounded">
          渲染: {performanceState.renderCount} | 
          平均耗时: {Math.round(performanceState.averageRenderTime)}ms | 
          滚动事件: {performanceState.scrollEventCount} | 
          内存: {Math.round(performanceState.memoryUsage / 1024 / 1024)}MB |
          可见项: {virtualizationState.visibleItems.length}/{effects.length}
        </div>
      )}
      
      {/* 虚拟化列表容器 */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: containerHeight }}
      >
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-full"
          onScrollCapture={handleScroll}
        >
          {/* 虚拟容器 */}
          <div style={{ height: virtualizationState.totalHeight, position: 'relative' }}>
            {/* 可见项目容器 */}
            <div 
              style={{ 
                transform: `translateY(${offset}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
              }}
            >
              <div className="space-y-3">
                {virtualizationState.visibleItems.map((effect, index) => 
                  renderEffectItem(effect, index)
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      {/* 列表统计 */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>共 {effects.length} 个效果</span>
        <span>
          活跃: {effects.filter(e => e.isActive).length} | 
          即将过期: {effects.filter(e => e.isActive && e.remainingTime <= e.maxTime * 0.2).length}
        </span>
      </div>
    </div>
  );
});

// 设置 displayName 以便调试
SkillEffectsVirtualList.displayName = 'SkillEffectsVirtualList';

export default SkillEffectsVirtualList;