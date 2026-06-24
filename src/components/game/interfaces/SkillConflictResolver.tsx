import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Zap, Shield, Target, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toPhaseName } from '@/utils/phaseUtils';
import { createLogger } from '@/lib/logger';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { SkillConflictData, ConflictingSkill } from '@/types/skill.types';

const logger = createLogger('skill-conflict-resolver');

// 类型别名用于组件内部
type SkillConflict = SkillConflictData;

interface SkillConflictResolverProps {
  gameStateId: string;
  currentRound: number;
  currentPhase: number;
  isJudge: boolean;
  onConflictResolved?: (conflictId: string) => void;
}

export const SkillConflictResolver: React.FC<SkillConflictResolverProps> = ({
  gameStateId,
  currentRound,
  currentPhase,
  isJudge,
  onConflictResolved,
}) => {
  const { t } = useLanguage();
  const [conflicts, setConflicts] = useState<SkillConflict[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingConflictId, setProcessingConflictId] = useState<
    string | null
  >(null);

  // 获取技能冲突记录
  useEffect(() => {
    const fetchConflicts = async () => {
      const { data, error } = await supabase
        .from('skill_conflicts')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching skill conflicts:', error);
      } else if (data) {
        setConflicts(data as unknown as SkillConflict[]);
      }
    };

    fetchConflicts();
  }, [gameStateId]);

  // 实时监听冲突变化
  useEffect(() => {
    const channel = supabase
      .channel(`skill_conflicts_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_conflicts',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        payload => {
          if (payload.new && typeof payload.new === 'object') {
            const newConflict = payload.new as SkillConflict;
            if (payload.eventType === 'INSERT') {
              setConflicts(current => [newConflict, ...current]);
            } else if (payload.eventType === 'UPDATE') {
              setConflicts(current =>
                current.map(c => (c.id === newConflict.id ? newConflict : c))
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId]);

  // 检测技能冲突
  const detectConflicts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('detect_skill_conflicts', {
        p_game_state_id: gameStateId,
        p_round_number: currentRound,
        p_phase: toPhaseName(currentPhase as 1 | 2 | 3 | 4),
      });

      if (error) {
        logger.error('Error detecting conflicts:', error);
      } else if (data) {
        logger.debug('Conflicts detected:', data);
      }
    } catch (error) {
      logger.error('Error detecting conflicts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 手动解决冲突
  const resolveConflict = async (
    conflictId: string,
    resolvedSkillId: string
  ) => {
    setProcessingConflictId(conflictId);
    try {
      const { error } = await supabase
        .from('skill_conflicts')
        .update({
          resolved_skill_id: resolvedSkillId,
          resolution_rule: 'manual',
        })
        .eq('id', conflictId);

      if (error) {
        logger.error('Error resolving conflict:', error);
      } else {
        onConflictResolved?.(conflictId);
      }
    } catch (error) {
      logger.error('Error resolving conflict:', error);
    } finally {
      setProcessingConflictId(null);
    }
  };

  // 获取技能优先级颜色
  const getPriorityColor = (priority: number) => {
    if (priority <= 50) return 'text-red-400';
    if (priority <= 100) return 'text-yellow-400';
    return 'text-green-400';
  };

  // 获取解决规则文本
  const getResolutionRuleText = (rule: string) => {
    switch (rule) {
      case 'priority':
        return t('gameComponent.conflict.resolutionRulePriority');
      case 'manual':
        return t('gameComponent.conflict.resolutionRuleManual');
      case 'random':
        return t('gameComponent.conflict.resolutionRuleRandom');
      default:
        return t('gameComponent.conflict.resolutionRuleUnknown');
    }
  };

  const currentPhaseConflicts = conflicts.filter(
    c =>
      c.round_number === currentRound &&
      c.phase === toPhaseName(currentPhase as 1 | 2 | 3 | 4)
  );

  const currentPhaseName = toPhaseName(currentPhase as 1 | 2 | 3 | 4);
  const currentPhaseDisplayName = t(`game.phase.${currentPhaseName}` as never);

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between text-werewolf-purple'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='w-5 h-5' />
            {t('gameComponent.conflict.title')}
          </div>
          {isJudge && (
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
                  {t('gameComponent.conflict.detecting')}
                </>
              ) : (
                <>
                  <Zap className='w-4 h-4 mr-2' />
                  {t('gameComponent.conflict.detectConflicts')}
                </>
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* 当前回合冲突 */}
        {currentPhaseConflicts.length > 0 ? (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-yellow-400 flex items-center gap-2'>
              <AlertTriangle className='w-4 h-4' />
              {t('gameComponent.conflict.currentConflicts')} (
              {t('gameComponent.conflict.roundPhase', {
                round: currentRound,
                phase: currentPhaseDisplayName,
              })}
              )
            </h4>

            {currentPhaseConflicts.map(conflict => (
              <Card
                key={conflict.id}
                className='bg-yellow-500/10 border-yellow-500/30'
              >
                <CardContent className='p-4 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Badge
                      variant='outline'
                      className='border-yellow-500 text-yellow-400'
                    >
                      {t('gameComponent.conflict.conflictId', {
                        id: conflict.id.slice(-8),
                      })}
                    </Badge>
                    <Badge variant='secondary'>
                      {getResolutionRuleText(conflict.resolution_rule)}
                    </Badge>
                  </div>

                  {/* 冲突技能列表 */}
                  <div className='space-y-2'>
                    <h5 className='text-xs font-medium text-gray-300'>
                      {t('gameComponent.conflict.conflictingSkills')}
                    </h5>
                    <ScrollArea className='h-32'>
                      <div className='space-y-2'>
                        {(Array.isArray(conflict.conflicting_skills)
                          ? conflict.conflicting_skills
                          : []
                        ).map((skill: ConflictingSkill, index: number) => (
                          <div
                            key={index}
                            className={`p-2 rounded border transition-all ${
                              skill.skill_use_id === conflict.resolved_skill_id
                                ? 'bg-green-500/20 border-green-500/50'
                                : 'bg-werewolf-dark/50 border-werewolf-purple/30'
                            }`}
                          >
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-2'>
                                <Target className='w-3 h-3' />
                                <span className='text-xs font-medium'>
                                  {skill.skill_name}
                                </span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <span
                                  className={`text-xs ${getPriorityColor(skill.priority)}`}
                                >
                                  {t('gameComponent.conflict.priority', {
                                    priority: skill.priority,
                                  })}
                                </span>
                                {skill.skill_use_id ===
                                  conflict.resolved_skill_id && (
                                  <Badge variant='default' className='text-xs'>
                                    {t('gameComponent.conflict.selected')}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {isJudge && !conflict.resolved_skill_id && (
                              <Button
                                onClick={() =>
                                  resolveConflict(
                                    conflict.id,
                                    skill.skill_use_id
                                  )
                                }
                                disabled={processingConflictId === conflict.id}
                                size='sm'
                                variant='outline'
                                className='mt-2 w-full text-xs'
                              >
                                {processingConflictId === conflict.id
                                  ? t('gameComponent.conflict.processing')
                                  : t('gameComponent.conflict.selectThisSkill')}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {conflict.resolved_skill_id && (
                    <div className='flex items-center gap-2 text-green-400 text-xs'>
                      <Shield className='w-3 h-3' />
                      {t('gameComponent.conflict.resolved')}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center py-4'>
            <Shield className='w-8 h-8 mx-auto mb-2 text-green-400' />
            <p className='text-sm text-green-400'>
              {t('gameComponent.conflict.noConflict')}
            </p>
          </div>
        )}

        <Separator className='bg-werewolf-purple/30' />

        {/* 历史冲突 */}
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-werewolf-purple'>
            {t('gameComponent.conflict.historyTitle')}
          </h4>
          <ScrollArea className='h-32'>
            <div className='space-y-1'>
              {conflicts.filter(
                c =>
                  !(
                    c.round_number === currentRound &&
                    c.phase === currentPhaseName
                  )
              ).length > 0 ? (
                conflicts
                  .filter(
                    c =>
                      !(
                        c.round_number === currentRound &&
                        c.phase === currentPhaseName
                      )
                  )
                  .slice(0, 5)
                  .map(conflict => (
                    <div
                      key={conflict.id}
                      className='flex items-center justify-between p-2 bg-werewolf-dark/30 rounded text-xs'
                    >
                      <span className='text-gray-300'>
                        {t('gameComponent.conflict.historyEntry', {
                          round: conflict.round_number,
                          phase: t(`game.phase.${conflict.phase}` as never),
                        })}
                      </span>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline' className='text-xs'>
                          {t('gameComponent.conflict.conflictCount', {
                            count: Array.isArray(conflict.conflicting_skills)
                              ? conflict.conflicting_skills.length
                              : 0,
                          })}
                        </Badge>
                        <Badge
                          variant={
                            conflict.resolved_skill_id ? 'default' : 'secondary'
                          }
                          className='text-xs'
                        >
                          {conflict.resolved_skill_id
                            ? t('gameComponent.conflict.resolvedBadge')
                            : t('gameComponent.conflict.unresolvedBadge')}
                        </Badge>
                      </div>
                    </div>
                  ))
              ) : (
                <p className='text-xs text-gray-400 text-center py-2'>
                  {t('gameComponent.conflict.noHistory')}
                </p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* 冲突解决说明 */}
        <div className='bg-werewolf-dark/30 p-3 rounded-lg'>
          <h5 className='text-xs font-medium text-werewolf-purple mb-2'>
            {t('gameComponent.conflict.rulesTitle')}
          </h5>
          <div className='text-xs text-gray-400 space-y-1'>
            <p>• {t('gameComponent.conflict.rule1')}</p>
            <p>• {t('gameComponent.conflict.rule2')}</p>
            <p>• {t('gameComponent.conflict.rule3')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillConflictResolver;
