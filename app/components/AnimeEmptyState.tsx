import {
  FileQuestion,
  SearchX,
  AlertCircle,
  Wifi,
  ServerCrash,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface AnimeEmptyStateProps {
  type?: "no-results" | "error" | "network-error" | "initial" | "custom";
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function AnimeEmptyState({
  type = "no-results",
  title,
  description,
  icon,
  action,
  className = "",
}: AnimeEmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case "no-results":
        return {
          icon: <SearchX className="w-16 h-16 text-muted-foreground" />,
          defaultTitle: "No anime found",
          defaultDescription:
            "Try adjusting your filters or search query to find what you're looking for.",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-16 h-16 text-destructive" />,
          defaultTitle: "Something went wrong",
          defaultDescription:
            "We encountered an error while loading the data. Please try again.",
        };
      case "network-error":
        return {
          icon: <Wifi className="w-16 h-16 text-destructive" />,
          defaultTitle: "Connection error",
          defaultDescription:
            "Unable to connect to the server. Please check your internet connection and try again.",
        };
      case "initial":
        return {
          icon: <ServerCrash className="w-16 h-16 text-muted-foreground" />,
          defaultTitle: "Start exploring",
          defaultDescription:
            "Search for your favorite anime or browse through our collection.",
        };
      case "custom":
        return {
          icon: icon || (
            <FileQuestion className="w-16 h-16 text-muted-foreground" />
          ),
          defaultTitle: "No data available",
          defaultDescription: "There's nothing to display at the moment.",
        };
      default:
        return {
          icon: <FileQuestion className="w-16 h-16 text-muted-foreground" />,
          defaultTitle: "No data available",
          defaultDescription: "There's nothing to display at the moment.",
        };
    }
  };

  const content = getContent();

  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4">{icon || content.icon}</div>
        <h3 className="mb-2">{title || content.defaultTitle}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {description || content.defaultDescription}
        </p>
        {action && (
          <Button onClick={action.onClick} variant="default">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
