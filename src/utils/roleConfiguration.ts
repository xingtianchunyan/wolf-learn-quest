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
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 2 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    7: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    8: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    9: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    10: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    11: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/placeholder.svg', team: 'Village', count: 1 }
    ],
    12: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/placeholder.svg', team: 'Werewolves', count: 2 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/placeholder.svg', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/placeholder.svg', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/placeholder.svg', team: 'Village', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/placeholder.svg', team: 'Evil', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/placeholder.svg', team: 'Village', count: 1 }
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
        name: role.count > 1 ? `${role.name}_${i}` : role.name
      });
    }
  });
  
  return expandedRoles;
};
