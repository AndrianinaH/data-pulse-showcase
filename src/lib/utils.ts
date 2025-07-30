import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (numStr: string | number) => {
  const num = Number(numStr);
  if (isNaN(num)) return "0";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapApiPostToCardPost = (apiPost: any) => {
  let media;
  if (apiPost.photoImageUri || apiPost.photoPageUrl) {
    media = {
      photo_image_uri: apiPost.photoImageUri,
      photo_page_url: apiPost.photoPageUrl,
      permalink: apiPost.permalink,
    };
  } else if (
    apiPost.carousels &&
    Array.isArray(apiPost.carousels) &&
    apiPost.carousels[0]
  ) {
    media = {
      photo_image_uri: apiPost.carousels[0],
      photo_page_url: apiPost.carousels[0],
      permalink: apiPost.carousels[0],
    };
  }
  return {
    id: apiPost.postId,
    created_at: apiPost.createdAt,
    post_id: apiPost.postId,
    user_id: apiPost.userId,
    username: apiPost.username,
    post_created_at: apiPost.postCreatedAt,
    media_type: apiPost.mediaType as "photo" | "video" | "text",
    message_text: apiPost.messageText || "",
    engagement: {
      comment_count: apiPost.commentCount || 0,
      share_count: apiPost.shareCount || 0,
      reaction_count: apiPost.reactionCount || 0,
      video_view_count: apiPost.videoViewCount || 0,
    },
    media,
  };
};
