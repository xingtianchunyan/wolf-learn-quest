import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRoleConfiguration } from '@/utils/roleConfiguration';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoleSelectionProps {
  maxPlayers: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  selectedCharacter,
  onCharacterSelect
}) => {
  const { t } = useLanguage();
  const roleConfigs = getRoleConfiguration(maxPlayers);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-werewolf-purple">{t('select_role')}</CardTitle>
        <p className="text-sm text-gray-400">
          {t('current_config')}: {maxPlayers}{t('players_game')} ({roleConfigs.reduce((sum, r) => sum + r.count, 0)}{t('roles')})
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]">
            {roleConfigs.map((role) => (
              <div 
                key={role.id}
                className={`relative p-4 rounded-lg cursor-pointer transition-all ${
                  selectedCharacter && selectedCharacter.startsWith(role.id) 
                    ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                    : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                }`}
                onClick={() => onCharacterSelect(role.id)}
              >
                {/* 数量角标 */}
                {role.count > 1 && (
                  <span className="absolute top-2 right-2 bg-werewolf-purple text-white text-xs px-2 py-0.5 rounded-full">
                    x{role.count}
                  </span>
                )}
                <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                  <img 
                    src={role.image} 
                    alt={t(role.name)} 
                    className="max-h-full max-w-full p-2"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">
                  {t(role.name)}
                  <span 
                    className={`ml-2 text-xs px-2 py-0.5 rounded ${
                      role.team === 'Village' ? 'bg-green-900/60 text-green-200' : 
                      role.team === 'Werewolves' ? 'bg-red-900/60 text-red-200' :
                      'bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    {t(role.team.toLowerCase())}
                  </span>
                </h3>
                <p className="text-sm text-gray-300">{t(role.description)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
