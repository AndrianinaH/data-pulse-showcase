# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Runs Vite dev server on port 8080 (or VITE_PORT env var)
- **Build for production**: `npm run build` - Creates optimized production build
- **Build for development**: `npm run build:dev` - Creates development build
- **Lint code**: `npm run lint` - Runs ESLint on the codebase
- **Preview build**: `npm run preview` - Serves the production build locally

## Architecture Overview

This is a React dashboard application built with modern tooling:

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: Jotai for global state, React Query for server state
- **Routing**: React Router v6 with protected routes
- **Forms**: React Hook Form with Zod validation

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components (auto-generated)
│   ├── AppSidebar.tsx  # Main navigation sidebar
│   ├── Header.tsx      # App header component
│   ├── PrivateRoute.tsx # Authentication wrapper
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard home
│   ├── Login.tsx       # Authentication page
│   ├── Analytics.tsx   # Analytics dashboard
│   ├── Posts.tsx       # Posts management
│   ├── Audience.tsx    # Audience insights
│   └── Settings.tsx    # App settings
├── services/           # API service layers
├── lib/                # Utilities and configurations
│   ├── api.ts         # API configuration and auth headers
│   └── utils.ts       # Common utility functions
└── hooks/              # Custom React hooks
```

### Key Features
- **Authentication**: Token-based auth with protected routes and automatic redirects
- **Responsive Design**: Mobile-first approach with sidebar that adapts to screen size
- **Theme Support**: Light/dark mode support via next-themes
- **Toast Notifications**: Dual toast system (Radix Toast + Sonner)
- **Data Fetching**: React Query for caching and synchronization

### Authentication Flow
- Login page at `/login` without sidebar
- Protected routes redirect to login if no token
- Token stored in localStorage with Bearer auth headers
- PrivateRoute component handles authentication checks

### Styling Guidelines
- Uses CSS custom properties for theming (defined in index.css)
- Custom color palette: coral and pulse-blue variants
- Component styling follows shadcn/ui patterns
- Path alias `@/` points to `src/` directory

### API Integration
- Base API URL from `VITE_API_URL` environment variable
- Bearer token authentication via `getAuthHeaders()` utility
- Service layer pattern for API calls (loginService, postService, statsService)

### Development Notes
- TypeScript config is relaxed for rapid development (noImplicitAny: false)
- ESLint configured for React with hooks and refresh plugins
- Vite dev server runs on `::` (all interfaces) for network access
- Component tagging enabled in development via lovable-tagger