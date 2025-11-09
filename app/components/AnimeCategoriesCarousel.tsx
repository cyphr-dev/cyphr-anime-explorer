import { Link } from "react-router";
import { AnimeCarousel } from "./AnimeCarousel";
import { Button } from "./ui/button";
import type { Anime } from "~/types/anime";
import { ChevronRight } from "lucide-react";

interface AnimeCategoriesCarouselProps {
  title: string;
  description?: string;
  loadingTop: boolean;
  largerCards?: boolean;
  anime: Anime[];
  viewAllLink?: string;
}

export default function AnimeCategoriesCarousel({
  title,
  loadingTop,
  largerCards = false,
  anime,
  viewAllLink,
}: AnimeCategoriesCarouselProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>{title}</h2>
        <Link
          to={`${viewAllLink}`}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Button>
            <p>View All</p> <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <AnimeCarousel
        anime={anime}
        isLoading={loadingTop}
        largerCards={largerCards}
      />
    </div>
  );
}
