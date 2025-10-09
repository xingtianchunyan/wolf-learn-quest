/**
 * @fileoverview 性能监控组件 - 实时监控应用性能指标
 * @author SOLO Coding
 * @version 1.0.0
 */
import React,  { useState, useEffect, useRef  } from 'react';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { Badge  } from '@/components/ui/badge';
import { Button  } from '@/components/ui/button';
import { Progress  } from '@/components/ui/progress';
import { Activity  } from
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle  } from 'lucide-react';

/**
 * 性能指标接口
 */
interface PerformanceData  {
  /** 内存使用情况 */
memory:  {
    used: number;
    total: number;
    percentage: number
}
  /** FPS */
  fps: number;
  /** 网络延迟 */
  latency: number;
  /** 渲染时间 */
  renderTime: number;
  /** DOM节点数 */
  domNodes: number;
  /** 事件监听器数量 */
  eventListeners: number;
  /** 时间戳 */
  timestamp: number
}

/**
 * 性能阈值配置
 */
interface PerformanceThresholds  {
  memory: { warning: number; critical: number
}
  fps: { warning: number; critical: number  
};
  latency: { warning: number; critical: number  
};
  renderTime: { warning: number; critical: number  
};
  domNodes: { warning: number; critical: number 
}
}

/**
 * 性能监控组件属性
 */
interface PerformanceMonitorProps  {
  /** 是否显示详细信息 */
  showDetails?: boolean;
  /** 更新间隔（毫秒） */
  updateInterval?: number;
  /** 历史数据点数量 */
  historySize?: number;
  /** 性能阈值 */
  thresholds?: Partial<PerformanceThresholds>;
  /** 是否自动启动 */
  autoStart?: boolean
}

/**
 * 性能监控组件
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ( {
  showDetails = true,
  updateInterval = 1000,
  historySize = 60,
  thresholds = {},
  autoStart = true }) => {
  const [isMonitoring, setIsMonitoring] = useState(autoStart);
  const [currentData, setCurrentData] = useState<PerformanceData | null>(null);
  const [history, setHistory] = useState<PerformanceData[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const fpsHistory = useRef<number[]>([]);

  // 默认阈值
  const defaultThresholds: PerformanceThresholds = {
    memory: { warning: 70, critical: 90 
},
    fps: { warning: 30, critical: 20 
},
    latency: { warning: 100, critical: 200 
},
    renderTime: { warning: 16, critical: 33 
},
    domNodes: { warning: 1000, critical: 2000 
},
    ...thresholds };

  /**
 * 获取内存使用情况
 */
const getMemoryUsage = ():  { used: number;
    total: number;
    percentage: number
} => {
    if ('memory' in performance) {
/**
 * memory函数
 * memory函数的功能描述
 *
 * @param performance - performance参数
 * @returns void
 */
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize;
      const total = memory.totalJSHeapSize;
/**
 * percentage函数
 * percentage函数的功能描述
 *
 * @param used - used参数
 * @returns void
 */
      const percentage = (used / total) * 100;
      return { used, total, percentage }
}
    return { used: 0, total: 0, percentage: 0 
}
};

  /**
 * 计算FPS
 */
const calculateFPS = (): number =>  {
    const now = performance.now();
    frameCount.current++;

    if (now - lastFrameTime.current >= 1000) {
      const fps = Math.round(
        (frameCount.current * 1000) / (now - lastFrameTime.current)
      );
      fpsHistory.current.push(fps);

      if (fpsHistory.current.length > 10) {
        fpsHistory.current.shift()
}

      frameCount.current = 0;
      lastFrameTime.current = now;

      return (
        fpsHistory.current.reduce((a, b) => a + b, 0) /
        fpsHistory.current.length
      )
}

    return fpsHistory.current.length > 0
      ? fpsHistory.current[fpsHistory.current.length - 1]
      : 60
};

  /**
 * 测量网络延迟
 */
const measureLatency = async (): Promise<number> =>  {
    try {
      const start = performance.now();
      await fetch('/api/ping', { method: 'HEAD' 
});
      return performance.now() - start
} catch {
      return 0
}
  };

  /**
 * 获取渲染时间
 */
const getRenderTime = (): number =>  {
    const entries = performance.getEntriesByType('measure');
    const renderEntries = entries.filter(entry =>
      entry.name.includes('render')
    );

    if (renderEntries.length > 0) {
      return renderEntries[renderEntries.length - 1].duration
}

    return 0
};

  /**
 * 获取DOM节点数
 */
const getDOMNodeCount = (): number =>  {
  return document.querySelectorAll('*').length

};

  /**
 * 获取事件监听器数量（估算）
 */
const getEventListenerCount = (): number =>  {
    // 这是一个估算值，实际实现可能需要更复杂的逻辑
    const elements = document.querySelectorAll('*');
    let count = 0;

    elements.forEach(element => {
      // 检查常见的事件属性
      const eventAttributes = [
        'onclick',
        'onmouseover',
        'onkeydown',
        'onchange' ];
      eventAttributes.forEach(attr => {
        if (element.hasAttribute(attr)) {
          count++
}
      })
});

    return count
};

  /**
 * 收集性能数据
 */
