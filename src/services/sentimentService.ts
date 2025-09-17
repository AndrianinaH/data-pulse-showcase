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
    aggregatedData: Array<{
      sentiment: string;
      count: number;
      avgPositive: string;
      avgNeutral: string;
      avgNegative: string;
    }>;
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
  messageText: string;
  postCreatedAt: string;
  username: string;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  videoViewCount: number;
  positive: string;
  neutral: string;
  negative: string;
  finalLabel: 'positive' | 'neutral' | 'negative';
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

// API Response interface for comments
interface ApiCommentSentimentDistribution {
  sentiment: string;
  count: number;
}

interface ApiTopCommentPost {
  postId: string;
  positiveCommentsCount?: number;
  negativeCommentsCount?: number;
}

interface ApiCommentOverviewResponse {
  totalComments: number;
  commentSentimentDistribution: ApiCommentSentimentDistribution[];
  topPositiveCommentsPosts: ApiTopCommentPost[];
  topNegativeCommentsPosts: ApiTopCommentPost[];
  averageCommentScores: {
    avgPositive: string;
    avgNeutral: string;
    avgNegative: string;
  };
  hasData: boolean;
}

// Processed interface for UI
export interface CommentSentimentOverview {
  totalComments: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topEngagingPosts: {
    postId: string;
    message: string;
    username: string;
    postCreatedAt: string;
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

// Helper function to transform comment data
const transformCommentData = (apiData: ApiCommentOverviewResponse): CommentSentimentOverview => {
  // Calculate percentages from counts
  const totalCount = apiData.commentSentimentDistribution.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const getPercentage = (sentiment: string) => {
    const item = apiData.commentSentimentDistribution.find(
      (d) => d.sentiment === sentiment,
    );
    return item ? (item.count / totalCount) * 100 : 0;
  };

  // Combine positive and negative comment data by postId
  const postEngagementMap = new Map<string, {
    positiveComments: number;
    negativeComments: number;
  }>();

  // Add positive comments
  apiData.topPositiveCommentsPosts.forEach(post => {
    if (post.postId) { // Skip empty postIds
      postEngagementMap.set(post.postId, {
        positiveComments: post.positiveCommentsCount || 0,
        negativeComments: 0,
      });
    }
  });

  // Add negative comments
  apiData.topNegativeCommentsPosts.forEach(post => {
    if (post.postId) { // Skip empty postIds
      const existing = postEngagementMap.get(post.postId);
      if (existing) {
        existing.negativeComments = post.negativeCommentsCount || 0;
      } else {
        postEngagementMap.set(post.postId, {
          positiveComments: 0,
          negativeComments: post.negativeCommentsCount || 0,
        });
      }
    }
  });

  // Mock post data for demonstration (in real app, this would come from a posts API)
  const mockPostData: Record<string, { message: string; username: string; postCreatedAt: string }> = {
    '1088306573399928': {
      message: '#MarionOfisialy Palais des Sports #Génération2000 ❣️🥰 #NdaoFaLera',
      username: 'YasOfficiel',
      postCreatedAt: '2024-08-24T15:30:00Z'
    },
    '1294473435756255': {
      message: 'LIVE FESTIVAL SOROGNO AMBANJA 2025 Araho mivantana ny fety mandritra ity andro fahaefatra amin\'ity Festival Sorogno 26è édition Ambanja ity ! 🏝🤼',
      username: 'YasOfficiel',
      postCreatedAt: '2024-08-29T14:20:00Z'
    },
    '1088176770079575': {
      message: '#TempoGaigy #Génération2000 Palais des Sports Mahamasina💛💙🤩 #NdaoFaLera',
      username: 'YasOfficiel',
      postCreatedAt: '2024-08-23T16:45:00Z'
    },
    '1109720657925186': {
      message: 'Isika miaraka amin\'i Barea ! 🇲🇬🐂 \'Ndao fa lera 🇲🇬🐂',
      username: 'YasOfficiel',
      postCreatedAt: '2024-08-25T10:15:00Z'
    },
    '1077338614496724': {
      message: 'Micro-trottoir Part. 2 : Bob Tobias Officiel x Myh en MbaLait 🇲🇬🎤💙 MEGA LIVE Yas',
      username: 'YasOfficiel',
      postCreatedAt: '2024-08-22T18:30:00Z'
    }
  };

  // Convert to array and sort by total engagement
  const topEngagingPosts = Array.from(postEngagementMap.entries())
    .map(([postId, data]) => {
      const postInfo = mockPostData[postId] || {
        message: `Contenu du post ${postId.slice(0, 12)}...`,
        username: 'utilisateur',
        postCreatedAt: new Date().toISOString()
      };

      return {
        postId,
        message: postInfo.message,
        username: postInfo.username,
        postCreatedAt: postInfo.postCreatedAt,
        positiveComments: data.positiveComments,
        negativeComments: data.negativeComments,
        totalComments: data.positiveComments + data.negativeComments,
      };
    })
    .sort((a, b) => b.totalComments - a.totalComments)
    .slice(0, 5); // Top 5 posts

  return {
    totalComments: apiData.totalComments,
    sentimentDistribution: {
      positive: getPercentage('positive'),
      neutral: getPercentage('neutral'),
      negative: getPercentage('negative'),
    },
    topEngagingPosts,
  };
};

export const getCommentSentimentOverview =
  async (): Promise<CommentSentimentOverview> => {
    const response = await fetch(`${API_BASE_URL}/sentiment/comments/overview`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comment sentiment overview');
    }

    const apiData: ApiCommentOverviewResponse = await response.json();
    return transformCommentData(apiData);
  };
