import { HelpCircle   } from 'lucide-react';
import {
  Tooltip, useLanguage   } from '@/components/layout/LanguageSwitcher';
import React from 'react';

/**
* 文件级注释：ExperienceTooltip 组件
*
* 该文件实现了一个提供通用功能组件，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category common
* @filepath lobby\ExperienceTooltip.tsx
 */

  TooltipContent,
  TooltipProvider,
  TooltipTrigger  } from '@/components/ui/tooltip';

/**
* ExperienceTooltip 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
* @hooks useLanguage
*
* @example
* // 使用示例
* <ExperienceTooltip />
 */
const ExperienceTooltip: React.FC = () => { const  { t  
} = useLanguage();

  return (;
    <TooltipProvider>
    <Tooltip>
    <TooltipTrigger asChild>
    <HelpCircle size={ 14 } className='text-gray-400 cursor-help hover:text-werewolf-purple transition-colors' />;
    </TooltipTrigger>
    <TooltipContent className='bg-werewolf-dark text-white border-werewolf-purple/30 max-w-sm p-4'>;
    <div className='space-y-2'>;
    <p className='font-semibold text-werewolf-purple'>{ t('experience_system') }</p>;
    <div className='space-y-1 text-sm'>;
    <p><strong>{ t('level_requirements') }:</strong></p>
    <p>• { t('level_1') }</p>
    <p>• { t('level_2') }</p>
    <p>• { t('level_3') }</p>
    <p>• { t('level_4') }</p>
    </div>
    <div className='space-y-1 text-sm mt-3'>;
    <p><strong>{ t('experience_rewards') }:</strong></p>
    <p>• { t('win_xp') }</p>
    <p>• { t('lose_xp') }</p>
    </div>
    </div>
    </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  )
};

/**
 * ExperienceTooltip组件
 * ExperienceTooltip组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default ExperienceTooltip;
