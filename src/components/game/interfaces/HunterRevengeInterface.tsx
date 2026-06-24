import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface HunterRevengeInterfaceProps {
  onRevenge: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const HunterRevengeInterface: React.FC<HunterRevengeInterfaceProps> = ({
  onRevenge,
  availablePlayers,
}) => {
  const { t } = useLanguage();

  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Target className='w-4 h-4' />
          {t('gameComponent.interfaces.hunterRevenge.title')}
          <Badge variant='outline'>
            {t('gameComponent.interfaces.hunterRevenge.skillBadge')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {availablePlayers.map(player => (
          <Button
            key={player.userId}
            variant='outline'
            size='sm'
            onClick={() => onRevenge(player.userId)}
            className='w-full justify-start'
          >
            {t('gameComponent.interfaces.hunterRevenge.revenge', {
              target: player.name,
            })}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default HunterRevengeInterface;
