import { API_BASE_URL } from "@/lib/api";
import { getAuthHeaders, handle401 } from "@/lib/utils";

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
  const response = await fetch(`${API_BASE_URL}/posts/latest`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (handle401(response)) return [];
  if (!response.ok) {
    throw new Error("Failed to fetch latest posts");
  }
  return response.json();
};

export const getPosts = async (
  page = 1,
  pageSize = 20,
  orderBy = "postCreatedAt:desc",
  search?: string,
): Promise<Post[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
  });
  if (search) {
    params.append("search", search);
  }
  const response = await fetch(`${API_BASE_URL}/posts?${params}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (handle401(response)) return [];
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
