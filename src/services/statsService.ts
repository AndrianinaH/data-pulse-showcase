import { z } from "zod";
import { API_BASE_URL } from "@/lib/api";

const statsSchema = z.object({
  totalReactions: z.string(),
  totalComments: z.string(),
  totalShares: z.string(),
  totalVideoViews: z.string(),
});

export type Stats = z.infer<typeof statsSchema>;

export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  const data = await response.json();
  return statsSchema.parse(data);
};

export type Post = {
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  username: string;
  postCreatedAt: string;
  mediaType?: string;
  messageText?: string;
  commentCount: number;
  shareCount: number;
  reactionCount: number;
  videoViewCount: number;
  permalink?: string;
  photoImageUri?: string;
  photoPageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousels?: any;
};

export const getLatestPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest posts");
  }
  return response.json();
};
