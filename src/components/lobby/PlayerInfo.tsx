
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';

interface PlayerInfoProps {
  className?: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ className }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState({
    id: '',
    name: 'Player',
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
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching player data:", error);
            return;
          }
          
          if (data) {
            setPlayerData({
              id: data.user_id || session.user.id,
              name: data.player_name || session.user.email?.split('@')[0] || 'Player',
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
  }, []);
  
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to upload an avatar",
          variant: "destructive",
        });
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) {
        toast({
          title: "Upload failed",
          description: uploadError.message,
          variant: "destructive",
        });
        return;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      setAvatarUrl(publicUrl);
      
      // Update the user's avatar URL in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);
        
      if (updateError) {
        console.error("Error updating avatar URL:", updateError);
        toast({
          title: "Failed to update profile",
          description: "Your avatar was uploaded but we couldn't update your profile",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile has been updated",
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
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
      <CardHeader>
        <CardTitle className="text-werewolf-purple">{t('player_information')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative mb-4 group">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl || ''} alt={playerData.name} />
            <AvatarFallback className="bg-werewolf-purple/30 text-xl">
              {playerData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-werewolf-dark hover:bg-werewolf-purple/70"
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            <Upload size={16} className="mr-1" />
            {t('upload_avatar')}
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2">{playerData.name}</h3>
        
        <div className="grid grid-cols-2 gap-3 w-full text-center mt-4 mb-2">
          <div className="p-2 bg-werewolf-dark/50 rounded-md">
            <div className="flex justify-center items-center">
              <p className="text-sm text-gray-400 mr-1">{t('level')}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-werewolf-dark text-white border-werewolf-purple/30 max-w-xs">
                    <p>{t('level_tooltip')}</p>
                    <ul className="list-disc list-inside text-sm mt-1">
                      <li>Level 1: 0-49 XP</li>
                      <li>Level 2: 50-99 XP</li>
                      <li>Level 3: 100-199 XP</li>
                      <li>Level 4: 200+ XP</li>
                    </ul>
                    <p className="text-sm mt-1">
                      Win: +50 XP, Loss: +30 XP
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="font-bold text-werewolf-purple">{levelInfo.level}</p>
          </div>
          <div className="p-2 bg-werewolf-dark/50 rounded-md">
            <p className="text-sm text-gray-400">{t('experience')}</p>
            <p className="font-bold">
              {playerData.experience}
              {levelInfo.nextLevelExp && (
                <span className="text-xs text-gray-400">/{levelInfo.nextLevelExp}</span>
              )}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 w-full text-center">
          <div className="p-2 bg-werewolf-dark/50 rounded-md">
            <p className="text-sm text-gray-400">{t('wins')}</p>
            <p className="font-bold text-green-500">{playerData.wins}</p>
          </div>
          <div className="p-2 bg-werewolf-dark/50 rounded-md">
            <p className="text-sm text-gray-400">{t('losses')}</p>
            <p className="font-bold text-red-400">{playerData.losses}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerInfo;
