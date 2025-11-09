import { useAnimeRelations } from "~/hooks/useAnimeQueries";
import { Badge } from "~/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeById } from "~/services/jikanApi";
import { AnimeCard } from "~/components/AnimeCard";

interface AnimeRelatedTabProps {
  animeId: number | undefined;
  isActive: boolean;
}

// Component to fetch and display a single related anime
function RelatedAnimeItem({ malId }: { malId: number }) {
  const { data: anime, isLoading } = useQuery({
    queryKey: ["anime", malId],
    queryFn: async ({ signal }) => {
      const response = await fetchAnimeById(malId, signal);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <div className="h-48 bg-muted rounded-lg animate-pulse" />;
  }

  if (!anime) return null;

  return <AnimeCard anime={anime} viewMode="list" />;
}

interface AnimeRelatedTabProps {
  animeId: number | undefined;
  isActive: boolean;
}

export function AnimeRelatedTab({ animeId, isActive }: AnimeRelatedTabProps) {
  // Lazy load relations only when tab is active
  const { data: relations, isLoading: relationsLoading } = useAnimeRelations(
    animeId,
    isActive
  );

  if (relationsLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  if (!relations || relations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No related anime found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {relations.map((relation: any, index: number) => (
        <div key={index}>
          <div className="flex flex-col gap-6">
            <h3 className="capitalize items-center flex gap-2">
              {relation.relation} <Badge>{relation.entry.length}</Badge>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {relation.entry.map((entry: any) => (
                <RelatedAnimeItem key={entry.mal_id} malId={entry.mal_id} />
              ))}
            </div>
          </div>
          {index < relations.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
