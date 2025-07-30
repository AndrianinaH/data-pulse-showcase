import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { Stats } from "@/services/statsService";
import { TrendingUp, MessageCircle, Share2, Eye } from "lucide-react";

interface StatsOverviewProps {
  stats: Stats | null;
  isLoading: boolean;
}

export const StatsOverview = ({ stats, isLoading }: StatsOverviewProps) => {
  const statsList = [
    {
      title: "Total des Réactions",
      value: stats ? formatNumber(stats.totalReactions) : "0",
      icon: TrendingUp,
      color: "coral",
      bgColor: "bg-coral/10",
      iconColor: "text-coral",
    },
    {
      title: "Commentaires",
      value: stats ? formatNumber(stats.totalComments) : "0",
      icon: MessageCircle,
      color: "pulse-blue",
      bgColor: "bg-pulse-blue/10",
      iconColor: "text-pulse-blue",
    },
    {
      title: "Partages",
      value: stats ? formatNumber(stats.totalShares) : "0",
      icon: Share2,
      color: "coral",
      bgColor: "bg-coral/10",
      iconColor: "text-coral",
    },
    {
      title: "Vues Vidéo",
      value: stats ? formatNumber(stats.totalVideoViews) : "0",
      icon: Eye,
      color: "pulse-blue",
      bgColor: "bg-pulse-blue/10",
      iconColor: "text-pulse-blue",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6 bg-white shadow-card border-0">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="w-12 h-12 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsList.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-white shadow-card hover:shadow-elegant transition-all duration-300 border-0"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.title}
              </p>
              <p className="text-3xl font-bold mt-2 text-foreground">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
            >
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
