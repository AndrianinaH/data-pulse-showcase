import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { PostDetailsModal } from "./PostDetailsModal";
import { useState } from "react";

interface Engagement {
  comment_count: number;
  share_count: number;
  reaction_count: number;
  video_view_count: number;
}

interface Media {
  permalink?: string;
  photo_image_uri?: string;
  photo_page_url?: string;
}

export interface Post {
  id: string;
  created_at: string;
  post_id: string;
  user_id: string;
  username: string;
  post_created_at: string;
  media_type: "photo" | "video" | "text";
  message_text: string;
  engagement: Engagement;
  media?: Media;
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on a button or link
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    setIsModalOpen(true);
  };

  const transformedPost = {
    postId: post.post_id,
    message: post.message_text,
    username: post.username,
    postCreatedAt: post.post_created_at,
    engagement: post.engagement,
    media_type: post.media_type,
    media: post.media,
  };

  return (
    <>
      <Card
        className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border-0 cursor-pointer"
        onClick={handleCardClick}
      >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
              {post.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-foreground">@{post.username}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.post_created_at)}</span>
              </div>
            </div>
          </div>
          <Badge
            className={`${getMediaTypeColor(post.media_type)} font-medium`}
          >
            {post.media_type === "photo" && "📸"}
            {post.media_type === "video" && "🎥"}
            {post.media_type === "text" && "✍️"}
            {post.media_type}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">{post.message_text}</p>

          {post.media?.photo_image_uri && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={post.media.photo_image_uri}
                alt="Post media"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium">
              {formatNumber(post.engagement.reaction_count)}
            </span>
            <span className="text-xs text-muted-foreground">réactions</span>
          </div>

          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 text-pulse-blue" />
            <span className="text-sm font-medium">
              {formatNumber(post.engagement.comment_count)}
            </span>
            <span className="text-xs text-muted-foreground">commentaires</span>
          </div>

          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium">
              {formatNumber(post.engagement.share_count)}
            </span>
            <span className="text-xs text-muted-foreground">partages</span>
          </div>

          {post.engagement.video_view_count > 0 && (
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-pulse-blue" />
              <span className="text-sm font-medium">
                {formatNumber(post.engagement.video_view_count)}
              </span>
              <span className="text-xs text-muted-foreground">vues</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {post.media?.permalink && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-coral hover:text-white hover:border-coral transition-colors"
              asChild
            >
              <a
                href={post.media.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Voir le post
              </a>
            </Button>
          </div>
        )}
      </div>
    </Card>

    <PostDetailsModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      post={transformedPost}
    />
    </>
  );
};
