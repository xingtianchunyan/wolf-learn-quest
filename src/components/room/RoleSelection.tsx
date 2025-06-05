
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRoleConfiguration, expandRoles } from '@/utils/roleConfiguration';
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
  const expandedRoles = expandRoles(roleConfigs);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple text-lg">{t('select_role')}</CardTitle>
        <p className="text-xs text-gray-400">
          {t('current_config')}: {maxPlayers}{t('players_game')} ({expandedRoles.length}{t('roles')})
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-3 pt-0">
        <ScrollArea className="flex-1 pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px]">
            {expandedRoles.map((role) => (
              <div 
                key={role.instanceId}
                className={`relative p-3 rounded-lg cursor-pointer transition-all ${
                  selectedCharacter === role.instanceId
                    ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                    : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                }`}
                onClick={() => onCharacterSelect(role.instanceId)}
              >
                <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-2 flex items-center justify-center">
                  <img 
                    src={role.image} 
                    alt={t(role.name)} 
                    className="max-h-full max-w-full p-1"
                  />
                </div>
                <h3 className="font-bold text-sm mb-1">
                  {t(role.name)}
                  <span 
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded ${
                      role.team === 'Village' ? 'bg-green-900/60 text-green-200' : 
                      role.team === 'Werewolves' ? 'bg-red-900/60 text-red-200' :
                      'bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    {t(role.team.toLowerCase())}
                  </span>
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2">{t(role.description)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
