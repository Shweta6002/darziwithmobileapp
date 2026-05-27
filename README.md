<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Darzi Monorepo

This project is split into separate app folders while keeping the existing Darzi web, mobile, and backend behavior intact.

View your app in AI Studio: https://ai.studio/apps/49e51121-650e-40ec-9cc7-ef665fbf7bd5

## Project Structure

- `apps/web` - React + Vite website.
- `apps/mobile` - Expo mobile app.
- `apps/backend` - Express API server and production web host.

The backend now includes a production-oriented commerce API scaffold for authentication, users, products, cart, checkout, payments, orders, admin APIs, Redis queues, Swagger docs, Docker, and MySQL schema design. See [apps/backend/docs/backend-architecture.md](apps/backend/docs/backend-architecture.md).

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the website with backend APIs:
   `npm run dev`
4. Run only the website dev server:
   `npm run dev:web`
5. Run the mobile app:
   `cd apps/mobile && npm install && npm start`

## Backend API

- Health: `GET /api/v1/health`
- Swagger docs: `GET /api/docs`
- Product list compatible with current frontend: `GET /api/v1/products`
- AI advisor compatibility routes: `POST /api/gemini/consult`, `POST /api/gemini/analyze-measurements`

For local infrastructure:

`docker compose up --build`
