import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import type { InfiniteData } from "@tanstack/react-query";
import { useDebounce } from "~/hooks/useDebounce";
import { useAnimeList, useInfiniteAnimeList } from "~/hooks/useAnimeQueries";
import { AnimeCard, AnimeListSkeleton } from "~/components/AnimeCard";
import { AnimeFilters } from "~/components/AnimeFilters";
import { Button } from "~/components/ui/button";
import type { AnimeListResponse, Anime } from "~/types/anime";
import AnimeEmptyState from "~/components/AnimeEmptyState";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cyphr Anime Explorer" },
    { name: "description", content: "Discover your next favorite anime" },
  ];
}

export default function Home() {
  const [searchParams] = useSearchParams();

  // Load persisted state from localStorage OR URL params
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        searchParams.get("query") ||
        localStorage.getItem("animeSearchQuery") ||
        ""
      );
    }
    return "";
  });

  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      // Check URL params first, then localStorage
      const urlType = searchParams.get("type");
      const urlStatus = searchParams.get("status");
      const urlRating = searchParams.get("rating");
      const urlOrderBy = searchParams.get("order_by");
      const urlSort = searchParams.get("sort");

      // If any URL params exist, use them
      if (urlType || urlStatus || urlRating || urlOrderBy || urlSort) {
        return {
          type: urlType || "",
          status: urlStatus || "",
          rating: urlRating || "",
          orderBy: urlOrderBy || "",
          sort: urlSort || "",
        };
      }

      // Otherwise fall back to localStorage
      const stored = localStorage.getItem("animeFilters");
      return stored
        ? JSON.parse(stored)
        : { type: "", status: "", rating: "", orderBy: "", sort: "" };
    }
    return { type: "", status: "", rating: "", orderBy: "", sort: "" };
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("animeViewMode") as "grid" | "list") || "grid"
      );
    }
    return "grid";
  });

  const [sfwMode, setSfwMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("animeSfwMode");
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });

  const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("animeSelectedGenres");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [infiniteScrollMode, setInfiniteScrollMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("animeInfiniteScrollMode");
      return stored !== null ? stored === "true" : false;
    }
    return false;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 250);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Build query params
  const queryParams = {
    query: debouncedSearchQuery || undefined,
    type: filters.type || undefined,
    status: filters.status || undefined,
    rating: filters.rating || undefined,
    order_by: filters.orderBy || undefined,
    sort: filters.sort || undefined,
    sfw: sfwMode,
    genres: selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
  };

  // Use infinite query when infinite scroll is enabled
  const infiniteQuery = useInfiniteAnimeList(queryParams);

  // Use regular query when pagination is enabled
  const paginationQuery = useAnimeList({
    ...queryParams,
    page: currentPage,
  });

  // Choose which query to use based on mode
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = infiniteScrollMode
    ? {
        data: infiniteQuery.data,
        isLoading: infiniteQuery.isLoading,
        error: infiniteQuery.error,
        fetchNextPage: infiniteQuery.fetchNextPage,
        hasNextPage: infiniteQuery.hasNextPage,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      }
    : {
        data: paginationQuery.data,
        isLoading: paginationQuery.isLoading,
        error: paginationQuery.error,
        fetchNextPage: async () => {},
        hasNextPage: paginationQuery.data?.pagination.has_next_page ?? false,
        isFetchingNextPage: false,
      };

  // Get animes from the appropriate data structure
  const animes: Anime[] = infiniteScrollMode
    ? ((data as InfiniteData<AnimeListResponse>)?.pages.flatMap(
        (page: AnimeListResponse) => page.data
      ) ?? [])
    : ((data as AnimeListResponse)?.data ?? []);

  const pagination = infiniteScrollMode
    ? {
        currentPage:
          (data as InfiniteData<AnimeListResponse>)?.pages[
            (data as InfiniteData<AnimeListResponse>).pages.length - 1
          ]?.pagination.current_page ?? 1,
        lastVisiblePage:
          (data as InfiniteData<AnimeListResponse>)?.pages[
            (data as InfiniteData<AnimeListResponse>).pages.length - 1
          ]?.pagination.last_visible_page ?? 1,
        hasNextPage: hasNextPage ?? false,
      }
    : {
        currentPage: (data as AnimeListResponse)?.pagination.current_page ?? 1,
        lastVisiblePage:
          (data as AnimeListResponse)?.pagination.last_visible_page ?? 1,
        hasNextPage:
          (data as AnimeListResponse)?.pagination.has_next_page ?? false,
      };

  // Persist state changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("animeSearchQuery", searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("animeViewMode", viewMode);
    }
  }, [viewMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("animeSfwMode", String(sfwMode));
    }
  }, [sfwMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "animeSelectedGenres",
        JSON.stringify(selectedGenres)
      );
    }
  }, [selectedGenres]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("animeFilters", JSON.stringify(filters));
    }
  }, [filters]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "animeInfiniteScrollMode",
        String(infiniteScrollMode)
      );
    }
  }, [infiniteScrollMode]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearchQuery,
    filters.type,
    filters.status,
    filters.rating,
    filters.orderBy,
    filters.sort,
    selectedGenres,
    sfwMode,
  ]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleClearFilters = () => {
    setFilters({ type: "", status: "", rating: "", orderBy: "", sort: "" });
    setSearchQuery("");
    setSelectedGenres([]);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("animeSearchQuery");
      localStorage.removeItem("animeFilters");
      localStorage.removeItem("animeSelectedGenres");
    }
  };

  const handleGenreToggle = (genreId: number) => {
    if (!selectedGenres.includes(genreId)) {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleGenreRemove = (genreId: number) => {
    setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Infinite scroll observer
  useEffect(() => {
    if (!infiniteScrollMode || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [infiniteScrollMode, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen container mx-auto">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* Search and Filters */}
        <div className="col-span-2">
          <div className="sticky top-20">
            <AnimeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sfwMode={sfwMode}
              onSfwModeChange={setSfwMode}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              onGenreRemove={handleGenreRemove}
              infiniteScrollMode={infiniteScrollMode}
              onInfiniteScrollModeChange={setInfiniteScrollMode}
            />
          </div>
        </div>

        {/* Loading State - Only show on initial load */}
        {isLoading && animes.length === 0 && <AnimeListSkeleton />}

        {/* Error State */}
        {error && (
          <AnimeEmptyState
            type={
              error.message?.includes("network") ||
              error.message?.includes("fetch")
                ? "network-error"
                : "error"
            }
            description={
              error instanceof Error ? error.message : "An error occurred"
            }
            action={{
              label: "Try Again",
              onClick: () => {
                if (infiniteScrollMode) {
                  infiniteQuery.refetch();
                } else {
                  paginationQuery.refetch();
                }
              },
            }}
            className="col-span-8"
          />
        )}

        {/* Anime Grid */}
        {(!isLoading || animes.length > 0) && !error && (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "col-span-1 md:col-span-8 flex flex-col gap-4"
              }
            >
              {animes.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            {infiniteScrollMode && hasNextPage && (
              <div ref={loadMoreRef} className="col-span-8 py-8 text-center">
                {isFetchingNextPage && (
                  <p className="text-muted-foreground">Loading more...</p>
                )}
              </div>
            )}

            {/* Pagination */}
            {!infiniteScrollMode && animes.length > 0 && (
              <div className="col-span-8 flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="text-muted-foreground">
                  Page {pagination.currentPage} of {pagination.lastVisiblePage}
                </span>
                <Button
                  variant="outline"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}

            {animes.length === 0 && (
              <AnimeEmptyState
                type="no-results"
                action={{
                  label: "Clear Filters",
                  onClick: handleClearFilters,
                }}
                className="col-span-8"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
