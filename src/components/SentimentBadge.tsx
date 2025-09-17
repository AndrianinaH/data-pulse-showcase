import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown } from "lucide-react";

interface SentimentBadgeProps {
  sentiment: 'positive' | 'neutral' | 'negative';
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showScore?: boolean;
}

export const SentimentBadge = ({
  sentiment,
  score,
  size = 'md',
  showIcon = true,
  showScore = false
}: SentimentBadgeProps) => {
  const getSentimentConfig = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return {
          color: 'bg-green-100 text-green-800 hover:bg-green-200',
          icon: <Smile className="w-3 h-3" />,
          label: 'Positif'
        };
      case 'negative':
        return {
          color: 'bg-red-100 text-red-800 hover:bg-red-200',
          icon: <Frown className="w-3 h-3" />,
          label: 'Négatif'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          icon: <Meh className="w-3 h-3" />,
          label: 'Neutre'
        };
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-sm px-3 py-2';
      default:
        return 'text-xs px-2.5 py-1.5';
    }
  };

  const config = getSentimentConfig(sentiment);

  return (
    <Badge
      className={`${config.color} ${getSizeClass(size)} flex items-center gap-1.5 font-medium border-0 transition-colors`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
      {showScore && score !== undefined && (
        <span className="ml-1 opacity-80">
          ({(score * 100).toFixed(0)}%)
        </span>
      )}
    </Badge>
  );
};