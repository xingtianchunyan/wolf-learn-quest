/**
 * 文件说明: Supabase 客户端初始化
 * 目的: 通过环境变量安全地初始化客户端，避免在仓库中硬编码 URL/Key
 * 注意:
 * - 前端只能使用可公开的 anon key，严禁在前端暴露 service_role key。
 * - URL 与 anon key 通过 Vite 环境变量注入: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY。
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * 常量说明: 从运行时环境中读取 Supabase 配置
 * - 推荐使用 .env(.local) 文件配置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY
 * - Vite 会在构建时将以 VITE_ 开头的变量注入到 import.meta.env 中
 */
const SUPABASE_URL = (import.meta as any)?.env?.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // 抛出明确错误，便于开发阶段快速发现配置缺失
  throw new Error(
    'Supabase configuration missing: Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

/**
 * 导出说明: 应用唯一的 Supabase 客户端实例
 * 使用方式:
 *   import { supabase } from "@/integrations/supabase/client";
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);