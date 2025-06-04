

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
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 2 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 2 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 }
    ],
    7: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 }
    ],
    8: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/lovable-uploads/392c9861-57a0-4522-93a0-07243faf284f.png', team: 'Werewolves', count: 1 }
    ],
    9: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/lovable-uploads/392c9861-57a0-4522-93a0-07243faf284f.png', team: 'Werewolves', count: 1 }
    ],
    10: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 2 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/lovable-uploads/392c9861-57a0-4522-93a0-07243faf284f.png', team: 'Werewolves', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/lovable-uploads/9ee3b412-7b6f-44bc-beac-bc8601f647ed.png', team: 'Werewolves', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/lovable-uploads/660dd11b-9896-444d-80b5-0a4371c8deef.png', team: 'Village', count: 1 }
    ],
    11: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 1 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/lovable-uploads/392c9861-57a0-4522-93a0-07243faf284f.png', team: 'Werewolves', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/lovable-uploads/9ee3b412-7b6f-44bc-beac-bc8601f647ed.png', team: 'Werewolves', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/lovable-uploads/660dd11b-9896-444d-80b5-0a4371c8deef.png', team: 'Village', count: 1 }
    ],
    12: [
      { id: 'werewolf', name: 'werewolf_role', description: 'skill_night_attack', image: '/lovable-uploads/b7e85811-97ed-42e4-b429-c77c521745c5.png', team: 'Werewolves', count: 2 },
      { id: 'white_wolf', name: 'white_wolf_role', description: 'skill_self_destruct', image: '/lovable-uploads/d29abd95-8475-49d2-ae4a-7bf1b6a870c2.png', team: 'Werewolves', count: 1 },
      { id: 'villager', name: 'villager_role', description: 'skill_sleep', image: '/lovable-uploads/ac54f032-78b6-4c25-82ea-bf91f0d5b5d4.png', team: 'Village', count: 3 },
      { id: 'hunter', name: 'hunter_role', description: 'skill_dying_shot', image: '/lovable-uploads/4b736257-432f-4187-8dc5-431340a6f6e1.png', team: 'Village', count: 1 },
      { id: 'seer', name: 'seer_role', description: 'skill_prophecy', image: '/lovable-uploads/cce54aa8-77a3-40e7-b559-b3e3ddb09fc8.png', team: 'Village', count: 1 },
      { id: 'witch', name: 'witch_role', description: 'skill_magic_potion', image: '/lovable-uploads/3b9178d7-a547-49d9-9b2f-8e3e9feec92b.png', team: 'Village', count: 1 },
      { id: 'warlock', name: 'warlock_role', description: 'skill_voodoo', image: '/lovable-uploads/392c9861-57a0-4522-93a0-07243faf284f.png', team: 'Werewolves', count: 1 },
      { id: 'demon', name: 'demon_role', description: 'skill_demon_eye', image: '/lovable-uploads/9ee3b412-7b6f-44bc-beac-bc8601f647ed.png', team: 'Werewolves', count: 1 },
      { id: 'guard', name: 'guard_role', description: 'skill_vigil', image: '/lovable-uploads/660dd11b-9896-444d-80b5-0a4371c8deef.png', team: 'Village', count: 1 }
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

