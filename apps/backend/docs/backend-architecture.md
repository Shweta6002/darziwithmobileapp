# DARZI Backend Architecture

## 1. High-Level Architecture
DARZI uses a modular Express API with clean boundaries: routes call controllers, controllers orchestrate services, services own business rules, repositories/models own persistence, and workers process async side effects. MySQL is the source of truth, Redis supports cache/session/rate/queue workloads, and BullMQ handles background jobs.

Runtime flow:
Client -> API gateway/load balancer -> Express API -> Service layer -> Sequelize/MySQL.
Async flow:
API -> BullMQ -> Worker -> Email/payment/inventory/reporting side effects.

The API is versioned at `/api/v1`; existing AI endpoints remain at `/api/gemini` for frontend compatibility.

## 2. Folder Structure
```text
apps/backend
  server.ts
  database/schema.sql
  docs/backend-architecture.md
  src
    app.ts
    config
    database/models.ts
    middlewares
    modules
      auth
      user
      product
      cart
      checkout
      payment
      order
      admin
      measurement
      ai
    queues
    routes
    utils
    workers
    types
  tests
```

## 3. Database Schema Design
The normalized schema includes `users`, `addresses`, `payment_methods`, `categories`, `products`, `product_variants`, `inventory`, `carts`, `cart_items`, `coupons`, `orders`, `order_items`, `payments`, `reviews`, `wishlist_items`, `measurement_profiles`, and `admin_logs`.

Key design choices:
- UUID primary keys for safer distributed creation.
- `deleted_at` soft delete columns for recoverable business entities.
- JSON snapshots on orders for immutable historical product/address/measurement state.
- Inventory rows locked during checkout to prevent overselling.
- Full-text product search index plus category/status/featured indexes.

DDL lives in `apps/backend/database/schema.sql`.

## 4. Project Setup
Root scripts:
- `npm run dev:backend`: run API in development.
- `npm run build`: build web and backend bundle.
- `npm start`: run production bundle.
- `npm run worker`: start BullMQ workers.
- `npm test`: run Jest/Supertest.

Configuration is loaded from `.env` and validated in `src/config/env.ts`.

## 5. Core Middleware Setup
Configured middleware includes:
- `helmet` for HTTP security headers.
- `cors` with env-driven allowed origins.
- `compression` for response compression.
- `express-rate-limit` for baseline abuse protection.
- `pino-http` request logs with request IDs.
- centralized validation and error handling.
- webhook raw-body exception for payment signatures.

## 6. Authentication Module
Auth supports registration, login, refresh, logout, email verification, forgot password, and reset password.

Security choices:
- bcrypt cost 12.
- short-lived access JWT plus long-lived refresh JWT.
- refresh-token revocation in Redis.
- password reset and email verification tokens stored hashed in Redis.
- RBAC middleware supports `ADMIN` and `CUSTOMER`.

Primary endpoints:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

## 7. User Module
User APIs manage profile, addresses, saved payment methods, measurement profiles, wishlist, and order history. Address and payment method records are scoped by authenticated user ID.

Endpoints:
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/users/addresses`
- `POST /api/v1/users/addresses`
- `DELETE /api/v1/users/addresses/:id`
- `GET /api/v1/users/payment-methods`

## 8. Product Module
Products support categories/subcategories, variants, colors, sizes, inventory, featured products, reviews, search, filtering, sorting, and pagination.

Endpoints:
- `GET /api/v1/products`
- `GET /api/v1/products/search`
- `GET /api/v1/products/:id`
- `POST /api/v1/products/:id/reviews`
- `POST /api/v1/products` admin
- `PATCH /api/v1/products/:id` admin

Public product responses are shaped to match the current web/mobile frontend product model.

## 9. Cart/Checkout Module
Cart APIs validate inventory before adding items and preserve customization and measurement references. Checkout creates an order inside a DB transaction, reserves inventory, snapshots cart data, creates payment state, and clears cart items.

Endpoints:
- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart/items/:itemId`
- `POST /api/v1/orders/checkout`

