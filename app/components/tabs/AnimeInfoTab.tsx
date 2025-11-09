import { useAnimeCharacters } from "~/hooks/useAnimeQueries";

interface AnimeInfoTabProps {
  anime: any;
  animeId: number | undefined;
  isActive: boolean;
}

export function AnimeInfoTab({ anime, animeId, isActive }: AnimeInfoTabProps) {
  // Lazy load characters only when tab is active
  const { data: characters, isLoading: charactersLoading } = useAnimeCharacters(
    animeId,
    isActive
  );

  return (
    <div className="space-y-6">
      {/* Synopsis Section */}
      {anime.synopsis && (
        <>
          <div className="flex flex-col gap-6">
            <h3>Synopsis</h3>
            <p className="text-muted-foreground">{anime.synopsis}</p>
          </div>
          <hr />
        </>
      )}

      {/* Background Section */}
      {anime.background && (
        <>
          <div className="flex flex-col gap-6">
            <h3>Background</h3>
            <p className="text-muted-foreground leading-relaxed">
              {anime.background}
            </p>
          </div>
          <hr />
        </>
      )}

      {/* Additional Info */}
      <div className="flex flex-col gap-6">
        <h3>Additional Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {anime.source && (
            <div>
              <p className="text-muted-foreground">Source</p>
              <p>{anime.source}</p>
            </div>
          )}
          {anime.season && anime.year && (
            <div>
              <p className="text-muted-foreground">Season</p>
              <p className="capitalize">
                {anime.season} {anime.year}
              </p>
            </div>
          )}
          {anime.members && (
            <div>
              <p className="text-muted-foreground">Members</p>
              <p>{anime.members.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
      <hr />

      {/* Characters Section */}
      <div className="flex flex-col gap-6">
        <h3>Characters & Voice Actors</h3>

        {charactersLoading && (
          <div className="flex justify-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          </div>
        )}

        {!charactersLoading && characters && characters.length > 0 && (
          <div className="grid grid-cols-1">
            {characters.slice(0, 12).map((char: any) => (
              <div
                key={char.character.mal_id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Character Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
                    <img
                      src={char.character.images.jpg.image_url}
                      alt={char.character.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="line-clamp-1">{char.character.name}</h5>
                    <p className="text-muted-foreground">{char.role}</p>
                  </div>
                </div>

                {/* Voice Actor Info */}
                {char.voice_actors && char.voice_actors.length > 0 && (
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="text-right min-w-0">
                      <h5 className="line-clamp-1">
                        {char.voice_actors[0].person.name}
                      </h5>
                      <p className="text-muted-foreground">
                        {char.voice_actors[0].language}
                      </p>
                    </div>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
                      <img
                        src={char.voice_actors[0].person.images.jpg.image_url}
                        alt={char.voice_actors[0].person.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!charactersLoading && (!characters || characters.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No character data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
