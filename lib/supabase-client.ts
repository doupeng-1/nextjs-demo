import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      '缺少 Supabase 环境变量。请确保在 .env.local 文件中设置了 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  // 验证 URL 格式
  try {
    const url = new URL(supabaseUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error(`无效的 Supabase URL 协议: ${url.protocol}。必须使用 http:// 或 https://`);
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `无效的 Supabase URL 格式: "${supabaseUrl}"。URL 必须是有效的 HTTP 或 HTTPS 地址。`
      );
    }
    throw error;
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
