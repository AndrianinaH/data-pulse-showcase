import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MessageCircle, Share2, Eye } from "lucide-react";

interface Post {
  id: string;
  engagement: {
    comment_count: number;
    share_count: number;
    reaction_count: number;
    video_view_count: number;
  };
}

interface StatsOverviewProps {
  posts: Post[];
}

export const StatsOverview = ({ posts }: StatsOverviewProps) => {
  const totalReactions = posts.reduce((sum, post) => sum + post.engagement.reaction_count, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.engagement.comment_count, 0);
  const totalShares = posts.reduce((sum, post) => sum + post.engagement.share_count, 0);
  const totalViews = posts.reduce((sum, post) => sum + post.engagement.video_view_count, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = [
    {
      title: "Total des Réactions",
      value: formatNumber(totalReactions),
      icon: TrendingUp,
      color: "coral",
      bgColor: "bg-coral/10",
      iconColor: "text-coral"
    },
    {
      title: "Commentaires",
      value: formatNumber(totalComments),
      icon: MessageCircle,
      color: "pulse-blue",
      bgColor: "bg-pulse-blue/10",
      iconColor: "text-pulse-blue"
    },
    {
      title: "Partages",
      value: formatNumber(totalShares),
      icon: Share2,
      color: "coral",
      bgColor: "bg-coral/10",
      iconColor: "text-coral"
    },
    {
      title: "Vues Vidéo",
      value: formatNumber(totalViews),
      icon: Eye,
      color: "pulse-blue",
      bgColor: "bg-pulse-blue/10",
      iconColor: "text-pulse-blue"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white shadow-card hover:shadow-elegant transition-all duration-300 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
              <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};