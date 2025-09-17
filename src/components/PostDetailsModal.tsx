import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  ExternalLink,
  Calendar,
  User,
  Hash,
} from "lucide-react";

interface PostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    postId: string;
    message: string;
    username: string;
    postCreatedAt: string;
    positiveComments?: number;
    negativeComments?: number;
    totalComments?: number;
    // Optional engagement data if available from full post data
    engagement?: {
      reaction_count: number;
      comment_count: number;
      share_count: number;
      video_view_count: number;
    };
    media_type?: "photo" | "video" | "text";
    media?: {
      permalink?: string;
      photo_image_uri?: string;
    };
    // Optional sentiment analysis data
    sentimentAnalysis?: {
      positive: number;
      neutral: number;
      negative: number;
      finalLabel: 'positive' | 'neutral' | 'negative';
    };
  };
}

export const PostDetailsModal = ({ isOpen, onClose, post }: PostDetailsModalProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMediaTypeColor = (type: string) => {
    switch (type) {
      case "photo":
        return "bg-coral text-white";
      case "video":
        return "bg-pulse-blue text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSentimentStats = () => {
    const positive = post.positiveComments || 0;
    const negative = post.negativeComments || 0;
    const total = post.totalComments || positive + negative;

    if (total === 0) return null;

    const positivePercentage = (positive / total) * 100;
    const negativePercentage = (negative / total) * 100;
    const neutralPercentage = 100 - positivePercentage - negativePercentage;

    return {
      positive: positivePercentage,
      negative: negativePercentage,
      neutral: neutralPercentage,
      total,
    };
  };

  const sentimentStats = getSentimentStats();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-pulse-blue" />
            Détails du Post
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with user info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                {post.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">@{post.username}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.postCreatedAt)}</span>
                </div>
              </div>
            </div>

            {post.media_type && (
              <Badge className={`${getMediaTypeColor(post.media_type)} font-medium`}>
                {post.media_type === "photo" && "📸"}
                {post.media_type === "video" && "🎥"}
                {post.media_type === "text" && "✍️"}
                {post.media_type}
              </Badge>
            )}
          </div>

          {/* Post ID */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="w-3 h-3" />
            <span>ID: {post.postId}</span>
          </div>

          {/* Post Content */}
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Contenu du post</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {post.message}
              </p>
            </div>

            {post.media?.photo_image_uri && (
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={post.media.photo_image_uri}
                  alt="Post media"
                  className="w-full max-h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Engagement Metrics */}
          {post.engagement && (
            <div className="bg-muted/10 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Engagement</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-coral" />
                  <div>
                    <div className="text-sm font-medium">
                      {formatNumber(post.engagement.reaction_count)}
                    </div>
                    <div className="text-xs text-muted-foreground">réactions</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-pulse-blue" />
                  <div>
                    <div className="text-sm font-medium">
                      {formatNumber(post.engagement.comment_count)}
                    </div>
                    <div className="text-xs text-muted-foreground">commentaires</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-coral" />
                  <div>
                    <div className="text-sm font-medium">
                      {formatNumber(post.engagement.share_count)}
                    </div>
                    <div className="text-xs text-muted-foreground">partages</div>
                  </div>
                </div>

                {post.engagement.video_view_count > 0 && (
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-pulse-blue" />
                    <div>
                      <div className="text-sm font-medium">
                        {formatNumber(post.engagement.video_view_count)}
                      </div>
                      <div className="text-xs text-muted-foreground">vues</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Post Sentiment Analysis */}
          {post.sentimentAnalysis && (
            <div className="bg-muted/10 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Analyse du Sentiment du Post</h3>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {post.sentimentAnalysis.positive.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Positif</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600">
                    {post.sentimentAnalysis.neutral.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Neutre</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {post.sentimentAnalysis.negative.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Négatif</div>
                </div>
              </div>

              {/* Sentiment distribution bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
                <div className="flex h-full">
                  <div
                    className="bg-green-500"
                    style={{ width: `${post.sentimentAnalysis.positive}%` }}
                  ></div>
                  <div
                    className="bg-gray-400"
                    style={{ width: `${post.sentimentAnalysis.neutral}%` }}
                  ></div>
                  <div
                    className="bg-red-500"
                    style={{ width: `${post.sentimentAnalysis.negative}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium">
                  Sentiment final :
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    post.sentimentAnalysis.finalLabel === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : post.sentimentAnalysis.finalLabel === 'negative'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.sentimentAnalysis.finalLabel === 'positive' ? 'Positif' :
                     post.sentimentAnalysis.finalLabel === 'negative' ? 'Négatif' : 'Neutre'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Comment Sentiment Analysis */}
          {sentimentStats && (
            <div className="bg-muted/10 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Analyse des Commentaires</h3>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {sentimentStats.positive.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Positifs</div>
                  <div className="text-xs font-medium">{post.positiveComments || 0}</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600">
                    {sentimentStats.neutral.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Neutres</div>
                  <div className="text-xs font-medium">
                    {sentimentStats.total - (post.positiveComments || 0) - (post.negativeComments || 0)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {sentimentStats.negative.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Négatifs</div>
                  <div className="text-xs font-medium">{post.negativeComments || 0}</div>
                </div>
              </div>

              {/* Sentiment distribution bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="flex h-full">
                  <div
                    className="bg-green-500"
                    style={{ width: `${sentimentStats.positive}%` }}
                  ></div>
                  <div
                    className="bg-gray-400"
                    style={{ width: `${sentimentStats.neutral}%` }}
                  ></div>
                  <div
                    className="bg-red-500"
                    style={{ width: `${sentimentStats.negative}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="text-sm text-muted-foreground">
                  Total: {sentimentStats.total} commentaire{sentimentStats.total > 1 ? 's' : ''} analysé{sentimentStats.total > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          {post.media?.permalink && (
            <div className="flex justify-center pt-4 border-t border-border">
              <Button
                variant="outline"
                className="hover:bg-coral hover:text-white hover:border-coral transition-colors"
                asChild
              >
                <a
                  href={post.media.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir le post original
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};