// 增强技能管理器 - 整合技能冲突检测、女巫药剂验证、被动技能触发等功能
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, 
  Shield, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Skull,
  Heart,
  Eye,
  Beaker
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createLogger } from '@/lib/logger';
import { EnhancedSkillService } from '@/services/enhancedSkillService';
import { PassiveSkillService } from '@/services/passiveSkillService';
import type { Tables } from '@/integrations/supabase/types';

const logger = createLogger('enhanced-skill-manager');

interface EnhancedSkillManagerProps {
  gameStateId: string;
  roomId: string;
  userId: string;
  currentRound: number;
  currentPhase: number;
  isJudge: boolean;
  roleDesign?: Tables<'role_design'> | null;
  roleState?: Tables<'role_states'> | null;
}

interface WitchPotionState {
  canUseProtection: boolean;
  canUseAttack: boolean;
  nightDeaths?: Array<{ userId: string; reason: string; [key: string]: unknown }>;
  protectionReason?: string;
  attackReason?: string;
}

export const EnhancedSkillManager: React.FC<EnhancedSkillManagerProps> = ({
  gameStateId,
  roomId,
  userId,
  currentRound,
  currentPhase,
  isJudge,
  roleDesign,
  roleState
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [conflictData, setConflictData] = useState<{ conflicts: number; details: unknown } | null>(null);
  const [witchPotionState, setWitchPotionState] = useState<WitchPotionState>({
    canUseProtection: false,
    canUseAttack: false
  });
  const [hunterDyingActive, setHunterDyingActive] = useState(false);

  const phaseName = ['day', 'evening', 'night', 'dawn'][currentPhase - 1] || 'day';
  const isWitch = roleDesign?.role_name === 'witch';
  const isHunter = roleDesign?.role_name === 'hunter';

  // 检测技能冲突
  const detectConflicts = async () => {
    if (!isJudge) return;
    
    setLoading(true);
    try {
      const result = await EnhancedSkillService.detectSkillConflicts(
        gameStateId,
        currentRound,
        phaseName
      );
      
      setConflictData(result);
      
      if (result.conflicts > 0) {
        toast({
          title: '检测到技能冲突',
          description: `发现 ${result.conflicts} 个技能冲突，请处理`,
          variant: 'destructive'
        });
      } else {
        toast({
          title: '无技能冲突',
          description: '当前轮次没有技能冲突',
        });
      }
    } catch (error) {
      logger.error('技能冲突检测失败', error);
      toast({
        title: '检测失败',
        description: '技能冲突检测失败，请重试',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 验证女巫药剂使用
  const validateWitchPotions = async () => {
    if (!isWitch) return;

    try {
      // 检查解药
      const protectionResult = await EnhancedSkillService.validateWitchPotion(
        userId,
        gameStateId,
        'protection'
      );
      
      // 检查毒药
      const attackResult = await EnhancedSkillService.validateWitchPotion(
        userId,
        gameStateId,
        'attack'
      );

      setWitchPotionState({
        canUseProtection: protectionResult.canUse,
        canUseAttack: attackResult.canUse,
        nightDeaths: protectionResult.nightDeaths,
        protectionReason: protectionResult.reason,
        attackReason: attackResult.reason
      });

      logger.debug('女巫药剂状态更新', { 
        canUseProtection: protectionResult.canUse,
        canUseAttack: attackResult.canUse,
        nightDeaths: protectionResult.nightDeaths
      });
    } catch (error) {
      logger.error('女巫药剂验证失败', error);
    }
  };

  // 触发猎人濒死技能
  const triggerHunterDying = async () => {
    if (!isHunter) return;

    try {
      const success = await EnhancedSkillService.triggerHunterDyingSkill(
        userId,
        gameStateId,
        'manual_trigger'
      );

      if (success) {
        setHunterDyingActive(true);
        toast({
          title: '猎人濒死技能激活',
          description: '猎人进入濒死状态，可以进行反击',
        });
      }
    } catch (error) {
      logger.error('猎人濒死技能触发失败', error);
      toast({
        title: '触发失败',
        description: '猎人濒死技能触发失败',
        variant: 'destructive'
      });
    }
  };

  // 检查被动技能状态
  useEffect(() => {
    if (isWitch && currentPhase === 3) { // 夜晚阶段
      validateWitchPotions();
    }
  }, [isWitch, currentPhase, currentRound]);

  // 检查猎人状态
  useEffect(() => {
    if (isHunter && roleState?.role_status === 2) {
      setHunterDyingActive(true);
    }
  }, [isHunter, roleState?.role_status]);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-werewolf-purple">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            增强技能管理
          </div>
          <Badge variant="outline" className="border-werewolf-purple/30">
            第{currentRound}轮 - {phaseName}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* 法官技能冲突检测 */}
        {isJudge && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-werewolf-purple flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              技能冲突检测
            </h4>
            
            <div className="flex gap-2">
              <Button
                onClick={detectConflicts}
                disabled={loading}
                size="sm"
                variant="outline"
                className="border-werewolf-purple/30 hover:bg-werewolf-purple/20"
              >
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    检测中...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    检测冲突
                  </>
                )}
              </Button>
            </div>

            {conflictData && (
              <Alert className={conflictData.conflicts > 0 ? "border-red-500/30 bg-red-500/10" : "border-green-500/30 bg-green-500/10"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {conflictData.conflicts > 0 ? (
                    `检测到 ${conflictData.conflicts} 个技能冲突需要处理`
                  ) : (
                    '当前回合无技能冲突'
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Separator className="bg-werewolf-purple/30" />

        {/* 女巫药剂状态 */}
        {isWitch && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-purple-400 flex items-center gap-2">
              <Beaker className="w-4 h-4" />
              女巫药剂状态
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {/* 解药状态 */}
              <Card className={`bg-werewolf-dark/50 border ${witchPotionState.canUseProtection ? 'border-green-500/50' : 'border-gray-500/50'}`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">解药</span>
                    </div>
                    <Badge variant={witchPotionState.canUseProtection ? "default" : "secondary"}>
                      {witchPotionState.canUseProtection ? '可用' : '不可用'}
                    </Badge>
                  </div>
                  {witchPotionState.protectionReason && (
                    <p className="text-xs text-gray-400 mt-2">
                      {witchPotionState.protectionReason}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* 毒药状态 */}
              <Card className={`bg-werewolf-dark/50 border ${witchPotionState.canUseAttack ? 'border-red-500/50' : 'border-gray-500/50'}`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skull className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium">毒药</span>
                    </div>
                    <Badge variant={witchPotionState.canUseAttack ? "destructive" : "secondary"}>
                      {witchPotionState.canUseAttack ? '可用' : '不可用'}
                    </Badge>
                  </div>
                  {witchPotionState.attackReason && (
                    <p className="text-xs text-gray-400 mt-2">
                      {witchPotionState.attackReason}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 夜晚死亡信息 */}
            {witchPotionState.nightDeaths && witchPotionState.nightDeaths.length > 0 && (
              <div className="bg-werewolf-dark/30 p-3 rounded-lg">
                <h5 className="text-xs font-medium text-red-400 mb-2">当夜死亡信息</h5>
                <ScrollArea className="h-20">
                  <div className="space-y-1">
                    {witchPotionState.nightDeaths.map((death: { userId: string; reason: string; [key: string]: unknown }, index: number) => (
                      <div key={index} className="text-xs text-gray-300 p-1 bg-werewolf-dark/50 rounded">
                        目标: {(death.target_user_id as string)?.slice(-8)} | 技能: {death.skill_name as string}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        <Separator className="bg-werewolf-purple/30" />

        {/* 猎人濒死状态 */}
        {isHunter && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-orange-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              猎人技能状态
            </h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant={hunterDyingActive ? "destructive" : "secondary"}>
                  {hunterDyingActive ? '濒死状态' : '正常状态'}
                </Badge>
                {hunterDyingActive && (
                  <span className="text-xs text-orange-400">可以进行反击</span>
                )}
              </div>
              
              {!hunterDyingActive && isJudge && (
                <Button
                  onClick={triggerHunterDying}
                  size="sm"
                  variant="destructive"
                  className="text-xs"
                >
                  <Skull className="w-3 h-3 mr-1" />
                  触发濒死
                </Button>
              )}
            </div>

            {hunterDyingActive && (
              <Alert className="border-orange-500/30 bg-orange-500/10">
                <Target className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  猎人濒死状态已激活，请在40秒内选择反击目标
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* 被动技能说明 */}
        <div className="bg-werewolf-dark/30 p-3 rounded-lg">
          <h5 className="text-xs font-medium text-werewolf-purple mb-2">被动技能说明</h5>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• 恶魔免疫狼人攻击（自动触发）</p>
            <p>• 多重保护导致目标淘汰（自动检测）</p>
            <p>• 猎人濒死反击机制（需要手动触发或投票淘汰时自动触发）</p>
            <p>• 女巫药剂使用验证（基于当夜死亡信息）</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSkillManager;