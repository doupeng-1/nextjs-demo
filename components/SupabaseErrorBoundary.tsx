'use client';

import { useEffect, useState } from 'react';

export default function SupabaseErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // 检查环境变量（在客户端组件中）
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    // 调试信息（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('环境变量检查:', {
        hasUrl: !!supabaseUrl,
        urlLength: supabaseUrl?.length || 0,
        urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined',
        hasKey: !!supabaseAnonKey,
        keyLength: supabaseAnonKey?.length || 0,
      });
    }

    if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url' || supabaseUrl.length === 0) {
      setHasError(true);
      setErrorMessage(
        `NEXT_PUBLIC_SUPABASE_URL 未配置或使用了占位符值。当前值: "${supabaseUrl || 'undefined'}"`
      );
      return;
    }

    if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key' || supabaseAnonKey.length === 0) {
      setHasError(true);
      setErrorMessage(
        `NEXT_PUBLIC_SUPABASE_ANON_KEY 未配置或使用了占位符值。当前值: "${supabaseAnonKey ? '已设置' : 'undefined'}"`
      );
      return;
    }

    // 验证 URL 格式
    try {
      const url = new URL(supabaseUrl);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        setHasError(true);
        setErrorMessage(`无效的 URL 协议: ${url.protocol}。必须使用 http:// 或 https://`);
        return;
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(`无效的 URL 格式: "${supabaseUrl}"。错误: ${error instanceof Error ? error.message : '未知错误'}`);
      return;
    }
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-red-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Supabase 配置错误
            </h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {errorMessage}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              请检查你的 <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">.env.local</code> 文件。
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              确保 .env.local 文件包含：
            </p>
            <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>提示：</strong> 修改环境变量后，请重启开发服务器（停止并重新运行 <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded">npm run dev</code>）
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
