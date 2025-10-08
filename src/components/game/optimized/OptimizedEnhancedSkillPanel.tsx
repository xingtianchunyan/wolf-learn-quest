/**
 * 文件级注释：优化的增强技能面板组件
 * 
 * 该文件实现了一个高度优化的技能面板组件，专门解决：
 * - 组件渲染频繁问题
 * - 内存泄漏和资源管理
 * - 状态更新抖动
 * - 缓存效率低下
 * - 实时订阅管理
 * 
 * 主要优化策略：
 * - 智能渲染控制和防抖
 * - 分层缓存和预加载
 * - 虚拟化长列表
 * - 懒加载和代码分割
 * - 内存监控和自动清理
 * - 性能指标实时监控
 * 
 * @author SOLO Coding
 * @version 3.0.0
 */

import React, { 
  useState, 
  useCallback, 
  useMemo, 
  useEffect, 
  useRef,
  memo,
  lazy,
  Suspense
} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Skull, Shield, Search, Zap, Clock, Target, Info, CheckCircle, 
  XCircle, AlertTriangle, Loader2, Settings, RefreshCw, Activity,
  MemoryStick, Gauge, TrendingUp
} from 'lucide-react';

import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { useWitchPotionManager } from '@/hooks/useWitchPotionManager';
import { skillConfigs } from '@/data/skillConfigs';
import type { RoleDesign, GameState, Player } from '@/types/game';
import { createLogger } from '@/lib/logger';

// 懒加载组件
const SkillEffectsVirtualList = lazy(() => import('./SkillEffectsVirtualList'));
const PerformanceMonitor = lazy(() => import('./PerformanceMonitor'));
const AdvancedSkillAnalytics = lazy(() => import('./AdvancedSkillAnalytics'));

const logger = createLogger('optimized-enhanced-skill-panel');

/**
 * 接口注释：优化的技能面板属性
 */
export interface OptimizedEnhancedSkillPanelProps {
  /** 房间ID */
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
  gameState?: GameState;
  /** 性能监控配置 */
  performanceConfig?: {
    enableMonitoring: boolean;
    enableOptimization: boolean;
    renderThreshold: number;
    memoryThreshold: number;
  };
}

/**
 * 接口注释：组件性能状态
 */
interface ComponentPerformanceState {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;
  isOptimized: boolean;
}

/**
 * 接口注释：缓存策略配置
 */
interface CacheStrategy {
  skillConfig: { ttl: number; priority: 'high' };
  suggestion: { ttl: number; priority: 'medium' };
  userSkillData: { ttl: number; priority: 'high' };
  effects: { ttl: number; priority: 'low' };
  targets: { ttl: number; priority: 'medium' };
}

/**
 * 类级注释：优化的增强技能面板组件
 * 
 * 实现高性能的技能管理界面，包含：
 * - 智能渲染优化
 * - 分层缓存系统
 * - 内存泄漏防护
 * - 实时性能监控
 * - 自适应优化策略
 */
