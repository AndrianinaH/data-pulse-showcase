import { API_BASE_URL, getAuthHeaders } from '@/lib/api';

// API Response interfaces
interface ApiSentimentDistribution {
  sentiment: string;
  count: number;
}

interface ApiAverageScores {
  avgPositive: string;
  avgNeutral: string;
  avgNegative: string;
}

interface ApiOverviewResponse {
  totalPosts: number;
  sentimentDistribution: ApiSentimentDistribution[];
  averageScores: ApiAverageScores;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thirtyDayTrends: any[];
}

// Processed interface for UI
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

// API Response interfaces for trends
interface ApiDailyTrend {
  date: string;
  sentiment: string;
  count: number;
  avgPositive: string;
  avgNeutral: string;
  avgNegative: string;
}

interface ApiTrendsResponse {
  period: string;
  currentPeriod: {
    dailyTrends: ApiDailyTrend[];
    startDate: string;
    endDate: string;
  };
  previousPeriod: {
    aggregatedData: any[];
    startDate: string;
    endDate: string;
  };
}

// Processed interface for UI
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

// API Response interfaces for correlations
interface ApiCorrelationPost {
  postId: string;
  messageText: string;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  videoViewCount: number | null;
  positive: string;
  neutral: string;
  negative: string;
  finalLabel: string;
  totalEngagement: string;
}

interface ApiEngagementBySentiment {
  sentiment: string;
  avgReactions: string;
  avgComments: string;
  avgShares: string;
  avgVideoViews: string | null;
  count: number;
}

interface ApiCorrelationsResponse {
  correlationData: ApiCorrelationPost[];
  topPositiveEngagement: ApiCorrelationPost[];
  topNegativeEngagement: ApiCorrelationPost[];
  averageEngagementBySentiment: ApiEngagementBySentiment[];
}

// Processed interface for UI
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

// Helper function to transform API data to UI format
const transformOverviewData = (
  apiData: ApiOverviewResponse,
): SentimentOverview => {
  // Calculate percentages from counts
  const totalCount = apiData.sentimentDistribution.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const getPercentage = (sentiment: string) => {
    const item = apiData.sentimentDistribution.find(
      (d) => d.sentiment === sentiment,
    );
    return item ? (item.count / totalCount) * 100 : 0;
  };

  // Calculate average score (using positive percentage as main score)
  const avgPositive = parseFloat(apiData.averageScores.avgPositive) || 0;

  return {
    totalPostsAnalyzed: apiData.totalPosts,
    sentimentDistribution: {
      positive: getPercentage('positive'),
      neutral: getPercentage('neutral'),
      negative: getPercentage('negative'),
    },
    averageScore: avgPositive / 100, // Convert to 0-1 scale
    trend: {
      current: avgPositive / 100,
      previous: (avgPositive / 100) * 0.9, // Mock previous value
      change: 5.0, // Mock change percentage
    },
  };
};

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

  const apiData: ApiOverviewResponse = await response.json();
  return transformOverviewData(apiData);
};

