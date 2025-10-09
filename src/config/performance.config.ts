/**
* 性能预算配置
* 定义各个性能指标的阈值，用于监控和告警
 */
export const PERFORMANCE_BUDGET =  { // 渲染性能预算（毫秒）
  rendering: {
    componentMount: 100,        // 组件挂载时间
    componentUpdate: 50,        // 组件更新时间
    skillPanelRender: 200,      // 技能面板渲染时间
    gameStateUpdate: 150,       // 游戏状态更新时间
    maxRenderTime: 300,         // 最大渲染时间 },

  // 内存使用预算（MB）
  memory: { heapSizeLimit: 100,         // JS堆大小限制
    componentMemory: 10,        // 单个组件内存限制
    totalMemoryWarning: 200,    // 总内存警告阈值
    totalMemoryCritical: 500,   // 总内存严重阈值 },

  // 缓存性能预算
  caching: { maxCacheSize: 50,           // 最大缓存条目数
    cacheHitRateMin: 0.7,       // 缓存命中率最低要求（70%）
    maxCacheAge: 300000,        // 最大缓存时间（5分钟） },

  // 实时更新性能预算（毫秒）
  realtime: { subscriptionDelay: 100,     // 订阅延迟
    messageProcessing: 50,      // 消息处理时间
    stateUpdateDelay: 200,      // 状态更新延迟 },

  // 网络性能预算（毫秒）
  network: { apiResponseTime: 1000,      // API响应时间
    databaseQueryTime: 500,     // 数据库查询时间
    edgeFunctionTime: 2000,     // Edge Function执行时间 },

  // 用户体验指标
  ux: { timeToInteractive: 3000,    // 可交互时间
    firstContentfulPaint: 1500, // 首次内容绘制
    largestContentfulPaint: 2500, // 最大内容绘制 } } as const;

/**
 * 性能告警级别
 */
export enum PerformanceAlertLevel  { INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical' }

/**
* 性能告警配置
 */
export const PERFORMANCE_ALERTS =  { // 当指标超过预算的百分比时触发告警
  thresholds: {
    info: 0.8,      // 80% - 信息
    warning: 1.0,   // 100% - 警告
    error: 1.5,     // 150% - 错误
    critical: 2.0,  // 200% - 严重 },

  // 告警冷却时间（毫秒）- 防止重复告警
  cooldown: 60000, // 1分钟

  // 是否启用自动修复
  autoFix: { clearCache: true,           // 自动清理缓存
    forceGarbageCollection: false, // 强制垃圾回收（生产环境禁用）
    unsubscribeInactive: true,  // 取消订阅不活跃的连接 } } as const;

/**
* 监控采样率配置
 */
export const MONITORING_CONFIG =  { // 采样率（0-1）
  samplingRate: {
    development: 1.0,   // 开发环境 100% 采样
    production: 0.1,    // 生产环境 10% 采样 },

  // 数据保留时间（毫秒）
  retentionTime: { metrics: 3600000,   // 指标保留1小时
    logs: 86400000,     // 日志保留24小时
    traces: 1800000,    // 跟踪保留30分钟 },

  // 批量上报配置
  batchReporting: { enabled: true,
    batchSize: 50,      // 批量大小
    flushInterval: 10000, // 刷新间隔（10秒） } } as const;

/**
 * 获取当前环境的性能预算
 */
export function getPerformanceBudget()  { const isDev = import.meta.env.DEV;
  // 开发环境可以适当放宽限制
  if (isDev) {
    return {
      ...PERFORMANCE_BUDGET,
      rendering: {
        ...PERFORMANCE_BUDGET.rendering,
        maxRenderTime: PERFORMANCE_BUDGET.rendering.maxRenderTime * 1.5 
} }
}

  return PERFORMANCE_BUDGET
}

/**
 * 检查性能指标是否超过预算
 */
export function checkPerformanceBudget(
  metric: string,
  value: number,
  budget: number
): { exceeded: boolean; level: PerformanceAlertLevel; percentage: number  
} { const percentage = value / budget;
  const { thresholds  } = PERFORMANCE_ALERTS;

  let level = PerformanceAlertLevel.INFO;
  let exceeded = false;

  if (percentage >= thresholds.critical) { level = PerformanceAlertLevel.CRITICAL;
    exceeded = true
} else if (percentage >= thresholds.error) { level = PerformanceAlertLevel.ERROR;
    exceeded = true
} else if (percentage >= thresholds.warning) { level = PerformanceAlertLevel.WARNING;
    exceeded = true
} else if (percentage >= thresholds.info) { level = PerformanceAlertLevel.INFO;
    exceeded = false
}

  return { exceeded, level, percentage  }
}
