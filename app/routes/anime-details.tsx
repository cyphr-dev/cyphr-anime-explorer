import { Link, useParams, useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/anime-details";
import {
  useAnimeDetails,
  useAnimePictures,
  useAnimeVideos,
  useAnimeStatistics,
  useAnimeRelations,
  useAnimeCharacters,
} from "~/hooks/useAnimeQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AnimeEmptyState from "~/components/AnimeEmptyState";

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

  // Lazy load data based on active tab
  const { data: pictures, isLoading: picturesLoading } = useAnimePictures(
    animeId,
    activeTab === "media"
  );
  const { data: videos, isLoading: videosLoading } = useAnimeVideos(
    animeId,
    activeTab === "media"
  );
  const { data: statistics, isLoading: statisticsLoading } = useAnimeStatistics(
    animeId,
    activeTab === "statistics"
  );
  const { data: relations, isLoading: relationsLoading } = useAnimeRelations(
    animeId,
    activeTab === "related"
  );
  const { data: characters, isLoading: charactersLoading } = useAnimeCharacters(
    animeId,
    activeTab === "info"
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Loading anime details...</p>
        </div>
      );
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
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Titles */}
              <h3 className="mb-2">{currentAnime.title}</h3>
              {currentAnime.title_english &&
                currentAnime.title_english !== currentAnime.title && (
                  <p className="text-muted-foreground">
                    {currentAnime.title_english}
                  </p>
                )}
              {currentAnime.title_japanese && (
                <p className="text-muted-foreground">
                  {currentAnime.title_japanese}
                </p>
              )}

              {/* Anime Image */}
              <img
                src={currentAnime.images.jpg.large_image_url}
                alt={currentAnime.title}
                className="w-full rounded-lg"
              />
              <hr />
              <a
                href={currentAnime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full">View on MyAnimeList</Button>
              </a>

              <hr />

              {/* Genres below image */}
              {currentAnime.genres && currentAnime.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentAnime.genres.map((genre: any) => (
                    <Badge variant={"secondary"} key={genre.mal_id}>
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              <hr />

              <Card>
                <CardContent className="p-0">
                  <div className="p-6 space-y-4">
                    {/* Score */}
                    {currentAnime.score && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Score</span>
                        <Badge className="bg-yellow-500 text-black font-bold text-lg">
                          ⭐ {currentAnime.score}
                        </Badge>
                      </div>
                    )}

                    {/* Rank */}
                    {currentAnime.rank && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Rank</span>
                        <span className="text-sm">#{currentAnime.rank}</span>
                      </div>
                    )}

                    {/* Popularity */}
                    {currentAnime.popularity && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Popularity</span>
                        <span className="text-sm">
                          #{currentAnime.popularity}
                        </span>
                      </div>
                    )}

                    {/* Members */}
                    {currentAnime.members && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Members</span>
                        <span className="text-sm">
                          {currentAnime.members.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Favorites */}
                    {currentAnime.favorites && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Favorites</span>
                        <span className="text-sm">
                          {currentAnime.favorites.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Trailer and Tabs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Trailer at the top */}
              {currentAnime.trailer?.youtube_id && (
                <Card>
                  <CardHeader>
                    <CardTitle>Trailer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${currentAnime.trailer.youtube_id}`}
                        title={`${currentAnime.title} Trailer`}
                        className="w-full h-full rounded"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
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
                <TabsContent value="info" className="space-y-6">
                  {/* Title and Basic Info */}
                  <div className="flex flex-wrap gap-2">
                    {currentAnime.type && (
                      <Badge variant="secondary">{currentAnime.type}</Badge>
                    )}
                    {currentAnime.status && (
                      <Badge variant="outline">{currentAnime.status}</Badge>
                    )}
                    {currentAnime.rating && (
                      <Badge variant="outline">{currentAnime.rating}</Badge>
                    )}
                    {currentAnime.season && currentAnime.year && (
                      <Badge variant="outline">
                        {currentAnime.season} {currentAnime.year}
                      </Badge>
                    )}
                  </div>

                  {/* Information Grid */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentAnime.episodes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Episodes
                          </p>
                          <p className="text-sm">{currentAnime.episodes}</p>
                        </div>
                      )}
                      {currentAnime.duration && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Duration
                          </p>
                          <p className="text-sm">{currentAnime.duration}</p>
                        </div>
                      )}
                      {currentAnime.aired.string && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Aired
                          </p>
                          <p className="text-sm">{currentAnime.aired.string}</p>
                        </div>
                      )}
                      {currentAnime.source && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Source
                          </p>
                          <p className="text-sm">{currentAnime.source}</p>
                        </div>
                      )}
                      {currentAnime.broadcast.string && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Broadcast
                          </p>
                          <p className="text-sm">
                            {currentAnime.broadcast.string}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Synopsis */}
                  {currentAnime.synopsis && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Synopsis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          {currentAnime.synopsis}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Background */}
                  {currentAnime.background && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Background</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          {currentAnime.background}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Studios */}
                  {currentAnime.studios && currentAnime.studios.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Studios</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {currentAnime.studios.map((studio: any) => (
                            <Badge key={studio.mal_id} variant="secondary">
                              {studio.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Themes */}
                  {currentAnime.themes && currentAnime.themes.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Themes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {currentAnime.themes.map((theme: any) => (
                            <Badge key={theme.mal_id} variant="outline">
                              {theme.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Demographics */}
                  {currentAnime.demographics &&
                    currentAnime.demographics.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Demographics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {currentAnime.demographics.map((demo: any) => (
                              <Badge key={demo.mal_id} variant="secondary">
                                {demo.name}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                  {/* Characters - Lazy Loaded */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Characters & Voice Actors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {charactersLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        </div>
                      ) : characters && characters.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {characters.slice(0, 10).map((char: any) => (
                            <div
                              key={char.character.mal_id}
                              className="flex gap-4 p-2 rounded-lg border"
                            >
                              <img
                                src={char.character.images.jpg.image_url}
                                alt={char.character.name}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {char.character.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {char.role}
                                </p>
                                {char.voice_actors && char.voice_actors[0] && (
                                  <p className="text-xs mt-1">
                                    CV: {char.voice_actors[0].person.name} (
                                    {char.voice_actors[0].language})
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No character information available
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                  {/* Pictures */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pictures</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {picturesLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        </div>
                      ) : pictures && pictures.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {pictures.map((pic: any, index: number) => (
                            <img
                              key={index}
                              src={pic.jpg.image_url}
                              alt={`${currentAnime.title} picture ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No pictures available
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Videos */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Videos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {videosLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        </div>
                      ) : videos ? (
                        <div className="space-y-6">
                          {/* Promo Videos */}
                          {videos.promo && videos.promo.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-3">
                                Promotional Videos
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {videos.promo.map(
                                  (video: any, index: number) => (
                                    <div key={index}>
                                      <div className="aspect-video mb-2">
                                        <iframe
                                          src={`https://www.youtube.com/embed/${video.trailer.youtube_id}`}
                                          title={video.title}
                                          className="w-full h-full rounded"
                                          allowFullScreen
                                        />
                                      </div>
                                      <p className="text-sm font-medium">
                                        {video.title}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {/* Music Videos */}
                          {videos.music_videos &&
                            videos.music_videos.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-3">
                                  Music Videos
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {videos.music_videos.map(
                                    (video: any, index: number) => (
                                      <div key={index}>
                                        <div className="aspect-video mb-2">
                                          <iframe
                                            src={`https://www.youtube.com/embed/${video.video.youtube_id}`}
                                            title={video.title}
                                            className="w-full h-full rounded"
                                            allowFullScreen
                                          />
                                        </div>
                                        <p className="text-sm font-medium">
                                          {video.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {video.meta.title}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {(!videos.promo || videos.promo.length === 0) &&
                            (!videos.music_videos ||
                              videos.music_videos.length === 0) && (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No videos available
                              </p>
                            )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No videos available
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {statisticsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        </div>
                      ) : statistics ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {statistics.watching !== undefined && (
                            <div className="p-4 rounded-lg border">
                              <p className="text-sm text-muted-foreground">
                                Watching
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.watching.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.completed !== undefined && (
                            <div className="p-4 rounded-lg border">
                              <p className="text-sm text-muted-foreground">
                                Completed
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.completed.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.on_hold !== undefined && (
                            <div className="p-4 rounded-lg border">
                              <p className="text-sm text-muted-foreground">
                                On Hold
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.on_hold.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.dropped !== undefined && (
                            <div className="p-4 rounded-lg border">
                              <p className="text-sm text-muted-foreground">
                                Dropped
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.dropped.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.plan_to_watch !== undefined && (
                            <div className="p-4 rounded-lg border">
                              <p className="text-sm text-muted-foreground">
                                Plan to Watch
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.plan_to_watch.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.total !== undefined && (
                            <div className="p-4 rounded-lg border bg-primary/10">
                              <p className="text-sm text-muted-foreground">
                                Total
                              </p>
                              <p className="text-2xl font-bold">
                                {statistics.total.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {statistics.scores &&
                            statistics.scores.length > 0 && (
                              <div className="col-span-2 md:col-span-3 p-4 rounded-lg border">
                                <p className="text-sm text-muted-foreground mb-3">
                                  Score Distribution
                                </p>
                                <div className="space-y-2">
                                  {statistics.scores
                                    .sort((a: any, b: any) => b.score - a.score)
                                    .map((score: any) => (
                                      <div
                                        key={score.score}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="text-sm font-medium w-8">
                                          {score.score}
                                        </span>
                                        <div className="flex-1 bg-secondary rounded-full h-2">
                                          <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{
                                              width: `${
                                                (score.votes /
                                                  Math.max(
                                                    ...statistics.scores.map(
                                                      (s: any) => s.votes
                                                    )
                                                  )) *
                                                100
                                              }%`,
                                            }}
                                          />
                                        </div>
                                        <span className="text-sm text-muted-foreground w-20 text-right">
                                          {score.votes.toLocaleString()} votes
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No statistics available
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Related Tab */}
                <TabsContent value="related" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Related Anime</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {relationsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        </div>
                      ) : relations && relations.length > 0 ? (
                        <div className="space-y-6">
                          {relations.map((relation: any, index: number) => (
                            <div key={index}>
                              <h4 className="font-semibold mb-3">
                                {relation.relation}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relation.entry.map((entry: any) => (
                                  <Link
                                    key={entry.mal_id}
                                    to={`/anime/${entry.mal_id}`}
                                    className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">
                                        {entry.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {entry.type}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No related anime found
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div className="min-h-screen bg-background">{renderContent()}</div>;
}
