/**
 * 文件级注释：大厅玩家信息面板
 * 负责展示正式账号或游客账号的基础资料与头像信息。
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import AvatarUpload from './AvatarUpload';
import PlayerStats from './PlayerStats';

interface PlayerInfoProps {
  className?: string;
  currentUser: (User & { player_name?: string; is_guest?: boolean }) | null;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ className, currentUser }) => {
  const { t } = useLanguage();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState({
    id: '',
    name: 'Player',
    playerId: '',
    level: 1,
    experience: 0,
    wins: 0,
    losses: 0,
  });
  const isGuestUser = Boolean(
    currentUser?.is_guest || currentUser?.user_metadata?.is_guest
  );

  // Fetch player data and avatar from Supabase
  useEffect(() => {
    const fetchPlayerData = async () => {
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
        return;
      }

      try {
        // Fetch user profile data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', currentUser.id)
          .maybeSingle();

        if (userError) {
          console.error('Error fetching user data:', userError);
        }

        const displayName =
          userData?.player_name ||
          currentUser.player_name ||
          currentUser.user_metadata?.display_name ||
          currentUser.user_metadata?.player_name ||
          currentUser.email?.split('@')[0] ||
          'Player';

        setPlayerData({
          id: currentUser.id,
          name: displayName,
          playerId: displayName,
          level: userData?.level || 1,
          experience: userData?.experience || 0,
          wins: userData?.games_won || 0,
          losses: userData?.games_lost || 0,
        });

        // Set avatar URL if available
        if (userData?.avatar_url) {
          setAvatarUrl(userData.avatar_url);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, [currentUser]);

  const handleAvatarUpdate = (url: string) => {
    setAvatarUrl(url);
  };

  // Get level from experience
  const getLevelInfo = (exp: number) => {
    if (exp >= 200) return { level: 4, nextLevelExp: null };
    if (exp >= 100) return { level: 3, nextLevelExp: 200 };
    if (exp >= 50) return { level: 2, nextLevelExp: 100 };
    return { level: 1, nextLevelExp: 50 };
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className='text-center'>
        <CardTitle className='text-werewolf-purple'>
          {t('player_information')}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        {/* Avatar Section - Centered */}
        <AvatarUpload
          avatarUrl={avatarUrl}
          playerName={playerData.name}
          onAvatarUpdate={handleAvatarUpdate}
        />

        {/* Player Name - Centered */}
        <h3 className='text-xl font-bold mb-2 text-center'>
          {playerData.name}
        </h3>

        {isGuestUser && (
          <p className='text-xs text-werewolf-gold mb-2 text-center'>
            {t('guest_account_badge')}
          </p>
        )}

        {/* Player ID - Centered below name */}
        {playerData.playerId && (
          <p className='text-sm text-gray-400 mb-4 text-center'>
            {t('player_id')}: {playerData.playerId}
          </p>
        )}

        {/* Player Stats */}
        <PlayerStats
          level={playerData.level}
          experience={playerData.experience}
          wins={playerData.wins}
          losses={playerData.losses}
        />
      </CardContent>
    </Card>
  );
};

export default PlayerInfo;
