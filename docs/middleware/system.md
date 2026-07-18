---
sidebar_label: Middleware System
---

# Middleware System

Middleware is code that runs around your route handlers — **before** (and optionally **after**) them. Use it for logging, auth, CORS, and other logic shared by many routes. BurgerAPI supports **global** middleware (all routes) and **route-specific** middleware.

## Execution order

Middleware is one stage of a single set of processing steps (a pipeline): **Global → Validation → Route-specific → Handler**. If any middleware returns a `Response`, the chain stops and that response is sent.

See [Request Lifecycle](/docs/architecture/request-lifecycle) for the full request flow, and [Route-Specific Middleware](/docs/middleware/route-specific) for examples.


## Related

- [Global Middleware](/docs/middleware/global)
- [Route-Specific Middleware](/docs/middleware/route-specific)
- [Middleware Return Types](/docs/middleware/return-types)
- [Request Context](/docs/core/request-handling)
