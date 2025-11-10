import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/anime-details";
import { useAnimeDetails } from "~/hooks/useAnimeQueries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AnimeEmptyState from "~/components/AnimeEmptyState";
import { AnimeDetailsSidebar } from "~/components/AnimeDetailsSidebar";
import { AnimeStatsGrid } from "~/components/AnimeStatsGrid";
import { AnimeInfoTab } from "~/components/tabs/AnimeInfoTab";
import { AnimeMediaTab } from "~/components/tabs/AnimeMediaTab";
import { AnimeStatisticsTab } from "~/components/tabs/AnimeStatisticsTab";
import { AnimeRelatedTab } from "~/components/tabs/AnimeRelatedTab";
import { AnimeDetailsSkeleton } from "~/components/AnimeDetailsSkeleton";
import { fetchAnimeById } from "~/services/jikanApi";

export async function loader({ params }: Route.LoaderArgs) {
  const animeId = params.id ? Number(params.id) : undefined;
  if (!animeId) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const response = await fetchAnimeById(animeId);
    return { anime: response.data };
  } catch (error) {
    // Return null if anime not found, component will handle it
    return { anime: null };
  }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.anime) {
    return [
      { title: "Anime Not Found - Anime Explorer" },
      {
        name: "description",
        content: "The anime you're looking for could not be found.",
      },
    ];
  }

  const anime = data.anime;
  return [
    { title: `${anime.title} - Anime Explorer` },
    {
      name: "description",
      content:
        anime.synopsis || `View detailed information about ${anime.title}`,
    },
  ];
}

export default function AnimeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const animeId = id ? Number(id) : undefined;

  const { data: currentAnime, isLoading, error } = useAnimeDetails(animeId);

  const renderContent = () => {
    if (isLoading) {
      return <AnimeDetailsSkeleton />;
    }
    if (error) {
      return (
        <div className="container px-4 py-8 mx-auto">
          <AnimeEmptyState
            type={
              error.message?.includes("network") ||
              error.message?.includes("fetch")
                ? "network-error"
                : "error"
            }
            title={
              error.message?.includes("404") ? "Anime not found" : undefined
            }
            description={
              error instanceof Error
                ? error.message
                : "Unable to load anime details"
            }
            action={{
              label: "Back to Home",
              onClick: () => navigate("/"),
            }}
          />
        </div>
      );
    }
    if (!currentAnime) {
      return (
        <div className="container px-4 py-8 mx-auto">
          <AnimeEmptyState
            type="no-results"
            title="Anime not found"
            description="The anime you're looking for doesn't exist or has been removed."
            action={{
              label: "Back to Home",
              onClick: () => navigate("/"),
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column - Sidebar */}
            <div className="lg:col-span-2">
              <div className="">
                <AnimeDetailsSidebar anime={currentAnime} />
              </div>
            </div>

            {/* Middle Column - Trailer and Tabs */}
            <div className="space-y-6 lg:col-span-8">
              {/* Trailer at the top */}
              {currentAnime.trailer?.embed_url && (
                <div className="aspect-video">
                  <iframe
                    src={currentAnime.trailer.embed_url}
                    title={`${currentAnime.title} Trailer`}
                    className="w-full h-full rounded-lg overflow-clip"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="statistics">Statistics</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                {/* Info Tab */}
                <TabsContent value="info">
                  <AnimeInfoTab
                    anime={currentAnime}
                    animeId={animeId}
                    isActive={activeTab === "info"}
                  />
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media">
                  <AnimeMediaTab
                    anime={currentAnime}
                    animeId={animeId}
                    isActive={activeTab === "media"}
                  />
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics">
                  <AnimeStatisticsTab
                    animeId={animeId}
                    isActive={activeTab === "statistics"}
                  />
                </TabsContent>

                {/* Related Tab */}
                <TabsContent value="related">
                  <AnimeRelatedTab
                    animeId={animeId}
                    isActive={activeTab === "related"}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-26">
                <AnimeStatsGrid anime={currentAnime} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div className="min-h-screen bg-background">{renderContent()}</div>;
}
