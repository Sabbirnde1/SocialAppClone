# Doppelganger — Social app clone

A social-network-style frontend built with Vite, React, and TypeScript. This repository contains a feature-rich UI scaffold (profiles, posts, messages, notifications, admin pages) using Tailwind CSS and shadcn-ui components, and is prepared to integrate with a backend service.

## Key details

- **Stack:** Vite, React, TypeScript, Tailwind CSS, shadcn-ui, React Router, TanStack Query
- **Main entry:** [src/main.tsx](src/main.tsx#L1-L20)
- **App router / pages:** [src/App.tsx](src/App.tsx#L1-L60)
- **Project config:** [package.json](package.json)

## Features (UI-side)

- User authentication flows (sign in, join, forgot/reset password)
- Profiles, posts feed, comments and reactions
- Direct messages and notifications
- Admin dashboard and moderation views
- Responsive layout and accessible UI primitives

## Getting started (local)

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Open http://localhost:5173 (Vite default)

## Available scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run build:dev` — build with development mode
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## MongoDB 

This project can be used with a MongoDB-backed backend. The frontend should not connect directly to MongoDB — set up a small backend API (Express, Fastify, Nest, etc.) that connects to MongoDB and exposes authenticated endpoints the frontend consumes.

Basic steps:

1. Create a MongoDB cluster (MongoDB Atlas) or run a local MongoDB server.
2. Add a `.env` file locally with the connection string from `.env.example` (`MONGODB_URI` and optionally `MONGODB_DB_NAME`).
3. Implement a minimal backend that uses the official `mongodb` driver or `mongoose` to connect and expose REST/GraphQL endpoints.

Quick example (Node + Express + Mongoose):

```bash
# create a minimal backend in a separate folder
mkdir backend && cd backend
npm init -y
npm i express mongoose dotenv

# create server.js that reads process.env.MONGODB_URI and starts an API
node server.js
```

Security note: Never expose `MONGODB_URI` (containing credentials) in client-side code or public repos. Use server-side environment variables and secure secrets management (e.g., platform env, vault, or GitHub Secrets).

If you want, I can scaffold a minimal `backend/` example that connects to MongoDB and provides a couple of example endpoints for authentication and posts.

## Where to look in the codebase

- UI components: `src/components/` — shared UI and page components
- Page routes: `src/pages/` — top-level pages referenced by the router
- Auth/context: `src/contexts/AuthContext.tsx` — authentication state
- Hooks: `src/hooks/` — data fetching and feature hooks

## Contributing

1. Fork and create a feature branch
2. Run the app locally and implement changes
3. Open a pull request with a clear description

## License

License is not specified in this repo. Add a `LICENSE` file if you want to set one.

---

If you'd like, I can also:

- add a `.env.example` with required env keys
- add a short CONTRIBUTING.md
-- wire up a simple backend setup guide

Tell me which of those you'd like next.
