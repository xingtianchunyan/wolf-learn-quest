import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface GuardProtectionInterfaceProps {
  onProtect: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const GuardProtectionInterface: React.FC<GuardProtectionInterfaceProps> = ({
  onProtect,
  availablePlayers,
}) => {
  const { t } = useLanguage();

  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Shield className='w-4 h-4 text-green-400' />
          {t('gameComponent.interfaces.guardProtection.title')}
          <Badge variant='outline' className='text-green-400'>
            {t('gameComponent.interfaces.guardProtection.skillBadge')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {availablePlayers.map(player => (
          <Button
            key={player.userId}
            variant='outline'
            size='sm'
            onClick={() => onProtect(player.userId)}
            className='w-full justify-start text-green-400 border-green-400'
          >
            {t('gameComponent.interfaces.guardProtection.protect', {
              target: player.name,
            })}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default GuardProtectionInterface;
