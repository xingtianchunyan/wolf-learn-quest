
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import AvatarUpload from './AvatarUpload';
import PlayerStats from './PlayerStats';

interface PlayerInfoProps {
  className?: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ className }) => {
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
  
  // Fetch player data from Supabase
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Try to get player data from users table
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching player data:", error);
            return;
          }
          
          if (data) {
            // Get display name from auth user metadata or display_name
            const displayName = session.user.user_metadata?.display_name || 
                               session.user.user_metadata?.player_name || 
                               data.player_name || 
                               session.user.email?.split('@')[0] || 
                               'Player';
                               
            setPlayerData({
              id: data.user_id || session.user.id,
              name: data.player_name || session.user.email?.split('@')[0] || 'Player',
              playerId: displayName, // Use display name as Player ID
              level: data.level || 1,
              experience: data.experience || 0,
              wins: data.games_won || 0,
              losses: data.games_lost || 0,
            });
            
            if (data.avatar_url) {
              setAvatarUrl(data.avatar_url);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };
    
    fetchPlayerData();
    
    // Listen for auth changes to update player data
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchPlayerData();
      } else {
        // Reset player data when logged out
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
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-werewolf-purple">Player Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Avatar Section - Centered */}
        <AvatarUpload 
          avatarUrl={avatarUrl}
          playerName={playerData.name}
          onAvatarUpdate={setAvatarUrl}
        />
        
        {/* Player Name - Centered */}
        <h3 className="text-xl font-bold mb-2 text-center">{playerData.name}</h3>
        
        {/* Player ID - Centered below name */}
        {playerData.playerId && (
          <p className="text-sm text-gray-400 mb-4 text-center">ID: {playerData.playerId}</p>
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
