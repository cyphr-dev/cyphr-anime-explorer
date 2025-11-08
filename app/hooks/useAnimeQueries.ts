import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchAnimeList,
  fetchAnimeById,
  fetchAnimePictures,
  fetchAnimeVideos,
  fetchAnimeStatistics,
  fetchAnimeRelations,
  fetchAnimeCharacters,
  type FetchAnimeListParams,
} from "~/services/jikanApi";
import type { Anime } from "~/types/anime";

// Query key factory
export const animeKeys = {
  all: ["anime"] as const,
  lists: () => [...animeKeys.all, "list"] as const,
  list: (filters: FetchAnimeListParams) =>
    [...animeKeys.lists(), filters] as const,
  details: () => [...animeKeys.all, "detail"] as const,
  detail: (id: number) => [...animeKeys.details(), id] as const,
  pictures: (id: number) => [...animeKeys.details(), id, "pictures"] as const,
  videos: (id: number) => [...animeKeys.details(), id, "videos"] as const,
  statistics: (id: number) =>
    [...animeKeys.details(), id, "statistics"] as const,
  relations: (id: number) => [...animeKeys.details(), id, "relations"] as const,
  characters: (id: number) =>
    [...animeKeys.details(), id, "characters"] as const,
};

// Hook for fetching anime list (regular pagination)
export const useAnimeList = (params: FetchAnimeListParams) => {
  return useQuery({
    queryKey: animeKeys.list(params),
    queryFn: async ({ signal }) => {
      const response = await fetchAnimeList({ ...params, signal });
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for infinite scroll
export const useInfiniteAnimeList = (
  params: Omit<FetchAnimeListParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: animeKeys.list(params),
    queryFn: async ({ pageParam = 1, signal }) => {
      const response = await fetchAnimeList({
        ...params,
        page: pageParam,
        signal,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching anime details
export const useAnimeDetails = (id: number | undefined) => {
  return useQuery({
    queryKey: animeKeys.detail(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimeById(id, signal);
      return response.data;
    },
    enabled: !!id, // Only run query if id is provided
    staleTime: 1000 * 60 * 10, // 10 minutes (anime details change less frequently)
  });
};

// Hook for fetching anime pictures
export const useAnimePictures = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: animeKeys.pictures(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimePictures(id, signal);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10,
  });
};

// Hook for fetching anime videos
export const useAnimeVideos = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: animeKeys.videos(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimeVideos(id, signal);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10,
  });
};

// Hook for fetching anime statistics
export const useAnimeStatistics = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: animeKeys.statistics(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimeStatistics(id, signal);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10,
  });
};

// Hook for fetching anime relations
export const useAnimeRelations = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: animeKeys.relations(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimeRelations(id, signal);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10,
  });
};

// Hook for fetching anime characters
export const useAnimeCharacters = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: animeKeys.characters(id!),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error("ID is required");
      const response = await fetchAnimeCharacters(id, signal);
      return response.data;
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10,
  });
};
