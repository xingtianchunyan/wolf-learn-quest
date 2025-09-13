import { describe, it, expect } from 'vitest';
import {
  normalizeRoleName,
  isWolfRoleName,
  hasWolfFaction,
  isDemonRole,
  isHunterRole,
  canSeeTargetRole,
  mapChatChannelType,
  mapChatTypeToUI,
  getCompatibleChatTypes,
  canAccessWerewolfChannel,
  WEREWOLF_ROLES
} from '../roleUtils';

describe('roleUtils', () => {
  describe('normalizeRoleName', () => {
    it('should normalize werewolf role names correctly', () => {
      expect(normalizeRoleName('werewolf 1')).toBe('werewolf_1');
      expect(normalizeRoleName('werewolf1')).toBe('werewolf_1');
      expect(normalizeRoleName('werewolf 2')).toBe('werewolf_2');
      expect(normalizeRoleName('werewolf2')).toBe('werewolf_2');
      expect(normalizeRoleName('white wolf')).toBe('whitewolf');
      expect(normalizeRoleName('white_wolf')).toBe('whitewolf');
    });

    it('should handle case insensitive input', () => {
      expect(normalizeRoleName('WEREWOLF 1')).toBe('werewolf_1');
      expect(normalizeRoleName('White Wolf')).toBe('whitewolf');
    });

    it('should return unchanged names for non-mapped roles', () => {
      expect(normalizeRoleName('villager')).toBe('villager');
      expect(normalizeRoleName('seer')).toBe('seer');
      expect(normalizeRoleName('guard')).toBe('guard');
    });

    it('should handle empty or invalid input', () => {
      expect(normalizeRoleName('')).toBe('');
      expect(normalizeRoleName('   ')).toBe('');
    });
  });

  describe('isWolfRoleName', () => {
    it('should identify werewolf roles correctly', () => {
      expect(isWolfRoleName('werewolf')).toBe(true);
      expect(isWolfRoleName('werewolf_1')).toBe(true);
      expect(isWolfRoleName('werewolf_2')).toBe(true);
      expect(isWolfRoleName('whitewolf')).toBe(true);
      expect(isWolfRoleName('werewolf 1')).toBe(true);
      expect(isWolfRoleName('white wolf')).toBe(true);
    });

    it('should reject non-werewolf roles', () => {
      expect(isWolfRoleName('villager')).toBe(false);
      expect(isWolfRoleName('seer')).toBe(false);
      expect(isWolfRoleName('guard')).toBe(false);
      expect(isWolfRoleName('hunter')).toBe(false);
      expect(isWolfRoleName('demon')).toBe(false);
    });
  });

  describe('hasWolfFaction', () => {
    it('should identify wolf faction correctly from RoleDesign', () => {
      expect(hasWolfFaction({ faction: true } as any)).toBe(true);
      expect(hasWolfFaction({ faction: false } as any)).toBe(false);
    });

    it('should handle null or undefined input', () => {
      expect(hasWolfFaction(null)).toBe(false);
      expect(hasWolfFaction(undefined)).toBe(false);
    });
  });

  describe('isDemonRole', () => {
    it('should identify demon role correctly', () => {
      expect(isDemonRole('demon')).toBe(true);
      expect(isDemonRole('DEMON')).toBe(true);
    });

    it('should reject non-demon roles', () => {
      expect(isDemonRole('werewolf')).toBe(false);
      expect(isDemonRole('villager')).toBe(false);
      expect(isDemonRole('seer')).toBe(false);
    });
  });

  describe('isHunterRole', () => {
    it('should identify hunter role correctly', () => {
      expect(isHunterRole('hunter')).toBe(true);
      expect(isHunterRole('HUNTER')).toBe(true);
    });

    it('should reject non-hunter roles', () => {
      expect(isHunterRole('werewolf')).toBe(false);
      expect(isHunterRole('villager')).toBe(false);
      expect(isHunterRole('seer')).toBe(false);
    });
  });

  describe('canSeeTargetRole', () => {
    it('should allow werewolves to see each other', () => {
      expect(canSeeTargetRole('werewolf', 'werewolf_1')).toBe(true);
      expect(canSeeTargetRole('werewolf_1', 'werewolf_2')).toBe(true);
      expect(canSeeTargetRole('whitewolf', 'werewolf')).toBe(true);
    });

    it('should allow demon to see werewolves', () => {
      expect(canSeeTargetRole('demon', 'werewolf')).toBe(true);
      expect(canSeeTargetRole('demon', 'werewolf_1')).toBe(true);
      expect(canSeeTargetRole('demon', 'whitewolf')).toBe(true);
    });

    it('should allow demon to see other demons', () => {
      expect(canSeeTargetRole('demon', 'demon')).toBe(true);
    });

    it('should not allow villagers to see special roles', () => {
      expect(canSeeTargetRole('villager', 'werewolf')).toBe(false);
      expect(canSeeTargetRole('seer', 'werewolf')).toBe(false);
      expect(canSeeTargetRole('guard', 'demon')).toBe(false);
    });

    it('should handle undefined or empty roles', () => {
      expect(canSeeTargetRole(undefined, 'werewolf')).toBe(false);
      expect(canSeeTargetRole('werewolf', undefined)).toBe(false);
      expect(canSeeTargetRole('', 'werewolf')).toBe(false);
    });

    it('should prioritize RoleDesign faction over role name', () => {
      const wolfRoleDesign = { faction: true };
      const villagerRoleDesign = { faction: false };
      
      expect(canSeeTargetRole('villager', 'villager', wolfRoleDesign, wolfRoleDesign)).toBe(true);
      expect(canSeeTargetRole('werewolf', 'werewolf', villagerRoleDesign, villagerRoleDesign)).toBe(false);
    });
  });

  describe('mapChatChannelType', () => {
    it('should map team to werewolf', () => {
      expect(mapChatChannelType('team')).toBe('werewolf');
    });

    it('should keep werewolf unchanged', () => {
      expect(mapChatChannelType('werewolf')).toBe('werewolf');
    });

    it('should return unchanged for other types', () => {
      expect(mapChatChannelType('public')).toBe('public');
      expect(mapChatChannelType('private')).toBe('private');
    });
  });

  describe('mapChatTypeToUI', () => {
    it('should map werewolf to team', () => {
      expect(mapChatTypeToUI('werewolf')).toBe('team');
    });

    it('should keep team unchanged', () => {
      expect(mapChatTypeToUI('team')).toBe('team');
    });

    it('should return unchanged for other types', () => {
      expect(mapChatTypeToUI('public')).toBe('public');
      expect(mapChatTypeToUI('private')).toBe('private');
    });
  });

  describe('getCompatibleChatTypes', () => {
    it('should return both werewolf and team for team channel', () => {
      expect(getCompatibleChatTypes('team')).toEqual(['werewolf', 'team']);
    });

    it('should return single type for other channels', () => {
      expect(getCompatibleChatTypes('public')).toEqual(['public']);
      expect(getCompatibleChatTypes('private')).toEqual(['private']);
    });
  });

  describe('canAccessWerewolfChannel', () => {
    it('should allow werewolf roles access', () => {
      expect(canAccessWerewolfChannel('werewolf')).toBe(true);
      expect(canAccessWerewolfChannel('werewolf_1')).toBe(true);
      expect(canAccessWerewolfChannel('whitewolf')).toBe(true);
    });

    it('should deny non-werewolf roles access', () => {
      expect(canAccessWerewolfChannel('villager')).toBe(false);
      expect(canAccessWerewolfChannel('seer')).toBe(false);
      expect(canAccessWerewolfChannel('guard')).toBe(false);
    });

    it('should prioritize RoleDesign over role name', () => {
      const wolfRoleDesign = { faction: true };
      const villagerRoleDesign = { faction: false };
      
      expect(canAccessWerewolfChannel('villager', wolfRoleDesign)).toBe(true);
      expect(canAccessWerewolfChannel('werewolf', villagerRoleDesign)).toBe(false);
    });

    it('should handle undefined role', () => {
      expect(canAccessWerewolfChannel(undefined)).toBe(false);
    });
  });

  describe('constants', () => {
    it('should have correct WEREWOLF_ROLES', () => {
      expect(WEREWOLF_ROLES).toEqual(['werewolf', 'werewolf_1', 'werewolf_2', 'whitewolf']);
    });
  });
});