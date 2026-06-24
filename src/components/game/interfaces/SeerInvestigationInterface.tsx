import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface SeerInvestigationInterfaceProps {
  onInvestigate: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const SeerInvestigationInterface: React.FC<SeerInvestigationInterfaceProps> = ({
  onInvestigate,
  availablePlayers,
}) => {
  const { t } = useLanguage();

  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Eye className='w-4 h-4' />
          {t('gameComponent.interfaces.seerInvestigation.title')}
          <Badge variant='outline'>
            {t('gameComponent.interfaces.seerInvestigation.skillBadge')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {availablePlayers.map(player => (
          <Button
            key={player.userId}
            variant='outline'
            size='sm'
            onClick={() => onInvestigate(player.userId)}
            className='w-full justify-start'
          >
            {t('gameComponent.interfaces.seerInvestigation.investigate', {
              target: player.name,
            })}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default SeerInvestigationInterface;
