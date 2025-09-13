import { describe, it, expect, vi, beforeEach } from 'vitest'
import { EnhancedSkillService } from '../enhancedSkillService'

// Mock Supabase
const mockSupabase = {
  rpc: vi.fn(),
  from: vi.fn(() => ({
    select: vi.fn(() => ({ data: [], error: null })),
    insert: vi.fn(() => ({ data: [], error: null })),
    update: vi.fn(() => ({ data: [], error: null })),
    eq: vi.fn(() => ({ data: [], error: null })),
    order: vi.fn(() => ({ data: [], error: null })),
    limit: vi.fn(() => ({ data: [], error: null })),
    single: vi.fn(() => ({ data: null, error: null }))
  }))
}

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase
}))

describe('EnhancedSkillService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useSkillEnhanced', () => {
    it('should successfully execute a skill', async () => {
      // Mock successful skill execution
      mockSupabase.rpc.mockResolvedValueOnce({
        data: { success: true, skill_use_id: 'test-skill-id' },
        error: null
      })

      const result = await EnhancedSkillService.useSkillEnhanced({
        userId: 'test-user',
        gameStateId: 'test-game',
        skillName: 'test_skill',
        targetId: 'test-target',
        roundNumber: 1,
        phase: 1,
        skillData: {}
      })

      expect(result.success).toBe(true)
      expect(result.skillUseId).toBe('test-skill-id')
      expect(mockSupabase.rpc).toHaveBeenCalledWith(
        'use_skill_enhanced',
        expect.objectContaining({
          p_user_id: 'test-user',
          p_game_state_id: 'test-game',
          p_skill_name: 'test_skill'
        })
      )
    })

    it('should handle skill execution errors', async () => {
      // Mock skill execution error
      mockSupabase.rpc.mockResolvedValueOnce({
        data: null,
        error: { message: 'Skill cooldown active' }
      })

      const result = await EnhancedSkillService.useSkillEnhanced({
        userId: 'test-user',
        gameStateId: 'test-game',
        skillName: 'test_skill',
        targetId: 'test-target',
        roundNumber: 1,
        phase: 1,
        skillData: {}
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Skill cooldown active')
    })

    it('should validate required parameters', async () => {
      const result = await EnhancedSkillService.useSkillEnhanced({
        userId: '',
        gameStateId: 'test-game',
        skillName: 'test_skill',
        targetId: 'test-target',
        roundNumber: 1,
        phase: 1,
        skillData: {}
      })

      expect(result.success).toBe(false)
      expect(result.error).toContain('userId is required')
    })
  })

  describe('getSkillUsageHistory', () => {
    it('should fetch skill usage history', async () => {
      const mockHistory = [
        {
          id: 'skill-1',
          skill_name: 'seer_inspect',
          target_id: 'target-1',
          round_number: 1,
          created_at: new Date().toISOString()
        }
      ]

      mockSupabase.from().select().eq().order().mockResolvedValueOnce({
        data: mockHistory,
        error: null
      })

      const result = await EnhancedSkillService.getSkillUsageHistory(
        'test-user',
        'test-game'
      )

      expect(result.success).toBe(true)
      expect(result.history).toEqual(mockHistory)
    })
  })

  describe('canUseSkill', () => {
    it('should validate skill usage permissions', async () => {
      // Mock skill validation response
      mockSupabase.rpc.mockResolvedValueOnce({
        data: {
          can_use: true,
          restriction_reason: null
        },
        error: null
      })

      const result = await EnhancedSkillService.canUseSkill({
        userId: 'test-user',
        gameStateId: 'test-game',
        skillName: 'test_skill',
        roundNumber: 1,
        phase: 1
      })

      expect(result.canUse).toBe(true)
      expect(result.restrictionReason).toBeNull()
    })

    it('should return restrictions when skill cannot be used', async () => {
      mockSupabase.rpc.mockResolvedValueOnce({
        data: {
          can_use: false,
          restriction_reason: 'Skill already used this round'
        },
        error: null
      })

      const result = await EnhancedSkillService.canUseSkill({
        userId: 'test-user',
        gameStateId: 'test-game',
        skillName: 'test_skill',
        roundNumber: 1,
        phase: 1
      })

      expect(result.canUse).toBe(false)
      expect(result.restrictionReason).toBe('Skill already used this round')
    })
  })
})