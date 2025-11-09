import { toast } from "sonner";
import { Check, X } from "lucide-react";

export const showFavoriteToast = (
  action: "added" | "removed",
  animeTitle: string
) => {
  if (action === "added") {
    toast.success(`Added "${animeTitle}" to favorites`, {
      icon: <Check className="w-5 h-5" />,
    });
  } else {
    toast(`Removed "${animeTitle}" from favorites`, {
      icon: <X className="w-5 h-5" />,
    });
  }
};
