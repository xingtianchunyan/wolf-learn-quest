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
 * 常量说明: Supabase 配置 - 直接使用项目值
 * - Lovable 不支持 VITE_* 环境变量，因此直接使用项目配置
 */
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "REMOVED_SUPABASE_ANON_KEY";

/**
 * 导出说明: 应用唯一的 Supabase 客户端实例
 * 使用方式:
 *   import { supabase } from "@/integrations/supabase/client";
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);