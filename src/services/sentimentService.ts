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

// Mock data functions
export const getSentimentOverview = async (): Promise<SentimentOverview> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalPostsAnalyzed: 1247,
    sentimentDistribution: {
      positive: 68.3,
      neutral: 23.1,
      negative: 8.6
    },
    averageScore: 0.74,
    trend: {
      current: 0.74,
      previous: 0.69,
      change: 7.2
    }
  };
};

export const getSentimentTrends = async (period: '7d' | '30d' | '90d' = '30d'): Promise<SentimentTrend[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const trends: SentimentTrend[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    trends.push({
      date: date.toISOString().split('T')[0],
      positive: Math.random() * 30 + 50, // 50-80%
      neutral: Math.random() * 20 + 15, // 15-35%
      negative: Math.random() * 15 + 5, // 5-20%
      avgScore: Math.random() * 0.4 + 0.5 // 0.5-0.9
    });
  }

  return trends;
};

export const getTopPostsBySentiment = async (sentiment: 'positive' | 'negative', limit: number = 10): Promise<TopPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const posts: TopPost[] = [];
  const usernames = ['alice_creator', 'bob_social', 'charlie_content', 'diana_digital', 'evan_engage'];
  const messages = {
    positive: [
      "Quelle belle journée pour partager du contenu inspirant ! 🌟",
      "Tellement reconnaissant pour votre soutien, merci ! 💖",
      "Nouveau projet en cours, j'ai hâte de vous le montrer !",
      "L'équipe a fait un travail fantastique aujourd'hui ! 👏",
      "Merci pour tous vos retours positifs, ça me motive ! 🚀"
    ],
    negative: [
      "Déçu par cette situation, espérons que ça s'améliore...",
      "Les retards sont vraiment frustrants en ce moment",
      "Pas satisfait du service client reçu aujourd'hui",
      "La qualité n'est plus ce qu'elle était malheureusement",
      "Problèmes techniques encore une fois... 😞"
    ]
  };

  for (let i = 0; i < limit; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    posts.push({
      postId: `post_${i + 1}`,
      message: messages[sentiment][i % messages[sentiment].length],
      username: usernames[i % usernames.length],
      createdAt: date.toISOString(),
      sentiment,
      score: sentiment === 'positive' ? Math.random() * 0.3 + 0.7 : Math.random() * 0.3 + 0.1,
      engagement: {
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 50) + 5
      }
    });
  }

  return posts;
};

export const getSentimentCorrelations = async (): Promise<SentimentCorrelation[]> => {
  await new Promise(resolve => setTimeout(resolve, 350));

  return [
    {
      metric: "Likes",
      positiveCorr: 0.78,
      negativeCorr: -0.45,
      description: "Les posts positifs génèrent 78% plus de likes"
    },
    {
      metric: "Commentaires",
      positiveCorr: 0.62,
      negativeCorr: 0.34,
      description: "Les posts négatifs génèrent aussi de l'engagement"
    },
    {
      metric: "Partages",
      positiveCorr: 0.84,
      negativeCorr: -0.12,
      description: "Le contenu positif est plus partagé"
    },
    {
      metric: "Portée",
      positiveCorr: 0.71,
      negativeCorr: -0.23,
      description: "Le sentiment positif augmente la portée"
    }
  ];
};

export const getCommentSentimentOverview = async (): Promise<CommentSentimentOverview> => {
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