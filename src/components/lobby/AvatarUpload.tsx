
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AvatarUploadProps {
  avatarUrl: string | null;
  playerName: string;
  onAvatarUpdate: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ 
  avatarUrl, 
  playerName, 
  onAvatarUpdate 
}) => {
  const { toast } = useToast();

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
        
      onAvatarUpdate(publicUrl);
      
      // Update the user's avatar URL in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('user_id', session.user.id);
        
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

  return (
    <div className="relative mb-4 group">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || ''} alt={playerName} />
        <AvatarFallback className="bg-werewolf-purple/30 text-xl">
          {playerName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-werewolf-dark hover:bg-werewolf-purple/70"
        onClick={() => document.getElementById('avatar-upload')?.click()}
      >
        <Upload size={16} className="mr-1" />
        Upload Avatar
      </Button>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
