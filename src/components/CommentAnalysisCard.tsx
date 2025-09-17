import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, TrendingUp, Hash } from "lucide-react";
import { CommentSentimentOverview } from "@/services/sentimentService";
import { SentimentDistributionChart } from "./SentimentDistributionChart";

interface CommentAnalysisCardProps {
  data: CommentSentimentOverview | undefined;
  isLoading: boolean;
}

export const CommentAnalysisCard = ({ data, isLoading }: CommentAnalysisCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white shadow-card">
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-pulse-blue" />
          Analyse des Commentaires
        </h2>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
          Chargement de l'analyse des commentaires...
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6 bg-white shadow-card">
        <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-pulse-blue" />
          Analyse des Commentaires
        </h2>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
          Aucune donnée disponible
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-pulse-blue" />
              Analyse des Commentaires
            </h2>
            <p className="text-muted-foreground">
              Sentiment et engagement dans {formatNumber(data.totalComments)} commentaires analysés
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-pulse-blue">
              {formatNumber(data.totalComments)}
            </p>
            <p className="text-sm text-muted-foreground">Commentaires</p>
          </div>
        </div>
      </Card>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <Card className="p-6 bg-white shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Répartition des Sentiments
          </h3>
          <SentimentDistributionChart
            data={data.sentimentDistribution}
            isLoading={false}
          />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {data.sentimentDistribution.positive.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Positifs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">
                {data.sentimentDistribution.neutral.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Neutres</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {data.sentimentDistribution.negative.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Négatifs</p>
            </div>
          </div>
        </Card>

        {/* Top Engaging Posts */}
        <Card className="p-6 bg-white shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Posts les Plus Commentés
          </h3>
          <div className="space-y-3">
            {data.topEngagingPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucun post avec commentaires analysés
              </p>
            ) : (
              data.topEngagingPosts.map((post, index) => (
                <div
                  key={post.postId}
                  className="p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm font-mono text-muted-foreground">
                        {post.postId.slice(0, 12)}...
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      {post.totalComments} commentaires
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{post.positiveComments} positifs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{post.negativeComments} négatifs</span>
                    </div>
                  </div>

                  {/* Engagement bar */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="flex h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500"
                        style={{
                          width: `${(post.positiveComments / post.totalComments) * 100}%`
                        }}
                      ></div>
                      <div
                        className="bg-red-500"
                        style={{
                          width: `${(post.negativeComments / post.totalComments) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};