import { createLogger   } from '@/lib/logger';

/**
* 性能监控专用服务类
* 提供统一的性能监控、分析和优化建议功能
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('performance-monitoring-service');

/**
 * 性能指标类型枚举
 */
export enum PerformanceMetricType  { RENDER_TIME = 'render_time',
  MEMORY_USAGE = 'memory_usage',
  API_RESPONSE_TIME = 'api_response_time',
  COMPONENT_MOUNT_TIME = 'component_mount_time',
  HOOK_EXECUTION_TIME = 'hook_execution_time',
  CACHE_HIT_RATE = 'cache_hit_rate',
  ERROR_RATE = 'error_rate',
  USER_INTERACTION_DELAY = 'user_interaction_delay'
}

/**
 * 性能指标数据接口
 */
export interface PerformanceMetric  { id: string;
  type: PerformanceMetricType;
  value: number;
  unit: string;
  timestamp: Date;
  componentName?: string;
  operationName?: string;
  metadata?: Record<string, any>;
  tags?: string[]
}

/**
 * 性能阈值配置接口
 */
export interface PerformanceThreshold  { type: PerformanceMetricType;
  warningThreshold: number;
  criticalThreshold: number;
  unit: string;
  description: string
}

/**
* 性能分析结果接口
 */
export interface PerformanceAnalysis  { overallScore: number; // 0-100分
  criticalIssues: PerformanceIssue[];
  warnings: PerformanceIssue[];
  recommendations: PerformanceRecommendation[];
  trends: PerformanceTrend[];
  summary: {
    totalMetrics: number;
    averageScore: number;
    worstPerformingComponents: string[];
    bestPerformingComponents: string[]
}
}

/**
 * 性能问题接口
 */
export interface PerformanceIssue  { id: string;
  type: PerformanceMetricType;
  severity: 'warning' | 'critical';
  componentName?: string;
  operationName?: string;
  currentValue: number;
  thresholdValue: number;
  impact: string;
  description: string;
  detectedAt: Date
}

/**
 * 性能优化建议接口
 */
export interface PerformanceRecommendation  { id: string;
  category: 'rendering' | 'memory' | 'network' | 'caching' | 'code_splitting';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  implementation: string;
  estimatedImpact: string;
  effort: 'low' | 'medium' | 'high';
  relatedMetrics: PerformanceMetricType[]
}

/**
 * 性能趋势接口
 */
export interface PerformanceTrend  { type: PerformanceMetricType;
  direction: 'improving' | 'degrading' | 'stable';
  changePercentage: number;
  timeRange: string;
  dataPoints: Array<{
    timestamp: Date;
    value: number
}>
}

/**
 * 性能监控配置接口
 */
export interface PerformanceMonitoringConfig  { enabled: boolean;
  sampleRate: number; // 0-1之间，采样率
  bufferSize: number; // 缓存的指标数量
  reportingInterval: number; // 报告间隔（毫秒）
  thresholds: PerformanceThreshold[];
  enabledMetrics: PerformanceMetricType[];
  autoOptimization: boolean
}

/**
* 性能监控专用服务类
* 提供全面的性能监控、分析和优化功能
 */
export class PerformanceMonitoringService  { private static instance: PerformanceMonitoringService;
  private readonly logger = createLogger('performance-monitoring-service');

  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private config: PerformanceMonitoringConfig;
  private observers: Map<string, PerformanceObserver> = new Map();
  private reportingTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.config = this.getDefaultConfig();
    this.initializeMonitoring()
}

  /**
 * 获取单例实例
 */
public static getInstance(): PerformanceMonitoringService { if (!PerformanceMonitoringService.instance)  {
      PerformanceMonitoringService.instance = new PerformanceMonitoringService()
}
    return PerformanceMonitoringService.instance
}

  /**
 * 获取默认配置
 */
