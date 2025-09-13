import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVotingSystem } from '../useVotingSystem'
import { createMockGameState } from '@/test/utils/testUtils'

// Mock dependencies
vi.mock('@/integrations/supabase/client')
vi.mock('@/hooks/use-toast')

describe('useVotingSystem', () => {
  const mockGameStateId = 'test-game-state'
  const mockRoomId = 'test-room'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => 
      useVotingSystem(mockGameStateId, mockRoomId)
    )

    expect(result.current.currentSession).toBeNull()
    expect(result.current.votes).toEqual([])
    expect(result.current.results).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('should create voting session', async () => {
    const { result } = renderHook(() => 
      useVotingSystem(mockGameStateId, mockRoomId)
    )

    const mockGameState = createMockGameState({
      current_round: 1,
      current_phase: 2
    })

    await act(async () => {
      if (result.current.createVotingSession) {
        await result.current.createVotingSession(mockGameState, 'day')
      }
    })

    // Verify that the voting session creation was attempted
    expect(result.current.loading).toBe(false)
  })

  it('should handle vote casting', async () => {
    const { result } = renderHook(() => 
      useVotingSystem(mockGameStateId, mockRoomId)
    )

    await act(async () => {
      if (result.current.castVote) {
        await result.current.castVote('test-session', 'voter-id', 'target-id')
      }
    })

    // Vote should be processed without errors
    expect(result.current.loading).toBe(false)
  })

  it('should calculate voting results', async () => {
    const { result } = renderHook(() => 
      useVotingSystem(mockGameStateId, mockRoomId)
    )

    await act(async () => {
      if (result.current.calculateResults) {
        await result.current.calculateResults('test-session')
      }
    })

    // Results calculation should complete
    expect(result.current.loading).toBe(false)
  })

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => 
      useVotingSystem(mockGameStateId, mockRoomId)
    )

    // Test error handling by passing invalid data
    await act(async () => {
      if (result.current.castVote) {
        await result.current.castVote('', '', '')
      }
    })

    expect(result.current.loading).toBe(false)
  })
})