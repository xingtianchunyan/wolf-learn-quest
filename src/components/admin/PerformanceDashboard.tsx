/**
 * 文件级注释：PerformanceDashboard 组件
 * 
 * 该文件实现了一个提供管理员功能和监控界面，主要功能包括：
 * - 组件渲染和状态管理
 * - 用户交互处理
 * - 数据展示和更新
 * - 响应式设计支持
 * 
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 * @category admin
 * @filepath admin\PerformanceDashboard.tsx
 */

import {
  Activity, Alert, AlertDescription   } from '@/components/ui/alert';
import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle   } from '@/components/ui/card';
import { createLogger   } from '@/lib/logger';
import { performanceMonitoringService   } from '@/services/performanceMonitoringService';
import { Progress   } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger   } from '@/components/ui/tabs';
import { useToast   } from '@/hooks/useToast';
import React, { useState, useEffect, useCallback, useMemo   } from 'react';

/**
* 性能监控仪表板组件
* 提供实时性能指标监控和告警功能
 */

  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  TrendingUp,
  Zap,
  BarChart3,
  Cpu,
  Memory  } from 'lucide-react';

const logger = createLogger('performance-dashboard');

/**
* 性能仪表板属性接口
 */
interface PerformanceDashboardProps  { /** 是否自动刷新数据 */
  autoRefresh?: boolean;
  /** 刷新间隔（毫秒） */
  refreshInterval?: number;
  /** 是否显示详细信息 */
  showDetails?: boolean
}

/**
* 性能指标汇总接口
 */
interface PerformanceSummary  { /** 总体健康状态 */
  overallHealth: 'healthy' | 'warning' | 'critical';
  /** 渲染性能 */
  renderingHealth: 'healthy' | 'warning' | 'critical';
  /** 内存使用情况 */
  memoryHealth: 'healthy' | 'warning' | 'critical';
  /** 网络性能 */
  networkHealth: 'healthy' | 'warning' | 'critical';
  /** 活跃告警数量 */
  activeAlerts: number;
  /** 最近的指标数量 */
  recentMetrics: number
}

/**
 * 性能监控仪表板组件
 */
export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ( { autoRefresh = true,
  refreshInterval = 5000,
  showDetails = true
}) => { // 状态管理
  const [summary, setSummary] = useState<PerformanceSummary>({
    overallHealth: 'healthy',
    renderingHealth: 'healthy',
    memoryHealth: 'healthy',
    networkHealth: 'healthy',
    activeAlerts: 0,
    recentMetrics: 0 
});

  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast  } = useToast();

  /**
 * 获取性能数据
 */
const fetchPerformanceData = useCallback(async (): Promise<void> =>  { setIsLoading(true);
    try {
      // 获取性能报告
      const report = performanceMonitoringService.getPerformanceReport();

      // 获取活跃告警
      const alerts = performanceMonitoringService.getActiveAlerts();

      // 分析健康状况
      const newSummary: PerformanceSummary = {
        overallHealth: 'healthy',
        renderingHealth: analyzeRenderingHealth(report),
        memoryHealth: analyzeMemoryHealth(report),
        networkHealth: analyzeNetworkHealth(report),
        activeAlerts: alerts.length,
        recentMetrics: report.summary.totalMetrics  
};

      // 计算总体健康状况
      const healthLevels = [;
        newSummary.renderingHealth,
        newSummary.memoryHealth,
        newSummary.networkHealth ];

      if (healthLevels.includes('critical') || newSummary.activeAlerts > 5) { newSummary.overallHealth = 'critical'
} else if (healthLevels.includes('warning') || newSummary.activeAlerts > 2) { newSummary.overallHealth = 'warning'
}

      setSummary(newSummary);
      setLastUpdate(new Date());

      logger.debug('Performance data updated', newSummary)
} catch (error: unknown) { const errorMessage = error instanceof Error ? error.message : '未知错误';
      logger.error('Failed to fetch performance data', error);
      toast({
        title: '性能数据获取失败',
        description: errorMessage,
        variant: 'destructive' 
})
} finally { setIsLoading(false)
}
  }, [toast]);

  /**
 * 分析渲染性能健康状况
 */
const analyzeRenderingHealth = useCallback((report: any): 'healthy' | 'warning' | 'critical' =>  {
  const avgRenderTime = report.summary.avgResponseTime;
    if (avgRenderTime > 300) return 'critical';
    if (avgRenderTime > 150) return 'warning';
    return 'healthy'

}, []);

  /**
  * 分析内存健康状况
   */
