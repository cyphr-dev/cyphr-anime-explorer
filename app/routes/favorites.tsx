import { useState } from "react";
import type { Route } from "./+types/favorites";
import { useAppSelector } from "~/store/hooks";
import { selectFavorites } from "~/store/slices/favoritesSlice";
import { AnimeCard, AnimeListSkeleton } from "~/components/AnimeCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import AnimeEmptyState from "~/components/AnimeEmptyState";
import { Grid3x3, List, Search, Heart } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Favorites - Cyphr Anime Explorer" },
    { name: "description", content: "View your favorite anime" },
  ];
}

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "title" | "score" | "type">(
    "recent"
  );

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <h1>My Favorites</h1>
            </div>
            <Badge variant="secondary">
              {favorites.length} {favorites.length === 1 ? "anime" : "anime"}
            </Badge>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select
              value={sortBy}
              onValueChange={(value: any) => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
                <SelectItem value="score">Score (High-Low)</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <AnimeEmptyState
            type="no-results"
            title="No favorites yet"
            description="Start adding anime to your favorites by clicking the heart icon on any anime card!"
            action={{
              label: "Browse Anime",
              onClick: () => (window.location.href = "/browse"),
            }}
          />
        ) : sortedFavorites.length === 0 ? (
          <AnimeEmptyState
            type="no-results"
            title="No results found"
            description={`No favorites match "${searchQuery}"`}
            action={{
              label: "Clear Search",
              onClick: () => setSearchQuery(""),
            }}
          />
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                : "space-y-4"
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
        )}
      </div>
    </div>
  );
}
