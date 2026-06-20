import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface SeerInvestigationInterfaceProps {
  onInvestigate: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const SeerInvestigationInterface: React.FC<SeerInvestigationInterfaceProps> = ({
  onInvestigate,
  availablePlayers,
}) => {
  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Eye className='w-4 h-4' />
          预言家查验
          <Badge variant='outline'>预言家技能</Badge>
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
            查验 {player.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default SeerInvestigationInterface;
