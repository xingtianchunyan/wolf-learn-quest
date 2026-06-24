import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Sword, Eye, Heart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface SkillConflict {
  id: string;
  conflictingSkills: Array<{
    skillName: string;
    userId: string;
    userName: string;
    priority: number;
    targetUserId?: string;
    targetUserName?: string;
  }>;
  resolutionRule: string;
  phase: string;
  roundNumber: number;
  status: 'pending' | 'resolving' | 'resolved';
}

interface SkillConflictResolution {
  action?: 'priority' | 'cancel_all';
  resolved?: boolean;
}

interface SkillConflictVisualizationProps {
  conflicts: SkillConflict[];
  onResolveConflict: (
    conflictId: string,
    resolution: SkillConflictResolution
  ) => void;
  gamePhase: string;
  isJudge: boolean;
}

const skillIcons: Record<string, React.ReactNode> = {
  vigil: <Shield className='w-4 h-4' />,
  night_attack: <Sword className='w-4 h-4' />,
  magic_potion: <Heart className='w-4 h-4' />,
  investigation: <Eye className='w-4 h-4' />,
  default: <Zap className='w-4 h-4' />,
};

const skillColors: Record<string, string> = {
  vigil: 'bg-blue-500',
  night_attack: 'bg-red-500',
  magic_potion: 'bg-green-500',
  investigation: 'bg-purple-500',
  default: 'bg-gray-500',
};

