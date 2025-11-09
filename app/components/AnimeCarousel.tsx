import { AnimeCard } from "./AnimeCard";
import type { Anime } from "~/types/anime";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

interface AnimeCarouselProps {
  anime: Anime[];
  isLoading?: boolean;
}

export function AnimeCarousel({ anime, isLoading }: AnimeCarouselProps) {
  if (isLoading) {
    return (
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-2/3 rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-1"></div>
              <div className="bg-gray-200 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!anime.length) {
    return (
      <div className="text-center py-8 text-gray-500">No anime available</div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent>
        {anime.map((item) => (
          <CarouselItem
            key={item.mal_id}
            className="basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
          >
            <AnimeCard anime={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
