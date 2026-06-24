import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skull } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface WolfKillInterfaceProps {
  onKill: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const WolfKillInterface: React.FC<WolfKillInterfaceProps> = ({
  onKill,
  availablePlayers,
}) => {
  const { t } = useLanguage();

  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Skull className='w-4 h-4 text-red-400' />
          {t('gameComponent.interfaces.wolfKill.title')}
          <Badge variant='outline' className='text-red-400'>
            {t('gameComponent.interfaces.wolfKill.skillBadge')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {availablePlayers.map(player => (
          <Button
            key={player.userId}
            variant='outline'
            size='sm'
            onClick={() => onKill(player.userId)}
            className='w-full justify-start text-red-400 border-red-400'
          >
            {t('gameComponent.interfaces.wolfKill.kill', {
              target: player.name,
            })}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default WolfKillInterface;