const collectPerformanceData = async (): Promise<PerformanceData> =>  {
    const memory = getMemoryUsage();
    const fps = calculateFPS();
    const latency = await measureLatency();
    const renderTime = getRenderTime();
    const domNodes = getDOMNodeCount();
    const eventListeners = getEventListenerCount();

    return {
      memory,
      fps,
      latency,
      renderTime,
      domNodes,
      eventListeners,
      timestamp: Date.now() 
}
};

  /**
 * 检查性能警告
 */
const checkAlerts = (data: PerformanceData): string[] =>  {
    const newAlerts: string[] = [];

    if (data.memory.percentage > defaultThresholds.memory.critical) {
      newAlerts.push(`内存使用率过高: ${data.memory.percentage.toFixed(1)
}%`)
} else if (data.memory.percentage > defaultThresholds.memory.warning) {
      newAlerts.push(`内存使用率警告: ${data.memory.percentage.toFixed(1)
}%`)
}

    if (data.fps < defaultThresholds.fps.critical) {
      newAlerts.push(`FPS过低: ${data.fps.toFixed(1)
}`)
} else if (data.fps < defaultThresholds.fps.warning) {
      newAlerts.push(`FPS警告: ${data.fps.toFixed(1)
}`)
}

    if (data.latency > defaultThresholds.latency.critical) {
      newAlerts.push(`网络延迟过高: ${data.latency.toFixed(1)
}ms`)
} else if (data.latency > defaultThresholds.latency.warning) {
      newAlerts.push(`网络延迟警告: ${data.latency.toFixed(1)
}ms`)
}

    if (data.renderTime > defaultThresholds.renderTime.critical) {
      newAlerts.push(`渲染时间过长: ${data.renderTime.toFixed(1)
}ms`)
} else if (data.renderTime > defaultThresholds.renderTime.warning) {
      newAlerts.push(`渲染时间警告: ${data.renderTime.toFixed(1)
}ms`)
}

    if (data.domNodes > defaultThresholds.domNodes.critical) {
      newAlerts.push(`DOM节点过多: ${data.domNodes
}`)
} else if (data.domNodes > defaultThresholds.domNodes.warning) {
      newAlerts.push(`DOM节点警告: ${data.domNodes
}`)
}

    return newAlerts
};

  /**
 * 获取性能状态
 */
const getPerformanceStatus = (
    value: number,
    thresholds: { warning: number; critical: number 
},
    reverse = false
  ): 'good' | 'warning' | 'critical' => {
    if (reverse) {
      if (value < thresholds.critical) {
        return 'critical'
}
      if (value < thresholds.warning) {
        return 'warning'
}
      return 'good'
} else {
      if (value > thresholds.critical) {
        return 'critical'
}
      if (value > thresholds.warning) {
        return 'warning'
}
      return 'good'
}
  };

  /**
 * 获取状态颜色
 */
const getStatusColor = (status: 'good' | 'warning' | 'critical'): string =>  {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default: return 'text-gray-600'
}
  };

  /**
 * 获取趋势图标
 */
const getTrendIcon = (current: number, previous: number) =>  {
    if (current > previous) {
      return <TrendingUp className='h-4 w-4 text-red-500' />
}
    if (current < previous) {
      return <TrendingDown className='h-4 w-4 text-green-500' />
}
    return <Minus className='h-4 w-4 text-gray-500' />
};

  /**
 * 启动监控
 */
const startMonitoring = () =>  {
    setIsMonitoring(true);

/**
 * updateData函数
 * 更新数据
 * @returns Promise<void>
 */
const updateData = async () =>  {
      const data = await collectPerformanceData();
      setCurrentData(data);

      setHistory(prev => {
  const newHistory = [...prev, data];
        return newHistory.slice(-historySize)
});

      const newAlerts = checkAlerts(data);
      setAlerts(newAlerts)

};

    // FPS 计算循环
/**
 * fpsLoop函数
 * fpsLoop函数的功能描述
 * @returns void
 */
const fpsLoop = () =>  {
      calculateFPS();
      if (isMonitoring) {
        frameRef.current = requestAnimationFrame(fpsLoop)
}
    };

    frameRef.current = requestAnimationFrame(fpsLoop);
    intervalRef.current = setInterval(updateData, updateInterval);
    updateData(); // 立即更新一次
  };

  /**
 * 停止监控
 */
const stopMonitoring = () =>  {
    setIsMonitoring(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null
}

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null
}
  };

  /**
 * 清除历史数据
 */
