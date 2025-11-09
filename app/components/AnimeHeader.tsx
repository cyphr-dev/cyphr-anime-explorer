import { Link, useLocation } from "react-router";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Home, Search, Heart } from "lucide-react";
import { useAppSelector } from "~/store/hooks";
import { selectFavorites } from "~/store/slices/favoritesSlice";

export default function AnimeHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const favorites = useAppSelector(selectFavorites);
  const favoriteCount = favorites.length;

  return (
    <header className="w-full flex sm:px-4 justify-center sticky top-0 sm:top-3 z-50 container mx-auto">
      <div className="flex justify-between w-full px-4 sm:px-6 py-4 bg-gray-100/85 dark:bg-gray-800/85 sm:rounded-full items-center text-center backdrop-blur-md border">
        <a
          href="/"
          className="hover:opacity-80 transition-opacity bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          <h3 className="font-bold">AnimeExplorer</h3>
        </a>

        <div className="flex flex-row gap-1 items-center bg-background/50 rounded-full p-1">
          {/* Navigation */}
          <Link to="/">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="h-9 w-9 sm:w-auto sm:px-4 rounded-full"
            >
              <Home className="w-4 h-4" />
              <p className="hidden md:inline">Home</p>
            </Button>
          </Link>

          <Link to="/browse">
            <Button
              variant={pathname === "/browse" ? "default" : "ghost"}
              size="sm"
              className="h-9 w-9 sm:w-auto sm:px-4 rounded-full"
            >
              <Search className="w-4 h-4" />
              <p className="hidden md:inline">Browse</p>
            </Button>
          </Link>

          <Link to="/favorites">
            <Button
              variant={pathname === "/favorites" ? "default" : "ghost"}
              size="sm"
              className="h-9 w-9 sm:w-auto sm:px-4 rounded-full relative"
            >
              <Heart className="w-4 h-4" />
              <p className="hidden md:inline">Favorites</p>
              {favoriteCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  variant="destructive"
                >
                  <p className="text-white">
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </p>
                </Badge>
              )}
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
