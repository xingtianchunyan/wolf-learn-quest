
export interface RoleConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  team: string;
  count: number;
}

export const getRoleConfiguration = (playerCount: number): RoleConfig[] => {
  const configs: Record<number, RoleConfig[]> = {
    6: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 2 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    7: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    8: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'dark_knight', name: '暗夜术士', description: '拥有特殊能力的角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    9: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'dark_knight', name: '暗夜术士', description: '拥有特殊能力的角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    10: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'dark_knight', name: '暗夜术士', description: '拥有特殊能力的角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: '恶魔', description: '邪恶的第三方角色', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: '守卫', description: '可以保护其他玩家的角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    11: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'dark_knight', name: '暗夜术士', description: '拥有特殊能力的角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: '恶魔', description: '邪恶的第三方角色', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: '守卫', description: '可以保护其他玩家的角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    12: [
      { id: 'werewolf', name: '狼人', description: '晚上可以杀害村民的邪恶角色', image: '/placeholder.svg', team: 'Werewolves', count: 2 },
      { id: 'white_wolf', name: '白狼王', description: '特殊的狼人角色', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: '村民', description: '普通的村民，需要找出狼人', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: '猎人', description: '死亡时可以带走一个玩家', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: '预言家', description: '每晚可以查验一个玩家的身份', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: '女巫', description: '拥有解药和毒药的特殊角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'dark_knight', name: '暗夜术士', description: '拥有特殊能力的角色', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: '恶魔', description: '邪恶的第三方角色', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: '守卫', description: '可以保护其他玩家的角色', image: '/placeholder.svg', team: 'Village', count: 1 }
    ]
  };

  return configs[playerCount] || configs[6];
};

export const expandRoles = (roleConfigs: RoleConfig[]): Array<RoleConfig & { instanceId: string }> => {
  const expandedRoles: Array<RoleConfig & { instanceId: string }> = [];
  
  roleConfigs.forEach(role => {
    for (let i = 1; i <= role.count; i++) {
      expandedRoles.push({
        ...role,
        instanceId: `${role.id}_${i}`,
        name: role.count > 1 ? `${role.name}${i}` : role.name
      });
    }
  });
  
  return expandedRoles;
};
