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
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";

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
  // Popular anime genres from MAL/Jikan API
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

  const [genreSearch, setGenreSearch] = useState("");
  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  // Check if any filters have been changed from default
  const hasActiveFilters =
    searchQuery !== "" ||
    filters.type !== "" ||
    filters.status !== "" ||
    filters.rating !== "" ||
    filters.orderBy !== "popularity" ||
    filters.sort !== "asc" ||
    selectedGenres.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
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
      {/* View Mode and SFW Toggle */}
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
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list" className="flex-1">
          <List className="w-4 h-4 mr-2" />
          List
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Infinite Scroll Toggle */}
      <div className="flex flex-col gap-2">
        <label>Scroll Mode</label>
        <ToggleGroup
          type="single"
          value={infiniteScrollMode ? "infinite" : "pagination"}
          onValueChange={(value) => {
            if (value) onInfiniteScrollModeChange(value === "infinite");
          }}
          className="w-full"
        >
          <ToggleGroupItem value="infinite" className="flex-1">
            <Infinity className="w-4 h-4 mr-2" />
            Infinite
          </ToggleGroupItem>
          <ToggleGroupItem value="pagination" className="flex-1">
            <ChevronRight className="w-4 h-4 mr-2" />
            Pagination
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button
        variant={sfwMode ? "default" : "outline"}
        size="sm"
        onClick={() => onSfwModeChange(!sfwMode)}
        className="w-full"
      >
        {sfwMode ? (
          <>
            <ShieldCheck className="w-4 h-4 mr-2" />
            SFW Mode On
          </>
        ) : (
          <>
            <ShieldOff className="w-4 h-4 mr-2" />
            SFW Mode Off
          </>
        )}
      </Button>

      <hr />

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
                className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-[200px] overflow-auto">
              {filteredGenres.length === 0 ? (
                <div className="py-6 text-center text-muted-foreground">
                  No genres found
                </div>
              ) : (
                filteredGenres.map((genre) => (
                  <SelectItem
                    key={genre.id}
                    value={genre.id.toString()}
                    disabled={selectedGenres.includes(genre.id)}
                  >
                    {genre.name}
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
                  {genre.name}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>

      <hr />

      {/* First Row - Type, Status, Rating */}
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
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="tv">TV</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="ova">OVA</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="ona">ONA</SelectItem>
              <SelectItem value="music">Music</SelectItem>
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
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="airing">Airing</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
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
              <SelectItem value="all-ratings">All Ratings</SelectItem>
              <SelectItem value="g">G - All Ages</SelectItem>
              <SelectItem value="pg">PG - Children</SelectItem>
              <SelectItem value="pg13">PG-13 - Teens 13+</SelectItem>
              <SelectItem value="r17">R - 17+ recommended</SelectItem>
              <SelectItem value="r">R+ - Mild Nudity</SelectItem>
              <SelectItem value="rx">Rx - Hentai</SelectItem>
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
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="score">Score</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="start_date">Start Date</SelectItem>
            <SelectItem value="end_date">End Date</SelectItem>
            <SelectItem value="episodes">Episodes</SelectItem>
            <SelectItem value="rank">Rank</SelectItem>
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
            <SelectItem value="asc">Ascending (Low to High)</SelectItem>
            <SelectItem value="desc">Descending (High to Low)</SelectItem>
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
            Clear Filters
          </Button>
        </>
      )}
    </div>
  );
}
