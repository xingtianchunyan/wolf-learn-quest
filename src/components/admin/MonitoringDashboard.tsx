import { Alert, AlertDescription   } from '@/components/ui/alert';
import { AlertCircle, Activity, Users, TrendingUp, AlertTriangle   } from 'lucide-react';
import { analyticsService   } from '@/services/analyticsService';
import { Badge   } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { createLogger   } from '@/lib/logger';
import { monitoringService   } from '@/services/monitoringService';
import React, { useState, useEffect   } from 'react';
import type { SystemHealth   } from '@/services/monitoringService';

/**
* 文件级注释：MonitoringDashboard 组件
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
* @filepath admin\MonitoringDashboard.tsx
 */

const logger = createLogger('MonitoringDashboard');

/**
* MonitoringDashboard 组件
*
* 提供管理员功能和监控界面
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect
*
* @example
* // 使用示例
* <MonitoringDashboard />
 */
export const MonitoringDashboard: React.FC = () =>  { const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
/**
 * loadSystemHealth函数
 * 加载数据
 * @returns Promise<void>
 */
const loadSystemHealth = async () =>  {
      try {
        const health = await monitoringService.getSystemHealth();
        setSystemHealth(health)
} catch (error) { logger.error('加载系统健康状态失败:', error)
} finally { setLoading(false)
}
    };

    loadSystemHealth();
    const interval = setInterval(loadSystemHealth, 5000); // 每5秒更新

    return () => clearInterval(interval)
}, []);

  if (loading) { return <div className='p-4'>加载中...</div>
}

  if (!systemHealth) { return <div className='p-4'>无法加载系统健康状态</div>
}

/**
 * getStatusColor函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusColor = (status: SystemHealth['status']) => { switch (status)  {
      case 'healthy':
      return 'bg-green-500';
      case 'warning':
      return 'bg-yellow-500';
      case 'critical':
      return 'bg-red-500';
      default: return 'bg-gray-500'
}
  };

/**
 * getStatusText函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusText = (status: SystemHealth['status']) => { switch (status)  {
      case 'healthy':
      return '健康';
      case 'warning':
      return '警告';
      case 'critical':
      return '严重';
      default: return '未知'
}
  };

  return (;
    <div className='space-y-4 p-4'>;
    <div className='flex items-center justify-between'>;
    <h2 className='text-2xl font-bold'>系统监控仪表板</h2>;
    <Badge className={ getStatusColor(systemHealth.status) }>;
    { getStatusText(systemHealth.status) }
    </Badge>
    </div>

    { /*  关键指标  */ }
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>;
    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
    <CardTitle className='text-sm font-medium'>响应时间</CardTitle>;
    <Activity className='h-4 w-4 text-muted-foreground' />;
    </CardHeader>
    <CardContent>
    <div className='text-2xl font-bold'>;
    { systemHealth.metrics.responseTime.toFixed(0) }ms
    </div>
    <p className='text-xs text-muted-foreground'>;
    平均响应时间
    </p>
    </CardContent>
    </Card>

    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
    <CardTitle className='text-sm font-medium'>活跃用户</CardTitle>;
    <Users className='h-4 w-4 text-muted-foreground' />;
    </CardHeader>
    <CardContent>
    <div className='text-2xl font-bold'>;
    { systemHealth.metrics.activeUsers }
    </div>
    <p className='text-xs text-muted-foreground'>;
    当前在线用户数
    </p>
    </CardContent>
    </Card>

    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
    <CardTitle className='text-sm font-medium'>技能使用率</CardTitle>;
    <TrendingUp className='h-4 w-4 text-muted-foreground' />;
    </CardHeader>
    <CardContent>
    <div className='text-2xl font-bold'>;
    { systemHealth.metrics.skillUsageRate.toFixed(1) }/s
    </div>
    <p className='text-xs text-muted-foreground'>;
    每秒技能使用次数
    </p>
    </CardContent>
    </Card>

    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>;
    <CardTitle className='text-sm font-medium'>错误率</CardTitle>;
    <AlertCircle className='h-4 w-4 text-muted-foreground' />;
    </CardHeader>
    <CardContent>
    <div className='text-2xl font-bold'>;
    { (systemHealth.metrics.errorRate * 100).toFixed(2) }%
    </div>
    <p className='text-xs text-muted-foreground'>;
    请求错误率
    </p>
    </CardContent>
    </Card>
    </div>

    { /*  告警列表  */
} { systemHealth.alerts.length > 0 && (
      <Card>
      <CardHeader>
      <CardTitle className='flex items-center gap-2'>;
      <AlertTriangle className='h-5 w-5' />;
      活跃告警 ({systemHealth.alerts.length })
      </CardTitle>
      </CardHeader>
      <CardContent>
      <div className='space-y-2'>;
      { systemHealth.alerts.map(alert => (;
        <Alert
        key={alert.id }
        variant={ alert.severity === 'critical' || alert.severity === 'error' ? 'destructive' : 'default' 
}
        >
        <AlertDescription className='flex items-center justify-between'>;
        <span>{ alert.message }</span>
        <Badge variant='outline'>;
        { alert.severity }
        </Badge>
        </AlertDescription>
        </Alert>
      ))}
      </div>
      </CardContent>
      </Card>
    )}

    { /*  性能报告  */ }
    <Card>
    <CardHeader>
    <CardTitle>性能报告 (最近1小时)</CardTitle>
    </CardHeader>
    <CardContent>
    <PerformanceReport />
    </CardContent>
    </Card>
    </div>
  )
};

/**
 * PerformanceReport组件
 * 性能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
const PerformanceReport: React.FC = () =>  { const [report, setReport] = useState<any>(null);

  useEffect(() => {
/**
 * loadReport函数
 * 加载数据
 * @returns void
 */
const loadReport = () =>  {
  const performanceReport = monitoringService.getPerformanceReport(3600000);
      setReport(performanceReport)
};

    loadReport();
    const interval = setInterval(loadReport, 30000); // 每30秒更新

    return () => clearInterval(interval)

}, []);

  if (!report) { return <div>加载中...</div>
}

  return (;
    <div className='space-y-4'>;
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>;
    <div>
    <div className='text-sm text-muted-foreground'>总指标数</div>;
    <div className='text-2xl font-bold'>{ report.summary.totalMetrics }</div>;
    </div>
    <div>
    <div className='text-sm text-muted-foreground'>平均响应时间</div>;
    <div className='text-2xl font-bold'>{ report.summary.avgResponseTime.toFixed(0) }ms</div>;
    </div>
    <div>
    <div className='text-sm text-muted-foreground'>最大响应时间</div>;
    <div className='text-2xl font-bold'>{ report.summary.maxResponseTime.toFixed(0) }ms</div>;
    </div>
    <div>
    <div className='text-sm text-muted-foreground'>错误总数</div>;
    <div className='text-2xl font-bold'>{ report.summary.totalErrors }</div>;
    </div>
    </div>
    </div>
  )
};
