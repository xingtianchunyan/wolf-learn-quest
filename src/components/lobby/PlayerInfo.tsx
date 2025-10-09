import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { supabase  } from '@/integrations/supabase/client';
import { Tooltip,
import { useLanguage  } from '@/components/layout/LanguageSwitcher';
import { User  } from '@supabase/supabase-js';
import React, { useState, useEffect  } from 'react';
import AvatarUpload from './AvatarUpload';
import PlayerStats from './PlayerStats';

/**
* 文件级注释：PlayerInfo 组件
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
* @filepath lobby\PlayerInfo.tsx
 */

  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
 } from '@/components/ui/tooltip';

interface PlayerInfoProps { className?: string;
  currentUser: (User & { player_name?: string  }) | null;,
}

/**
* PlayerInfo 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { PlayerInfoProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useLanguage
*
* @example
* // 使用示例
* <PlayerInfo { ...props } />
 */
const PlayerInfo: React.FC<PlayerInfoProps> = ({ className, currentUser  }) => { const { t  } = useLanguage();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState({ id: '',
    name: 'Player',
    playerId: '',
    level: 1,
    experience: 0,
    wins: 0,
    losses: 0,
   });

  // Fetch player data and avatar from Supabase
  useEffect(() => { const fetchPlayerData = async () => {
      if (!currentUser) {
        setPlayerData({
          id: '',
          name: 'Player',
          playerId: '',
          level: 1,
          experience: 0,
          wins: 0,
          losses: 0,
         });
        setAvatarUrl(null);
        return;,
}

      try { // Fetch user profile data
        const { data: userData, error: userError  } = await supabase;
        .from('users')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();

        if (userError) { console.error('Error fetching user data:', userError);,
}

        const displayName = userData?.player_name ||;
        currentUser.user_metadata?.display_name ||
        currentUser.user_metadata?.player_name ||
        currentUser.email?.split('@')[0] ||
        'Player';

        setPlayerData({ id: currentUser.id,
          name: displayName,
          playerId: displayName,
          level: userData?.level || 1,
          experience: userData?.experience || 0,
          wins: userData?.games_won || 0,
          losses: userData?.games_lost || 0,
         });

        // Set avatar URL if available
        if (userData?.avatar_url) { setAvatarUrl(userData.avatar_url);,
}
      } catch (error) { console.error('Error fetching player data:', error);,
}
    };

    fetchPlayerData();,
}, [currentUser]);

  const handleAvatarUpdate = (url: string) => { setAvatarUrl(url);,
};

  // Get level from experience
  const getLevelInfo = (exp: number) => { if (exp >= 200) return { level: 4, nextLevelExp: null  };
    if (exp >= 100) return { level: 3, nextLevelExp: 200  };
    if (exp >= 50) return { level: 2, nextLevelExp: 100  };
    return { level: 1, nextLevelExp: 50  };,
};

  const levelInfo = getLevelInfo(playerData.experience);

  return (;
    <Card className={ `bg-werewolf-card border-werewolf-purple/30 ${className }`}>;
    <CardHeader className='text-center'>;
    <CardTitle className='text-werewolf-purple'>{ t('player_information') }</CardTitle>;
    </CardHeader>
    <CardContent className='flex flex-col items-center'>;
    { /*  Avatar Section - Centered  */ }
    <AvatarUpload
    avatarUrl={ avatarUrl }
    playerName={ playerData.name }
    onAvatarUpdate={ handleAvatarUpdate }
    />

    { /*  Player Name - Centered  */ }
    <h3 className='text-xl font-bold mb-2 text-center'>{ playerData.name }</h3>;

    { /*  Player ID - Centered below name  */ }
    { playerData.playerId && (
      <p className='text-sm text-gray-400 mb-4 text-center'>{t('player_id') }: { playerData.playerId }</p>;
    )}

    { /*  Player Stats  */ }
    <PlayerStats
    level={ playerData.level }
    experience={ playerData.experience }
    wins={ playerData.wins }
    losses={ playerData.losses }
    />
    </CardContent>
    </Card>
  );,
};

export default PlayerInfo;
