# DARZI Route Migration Map

Base route changes from `/api/v1` to `/api/darzi/v1`.

## Current DARZI Commerce Routes

| Old Route | New Route | Notes |
| --- | --- | --- |
| `GET /api/v1/health` | `GET /api/darzi/v1/health` | Standard response format. |
| `GET /api/v1/users/me` | `GET /api/darzi/v1/customers/me` | User domain renamed to customer at route boundary. |
| `PATCH /api/v1/users/me` | `PATCH /api/darzi/v1/customers/me` | Payload preserved. |
| `GET /api/v1/users/addresses` | `GET /api/darzi/v1/customers/addresses` | Payload preserved. |
| `POST /api/v1/users/addresses` | `POST /api/darzi/v1/customers/addresses` | Payload preserved. |
| `DELETE /api/v1/users/addresses/:id` | `DELETE /api/darzi/v1/customers/addresses/:id` | Payload preserved. |
| `GET /api/v1/cart` | `GET /api/darzi/v1/carts` | Resource pluralized. |
| `POST /api/v1/cart/items` | `POST /api/darzi/v1/carts/items` | Payload preserved. |
| `PATCH /api/v1/cart/items/:itemId` | `PATCH /api/darzi/v1/carts/items/:itemId` | Payload preserved. |
| `DELETE /api/v1/cart/items/:itemId` | `DELETE /api/darzi/v1/carts/items/:itemId` | Payload preserved. |
| `GET /api/v1/products` | `GET /api/darzi/v1/products` | Public product payload preserved for frontend. |
| `GET /api/v1/products/:id` | `GET /api/darzi/v1/products/:id` | Public product payload preserved for frontend. |
| `POST /api/v1/orders/initiate` | `POST /api/darzi/v1/orders/initiate` | Kept for current frontend compatibility. New checkout route remains `POST /orders/checkout`. |
| `POST /api/v1/payments/verify` | `POST /api/darzi/v1/payments/verify` | Payment payload preserved. |
| none | `GET /api/darzi/v1/coupons` | New RESTful coupon admin route. |
| none | `POST /api/darzi/v1/coupons` | New RESTful coupon admin route. |
| none | `GET /api/darzi/v1/coupons/:id` | New RESTful coupon admin route. |
| none | `PATCH /api/darzi/v1/coupons/:id` | New RESTful coupon admin route. |
| none | `DELETE /api/darzi/v1/coupons/:id` | New RESTful coupon admin route. |

## Requested Legacy RPC Examples

| Legacy RPC Route | New REST Route |
| --- | --- |
| `/getCustomerData` | `GET /api/darzi/v1/customers/:id` |
| `/dealerWalletAddMoney` | `POST /api/darzi/v1/dealer-wallets/transactions` |
| `/getBoosterDetails` | `GET /api/darzi/v1/booster-programs/:id` |
| `/doESign` | `POST /api/darzi/v1/digital-signature/documents` |
| `/createDealerWallet` | `POST /api/darzi/v1/dealer-wallets` |
| `/dynamicBoosterRoute` | `GET /api/darzi/v1/booster-programs` |

## Module Rename Map

| Old Name | New Name |
| --- | --- |
| `dynamic_booster` | `booster-engine` |
| `dealer_wallet` | `dealer-wallet` |
| `finance` | `loan-management` |
| `employment` | `employment-verification` |
| `e-sign` | `digital-signature` |
| `inventory_funding` | `inventory-financing` |
| `financer_rule_engine` | `underwriting-engine` |
| `booster` | `incentive-engine` |
| `cibil_data` | `credit-bureau` |
