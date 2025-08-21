
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Target, Clock, Zap, Shield, Search, Skull } from 'lucide-react';
import { useSkillSystem } from '@/hooks/useSkillSystem';
import { canUseSkillInGameState, getSkillEffectTypes, getSkillPriority } from '@/utils/skillSystemHelpers';

interface SkillUsePanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: any;
  roleDesign: any;
  players: Array<{ userId: string; name: string; roleStatus: number }>;
}

const SkillUsePanel: React.FC<SkillUsePanelProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  roleState,
  roleDesign,
  players
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [skillData, setSkillData] = useState<any>({});
  
  const {
    loading,
    useSkill,
    skillUses,
    getUserSkillUses,
    getUserSkillEffects
  } = useSkillSystem(gameStateId, roomId);

  // 检查是否可以使用技能
  const canUseSkill = canUseSkillInGameState(
    roleDesign?.skill_effects || {},
    roleState?.role_status || 1,
    currentPhase,
    roleDesign?.skill_name
  );

  // 获取技能效果类型
  const skillEffectTypes = getSkillEffectTypes(roleDesign?.skill_effects || {});
  const skillPriority = getSkillPriority(roleDesign?.skill_effects || {}, roleDesign?.skill_name);

  // 获取当前用户的技能使用记录
  const userSkillUses = getUserSkillUses(userId);
  const userSkillEffects = getUserSkillEffects(userId);

  // 获取可选目标玩家
  const availableTargets = players.filter(player => 
    player.userId !== userId && player.roleStatus !== 4 // 排除自己和已淘汰的玩家
  );

  const handleUseSkill = async () => {
    if (!roleDesign?.skill_name) return;

    const result = await useSkill(
      roleDesign.skill_name,
      selectedTarget || undefined,
      skillData
    );

    if (result) {
      setSelectedTarget('');
      setSkillData({});
    }
  };

  const getEffectIcon = (effectType: string) => {
    switch (effectType) {
      case 'elimination': return <Skull className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'investigation': return <Search className="w-4 h-4" />;
      case 'status_change': return <Zap className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  if (!roleDesign?.skill_name) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>技能面板</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">当前角色没有可用技能</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 技能使用界面 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getEffectIcon(skillEffectTypes[0] || 'default')}
            {roleDesign.skill_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {roleDesign.skill_description}
            </p>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline">优先级: {skillPriority}</Badge>
              {skillEffectTypes.map((type, index) => (
                <Badge key={index} variant="secondary">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {canUseSkill ? (
            <div className="space-y-3">
              {/* 目标选择 */}
              {skillEffectTypes.includes('investigation') || 
               skillEffectTypes.includes('elimination') || 
               skillEffectTypes.includes('protection') ? (
                <div>
                  <label className="text-sm font-medium">选择目标</label>
                  <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择技能目标" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTargets.map((player) => (
                        <SelectItem key={player.userId} value={player.userId}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              <Button 
                onClick={handleUseSkill}
                disabled={loading || (
                  (skillEffectTypes.includes('investigation') || 
                   skillEffectTypes.includes('elimination') || 
                   skillEffectTypes.includes('protection')) && !selectedTarget
                )}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    使用中...
                  </>
                ) : (
                  `使用 ${roleDesign.skill_name}`
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                当前阶段或状态不能使用技能
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 技能使用历史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            技能使用记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userSkillUses.length > 0 ? (
            <div className="space-y-2">
              {userSkillUses.slice(0, 5).map((skillUse) => (
                <div 
                  key={skillUse.id} 
                  className="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <div>
                    <span className="font-medium">{skillUse.skill_name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      第{skillUse.round_number}轮 {skillUse.phase}阶段
                    </span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(skillUse.execution_status)}
                  >
                    {skillUse.execution_status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">暂无技能使用记录</p>
          )}
        </CardContent>
      </Card>

      {/* 当前技能效果 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            当前技能效果
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userSkillEffects.length > 0 ? (
            <div className="space-y-2">
              {userSkillEffects.map((effect) => (
                <div 
                  key={effect.id} 
                  className="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <div className="flex items-center gap-2">
                    {getEffectIcon(effect.target_type)}
                    <span className="font-medium">{effect.target_type}</span>
                  </div>
                  <div className="text-right">
                    {effect.effect_end_time && (
                      <div className="text-xs text-muted-foreground">
                        {new Date(effect.effect_end_time).toLocaleTimeString()}
                      </div>
                    )}
                    <Badge variant={effect.is_active ? "default" : "secondary"}>
                      {effect.is_active ? "生效中" : "已失效"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">当前没有活跃的技能效果</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillUsePanel;
