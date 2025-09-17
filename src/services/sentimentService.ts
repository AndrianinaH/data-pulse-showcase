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
  const response = await fetch(`${API_BASE_URL}/sentiment/comments/overview`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comment sentiment overview');
  }

  return response.json();
};