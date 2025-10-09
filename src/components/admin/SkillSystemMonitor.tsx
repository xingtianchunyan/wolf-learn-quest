import {
  Activity, Alert, AlertDescription   } from '@/components/ui/alert';
import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle   } from '@/components/ui/card';
import { createLogger   } from '@/lib/logger';
import { Progress   } from '@/components/ui/progress';
import { supabase   } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger   } from '@/components/ui/tabs';
import { useSkillEffectProcessor   } from '@/hooks/useSkillEffectProcessor';
import { useToast   } from '@/hooks/useToast';
import React, { useState, useEffect, useCallback   } from 'react';

/**
* 文件级注释：SkillSystemMonitor 组件
*
* 该文件实现了一个处理游戏逻辑和状态管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category game
* @filepath admin\SkillSystemMonitor.tsx
 */

// 技能系统性能监控面板
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  TrendingUp,
  Zap  } from 'lucide-react';

const logger = createLogger('skill-system-monitor');

interface SkillSystemMonitorProps { gameStateId?: string;
  roomId?: string;
  isJudge?: boolean
}

interface SystemHealth { overall: 'healthy' | 'warning' | 'critical';
  database: 'healthy' | 'warning' | 'critical';
  processing: 'healthy' | 'warning' | 'critical';
  queue: 'healthy' | 'warning' | 'critical'
}

interface PerformanceMetrics { totalSkillUses: number;
  activeEffects: number;
  queuedEffects: number;
  processingEffects: number;
  completedEffects: number;
  failedEffects: number;
  averageProcessingTime: number;
  errorRate: number
}

/**
* SkillSystemMonitor 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { SkillSystemMonitorProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useCallback, useToast, useSkillEffectProcessor
*
* @example
* // 使用示例
* <SkillSystemMonitor { ...props } />
 */
export const SkillSystemMonitor: React.FC<SkillSystemMonitorProps> = ( { gameStateId,
  roomId: _roomId,
  isJudge = false
}) => { const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalSkillUses: 0,
    activeEffects: 0,
    queuedEffects: 0,
    processingEffects: 0,
    completedEffects: 0,
    failedEffects: 0,
    averageProcessingTime: 0,
    errorRate: 0 
});

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({ overall: 'healthy',
    database: 'healthy',
    processing: 'healthy',
    queue: 'healthy' 
});

  const [isLoading, setIsLoading] = useState(false);
  const { toast  } = useToast();

  // 使用技能效果处理器
  const processor = useSkillEffectProcessor(gameStateId, { autoProcess: isJudge, // 只有法官才自动处理
    intervalMs: 3000,
    enableLogging: true 
});

  // 获取系统状态
  const fetchSystemMetrics = useCallback(async () => { if (!gameStateId) return;

    setIsLoading(true);
    try {
      // 获取技能系统状态
      const { data: statusData, error: statusError  
} = await supabase.rpc(;
        'get_skill_system_status',
        { p_game_state_id: gameStateId  
}
      );

      if (statusError) throw statusError;

      if (statusData && statusData.length > 0) { const status = statusData[0];
        setMetrics({
          totalSkillUses: status.total_skill_uses || 0,
          activeEffects: status.active_effects || 0,
          queuedEffects: status.pending_effects || 0,
          processingEffects: 0, // 需要从队列状态计算
          completedEffects: status.active_effects || 0,
          failedEffects: 0,
          averageProcessingTime: processor.stats.averageProcessTime,
          errorRate: processor.stats.totalProcessed > 0
          ? (processor.stats.failureCount / processor.stats.totalProcessed) * 100
          : 0 
})
}

      // 评估系统健康状况
      const health = evaluateSystemHealth(metrics, processor.stats);
      setSystemHealth(health)
} catch (error: unknown) { const errorMessage = error instanceof Error ? error.message : '未知错误';
      logger.error('获取系统指标失败', error);
      toast({
        title: '监控数据获取失败',
        description: errorMessage,
        variant: 'destructive' 
})
} finally { setIsLoading(false)
}
  }, [gameStateId, processor.stats, metrics, toast]);

  // 评估系统健康状况
/**
 * evaluateSystemHealth函数
 * evaluateSystemHealth函数的功能描述
 * @returns void
 */
  const evaluateSystemHealth = (;
    metrics: PerformanceMetrics,
    processorStats: { totalProcessed: number;
      successCount: number;
      failureCount: number;
      averageProcessTime: number
}
  ): SystemHealth => { const health: SystemHealth = {
      overall: 'healthy',
      database: 'healthy',
      processing: 'healthy',
      queue: 'healthy'  
};

    // 数据库健康检查
    if (metrics.totalSkillUses > 1000) { health.database = 'warning'
}

    // 处理器健康检查
    if (processorStats.failureCount > 10 || metrics.errorRate > 20) { health.processing = 'critical'
} else if (processorStats.failureCount > 5 || metrics.errorRate > 10) { health.processing = 'warning'
}

    // 队列健康检查
    if (metrics.queuedEffects > 50) { health.queue = 'critical'
} else if (metrics.queuedEffects > 20) { health.queue = 'warning'
}

    // 总体健康评估
    const components = [health.database, health.processing, health.queue];
    if (components.includes('critical')) { health.overall = 'critical'
} else if (components.includes('warning')) { health.overall = 'warning'
}

    return health
};

  // 手动清理过期效果
