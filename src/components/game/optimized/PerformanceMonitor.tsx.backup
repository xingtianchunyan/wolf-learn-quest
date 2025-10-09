import { Activity,
import { Alert, AlertDescription  } from '@/components/ui/alert';
import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { createLogger  } from '@/lib/logger';
import { Progress  } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger  } from '@/components/ui/tabs';
import React, { useState,

/**
* 文件级注释：性能监控组件
*
* 该文件实现了一个实时性能监控组件，用于监控和显示：
* - 组件渲染性能指标
* - 内存使用情况
* - 缓存命中率
* - 订阅管理状态
* - 实时性能图表
* - 性能优化建议
*
* 主要功能：
* - 实时性能数据收集和展示
* - 性能趋势分析和预警
* - 自动优化建议
* - 性能瓶颈识别
* - 内存泄漏检测
* - 缓存效率分析
*
* @author SOLO Coding
* @version 2.0.0
 */

  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from 'react';
  MemoryStick,
  Gauge,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Zap,
  Clock,
  Database,
  Wifi,
  Settings,
  BarChart3,
  LineChart,
  PieChart,
} from 'lucide-react';

const logger = createLogger('performance-monitor');

/**
* 接口注释：组件性能状态
 */
export interface ComponentPerformanceState { renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;
  isOptimized: boolean;,
}

/**
* 接口注释：缓存统计信息
 */
export interface CacheStats { size: number;
  hitRate: number;,
}

/**
* 接口注释：性能监控属性
 */
export interface PerformanceMonitorProps { /** 性能状态数据  */
  performanceState: ComponentPerformanceState;
  /** 缓存统计信息  */
  cacheStats: CacheStats;
  /** 优化回调函数  */
  onOptimize?: () => void;
  /** 是否显示详细信息  */
  showDetails?: boolean;
  /** 更新间隔（毫秒）  */
  updateInterval?: number;
  /** 性能阈值配置  */
  thresholds?: {
    renderTime: number;
    memoryUsage: number;
    cacheHitRate: number;,
};,
}

/**
* 接口注释：性能历史数据点
 */
interface PerformanceDataPoint { timestamp: number;
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;,
}

/**
* 接口注释：性能警告
 */
interface PerformanceWarning { id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  timestamp: number;,
}

/**
* 接口注释：性能优化建议
 */
interface OptimizationSuggestion { id: string;
  category: 'rendering' | 'memory' | 'cache' | 'subscription';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  action?: () => void;,
}

/**
* 类级注释：性能监控组件
*
* 实现实时性能监控和分析，包含：
* - 性能指标实时展示
* - 历史数据趋势分析
* - 性能警告和建议
* - 自动优化功能
* - 详细的性能报告
 */
const PerformanceMonitor = memo<PerformanceMonitorProps>(({ performanceState,
  cacheStats,
  onOptimize,
  showDetails = true,
  updateInterval = 1000,
  thresholds = {
    renderTime: 16, // 60fps
    memoryUsage: 50 * 1024 * 1024, // 50MB
    cacheHitRate: 0.8 // 80%,
}
}) => { // 历史数据状态
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceDataPoint[]>([]);
  const [warnings, setWarnings] = useState<PerformanceWarning[]>([]);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 引用
  const historyRef = useRef<PerformanceDataPoint[]>([]);
  const warningsRef = useRef<PerformanceWarning[]>([]);
  const updateTimerRef = useRef<NodeJS.Timeout>();

  /**
  * 函数级注释：添加性能数据点
  * 记录性能数据并维护历史记录
   */
  const addPerformanceDataPoint = useCallback(() => {
    const dataPoint: PerformanceDataPoint = {
      timestamp: Date.now(),
      renderTime: performanceState.averageRenderTime,
      memoryUsage: performanceState.memoryUsage,
      cacheHitRate: performanceState.cacheHitRate,
      subscriptionCount: performanceState.subscriptionCount,
};

    historyRef.current.push(dataPoint);

    // 保留最近100个数据点
    if (historyRef.current.length > 100) { historyRef.current = historyRef.current.slice(-100);,
}

    setPerformanceHistory([...historyRef.current]);,
}, [performanceState]);

  /**
  * 函数级注释：分析性能并生成警告
  * 基于阈值检查性能指标并生成相应警告
   */
  const analyzePerformance = useCallback(() => { const newWarnings: PerformanceWarning[] = [];
    const timestamp = Date.now();

    // 渲染时间检查
    if (performanceState.averageRenderTime > thresholds.renderTime) {
      newWarnings.push({
        id: `render-time-${timestamp }`,
        type: 'warning',
        message: `渲染时间过长: ${ Math.round(performanceState.averageRenderTime) }ms`,
        suggestion: '考虑使用 React.memo 或优化渲染逻辑',
        timestamp,
});,
}

    // 内存使用检查
    if (performanceState.memoryUsage > thresholds.memoryUsage) { newWarnings.push({
        id: `memory-usage-${timestamp }`,
        type: 'error',
        message: `内存使用过高: ${ Math.round(performanceState.memoryUsage / 1024 / 1024) }MB`,
        suggestion: '检查内存泄漏，清理未使用的订阅和缓存',
        timestamp,
});,
}

    // 缓存命中率检查
    if (performanceState.cacheHitRate < thresholds.cacheHitRate) { newWarnings.push({
        id: `cache-hit-rate-${timestamp }`,
        type: 'warning',
        message: `缓存命中率过低: ${ Math.round(performanceState.cacheHitRate * 100) }%`,
        suggestion: '优化缓存策略，增加缓存TTL或预加载',
        timestamp,
});,
}

    // 订阅数量检查
    if (performanceState.subscriptionCount > 20) { newWarnings.push({
        id: `subscription-count-${timestamp }`,
        type: 'warning',
        message: `订阅数量过多: ${ performanceState.subscriptionCount }`,
        suggestion: '检查并清理未使用的订阅',
        timestamp,
});,
}

    // 更新警告列表（保留最近20个）
    warningsRef.current = [...warningsRef.current, ...newWarnings].slice(-20);
    setWarnings([...warningsRef.current]);,
}, [performanceState, thresholds]);

  /**
  * 函数级注释：生成优化建议
  * 基于性能数据生成具体的优化建议
   */
  const generateOptimizationSuggestions = useCallback(() => { const suggestions: OptimizationSuggestion[] = [];

    // 渲染优化建议
    if (performanceState.renderCount > 100 && performanceState.averageRenderTime > 10) {
      suggestions.push({
        id: 'render-optimization',
        category: 'rendering',
        title: '渲染性能优化',
        description: '组件渲染频繁且耗时较长，建议使用 React.memo 和 useCallback 优化',
        impact: 'high',
        effort: 'medium',
        action: onOptimize,
});,
}

    // 内存优化建议
    if (performanceState.memoryUsage > 30 * 1024 * 1024) { suggestions.push({
        id: 'memory-optimization',
        category: 'memory',
        title: '内存使用优化',
        description: '内存使用较高，建议清理未使用的缓存和订阅',
        impact: 'high',
        effort: 'easy',
        action: onOptimize,
});,
}

    // 缓存优化建议
    if (performanceState.cacheHitRate < 0.7) { suggestions.push({
        id: 'cache-optimization',
        category: 'cache',
        title: '缓存策略优化',
        description: '缓存命中率较低，建议调整缓存策略和TTL设置',
        impact: 'medium',
        effort: 'medium',
});,
}

    // 订阅优化建议
    if (performanceState.subscriptionCount > 15) { suggestions.push({
        id: 'subscription-optimization',
        category: 'subscription',
        title: '订阅管理优化',
        description: '订阅数量较多，建议合并相似订阅或使用订阅池',
        impact: 'medium',
        effort: 'hard',
});,
}

    setSuggestions(suggestions);,
}, [performanceState, onOptimize]);

  /**
  * 函数级注释：获取性能等级
  * 基于综合指标计算性能等级
   */
  const getPerformanceGrade = useMemo(() => { let score = 100;

    // 渲染时间评分
    if (performanceState.averageRenderTime > thresholds.renderTime) {
      score -= Math.min(30, (performanceState.averageRenderTime - thresholds.renderTime) * 2);,
}

    // 内存使用评分
    const memoryMB = performanceState.memoryUsage / 1024 / 1024;
    const thresholdMB = thresholds.memoryUsage / 1024 / 1024;
    if (memoryMB > thresholdMB) { score -= Math.min(25, (memoryMB - thresholdMB) * 2);,
}

    // 缓存命中率评分
    if (performanceState.cacheHitRate < thresholds.cacheHitRate) { score -= (thresholds.cacheHitRate - performanceState.cacheHitRate) * 30;,
}

    // 订阅数量评分
    if (performanceState.subscriptionCount > 10) { score -= Math.min(15, (performanceState.subscriptionCount - 10) * 1.5);,
}

    score = Math.max(0, Math.round(score));

    if (score >= 90) return { grade: 'A', color: 'text-green-500', description: '优秀'  };
    if (score >= 80) return { grade: 'B', color: 'text-blue-500', description: '良好'  };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-500', description: '一般'  };
    if (score >= 60) return { grade: 'D', color: 'text-orange-500', description: '较差'  };
    return { grade: 'F', color: 'text-red-500', description: '很差'  };,
}, [performanceState, thresholds]);

  /**
  * 函数级注释：格式化内存大小
   */
  const formatMemorySize = useCallback((bytes: number) => { const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1) }MB`;,
}, []);

  /**
  * 函数级注释：格式化时间
   */
  const formatTime = useCallback((ms: number) => { return `${ms.toFixed(1) }ms`;,
}, []);

  /**
  * 函数级注释：获取趋势图标
   */
  const getTrendIcon = useCallback((current: number, previous: number) => { if (current > previous) {
      return <TrendingUp className='w-4 h-4 text-red-500' />;,
} else if (current < previous) { return <TrendingDown className='w-4 h-4 text-green-500' />;,
}
    return <Activity className='w-4 h-4 text-gray-500' />;,
}, []);

  // 定期更新性能数据
  useEffect(() => { updateTimerRef.current = setInterval(() => {
      addPerformanceDataPoint();
      analyzePerformance();
      generateOptimizationSuggestions();,
}, updateInterval);

    return () => { if (updateTimerRef.current) {
        clearInterval(updateTimerRef.current);,
}
    };,
}, [addPerformanceDataPoint, analyzePerformance, generateOptimizationSuggestions, updateInterval]);

  // 获取历史数据用于趋势分析
  const previousData = performanceHistory[performanceHistory.length - 2];
  const currentData = performanceHistory[performanceHistory.length - 1];

  if (isCollapsed) { return (;
      <Card className='bg-werewolf-card border-werewolf-purple/30'>;
      <CardHeader className='pb-2'>;
      <div className='flex items-center justify-between'>;
      <div className='flex items-center gap-2'>;
      <Activity className='w-4 h-4' />;
      <span className='text-sm font-medium'>性能监控</span>;
      <Badge variant='outline' className={getPerformanceGrade.color }>;
      { getPerformanceGrade.grade }
      </Badge>
      </div>
      <Button
      variant='ghost';
      size='sm';
      onClick={ () => setIsCollapsed(false) }
      >
      展开
      </Button>
      </div>
      </CardHeader>
      </Card>
    );,
}

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader>
    <div className='flex items-center justify-between'>;
    <CardTitle className='flex items-center gap-2'>;
    <Activity className='w-5 h-5' />;
    性能监控
    <Badge variant='outline' className={ getPerformanceGrade.color }>;
    { getPerformanceGrade.grade } - { getPerformanceGrade.description }
    </Badge>
    </CardTitle>
    <div className='flex items-center gap-2'>;
    { onOptimize && (
      <Button
      variant='outline';
      size='sm';
      onClick={onOptimize }
      className='flex items-center gap-1';
      >
      <Zap className='w-4 h-4' />;
      优化
      </Button>
    )}
    <Button
    variant='ghost';
    size='sm';
    onClick={ () => setIsCollapsed(true) }
    >
    收起
    </Button>
    </div>
    </div>
    </CardHeader>
    <CardContent>
    <Tabs value={ activeTab } onValueChange={ setActiveTab }>;
    <TabsList className='grid w-full grid-cols-4'>;
    <TabsTrigger value='overview'>概览</TabsTrigger>;
    <TabsTrigger value='details'>详情</TabsTrigger>;
    <TabsTrigger value='warnings'>警告</TabsTrigger>;
    <TabsTrigger value='suggestions'>建议</TabsTrigger>;
    </TabsList>

    { /*  概览标签页  */ }
    <TabsContent value='overview' className='space-y-4'>;
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>;
    { /*  渲染性能  */ }
    <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-1'>;
    <Gauge className='w-4 h-4' />;
    { previousData && currentData && getTrendIcon(
      currentData.renderTime,
      previousData.renderTime
    ) }
    </div>
    <div className='text-lg font-bold'>;
    { formatTime(performanceState.averageRenderTime) }
    </div>
    <div className='text-xs text-muted-foreground'>平均渲染时间</div>;
    </div>

    { /*  内存使用  */ }
    <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-1'>;
    <MemoryStick className='w-4 h-4' />;
    { previousData && currentData && getTrendIcon(
      currentData.memoryUsage,
      previousData.memoryUsage
    ) }
    </div>
    <div className='text-lg font-bold'>;
    { formatMemorySize(performanceState.memoryUsage) }
    </div>
    <div className='text-xs text-muted-foreground'>内存使用</div>;
    </div>

    { /*  缓存命中率  */ }
    <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-1'>;
    <Database className='w-4 h-4' />;
    { previousData && currentData && getTrendIcon(
      currentData.cacheHitRate,
      previousData.cacheHitRate
    ) }
    </div>
    <div className='text-lg font-bold'>;
    { Math.round(performanceState.cacheHitRate * 100) }%
    </div>
    <div className='text-xs text-muted-foreground'>缓存命中率</div>;
    </div>

    { /*  订阅数量  */ }
    <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-1'>;
    <Wifi className='w-4 h-4' />;
    { previousData && currentData && getTrendIcon(
      currentData.subscriptionCount,
      previousData.subscriptionCount
    ) }
    </div>
    <div className='text-lg font-bold'>;
    { performanceState.subscriptionCount }
    </div>
    <div className='text-xs text-muted-foreground'>活跃订阅</div>;
    </div>
    </div>

    { /*  性能进度条  */ }
    <div className='space-y-3'>;
    <div>
    <div className='flex justify-between text-sm mb-1'>;
    <span>渲染性能</span>
    <span>{ Math.max(0, 100 - (performanceState.averageRenderTime / thresholds.renderTime * 100)) }%</span>
    </div>
    <Progress
    value={ Math.max(0, 100 - (performanceState.averageRenderTime / thresholds.renderTime * 100)) }
    className='h-2';
    />
    </div>

    <div>
    <div className='flex justify-between text-sm mb-1'>;
    <span>内存效率</span>
    <span>{ Math.max(0, 100 - (performanceState.memoryUsage / thresholds.memoryUsage * 100)) }%</span>
    </div>
    <Progress
    value={ Math.max(0, 100 - (performanceState.memoryUsage / thresholds.memoryUsage * 100)) }
    className='h-2';
    />
    </div>

    <div>
    <div className='flex justify-between text-sm mb-1'>;
    <span>缓存效率</span>
    <span>{ Math.round(performanceState.cacheHitRate * 100) }%</span>
    </div>
    <Progress
    value={ performanceState.cacheHitRate * 100 }
    className='h-2';
    />
    </div>
    </div>
    </TabsContent>

    { /*  详情标签页  */ }
    <TabsContent value='details' className='space-y-4'>;
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>;
    <div className='space-y-2'>;
    <h4 className='font-medium flex items-center gap-2'>;
    <BarChart3 className='w-4 h-4' />;
    渲染统计
    </h4>
    <div className='text-sm space-y-1'>;
    <div className='flex justify-between'>;
    <span>总渲染次数:</span>
    <span>{ performanceState.renderCount }</span>
    </div>
    <div className='flex justify-between'>;
    <span>最后渲染时间:</span>
    <span>{ new Date(performanceState.lastRenderTime).toLocaleTimeString() }</span>
    </div>
    <div className='flex justify-between'>;
    <span>平均渲染时间:</span>
    <span>{ formatTime(performanceState.averageRenderTime) }</span>
    </div>
    <div className='flex justify-between'>;
    <span>优化状态:</span>
    <span className={ performanceState.isOptimized ? 'text-green-500' : 'text-yellow-500' }>;
    { performanceState.isOptimized ? '已优化' : '未优化' }
    </span>
    </div>
    </div>
    </div>

    <div className='space-y-2'>;
    <h4 className='font-medium flex items-center gap-2'>;
    <PieChart className='w-4 h-4' />;
    缓存统计
    </h4>
    <div className='text-sm space-y-1'>;
    <div className='flex justify-between'>;
    <span>缓存大小:</span>
    <span>{ cacheStats.size } 项</span>
    </div>
    <div className='flex justify-between'>;
    <span>命中率:</span>
    <span>{ Math.round(cacheStats.hitRate * 100) }%</span>
    </div>
    <div className='flex justify-between'>;
    <span>内存使用:</span>
    <span>{ formatMemorySize(performanceState.memoryUsage) }</span>
    </div>
    <div className='flex justify-between'>;
    <span>订阅数量:</span>
    <span>{ performanceState.subscriptionCount }</span>
    </div>
    </div>
    </div>
    </div>
    </TabsContent>

    { /*  警告标签页  */ }
    <TabsContent value='warnings' className='space-y-3'>;
    { warnings.length === 0 ? (;
      <div className='text-center py-4'>;
      <CheckCircle className='w-8 h-8 text-green-500 mx-auto mb-2' />;
      <p className='text-sm text-muted-foreground'>暂无性能警告</p>;
      </div>
    ) : (
      warnings.slice(-5).map(warning => (;
        <Alert key={warning.id } variant={ warning.type === 'error' ? 'destructive' : 'default' }>;
        <AlertTriangle className='w-4 h-4' />;
        <AlertDescription>
        <div className='space-y-1'>;
        <div className='font-medium'>{ warning.message }</div>;
        <div className='text-sm text-muted-foreground'>;
        建议: { warning.suggestion }
        </div>
        <div className='text-xs text-muted-foreground'>;
        { new Date(warning.timestamp).toLocaleTimeString() }
        </div>
        </div>
        </AlertDescription>
        </Alert>
      ))
    )}
    </TabsContent>

    { /*  建议标签页  */ }
    <TabsContent value='suggestions' className='space-y-3'>;
    { suggestions.length === 0 ? (;
      <div className='text-center py-4'>;
      <CheckCircle className='w-8 h-8 text-green-500 mx-auto mb-2' />;
      <p className='text-sm text-muted-foreground'>暂无优化建议</p>;
      </div>
    ) : (
      suggestions.map(suggestion => (;
        <Card key={suggestion.id } className='p-4'>;
        <div className='flex items-start justify-between'>;
        <div className='flex-1'>;
        <div className='flex items-center gap-2 mb-2'>;
        <h4 className='font-medium'>{ suggestion.title }</h4>;
        <Badge variant='outline' className={ suggestion.impact === 'high' ? 'border-red-500 text-red-500' :;
          suggestion.impact === 'medium' ? 'border-yellow-500 text-yellow-500' :;
          'border-green-500 text-green-500',
}>
        { suggestion.impact === 'high' ? '高影响' :;
        suggestion.impact === 'medium' ? '中影响' : '低影响' }
        </Badge>
        <Badge variant='secondary'>;
        { suggestion.effort === 'easy' ? '容易' :;
        suggestion.effort === 'medium' ? '中等' : '困难' }
        </Badge>
        </div>
        <p className='text-sm text-muted-foreground'>;
        { suggestion.description }
        </p>
        </div>
        { suggestion.action && (
          <Button
          variant='outline';
          size='sm';
          onClick={suggestion.action }
          className='ml-4';
          >
          应用
          </Button>
        )}
        </div>
        </Card>
      ))
    )}
    </TabsContent>
    </Tabs>
    </CardContent>
    </Card>
  );,
});

// 设置 displayName 以便调试
PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;