const clearHistory = () =>  {
  setHistory([]);
    setAlerts([])

};

  // 组件挂载时启动监控
  useEffect(() => {
    if (autoStart) {
      startMonitoring()
}

    return () => {
  stopMonitoring()
}

}, []);

  // 监控状态变化
  useEffect(() => {
    if (isMonitoring) {
      startMonitoring()
} else {
      stopMonitoring()
}
  }, [isMonitoring]);

  if (!currentData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Activity className='h-5 w-5' />
            性能监控
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-4'>
            <Button onClick={() => setIsMonitoring(true)}>开始监控</Button>
          </div>
        </CardContent>
      </Card>
    )
}

  const previousData =
    history.length > 1 ? history[history.length - 2] : currentData;

  return (
    <div className='space-y-4'>
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Activity className='h-5 w-5' />
              性能监控
              {isMonitoring && (
                <Badge variant='outline' className='animate-pulse'>
                  监控中
                </Badge>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? '停止' : '开始'
}
              </Button>
              <Button variant='outline' size='sm' onClick={clearHistory}>
                清除
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 警告面板 */
} {alerts.length > 0 && (
        <Card className='border-yellow-200 bg-yellow-50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-yellow-800'>
              <AlertTriangle className='h-5 w-5' />
              性能警告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-1'>
              {alerts.map((alert, index) => (
                <div key={index} className='text-sm text-yellow-700'>
                  • {alert}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 性能指标卡片 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* 内存使用 */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <HardDrive className='h-4 w-4' />
                内存使用
              </div>
              {getTrendIcon(
                currentData.memory.percentage,
                previousData.memory.percentage
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div
                className={`text-2xl font-bold ${getStatusColor(
                  getPerformanceStatus(
                    currentData.memory.percentage,
                    defaultThresholds.memory
                  )
                )}`}
              >
                {currentData.memory.percentage.toFixed(1)}%
              </div>
              <Progress value={currentData.memory.percentage} className='h-2' />
              <div className='text-xs text-muted-foreground'>
                {(currentData.memory.used / 1024 / 1024).toFixed(1)}MB /{' '}
                {(currentData.memory.total / 1024 / 1024).toFixed(1)}MB
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FPS */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <Activity className='h-4 w-4' />
                FPS
              </div>
              {getTrendIcon(currentData.fps, previousData.fps)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div
                className={`text-2xl font-bold ${getStatusColor(
                  getPerformanceStatus(
                    currentData.fps,
                    defaultThresholds.fps,
                    true
                  )
                )}`}
              >
                {currentData.fps.toFixed(1)}
              </div>
              <Progress value={(currentData.fps / 60) * 100} className='h-2' />
              <div className='text-xs text-muted-foreground'>目标: 60 FPS</div>
            </div>
          </CardContent>
        </Card>

        {/* 网络延迟 */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <Wifi className='h-4 w-4' />
                网络延迟
              </div>
              {getTrendIcon(currentData.latency, previousData.latency)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div
                className={`text-2xl font-bold ${getStatusColor(
                  getPerformanceStatus(
                    currentData.latency,
                    defaultThresholds.latency
                  )
                )}`}
              >
                {currentData.latency.toFixed(0)}ms
              </div>
              <Progress
                value={Math.min((currentData.latency / 200) * 100, 100)}
                className='h-2'
              />
              <div className='text-xs text-muted-foreground'>
                理想: &lt;50ms
              </div>
            </div>
          </CardContent>
        </Card>

        {showDetails && (
          <>
            {/* 渲染时间 */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    渲染时间
                  </div>
                  {getTrendIcon(
                    currentData.renderTime,
                    previousData.renderTime
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div
                    className={`text-2xl font-bold ${getStatusColor(
                      getPerformanceStatus(
                        currentData.renderTime,
                        defaultThresholds.renderTime
                      )
                    )}`}
                  >
                    {currentData.renderTime.toFixed(1)}ms
                  </div>
                  <Progress
                    value={Math.min((currentData.renderTime / 33) * 100, 100)}
                    className='h-2'
                  />
                  <div className='text-xs text-muted-foreground'>
                    目标: &lt;16ms
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DOM节点 */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Cpu className='h-4 w-4' />
                    DOM节点
                  </div>
                  {getTrendIcon(currentData.domNodes, previousData.domNodes)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div
                    className={`text-2xl font-bold ${getStatusColor(
                      getPerformanceStatus(
                        currentData.domNodes,
                        defaultThresholds.domNodes
                      )
                    )}`}
                  >
                    {currentData.domNodes}
                  </div>
                  <Progress
                    value={Math.min((currentData.domNodes / 2000) * 100, 100)}
                    className='h-2'
                  />
                  <div className='text-xs text-muted-foreground'>
                    建议: &lt;1000
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 事件监听器 */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Activity className='h-4 w-4' />
                    事件监听器
                  </div>
                  {getTrendIcon(
                    currentData.eventListeners,
                    previousData.eventListeners
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='text-2xl font-bold'>
                    {currentData.eventListeners}
                  </div>
                  <div className='text-xs text-muted-foreground'>估算值</div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
};
