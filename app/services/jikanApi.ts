import axios from "axios";
import type { AnimeListResponse, Anime } from "~/types/anime";

const JIKAN_API_BASE_URL = "https://api.jikan.moe/v4";

// Create axios instance with default config
const jikanApi = axios.create({
  baseURL: JIKAN_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add rate limiting helper (Jikan has rate limits)
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

const rateLimitedRequest = async <T>(
  requestFn: () => Promise<T>
): Promise<T> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return requestFn();
};

export interface FetchAnimeListParams {
  page?: number;
  query?: string;
  type?: string;
  status?: string;
  rating?: string;
  order_by?: string;
  sort?: string;
  sfw?: boolean;
  genres?: string;
  signal?: AbortSignal;
}

// Fetch list of anime with filters
export const fetchAnimeList = async (
  params: FetchAnimeListParams = {}
): Promise<AnimeListResponse> => {
  return rateLimitedRequest(async () => {
    const {
      page = 1,
      query,
      type,
      status,
      rating,
      order_by,
      sort,
      sfw,
      genres,
      signal,
    } = params;

    const queryParams: Record<string, string | number | boolean> = {
      page,
      limit: 25,
    };

    if (query) queryParams.q = query;
    if (type) queryParams.type = type;
    if (status) queryParams.status = status;
    if (rating) queryParams.rating = rating;
    if (order_by) queryParams.order_by = order_by;
    if (sort) queryParams.sort = sort;
    if (sfw !== undefined) queryParams.sfw = sfw;
    if (genres) queryParams.genres = genres;

    const response = await jikanApi.get<AnimeListResponse>("/anime", {
      params: queryParams,
      signal,
    });

    return response.data;
  });
};

// Fetch single anime by ID
export const fetchAnimeById = async (
  id: number,
  signal?: AbortSignal
): Promise<{ data: Anime }> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get<{ data: Anime }>(`/anime/${id}`, {
      signal,
    });
    return response.data;
  });
};

// Fetch anime by search query
export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<AnimeListResponse> => {
  return fetchAnimeList({ query, page });
};

// Fetch anime pictures
export const fetchAnimePictures = async (
  id: number,
  signal?: AbortSignal
): Promise<{
  data: Array<{
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  }>;
}> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get(`/anime/${id}/pictures`, { signal });
    return response.data;
  });
};

// Fetch anime videos
export const fetchAnimeVideos = async (
  id: number,
  signal?: AbortSignal
): Promise<{
  data: { promo: any[]; episodes: any[]; music_videos: any[] };
}> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get(`/anime/${id}/videos`, { signal });
    return response.data;
  });
};

// Fetch anime statistics
export const fetchAnimeStatistics = async (
  id: number,
  signal?: AbortSignal
): Promise<{ data: any }> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get(`/anime/${id}/statistics`, { signal });
    return response.data;
  });
};

// Fetch anime relations
export const fetchAnimeRelations = async (
  id: number,
  signal?: AbortSignal
): Promise<{ data: any[] }> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get(`/anime/${id}/relations`, { signal });
    return response.data;
  });
};

// Fetch anime characters
export const fetchAnimeCharacters = async (
  id: number,
  signal?: AbortSignal
): Promise<{ data: any[] }> => {
  return rateLimitedRequest(async () => {
    const response = await jikanApi.get(`/anime/${id}/characters`, { signal });
    return response.data;
  });
};

export default jikanApi;
