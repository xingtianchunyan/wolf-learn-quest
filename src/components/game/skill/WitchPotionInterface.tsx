import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Skull } from 'lucide-react';

interface WitchPotionInterfaceProps {
  onSavePlayer: (playerId: string) => void;
  onKillPlayer: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string }>;
  hasPoisonPotion: boolean;
  hasAntidotePotion: boolean;
}

const WitchPotionInterface: React.FC<WitchPotionInterfaceProps> = ({
  onSavePlayer,
  onKillPlayer,
  availablePlayers,
  hasPoisonPotion,
  hasAntidotePotion
}) => {
  return (
    <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          药剂接口
          <Badge variant="outline">女巫技能</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasAntidotePotion && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-green-400">解药</span>
            </div>
            <div className="space-y-1">
              {availablePlayers.map(player => (
                <Button
                  key={player.userId}
                  variant="outline"
                  size="sm"
                  onClick={() => onSavePlayer(player.userId)}
                  className="w-full justify-start"
                >
                  救治 {player.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {hasPoisonPotion && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skull className="w-4 h-4 text-red-400" />
              <span className="text-red-400">毒药</span>
            </div>
            <div className="space-y-1">
              {availablePlayers.map(player => (
                <Button
                  key={player.userId}
                  variant="outline"
                  size="sm"
                  onClick={() => onKillPlayer(player.userId)}
                  className="w-full justify-start text-red-400 border-red-400"
                >
                  毒杀 {player.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WitchPotionInterface;