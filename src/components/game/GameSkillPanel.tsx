import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Target, Clock, Zap, Shield, Search, Skull } from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { getSkillConfigByEnglish } from '@/utils/skillMappingConfig';

interface GameSkillPanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: any;
  roleDesign: any;
  players?: Array<{
    userId: string;
    name: string;
    roleStatus?: number;
    status?: string;
  }>;
  currentRound?: number;
}

const GameSkillPanel: React.FC<GameSkillPanelProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  roleState,
  roleDesign,
  players,
  currentRound = 1
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');

  const {
    skillUses,
    loading,
    useSkillEnhanced: useSkill,
    getUserSkillData,
    canUseSkill: canUseSkillFromHook
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 获取技能配置
  const skillConfig = useMemo(() => {
    if (!roleDesign?.skill_name) return null;
    return getSkillConfigByEnglish(roleDesign.skill_name);
  }, [roleDesign]);

  // 检查是否可以使用技能
  const canUseSkill = canUseSkillFromHook(
    roleDesign?.skill_name || '',
    roleState,
    roleDesign,
    currentPhase
  );

  // 获取用户的技能使用数据
  const userSkillData = getUserSkillData(userId);

  // 获取可选择的目标玩家
  const availableTargets = players?.filter(player => 
    player.userId !== userId && 
    (player.status !== 'eliminated' && player.roleStatus !== 4)
  ) || [];

  const handleUseSkill = async () => {
    if (!skillConfig || !canUseSkill) return;

    await useSkill(
      skillConfig.englishName,
      selectedTarget || undefined,
      {},
      roleState,
      roleDesign,
      currentPhase,
      currentRound || 1
    );

    setSelectedTarget('');
  };

  if (!skillConfig) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle>技能面板</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">没有可用的技能</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          技能面板
          <Badge variant="outline" className="ml-auto">
            优先级: {skillConfig.priority}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 技能信息 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-werewolf-purple">
              {skillConfig.chineseName}
            </span>
            <div className="flex gap-1">
              {skillConfig.effectType.map((type, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {roleDesign.skill_description}
          </p>
        </div>

        {/* 目标选择器 */}
        {skillConfig.targetType === 'single' && availableTargets.length > 0 && (
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
            !canUseSkill || 
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

        {/* 技能使用记录 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">使用记录</h4>
          {userSkillData.uses.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {userSkillData.uses.slice(0, 5).map((use) => (
                <div key={use.id} className="flex items-center justify-between text-xs p-2 bg-werewolf-dark/40 rounded">
                  <span>{use.chinese_name || use.skill_name}</span>
                  <span className="text-muted-foreground">
                    第{use.round_number}轮 {use.phase}阶段
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {use.execution_status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">暂无使用记录</p>
          )}
        </div>

        {/* 当前效果 */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">当前效果</h4>
          {userSkillData.targets.length > 0 ? (
            <div className="space-y-2">
              {userSkillData.targets.map((effect) => (
                <div key={effect.id} className="flex items-center justify-between text-xs p-2 bg-werewolf-dark/40 rounded">
                  <span>{effect.target_type}</span>
                  <Badge variant={effect.is_active ? "default" : "secondary"} className="text-xs">
                    {effect.is_active ? "生效中" : "已失效"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">暂无活跃效果</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameSkillPanel;