
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { User } from '@supabase/supabase-js';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import AvatarUpload from './AvatarUpload';
import PlayerStats from './PlayerStats';

interface PlayerInfoProps {
  className?: string;
  currentUser: (User & { player_name?: string }) | null;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ className, currentUser }) => {
  const { t } = useLanguage();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getInitialPlayerData = (user: (User & { player_name?: string }) | null) => {
    if (!user) {
      return {
        id: '',
        name: 'Player',
        playerId: '',
        level: 1,
        experience: 0,
        wins: 0,
        losses: 0,
      };
    }

    const displayName = user.user_metadata?.display_name || 
                       user.user_metadata?.player_name || 
                       user.email?.split('@')[0] || 
                       'Player';

    return {
      id: user.id,
      name: user.user_metadata?.player_name || user.email?.split('@')[0] || 'Player',
      playerId: displayName,
      level: 1,
      experience: 0,
      wins: 0,
      losses: 0,
    };
  };

  const [playerData, setPlayerData] = useState(() => getInitialPlayerData(currentUser));
  
  // Fetch player data from Supabase
  useEffect(() => {
    setPlayerData(getInitialPlayerData(currentUser));
  }, [currentUser]);
  
  // const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     if (!event.target.files || event.target.files.length === 0 || !currentUser) {
  //       return;
  //     }
      
  //     const file = event.target.files[0];
  //     const fileExt = file.name.split('.').pop();
  //     const fileName = `${currentUser.id}-${Math.random()}.${fileExt}`;
  //     const filePath = `${fileName}`;
      
  //     // Upload the file to Supabase Storage
  //     const { error: uploadError } = await supabase.storage
  //       .from('avatars')
  //       .upload(filePath, file);
        
  //     if (uploadError) {
  //       toast({
  //         title: "Upload failed",
  //         description: uploadError.message,
  //         variant: "destructive",
  //       });
  //       return;
  //     }
      
  //     // Get the public URL
  //     const { data: { publicUrl } } = supabase.storage
  //       .from('avatars')
  //       .getPublicUrl(filePath);
        
  //     setAvatarUrl(publicUrl);
      
  //     // Update the user's avatar URL in the database
  //     const { error: updateError } = await supabase
  //       .from('users')
  //       .update({ avatar_url: publicUrl })
  //       .eq('user_id', currentUser.id);
        
  //     if (updateError) {
  //       console.error("Error updating avatar URL:", updateError);
  //       toast({
  //         title: "Failed to update profile",
  //         description: "Your avatar was uploaded but we couldn't update your profile",
  //         variant: "destructive",
  //       });
  //       return;
  //     }
      
  //     toast({
  //       title: "Avatar uploaded",
  //       description: "Your profile has been updated",
  //     });
  //   } catch (error) {
  //     console.error("Avatar upload error:", error);
  //     toast({
  //       title: "Upload failed",
  //       description: "Something went wrong. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };
  
  // Get level from experience
  const getLevelInfo = (exp: number) => {
    if (exp >= 200) return { level: 4, nextLevelExp: null };
    if (exp >= 100) return { level: 3, nextLevelExp: 200 };
    if (exp >= 50) return { level: 2, nextLevelExp: 100 };
    return { level: 1, nextLevelExp: 50 };
  };
  
  const levelInfo = getLevelInfo(playerData.experience);
  
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
