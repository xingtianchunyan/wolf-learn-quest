
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRoleConfiguration, RoleConfig } from '@/utils/roleConfiguration';

interface RoleSelectionProps {
  maxPlayers: number;
  selectedRole: string | null;
  onRoleSelect: (roleId: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  selectedRole,
  onRoleSelect,
}) => {
  const config = getRoleConfiguration(maxPlayers);

  const getTeamColor = (team: string) => {
    switch (team) {
      case 'Village':
        return 'bg-green-900/60 text-green-200';
      case 'Werewolves':
        return 'bg-red-900/60 text-red-200';
      case 'Neutral':
        return 'bg-blue-900/60 text-blue-200';
      default:
        return 'bg-gray-900/60 text-gray-200';
    }
  };

  const getTeamName = (team: string) => {
    switch (team) {
      case 'Village':
        return '村民阵营';
      case 'Werewolves':
        return '狼人阵营';
      case 'Neutral':
        return '中立阵营';
      default:
        return '未知阵营';
    }
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">
          选择角色 ({maxPlayers}人配置)
        </CardTitle>
        <div className="text-sm text-gray-400">
          当前配置：{config.roles.map(role => `${role.count}${role.name}`).join('、')}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.roles.map((role) => (
            <div
              key={role.name}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedRole === role.name
                  ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple'
                  : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
              }`}
              onClick={() => onRoleSelect(role.name)}
            >
              <div className="aspect-square bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                <div className="text-4xl">
                  {role.team === 'Werewolves' ? '🐺' : 
                   role.name === '预言家' ? '🔮' :
                   role.name === '女巫' ? '🧙‍♀️' :
                   role.name === '猎人' ? '🏹' :
                   role.name === '守卫' ? '🛡️' :
                   role.name === '暗夜术士' ? '🌙' :
                   role.name === '恶魔' ? '😈' : '👤'}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                {role.name}
                {role.count > 1 && (
                  <Badge variant="outline" className="text-xs">
                    ×{role.count}
                  </Badge>
                )}
              </h3>
              <div className="mb-2">
                <Badge className={`text-xs ${getTeamColor(role.team)}`}>
                  {getTeamName(role.team)}
                </Badge>
              </div>
              <p className="text-sm text-gray-300">{role.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
