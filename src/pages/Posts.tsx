import { PostCard } from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/postService";
import type { Post as CardPost } from "@/components/PostCard";
import type { Post } from "@/services/postService";

export default function Posts() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page, pageSize),
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et analysez toutes vos publications sur les réseaux sociaux
          </p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les publications..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Badge variant="secondary">Toutes</Badge>
          <Badge variant="outline">Photos</Badge>
          <Badge variant="outline">Vidéos</Badge>
        </div>
      </div>

      {/* Liste des publications */}
      {isLoading && <p>Chargement des publications...</p>}
      {error && (
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
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          Précédent
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading || (posts && posts.length < pageSize)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