const SkillConflictVisualization: React.FC<SkillConflictVisualizationProps> = ({
  conflicts,
  onResolveConflict,
  gamePhase,
  isJudge,
}) => {
  const { t } = useLanguage();
  const [resolutionProgress, setResolutionProgress] = useState<
    Record<string, number>
  >({});
  const [selectedConflict, setSelectedConflict] = useState<string | null>(null);

  useEffect(() => {
    // 模拟冲突解决进度
    conflicts.forEach(conflict => {
      if (conflict.status === 'resolving') {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setResolutionProgress(prev => ({
            ...prev,
            [conflict.id]: progress,
          }));

          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onResolveConflict(conflict.id, { resolved: true });
            }, 500);
          }
        }, 200);

        return () => clearInterval(interval);
      }
    });
  }, [conflicts, onResolveConflict]);

  const getSkillIcon = (skillName: string) => {
    return skillIcons[skillName] || skillIcons.default;
  };

  const getSkillColor = (skillName: string) => {
    return skillColors[skillName] || skillColors.default;
  };

  const getConflictDescription = (conflict: SkillConflict) => {
    const skills = conflict.conflictingSkills;
    if (skills.length === 2) {
      const [skill1, skill2] = skills;

      if (skill1.skillName === 'vigil' && skill2.skillName === 'night_attack') {
        return t('gameComponent.conflictVisualization.guardVsWerewolf', {
          guard: skill1.userName,
          target: skill1.targetUserName || '',
          attacker: skill2.userName,
        });
      }

      if (
        skill1.skillName === 'magic_potion' &&
        skill2.skillName === 'night_attack'
      ) {
        return t('gameComponent.conflictVisualization.witchVsWerewolf', {
          witch: skill1.userName,
          target: skill1.targetUserName || '',
          attacker: skill2.userName,
        });
      }
    }

    return t('gameComponent.conflictVisualization.defaultConflict');
  };

  const getResolutionExplanation = (conflict: SkillConflict) => {
    switch (conflict.resolutionRule) {
      case 'priority':
        return t('gameComponent.conflictVisualization.priorityRule');
      case 'cancel_all':
        return t('gameComponent.conflictVisualization.cancelAllRule');
      case 'first_wins':
        return t('gameComponent.conflictVisualization.firstWinsRule');
      default:
        return t('gameComponent.conflictVisualization.defaultRule');
    }
  };

  if (conflicts.length === 0) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <AlertTriangle className='w-5 h-5 text-warning' />
        <h3 className='text-lg font-semibold'>
          {t('gameComponent.conflictVisualization.title')}
        </h3>
        <Badge variant='secondary'>
          {t('gameComponent.conflictVisualization.count', {
            count: conflicts.length,
          })}
        </Badge>
      </div>

      <AnimatePresence>
        {conflicts.map(conflict => (
          <motion.div
            key={conflict.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='mb-4'
          >
            <Card
              className={`${conflict.status === 'pending' ? 'border-warning' : conflict.status === 'resolving' ? 'border-info' : 'border-success'}`}
            >
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-base flex items-center gap-2'>
                    <AlertTriangle className='w-4 h-4' />
                    {t('gameComponent.conflictVisualization.roundPhase', {
                      round: conflict.roundNumber,
                      phase: t(`game.phase.${conflict.phase}` as never),
                    })}
                  </CardTitle>
                  <Badge
                    variant={
                      conflict.status === 'pending'
                        ? 'destructive'
                        : conflict.status === 'resolving'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {conflict.status === 'pending'
                      ? t('gameComponent.conflictVisualization.pending')
                      : conflict.status === 'resolving'
                        ? t('gameComponent.conflictVisualization.resolving')
                        : t('gameComponent.conflictVisualization.resolved')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='space-y-4'>
                {/* 冲突技能展示 */}
                <div className='space-y-3'>
                  <h4 className='font-medium text-sm'>
                    {t(
                      'gameComponent.conflictVisualization.conflictingSkillsTitle'
                    )}
                  </h4>
                  <div className='grid gap-2'>
                    {conflict.conflictingSkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className='flex items-center gap-3 p-3 bg-muted rounded-lg'
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className={`p-2 rounded-full ${getSkillColor(skill.skillName)} text-white`}
                        >
                          {getSkillIcon(skill.skillName)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                              {skill.skillName}
                            </span>
                            <Badge variant='outline'>
                              {t(
                                'gameComponent.conflictVisualization.priority',
                                {
                                  priority: skill.priority,
                                }
                              )}
                            </Badge>
                          </div>
                          <div className='text-sm text-muted-foreground truncate'>
                            {skill.userName}
                            {skill.targetUserName && (
                              <span> → {skill.targetUserName}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 冲突描述 */}
                <div className='p-3 bg-warning/10 rounded-lg border border-warning/20'>
                  <p className='text-sm'>{getConflictDescription(conflict)}</p>
                </div>

                {/* 解决规则说明 */}
                <div className='p-3 bg-info/10 rounded-lg border border-info/20'>
                  <p className='text-sm font-medium mb-1'>
                    {t('gameComponent.conflictVisualization.solutionTitle')}
                  </p>
                  <p className='text-sm'>
                    {getResolutionExplanation(conflict)}
                  </p>
                </div>

                {/* 解决进度 */}
                {conflict.status === 'resolving' && (
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>
                        {t('gameComponent.conflictVisualization.progressTitle')}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        {t(
                          'gameComponent.conflictVisualization.progressPercent',
                          {
                            progress: resolutionProgress[conflict.id] || 0,
                          }
                        )}
                      </span>
                    </div>
                    <Progress
                      value={resolutionProgress[conflict.id] || 0}
                      className='h-2'
                    />
                  </div>
                )}

                {/* 法官操作按钮 */}
                {isJudge && conflict.status === 'pending' && (
                  <div className='flex gap-2 pt-2'>
                    <Button
                      size='sm'
                      onClick={() =>
                        onResolveConflict(conflict.id, { action: 'priority' })
                      }
                    >
                      {t(
                        'gameComponent.conflictVisualization.resolveByPriority'
                      )}
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        onResolveConflict(conflict.id, { action: 'cancel_all' })
                      }
                    >
                      {t('gameComponent.conflictVisualization.cancelAll')}
                    </Button>
                  </div>
                )}

                {/* 详细信息切换 */}
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full'
                  onClick={() =>
                    setSelectedConflict(
                      selectedConflict === conflict.id ? null : conflict.id
                    )
                  }
                >
                  {selectedConflict === conflict.id
                    ? t('gameComponent.conflictVisualization.hideDetails')
                    : t('gameComponent.conflictVisualization.showDetails')}
                  {t('gameComponent.conflictVisualization.details')}
                </Button>

                {/* 详细信息展开 */}
                <AnimatePresence>
                  {selectedConflict === conflict.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='space-y-2 text-sm text-muted-foreground'
                    >
                      <div>
                        {t(
                          'gameComponent.conflictVisualization.conflictIdLabel'
                        )}
                        : {conflict.id}
                      </div>
                      <div>
                        {t('gameComponent.conflictVisualization.detectTime')}:{' '}
                        {new Date().toLocaleTimeString()}
                      </div>
                      <div>
                        {t(
                          'gameComponent.conflictVisualization.gamePhaseLabel'
                        )}
                        : {gamePhase}
                      </div>
                      <div>
                        {t('gameComponent.conflictVisualization.skillDetails')}:{' '}
                        {conflict.conflictingSkills
                          .map(skill => `${skill.skillName}(${skill.priority})`)
                          .join(', ')}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SkillConflictVisualization;
