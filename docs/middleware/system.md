---
sidebar_label: Middleware System
---

# Middleware System

Middleware runs **before** (and optionally **after**) your route handlers. Use it for logging, auth, CORS, and other cross-cutting logic. BurgerAPI supports **global** middleware (all routes) and **route-specific** middleware.

## Execution order

Middleware is one stage of a single pipeline: **Global → Validation → Route-specific → Handler**. If any middleware returns a `Response`, the chain stops and that response is sent.

See [Request Lifecycle](/docs/architecture/request-lifecycle) for the full pipeline, and [Route-Specific Middleware](/docs/middleware/route-specific) for examples.


## Related

- [Global Middleware](/docs/middleware/global)
- [Route-Specific Middleware](/docs/middleware/route-specific)
- [Middleware Return Types](/docs/middleware/return-types)
- [Request Context](/docs/core/request-handling)
