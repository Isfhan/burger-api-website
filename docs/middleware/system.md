---
sidebar_label: Middleware System
---

# Middleware System

Middleware runs **before** (and optionally **after**) your route handlers. Use it for logging, auth, CORS, and other cross-cutting logic. BurgerAPI supports **global** middleware (all routes) and **route-specific** middleware.

## Execution order

1. **Global middleware** — Runs first, in the order defined in `globalMiddleware`.
2. **Validation** — If the route has a Zod schema, validation runs next.
3. **Route-specific middleware** — Runs in the order defined in the route’s `middleware` array.
4. **Route handler** — Your `GET`, `POST`, etc. runs last.

If any middleware returns a **Response**, the chain stops and that response is sent.

For full details and code examples, see [Middleware](/docs/request-handling/middleware).
