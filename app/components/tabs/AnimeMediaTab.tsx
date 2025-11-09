import { useState } from "react";
import { useAnimePictures, useAnimeVideos } from "~/hooks/useAnimeQueries";
import { ImageLightbox } from "~/components/ImageLightbox";

interface AnimeMediaTabProps {
  anime: any;
  animeId: number | undefined;
  isActive: boolean;
}

export function AnimeMediaTab({
  anime,
  animeId,
  isActive,
}: AnimeMediaTabProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lazy load pictures and videos only when tab is active
  const { data: pictures, isLoading: picturesLoading } = useAnimePictures(
    animeId,
    isActive
  );
  const { data: videos, isLoading: videosLoading } = useAnimeVideos(
    animeId,
    isActive
  );

  const isLoading = picturesLoading || videosLoading;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    if (pictures && currentImageIndex < pictures.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lightbox */}
      {lightboxOpen && pictures && (
        <ImageLightbox
          images={pictures}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
          animeTitle={anime.title}
        />
      )}

      {/* Pictures Section */}
      {pictures && pictures.length > 0 && (
        <>
          <div className="flex flex-col gap-6">
            <h3>Pictures</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pictures.map((pic: any, index: number) => (
                <img
                  key={index}
                  src={pic.jpg.image_url}
                  alt={`${anime.title} picture ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          </div>
          <hr />
        </>
      )}

      {/* Videos Section */}
      {videos &&
        (videos.promo.length > 0 || videos.music_videos.length > 0) && (
          <>
            <div className="flex flex-col gap-6">
              <h3>Videos</h3>

              {/* Promo Videos */}
              {videos.promo && videos.promo.length > 0 && (
                <div>
                  <h4 className="mb-3">Promotional Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.promo.map((video: any, index: number) => (
                      <div key={index}>
                        <div className="aspect-video mb-2">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.trailer.youtube_id}`}
                            title={video.title}
                            className="w-full h-full rounded"
                            allowFullScreen
                          />
                        </div>
                        <p>{video.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Music Videos */}
              {videos.music_videos && videos.music_videos.length > 0 && (
                <div>
                  <h4 className="mb-3">Music Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.music_videos.map((video: any, index: number) => (
                      <div key={index}>
                        <div className="aspect-video mb-2">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.video.youtube_id}`}
                            title={video.title}
                            className="w-full h-full rounded"
                            allowFullScreen
                          />
                        </div>
                        <p>{video.title}</p>
                        <p className="text-muted-foreground">
                          {video.meta.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      {/* No media available */}
      {(!pictures || pictures.length === 0) &&
        (!videos ||
          (videos.promo.length === 0 && videos.music_videos.length === 0)) && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No media content available.</p>
          </div>
        )}
    </div>
  );
}
