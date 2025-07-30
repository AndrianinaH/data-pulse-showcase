import { PostCard } from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/postService";
import type { Post as CardPost } from "@/components/PostCard";
import type { Post } from "@/services/postService";
import { StatsOverview } from "@/components/StatsOverview";
import { getSearchStats } from "@/services/statsService";
import { mapApiPostToCardPost } from "@/lib/utils";

export default function Posts() {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce avec useEffect - plus fiable
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      // Reset page à 1 quand on fait une nouvelle recherche
      if (search !== debouncedSearch) {
        setPage(1);
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]); // Seulement dépendant de search

  // Update search value
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", page, debouncedSearch],
    queryFn: () =>
      getPosts(page, pageSize, "postCreatedAt:desc", debouncedSearch),
    // Éviter les refetch inutiles
    staleTime: 30000, // 30 secondes
    gcTime: 300000, // 5 minutes
  });

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["search-stats", debouncedSearch],
    queryFn: () => getSearchStats(debouncedSearch),
    // Éviter les refetch inutiles
    staleTime: 60000, // 1 minute pour les stats
    gcTime: 300000, // 5 minutes
    // Ne pas refetch automatiquement
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview filtré par search */}
      <StatsOverview stats={stats} isLoading={isLoadingStats} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et analysez toutes vos publications sur les réseaux sociaux
            {debouncedSearch && (
              <span className="block text-sm mt-1">
                Résultats pour : "<strong>{debouncedSearch}</strong>"
              </span>
            )}
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
            value={search}
            onChange={handleSearchChange}
          />
          {search !== debouncedSearch && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des publications */}
      {isLoading && <p>Chargement des publications...</p>}
      {error && (
        <p className="text-red-500">
          Erreur lors du chargement des publications.
        </p>
      )}

      {posts && posts.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {debouncedSearch
              ? `Aucune publication trouvée pour "${debouncedSearch}"`
              : "Aucune publication trouvée"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts &&
          posts.map((post) => (
            <PostCard key={post.postId} post={mapApiPostToCardPost(post)} />
          ))}
      </div>

      {/* Pagination */}
      {posts && posts.length > 0 && (
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
      )}
    </div>
  );
}
