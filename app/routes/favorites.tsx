import { useState, useEffect } from "react";
import type { Route } from "./+types/favorites";
import { useAppSelector } from "~/store/hooks";
import { selectFavorites } from "~/store/slices/favoritesSlice";
import { AnimeCard } from "~/components/AnimeCard";
import AnimeEmptyState from "~/components/AnimeEmptyState";
import { Heart } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { FavoritesFilters } from "~/components/FavoritesFilters";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Favorites - Cyphr Anime Explorer" },
    { name: "description", content: "View your favorite anime" },
  ];
}

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);

  // Load persisted state from localStorage
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("favoritesSearchQuery") || "";
    }
    return "";
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("favoritesViewMode") as "grid" | "list") || "grid"
      );
    }
    return "grid";
  });

  const [sortBy, setSortBy] = useState<"recent" | "title" | "score" | "type">(
    () => {
      if (typeof window !== "undefined") {
        return (
          (localStorage.getItem("favoritesSortBy") as
            | "recent"
            | "title"
            | "score"
            | "type") || "recent"
        );
      }
      return "recent";
    }
  );

  // Persist state changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoritesSearchQuery", searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoritesViewMode", viewMode);
    }
  }, [viewMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoritesSortBy", sortBy);
    }
  }, [sortBy]);

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort favorites
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "score":
        return (b.score || 0) - (a.score || 0);
      case "type":
        return (a.type || "").localeCompare(b.type || "");
      case "recent":
      default:
        return 0; // Keep original order (most recently added first)
    }
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("favoritesSearchQuery");
    }
  };

  const renderContent = () => {
    // No favorites at all
    if (favorites.length === 0) {
      return (
        <AnimeEmptyState
          type="no-results"
          title="No favorites yet"
          description="Start adding anime to your favorites by clicking the heart icon on any anime card!"
          action={{
            label: "Browse Anime",
            onClick: () => (window.location.href = "/browse"),
          }}
        />
      );
    }

    // No results after filtering
    if (sortedFavorites.length === 0) {
      return (
        <AnimeEmptyState
          type="no-results"
          title="No results found"
          description={`No favorites match "${searchQuery}"`}
          action={{
            label: "Clear Search",
            onClick: handleClearSearch,
          }}
        />
      );
    }

    // Show favorites
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {sortedFavorites.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime as any}
            viewMode={viewMode}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen container mx-auto md:py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        {/* Filters Sidebar */}
        <div className="col-span-10 lg:col-span-2 sticky top-20 sm:top-22 z-10">
          <div className="lg:sticky lg:top-26 space-y-4">
            {/* Title with count */}
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500 fill-red-500 hidden lg:block" />
              <h3 className="hidden lg:block">My Favorites</h3>
            </div>

            <Badge variant="secondary" className="hidden lg:inline-flex">
              {favorites.length} {favorites.length === 1 ? "anime" : "anime"}
            </Badge>

            {/* Filters Component */}
            <FavoritesFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onClearSearch={handleClearSearch}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="col-span-10 lg:col-span-8">{renderContent()}</div>
      </div>
    </div>
  );
}
