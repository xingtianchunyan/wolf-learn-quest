import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'alive' | 'dead' | 'eliminated';
  className?: string;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  name,
  avatarUrl,
  size = 'md',
  status = 'alive',
  className,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const statusClasses = {
    alive: '',
    dead: 'opacity-50 grayscale',
    eliminated: 'opacity-30 grayscale',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={cn(sizeClasses[size], statusClasses[status], className)}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className='bg-werewolf-purple/20 text-werewolf-purple'>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default PlayerAvatar;
