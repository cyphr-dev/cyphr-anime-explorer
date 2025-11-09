import { useAnimeStatistics } from "~/hooks/useAnimeQueries";
import { Users, Star, TrendingUp, Clock, UserCheck, UserX } from "lucide-react";

interface AnimeStatisticsTabProps {
  animeId: number | undefined;
  isActive: boolean;
}

// Utility function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toLocaleString();
};

export function AnimeStatisticsTab({
  animeId,
  isActive,
}: AnimeStatisticsTabProps) {
  // Lazy load statistics only when tab is active
  const { data: statistics, isLoading: statisticsLoading } = useAnimeStatistics(
    animeId,
    isActive
  );

  if (statisticsLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Failed to load statistics data.</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  const totalScoreVotes = statistics.scores.reduce(
    (sum: number, score: any) => sum + score.votes,
    0
  );
  const averageScore =
    statistics.scores.reduce(
      (sum: number, score: any) => sum + score.score * score.votes,
      0
    ) / totalScoreVotes;

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="flex flex-col gap-6">
        <h3>User Statistics</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <p className="text-muted-foreground">Watching</p>
            </div>
            <p
              className="text-blue-500"
              title={statistics.watching?.toLocaleString() || "0"}
            >
              {statistics.watching ? formatNumber(statistics.watching) : "0"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <p className="text-muted-foreground">Completed</p>
            </div>
            <p
              className="text-green-500"
              title={statistics.completed?.toLocaleString() || "0"}
            >
              {statistics.completed ? formatNumber(statistics.completed) : "0"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <p className="text-muted-foreground">On Hold</p>
            </div>
            <p
              className="text-yellow-500"
              title={statistics.on_hold?.toLocaleString() || "0"}
            >
              {statistics.on_hold ? formatNumber(statistics.on_hold) : "0"}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserX className="h-4 w-4 text-red-500" />
              <p className="text-muted-foreground">Dropped</p>
            </div>
            <p
              className="text-red-500"
              title={statistics.dropped?.toLocaleString() || "0"}
            >
              {statistics.dropped ? formatNumber(statistics.dropped) : "0"}
            </p>
          </div>
        </div>
      </div>
      <hr />

      {/* Score Distribution */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3>Score Distribution</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Average Score</p>
              <p>{averageScore ? averageScore.toFixed(2) : "N/A"} / 10</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Votes</p>
              <p title={totalScoreVotes.toLocaleString()}>
                {formatNumber(totalScoreVotes)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {statistics.scores
              .sort((a: any, b: any) => b.score - a.score)
              .map((score: any) => {
                const percentage =
                  totalScoreVotes > 0
                    ? (score.votes / totalScoreVotes) * 100
                    : 0;
                return (
                  <div key={score.score} className="flex items-center gap-4">
                    <div className="w-8">
                      <p>{score.score}</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <p
                        className="text-muted-foreground"
                        title={score.votes.toLocaleString()}
                      >
                        {formatNumber(score.votes)}
                      </p>
                    </div>
                    <div className="w-12 text-right">
                      <p className="text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <hr />

      {/* Additional Statistics */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3>Additional Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-muted-foreground">Plan to Watch</p>
            <p title={statistics.plan_to_watch?.toLocaleString() || "0"}>
              {statistics.plan_to_watch
                ? formatNumber(statistics.plan_to_watch)
                : "0"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Total Members</p>
            <p
              title={(
                (statistics.watching || 0) +
                (statistics.completed || 0) +
                (statistics.on_hold || 0) +
                (statistics.dropped || 0) +
                (statistics.plan_to_watch || 0)
              ).toLocaleString()}
            >
              {formatNumber(
                (statistics.watching || 0) +
                  (statistics.completed || 0) +
                  (statistics.on_hold || 0) +
                  (statistics.dropped || 0) +
                  (statistics.plan_to_watch || 0)
              )}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Completion Rate</p>
            <p>
              {statistics.watching && statistics.completed
                ? `${(
                    (statistics.completed /
                      (statistics.watching + statistics.completed)) *
                    100
                  ).toFixed(1)}%`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Drop Rate</p>
            <p>
              {statistics.dropped && totalScoreVotes
                ? `${((statistics.dropped / totalScoreVotes) * 100).toFixed(
                    1
                  )}%`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
