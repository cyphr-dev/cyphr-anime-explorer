import type { Anime } from "~/types/anime";
import { Card, CardContent } from "~/components/ui/card";
import { Heart, Star, TrendingUp, Users } from "lucide-react";

export function AnimeStatsGrid({ anime }: { anime: Anime }) {
  // Safety check for anime data
  if (!anime) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">
            <p>Unable to load stats</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 md:grid-cols-1 gap-6">
          {/* Score */}
          <div className="flex flex-col items-center justify-center text-center">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 mb-2" />
            <h4>{anime.score ? anime.score.toFixed(1) : "N/A"}</h4>
            <p className="text-muted-foreground">Score</p>
          </div>

          {/* Rank */}
          {anime.rank && (
            <div className="flex flex-col items-center justify-center text-center">
              <TrendingUp className="w-6 h-6 text-primary mb-2" />
              <h4>#{anime.rank}</h4>
              <p className="text-muted-foreground">Ranked</p>
            </div>
          )}

          {/* Popularity */}
          {anime.popularity && (
            <div className="flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-primary mb-2" />
              <h4>#{anime.popularity}</h4>
              <p className="text-muted-foreground">Popularity</p>
            </div>
          )}

          {/* Favorites */}
          {anime.favorites && (
            <div className="flex flex-col items-center justify-center text-center">
              <Heart className="w-6 h-6 text-red-500 mb-2" />
              <h4>{anime.favorites.toLocaleString()}</h4>
              <p className="text-muted-foreground">Favorites</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
