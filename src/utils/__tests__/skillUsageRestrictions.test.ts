import { describe, it, expect } from 'vitest'
import { 
  validateSkillUsage, 
  getSkillCooldown, 
  isSkillAvailableInPhase,
  canTargetPlayer
} from '../skillUsageRestrictions'

describe('skillUsageRestrictions', () => {
  describe('validateSkillUsage', () => {
    const mockGameState = {
      current_phase: 1, // Night phase
      current_round: 1
    }

    const mockRoleState = {
      role_name: 'werewolf',
      role_status: 1, // Alive
      attributes: {}
    }

    it('should allow valid skill usage', () => {
      const result = validateSkillUsage(
        'werewolf_attack',
        mockGameState,
        mockRoleState,
        []
      )

      expect(result.isValid).toBe(true)
      expect(result.reason).toBeNull()
    })

    it('should prevent skill usage during wrong phase', () => {
      const dayGameState = { ...mockGameState, current_phase: 2 }
      
      const result = validateSkillUsage(
        'werewolf_attack',
        dayGameState,
        mockRoleState,
        []
      )

      expect(result.isValid).toBe(false)
      expect(result.reason).toContain('phase')
    })

    it('should prevent skill usage when player is dead', () => {
      const deadRoleState = { ...mockRoleState, role_status: 0 }
      
      const result = validateSkillUsage(
        'werewolf_attack',
        mockGameState,
        deadRoleState,
        []
      )

      expect(result.isValid).toBe(false)
      expect(result.reason).toContain('alive')
    })

    it('should respect skill cooldown', () => {
      const recentSkillUse = [{
        skill_name: 'werewolf_attack',
        round_number: 1,
        created_at: new Date().toISOString()
      }]
      
      const result = validateSkillUsage(
        'werewolf_attack',
        mockGameState,
        mockRoleState,
        recentSkillUse
      )

      expect(result.isValid).toBe(false)
      expect(result.reason).toContain('cooldown')
    })
  })

  describe('getSkillCooldown', () => {
    it('should return correct cooldown for werewolf attack', () => {
      const cooldown = getSkillCooldown('werewolf_attack')
      expect(cooldown).toBeGreaterThan(0)
    })

    it('should return default cooldown for unknown skill', () => {
      const cooldown = getSkillCooldown('unknown_skill')
      expect(cooldown).toBe(1) // Default 1 round cooldown
    })
  })

  describe('isSkillAvailableInPhase', () => {
    it('should return true for night skills during night phase', () => {
      const available = isSkillAvailableInPhase('werewolf_attack', 1)
      expect(available).toBe(true)
    })

    it('should return false for night skills during day phase', () => {
      const available = isSkillAvailableInPhase('werewolf_attack', 2)
      expect(available).toBe(false)
    })

    it('should return true for voting during day phase', () => {
      const available = isSkillAvailableInPhase('vote_eliminate', 2)
      expect(available).toBe(true)
    })
  })

  describe('canTargetPlayer', () => {
    const mockAttacker = {
      role_name: 'werewolf',
      role_status: 1,
      user_id: 'attacker-id'
    }

    const mockTarget = {
      role_name: 'villager', 
      role_status: 1,
      user_id: 'target-id'
    }

    it('should allow targeting valid players', () => {
      const canTarget = canTargetPlayer(
        'werewolf_attack',
        mockAttacker,
        mockTarget
      )
      expect(canTarget).toBe(true)
    })

    it('should prevent self-targeting', () => {
      const selfTarget = { ...mockTarget, user_id: 'attacker-id' }
      
      const canTarget = canTargetPlayer(
        'werewolf_attack',
        mockAttacker,
        selfTarget
      )
      expect(canTarget).toBe(false)
    })

    it('should prevent targeting dead players', () => {
      const deadTarget = { ...mockTarget, role_status: 0 }
      
      const canTarget = canTargetPlayer(
        'werewolf_attack',
        mockAttacker,
        deadTarget
      )
      expect(canTarget).toBe(false)
    })

    it('should prevent werewolves from targeting each other', () => {
      const werewolfTarget = { ...mockTarget, role_name: 'werewolf' }
      
      const canTarget = canTargetPlayer(
        'werewolf_attack',
        mockAttacker,
        werewolfTarget
      )
      expect(canTarget).toBe(false)
    })
  })
})