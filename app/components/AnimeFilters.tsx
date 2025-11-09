import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
  Grid3x3,
  List,
  ShieldCheck,
  ShieldOff,
  X,
  Search,
  Infinity,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Card, CardContent, CardHeader } from "./ui/card";

interface AnimeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: {
    type?: string;
    status?: string;
    rating?: string;
    orderBy?: string;
    sort?: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  onClearFilters: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sfwMode: boolean;
  onSfwModeChange: (enabled: boolean) => void;
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  onGenreRemove: (genreId: number) => void;
  infiniteScrollMode: boolean;
  onInfiniteScrollModeChange: (enabled: boolean) => void;
}

// Advanced filters component (used in both desktop and mobile Sheet)
function AdvancedFilters({
  filters,
  onFilterChange,
  selectedGenres,
  onGenreToggle,
  onGenreRemove,
  genreSearch,
  setGenreSearch,
  hasActiveFilters,
  onClearFilters,
}: {
  filters: AnimeFiltersProps["filters"];
  onFilterChange: AnimeFiltersProps["onFilterChange"];
  selectedGenres: AnimeFiltersProps["selectedGenres"];
  onGenreToggle: AnimeFiltersProps["onGenreToggle"];
  onGenreRemove: AnimeFiltersProps["onGenreRemove"];
  genreSearch: string;
  setGenreSearch: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 4, name: "Comedy" },
    { id: 8, name: "Drama" },
    { id: 10, name: "Fantasy" },
    { id: 14, name: "Horror" },
    { id: 7, name: "Mystery" },
    { id: 22, name: "Romance" },
    { id: 24, name: "Sci-Fi" },
    { id: 36, name: "Slice of Life" },
    { id: 30, name: "Sports" },
    { id: 37, name: "Supernatural" },
    { id: 41, name: "Thriller" },
  ];

  const filteredGenres = genreSearch
    ? genres.filter((genre) =>
        genre.name.toLowerCase().includes(genreSearch.toLowerCase())
      )
    : genres;

  return (
    <div className="space-y-4">
      {/* Genre Selection */}
      <div className="flex flex-col gap-4">
        <Select
          value=""
          onValueChange={(value) => {
            onGenreToggle(Number(value));
            setGenreSearch("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genres..." />
          </SelectTrigger>
          <SelectContent>
            <div className="flex items-center border-b px-3 pb-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search genres..."
                value={genreSearch}
                onChange={(e) => setGenreSearch(e.target.value)}
                className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-p"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-[200px] overflow-auto">
              {filteredGenres.length === 0 ? (
                <div className="py-6 text-center">
                  <p>No genres found</p>
                </div>
              ) : (
                filteredGenres.map((genre) => (
                  <SelectItem
                    key={genre.id}
                    value={genre.id.toString()}
                    disabled={selectedGenres.includes(genre.id)}
                  >
                    <p>{genre.name}</p>
                  </SelectItem>
                ))
              )}
            </div>
          </SelectContent>
        </Select>

        {/* Selected Genres as Badges */}
        {selectedGenres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre ? (
                <Badge
                  key={genreId}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => onGenreRemove(genreId)}
                >
                  <p>{genre.name}</p>
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>

      <hr />

      {/* Type, Status, Rating */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <Select
            value={filters.type || "all-types"}
            onValueChange={(value) => {
              if (value === "all-types") {
                onFilterChange("type", "");
              } else {
                onFilterChange("type", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">
                <p>All Types</p>
              </SelectItem>
              <SelectItem value="tv">
                <p>TV</p>
              </SelectItem>
              <SelectItem value="movie">
                <p>Movie</p>
              </SelectItem>
              <SelectItem value="ova">
                <p>OVA</p>
              </SelectItem>
              <SelectItem value="special">
                <p>Special</p>
              </SelectItem>
              <SelectItem value="ona">
                <p>ONA</p>
              </SelectItem>
              <SelectItem value="music">
                <p>Music</p>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Select
            value={filters.status || "all-status"}
            onValueChange={(value) => {
              if (value === "all-status") {
                onFilterChange("status", "");
              } else {
                onFilterChange("status", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">
                <p>All Status</p>
              </SelectItem>
              <SelectItem value="airing">
                <p>Airing</p>
              </SelectItem>
              <SelectItem value="complete">
                <p>Complete</p>
              </SelectItem>
              <SelectItem value="upcoming">
                <p>Upcoming</p>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Select
            value={filters.rating || "all-ratings"}
            onValueChange={(value) => {
              if (value === "all-ratings") {
                onFilterChange("rating", "");
              } else {
                onFilterChange("rating", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-ratings">
                <p>All Ratings</p>
              </SelectItem>
              <SelectItem value="g">
                <p>G - All Ages</p>
              </SelectItem>
              <SelectItem value="pg">
                <p>PG - Children</p>
              </SelectItem>
              <SelectItem value="pg13">
                <p>PG-13 - Teens 13+</p>
              </SelectItem>
              <SelectItem value="r17">
                <p>R - 17+ recommended</p>
              </SelectItem>
              <SelectItem value="r">
                <p>R+ - Mild Nudity</p>
              </SelectItem>
              <SelectItem value="rx">
                <p>Rx - Hentai</p>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Select
          value={filters.orderBy || "popularity"}
          onValueChange={(value) => onFilterChange("orderBy", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">
              <p>Popularity</p>
            </SelectItem>
            <SelectItem value="score">
              <p>Score</p>
            </SelectItem>
            <SelectItem value="title">
              <p>Title</p>
            </SelectItem>
            <SelectItem value="start_date">
              <p>Start Date</p>
            </SelectItem>
            <SelectItem value="end_date">
              <p>End Date</p>
            </SelectItem>
            <SelectItem value="episodes">
              <p>Episodes</p>
            </SelectItem>
            <SelectItem value="rank">
              <p>Rank</p>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Select
          value={filters.sort || "desc"}
          onValueChange={(value) => onFilterChange("sort", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">
              <p>Ascending (Low to High)</p>
            </SelectItem>
            <SelectItem value="desc">
              <p>Descending (High to Low)</p>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <>
          <hr />
          <Button
            variant="destructive"
            onClick={onClearFilters}
            className="w-full"
          >
            <p>Clear Filters</p>
          </Button>
        </>
      )}
    </div>
  );
}

export function AnimeFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
  sfwMode,
  onSfwModeChange,
  selectedGenres,
  onGenreToggle,
  onGenreRemove,
  infiniteScrollMode,
  onInfiniteScrollModeChange,
}: AnimeFiltersProps) {
  const [genreSearch, setGenreSearch] = useState("");

  // Check if any filters are active
  const hasActiveFilters =
    !!searchQuery ||
    !!filters.type ||
    !!filters.status ||
    !!filters.rating ||
    filters.orderBy !== "popularity" ||
    filters.sort !== "asc" ||
    selectedGenres.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar - Always visible */}
      <div className="hidden lg:flex flex-col space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1"
          />
        </div>

        <hr />

        {/* View Mode Toggle - Always visible */}
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => {
            if (value) onViewModeChange(value as "grid" | "list");
          }}
          className="w-full"
        >
          <ToggleGroupItem value="grid" className="flex-1">
            <Grid3x3 className="w-4 h-4 mr-2" />
            <p>Grid</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="list" className="flex-1">
            <List className="w-4 h-4 mr-2" />
            <p>List</p>
          </ToggleGroupItem>
        </ToggleGroup>

        {/* SFW Mode - Always visible */}
        <Button
          variant={sfwMode ? "default" : "outline"}
          size="sm"
          onClick={() => onSfwModeChange(!sfwMode)}
          className="w-full"
        >
          {sfwMode ? (
            <>
              <ShieldCheck className="w-4 h-4 mr-2" />
              <p>SFW Mode On</p>
            </>
          ) : (
            <>
              <ShieldOff className="w-4 h-4 mr-2" />
              <p>SFW Mode Off</p>
            </>
          )}
        </Button>
      </div>

      {/* Desktop: All filters inline */}
      <div className="hidden lg:block space-y-4">
        {/* Infinite Scroll on desktop */}
        <Button
          variant={infiniteScrollMode ? "default" : "outline"}
          size="sm"
          onClick={() => onInfiniteScrollModeChange(!infiniteScrollMode)}
          className="w-full"
        >
          {infiniteScrollMode ? (
            <>
              <Infinity className="w-4 h-4 mr-2" />
              <p>Infinite Scroll On</p>
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-2" />
              <p>Pagination Mode</p>
            </>
          )}
        </Button>

        <hr />

        <AdvancedFilters
          filters={filters}
          onFilterChange={onFilterChange}
          selectedGenres={selectedGenres}
          onGenreToggle={onGenreToggle}
          onGenreRemove={onGenreRemove}
          genreSearch={genreSearch}
          setGenreSearch={setGenreSearch}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={onClearFilters}
        />
      </div>

      {/* Mobile: Card with Sheet for advanced filters */}
      <Card className="lg:hidden bg-gray-100/85 dark:bg-gray-800/85">
        <CardContent className="p-2 flex flex-col gap-2">
          {/* Search Bar - Always visible */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {/* View Mode Toggle - Always visible */}
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => {
                if (value) onViewModeChange(value as "grid" | "list");
              }}
              className="w-fit"
            >
              <ToggleGroupItem value="grid" className="flex-1">
                <Grid3x3 className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" className="flex-1">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            {/* SFW Mode - Always visible */}
            <Button
              variant={sfwMode ? "default" : "outline"}
              onClick={() => onSfwModeChange(!sfwMode)}
            >
              {sfwMode ? (
                <ShieldCheck className="w-4 h-4" />
              ) : (
                <ShieldOff className="w-4 h-4" />
              )}
            </Button>
          </div>
          <hr />

          {/* Mobile: Sheet with advanced filters */}
          <div className="lg::hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <p>More Filters</p>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <div className="mt-4 space-y-4">
                  {/* Infinite Scroll in mobile sheet */}
                  <Button
                    variant={infiniteScrollMode ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      onInfiniteScrollModeChange(!infiniteScrollMode)
                    }
                    className="w-full"
                  >
                    {infiniteScrollMode ? (
                      <>
                        <Infinity className="w-4 h-4 mr-2" />
                        <p>Infinite Scroll On</p>
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <p>Pagination Mode</p>
                      </>
                    )}
                  </Button>

                  <hr />

                  <AdvancedFilters
                    filters={filters}
                    onFilterChange={onFilterChange}
                    selectedGenres={selectedGenres}
                    onGenreToggle={onGenreToggle}
                    onGenreRemove={onGenreRemove}
                    genreSearch={genreSearch}
                    setGenreSearch={setGenreSearch}
                    hasActiveFilters={hasActiveFilters}
                    onClearFilters={onClearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
