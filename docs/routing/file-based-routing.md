---
sidebar_label: File-Based Routing
---

# File-Based Routing

BurgerAPI uses **file-based routing**: your folder structure under the API (or page) directory defines the URL paths. No manual route registration is needed.

## How it works

- **Folders** under `apiDir` map to URL segments (with `apiPrefix` applied).
- A file named **`route.ts`** at a path defines the handlers for that path.
- Export **HTTP method** functions (`GET`, `POST`, `PUT`, `DELETE`, etc.) to handle each method.

Example: `api/products/route.ts` → `/api/products`; `api/users/[id]/route.ts` → `/api/users/:id`.

## Route types

- **Static routes** — Fixed paths (e.g. `/api/products`). See [Static Routes](/docs/routing/static-routes).
- **Dynamic routes** — Capture segments with `[param]` (e.g. `/api/products/[id]`). See [Dynamic Routes](/docs/routing/dynamic-routes).
- **Wildcard routes** — Match the rest of the path with `[...rest]`. See [Wildcard Routes](/docs/routing/wildcard-routes).
- **Route groups** — Organize with `(folder)` without changing the URL. See [Route Groups](/docs/routing/route-groups).

For full details and examples, see [Static Routes](/docs/routing/api/static-routes) (API) and [Static Pages](/docs/routing/pages/static-pages) (pages).