## 10. Payment Integration
Razorpay is implemented as the default provider with simulation fallback when credentials are absent. Payment verification uses HMAC signature validation. Webhooks accept raw JSON body for signature integrity.

Endpoints:
- `POST /api/v1/payments/orders/:orderId/provider-order`
- `POST /api/v1/payments/verify`
- `POST /api/v1/payments/webhook`

## 11. Order Management
Orders are immutable commercial records with mutable lifecycle status. Order items store snapshots so product edits never rewrite history. Admins can update order lifecycle states.

Endpoints:
- `POST /api/v1/orders/initiate` frontend compatibility
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id/status` admin

## 12. Admin APIs
Admin routes are protected by `authenticate + authorize("ADMIN")`.

Endpoints:
- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/orders`
- `GET /api/v1/admin/logs`

Extend this module for inventory adjustments, coupon CRUD, product publishing, refunds, and sales report exports.

## 13. Redis Caching
Redis responsibilities:
- product listing cache with short TTL.
- refresh token revocation.
- email/password token storage.
- BullMQ backend.
- future distributed rate limiting and idempotency keys.

Recommended keys:
- `products:{queryHash}` TTL 60-300 seconds.
- `refresh_revoked:{tokenId}` TTL token expiry.
- `idempotency:{userId}:{key}` TTL 24 hours.

## 14. Queue Workers
BullMQ queues:
- `email`: verification, reset password, invoices.
- `order`: invoice generation, order status notifications.
- `inventory`: low-stock alerts, reservation cleanup.

Workers live in `src/workers/index.ts`.

## 15. Logging & Monitoring
Logging uses Pino with redaction for secrets and tokens. Production should ship logs to CloudWatch, ELK, Datadog, Grafana Loki, or GCP Logging.

Recommended metrics:
- request latency by route/status.
- DB query duration.
- Redis latency.
- queue wait/processing/failure counts.
- checkout conversion and payment failure rate.

Add OpenTelemetry for traces once deployed behind real infrastructure.

## 16. Testing Strategy
Use Jest + Supertest for HTTP integration tests, service unit tests with mocked repositories, and transaction-heavy integration tests against MySQL Testcontainers or Docker Compose.

Test layers:
- middleware: auth, validation, errors.
- auth: token issuance, refresh revocation, password reset.
- product: filters, pagination, cache invalidation.
- cart/checkout: inventory race conditions and transaction rollback.
- payment: signature verification and webhook idempotency.

## 17. Docker & Deployment
Docker artifacts:
- `Dockerfile`
- `docker-compose.yml`

Production deployment:
- API containers behind ALB/Nginx.
- managed MySQL with backups and read replicas.
- managed Redis.
- separate worker deployment.
- secrets from cloud secret manager.
- CI runs lint/tests/build before image push.

## 18. Scaling Strategy
For lakhs of users:
- keep API stateless and horizontally scalable.
- add Redis-backed distributed rate limiting.
- use DB read replicas for browse-heavy workloads.
- add CDN for images and static assets.
- move product search to OpenSearch/Meilisearch when catalog/search complexity grows.
- partition/archive old admin logs and order events.
- use idempotency keys for checkout/payment endpoints.
- add DB indexes based on real query plans.

## 19. Future Microservices Evolution Plan
Keep the modular monolith until team size and traffic justify extraction. Natural boundaries:
- Identity service: auth, sessions, RBAC.
- Catalog service: products, variants, search.
- Inventory service: stock, reservations, replenishment.
- Checkout service: cart, coupons, tax, shipping.
- Order service: lifecycle, returns, invoices.
- Payment service: provider integrations, refunds, reconciliation.
- Notification service: email/SMS/WhatsApp.

Before extraction, introduce domain events, outbox table, idempotency, and service-owned schemas.
