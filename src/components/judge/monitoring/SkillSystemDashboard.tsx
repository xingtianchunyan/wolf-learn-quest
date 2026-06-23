// 技能系统综合管理面板 - 整合所有优化功能
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSkillSystemCache } from '@/utils/skillSystemCache';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { useToast } from '@/hooks/use-toast';
import {
  Activity,
  Database,
  Gauge,
  TrendingUp,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { SkillSystemMonitor } from '@/components/admin/SkillSystemMonitor';
import { SkillSystemOverviewTab } from './SkillSystemOverviewTab';
import { SkillSystemProgressTab } from './SkillSystemProgressTab';
import { SkillSystemAdminTab } from './SkillSystemAdminTab';
import {
  SKILL_EXECUTION_STEPS,
  type SkillProgressStep,
} from '@/components/ui/skill-progress-indicator';

interface SkillSystemDashboardProps {
  gameStateId?: string;
  roomId?: string;
  isJudge?: boolean;
  userId?: string;
}

export const SkillSystemDashboard: React.FC<SkillSystemDashboardProps> = ({
  gameStateId,
  roomId,
  isJudge = false,
  userId,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const {
    stats: cacheStats,
    clear: clearCache,
    cleanup: cleanupCache,
  } = useSkillSystemCache();

  const {
    skillUses,
    skillEffectsQueue: _skillEffectsQueue,
    skillTargets: _skillTargets,
    loading,
    stats,
    fetchAllSkillData,
  } = useEnhancedSkillSystem(roomId || '', gameStateId, userId);

  const [skillProgress, setSkillProgress] = useState<
    Record<string, SkillProgressStep[]>
  >({
    werewolf_attack: SKILL_EXECUTION_STEPS.werewolf_attack.map(step => ({
      ...step,
      status: 'completed' as const,
    })),
    guard_vigil: SKILL_EXECUTION_STEPS.guard_vigil.map((step, index) => ({
      ...step,
      status: index < 2 ? ('completed' as const) : ('pending' as const),
    })),
  });

  const handleRefreshData = async () => {
    try {
      await fetchAllSkillData();
      cleanupCache();
      toast({
        title: '数据刷新成功',
        description: '已获取最新的技能系统数据',
      });
    } catch (error) {
      toast({
        title: '数据刷新失败',
        description:
          error instanceof Error ? error.message : '刷新失败，请重试',
        variant: 'destructive',
      });
    }
  };

  const handleClearCache = () => {
    clearCache();
    toast({
      title: '缓存已清理',
      description: '所有缓存数据已被清除',
    });
  };

  const getSystemStatus = () => {
    if (loading) return { status: 'loading', message: '加载中...' };

    const errorRate =
      stats.totalUses > 0
        ? ((stats.totalUses - stats.activeEffects) / stats.totalUses) * 100
        : 0;

    if (errorRate > 20) {
      return { status: 'error', message: '系统异常，错误率过高' };
    } else if (stats.queuedEffects > 20) {
      return { status: 'warning', message: '队列积压，需要处理' };
    } else {
      return { status: 'healthy', message: '系统运行正常' };
    }
  };

  const systemStatus = getSystemStatus();

  if (!gameStateId) {
    return (
      <Alert>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>
          请选择游戏状态以使用技能系统管理面板
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Activity className='h-5 w-5' />
            技能系统管理面板
            <Badge
              variant={
                systemStatus.status === 'healthy'
                  ? 'default'
                  : systemStatus.status === 'warning'
                    ? 'secondary'
                    : 'destructive'
              }
            >
              {systemStatus.message}
            </Badge>
          </CardTitle>
          <CardDescription>综合管理和监控技能系统的所有功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex items-center gap-2'>
              <Zap className='h-8 w-8 text-blue-600' />
              <div>
                <div className='text-2xl font-bold'>{stats.totalUses}</div>
                <div className='text-sm text-gray-600'>技能使用总数</div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Activity className='h-8 w-8 text-green-600' />
              <div>
                <div className='text-2xl font-bold'>{stats.activeEffects}</div>
                <div className='text-sm text-gray-600'>活跃效果</div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Database className='h-8 w-8 text-purple-600' />
              <div>
                <div className='text-2xl font-bold'>{cacheStats.totalSize}</div>
                <div className='text-sm text-gray-600'>缓存条目</div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <TrendingUp className='h-8 w-8 text-orange-600' />
              <div>
                <div className='text-2xl font-bold'>
                  {cacheStats.hitRate.toFixed(1)}%
                </div>
                <div className='text-sm text-gray-600'>缓存命中率</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>系统概览</TabsTrigger>
          <TabsTrigger value='monitor'>性能监控</TabsTrigger>
          <TabsTrigger value='progress'>执行进度</TabsTrigger>
          <TabsTrigger value='admin'>系统管理</TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <SkillSystemOverviewTab skillUses={skillUses} stats={stats} />
        </TabsContent>

        <TabsContent value='monitor'>
          <SkillSystemMonitor
            gameStateId={gameStateId}
            roomId={roomId}
            isJudge={isJudge}
          />
        </TabsContent>

        <TabsContent value='progress'>
          <SkillSystemProgressTab skillProgress={skillProgress} />
        </TabsContent>

        <TabsContent value='admin'>
          <SkillSystemAdminTab
            isJudge={isJudge}
            loading={loading}
            cacheStats={cacheStats}
            onRefreshData={handleRefreshData}
            onClearCache={handleClearCache}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillSystemDashboard;
