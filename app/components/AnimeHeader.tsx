import { Link, useLocation } from "react-router";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { Button } from "~/components/ui/button";
import { Home, Search } from "lucide-react";

export default function AnimeHeader() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="w-full flex sm:px-4 justify-center sticky top-0 sm:top-3 z-50 container mx-auto">
      <div className="flex justify-between w-full px-4 sm:px-6 py-4 bg-background/85 sm:rounded-full items-center text-center backdrop-blur-md border">
        <Link
          to="/"
          className="font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          AnimeExplorer
        </Link>

        <div className="flex flex-row gap-2 sm:gap-3 items-center">
          {/* Navigation */}
          <Link to="/">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="h-9 w-9 sm:w-auto sm:px-4 rounded-full"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Home</span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant={pathname.startsWith("/anime/") ? "default" : "ghost"}
              size="sm"
              className="h-9 w-9 sm:w-auto sm:px-4 rounded-full"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Browse</span>
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
