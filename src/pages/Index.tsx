import { useQuery } from "@tanstack/react-query";
import { StatsOverview } from "@/components/StatsOverview";
import { PostCard } from "@/components/PostCard";
import { getStats, getLatestPosts } from "@/services/statsService";
import type { Post as CardPost } from "@/components/PostCard";

const Index = () => {
  const {
    data: stats,
    isLoading: isStatsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: getLatestPosts,
  });

  const mapApiPostToCardPost = (apiPost): CardPost => ({
    id: apiPost.postId,
    created_at: apiPost.createdAt,
    post_id: apiPost.postId,
    user_id: apiPost.userId,
    username: apiPost.username,
    post_created_at: apiPost.postCreatedAt,
    media_type: apiPost.mediaType as "photo" | "video" | "text",
    message_text: apiPost.messageText || "",
    engagement: {
      comment_count: apiPost.commentCount || 0,
      share_count: apiPost.shareCount || 0,
      reaction_count: apiPost.reactionCount || 0,
      video_view_count: apiPost.videoViewCount || 0,
    },
    media:
      apiPost.photoImageUri || apiPost.photoPageUrl || apiPost.permalink
        ? {
            photo_image_uri: apiPost.photoImageUri,
            photo_page_url: apiPost.photoPageUrl,
            permalink: apiPost.permalink,
          }
        : undefined,
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble de vos performances sur les réseaux sociaux
        </p>
      </div>

      {statsError && (
        <p className="text-red-500">
          {"Impossible de charger les statistiques."}
        </p>
      )}
      <StatsOverview stats={stats} isLoading={isStatsLoading} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            10 plus récentes Publications
          </h2>
          <div className="text-sm text-muted-foreground">
            {stats ? stats.totalPosts : 0} publication
            {stats && +stats.totalPosts > 1 ? "s" : ""} analysée
            {posts && +stats.totalPosts > 1 ? "s" : ""}
          </div>
        </div>

        {isPostsLoading && <p>Chargement des publications...</p>}
        {postsError && (
          <p className="text-red-500">
            Erreur lors du chargement des publications.
          </p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts &&
            posts.map((post) => (
              <PostCard key={post.postId} post={mapApiPostToCardPost(post)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
