import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Skull, 
  Shield, 
  Eye, 
  Heart, 
  Zap, 
  Moon, 
  Sun, 
  Target,
  AlertTriangle,
  Crown
} from 'lucide-react';

interface RoleSpecificSkillsProps {
  roleName: string;
  skillEffects: any;
  roleAttributes: any;
  canUseSkill: boolean;
  onUseSkill: (skillData: any) => void;
  availableTargets: Array<{ userId: string; name: string; roleStatus: number }>;
  currentPhase: number;
}

export const RoleSpecificSkills: React.FC<RoleSpecificSkillsProps> = ({
  roleName,
  skillEffects,
  roleAttributes,
  canUseSkill,
  onUseSkill,
  availableTargets,
  currentPhase
}) => {
  
  // 狼人技能
  const WerewolfSkill = () => (
    <Card className="bg-red-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Skull className="w-5 h-5" />
          狼人技能 - 噬咬
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>在夜晚阶段，你可以选择一名玩家进行攻击。</p>
          <p className="text-red-400 mt-2">• 每晚只能攻击一次</p>
          <p className="text-red-400">• 攻击会在夜晚结束时生效</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-red-400">选择目标</h4>
          <div className="grid grid-cols-1 gap-2">
            {availableTargets.map(target => (
              <Button
                key={target.userId}
                variant="outline"
                className="justify-start border-red-500/30 hover:bg-red-500/20"
                onClick={() => onUseSkill({ 
                  skillType: 'elimination',
                  targetId: target.userId,
                  effectType: 'werewolf_kill'
                })}
                disabled={!canUseSkill || currentPhase !== 3}
              >
                <Target className="w-4 h-4 mr-2" />
                攻击 {target.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 守卫技能
  const GuardSkill = () => (
    <Card className="bg-blue-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Shield className="w-5 h-5" />
          守卫技能 - 保护
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>在夜晚阶段，你可以选择一名玩家进行保护。</p>
          <p className="text-blue-400 mt-2">• 被保护的玩家免疫当夜的攻击</p>
          <p className="text-blue-400">• 不能连续两晚保护同一人</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-400">选择保护目标</h4>
          <div className="grid grid-cols-1 gap-2">
            {availableTargets.map(target => (
              <Button
                key={target.userId}
                variant="outline"
                className="justify-start border-blue-500/30 hover:bg-blue-500/20"
                onClick={() => onUseSkill({ 
                  skillType: 'protection',
                  targetId: target.userId,
                  effectType: 'guard_protect'
                })}
                disabled={!canUseSkill || currentPhase !== 3}
              >
                <Shield className="w-4 h-4 mr-2" />
                保护 {target.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 预言家技能
  const SeerSkill = () => (
    <Card className="bg-purple-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Eye className="w-5 h-5" />
          预言家技能 - 查验
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>在夜晚阶段，你可以查验一名玩家的身份。</p>
          <p className="text-purple-400 mt-2">• 可以得知目标是否为狼人</p>
          <p className="text-purple-400">• 每晚只能查验一次</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-purple-400">选择查验目标</h4>
          <div className="grid grid-cols-1 gap-2">
            {availableTargets.map(target => (
              <Button
                key={target.userId}
                variant="outline"
                className="justify-start border-purple-500/30 hover:bg-purple-500/20"
                onClick={() => onUseSkill({ 
                  skillType: 'investigation',
                  targetId: target.userId,
                  effectType: 'seer_investigation'
                })}
                disabled={!canUseSkill || currentPhase !== 3}
              >
                <Eye className="w-4 h-4 mr-2" />
                查验 {target.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 女巫技能
  const WitchSkill = () => {
    const [showPotionMenu, setShowPotionMenu] = useState(false);
    
    return (
      <Card className="bg-green-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Heart className="w-5 h-5" />
            女巫技能 - 魔药
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-300">
            <p>你拥有魔药，可以在夜晚使用。</p>
            <p className="text-green-400 mt-2">• 保护效果：救活当晚死亡的玩家</p>
            <p className="text-red-400">• 攻击效果：毒死一名玩家</p>
            <p className="text-yellow-400">• 每种效果整局游戏只能使用一次</p>
          </div>
          
          <div className="space-y-3">
            {!showPotionMenu ? (
              <Button
                variant="outline"
                className="justify-start border-green-500/30 hover:bg-green-500/20 w-full"
                onClick={() => setShowPotionMenu(true)}
                disabled={!canUseSkill || currentPhase !== 3}
              >
                <Heart className="w-4 h-4 mr-2" />
                使用 魔药
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-green-400">选择魔药效果</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPotionMenu(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
                
                {/* 保护效果 */}
                <Button
                  variant="outline"
                  className="justify-start border-green-500/30 hover:bg-green-500/20 w-full"
                  onClick={() => {
                    onUseSkill({ 
                      skillType: 'protection',
                      effectType: 'witch_protection',
                      potionType: 'protection'
                    });
                    setShowPotionMenu(false);
                  }}
                  disabled={!canUseSkill || currentPhase !== 3}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  保护
                </Button>
                
                {/* 攻击效果 */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-red-400">攻击目标</h5>
                  {availableTargets.map(target => (
                    <Button
                      key={target.userId}
                      variant="outline"
                      className="justify-start border-red-500/30 hover:bg-red-500/20 w-full"
                      onClick={() => {
                        onUseSkill({ 
                          skillType: 'elimination',
                          targetId: target.userId,
                          effectType: 'witch_attack',
                          potionType: 'attack'
                        });
                        setShowPotionMenu(false);
                      }}
                      disabled={!canUseSkill || currentPhase !== 3}
                    >
                      <Skull className="w-4 h-4 mr-2" />
                      攻击 {target.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // 猎人技能
  const HunterSkill = () => (
    <Card className="bg-orange-900/20 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Target className="w-5 h-5" />
          猎人技能 - 复仇
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>当你被淘汰时，可以选择一名玩家一起出局。</p>
          <p className="text-orange-400 mt-2">• 只能在被淘汰时使用</p>
          <p className="text-red-400">• 此技能为被动技能</p>
        </div>
        
        <div className="space-y-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <p className="text-sm text-yellow-400">
            猎人技能会在你进入濒死状态时自动激活
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // 村民技能（无特殊技能）
  const VillagerSkill = () => (
    <Card className="bg-gray-900/20 border-gray-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-400">
          <Sun className="w-5 h-5" />
          村民
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-300">
          <p>村民没有特殊的夜晚技能。</p>
          <p className="text-gray-400 mt-2">• 你的任务是在白天发言和投票</p>
          <p className="text-gray-400">• 帮助好人阵营找出狼人</p>
        </div>
      </CardContent>
    </Card>
  );

  // 根据角色名称渲染对应的技能界面
  const renderRoleSkill = () => {
    const roleNameLower = roleName?.toLowerCase();
    
    if (roleNameLower?.includes('werewolf') || roleNameLower?.includes('狼人')) {
      return <WerewolfSkill />;
    }
    if (roleNameLower?.includes('guard') || roleNameLower?.includes('守卫')) {
      return <GuardSkill />;
    }
    if (roleNameLower?.includes('seer') || roleNameLower?.includes('预言家')) {
      return <SeerSkill />;
    }
    if (roleNameLower?.includes('witch') || roleNameLower?.includes('女巫')) {
      return <WitchSkill />;
    }
    if (roleNameLower?.includes('hunter') || roleNameLower?.includes('猎人')) {
      return <HunterSkill />;
    }
    
    return <VillagerSkill />;
  };

  return (
    <div className="space-y-4">
      {renderRoleSkill()}
      
      {/* 角色属性显示 */}
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-werewolf-purple">
            <Crown className="w-5 h-5" />
            角色信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">阵营</span>
            <Badge variant={roleAttributes?.victory_condition?.includes('狼人') ? 'destructive' : 'default'}>
              {roleAttributes?.victory_condition?.includes('狼人') ? '狼人阵营' : '好人阵营'}
            </Badge>
          </div>
          
          <Separator className="bg-werewolf-purple/30" />
          
          <div className="space-y-2">
            <span className="text-sm text-gray-300">特殊能力</span>
            <div className="flex flex-wrap gap-1">
              {roleAttributes?.special_abilities?.map((ability: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {ability}
                </Badge>
              )) || (
                <span className="text-xs text-gray-500">无特殊能力</span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-sm text-gray-300">技能使用阶段</span>
            <div className="flex flex-wrap gap-1">
              {skillEffects?.active_phases?.map((phase: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {phase === 'night' ? '夜晚' : phase === 'day' ? '白天' : phase}
                </Badge>
              )) || (
                <span className="text-xs text-gray-500">无限制</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};