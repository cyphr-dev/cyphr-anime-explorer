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

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Anime Details - Cyphr Anime Explorer` },
    { name: "description", content: "View detailed anime information" },
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
        <div className="container mx-auto px-4 py-8">
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
        <div className="container mx-auto px-4 py-8">
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Sidebar */}
            <div className="lg:col-span-2">
              <div className="">
                <AnimeDetailsSidebar anime={currentAnime} />
              </div>
            </div>

            {/* Middle Column - Trailer and Tabs */}
            <div className="lg:col-span-8 space-y-6">
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
                <TabsList className="w-full grid grid-cols-4">
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
            <div className="lg:col-span-2">
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
