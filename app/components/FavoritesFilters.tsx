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
import { Grid3x3, List, Search, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface FavoritesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: "recent" | "title" | "score" | "type";
  onSortByChange: (value: "recent" | "title" | "score" | "type") => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onClearSearch: () => void;
}

export function FavoritesFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onClearSearch,
}: FavoritesFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Desktop: Vertical layout */}
      <div className="hidden lg:flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">
              <p>Recently Added</p>
            </SelectItem>
            <SelectItem value="title">
              <p>Title (A-Z)</p>
            </SelectItem>
            <SelectItem value="score">
              <p>Score (High-Low)</p>
            </SelectItem>
            <SelectItem value="type">
              <p>Type</p>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
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

        {/* Clear Search Button */}
        {searchQuery && (
          <Button variant="outline" onClick={onClearSearch} className="w-full">
            <X className="w-4 h-4 mr-2" />
            <p>Clear Search</p>
          </Button>
        )}
      </div>

      {/* Mobile: Horizontal card layout */}
      <Card className="lg:hidden bg-gray-100/85 dark:bg-gray-800/85">
        <CardContent className="p-2 flex flex-col gap-2">
          {/* Search Bar and View Mode Toggle */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => {
                if (value) onViewModeChange(value as "grid" | "list");
              }}
              className="w-fit"
            >
              <ToggleGroupItem value="grid">
                <Grid3x3 className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <hr />

          {/* Sort By */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">
                  <p>Recently Added</p>
                </SelectItem>
                <SelectItem value="title">
                  <p>Title (A-Z)</p>
                </SelectItem>
                <SelectItem value="score">
                  <p>Score (High-Low)</p>
                </SelectItem>
                <SelectItem value="type">
                  <p>Type</p>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Search Button */}
            {searchQuery && (
              <Button variant="outline" onClick={onClearSearch}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