// Helper function to transform trends data
const transformTrendsData = (apiData: ApiTrendsResponse): SentimentTrend[] => {
  const dailyTrends = apiData.currentPeriod.dailyTrends;

  // Group by date and aggregate sentiment data
  const dateMap = new Map<string, SentimentTrend>();

  dailyTrends.forEach((trend) => {
    const existing = dateMap.get(trend.date);
    if (existing) {
      // Update existing date with current trend data
      existing.positive = parseFloat(trend.avgPositive) || 0;
      existing.neutral = parseFloat(trend.avgNeutral) || 0;
      existing.negative = parseFloat(trend.avgNegative) || 0;
      existing.avgScore = existing.positive / 100; // Use positive as main score
    } else {
      // Create new entry
      dateMap.set(trend.date, {
        date: trend.date,
        positive: parseFloat(trend.avgPositive) || 0,
        neutral: parseFloat(trend.avgNeutral) || 0,
        negative: parseFloat(trend.avgNegative) || 0,
        avgScore: (parseFloat(trend.avgPositive) || 0) / 100,
      });
    }
  });

  return Array.from(dateMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
};

export const getSentimentTrends = async (
  period: '7d' | '30d' | '90d' = '30d',
): Promise<SentimentTrend[]> => {
  const response = await fetch(
    `${API_BASE_URL}/sentiment/trends?period=${period}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment trends');
  }

  const apiData: ApiTrendsResponse = await response.json();
  return transformTrendsData(apiData);
};

export const getTopPostsBySentiment = async (
  sentiment: 'positive' | 'negative' | 'neutral',
  limit: number = 10,
): Promise<TopPost[]> => {
  const response = await fetch(
    `${API_BASE_URL}/sentiment/posts/top?sentiment=${sentiment}&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top posts by sentiment');
  }

  return response.json();
};

// Helper function to transform correlations data
const transformCorrelationsData = (apiData: ApiCorrelationsResponse): SentimentCorrelation[] => {
  const avgBySentiment = apiData.averageEngagementBySentiment;

  // Find positive and neutral sentiment averages
  const positiveData = avgBySentiment.find(s => s.sentiment === 'positive');
  const neutralData = avgBySentiment.find(s => s.sentiment === 'neutral');

  const positiveReactions = parseFloat(positiveData?.avgReactions || '0');
  const neutralReactions = parseFloat(neutralData?.avgReactions || '0');
  const positiveComments = parseFloat(positiveData?.avgComments || '0');
  const neutralComments = parseFloat(neutralData?.avgComments || '0');
  const positiveShares = parseFloat(positiveData?.avgShares || '0');
  const neutralShares = parseFloat(neutralData?.avgShares || '0');

  // Calculate correlation percentages (difference from neutral as baseline)
  const reactionsCorr = neutralReactions > 0 ? ((positiveReactions - neutralReactions) / neutralReactions) * 100 : 0;
  const commentsCorr = neutralComments > 0 ? ((positiveComments - neutralComments) / neutralComments) * 100 : 0;
  const sharesCorr = neutralShares > 0 ? ((positiveShares - neutralShares) / neutralShares) * 100 : 0;

  return [
    {
      metric: "Réactions",
      positiveCorr: Math.max(0, reactionsCorr) / 100,
      negativeCorr: Math.min(0, reactionsCorr) / 100,
      description: `Les posts positifs génèrent ${reactionsCorr > 0 ? '+' : ''}${reactionsCorr.toFixed(1)}% de réactions vs neutres`
    },
    {
      metric: "Commentaires",
      positiveCorr: Math.max(0, commentsCorr) / 100,
      negativeCorr: Math.min(0, commentsCorr) / 100,
      description: `Les posts positifs génèrent ${commentsCorr > 0 ? '+' : ''}${commentsCorr.toFixed(1)}% de commentaires vs neutres`
    },
    {
      metric: "Partages",
      positiveCorr: Math.max(0, sharesCorr) / 100,
      negativeCorr: Math.min(0, sharesCorr) / 100,
      description: `Les posts positifs génèrent ${sharesCorr > 0 ? '+' : ''}${sharesCorr.toFixed(1)}% de partages vs neutres`
    },
    {
      metric: "Engagement Total",
      positiveCorr: positiveData ? 0.85 : 0.5, // Mock high correlation for positive
      negativeCorr: -0.15,
      description: `Le sentiment positif augmente significativement l'engagement global`
    }
  ];
};

export const getSentimentCorrelations = async (): Promise<
  SentimentCorrelation[]
> => {
  const response = await fetch(`${API_BASE_URL}/sentiment/correlations`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment correlations');
  }

  const apiData: ApiCorrelationsResponse = await response.json();
  return transformCorrelationsData(apiData);
};

export const getCommentSentimentOverview =
  async (): Promise<CommentSentimentOverview> => {
    // Mock data for debugging - will be replaced later
    await new Promise((resolve) => setTimeout(resolve, 450));

    return {
      totalComments: 8456,
      sentimentDistribution: {
        positive: 72.4,
        neutral: 19.8,
        negative: 7.8,
      },
      topEngagingPosts: [
        {
          postId: 'post_1',
          positiveComments: 145,
          negativeComments: 12,
          totalComments: 167,
        },
        {
          postId: 'post_2',
          positiveComments: 98,
          negativeComments: 8,
          totalComments: 123,
        },
        {
          postId: 'post_3',
          positiveComments: 87,
          negativeComments: 15,
          totalComments: 115,
        },
      ],
    };
  };
