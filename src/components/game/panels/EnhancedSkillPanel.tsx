import { Alert, AlertDescription   } from '@/components/ui/alert';
import { Badge   } from '@/components/ui/badge';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { Progress   } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue   } from '@/components/ui/select';
import { Separator   } from '@/components/ui/separator';
import { skillConfigs   } from '@/data/skillConfigs';
import {
  Skull, Shield, Search, Zap, Clock, Target, Info, CheckCircle, Tabs, TabsContent, TabsList, TabsTrigger   } from '@/components/ui/tabs';
import { useEnhancedSkillSystem   } from '@/hooks/useEnhancedSkillSystem';
import { useEnhancedSkillSystemFixes   } from '@/utils/performanceCriticalFixes';
import { useMemoryManager   } from '@/hooks/useMemoryManager';
import { usePerformanceOptimization   } from '@/hooks/usePerformanceOptimizationNew';
import { useWitchPotionManager   } from '@/hooks/useWitchPotionManager';
import React, { useState, useCallback, useMemo, useEffect, useRef   } from 'react';
import type { RoleDesign, GameState, Player   } from '@/types/game';

/**
* 文件级注释：增强的技能面板组件（性能优化版）
* 集成性能优化、内存泄漏预防、React.memo 和 useCallback
* 解决组件渲染频繁、内存使用过高和缓存效率低的问题
*
* 性能优化策略：
* 1. 使用 React.memo 和深度比较避免不必要的重新渲染
* 2. 使用 useMemo 和 useCallback 优化计算和回调函数
* 3. 实施智能缓存策略减少重复计算
* 4. 优化状态更新频率和批处理
* 5. 实施内存监控和自动清理机制
 */
  XCircle, AlertTriangle, Loader2, Settings, RefreshCw  } from 'lucide-react';

/**
* 接口注释：增强技能面板属性接口
* 定义组件所需的所有属性和回调函数
 */
export interface EnhancedSkillPanelProps  { /** 房间ID */
  roomId: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 用户ID */
  userId?: string;
  /** 角色设计配置 */
  roleDesign: RoleDesign;
  /** 角色状态 */
  roleState: any;
  /** 当前阶段 */
  currentPhase: string;
  /** 当前轮次 */
  currentRound: number;
  /** 是否为法官 */
  isJudge?: boolean;
  /** 可用目标列表 */
  availableTargets: Player[];
  /** 游戏状态 */
  gameState?: GameState
}

/**
 * 接口注释：组件内部状态接口
 */
interface ComponentState  { selectedTarget: string;
  lastUpdateTime: number;
  renderCount: number
}

/**
* 函数级注释：深度比较函数
* 用于 React.memo 的比较函数，避免不必要的重新渲染
 */
const arePropsEqual = (prevProps: EnhancedSkillPanelProps, nextProps: EnhancedSkillPanelProps): boolean =>  { // 基础属性比较
  if (
    prevProps.roomId !== nextProps.roomId ||;
    prevProps.gameStateId !== nextProps.gameStateId ||;
    prevProps.userId !== nextProps.userId ||;
    prevProps.currentPhase !== nextProps.currentPhase ||;
    prevProps.currentRound !== nextProps.currentRound ||;
    prevProps.isJudge !== nextProps.isJudge;
  ) {
    return false
}

  // 角色设计比较
  if (
    prevProps.roleDesign.skill_name !== nextProps.roleDesign.skill_name ||;
    prevProps.roleDesign.skill_description !== nextProps.roleDesign.skill_description;
  ) { return false
}

  // 可用目标比较（只比较长度和关键属性）
  if (prevProps.availableTargets.length !== nextProps.availableTargets.length) { return false
}

  for (let i = 0; i < prevProps.availableTargets.length; i++) { const prev = prevProps.availableTargets[i];
    const next = nextProps.availableTargets[i];
    if (prev.userId !== next.userId || prev.roleStatus !== next.roleStatus) {
      return false
}
  }

  return true
};

/**
* 类级注释：增强的技能面板组件（性能优化版）
* 提供技能使用、效果管理、统计信息和法官管理功能
* 集成全面的性能优化和内存管理机制
 */
