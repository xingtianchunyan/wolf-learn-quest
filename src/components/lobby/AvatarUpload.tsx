import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';

const logger = createLogger('AvatarUpload');

interface AvatarUploadProps {
  avatarUrl: string | null;
  playerName: string;
  onAvatarUpdate: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  playerName,
  onAvatarUpdate,
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: t('auth_required_avatar'),
          description: t('auth_required_avatar_desc'),
          variant: 'destructive',
        });
        return;
      }

      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: t('upload_failed'),
          description: t('page.avatarUpload.image_file_required'),
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 1 * 1024 * 1024) {
        toast({
          title: t('upload_failed'),
          description: t('page.avatarUpload.image_size_limit'),
          variant: 'destructive',
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/avatar.${fileExt}`;

      // Delete old avatar if exists
      if (avatarUrl) {
        const oldPath = avatarUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${session.user.id}/${oldPath}`]);
        }
      }

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        logger.error('Upload error:', uploadError);
        toast({
          title: t('upload_failed'),
          description: uploadError.message,
          variant: 'destructive',
        });
        return;
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(fileName);

      onAvatarUpdate(publicUrl);

      // Update the user's avatar URL in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('user_id', session.user.id);

      if (updateError) {
        logger.error('Error updating avatar URL:', updateError);
        toast({
          title: t('profile_update_failed'),
          description: t('profile_update_failed_desc'),
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('avatar_uploaded'),
        description: t('avatar_uploaded_desc'),
      });
    } catch (error) {
      logger.error('Avatar upload error:', error);
      toast({
        title: t('upload_failed'),
        description: t('upload_failed_desc'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='relative mb-4 group'>
      <Avatar className='h-24 w-24'>
        <AvatarImage src={avatarUrl || ''} alt={playerName} />
        <AvatarFallback className='bg-werewolf-purple/30 text-xl'>
          {playerName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <Button
        variant='outline'
        size='sm'
        className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-werewolf-dark hover:bg-werewolf-purple/70'
        onClick={() => document.getElementById('avatar-upload')?.click()}
      >
        <Upload size={16} className='mr-1' />
        {t('upload_avatar')}
      </Button>
      <input
        id='avatar-upload'
        type='file'
        accept='image/*'
        onChange={handleAvatarUpload}
        className='hidden'
      />
    </div>
  );
};

export default AvatarUpload;