private getDefaultConfig(): PerformanceMonitoringConfig { return  {
      enabled: true,
      sampleRate: 0.1, // 10%采样率
      bufferSize: 1000,
      reportingInterval: 30000, // 30秒
      thresholds: [{
          type: PerformanceMetricType.RENDER_TIME,
          warningThreshold: 16, // 16ms (60fps)
          criticalThreshold: 33, // 33ms (30fps)
          unit: 'ms',
          description: '组件渲染时间' 
},
        { type: PerformanceMetricType.MEMORY_USAGE,
          warningThreshold: 50, // 50MB
          criticalThreshold: 100, // 100MB
          unit: 'MB',
          description: '内存使用量' 
},
        { type: PerformanceMetricType.API_RESPONSE_TIME,
          warningThreshold: 1000, // 1秒
          criticalThreshold: 3000, // 3秒
          unit: 'ms',
          description: 'API响应时间' 
},
        { type: PerformanceMetricType.COMPONENT_MOUNT_TIME,
          warningThreshold: 100, // 100ms
          criticalThreshold: 500, // 500ms
          unit: 'ms',
          description: '组件挂载时间' 
},
        { type: PerformanceMetricType.HOOK_EXECUTION_TIME,
          warningThreshold: 10, // 10ms
          criticalThreshold: 50, // 50ms
          unit: 'ms',
          description: 'Hook执行时间' 
},
        { type: PerformanceMetricType.CACHE_HIT_RATE,
          warningThreshold: 70, // 70%
          criticalThreshold: 50, // 50%
          unit: '%',
          description: '缓存命中率' 
},
        { type: PerformanceMetricType.ERROR_RATE,
          warningThreshold: 1, // 1%
          criticalThreshold: 5, // 5%
          unit: '%',
          description: '错误率' 
},
        { type: PerformanceMetricType.USER_INTERACTION_DELAY,
          warningThreshold: 100, // 100ms
          criticalThreshold: 300, // 300ms
          unit: 'ms',
          description: '用户交互延迟' 
} ],
      enabledMetrics: Object.values(PerformanceMetricType),
      autoOptimization: false 
}
}

  /**
 * 初始化性能监控
 */
private initializeMonitoring(): void { if (!this.config.enabled)  {
      return
}

    try { // 初始化浏览器性能观察器
      this.initializeBrowserObservers();

      // 启动定期报告
      this.startPeriodicReporting();

      this.logger.info('性能监控初始化完成', { config: this.config  
})
} catch (error) { this.logger.error('性能监控初始化失败', { error  })
}
  }

  /**
 * 初始化浏览器性能观察器
 */
private initializeBrowserObservers(): void { if (typeof window === 'undefined' || !window.PerformanceObserver)  {
      return
}

    try { // 观察导航性能
      const navigationObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          this.recordMetric({
            id: this.generateMetricId(),
            type: PerformanceMetricType.API_RESPONSE_TIME,
            value: entry.duration,
            unit: 'ms',
            timestamp: new Date(),
            operationName: 'navigation',
            metadata: {
              entryType: entry.entryType,
              name: entry.name 
}
          })
}
      });
      navigationObserver.observe({ entryTypes: ['navigation']  
});
      this.observers.set('navigation', navigationObserver);

      // 观察资源加载性能
      const resourceObserver = new PerformanceObserver(list => { for (const entry of list.getEntries()) {
          this.recordMetric({
            id: this.generateMetricId(),
            type: PerformanceMetricType.API_RESPONSE_TIME,
            value: entry.duration,
            unit: 'ms',
            timestamp: new Date(),
            operationName: 'resource_load',
            metadata: {
              entryType: entry.entryType,
              name: entry.name,
              transferSize: (entry as PerformanceResourceTiming).transferSize 
}
          })
}
      });
      resourceObserver.observe({ entryTypes: ['resource']  
});
      this.observers.set('resource', resourceObserver);

      // 观察用户交互性能
      const measureObserver = new PerformanceObserver(list => { for (const entry of list.getEntries()) {
          this.recordMetric({
            id: this.generateMetricId(),
            type: PerformanceMetricType.USER_INTERACTION_DELAY,
            value: entry.duration,
            unit: 'ms',
            timestamp: new Date(),
            operationName: entry.name,
            metadata: {
              entryType: entry.entryType 
}
          })
}
      });
      measureObserver.observe({ entryTypes: ['measure']  
});
      this.observers.set('measure', measureObserver)
} catch (error) { this.logger.error('浏览器性能观察器初始化失败', { error  })
}
  }

  /**
 * 启动定期报告
 */
private startPeriodicReporting(): void { if (this.reportingTimer)  {
      clearInterval(this.reportingTimer)
}

    this.reportingTimer = setInterval(() => {
  this.generatePerformanceReport()
}, this.config.reportingInterval)

}

  /**
  * 记录性能指标
  *
  * @param metric - 性能指标
   */
