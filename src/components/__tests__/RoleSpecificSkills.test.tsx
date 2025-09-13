import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/utils/testUtils'
import { RoleSpecificSkills } from '../game/skill/RoleSpecificSkills'

// Mock the skill service
vi.mock('@/services/enhancedSkillService', () => ({
  EnhancedSkillService: {
    useSkillEnhanced: vi.fn(() => Promise.resolve({ success: true })),
    canUseSkill: vi.fn(() => Promise.resolve({ canUse: true }))
  }
}))

describe('RoleSpecificSkills', () => {
  const defaultProps = {
    roleName: 'werewolf',
    skillEffects: [],
    roleAttributes: {},
    canUseSkills: true,
    availableTargets: [
      { user_id: 'target-1', role_name: 'villager', role_status: 1 },
      { user_id: 'target-2', role_name: 'seer', role_status: 1 }
    ],
    currentPhase: 1, // Night phase
    skillUsageHistory: []
  }

  it('should render werewolf skills correctly', () => {
    render(<RoleSpecificSkills {...defaultProps} />)
    
    expect(screen.getByText(/狼人技能/)).toBeInTheDocument()
    expect(screen.getByText(/夜晚攻击/)).toBeInTheDocument()
  })

  it('should render seer skills correctly', () => {
    const seerProps = { ...defaultProps, roleName: 'seer' }
    render(<RoleSpecificSkills {...seerProps} />)
    
    expect(screen.getByText(/预言家技能/)).toBeInTheDocument()
    expect(screen.getByText(/夜晚查验/)).toBeInTheDocument()
  })

  it('should render guard skills correctly', () => {
    const guardProps = { ...defaultProps, roleName: 'guard' }
    render(<RoleSpecificSkills {...guardProps} />)
    
    expect(screen.getByText(/守卫技能/)).toBeInTheDocument()
    expect(screen.getByText(/夜晚守护/)).toBeInTheDocument()
  })

  it('should render witch skills correctly', () => {
    const witchProps = { ...defaultProps, roleName: 'witch' }
    render(<RoleSpecificSkills {...witchProps} />)
    
    expect(screen.getByText(/女巫技能/)).toBeInTheDocument()
    expect(screen.getByText(/治疗药水/)).toBeInTheDocument()
    expect(screen.getByText(/毒药/)).toBeInTheDocument()
  })

  it('should disable skills when not allowed', () => {
    const disabledProps = { ...defaultProps, canUseSkills: false }
    render(<RoleSpecificSkills {...disabledProps} />)
    
    const skillButtons = screen.getAllByRole('button')
    skillButtons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('should disable skills during wrong phase', () => {
    const dayProps = { ...defaultProps, currentPhase: 2 } // Day phase
    render(<RoleSpecificSkills {...dayProps} />)
    
    // Night skills should be disabled during day
    const attackButton = screen.getByRole('button', { name: /攻击/ })
    expect(attackButton).toBeDisabled()
  })

  it('should show available targets', () => {
    render(<RoleSpecificSkills {...defaultProps} />)
    
    // Should show target selection
    expect(screen.getByText(/选择目标/)).toBeInTheDocument()
    expect(screen.getByText(/target-1/)).toBeInTheDocument()
    expect(screen.getByText(/target-2/)).toBeInTheDocument()
  })

  it('should handle skill usage', async () => {
    render(<RoleSpecificSkills {...defaultProps} />)
    
    // Select a target
    const targetButton = screen.getByText(/target-1/)
    fireEvent.click(targetButton)
    
    // Click skill button
    const skillButton = screen.getByRole('button', { name: /使用技能/ })
    fireEvent.click(skillButton)
    
    // Should trigger skill usage
    expect(screen.getByText(/技能使用中/)).toBeInTheDocument()
  })

  it('should show skill usage history', () => {
    const historyProps = {
      ...defaultProps,
      skillUsageHistory: [{
        skill_name: 'werewolf_attack',
        target_id: 'target-1',
        round_number: 1,
        created_at: new Date().toISOString()
      }]
    }
    
    render(<RoleSpecificSkills {...historyProps} />)
    
    expect(screen.getByText(/技能使用记录/)).toBeInTheDocument()
  })

  it('should render villager skills (no special abilities)', () => {
    const villagerProps = { ...defaultProps, roleName: 'villager' }
    render(<RoleSpecificSkills {...villagerProps} />)
    
    expect(screen.getByText(/村民/)).toBeInTheDocument()
    expect(screen.getByText(/没有特殊技能/)).toBeInTheDocument()
  })

  it('should show skill effects', () => {
    const effectProps = {
      ...defaultProps,
      skillEffects: [{
        effect_type: 'protection',
        target_id: 'target-1',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }]
    }
    
    render(<RoleSpecificSkills {...effectProps} />)
    
    expect(screen.getByText(/活跃效果/)).toBeInTheDocument()
  })
})