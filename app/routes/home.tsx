import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Anime } from "~/types/anime";
import AnimeCategoriesCarousel from "~/components/AnimeCategoriesCarousel";
import { Button } from "~/components/ui/button";
import AnimeHero from "~/components/AnimeHero";
import { fetchAnimeList } from "~/services/jikanApi";

async function fetchTopAnime(): Promise<Anime[]> {
  const response = await fetchAnimeList({
    order_by: "score",
    sort: "desc",
    limit: 10,
  });
  return response.data;
}

async function fetchSeasonalAnime(): Promise<Anime[]> {
  const response = await fetchAnimeList({
    type: "tv",
    status: "airing",
    order_by: "start_date",
    sort: "desc",
    limit: 10,
  });
  return response.data;
}

async function fetchLatestMovies(): Promise<Anime[]> {
  const response = await fetchAnimeList({
    type: "movie",
    status: "complete",
    order_by: "start_date",
    sort: "desc",
    limit: 10,
  });
  return response.data;
}

export default function Home() {
  const { data: topAnime = [], isLoading: loadingTop } = useQuery({
    queryKey: ["top-anime"],
    queryFn: fetchTopAnime,
  });

  const { data: seasonalAnime = [], isLoading: loadingSeasonal } = useQuery({
    queryKey: ["seasonal-anime"],
    queryFn: fetchSeasonalAnime,
  });

  const { data: latestMovies = [], isLoading: loadingMovies } = useQuery({
    queryKey: ["latest-movies"],
    queryFn: fetchLatestMovies,
  });

  return (
    <div className="min-h-screen overflow-x-hidden sm:-mt-20">
      {/* Hero Section */}
      <AnimeHero />
      {/* Carousels Section */}
      <section className="container mx-auto px-4 py-12 space-y-16">
        {/* Most Popular */}
        <AnimeCategoriesCarousel
          title="Most Popular"
          anime={topAnime}
          loadingTop={loadingTop}
          largerCards={true}
          viewAllLink="/browse?order_by=score&sort=desc"
        />

        <AnimeCategoriesCarousel
          title="Latest Series"
          anime={seasonalAnime}
          loadingTop={loadingSeasonal}
          viewAllLink="/browse?type=tv&status=airing&order_by=start_date&sort=desc"
        />

        <AnimeCategoriesCarousel
          title="Latest Movies"
          anime={latestMovies}
          loadingTop={loadingMovies}
          viewAllLink="/browse?type=movie&status=complete&order_by=start_date&sort=desc"
        />
      </section>
    </div>
  );
}
