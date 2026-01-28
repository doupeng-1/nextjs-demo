'use client';

import { useState, FormEvent } from 'react';

interface VideoInputProps {
  onVideoSubmit: (url: string) => void;
}

export default function VideoInput({ onVideoSubmit }: VideoInputProps) {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('请输入视频URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('请输入有效的URL（以 http:// 或 https:// 开头）');
      return;
    }

    onVideoSubmit(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="video-url" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            视频URL
          </label>
          <div className="flex gap-2">
            <input
              id="video-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请输入视频URL，例如：https://example.com/video.mp4"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                       rounded-lg transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              播放
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
