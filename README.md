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
   `npm --prefix apps/backend install`
   `npm --prefix apps/web install`
2. Create separate env files:
   `cp apps/backend/.env.example apps/backend/.env`
   `cp apps/web/.env.example apps/web/.env`
3. Set `GEMINI_API_KEY` in `apps/backend/.env` if you use Gemini features.
4. Run backend and web on separate ports:
   `npm --prefix apps/backend run dev`
   `npm --prefix apps/web run dev`
5. Run the mobile app:
   `cd apps/mobile && npm install && npm start`

## Backend API

- Health: `GET /api/darzi/v1/health`
- Swagger docs: `GET /api/docs`
- Product list compatible with current frontend: `GET /api/darzi/v1/products`
- AI advisor compatibility routes: `POST /api/gemini/consult`, `POST /api/gemini/analyze-measurements`

For local infrastructure:

`cd apps/backend && docker compose up --build`
