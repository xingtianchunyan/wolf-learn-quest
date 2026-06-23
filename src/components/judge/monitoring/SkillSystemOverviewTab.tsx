import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EnhancedSkillUse } from '@/hooks/skill/useSkillData';

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
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>当前活跃技能</CardTitle>
          </CardHeader>
          <CardContent>
            {skillUses.length === 0 ? (
              <div className='text-center text-gray-500 py-4'>暂无活跃技能</div>
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
                        第{skill.round_number}轮 - {skill.phase}
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
                      {skill.execution_status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>效果队列状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span>排队中</span>
                <Badge variant='secondary'>{stats.queuedEffects}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>已完成</span>
                <Badge variant='default'>{stats.completedEffects}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>冲突解决</span>
                <Badge variant='outline'>{stats.conflictCount}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>最近技能活动</CardTitle>
        </CardHeader>
        <CardContent>
          {skillUses.length === 0 ? (
            <div className='text-center text-gray-500 py-4'>
              暂无技能活动记录
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
                      {new Date(skill.created_at).toLocaleString()} - 第
                      {skill.round_number}轮{skill.phase}阶段
                    </div>
                  </div>
                  <Badge>{skill.execution_status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
