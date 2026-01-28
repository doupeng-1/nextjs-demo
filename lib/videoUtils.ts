/**
 * 视频URL工具函数
 */

export type VideoType = 'youtube' | 'direct' | 'unknown';

export interface VideoInfo {
  type: VideoType;
  embedUrl?: string;
  directUrl?: string;
}

/**
 * 从YouTube URL中提取视频ID
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * 检测视频类型并返回相应的信息
 */
export function detectVideoType(url: string): VideoInfo {
  // 检测YouTube
  const youtubeId = extractYouTubeId(url);
  if (youtubeId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  // 检测是否为直接视频文件
  const directVideoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.m3u8'];
  const lowerUrl = url.toLowerCase();
  const isDirectVideo = directVideoExtensions.some(ext => lowerUrl.includes(ext)) ||
    lowerUrl.includes('video/') ||
    lowerUrl.match(/\.(mp4|webm|ogg|mov|avi|m3u8)(\?|$)/i);

  if (isDirectVideo) {
    return {
      type: 'direct',
      directUrl: url,
    };
  }

  return {
    type: 'unknown',
  };
}
