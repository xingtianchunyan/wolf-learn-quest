import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

interface HunterRevengeInterfaceProps {
  onRevenge: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
}

const HunterRevengeInterface: React.FC<HunterRevengeInterfaceProps> = ({
  onRevenge,
  availablePlayers,
}) => {
  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Target className='w-4 h-4' />
          猎人复仇
          <Badge variant='outline'>猎人技能</Badge>
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
            击杀 {player.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default HunterRevengeInterface;
