import { PostCard } from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";

const mockPosts = [
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
      video_view_count: 0
    },
    media: {
      permalink: "https://facebook.com/post/123456",
      photo_image_uri: "https://picsum.photos/400/300",
      photo_page_url: "https://facebook.com/photo/123456"
    }
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
      video_view_count: 1250
    }
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
      video_view_count: 0
    },
    media: {
      permalink: "https://facebook.com/post/345678",
      photo_image_uri: "https://picsum.photos/400/250",
      photo_page_url: "https://facebook.com/photo/345678"
    }
  }
];

export default function Posts() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et analysez toutes vos publications sur les réseaux sociaux
          </p>
        </div>
        <Button className="bg-coral hover:bg-coral-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle publication
        </Button>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}