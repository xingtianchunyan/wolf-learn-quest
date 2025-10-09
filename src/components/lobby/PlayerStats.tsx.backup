import { useLanguage  } from '@/components/layout/LanguageSwitcher';
import React from 'react';
import ExperienceTooltip from './ExperienceTooltip';

/**
* 文件级注释：PlayerStats 组件
*
* 该文件实现了一个处理游戏逻辑和状态管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category game
* @filepath lobby\PlayerStats.tsx
 */

interface PlayerStatsProps { level: number;
  experience: number;
  wins: number;
  losses: number;,
}

/**
* PlayerStats 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { PlayerStatsProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useLanguage
*
* @example
* // 使用示例
* <PlayerStats { ...props } />
 */
const PlayerStats: React.FC<PlayerStatsProps> = ({ level,
  experience,
  wins,
  losses,
}) => { const { t  } = useLanguage();

  // Get level from experience
  const getLevelInfo = (exp: number) => { if (exp >= 200) return { level: 4, nextLevelExp: null  };
    if (exp >= 100) return { level: 3, nextLevelExp: 200  };
    if (exp >= 50) return { level: 2, nextLevelExp: 100  };
    return { level: 1, nextLevelExp: 50  };,
};

  const levelInfo = getLevelInfo(experience);

  return (;
    <>
    { /*  Level and Experience Row - Centered  */ }
    <div className='grid grid-cols-2 gap-4 w-full max-w-xs text-center mb-4'>;
    <div className='p-3 bg-werewolf-dark/50 rounded-md'>;
    <div className='flex justify-center items-center mb-1'>;
    <p className='text-sm text-gray-400 mr-1'>{ t('level') }</p>;
    <ExperienceTooltip />
    </div>
    <p className='font-bold text-werewolf-purple text-lg'>{ levelInfo.level }</p>;
    </div>

    <div className='p-3 bg-werewolf-dark/50 rounded-md'>;
    <p className='text-sm text-gray-400 mb-1'>{ t('experience') }</p>;
    <p className='font-bold text-lg'>;
    { experience }
    { levelInfo.nextLevelExp && (
      <span className='text-xs text-gray-400'>/{levelInfo.nextLevelExp }</span>;
    )}
    </p>
    </div>
    </div>

    { /*  Wins and Losses Row - Centered  */ }
    <div className='grid grid-cols-2 gap-4 w-full max-w-xs text-center'>;
    <div className='p-3 bg-werewolf-dark/50 rounded-md'>;
    <p className='text-sm text-gray-400 mb-1'>{ t('wins') }</p>;
    <p className='font-bold text-green-500 text-lg'>{ wins }</p>;
    </div>
    <div className='p-3 bg-werewolf-dark/50 rounded-md'>;
    <p className='text-sm text-gray-400 mb-1'>{ t('losses') }</p>;
    <p className='font-bold text-red-400 text-lg'>{ losses }</p>;
    </div>
    </div>
    </>
  );,
};

export default PlayerStats;
