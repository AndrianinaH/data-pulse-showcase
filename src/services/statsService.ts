import { z } from "zod";
import { API_BASE_URL } from "@/lib/api";
import { getAuthHeaders, handle401 } from "@/lib/utils";

const statsSchema = z.object({
  totalReactions: z.string().nullable().default("0"),
  totalComments: z.string().nullable().default("0"),
  totalShares: z.string().nullable().default("0"),
  totalVideoViews: z.string().nullable().default("0"),
  totalPosts: z.string().nullable().default("0"),
});

export type Stats = z.infer<typeof statsSchema>;

export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_BASE_URL}/stats`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (handle401(response)) throw new Error("Unauthorized");
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
  if (handle401(response)) throw new Error("Unauthorized");
  if (!response.ok) {
    throw new Error("Failed to fetch search stats");
  }
  const data = await response.json();
  return statsSchema.parse(data);
};
