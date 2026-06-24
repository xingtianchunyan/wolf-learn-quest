import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const QuestionBankTooltip: React.FC = () => {
  const { t } = useLanguage();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className='h-4 w-4 text-werewolf-purple/60 hover:text-werewolf-purple cursor-help' />
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='max-w-sm bg-werewolf-dark border-werewolf-purple/30 text-white p-4'
        >
          <div className='space-y-3'>
            <div>
              <h4 className='font-semibold text-werewolf-purple mb-2'>
                {t('judge.questionBank.tooltip.usageLogic')}
              </h4>
              <p className='text-sm text-gray-300'>
                {t('judge.questionBank.tooltip.usageLogicDesc')}
              </p>
            </div>

            <div>
              <h4 className='font-semibold text-werewolf-purple mb-2'>
                {t('judge.questionBank.tooltip.fileLimits')}
              </h4>
              <ul className='text-sm text-gray-300 space-y-1'>
                <li>• {t('judge.questionBank.tooltip.formats')}</li>
                <li>• {t('judge.questionBank.tooltip.maxSize')}</li>
                <li>• {t('judge.questionBank.tooltip.contentRequirement')}</li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold text-werewolf-purple mb-2'>
                {t('judge.questionBank.tooltip.aiModel')}
              </h4>
              <div className='text-sm text-gray-300 space-y-1'>
                <p>• {t('judge.questionBank.tooltip.preprocessModel')}</p>
                <p>• {t('judge.questionBank.tooltip.generateModel')}</p>
                <p>• {t('judge.questionBank.tooltip.contextLength')}</p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default QuestionBankTooltip;
