
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Play, Trash2, RefreshCw } from 'lucide-react';
import { useSkillSystem } from '@/hooks/useSkillSystem';
import SkillUsePanel from './SkillUsePanel';
import SkillEffectsDisplay from './SkillEffectsDisplay';

interface SkillSystemManagerProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  isJudge: boolean;
  currentPhase: number;
  roleState: any;
  roleDesign: any;
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
    loading,
    processSkillEffects,
    cleanupExpiredEffects
  } = useSkillSystem(roomId, gameStateId, userId);

  const handleProcessEffects = async () => {
    const processed = await processSkillEffects();
    console.log(`处理了 ${processed} 个技能效果`);
  };

  const handleCleanupEffects = async () => {
    await cleanupExpiredEffects();
    console.log('清理过期效果完成');
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
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button 
                  onClick={handleProcessEffects}
                  disabled={loading || stats.queuedEffects === 0}
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  处理技能效果
                  {stats.queuedEffects > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.queuedEffects}
                    </Badge>
                  )}
                </Button>
                <Button 
                  onClick={handleCleanupEffects}
                  disabled={loading}
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
      <Tabs defaultValue="use-skill" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="use-skill">技能使用</TabsTrigger>
          <TabsTrigger value="effects">效果管理</TabsTrigger>
        </TabsList>
        
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
