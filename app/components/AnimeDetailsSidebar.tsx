import {
  Calendar,
  Film,
  Clock,
  PlayCircle,
  AlertCircle,
  Heart,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { Anime } from "~/types/anime";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  toggleFavorite,
  selectIsFavorite,
} from "~/store/slices/favoritesSlice";
import { showFavoriteToast } from "~/lib/toast";

interface AnimeDetailsSidebarProps {
  anime: Anime;
}

export function AnimeDetailsSidebar({ anime }: AnimeDetailsSidebarProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, anime.mal_id)
  );

  const handleFavoriteClick = () => {
    const action = isFavorite ? "removed" : "added";

    dispatch(
      toggleFavorite({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images,
        score: anime.score,
        year: anime.year,
        type: anime.type,
        episodes: anime.episodes,
      })
    );

    showFavoriteToast(action, anime.title);
  };

  // Safety check for anime data
  if (!anime) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Unable to load anime information</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Titles */}
      <div>
        <h3 className="mb-2">{anime.title || "Unknown Title"}</h3>
        {anime.title_english && anime.title_english !== anime.title && (
          <p className="text-muted-foreground mb-1">{anime.title_english}</p>
        )}
        {anime.title_japanese && (
          <p className="text-muted-foreground">{anime.title_japanese}</p>
        )}
      </div>

      {/* Anime Image */}
      {anime.images?.jpg?.large_image_url && (
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-lg shadow-lg"
        />
      )}

      <hr />

      {/* Favorite Button */}
      <Button
        onClick={handleFavoriteClick}
        variant={isFavorite ? "default" : "outline"}
        className="w-full"
      >
        <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
        <p>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</p>
      </Button>

      {/* MyAnimeList Button */}
      {anime.url && (
        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full" variant="secondary">
            <p>MyAnimeList</p>
          </Button>
        </a>
      )}

      <hr />

      {/* Genres */}
      {anime.genres && anime.genres.length > 0 && (
        <>
          <div>
            <h4 className="mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre: any) => (
                <Badge variant="secondary" key={genre.mal_id}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <hr className="border-border" />
        </>
      )}

      {/* Quick Info */}
      <div className="space-y-4">
        {anime.type && (
          <div className="flex items-start gap-3">
            <Film className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Type</p>
              <p>{anime.type}</p>
            </div>
          </div>
        )}

        {anime.episodes && (
          <div className="flex items-start gap-3">
            <PlayCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Episodes</p>
              <p>{anime.episodes}</p>
            </div>
          </div>
        )}

        {anime.status && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Status</p>
              <p>{anime.status}</p>
            </div>
          </div>
        )}

        {anime.duration && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p>{anime.duration}</p>
            </div>
          </div>
        )}

        {anime.aired?.string && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Aired</p>
              <p>{anime.aired.string}</p>
            </div>
          </div>
        )}

        {anime.rating && (
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-muted-foreground">Rating</p>
              <p>{anime.rating}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