public recordMetric(metric: PerformanceMetric): void { if (!this.config.enabled || !this.shouldSample())  {
      return
}

    try { const key = `${metric.type }_${ metric.componentName || 'global' }`;

      if (!this.metrics.has(key)) { this.metrics.set(key, [])
}

      const metrics = this.metrics.get(key)!;
      metrics.push(metric);

      // 保持缓存大小限制
      if (metrics.length > this.config.bufferSize) { metrics.shift()
}

      // 检查阈值
      this.checkThresholds(metric);

      this.logger.debug('性能指标已记录', { type: metric.type,
        value: metric.value,
        componentName: metric.componentName 
})
} catch (error) { this.logger.error('性能指标记录失败', { error, metric  })
}
  }

  /**
 * 判断是否应该采样
 */
private shouldSample(): boolean  { return Math.random() < this.config.sampleRate
}
  /**
  * 检查性能阈值
  *
  * @param metric - 性能指标
   */
private checkThresholds(metric: PerformanceMetric): void  { const threshold = this.config.thresholds.find(t => t.type === metric.type);
    if (!threshold) {
      return
}

    let severity: 'warning' | 'critical' | null = null;
    let thresholdValue: number;

    if (metric.value >= threshold.criticalThreshold) { severity = 'critical';
      thresholdValue = threshold.criticalThreshold
} else if (metric.value >= threshold.warningThreshold) { severity = 'warning';
      thresholdValue = threshold.warningThreshold
}

    if (severity) { const issue: PerformanceIssue = {
        id: this.generateMetricId(),
        type: metric.type,
        severity,
        componentName: metric.componentName,
        operationName: metric.operationName,
        currentValue: metric.value,
        thresholdValue,
        impact: this.calculateImpact(metric, threshold),
        description: `${threshold.description 
}超过${ severity === 'critical' ? '严重' : '警告' 
}阈值`,
        detectedAt: new Date() 
};

      this.handlePerformanceIssue(issue)
}
  }

  /**
  * 计算性能影响
  *
  * @param metric - 性能指标
  * @param threshold - 阈值配置
  * @returns 影响描述
   */
private calculateImpact(metric: PerformanceMetric, threshold: PerformanceThreshold): string  { const exceedPercentage = ((metric.value - threshold.warningThreshold) / threshold.warningThreshold * 100).toFixed(1);

    switch (metric.type) {
      case PerformanceMetricType.RENDER_TIME: return `渲染性能下降${exceedPercentage 
}%，可能导致界面卡顿`;
      case PerformanceMetricType.MEMORY_USAGE: return `内存使用超标${ exceedPercentage 
}%，可能导致应用崩溃`;
      case PerformanceMetricType.API_RESPONSE_TIME: return `API响应延迟${ exceedPercentage 
}%，影响用户体验`;
      case PerformanceMetricType.COMPONENT_MOUNT_TIME: return `组件加载缓慢${ exceedPercentage 
}%，影响页面响应速度`;
      case PerformanceMetricType.HOOK_EXECUTION_TIME: return `Hook执行耗时${ exceedPercentage 
}%，可能阻塞UI更新`;
      case PerformanceMetricType.CACHE_HIT_RATE: return `缓存命中率低${ exceedPercentage 
}%，增加不必要的计算`;
      case PerformanceMetricType.ERROR_RATE: return `错误率高${ exceedPercentage 
}%，影响应用稳定性`;
      case PerformanceMetricType.USER_INTERACTION_DELAY: return `交互延迟${ exceedPercentage 
}%，影响用户操作体验`;
      default: return `性能指标异常，超出预期${ exceedPercentage 
}%`
}
  }

  /**
  * 处理性能问题
  *
  * @param issue - 性能问题
   */
private handlePerformanceIssue(issue: PerformanceIssue): void { this.logger.warn('检测到性能问题',  { issue  });

    // 如果启用了自动优化，尝试自动修复
    if (this.config.autoOptimization) { this.attemptAutoOptimization(issue)
}

    // 触发性能问题事件
    this.emitPerformanceEvent('performance-issue', issue)
}

  /**
  * 尝试自动优化
  *
  * @param issue - 性能问题
   */
private attemptAutoOptimization(issue: PerformanceIssue): void { try  {
      switch (issue.type) {
        case PerformanceMetricType.MEMORY_USAGE:
        // 触发垃圾回收（如果可用）
        if (window.gc) {
          window.gc();
          this.logger.info('已触发垃圾回收', { issueId: issue.id  
})
}
        break;

        case PerformanceMetricType.CACHE_HIT_RATE:
        // 清理过期缓存
        this.clearExpiredCache();
        this.logger.info('已清理过期缓存', { issueId: issue.id  
});
        break;

        default:
        this.logger.debug('暂无自动优化策略', { issueType: issue.type  
});
        break
}

    } catch (error) { this.logger.error('自动优化失败', { error, issue  })
}
  }

  /**
  * 清理过期缓存
   */