/**
 * handleCleanupExpired函数
 * 处理事件
 * @returns Promise<void>
 */
const handleCleanupExpired = async () => { try  {
      await processor.cleanupExpiredEffects();
      await fetchSystemMetrics();
      toast({
        title: '清理完成',
        description: '已清理所有过期的技能效果' 
})
} catch (error: unknown) { const errorMessage = error instanceof Error ? error.message : '未知错误';
      toast({
        title: '清理失败',
        description: errorMessage,
        variant: 'destructive' 
})
}
  };

  // 重置处理器统计
/**
 * handleResetStats函数
 * 设置数据
 * @returns void
 */
const handleResetStats = () =>  { processor.resetStats();
    toast({
      title: '统计已重置',
      description: '处理器统计数据已清零' 
})
};

  // 获取健康状态颜色
/**
 * getHealthColor函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getHealthColor = (status: 'healthy' | 'warning' | 'critical') => { switch (status)  {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600'
}
  };

  // 获取健康状态图标
/**
 * getHealthIcon函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getHealthIcon = (status: 'healthy' | 'warning' | 'critical') => { switch (status)  {
      case 'healthy': return <CheckCircle className='h-4 w-4' />;
      case 'warning': return <AlertTriangle className='h-4 w-4' />;
      case 'critical': return <AlertTriangle className='h-4 w-4' />;
      default: return <Activity className='h-4 w-4' />
}
  };

  // 定期刷新数据
  useEffect(() => {
  fetchSystemMetrics();
    const interval = setInterval(fetchSystemMetrics, 10000); // 10秒刷新
    return () => clearInterval(interval)

}, [gameStateId, fetchSystemMetrics]);

  if (!gameStateId) { return (;
      <Card>
      <CardContent className='p-6'>;
      <div className='text-center text-gray-500'>;
      请选择游戏状态以查看监控数据
      </div>
      </CardContent>
      </Card>
    )
}

  return (;
    <div className='space-y-6'>;
    { /*  系统健康概览  */ }
    <Card>
    <CardHeader>
    <CardTitle className='flex items-center gap-2'>;
    <Activity className='h-5 w-5' />;
    系统健康状况
    </CardTitle>
    <CardDescription>
    技能系统实时监控面板
    </CardDescription>
    </CardHeader>
    <CardContent>
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>;
    <div className='flex items-center gap-2'>;
    <span className={ getHealthColor(systemHealth.overall) }>;
    { getHealthIcon(systemHealth.overall) }
    </span>
    <span className='text-sm font-medium'>总体状况</span>;
    <Badge variant={ systemHealth.overall === 'healthy' ? 'default' : 'destructive' 
}>;
    { systemHealth.overall === 'healthy' ? '正常' : unknown;
    systemHealth.overall === 'warning' ? '警告' : '严重' 
}
    </Badge>
    </div>

    <div className='flex items-center gap-2'>;
    <span className={ getHealthColor(systemHealth.database) }>;
    { getHealthIcon(systemHealth.database) }
    </span>
    <span className='text-sm font-medium'>数据库</span>;
    </div>

    <div className='flex items-center gap-2'>;
    <span className={ getHealthColor(systemHealth.processing) }>;
    { getHealthIcon(systemHealth.processing) }
    </span>
    <span className='text-sm font-medium'>处理器</span>;
    </div>

    <div className='flex items-center gap-2'>;
    <span className={ getHealthColor(systemHealth.queue) }>;
    { getHealthIcon(systemHealth.queue) }
    </span>
    <span className='text-sm font-medium'>效果队列</span>;
    </div>
    </div>
    </CardContent>
    </Card>

    { /*  详细监控面板  */ }
    <Tabs defaultValue='metrics' className='w-full'>;
    <TabsList className='grid w-full grid-cols-3'>;
    <TabsTrigger value='metrics'>性能指标</TabsTrigger>;
    <TabsTrigger value='processor'>自动处理器</TabsTrigger>;
    <TabsTrigger value='controls'>系统控制</TabsTrigger>;
    </TabsList>

    { /*  性能指标  */ }
    <TabsContent value='metrics' className='space-y-4'>;
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>;
    <Card>
    <CardContent className='p-4'>;
    <div className='flex items-center gap-2'>;
    <Zap className='h-4 w-4 text-blue-600' />;
    <span className='text-sm font-medium'>技能使用</span>;
    </div>
    <div className='text-2xl font-bold'>{ metrics.totalSkillUses }</div>;
    </CardContent>
    </Card>

    <Card>
    <CardContent className='p-4'>;
    <div className='flex items-center gap-2'>;
    <Activity className='h-4 w-4 text-green-600' />;
    <span className='text-sm font-medium'>活跃效果</span>;
    </div>
    <div className='text-2xl font-bold'>{ metrics.activeEffects }</div>;
    </CardContent>
    </Card>

    <Card>
    <CardContent className='p-4'>;
    <div className='flex items-center gap-2'>;
    <Clock className='h-4 w-4 text-yellow-600' />;
    <span className='text-sm font-medium'>队列中</span>;
    </div>
    <div className='text-2xl font-bold'>{ metrics.queuedEffects }</div>;
    </CardContent>
    </Card>

    <Card>
    <CardContent className='p-4'>;
    <div className='flex items-center gap-2'>;
    <TrendingUp className='h-4 w-4 text-purple-600' />;
    <span className='text-sm font-medium'>错误率</span>;
    </div>
    <div className='text-2xl font-bold'>{ metrics.errorRate.toFixed(1) }%</div>;
    </CardContent>
    </Card>
    </div>

    { /*  处理进度  */
} { metrics.queuedEffects > 0 && (
      <Card>
      <CardHeader>
      <CardTitle className='text-lg'>效果处理进度</CardTitle>;
      </CardHeader>
      <CardContent>
      <div className='space-y-2'>;
      <div className='flex justify-between text-sm'>;
      <span>已处理</span>
      <span>{metrics.completedEffects } / { metrics.totalSkillUses }</span>
      </div>
      <Progress
      value={ metrics.totalSkillUses > 0 ? (metrics.completedEffects / metrics.totalSkillUses) * 100 : 0 
}
      className='h-2';
      />
      </div>
      </CardContent>
      </Card>
    )}
    </TabsContent>

    { /*  自动处理器  */ }
    <TabsContent value='processor' className='space-y-4'>;
    <Card>
    <CardHeader>
    <CardTitle className='flex items-center gap-2'>;
    <RefreshCw className={ `h-5 w-5 ${processor.isRunning ? 'animate-spin' : '' 
}`} />;
    自动处理器状态
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>;
    <div className='flex items-center justify-between'>;
    <span>运行状态</span>
    <Badge variant={ processor.isRunning ? 'default' : 'secondary' 
}>;
    { processor.isRunning ? '运行中' : '已停止' 
}
    </Badge>
    </div>

    <div className='grid grid-cols-2 gap-4'>;
    <div>
    <span className='text-sm text-gray-600'>总处理数</span>;
    <div className='text-xl font-semibold'>{ processor.stats.totalProcessed }</div>;
    </div>
    <div>
    <span className='text-sm text-gray-600'>成功率</span>;
    <div className='text-xl font-semibold text-green-600'>;
    { processor.stats.totalProcessed > 0
    ? ((processor.stats.successCount / processor.stats.totalProcessed) * 100).toFixed(1)
    : 0 
}%
    </div>
    </div>
    </div>

    { processor.stats.lastProcessTime && (
      <div>
      <span className='text-sm text-gray-600'>最后处理时间</span>;
      <div className='text-sm'>{processor.stats.lastProcessTime.toLocaleString() }</div>;
      </div>
    )}

    <div className='flex gap-2'>;
    { !processor.isRunning ? (
      <Button onClick={processor.startAutoProcess } size='sm'>;
      启动自动处理
      </Button>
    ) : (
      <Button onClick={ processor.stopAutoProcess } variant='outline' size='sm'>;
      停止自动处理
      </Button>
    )}
    <Button onClick={ processor.manualProcess } variant='outline' size='sm'>;
    手动处理一次
    </Button>
    </div>
    </CardContent>
    </Card>

    { /*  处理状态警告  */
} { processor.stats.failureCount > 5 && (
      <Alert>
      <AlertTriangle className='h-4 w-4' />;
      <AlertDescription>
      处理器连续失败次数较多 ({processor.stats.failureCount } 次)，建议检查系统状态。
      </AlertDescription>
      </Alert>
    )}
    </TabsContent>

    { /*  系统控制  */ }
    <TabsContent value='controls' className='space-y-4'>;
    <Card>
    <CardHeader>
    <CardTitle className='flex items-center gap-2'>;
    <Settings className='h-5 w-5' />;
    系统维护
    </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>;
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>;
    <Button
    onClick={ handleCleanupExpired }
    variant='outline';
    disabled={ !isJudge }
    >
    清理过期效果
    </Button>

    <Button
    onClick={ handleResetStats }
    variant='outline';
    disabled={ !isJudge }
    >
    重置统计数据
    </Button>

    <Button
    onClick={ fetchSystemMetrics }
    variant='outline';
    disabled={ isLoading }
    >
    { isLoading ? '刷新中...' : '刷新监控数据' 
}
    </Button>

    <Button
    onClick={ () => window.open('/admin/skill-system-logs', '_blank') }
    variant='outline';
    disabled={ !isJudge }
    >
    查看详细日志
    </Button>
    </div>

    { !isJudge && (
      <Alert>
      <AlertTriangle className='h-4 w-4' />;
      <AlertDescription>
      只有游戏法官才能执行系统维护操作。
      </AlertDescription>
      </Alert>
    ) }
    </CardContent>
    </Card>
    </TabsContent>
    </Tabs>
    </div>
  )
};