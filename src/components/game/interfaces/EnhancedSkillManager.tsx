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
  Beaker,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createLogger } from '@/lib/logger';
import { EnhancedSkillService } from '@/services/enhancedSkillService';
import { PassiveSkillService } from '@/services/passiveSkillService';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
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
  nightDeaths?: Array<{
    userId: string;
    reason: string;
    [key: string]: unknown;
  }>;
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
  roleState,
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [conflictData, setConflictData] = useState<{
    conflicts: number;
    details: unknown;
  } | null>(null);
  const [witchPotionState, setWitchPotionState] = useState<WitchPotionState>({
    canUseProtection: false,
    canUseAttack: false,
  });
  const [hunterDyingActive, setHunterDyingActive] = useState(false);

  const phaseName =
    ['day', 'evening', 'night', 'dawn'][currentPhase - 1] || 'day';
  const phaseDisplayName = t(`game.phase.${phaseName}` as never);
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
        phaseName,
        language
      );

      setConflictData(result);

      if (result.conflicts > 0) {
        toast({
          title: t('gameComponent.skillManager.conflictDetected'),
          description: t('gameComponent.skillManager.conflictCountDesc', {
            count: result.conflicts,
          }),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('gameComponent.skillManager.noConflict'),
          description: t('gameComponent.skillManager.noConflictDesc'),
        });
      }
    } catch (error) {
      logger.error('技能冲突检测失败', error);
      toast({
        title: t('gameComponent.skillManager.detectFailed'),
        description: t('gameComponent.skillManager.detectFailedDesc'),
        variant: 'destructive',
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
        'protection',
        undefined,
        language
      );

      // 检查毒药
      const attackResult = await EnhancedSkillService.validateWitchPotion(
        userId,
        gameStateId,
        'attack',
        undefined,
        language
      );

      setWitchPotionState({
        canUseProtection: protectionResult.canUse,
        canUseAttack: attackResult.canUse,
        nightDeaths: protectionResult.nightDeaths,
        protectionReason: protectionResult.reason,
        attackReason: attackResult.reason,
      });

      logger.debug('女巫药剂状态更新', {
        canUseProtection: protectionResult.canUse,
        canUseAttack: attackResult.canUse,
        nightDeaths: protectionResult.nightDeaths,
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
          title: t('gameComponent.skillManager.hunterStatus'),
          description: t('gameComponent.skillManager.canCounter'),
        });
      }
    } catch (error) {
      logger.error('猎人濒死技能触发失败', error);
      toast({
        title: t('gameComponent.skillManager.detectFailed'),
        description: t('gameComponent.skillManager.detectFailedDesc'),
        variant: 'destructive',
      });
    }
  };

  // 检查被动技能状态
  useEffect(() => {
    if (isWitch && currentPhase === 3) {
      // 夜晚阶段
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
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between text-werewolf-purple'>
          <div className='flex items-center gap-2'>
            <Zap className='w-5 h-5' />
            {t('gameComponent.skillManager.title')}
          </div>
          <Badge variant='outline' className='border-werewolf-purple/30'>
            {t('gameComponent.skillManager.roundPhaseBadge', {
              round: currentRound,
              phase: phaseDisplayName,
            })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* 法官技能冲突检测 */}
        {isJudge && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-werewolf-purple flex items-center gap-2'>
              <AlertTriangle className='w-4 h-4' />
              {t('gameComponent.skillManager.conflictDetection')}
            </h4>

            <div className='flex gap-2'>
              <Button
                onClick={detectConflicts}
                disabled={loading}
                size='sm'
                variant='outline'
                className='border-werewolf-purple/30 hover:bg-werewolf-purple/20'
              >
                {loading ? (
                  <>
                    <Clock className='w-4 h-4 mr-2 animate-spin' />
                    {t('gameComponent.skillManager.detecting')}
                  </>
                ) : (
                  <>
                    <Zap className='w-4 h-4 mr-2' />
                    {t('gameComponent.skillManager.detectConflicts')}
                  </>
                )}
              </Button>
            </div>

            {conflictData && (
              <Alert
                className={
                  conflictData.conflicts > 0
                    ? 'border-red-500/30 bg-red-500/10'
                    : 'border-green-500/30 bg-green-500/10'
                }
              >
                <AlertTriangle className='h-4 w-4' />
                <AlertDescription>
                  {conflictData.conflicts > 0
                    ? t('gameComponent.skillManager.conflictCountDesc', {
                        count: conflictData.conflicts,
                      })
                    : t('gameComponent.skillManager.noConflictDesc')}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Separator className='bg-werewolf-purple/30' />

        {/* 女巫药剂状态 */}
        {isWitch && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-purple-400 flex items-center gap-2'>
              <Beaker className='w-4 h-4' />
              {t('gameComponent.skillManager.witchPotionStatus')}
            </h4>

            <div className='grid grid-cols-2 gap-3'>
              {/* 解药状态 */}
              <Card
                className={`bg-werewolf-dark/50 border ${witchPotionState.canUseProtection ? 'border-green-500/50' : 'border-gray-500/50'}`}
              >
                <CardContent className='p-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Heart className='w-4 h-4 text-green-400' />
                      <span className='text-sm font-medium'>
                        {t('gameComponent.skillManager.antidote')}
                      </span>
                    </div>
                    <Badge
                      variant={
                        witchPotionState.canUseProtection
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {witchPotionState.canUseProtection
                        ? t('common.available')
                        : t('common.unavailable')}
                    </Badge>
                  </div>
                  {witchPotionState.protectionReason && (
                    <p className='text-xs text-gray-400 mt-2'>
                      {witchPotionState.protectionReason}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* 毒药状态 */}
              <Card
                className={`bg-werewolf-dark/50 border ${witchPotionState.canUseAttack ? 'border-red-500/50' : 'border-gray-500/50'}`}
              >
                <CardContent className='p-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Skull className='w-4 h-4 text-red-400' />
                      <span className='text-sm font-medium'>
                        {t('gameComponent.skillManager.poison')}
                      </span>
                    </div>
                    <Badge
                      variant={
                        witchPotionState.canUseAttack
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {witchPotionState.canUseAttack
                        ? t('common.available')
                        : t('common.unavailable')}
                    </Badge>
                  </div>
                  {witchPotionState.attackReason && (
                    <p className='text-xs text-gray-400 mt-2'>
                      {witchPotionState.attackReason}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 夜晚死亡信息 */}
            {witchPotionState.nightDeaths &&
              witchPotionState.nightDeaths.length > 0 && (
                <div className='bg-werewolf-dark/30 p-3 rounded-lg'>
                  <h5 className='text-xs font-medium text-red-400 mb-2'>
                    {t('gameComponent.skillManager.nightDeaths')}
                  </h5>
                  <ScrollArea className='h-20'>
                    <div className='space-y-1'>
                      {witchPotionState.nightDeaths.map(
                        (
                          death: {
                            userId: string;
                            reason: string;
                            [key: string]: unknown;
                          },
                          index: number
                        ) => (
                          <div
                            key={index}
                            className='text-xs text-gray-300 p-1 bg-werewolf-dark/50 rounded'
                          >
                            {t('gameComponent.skillManager.target')}:{' '}
                            {(death.target_user_id as string)?.slice(-8)} |{' '}
                            {t('gameComponent.skillManager.skill')}:{' '}
                            {death.skill_name as string}
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
          </div>
        )}

        <Separator className='bg-werewolf-purple/30' />

        {/* 猎人濒死状态 */}
        {isHunter && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-orange-400 flex items-center gap-2'>
              <Target className='w-4 h-4' />
              {t('gameComponent.skillManager.hunterStatus')}
            </h4>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Badge
                  variant={hunterDyingActive ? 'destructive' : 'secondary'}
                >
                  {hunterDyingActive
                    ? t('gameComponent.skillManager.dyingState')
                    : t('gameComponent.skillManager.normalState')}
                </Badge>
                {hunterDyingActive && (
                  <span className='text-xs text-orange-400'>
                    {t('gameComponent.skillManager.canCounter')}
                  </span>
                )}
              </div>

              {!hunterDyingActive && isJudge && (
                <Button
                  onClick={triggerHunterDying}
                  size='sm'
                  variant='destructive'
                  className='text-xs'
                >
                  <Skull className='w-3 h-3 mr-1' />
                  {t('gameComponent.skillManager.triggerDying')}
                </Button>
              )}
            </div>

            {hunterDyingActive && (
              <Alert className='border-orange-500/30 bg-orange-500/10'>
                <Target className='h-4 w-4' />
                <AlertDescription className='text-xs'>
                  {t('gameComponent.skillManager.hunterDyingActive', {
                    seconds: 40,
                  })}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* 被动技能说明 */}
        <div className='bg-werewolf-dark/30 p-3 rounded-lg'>
          <h5 className='text-xs font-medium text-werewolf-purple mb-2'>
            {t('gameComponent.skillManager.passiveSkillsTitle')}
          </h5>
          <div className='text-xs text-gray-400 space-y-1'>
            <p>• {t('gameComponent.skillManager.passiveSkillDemonImmune')}</p>
            <p>• {t('gameComponent.skillManager.passiveSkillMultiProtect')}</p>
            <p>• {t('gameComponent.skillManager.passiveSkillHunterRevenge')}</p>
            <p>• {t('gameComponent.skillManager.passiveSkillWitchPotion')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSkillManager;