private clearExpiredCache(): void  { // TODO: 实现缓存清理逻辑
    // 这里应该调用各个缓存系统的清理方法 }

  /**
  * 触发性能事件
  *
  * @param eventType - 事件类型
  * @param data - 事件数据
   */
private emitPerformanceEvent(eventType: string, data: any): void { try  {
      const event = new CustomEvent(`performance-monitoring: ${eventType 
}`, { detail: data 
});
      window.dispatchEvent(event)
} catch (error) { this.logger.error('性能事件触发失败', { error, eventType, data  })
}
  }

  /**
 * 生成性能报告
 */
public generatePerformanceReport(): PerformanceAnalysis { try  {
      this.logger.info('开始生成性能报告');

      const analysis: PerformanceAnalysis = {
        overallScore: 0,
        criticalIssues: [],
        warnings: [],
        recommendations: [],
        trends: [],
        summary: {
          totalMetrics: 0,
          averageScore: 0,
          worstPerformingComponents: [],
          bestPerformingComponents: [] 
}
      };

      // 分析所有指标
      let totalScore = 0;
      let metricCount = 0;
      const componentScores: Map<string, number[]> = new Map();

      for (const [key, metrics] of this.metrics.entries()) { if (metrics.length === 0) continue;

        const latestMetric = metrics[metrics.length - 1];
        const score = this.calculateMetricScore(latestMetric);

        totalScore += score;
        metricCount++;

        // 记录组件分数
        const componentName = latestMetric.componentName || 'global';
        if (!componentScores.has(componentName)) {
          componentScores.set(componentName, [])
}
        componentScores.get(componentName)!.push(score);

        // 检查是否需要添加到问题列表
        const threshold = this.config.thresholds.find(t => t.type === latestMetric.type);
        if (threshold) { if (latestMetric.value >= threshold.criticalThreshold) {
            analysis.criticalIssues.push({
              id: this.generateMetricId(),
              type: latestMetric.type,
              severity: 'critical',
              componentName: latestMetric.componentName,
              operationName: latestMetric.operationName,
              currentValue: latestMetric.value,
              thresholdValue: threshold.criticalThreshold,
              impact: this.calculateImpact(latestMetric, threshold),
              description: `${threshold.description 
}严重超标`,
              detectedAt: new Date() 
})
} else if (latestMetric.value >= threshold.warningThreshold) { analysis.warnings.push({
              id: this.generateMetricId(),
              type: latestMetric.type,
              severity: 'warning',
              componentName: latestMetric.componentName,
              operationName: latestMetric.operationName,
              currentValue: latestMetric.value,
              thresholdValue: threshold.warningThreshold,
              impact: this.calculateImpact(latestMetric, threshold),
              description: `${threshold.description 
}超出警告阈值`,
              detectedAt: new Date() 
})
}
        }

        // 计算趋势
        const trend = this.calculateTrend(metrics);
        if (trend) { analysis.trends.push(trend)
}
      }

      // 计算总体分数
      analysis.overallScore = metricCount > 0 ? Math.round(totalScore / metricCount) : 100;
      analysis.summary.totalMetrics = metricCount;
      analysis.summary.averageScore = analysis.overallScore;

      // 找出表现最差和最好的组件
      const componentAverages = new Map<string, number>();
      for (const [componentName, scores] of componentScores.entries()) { const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        componentAverages.set(componentName, average)
}

      const sortedComponents = Array.from(componentAverages.entries());
      .sort((a, b) => a[1] - b[1]);

      analysis.summary.worstPerformingComponents = sortedComponents;
      .slice(0, 3)
      .map(([name]) => name);

      analysis.summary.bestPerformingComponents = sortedComponents;
      .slice(-3)
      .reverse()
      .map(([name]) => name);

      // 生成优化建议
      analysis.recommendations = this.generateRecommendations(analysis);

      this.logger.info('性能报告生成完成', { overallScore: analysis.overallScore,
        criticalIssues: analysis.criticalIssues.length,
        warnings: analysis.warnings.length,
        recommendations: analysis.recommendations.length 
});

      return analysis
} catch (error) { this.logger.error('性能报告生成失败', { error  });
      throw error
}
  }

  /**
  * 计算指标分数
  *
  * @param metric - 性能指标
  * @returns 分数 (0-100)
   */
private calculateMetricScore(metric: PerformanceMetric): number  { const threshold = this.config.thresholds.find(t => t.type === metric.type);
    if (!threshold) {
      return 100; // 没有阈值配置，默认满分 }

    if (metric.value <= threshold.warningThreshold) { return 100; // 优秀 } else if (metric.value <= threshold.criticalThreshold) { // 在警告和严重阈值之间，线性计算分数
      const ratio = (metric.value - threshold.warningThreshold) /;
      (threshold.criticalThreshold - threshold.warningThreshold);
      return Math.max(0, Math.round(100 - (ratio * 50))); // 100分降到50分 } else { // 超过严重阈值，根据超出程度计算分数
      const exceedRatio = metric.value / threshold.criticalThreshold;
      return Math.max(0, Math.round(50 / exceedRatio)); // 最高50分，超出越多分数越低 }
  }

  /**
  * 计算性能趋势
  *
  * @param metrics - 指标数组
  * @returns 趋势信息
   */
private calculateTrend(metrics: PerformanceMetric[]): PerformanceTrend | null { if (metrics.length < 2)  {
      return null
}

    const recentMetrics = metrics.slice(-10); // 取最近10个数据点
    const firstValue = recentMetrics[0].value;
    const lastValue = recentMetrics[recentMetrics.length - 1].value;

    const changePercentage = ((lastValue - firstValue) / firstValue) * 100;

    let direction: 'improving' | 'degrading' | 'stable';
    if (Math.abs(changePercentage) < 5) { direction = 'stable'
} else if (changePercentage > 0) { // 对于大多数指标，值增加表示性能下降
      direction = metrics[0].type === PerformanceMetricType.CACHE_HIT_RATE ? 'improving' : 'degrading'
} else { // 对于大多数指标，值减少表示性能改善
      direction = metrics[0].type === PerformanceMetricType.CACHE_HIT_RATE ? 'degrading' : 'improving'
}

    return { type: metrics[0].type,
      direction,
      changePercentage: Math.abs(changePercentage),
      timeRange: `${recentMetrics.length 
}个数据点`,
      dataPoints: recentMetrics.map(m => ({ timestamp: m.timestamp,
        value: m.value 
})) }
}

  /**
  * 生成优化建议
  *
  * @param analysis - 性能分析结果
  * @returns 优化建议列表
   */
private generateRecommendations(analysis: PerformanceAnalysis): PerformanceRecommendation[]  { const recommendations: PerformanceRecommendation[] = [];

    // 基于严重问题生成建议
    for (const issue of analysis.criticalIssues) {
      const recommendation = this.generateRecommendationForIssue(issue, 'high');
      if (recommendation) {
        recommendations.push(recommendation)
}
    }

    // 基于警告生成建议
    for (const warning of analysis.warnings) { const recommendation = this.generateRecommendationForIssue(warning, 'medium');
      if (recommendation) {
        recommendations.push(recommendation)
}
    }

    // 基于趋势生成建议
    for (const trend of analysis.trends) { if (trend.direction === 'degrading' && trend.changePercentage > 10) {
        const recommendation = this.generateRecommendationForTrend(trend);
        if (recommendation) {
          recommendations.push(recommendation)
}
      } }

    return recommendations
}

  /**
  * 为性能问题生成建议
  *
  * @param issue - 性能问题
  * @param priority - 优先级
  * @returns 优化建议
   */
  private generateRecommendationForIssue(
    issue: PerformanceIssue,
    priority: 'high' | 'medium' | 'low'
  ): PerformanceRecommendation | null { switch (issue.type) {
      case PerformanceMetricType.RENDER_TIME:
      return {
        id: this.generateMetricId(),
        category: 'rendering',
        priority,
        title: '优化组件渲染性能',
        description: `${issue.componentName || '组件' 
}渲染时间过长，需要优化渲染逻辑`,
        implementation: '使用React.memo、useMemo、useCallback等优化手段，减少不必要的重渲染',
        estimatedImpact: '可提升渲染性能30-50%',
        effort: 'medium',
        relatedMetrics: [PerformanceMetricType.RENDER_TIME, PerformanceMetricType.USER_INTERACTION_DELAY] };

      case PerformanceMetricType.MEMORY_USAGE:
      return {
    id: this.generateMetricId(),
        category: 'memory',
        priority,
        title: '优化内存使用',
        description: '内存使用量过高，可能存在内存泄漏',
        implementation: '检查事件监听器清理、定时器清理、大对象引用等，使用内存分析工具定位问题',
        estimatedImpact: '可减少内存使用20-40%',
        effort: 'high',
        relatedMetrics: [PerformanceMetricType.MEMORY_USAGE]  
};

      case PerformanceMetricType.API_RESPONSE_TIME:
      return {
    id: this.generateMetricId(),
        category: 'network',
        priority,
        title: '优化API响应时间',
        description: 'API响应时间过长，影响用户体验',
        implementation: '实施请求缓存、并发请求优化、接口合并等策略',
        estimatedImpact: '可提升API响应速度40-60%',
        effort: 'medium',
        relatedMetrics: [PerformanceMetricType.API_RESPONSE_TIME, PerformanceMetricType.USER_INTERACTION_DELAY]  
  };

      case PerformanceMetricType.CACHE_HIT_RATE:
      return {
    id: this.generateMetricId(),
        category: 'caching',
        priority,
        title: '优化缓存策略',
        description: '缓存命中率过低，增加了不必要的计算和网络请求',
        implementation: '调整缓存策略、增加缓存容量、优化缓存键设计',
        estimatedImpact: '可提升缓存命中率20-30%',
        effort: 'low',
        relatedMetrics: [PerformanceMetricType.CACHE_HIT_RATE, PerformanceMetricType.API_RESPONSE_TIME]  
  };

      default: return null
}
  }

  /**
  * 为性能趋势生成建议
  *
  * @param trend - 性能趋势
  * @returns 优化建议
   */
private generateRecommendationForTrend(trend: PerformanceTrend): PerformanceRecommendation | null { return  {
      id: this.generateMetricId(),
      category: 'rendering',
      priority: 'medium',
      title: `关注${trend.type 
}性能下降趋势`,
      description: `${ trend.type 
}指标呈现下降趋势，变化幅度${ trend.changePercentage.toFixed(1) }%`,
      implementation: '持续监控该指标，分析性能下降原因，及时采取优化措施',
      estimatedImpact: '预防性能问题恶化',
      effort: 'low',
      relatedMetrics: [trend.type] 
}
}

  /**
 * 生成指标ID
 */
private generateMetricId(): string { return `metric_${Date.now() 
}_$ { Math.random().toString(36).substr(2, 9) }`
}
  /**
  * 更新配置
  *
  * @param newConfig - 新配置
   */
public updateConfig(newConfig: Partial<PerformanceMonitoringConfig>): void { this.config =  { ...this.config, ...newConfig   };

    if (newConfig.enabled !== undefined) { if (newConfig.enabled) {
        this.initializeMonitoring()
} else { this.stopMonitoring()
}
    }

    if (newConfig.reportingInterval !== undefined) { this.startPeriodicReporting()
}

    this.logger.info('性能监控配置已更新', { config: this.config  
})
}

  /**
  * 停止监控
   */
public stopMonitoring(): void  { // 停止所有观察器
    for (const [name, observer] of this.observers.entries()) {
      observer.disconnect();
      this.logger.debug(`已停止${name }观察器`)
}
    this.observers.clear();

    // 停止定期报告
    if (this.reportingTimer) { clearInterval(this.reportingTimer);
      this.reportingTimer = null
}

    this.logger.info('性能监控已停止')
}

  /**
 * 清理所有数据
 */
public clearAllData(): void  { this.metrics.clear();
    this.logger.info('性能监控数据已清理')
}

  /**
 * 获取当前配置
 */
public getConfig(): PerformanceMonitoringConfig { return  { ...this.config  
}
}
  /**
  * 获取指标数据
  *
  * @param type - 指标类型
  * @param componentName - 组件名称
  * @returns 指标数据
   */
public getMetrics(type?: PerformanceMetricType, componentName?: string): PerformanceMetric[]  { const allMetrics: PerformanceMetric[] = [];

    for (const [key, metrics] of this.metrics.entries()) {
      for (const metric of metrics) {
        if (type && metric.type !== type) continue;
        if (componentName && metric.componentName !== componentName) continue;
        allMetrics.push(metric)
}
    }

    return allMetrics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
}

// 导出单例实例
export const performanceMonitoringService = PerformanceMonitoringService.getInstance();