const analyzeMemoryHealth = useCallback((report: any): 'healthy' | 'warning' | 'critical' =>  {
  // 这里可以添加实际的内存分析逻辑
    const memoryUsage = performance.memory?.usedJSHeapSize || 0;
    const memoryLimit = performance.memory?.jsHeapSizeLimit || Infinity;
    const memoryPercentage = memoryUsage / memoryLimit;

    if (memoryPercentage > 0.8) return 'critical';
    if (memoryPercentage > 0.6) return 'warning';
    return 'healthy'

}, []);

  /**
 * 分析网络健康状况
 */
const analyzeNetworkHealth = useCallback((report: any): 'healthy' | 'warning' | 'critical' =>  {
  const maxResponseTime = report.summary.maxResponseTime;
    if (maxResponseTime > 2000) return 'critical';
    if (maxResponseTime > 1000) return 'warning';
    return 'healthy'

}, []);

  /**
 * 获取健康状态的颜色和图标
 */
const getHealthDisplay = useMemo(() => { return (health: 'healthy' | 'warning' | 'critical') =>  {
      switch (health) {
        case 'healthy':
        return {
    color: 'text-green-600', icon: CheckCircle, badge: 'default' as const   
};
        case 'warning':
        return {
    color: 'text-yellow-600', icon: AlertTriangle, badge: 'secondary' as const   
};
        case 'critical':
        return { color: 'text-red-600', icon: AlertTriangle, badge: 'destructive' as const  
}
}
    }
}, []);

  /**
 * 清理性能数据
 */
const handleClearData = useCallback((): void =>  { performanceMonitoringService.clearMetrics();
    fetchPerformanceData();
    toast({
      title: '数据已清理',
      description: '所有性能指标和告警已清除' 
})
}, [fetchPerformanceData, toast]);

  // 自动刷新效果
  useEffect(() => {
  if (!autoRefresh) return;

    const interval = setInterval(fetchPerformanceData, refreshInterval);
    return () => clearInterval(interval)

}, [autoRefresh, refreshInterval, fetchPerformanceData]);

  // 初始数据加载
  useEffect(() => {
  fetchPerformanceData()

}, [fetchPerformanceData]);

  const overallDisplay = getHealthDisplay(summary.overallHealth);