const EnhancedSkillPanel = React.memo<EnhancedSkillPanelProps>(( { roomId,
  gameStateId,
  userId,
  roleDesign,
  roleState,
  currentPhase,
  currentRound,
  isJudge = false,
  availableTargets,
  gameState }) => { // 性能修复 Hook
  const performanceFixes = useEnhancedSkillSystemFixes();

  // 性能优化 Hook
  const optimizer = usePerformanceOptimization({
    componentName: 'EnhancedSkillPanel',
    enableMemoryTracking: true,
    enableRenderTracking: true,
    debounceTime: 200 // 增加防抖时间以减少渲染频率 
});

  // 内存管理 Hook
  const memoryManager = useMemoryManager({ componentName: 'EnhancedSkillPanel',
    maxMemoryThreshold: 20, // 降低内存阈值
    enableAutoCleanup: true 
});

  // 增强技能系统 Hook
  const { useSkillEnhanced,
    resolveSkillConflicts,
    getSkillSuggestion,
    getUserSkillData,
    stats,
    loading,
    optimizeCache,
    getPerformanceMetrics,
    getCacheStats } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 女巫药水管理（仅女巫角色）
  const { loading: potionLoading 
} = useWitchPotionManager(;
    roleDesign.skill_name === 'witch' ? gameStateId : undefined,
    userId
  );

  // 组件状态 - 使用 useRef 避免不必要的重新渲染
  const stateRef = useRef<ComponentState>({ selectedTarget: '',
    lastUpdateTime: Date.now(),
    renderCount: 0 
});

  const [selectedTarget, setSelectedTarget] = useState('');

  // 渲染计数器
  useEffect(() => {
  stateRef.current.renderCount++;
    stateRef.current.lastUpdateTime = Date.now()

});

  // 缓存技能配置 - 使用 useMemo 和智能缓存
  const skillConfig = useMemo(() => { const cacheKey = `skill_config_${roleDesign.skill_name }`;

    // 尝试从性能修复缓存获取
    return performanceFixes.cacheManager.get(;
      cacheKey,
      async () => {
  const config = skillConfigs[roleDesign.skill_name as keyof typeof skillConfigs];
        return config || null
},
      600000 // 10分钟缓存
    )

}, [roleDesign.skill_name, performanceFixes.cacheManager]);

  // 缓存技能建议 - 使用防抖和智能缓存
  const suggestion = useMemo(() => { if (!skillConfig || !getSkillSuggestion) return null;

    const cacheKey = `skill_suggestion_${gameStateId }_${ currentPhase }_${ currentRound }_${ availableTargets.length }`;

    return performanceFixes.cacheManager.get(;
      cacheKey,
      async () => {
  return getSkillSuggestion(;
          skillConfig.englishName,
          currentPhase,
          currentRound,
          availableTargets
        )
},
      60000 // 1分钟缓存
    )

}, [skillConfig, getSkillSuggestion, gameStateId, currentPhase, currentRound, availableTargets.length, performanceFixes.cacheManager]);

  // 缓存用户技能数据 - 使用智能缓存
  const userSkillData = useMemo(() => { if (!userId || !getUserSkillData) return {
    uses: [], targets: []   
};

    const cacheKey = `user_skill_data_${ userId }_${ gameStateId }`;

    return performanceFixes.cacheManager.get(;
      cacheKey,
      async () => {
  return getUserSkillData(userId)
},
      30000 // 30秒缓存
    )

}, [userId, getUserSkillData, gameStateId, performanceFixes.cacheManager]);

  /**
  * 函数级注释：优化的技能使用处理函数
  * - 使用性能修复的渲染优化器
  * - 集成错误处理和性能监控
  * - 自动清理缓存以保持数据一致性
   */
  const handleUseSkill = useCallback(;
    performanceFixes.renderOptimizer(async () => { if (!skillConfig || !useSkillEnhanced) return;

      try {
        const result = await useSkillEnhanced(;
          skillConfig.englishName,
          selectedTarget || undefined,
          { },
          roleState,
          roleDesign,
          currentPhase,
          currentRound
        );

        if (result) { setSelectedTarget('');
          // 清理相关缓存
          performanceFixes.cacheManager.invalidate('skill_suggestion');
          performanceFixes.cacheManager.invalidate('user_skill_data');
          optimizeCache?.()
}
      } catch (error) { console.error('技能使用失败:', error)
}
    }),
    [skillConfig,
      useSkillEnhanced,
      selectedTarget,
      roleState,
      roleDesign,
      currentPhase,
      currentRound,
      performanceFixes.renderOptimizer,
      performanceFixes.cacheManager,
      optimizeCache ]
  );

  /**
  * 函数级注释：优化的冲突解决处理（法官专用）
  * - 使用性能修复的渲染优化器
  * - 仅法官可用的功能
   */
  const handleResolveConflicts = useCallback(;
    performanceFixes.renderOptimizer(async () => {
  if (!isJudge || !resolveSkillConflicts) return;
      await resolveSkillConflicts(currentRound)

}),
    [isJudge, resolveSkillConflicts, currentRound, performanceFixes.renderOptimizer]
  );

  /**
  * 函数级注释：获取效果图标（缓存优化版）
  * - 使用智能缓存减少重复计算
  * - 预定义图标映射提高性能
   */
const getEffectIcon = useCallback((effectType: string) => { const iconMap =  {
      'elimination': <Skull className='w-4 h-4' />,
      'protection': <Shield className='w-4 h-4' />,
      'investigation': <Search className='w-4 h-4' />,
      'status_change': <Zap className='w-4 h-4' />,
      'passive': <Clock className='w-4 h-4' />,
      'default': <Target className='w-4 h-4' />
};

    return iconMap[effectType as keyof typeof iconMap] || iconMap.default
}, []);

  /**
  * 函数级注释：获取优先级颜色（缓存优化版）
  * - 使用预定义映射提高性能
   */
const getPriorityColor = useCallback((priority: 'high' | 'medium' | 'low') => { const colorMap =  {
      'high': 'bg-red-500',
      'medium': 'bg-yellow-500',
      'low': 'bg-green-500'  
};

    return colorMap[priority] || 'bg-gray-500'
}, []);

  /**
  * 函数级注释：获取状态图标（缓存优化版）
  * - 使用预定义映射提高性能
   */
const getStatusIcon = useCallback((status: string) => { const iconMap =  {
      'completed': <CheckCircle className='w-4 h-4 text-green-500' />,
      'pending': <Clock className='w-4 h-4 text-yellow-500' />,
      'cancelled': <XCircle className='w-4 h-4 text-red-500' />,
      'failed': <AlertTriangle className='w-4 h-4 text-red-500' />,
      'default': <Info className='w-4 h-4 text-gray-500' />
};

    return iconMap[status as keyof typeof iconMap] || iconMap.default
}, []);

  /**
  * 函数级注释：优化的缓存清理函数
  * - 批量清理缓存以提高性能
   */
const handleOptimizeCache = useCallback(() =>  { performanceFixes.cacheManager.invalidate();
    optimizeCache?.();

    // 强制垃圾回收（如果可用）
    if (typeof window !== 'undefined' && 'gc' in window) {
      (window as any).gc()
}
  }, [performanceFixes.cacheManager, optimizeCache]);

  // 性能监控和内存清理 - 优化版
  useEffect(() => { const interval = setInterval(() => {
      // 检查渲染频率
      const renderCount = stateRef.current.renderCount;
      if (renderCount > 10) { // 如果渲染次数过多
      console.warn('EnhancedSkillPanel 渲染频率过高:', renderCount);
      stateRef.current.renderCount = 0; // 重置计数器 }

    // 定期清理过期缓存
    performanceFixes.cacheManager.invalidate();

    // 检查内存使用情况
    const resourceStats = memoryManager.getResourceStats();
    if (resourceStats.memoryUsage > 15 * 1024 * 1024) { // 15MB
    memoryManager.forceCleanup();
    handleOptimizeCache()
}
}, 30000); // 每30秒检查一次

const cleanup = memoryManager.registerInterval(interval);
return cleanup
}, [performanceFixes.cacheManager, memoryManager, handleOptimizeCache]);

// 组件卸载时清理资源
useEffect(() => { return () => {
  performanceFixes.cacheManager.invalidate();
    memoryManager.forceCleanup()
}

}, [performanceFixes.cacheManager, memoryManager]);

// 如果技能配置不存在，显示提示信息
if (!skillConfig) { return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30'>;
    <CardHeader>
    <CardTitle>技能面板</CardTitle>
    </CardHeader>
    <CardContent>
    <Alert>
    <Info className='w-4 h-4' />;
    <AlertDescription>
    当前角色没有可用技能或技能配置未找到
    </AlertDescription>
    </Alert>
    </CardContent>
    </Card>
  )
}

return (;
  <div className='space-y-4'>;
  { /*  技能信息概览  */ }
  <Card className='bg-werewolf-card border-werewolf-purple/30'>;
  <CardHeader>
  <CardTitle className='flex items-center gap-2 text-werewolf-purple'>;
  { getEffectIcon(skillConfig.effectType[0]) }
  { skillConfig.chineseName }
  <Badge variant='outline' className='ml-auto'>;
  优先级: { skillConfig.priority 
}
  </Badge>
  </CardTitle>
  </CardHeader>
  <CardContent className='space-y-4'>;
  { /*  技能描述  */ }
  <div>
  <p className='text-sm text-muted-foreground mb-2'>;
  { roleDesign.skill_description }
  </p>
  <div className='flex flex-wrap gap-2'>;
  <Badge variant='secondary'>;
  { skillConfig.phase }阶段
  </Badge>
  <Badge variant='secondary'>;
  { skillConfig.usageLimit === 'unlimited' ? '无限使用' : `${skillConfig.usageLimit 
}次`}
  </Badge>
  { skillConfig.effectType.map((type, index) => (;
    <Badge key={index } variant='outline'>;
    { type }
    </Badge>
  ))}
  { skillConfig.isPassive && (
    <Badge variant='destructive'>被动技能</Badge>;
  ) }
  </div>
  </div>

  { /*  使用建议  */
} { suggestion && (
    <Alert className={`border-l-4 ${getPriorityColor(suggestion.priority) } border-l-4`}>;
    <AlertTriangle className='w-4 h-4' />;
    <AlertDescription>
    <div className='space-y-1'>;
    <div className='font-medium'>使用建议</div>;
    <div className='text-sm'>{ suggestion.suggestion }</div>;
    <div className='text-xs text-muted-foreground'>;
    适用时机: { suggestion.timing 
}
    </div>
    </div>
    </AlertDescription>
    </Alert>
  )}

  { /*  技能使用界面  */
} { suggestion?.canUse ? (
    <div className='space-y-3'>;
    {/*  目标选择  */
} { skillConfig.targetType === 'single' && (;
      <div>
      <label className='text-sm font-medium text-gray-300 mb-2 block'>;
      选择目标
      </label>
      <Select value={selectedTarget } onValueChange={ setSelectedTarget }>;
      <SelectTrigger className='bg-werewolf-dark border-werewolf-purple/30'>;
      <SelectValue placeholder='请选择目标玩家' />;
      </SelectTrigger>
      <SelectContent>
      { availableTargets.map(player => (;
        <SelectItem key={player.userId } value={ player.userId }>;
        { player.name }
        <Badge variant='outline' className='ml-2'>;
        状态: { player.roleStatus === 1 ? '正常' : unknown;
        player.roleStatus === 2 ? '濒死' : unknown;
        player.roleStatus === 3 ? '虚弱' : '淘汰' 
}
        </Badge>
        </SelectItem>
      ))}
      </SelectContent>
      </Select>
      </div>
    )}

    { /*  使用按钮  */ }
    <Button
    onClick={ handleUseSkill }
    disabled={ loading ||
      potionLoading ||
      (skillConfig.targetType === 'single' && !selectedTarget)
}
    className='w-full bg-werewolf-purple hover:bg-werewolf-purple/80';
    >
    { loading ? (
      <>
      <Loader2 className='w-4 h-4 mr-2 animate-spin' />;
      使用中...
      </>
    ) : (
      `使用 ${skillConfig.chineseName }`
    )}
    </Button>
    </div>
  ) : (
    <Alert variant='destructive'>;
    <XCircle className='w-4 h-4' />;
    <AlertDescription>
    { suggestion?.suggestion || '当前无法使用技能' }
    </AlertDescription>
    </Alert>
  )}
  </CardContent>
  </Card>

  { /*  详细信息选项卡  */ }
  <Tabs defaultValue='effects' className='w-full'>;
  <TabsList className='grid w-full grid-cols-2'>;
  <TabsTrigger value='effects'>当前效果</TabsTrigger>;
  { isJudge && <TabsTrigger value='management'>管理</TabsTrigger> }
  </TabsList>

  { /*  当前效果  */ }
  <TabsContent value='effects'>;
  <Card className='bg-werewolf-card border-werewolf-purple/30'>;
  <CardHeader>
  <CardTitle className='flex items-center gap-2'>;
  <Zap className='w-4 h-4' />;
  当前技能效果
  <Badge variant='outline' className='ml-auto'>;
  { userSkillData.targets.length } 个
  </Badge>
  </CardTitle>
  </CardHeader>
  <CardContent>
  { userSkillData.targets.length > 0 ? (
    <div className='space-y-3'>;
    {userSkillData.targets.map(effect => (;
      <div
      key={effect.id }
      className='p-3 bg-werewolf-dark/40 rounded space-y-2';
      >
      <div className='flex items-center justify-between'>;
      <div className='flex items-center gap-2'>;
      { getEffectIcon(effect.target_type) }
      <span className='font-medium text-white'>;
      { effect.target_type }
      </span>
      </div>
      <Badge variant={ effect.is_active ? 'default' : 'secondary' 
}>;
      { effect.is_active ? '生效中' : '已失效' 
}
      </Badge>
      </div>

      { effect.effect_end_time && (
        <div className='space-y-1'>;
        <div className='flex justify-between text-xs text-muted-foreground'>;
        <span>剩余时间</span>
        <span>
        {new Date(effect.effect_end_time).toLocaleString() }
        </span>
        </div>
        <Progress
        value={ Math.max(0, Math.min(100,
        (new Date(effect.effect_end_time).getTime() - Date.now()) /
        (effect.effect_duration || 1000) * 100
      )) }
      className='h-2';
      />
      </div>
    )}

    { effect.stack_count > 1 && (
      <div className='text-xs text-muted-foreground'>;
      叠加层数: {effect.stack_count 
}
      </div>
    )}
    </div>
  ))}
  </div>
) : (
  <p className='text-sm text-muted-foreground text-center py-4'>;
  当前没有活跃的技能效果
  </p>
)}
</CardContent>
</Card>
</TabsContent>

{ /*  法官管理面板  */
} { isJudge && (
  <TabsContent value='management'>;
  <Card className='bg-werewolf-card border-werewolf-purple/30'>;
  <CardHeader>
  <CardTitle className='flex items-center gap-2'>;
  <Settings className='w-4 h-4' />;
  技能系统管理
  </CardTitle>
  </CardHeader>
  <CardContent className='space-y-4'>;
  {/*  统计信息  */ }
  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>;
  <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
  <div className='text-lg font-bold'>{ stats.totalUses }</div>;
  <div className='text-xs text-muted-foreground'>总使用次数</div>;
  </div>
  <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
  <div className='text-lg font-bold'>{ stats.activeEffects }</div>;
  <div className='text-xs text-muted-foreground'>活跃效果</div>;
  </div>
  <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
  <div className='text-lg font-bold'>{ stats.queuedEffects }</div>;
  <div className='text-xs text-muted-foreground'>排队效果</div>;
  </div>
  <div className='text-center p-3 bg-werewolf-dark/40 rounded'>;
  <div className='text-lg font-bold'>{ stats.conflictCount }</div>;
  <div className='text-xs text-muted-foreground'>冲突数量</div>;
  </div>
  </div>

  <Separator />

  { /*  管理操作  */ }
  <div className='space-y-2'>;
  <Button
  onClick={ handleResolveConflicts }
  disabled={ loading }
  className='w-full';
  variant='outline';
  >
  <AlertTriangle className='w-4 h-4 mr-2' />;
  解决当前轮次技能冲突
  </Button>

  <Button
  onClick={ handleOptimizeCache }
  variant='ghost';
  className='w-full';
  >
  <RefreshCw className='w-4 h-4 mr-2' />;
  优化缓存系统
  </Button>
  </div>
  </CardContent>
  </Card>
  </TabsContent>
)}
</Tabs>
</div>
)
}, arePropsEqual);

// 设置 displayName 以便调试
EnhancedSkillPanel.displayName = 'EnhancedSkillPanel';

/**
 * EnhancedSkillPanel组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default EnhancedSkillPanel;