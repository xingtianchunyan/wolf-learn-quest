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
import { useLanguage } from '@/components/layout/LanguageSwitcher';
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
  const { t } = useLanguage();
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
        title: t('judge.skillDashboard.toast.refreshSuccess.title'),
        description: t('judge.skillDashboard.toast.refreshSuccess.description'),
      });
    } catch (error) {
      toast({
        title: t('judge.skillDashboard.toast.refreshFailed.title'),
        description: t('judge.skillDashboard.toast.refreshFailed.description', {
          message:
            error instanceof Error ? error.message : t('common.retry_later'),
        }),
        variant: 'destructive',
      });
    }
  };

  const handleClearCache = () => {
    clearCache();
    toast({
      title: t('judge.skillDashboard.toast.cacheCleared.title'),
      description: t('judge.skillDashboard.toast.cacheCleared.description'),
    });
  };

  const getSystemStatus = () => {
    if (loading) return { status: 'loading', message: t('common.loading') };

    const errorRate =
      stats.totalUses > 0
        ? ((stats.totalUses - stats.activeEffects) / stats.totalUses) * 100
        : 0;

    if (errorRate > 20) {
      return {
        status: 'error',
        message: t('judge.skillDashboard.status.error'),
      };
    } else if (stats.queuedEffects > 20) {
      return {
        status: 'warning',
        message: t('judge.skillDashboard.status.warning'),
      };
    } else {
      return {
        status: 'healthy',
        message: t('judge.skillDashboard.status.healthy'),
      };
    }
  };

  const systemStatus = getSystemStatus();

  if (!gameStateId) {
    return (
      <Alert>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>
          {t('judge.skillDashboard.chooseGameState')}
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
            {t('judge.skillDashboard.title')}
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
          <CardDescription>{t('judge.skillDashboard.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex items-center gap-2'>
              <Zap className='h-8 w-8 text-blue-600' />
              <div>
                <div className='text-2xl font-bold'>{stats.totalUses}</div>
                <div className='text-sm text-gray-600'>
                  {t('judge.skillDashboard.stats.totalUses')}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Activity className='h-8 w-8 text-green-600' />
              <div>
                <div className='text-2xl font-bold'>{stats.activeEffects}</div>
                <div className='text-sm text-gray-600'>
                  {t('judge.skillDashboard.stats.activeEffects')}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Database className='h-8 w-8 text-purple-600' />
              <div>
                <div className='text-2xl font-bold'>{cacheStats.totalSize}</div>
                <div className='text-sm text-gray-600'>
                  {t('judge.skillDashboard.stats.cacheEntries')}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <TrendingUp className='h-8 w-8 text-orange-600' />
              <div>
                <div className='text-2xl font-bold'>
                  {cacheStats.hitRate.toFixed(1)}%
                </div>
                <div className='text-sm text-gray-600'>
                  {t('judge.skillDashboard.stats.hitRate')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>
            {t('judge.skillDashboard.tabs.overview')}
          </TabsTrigger>
          <TabsTrigger value='monitor'>
            {t('judge.skillDashboard.tabs.monitor')}
          </TabsTrigger>
          <TabsTrigger value='progress'>
            {t('judge.skillDashboard.tabs.progress')}
          </TabsTrigger>
          <TabsTrigger value='admin'>
            {t('judge.skillDashboard.tabs.admin')}
          </TabsTrigger>
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