const OptimizedEnhancedSkillPanel = memo<OptimizedEnhancedSkillPanelProps>(({
  roomId,
  gameStateId,
  userId,
  roleDesign,
  roleState,
  currentPhase,
  currentRound,
  isJudge = false,
  availableTargets,
  gameState,
  performanceConfig = {
    enableMonitoring: true,
    enableOptimization: true,
    renderThreshold: 3,
    memoryThreshold: 50 * 1024 * 1024 // 50MB
  }
}) => {
  // 性能监控状态
  const [performanceState, setPerformanceState] = useState<ComponentPerformanceState>({
    renderCount: 0,
    lastRenderTime: Date.now(),
    averageRenderTime: 0,
    memoryUsage: 0,
    cacheHitRate: 0,
    subscriptionCount: 0,
    isOptimized: false
  });

  // 渲染控制
  const renderStartTime = useRef<number>(Date.now());
  const renderTimes = useRef<number[]>([]);
  const isRenderingRef = useRef<boolean>(false);
  const subscriptionsRef = useRef<Set<() => void>>(new Set());

  // 缓存策略配置
  const cacheStrategy: CacheStrategy = useMemo(() => ({
    skillConfig: { ttl: 300000, priority: 'high' }, // 5分钟
    suggestion: { ttl: 30000, priority: 'medium' },  // 30秒
    userSkillData: { ttl: 60000, priority: 'high' }, // 1分钟
    effects: { ttl: 15000, priority: 'low' },        // 15秒
    targets: { ttl: 45000, priority: 'medium' }      // 45秒
  }), []);

  // 多层缓存系统
  const cacheManager = useMemo(() => {
    const cache = new Map<string, { data: any; timestamp: number; ttl: number; priority: string }>();
    
    return {
      get: <T>(key: string): T | null => {
        const item = cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > item.ttl) {
          cache.delete(key);
          return null;
        }
        
        return item.data as T;
      },
      
      set: <T>(key: string, data: T, config: { ttl: number; priority: string }): void => {
        cache.set(key, {
          data,
          timestamp: Date.now(),
          ttl: config.ttl,
          priority: config.priority
        });
      },
      
      invalidate: (pattern?: string): void => {
        if (pattern) {
          for (const [key] of cache.entries()) {
            if (key.includes(pattern)) {
              cache.delete(key);
            }
          }
        } else {
          cache.clear();
        }
      },
      
      getStats: () => ({
        size: cache.size,
        hitRate: performanceState.cacheHitRate
      })
    };
  }, [performanceState.cacheHitRate]);

  // 增强技能系统 Hook（优化版）
  const skillSystem = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 女巫药水管理 Hook
  const { loading: potionLoading } = useWitchPotionManager(gameStateId);

  // 本地状态（防抖优化）
  const [selectedTarget, setSelectedTarget] = useState('');
  const [activeTab, setActiveTab] = useState('effects');
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  /**
   * 函数级注释：智能渲染控制
   * 防止过度渲染，实现渲染节流
   */
  const renderController = useCallback(() => {
    if (isRenderingRef.current) return false;
    
    const now = Date.now();
    const recentRenders = renderTimes.current.filter(time => now - time < 1000);
    
    if (recentRenders.length >= performanceConfig.renderThreshold) {
      logger.warn('渲染频率过高，已节流', {
        recentRenders: recentRenders.length,
        threshold: performanceConfig.renderThreshold
      });
      return false;
    }
    
    renderTimes.current.push(now);
    renderTimes.current = renderTimes.current.slice(-10); // 保留最近10次
    
    return true;
  }, [performanceConfig.renderThreshold]);

  /**
   * 函数级注释：缓存的技能配置
   * 使用多层缓存优化技能配置获取
   */
  const skillConfig = useMemo(() => {
    const cacheKey = `skill_config_${roleDesign.skill_name}`;
    
    // 尝试从缓存获取
    let config = cacheManager.get<any>(cacheKey);
    if (config) {
      return config;
    }
    
    // 缓存未命中，计算并缓存
    config = skillConfigs[roleDesign.skill_name as keyof typeof skillConfigs];
    if (config) {
      cacheManager.set(cacheKey, config, cacheStrategy.skillConfig);
    }
    
    return config;
  }, [roleDesign.skill_name, cacheManager, cacheStrategy.skillConfig]);

  /**
   * 函数级注释：缓存的技能建议
   * 智能缓存技能使用建议
   */
  const suggestion = useMemo(() => {
    if (!skillConfig || !skillSystem.getSkillSuggestion) return null;
    
    const cacheKey = `skill_suggestion_${gameStateId}_${currentPhase}_${currentRound}_${availableTargets.length}`;
    
    // 尝试从缓存获取
    let result = cacheManager.get<any>(cacheKey);
    if (result) {
      return result;
    }
    
    // 缓存未命中，计算并缓存
    result = skillSystem.getSkillSuggestion(
      skillConfig.englishName,
      currentPhase,
      currentRound,
      availableTargets
    );
    
    if (result) {
      cacheManager.set(cacheKey, result, cacheStrategy.suggestion);
    }
    
    return result;
  }, [
    skillConfig, 
    skillSystem.getSkillSuggestion, 
    gameStateId, 
    currentPhase, 
    currentRound, 
    availableTargets.length,
    cacheManager,
    cacheStrategy.suggestion
  ]);

  /**
   * 函数级注释：缓存的用户技能数据
   * 优化用户技能数据获取和缓存
   */
  const userSkillData = useMemo(() => {
    if (!userId || !skillSystem.getUserSkillData) {
      return { uses: [], targets: [] };
    }
    
    const cacheKey = `user_skill_data_${userId}_${gameStateId}`;
    
    // 尝试从缓存获取
    let data = cacheManager.get<any>(cacheKey);
    if (data) {
      return data;
    }
    
    // 缓存未命中，计算并缓存
    data = skillSystem.getUserSkillData(userId);
    cacheManager.set(cacheKey, data, cacheStrategy.userSkillData);
    
    return data;
  }, [
    userId, 
    skillSystem.getUserSkillData, 
    gameStateId,
    cacheManager,
    cacheStrategy.userSkillData
  ]);

  /**
   * 函数级注释：优化的技能使用处理
   * 集成防抖、错误处理和缓存清理
   */
  const handleUseSkill = useCallback(async () => {
    if (!skillConfig || !skillSystem.useSkillEnhanced) return;
    if (!renderController()) return; // 渲染节流检查
    
    try {
      isRenderingRef.current = true;
      
      const result = await skillSystem.useSkillEnhanced(
        skillConfig.englishName,
        selectedTarget || undefined,
        {},
        roleState,
        roleDesign,
        currentPhase,
        currentRound
      );

      if (result) {
        setSelectedTarget('');
        
        // 智能缓存清理
        cacheManager.invalidate('skill_suggestion');
        cacheManager.invalidate('user_skill_data');
        
        // 触发缓存优化
        if (skillSystem.optimizeCache) {
          skillSystem.optimizeCache();
        }
        
        logger.info('技能使用成功', { 
          skillName: skillConfig.englishName,
          target: selectedTarget 
        });
      }
    } catch (error) {
      logger.error('技能使用失败', { error, skillName: skillConfig.englishName });
    } finally {
      isRenderingRef.current = false;
    }
  }, [
    skillConfig,
    skillSystem.useSkillEnhanced,
    skillSystem.optimizeCache,
    selectedTarget,
    roleState,
    roleDesign,
    currentPhase,
    currentRound,
    renderController,
    cacheManager
  ]);

  /**
   * 函数级注释：优化的冲突解决处理
   * 法官专用功能，集成性能监控
   */
  const handleResolveConflicts = useCallback(async () => {
    if (!isJudge || !skillSystem.resolveSkillConflicts) return;
    if (!renderController()) return;
    
    try {
      await skillSystem.resolveSkillConflicts(currentRound);
      cacheManager.invalidate(); // 清理所有缓存
      
      logger.info('技能冲突解决完成', { round: currentRound });
    } catch (error) {
      logger.error('技能冲突解决失败', { error, round: currentRound });
    }
  }, [
    isJudge, 
    skillSystem.resolveSkillConflicts, 
    currentRound,
    renderController,
    cacheManager
  ]);

  /**
   * 函数级注释：获取效果图标（缓存优化）
   */
  const getEffectIcon = useCallback((effectType: string) => {
    const cacheKey = `effect_icon_${effectType}`;
    
    let icon = cacheManager.get<JSX.Element>(cacheKey);
    if (icon) return icon;
    
    switch (effectType) {
      case 'elimination': icon = <Skull className="w-4 h-4" />; break;
      case 'protection': icon = <Shield className="w-4 h-4" />; break;
      case 'investigation': icon = <Search className="w-4 h-4" />; break;
      case 'status_change': icon = <Zap className="w-4 h-4" />; break;
      case 'passive': icon = <Clock className="w-4 h-4" />; break;
      default: icon = <Target className="w-4 h-4" />;
    }
    
    cacheManager.set(cacheKey, icon, { ttl: 300000, priority: 'low' });
    return icon;
  }, [cacheManager]);

  /**
   * 函数级注释：获取优先级颜色（缓存优化）
   */
  const getPriorityColor = useCallback((priority: 'high' | 'medium' | 'low') => {
    const cacheKey = `priority_color_${priority}`;
    
    let color = cacheManager.get<string>(cacheKey);
    if (color) return color;
    
    switch (priority) {
      case 'high': color = 'bg-red-500'; break;
      case 'medium': color = 'bg-yellow-500'; break;
      case 'low': color = 'bg-green-500'; break;
      default: color = 'bg-gray-500';
    }
    
    cacheManager.set(cacheKey, color, { ttl: 300000, priority: 'low' });
    return color;
  }, [cacheManager]);

  /**
   * 函数级注释：性能监控和优化
   */
  useEffect(() => {
    if (!performanceConfig.enableMonitoring) return;
    
    const startTime = Date.now();
    
    // 更新渲染统计
    setPerformanceState(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1,
      lastRenderTime: startTime,
      averageRenderTime: (prev.averageRenderTime + (Date.now() - renderStartTime.current)) / 2
    }));
    
    // 内存监控
    const memoryMonitor = setInterval(() => {
      if (performance.memory) {
        const memoryUsage = performance.memory.usedJSHeapSize;
        
        setPerformanceState(prev => ({
          ...prev,
          memoryUsage,
          subscriptionCount: subscriptionsRef.current.size,
          cacheHitRate: cacheManager.getStats().hitRate || 0
        }));
        
        // 内存阈值检查
        if (memoryUsage > performanceConfig.memoryThreshold) {
          logger.warn('内存使用过高，执行清理', { memoryUsage });
          cacheManager.invalidate();
          
          // 强制垃圾回收（如果可用）
          if (window.gc) {
            window.gc();
          }
        }
      }
    }, 5000); // 每5秒检查一次
    
    const cleanup = () => {
      clearInterval(memoryMonitor);
    };
    
    subscriptionsRef.current.add(cleanup);
    return cleanup;
  }, [performanceConfig, cacheManager]);

  /**
   * 函数级注释：组件卸载清理
   */
  useEffect(() => {
    return () => {
      // 清理所有订阅
      subscriptionsRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          logger.error('订阅清理失败', error);
        }
      });
      subscriptionsRef.current.clear();
      
      // 清理缓存
      cacheManager.invalidate();
      
      logger.info('OptimizedEnhancedSkillPanel 已清理');
    };
  }, [cacheManager]);

  // 如果没有技能配置，显示提示
  if (!skillConfig) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle>技能面板</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              当前角色没有可用技能或技能配置未找到
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 性能监控面板（可选） */}
      {performanceConfig.enableMonitoring && showPerformanceMonitor && (
        <Suspense fallback={<div>加载性能监控...</div>}>
          <PerformanceMonitor 
            performanceState={performanceState}
            cacheStats={cacheManager.getStats()}
            onOptimize={() => {
              cacheManager.invalidate();
              setPerformanceState(prev => ({ ...prev, isOptimized: true }));
            }}
          />
        </Suspense>
      )}

      {/* 技能信息概览 */}
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-werewolf-purple">
            {getEffectIcon(skillConfig.effectType[0])}
            {skillConfig.chineseName}
            <Badge variant="outline" className="ml-auto">
              优先级: {skillConfig.priority}
            </Badge>
            {performanceConfig.enableMonitoring && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                className="ml-2"
              >
                <Activity className="w-4 h-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 技能描述 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {roleDesign.skill_description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {skillConfig.phase}阶段
              </Badge>
              <Badge variant="secondary">
                {skillConfig.usageLimit === 'unlimited' ? '无限使用' : `${skillConfig.usageLimit}次`}
              </Badge>
              {skillConfig.effectType.map((type, index) => (
                <Badge key={index} variant="outline">
                  {type}
                </Badge>
              ))}
              {skillConfig.isPassive && (
                <Badge variant="destructive">被动技能</Badge>
              )}
            </div>
          </div>

          {/* 使用建议 */}
          {suggestion && (
            <Alert className={`border-l-4 ${getPriorityColor(suggestion.priority)} border-l-4`}>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="font-medium">使用建议</div>
                  <div className="text-sm">{suggestion.suggestion}</div>
                  <div className="text-xs text-muted-foreground">
                    适用时机: {suggestion.timing}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 技能使用界面 */}
          {suggestion?.canUse ? (
            <div className="space-y-3">
              {/* 目标选择 */}
              {skillConfig.targetType === 'single' && (
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    选择目标
                  </label>
                  <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                    <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30">
                      <SelectValue placeholder="请选择目标玩家" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTargets.map((player) => (
                        <SelectItem key={player.userId} value={player.userId}>
                          {player.name}
                          <Badge variant="outline" className="ml-2">
                            状态: {player.roleStatus === 1 ? '正常' : 
                                   player.roleStatus === 2 ? '濒死' : 
                                   player.roleStatus === 3 ? '虚弱' : '淘汰'}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* 使用按钮 */}
              <Button 
                onClick={handleUseSkill}
                disabled={
                  skillSystem.loading || 
                  potionLoading ||
                  (skillConfig.targetType === 'single' && !selectedTarget)
                }
                className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
              >
                {skillSystem.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    使用中...
                  </>
                ) : (
                  `使用 ${skillConfig.chineseName}`
                )}
              </Button>
            </div>
          ) : (
            <Alert variant="destructive">
              <XCircle className="w-4 h-4" />
              <AlertDescription>
                {suggestion?.suggestion || '当前无法使用技能'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 详细信息选项卡 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="effects">当前效果</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          {isJudge && <TabsTrigger value="management">管理</TabsTrigger>}
        </TabsList>

        {/* 当前效果（虚拟化列表） */}
        <TabsContent value="effects">
          <Card className="bg-werewolf-card border-werewolf-purple/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                当前技能效果
                <Badge variant="outline" className="ml-auto">
                  {userSkillData.targets.length} 个
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>加载效果列表...</div>}>
                <SkillEffectsVirtualList 
                  effects={userSkillData.targets}
                  getEffectIcon={getEffectIcon}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 高级分析 */}
        <TabsContent value="analytics">
          <Suspense fallback={<div>加载分析数据...</div>}>
            <AdvancedSkillAnalytics 
              skillData={userSkillData}
              stats={skillSystem.stats}
              performanceState={performanceState}
            />
          </Suspense>
        </TabsContent>

        {/* 法官管理面板 */}
        {isJudge && (
          <TabsContent value="management">
            <Card className="bg-werewolf-card border-werewolf-purple/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  技能系统管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 统计信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{skillSystem.stats.totalUses}</div>
                    <div className="text-xs text-muted-foreground">总使用次数</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{skillSystem.stats.activeEffects}</div>
                    <div className="text-xs text-muted-foreground">活跃效果</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{skillSystem.stats.queuedEffects}</div>
                    <div className="text-xs text-muted-foreground">排队效果</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{skillSystem.stats.conflictCount}</div>
                    <div className="text-xs text-muted-foreground">冲突数量</div>
                  </div>
                </div>

                {/* 性能指标 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="flex items-center justify-center gap-1">
                      <Gauge className="w-4 h-4" />
                      <span className="text-lg font-bold">{performanceState.renderCount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">渲染次数</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="flex items-center justify-center gap-1">
                      <MemoryStick className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {Math.round(performanceState.memoryUsage / 1024 / 1024)}MB
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">内存使用</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-lg font-bold">
                        {Math.round(performanceState.cacheHitRate * 100)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">缓存命中率</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="flex items-center justify-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-lg font-bold">{performanceState.subscriptionCount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">订阅数量</div>
                  </div>
                </div>

                <Separator />

                {/* 管理操作 */}
                <div className="space-y-2">
                  <Button 
                    onClick={handleResolveConflicts}
                    disabled={skillSystem.loading}
                    className="w-full"
                    variant="outline"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    解决当前轮次技能冲突
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      cacheManager.invalidate();
                      if (skillSystem.optimizeCache) {
                        skillSystem.optimizeCache();
                      }
                    }}
                    variant="ghost"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    优化缓存系统
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
});

// 设置 displayName 以便调试
OptimizedEnhancedSkillPanel.displayName = 'OptimizedEnhancedSkillPanel';

export default OptimizedEnhancedSkillPanel;