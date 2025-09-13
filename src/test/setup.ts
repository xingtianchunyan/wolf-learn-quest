import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({ data: [], error: null })),
      insert: vi.fn(() => ({ data: [], error: null })),
      update: vi.fn(() => ({ data: [], error: null })),
      delete: vi.fn(() => ({ data: [], error: null })),
      eq: vi.fn(() => ({ data: [], error: null })),
      order: vi.fn(() => ({ data: [], error: null })),
      limit: vi.fn(() => ({ data: [], error: null })),
      single: vi.fn(() => ({ data: null, error: null })),
      maybeSingle: vi.fn(() => ({ data: null, error: null })),
    })),
    rpc: vi.fn(() => ({ data: null, error: null })),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({ subscribe: vi.fn() })),
      subscribe: vi.fn()
    })),
    removeChannel: vi.fn(),
    auth: {
      getUser: vi.fn(() => ({ data: { user: null }, error: null })),
      signInWithPassword: vi.fn(() => ({ data: {}, error: null })),
      signOut: vi.fn(() => ({ error: null })),
    }
  }
}))

// Mock toast notifications
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock logger
vi.mock('@/lib/logger', () => ({
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }))
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}))