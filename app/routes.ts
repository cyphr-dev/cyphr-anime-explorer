import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("browse", "routes/browse.tsx"),
  route("anime/:id", "routes/anime-details.tsx"),
  route("favorites", "routes/favorites.tsx"),
] satisfies RouteConfig;
