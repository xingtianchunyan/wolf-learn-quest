import { vi } from 'vitest'

/**
 * 创建可配置的 Supabase Mock 数据
 */
export const createMockSupabaseData = (overrides: any = {}) => ({
  data: overrides.data || null,
  error: overrides.error || null,
  count: overrides.count || null,
  status: overrides.status || 200,
  statusText: overrides.statusText || 'OK'
})

/**
 * 创建完整的链式 Query Builder Mock
 */
export const createMockQueryBuilder = (mockData: any = { data: [], error: null }) => {
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    contains: vi.fn().mockReturnThis(),
    containedBy: vi.fn().mockReturnThis(),
    match: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    filter: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    abortSignal: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(mockData),
    maybeSingle: vi.fn().mockResolvedValue(mockData),
    then: vi.fn((resolve) => resolve(mockData)),
    catch: vi.fn().mockReturnThis(),
  }
  
  // 支持链式调用后返回 Promise
  Object.keys(builder).forEach(key => {
    if (typeof builder[key] === 'function' && key !== 'then' && key !== 'catch' && key !== 'single' && key !== 'maybeSingle') {
      const originalFn = builder[key]
      builder[key] = vi.fn((...args) => {
        originalFn(...args)
        return builder
      })
    }
  })
  
  return builder
}

/**
 * 创建 Supabase RPC Mock
 */
export const createMockRPC = (mockData: any = { data: null, error: null }) => {
  return vi.fn().mockResolvedValue(mockData)
}

/**
 * 创建 Supabase Channel Mock
 */
export const createMockChannel = () => {
  const channel = {
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockReturnThis(),
    unsubscribe: vi.fn().mockResolvedValue({ error: null }),
  }
  return channel
}

/**
 * 创建完整的 Supabase Client Mock
 */
export const createMockSupabaseClient = (config: {
  queryData?: any
  rpcData?: any
} = {}) => {
  return {
    from: vi.fn(() => createMockQueryBuilder(config.queryData)),
    rpc: createMockRPC(config.rpcData),
    channel: vi.fn(() => createMockChannel()),
    removeChannel: vi.fn(),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    }
  }
}
