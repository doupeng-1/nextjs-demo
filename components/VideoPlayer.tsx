'use client';

import { useEffect, useRef, useState } from 'react';
import { detectVideoType, type VideoInfo } from '@/lib/videoUtils';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  useEffect(() => {
    if (!videoUrl) return;

    setIsLoading(true);
    setError('');

    // 检测视频类型
    const info = detectVideoType(videoUrl);
    setVideoInfo(info);

    if (info.type === 'youtube') {
      // YouTube视频使用iframe，不需要加载状态
      setIsLoading(false);
    } else if (info.type === 'direct') {
      // 直接视频文件需要等待加载
      const video = videoRef.current;
      if (!video) return;

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handleError = () => {
        setIsLoading(false);
        setError('视频加载失败，请检查URL是否正确');
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // 设置视频源
      video.src = info.directUrl || videoUrl;
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    } else {
      // 未知类型
      setIsLoading(false);
      setError('不支持的视频格式，请使用YouTube链接或直接视频文件URL（.mp4, .webm等）');
    }
  }, [videoUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-white">加载中...</div>
          </div>
        )}
        
        {error ? (
          <div className="aspect-video flex items-center justify-center bg-gray-900">
            <div className="text-center text-white p-6">
              <p className="text-red-400 mb-2">{error}</p>
              <p className="text-sm text-gray-400">请确保视频URL可访问且格式正确</p>
            </div>
          </div>
        ) : videoInfo?.type === 'youtube' && videoInfo.embedUrl ? (
          <div className="aspect-video">
            <iframe
              src={videoInfo.embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube视频播放器"
            />
          </div>
        ) : videoInfo?.type === 'direct' ? (
          <video
            ref={videoRef}
            controls
            className="w-full h-auto"
            style={{ display: isLoading ? 'none' : 'block' }}
          >
            您的浏览器不支持视频播放
          </video>
        ) : null}
      </div>
      
      {videoUrl && !error && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
            <span className="font-medium">当前视频URL:</span> {videoUrl}
          </p>
        </div>
      )}
    </div>
  );
}
