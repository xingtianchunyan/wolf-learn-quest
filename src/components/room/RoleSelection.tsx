
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRoleConfiguration, expandRoles } from '@/utils/roleConfiguration';

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
  const roleConfigs = getRoleConfiguration(maxPlayers);
  const expandedRoles = expandRoles(roleConfigs);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-werewolf-purple">选择角色</CardTitle>
        <p className="text-sm text-gray-400">
          当前配置: {maxPlayers}人局 ({expandedRoles.length}个角色)
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]">
            {expandedRoles.map((role) => (
              <div 
                key={role.instanceId}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedCharacter === role.instanceId 
                    ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                    : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                }`}
                onClick={() => onCharacterSelect(role.instanceId)}
              >
                <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                  <img 
                    src={role.image} 
                    alt={role.name} 
                    className="max-h-full max-w-full p-2"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">
                  {role.name}
                  <span 
                    className={`ml-2 text-xs px-2 py-0.5 rounded ${
                      role.team === 'Village' ? 'bg-green-900/60 text-green-200' : 
                      role.team === 'Werewolves' ? 'bg-red-900/60 text-red-200' :
                      'bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    {role.team}
                  </span>
                </h3>
                <p className="text-sm text-gray-300">{role.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
