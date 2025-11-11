import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Anime } from "~/types/anime";
import { Star, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  toggleFavorite,
  selectIsFavorite,
} from "~/store/slices/favoritesSlice";
import { showFavoriteToast } from "~/lib/toast";

interface AnimeCardProps {
  anime: Anime;
  viewMode?: "grid" | "list";
}

export function AnimeCard({ anime, viewMode = "grid" }: AnimeCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, anime.mal_id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
  if (viewMode === "list") {
    return (
      <Link to={`/anime/${anime.mal_id}`} className="group">
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <div className="flex flex-row h-56">
            <div className="relative w-48 h-64 overflow-hidden sm:h-auto">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="object-cover w-full h-full"
                loading="lazy"
              />

              <button
                onClick={handleFavoriteClick}
                className="absolute p-2 transition-all rounded-full top-2 left-2 bg-white/90 hover:bg-white"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
            <div className="flex flex-col justify-between flex-1 p-4 sm:p-6">
              <div className="flex flex-col gap-2">
                <CardTitle className="line-clamp-1">
                  <h5>{anime.title}</h5>
                </CardTitle>
                {anime.synopsis && (
                  <p className="text-muted-foreground line-clamp-3">
                    {anime.synopsis}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {anime.type && (
                    <Badge variant="secondary">{anime.type}</Badge>
                  )}
                  {anime.episodes && (
                    <Badge variant="outline">{anime.episodes} episodes</Badge>
                  )}
                  {anime.status && (
                    <Badge variant="outline">{anime.status}</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full gap-4 mt-3">
                {anime.score && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p>{anime.score.toFixed(1)}</p>
                  </div>
                )}
                {anime.year && (
                  <p className="text-muted-foreground">{anime.year}</p>
                )}
                {anime.popularity && (
                  <p className="text-muted-foreground">
                    #{anime.popularity} popularity
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
  return (
    <Link to={`/anime/${anime.mal_id}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:scale-105">
        <div className="relative overflow-hidden aspect-3/4">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute p-2 transition-all rounded-full cursor-pointer top-2 right-2 bg-white/90 hover:bg-white"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1">
            <h5>{anime.title}</h5>
          </CardTitle>
          <CardDescription className="mt-2">
            <div className="flex flex-wrap gap-1 mt-1">
              {anime.type && <Badge variant="secondary">{anime.type}</Badge>}
              {anime.episodes && <Badge>{anime.episodes} eps</Badge>}
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-4 pt-0 pb-4">
          {anime.score && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <p>{anime.score.toFixed(1)}</p>
            </div>
          )}
          {anime.year && <p className="text-muted-foreground">{anime.year}</p>}
        </CardFooter>
      </Card>
    </Link>
  );
}

export function AnimeCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="w-full aspect-3/4 bg-muted animate-pulse" />
      <CardContent className="p-4">
        <div className="w-full h-4 mb-2 rounded bg-muted animate-pulse" />
        <div className="w-3/4 h-4 rounded bg-muted animate-pulse" />
        <div className="flex gap-2 mt-3">
          <div className="w-16 h-6 rounded-full bg-muted animate-pulse" />
          <div className="w-16 h-6 rounded-full bg-muted animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 pt-0 pb-4">
        <div className="w-12 h-4 rounded bg-muted animate-pulse" />
        <div className="w-16 h-4 rounded bg-muted animate-pulse" />
      </CardFooter>
    </Card>
  );
}

export function AnimeListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 25 }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}
