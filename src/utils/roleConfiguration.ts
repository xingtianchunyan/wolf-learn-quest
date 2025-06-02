
// 角色配置表 - 基于玩家数量
export const ROLE_CONFIGURATIONS = {
  6: [
    { type: 'werewolf', count: 2, name: '狼人' },
    { type: 'villager', count: 2, name: '村民' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
  ],
  7: [
    { type: 'werewolf', count: 1, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 2, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
  ],
  8: [
    { type: 'werewolf', count: 1, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 2, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
    { type: 'warlock', count: 1, name: '暗夜术士' },
  ],
  9: [
    { type: 'werewolf', count: 1, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 3, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
    { type: 'warlock', count: 1, name: '暗夜术士' },
  ],
  10: [
    { type: 'werewolf', count: 1, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 2, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
    { type: 'warlock', count: 1, name: '暗夜术士' },
    { type: 'demon', count: 1, name: '恶魔' },
    { type: 'guard', count: 1, name: '守卫' },
  ],
  11: [
    { type: 'werewolf', count: 1, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 3, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
    { type: 'warlock', count: 1, name: '暗夜术士' },
    { type: 'demon', count: 1, name: '恶魔' },
    { type: 'guard', count: 1, name: '守卫' },
  ],
  12: [
    { type: 'werewolf', count: 2, name: '狼人' },
    { type: 'white_wolf', count: 1, name: '白狼王' },
    { type: 'villager', count: 3, name: '村民' },
    { type: 'hunter', count: 1, name: '猎人' },
    { type: 'seer', count: 1, name: '预言家' },
    { type: 'witch', count: 1, name: '女巫' },
    { type: 'warlock', count: 1, name: '暗夜术士' },
    { type: 'demon', count: 1, name: '恶魔' },
    { type: 'guard', count: 1, name: '守卫' },
  ],
};

export interface RoleConfig {
  type: string;
  count: number;
  name: string;
}

export const getRoleConfiguration = (playerCount: number): RoleConfig[] => {
  return ROLE_CONFIGURATIONS[playerCount as keyof typeof ROLE_CONFIGURATIONS] || [];
};

export const getAllAvailableRoles = (playerCount: number) => {
  const config = getRoleConfiguration(playerCount);
  const roles = [];
  
  for (const roleConfig of config) {
    for (let i = 0; i < roleConfig.count; i++) {
      roles.push({
        id: `${roleConfig.type}-${i}`,
        type: roleConfig.type,
        name: roleConfig.name,
        description: getRoleDescription(roleConfig.type),
        team: getRoleTeam(roleConfig.type),
      });
    }
  }
  
  return roles;
};

const getRoleDescription = (type: string): string => {
  const descriptions: Record<string, string> = {
    'werewolf': '在夜晚杀死村民，白天伪装成无辜的村民',
    'white_wolf': '狼人阵营的王者，拥有特殊的杀人能力',
    'villager': '普通村民，通过投票找出狼人',
    'hunter': '被淘汰时可以射杀另一名玩家',
    'seer': '每晚可以查验一名玩家的身份',
    'witch': '拥有救人药水和毒药',
    'warlock': '拥有诅咒能力的暗夜法师',
    'demon': '强大的恶魔，拥有特殊能力',
    'guard': '每晚可以守护一名玩家',
  };
  return descriptions[type] || '未知角色';
};

const getRoleTeam = (type: string): string => {
  const villageTeam = ['villager', 'hunter', 'seer', 'witch', 'guard'];
  const werewolfTeam = ['werewolf', 'white_wolf'];
  const neutralTeam = ['warlock', 'demon'];
  
  if (villageTeam.includes(type)) return '村民';
  if (werewolfTeam.includes(type)) return '狼人';
  if (neutralTeam.includes(type)) return '第三方';
  return '未知';
};
