---
sidebar_label: File-Based Routing
---

# File-Based Routing

BurgerAPI uses file-based routing: the folders and files under your `apiDir` (with `apiPrefix` applied) become the URL paths. There is no manual route registration. Each folder adds a segment to the URL, and a file named `route.ts` at a path defines the handlers for that path.

## Example

```
api/products/route.ts     →  /api/products
api/users/[id]/route.ts   →  /api/users/:id
```

Inside `route.ts`, export a function for each HTTP method you want to support (`GET`, `POST`, `PUT`, `DELETE`, and so on).

## Route types

BurgerAPI supports a few route shapes, all built from the same folder rules:

- **Static routes** — fixed paths. See [Static Routes](/docs/routing/static-routes).
- **Dynamic routes** — capture a segment with `[param]`. See [Dynamic Routes](/docs/routing/dynamic-routes).
- **Wildcard routes** — match the rest of the path with `[...rest]`. See [Wildcard Routes](/docs/routing/wildcard-routes).
- **Route groups** — organize with `(folder)` without changing the URL. See [Route Groups](/docs/routing/route-groups).

These shapes nest freely by folder depth. See [Nested Routes](/docs/routing/nested-routes) for how paths grow with folders.

For full API details and examples, see [Static API Routes](/docs/routing/api/static-routes) (API) and [Static Pages](/docs/routing/pages/static-pages) (pages).


## Related

- [Static Routes](/docs/routing/static-routes)
- [Dynamic Routes](/docs/routing/dynamic-routes)
- [Wildcard Routes](/docs/routing/wildcard-routes)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
