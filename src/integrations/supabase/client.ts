/**
 * Supabase 客户端初始化
 * 使用 VITE_ 前缀环境变量，确保构建时可注入
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 在测试/开发环境允许缺失配置，避免无环境变量时崩溃；生产构建仍强制校验。
const isConfigMissing = !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY;
if (isConfigMissing && import.meta.env.PROD) {
  throw new Error(
    'Supabase configuration missing. ' +
      'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  );
}

const resolvedUrl = SUPABASE_URL || 'http://localhost:54321';
const resolvedKey = SUPABASE_PUBLISHABLE_KEY || 'dummy-anon-key';

const SUPABASE_PROJECT_ID =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ||
  new URL(resolvedUrl).hostname.split('.')[0];
export const SUPABASE_STORAGE_KEY = `sb-${SUPABASE_PROJECT_ID}-auth-token`;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(resolvedUrl, resolvedKey, {
  auth: {
    storageKey: SUPABASE_STORAGE_KEY,
  },
});
