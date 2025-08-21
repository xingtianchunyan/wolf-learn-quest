// 文件级注释：Supabase 客户端初始化（前端只使用 anon/publishable key，避免硬编码，改为 Vite 环境变量）
// 说明：确保在 .env/.env.local 中定义 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * 常量说明（函数级注释风格）：
 * - 从 Vite 环境变量中读取 Supabase 配置，避免硬编码
 * - 必须在 .env/.env.local 内提供 VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // 在开发环境输出警告，提示配置不完整
  console.warn('Supabase 环境变量未配置：请设置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);