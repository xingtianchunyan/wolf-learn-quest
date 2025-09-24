
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Play, Trash2, RefreshCw } from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { useSkillEffectAutoProcessor } from '@/hooks/useSkillEffectAutoProcessor';
import SkillUsePanel from './SkillUsePanel';
import SkillEffectsDisplay from '../displays/SkillEffectsDisplay';
import type { Tables } from '@/integrations/supabase/types';

interface SkillSystemManagerProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  isJudge: boolean;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players: Array<{ userId: string; name: string; roleStatus: number }>;
}

const SkillSystemManager: React.FC<SkillSystemManagerProps> = ({
  roomId,
  gameStateId,
  userId,
  isJudge,
  currentPhase,
  roleState,
  roleDesign,
  players
}) => {
  const {
    skillUses,
    skillEffectsQueue,
    skillTargets,
    loading
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 自动技能效果处理
  const {
    stats: processorStats,
    isProcessing,
    manualProcess,
    startAutoProcess,
    stopAutoProcess
  } = useSkillEffectAutoProcessor(gameStateId, currentPhase, isJudge);

  const handleProcessEffects = async () => {
    try {
      const processed = await manualProcess();
      console.log(`处理了 ${processed} 个技能效果`);
    } catch (error) {
      console.error('处理技能效果失败:', error);
    }
  };

  const handleCleanupEffects = async () => {
    try {
      const { error } = await supabase.rpc('cleanup_expired_standardized_skill_effects');
      
      if (error) {
        console.error('清理过期效果失败:', error);
        return;
      }
      
      console.log('成功清理过期技能效果');
    } catch (error) {
      console.error('清理过期效果异常:', error);
    }
  };

  // 统计数据
  const stats = {
    totalSkillUses: skillUses.length,
    queuedEffects: skillEffectsQueue.filter(e => e.status === 'queued').length,
    activeEffects: skillTargets.filter(t => t.is_active).length,
    processingEffects: skillEffectsQueue.filter(e => e.status === 'processing').length
  };

  return (
    <div className="space-y-4">
      {/* 统计面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            技能系统状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalSkillUses}</div>
              <div className="text-sm text-muted-foreground">技能使用总数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.queuedEffects}</div>
              <div className="text-sm text-muted-foreground">排队效果</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.activeEffects}</div>
              <div className="text-sm text-muted-foreground">活跃效果</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.processingEffects}</div>
              <div className="text-sm text-muted-foreground">处理中</div>
            </div>
          </div>

          {/* 法官控制面板 */}
          {isJudge && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {/* 自动处理状态 */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">自动处理状态: </span>
                  <span className={processorStats.isRunning ? 'text-green-400' : 'text-yellow-400'}>
                    {processorStats.isRunning ? '运行中' : '已停止'}
                  </span>
                  {isProcessing && <span className="text-blue-400 ml-2">处理中...</span>}
                </div>
                <div className="text-xs text-muted-foreground">
                  已处理: {processorStats.totalProcessed} | 成功: {processorStats.successCount} | 失败: {processorStats.failureCount}
                </div>
              </div>
              
              {/* 控制按钮 */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={handleProcessEffects}
                  disabled={loading || isProcessing || stats.queuedEffects === 0}
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  手动处理效果
                  {stats.queuedEffects > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.queuedEffects}
                    </Badge>
                  )}
                </Button>
                
                <Button 
                  onClick={processorStats.isRunning ? stopAutoProcess : startAutoProcess}
                  variant={processorStats.isRunning ? "destructive" : "outline"}
                  size="sm"
                >
                  {processorStats.isRunning ? '停止自动处理' : '启动自动处理'}
                </Button>
                
                <Button 
                  onClick={handleCleanupEffects}
                  disabled={loading || isProcessing}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  清理过期效果
                </Button>
                
                <Button 
                  onClick={() => window.location.reload()}
                  variant="ghost"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 主要内容区域 */}
      <Tabs defaultValue="effects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {!isJudge && <TabsTrigger value="use-skill">技能使用</TabsTrigger>}
          <TabsTrigger value="effects">效果管理</TabsTrigger>
        </TabsList>
        
        {!isJudge && (
          <TabsContent value="use-skill" className="space-y-4">
            <SkillUsePanel
              roomId={roomId}
              gameStateId={gameStateId}
              userId={userId}
              currentPhase={currentPhase}
              roleState={roleState}
              roleDesign={roleDesign}
              players={players}
            />
          </TabsContent>
        )}
        
        <TabsContent value="effects" className="space-y-4">
          <SkillEffectsDisplay
            roomId={roomId}
            gameStateId={gameStateId}
            players={players}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillSystemManager;
