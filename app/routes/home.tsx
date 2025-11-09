import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimeCarousel } from "~/components/AnimeCarousel";
import type { Anime } from "~/types/anime";

interface JikanResponse<T> {
  data: T;
}

async function fetchTopAnime(): Promise<Anime[]> {
  const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
  if (!response.ok) throw new Error("Failed to fetch top anime");
  const data: JikanResponse<Anime[]> = await response.json();
  return data.data;
}

async function fetchSeasonalAnime(): Promise<Anime[]> {
  const response = await fetch(
    "https://api.jikan.moe/v4/seasons/now?limit=10&filter=tv"
  );
  if (!response.ok) throw new Error("Failed to fetch seasonal anime");
  const data: JikanResponse<Anime[]> = await response.json();
  return data.data;
}

async function fetchLatestMovies(): Promise<Anime[]> {
  const response = await fetch(
    "https://api.jikan.moe/v4/top/anime?limit=10&type=movie"
  );
  if (!response.ok) throw new Error("Failed to fetch latest movies");
  const data: JikanResponse<Anime[]> = await response.json();
  return data.data;
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0yaC0xMGMtMS4xIDAtMiAuOS0yIDJ2MTBjMCAxLjEuOSAyIDIgMmgxMGMxLjEgMCAyLS45IDItMlYxNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">Discover Your Next Favorite Anime</h1>
            <p className="mb-8 opacity-90">
              Explore thousands of anime series and movies. Find detailed
              information, track your favorites, and discover new stories that
              captivate your imagination.
            </p>
            <div className="flex gap-4">
              <Link
                to="/browse"
                className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Anime
              </Link>
              <Link
                to="/favorites"
                className="bg-purple-800/50 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-purple-800/70 transition-colors border border-white/20"
              >
                My Favorites
              </Link>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Carousels Section */}
      <section className="container mx-auto px-4 py-12 space-y-16">
        {/* Most Popular */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2>Most Popular Anime</h2>
            <Link
              to="/browse?sort=score"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All →
            </Link>
          </div>
          <AnimeCarousel anime={topAnime} isLoading={loadingTop} />
        </div>

        {/* Latest Series */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2>Latest Series</h2>
            <Link
              to="/browse?type=tv"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All →
            </Link>
          </div>
          <AnimeCarousel anime={seasonalAnime} isLoading={loadingSeasonal} />
        </div>

        {/* Latest Movies */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2>Latest Movies</h2>
            <Link
              to="/browse?type=movie"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All →
            </Link>
          </div>
          <AnimeCarousel anime={latestMovies} isLoading={loadingMovies} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of anime fans discovering and tracking their favorite
            series.
          </p>
          <Link
            to="/browse"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </section>
    </div>
  );
}
