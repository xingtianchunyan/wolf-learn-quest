import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EnhancedSkillUse } from '@/hooks/skill/useSkillData';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface SkillSystemOverviewTabProps {
  skillUses: EnhancedSkillUse[];
  stats: {
    totalUses: number;
    activeEffects: number;
    queuedEffects: number;
    completedEffects: number;
    conflictCount: number;
  };
}

export const SkillSystemOverviewTab: React.FC<SkillSystemOverviewTabProps> = ({
  skillUses,
  stats,
}) => {
  const { t } = useLanguage();

  const getPhaseName = (phase?: string) => {
    if (!phase) return '';
    switch (phase.toLowerCase()) {
      case 'day':
      case 'day_discussion':
        return t('game.phase.day_discussion');
      case 'evening':
      case 'evening_quiz':
        return t('game.phase.evening_quiz');
      case 'night':
      case 'night_action':
        return t('game.phase.night_action');
      case 'dawn':
      case 'dawn_quiz':
        return t('game.phase.dawn_quiz');
      default:
        return phase;
    }
  };

  const getExecutionStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return t('judge.skillOverview.executionStatus.completed');
      case 'pending':
        return t('judge.skillOverview.executionStatus.pending');
      case 'failed':
        return t('judge.skillOverview.executionStatus.failed');
      default:
        return status;
    }
  };

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>
              {t('judge.skillOverview.currentActiveSkills')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {skillUses.length === 0 ? (
              <div className='text-center text-gray-500 py-4'>
                {t('judge.skillOverview.noActiveSkills')}
              </div>
            ) : (
              <div className='space-y-2'>
                {skillUses.slice(0, 5).map((skill: EnhancedSkillUse) => (
                  <div
                    key={skill.id}
                    className='flex items-center justify-between p-2 border rounded'
                  >
                    <div>
                      <span className='font-medium'>
                        {skill.chinese_name || skill.skill_name}
                      </span>
                      <span className='text-sm text-gray-500 ml-2'>
                        {t('judge.skillOverview.roundPhase', {
                          round: skill.round_number,
                          phase: getPhaseName(skill.phase),
                        })}
                      </span>
                    </div>
                    <Badge
                      variant={
                        skill.execution_status === 'completed'
                          ? 'default'
                          : skill.execution_status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {getExecutionStatusLabel(skill.execution_status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>
              {t('judge.skillOverview.effectQueue.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span>{t('judge.skillOverview.effectQueue.queued')}</span>
                <Badge variant='secondary'>{stats.queuedEffects}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>{t('judge.skillOverview.effectQueue.completed')}</span>
                <Badge variant='default'>{stats.completedEffects}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>{t('judge.skillOverview.effectQueue.conflicts')}</span>
                <Badge variant='outline'>{stats.conflictCount}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>
            {t('judge.skillOverview.recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {skillUses.length === 0 ? (
            <div className='text-center text-gray-500 py-4'>
              {t('judge.skillOverview.noActivity')}
            </div>
          ) : (
            <div className='space-y-2'>
              {skillUses.slice(0, 10).map((skill: EnhancedSkillUse) => (
                <div
                  key={skill.id}
                  className='flex items-center gap-3 p-2 border-l-4 border-blue-200'
                >
                  <div className='flex-1'>
                    <div className='font-medium'>
                      {skill.chinese_name || skill.skill_name}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {t('judge.skillOverview.activityLine', {
                        date: new Date(skill.created_at).toLocaleString(),
                        round: skill.round_number,
                        phase: getPhaseName(skill.phase),
                      })}
                    </div>
                  </div>
                  <Badge>
                    {getExecutionStatusLabel(skill.execution_status)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
