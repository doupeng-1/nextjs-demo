'use client';

export default function DebugEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          环境变量调试页面
        </h1>

        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              NEXT_PUBLIC_SUPABASE_URL
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                值存在: <span className="font-mono">{supabaseUrl ? '是' : '否'}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                长度: <span className="font-mono">{supabaseUrl?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                值预览: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all">
                  {supabaseUrl || 'undefined'}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                是否为占位符: <span className="font-mono text-red-600 dark:text-red-400">
                  {supabaseUrl === 'your_supabase_project_url' ? '是' : '否'}
                </span>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                值存在: <span className="font-mono">{supabaseAnonKey ? '是' : '否'}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                长度: <span className="font-mono">{supabaseAnonKey?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                值预览: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all">
                  {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 50)}...` : 'undefined'}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                是否为占位符: <span className="font-mono text-red-600 dark:text-red-400">
                  {supabaseAnonKey === 'your_supabase_anon_key' ? '是' : '否'}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              重要提示
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>如果值显示为 "undefined" 或占位符，请重启开发服务器</li>
              <li>确保 .env.local 文件在项目根目录（与 package.json 同级）</li>
              <li>确保环境变量名称正确（NEXT_PUBLIC_ 前缀）</li>
              <li>修改环境变量后必须重启服务器才能生效</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
              清除缓存步骤
            </h3>
            <ol className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1 list-decimal list-inside">
              <li>停止开发服务器（Ctrl+C）</li>
              <li>删除 .next 文件夹：<code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">Remove-Item -Recurse -Force .next</code></li>
              <li>重新启动：<code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">npm run dev</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
