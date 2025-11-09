# Cyphr Anime Explorer

> A modern, feature-rich anime discovery platform built with React 19, TypeScript, and Redux Toolkit. Explore thousands of anime with instant search, advanced filtering, and a beautiful responsive interface.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.10.1-purple.svg)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.9.2-red.svg)](https://reactrouter.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38bdf8.svg)](https://tailwindcss.com/)

![Cyphr Anime Explorer](https://img.shields.io/badge/Status-Production_Ready-success)

**[View Live Demo](https://cyphr-anime-explorer.vercel.app)**

---

## Features

### Core Functionality (Requirements Met)

- **Instant Search** - Real-time search with 250ms debouncing, no button required
- **Advanced Filtering** - Filter by type, status, rating, genre, and more
- **Server-Side Pagination** - Efficient data loading with pagination controls
- **Redux State Management** - Centralized state with Redux Toolkit
- **Fully Responsive** - Perfect on mobile, tablet, and desktop
- **Modern UI** - Beautiful interface with shadcn/ui and Tailwind CSS 4
- **No Race Conditions** - Automatic request cancellation on new searches
- **Type-Safe** - Full TypeScript support throughout

### Bonus Features (Beyond Requirements)

#### Enhanced User Experience

- **Favorites System** - Save your favorite anime with localStorage persistence
- **Multiple View Modes** - Switch between grid and list layouts
- **Video Integration** - Watch trailers directly in the app
- **Image Lightbox** - Full-screen image viewer with navigation
- **Carousel Components** - Beautiful category carousels on homepage
- **Theme Toggle** - Dark/Light mode support with next-themes
- **Toast Notifications** - Elegant feedback with Sonner
- **Responsive Navigation** - Mobile-friendly header with sheet menu

#### Advanced Features

- **Infinite Scroll Mode** - Optional infinite scrolling instead of pagination
- **Multiple Tabs** - Organized anime details with Info, Media, Statistics, and Related tabs
- **Statistics Dashboard** - Detailed anime stats with score distribution
- **Related Anime** - Discover sequels, prequels, and related content
- **Character Gallery** - Browse anime characters with role information
- **Media Gallery** - View pictures, videos, and promotional content
- **Genre Management** - Multi-select genre filtering with visual tags
- **State Persistence** - Filters and preferences saved to localStorage
- **Smart Loading States** - Skeleton loaders and smooth transitions
- **Error Boundaries** - Graceful error handling with retry options
- **Empty States** - Helpful messages when no results found
- **Safe Mode (SFW)** - Toggle safe-for-work content filtering

#### UI/UX Polish

- **Gradient Hero Section** - Eye-catching landing page
- **Badge System** - Visual indicators for status, type, and ratings
- **Score Displays** - Star ratings and numerical scores
- **Date Formatting** - Human-readable dates and airing status
- **External Links** - Quick access to MyAnimeList and official sites
- **Proper Page Titles** - Dynamic document titles for each page
- **Mobile Optimizations** - Touch-friendly interface
- **Accessibility** - ARIA-compliant components from Radix UI

#### Developer Experience

- **TanStack Query** - Powerful data fetching and caching
- **DevTools Integration** - Redux DevTools and React Query DevTools
- **Custom Hooks** - Reusable hooks for debouncing, queries, and theme
- **Consistent Architecture** - Clean separation of concerns
- **Hot Module Replacement** - Fast development with HMR
- **Docker Support** - Containerized deployment ready
- **Rate Limiting** - Built-in API rate limit handling

---

## Screenshots

### Home Page

Beautiful hero section with category carousels showcasing top anime, latest series, and movies.

### Browse Page

Advanced filtering with instant search, multiple view modes, and infinite scroll support.

### Anime Details

Comprehensive anime information with tabs for info, media, statistics, and related content.

### Favorites Page

Manage your favorite anime with search and sorting capabilities.

---

## Quick Start

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cyphr-dev/cyphr-anime-explorer.git
   cd cyphr-anime-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:4000`

---

## Tech Stack

### Core Technologies

- **React 19.1.1** - Latest React with hooks
- **TypeScript 5.9.2** - Type-safe development
- **React Router 7.9.2** - Client-side routing
- **Redux Toolkit 2.10.1** - State management
- **TanStack Query 5.90.7** - Data fetching and caching
- **Tailwind CSS 4.1.17** - Utility-first styling

### UI Libraries

- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon system
- **Embla Carousel** - Smooth carousel components
- **Sonner** - Toast notifications
- **next-themes** - Theme management

### Data & API

- **Axios 1.13.2** - HTTP client
- **Jikan API v4** - MyAnimeList unofficial API

### Development Tools

- **Vite 7.1.7** - Fast build tool
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## Project Structure

```
cyphr-anime-explorer/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── tabs/           # Tab content components
│   │   ├── AnimeCard.tsx   # Anime card component
│   │   ├── AnimeFilters.tsx # Filter sidebar
│   │   ├── AnimeHeader.tsx  # Navigation header
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useDebounce.ts  # Debounce hook
│   │   ├── useAnimeQueries.ts # Data fetching hooks
│   │   └── useTheme.ts     # Theme management
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Helper functions
│   ├── routes/             # Page components
│   │   ├── home.tsx        # Landing page
│   │   ├── browse.tsx      # Browse/search page
│   │   ├── anime-details.tsx # Anime details page
│   │   └── favorites.tsx   # Favorites page
│   ├── services/           # API integration
│   │   └── jikanApi.ts     # Jikan API client
│   ├── store/              # Redux store
│   │   ├── store.ts        # Store configuration
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── slices/         # Redux slices
│   │       ├── animeSlice.ts
│   │       └── favoritesSlice.ts
│   ├── types/              # TypeScript types
│   │   └── anime.ts        # Anime interfaces
│   ├── app.css             # Global styles
│   ├── root.tsx            # App root component
│   └── routes.ts           # Route definitions
├── public/                 # Static assets
├── components.json         # shadcn/ui config
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── Dockerfile              # Docker configuration
└── package.json            # Dependencies
```

---

## Core Features Explained

### Instant Search with Debouncing

```typescript
// Custom debounce hook prevents excessive API calls
const debouncedSearchQuery = useDebounce(searchQuery, 250);

// Automatic request cancellation
useEffect(() => {
  const abortController = new AbortController();
  fetchData({ signal: abortController.signal });
  return () => abortController.abort();
}, [debouncedSearchQuery]);
```

### Redux State Management

```typescript
// Centralized state with Redux Toolkit
const store = configureStore({
  reducer: {
    anime: animeReducer,
    favorites: favoritesReducer,
  },
});

// Type-safe hooks
const favorites = useAppSelector(selectFavorites);
const dispatch = useAppDispatch();
```

### TanStack Query Integration

```typescript
// Powerful data fetching with caching
const { data, isLoading, error } = useQuery({
  queryKey: ["anime", animeId],
  queryFn: () => fetchAnimeById(animeId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

---

## Pages Overview

### 1. Home Page (`/`)

- Hero section with gradient background
- "Most Popular" anime carousel
- "Latest Series" carousel
- "Latest Movies" carousel
- Quick navigation to browse page

### 2. Browse Page (`/browse`)

- Instant search bar with 250ms debouncing
- Advanced filters (type, status, rating, genre)
- Grid/List view toggle
- SFW mode toggle
- Infinite scroll or pagination mode
- Sort options (score, popularity, title, date)
- Empty states and error handling

### 3. Anime Details Page (`/anime/:id`)

- Dynamic page title with anime name
- Large cover image
- Embedded YouTube trailer
- Four tabs:
  - **Info**: Synopsis, background, details, genres, studios
  - **Media**: Pictures gallery, videos, promotional content
  - **Statistics**: Scores, rankings, favorites, watching stats
  - **Related**: Sequels, prequels, side stories, adaptations
- Character gallery
- Sidebar with quick stats
- Favorite button integration

### 4. Favorites Page (`/favorites`)

- View saved favorite anime
- Search within favorites
- Sort by: recent, title, score, type
- Grid/List view modes
- Persistent storage with localStorage
- Empty state when no favorites

---

## Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 4000
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking

# Docker
docker build -t cyphr-anime-explorer .
docker run -p 3000:3000 cyphr-anime-explorer
```

---

## API Integration

### Jikan API v4

- **Base URL**: `https://api.jikan.moe/v4`
- **No Authentication Required**
- **Rate Limiting**: 1 second between requests (handled automatically)
- **Endpoints Used**:
  - `GET /anime` - Search and filter anime
  - `GET /anime/{id}` - Get anime details
  - `GET /anime/{id}/pictures` - Get anime images
  - `GET /anime/{id}/videos` - Get trailers and videos
  - `GET /anime/{id}/statistics` - Get viewing statistics
  - `GET /anime/{id}/relations` - Get related anime
  - `GET /anime/{id}/characters` - Get character information

---

## State Persistence

The application saves user preferences to localStorage:

- **Search queries** - Remembered between sessions
- **Filter settings** - Type, status, rating, genre selections
- **View mode** - Grid or list preference
- **SFW mode** - Content filtering preference
- **Favorites** - Complete favorites list
- **Infinite scroll mode** - Scrolling vs pagination preference

---

## Customization

### Themes

The app supports dark and light modes using next-themes. Toggle via the theme button in the header.

### Colors

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors
    }
  }
}
```

### Components

All UI components are from shadcn/ui and can be customized in `app/components/ui/`.

---

## Deployment

### Docker Deployment

```bash
# Build the image
docker build -t cyphr-anime-explorer .

# Run the container
docker run -p 3000:3000 cyphr-anime-explorer
```

### Platforms

Deploy to any platform supporting Node.js or Docker:

- **Vercel** - Recommended for React Router apps (current deployment)
- **Netlify** - Easy deployment with git integration
- **Railway** - Docker support included
- **AWS ECS** - Container orchestration
- **Google Cloud Run** - Serverless containers
- **Digital Ocean** - App Platform or Droplets
- **Fly.io** - Global deployment

---

## Requirements Checklist

See [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) for detailed verification of all project requirements.

**Summary:**

- React 19 with hooks only
- TypeScript throughout
- React Router 7 for navigation
- Redux Toolkit for state management
- Server-side pagination
- Instant search with 250ms debouncing
- Request cancellation (no race conditions)
- shadcn/ui + Tailwind CSS
- Responsive design
- Full type safety

---

## Bonus Features Summary

Beyond the core requirements, this project includes:

1. **Favorites System** with localStorage persistence
2. **Multiple View Modes** (Grid/List)
3. **Infinite Scroll** option
4. **Theme Toggle** (Dark/Light mode)
5. **Video Trailers** embedded in details
6. **Image Lightbox** for full-screen viewing
7. **Character Gallery** on details page
8. **Statistics Dashboard** with detailed metrics
9. **Related Anime** discovery
10. **Category Carousels** on homepage
11. **Toast Notifications** for user feedback
12. **Genre Multi-select** with visual tags
13. **State Persistence** across sessions
14. **SFW Content Filter**
15. **Mobile-optimized** responsive design
16. **Dynamic Page Titles** with anime names
17. **Empty States** with helpful actions
18. **Error Boundaries** with retry logic
19. **Loading Skeletons** for smooth UX
20. **TanStack Query** for advanced caching
21. **DevTools Integration** for debugging
22. **Docker Support** for deployment
23. **Rate Limiting** handler for API
24. **Accessible Components** from Radix UI

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- **Jikan API** - Unofficial MyAnimeList API
- **MyAnimeList** - Anime data source
- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible primitives
- **React Router Team** - Excellent routing library
- **Redux Team** - State management solution

---

## Contact

Made with ❤️ by [Cyphr](https://cyphr.my)

**Repository**: [github.com/cyphr-dev/cyphr-anime-explorer](https://github.com/cyphr-dev/cyphr-anime-explorer)

**Live Demo**: [cyphr-anime-explorer.vercel.app](https://cyphr-anime-explorer.vercel.app)

---

Star this repo if you find it useful!
