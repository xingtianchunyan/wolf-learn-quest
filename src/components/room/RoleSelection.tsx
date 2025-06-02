
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRoleConfiguration, getAllAvailableRoles } from '@/utils/roleConfiguration';

interface RoleSelectionProps {
  playerCount: number;
  selectedRole: string | null;
  onRoleSelect: (roleId: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  playerCount,
  selectedRole,
  onRoleSelect,
}) => {
  const roleConfig = getRoleConfiguration(playerCount);
  const availableRoles = getAllAvailableRoles(playerCount);

  if (playerCount < 6 || playerCount > 12) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">角色配置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">
              当前人数：{playerCount}
            </p>
            <p className="text-sm text-gray-500">
              游戏需要 6-12 名玩家才能开始
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">
          选择角色 ({playerCount}人局)
        </CardTitle>
        <div className="text-sm text-gray-400">
          <p className="mb-2">角色配置：</p>
          <div className="flex flex-wrap gap-2">
            {roleConfig.map((role, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-werewolf-purple/30 text-xs"
              >
                {role.count}x {role.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRoles.map((role) => (
            <div 
              key={role.id}
              className={`p-4 rounded-lg cursor-pointer transition-all border ${
                selectedRole === role.id 
                  ? 'bg-werewolf-purple/30 border-werewolf-purple shadow-lg' 
                  : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60 border-werewolf-purple/20'
              }`}
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                <div className="w-12 h-12 bg-werewolf-purple/30 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {role.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">
                {role.name}
                <span 
                  className={`ml-2 text-xs px-2 py-0.5 rounded ${
                    role.team === '村民' ? 'bg-green-900/60 text-green-200' : 
                    role.team === '狼人' ? 'bg-red-900/60 text-red-200' :
                    'bg-blue-900/60 text-blue-200'
                  }`}
                >
                  {role.team}
                </span>
              </h3>
              <p className="text-sm text-gray-300">{role.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
