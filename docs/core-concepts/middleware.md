---
sidebar_label: Middleware
---

# Middleware

Middleware runs around your handlers. It can be applied globally (for every request) or per route, and it can:

- **Continue** to the next middleware or handler by returning `undefined`.
- **Short-circuit** by returning a `Response`.
- **Transform** the response by returning a function that receives the final `Response`.

This makes middleware a natural fit for logic shared by many routes, such as authentication, logging, and CORS. See [Middleware](../middleware/system.md) for the full model, including global, route-specific, return types, and after-middleware.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
