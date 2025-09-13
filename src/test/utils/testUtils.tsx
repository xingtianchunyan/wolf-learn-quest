import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { screen, fireEvent } from '@testing-library/react'
export { customRender as render }

// Mock data generators
export const createMockGameState = (overrides = {}) => ({
  id: 'test-game-state-id',
  room_id: 'test-room-id',
  current_phase: 1,
  current_round: 1,
  phase_start_time: new Date().toISOString(),
  phase_duration: 300,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides
})

export const createMockPlayer = (overrides = {}) => ({
  id: 'test-player-id',
  user_id: 'test-user-id',
  room_id: 'test-room-id',
  role: 'villager',
  is_ready: true,
  is_ai: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides
})

export const createMockSkillUse = (overrides = {}) => ({
  id: 'test-skill-id',
  user_id: 'test-user-id',
  game_state_id: 'test-game-state-id',
  skill_name: 'test_skill',
  target_id: 'test-target-id',
  round_number: 1,
  phase: 1,
  skill_data: {},
  execution_time: new Date().toISOString(),
  is_processed: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides
})