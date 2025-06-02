
// 角色配置工具类 - 根据玩家数量确定角色配置
export interface RoleConfig {
  name: string;
  description: string;
  team: 'Village' | 'Werewolves' | 'Neutral';
  count: number;
}

export interface PlayerCountConfig {
  totalPlayers: number;
  roles: RoleConfig[];
}

// 根据图片中的配置表定义角色配置
export const getRoleConfiguration = (playerCount: number): PlayerCountConfig => {
  const configs: { [key: number]: RoleConfig[] } = {
    6: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 2 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 2 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
    ],
    7: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 1 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 2 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
    ],
    8: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 1 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 2 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
      { name: '暗夜术士', description: '可以查看其他玩家的具体身份', team: 'Village', count: 1 },
    ],
    9: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 1 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 3 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
      { name: '暗夜术士', description: '可以查看其他玩家的具体身份', team: 'Village', count: 1 },
    ],
    10: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 1 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 2 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
      { name: '暗夜术士', description: '可以查看其他玩家的具体身份', team: 'Village', count: 1 },
      { name: '恶魔', description: '中立角色，有特殊获胜条件', team: 'Neutral', count: 1 },
      { name: '守卫', description: '每晚可以守护一名玩家', team: 'Village', count: 1 },
    ],
    11: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 1 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 3 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
      { name: '暗夜术士', description: '可以查看其他玩家的具体身份', team: 'Village', count: 1 },
      { name: '恶魔', description: '中立角色，有特殊获胜条件', team: 'Neutral', count: 1 },
      { name: '守卫', description: '每晚可以守护一名玩家', team: 'Village', count: 1 },
    ],
    12: [
      { name: '狼人', description: '夜晚可以杀死一名玩家', team: 'Werewolves', count: 2 },
      { name: '白狼王', description: '特殊狼人，死后可以带走一名玩家', team: 'Werewolves', count: 1 },
      { name: '村民', description: '普通村民，没有特殊能力', team: 'Village', count: 3 },
      { name: '猎人', description: '死后可以开枪带走一名玩家', team: 'Village', count: 1 },
      { name: '预言家', description: '每晚可以查验一名玩家的身份', team: 'Village', count: 1 },
      { name: '女巫', description: '拥有解药和毒药各一瓶', team: 'Village', count: 1 },
      { name: '暗夜术士', description: '可以查看其他玩家的具体身份', team: 'Village', count: 1 },
      { name: '恶魔', description: '中立角色，有特殊获胜条件', team: 'Neutral', count: 1 },
      { name: '守卫', description: '每晚可以守护一名玩家', team: 'Village', count: 1 },
    ],
  };

  const roleConfig = configs[playerCount] || configs[8]; // 默认8人配置
  
  return {
    totalPlayers: playerCount,
    roles: roleConfig,
  };
};

// 获取可选择的角色列表（玩家可以选择的角色）
export const getSelectableRoles = (playerCount: number): RoleConfig[] => {
  const config = getRoleConfiguration(playerCount);
  return config.roles;
};
