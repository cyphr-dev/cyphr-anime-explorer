import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  year: number | null;
  type: string | null;
  episodes: number | null;
}

interface FavoritesState {
  items: FavoriteAnime[];
}

// Load favorites from localStorage
const loadFavoritesFromStorage = (): FavoriteAnime[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("anime-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    return [];
  }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites: FavoriteAnime[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("anime-favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteAnime>) => {
      const exists = state.items.find(
        (item) => item.mal_id === action.payload.mal_id
      );
      if (!exists) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.mal_id !== action.payload
      );
      saveFavoritesToStorage(state.items);
    },
    toggleFavorite: (state, action: PayloadAction<FavoriteAnime>) => {
      const index = state.items.findIndex(
        (item) => item.mal_id === action.payload.mal_id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.items;
export const selectIsFavorite = (
  state: { favorites: FavoritesState },
  malId: number
) => state.favorites.items.some((item) => item.mal_id === malId);

export default favoritesSlice.reducer;
