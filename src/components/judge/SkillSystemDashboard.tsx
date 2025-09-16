// 技能系统综合管理面板 - 整合所有优化功能
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillSystemMonitor } from '@/components/admin/SkillSystemMonitor';
import { SkillProgressIndicator, SKILL_EXECUTION_STEPS } from '@/components/ui/skill-progress-indicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSkillSystemCache } from '@/utils/skillSystemCache';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  Database, 
  Gauge, 
  Settings, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

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
  userId
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // 缓存系统
  const { cache, stats: cacheStats, clear: clearCache, cleanup: cleanupCache } = useSkillSystemCache();
  
  // 技能系统数据
  const {
    skillUses: _skillUses,
    skillEffectsQueue: _skillEffectsQueue,
    skillTargets: _skillTargets,
    loading: _loading,
    stats,
    useSkillEnhanced: _useSkillEnhanced,
    fetchAllSkillData
  } = useEnhancedSkillSystem(roomId || '', gameStateId, userId);

  // 模拟技能执行进度（用于演示）
  const [skillProgress, setSkillProgress] = useState({
    werewolf_attack: SKILL_EXECUTION_STEPS.werewolf_attack.map(step => ({
      ...step,
      status: 'completed' as const
    })),
    guard_vigil: SKILL_EXECUTION_STEPS.guard_vigil.map((step, index) => ({
      ...step,
      status: index < 2 ? 'completed' as const : 'pending' as const
    }))
  });

  // 手动刷新数据
  const handleRefreshData = async () => {
    try {
      await fetchAllSkillData();
      cleanupCache();
      toast({
        title: '数据刷新成功',
        description: '已获取最新的技能系统数据'
      });
    } catch (error: any) {
      toast({
        title: '数据刷新失败',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  // 清理缓存
  const handleClearCache = () => {
    clearCache();
    toast({
      title: '缓存已清理',
      description: '所有缓存数据已被清除'
    });
  };

  // 获取系统状态
  const getSystemStatus = () => {
    if (_loading) return { status: 'loading', message: '加载中...' };
    
    const errorRate = stats.totalUses > 0 ? ((stats.totalUses - stats.activeEffects) / stats.totalUses) * 100 : 0;
    
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
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          请选择游戏状态以使用技能系统管理面板
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* 系统状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            技能系统管理面板
            <Badge 
              variant={
                systemStatus.status === 'healthy' ? 'default' : 
                systemStatus.status === 'warning' ? 'secondary' : 
                'destructive'
              }
            >
              {systemStatus.message}
            </Badge>
          </CardTitle>
          <CardDescription>
            综合管理和监控技能系统的所有功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalUses}</div>
                <div className="text-sm text-gray-600">技能使用总数</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.activeEffects}</div>
                <div className="text-sm text-gray-600">活跃效果</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Database className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{cacheStats.totalSize}</div>
                <div className="text-sm text-gray-600">缓存条目</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{cacheStats.hitRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">缓存命中率</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 详细管理面板 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="monitor">性能监控</TabsTrigger>
          <TabsTrigger value="progress">执行进度</TabsTrigger>
          <TabsTrigger value="admin">系统管理</TabsTrigger>
        </TabsList>

        {/* 系统概览 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 当前活跃技能 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">当前活跃技能</CardTitle>
              </CardHeader>
              <CardContent>
                {_skillUses.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    暂无活跃技能
                  </div>
                ) : (
                  <div className="space-y-2">
                    {skillUses.slice(0, 5).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <span className="font-medium">{skill.chinese_name || skill.skill_name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            第{skill.round_number}轮 - {skill.phase}
                          </span>
                        </div>
                        <Badge variant={
                          skill.execution_status === 'completed' ? 'default' :
                          skill.execution_status === 'pending' ? 'secondary' :
                          'destructive'
                        }>
                          {skill.execution_status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 效果队列状态 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">效果队列状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>排队中</span>
                    <Badge variant="secondary">{stats.queuedEffects}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>已完成</span>
                    <Badge variant="default">{stats.completedEffects}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>冲突解决</span>
                    <Badge variant="outline">{stats.conflictCount}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 最近技能活动 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">最近技能活动</CardTitle>
            </CardHeader>
            <CardContent>
              {skillUses.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  暂无技能活动记录
                </div>
              ) : (
                <div className="space-y-2">
                  {skillUses.slice(0, 10).map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3 p-2 border-l-4 border-blue-200">
                      <div className="flex-1">
                        <div className="font-medium">{skill.chinese_name || skill.skill_name}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(skill.created_at).toLocaleString()} - 
                          第{skill.round_number}轮{skill.phase}阶段
                        </div>
                      </div>
                      <Badge>{skill.execution_status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 性能监控 */}
        <TabsContent value="monitor">
          <SkillSystemMonitor 
            gameStateId={gameStateId}
            roomId={roomId}
            isJudge={isJudge}
          />
        </TabsContent>

        {/* 执行进度 */}
        <TabsContent value="progress" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">技能执行进度跟踪</CardTitle>
                <CardDescription>
                  实时显示技能执行的各个步骤和状态
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(skillProgress).map(([skillName, steps]) => (
                  <SkillProgressIndicator
                    key={skillName}
                    skillName={skillName}
                    skillChineseName={
                      skillName === 'werewolf_attack' ? '狼人夜袭' :
                      skillName === 'guard_vigil' ? '守卫守夜' :
                      skillName
                    }
                    steps={steps}
                    showProgress={true}
                    showStepDetails={true}
                  />
                ))}

                {Object.keys(skillProgress).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    暂无进行中的技能执行
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 系统管理 */}
        <TabsContent value="admin" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 数据管理 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  数据管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button 
                    onClick={handleRefreshData} 
                    className="w-full"
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? '刷新中...' : '刷新数据'}
                  </Button>
                  
                  <Button 
                    onClick={handleClearCache} 
                    variant="outline"
                    className="w-full"
                  >
                    清理缓存
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 缓存统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  缓存统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>缓存条目</span>
                    <span>{cacheStats.totalSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>命中次数</span>
                    <span>{cacheStats.hitCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>未命中次数</span>
                    <span>{cacheStats.missCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>命中率</span>
                    <span className="font-medium text-green-600">
                      {cacheStats.hitRate.toFixed(1)}%
                    </span>
                  </div>
                  {cacheStats.lastCleanup && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>上次清理</span>
                      <span>{cacheStats.lastCleanup.toLocaleTimeString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 权限提示 */}
          {!isJudge && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                部分管理功能仅对游戏法官开放。如需完整权限，请联系法官。
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};