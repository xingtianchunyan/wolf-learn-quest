// 增强的技能面板组件 - 基于新的技能系统设计
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, Target, Clock, Zap, Shield, Search, Skull, 
  AlertTriangle, CheckCircle, XCircle, Info, Settings, RefreshCw
} from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { useWitchPotionManager } from '@/hooks/useWitchPotionManager';
import { SKILL_MAPPING_CONFIG, getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
import { validateSkillUsage } from '@/utils/skillUsageRestrictions';

interface EnhancedSkillPanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  currentRound: number;
  roleState: any;
  roleDesign: any;
  players: Array<{ userId: string; name: string; roleStatus: number }>;
  isJudge?: boolean;
}

const EnhancedSkillPanel: React.FC<EnhancedSkillPanelProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  currentRound,
  roleState,
  roleDesign,
  players,
  isJudge = false
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const {
    skillUses,
    loading,
    stats,
    useSkillEnhanced,
    getSkillSuggestion,
    getUserSkillData,
    canUseSkill,
    resolveSkillConflicts
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 女巫魔药管理器
  const {
    potionStatus,
    useProtectionPotion,
    useAttackPotion,
    loading: potionLoading
  } = useWitchPotionManager(gameStateId || '', userId || '', currentRound || 1);

  // 获取当前角色的技能配置
  const skillConfig = useMemo(() => {
    if (!roleDesign?.skill_name) return null;
    return getSkillConfigByEnglish(roleDesign.skill_name);
  }, [roleDesign]);

  // 获取技能使用建议
  const suggestion = useMemo(() => {
    return getSkillSuggestion(
      roleState,
      roleDesign,
      currentPhase,
      currentRound,
      selectedTarget
    );
  }, [getSkillSuggestion, roleState, roleDesign, currentPhase, currentRound, selectedTarget]);

  // 获取用户技能数据
  const userSkillData = getUserSkillData();

  // 可选择的目标玩家
  const availableTargets = useMemo(() => {
    return players.filter(player => 
      player.userId !== userId && 
      player.roleStatus !== 4 // 排除已淘汰的玩家
    );
  }, [players, userId]);

  // 技能使用处理
  const handleUseSkill = async () => {
    if (!skillConfig) return;

    // 特殊处理女巫魔药
    if (skillConfig.englishName === 'magic_potion') {
      // 女巫魔药需要通过专门的处理逻辑
      return;
    }

    // 验证夜晚技能使用限制
    const userSkillUses = getUserSkillData().uses.map(use => ({
      id: use.id,
      user_id: use.user_id,
      skill_name: use.skill_name,
      round_number: use.round_number,
      phase: use.phase,
      created_at: use.created_at
    }));

    const usageRestriction = validateSkillUsage(
      roleDesign.role_name,
      roleDesign.skill_name,
      currentPhase,
      currentRound || 1,
      userSkillUses
    );

    if (!usageRestriction.canUse) {
      return;
    }

    const result = await useSkillEnhanced(
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
    }
  };

  // 冲突解决处理（法官专用）
  const handleResolveConflicts = async () => {
    if (!isJudge) return;
    await resolveSkillConflicts(currentRound);
  };

  // 获取效果图标
  const getEffectIcon = (effectType: string) => {
    switch (effectType) {
      case 'elimination': return <Skull className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'investigation': return <Search className="w-4 h-4" />;
      case 'status_change': return <Zap className="w-4 h-4" />;
      case 'passive': return <Clock className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  // 获取优先级颜色
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

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
      {/* 技能信息概览 */}
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-werewolf-purple">
            {getEffectIcon(skillConfig.effectType[0])}
            {skillConfig.chineseName}
            <Badge variant="outline" className="ml-auto">
              优先级: {skillConfig.priority}
            </Badge>
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
                  loading || 
                  potionLoading ||
                  (skillConfig.targetType === 'single' && !selectedTarget)
                }
                className="w-full bg-werewolf-purple hover:bg-werewolf-purple/80"
              >
                {loading ? (
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
      <Tabs defaultValue="effects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="effects">当前效果</TabsTrigger>
          {isJudge && <TabsTrigger value="management">管理</TabsTrigger>}
        </TabsList>

        {/* 当前效果 */}
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
              {userSkillData.targets.length > 0 ? (
                <div className="space-y-3">
                  {userSkillData.targets.map((effect) => (
                    <div 
                      key={effect.id} 
                      className="p-3 bg-werewolf-dark/40 rounded space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getEffectIcon(effect.target_type)}
                          <span className="font-medium text-white">
                            {effect.target_type}
                          </span>
                        </div>
                        <Badge variant={effect.is_active ? "default" : "secondary"}>
                          {effect.is_active ? "生效中" : "已失效"}
                        </Badge>
                      </div>
                      
                      {effect.effect_end_time && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>剩余时间</span>
                            <span>
                              {new Date(effect.effect_end_time).toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={Math.max(0, Math.min(100, 
                              (new Date(effect.effect_end_time).getTime() - Date.now()) / 
                              (effect.effect_duration || 1000) * 100
                            ))} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      {effect.stack_count > 1 && (
                        <div className="text-xs text-muted-foreground">
                          叠加层数: {effect.stack_count}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  当前没有活跃的技能效果
                </p>
              )}
            </CardContent>
          </Card>
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
                    <div className="text-lg font-bold">{stats.totalUses}</div>
                    <div className="text-xs text-muted-foreground">总使用次数</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{stats.activeEffects}</div>
                    <div className="text-xs text-muted-foreground">活跃效果</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{stats.queuedEffects}</div>
                    <div className="text-xs text-muted-foreground">排队效果</div>
                  </div>
                  <div className="text-center p-3 bg-werewolf-dark/40 rounded">
                    <div className="text-lg font-bold">{stats.conflictCount}</div>
                    <div className="text-xs text-muted-foreground">冲突数量</div>
                  </div>
                </div>

                <Separator />

                {/* 管理操作 */}
                <div className="space-y-2">
                  <Button 
                    onClick={handleResolveConflicts}
                    disabled={loading}
                    className="w-full"
                    variant="outline"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    解决当前轮次技能冲突
                  </Button>
                  
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="ghost"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新技能系统
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EnhancedSkillPanel;