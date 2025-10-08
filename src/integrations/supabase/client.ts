import { createClient  } from '@supabase/supabase-js';
import type { Database  } from './types';

/**
* Supabase 客户端初始化
* 注意：根据 Lovable 平台要求，不使用 VITE_ 环境变量
 */

// 使用固定的 Supabase 配置（来自平台配置）
const SUPABASE_URL = 'https:// ijpbolrqhejgruigbkdv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'REMOVED_SUPABASE_ANON_KEY';

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) { throw new Error('Supabase configuration missing');,
}

// Import the supabase client like this:
// import { supabase  } from '@/integrations/supabase/client';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);