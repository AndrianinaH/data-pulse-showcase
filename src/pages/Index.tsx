import { useEffect, useState } from "react";
import { StatsOverview } from "@/components/StatsOverview";
import { PostCard } from "@/components/PostCard";
import { getStats, Stats } from "@/services/statsService";

// Données mockées basées sur le JSON fourni
const mockData = {
  posts: [
    {
      id: "1",
      created_at: "2024-01-15T10:30:00Z",
      post_id: "fb_123456",
      user_id: "user_789",
      username: "john_doe",
      post_created_at: "2024-01-15T09:00:00Z",
      media_type: "photo" as const,
      message_text: "Belle journée à Antananarivo ! 🌞",
      engagement: {
        comment_count: 25,
        share_count: 8,
        reaction_count: 156,
        video_view_count: 0,
      },
      media: {
        permalink: "https://facebook.com/post/123456",
        photo_image_uri: "https://picsum.photos/400/300",
        photo_page_url: "https://facebook.com/photo/123456",
      },
    },
    {
      id: "2",
      created_at: "2024-01-14T16:45:00Z",
      post_id: "fb_789012",
      user_id: "user_456",
      username: "marie_rabe",
      post_created_at: "2024-01-14T15:30:00Z",
      media_type: "video" as const,
      message_text: "Découvrez notre nouveau produit ! 🚀",
      engagement: {
        comment_count: 42,
        share_count: 15,
        reaction_count: 203,
        video_view_count: 1250,
      },
    },
    {
      id: "3",
      created_at: "2024-01-13T14:20:00Z",
      post_id: "fb_345678",
      user_id: "user_123",
      username: "sarah_tech",
      post_created_at: "2024-01-13T13:45:00Z",
      media_type: "photo" as const,
      message_text: "Innovation et technologie au service de Madagascar 💻✨",
      engagement: {
        comment_count: 38,
        share_count: 22,
        reaction_count: 189,
        video_view_count: 0,
      },
      media: {
        permalink: "https://facebook.com/post/345678",
        photo_image_uri: "https://picsum.photos/400/250",
        photo_page_url: "https://facebook.com/photo/345678",
      },
    },
  ],
};

const Index = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const fetchedStats = await getStats();
        setStats(fetchedStats);
      } catch (err) {
        setError("Impossible de charger les statistiques.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble de vos performances sur les réseaux sociaux
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <StatsOverview stats={stats} isLoading={isLoading} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Publications Récentes
          </h2>
          <div className="text-sm text-muted-foreground">
            {mockData.posts.length} publication
            {mockData.posts.length > 1 ? "s" : ""} analysée
            {mockData.posts.length > 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockData.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