/**
 * OverallIcon组件
 * OverallIcon组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
  const OverallIcon = overallDisplay.icon;

  return (;
    <div className='space-y-6'>;
    { /*  总体状态卡片  */ }
    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
    <CardTitle className='text-sm font-medium'>系统性能状态</CardTitle>;
    <OverallIcon className={ `h-4 w-4 ${overallDisplay.color }`} />;
    </CardHeader>
    <CardContent>
    <div className='flex items-center justify-between'>;
    <div className='space-y-1'>;
    <Badge variant={ overallDisplay.badge } className='text-xs'>;
    { summary.overallHealth === 'healthy' ? '健康' : unknown;
    summary.overallHealth === 'warning' ? '警告' : '严重' 
}
    </Badge>
    <p className='text-xs text-muted-foreground'>;
    最后更新: { lastUpdate.toLocaleTimeString() 
}
    </p>
    </div>
    <div className='flex space-x-2'>;
    <Button
    variant='outline';
    size='sm';
    onClick={ fetchPerformanceData }
    disabled={ isLoading }
    >
    <RefreshCw className={ `h-4 w-4 ${isLoading ? 'animate-spin' : '' 
}`} />;
    </Button>
    <Button
    variant='outline';
    size='sm';
    onClick={ handleClearData }
    >
    <Settings className='h-4 w-4' />;
    </Button>
    </div>
    </div>
    </CardContent>
    </Card>

    { /*  详细指标  */
} { showDetails && (
      <Tabs defaultValue='overview' className='space-y-4'>;
      <TabsList>
      <TabsTrigger value='overview'>概览</TabsTrigger>;
      <TabsTrigger value='rendering'>渲染</TabsTrigger>;
      <TabsTrigger value='memory'>内存</TabsTrigger>;
      <TabsTrigger value='network'>网络</TabsTrigger>;
      </TabsList>

      <TabsContent value='overview' className='space-y-4'>;
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>;
      <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
      <CardTitle className='text-sm font-medium'>活跃告警</CardTitle>;
      <AlertTriangle className='h-4 w-4 text-muted-foreground' />;
      </CardHeader>
      <CardContent>
      <div className='text-2xl font-bold'>{summary.activeAlerts }</div>;
      <p className='text-xs text-muted-foreground'>;
      需要关注的性能问题
      </p>
      </CardContent>
      </Card>

      <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
      <CardTitle className='text-sm font-medium'>指标数量</CardTitle>;
      <BarChart3 className='h-4 w-4 text-muted-foreground' />;
      </CardHeader>
      <CardContent>
      <div className='text-2xl font-bold'>{ summary.recentMetrics }</div>;
      <p className='text-xs text-muted-foreground'>;
      最近收集的性能指标
      </p>
      </CardContent>
      </Card>

      <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
      <CardTitle className='text-sm font-medium'>渲染性能</CardTitle>;
      <Cpu className='h-4 w-4 text-muted-foreground' />;
      </CardHeader>
      <CardContent>
      <Badge variant={ getHealthDisplay(summary.renderingHealth).badge }>;
      { summary.renderingHealth === 'healthy' ? '正常' : unknown;
      summary.renderingHealth === 'warning' ? '警告' : '严重' 
}
      </Badge>
      <p className='text-xs text-muted-foreground mt-1'>;
      组件渲染和更新性能
      </p>
      </CardContent>
      </Card>

      <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
      <CardTitle className='text-sm font-medium'>内存使用</CardTitle>;
      <Memory className='h-4 w-4 text-muted-foreground' />;
      </CardHeader>
      <CardContent>
      <Badge variant={ getHealthDisplay(summary.memoryHealth).badge }>;
      { summary.memoryHealth === 'healthy' ? '正常' : unknown;
      summary.memoryHealth === 'warning' ? '警告' : '严重' 
}
      </Badge>
      <p className='text-xs text-muted-foreground mt-1'>;
      JavaScript 堆内存状态
      </p>
      </CardContent>
      </Card>
      </div>
      </TabsContent>

      <TabsContent value='rendering'>;
      <Card>
      <CardHeader>
      <CardTitle>渲染性能详情</CardTitle>
      <CardDescription>
      组件渲染时间和频率分析
      </CardDescription>
      </CardHeader>
      <CardContent>
      <div className='space-y-4'>;
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>组件挂载时间</span>;
      <Progress value={ 75 } className='w-[60%]' />;
      </div>
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>组件更新时间</span>;
      <Progress value={ 45 } className='w-[60%]' />;
      </div>
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>技能面板渲染</span>;
      <Progress value={ 60 } className='w-[60%]' />;
      </div>
      </div>
      </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value='memory'>;
      <Card>
      <CardHeader>
      <CardTitle>内存使用详情</CardTitle>
      <CardDescription>
      JavaScript 堆内存和组件内存分析
      </CardDescription>
      </CardHeader>
      <CardContent>
      <div className='space-y-4'>;
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>JS 堆大小</span>;
      <span className='text-sm font-medium'>;
      { Math.round((performance.memory?.usedJSHeapSize || 0) / 1024 / 1024) }MB
      </span>
      </div>
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>堆限制</span>;
      <span className='text-sm font-medium'>;
      { Math.round((performance.memory?.jsHeapSizeLimit || 0) / 1024 / 1024) }MB
      </span>
      </div>
      </div>
      </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value='network'>;
      <Card>
      <CardHeader>
      <CardTitle>网络性能详情</CardTitle>
      <CardDescription>
      API 响应时间和数据库查询性能
      </CardDescription>
      </CardHeader>
      <CardContent>
      <div className='space-y-4'>;
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>API 响应时间</span>;
      <Progress value={ 30 } className='w-[60%]' />;
      </div>
      <div className='flex items-center justify-between'>;
      <span className='text-sm'>数据库查询</span>;
      <Progress value={ 20 } className='w-[60%]' />;
      </div>
      </div>
      </CardContent>
      </Card>
      </TabsContent>
      </Tabs>
    )}

    { /*  告警信息  */
} { summary.activeAlerts > 0 && (
      <Alert>
      <AlertTriangle className='h-4 w-4' />;
      <AlertDescription>
      当前有 {summary.activeAlerts } 个性能告警需要关注。
      建议检查渲染性能和内存使用情况。
      </AlertDescription>
      </Alert>
    )}
    </div>
  )
};

/**
 * PerformanceDashboard组件
 * 性能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default PerformanceDashboard;