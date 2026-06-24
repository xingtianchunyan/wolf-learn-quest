import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  SkillProgressIndicator,
  SKILL_EXECUTION_STEPS,
} from '@/components/ui/skill-progress-indicator';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface SkillProgressStep {
  label: string;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'active';
}

interface SkillSystemProgressTabProps {
  skillProgress: Record<string, SkillProgressStep[]>;
}

export const SkillSystemProgressTab: React.FC<SkillSystemProgressTabProps> = ({
  skillProgress,
}) => {
  const { t } = useLanguage();

  const getSkillDisplayName = (skillName: string) => {
    switch (skillName) {
      case 'werewolf_attack':
        return t('judge.skillProgress.skillName.werewolf_attack');
      case 'guard_vigil':
        return t('judge.skillProgress.skillName.guard_vigil');
      default:
        return skillName;
    }
  };

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>
            {t('judge.skillProgress.title')}
          </CardTitle>
          <CardDescription>
            {t('judge.skillProgress.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {Object.entries(skillProgress).map(([skillName, steps]) => (
            <SkillProgressIndicator
              key={skillName}
              skillName={skillName}
              skillChineseName={getSkillDisplayName(skillName)}
              steps={steps}
              showProgress={true}
              showStepDetails={true}
            />
          ))}

          {Object.keys(skillProgress).length === 0 && (
            <div className='text-center text-gray-500 py-8'>
              {t('judge.skillProgress.noExecution')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { SKILL_EXECUTION_STEPS };
