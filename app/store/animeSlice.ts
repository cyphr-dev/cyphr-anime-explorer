import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Anime, AnimeState } from "~/types/anime";
import { fetchAnimeList, fetchAnimeById } from "~/services/jikanApi";

const initialState: AnimeState = {
  animes: [],
  currentAnime: null,
  loading: false,
  error: null,
  searchQuery: "",
  filters: {
    type: "",
    status: "",
    rating: "",
    orderBy: "popularity",
    sort: "asc",
  },
  pagination: {
    currentPage: 1,
    hasNextPage: false,
    lastVisiblePage: 1,
  },
};

// Async thunks
export const getAnimeList = createAsyncThunk(
  "anime/getAnimeList",
  async (
    params: {
      page?: number;
      query?: string;
      type?: string;
      status?: string;
      rating?: string;
      order_by?: string;
      sort?: string;
      sfw?: boolean;
      genres?: string;
    },
    { signal }
  ) => {
    const response = await fetchAnimeList({ ...params, signal });
    return response;
  }
);

export const getAnimeDetails = createAsyncThunk(
  "anime/getAnimeDetails",
  async (id: number, { signal }) => {
    const response = await fetchAnimeById(id, signal);
    return response;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<AnimeState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = "";
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    clearCurrentAnime: (state) => {
      state.currentAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get anime list
      .addCase(getAnimeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnimeList.fulfilled, (state, action) => {
        state.loading = false;
        state.animes = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.current_page,
          hasNextPage: action.payload.pagination.has_next_page,
          lastVisiblePage: action.payload.pagination.last_visible_page,
        };
      })
      .addCase(getAnimeList.rejected, (state, action) => {
        state.loading = false;
        // Don't set error if request was cancelled
        if (
          action.error.name !== "AbortError" &&
          action.error.name !== "CanceledError"
        ) {
          state.error = action.error.message || "Failed to fetch anime list";
        }
      })
      // Get anime details
      .addCase(getAnimeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnimeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnime = action.payload.data;
      })
      .addCase(getAnimeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime details";
      });
  },
});

export const {
  setSearchQuery,
  setFilters,
  clearFilters,
  setCurrentPage,
  clearCurrentAnime,
} = animeSlice.actions;

export default animeSlice.reducer;
