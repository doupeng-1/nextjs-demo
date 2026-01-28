'use client';

import { useState } from 'react';
import VideoInput from '@/components/VideoInput';
import VideoPlayer from '@/components/VideoPlayer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const { user, signOut, loading } = useAuth();

  const handleVideoSubmit = (url: string) => {
    setVideoUrl(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 顶部导航栏 */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              视频播放器
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              输入视频URL即可开始播放
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="text-gray-500 dark:text-gray-400">加载中...</div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">欢迎,</span> {user.email}
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium 
                           rounded-lg transition-colors duration-200 focus:outline-none 
                           focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                         rounded-lg transition-colors duration-200 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                登录/注册
              </button>
            )}
          </div>
        </div>

        <VideoInput onVideoSubmit={handleVideoSubmit} />

        {videoUrl && (
          <div className="mt-8">
            <VideoPlayer videoUrl={videoUrl} />
          </div>
        )}

        {!videoUrl && (
          <div className="mt-12 text-center">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                在上方输入视频URL开始播放
              </p>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </main>
  );
}
