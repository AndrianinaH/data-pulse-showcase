import { z } from "zod";
import { API_BASE_URL } from "@/lib/api";
import { getAuthHeaders } from "@/lib/api";

const statsSchema = z.object({
  totalReactions: z.string(),
  totalComments: z.string(),
  totalShares: z.string(),
  totalVideoViews: z.string(),
  totalPosts: z.string(),
});

export type Stats = z.infer<typeof statsSchema>;

export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  const data = await response.json();
  return statsSchema.parse(data);
};

export const getSearchStats = async (search: string): Promise<Stats> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const response = await fetch(`${API_BASE_URL}/stats/search-stats?${params}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch search stats");
  }
  const data = await response.json();
  return statsSchema.parse(data);
};
