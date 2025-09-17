import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SentimentBadge } from "@/components/SentimentBadge";
import { SentimentChart } from "@/components/SentimentChart";
import { SentimentDistributionChart } from "@/components/SentimentDistributionChart";
import { CommentAnalysisCard } from "@/components/CommentAnalysisCard";
import { PostDetailsModal } from "@/components/PostDetailsModal";
import {
  Brain,
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Calendar
} from "lucide-react";
import {
  getSentimentOverview,
  getSentimentTrends,
  getTopPostsBySentiment,
  getSentimentCorrelations,
  getCommentSentimentOverview,
  type TopPost
} from "@/services/sentimentService";

export default function Sentiment() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedSentiment, setSelectedSentiment] = useState<'positive' | 'negative' | 'neutral'>('positive');
  const [selectedPost, setSelectedPost] = useState<TopPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ['sentiment-overview'],
    queryFn: getSentimentOverview,
    staleTime: 300000,
  });

  const { data: trends, isLoading: loadingTrends } = useQuery({
    queryKey: ['sentiment-trends', selectedPeriod],
    queryFn: () => getSentimentTrends(selectedPeriod),
    staleTime: 300000,
  });

  const { data: topPosts, isLoading: loadingTopPosts } = useQuery({
    queryKey: ['sentiment-top-posts', selectedSentiment],
    queryFn: () => getTopPostsBySentiment(selectedSentiment, 5),
    staleTime: 300000,
  });

  const { data: correlations, isLoading: loadingCorrelations } = useQuery({
    queryKey: ['sentiment-correlations'],
    queryFn: getSentimentCorrelations,
    staleTime: 300000,
  });

  const { data: commentsOverview, isLoading: loadingComments } = useQuery({
    queryKey: ['sentiment-comments-overview'],
    queryFn: getCommentSentimentOverview,
    staleTime: 300000,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handlePostClick = (post: TopPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Brain className="w-8 h-8 text-coral" />
          Analyse de Sentiment
        </h1>
        <p className="text-muted-foreground mt-2">
          Analysez les sentiments de vos publications et de leurs commentaires pour optimiser votre contenu
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Posts analysés</p>
              <p className="text-3xl font-bold mt-2 text-foreground">
                {loadingOverview ? "..." : formatNumber(overview?.totalPostsAnalyzed || 0)}
              </p>
              <p className="text-sm text-pulse-blue mt-1">Total analysé</p>
            </div>
            <div className="w-12 h-12 bg-pulse-blue/10 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-pulse-blue" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Sentiment positif</p>
              <p className="text-3xl font-bold mt-2 text-green-600">
                {loadingOverview ? "..." : `${overview?.sentimentDistribution?.positive?.toFixed(1) || 0}%`}
              </p>
              <p className="text-sm text-coral mt-1">
                {loadingOverview ? "..." : `+${overview?.trend?.change?.toFixed(1) || 0}% ce mois`}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Score moyen</p>
              <p className="text-3xl font-bold mt-2 text-coral">
                {loadingOverview ? "..." : `${((overview?.averageScore || 0) * 100).toFixed(0)}%`}
              </p>
              <p className="text-sm text-pulse-blue mt-1">Performance globale</p>
            </div>
            <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-coral" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Commentaires</p>
              <p className="text-3xl font-bold mt-2 text-pulse-blue">
                {loadingComments ? "..." : formatNumber(commentsOverview?.totalComments || 0)}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {loadingComments ? "..." : `${commentsOverview?.sentimentDistribution?.positive?.toFixed(1) || 0}% positifs`}
              </p>
            </div>
            <div className="w-12 h-12 bg-pulse-blue/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-pulse-blue" />
            </div>
          </div>
        </Card>
      </div>

      {/* Trends and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Tendances</h2>
            <div className="flex gap-2">
              {(['7d', '30d', '90d'] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
          <SentimentChart data={trends || []} isLoading={loadingTrends} />
        </Card>

        <Card className="p-6 bg-white shadow-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Répartition globale</h2>
          <SentimentDistributionChart
            data={overview?.sentimentDistribution || { positive: 0, neutral: 0, negative: 0 }}
            isLoading={loadingOverview}
          />
        </Card>
      </div>

      {/* Top Posts and Correlations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Top Posts</h2>
            <div className="flex gap-2">
              <Button
                variant={selectedSentiment === 'positive' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSentiment('positive')}
              >
                Positifs
              </Button>
              <Button
                variant={selectedSentiment === 'neutral' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSentiment('neutral')}
              >
                Neutres
              </Button>
              <Button
                variant={selectedSentiment === 'negative' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSentiment('negative')}
              >
                Négatifs
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {loadingTopPosts ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              Array.isArray(topPosts) && topPosts.map((post, index) => (
                <div
                  key={post.postId}
                  className="p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">#{index + 1}</span>
                      <span className="text-sm text-muted-foreground">@{post.username}</span>
                      <SentimentBadge sentiment={post.sentiment} size="sm" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.postCreatedAt)}
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-2 line-clamp-2">{post.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {formatNumber(post.engagement?.likes || 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {formatNumber(post.engagement?.comments || 0)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      {formatNumber(post.engagement?.shares || 0)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Corrélations Engagement</h2>
          <div className="space-y-4">
            {loadingCorrelations ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              Array.isArray(correlations) && correlations.map((corr) => (
                <div key={corr.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{corr.metric}</span>
                    <div className="flex gap-2">
                      <Badge variant={corr.positiveCorr > 0.5 ? "default" : "secondary"} className="text-xs">
                        +{(corr.positiveCorr * 100).toFixed(0)}%
                      </Badge>
                      <Badge variant={Math.abs(corr.negativeCorr) > 0.3 ? "destructive" : "secondary"} className="text-xs">
                        {(corr.negativeCorr * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{corr.description}</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.abs(corr.positiveCorr) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${Math.abs(corr.negativeCorr) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Comment Analysis Section */}
      <CommentAnalysisCard
        data={commentsOverview}
        isLoading={loadingComments}
      />

      {/* Post Details Modal */}
      {selectedPost && (
        <PostDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          post={{
            postId: selectedPost.postId,
            message: selectedPost.message,
            username: selectedPost.username,
            postCreatedAt: selectedPost.postCreatedAt,
            engagement: selectedPost.engagement ? {
              reaction_count: selectedPost.engagement.likes || 0,
              comment_count: selectedPost.engagement.comments || 0,
              share_count: selectedPost.engagement.shares || 0,
              video_view_count: 0,
            } : undefined,
          }}
        />
      )}
    </div>
  );
}