import { Badge   } from '@/components/ui/badge';
import {
  BarChart3, Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { createLogger   } from '@/lib/logger';
import { Progress   } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger   } from '@/components/ui/tabs';
import React, { useState,
import { ComponentPerformanceState   } from './PerformanceMonitor';

/**
* 文件级注释：高级技能分析组件
*
* 该文件实现了一个综合的技能分析组件，提供：
* - 技能使用统计和趋势分析
* - 效果持续时间分析
* - 技能效率评估
* - 使用模式识别
* - 性能影响分析
* - 优化建议生成
*
* 主要功能：
* - 实时数据可视化
* - 智能分析算法
* - 交互式图表展示
* - 详细的统计报告
* - 性能优化建议
* - 历史数据对比
*
* @author SOLO Coding
* @version 2.0.0
 */

  useEffect,
  useMemo,
  useCallback,
  memo  } from 'react';
  PieChart,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Zap,
  Activity,
  Award,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Users,
  Layers  } from 'lucide-react';

const logger = createLogger('advanced-skill-analytics');

/**
 * 接口注释：技能数据
 */
export interface SkillData { uses: Array< {
    skillName: string;
    timestamp: number;
    target?: string;
    success: boolean;
    duration?: number
}>;
  targets: Array<{ id: string;
    effectType: string;
    isActive: boolean;
    remainingTime: number;
    maxTime: number;
    stackCount?: number
}>
}

/**
 * 接口注释：技能统计
 */
export interface SkillStats  { totalUses: number;
  activeEffects: number;
  queuedEffects: number;
  conflictCount: number;
  successRate?: number;
  averageDuration?: number
}

/**
* 接口注释：高级技能分析属性
 */
export interface AdvancedSkillAnalyticsProps  { /** 技能数据 */
  skillData: SkillData;
  /** 技能统计 */
  stats: SkillStats;
  /** 性能状态 */
  performanceState: ComponentPerformanceState;
  /** 时间范围（小时） */
  timeRange?: number;
  /** 是否显示详细分析 */
  showDetailedAnalysis?: boolean
}

/**
 * 接口注释：分析结果
 */
interface AnalysisResult  {
  efficiency: {
    score: number;
    grade: string;
    description: string
}
  usage: { frequency: number;
    pattern: string;
    peakHours: number[]
};
  effects: { averageDuration: number;
    successRate: number;
    mostUsedType: string
};
  performance: { impact: 'low' | 'medium' | 'high';
    recommendations: string[]
}
}

/**
 * 接口注释：时间段统计
 */
interface TimeSlotStats  { hour: number;
  uses: number;
  successRate: number;
  averageDuration: number
}

/**
 * 接口注释：效果类型统计
 */
interface EffectTypeStats  { type: string;
  count: number;
  successRate: number;
  averageDuration: number;
  percentage: number
}

/**
* 类级注释：高级技能分析组件
*
* 实现全面的技能数据分析，包含：
* - 多维度数据分析
* - 可视化图表展示
* - 智能洞察生成
* - 性能影响评估
* - 优化建议提供
 */
