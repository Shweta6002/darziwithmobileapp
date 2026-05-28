# DARZI Backend Refactor Guide

## 1. Full Refactored Folder Structure

```text
apps/backend/src
  core
    config
    database
    logger
    middleware
    errors
    response
    utils
    constants
  routes
    v1
      index.ts
  modules
    auth
    customer
    dealer
    dealer-wallet
    loan-management
    inventory-financing
    underwriting-engine
    booster-engine
    incentive-engine
    digital-signature
    credit-bureau
    payment
    financier
    employment-verification
    disbursement
    repayment
    notification
    checkout
      controller
      service
      repository
      model
      validator
      routes
      dto
      helper
      constants
      index.ts
  jobs
  queues
  events
  workers
  cron
```

The current DARZI commerce modules remain operational while they are migrated incrementally into this shape.

## 2. Example Conversion Of One Real Module

`checkout/coupons` is converted end to end:

```text
modules/checkout/model/coupon.model.ts
modules/checkout/repository/coupon.repository.ts
modules/checkout/service/coupon.service.ts
modules/checkout/controller/coupon.controller.ts
modules/checkout/validator/coupon.validator.ts
modules/checkout/dto/coupon.dto.ts
modules/checkout/helper/coupon.helper.ts
modules/checkout/constants/coupon.constants.ts
modules/checkout/routes/coupon.routes.ts
modules/checkout/index.ts
```

Dependency flow:

```text
coupon.routes -> coupon.controller -> coupon.service -> coupon.repository -> coupon.model
```

No controller or route performs DB work. Coupon DB behavior is preserved: same table name, fields, indexes, soft-delete behavior, and Sequelize model mapping.

## 3. Route Migration Map

See `apps/backend/docs/route-migration-map.md`.

Base path is:

```text
/api/darzi/v1
```

## 4. Shared Utility Implementation

Core utilities:

- `core/utils/asyncHandler.ts`
- `core/errors/ApiError.ts`
- `core/response/ApiResponse.ts`
- `core/middleware/validate.middleware.ts`
- `core/utils/pagination.ts`
- `core/utils/cache.ts`
- `core/constants/http.constants.ts`
- `core/config/env.ts`

Standard success:

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

Standard error:

```json
{
  "success": false,
  "message": "Request failed",
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

## 5. Middleware Implementation

Core middleware exports:

- `core/middleware/security.middleware.ts`: helmet, CORS, compression, rate limit, request logging.
- `core/middleware/auth.middleware.ts`: JWT authentication and RBAC.
- `core/middleware/validate.middleware.ts`: Joi request validation.
- `core/middleware/error.middleware.ts`: centralized sanitized errors.

## 6. Validation Architecture

Each module owns validators under `validator/`.

Rules:

- Request schemas stay out of controllers.
- Routes attach `validate({ body, query, params })`.
- Services can still enforce business invariants that require DB state.

Example:

```ts
couponRoutes.post("/", validate({ body: createCouponSchema }), couponController.create);
```

## 7. Service/Repository Examples

Repository owns Sequelize:

```ts
findByCode(code: string) {
  return Coupon.findOne({ where: { code } });
}
```

Service owns business rules:

```ts
const existing = await couponRepository.findByCode(payload.code);
if (existing) throw new ApiError(409, "Coupon code already exists", "COUPON_CODE_EXISTS");
```

## 8. Route Registration System

Routes are centrally registered in `routes/v1/index.ts`.

```ts
export const routeDefinitions = [
  { path: "/customers", router: userRoutes, tags: ["Customers"] },
  { path: "/coupons", router: couponRoutes, tags: ["Coupons"] },
];
```

This gives one versioned registry for Express mounting and future Swagger generation.

## 9. Error Handling System

Use `ApiError` for expected failures:

```ts
throw new ApiError(404, "Coupon not found", "COUPON_NOT_FOUND");
```

Unexpected errors are logged by Pino and sanitized in production.

## 10. Recommended Coding Standards

- Routes define HTTP only.
- Controllers extract request data and return responses only.
- Services own workflows, transactions, integrations, and business checks.
- Repositories own database access only.
- DTOs sanitize outgoing data.
- Validators define request shape.
- Helpers must be pure.
- Constants own static strings/enums.
- Do not import models into controllers.
- Do not import repositories into routes.
- Do not add cross-module imports unless a service-level dependency is intentional.

## 11. Migration Strategy For Remaining Modules

1. Freeze current payload contract with integration tests.
2. Create target folders inside the module.
3. Move ORM schema into `model/`.
4. Add repository methods for every existing DB query.
5. Move controller business logic into service.
6. Add validators for every route.
7. Add DTOs to preserve response shape.
8. Switch route registration to the new module barrel.
9. Run `npm run lint`, `npm test`, and focused endpoint tests.
10. Delete old flat files only after tests prove parity.

Recommended order:

```text
auth -> customer -> product -> cart -> order -> payment -> admin -> notification/jobs
```

## 12. API Versioning Strategy

Current:

```text
/api/darzi/v1
```

Future:

```text
/api/darzi/v2
```

Rules:

- Never break payloads inside the same version.
- Add fields as backward-compatible optional fields.
- Remove/rename fields only in a new version.
- Keep route registries separate per version.

## 13. Swagger/OpenAPI Structure

Use route metadata from `routeDefinitions` and module-local schemas.

Recommended layout:

```text
core/config/swagger.ts
modules/{domain}/docs/*.swagger.ts
routes/v1/index.ts
```

Tags should match business domains: `Customers`, `Dealer Wallets`, `Loan Applications`, `Payments`, `Coupons`.

## 14. Queue/Job Architecture

Queues live in `queues/`, workers in `workers/`, job constants in `jobs/`.

Current queues:

- `email`
- `order`
- `inventory`

Recommended fintech/DARZI queues:

- `payment-reconciliation`
- `loan-underwriting`
- `credit-bureau-sync`
- `digital-signature-callback`
- `notification-dispatch`
- `inventory-reservation-release`

Use queues for external integrations, retries, webhooks, reports, and non-blocking notifications.

## 15. Redis Integration Structure

Redis is exposed through:

```text
core/database/redis.ts
core/utils/cache.ts
```

Usage:

```ts
const cached = await cacheStore.getJson("products:list");
await cacheStore.setJson("products:list", payload, 60);
```

Redis responsibilities:

- read caching
- refresh token revocation
- idempotency keys
- distributed rate limits
- BullMQ queues
- webhook deduplication
