import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const ExperienceTooltip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            size={14}
            className='text-gray-400 cursor-help hover:text-werewolf-purple transition-colors'
          />
        </TooltipTrigger>
        <TooltipContent className='bg-werewolf-dark text-white border-werewolf-purple/30 max-w-sm p-4'>
          <div className='space-y-2'>
            <p className='font-semibold text-werewolf-purple'>
              {t('experience_system')}
            </p>
            <div className='space-y-1 text-sm'>
              <p>
                <strong>{t('level_requirements')}:</strong>
              </p>
              <p>• {t('level_1')}</p>
              <p>• {t('level_2')}</p>
              <p>• {t('level_3')}</p>
              <p>• {t('level_4')}</p>
            </div>
            <div className='space-y-1 text-sm mt-3'>
              <p>
                <strong>{t('experience_rewards')}:</strong>
              </p>
              <p>• {t('win_xp')}</p>
              <p>• {t('lose_xp')}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExperienceTooltip;