const AdvancedSkillAnalytics = memo<AdvancedSkillAnalyticsProps>(( { skillData,
  stats,
  performanceState,
  timeRange = 24,
  showDetailedAnalysis = true
}) => { const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  /**
 * 函数级注释：过滤时间范围内的数据
 */
const filteredData = useMemo(() =>  {
    const cutoffTime = Date.now() - (selectedTimeRange * 60 * 60 * 1000);

    return {
      uses: skillData.uses.filter(use => use.timestamp >= cutoffTime),
      targets: skillData.targets // 当前效果不需要时间过滤 
}
}, [skillData, selectedTimeRange]);

  /**
 * 函数级注释：计算时间段统计
 */
const timeSlotStats = useMemo((): TimeSlotStats[] => { const slots: { [hour: number]: { uses: number; successes: number; totalDuration: number  
} } =  {};
    // 初始化24小时时间段
    for (let i = 0; i < 24; i++) { slots[i] = { uses: 0, successes: 0, totalDuration: 0  
}
}

    // 统计每小时的使用情况
    filteredData.uses.forEach(use => { const hour = new Date(use.timestamp).getHours();
      slots[hour].uses++;
      if (use.success) {
        slots[hour].successes++
}
      if (use.duration) { slots[hour].totalDuration += use.duration
}
    });

    // 转换为数组格式
    return Object.entries(slots).map(([hour, data]) => ({ hour: parseInt(hour),
      uses: data.uses,
      successRate: data.uses > 0 ? (data.successes / data.uses) * 100 : 0,
      averageDuration: data.uses > 0 ? data.totalDuration / data.uses : 0 
}))
}, [filteredData.uses]);

  /**
 * 函数级注释：计算效果类型统计
 */
const effectTypeStats = useMemo((): EffectTypeStats[] => { const typeMap: { [type: string]: { count: number; successes: number; totalDuration: number  
} } =  {};
    // 统计当前活跃效果
    filteredData.targets.forEach(target => { if (!typeMap[target.effectType]) {
        typeMap[target.effectType] = { count: 0, successes: 0, totalDuration: 0  
}
}
      typeMap[target.effectType].count++;
      if (target.isActive) { typeMap[target.effectType].successes++
}
      typeMap[target.effectType].totalDuration += target.maxTime - target.remainingTime
});

    const totalCount = Object.values(typeMap).reduce((sum, data) => sum + data.count, 0);

    return Object.entries(typeMap).map(([type, data]) => ({ type,
      count: data.count,
      successRate: data.count > 0 ? (data.successes / data.count) * 100 : 0,
      averageDuration: data.count > 0 ? data.totalDuration / data.count : 0,
      percentage: totalCount > 0 ? (data.count / totalCount) * 100 : 0 
})).sort((a, b) => b.count - a.count)
}, [filteredData.targets]);

  /**
 * 函数级注释：计算效率评分
 */
const calculateEfficiencyScore = useCallback((): number =>  {
  let score = 100;
    // 成功率影响 (40%)
    const successRate = stats.successRate || 0;
    score -= (100 - successRate) * 0.4;

    // 使用频率影响 (20%)
    const usageFrequency = filteredData.uses.length / selectedTimeRange;
    const optimalFrequency = 2; // 每小时2次为最优
    const frequencyScore = Math.min(100, (usageFrequency / optimalFrequency) * 100);
    score = score * 0.8 + frequencyScore * 0.2;

    // 效果持续时间影响 (20%)
    const avgDuration = stats.averageDuration || 0;
    const optimalDuration = 30000; // 30秒为最优
    const durationScore = Math.min(100, (avgDuration / optimalDuration) * 100);
    score = score * 0.8 + durationScore * 0.2;

    // 性能影响 (20%)
    const performanceScore = Math.max(0, 100 - (performanceState.averageRenderTime / 16) * 100);
    score = score * 0.8 + performanceScore * 0.2;

    return Math.max(0, Math.min(100, score))

}, [stats, filteredData.uses.length, selectedTimeRange, performanceState.averageRenderTime]);

  /**
 * 函数级注释：生成分析结果
 */
const generateAnalysisResult = useCallback((): AnalysisResult =>  { const efficiencyScore = calculateEfficiencyScore();
    // 效率等级
    let grade = 'F';
    let description = '需要大幅改进';
    if (efficiencyScore >= 90) { grade = 'A'; description = '优秀'
}
    else if (efficiencyScore >= 80) { grade = 'B'; description = '良好'
}
    else if (efficiencyScore >= 70) { grade = 'C'; description = '一般'
}
    else if (efficiencyScore >= 60) { grade = 'D'; description = '较差'
}

    // 使用模式分析
    const peakHours = timeSlotStats;
    .filter(slot => slot.uses > 0);
    .sort((a, b) => b.uses - a.uses);
    .slice(0, 3)
    .map(slot => slot.hour);

    const usageFrequency = filteredData.uses.length / selectedTimeRange;
    let pattern = '低频使用';
    if (usageFrequency > 3) pattern = '高频使用';
    else if (usageFrequency > 1) pattern = '中频使用';

    // 效果分析
    const successRate = stats.successRate || 0;
    const averageDuration = stats.averageDuration || 0;
    const mostUsedType = effectTypeStats[0]?.type || '无';

    // 性能影响评估
    let performanceImpact: 'low' | 'medium' | 'high' = 'low';
    const recommendations: string[] = [];

    if (performanceState.averageRenderTime > 16) { performanceImpact = 'high';
      recommendations.push('优化渲染性能，减少重复渲染')
} else if (performanceState.averageRenderTime > 8) { performanceImpact = 'medium';
      recommendations.push('考虑使用 React.memo 优化组件')
}

    if (performanceState.memoryUsage > 50 * 1024 * 1024) { recommendations.push('清理未使用的缓存和订阅')
}

    if (successRate < 80) { recommendations.push('检查技能使用条件和时机')
}

    if (usageFrequency > 5) { recommendations.push('考虑合并相似的技能操作')
}

    return { efficiency: {
        score: efficiencyScore,
        grade,
        description },
      usage: { frequency: usageFrequency,
        pattern,
        peakHours },
      effects: { averageDuration,
        successRate,
        mostUsedType },
      performance: { impact: performanceImpact,
        recommendations }
    }
}, [calculateEfficiencyScore,
    timeSlotStats,
    filteredData.uses.length,
    selectedTimeRange,
    stats,
    effectTypeStats,
    performanceState ]);

  /**
 * 函数级注释：获取效果类型颜色
 */
const getEffectTypeColor = useCallback((type: string) => { const colors =  {
      'elimination': 'bg-red-500',
      'protection': 'bg-blue-500',
      'investigation': 'bg-yellow-500',
      'status_change': 'bg-purple-500',
      'passive': 'bg-green-500'  
};
    return colors[type as keyof typeof colors] || 'bg-gray-500'
}, []);

  /**
 * 函数级注释：格式化时间
 */
const formatDuration = useCallback((ms: number) => { if (ms < 1000) return `$ {ms 
}ms`;
    if (ms < 60000) return `${ (ms / 1000).toFixed(1) }s`;
    return `${ (ms / 60000).toFixed(1) }m`
}, []);

  /**
 * 函数级注释：导出分析报告
 */
const exportAnalysisReport = useCallback(() =>  { if (!analysisResult) return;
    const report = {
      timestamp: new Date().toISOString(),
      timeRange: selectedTimeRange,
      analysis: analysisResult,
      rawData: {
        stats,
        timeSlotStats,
        effectTypeStats,
        performanceState }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json'  
});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill-analysis-${ Date.now() }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    logger.info('分析报告已导出', { timeRange: selectedTimeRange  
})
}, [analysisResult, selectedTimeRange, stats, timeSlotStats, effectTypeStats, performanceState]);

  // 生成分析结果
  useEffect(() => {
  const result = generateAnalysisResult();
    setAnalysisResult(result)

}, [generateAnalysisResult]);

  if (!analysisResult) { return (;
      <Card className='bg-werewolf-card border-werewolf-purple/30'>;
      <CardContent className='flex items-center justify-center py-8'>;
      <div className='text-center'>;
      <RefreshCw className='w-8 h-8 animate-spin mx-auto mb-2' />;
      <p className='text-sm text-muted-foreground'>正在分析数据...</p>;
      </div>
      </CardContent>
      </Card>
    )
}

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader>
    <div className='flex items-center justify-between'>;
    <CardTitle className='flex items-center gap-2'>;
    <BarChart3 className='w-5 h-5' />;
    技能分析报告
    <Badge variant='outline' className={ analysisResult.efficiency.grade === 'A' ? 'border-green-500 text-green-500' : unknown;
      analysisResult.efficiency.grade === 'B' ? 'border-blue-500 text-blue-500' : unknown;
      analysisResult.efficiency.grade === 'C' ? 'border-yellow-500 text-yellow-500' : unknown;
      'border-red-500 text-red-500' }>
    { analysisResult.efficiency.grade } - { analysisResult.efficiency.description }
    </Badge>
    </CardTitle>
    <div className='flex items-center gap-2'>;
    <select
    value={ selectedTimeRange }
    onChange={ e => setSelectedTimeRange(Number(e.target.value)) }
    className='text-sm bg-werewolf-dark border border-werewolf-purple/30 rounded px-2 py-1';
    >
    <option value={ 1 }>1小时</option>;
    <option value={ 6 }>6小时</option>;
    <option value={ 24 }>24小时</option>;
    <option value={ 168 }>7天</option>;
    </select>
    <Button
    variant='outline';
    size='sm';
    onClick={ exportAnalysisReport }
    className='flex items-center gap-1';
    >
    <Download className='w-4 h-4' />;
    导出
    </Button>
    </div>
    </div>
    </CardHeader>
    <CardContent>
    <Tabs value={ activeTab } onValueChange={ setActiveTab }>;
    <TabsList className='grid w-full grid-cols-4'>;
    <TabsTrigger value='overview'>概览</TabsTrigger>;
    <TabsTrigger value='usage'>使用分析</TabsTrigger>;
    <TabsTrigger value='effects'>效果分析</TabsTrigger>;
    <TabsTrigger value='performance'>性能影响</TabsTrigger>;
    </TabsList>

    { /*  概览标签页  */ }
    <TabsContent value='overview' className='space-y-4'>;
    { /*  效率评分  */ }
    <div className='text-center p-6 bg-werewolf-dark/40 rounded-lg'>;
    <div className='text-4xl font-bold mb-2 text-werewolf-purple'>;
    { Math.round(analysisResult.efficiency.score) }
    </div>
    <div className='text-lg font-medium mb-1'>效率评分</div>;
    <div className='text-sm text-muted-foreground'>;
    { analysisResult.efficiency.description }
    </div>
    <Progress
    value={ analysisResult.efficiency.score }
    className='mt-4 h-3';
    />
    </div>

    { /*  关键指标  */ }
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>;
    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-2'>;
    <Target className='w-5 h-5 text-green-500' />;
    </div>
    <div className='text-xl font-bold'>{ Math.round(analysisResult.effects.successRate) }%</div>;
    <div className='text-xs text-muted-foreground'>成功率</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-2'>;
    <Activity className='w-5 h-5 text-blue-500' />;
    </div>
    <div className='text-xl font-bold'>{ analysisResult.usage.frequency.toFixed(1) }</div>;
    <div className='text-xs text-muted-foreground'>每小时使用次数</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-2'>;
    <Clock className='w-5 h-5 text-yellow-500' />;
    </div>
    <div className='text-xl font-bold'>;
    { formatDuration(analysisResult.effects.averageDuration) }
    </div>
    <div className='text-xs text-muted-foreground'>平均持续时间</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='flex items-center justify-center gap-1 mb-2'>;
    <Zap className='w-5 h-5 text-purple-500' />;
    </div>
    <div className='text-xl font-bold'>{ stats.activeEffects }</div>;
    <div className='text-xs text-muted-foreground'>活跃效果</div>;
    </div>
    </div>

    { /*  使用模式  */ }
    <div className='space-y-2'>;
    <h4 className='font-medium'>使用模式</h4>;
    <div className='flex items-center gap-4 text-sm'>;
    <span>模式: <Badge variant='outline'>{ analysisResult.usage.pattern 
}</Badge></span>;
    <span>高峰时段: { analysisResult.usage.peakHours.map(h => `${h 
}:00`).join(', ')}</span>;
    <span>最常用效果: <Badge variant='outline'>{ analysisResult.effects.mostUsedType 
}</Badge></span>;
    </div>
    </div>
    </TabsContent>

    { /*  使用分析标签页  */ }
    <TabsContent value='usage' className='space-y-4'>;
    <div className='space-y-4'>;
    <h4 className='font-medium flex items-center gap-2'>;
    <Calendar className='w-4 h-4' />;
    24小时使用分布
    </h4>

    { /*  时间段使用图表  */ }
    <div className='grid grid-cols-12 gap-1'>;
    { timeSlotStats.map(slot => (;
      <div key={slot.hour } className='text-center'>;
      <div
      className='bg-werewolf-purple/20 rounded mb-1 transition-all hover:bg-werewolf-purple/40';
      style={ {
        height: `${Math.max(4, (slot.uses / Math.max(...timeSlotStats.map(s => s.uses))) * 60) }px`
}}
      title={ `${slot.hour }: 00 - 使用${ slot.uses 
}次，成功率${ slot.successRate.toFixed(1) }%`}
      />
      <div className='text-xs text-muted-foreground'>{ slot.hour }</div>;
      </div>
    ))}
    </div>

    { /*  详细统计  */ }
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>;
    <div className='space-y-2'>;
    <h5 className='font-medium text-sm'>使用频率</h5>;
    <div className='text-sm space-y-1'>;
    <div className='flex justify-between'>;
    <span>总使用次数:</span>
    <span>{ filteredData.uses.length }</span>
    </div>
    <div className='flex justify-between'>;
    <span>平均每小时:</span>
    <span>{ analysisResult.usage.frequency.toFixed(1) }次</span>
    </div>
    <div className='flex justify-between'>;
    <span>使用模式:</span>
    <span>{ analysisResult.usage.pattern }</span>
    </div>
    </div>
    </div>

    <div className='space-y-2'>;
    <h5 className='font-medium text-sm'>成功率分析</h5>;
    <div className='text-sm space-y-1'>;
    <div className='flex justify-between'>;
    <span>总体成功率:</span>
    <span>{ Math.round(analysisResult.effects.successRate) }%</span>
    </div>
    <div className='flex justify-between'>;
    <span>最佳时段:</span>
    <span>
    { timeSlotStats
    .filter(s => s.uses > 0);
    .sort((a, b) => b.successRate - a.successRate)[0]?.hour || 0 }:00;
    </span>
    </div>
    </div>
    </div>

    <div className='space-y-2'>;
    <h5 className='font-medium text-sm'>高峰时段</h5>;
    <div className='text-sm space-y-1'>;
    { analysisResult.usage.peakHours.slice(0, 3).map((hour, index) => (;
      <div key={hour } className='flex justify-between'>;
      <span>第{ index + 1 }高峰:</span>
      <span>{ hour }:00</span>
      </div>
    ))}
    </div>
    </div>
    </div>
    </div>
    </TabsContent>

    { /*  效果分析标签页  */ }
    <TabsContent value='effects' className='space-y-4'>;
    <div className='space-y-4'>;
    <h4 className='font-medium flex items-center gap-2'>;
    <Layers className='w-4 h-4' />;
    效果类型分布
    </h4>

    { /*  效果类型统计  */ }
    <div className='space-y-3'>;
    { effectTypeStats.map(effect => (;
      <div key={effect.type } className='space-y-2'>;
      <div className='flex items-center justify-between'>;
      <div className='flex items-center gap-2'>;
      <div className={ `w-3 h-3 rounded ${getEffectTypeColor(effect.type) }`} />;
      <span className='font-medium'>{ effect.type }</span>;
      <Badge variant='outline'>{ effect.count }次</Badge>;
      </div>
      <span className='text-sm text-muted-foreground'>;
      { effect.percentage.toFixed(1) }%
      </span>
      </div>
      <div className='space-y-1'>;
      <Progress value={ effect.percentage } className='h-2' />;
      <div className='flex justify-between text-xs text-muted-foreground'>;
      <span>成功率: { effect.successRate.toFixed(1) 
}%</span>
      <span>平均时长: { formatDuration(effect.averageDuration) 
}</span>
      </div>
      </div>
      </div>
    ))}
    </div>

    { /*  当前活跃效果  */ }
    <div className='space-y-2'>;
    <h5 className='font-medium flex items-center gap-2'>;
    <Activity className='w-4 h-4' />;
    当前活跃效果 ({ stats.activeEffects })
    </h5>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>;
    { filteredData.targets
    .filter(target => target.isActive);
    .slice(0, 6)
    .map(target => (;
      <div key={target.id } className='p-3 bg-werewolf-dark/40 rounded'>;
      <div className='flex items-center justify-between mb-1'>;
      <span className='text-sm font-medium'>{ target.effectType }</span>;
      { target.stackCount && target.stackCount > 1 && (
        <Badge variant='secondary' className='text-xs'>;
        x{target.stackCount }
        </Badge>
      )}
      </div>
      <div className='space-y-1'>;
      <Progress
      value={ (target.remainingTime / target.maxTime) * 100 }
      className='h-1';
      />
      <div className='text-xs text-muted-foreground'>;
      剩余: { formatDuration(target.remainingTime) 
}
      </div>
      </div>
      </div>
    ))}
    </div>
    </div>
    </div>
    </TabsContent>

    { /*  性能影响标签页  */ }
    <TabsContent value='performance' className='space-y-4'>;
    <div className='space-y-4'>;
    <div className='flex items-center gap-2'>;
    <h4 className='font-medium'>性能影响评估</h4>;
    <Badge variant={ analysisResult.performance.impact === 'high' ? 'destructive' : unknown;
      analysisResult.performance.impact === 'medium' ? 'default' : 'secondary'
}>
    { analysisResult.performance.impact === 'high' ? '高影响' : unknown;
    analysisResult.performance.impact === 'medium' ? '中影响' : '低影响' 
}
    </Badge>
    </div>

    { /*  性能指标  */ }
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>;
    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='text-lg font-bold'>;
    { Math.round(performanceState.averageRenderTime) }ms
    </div>
    <div className='text-xs text-muted-foreground'>平均渲染时间</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='text-lg font-bold'>;
    { Math.round(performanceState.memoryUsage / 1024 / 1024) }MB
    </div>
    <div className='text-xs text-muted-foreground'>内存使用</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='text-lg font-bold'>;
    { Math.round(performanceState.cacheHitRate * 100) }%
    </div>
    <div className='text-xs text-muted-foreground'>缓存命中率</div>;
    </div>

    <div className='text-center p-4 bg-werewolf-dark/40 rounded'>;
    <div className='text-lg font-bold'>;
    { performanceState.subscriptionCount }
    </div>
    <div className='text-xs text-muted-foreground'>活跃订阅</div>;
    </div>
    </div>

    { /*  优化建议  */ }
    <div className='space-y-3'>;
    <h5 className='font-medium'>优化建议</h5>;
    { analysisResult.performance.recommendations.length === 0 ? (;
      <div className='flex items-center gap-2 text-green-500'>;
      <CheckCircle className='w-4 h-4' />;
      <span className='text-sm'>当前性能表现良好，无需特别优化</span>;
      </div>
    ) : (analysisResult.performance.recommendations.map((recommendation, index) => (;
        <div key={index } className='flex items-start gap-2 p-3 bg-werewolf-dark/40 rounded'>;
        <AlertCircle className='w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0' />;
        <span className='text-sm'>{ recommendation }</span>;
        </div>
      ))
    )}
    </div>

    { /*  性能趋势  */ }
    <div className='space-y-2'>;
    <h5 className='font-medium'>性能趋势</h5>;
    <div className='text-sm text-muted-foreground'>;
    基于当前数据，技能系统对整体性能的影响为
    <Badge variant='outline' className='ml-1'>;
    { analysisResult.performance.impact === 'high' ? '高影响' : unknown;
    analysisResult.performance.impact === 'medium' ? '中影响' : '低影响' 
}
    </Badge>
    。建议定期监控性能指标并根据使用情况调整优化策略。
    </div>
    </div>
    </div>
    </TabsContent>
    </Tabs>
    </CardContent>
    </Card>
  )
});

// 设置 displayName 以便调试
AdvancedSkillAnalytics.displayName = 'AdvancedSkillAnalytics';

/**
 * AdvancedSkillAnalytics组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default AdvancedSkillAnalytics;