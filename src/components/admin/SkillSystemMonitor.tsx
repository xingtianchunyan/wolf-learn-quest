import React from 'react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface SkillSystemMonitorProps {
  gameStateId?: string;
}

export const SkillSystemMonitor: React.FC<SkillSystemMonitorProps> = ({
  gameStateId,
}) => {
  const { t } = useLanguage();
  return (
    <div className='p-4 text-sm text-gray-500 border rounded-md'>
      {t('judge.skillAdmin.monitor.placeholder')}
      {gameStateId && (
        <span className='ml-2'>
          {t('judge.skillAdmin.monitor.gameStateLabel', { id: gameStateId })}
        </span>
      )}
    </div>
  );
};
