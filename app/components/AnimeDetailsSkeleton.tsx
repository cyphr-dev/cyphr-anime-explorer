import { Card, CardContent } from "~/components/ui/card";

export function AnimeDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Sidebar Skeleton */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Titles Skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
            </div>

            {/* Image Skeleton */}
            <div className="w-full aspect-2/3 bg-muted rounded-lg animate-pulse" />

            <div className="h-px bg-border" />

            {/* Button Skeleton */}
            <div className="h-10 bg-muted rounded-full animate-pulse" />

            <div className="h-px bg-border" />

            {/* Genres Skeleton */}
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-20 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-14 bg-muted rounded animate-pulse" />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Quick Info Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-muted rounded animate-pulse shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Trailer and Tabs Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {/* Trailer Skeleton */}
          <div className="aspect-video bg-muted rounded-lg animate-pulse" />

          {/* Tabs Skeleton */}
          <div className="space-y-4">
            {/* Tabs List Skeleton */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 flex-1 bg-background rounded animate-pulse"
                />
              ))}
            </div>

            {/* Tab Content Skeleton */}
            <div className="space-y-6 pt-4">
              {/* Synopsis Section */}
              <div className="space-y-3">
                <div className="h-6 bg-muted rounded w-32 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Additional Info Section */}
              <div className="space-y-3">
                <div className="h-6 bg-muted rounded w-48 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 bg-muted rounded w-20 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-32 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Characters Section */}
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-52 animate-pulse" />
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-muted rounded-full animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-32 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-20 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="space-y-2 text-right">
                          <div className="h-4 bg-muted rounded w-28 animate-pulse" />
                          <div className="h-3 bg-muted rounded w-16 animate-pulse ml-auto" />
                        </div>
                        <div className="w-16 h-16 bg-muted rounded-full animate-pulse shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats Grid Skeleton */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 md:grid-cols-1 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center text-center space-y-2"
                  >
                    <div className="w-6 h-6 bg-muted rounded animate-pulse" />
                    <div className="h-6 bg-muted rounded w-12 animate-pulse" />
                    <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
