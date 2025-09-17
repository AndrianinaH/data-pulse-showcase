import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

export interface SentimentOverview {
  totalPostsAnalyzed: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  averageScore: number;
  trend: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface SentimentTrend {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  avgScore: number;
}

export interface TopPost {
  postId: string;
  message: string;
  username: string;
  createdAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface SentimentCorrelation {
  metric: string;
  positiveCorr: number;
  negativeCorr: number;
  description: string;
}

export interface CommentSentimentOverview {
  totalComments: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topEngagingPosts: {
    postId: string;
    positiveComments: number;
    negativeComments: number;
    totalComments: number;
  }[];
}

// API functions
export const getSentimentOverview = async (): Promise<SentimentOverview> => {
  const response = await fetch(`${API_BASE_URL}/sentiment/overview`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment overview');
  }

  return response.json();
};

export const getSentimentTrends = async (period: '7d' | '30d' | '90d' = '30d'): Promise<SentimentTrend[]> => {
  const response = await fetch(`${API_BASE_URL}/sentiment/trends?period=${period}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment trends');
  }

  return response.json();
};

export const getTopPostsBySentiment = async (sentiment: 'positive' | 'negative' | 'neutral', limit: number = 10): Promise<TopPost[]> => {
  const response = await fetch(`${API_BASE_URL}/sentiment/posts/top?sentiment=${sentiment}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top posts by sentiment');
  }

  return response.json();
};

export const getSentimentCorrelations = async (): Promise<SentimentCorrelation[]> => {
  const response = await fetch(`${API_BASE_URL}/sentiment/correlations`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment correlations');
  }

  return response.json();
};

export const getCommentSentimentOverview = async (): Promise<CommentSentimentOverview> => {
  // Mock data for debugging - will be replaced later
  await new Promise(resolve => setTimeout(resolve, 450));

  return {
    totalComments: 8456,
    sentimentDistribution: {
      positive: 72.4,
      neutral: 19.8,
      negative: 7.8
    },
    topEngagingPosts: [
      {
        postId: "post_1",
        positiveComments: 145,
        negativeComments: 12,
        totalComments: 167
      },
      {
        postId: "post_2",
        positiveComments: 98,
        negativeComments: 8,
        totalComments: 123
      },
      {
        postId: "post_3",
        positiveComments: 87,
        negativeComments: 15,
        totalComments: 115
      }
    ]
  };
};