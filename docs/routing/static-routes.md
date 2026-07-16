---
sidebar_label: Static Routes
---

# Static Routes

Static routes match exact URL paths with no dynamic parts. They are the base of BurgerAPI's file-based routing and are matched before dynamic or wildcard routes.

Use static routes for fixed endpoints such as `/api/products` or `/api/health`, where the path never changes.

## Example

```
api/products/route.ts  →  /api/products
```

A `route.ts` file at that path serves `GET /api/products`, `POST /api/products`, and any other methods you export.

For the full guide — HTTP methods, handlers, 405 behavior, and matching priority — see [Static API Routes](/docs/routing/api/static-routes).


## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Dynamic Routes](/docs/routing/dynamic-routes)
- [Wildcard Routes](/docs/routing/wildcard-routes)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
