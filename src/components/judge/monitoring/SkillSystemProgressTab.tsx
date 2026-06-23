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
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>技能执行进度跟踪</CardTitle>
          <CardDescription>
            实时显示技能执行的各个步骤和状态
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {Object.entries(skillProgress).map(([skillName, steps]) => (
            <SkillProgressIndicator
              key={skillName}
              skillName={skillName}
              skillChineseName={
                skillName === 'werewolf_attack'
                  ? '狼人夜袭'
                  : skillName === 'guard_vigil'
                    ? '守卫守夜'
                    : skillName
              }
              steps={steps}
              showProgress={true}
              showStepDetails={true}
            />
          ))}

          {Object.keys(skillProgress).length === 0 && (
            <div className='text-center text-gray-500 py-8'>
              暂无进行中的技能执行
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { SKILL_EXECUTION_STEPS };
